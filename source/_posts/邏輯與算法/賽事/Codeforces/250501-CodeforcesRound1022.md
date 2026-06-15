---
title: Codeforces Round 1022 (Div. 2)
tags:
  - 題解
  - 筆記
  - ACM
  - 算法
  - 練習賽
categories:
  - 邏輯與算法
  - 賽事
  - Codeforces
cover: /img/posts/acm/codeforces-cover.webp
top_img: /img/posts/acm/codeforces.webp
highlight_shrink: true
abbrlink: cd2ff6e1
date: 2025-05-02 00:59:00
updated: 2025-05-02 01:44:00
---
BD 都太恶心，不写题解了。

## [2108E - Spruce Dispute](https://codeforces.com/contest/2108/problem/E)

由奇数个顶点 $n$ 组成的树。移除树的一条边的定义如下：选择一对相邻顶点 $a$ 和 $b$（$a < b$），然后从树中移除顶点 $b$，并将 $b$ 的所有相邻顶点（除了 $a$）直接重新连接到 $a$ 上。问如何移除树的一条边，并给点刷颜色，使得总共 $\frac{n-1}{2}$ 种不同的颜色，每种颜色恰好有两个点，且同色点之间的简单路径长度之和尽可能大？

结论：以重心为根，删去深度最浅的叶子，再按 DFS 序染色。

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        vector<vector<int>> E(n);
        for (int i = 1; i < n; i++) {
            int u, v;
            cin >> u >> v;
            u--, v--;
            E[u].push_back(v);
            E[v].push_back(u);
        }

        // 找重心
        vector<int> siz(n), mss(n);
        auto dfs = [&](this auto&& dfs, int u, int p) -> void {
            siz[u] = 1;
            for (auto v : E[u]) {
                if (v == p) continue;
                dfs(v, u);
                siz[u] += siz[v];
                mss[u] = max(mss[u], siz[v]);
            }
        };
        dfs(0, -1);

        int s = 0; // 重心
        for (int u = 0; u < n; u++) {
            mss[u] = max(mss[u], siz[0] - siz[u]);
            if (siz[u] && mss[u] <= siz[0] / 2) {
                s = u;
            }
        }
        // 以上找重心

        vector<pair<int, int>> leaf;
        vector<int> dep(n);
        vector<int> order;
        auto dfs2 = [&](this auto&& dfs2, int u, int p) -> void {
            order.push_back(u);
            for (auto v : E[u]) {
                if (v == p) continue;   
                dep[v] = dep[u] + 1;
                dfs2(v, u);
            }
            if (E[u].size() == 1) leaf.push_back({dep[u], u});
        };
        dfs2(s, -1);

        int t = (*min_element(leaf.begin(), leaf.end())).second;
        
        cout << t + 1 << " " << E[t][0] + 1 << endl;

        vector<int> ans(n, -1);
        int now = 0;
        for (auto u : order) {
            if (u != max(t, E[t][0])) {
                ans[u] = (now++) % (n / 2);
            }
        }
        
        for (int i = 0; i < n; i++) {
            cout << (++ans[i]) << " ";
        }
        cout << endl;
    }
   
    return 0;
}
```

