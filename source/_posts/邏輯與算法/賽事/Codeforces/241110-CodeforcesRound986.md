---
title: Codeforces Round 986 (Div. 2) EF
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
abbrlink: 837d746e
date: 2024-11-11 14:06:32
updated: 2024-11-11 14:40:43
---
## [CF2028E. Alice's Adventures in the Rabbit Hole](https://codeforces.com/contest/2028/problem/E)

博弈部分：Alice 只能往根走。Queen 一定是让 Alice 往根的反方向走，哪怕这个点的父亲的某个儿子是叶子节点。

树部分：所以问题化为以每个点为起点，有 $\dfrac{1}{2}$ 概率向上移动，另 $\dfrac{1}{2}$ 概率向最近叶子方向的子节点移动，问到根的概率。

这是个树上随机游走问题。设 $f_{u}$ 表示 $u$ 到其父亲的概率，则 $f_{u}=\dfrac{1}{2}+\dfrac{1}{2}f_{u}f_{v}$，其中 $v$ 是最近叶子方向的子节点，解得 $f_{u}=\dfrac{1}{2-f_{v}}$。由于叶子的 $f_{u}=0$，递推计算从这个叶子向上每个节点的概率分别为 $0, \dfrac{1}{2}, \dfrac{2}{3}, \dots$ 为 $\dfrac{d_{u}}{d_{u}+1}$，这里 $d_{u}$ 表示到最近叶子的距离。这就求出了 $f$ 数组，再从根到叶递推计算答案即可。

时间复杂度 $\Theta(n)$。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
constexpr int mod = 998244353;

ll qpow(ll a, ll n) {
    ll res = 1;
    while (n) {
        if (n & 1) res = res * a % mod;
        a = a * a % mod;
        n >>= 1;
    }
    return res;
}

ll inv(int n) {
    return qpow(n, mod - 2);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

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

        vector<int> dis(n, n);
        auto dfs = [&](this auto&& dfs, int u, int p) -> void {
            if (E[u].size() == 1 && u != 0) {
                dis[u] = 0;
            } else for (auto v : E[u]) {
                if (v == p) continue;
                dfs(v, u);
                dis[u] = min(dis[u], dis[v] + 1);
            }
        };
        dfs(0, -1);

        vector<int> dp(n);
        auto dfs2 = [&](this auto&& dfs2, int u, int p) -> void {
            for (auto v : E[u]) {
                if (v == p) continue;
                dp[v] = 1ll * dp[u] * dis[v] % mod * inv(dis[v] + 1) % mod;
                dfs2(v, u);
            }
        };
        dp[0] = 1;
        dfs2(0, -1);

        for (int i = 0; i < n; i++) {
            cout << dp[i] << " \n"[i == n - 1];
        }
    }

    return 0;
}
```

## [CF2028F. Alice's Adventures in Addition](https://codeforces.com/contest/2028/problem/F)

**题意** 在序列中填加号或乘号，使运算结果恰好等于 $m$。数据范围：$1 \leqslant n\leqslant 2\times10^{5},\ 0 \leqslant a_{i} \leqslant 10^{4},\ 1 \leqslant m\leqslant 10^{4}$。空间限制 32MB。

**思路** 特殊的空间限制大概是防止超时的，正常做就行。

乘法的优先级高，设 $dp_{i,x}$ 表示处理到第 $i$ 个数，

- 键：上一个加号之后的所有数乘积为 $x$；

- 值：上一个加号之前能表示出的所有数的集合，用 bitset 维护。

转移分为 $a_{i}$ 前面填加号或乘号两种。具体见代码。

暴力转移的复杂度是对的，因为至多 20 个数乘起来就超过 $10^{6}$ 了，键不会很多，转移量在 $\log m$ 级别，每次转移是 bitset 的复杂度 $\log m$。最终时间复杂度 $\Theta(n\log^{2}m)$，空间复杂度 $\Theta(\log^{2}m)$。

```cpp
#include <bits/stdc++.h>
using namespace std;
constexpr int N = 1e4 + 8;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n, m;
        cin >> n >> m;

        vector<int> a(n);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }

        map<int, bitset<N>> dp;
        dp[a[0]] = 1;

        for (int i = 1; i < n; i++) {
            map<int, bitset<N>> ndp;
            for (auto& [x, mp] : dp) {  // 乘号
                // if (x * a[i] > m) continue;  // WA6 直接跳过而不转移
                ndp[min(m + 1, x * a[i])] |= mp;
            }
            for (auto& [x, mp] : dp) {  // 加号
                ndp[a[i]] |= mp << x;
            }
            dp = ndp;
        }

        bitset<N> res;
        for (auto& [x, mp] : dp) {
            res |= mp << x;
        }
        cout << (res[m] ? "YES" : "NO") << endl;
    }

    return 0;
}
```