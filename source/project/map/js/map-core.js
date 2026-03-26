// 生成 ECharts 配置项 
export function getChartOption(mapName, pointData, heatData, viewConfig = {}) {
    const maxVal = Math.max(...heatData.map(d => d.value), 0);
    const regions = buildRegions(viewConfig);
    const tooltipFormatter = buildTooltipFormatter(viewConfig);
    const series = buildSeries(pointData, heatData, viewConfig);

    console.log('cityNames:', viewConfig.cityNames, 'activeProvinceName:', viewConfig.activeProvinceName);

    return {
        tooltip: {
            trigger: 'item',
            borderColor: '#171a24',
            borderWidth: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            formatter: tooltipFormatter
        },
        // 左下角的颜色条
        visualMap: {
            show: true,
            min: 0,
            max: maxVal || 1,
            zlevel: 1,
            inRange: { 
                color: [
                    "#ecf0f1e6", 
                    "#EED5FFe6",
                    "#E2C8FFe6",
                    "#D5BCFFe6",
                    "#C9AFFFe6",
                    "#BDA3FFe6",
                    "#B196FFe6",
                    "#A48AFFe6",
                    "#987DFFe6",
                ]
            },
            left: '5%', bottom: '5%', calculable: true
        },
        // 地图配置
        geo: {
            map: mapName,
            roam: true,
            center: viewConfig.center || [104.31, 35.58],
            zoom: viewConfig.zoom || 1.6,
            label: { 
                show: true, 
                fontSize: 10,
                fontFamily: 'Times New Roman, FZS, CaviarDreams, Pingfang, Pingfangjian',
                formatter: function(params) {
                    // 使用正则去掉常见的行政区划后缀
                    return params.name.replace(/省|市|盟|地区|自治区|特别行政区|壮族自治区|回族自治区|维吾尔自治区|藏族自治州|回族自治州|朝鲜族自治州|蒙古自治州|哈萨克自治州/g, '');
                }
            },
            itemStyle: {
                areaColor: '#ecf0f1e6',
                borderColor: '#666', // 省份大边界颜色：深
                borderWidth: 1.5     // 省份大边界粗细：粗
            },
            regions: regions, 
            emphasis: {
                itemStyle: { areaColor: '#f1b03fe6' }
            }
        },
        series: series
    };
}

function buildRegions(viewConfig) {
    const regions = [];

    if (viewConfig.cityNames) {
        viewConfig.cityNames.forEach(name => {
            regions.push({
                name: name,
                itemStyle: {
                    borderWidth: 1,    // 城市边界：细线
                    borderColor: '#bebebe'  // 城市边界颜色：淡灰色
                }
            });
        });
    }

    if (viewConfig.activeProvinceName) {
        const glow = viewConfig.activeProvinceBorderStyle === 'glow';
        regions.push({
            name: viewConfig.activeProvinceName + '_BORDERS',
            silent: true,                // 1. 解决遮挡：鼠标直接穿透，你能点到下面的城市
            label: { show: false },      // 2. 解决文本：彻底隐藏这个图层的文字，不显示 XXX_BORDERS
            itemStyle: {
                areaColor: 'rgba(0,0,0,0)', // 3. 解决颜色：完全透明，露出底下的城市颜色
                borderColor: glow ? '#FFD700' : '#444',
                borderWidth: glow ? 3 : 2.5,
                shadowColor: glow ? 'rgba(255, 215, 0, 0.8)' : undefined,
                shadowBlur: glow ? 20 : undefined,
                shadowOffsetX: glow ? 0 : undefined,
                shadowOffsetY: glow ? 0 : undefined,
                zlevel: 0   
            }
        });
    }

    return regions;
}

function buildTooltipFormatter(viewConfig) {
    const tooltipMode = viewConfig.mapTooltipMode || 'records';
    const recordStyle = viewConfig.recordTooltipStyle || 'compact';
    const recordScroll = viewConfig.recordTooltipScrollable || false;
    const recordScrollHeight = viewConfig.recordTooltipScrollHeight || 200;

    return function (params) {
        let res = '';
        // 城市点（足迹点）的提示
        if (params.seriesType === 'effectScatter') {
            res = `<div style="font-size: 16px; font-weight: bold; color: #171a24;">📍 ${params.name}</div>`;
            if (params.data && params.data.description) {
                res += `<div style="margin-top: 5px; color: #666; max-width: 200px; white-space: normal;">${params.data.description}</div>`;
            }
        }
        // 地图区域（省份/城市）的提示
        else if (params.seriesType === 'map') {
            if (tooltipMode === 'count') {
                const count = params.value || 0;
                res = `<div style="font-size: 16px; font-weight: bold;">${params.name}</div>`;
                if (count > 0) {
                    if (viewConfig.isProvinceLevel) {
                        res += `<div style="margin-top: 5px; color: #171a24;">共 ${count} 条记录</div>`;
                    } else {
                        res += `<div style="margin-top: 5px; color: #171a24;">共走过 ${count} 座城</div>`;
                    }
                } else {
                    res += `<div style="margin-top: 5px; color: #999;">暂无足迹</div>`;
                }
                return res;
            }

            return buildRecordTooltip(params, recordStyle, recordScroll, recordScrollHeight);
        }
        return res;
    };
}

function buildRecordTooltip(params, recordStyle, recordScroll, recordScrollHeight) {
    const data = params.data;
    const name = params.name;
    const records = data?.records || [];

    let res = `
        <div style="line-height: 1.2;">
            <div style="
                font-size: 13px; 
                font-weight: bold; 
                margin-bottom: 5px; 
                color: #333; 
                border-bottom: 1px solid #eee; 
                padding-bottom: 3px;
            ">
            ${name} (${records.length} 条记录)
        </div>
    `;

    if (records.length > 0) {
        if (recordScroll) {
            res += `<div style="max-height: ${recordScrollHeight}px; overflow-y: auto; padding-right: 5px;">`;
        }

        if (recordStyle === 'detailed') {
            records.forEach(rec => {
                res += `
                    <div style="margin-bottom: 10px; font-size: 13px;">
                        <div style="color: #666; font-weight: bold;">
                            <span style="color: #333;">📅 ${rec.date || '未知日期'}</span> 
                            <span style="margin-left: 8px; color: #171a24;">📍 ${rec.city}</span>
                        </div>
                        <div style="color: #444; margin-top: 2px; line-height: 1.4; background: #f9f9f9; padding: 4px; border-radius: 4px;">
                            ${rec.description || '无详细说明'}
                        </div>
                    </div>`;
            });
        } else {
            records.forEach((rec, index) => {
                res += `
                    <div style="margin-bottom: 6px; ${index !== 0 ? 'border-top: 1px dashed #f0f0f0; pt: 3px;' : ''}">
                        <div style="font-size: 11px; color: #888;">
                            <span>${rec.date || ''}</span>
                            <span style="margin-left: 5px; color: #555;">${rec.city}</span>
                        </div>
                        <div style="font-size: 11px; color: #222; margin-top: 1px; white-space: normal; max-width: 180px;">
                            <span>${rec.description || ''}</span>
                        </div>
                    </div>`;
            });
        }

        if (recordScroll) {
            res += `</div>`;
        }
    } else {
        res += `<div style="font-size: 11px; color: #999;">暂无足迹</div>`;
    }

    res += `</div>`;
    return res;
}

function buildSeries(pointData, heatData, viewConfig) {
    const series = [];
    const showPointSeries = viewConfig.showPointSeries === true;

    if (showPointSeries) {
        series.push({
            name: '足迹点',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: pointData,
            symbolSize: viewConfig.pointSymbolSize || 5,
            itemStyle: viewConfig.pointItemStyle || { color: '#fff', shadowBlur: 10 },
            zlevel: 3
        });
    }

    series.push({
        name: '热力图',
        type: 'map',
        geoIndex: 0,
        data: heatData,
        itemStyle: { borderWidth: 0 },
        zlevel: 2
    });

    return series;
}