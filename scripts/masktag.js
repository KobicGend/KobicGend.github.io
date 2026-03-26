/*
 * Mask Tag - v5 (Stable & Robust version)
 *
 * Description:
 * Uses a standard, non-inline function for event handling to ensure stability.
 * Injects the handler script only once per page.
 */
hexo.extend.tag.register('mask', (args, content) => {
  // --- 参数解析部分，保持不变 ---
  const colorArg = args.find(arg => arg.startsWith('color='));
  const color = colorArg ? colorArg.split('=')[1] : '#222';
  let renderedContent = hexo.render.renderSync({ text: content, engine: 'markdown' });
  renderedContent = renderedContent.replace(/^<p>/, '').replace(/<\/p>\s*$/, '');

  // --- 核心改动：定义一个标准的JS函数，并通过<script>标签注入 ---

  // 1. 定义我们的点击处理函数
  const script = `
    <script>
      if (!window.handleMaskClick) {
        window.handleMaskClick = function(el) {
          if (el.classList.contains('is-revealed')) {
            // 如果当前是“显示”状态，用户点击是为了“隐藏”
            el.classList.remove('is-revealed');
            el.classList.add('no-hover-effect');
            setTimeout(() => {
              el.classList.remove('no-hover-effect');
            }, 300); // 300ms 必须与 CSS 中的 transition 时间匹配
          } else {
            // 如果当前是“隐藏”状态，用户点击是为了“显示”
            el.classList.add('is-revealed');
          }
        };
      }
    </script>
  `;

  // 2. 创建将要输出的 span 元素，并让它调用上面定义的函数
  const span = `<span class="text-mask" style="--mask-color: ${color};" onclick="handleMaskClick(this)">${renderedContent}</span>`;

  // 3. 将脚本和 span 元素一起返回。脚本会被浏览器执行，span会被显示。
  return script + span;
}, { ends: true });