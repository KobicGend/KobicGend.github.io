import { DataLoader } from './data-loader.js';
import { MapController } from './map-controller.js';
import { UIManager } from './ui-manager.js';

async function bootstrap() {
    try {
        // 加载数据
        const loader = new DataLoader();
        const mapData = await loader.init();

        // 初始化 UI 管理器，绑定容器
        UIManager.init(document.getElementById('footprint').parentElement);

        // 初始化地图控制器
        const controller = new MapController('footprint', mapData);

        // 创建重置按钮
        UIManager.createResetButton(() => {
            controller.renderChina();
        });
        
        // 首次加载渲染
        controller.renderChina();
    } catch (err) {
        console.error('🚀 启动失败:', err);
    }
}

bootstrap();