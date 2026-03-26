---
title: 樹上問題 - 最近公共祖先 和 樹上路徑
tags:
  - 算法
  - 圖論
  - 筆記
  - ACM
categories:
  - - 筆記
    - 算法筆記
abbrlink: 'a66dfabb'
date: 2024-04-27 12:00:00
updated: 2024-04-27 12:00:00
description:
---

> 为叙述方便，树上节点的 *上方* 指朝向根的方向，*下方* 指朝向叶的方向。

# Lowest Common Ancestor


## Lowest Common Ancestor

<div STYLE="page-break-after: always;"></div>

### 倍增算法

预处理时间复杂度 $\Theta(n\log n)$，查询 $\Theta(\log n)$。

```cpp
/* 前向星 */
struct Edge {
    int nxt, to, w;
};
vector<Edge> E;
int head[N], Log2[N], fa[88][N], dep[N], w[N];

inline void add(int u, int v, int w) {
    E.push_back({ head[u], v, w });
    head[u] = E.size() - 1;
}

void initlca(int u, int fau = 0) {
    dep[u] = dep[fau] + 1;
    fa[0][u] = fau;
    for (int i = 1; i <= Log2[dep[u]]; ++i) {
        fa[i][u] = fa[i - 1][fa[i - 1][u]];
    }  // u的第2^{i-1}个父节点的第2^{i-1}个父节点即第2^{i}个父节点
    for (int i = head[u]; i >= 1; i = E[i].nxt) {
        if (E[i].to != fau) {
            w[E[i].to] = E[i].w;  // 将边权存储在子节点上
            initlca(E[i].to, u);
        }
    }
}

int getlca(int u, int v) {
    if (dep[u] > dep[v]) std::swap(u, v);                       // -> dep[u]<=dep[v]
    while (dep[u] != dep[v]) v = fa[Log2[dep[v] - dep[u]]][v];  // -> dep[u]==dep[v]
    if (u == v) return u;
    for (int bit = Log2[dep[u]]; bit >= 0; --bit) {
        if (fa[bit][u] != fa[bit][v]) u = fa[bit][u], v = fa[bit][v];
    }  // 一步一步向上跳
    return fa[0][u];
}

inline void beforeT() {
    for (int i = 2; i < N; ++i) Log2[i] = Log2[i / 2] + 1;
}  // init Log2[]

void eachT() {
    E.push_back({ -1,0,0 });
    for { add(u, v, w); add(v, u, w); }              // 前向星存边
    initlca(rt);                                     // LCA初始化 rt是树的根
    printf(getlca(u, v));
}
```



<div STYLE="page-break-after: always;"></div>

### Tarjan 算法

> 一个熊孩子给一棵树灌岩浆，他表示很讨厌这种倒着长的树。岩浆会不断的注入，直到注满整个树。显然，岩浆只有在迫不得已的情况下才会向上升高，找到一个新的子树继续注入，并且，根据地转偏向力，岩浆会从左到右地注入。
> 机(yu)智(chun)的熊孩子发现了找 LCA 的好方法，即如果两个结点都被岩浆烧掉时，他们的 LCA 即为那棵子树上岩浆最高的位置。

这是 **离线** 算法，即在搜索树的过程中给出每个询问的答案。时间复杂度 $\Theta(n+q)$。

```cpp
struct Edge {
    int nxt, to, w;
};
vector<Edge> E;
vector<pair<int, int> > Q[N];
int head[N], fa[N], vis[N], ans[N];

inline void add(int u, int v, int w) {
    E.push_back({ head[u], v, w });
    head[u] = E.size() - 1;
}  // 前向星

inline void init(int n) { for (int i = 0; i <= n; ++i) fa[i] = i; }
int find(int x) { return fa[x] == x ? x : fa[x] = find(fa[x]); }
inline void uno(int x, int y) { fa[find(x)] = find(y); }  // 并查集

void tarjan(int u) {
    vis[u] = 1;  // 访问过 但未回溯 即现在在访问它的子节点
    for (int i = head[u]; i >= 1; i = E[i].nxt) {
        if (vis[E[i].to]) continue;
        tarjan(E[i].to);
        uno(E[i].to, u);
    }
    for (auto [v, id] : Q[u]) {
        if (vis[v] == 2) ans[id] = find(v);
    }
    vis[u] = 2;  // 访问过 已回溯 它的子节点已经全部访问过
}

void eachT() {
    E.push_back({ -1,0,0 }); for { add(u, v, 0); add(v, u, 0); }  // 前向星存边
    for (int i = 1; i <= q; ++i) {
        int u = read(), v = read();
        if (u == v) ans[i] = u;  // 特判
        else Q[u].push_back({ v,i }), Q[v].push_back({ u,i });
    }  // 存储询问
    init(n);  // 并查集初始化
    tarjan(st);  // dfs
    for (int i = 1; i <= q; ++i) print(ans[i]);
}
```




<div STYLE="page-break-after: always;"></div>


## LCA 衍生

```cpp
// v的k级祖先
int getast(int v, int k) {
	k = dep[v] - k;  // 期望的深度
	if (k <= 0) return -1;  // v没有k级祖先
	while (dep[v] < k)
		v = fa[Log2[k - dep[v]]][v];
	return v;
}

// fav朝向v方向的儿子
int getson(int fav, int v) {
	if (v == fav) return -1;  // fav与v相同 此函数无效
	while (dep[fav] + 1 < dep[v])
		v = fa[Log2[dep[v] - dep[fav] - 1]][v];
	return v;
}
```



## Sum of node weight && Adjacent Difference on Tree

**问题** 每次操作将树上 $u\to v$ 路径上的所有点权增加 $d$，求每个点的点权。

**思路** 用类似前缀和的思想存储树上的点权。用 `val[p]` 存储 $p$ 节点上方的点权增加值，对于上述操作，按差分思想，只需

```cpp
val[u] += d;  val[v] += d;
val[lca(u,v)] -= d;  val[fa[lca(u,v)] -= d;
```

复原时，从根节点开始一步步累加。

**代码**

```cpp
/* 前向星和LCA略 */
int val[N];
inline void insert(int u, int v, int d = 1) {
    int Lca = getlca(u, v);
    val[u] += d;  val[v] += d;  val[Lca] -= d;  val[fa[0][Lca]] -= d;
}

void getsum(int u, int fau = 0) {
    for (int i = head[u]; i >= 1; i = E[i].nxt) {
        if (E[i].to != fau) {
            getsum(E[i].to, u);
            val[u] += val[E[i].to];
        }
    }
}  // 差分的复原

void eachT() {
    E.push_back({ -1,0,0 });
    for { add(u, v, 0); add(v, u, 0); }              // 前向星存边
    initlca(rt);                                     // LCA初始化 rt是树的根
    
    for (int q = read(); q--; ) insert(u, v, d);     // 做差分
    getsum(st);                                      // 差分的复原
    for (int i = 1; i <= n; ++i) print(val[i]);
}
```


**变式** 每次操作将树上 $u\to v$ 路径上的所有边权增加 $d$，求每条边的边权。

**思路** 将边权存储在点上$^\dagger$，用 `val[p]` 存储 $p$ 节点上方的边权增加值，对于上述操作，只需修改为

```cpp
val[u] += d;  val[v] += d;
val[lca(u,v)] -= 2d;
```

> $\dagger:$ 对于树，从根向叶方向，子节点的父节点是惟一的。点上存储的边权即是与父节点相连的那一条边的边权。在 `dfs` 建树，遍历每条边时存储这个边权。
