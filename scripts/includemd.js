const fs = require('fs');
const path = require('path');

function stripOuterPairs(str) {
    str = str.trim();
    
    const pairs = {
        '"': '"',
        "'": "'",
        '[': ']'
    };
    while (str.length >= 2 && pairs[str[0]] === str[str.length - 1]) {
        str = str.slice(1, -1).trim(); 
    }
    
    return str;
}

hexo.extend.tag.register('includemd', function(args) {
    try {
        const targetFile = `${stripOuterPairs(args[0])}.md`;
        const filePath = path.join(hexo.source_dir, "_posts", targetFile);

        if (!fs.existsSync(filePath)) {
            return `<div style="color:red; font-weight:bold;">⚠️ 文件引入失败: 找不到文件 ${filePath}</div>`;
        }

        let content = fs.readFileSync(filePath, 'utf8');

        // 提取标题
        const titleMatch = content.match(/^title:\s*(.*)$/m);
        let foldTitle = '点击展开查看';
        if (titleMatch && titleMatch[1]) {
            foldTitle = titleMatch[1].trim().replace(/^["']|["']$/g, '');
        }

        // 剥离 Front Matter
        if (content.startsWith('---')) {
            content = content.replace(/^---[\s\S]+?\r?\n---/, '');
        }

        // 渲染 Markdown 为 HTML
        const renderedContent = hexo.render.renderSync({ text: content, engine: 'markdown' });

        return `<details class="folding-tag"><summary> ${foldTitle} </summary><div class="content">${renderedContent}</div></details>`;

    } catch (err) {
        return `<div style="color:red; font-weight:bold;">⚠️ includemd 插件运行崩溃: ${err.message}</div>`;
    }
});