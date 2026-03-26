---
title: XCPC wiki - 树 07 - 树 Hash
tags:
  - 算法
  - 筆記
  - ACM
  - 圖論
categories:
  - - 筆記
    - XCPCwiki
abbrlink: c084d0df
hide: true
date: 2025-01-24 22:05:00
updated: 2025-01-24 22:05:00
description:
---

判断无根树是否同构，时间复杂度 $\Theta\left(\sum n \right)$。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using ull = unsigned long long;

mt19937_64 rng{ chrono::steady_clock::now().time_since_epoch().count() };
const int N = 3e5 + 8;
ull hsh[N];

int main() {
    for (int i = 0; i < N; i++) {
        hsh[i] = rng();
    }

    int m;
    cin >> m;

    map<ull, int> mp;
    for (int id = 1; id <= m; i++d) {
        int n;
        cin >> n;

        vector<vector<int>> E(n);
        for (int u = 0; u < n; ++u) {
            int v;
            cin >> v;   
            if (v) v--, E[u].push_back(v), E[v].push_back(u);
        }

        vector<int> ctr, siz(n), mss(n), dep(n);
        auto getctr = [&](this auto&& dfs, int u, int p) -> void {
            siz[u] = 1, mss[u] = 0;
            for (auto v : E[u]) {
                if (v == p) continue;
                dfs(v, u);
                siz[u] += siz[v];
                mss[u] = max(mss[u], siz[v]);
            }
            mss[u] = max(mss[u], n - siz[u]);
            if (mss[u] <= n / 2) ctr.push_back(u);
        };

        getctr(0, -1);
        if (ctr.size() == 1) {
            ctr.push_back(ctr[0]);
        }   // 两个重心公平公正

        array<ull, 2> res;
        auto dfs = [&](this auto&& dfs, int u, int p) -> ull {
            siz[u] = 1;
            ull res = dep[u] * hsh[0];
            for (auto& v : E[u]) {
                if (v == p) continue;
                dep[v] = dep[u] + 1;
                res += dfs(v, u) * hsh[siz[v]];
                siz[u] += siz[v];
            }  // 顺序不能错 dep->dfs->siz
            return res;
        };
        for (int i = 0; i < 2; i++) {
            dep[ctr[i]] = 1;
            res[i] = dfs(ctr[i], -1);
        }
        sort(res.begin(), res.end());

        ull tmp = res[0] * hsh[0] + res[1];
        if (!mp.count(tmp)) mp[tmp] = id;
        cout << mp[tmp] << "\n";
    }

    return 0;
}
```
<div STYLE="page-break-after: always;"></div>


