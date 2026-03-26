/**
 * Hexo 系列文章导航插件
 * 功能：开头插入目录链接，末尾插入系列导航按钮
 */

hexo.extend.filter.register('before_post_render', function(data) {
  if (!data || !data.series) return data;

  const currentSeries = String(data.series).trim();
  const root = hexo.config.root || '/';

  // 1. 获取同系列文章并排序
  const allPosts = hexo.model('Post').find({}).toArray();
  const seriesPosts = allPosts.filter(p => {
    let s = p.series || (p.raw && p.raw.match(/^series:\s*(.+)$/im)?.[1]?.replace(/['"]/g, '').trim());
    return s && String(s).trim() === currentSeries;
  }).sort((a, b) => a.date - b.date);

  if (seriesPosts.length <= 1) return data;

  // 2. 定位当前文章
  const currentIndex = seriesPosts.findIndex(p => p.full_source === data.full_source);
  if (currentIndex === -1) return data;

  const prev = seriesPosts[currentIndex - 1];
  const next = seriesPosts[currentIndex + 1];

  // 4. 构造末尾导航按钮
  let navHtml = `\n\n{% btns circle center grid4 %}\n`;

  // 上一篇
  if (prev) {
    navHtml += `<a href='${root}${prev.path}'>\n`;
    navHtml += `<i class='fa fa-caret-left'></i>\n`;
    navHtml += `<b>上一篇</b>\n`;
    // navHtml += `{% span gray, ${prev.description} %}\n`;
    navHtml += `{% p gray, ${prev.title} %}\n`;
    navHtml += `</a>\n`;
  } else {
    navHtml += `<a href='javascript:void(0)'>\n`;
    navHtml += `<i class='fa fa-caret-left' style="color: gray;"></i>\n`;
    navHtml += `{% p gray, 上一篇 %}\n`;
    navHtml += `{% p gray, 暂无上一篇 %}\n`;
    navHtml += `</a>\n`;
  }

  navHtml += `<a href="../posts/547e5912.html">\n`;
  navHtml += `  <i class="fa fa-list"></i>\n`;
  navHtml += `  <b>返回目录</b>\n`;
  navHtml += `</a>`;
  navHtml += `<a href="../posts/11362926.html">\n`;
  navHtml += `  <i class="fa fa-info"></i>\n`;
  navHtml += `  <b>编辑说明</b>\n`;
  navHtml += `</a>\n`;

  // 下一篇
  if (next) {
    navHtml += `<a href='${root}${next.path}'>\n`;
    navHtml += `  <i class='fa fa-caret-right'></i>\n`;
    navHtml += `  <b>下一篇</b>\n`;
    navHtml += `  ${next.title}\n`;
    // navHtml += `  ${next.description || next.excerpt || '点击查看下一篇'}\n`;
    navHtml += `</a>\n`;
  } else {
    navHtml += `<a href='javascript:void(0)'>\n`;
    navHtml += `  <i class='fa fa-caret-right'></i>\n`;
    navHtml += `  <b>下一篇</b>\n`;
    navHtml += `  {% p gray, 暂无下一篇 %}\n`;
    // navHtml += `  <span class="gray">暂无下一篇</span>\n`;
    navHtml += `</a>\n`;
  }

  navHtml += '{% endbtns %}\n';

  if (data.series === '中外历史纲要') {
    let preHtml = `
<style>
  #web_bg {
    background-image: url("/img/stz.webp") !important;
  }
  /* 隱藏上下篇導航 */
  #pagination { display: none !important; }
  /* 隱藏相關推薦 */
  .relatedPosts { display: none !important; }
</style>

<font face="Kai">这是一本关于an ordinary senior high school student的日记
命曰《中外历史纲要》
是系列作品《学校里の那丝事儿》的续集
</font>
    `;

    data.content = preHtml + navHtml + `\n\n以下正文\n\n---\n\n` + data.content;
    data.content += `\n\n---\n\n` + navHtml;
  }


  return data;
});