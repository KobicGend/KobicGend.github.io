---
title: IntervalDP
tags:
  - ACM
  - 算法
  - 筆記
categories:
  - 邏輯與算法
  - 知識
  - DP
abbrlink: e9412270
---

## LPS

$\text{LPS}(S) = \text{LCS}(S, \text{reverse}(S))$，转为线性 DP

1. 给定一个长度为 $N$ 的字符串，为变成回文串，最少需要插入多少字符？
2. 给定一个长度为 $N$，有 $K$ 种类型的括号的字符串，为变成 RBS，最少需要插入多少字符？（注意区分 $K=1$ 与 $K \geqslant 2$）


## 本质不同的非空回文子序列数量

- $s[i] \neq s[j]$ 时，$f[i][j] = f[i+1][j] + f[i][j-1] - f[i+1][j-1]$
- $s[i] = s[j]$ 时
    - 中间没有字符满足 $s[x]=s[i]$，$f[i][j] = 2 \times f[i+1][j-1] + 2$
    - 中间只有一个字符满足 $s[x]=s[i]$，$f[i][j] = 2 \times f[i+1][j-1] + 1$
    - 中间有两个或以上字符满足 $s[x]=s[i]$，记最左最右的分别为 $l,r$，$f[i][j] = 2 \times f[i+1][j-1] - f[l+1][r-1]$

## [2024 Yokohama # L. Peculiar Protocol](https://qoj.ac/contest/1987/problem/10485)

> 给定长度为 $N$ 的数组 $A$ 以及整数 $D, R$。
> 可以执行任意次：选取区间 $A[p\dots q]$ ，满足其元素和为 $kD + R$，将该段删除并拼接剩余序列。
> 求所有操作中取得的 $k$ 的总和的最大值。

在模 $D$ 意义考虑，每次操作删除的元素和满足 $S_{p,q} \equiv  R \pmod D$。若能够通过 $m$ 次操作将区间 $A[p\dots q]$ 完全删除，则 $S_{p,q} \equiv mR \pmod D$。

令 $m_{0}$ 为满足 $S \equiv m_{0} R \pmod D$ 的最小正整数。如果能完全删除该区间，最小的操作次数就是 $m_{0}$。而且只要这个区间能够被完全删除，它就一定能用最少的 $m_{0}$ 次操作被完全删除。

考虑到 $S_{p, q} = \sum (k_i D + R) = D \sum k_i + m R$。要最大化 $\sum k_i$，就等价于最小化操作次数 $m$。

因此，原题中如何规划操作以最大化 $\sum k_i$ 的最优化问题，直接退化成了更为简单的判定性问题：该区间能否被完全删除？如果能，我们就可以直接计算 $m_{0}$，进而计算出 $\sum k_i$。

维护 $f(l, r)$ 表示区间 $[l, r]$ 内最多能选出多少个互不相交的合法子段，做区间 DP。再用线性 DP 做拼接。复杂度 $\mathcal{O}(N^{3})$。

```cpp
auto check = [&](int l, int r) -> std::pair<i64, i64> {
    i64 S = 0;
    for (int i = l; i <= r; i++) {
        S += A[i];
    }
    auto [d, m, ks] = invgcd(R, D, S);
    if (m == -1) {
        return {inf, inf};
    }
    if (m == 0) {
        m = D / d;
        ks -= R / d;
    }
    return {m, ks};
};

std::vector f(N, std::vector<int>(N, 0));
for (int len = 1; len <= N; len++) {
    for (int l = 0; l + len - 1 < N; l++) {
        int r = l + len - 1;
        for (int k = l; k < r; k++) {
            f[l][r] = std::max(f[l][r], f[l][k] + f[k + 1][r]);
        }
        auto [m, ks] = check(l, r);
        if (f[l][r] >= m - 1) {
            f[l][r] = m;
        }
    }
}

std::vector<i64> g(N + 1, -1);
g[0] = 0;
for (int r = 0; r < N; r++) {
    g[r + 1] = g[r];
    for (int l = 0; l <= r; l++) {
        auto [m, ks] = check(l, r);
        if (f[l][r] >= m) {
            g[r + 1] = std::max(g[r + 1], g[l] + ks);
        }
    }
}
std::cout << g[N] << "\n";
```