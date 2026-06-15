---
title: Hard Ver.
tags:
  - ACM
  - 算法
  - 筆記
categories:
  - posts_acm
  - 問題
  - 原創問題
abbrlink: d7f4f9d0
---

## Statement

*The only difference between the easy and hard versions is that in this version, you are allowed to **modify the weight of at most one vertex**.*

You are given a tree consisting of $N$ vertices. Each vertex $i$ is assigned a weight $W_i \in \{0, 1\}$.

We define the weight of a simple path as follow: 

- Let $P = (v_0, v_1, \dots, v_k)$ be a simple path from vertex $U$ to vertex $V$, such that $v_0 = U$, $v_k = V$. 
- Let $S(P)$ be the binary string formed by sequentially concatenating the weights of the vertices along the path: $S(P) = w(v_0) + w(v_1) + \dots + w(v_k)$, where $+$ denotes the string concatenation operator. 
- The path weight $\mathcal{W}(P)$ is the numerical value of $S(P)$ interpreted as a binary number.

*You can perform the following operation **at most once**:*

- *Choose a vertex and modify its weight from 0 to 1 or vice versa.*

Your task is to find the maximum possible numerical value represented by a such binary string along any simple path in the tree ***after performing the operation at most once***, and output this maximum value as a binary string.

## Solution

其实比 Easy 要简单。

首先一定把直径端点为 0 的改成 1，下面只需要在直径上完成，简单了许多。

通过两次 DFS 求出树的直径长度 $D$，以及直径端点集合 $E$，注意记录直径端点属于哪一个子树分支。

对每个子树分支分别执行（从叶子到中心/从中心到叶子）（修改叶子/不修改叶子）四种情况的多源 BFS，BFS 每次把不是最大的都杀掉，求出最大路径。

拼接的方法和 Easy 类似，如果最大路径只有一种走法来到这里，并且当前要去的节点 `y` 刚好就是上一轮来到 `x` 的来源，那么这就是走回头路了，否则没有回头路，直接拼接。

复杂度 $O(N)$。

