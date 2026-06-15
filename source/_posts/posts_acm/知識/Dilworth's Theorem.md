---
title: Dilworth's Theorem
tags:
  - ACM
  - 算法
  - 筆記
categories:
  - posts_acm
  - 知識
abbrlink: ea66ebca
---

# Dilworth

## [ABC457G - Catch All Apples](https://atcoder.jp/contests/abc457/tasks/abc457_g)

Find the minimum number of robots needed to collect all apples. Each robot starts operating from time $0$ and can move freely at a speed of at most $1$. Each robot can collect apple $i$ if and only if it is at coordinate $X_i$ at time $T_i$.

If $T_i < T_j$, a single robot can collect both apple $i$ and $j$ iff

$$
\vert X_i-X_j \vert \leqslant  T_j-T_i
\iff
\begin{cases}
X_{i}+T_{i} \leqslant X_{j}+T_{j}  \\
X_{i}-T_{i} \geqslant X_{j}-T_{j} 
\end{cases}
\xLeftrightarrow{(u,v)=(X-T,X+T)}
\begin{cases}
u_{i} \geqslant u_{j} \\
v_{i} \leqslant v_{j}  
\end{cases}
$$

A set of apples collected by one robot forms a chain in this partial order. The problem asks for the minimum number of chains (robots) to cover all points.

By Dilworth's Theorem, the minimum chain cover equals the size of the maximum antichain.

We can sort all points by $u$ ascending, and for equal $u$, by $v$ descending, and find the Longest Increasing Subsequence (LIS) of $v$.

```cpp
for (int i = 0; i < N; i++) {
    int T, X;
    std::cin >> T >> X;
    arr[i] = { X - T, X + T };
}
std::ranges::sort(arr, {}, [](const auto& a) {
    auto& [u, v] = a;
    return std::pair(u, -v);
});

std::vector<int> f(N, inf);
for (auto [u, v] : arr) {
    *std::ranges::lower_bound(f, v) = v;
}
int ans = std::ranges::lower_bound(f, inf) - f.begin();
std::cout << ans << "\n";
```