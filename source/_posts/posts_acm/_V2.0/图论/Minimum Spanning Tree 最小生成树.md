---
title: XCPC wiki - Minimum Spanning Tree 最小生成树
tags:
  - 算法
  - 筆記
  - ACM
  - 圖論
categories:
  - - 筆記
    - XCPCwiki
abbrlink: '72989097'
hide: true
date: 2025-01-24 22:05:00
updated: 2025-01-24 22:05:00
description:
---

## 稠密图

| Input                                         | Output |
| --------------------------------------------- | ------ |
| 4<br>0 2 2 3<br>2 0 4 8<br>2 4 0 3<br>3 8 3 0 | 7      |

**Prim**：从任意一个点开始，每次选择一个与当前点相邻且边权最小的点，并将两顶点之间的边加入到树中。时间复杂度 $\Theta(n^2)$，空间复杂度 $\Theta(n)$。

```cpp
vector<int> mn(n, inf), vis(n);
mn[0] = 0;
int ans = 0;
for (int t = 0; t < n; ++t) {
    int u = -1;
    for (int j = 0; j < n; j++) {
        if (!vis[j] && (u == -1 || mn[j] < mn[u])) {
            u = j;
        }
    }
    vis[u] = 1;
    ans += mn[u];
    for (int v = 0; v < n; v++) {
        mn[v] = min(mn[v], E[u][v]);
    }
}
cout << ans << endl;
```

## 稀疏图

| Input                                            | Output |
| ------------------------------------------------ | ------ |
| 4 5<br>1 2 2<br>1 3 2<br>1 4 3<br>2 3 4<br>3 4 3 | 7      |

**Prim**：维护边权从小到大的优先队列，循环判断队首元素是否在生成树中，若是，将与它相连的所有边添加到优先队列中。时间复杂度 $\Theta(n\log m)$，空间复杂度 $\Theta(m)$。

```cpp
ll ans = 0;  // 边权之和
priority_queue<pair<ll, int>, vector<pair<ll, int>>, greater<>> Q;
Q.push({ 0, 0 });
vector<int> vis(n);
while (!Q.empty()) {
    auto [w, u] = Q.top(); Q.pop();
    if (vis[u]) continue; vis[u] = 1;
    ans += w;
    for (auto [w, v] : E[u]) {
        if (!vis[v]) Q.push({ w, v });
    }
}
cout << ans << endl;
```

**Kruskal**：按边权从小到大的顺序开始（用 DSU）合并连通图，如果没有环，那么它一定是最小生成树的一条边。时间复杂度 $\Theta(m\log m)$，空间复杂度 $\Theta(m)$。

## Problems

### 图上最大边权最小值

**题意** 图。求两点间路径上最大边权最小值。([VJspr7B - 营救](https://www.luogu.com.cn/problem/P1396))

二分答案，判断使用这些边是否能将图连通，时间 $\Theta(n\log^{2}n)$。其实二分的时候已经知道答案了，可以将二分省略。按建立最小生成树思想，从最小边开始用并查集维护连边，两点第一次连通时的边权结果，时间 $\Theta(n\log n)$，瓶颈在排序。

### 图上最大边权和次大边权之和的最小值（有向瓶颈生成树）

**题意** 有边权无向图，从 $1$ 指向 $n$ 的路径中，最大边权和次大边权之和的最小值。([2023 ICPC 合肥 J. Takeout Delivering](https://codeforces.com/gym/104857/problem/J))

**思路** 枚举最大边 $e_{uv}$ *（`主机` 想到但被 `小明` 否认了）* ，剩余的路径是 $1\to u$ 和 $v\to n$，在这上面找出次大边，即找出 $1\to u$ 路径上最大边权的最小值和 $v\to n$ 路径上最大边权的最小值中较大的那一个。而最大边权的最小值在最小生成树上，只需求出 $1\to u$ 和 $v\to n$ 最小生成树的最大边。实现时，先分别预处理 $1$ 和 $n$ 到每个点的路径上的最大边权的最小值，然后枚举边，计算求解。时间复杂度 $\Theta(n\log n)$。

Kruskal 写法：

```cpp
int n, m;
cin >> n >> m;

vector<tuple<int, int, int>> E(m);
for (int i = 0; i < m; ++i) {
    int u, v, w;
    cin >> u >> v >> w;
    u--, v--;
    E[i] = { w, u, v };
}

// Kruskal
sort(E.begin(), E.end());
DSU dsu(n);
vector<vector<pair<int, int>>> tree(n);
for (auto [w, u, v] : E) {
    if (dsu.uno(u, v)) {
        tree[u].push_back({ w, v });
        tree[v].push_back({ w, u });
    }
}

auto dp = [&](int s) {
    vector<int> dp(n);
    auto dfs = [&](this auto&& self, int u, int p) -> void {
        for (auto [w, v] : tree[u]) {
            if (v == p) continue;
            dp[v] = max(dp[u], w);
            self(v, u);
        }
    };
    dfs(s, -1);
    return dp;
};
auto dp0 = dp(0), dpn = dp(n - 1);

int ans = inf << 1;   // inf 小了
for (auto [w, u, v] : E) {
    if (dp0[u] <= w && dpn[v] <= w) {
        ans = min(ans, w + max(dp0[u], dpn[v]));
    }
    if (dpn[u] <= w && dp0[v] <= w) {
        ans = min(ans, w + max(dpn[u], dp0[v]));
    }
    // if (u == 1 && v == n || u == n && v == 1) {
    //    ans = min(ans, w);
    // } // 无需特判
}
cout << ans << endl;
```

Prim 写法：

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

auto dp = [&](int s) {
    vector<int> vis(n);
    vector<int> dp(n, inf);
    dp[s] = 0;
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> Q;
    Q.push({ 0, s });
    while (!Q.empty()) {
        auto [w, u] = Q.top(); Q.pop();
        if (vis[u]) continue; vis[u] = 1;
        for (auto [w, v] : E[u]) {
            if (!vis[v]) {
                Q.push({ w, v });
                dp[v] = max(dp[u], w);
            }
        }
    }
    return dp;
};
auto dp0 = dp(0), dpn = dp(n - 1);

int ans = inf << 1;
for (int u = 0; u < n; u++) {
    for (auto [w, v] : E[u]) {
        if (dp0[u] <= w && dpn[v] <= w) {
            ans = min(ans, w + max(dp0[u], dpn[v]));
        }
        if (dpn[u] <= w && dp0[v] <= w) {
            ans = min(ans, w + max(dpn[u], dp0[v]));
        }
    }
}
cout << ans << endl;
```

### [VJspr1H - Counting Graphs - UPSOLVE](https://codeforces.com/contest/1857/problem/G)

**题意** 给定一个 $n$ 个点的有边权的树，计算满足以下条件的图的数量：
- 该图无重边与自环。
- 所有的边的权值不大于给定的数 $w_{\max}$ 且为正整数。
- 该图有唯一的最小生成树，且就是所给的树。

**思路** 考虑每一条边的取值，为了不影响惟一的最小生成树，它的取值应当严格大于所在环（熟知，在树中连一条边将形成惟一的环）的每一条边的权值，依乘法原理即可算出取值情况。

> 样例三中 `1 2 3 || 1 3 2 || 3 4 6 || 3 5 1`，已有 $4$ 条边，还可以连 $C_5^2-4=6$ 条边，如边 $e_{15}$，它所在的环是 $1-2-3-5$，这些边的权值分别为 $3,2,1$，所以 $e_{15}$ 最小值是 $4$，可取 $w_{\max}-4+1=3$ 种，当然还有不连的情形，共 $4$ 种，类似算出其它边，答案是 $4 \times 4 \times 5 \times 1 \times 1 \times 1=80$。

一种思路是枚举所有的边，从一个端点 `dfs` 到另一个端点，算出最小取值，但显然这样会超时。边数很大，一一遍历至少是 $\Theta(n^2)$ 的复杂度，应当简化运算。

注意到，这些数值有很多相同的，我们只需要找出 **每一取值出现的次数**，依快速幂计算，能大大降低复杂度。

下面的问题便是，如何找出每一取值 $a$ 出现的次数 $n$。注意到，取值大小 $a$ 仅与所在环的最大权值有关，我们就研究这个最大权值，看它能决定多少边的取值。事实上，它能决定的是数值更小的环。因此，我们 **按边权从小到大的顺序构建这棵数**，以保证每一条边出现时，已构建的边的权值都比它小。如下一条边的权值是 $w$，则每条边的可能情形有 $w_{\max}-w+1$ 种；至于出现次数，将两条边连接时，完全图应当增加 $S_1S_2$ 条边，所以会有 $S_1S_2-1$ 条未连接的边，它们的取值都有 $w_{\max}-w+1$ 种，计算 $(w_{\max}-w+1)^{S_1S_2-1}$ 即可。
