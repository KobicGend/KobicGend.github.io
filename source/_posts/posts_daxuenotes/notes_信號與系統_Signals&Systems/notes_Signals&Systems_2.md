---
title: ［和師姐一起學數學］信号与系统 第二章 连续时间系统的时域分析
tags:
  - 筆記
  - 數學
  - 信號與系統
categories:
  - posts_daxuenotes
  - notes_信號與系統_Signals&Systems
description: 信號與系統 第二章 連續時間系統的時域分析
cover: /img/posts/notes/notes-signalsandsystems.webp
top_img: /img/posts/notes/notes-signalsandsystems.webp
aside: true
abbrlink: cb7b11a
date: 2024-09-24 10:21:43
updated: 2024-10-16 05:27:09
---
*[返回目录](../notes/)*

# 第二章 连续时间系统的时域分析

## 2.1 系统微分方程的经典解

首先回忆我们在电子电路中提到的概念：

> 设通解 $y = y_{\mathrm h} + y_{\mathrm p}$，其中 $y_{\mathrm h}$ 表示 **齐次解 (homogeneous solution)**，$y_{\mathrm p}$ 表示 ***莉解 (larticular solution)*** $^{\dagger}$，将初始条件，代入通解，进而有 ***伟解 (varticular solution)***．
> **莉解 (larticular solution)**，指 *张莉 (Zhang Li)* 在电子电路基础 (Dianzi Dianlu Jichu, *Electronic and Circuit Foundation*) 课上讲述的 **特解 (particular solution)**，即针对非齐次方程的非零右侧项而特别构造的解，与齐次解相对应；
> 而 **伟解 (varticular solution)**，指 *陈伟 (Chen Wei)* 在高等数学 (Gaodeng Shuxue, *advanced mathematics*) 课上讲述的 **特解 (particular solution)**，即在给定特定的初始条件或边界条件后，调整任意常数来满足这些条件的解．
> 这两者使用了相同的名词，但概念大相径庭，因此在本笔记中，用莉解和伟解分别代指这两个概念．

由于 **《信号与系统》** 与《高等数学》《电子电路（上）》类似，**是门数学课**，因此我们沿用 *莉解* 和 *伟解* 这两个概念．

### 2.1.1 微分方程的经典解

对于微分方程

$$
\sum_{i=0}^{n} a_{i}y^{(i)}(t)=\sum_{j=0}^{m} b_{j}f^{(j)}(t)
$$

的齐次解、莉解和全解，在《高等数学》中已经给出并详细证明，这里只给出结论：

> 设齐次方程
> $$
> \sum_{i=0}^{n} a_{i}y^{(i)}(t)=0
> $$
> 对应的特征方程
> $$
> \sum_{i=0}^{n} a_{i}\lambda^{i}=0
> $$
> 有 $e_{i}$ 重根 $\lambda_{i}$，则齐次解
> $$
> y_{\mathrm h}(t)=\sum\mathrm e^{\lambda_{i}t} \sum_{j=0}^{e_{i}-1} C_{ij}t^{j},
> $$
> 对于共轭根 $\lambda_{i}\pm \mathrm i\beta_{i}$，只需乘上系数 $A_{i}\cos(\beta_{i}t-\theta_{i})$ 或 $(A_{i}\cos\beta_{i}t+B_{i}\cos\beta_{i}t)$，式中 $C_{ij},A_{i},B_{i},\theta_{i}$ 为常数，结合初始条件解出常数，就能得到伟解．
> 
> 而莉解的形式由非齐次项 $e(t)=\sum \limits_{j=0}^{m} b_{j}f^{(j)}(t)$ 确定，
> $$
> \begin{array}{cc}
> e(t) & y_{\mathrm p }(t) \\ \hline
> E & P \\
> \mathrm e^{\alpha t} & P\mathrm e^{\alpha t}  \\
> \cos(\omega t) & P\cos(\omega t-\theta) \\
> \end{array}
> $$
> 上表给出了一些简单的非齐次项对应的莉解，表中 $P=\sum \limits_{i=0}^{e}P_{i}t^{i}$，其中 $P_{i}$ 是待定常数，$e$ 表示 $\alpha\pm\mathrm i\omega$ 为特征方程的 $e$ 重特征根．



### 2.1.2 初始状态与初始条件

设激励 $e(t)$ 在 $t=0$ 时加入，则
- $y(0_{-})$ 表示 **初始状态**，反映历史信息而与激励无关；
- $y(0_{+})$ 表示 **初始条件**，由初始状态和激励共同决定，即 **初始条件 = 初始状态 + 跳变量**，用于确定齐次解待定系数．

**跳变量** 发生跳变的条件是微分方程右端含 $\delta(t)$ 及其各阶导数，用 $\boldsymbol\delta$ **函数平衡法** 确定跳变量．

## 2.2 零输入响应和零状态响应

### 2.2.1 零输入响应

**零输入响应** $y_{\mathrm{zi}}(t)$ (zero-input) 没有外加激励的作用，仅由初始状态所引起的响应．

**求解方法** 先求出齐次解，解的形式为

$$
y_{\mathrm{zi}}(t)=\sum\mathrm e^{\lambda_{i}t} \sum_{j=0}^{e_{i}-1} C_{ij\mathrm x }t^{j},
$$

因为没有输入，故 **初始条件 = 初始状态**，有

$$
y_{\mathrm{zi}}^{(i)}(0_{+})=y^{(i)}_{\mathrm{zi}}(0_{-})=y^{(i)}(0_{-}).
$$

代入初始条件解出常数 $C$，得到的伟解即是零输入响应．

### 2.2.2 零状态响应

**零状态响应** $y_{\mathrm{zs}}(t)$ (zero-state) 系统的初始状态为 $0$，仅由激励 $e(t)$ 所引起的响应．

**求解方法** 先求出齐次解，再根据激励求出莉解，解的形式为

$$
y_{\mathrm{zi}}(t)=\sum\mathrm e^{\lambda_{i}t} \sum_{j=0}^{e_{i}-1} C_{\mathrm s}t^{j}+y_{\mathrm p }(t),
$$

此时 **初始条件 = 跳变量**，有

$$
\begin{cases}
y^{(i)}_{\mathrm{zs}}(0_{-})=0, \\
y_{\mathrm{zs}}^{(i)}(0_{+})=\vee y^{(i)}(0).
\end{cases}
$$

代入初始条件解出常数 $C$，得到的伟解即是零状态响应．

### 2.2.3 全响应

**全响应** $y(t)$ 由初始状态和激励共同作用引起的响应．全响应有三种分解方法，分别是自由响应（齐次解） + 强迫响应（莉解）、零输入响应 + 零状态响应，以及暂态响应 + 稳态响应．

**求解方法** 先求零输入响应和零状态响应，相加就是全响应，解的形式为

$$
\begin{aligned}
y(t)
&= y_{\mathrm h }(t)+y_{\mathrm p }(t)
= \sum\mathrm e^{\lambda_{i}t} \sum_{j=0}^{e_{i}-1} Ct^{j}+y_{\mathrm p }(t) \\
&= y_{\mathrm{zi}}(t)+y_{\mathrm{zs}}(t)
=\sum\mathrm e^{\lambda_{i}t} \sum_{j=0}^{e_{i}-1} C_{ij\mathrm x }t^{j}+\sum\mathrm e^{\lambda_{i}t} \sum_{j=0}^{e_{i}-1} C_{\mathrm s}t^{j}+y_{\mathrm p }(t).
\end{aligned}
$$

当然，全响应也可以直接求得，利用 **初始条件 = 初始状态 + 跳变量**，有

$$
y^{(i)}(0_{+})=y^{(i)}(0_{-})+\vee y^{(i)}(0).
$$

具体地，设用 $\delta$ 函数平衡法确定的跳变量

$$
y(0)=\sum_{i=0}^{\infty} a_{i}\delta^{(i)}(t),
$$

则

$$
\vee y^{(i)}(0)=a_{i},
$$

所以

$$
y_{\mathrm{zs}}^{(i)}(0_{+})=y^{(i)}_{\mathrm{zs}}(0_{-})+a_{i}.
$$

将初始条件代入

$$
y(t)=\sum\mathrm e^{\lambda_{i}t} \sum_{j=0}^{e_{i}-1} Ct^{j}+y_{\mathrm p }(t),
$$

得到的伟解即是全响应．


## 2.3 冲激响应和阶跃响应

### 2.3.1 冲激响应

**冲激响应** $h(t)$ 单位 **冲激函数** $\delta(t)$ 所引起的 **零状态响应**．

此时系统方程的一般形式为

$$
\sum_{k=0}^{n} a_{k}h^{(k)}(t)=\sum_{k=0}^{m} b_{k}\delta^{(k)}(t).
$$

**求解方法** 由于激励信号 $\delta(t)$ 在 $t>0$ 时为零，所以冲激响应 $h(t)$ 解的形式与齐次解的形式基本相同，但需要根据次数 $m,n$ 补充冲激函数及其各阶导数．具体地，

$$
h(t)=\sum\mathrm e^{\lambda_{i}t} \sum_{j=0}^{e_{i}-1} C_{ij\mathrm x }t^{j}\varepsilon(t)+\sum_{k=0} ^{m-n}C_{k}\delta^{(k)}(t).
$$

上式的第一项即是齐次解，第二项是莉解，它的各项系数 $C_{k}$ 可以由初始条件确定，这里初始条件等于跳变量．

另一种（或许更加简便的）做法是，首先求

$$
\sum_{k=0}^{n} a_{k}h_{0}^{(k)}(t)=\delta(t)
$$

的冲激响应 $h_{0}(t)$，于是原方程的冲激响应为

$$
h(t)=\sum_{k=0}^{m} b_{k}h_{0}^{(k)}(t).
$$

这与第一种做法相比，求冲激响应时 $m=0$，不需要求第二项莉解的各项系数 $C_{k}$，但是后续需要对 $h_{0}(t)$ 多次求导．

### 2.3.2 阶跃响应

**阶跃响应** $g(t)$ 由单位阶跃函数 $\varepsilon(t)$ 所引起的零状态响应．

由于

$$
\varepsilon(t)=\int_{-\infty}^{t}\delta(\tau)\mathrm d\tau ,
$$

因此

$$
\boxed{g(t)=\int_{-\infty}^{t}h(\tau)\mathrm d\tau} ,
$$

**例** 已知某 LIS 系统的单位阶跃响应为 $g(t)=\mathrm e^{-2t}\varepsilon(t-1)$，求单位冲激响应 $h(t)$．

**解**

$$
\begin{aligned}
h(t)=g'(t)
&=-2t\mathrm  e^{-2t}\varepsilon(t-1)+\mathrm  e^{-2t}\delta(t-1) \\
&=-2t\mathrm  e^{-2t}\varepsilon(t-1)+\mathrm  e^{-2}\delta(t-1).
\end{aligned}
$$

## 2.4 卷积积分

### 2.4.1 卷积的定义及其积分限的确定

设 $f_{1}(t),f_{2}(t)$ 是定义在 $(-\infty,+\infty)$ 区间上的连续函数，定义它们的 **卷积**

$$
\boxed{
f_{1}(t)*f_{2}(t)=
\int_{-\infty}^{+\infty}
f_{1}(\tau)f_{2}(t-\tau)
\mathrm d\tau} .
$$

如果要求 $f_{1}(\tau)f_{2}(t-\tau)$ 非零，就能得到 $\tau$ 的范围．卷积结果所占的时宽等于两个函数各自时宽的总和．

### 2.4.2 卷积的图示法

不会用电脑画图，此部分从略．

### 2.4.3 借助冲激响应和线性时不变性质求解系统的零状态响应

**卷积积分的物理意义** 将激励信号 $e(t)$ 分解为无穷多个冲激信号之和，借助系统的冲激响应、线性、时不变性质求解系统对任意信号激励下的零状态响应 $y_{\mathrm{zs}}(t)$，有

$$
\boxed{y_{\mathrm{zs}}(t)=e(t)*h(t)}.
$$

**例** 已知某 LTI 系统的单位阶跃响应 $g(t)=\mathrm e^{-2(t-1)} \varepsilon(t)$，求当激励信号 $e(t)=\delta(t)-2 \varepsilon(t-1)$ 时，系统的零状态响应。

**解** 

$$
\begin{aligned}
h(t)
&= g'(t)=\mathrm e^{2}\big[\delta(t)-2 \mathrm e^{-2t}\big] \varepsilon(t), \\
\Longrightarrow y(t)
&= h(t)-2 g(t-1) \\
&= \mathrm  e^2 \delta(t)-2 \mathrm  e^{-2(t-1)} \varepsilon(t)-2 \mathrm  e^{-2(t-2)} \varepsilon(t-1). 
\end{aligned}
$$

## 2.5 卷积积分的性质

1. 卷积满足交换律、结合律和对加法的分配律．$n$ 个信号相加作用于系统产生的零状态响应，等于 $n$ 个信号分别作用于系统产生的 $n$ 个零状态响应之和．$n$ 个子系统并联组成的系统，其冲激响应等于各子系统冲激响应之和．

2. 函数与冲激函数的卷积：

$$
f(t)*\delta^{(n)}(t-t_{0})=f^{(n)}(t-t_{0}).
$$

3. 卷积的微分和积分：

$$
f^{(i)}(t)=f_{1}^{(j)}(t)*f_{2}^{(i-j)}(t)=f_{1}^{(i-j)}(t)*f_{2}^{(j)}(t).
$$

4. 卷积的时移特性：

$$
f_{1}(t-t_{0})*f_{2}(t)=y(t-t_{0})=f_{1}(t)*f_{2}(t-t_{0}).
$$


<br><br>

*[返回目录](../notes/)*

2024-09-13：[［和師姐一起學數學］信号与系统 第一章 信号与系统的基本概念](../posts/3d4d4abc.html)
2024-10-16：［和師姐一起學數學］信号与系统 第二章 连续时间系统的时域分析（本篇）
2024-10-21：[［和師姐一起學數學］信号与系统 第三章 离散时间系统的时域分析](../posts/f70b9775.html)
2024-10-22：[［和師姐一起學數學］信号与系统 第四章 连续时间信号与系统的频域分析（上）](../posts/962dcafc.html)
2024-11-17：[［和師姐一起學數學］信号与系统 第四章 连续时间信号与系统的频域分析（下）](../posts/2e479d4c.html)
2024-11-18：[［和師姐一起學數學］信号与系统 第五章 连续时间信号与系统的复频域分析](../posts/80f29746.html)