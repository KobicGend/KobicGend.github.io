---
title: 'ACM笔记 - 算法学习笔记 - 详细解释版'
tags:
  - ACM
  - 算法
  - 筆記
---



# 组合数学杂项

### 斯特林数 Stirling 入门

@Hongzy

#### 第一类斯特林数 $\begin{bmatrix} n \\ m\end{bmatrix}$

表示 $n$ 个数形成 $m$ 个轮换的方案数，读作 **n 轮换 m**。又称 **斯特林轮换数**。

这里的轮换就好比坐圆桌，$(1,2,3,4)$ 这个轮换与 $(2,3,4,1)$ 相同，但与 $(4,3,2,1)$ 或者 $(1,4,2,3)$ 不同。

##### 性质

1. $\begin{bmatrix} n \\ 1\end{bmatrix}=(n-1)!$ 。这就是圆排列方案数，原本是 $n!$ 种方法，每种方法被算了 $n$ 次。
2. $\begin{bmatrix} n \\ n-1\end{bmatrix} = \dfrac{n(n-1)}{2}$。选择两个元素构成一个轮换。
3. $\begin{bmatrix} n \\ m\end{bmatrix} \geq \begin{Bmatrix} n \\ m\end{Bmatrix}$。轮换数是不会比子集数小的，因为每个轮换都对应一个集合，每个集合至少可以形成一种轮换。

##### 递推关系

$$
\begin{bmatrix} n \\ m\end{bmatrix}=\begin{bmatrix} n-1 \\ m-1\end{bmatrix} + (n-1) \begin{bmatrix} n-1 \\ m\end{bmatrix} \\
$$

元素 $n$ 单独成一个轮换，或者塞到 $1$ 到 $n-1$ 某个数的前面。

对比递归式发现只是第二项的系数不同，一个是 $m$ 一个是 $n-1$。

排列和轮换什么关系？一一对应。我们从 $i$ 向 $p_i$ 连边，就形成若干环，也就是轮换。这意味着：
$$
\sum_{k = 0}^n\begin{bmatrix} n \\ k\end{bmatrix} = n! \\
$$

------

#### 第二类斯特林数 $\begin{Bmatrix} n \\ m\end{Bmatrix}$​ 

表示 n 个元素划分成 m 个集合，每个集合非空的方案数，读作 **n 子集 m**。由于定义是分成若干集合，第二类斯特林数又称 **斯特林子集数**。

##### 特例

1. $n < m$ 时 $\begin{Bmatrix} n \\ m\end{Bmatrix} = 0$ ，因为一定有集合为空。
2. $n\geq 1$ 时 $\begin{Bmatrix} n \\ 1\end{Bmatrix} = 1$ ，这些数只有唯一的分法。
3. $n\geq 2$ 时 $\begin{Bmatrix} n \\ 2\end{Bmatrix}= 2^{n-1} - 1$ ，第一个数不动，剩下的 $n - 1$ 个数可以选择和第一个数在一个集合还是不在一个集合，当然还要减去一种全在一个集合的情况。

##### 递推关系

考虑若 $n$ 个元素要形成 $m$ 个集合，第 $n$ 个元素要么独立成一个集合，要么加入前 $n - 1$ 个数构成的 $m$ 个集合中的一个。即：