---
title: 樹上問題 - 樹形 DP
tags:
  - 算法
  - 圖論
  - 筆記
  - ACM
categories:
  - - 筆記
    - 算法筆記
abbrlink: 43a1bd89
date: 2024-05-08 12:00:00
updated: 2024-05-08 12:00:00
description:
---

# Diameter

**法 1** 两次 DFS。

```cpp
vector<pair<int, int> > E[N];
int c;  // 直径的端点
int lst[N], nxt[N], vis[N];
int dep[N], dis[N];

void dfs(int u, int fau = 0) {
    lst[u] = fau;  // 记录路径
    for (auto [w, v] : E[u]) {
        if (v != fau) {
            dep[v] = dep[u] + w;
            if (dep[v] > dep[c]) c = v;
            dfs(v, u);
        }
    }
}  // 两轮DFS找到距离根节点最远的点

void dfs2(int gfa, int u, int fau = 0) {
    for (auto [w, v] : E[u]) {
        if (!vis[v] && v != fau) {
            dis[gfa] = max(dis[gfa], dep[v] - dep[gfa]);
            dfs2(gfa, v, u);
        }
    }
}  // 用于找到叶到直径的距离

void eachT() {
    dep[1] = 0, dfs(1);  // 以任意点为根 找到直径其中一端点
    dep[c] = 0, dfs(c);  // 以最远点为根 找到直径另一端点
    
    for (int i = c; i; i = lst[i]) vis[i] = 1, nxt[lst[i]] = i;  // 记录路径 和直径上的点(vis)
    for (int i = c; i; i = lst[i]) dfs2(i, i);  // 叶到直径的距离
    for (int i = nxt[0]; i; i = nxt[i]) { }
    for (int i = c; i; i = lst[i]) { }  // 两种方向的遍历直径
}
```

**法 2** DP，见 TreeDP，此方法不能记录路径。