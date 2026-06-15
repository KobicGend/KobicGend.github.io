---
title: ［和師姐一起學數學］信号与系统 第三章 离散时间系统的时域分析
tags:
  - 筆記
  - 數學
  - 信號與系統
categories:
  - posts_daxuenotes
  - notes_信號與系統_Signals&Systems
description: 信號與系統 第三章 離散時間系統的時域分析
cover: /img/posts/notes/notes-signalsandsystems.webp
top_img: /img/posts/notes/notes-signalsandsystems.webp
aside: true
abbrlink: f70b9775
date: 2024-10-21 18:24:34
updated: 2024-10-21 18:24:34
---
*[返回目录](../notes/)*

# 第三章 离散时间系统的时域分析

## 3.1 系统差分方程的经典解

单输入—单输出的 LTI 离散系统的数学模型一般形式为常系数线性差分方程

$$
\sum_{i=0}^{n} a_{n-i}y(k-i)=\sum_{j=0}^{m} b_{m-j}f(k-j),\quad n \geqslant m .
$$

差分方程就是递推数列，这进一步支撑 **《信号与系统》是门数学课** 这一观点．

我们曾在高中学习过递推数列的解，这里稍作复习：

> 设齐次方程
> $$
> \sum_{i=0}^{n} a_{n-i}y(k-i)=0
> $$
> 对应的特征方程
> $$
> \sum_{i=0}^{n} a_{i}\lambda^{i}=0
> $$
> 有 $e_{i}$ 重根 $\lambda_{i}$，则齐次解
> $$
> y_{\mathrm h}(t)=\sum\lambda_{i}^t \sum_{j=0}^{e_{i}-1} C_{ij}t^{j},
> $$
> 对于共轭根 $\lambda_{i}\mathrm e^{\pm \mathrm i\Omega}$，只需乘上系数 $A_{i}\cos(\Omega_{i}k-\theta_{i})$ 或 $(A_{i}\cos\Omega_{i}k+B_{i}\cos\Omega_{i}k)$，式中 $C_{ij},A_{i},B_{i},\theta_{i}$ 为常数，结合初始条件解出常数，就能得到伟解．
> 
> 而莉解的形式由非齐次项 $e(k)=\sum \limits_{j=0}^{m} b_{m-j}f(k-j)$ 确定．

这与微分方程十分相似，只是解的基本形式不同：


|        | 微分方程                                                       | 差分方程                                             |
| ------ | ---------------------------------------------------------- | ------------------------------------------------ |
| 共轭根    | $\lambda_{i}\pm \mathrm i\beta_{i}$                        | $\lambda_{i}\mathrm e^{\pm \mathrm i\Omega}$     |
| 解的基本形式 | $\mathrm e^{\lambda_{i}t}A_{i}\cos(\beta_{i}t-\theta_{i})$ | $\lambda_{i}^tA_{i}\cos(\Omega_{i}k-\theta_{i})$ |

离散系统的时域分析与连续系统时域分析有很强的对应关系，在后续学习中将逐步深入理解．

## 3.2 零输入响应和零状态响应

概念与求解方法与连续系统相同，这里不再赘述．

略有不同的是，离散系统中的初始状态 $y(0_{-})$ 特别地指 $y(-1),y(-2),\dots ,y(-k)$，初始条件 $y(0_{+})$ 特别地指 $y(0),y(1),\dots ,y(k-1)$，而初始条件是由递推公式推得的，不再需要 $\delta$ 函数平衡法．

## 3.3 单位序列响应和单位阶跃响应

这里只讲这两者的关系．由于

$$
\begin{aligned}
\delta(t)&=\varepsilon(k)-\varepsilon(k-1), \\
\varepsilon(k) &= \sum \limits_{i=-\infty}^{k}\delta(i)=\sum \limits_{n=0}^{\infty}\delta(k-n),
\end{aligned}
$$

结合线性性质和时（移）不变性得

$$
\begin{aligned}
h(t)&=g(k)-g(k-1),\\
g(k)&= \sum \limits_{i=-\infty}^{k}h(i)=\sum \limits_{n=0}^{\infty}h(k-n).
\end{aligned}
$$

## 3.4 卷积和

定义相应地修改为

$$
f_{1}(k)*f_{2}(k)=\sum_{n=-\infty}^{\infty}f_{1}(n)f_{2}(k-n),
$$

**例** 设序列 $f_{1}(k)=f_{2}(k)=\varepsilon(k)-\varepsilon(k-3)$，即 $\lbrace 1_{(k=0)},1,1 \rbrace$，则 $f_{1}(k)*f_{2}(k)=\lbrace 1_{(k=0)},2,3,2,1 \rbrace$．

求和号里就是多项式乘法，在初中就学过了，很简单，这章笔记就这样水完了．



<br><br>

*[返回目录](../notes/)*

2024-09-13：[［和師姐一起學數學］信号与系统 第一章 信号与系统的基本概念](../posts/3d4d4abc.html)
2024-10-16：[［和師姐一起學數學］信号与系统 第二章 连续时间系统的时域分析](../posts/cb7b11a.html)
2024-10-21：［和師姐一起學數學］信号与系统 第三章 离散时间系统的时域分析（本篇）
2024-10-22：[［和師姐一起學數學］信号与系统 第四章 连续时间信号与系统的频域分析（上）](../posts/962dcafc.html)
2024-11-17：[［和師姐一起學數學］信号与系统 第四章 连续时间信号与系统的频域分析（下）](../posts/2e479d4c.html)
2024-11-18：[［和師姐一起學數學］信号与系统 第五章 连续时间信号与系统的复频域分析](../posts/80f29746.html)osts/80f29746.html)