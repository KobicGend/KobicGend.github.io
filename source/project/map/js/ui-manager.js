export class UIManager {
    static #container = null; // 私有静态变量，用来存储缓存的容器

    // 初始化时绑定容器
    static init(containerElement) {
        if (!containerElement) return;
        this.#container = containerElement;
        
        if (getComputedStyle(this.#container).position === 'static') {
            this.#container.style.position = 'relative';
        }
    }

    static createTitleBar(title = '控制面板') {
        let header = this.#container.querySelector('#map-title-header');
        if (header) {
            // 如果已经存在，只更新内部的 h1 文字
            const existingTitle = header.querySelector('h1');
            if (existingTitle) existingTitle.innerHTML = title;
            return header; 
        }

        // 创建标题栏容器
        header = document.createElement('div');
        header.id = 'map-title-header';

        Object.assign(header.style, {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '70px',
            display: 'flex',
            // alignItems: 'center',
            // justifyContent: 'center',
            zIndex: '99',
            pointerEvents: 'none' // 容器穿透，不影响下方操作
        });

        // 创建标题文本
        const titleEl = document.createElement('h1');
        titleEl.innerHTML = title;

        Object.assign(titleEl.style, {
            // padding: '0px 36px',          // 撑开背景，使其比文字大一圈
            // backgroundColor: 'rgba(255, 255, 255, 0.15)', // 浅浅的半透明白色
            // backdropFilter: 'blur(10px)', // 磨砂玻璃效果
            // borderRadius: '12px',         // 圆角
            // border: '1px solid rgba(255, 255, 255, 0.2)', // 极细的边框增加精致感
            color: '#fff',                // 字体颜色
            fontSize: '36px',             // 字体大小
            margin: '0',                  // 移除默认外边距
            // boxShadow: '0 4px 15px rgba(0,0,0,0.1)', // 淡淡的投影
            // pointerEvents: 'auto'         // 如果标题需要点击，可开启
        });

        header.appendChild(titleEl);
        this.#container.appendChild(header);

        return header;
    }

    static createResetButton(onClick) {

        // 创建按钮元素
        let btn = this.#container.querySelector('#map-reset-btn');
        if (btn) return btn;
        this.#container.style.position = 'relative';  
        btn = document.createElement('button');
        btn.id = 'map-reset-btn';
        
        btn.innerHTML = '🏠 重置視角';
        
        Object.assign(btn.style, {
            position: 'absolute',
            top: '30px',
            right: '30px',
            zIndex: '100',
            padding: '10px 18px',
            background: '#fff',
            border: '1px solid #171a24',
            borderRadius: '4px',
            cursor: 'pointer',
            // fontFamily: 'serif',
            // fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',

            // 玻璃质感设计
            backgroundColor: 'rgba(255, 255, 255, 0.25)', // 半透明白色背景
            backdropFilter: 'blur(20px) saturate(180%)',  // 20px 模糊 + 180% 色彩饱和提升
            webkitBackdropFilter: 'blur(20px) saturate(180%)', // 兼容 Safari

            border: '1px solid rgba(255, 255, 255, 0.3)', // 极细的半透明边框，模拟玻璃边缘
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',     // 更柔和、范围更大的投影
            color: '#1d1d1f',                             // iOS 经典的深灰色文字
            transition: 'all 0.3s ease'                   // 添加交互动画
        });
        
        // 鼠标交互效果：轻微放大
        btn.onmouseenter = () => btn.style.transform = 'scale(1.05)';
        btn.onmouseleave = () => btn.style.transform = 'scale(1)';

        // 点击事件
        btn.addEventListener('click', onClick);

        // 将按钮添加到父元素中
        this.#container.appendChild(btn);

        return btn;
    }
}