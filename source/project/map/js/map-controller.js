import { provinceMap } from './map-config.js';
import { getChartOption } from './map-core.js';
import { UIManager } from './ui-manager.js';

export class MapController {
    constructor(elementId, data) {
        this.chart = echarts.init(document.getElementById(elementId));
        this.data = data; // 包含 pointData, fullData, chinaJson
        this.currentLevel = 'china';
        this.initEvents();
    }

    // 初始状态
    renderChina() {
        this.currentLevel = 'china';
        echarts.registerMap('china', this.data.chinaJson);
        const option = getChartOption('china', this.data.pointData, this.data.fullData, {});
        UIManager.createTitleBar('足跡');
        this.chart.setOption(option, true);
    }

    // 【左键】下钻到省份
    async drillDown(params) {
        if (params.seriesType === 'effectScatter') {
            if (params.data?.url) window.open(params.data.url, '_blank');
            return;
        }

        const clickName = params.name;
        const fileName = provinceMap[clickName];
        if (!fileName) return;

        try {
            const currentOpt = this.chart.getOption();
            const provinceJson = await fetch(`/project/map/json/province/${fileName}.json`).then(res => res.json());
            const mixedJson = stitchMap(this.data.chinaJson, provinceJson, clickName);
            
            const mapName = `mixed-${fileName}`;
            echarts.registerMap(mapName, mixedJson);

            const newOption = getChartOption(mapName, this.data.pointData, this.data.fullData, {
                center: currentOpt.geo[0].center,
                zoom: currentOpt.geo[0].zoom,
                cityNames: provinceJson.features.map(f => f.properties.name),
                activeProvinceName: clickName,
                isProvinceLevel: true
            });
            UIManager.createTitleBar(`足跡·${clickName}`);

            this.chart.setOption(newOption, true);
            this.currentLevel = 'province';
        } catch (err) {
            console.error('下钻失败:', err);
        }
    }

    // 【右键】退出省份状态但保留视角
    exitProvinceKeepView() {
        if (this.currentLevel !== 'province') return;

        const currentOpt = this.chart.getOption();
        // 抓取当前的缩放和中心点
        const currentZoom = currentOpt.geo[0].zoom;
        const currentCenter = currentOpt.geo[0].center;

        this.currentLevel = 'china';
        const option = getChartOption('china', this.data.pointData, this.data.fullData, {
            center: currentCenter, // 保持位置
            zoom: currentZoom,     // 保持缩放
        });
        UIManager.createTitleBar('足跡');
        
        this.chart.setOption(option, true);
    }

    initEvents() {
        // 点击下钻
        this.chart.on('click', (params) => this.drillDown(params));

        // 右键返回
        this.chart.getZr().on('contextmenu', (e) => {
            e.event.preventDefault();  // 阻止默认右键菜单
            if (this.currentLevel === 'province') {
                this.exitProvinceKeepView();
            }
        });

        // 窗口大小变化时自适应变化
        window.addEventListener('resize', () => this.chart.resize());   
    }
}

// 输入：全国地图数据、某个省份的详细数据、要挖掉的省份名字
// 输出：一张拼接好的新地图数据
export function stitchMap(chinaJson, provinceJson, provinceName) {
    // 1. 过滤掉原省份，保留其他省份
    const otherProvinces = chinaJson.features.filter(f => f.properties.name !== provinceName);

    // 2. 核心：克隆一份原省份轮廓，专门用于画那圈“粗大边界”
    const provinceBoundary = JSON.parse(JSON.stringify(
        chinaJson.features.find(f => f.properties.name === provinceName)
    ));
    // 给它一个特殊的内部 ID，确保它不会匹配到任何足迹数据，也不会显示重复文字
    provinceBoundary.properties.name = provinceName + '_BORDERS'; 

    return {
        type: 'FeatureCollection',
        features: [
            ...otherProvinces,      // 其他省份的轮廓
            ...provinceJson.features, // 详细的城市轮廓
            provinceBoundary        // 将大边界放在最后，确保它画在最顶层
        ]
    };
}