---
title: 数据结构第十讲：图的遍历的最小生成树
tags:
  - 筆記
  - cpp
  - 數據結構
categories:
  - posts_daxuenotes
  - notes_CPP
description: 數據結構第十講：圖的遍歷的最小生成樹
cover: /img/posts/notes/notes-datastructure.webp
top_img: /img/posts/notes/notes-datastructure.webp
highlight_shrink: true
aside: true
abbrlink: a47b8886
date: 2024-11-21 12:00:00
updated: 2024-11-21 12:00:00
---

*[返回目录](../notes/)*

## §7.3 图的遍历

### §7.3.1 深度优先遍历算法 (DFS)

一步一步向前走，当没有可走的相邻顶点时便回退。

输出所有简单路径可以用带回溯的 DFS。

### §7.3.2 广度优先遍历算法 (BFS)

一圈一圈向外走，BFS 出的路径是最短路（参考迷宫问题）。用队列实现，如果要找具体路径，应采用非循环队列。

## §7.4 生成树和最小生成树

**生成树**：所有顶点连通又不形成回路的子图，也是极小连通子图。

一个带权无向图可能产生多棵生成树， 把具有权之和最小的生成树称为图的 **最小权重生成树**。 

一般用 Prim 算法或 Kruskal 算法。
- **Prim** 算法是一种贪心算法，通过迭代选择连接最小生成树与树外顶点的 **最小权重边**，逐步构建出包含所有顶点的最小生成树。
- Kruskal 算法也是一种贪心算法，通过按权重 **排序所有边**，并逐个选择加入最小生成树而不形成环的最小权重边，最终构建出图的最小生成树。

