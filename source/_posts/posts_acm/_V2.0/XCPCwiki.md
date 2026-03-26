---
title: "ℕ𝕠𝕥𝕖𝕤｜筆記本 - ACM 2.0"
tags:
  - 算法
  - 筆記
  - ACM
categories:
  - - 筆記
    - XCPCwiki
abbrlink: e7eea71f
hide: true
aside: false
date: 2025-01-24 22:05:00
updated: 2025-01-24 22:05:00
description:
---

2025 年 1 月 24 日版


<div class="category-navigation">
  <div class="main-categories">
    <button class="category-btn" data-category="basic-algorithm">基础算法</button>
    <button class="category-btn" data-category="data-structure">数据结构</button>
    <button class="category-btn" data-category="graph">图论</button>
    <button class="category-btn" data-category="tree">图论 - 树</button>
    <button class="category-btn" data-category="geometry">计算几何</button>
    <button class="category-btn" data-category="math">数学</button>
    <button class="category-btn" data-category="string">字符串</button>
    <button class="category-btn" data-category="solution">题解</button>
    <button class="category-btn" data-category="tools">快读</button>
  </div>
  
  <div class="sub-categories" style="display: none;">
    <!-- 子分类将通过 JavaScript 动态加载 -->
  </div>
  
  <div class="article-list" style="display: none;">
    <!-- 文章列表将通过 JavaScript 动态加载 -->
  </div>
</div>

<style>
.category-navigation {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
}

.main-categories {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.category-btn {
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  background-color: #f0f0f0;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 100px;
  text-align: center;
  user-select: none;
}

.category-btn:hover {
  background-color: #e0e0e0;
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.category-btn.active {
  background-color: #007bff;
  color: white;
  box-shadow: 0 2px 4px rgba(0,123,255,0.3);
}

.sub-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin-bottom: 30px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.sub-category-btn {
  padding: 8px 16px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 80px;
  text-align: center;
  user-select: none;
}

.sub-category-btn:hover {
  background-color: #f5f5f5;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.sub-category-btn.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
  box-shadow: 0 2px 4px rgba(0,123,255,0.3);
}

.article-list {
  display: grid;
  gap: 15px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 8px;
  width: 100%;
  margin: 0 auto;
}

.article-item {
  padding: 30px;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: white;
  margin-bottom: 20px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.article-item:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

.article-item h3 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 24px;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
  word-wrap: break-word;
  width: 80%;
}

.article-item p {
  margin: 0;
  color: #666;
}

/* 文章页面顶部的分类导航样式 */
.article-category-nav {
  position: sticky;
  top: 0;
  background: white;
  padding: 15px;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.article-category-nav .main-categories {
  margin-bottom: 15px;
}

.article-category-nav .sub-categories {
  margin-bottom: 0;
}

/* 文章分类信息样式 */
.article-category {
  display: none;
}

.article-content {
  color: #333;
  font-size: 16px;
  line-height: 1.6;
  margin: 15px 0;
  width: 80%;
  overflow-x: auto;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.article-content * {
  max-width: 100%;
  box-sizing: border-box;
}

.article-content pre {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 5px;
  overflow-x: auto;
  width: 100%;
  margin: 10px 0;
  font-family: Consolas, Monaco, 'Andale Mono', monospace;
  font-size: 14px;
  line-height: 1.5;
  white-space: pre;
  word-wrap: normal;
}

.article-content pre code {
  display: block;
  width: 100%;
  overflow-x: auto;
  padding: 0;
  background: none;
  border-radius: 0;
}

.article-content code {
  font-family: Consolas, Monaco, 'Andale Mono', monospace;
  background-color: #f5f5f5;
  padding: 2px 4px;
  border-radius: 3px;
  word-break: break-word;
  font-size: 14px;
}

.article-content .hljs {
  background: #f5f5f5;
  padding: 0;
  border-radius: 5px;
  width: 100%;
}

.article-content p {
  margin: 10px 0;
  word-wrap: break-word;
}

.article-content h1, 
.article-content h2, 
.article-content h3, 
.article-content h4, 
.article-content h5, 
.article-content h6 {
  margin: 20px 0 10px 0;
  color: #222;
  word-wrap: break-word;
}

.article-content img {
  max-width: 100%;
  height: auto;
  margin: 10px 0;
}

.article-content blockquote {
  border-left: 4px solid #ddd;
  margin: 10px 0;
  padding: 10px 20px;
  background-color: #f9f9f9;
  width: 100%;
  overflow-x: auto;
}

.article-content table {
  border-collapse: collapse;
  width: 100%;
  margin: 15px 0;
  overflow-x: auto;
  display: block;
}

.article-content th,
.article-content td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  word-break: break-word;
}

.article-content th {
  background-color: #f5f5f5;
}

.article-category {
  color: #999;
  font-size: 12px;
  margin: 5px 0 0 0;
  width: 80%;
}

@media screen and (max-width: 768px) {
  .category-navigation {
    width: 100%;
    padding: 10px;
  }

  .article-list {
    width: 100%;
  }

  .article-content {
    width: 95%;
    padding: 15px;
  }

  .article-item {
    padding: 20px;
  }

  .article-item h3 {
    font-size: 20px;
    width: 95%;
  }

  .article-category {
    width: 95%;
  }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const mainCategories = document.querySelector('.main-categories');
  const subCategories = document.querySelector('.sub-categories');
  const articleList = document.querySelector('.article-list');
  
  // 分类数据
  const categoryData = {
    'basic-algorithm': {
      name: '基础算法',
      subCategories: {
        'binary-search': {
          name: '二分、分治',
          articles: [
            { title: '二分、分治', url: '/posts/e2f75bb0.html' }
          ]
        },
        'prefix-sum': {
          name: '前缀和与差分',
          articles: [
            { title: '前缀和与差分', url: '/posts/edd9903d.html' }
          ]
        },
        'two-pointers': {
          name: '双指针',
          articles: [
            { title: '双指针', url: '/posts/50daa1f3.html' }
          ]
        },
        'search-enum': {
          name: '搜索、枚举',
          articles: [
            { title: '搜索、枚举', url: '/posts/93223a96.html' }
          ]
        },
        'greedy': {
          name: '贪心',
          articles: [
            { title: '贪心', url: '/posts/b204b036.html' }
          ]
        },
        'simulation': {
          name: '模拟',
          articles: [
            { title: '模拟', url: '/posts/57723d25.html' }
          ]
        },
        'bitmask': {
          name: '位运算',
          articles: [
            { title: '位运算', url: '/posts/f76a2448.html' }
          ]
        },
        'stl': {
          name: 'STL',
          articles: [
            { title: 'STL', url: '/posts/45827ca4.html' }
          ]
        }
      }
    },
    'data-structure': {
      name: '数据结构',
      subCategories: {
        'interval-info': {
          name: '区间信息',
          articles: [
            { title: '区间信息', url: '/posts/935ec80a.html' }
          ]
        },
        'dsu': {
          name: '并查集',
          articles: [
            { title: '并查集', url: '/posts/3ef02b0.html' }
          ]
        }
      }
    },
    'graph': {
      name: '图论',
      subCategories: {
        'graph-theory': {
          name: '图论技巧集',
          articles: [
            { title: '图论技巧集', url: '/posts/bfa646a6.html' }
          ]
        },
        'modeling': {
          name: '建模',
          articles: [
            { title: '建模', url: '/posts/e76188d.html' }
          ]
        },
        'network-flow': {
          name: '网络流',
          articles: [
            { title: '网络流', url: '/posts/48cd0a2a.html' }
          ]
        },
        'network-flow-24': {
          name: '网络流24题',
          articles: [
            { title: '网络流24题', url: '/posts/e3474ae0.html' }
          ]
        },
        'shortest-path': {
          name: '最短路',
          articles: [
            { title: '最短路', url: '/posts/70031b2f.html' }
          ]
        },
        'mst': {
          name: '最小生成树',
          articles: [
            { title: '最小生成树', url: '/posts/72989097.html' }
          ]
        },
        'bipartite': {
          name: '二分图',
          articles: [
            { title: '二分图', url: '/posts/3df4fa8c.html' }
          ]
        },
        'dag': {
          name: '有向无环图',
          articles: [
            { title: '有向无环图', url: '/posts/36c1b3ce.html' }
          ]
        },
        'euler': {
          name: '欧拉图',
          articles: [
            { title: '欧拉图', url: '/posts/4e32aba2.html' }
          ]
        },
        'pseudotree': {
          name: '基环树',
          articles: [
            { title: '基环树', url: '/posts/19a2d849.html' }
          ]
        },
        'biconnected': {
          name: '双连通分量',
          articles: [
            { title: '双连通分量', url: '/posts/be2ba6bf.html' }
          ]
        },
        '2sat': {
          name: '2-Sat',
          articles: [
            { title: '2-Sat', url: '/posts/5c90a9e2.html' }
          ]
        }
      }
    },
    'tree': {
      name: '图论 - 树',
      subCategories: {
        'tree-01': {
          name: '树 01 - 树基础',
          articles: [
            { title: '树 01 - 树基础', url: '/posts/e2749618.html' }
          ]
        },
        'tree-02': {
          name: '树 02 - 树形 DP',
          articles: [
            { title: '树 02 - 树形 DP', url: '/posts/4028ac7a.html' }
          ]
        },
        'tree-03': {
          name: '树 03 - 树直径',
          articles: [
            { title: '树 03 - 树直径', url: '/posts/130c4d42.html' }
          ]
        },
        'tree-04': {
          name: '树 04 - 树的重心剖分、点分治',
          articles: [
            { title: '树 04 - 树的重心剖分、点分治', url: '/posts/6328d3.html' }
          ]
        },
        'tree-05': {
          name: '树 05 - 树的重链剖分、树上启发式合并',
          articles: [
            { title: '树 05 - 树的重链剖分、树上启发式合并', url: '/posts/572f3565.html' }
          ]
        },
        'tree-06': {
          name: '树 06 - 树与线段树合并',
          articles: [
            { title: '树 06 - 树与线段树合并', url: '/posts/6974ef5a.html' }
          ]
        },
        'tree-07': {
          name: '树 07 - 树 Hash',
          articles: [
            { title: '树 07 - 树 Hash', url: '/posts/c084d0df.html' }
          ]
        },
        'tree-problems': {
          name: '树习题集',
          articles: [
            { title: '树习题集', url: '/posts/1d7026f.html' }
          ]
        }
      }
    },
    'geometry': {
      name: '计算几何',
      subCategories: {
        'computational-geometry': {
          name: '计算几何',
          articles: [
            { title: '计算几何', url: '/posts/f490068c.html' }
          ]
        }
      }
    },
    'math': {
      name: '数学',
      subCategories: {
        'mathematics': {
          name: '数学',
          articles: [
            { title: '数学', url: '/posts/78fbc49d.html' }
          ]
        },
        'combinatorics': {
          name: '组合数学',
          articles: [
            { title: '组合数学', url: '/posts/e78b44ad.html' }
          ]
        },
        'prime': {
          name: '质数与约数',
          articles: [
            { title: '质数与约数', url: '/posts/d742f422.html' }
          ]
        },
        'sequence': {
          name: '数列',
          articles: [
            { title: '数列', url: '/posts/c1d61440.html' }
          ]
        },
        'game-theory': {
          name: '博弈论',
          articles: [
            { title: '博弈论', url: '/posts/d3c1974c.html' }
          ]
        }
      }
    },
    'string': {
      name: '字符串',
      subCategories: {
        'string-00': {
          name: '字符串基础',
          articles: [
            { title: '字符串 00 - 字符串基础', url: '/posts/2c473577.html' }
          ]
        },
        'string-01': {
          name: '字符串匹配',
          articles: [
            { title: '字符串 01 - 字符串匹配 Pattern Searching', url: '/posts/7cc41661.html' }
          ]
        },
        'string-02': {
          name: '字符串哈希',
          articles: [
            { title: '字符串 02 - 字符串哈希', url: '/posts/5613dff0.html' }
          ]
        },
        'string-03': {
          name: '字典树',
          articles: [
            { title: '字符串 03 - 字典树', url: '/posts/21b20250.html' }
          ]
        },
        'string-04': {
          name: '后缀数组、后缀自动机',
          articles: [
            { title: '字符串 04 - 后缀数组、后缀自动机', url: '/posts/aff549ad.html' }
          ]
        },
        'string-05': {
          name: '回文串',
          articles: [
            { title: '字符串 05 - 回文串', url: '/posts/7d0988ea.html' }
          ]
        }
      }
    },
    'solution': {
      name: '题解',
      subCategories: {
        'python': {
          name: 'Python',
          articles: [
            { title: 'Python', url: '/posts/25fd10e7.html' }
          ]
        },
        'interactive': {
          name: '交互',
          articles: [
            { title: '交互', url: '/posts/8c2c079f.html' }
          ]
        },
        'construction': {
          name: '构造',
          articles: [
            { title: '构造', url: '/posts/b0319cc4.html' }
          ]
        }
      }
    },
    'tools': {
      name: '快读',
      subCategories: {
        'fast-io': {
          name: '快读',
          articles: [
            { title: '快读', url: '/posts/abeecc00.html' }
          ]
        }
      }
    }
  };

  // 初始化事件监听
  function initEventListeners() {
    // 处理主分类点击
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const category = this.dataset.category;
        showSubCategories(category);
        
        // 更新按钮状态
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }

  // 显示子分类
  function showSubCategories(mainCategory) {
    subCategories.innerHTML = '';
    const subCats = categoryData[mainCategory].subCategories;
    
    for (const [key, data] of Object.entries(subCats)) {
      const btn = document.createElement('button');
      btn.className = 'sub-category-btn';
      btn.textContent = data.name;
      btn.dataset.subCategory = key;
      btn.dataset.mainCategory = mainCategory;
      subCategories.appendChild(btn);
    }
    
    subCategories.style.display = 'flex';
    articleList.style.display = 'none';

    // 添加子分类点击事件
    subCategories.querySelectorAll('.sub-category-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const mainCategory = this.dataset.mainCategory;
        const subCategory = this.dataset.subCategory;
        showArticles(mainCategory, subCategory);
        
        // 更新按钮状态
        subCategories.querySelectorAll('.sub-category-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }

  // 显示文章列表
  function showArticles(mainCategory, subCategory) {
    const articles = categoryData[mainCategory].subCategories[subCategory].articles;
    articleList.innerHTML = '';
    
    articles.forEach(article => {
      const articleDiv = document.createElement('div');
      articleDiv.className = 'article-item';
      
      // 获取文章内容
      fetch(article.url)
        .then(response => response.text())
        .then(html => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const content = doc.querySelector('article');
          
          // 创建一个包装器div来应用80%宽度
          const contentWrapper = document.createElement('div');
          contentWrapper.className = 'article-content';
          
          if (content) {
            // 直接使用原始内容，保留代码高亮
            contentWrapper.innerHTML = content.innerHTML;
            
            // 重新应用代码高亮
            if (typeof hljs !== 'undefined') {
              contentWrapper.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightElement(block);
              });
            }
          } else {
            contentWrapper.innerHTML = '暂无内容';
          }
          
          articleDiv.innerHTML = `
            <div class="article-header">
              <a href="${article.url}" class="article-link" target="_blank">查看原文</a>
              <h3>${article.title}</h3>
            </div>
          `;
          articleDiv.appendChild(contentWrapper);
          articleDiv.innerHTML += `
            <p class="article-category">${categoryData[mainCategory].name} - ${categoryData[mainCategory].subCategories[subCategory].name}</p>
          `;
        })
        .catch(error => {
          articleDiv.innerHTML = `
            <div class="article-header">
              <a href="${article.url}" class="article-link" target="_blank">查看原文</a>
              <h3>${article.title}</h3>
            </div>
            <div class="article-content">无法加载内容</div>
            <p class="article-category">${categoryData[mainCategory].name} - ${categoryData[mainCategory].subCategories[subCategory].name}</p>
          `;
        });
      
      articleList.appendChild(articleDiv);
    });
    
    articleList.style.display = 'grid';
  }

  // 更新样式
  const style = document.createElement('style');
  style.textContent = `
    .category-navigation {
      width: 80%;
      margin: 0 auto;
      padding: 20px;
    }

    .article-list {
      display: grid;
      gap: 15px;
      padding: 10px;
      background-color: #f8f9fa;
      border-radius: 8px;
      width: 80%;
      margin: 0 auto;
    }

    .article-content {
      color: #333;
      font-size: 16px;
      line-height: 1.6;
      margin: 15px 0;
      width: 100%;
      overflow-x: auto;
    }
    
    .article-content pre {
      background-color: #f5f5f5;
      padding: 15px;
      border-radius: 5px;
      overflow-x: auto;
      width: 100%;
    }
    
    .article-content code {
      font-family: Consolas, Monaco, 'Andale Mono', monospace;
      background-color: #f5f5f5;
      padding: 2px 4px;
      border-radius: 3px;
      word-break: break-word;
    }
    
    .article-content p {
      margin: 10px 0;
      word-wrap: break-word;
    }
    
    .article-content h1, 
    .article-content h2, 
    .article-content h3, 
    .article-content h4, 
    .article-content h5, 
    .article-content h6 {
      margin: 20px 0 10px 0;
      color: #222;
      word-wrap: break-word;
    }
    
    .article-content img {
      max-width: 100%;
      height: auto;
      margin: 10px 0;
    }
    
    .article-content blockquote {
      border-left: 4px solid #ddd;
      margin: 10px 0;
      padding: 10px 20px;
      background-color: #f9f9f9;
      width: 100%;
      overflow-x: auto;
    }
    
    .article-content table {
      border-collapse: collapse;
      width: 100%;
      margin: 15px 0;
      overflow-x: auto;
      display: block;
    }
    
    .article-content th,
    .article-content td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
      word-break: break-word;
    }
    
    .article-content th {
      background-color: #f5f5f5;
    }
    
    .article-category {
      color: #999;
      font-size: 12px;
      margin: 5px 0 0 0;
    }
    
    .article-item {
      padding: 30px;
      border: 1px solid #eee;
      border-radius: 8px;
      background-color: white;
      margin-bottom: 20px;
      width: 100%;
      box-sizing: border-box;
    }
    
    .article-item h3 {
      margin: 0 0 15px 0;
      color: #333;
      font-size: 24px;
      border-bottom: 2px solid #eee;
      padding-bottom: 10px;
      word-wrap: break-word;
    }

    .article-header {
      width: 80%;
      margin-bottom: 15px;
    }

    .article-link {
      display: inline-block;
      color: #007bff;
      text-decoration: none;
      margin-bottom: 10px;
      font-size: 14px;
    }

    .article-link:hover {
      text-decoration: underline;
    }

    @media screen and (max-width: 768px) {
      .category-navigation {
        width: 95%;
        padding: 10px;
      }

      .article-list {
        width: 95%;
      }

      .article-item {
        padding: 20px;
      }

      .article-content {
        font-size: 15px;
      }

      .article-item h3 {
        font-size: 20px;
      }

      .article-header {
        width: 95%;
      }
    }
  `;
  document.head.appendChild(style);

  // 初始化
  initEventListeners();

  // 为文章页面添加分类导航
  function addCategoryNavToArticles() {
    const articles = document.querySelectorAll('article');
    articles.forEach(article => {
      // 获取当前文章的分类信息
      const categoryInfo = article.querySelector('.article-category');
      if (!categoryInfo) return;

      const mainCategory = categoryInfo.dataset.mainCategory;
      const subCategory = categoryInfo.dataset.subCategory;

      const nav = document.createElement('div');
      nav.className = 'article-category-nav';
      nav.innerHTML = `
        <div class="main-categories">
          ${Object.entries(categoryData).map(([key, data]) => `
            <button class="category-btn ${key === mainCategory ? 'active' : ''}" 
                    data-category="${key}">${data.name}</button>
          `).join('')}
        </div>
        <div class="sub-categories" style="display: ${mainCategory ? 'flex' : 'none'}">
          ${mainCategory ? Object.entries(categoryData[mainCategory].subCategories)
            .map(([key, data]) => `
              <button class="sub-category-btn ${key === subCategory ? 'active' : ''}"
                      data-sub-category="${key}"
                      data-main-category="${mainCategory}">${data.name}</button>
            `).join('') : ''}
        </div>
      `;

      article.insertBefore(nav, article.firstChild);
      
      // 为文章页面的导航添加事件监听
      initEventListeners();
    });
  }

  // 检查是否在文章页面
  if (document.querySelector('article')) {
    addCategoryNavToArticles();
  }
});
</script>
