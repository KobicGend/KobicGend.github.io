---
title: XCPC wiki - Biconnected Components 双连通分量
tags:
  - 算法
  - 筆記
  - ACM
  - 圖論
categories:
  - - 筆記
    - XCPCwiki
abbrlink: be2ba6bf
hide: true
date: 2025-01-24 22:05:00
updated: 2025-01-24 22:05:00
description:
---

## Edge Biconnected Components 边双连通分量 & 割与割边缩点

在一张连通的无向图中，称 $u$ 和 $v$ **边双连通**，如果无论删去哪条 **边** 都 **不能** 使它们 **不连通**。

**边双连通具有传递性**，即若 $x,y$ 边双连通，$y,z$ 边双连通，则 $x,z$ 边双连通。

边双连通分量缩点后是一棵树。

```cpp
struct EBCC {
    int n, unix, tot;
    vector<vector<pair<int, int>>> E;
    vector<int> dfn, low, bel, stk;
    
    EBCC(int n) : n(n), unix(0), tot(0), E(n), dfn(n, -1), low(n), bel(n, -1) {}
    
    void add(int u, int v) {
        E[u].push_back({ v, unix });
        E[v].push_back({ u, unix++ });
    }
    
    void dfs(int u, int pid) {
        dfn[u] = low[u] = unix++;
        stk.push_back(u);
        
        for (auto& [v, id] : E[u]) {
            if (id == pid) continue;

            if (dfn[v] == -1) {
                dfs(v, id);
                low[u] = min(low[u], low[v]);
            }
            else if (bel[v] == -1) {
                low[u] = min(low[u], dfn[v]);
            }
        }
        
        if (dfn[u] == low[u]) {
            int v;
            do {
                v = stk.back();
                bel[v] = tot;
                stk.pop_back();
            } while (v != u);
            tot++;
        }
    }

    struct Graph {
        int n;
        vector<vector<int>> tree, vertex;
        vector<vector<pair<int, int>>> edge;
        Graph(int n) : n(n), tree(n), vertex(n), edge(n) {}
    };
    Graph work() {
        for (int u = 0; u < n; ++u) {
            if (dfn[u] == -1) dfs(u, -1);
        }

        Graph G(tot);
        for (int u = 0; u < n; u++) {
            for (auto& [v, id] : E[u]) {
                if (bel[u] != bel[v]) {
                    G.tree[bel[u]].push_back(bel[v]);
                }
                else if (u < v) {
                    G.edge[bel[u]].push_back({ u, v });
                }
            }
            G.vertex[bel[u]].push_back(u);
        }
        return G;
    }
};
```

### Problems

**例 1** [洛谷模板](https://www.luogu.com.cn/problem/P8436)

```cpp
auto G = ebcc.work();
cout << G.n << "\n";
for (int i = 0; i < G.n; i++) {
    cout << G.vertex[i].size() << " ";
    for (auto u : G.vertex[i]) {
        cout << ++u << " ";
    }
    cout << "\n";
}
```

**例 2** 给定 $m$ 条无向边，把它们转换成有向边，使得这张图变成一个强连通分量，问是否有解，如有输出方案。(2139, [CF118E. Bertown roads](https://codeforces.com/contest/118/problem/E))

无桥则有解，DFS 定向即可。

**例 3** 给定 $n$ 个点 $m$ 条边的简单无向连通图。你需要删除一条边使得图中连通的顶点对 $(u,v)$ 最少。求这个最小值。(1971, [CF1986F. Non-academic Problem](https://codeforces.com/contest/1986/problem/F))

缩点后成为一棵树，作换根 DP。

```cpp
auto G = ebcc.work();
ll ans = 0;
vector<int> siz(G.n);
auto dfs = [&](this auto&& self, int u, int p) -> void {
    siz[u] = G.vertex[u].size();
    for (auto v : G.tree[u]) {
        if (v == p) continue;
        self(v, u);
        siz[u] += siz[v];
        ans = max(ans, 1LL * siz[v] * (n - siz[v]));
    }
};
dfs(0, -1);
cout << (1LL * n * (n - 1) / 2 - ans) << "\n";
```




## Vertex Biconnected Components 点双连通分量 割点 

![[../data/img/Pasted image 20241014191941.png]]

点双连通很抽象。

在一张连通的无向图中，称 $u$ 和 $v$ **点双连通**，如果无论删去哪个 **点** 都 **不能** 使它们 **不连通**。

**点双连通不具有传递性**，若 $x,y$ 点双连通，$y,z$ 点双连通，则 $x,z$ **不一定** 点双连通，经典的反例是 **鱼图**。

```cpp
struct VBCC {
    int n, unix, tot;
    vector<vector<pair<int, int>>> E;
    vector<pair<int, int>> edge;
    vector<int> dfn, low, bel, stk, vis;
    vector<set<int>> cnt;

    VBCC(int n) : n(n), unix(0), tot(0), E(n), dfn(n, -1), low(n), cnt(n) {}

    void add(int u, int v) {
        E[u].push_back({ v, int(edge.size()) });
        E[v].push_back({ u, int(edge.size()) });
        edge.push_back({ u, v });
    }

    void dfs(int u) {
        low[u] = dfn[u] = unix++;
        for (auto& [v, id] : E[u]) {
            if (vis[id]) continue; vis[id] = 1;
            stk.push_back(id);
            if (dfn[v] == -1) {
                dfs(v);
                low[u] = min(low[u], low[v]);
                if (low[v] >= dfn[u]) {
                    int jd;
                    do {
                        jd = stk.back();
                        bel[jd] = tot;
                        stk.pop_back();
                    } while (jd != id);
                    tot++;
                }
            }
            else {
                low[u] = min(low[u], dfn[v]);
            }
        }
    }

    struct Graph {
        int n;
        set<int> cut;  // 割点
        vector<set<int>> vertex;
        vector<vector<int>> edge;
        Graph(int n) : n(n), vertex(n), edge(n) {}
    };
    Graph work() {
        bel.assign(edge.size(), -1);
        vis.resize(edge.size());
        for (int u = 0; u < n; u++) {
            if (dfn[u] == -1) dfs(u);
        }

        for (int i = 0; i < edge.size(); ++i) {
            auto [u, v] = edge[i];
            if (u == v) continue;
            cnt[u].insert(bel[i]);
            cnt[v].insert(bel[i]);
        }
        for (int u = 0; u < n; u++) {
            if (cnt[u].empty()) {
                cnt[u].insert(++tot);
            }
        }

        Graph G(tot);
        for (int i = 0; i < edge.size(); ++i) {
            auto [u, v] = edge[i];
            if (u == v) continue;
            G.edge[bel[i]].push_back(i);
            G.vertex[bel[i]].insert(u);
            G.vertex[bel[i]].insert(v);
        }
        for (int u = 0; u < n; u++) {
            if (cnt[u].size() >= 2) {
                G.cut.insert(u);
            }
        }
        return G;
    }
};
```

### Problems

**例 1** [洛谷模板](https://www.luogu.com.cn/problem/P8435)

```cpp
int n, m;
cin >> n >> m;
VBCC vbcc(n);
while (m--) {
    int u, v;
    cin >> u >> v;
    u--, v--;
    vbcc.add(u, v);
}
auto G = vbcc.work();

cout << G.n << "\n";
for (int i = 0; i < G.n; i++) {
    cout << G.vertex[i].size() << " ";
    for (auto u : G.vertex[i]) cout << ++u << " ";
    cout << "\n";
}
```


**例 2** 给出一张 $n$ 个点 $m$ 条边的图，无重边自环，但不一定连通，求恰好被包含在一个简单环中的边。(2670, [CF962F. Simple Cycles Edges](https://codeforces.com/contest/962/problem/F))

在一个无向图中，某个简单环等价于这个图中某个点数等于边数的点双连通分量。

```cpp
auto G = vbcc.work();
vector<int> res;
for (int i = 0; i < G.n; i++) {
    if (G.vertex[i].size() == G.edge[i].size()) {
        for (auto& j : G.edge[i]) res.push_back(j);
    }
}
sort(res.begin(), res.end());
cout << res.size() << "\n";
for (auto& x : res) {
    cout << ++x << " ";
}
```


**例 3** 已知一个图，请问判断这个图是否是 $v$-flower。$v-$flower 定义：中间是一个 $v$ 边简单环，而这个环上的每一个点为一个 $v$ 边简单环上的一个点。(2439, [CF1811F. Is It Flower?](https://codeforces.com/problemset/problem/1811/F))

每个双联通分量都是大小为 $\sqrt{ n }$ 的简单环，且某个双联通分量的每个点都是割点。

```cpp
auto G = vbcc.work();
bool good = false;
for (int i = 0; i < G.n; i++) {
    bool centre = true;
    for (auto u : G.vertex[i]) {
        if (!G.cut.count(u)) centre = false;
    }
    good |= centre;
}
for (int i = 0; i < G.n; i++) {
    if (G.edge[i].size() != G.vertex[i].size()
     || G.vertex[i].size() + 1 != G.n) good = false;  // WA
}
cout << (good ? "YES" : "NO") << "\n";
```
