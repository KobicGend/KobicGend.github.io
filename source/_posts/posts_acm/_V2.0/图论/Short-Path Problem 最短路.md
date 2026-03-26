---
title: XCPC wiki - Short-Path Problem 最短路
tags:
  - 算法
  - 筆記
  - ACM
  - 圖論
categories:
  - - 筆記
    - XCPCwiki
abbrlink: 70031b2f
hide: true
date: 2025-01-24 22:05:00
updated: 2025-01-24 22:05:00
description:
---

- 单源最短路
  - 正权图
    - 朴素 Dijkstra $\Theta(n^2)$
    - 优化 Dijkstra $\Theta(m\log m)$
  - 负权图
    - Bellman - Ford $\Theta(nm)$
    - SPFA $\Theta(nm)$
- 多源最短路
  - 负权图
    - Johnson $\Theta(nm\log m)$
    - Floyd $\Theta(n^3)$


<div STYLE="page-break-after: always;"></div>

## 正权图的单源最短路


| Input                                                               | Output                        |
| ------------------------------------------------------------------- | ----------------------------- |
| 4 6 1 4 <br>1 2 2 <br>2 3 2 <br>2 4 1 <br>1 3 5 <br>3 4 3 <br>1 4 4 | 0 2 4 3<br>1 1 1 1<br>4<-2<-1 |


### 稠密图——朴素 Dijkstra

从未确定最短路的点中选取最短路长度最小的点，为未确定最短路的点松弛出边，即 $d_v=\min\left\lbrace d_v,\ d_u+w_{uv}\right\rbrace$，循环 $n$ 轮。

时间复杂度 $\Theta(n^2)$，空间 $\Theta(n^2)$，适用于点数较少、边数较多的稠密图。

```cpp
auto Dijkstra = [&](int s) {
    vector<int> dis(n, inf), vis(n);
    dis[s] = 0;  // 起始点初始化

    for (int t = 0; t < n; t++) {   // 循环n轮次
        int u = 0;
        for (int i = 0; i < n; i++) {
            if (!vis[i] && dis[i] < dis[u]) u = i;
        }  // 从未确定最短路的点中 选取最短路长度最小的点
        vis[u] = 1;  // 这个点的最短路已经确定
        for (int v = 0; v < n; v++) {
            if (!vis[v]) dis[v] = min(dis[v], dis[u] + E[u][v]);
        }  // 为未确定最短路的点 松弛出边
    }
    return dis;
};
```





<div STYLE="page-break-after: always;"></div>

### 稀疏图——优化 Dijkstra

从未确定最短路的点集 $Q$ 中选取最短路长度最小的点，松弛它的所有出边，并将这些点加入 $Q$。利用 priority queue 优化，存储 $\left\lbrace d_u,\ u \right\rbrace$，队首元素即是「最短路长度最小的点」。

时间复杂度 $\Theta(m\log m)$，空间 $\Theta(n+m)$，适用于点数较少、边数较多的稠密图。

没有边权的 Dijkstra（01 BFS）：

```cpp
auto bfs = [&](int s) {
    vector<int> dis(n, -1);
    dis[s] = 0;
    queue<int> Q;
    Q.push(s);
    while (!Q.empty()) {
        int u = Q.front(); Q.pop();
        for (auto& v : E[u]) {
            if (dis[v] != -1) continue;
            dis[v] = dis[u] + 1;
            Q.push(v);
        }
    }
    return dis;
};
```

一般的 Dijkstra：

```cpp
auto Dijkstra = [&](int s) {
    vector vis(n, 0);
    vector dis(n, inf);
    dis[s] = 0;   // 初始化
    priority_queue<pair<ll, int>, vector<pair<ll, int>>, greater<>> Q;
    Q.push({ 0, s });  // 起点入队
    while (!Q.empty()) {
        auto [d, u] = Q.top(); Q.pop();
        if (vis[u]) continue;              // 取出未访问的点
        vis[u] = 1;
        for (auto [w, v] : E[u]) {
            if (dis[v] > w + d) {
                dis[v] = w + d;            // 松弛
                Q.push({ dis[v], v });     // 已更新的点加入Q
            }
        }
    }
    return dis;
};
```


<div STYLE="page-break-after: always;"></div>


## 负权图的单源最短路——Bellman - Ford / SPFA

与 Dijkstra 不同，每次循环为所有点松弛出边，而不是未确定最短路的点，循环 $n$ 轮。如果某轮中没有可以松弛的边，则最短路已经确定。如果 $n$ 轮后仍存在可以松弛的边，则存在负环。

时间复杂度 $\Theta(nm)$。

```cpp
auto BellmanFord = [&](int s) {
    vector dis(n, inf);
    dis[s] = 0;
    for (int t = 0; t < n; t++) {
        bool flag = 0;  // 判断一轮循环过程中是否发生松弛操作
        for (int u = 0; u < n; u++) {
            for (auto [w, v] : E[u]) {
                if (dis[v] > dis[u] + w) {
                    dis[v] = dis[u] + w;  // 松弛
                    flag = 1;
                }
            }
        }
        if (!flag) return dis;  // 没有可以松弛的边
    }
    return vector<ll>();  // n轮后仍存在可以松弛的边 存在负环
};
```

vis 优化 BellmanFord：

```cpp
auto BellmanFord = [&](int s) {
    vector vis(n, 0);
    vector dis(n, inf);
    dis[s] = 0;
    for (int t = 0; t < n; t++) {
        bool flag = 0;  // 判断一轮循环过程中是否发生松弛操作
        for (int u = 0; u < n; u++) {
            if (vis[u]) continue;
            for (auto [w, v] : E[u]) {
                if (dis[v] > dis[u] + w) {
                    dis[v] = dis[u] + w;  // 松弛
                    vis[v] = 0;
                    flag = 1;
                }
            }
            vis[u] = 1;
        }
        if (!flag) return dis;  // 没有可以松弛的边
    }
    return vector<ll>();  // n轮后仍存在可以松弛的边 存在负环
};
```

Queue 优化 Bellman - Ford 的 SPFA，在随机图上可实现 $\Theta(n\log n)$ 的复杂度，但最坏时间复杂度仍是 $\Theta(nm)$。

```cpp
auto SPFA = [&](int n, int s) {
    vector<int> vis(n), cnt(n);
    vector dis(n, inf);
    dis[s] = 0, cnt[s] = 1;

    queue<int> Q;
    Q.push(s), vis[s] = 1;
    while (!Q.empty()) {
        int u = Q.front(); Q.pop();
        vis[u] = 0;
        for (auto& [w, v] : E[u]) {
            if (dis[v] > dis[u] + w) {
                dis[v] = dis[u] + w;
                if (!vis[v]) {
                    Q.push(v), vis[v] = 1;
                    if (++cnt[v] > n) return vector<ll>();  // 存在负环
                }
            }
        }
    }
    return dis;
};
```

<div STYLE="page-break-after: always;"></div>


## 多源最短路

| Input                                                                        | Output                                                                      |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| 5 7 <br>1 2 4 <br>1 4 10 <br>2 3 7 <br>4 5 3 <br>4 2 -2 <br>3 4 -3 <br>5 3 4 | 0 4 11 8 11 <br>-1 0 7 4 7 <br>-1 -5 0 -3 0 <br>-1 -2 5 0 3 <br>-1 -1 4 1 0 |
| 5 5 <br>1 2 4 <br>3 4 9 <br>3 4 -3 <br>4 5 3 <br>5 3 -2                      | -1                                                                          |


### 稀疏图——Johnson

因 Dijkstra 不能处理负权图，我们以虚拟的 $n+1$ 号节点为起始点跑负权图的单源最短路，为每个点引入点权 $d_u$，将边权更新为 $E_{uv} := E_{uv} + d_u - d_v$，使边权皆为正，再跑 $n$ 遍优化 Dijkstra。

时间复杂度 $\Theta(nm\log m)$。

```cpp
int n, m;
cin >> n >> m;

int N = n + 1;
vector<vector<pii>> E(N);
while (m--) {
    int u, v, w;
    cin >> u >> v >> w;
    u--, v--;
    E[u].push_back({ w, v });
}

int s = n;  // 源点
for (int i = 0; i < n; i++) {
    E[s].push_back({ 0, i });
}

auto BellmanFord = [&](int s) {
    vector<bool> vis(N);
    vector dis(N, inf);
    dis[s] = 0;
    for (int t = 0; t < N; t++) {
        bool flag = 0;  // 判断一轮循环过程中是否发生松弛操作
        for (int u = 0; u < N; u++) {
            if (vis[u]) continue;
            for (auto [w, v] : E[u]) {
                if (dis[v] > dis[u] + w) {
                    dis[v] = dis[u] + w;  // 松弛
                    vis[v] = 0;
                    flag = 1;
                }
            }
            vis[u] = 1;
        }
        if (!flag) return dis;  // 没有可以松弛的边
    }
    return vector<ll>();  // N轮后仍存在可以松弛的边 存在负环
};

auto Dijkstra = [&](int s) {
    vector vis(N, 0);
    vector dis(N, inf);
    dis[s] = 0;   // 初始化
    priority_queue<pair<ll, int>, vector<pair<ll, int>>, greater<>> Q;
    Q.push({ 0, s });  // 起点入队
    while (!Q.empty()) {
        auto [d, u] = Q.top(); Q.pop();
        if (vis[u]) continue;              // 取出未访问的点
        vis[u] = 1;
        for (auto [w, v] : E[u]) {
            if (dis[v] > w + d) {
                dis[v] = w + d;            // 松弛
                Q.push({ dis[v], v });     // 已更新的点加入Q
            }
        }
    }
    return dis;
};

auto dis = BellmanFord(s);

if (dis.empty()) {
    cout << "-1\n\n";
} else {
    for (int u = 0; u < n; u++) {
        for (auto& [w, v] : E[u]) w += dis[u] - dis[v];  // 必须加引用
    }
    for (int u = 0; u < n; u++) {
        auto d = Dijkstra(u);
        for (int v = 0; v < n; v++) {
            if (d[v] == inf) cout << "-1 ";
            else cout << (d[v] -= (dis[u] - dis[v])) << ' ';
        }
        cout << '\n';
    }
}
```



<div STYLE="page-break-after: always;"></div>

### 稠密图——Floyd

$f_{k,i\to j}$ 表示只经过节点 $1\sim k$，从 $i$ 到 $j$ 的最短路。

由 $d_{i \to j}=\min\limits_k \left\lbrace d_{i \to k}+d_{k \to j} \right\rbrace$，得 $f_{k,i\to j}=\min \left\lbrace f_{k-1,i \to j},\ f_{k-1,i \to k}+f_{k-1,k \to j} \right\rbrace$。第一维可压缩。

时间复杂度 $\Theta(n^3)$，空间复杂度 $\Theta(n^2)$。

```cpp
auto Floyd = [&]() {
    auto dis = E;
    for (int u = 0; u < n; u++) dis[u][u] = 0;
    for (int k = 0; k < n; k++) {
        for (int u = 0; u < n; u++) {
            for (int v = 0; v < n; v++)
                dis[u][v] = min(dis[u][v], dis[u][k] + dis[k][v]);
            if (dis[u][u] < 0) return vector<vector<ll>>();  // 存在负环
        }
    }
    return dis;  // 没有负环
}
```


<div STYLE="page-break-after: always;"></div>



## Problems

### 最短路计数

更新时，若边权相同，则继承父节点的最短路数量；否则替换最短路数量。最短路计数会炸 int128，可以用 double 或者取模判断。

**例 1** 有公路和铁路，其中铁路由点 $1$ 引出，问至多删除多少条铁路不会影响从 $1$ 到任意点的最短路长度。([VJspr8H - Jzzhu and Cities](https://codeforces.com/contest/449/problem/B))

**思路** 先用公路跑最短路，对铁路依次判断，若 $w\geqslant d_v$，则可以删除。

| Hacked                                               |
| ---------------------------------------------------- |
| 4<br>3<br>1 2 1<br>2 3 3<br>3 4 2<br>2<br>3 3<br>4 5 |

应当用公路和铁路的所有路来跑最短路，再对铁路依次判断，若 $w>d_v$，则可以删除，若 $w=d_v$，且不是惟一最短路，则可以删除。

```cpp
int n, m, k;
cin >> n >> m >> k;

vector<pair<int, int>> train;
vector<vector<pair<int, int>>> E(n);  // 邻接表存边
while (m--) {
    int u, v, w;
    cin >> u >> v >> w;
    u--, v--;
    E[u].push_back({ w, v });
    E[v].push_back({ w, u });
}

while (k--) {
    int v, w;
    cin >> v >> w;
    v--;
    E[0].push_back({ w, v });
    E[v].push_back({ w, 0 });
    train.push_back({ w, v });
}

vector dis(n, Inf);    // 单源最短路
vector<int> vis(n);        // 是否访问过
vector<int> from(n, -1);   // 最短路径
vector<ll> pcnt(n);        // 最短路径的数量
dis[0] = 0, pcnt[0] = 1;   // 初始化

priority_queue<pair<ll, int>, vector<pair<ll, int>>, greater<>> Q;
Q.push({ 0, 0 });
while (!Q.empty()) {
    auto [d, u] = Q.top(); Q.pop();
    if (vis[u]) continue;              // 取出未访问的点
    vis[u] = 1;
    for (auto& [w, v] : E[u]) {
        if (dis[v] > w + d) {
            dis[v] = w + d;            // 松弛
            from[v] = u;               // 前驱记录路径
            pcnt[v] = pcnt[u];         // 更新最短路数量
            Q.push({ dis[v], v });     // 已更新的点加入Q
        }
        else if (dis[v] == w + d) {
            pcnt[v] += pcnt[u];        // 继承最短路数量
            if (pcnt[v] > 1e18) pcnt[v] = 1e18;  // WA7：炸LL
        }
    }
}
    
int ans = 0;
for (auto [w, v] : train) {
    if (w > dis[v]) ++ans;
    else if (w == dis[v] && pcnt[v] > 1) --pcnt[v], ++ans;
}
cout << ans << "\n";
```


**例 2** 无向图，有边权，$m$ 次询问，每次询问删去第 $i$ 条边是否会影响 $1-n$ 最短路，询问间独立。$n ,m \leqslant 2\times 10^{5}$。([ABC375G - Road Blocked 2](https://atcoder.jp/contests/abc375/tasks/abc375_g))

**思路** 实际上是询问最短路是否必须经过 $u-v$，如果是，那必须长度一样，且路径唯一。具体来说，要满足 $d_{1u}+w+d_{vn}=d_{1n}$，以及 $p_{1u}\cdot p_{vn}=p_{1n}$，其中 $p$ 表示最短路数量。注意 $u$ 是靠近 $1$ 的那个点（也就是满足 $d_{1u}<d_{1v}$）。

从 $1$ 和 $n$ 各跑一次最短路，同时最短路计数。最短路计数会炸 int128，可以用 double 或者取模判断。

时间复杂度 $\Theta(m\log m)$。

```cpp
int n, m;
cin >> n >> m;
vector<vector<pair<int, int>>> E(n);
vector<array<int, 3>> edge(m);
for (int i = 0; i < m; i++) {
    int u, v, w;
    cin >> u >> v >> w;
    u--, v--;
    E[u].push_back({ w, v });
    E[v].push_back({ w, u });
    edge[i] = { u, v, w };
}

auto Dijkstra = [&](int s) {
    vector dis(n, Inf);
    vector<int> vis(n);
    vector<int> from(n, -1);
    vector<ll> pcnt(n);
    dis[s] = 0, pcnt[s] = 1;
    priority_queue<pair<ll, int>, vector<pair<ll, int>>, greater<>> Q;
    Q.push({ 0, s });
    while (!Q.empty()) {
        auto [d, u] = Q.top(); Q.pop();
        if (vis[u]) continue;
        vis[u] = 1;
        for (auto& [w, v] : E[u]) {
            if (dis[v] > w + d) {
                dis[v] = w + d;
                from[v] = u;
                pcnt[v] = pcnt[u];
                Q.push({ dis[v], v });
            }
            else if (dis[v] == w + d) {
                (pcnt[v] += pcnt[u]) %= mod;
            }
        }
    }
    return make_pair(dis, pcnt);
};
auto [d1, p1] = Dijkstra(0);
auto [dn, pn] = Dijkstra(n - 1);

for (auto& [u, v, w] : edge) {
    if (d1[u] > d1[v]) swap(u, v);
    bool only = (d1[u] + w + dn[v] == dn[0]) && (p1[u] * pn[v] % mod == pn[0]);
    cout << (only ? "Yes" : "No") << "\n";
}
```

### 从起点和终点分别跑一边最短路

**例 1** $n$ 点 $m$ 边无向图，$k$ 个特殊点，需要连一条边，其两端都是特殊点，求所有连边方式中，从 $1$ 到 $n$ 的最短路的最大值。([CF1307D. Cow and Fields](https://codeforces.com/problemset/problem/1307/D))

**思路** 设在 $u$ 和 $v$ 中连边，则经过这条边的最短路为 $\min\lbrace d_{1u}+1+d_{nv},\ d_{1v}+1+d_{nu} \rbrace$，所求即是
$$
\max_{1 \leqslant u,v \leqslant n}\big\lbrace \min\lbrace d_{1u}+1+d_{nv},\ d_{1v}+1+d_{nu} \rbrace \big\rbrace
$$

如果枚举 $u,v$，复杂度是 $\Theta(k^{2})$ 的，需要优化。

不失一般性地假设 $d_{1u}+1+d_{nv}> d_{1v}+1+d_{nu}$，这样所求即是
$$
\max_{1 \leqslant v \leqslant n,\ u\in S}\big\lbrace \min\lbrace d_{1v}+1+d_{nu} \rbrace \big\rbrace=\max_{1 \leqslant v \leqslant n}\big\lbrace d_{1v}+1+\min_{u\in S}\lbrace d_{nu} \rbrace \big\rbrace
$$
式中，$u$ 需满足 $d_{1u}+1+d_{nv}> d_{1v}+1+d_{nu}$，这等价于 $d_{1u}-d_{nu}> d_{1v}-d_{nv}$，两个变元是独立的，因此如果按照 $d_{1u}-d_{nu}$ 降序排序，遍历到 $v$ 时，所需用来更新的 $u$ 都是之前遍历过的，按主机派的思想，每遍历一个 $v$，先从集合中取出最小元素 $\min\limits_{u\in S}\lbrace d_{nu}\rbrace$，更新答案，再用 $d_{vu}$ 更新原集合，如此循环，时间复杂度 $\Theta(k)$。

时间复杂度 $\Theta(n+k\log k)$，时间主要用在排序上。

```cpp
void eachT() {
    int n, m, k;
    cin >> n >> m >> k;

    vector<int> tag(k);
    for (int i = 0; i < k; i++) {
        cin >> tag[i];
        tag[i]--;
    }

    vector<vector<pii>> E(n);
    while (m--) {
        int u, v;
        cin >> u >> v;
        u--, v--;
        E[u].push_back({ 1, v });
        E[v].push_back({ 1, u });
    }

    auto Dijkstra = [&](int st) {
        vector dis(n, Inf);
        dis[st] = 0;
        vector<int> vis(n);

        using T = pair<ll, int>;
        priority_queue<T, vector<T>, greater<>> Q;
        Q.push({ 0, st });
        while (!Q.empty()) {
            auto [d, u] = Q.top(); Q.pop();
            if (vis[u]) continue; vis[u] = 1;
            for (auto& [w, v] : E[u]) {
                if (dis[v] > w + d) {
                    dis[v] = w + d;
                    Q.push({ dis[v], v });
                }
            }
        }
        return dis;
    };

    auto d0 = Dijkstra(0);
    auto dn = Dijkstra(n - 1);

    using node = struct { ll d0, dn; };
    vector<node> dp(k);
    for (int i = 0; i < k; i++) {
        dp[i].d0 = d0[tag[i]];
        dp[i].dn = dn[tag[i]];
    }

    sort(dp.begin(), dp.end(), [](node a, node b) {
        return a.d0 - a.dn > b.d0 - b.dn;
    });

    ll ans = 0, dnmx = dp[0].dn;
    for (int i = 1; i < k; i++) {
        ans = max(ans, dp[i].d0 + dnmx + 1);
        dnmx = max(dnmx, dp[i].dn);
    }

    ans = min(ans, dn[0]);
    cout << ans << '\n';
}
```

### 边权改变问题——分层图

分层图用于解决 **边权改变** 的最短路问题。层数 $k$ 不能太大，要求 $kn$ 在点数允许范围内，一般 $k \leqslant 10$。

第 $i$ 层图点 $u$ 的编号为 $in+u$，从第 $f$ 层图向第 $t$ 层图连边：

```cpp
int N = n * k;
vector<vector<pii>> E(N);
auto add = [&](int f, int t, int u, int v, int w) {
    E[f * n + u].push_back({ w, t * n + v });
    E[f * n + v].push_back({ w, t * n + u });
};
```

**例 1** 给定 $n$ 个城市，$m$ 条双向道路，道路有通行费，且可以免费在最多 $k$ 条道路上免通行费。求出行最少花费。([洛谷 P4568 飞行路线](https://www.luogu.com.cn/problem/P4568))

数据范围：$2 \leqslant n \leqslant 10^4$，$1 \leqslant m \leqslant 5\times 10^4$，$0 \leqslant k \leqslant 10$，$0 \leqslant w \leqslant 10^3$。

**思路** 建 $k+1$ 层图，每层图向下一层图的边权为 $0$。

```cpp
void eachT() {
    int n, m, k, st, ed;
    cin >> n >> m >> k >> st >> ed;
    ++k;

    int N = n * k;
    vector<vector<pii>> E(N);
    auto add = [&](int f, int t, int u, int v, int w) {
        E[f * n + u].push_back({ w, t * n + v });
        E[f * n + v].push_back({ w, t * n + u });
    };
    while (m--) {
        int u, v, w;
        cin >> u >> v >> w;
        for (int i = 0; i < k; i++) add(i, i, u, v, w);
        for (int i = 1; i < k; i++) add(i - 1, i, u, v, 0);
    }

    auto dis = Dijkstra(st);
    int ans = inf;
    for (int i = 0; i < k; i++) {
        ans = min(ans, dis[i * n + ed]);
    }
    cout << (ans == Inf ? -1 : ans) << '\n';
}
```

**例 2** 给定一个包含 $n$ 个点，$m$ 条带权无向边的图。规定若一条路径所包含的边边集为 $E$，那么这条路径的权值为 $\sum w_i-\max w_i+\min w_i$。求从 $1$ 号点到每个点的最短路。

数据范围：$2 \leqslant n \leqslant 2\times10^5,\ 1 \leqslant m \leqslant 2\times10^5,\ 0 \leqslant w_i \leqslant 10^9$。

**思路** 可以把路径的权值理解为：必须将路径上的任意一条边不算代价，任意一条边算 2 倍代价。这样我们就把对两条极值边的贡献方式转化成了所有边的贡献方式。更加统一，易于处理。

这两种特殊代价没有先后顺序，故建 $4$ 层图：$1\to2$ 边权为 $0$，$2\to4$ 边权为 $2w$，$1\to3$ 边权为 $2w$，$3\to4$ 边权为 $0$。

答案为第 $1$ 层与第 $4$ 层图对应的答案的较小值。

```cpp
void eachT() {
    int n, m;
    cin >> n >> m;

    int N = n * 4;
    vector<vector<pii>> E(N);
    auto add = [&](int f, int t, int u, int v, int w) {
        E[f * n + u].push_back({ w, t * n + v });
        E[f * n + v].push_back({ w, t * n + u });
    };
    while (m--) {
        int u, v, w;
        cin >> u >> v >> w;
        u--, v--;
        for (int i = 0; i < 4; i++) add(i, i, u, v, w);
        add(0, 1, v, u, 0);
        add(1, 3, v, u, 2 * w);
        add(0, 2, v, u, 2 * w);
        add(2, 3, v, u, 0);
    }

    auto dis = Dijkstra(0);
    for (int i = 1; i < n; i++) {
        cout << min(dis[i], dis[3 * n + i]) << ' ';
    }
}
```

**例 3** 骑马 [CF2014E. ZRendez-vous de Marian et Robin](https://codeforces.com/contest/2014/problem/E)

```cpp
void eachT() {
    int n, m, h;
    cin >> n >> m >> h;

    vector<int> ishalf(n);
    for (int i = 0; i < h; i++) {
        int x;
        cin >> x;
        x--;
        ishalf[x] = 1;
    }

    vector<vector<pii>> E(n);
    while (m--) {
        int u, v, w;
        cin >> u >> v >> w;
        u--, v--;
        E[u].push_back({ w, v });
        E[v].push_back({ w, u });
    }

    auto Dijkstra = [&](int st) {
        vector dis(n, array{ Inf, Inf });
        dis[st][0] = 0;
        vector vis(n, array{ 0, 0 });

        using T = tuple<ll, int, bool>;
        priority_queue<T, vector<T>, greater<>> Q;
        Q.push({ 0, st, 0 });  // dis, u, half
        while (!Q.empty()) {
            auto [d, u, half] = Q.top(); Q.pop();
            if (vis[u][half]) continue; vis[u][half] = 1;
            if (ishalf[u]) half = 1;
            for (auto [w, v] : E[u]) {
                if (half) w /= 2;
                if (dis[v][half] > d + w) {
                    dis[v][half] = d + w;
                    Q.push({ dis[v][half], v, half });
                }
            }
        }

        vector<ll> d(n);
        for (int i = 0; i < n; i++) {
            d[i] = min(dis[i][0], dis[i][1]);
        }
        return d;
    };
    
    auto d0 = Dijkstra(0);
    auto dn = Dijkstra(n - 1);

    ll ans = Inf;
    for (int i = 0; i < n; i++) {
        ans = min(ans, max(d0[i], dn[i]));
    }
    cout << (ans == Inf ? -1 : ans) << '\n';
}
```

**例 4** [2024 ICPC 网络赛 II E. Escape](https://codeforces.com/gym/105358/problem/E)

机器人的活动范围距离起点的距离最大是 $d$，把所有起点扔到队列里，用 BFS 预处理找到到达每个点的步数。

对于某个点，玩家到达步数是 $x$，机器人到达步数是 $y$，则如果 $x$ 与 $y$ 的奇偶性相同，且 $x \geqslant y$，这个点就走不能经过。对于同一个点的 $x,y$ 可能有多个，只要存在一个 $x$，对于所有的 $y$ 都满足上述条件即可。因此只需与奇数 $y$ 或偶数 $y$ 的最小值比较。BFS 可以保证第一次访问的点就是最小值。

用 BFS 寻路。寻路的时候记录步数 $x$，与同奇偶性的 $y$ 比较，同时记录到达这个点的前驱，以输出路径。

每个点都可以经过两次，所以 `vis` 等数组都开成二维的，奇偶相互独立。

注意输出路径时不能写 `if (u == 1) break`，可能玩家走 `1->2->3->1` 改变奇偶性，导致实际路径长度与输出的不符。在 BFS 里走到 $n$ 就输出返回是比较好的写法。

Bonus：如果数据有 $d=0$ 需特判，则不用考虑所有机器人，因为它们必定原地爆炸。

```cpp
int n, m, D;
cin >> n >> m >> D;

vector<vector<int>> E(n);
while (m--) {
    int u, v;
    cin >> u >> v;
    u--, v--;
    E[u].push_back(v);
    E[v].push_back(u);
}

queue<pair<int, int>> Q;

vector val(n, array{ inf, inf });
int k;
cin >> k;
while (k--) {
    int x;
    cin >> x;
    x--;
    val[x][0] = 0;
    Q.push({ 0, x });
}

while (!Q.empty()) {
    auto [d, u] = Q.front();
    Q.pop();
    if (d >= D) continue;
    ++d;
    for (auto& v : E[u]) {
        if (val[v][d & 1] != inf) continue;
        val[v][d & 1] = d;
        Q.push({ d, v });
    }
}

vector from(n, array{ -1, -1 });
Q.push({ 0, 0 });
while (!Q.empty()) {
    auto [d, u] = Q.front();
    Q.pop();

    if (u == n - 1) {
        cout << d << '\n';
        vector<int> path;
        while (d >= 0) {
            path.push_back(u);
            u = from[u][d & 1];
            d--;
        }
        for (int i = path.size() - 1; i >= 0; --i) {
            cout << path[i] + 1 << ' ';
        }
        cout << '\n';
        return 0;
    }

    ++d;
    for (auto& v : E[u]) {
        if (d >= val[v][d & 1]) continue;
        if (~from[v][d & 1]) continue;
        from[v][d & 1] = u;
        Q.push({ d, v });
    }
}

cout << "-1\n";
```

**例 5** Alice 和 Bob 在一张简单无向图上博弈，Alice 先手。每次每人必须沿着当前所在的点的一条边走到另一端，不能走到对手所在的位置，不能行动者输。对于每个 $i$ 从 $1$ 到 $n-1$，求出 Alice 初始在 $0$ 号点，Bob 初始在 $i$ 号点，谁会赢或平局。([SunBoYi](https://acm.hdu.edu.cn/showproblem.php?pid=7547) [[../contests/2024杭电多校/2024-08-18：2024“钉耙编程”中国大学生算法设计超级联赛（10）|2024-08-18：2024“钉耙编程”中国大学生算法设计超级联赛（10）]])

首先特判两人在两个连通块里的情况，是简单的，除了孤立点的情况外，必然可以一直沿着一条边反复横跳无限走。接下来默认两人在同一连通块。

不难发现，如果一个人走到了环上，那么他就立于不败之地。同样不难发现，如果一根人走到了连接两个环的一根链上，他也不会输，因为其两边必然只能有最多一边可能被对手阻挡，那么他一定能走到一个环上。我们称这两类点为好点。

所以我们对于两人分别求出，自己能否阻挡对方进入某个好点。

首先先判断掉该连通块是树的情况，此时不存在好点，胜负只与初始 Alice 和 Bob 的距离的奇偶性有关。

否则，我们先求出好点，用类似基环树和拓扑排序的方法剥一度点，剩下的都是好点。

对于一个人，考虑为了阻挡对手进入好点，他必须尽快赶到离对手最近的好点。同时，与树的情况类似的，还需要保持距离的奇偶性正确，才能把对手逼到某个一度点，不然他会被迫后退，让对手走到好点。所以相当于要求他的初始位置到离对手最近的好点，且奇偶性给定的最短路长度，并于对手要走的距离进行比较。由于起点或终点固定，故可以分层图 BFS 解决。

```cpp
int n, m;
cin >> n >> m;

DSU dsu(n);
vector<vector<int>> E(n);
while (m--) {
    int u, v;
    cin >> u >> v;
    u--, v--;
    E[u].push_back(v);
    E[v].push_back(u);
    dsu.uno(u, v);
}

string ans(n - 1, '?');

// 和0不在同一个连通块内
for (int i = 1; i < n; i++) {
    if (!dsu.same(i, 0)) {
        if (dsu.size(0) == 1) ans[i] = 'B';
        else if (dsu.size(i) == 1) ans[i] = 'A';
        else ans[i] = 'D';
    }
}

// 和0在同一个连通块内
vector<int> dis(n), vis(n);
auto dfs = [&](this auto&& self, int u, int p) {
    vis[u] = true;
    for (auto& v : E[u]) {
        if (v == p) continue;
        if (vis[v]) return false;  // 有环
        dis[v] = dis[u] + 1;
        if (!self(v, u)) return false;
    }
    return true;  // 无环
};
if (dfs(0, -1)) {  // 无环 树
    for (int i = 1; i < n; i++) {
        if (dsu.same(i, 0)) ans[i] = dis[i] & 1 ? 'B' : 'A';
    }
}
else {  // 有环
    vector<int> deg(n);
    SSN ssn(n);
    queue<int> Q;
    for (int i = 0; i < n; i++) {
        if (dsu.same(i, 0)) {
            deg[i] = E[i].size();
            if (deg[i] == 1) Q.push(i);
        }
    }
    while (!Q.empty()) {
        int u = Q.front(); Q.pop();
        for (auto& v : E[u]) {
            ssn.uno(v, u, 1);  // dis[u] = dis[v] + 1  到最近的环的距离
            if (--deg[v] == 1) Q.push(v);
        }
    }

    auto bfs = [&](int st) {
        vector dis(n, array{ inf, inf });
        queue<pair<int, int>> Q;
        dis[st][0] = 0;
        Q.push({ st, 0 });
        while (Q.size()) {
            auto [u, d] = Q.front(); Q.pop();
            for (auto& v : E[u]) {
                if (dis[v][!d] != inf) continue;
                dis[v][!d] = dis[u][d] + 1;
                Q.push({ v, !d });
            }
        }
        return dis;
    };
    auto d0 = bfs(0);
    auto dp = bfs(ssn.find(0));

    for (int i = 1; i < n; i++) {
        if (dsu.same(i, 0)) {
            if (d0[ssn.find(i)][ssn.depth(i) & 1] <= ssn.depth(i)) ans[i] = 'A';
            else if (dp[i][!(ssn.depth(0) & 1)] <= ssn.depth(0) - 1) ans[i] = 'B';
            else ans[i] = 'D';
        }
    }
}

for (int i = 1; i < n; i++) {
    cout << ans[i];
}
cout << "\n";
```


### 建立虚点连边

坐地铁，求最少搭乘几种线路，即求最小地铁换乘次数 + 1。(2260, [CF1941G. Rudolf and Subway](https://codeforces.com/contest/1941/problem/g))

```cpp
int n, m;
cin >> n >> m;

vector<vector<int>> E(n + m);
while (m--) {
    cin >> u >> v >> c;
    u--, v--, c += n;
    E[c].push_back(u), E[u].push_back(c);
    E[c].push_back(v), E[v].push_back(c);
}  

int s, t;
cin >> s >> t;
s--, t--;
cout << (bfs(s)[t] / 2) << "\n";
```

### 刷微信步数——倍增优化 Floyd

**题意** 有向图，每条边的边权为 1km，走路的速度为每单位时间 1km，空间跑路器为每单位时间 $2^k$ km（$k$ 是任意自然数），求从点 $1$ 到点 $n$ 的最短时间。数据范围：$2 \leqslant n \leqslant 50$，$m \leqslant 10 ^ 4$，保证有解。([VJsum4A - 洛谷 P1613 跑路](https://www.luogu.com.cn/problem/P1613))

**思路** 如果有 $u,v$ 两点间的最短距离为 $2^k$，可认为这两点之间有一条边。设 $f_{i,j,k}$ 表示能否在 $2^i$ 时间内从点 $j$ 走到点 $k$，则
$$
f_{i, v, u}\leftarrow
\begin{cases}
f_{i-1, v, k} \otimes f_{i-1, k, u},& i>0\\
E_{u,v},& i=0
\end{cases}
$$

```cpp
int n, m;
cin >> n >> m;

vector f(D, vector(n, vector<int>(n)));
while (m--) {
    int u, v;
    cin >> u >> v;
    u--, v--;
    f[0][u][v] = 1;
}

// 倍增
for (int bit = 1; bit < D; bit++) {
    for (int k = 0; k < n; ++k)
        for (int u = 0; u < n; u++)
            for (int v = 0; v < n; v++)
                f[bit][u][v] |= f[bit - 1][u][k] & f[bit - 1][k][v];
}

// 建图
vector adj(n, vector(n, inf));
for (int u = 0; u < n; u++) {
    for (int v = 0; v < n; v++)
        for (int bit = 0; bit < D; bit++)
            if (f[bit][u][v]) adj[u][v] = 1;
}

// Floyd
for (int k = 0; k < n; ++k) {
    for (int u = 0; u < n; u++)
        for (int v = 0; v < n; v++)
            adj[u][v] = min(adj[u][v], adj[u][k] + adj[k][v]);
}

cout << adj[0][n - 1] << "\n";
```

### 恰好 k 边最短路

给定无向图，求从起点到终点的恰好经过 $k$ 条边的最短路。数据范围：边数 $m \leqslant 100$，$2 \leqslant k \leqslant 10^{6}$，保证有解。([AcWing345. 牛站](https://www.acwing.com/problem/content/347/), [洛谷 P2886 Cow Relays G](https://www.luogu.com.cn/problem/P2886))

#### 矩阵快速幂优化 Floyd

设 $f_{i,u,v}$ 表示恰好经过 $i$ 条边的最短路，则
$$
f_{i, u, v}\leftarrow
\begin{cases}
f_{i-1, u, k} +E_{k,v},& i>1\\
E_{u, v},& i=1
\end{cases}
$$

时间复杂度为 $\Theta(n^{3}k)$，需要快速计算 $f_{i,u,v}$。注意到，上式具有结合律，可以使用倍增优化。最终时间复杂度为 $\Theta(n^{3}\log k)$。

```cpp
using Matrix = vector<vector<int>>;

Matrix mul(Matrix& a, Matrix& b) {
    const int n = a.size();
    Matrix res(n, vector<int>(n, inf));
    // Floyd
    for (int k = 0; k < n; ++k) {
        for (int u = 0; u < n; u++) {
            for (int v = 0; v < n; v++) {
                res[u][v] = min(res[u][v], a[u][k] + b[k][v]);
            }
        }
    }
    return res;
}

Matrix qpow(Matrix& a, int n) {
    auto res = a;
    --n;

    while (n) {
        if (n & 1) res = mul(res, a);
        a = mul(a, a);
        n >>= 1;
    }
    return res;
}

int main() {
    int k, m;
    cin >> k >> m;

    int n = 0;
    unordered_map<int, int> mp;
    auto get = [&](int u) {
        if (!mp.count(u)) mp[u] = n++;
        return mp[u];
    };

    int s, t;
    cin >> s >> t;
    s = get(s), t = get(t);

    vector adj(m, vector(m, inf));
    while (m--) {
        int u, v, w;
        cin >> w >> u >> v;
        u = get(u), v = get(v);

        adj[u][v] = adj[v][u] = min(adj[u][v], w);
    }

    auto res = qpow(adj, k);
    cout << res[s][t] << "\n";

    return 0;
}
```

#### 强制转移的 Bellmon-Ford

时间复杂度 $\Theta(km)$。

```cpp
vector dis(n, inf);
dis[s] = 0;
for (int t = 0; t < k; t++) {
    vector ndis(n, inf);   // 初始化为无穷以强制转移 如果写ndis=dis允许不转移
    for (auto& [w, u, v] : E) {
        ndis[u] = min(ndis[u], dis[v] + w);
        ndis[v] = min(ndis[v], dis[u] + w);
    }
    dis = ndis;
}
cout << dis[t] << endl;
```

一种看不懂的做法：

当 $N$ 很大的时候，最优策略一定是在某个边权很小的边上绕圈。

**性质 1**：只有可能在路径上一条最短的边上连续走多次。

**证明**：假如在其他边上连续走了多次，那我们可以将路径上来回走的一对边 $(u\to v,v\to u)$ 删去，换成在最短的边上来回走，这样一定不劣。

**性质 2**：只有路径上的一条最短边可能被在同一方向经过三次及以上，这里“经过”不要求连续。

**证明**：假如另外一条边被在同一方向经过三次及以上，那么路径上一定有包含这条边的两个环。若这两个环中有至少一个长度为偶数，那么可以删去这个环并在最短边上来回走；否则，两个环的长度都是奇数，把两个环都删去，换成在最短边上来回走即可。

**结论**：最优方案下，只会有至多一条边被经过 $>2$ 次。

设 $f_{u,d}$ 表示从 $S$ 到 $u$，经过的边数为 $d$ 的最短路。由于每条边都被经过 $\le 2$ 次，只需算出 $d\le 2T$ 的 $f$ 即可。于是可以 $\mathcal{O}(T^2)$ 预处理。同理，预处理 $g_{u,d}$ 表示从 $E$ 的。

枚举每条边作为那条被多次经过的边，并 $\mathcal{O}(T)$ 算出最小值即可。具体计算方式可见代码中的 `Calc` 函数。

```cpp
#include <iostream>
#include <algorithm>
#include <vector>
#include <unordered_map>
using namespace std;
typedef long long ll;
const int inf = 0x3f3f3f3f;
signed main() {
    int k, m;
    cin >> k >> m;

    int n = 0;
    unordered_map<int, int> mp;
    auto get = [&](int u) {
        if (!mp.count(u)) mp[u] = n++;
        return mp[u];
    };

    int s, t;
    cin >> s >> t;
    s = get(s), t = get(t);

    vector<tuple<int, int, int>> E(m);
    for (auto& [w, u, v] : E) {
        cin >> w >> u >> v;
        u = get(u), v = get(v);
    }

    auto bfs = [&](int s) {
        vector dis(m, vector(m + 1 << 1, inf));
        dis[s][0] = 0;
        for (int i = 1; i <= (m << 1 | 1); i++) {
            for (auto& [w, u, v] : E) {
                dis[u][i] = min(dis[u][i], dis[v][i - 1] + w);
                dis[v][i] = min(dis[v][i], dis[u][i - 1] + w);
            }
        }
        return dis;
    };
    auto ds = bfs(s), dt = bfs(t);

    auto Calc = [&](int u, int w) {
        int res = inf;
        for (int c = 0; c <= 1; c++) {
            int mn = inf;
            for (int j = m * 2 + c, l = (k + c) % 2 - 2; j >= 0; j -= 2) {
                while (l < m * 2 && k - j - l>1) {
                    l += 2;
                    mn = min(mn + 2 * w, dt[u][l]);
                }
                if (mn >= inf || ds[u][j] >= inf) continue;
                res = min(res, mn + ds[u][j] + (k - j - l) * w);
            }
        }
        return res;
    };

    int ans = inf;
    for (auto& [w, u, v] : E) {
        ans = min(ans, min(Calc(u, w), Calc(v, w)));
    }
    cout << ans << endl;

    return 0;
}
```

### 建模

**例 1** 小红拿到了一个数组，她可以进行若干次以下操作：
1. 选择一个元素，花费 $p$，使其加 $x=1$。
2. 选择一个元素，花费 $q$，使其减 $y$。

希望若干次操作后，数组的平均数是一个整数，求最小总代价。([小红的数组操作](https://ac.nowcoder.com/acm/contest/93086/K))

**方法一** 直接算，注意可以减为负数，所以循环从 $1$ 到 $n$ 要跑满：

```cpp
int n, p, x, q, y;
cin >> n >> p >> x >> q >> y;

int sum = 0;
for (int i = 0; i < n; i++) {
    int x;
    cin >> x;
    (sum += x) %= n;
}

ll min = 1e18;
for (int i = 0; i < n; i++) {
    min = std::min(min, 1ll * q * i + p * (n - (sum - 1ll * i * y - 1) % n - 1));
}
cout << min << "\n";
```

这种方法在 Hard 版本仍然使用，不同的是，我们需要知道每次加 $x$，得到目标 $k$ 的最小次数。有两种方案可以求：
- $ax≡b \pmod n$，可以直接使用 exgcd 来解决。
- 开个数组直接预处理出 $kx$ 在模 $n$ 意义下的值，这样即可 O(1) 调用了。

```cpp
int n, p, x, q, y;
cin >> n >> p >> x >> q >> y;

int sum = 0;
for (int i = 0; i < n; i++) {
    int x;
    cin >> x;
    (sum += x) %= n;
}

vector mp(n, Inf);
for (int i = n - 1; i >= 0; i--) {  // 倒着循环，这样最后一次访问就是最小代价
    mp[(1ll * i * x + sum) % n] = 1ll * i * p;
}

ll res = Inf;
for (int i = 0; i <= n; i++) {
    res = min(res, mp[1ll * i * y % n] + 1ll * i * q);
}
cout << (res == Inf ? -1 : res);
```

**方法二** 求最小代价，可以联想到最短路：

```cpp
int n, p, x, q, y;
cin >> n >> p >> x >> q >> y;

int s = 0;
for (int i = 0; i < n; i++) {
    int x;
    cin >> x;
    (s += x) %= n;
}

vector dis(n, Inf);
vector<bool> vis(n);
priority_queue<pair<ll, int>, vector<pair<ll, int>>, greater<>> Q;
Q.push({ 0, s });
dis[s] = 0;
while (!Q.empty()) {
    auto [d, u] = Q.top();
    Q.pop();
    if (vis[u]) continue;
    vis[u] = 1;
    
    int v1 = ((u + x) % n + n) % n;
    if (dis[v1] > dis[u] + p) {
        dis[v1] = dis[u] + p;
        Q.push({ dis[v1], v1 });
    }
    
    int v2 = ((u - y) % n + n) % n;
    if (dis[v2] > dis[u] + q) {
        dis[v2] = dis[u] + q;
        Q.push({ dis[v2], v2 });
    }
}

cout << (dis[0] == Inf ? -1 : dis[0]) << endl;
```



**例 2** $n$ 个问题编号从 $1$ 到 $n$，每个问题有得分 $a_i$ 和参数 $b_i$。

从第一个问题开始回答，按如下次序回答每个问题，两种选择：
- 提交问题并获得 $a_i$ 分，然后问题作废，下一题的下标 $j$ 是满足 $j<i$ 且问题未作废的最大下标；
- 跳过问题，然后问题作废，下一题的下标 $j$ 是满足 $j \leqslant b_{i}$ 且问题未作废的最大下标。

最大化得分。([CF2023B. Skipping](https://codeforces.com/contest/2023/problem/B))

这个「下一题」类似于图论中的有向边，最大化得分即是最长路，考虑建图。
- $i\to b_{i}$ 连边权为 $-a_{i}$ 的边，表示跳过问题；
- $i\to i-1$ 连边权为 $0$ 的边，表示提交问题；
- $i\to t$ 连边权为 $\sum_{j=1}^{i} a_{j}$ 的边，表示不再跳过问题，按顺序回答前面的每个问题直至结束。（其中 $t$ 是汇点）

跑 $1\to t$ 的最长路即是答案。共 $3n$ 条边，时间复杂度 $\Theta(n\log n)$。

**例 3** Tenzing 有 $n$ 个朋友，每次举办聚会可以邀请一些朋友，有如下限制：
* $1$ 必须参加，$n$ 不能参加。
* 有 $k$ 条限制 $(x, y, z)$，表示 $x$ 和 $y$ 中只有一个在聚会中的总时间不超过 $z$。

最大化聚会总时间，并给出相应方案，即给出总聚会时间，每次聚会给出参与聚会的人和单次聚会时长。$n \leqslant 2\times 10^{5}$。([CF1842D. Tenzing and His Animal Friends](https://codeforces.com/contest/1842/problem/D))

矛盾冲突点在 $n$，所以需要找一条路径，路径上 $u-v$ 表示 $u$ 参加而 $v$ 不参加，这样从 $1$ 一直推到 $n$，进一步分析知是最短路，按 BFS 构造，细节很多。

```cpp
int n, m;
cin >> n >> m;
vector<vector<pair<int, int>>> E(n);
while (m--) {
    int u, v, w;
    cin >> u >> v >> w;
    u--, v--;
    E[u].push_back({ w, v });
    E[v].push_back({ w, u });
}  

auto dis = Dijkstra(0);

if (dis[n - 1] == Inf) {
    cout << "inf\n";
} else {
    vector<int> pos(n);
    iota(pos.begin(), pos.end(), 0);
    sort(pos.begin(), pos.end(), [&](const int& a, const int& b) {
        return dis[a] == dis[b] ? a < b : dis[a] < dis[b];  // WA: 相等的时候有没有影响
    });

    vector<pair<string, ll>> res;
    string s(n, '0');
    for (int i = 0; i < n; i++) {
        if (pos[i] == n - 1) break;  // WA
        s[pos[i]] = '1';
        res.push_back({ s, dis[pos[i + 1]] - dis[pos[i]] });
    }

    cout << dis[n - 1] << " " << res.size() << "\n";
    for (auto& [s, d] : res) {
        cout << s << " " << d << "\n";
    }
}
```





### 杂题

**题意** 无向图，有边权，两种操作：
1. 永久删去一条边；
2. 询问 $u,v$ 最短路。

数据范围：$n \leqslant 300,\ q \leqslant 2\times 10^{5}, \ q_{1} \leqslant 300$。([ABC375F - Road Blocked](https://atcoder.jp/contests/abc375/tasks/abc375_f))

**思路** 对于操作一，跑 300 次全源最短路时间是不够的，而且这加强了问题。应当考虑删边的影响。

删边不好做，倒着处理询问，转化为加边。设加上了 $s-t$ 边，那么 $u-v$ 最短路可能会更新，如果更新那必须经过 $s-t$ 边，路径长度是 $d_{u-s}+w+d_{t-v}$ 或 $d_{u-t}+w+d_{s-v}$。遍历 $u,v$ 更新最短路。时间复杂度 $\Theta(n^{3}+q_{1}n^{2})$。

```cpp
int n, m, q;
cin >> n >> m >> q;
vector<array<int, 3>> E(m);
for (int i = 0; i < m; i++) {
    int u, v, w;
    cin >> u >> v >> w;
    u--, v--;
    E[i] = { u, v, w };
}

vector<array<int, 3>> que(q);
vector<int> del(m);
for (int i = 0; i < q; i++) {
    int op;
    cin >> op;
    if (op == 1) {
        int x;
        cin >> x;
        x--;
        del[x] = 1;
        que[i] = { op, x, 0 };
    } else {
        int u, v;
        cin >> u >> v;
        u--, v--;
        que[i] = { op, u, v };
    }
}

vector dis(n, vector(n, Inf));
for (int u = 0; u < n; u++) {
    dis[u][u] = 0;
}
for (int i = 0; i < m; i++) {
    if (!del[i]) {
        auto [u, v, w] = E[i];
        dis[u][v] = dis[v][u] = w;
    }
}
for (int k = 0; k < n; ++k) {
    for (int u = 0; u < n; u++) {
        for (int v = 0; v < n; v++) {
            dis[u][v] = min(dis[u][v], dis[u][k] + dis[k][v]);
        }
    }
}

vector<ll> ans(q);
for (int i = q - 1; i >= 0; i--) {
    auto [op, a, b] = que[i];
    if (op == 1) {
        auto [s, t, w] = E[a];
        for (int u = 0; u < n; u++) {
            for (int v = 0; v < n; v++)
                dis[u][v] = min(dis[u][v], min(dis[u][s] + dis[t][v] + w, dis[u][t] + dis[s][v] + w));
        }
    } else {
        ans[i] = dis[a][b];
    }
}

for (int i = 0; i < q; i++) {
    if (ans[i]) cout << (ans[i] == Inf ? -1 : ans[i]) << "\n";
}
```



## 点权最短路

给出一张每个顶点 $v$ 带有颜色 $c_v$ 和点权 $w_v$ 的无向图。顶点有激活和未激活两种状态, 最开始每个顶点都是未激活的，激活一个顶点 $v$ 需要花费的代价为其点权 $w_v$。

你有一个棋子, 棋子只能放在/移动到被激活的顶点上。你可以随时选择一种颜色 $c$, 回收这种颜色的所有已激活顶点的激活代价并将其全部设为未激活。当然，$c$ 不能是你棋子当前所在顶点的颜色, 因为棋子只能放在已激活顶点上。

现在对于图中的每一对顶点 $(s, t)$, 询问若最开始图中所有点均未被激活, 从 $s$ 出发走到 $t$ 所需的最小初始点权是多少。

数据范围：$n \leqslant 300$。

**思路** 考虑答案形态。

注意到每走到一个不同颜色的顶点上时你都可以回收其他颜色的所有顶点的点权。将答案（一条路径，视为顶点序列） 按颜色分段，则其所需的最小初始点权为“每一段的点权和加上下一段的第一个顶点的点权”的最大值。

于是我们可以的将图按颜色分为多个同色连通块，每块内部用 Floyd-Warshall 求两两之间最小点权路径。

然后通过枚举每段的起点，终点，以及下一段的起点建出一 张带边权的有向图，边权即为连接起点与终点的最小点权路径的点权之和加上下一段起点的点权。

最后在这张有向图上从每个顶点出发使用类似 Prim 的做法（每轮选择一个未连通的点权最小的出点）找出以每个点 s 为根的有向瓶颈生成树。

时间复杂度 $\Theta(n^{3})$。

```cpp
#include <iostream>
#include <vector>
using namespace std;
using ll = long long;
const ll Inf = 0x3f3f3f3f3f3f3f3f;

signed main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n, m;
        cin >> n >> m;

        vector<int> c(n), w(n);
        for (int i = 0; i < n; i++) {
            cin >> c[i];
        }
        for (int i = 0; i < n; i++) {
            cin >> w[i];
        }

        vector adj(n, vector<int>(n));
        vector dis(n, vector<ll>(n, Inf));
        while (m--) {
            int u, v;
            cin >> u >> v;
            u--, v--;
            adj[u][v] = adj[v][u] = 1;
            if (c[u] == c[v]) {
                dis[u][v] = dis[v][u] = w[u] + w[v];
            }
        }
        for (int u = 0; u < n; u++) {
            dis[u][u] = w[u];
        }

        // 点权Floyd u,v,k的颜色相同
        for (int k = 0; k < n; ++k) {
            for (int u = 0; u < n; u++) {
                if (c[u] != c[k]) continue;
                for (int v = 0; v < n; v++) {
                    if (c[v] != c[u]) continue;
                    dis[u][v] = min(dis[u][v], dis[u][k] + dis[k][v] - w[k]);
                    dis[v][u] = min(dis[v][u], dis[v][k] + dis[k][u] - w[k]);
                }
            }
        }

        // 点权Dijkstra u,v在一个团 s是另一个团的起点
        for (int u = 0; u < n; u++) {
            for (int v = 0; v < n; v++) {
                if (c[u] != c[v]) continue;
                for (int s = 0; s < n; ++s) {
                    if (c[v] != c[s] && adj[v][s])
                        dis[u][s] = min(dis[u][s], dis[u][v] + w[s]);
                }
            }
        }

        for (int s = 0; s < n; ++s) {
            // Prim 有向最小瓶颈路
            vector<ll> mn(n, Inf), dp(n, Inf), ndp(n, Inf);
            vector<int> vis(n);
            dp[s] = mn[s] = 0;
            for (int t = 0; t < n; t++) {
                int u = -1;
                for (int j = 0; j < n; j++) {
                    if (!vis[j] && (u == -1 || mn[j] < mn[u])) {
                        u = j;
                    }
                }
                if (u == -1) break;
                vis[u] = 1;
                for (int v = 0; v < n; v++) {
                    if (!vis[v] && c[u] != c[v] && dis[u][v] < mn[v]) {
                        mn[v] = dis[u][v];
                        dp[v] = max(dp[u], mn[v]);  // 顺带做树形dp 求有向最小瓶颈路
                    }
                }
            }

            // 再做一次点权Dijkstra 
            for (int u = 0; u < n; u++) {
                for (int v = 0; v < n; v++) {
                    if (c[u] == c[v]) ndp[v] = min(ndp[v], max(dp[u], dis[u][v]));
                }
            }
            for (int u = 0; u < n; u++) {
                dp[u] = min(dp[u], ndp[u]);
            }

            // 输出
            for (int u = 0; u < n; u++) {
                cout << dp[u] << " \n"[u == n - 1];
            }
        }
    }
    
    return 0;
}
```