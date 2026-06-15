---
title: 按值按下标综合 DP
tags:
  - ACM
  - 算法
  - 筆記
categories:
  - posts_acm
  - 知識
  - DP
abbrlink: bff98352
---

给定长度为 $N$ 的整数序列 $A = (A_1, A_2, \dots, A_N)$，将其划分为若干个连续子段。各个段的按位异或和序列 $b_1, b_2, \dots, b_m$ 必须满足单调不降（即 $b_i \le b_{i+1}$）。

求出最大划分段数，以及在最大段数下的划分方案数。

$1 \le N \le 3000$，$0 \le A_i \le 3000$。

定义前缀异或和序列 $S$，异或和的值域上限 $V = 4095$。

设 **$f(i, v)$**：将前缀 $A[1 \dots i]$ 合法划分，且最后一段子段的异或和等于 $v$ 时，能达到的最大段数。

$$f(i, v) = 1 + \max_{\substack{0 \le j < i \\ S_j = S_i \oplus v}} \max_{0 \le u \le v} f(j, u)$$

复杂度为 $O(N^2 \cdot V)$。

优化，原式最内层仅与 $j$ 和 $v$ 有关。定义辅助状态

$$g(j, v) = \max_{0 \le u \le v} f(j, u)$$

转移：

$$g(j, v) = \max(g(j, v-1), f(j, v))$$

此时，原状态转移方程简化为：

$$f(i, v) = 1 + \max_{\substack{0 \le j < i \\ S_j = S_i \oplus v}} g(j, v)$$

在上述简化后的方程中，我们需要遍历所有满足 $S_j = S_i \oplus v$ 的历史下标 $j < i$。由于我们不关心具体的下标 $j$，只关心能达到最大 $g(j, v)$ 的那个 $j$，我们可以

定义辅助状态：

$$h(i, x, v) = \max_{\substack{0 \le j \le i \\ S_j = x}} g(j, v)$$

利用 $h(X, v)$，原状态转移方程可以直接转化为 $O(1)$ 的查表：

$$f(i, v) = 1 + h(S_i \oplus v, v)$$

$$h(i, S_i, v) = \max(h(i - 1, S_i, v), g(i, v))$$
