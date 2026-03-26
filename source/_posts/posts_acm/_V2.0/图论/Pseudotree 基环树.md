---
title: XCPC wiki - Pseudotree 基环树
tags:
  - 算法
  - 筆記
  - ACM
  - 圖論
categories:
  - - 筆記
    - XCPCwiki
abbrlink: 19a2d849
hide: true
date: 2025-01-24 22:05:00
updated: 2025-01-24 22:05:00
description:
---

## 并查集——转化为树 + 边

### 基环树的最大独立集

砍掉一条边 $st$ 后是树，求树的最大独立集，但有限制 $s,t$ 不能同时选。因此以 $s,t$ 分别为根，求根节点不选的最大独立集。答案为两者较大的。对于基环树森林，对每个基环树分别处理。([洛谷 P2607 骑士](https://www.luogu.com.cn/problem/P2607))

```cpp
int n;
cin >> n;

vector<int> w(n);
DSU dsu(n);
vector<pair<int, int>> nte;  // none-tree edge
vector<vector<int>> E(n);
for (int i = 0; i < n; i++) {
    int u, v;
    cin >> u >> v >> w[i];
    cin >> v; v--;
    if (!dsu.uno(u, v)) nte.push_back({ u, v });
    else E[u].push_back(v), E[v].push_back(u);
}

vector<array<ll, 2>> dp(n);
auto dfs = [&](this auto&& self, int u, int p) -> void {
    dp[u][0] = 0;
    dp[u][1] = w[u];
    for (auto v : E[u]) {
        if (v == p) continue;
        self(v, u);
        dp[u][0] += max(dp[v][0], dp[v][1]);
        dp[u][1] += dp[v][0];
    }
};
auto solve = [&](int s) {
    dfs(s, -1);
    return dp[s][0];
};

ll sum = 0;
for (auto [u, v] : nte) {
    sum += max(solve(u), solve(v));
}
cout << sum << endl;
```


## 主机数——转化为环 + 树

### 基环树的直径

一棵基环树的直径只有下面两种情况：

（一）环上的某一点作为根的子树的直径。这是普通的树直径问题。

（二）环上有两点，每个点引出一条链，然后再将这两点相连。首先记录环上每个节点 $i$ 为根的子树中，从 $i$ 出发的最长路径 $f_{i}$。需要在环上找到 $i,j$ 两点，使得 $f_{i}+f_{j}+d(i,j)$ 最大，也就是最大化 $f_{i}+f_{j}+d_{j}-d_{i}$，断环为链后枚举右边界 $j$，然后对于每一个 $j$，找满足 $j-n+1 \leqslant  i<j$ 的最大的 $f_{i}-d_{i}$，用单调队列优化。

```cpp
int n;
cin >> n;

vector<vector<array<int, 3>>> E(n);
for (int i = 0; i < n; i++) {
    int u, v, w;
    cin >> v >> w;
    u = i, v--;
    E[u].push_back({ w, v, i });
    E[v].push_back({ w, u, i });
}

// 拓扑排序
queue<int> Q;
vector<ll> dp(n), res(n);
vector<int> vis(n), deg(n);
for (int u = 0; u < n; ++u) {
    deg[u] = E[u].size();
    if (deg[u] == 1) Q.push(u);
}
while (!Q.empty()) {
    int v = Q.front(); Q.pop();
    vis[v] = 1;
    for (auto [w, u, id] : E[v]) {
        if (deg[u] > 1) { // v是u的子节点
            res[u] = max({ res[u], res[v], dp[u] + dp[v] + w });
            dp[u] = max(dp[u], dp[v] + w);  // 这里写树形DP方程
            if (--deg[u] == 1) Q.push(u);
        }
    }
}

ll ress = 0;
for (int u = 0; u < n; ++u) {
    if (vis[u]) continue;  // 对于每一个基环树找环上的一个点
    vector<ll> W;
    vector<int> V;
    V.push_back(u);
    W.push_back(0);
    vis[u] = 1;
    int fromid = -1;
    do for (auto [w, v, id] : E[V.back()]) {
        if (deg[v] != 1 && id != fromid) {
            fromid = id;
            vis[v] = 1;
            V.push_back(v);
            W.push_back(w);
            res[u] = max(res[u], res[v]);
            break;
        }
    } while (u != V.back());
    int cnt = V.size() - 1;
    V.resize(cnt << 1);
    W.resize(cnt << 1);

    // 断环为链
    for (int i = cnt + 1; i < (cnt << 1); i++) {
        W[i] = W[i - cnt];
        V[i] = V[i - cnt];
    }
    for (int i = 1; i < (cnt << 1); i++) {
        W[i] += W[i - 1];
    }

    deque<int> Q{ 0 };
    for (int i = 1; i < (cnt << 1); i++) {
        if (!Q.empty() && i - Q.front() >= cnt)
            Q.pop_front(); // 毕业
        res[u] = max(res[u], dp[V[i]] + dp[V[Q.front()]] + W[i] - W[Q.front()]);
        while (!Q.empty() && dp[V[i]] - W[i] >= dp[V[Q.back()]] - W[Q.back()])
            Q.pop_back();  // 维护dp[V[i]]-W[i]最大值
        Q.push_back(i);
    }

    ress += res[u];
}

cout << ress << endl;
```

附：DFS 找环（慎用）

```cpp
vector<vector<int>> E(n), cycs;
vector<int> vis(n), p(n);

auto dfs = [&](this auto&& self, int u) {
    vis[u] = 1;
    for (auto& v : E[u]) {
        if (!vis[v]) {
            p[v] = u;
            self(v);
        }
        else if (vis[v] == 1) {
            vector<int> cyc;
            for (int i = u; i != v; i = p[i]) {
                cyc.push_back(i);
            }
            cyc.push_back(v);
            cycs.push_back(cyc);
        }
    }
    vis[u] = 2;
};
```



## 有向基环树