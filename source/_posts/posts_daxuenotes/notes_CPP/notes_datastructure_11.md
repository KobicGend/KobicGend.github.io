---
title: 数据结构第十一讲：图的最短路径
tags:
  - 筆記
  - cpp
  - 數據結構
categories:
  - posts_daxuenotes
  - notes_CPP
description: 數據結構第十一講：圖的最短路徑
cover: /img/posts/notes/notes-datastructure.webp
top_img: /img/posts/notes/notes-datastructure.webp
highlight_shrink: true
aside: true
abbrlink: 177abf77
date: 2024-11-28 12:00:00
updated: 2024-11-28 12:00:00
---

*[返回目录](../notes/)*

## §7.5 图的最短路径

本课程中，单源最短路一般用 Dijkstra，多源最短路可以跑 $n$ 次 Dijkstra，也可以用 Floyd。

**Dijkstra** 算法是一种贪心算法，通过迭代选择 **距离源点最近** 的未访问顶点，并更新其邻接点的距离，最终找到从源点到所有其他顶点的最短路径。请注意加粗部分与 Prim 的区别。

**Floyd** 算法是一种动态规划算法，通过不断更新所有顶点对之间的距离矩阵，利用中间顶点来改进路径长度，最终得到图中所有顶点对的最短路径。

## §7.6  AOV 网与拓扑排序

用顶点表示活动，用边表示活动之间的优先关系的有向图称为用顶点表示活动的网，简称 **AOV (Activity on Vertex Network) 网**。

**拓扑序列**：该网中顶点序列，且不能存在排在后面的点有边指向排在前面的点

用 **拓扑排序** 找到一个这样的序列。如果找不到，说明原图有环。

## §7.7  AOE 网与关键路径

用带权有向图描述活动的预计进度，以顶点表示事件，有向边表示活动，边权表示完成这个活动所需的时间。

图中入度为零的顶点表示活动的开始事件，称为 **源点**；出度为零的顶点表示活动结束事件，称为 **汇点**。则称这样的有向图为 **AOE (Activity On Edge) 网**。
 
整个活动完成的时间为：从有向图的源点到汇点的 **最长路径**，这路径叫 **关键路径**。

定义事件 $v$ 的最早开始时间 (early event) 为 $ee(v)$，最迟开始时间 (late event)，记作 $le(v)$；活动 $a$ 的最早开始时间 $e(a)$，最迟开始时间 $l(a)$，$d(a)=l(a)-e(a)$，若 $d(a) = 0$，则称活动 $a$ 为关键活动。
