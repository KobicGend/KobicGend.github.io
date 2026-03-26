---
title: 《中外历史纲要》目錄
description: '《中外历史纲要》目錄'
tags:
  - 中外历史纲要
categories:
  - - 日記
    - 高中回憶
abbrlink: '547e5912'
date: 2024-03-28 13:25:00
updated: 2024-03-28 13:25:00
series: 中外历史纲要
cover: /img/stz.webp
top_img: false
---

<style>
.directory-container {
  width: 100%;
  margin: 20px 0;
  font-family: system-ui, -apple-system, sans-serif;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}

.directory-container details {
  margin-bottom: 0;
}

.directory-container summary {
  list-style: none;
  display: flex;
  align-items: center;
  padding: 0px 16px;
  cursor: pointer;
  background: transparent;
  transition: background 0.2s;
  user-select: none;
  border: none;
  border-bottom: 1px solid #e5e7eb;
  border-radius: 0;
}

.directory-container details:last-child summary {
  border-bottom: none;
}

.directory-container summary::-webkit-details-marker {
  display: none;
}

.directory-container summary:hover {
  background: rgba(240, 244, 255, 0.5);
}

.directory-container .title {
  font-weight: 700;
  color: #1f2937;
  font-size: 18px;
}

.directory-container .icon {
  margin-right: 10px;
  font-size: 12px;
  transition: transform 0.3s ease, color 0.3s ease;
  color: #9ca3af;
  display: inline-block;
  visibility: hidden;
}

.directory-container details[open] .icon {
  transform: rotate(90deg);
  color: #3b82f6;
}

.directory-container details > :not(summary) {
  display: block !important;
}

.directory-container .content {
  background: transparent;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease-out;
}

.directory-container ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.directory-container li {
  padding: 0;
  margin: 0;
}

.directory-container li a {
  display: block;
  padding: 0 14px;
  padding-left: 40px;
  text-decoration: none;
  color: #4b5563;
  font-size: 14px;
  transition: all 0.2s;
  background: white;
  border: none;
  border-radius: 0;
}

.directory-container details:last-child li:last-child a {
  border-bottom: none;
}

.directory-container li a:hover {
  color: #3b82f6;
  background: #f0f4ff;
}

.directory-container .sub-item {
  margin-bottom: 0;
}

.directory-container .sub-item summary {
  list-style: none;
  padding: 0px 16px 0px 36px;
  cursor: pointer;
  background: transparent;
  transition: background 0.2s;
  user-select: none;
  border: none;
  border-radius: 0;
  font-size: 14px;
  color: #4b5563;
  margin-left: 0;
}

.directory-container .sub-item summary:hover {
  background: rgba(240, 244, 255, 0.8);
  color: #3b82f6;
}
</style>

<script>
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.directory-container > details').forEach(detail => {
    const summary = detail.querySelector('summary');
    const content = detail.querySelector('.content');
    if (!content || !summary) return;
    
    let isAnimating = false; // 防止用户狂点导致动画错乱

    // 1. 初始化默认展开的元素
    if (detail.hasAttribute('open')) {
      content.style.maxHeight = 'none'; 
    }

    // 2. 监听 summary 的点击事件并接管默认行为
    summary.addEventListener('click', (e) => {
      e.preventDefault(); // 阻止浏览器瞬间开闭的默认行为
      if (isAnimating) return; // 如果正在动画中，则忽略点击

      if (detail.open) {
        // ========== 关闭动作 ==========
        isAnimating = true;
        
        // 先将 maxHeight 设为具体数值（当前实际高度），作为动画起点
        content.style.maxHeight = content.scrollHeight + 'px';
        
        // 触发浏览器重排 (Reflow)，强制应用上面的 maxHeight
        void content.offsetHeight; 
        
        // 设置目标值为 0
        content.style.maxHeight = '0px';
        
        // 监听动画结束
        content.addEventListener('transitionend', function handler(e) {
          if (e.propertyName === 'max-height') {
            detail.removeAttribute('open'); // 动画彻底结束后才隐藏 DOM
            isAnimating = false;
            content.removeEventListener('transitionend', handler);
          }
        });

      } else {
        // ========== 展开动作 ==========
        isAnimating = true;
        
        // 先添加 open 属性，让内容在 DOM 中渲染出来
        detail.setAttribute('open', '');
        
        // 设置动画起点为 0
        content.style.maxHeight = '0px';
        
        // 触发重排
        void content.offsetHeight;
        
        // 设置目标值为内部内容的实际高度
        content.style.maxHeight = content.scrollHeight + 'px';
        
        // 动画结束后的清理工作
        content.addEventListener('transitionend', function handler(e) {
          if (e.propertyName === 'max-height') {
            // 设为 none 可以防止子菜单继续展开时被父级的固定高度截断
            content.style.maxHeight = 'none'; 
            isAnimating = false;
            content.removeEventListener('transitionend', handler);
          }
        });
      }
    });
  });
});
</script>

#  高中回憶之《中外历史纲要》

<div class="directory-container">
  <details>
    <summary>
      <span class="icon">▶</span>
      <h2>庚子第一　前</h2>
    </summary>
    <div class="content">
      <details class="sub-item">
        <summary><a href="../posts/b29f922a.html">《中外历史纲要》（一）</a></summary>
      </details>
    </div>
  </details><details>
    <summary>
      <span class="icon">▶</span>
      <h2>庚子第二　高壹肆班（一）</h2>
    </summary>
    <div class="content">
      <details class="sub-item">
        <summary><a href="../posts/82897ef2.html">《中外历史纲要》（二）</a></summary>
      </details>
    </div>
  </details><details>
    <summary>
      <span class="icon">▶</span>
      <h2>庚子第三　高壹肆班（二）</h2>
    </summary>
    <div class="content">
      <details class="sub-item">
        <summary><a href="../posts/cf97dda0.html">《中外历史纲要》（三）</a></summary>
      </details>
    </div>
  </details><details>
    <summary>
      <span class="icon">▶</span>
      <h2>辛丑第四　高壹肆班（三）</h2>
    </summary>
    <div class="content">
      <details class="sub-item">
        <summary><a href="../posts/a4bf5d90.html">《中外历史纲要》（四）</a></summary>
      </details>
    </div>
  </details><details>
    <summary>
      <span class="icon">▶</span>
      <h2>辛丑第五　高壹肆班（四）走班</h2>
    </summary>
    <div class="content">
      <details class="sub-item">
        <summary><a href="../posts/cb2198d7.html">《中外历史纲要》（五）</a></summary>
      </details>
    </div>
  </details><details>
    <summary>
      <span class="icon">▶</span>
      <h2>辛丑第六　分班·竞赛</h2>
    </summary>
    <div class="content">
      <details class="sub-item">
        <summary><a href="../posts/722a4a5b.html">《中外历史纲要》（六）</a></summary>
      </details>
    </div>
  </details><details>
    <summary>
      <span class="icon">▶</span>
      <h2>辛丑第七　校园文化节</h2>
    </summary>
    <div class="content">
      <details class="sub-item">
        <summary><h3>late November</h3></summary>
      </details>
      <details class="sub-item">
        <summary><a href="../posts/7c2fa491.html">《中外历史纲要》（七）</a></summary>
      </details>
      <details class="sub-item">
        <summary><h3>序Ⅱ</h3></summary>
      </details>
      <details class="sub-item">
        <summary><a href="../posts/8b448cd2.html">《中外历史纲要》（八）</a></summary>
      </details>
      <details class="sub-item">
        <summary><h3>Week18</h3></summary>
      </details>
      <details class="sub-item">
        <summary><a href="../posts/f189ad8d.html">《中外历史纲要》（九）</a></summary>
      </details>
    </div>
  </details><details>
    <summary>
      <span class="icon">▶</span>
      <h2>辛丑第八　挂科危机　模考临近</h2>
    </summary>
    <div class="content">
      <details class="sub-item">
        <summary><h3>Week19</h3></summary>
      </details>
      <details class="sub-item">
        <summary><a href="../posts/74bb8849.html">《中外历史纲要》（十）</a></summary>
      </details>
      <details class="sub-item">
        <summary><h3>Week20</h3></summary>
      </details>
      <details class="sub-item">
        <summary><a href="../posts/b306434a.html">《中外历史纲要》（十一）</a></summary>
      </details>
      <details class="sub-item">
        <summary><h3>Week21</h3></summary>
      </details>
      <details class="sub-item">
        <summary><a href="../posts/8310af92.html">《中外历史纲要》（十二）</a></summary>
      </details>
      <details class="sub-item">
        <summary><h3>Week22</h3></summary>
      </details>
      <details class="sub-item">
        <summary><a href="../posts/74bb8949.html">《中外历史纲要》（十三）</a></summary>
      </details>
      <details class="sub-item">
        <summary><h3>Week23, Week24</h3></summary>
      </details>
      <details class="sub-item">
        <summary><a href="../posts/792315a5.html">《中外历史纲要》（十四）</a></summary>
      </details>
    </div>
  </details><details>
    <summary>
      <span class="icon">▶</span>
      <h2>辛丑第九　压迫与反抗</h2>
    </summary>
    <div class="content">
    </div>
  </details><details>
    <summary>
      <span class="icon">▶</span>
      <h2>壬寅第十　变</h2>
    </summary>
    <div class="content">
    </div>
  </details><details>
    <summary>
      <span class="icon">▶</span>
      <h2>壬寅第十一　以假期为模</h2>
    </summary>
    <div class="content">
    </div>
  </details><details>
    <summary>
      <span class="icon">▶</span>
      <h2>壬寅第十二　暑期文化夏令营</h2>
    </summary>
    <div class="content">
    </div>
  </details><details>
    <summary>
      <span class="icon">▶</span>
      <h2>壬寅第十三　高三年级办公室</h2>
    </summary>
    <div class="content">
    </div>
  </details><details>
    <summary>
      <span class="icon">▶</span>
      <h2>壬寅第十四　百廿华诞</h2>
    </summary>
    <div class="content">
    </div>
  </details><details>
    <summary>
      <span class="icon">▶</span>
      <h2>壬寅第十五　跌宕起伏（上）</h2>
    </summary>
    <div class="content">
    </div>
  </details><details>
    <summary>
      <span class="icon">▶</span>
      <h2>壬寅第十六　跌宕起伏（中）</h2>
    </summary>
    <div class="content">
    </div>
  </details><details>
    <summary>
      <span class="icon">▶</span>
      <h2>壬寅第十七　跌宕起伏（下）</h2>
    </summary>
    <div class="content">
    </div>
  </details><details>
    <summary>
      <span class="icon">▶</span>
      <h2>癸卯第十八　限时即现实</h2>
    </summary>
    <div class="content">
    </div>
  </details><details>
    <summary>
      <span class="icon">▶</span>
      <h2>癸卯第十九　倒 计 时</h2>
    </summary>
    <div class="content">
    </div>
  </details><details>
    <summary>
      <span class="icon">▶</span>
      <h2>癸卯第二十　高　考</h2>
    </summary>
    <div class="content">
    </div>
  </details><details>
    <summary>
      <span class="icon">▶</span>
      <h2>副章</h2>
    </summary>
    <div class="content">
    </div>
  </details><details>
    <summary>
      <span class="icon">▶</span>
      <h2>终章　毕业快乐</h2>
    </summary>
    <div class="content">
    </div>
  </details><details>
    <summary>
      <span class="icon">▶</span>
      <h2>附录</h2>
    </summary>
    <div class="content">
    </div>
  </details>
</div>