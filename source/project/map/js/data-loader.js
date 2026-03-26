import { provinceMap } from './map-config.js';

export class DataLoader {
    constructor() {
        this.cityIndex = {};
        this.chinaJson = null;
        this.pointData = null;
        this.fullData = null;
    }

    async init() {
        // 加载基础数据
        const [rawFootprintText, chinaJson] = await Promise.all([
            fetch('/project/map/data.csv').then(res => res.text()),
            fetch('/project/map/json/china.json').then(res => res.json())
        ]);

        const rawFootprint = parseCsv(rawFootprintText);

        this.chinaJson = chinaJson;
        
        // 加载省份 JSON 并构建城市索引 return 城市：省份+经纬度
        await Promise.all(
            Object.entries(provinceMap).map(async ([provinceName, file]) => {
                try {
                    const response = await fetch(`/project/map/json/province/${file}.json`);
                    if (!response.ok) return;

                    const { features } = await response.json();

                    if (Array.isArray(features)) {
                        for (const { properties } of features) {
                            const { name, center: coord } = properties;
                            if (name && coord) {
                                this.cityIndex[name] = { 
                                    province: provinceName, 
                                    coord 
                                };
                            }
                        }
                    }
                } catch (error) {
                    console.warn(`⚠️ 加载省份 ${provinceName} 数据失败:`, error);
                }
            })
        );

        // 补全经纬度并统计数据
        this.pointData = enrichDataWithCoords(rawFootprint, this.cityIndex);
        const provinceCounts = getCounts(this.pointData, 'province');
        const cityCounts = getCounts(this.pointData, 'city');
        this.fullData = [...provinceCounts, ...cityCounts];

        return { 
            chinaJson: this.chinaJson, 
            pointData: this.pointData, 
            fullData: this.fullData 
        };
    }
}

// 补全经纬度
function enrichDataWithCoords(footprintData, cityIndex) {
    return footprintData.map(item => {
        const cityName = item.city;
        const info = cityIndex[cityName];

        if (info) {
            return {
                ...item,
                province: info.province,  // 【自动归属】：苏州市 -> 江苏省
                value: item.coord || info.coord  // 【自动定位】
            };
        } else {
            console.warn(`⚠️ 无法识别城市: ${cityName}`);
            return item;
        }
    });
}

// 统计次数
function getCounts(data, keyType) {
    const counts = {};
    
    data.forEach(item => {
        // 定义直辖市列表
        const municipalities = ['北京市', '上海市', '天津市', '重庆市'];

        // 如果是 city 类型且省份属于直辖市，则跳过
        if (keyType === 'city' && municipalities.includes(item.province)) {
            return; 
        }

        const name = keyType === 'city' ? item.city : item.province;
        
        if (name) {
            if (!counts[name]) {
                counts[name] = {
                    value: 0,
                    records: []
                };
            }
            counts[name].value += 1;
            counts[name].records.push(item);
        } else {
            console.warn(`⚠️ 无法识别 ${keyType}:`, item);
        }
    });

    // 格式化
    return Object.keys(counts).map(k => ({
        name: k,
        value: counts[k].value,
        records: counts[k].records.sort((a, b) => new Date(b.date) - new Date(a.date)) // 按时间倒序
    }));
}

/**
 * 零依赖 CSV 解析器
 * 支持：双引号转义、换行符处理、BOM 处理、自动转对象
 */
function parseCsv(text) {
    if (!text) return [];

    try {
        // 1. 处理 BOM (UTF-8)
        let cleanText = text.replace(/^\uFEFF/, '');

        // 2. CSV 行/列解析逻辑 (处理引号内包含逗号或换行的情况)
        const result = [];
        let row = [];
        let field = '';
        let inQuotes = false;

        // 统一换行符
        cleanText = cleanText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

        for (let i = 0; i < cleanText.length; i++) {
            const char = cleanText[i];
            const nextChar = cleanText[i + 1];

            if (inQuotes) {
                if (char === '"' && nextChar === '"') {
                    // 处理双引号转义 "" -> "
                    field += '"';
                    i++;
                } else if (char === '"') {
                    // 引号结束
                    inQuotes = false;
                } else {
                    field += char;
                }
            } else {
                if (char === '"') {
                    // 引号开始
                    inQuotes = true;
                } else if (char === ',') {
                    // 字段分隔
                    row.push(field.trim());
                    field = '';
                } else if (char === '\n') {
                    // 行结束
                    row.push(field.trim());
                    if (row.some(f => f !== '')) result.push(row); // skip_empty_lines
                    row = [];
                    field = '';
                } else {
                    field += char;
                }
            }
        }

        // 处理最后一行（如果没有以换行符结尾）
        if (field || row.length > 0) {
            row.push(field.trim());
            if (row.some(f => f !== '')) result.push(row);
        }

        if (result.length === 0) return [];

        // 3. 模拟 columns: true (将第一行作为 Key)
        const headers = result.shift().map(header => header.trim());
        
        return result.map(values => {
            const obj = {};
            headers.forEach((key, index) => {
                // cast: false，直接保持字符串
                obj[key] = values[index] !== undefined ? values[index] : '';
            });
            return obj;
        });

    } catch (error) {
        console.error('⚠️ CSV 解析失败:', error.message);
        return [];
    }
}