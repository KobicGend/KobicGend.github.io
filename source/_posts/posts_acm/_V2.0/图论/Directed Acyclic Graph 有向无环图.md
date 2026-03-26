---
title: XCPC wiki - Directed Acyclic Graph 有向无环图
tags:
  - 算法
  - 筆記
  - ACM
  - 圖論
categories:
  - - 筆記
    - XCPCwiki
abbrlink: 36c1b3ce
hide: true
date: 2025-01-24 22:05:00
updated: 2025-01-24 22:05:00
description:
---

## Strongly Connected Components 强连通分量

对于有向图，它是 **强连通** 的当且仅当其上每两个顶点都相互可达。

**强连通分量 (Strongly Connected Components)** 有向图的极大的强连通子图（把图划分为若干个强连通分量后，不存在两个强连通分量相互可达）。

### DFS traversal of a Tree 树的 DFS 生成树

**DFS 生成树** 每当通过某条边访问到一个新节点，就加入这个点和这条边，并为点记录 DFS 序（unix 时间戳）。

DFS 生成树的边的种类：
- **树边** DFS 生成树上的边；
- **前向边** 从某个点到它的某个子孙节点的边，产生了捷径。
- **反向边** 从某个点到它的某个祖先节点的边，产生了环；
- **横叉边** 从某个点到一个既非它子孙节点、也非它祖先节点的边，连接了两个强连通子图。

### Tarjan Algorithm 肽键算法

反向边和横叉边起点的 DFS 序必然大于终点的 DFS 序，因此对于每个强连通分量，存在一个点是其他所有点的祖先。

引入如下数组：
- **`dfn[u]`** $u$ 的 DFS 序。
- **`low[u]`** $u$ **所在子树** 中的点经过 **最多一条** **非树边** $x \to y$ （其中 $y$ **可达** $x$ ）能到达的点中 **最小的 DFS 序**。
- **`p[u]`** $u$ 所在 SCC 的根。

对于 `low[u]`，有性质：
- $p$ 是强连通分量的根$\iff$ `low[u] = dfn[u]`。

`low[u]` 的值可由 DP 得到：对于以某个点 $u$ 为起点的边 $u\to v$：
- 如果 $v$ 未访问过，则 $v$ 在 $u$ 所在的子树上，如果某点从 $v$ 起可以经过最多一条反向边到达，则从 $u$ 起也可以，于是先递归处理点 $v$，然后令 `low[u] = min(low[u], low[v])`；
- 如果 $v$ 已访问过，且从 $v$ 可以到达 $u$，令 `low[u] = min(low[u], dfn[v])`；
- 如果 $v$ 已访问过，且从 $v$ 不能到达 $u$，不做处理。

每当搜索到新点，就令它入栈。如果 $u$ 是 SCC 的根，那么在递归时入栈的点都在这个 SCC 上，递归完毕后，将栈中元素弹出。

```cpp
struct SCC {
    int n, unix, tot;
    vector<vector<int>> E;
    vector<int> dfn, low, bel, stk;

    SCC(int n) : n(n), unix(0), tot(0), E(n), dfn(n, -1), low(n), bel(n, -1) {}

    void add(int u, int v) {
        E[u].push_back(v);
    }

    void dfs(int u) {
        dfn[u] = low[u] = unix++;    // 记录DFS序
        stk.push_back(u);

        // DP更新low[u]
        for (auto& v : E[u]) {
            if (dfn[v] == -1) dfs(v), low[u] = min(low[u], low[v]);
            else if (bel[v] == -1) low[u] = min(low[u], dfn[v]);
        }

        // u是SCC的根
        if (dfn[u] == low[u]) {
            int v;
            do {
                v = stk.back();
                stk.pop_back();   // 出栈
                bel[v] = tot;     // 记录u的子节点的根为u
            } while (v != u);     // 不断弹出直到根u弹出为止
            tot++;                // 记录SCC的数量
        }
    }

    struct Graph {
        int n;
        vector<vector<int>> E;
        vector<int> ecnt, pcnt, bel;
        Graph(int n) : n(n), E(n), ecnt(n), pcnt(n) {}
    };
    Graph work() {
        for (int u = 0; u < n; u++) {
            if (dfn[u] == -1) dfs(u);
        }
        Graph G(tot);
        G.bel = bel;
        for (int u = 0; u < n; u++) {
            for (auto& v : E[u]) {
                if (bel[u] != bel[v]) G.E[bel[u]].push_back(bel[v]);  // bel[u]总是小于p[v]
                else G.ecnt[bel[u]]++;
            }
            G.pcnt[bel[u]]++;
        }
        for (auto& vec : G.E) {
            sort(vec.begin(), vec.end());
            vec.erase(unique(vec.begin(), vec.end()), vec.end());
        }
        return G;
    }

    template<typename T>
    vector<T> compress(const vector<T>& w) {
        vector<T> res(tot);
        for (int u = 0; u < n; u++) {
            res[bel[u]] += w[u];
        }
        return res;
    }
};

int main() {
    SCC scc(n);
    while (m--) {
        int u, v;
        cin >> u >> v;
        u--, v--;
        scc.add(u, v);
    }
    auto G = scc.work();
    w = scc.compress(w);
    n = G.n;
}
```

### Problems

**例 1** 求所有强连通分量，按字典序排序 ([洛谷 B3609 强连通分量](https://www.luogu.com.cn/problem/B3609))

**例 2** 强连通分量计数 ([洛谷 P2863 The Cow Prom S](https://www.luogu.com.cn/problem/P2863))

**例 3** 给定有向图，求入度为 0 的点的个数，以及至少添加多少条边，使得这个有向图强连通。([VJspr9E - 校园网](https://www.luogu.com.cn/problem/P2746))

先缩点。第一问直接统计并输出，对于第二问，答案是源点与汇点个数的较大值，**注意特判只有一个连通块**。

```cpp
int n;
cin >> n;
vector<int> w(n, 1);
// SCC add, work, compress
vector<int> deg(n);
int icnt = 0, ocnt = 0;
for (int u = 0; u < n; ++u) {
    for (auto v : G.E[u]) deg[v]++;
}
for (int u = 0; u < n; ++u) {
    if (deg[u] == 0) icnt++;
    if (G.E[u].empty()) ocnt++;
}
cout << icnt << endl;
cout << max(icnt, ocnt) - (n == 1) << endl;
```


**例 4** 每只野羊都梦想成为草原上的明星，被所有野羊喜欢的羊就是一只明星野羊。所有野羊都是自恋狂，每只野羊总是喜欢自己的。而且野羊之间的喜欢有传递性。草原上共有 $n$ 只野羊，给定一些野羊之间的爱慕关系，请你算出有多少只野羊可以当明星。数据范围：$1\leqslant n\leqslant10^4$，$1\leqslant m\leqslant5\times 10^4$。([VJspr9H - 又见明星羊](https://www.luogu.com.cn/problem/P2341))

先缩点，如果有惟一的出度为 0 的 SCC，答案为这个 SCC 的大小，否则答案为 0。

## Topological Sorting 拓扑排序

```cpp
vector<int> deg(n);
while (m--) {
    int u, v;
    cin >> u >> v;
    E[u].push_back(v);
    deg[v]++;
}
queue<int> Q;
vector<int> dp(n);
for (int u = 0; u < n; u++) {
    if (deg[u] == 0) Q.push(u), /* 初始化dp */;
}
while (!Q.empty()) {
    int u = Q.front(); Q.pop();
    for (auto v : E[u]) {
        /* DP 转移 */;
        if (--deg[v] == 0) Q.push(v);
    }
}
```


### 路径最大权值和

给定有点权有向图，最大化路径上点权值之和。允许多次经过一条边或者一个点，但是，重复经过的点，权值只计算一次。([VJspr9E - 缩点](https://www.luogu.com.cn/problem/P3387))

先缩点，求路径最大权值和。按拓扑序 DP，转移方程为 `dp[u] = max(dp[u], dp[v] + w[u])`。

```cpp
vector<int> w(n);
for (int i = 0; i < n; i++) cin >> w[i];
// SCC add, work, compress
vector<int> dp(n);
for (int u = 0; u < n; u++) {
    dp[u] = w[u];
    for (auto v : G.E[u]) {
        dp[u] = max(dp[u], dp[v] + w[u]);
    }
}
cout << *max_element(dp.begin(), dp.end()) << endl;
```

### 极长路径计数

从所有源点到所有汇点的路径数量。([VJspr9C  - 最大食物链计数](https://www.luogu.com.cn/problem/P4017))

设从源点到 $u$ 的路径数量为 `dp[u]`，则

- 初始化：源点 `dp[s] = 1`；
- 转移方程：`dp[v] += dp[u]`；
- 答案：汇点的 `dp[t]` 求和。

```cpp
queue<int> Q;
vector<int> dp(n);
for (int u = 0; u < n; u++) {
    if (deg[u] == 0) Q.push(u), dp[u] = 1;
}
while (!Q.empty()) {
    int u = Q.front(); Q.pop();
    for (int v : E[u]) {
        (dp[v] += dp[u]) %= mod;
        if (--deg[v] == 0) Q.push(v);
    }
}
int res = 0;
for (int u = 0; u < n; u++) {
    if (E[u].empty()) (res += dp[u]) %= mod;
}
cout << res << endl;
```

### 最长路径计数

一个图是 **半连通 (Semi-Connected)** 的，如果满足对于图中任意两点 $u,v$，存在一条 $u$ 到 $v$ 的有向路径 **或者** 从 $v$ 到 $u$ 的有向路径。

给定一个有向图，求最大半连通子图的节点数，以及不同的最大半连通子图的数目。([VJspr9G - 最大半连通子图](https://www.luogu.com.cn/problem/P2272))

最大半连通子图即是缩点后的最长链（所有路径中长度最长的，注意与 *极长路径计数* 相区分），计数方法与最短路计数方法相同。**路径计数问题必须去重边**。

```cpp
vector<int> w(n, 1);
// SCC add, work, compress
vector<int> dp(n), pcnt(n);
for (int u = 0; u < n; ++u) {
    pcnt[u] = 1;
    dp[u] = G.pcnt[u];
    for (auto v : G.E[u]) {
        if (dp[u] < dp[v] + w[u]) {
            dp[u] = dp[v] + w[u];
            pcnt[u] = pcnt[v];
        } else if (dp[u] == dp[v] + w[u]) {
            (pcnt[u] += pcnt[v]) %= mod;
        }
    }
}
int res = *max_element(dp.begin(), dp.end());
int cnt = 0;
for (int i = 0; i < n; ++i) {
    if (dp[i] == res) {
        (cnt += pcnt[i]) %= mod;
    }
}
cout << res << endl << cnt << endl;
```


### 最长路径的最小权值和

有向图，有点权。重复进行以下操作：若存在三元组 $a, b, c$ ，使得 $a$ 到 $b$ 有一条边， $b$ 到 $c$ 有一条边，但是 $a$ 到 $c$ 没边，则连一条 $a$ 到 $c$ 的边。求所有最长路径中，最小的权值和。图中可能存在重边和自环，不保证连通。数据范围：$n,m \leqslant 2\times 10^{5}$。([CF1900E. Transitive Graph](https://codeforces.com/contest/1900/problem/E))

2100 的水题，倒着（或许算正着）DP。

```cpp
int n, m;
cin >> n >> m;
vector<ll> w(n);
for (int i = 0; i < n; i++) {
    cin >> w[i];
}
// SCC add, work, compress
vector<pair<int, ll>> dp(n);
for (int u = n - 1; u >= 0; u--) {
    dp[u].first += G.pcnt[u];    // 链的长度
    dp[u].second -= w[u];        // 边权和
    for (auto v : G.E[u]) {
        dp[v] = max(dp[v], dp[u]);
    }
}

auto res = *max_element(dp.begin(), dp.end());
cout << res.first << " " << -res.second << endl;
```

### 排序方式惟一问题

**例 1** 给出 $m$ 个限制表示 $a$ 在 $b$ 的前面，给出一种排序方式，并判断这排序方式是否唯一。([VJspr9B - 郁闷的记者](https://www.luogu.com.cn/problem/P1960))

如果对于某个点 $u$，有多个出点 $v$ 加入队列，则排序方式不唯一。

```cpp
queue<int> Q;
vector<int> path;
bool unique = true;
int cnt = 0;
for (int u = 0; u < n; u++) {
    if (deg[u] == 0) Q.push(u), cnt++;
}
if (cnt > 1) unique = false;
while (!Q.empty()) {
    int u = Q.front(); Q.pop();
    path.push_back(u);
    int cnt = 0;
    for (int v : E[u]) {
        if (--deg[v] == 0) Q.push(v), cnt++;
    }
    if (cnt > 1) unique = false;
}
```

**例 3** 给出 $m$ 条限制 $a\to b$，如果这不能确定排序方式，那么优先 $1\to$ 其它；如果这还不能确定排序方式，那么优先 $2\to$ 其它；如果这还不能确定排序方式，那么优先 $3\to$ 其它……以此类推。([VJspr9A - 菜肴制作](https://www.luogu.com.cn/problem/P3243))

例如有限制 $2\to4,\ 3\to1$，字典序最小的排序是 $2,3,1,4$，但题目要求的最优解是 $3,1,2,4$，因为优先满足 $1\to$ 其它。因此所求不是字典序最小的排序，但可以证明，所求为 **反向字典序最大** 的排序。**若排序方式不唯一，将 `queue` 修改为 `priority_queue`，则得到字典序最大的排序，修改为小根堆 `priority_queue`，则得到字典序最小的排序。****

### 自洽

**例 1** 给出 $n$ 个人进行的聊天室中，$k$ 个人做的截图，每个截图中截图者都在第一位置，其后各位按照发帖时间前后确定。判断这些聊天室截图是否自洽。顺序给出了前后关系，建图，拓扑判环，无环则自洽。([CF925F - Chat Screenshots](https://codeforces.com/contest/1931/problem/F))

**例 2** 有 $n$ 个操作和 $m$ 个变量，初始值均为 $0$。 现在按 $1\sim n$ 的顺序执行这些操作，第 $i$ 个操作会将其中 $p_{i}$ 个变量赋值为 $i$。 求一种不同于 $1\sim n$ 的执行顺序 $q$，使得按照 $q_{1}, q_{2}, \dots, q_{n}$ 的顺序执行操作会和原顺序得到一样的最终结果。题给字典序最小的序列，只需拓扑排序出字典序最大的序列，看这俩序列是否相同。([F. Equivalent Rewriting](https://codeforces.com/gym/104821/problem/F), [[../contests/VP/2024-10-06-Autumn5-2023ICPC南京|2024-10-06-Autumn5-2023ICPC南京]])

### Problems

**练习 1** 给定一个由有向边与无向边组成的图，现在需要你把所有的无向边变成有向边，使得形成的图中**没有环**。([CF1385E. Directing Edges](https://codeforces.com/contest/1385/problem/E))

对原有的有向边进行拓扑排序，判断有没有环。如果有解的话，让无向边中拓扑序小的指向大的再输出即可。

**练习 2** [2023SDCPCB. Building Company](https://codeforces.com/gym/104417/problem/B)

队友说是拓扑排序思想。

### 2024 ICPC 沈阳 M. Obliviate, Then Reincarnate

```cpp
int n, m, q;
cin >> n >> m >> q;

vector<vector<pair<int, int>>> E(n);
SCC G(n);
while (m--) {
    int u, w;
    cin >> u >> w;
    int v = u + w;
    u = (u % n + n) % n;
    v = (v % n + n) % n;
    G.add(u, v);
    E[u].push_back({ w, v });
}

// DFS 定权
vector<ll> val(n, inf);
auto dfs = [&](auto&& self, int u) -> void {
    for (auto [w, v] : E[u]) {
        if (val[v] == inf) {
            val[v] = val[u] + w;
            self(self, v);
        }
    }
};
for (int u = 0; u < n; u++) {
    if (val[u] == inf) {
        val[u] = 0;
        dfs(dfs, u);
    }
}

auto g = G.work();

// BFS 定权 很有可能出问题
vector<ll> val(n, inf);
auto g = scc.work();
for (int u = 0; u < n; u++) {
    if (val[u] != inf) continue;
    val[u] = 0;
    queue<int> Q;
    Q.push(u);
    while (!Q.empty()) {
        int u = Q.front(); Q.pop();
        for (auto [w, v] : E[u]) {
            if (val[v] != inf) continue;
            if (g.bel[u] != g.bel[v]) continue;  // WA
            val[v] = val[u] + w;
            Q.push(v);
        }
    }
}

vector<int> dp(g.n);
for (int u = 0; u < n; u++) {
    for (auto [w, v] : E[u]) {
        if (g.bel[u] == g.bel[v] && val[u] + w != val[v]) {
            dp[g.bel[u]] = 1;
        }
    }
}

for (int u = 0; u < g.n; u++) {
    for (auto v : g.E[u]) {
        dp[u] |= dp[v];
    }
}

while (q--) {
    int u;
    cin >> u;
    u = (u % n + n) % n;
    cout << (dp[g.bel[u]] ? "Yes" : "No") << endl;
}
```

