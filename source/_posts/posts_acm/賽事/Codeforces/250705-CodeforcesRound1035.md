---
title: Codeforces Round 1035 A-D
tags:
  - 題解
  - 筆記
  - ACM
  - 算法
  - 練習賽
categories:
  - posts_acm
  - 賽事
  - Codeforces
cover: /img/posts/acm/codeforces-cover.webp
top_img: /img/posts/acm/codeforces.webp
highlight_shrink: true
abbrlink: ed294dce
date: 2025-07-06 12:50:00
updated: 2025-07-06 12:50:00
---
# [2119A - Add or XOR](https://codeforces.com/contest/2119/problem/A)

```cpp
auto solve = [&] {
    int a, b, x, y;
    cin >> a >> b >> x >> y;

    if (a == b) {
        cout << 0 << endl;
    } else if (b == a - 1 && (a & 1)) {
        cout << y << endl;
    } else if (b < a) {
        cout << -1 << endl;
    } else {
        int res = 0;
        for (int i = a; i < b; i++) {
            if (i & 1) {
                res += x;
            } else {
                res += min(y, x);
            }
        }
        cout << res << endl;
    }
};
```

# [2119B - Line Segments](https://codeforces.com/contest/2119/problem/B)

记 $x = \max\lbrace a_{i} \rbrace$，须满足 $x - \left( \sum a_{i} - x \right)  \leqslant \operatorname{dist}(p,q) \leqslant \sum a_{i}$。

```cpp
auto solve = [&] {
    int n;
    cin >> n;

    ll x1, x2, y1, y2;
    cin >> x1 >> y1 >> x2 >> y2;

    ll d2 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);

    vector<int> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }

    ll r = accumulate(a.begin(), a.end(), 0ll);
    ll l = max(0ll, 2 * *max_element(a.begin(), a.end()) - r);
    if (l * l <= d2 && d2 <= r * r) {
        cout << "Yes" << endl;
    } else {
        cout << "No" << endl;
    }
};
```

# [2119C - A Good Problem](https://codeforces.com/contest/2119/problem/C)

对于偶数，取前 $n-2$ 个为 $\ell$，后两个为比 $\ell$ 大，且满足 $x\operatorname{\&}\ell=0$ 的最小的 $x$，即 $x=2\cdot 2^{\operatorname{highbit}(\ell)}$。

```cpp
auto solve = [&] {
    ll n, l, r, k;
    cin >> n >> l >> r >> k;

    if (n & 1) {
        cout << l << endl;
    } else {
        if (n == 2 || __lg(l) + 1 > __lg(r)) {
            cout << -1 << endl;
        } else if (k <= n - 2) {
            cout << l << endl;
        } else {
            cout << (2ll << __lg(l)) << endl;
        }
    }
};
```


# [2119D - Token Removing](https://codeforces.com/contest/2119/problem/D)

转化为求：对于一个确定的移除 token 的方式，求有多少种序列合法。

DP，设 $h_{ij}$ 表示：

- 问题规模为 $j$，即总共 $j$ 个 token 和 $j$ 步操作；

- 被移除的 token 的最大下标是 $i$；

- 存储序列权重 $f(a)$ 之和。

转移：
$$
h_{ij} \leftarrow i \cdot (j-i+1) \cdot h_{k,j-1} , \quad k<i \leqslant  j
$$

- 确定移除 token $i$ 在哪一次操作。设第 $t$ 次操作移除 token $i$。在规模为 $j$ 的子问题中，操作 $t$ 的范围是 $1,2,\dots,j$。而且为了移除的 token $i$，依题意必须满足 $a_{t} \leqslant i \leqslant t$。所以 $t$ 的可选择范围是 $[i,j]$，乘上系数 $j-i+1$。

- 确定 $a_{t}$ 的赋值方式。能够完成移除的 token $i$ 这个操作的 $a_{t}$ 必须满足 $1 \leqslant a_t \leqslant i$，有 $i$ 种赋值方式。因此乘上系数 $i$。

所求为 $h_{*,N}$，表示问题规模为 $N$，被移除的 token 的最大下标是 $*$。

实现时用前缀和（代码里的 `f`）优化 $h_{k,j-1}$，总复杂度 $\mathcal{O}(N^{2})$。

```cpp
auto solve = [&] {
    int N, M;
    cin >> N >> M;

    Z::setmod(M);

    vector<Z> f(N + 1, 1);
    Z res = 1;
    for (int i = 1; i <= N; i++) {
        for (int j = N; j >= i; j--) {
            Z tmp = f[j - 1] * (j - i + 1) * i;  // h[i][j]
            f[j] += tmp;  // 前缀和 h[*][j]
            if (j == N) {
                res += tmp;
            }
        }
    }
    cout << res << endl;
};
```

赛时的想法是，问题等价于任选 $k$，任选 $1 \leqslant c_1<c_2<\dots<c_k \leqslant N$，求 sum of $c_1 c_2 ... c_k (N+1-c_k)(N-c_{k-1})(N-1-c_{k-2})\dots(N-k+2-c_1)$

这个转化比较抽象就不讲了。