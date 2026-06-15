---
title: 01 grid
tags:
  - ACM
  - 算法
  - 筆記
categories:
  - posts_acm
  - 知識
  - '01'
abbrlink: 348c870b
---


## [105633K - Scheduling Two Meetings](https://codeforces.com/gym/105633/problem/K)

- 给定 $N \times M$ 的 01 矩阵 $A$。
- 选取两行 $i, j$，满足对于所有列 $m$，有 $A_{i}[m] = 1$ 或 $A_{j}[m] = 1$ 至少一者成立。
- 最大化满足 $A_{i}[m] = 1$ 且 $A_{j}[m] = 1$ 的列数。
- 输出所选的 $i$ 和 $j$。若有多种选择，则选择 $i$ 最小的对；若 $i$ 相同，则选择 $j$ 最小的对。
- $2 \le N \le 2 \times 10^5$，$2 \le M \le 20$。


* 给定长度为 $N$ 的非负整数数组 $A$，其中每个元素 $0 \le A_{i} < 2^M$。
* 选取两个下标 $i, j$，满足 $A_{i} \mid A_{j} = 2^M - 1$，并最大化 $\operatorname{popcount}(A_{i} \ \& \ A_{j})$。
* 若有多种选择，则选择 $i$ 最小的对；若 $i$ 相同，则选择 $j$ 最小的对。
* $2 \le N \le 2 \times 10^5$，$2 \le M \le 20$。

特判 $A_{i}=A_{j}=2^M - 1$，否则一定有 $A_{i} \neq A_{j}$。

为了让 $A_{i} \mid A_{j} = 2^M - 1$，$A_{j}$ 必须在 $A_{i}$ 为 0 的位上全为 1。换句话说，$A_{j}$ 必须是 $A_{i}$ 按位取反的超集。维护每个 $s$ 的第一次出现下标，做超集和，然后拼接即可。

```cpp
std::vector<std::pair<int, int>> f(1 << M, { inf, inf });
std::vector<int> nb;
for (int i = 0; i < N; i++) {
    unsigned mask = A[i];
    if (mask == ((1 << M) - 1)) {
        nb.push_back(i);
    }
    chmin(f[mask], { -std::popcount(mask), i });
}

if (nb.size() > 1) {
    std::cout << nb[0] + 1 << " " << nb[1] + 1 << std::endl;
    return;
} 

auto g = f;
for (int bit = 0; bit < M; bit++) {
    for (unsigned mask = 0; mask < 1 << M; mask++) {
        if (mask >> bit & 1) {
            chmin(g[mask ^ (1 << bit)], g[mask]);
        }
    }
}

std::array<int, 3> res { inf, inf, inf };
for (unsigned mask = 0; mask < 1 << M; mask++) {
    auto [val1, id1] = f[mask];
    auto [val2, id2] = g[((1 << M) - 1) ^ mask];
    if (id1 != inf && id2 != inf && id1 != id2) {
        chmin(res, { val1 + val2, id1, id2 });
    }
}

if (res[0] == inf) {
    std::cout << "No" << std::endl;
} else {
    auto [val, id1, id2] = res;
    if (id1 > id2) {
        std::swap(id1, id2);
    }
    std::cout << id1 + 1 << " " << id2 + 1 << std::endl;
}
```