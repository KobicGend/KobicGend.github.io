---
title: '圖論 - 存圖方式'
tags:
  - 算法
  - 圖論
  - 筆記
  - ACM
categories:
  - - 筆記
    - 算法筆記
abbrlink: 'de4308fb'
date: 2024-04-03 12:00:00
updated: 2024-04-03 12:00:00
description:
---


# 存图方式

> 若不另加说明，以 $u,v$ 表示两个点，$w$ 表示边权，$n$ 表示点数，$m$ 表示边数。

## 直接存边

```cpp
struct Edge {
    int u, v, w;
};
vector<Edge> E;

void add(int u, int v, int w) { E.push_back({ u, v, w }); }
bool findedge(int u0, int v0) {
    for (auto [u,v,w] : E) if (u == u0 && v == v0) return 1;
    return 0;
}
void dfs(int u) {
    if (vis[u]) return;
    vis[u] = 1;
    for (auto e : E) if (e.u == u) dfs(e.v);
}
```

查询边 $\Theta(m)$，遍历某点的出边 $\Theta(m)$，遍历图 $\Theta(nm)$，空间 $\Theta(m)$。



## 邻接矩阵

```cpp
bool E[N][N]; // Adjacency Matrix
void add(int u, int v, int w) { E[u][v] = w; }
bool findedge(int u, int v) { return E[u][v]; }
void dfs(int u) {
    if (vis[u]) return;
    vis[u] = 1;
    for (int v = 1; v <= n; ++v) if (E[u][v]) dfs(v);
}
```

查询边 $\Theta(1)$，遍历某点的出边 $\Theta(n)$，遍历图 $\Theta(n^2)$，空间 $\Theta(n^2)$。

- 查询操作是 $\Theta(1)$ 的；
- 不适用于重边不可忽略的情况；
- 空间较大；
- 在稀疏图上效率低。



## 邻接表

```cpp
struct Edge {
    int v, w;
};
vector<Edge> E[N];

void add(int u, int v, int w) { E[u].push_back({ v, w }); }
bool findedge(int u0, int v0) {
    for (auto [v,w] : E[u0]) if (v == v0) return 1;
    return 0;
}

void dfs(int u) {
    if (vis[u]) return;
    vis[u] = 1;
    for (auto e : E[u]) dfs(e.v);
}
```

查询边 $\Theta(\log(d^+(u)))$，遍历某点的出边 $\Theta(d^+(u))$，遍历图 $\Theta(n+m)$，空间 $\Theta(m)$。

- 尤其适用于对某点的出边排序。



## 链式前向星

```cpp
// Chain Forward Star
struct Edge {
    int nxt, to, w;
};
vector<Edge> E;
int head[N];
inline void add(int u, int v, int w) {
    E.push_back({ head[u], v, w });
    head[u] = E.size() - 1;
}
bool findedge(int u, int v) {
    for (int i = head[u]; i >= 1; i = E[i].nxt) if (E[i].to == v) return 1;
    return 0;
}
void dfs(int u) {
    if (vis[u]) return;
    vis[u] = true;
    for (int i = head[u]; i >= 1; i = E[i].nxt) dfs(E[i].to);
}
void eachT() {
    E.push_back({ -1,0,0 });
    for(;;) { add(u, v, w) };
}
```

查询边 $\Theta(d^+(u))$，遍历某点的出边 $\Theta(d^+(u))$，遍历图 $\Theta(n+m)$，空间 $\Theta(m)$。

- 边是带编号的；
- 不能对某点的出边排序。

