---
title: DP
tags:
  - ACM
  - 算法
  - 筆記
categories:
  - 邏輯與算法
  - 知識
abbrlink: bea7c90a
---

## [CF147B. Smile House](https://codeforces.com/group/5YbeUSYxuA/contest/697386/problem/S)

有向图，求图上点数最小的正环的大小。

$f_{d, i, j}$：至多 $2^{d}$ 边，从 $i$ 到 $j$ 的最大权值。

跳跃式倍增尝试使用 $x$ 条边，是否存在正环，即是否存在 $g_{i, i}>0$。



## [CF1808E. Minibuses on Venus](https://codeforces.com/group/5YbeUSYxuA/contest/697386/problem/P)

题意：给定 $N,K$，求满足存在 $i$，使得 $2 a_{i} \equiv \sum a_{i} \pmod K$ 的序列数量。

容斥，求对于任意的 $i$，都满足 $2a_i \neq S$ 的方案数。

枚举 $S$，设 $f_{i, j}$ 为前 $i$ 位，数字和是 $j$ 的方案数。

转移：$f_{i, j + l} \gets f_{i - 1, l}$，其中 $2l \not\equiv S$。

【快速幂】定义转移矩阵 $T$，其中 $T_{j, j + l} = [2 l \neq S]$。设 $f_{0}=[1, 0, \dots, 0]$，答案是 $f_{0} \times T^n$ 的第 $S$ 项，复杂度 $\mathcal{O}(K^4\log N)$。

【卷积优化】定义转移多项式 $g$，其中第 $l$ 项系数 $g_{l} = [2 l \neq S]$，设 $f_{0}=1$，答案是 $f_{0} \times g^n$，复杂度 $\mathcal{O}(K^{3}\log N)$。

## [CF351C. Jeff and Brackets](https://codeforces.com/group/5YbeUSYxuA/contest/697386/problem/N)

构造一个长度为 $N \times M$ 的合法括号序列。第 $i$ 个位置上的左括号代价为 $A_{i\bmod N}$，右括号代价为 $B_{i\bmod N}$。求最小代价。（$1\leq N\leq 20, 1\leq M\leq 10^7$）

设 $f_{i,j}$ 为到第 $i$ 的位置、有 $j$ （$j\leq N$）个左括号未被匹配的最小代价。

$$
\begin{cases}
f_{i, j+1} \gets f_{i-1,j}+A_{i\bmod N} \\
f_{i, j-1} \gets f_{i-1,j}+B_{i\bmod N} \\
\end{cases}
$$

其中 $f_{0,0}=0, f_{0,j}=e$。其中 $e$ 是 $\min$ 的幺元，即 $+\infty$。

设

$$
T_i = 
\begin{bmatrix} 
e & A_{i} & & \cdots & e \\ B_{i} & e & A_{i} &  & \vdots \\ & B_{i} & e & A_{i} \\ \vdots & & B_{i} & \ddots \\ e & \cdots  \\
\end{bmatrix}_{(N+1)\times (N+1)}
$$

设 $A_0=(0, e, \dots, e)$，答案为 $A_{MN}= A_0 (T_{1}T_{2} \dots T_{N})^M$ 的第 0 项。




# 经典 DP

$\text{LPS}(S) = \text{LCS}(S, \text{reverse}(S))$

1. 给定一个长度为 $N$ 的字符串，为变成回文串，最少需要插入多少字符？
2. 给定一个长度为 $N$，有 $K$ 种类型的括号的字符串，为变成 RBS，最少需要插入多少字符？（注意区分 $K=1$ 与 $K \geqslant 2$）


## 本质不同的非空回文子序列数量

- $s[i] \neq s[j]$ 时，$f[i][j] = f[i+1][j] + f[i][j-1] - f[i+1][j-1]$
- $s[i] = s[j]$ 时
    - 中间没有字符满足 $s[x]=s[i]$，$f[i][j] = 2 \times f[i+1][j-1] + 2$
    - 中间只有一个字符满足 $s[x]=s[i]$，$f[i][j] = 2 \times f[i+1][j-1] + 1$
    - 中间有两个或以上字符满足 $s[x]=s[i]$，记最左最右的分别为 $l,r$，$f[i][j] = 2 \times f[i+1][j-1] - f[l+1][r-1]$
