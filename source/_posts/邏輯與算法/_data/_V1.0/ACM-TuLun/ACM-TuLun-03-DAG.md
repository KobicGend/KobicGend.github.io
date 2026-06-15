---
title: '圖論 - 有向無環圖 : Topo 排序 && 強連通分量'
tags:
  - 算法
  - 圖論
  - 筆記
  - ACM
categories:
  - - 筆記
    - 算法筆記
abbrlink: '8f4341de'
date: 2024-04-17 12:00:00
updated: 2024-04-17 12:00:00
description:
---


# Directed Acyclic Graph

## Topological Sorting

```cpp
vector<int> E[N];
int deg[N];  // 入度
int dp[N];   // 到达某点的最大点权和
inline bool topo(int n) {
    for (int u = 1; u <= n; ++u) {
        for (auto v : E[u]) deg[v] += 1;// 统计入度
    }

    priority_queue<int> Q;
    vector<int> paths;                 // 记录排序结果

    int cnt = 0, flag = 1;             // 用于判断排序方式是否惟一
    for (int u = 1; u <= n; ++u) {
        if (!deg[u]) {
            Q.push(u);
            cnt += 1;
            dp[u] = w[u];
        }
    }
    if (cnt > 1) flag = 0;             // 多个起点 排序方式不惟一

    while (!Q.empty()) {
        int u = Q.top(); Q.pop();
        paths.push_back(u);
        cnt = 0;
        for (auto to : E[u]) {
            deg[to] -= 1;
            if (!deg[to]) {
                Q.push(to);
                cnt += 1;
                dp[to] = max(dp[to], dp[u] + w[to]);
            }
        }
        if (cnt > 1) flag = 0;         // 排序方式不惟一
    }

    if (paths.size() == n) { // 无环
        // 是否有其它排序方式
        printf("%d\n", flag);
        
        // 排序结果
        for (auto i : paths) printf("%d ", i);
        
        // 路径上最大点权和
        int ans = 0;
        for (int u = 1; u <= n; ++u) ans = max(ans, dp[u]);
        printf("%d", ans);
        return 0;
    } else return 1;  // 有环
}

void eachT() {
    int n = read(), m = read();
    for (int i = 1; i <= m; ++i) {
        int u = read(), v = read();
        E[u].push_back(v);  // 邻接表存边
    }
    topo(n);
}
```


## Strongly Connected Components

对于有向图，它是 **强连通** 的当且仅当其上每两个顶点都相互可达。

**强连通分量 (Strongly Connected Components)** 有向图的极大的强连通子图（把图划分为若干个强连通分量后，不存在两个强连通分量相互可达）。

### DFS traversal of a Tree

每当通过某条边访问到一个新节点，就加入这个点和这条边，并为点记录 DFS 序（unix 时间戳）。

DFS 生成树的边的种类：
- **树边** DFS 生成树上的边；
- **前向边** 从某个点到它的某个子孙节点的边，产生了捷径。
- **反向边** 从某个点到它的某个祖先节点的边，产生了环；
- **横叉边** 从某个点到一个既非它子孙节点、也非它祖先节点的边，连接了两个强连通子图。

### Tarjan Algorithm

引入如下数组：
- **`dfsn[u]`** $u$ 的 DFS 序。
- **`low[u]`** $u$ **所在子树** 中的点经过 **最多一条** **非树边** $x \to y$ （其中 $y$ **可达** $x$ ）能到达的点中 **最小的 DFS 序**。
- **`fa[u]`** $u$ 所在 SCC 的根。

对于 `low[u]`，有性质：
- $p$ 是强连通分量的根$\iff$ `low[u] = dfsn[u]`。

`low[u]` 的值可由 DP 得到：对于以某个点 $u$ 为起点的边 $u\to v$：
- 如果 $v$ 未访问过，则 $v$ 在 $u$ 所在的子树上，如果某点从 $v$ 起可以经过最多一条反向边到达，则从 $u$ 起也可以，于是先递归处理点 $v$，然后令 `low[u] = min(low[u], low[v])`；
- 如果 $v$ 已访问过，且从 $v$ 可以到达 $u$，令 `low[u] = min(low[u], dfsn[v])`；
- 如果 $v$ 已访问过，且从 $v$ 不能到达 $u$，不做处理。

每当搜索到新点，就令它入栈。如果 $u$ 是 SCC 的根，那么在递归时入栈的点都在这个 SCC 上，递归完毕后，将栈中元素弹出，并记录它们的根是 $u$。

```cpp
std::vector<int> E[N], Etmp[N];
int w[N], wtmp[N];
int dfsn[N], low[N], fa[N], unix;
std::stack<int> S;

void eachTarjan(int u) {
    dfsn[u] = low[u] = ++unix;       // 记录DFS序
    S.push(u);

    // DP更新low[u]
    for (auto v : E[u]) {
        if (!dfsn[v]) eachTarjan(v), low[u] = std::min(low[u], low[v]);
        else if (!fa[v]) low[u] = std::min(low[u], dfsn[v]);
    }

    // u是SCC的根
    if (low[u] == dfsn[u]) {
        int top;
        do {
            top = S.top(); S.pop();    // 出栈
            fa[top] = u;               // 记录u的子节点的根为u
        } while (top != u);            // 不断弹出直到根u弹出为止
    }
}

inline void tarjan(int n) {
    // Tarjan
    for (int u = 1; u <= n; ++u) {
        if (!dfsn[u]) eachTarjan(u);
    }
    
    // 重构图 将子树的性质嫁接到SCC的根上
    for (int u = 1; u <= n; ++u) {
        for (auto v : E[u]) {
            if (fa[u] != fa[v]) Etmp[fa[u]].push_back(fa[v]);
        }                              // 存储新的边
        wtmp[fa[u]] += w[u];           // 存储新的边权
    }
    for (int u = 1; u <= n; ++u) {
        w[u] = wtmp[u];
        E[u] = Etmp[u];
        std::sort(E[u].begin(), E[u].end());
        E[u].erase(std::unique(E[u].begin(), E[u].end()), E[u].end());
    }
}

int deg[N], dp[N];
inline void topo(int n) {
    for (int u = 1; u <= n; ++u) {
        for (auto v : E[u]) deg[v] += 1;
    }
    std::queue<int> Q;
    for (int u = 1; u <= n; ++u) {
        if (!deg[u] && u == fa[u])
            Q.push(u), dp[u] = w[u];
    }
    while (!Q.empty()) {
        int u = Q.front(); Q.pop();
        for (auto to : E[u]) {
            deg[to] -= 1;
            if (!deg[to]) Q.push(to), dp[to] = std::max(dp[to], dp[u] + w[to]);
        }
    }
    int ans = 0;
    for (int u = 1; u <= n; ++u) ans = std::max(ans, dp[u]);
    printf("%d", ans);
}

void eachT() {
    int n = read(), m = read();
    for (int i = 1; i <= n; i++) w[i] = read();
    for (int i = 1; i <= m; i++) {
        int u = read(), v = read();
        E[u].push_back(v);
    }
    tarjan(n);
    topo(n);
}

```