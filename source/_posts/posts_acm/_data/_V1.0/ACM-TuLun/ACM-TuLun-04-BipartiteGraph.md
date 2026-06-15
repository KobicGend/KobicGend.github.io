---
title: '圖論 - 二分圖 && Hungarian 算法'
tags:
  - 算法
  - 圖論
  - 筆記
  - ACM
categories:
  - - 筆記
    - 算法筆記
abbrlink: '4731e223'
date: 2024-04-24 12:00:00
updated: 2024-04-24 12:00:00
description:
---


# Bipartite Graph

**二分图** 中的点由两个集合组成，且两个集合内部没有边。二分图不存在长度为奇数的环。

## Check whether a given graph is Bipartite or not (Backtracking algorithm m coloring problem)

如果两个集合中的点分别染成黑色和白色，二分图中的每一条边都一定是连接一个黑色点和一个白色点。

```cpp
vector<int> E[N];
int color[N];
bool bipartite(int u) {  // 判断是否是二分图
    for (auto v : E[u]) {
        if (color[v] == color[u]) return 0;  // 颜色冲突
        if (color[v] == 0) {
            color[v] = -color[u];
            if (!bipartite(v)) return 0;  // 递归判断
        }
    }
    return 1;
}
void eachT() {
    for { E[u].push_back(v); E[v].push_back(u); }  // 邻接矩阵存边
    color[1] = 1;  // 初始化
    printf("%s\n", bipartite(1) ? "Yes" : "No");
}
```



<div STYLE="page-break-after: always;"></div>

## Hungarian Algorithm for Bipartite Graph

**匹配** (matching)：任意两条边都没有公共顶点边的集合。

使用 Hungarian 定理求二分图的 **最大匹配数**（所含匹配边数最多的匹配） 和 **最小点覆盖数**（最少的点的数量使二分图所有的边都至少有一个端点在这些点之中），根据 König 定理，一个二分图中的最大匹配数等于这个图中的最小点覆盖数。

```cpp
vector<int> E[N];
int npy[N], vis[N];

bool found(int u) {
    for (auto v : E[u]) {
        if (vis[v]) continue;
        vis[v] = 1;
        if (npy[v] == -1 || found(npy[v])) {
            npy[v] = u;  // 当前左侧元素成为当前右侧元素的新匹配
            return 1;    // 匹配成功
        }  // 如果暂无匹配 或者原来匹配的左侧元素可以找到新的匹配
    }
    return 0;
}

void eachT() {
    for { E[u].push_back(v); }  // 邻接矩阵存边
    int cnt = 0;
    for (int j = 1; j <= n; ++j) npy[j] = -1;  // 初始化 
    for (int i = 1; i <= n; ++i) {
        for (int j = 1; j <= n; ++j) vis[j] = 0;  // 初始化
        cnt += found(i);
    }
    printf("%d\n", cnt);
}
```

应用：
- 黑白棋盘，可选择交换两行或交换两列，能否在若干次操作后，使棋盘的主对角线均为黑色。
- 黑白棋盘，可选择将某一行或某一列的白色全部变为黑色，求将棋盘全变为黑色的最小操作次数。

