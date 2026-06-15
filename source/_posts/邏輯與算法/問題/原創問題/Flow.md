---
title: Flow
tags:
  - ACM
  - 算法
  - 筆記
categories:
  - 邏輯與算法
  - 問題
  - 原創問題
abbrlink: f2f2794e
---

## Problem

### Description

You are given a binary string $S$ of length $N$.

Construct a directed graph based on this sequence: for any pair of indices $(i, j)$, if $S_i = 0$, $S_j = 1$, and $i < j$, add a **directed** edge from node $i$ to node $j$.

这个图有很多性质：
- VC：前缀 0 + 后缀 1，这个数量的最小值就是 MVC
- IS：前缀 1 + 后缀 0

Initially, each node $i$ has a score of $W_i$, represented by the array $W = [W_1, W_2, \dots, W_N]$. You can perform the following two types of operations any number of times:

1. Choose a node $i$ satisfying $S_i = 0$: Node $i$ **gives** exactly 1 point to each of its adjacent nodes. As a result, the score of node $i$ **decreases** by its out-degree, and the score of each of its out-neighbors increases by 1.
2. Choose a node $j$ satisfying $S_j = 1$: Node $j$ **takes** exactly 1 point from each of its adjacent nodes. As a result, the score of node $j$ **increases** by its in-degree, and the score of each of its in-neighbors decreases by 1.

In other words, the flow of points follows the direction of the edges in the graph.

Determine whether there exists a sequence of operations such that ultimately every node has a score of exactly 0 (i.e., $W_i = 0$ holds for all $i$).

### Constraints

- $2 \le N \le 10^6$
- $-10^9 \le W_i \le 10^9$


给定一个长度为 $N$ 的 01 字符串 $S$。

根据该序列构造一个有向图：对于任意 $(i, j)$，如果 $S_i = 0$、$S_j = 1$，且 $i < j$，则添加一条从 $i$ 指向 $j$ 的有向边。

初始时，每个节点 $i$ 都有一个分数值 $W_i$，由数组 $W = [W_1, W_2, \dots, W_N]$ 表示。你可以执行以下两种操作任意次：

1. 选择一个满足 $S_i = 0$ 的节点 $i$：节点 $i$ 向其每个出边邻居各给予 1 分。
2. 选择一个满足 $S_j = 1$ 的节点 $j$：节点 $j$ 从其每个入边邻居各拿取 1 分。

换言之，分数流向就是图的箭头流向。

判断是否存在一种操作序列，使得最终每个节点的分数都恰好为 0（即对于所有 $i$，均满足 $W_i = 0$）。

## Solution

特判：

- 在第一个 0 之前的所有 1，初始分数 $W_i$ 必须为 0。
- 在最后一个 1 之后的所有 0，初始分数 $W_i$ 必须为 0。
- 总和 $\sum W_i$ 必须等于 0。

下面不妨设 $S_1=0,S_N=1$。

设 $V_i$ 为节点 $i$ ($S_i = 0$) 的操作次数，$-V_j$ 为节点 $j$ ($S_j = 1$) 的操作次数。边 $i \to j$ 上的流量为 $V_i - V_j$。每个节点的流量之和满足：

- 若 $S_k = 0$：$W_k = \sum_{j > k, S_j = 1} (V_k - V_j)$
- 若 $S_k = 1$：$W_k = \sum_{i < k, S_i = 0} (V_k - V_i)$



设 $f_k = \sum_{i=1}^k W_i$ 为 $W$ 的前缀和。

设 $c_0(k)$ 为前缀 $S[1 \dots k]$ 中 0 的个数，$c_1(k)$ 为后缀 $S[k+1 \dots N]$ 中 1 的个数。

将 $W$ 从 $1$ 累加到 $k$，所有内部的流量会相互抵消，只剩下跨越边界 $k$ 的流量。我们得到：

$$f_k = \sum_{i=1}^k W_i = c_1(k) \sum_{i \leqslant k, S_i=0} V_i - c_0(k) \sum_{j>k, S_j=1} V_j$$

不妨假设 $v_1 = 0$（因为 $V_k$ 的绝对大小并不重要，整体加上一个常数 $C$ 并不会改变流量 $V_i - V_j$，所以我们可以从左到右递推构造出一个相对数列 $v_k$），并设 $a_k$ 为直到下标 $k$ 为止所有 0 对应的 $v_i$ 之和 ($a_k = \sum_{i \le k, S_i=0} v_i$)。

通过代数变形，我们可以严格从左到右求解 $v_k$：

- **如果 $S_k = 0$：**

  $$v_k = \frac{c_1(k) a_{k-1} + c_0(k-1) W_k - f_{k-1}}{c_0(k-1) c_1(k)}$$

  $$a_k = a_{k-1} + v_k$$

- **如果 $S_k = 1$：**

  $$a_k = a_{k-1}$$

  $$v_k = \frac{W_k + a_{k-1}}{c_0(k)}$$

如果在任何一步计算中，分子**不能被分母整除**，说明 $v_k$ 不是整数（无法用离散次数的操作达成），直接输出 `NO`。

即使我们求出了整数序列 $v_k$，我们还必须保证操作次数是非负的（$x_i \ge 0, y_j \ge 0$）。这隐含地要求每条边上的流量必须满足 $V_i - V_j \ge 0$。

因为我们已经证明了 $V_i - V_j = v_i - v_j$，所以我们必须保证对于所有的 $S_i = 0$ 和所有的 $S_j = 1$，都有 $v_i - v_j \ge 0$。

这等价于检查：

$$\min_{i: S_i=0} v_i \ge \max_{j: S_j=1} v_j$$

如果该不等式成立，输出 `YES`；否则输出 `NO`。


