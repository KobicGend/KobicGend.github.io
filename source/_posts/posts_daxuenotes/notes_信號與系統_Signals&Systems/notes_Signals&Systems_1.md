---
title: ［和師姐一起學數學］信号与系统 第一章 信号与系统的基本概念
tags:
  - 筆記
  - 數學
  - 信號與系統
categories:
  - - 筆記
    - 大學筆記
description: 信號與系統 第一章 信號與系統的基本概念
cover: /img/posts/notes/notes-signalsandsystems.webp
top_img: /img/posts/notes/notes-signalsandsystems.webp
aside: true
abbrlink: 3d4d4abc
date: 2024-09-13 15:27:09
updated: 2024-09-13 15:27:09
---
*[返回目录](../notes/)*

本笔记基于吴大正等著《信号与线性系统分析 第 5 版》。

# 第一章 信号与系统的基本概念

本章概念较多，有些枯燥……

## 1.1 绪论

**信号** 是个 **数学函数**，表现为一种波形，**系统** 的基本作用是对信号进行传输和处理，是 **数学函数的函数**．所以这门课的本质是 **数学**．

## 1.2 信号的分类

### 1.2.1 确定性信号和随机信号

### 1.2.2 连续信号和离散信号

- **连续信号** 定义域（时间）连续

- **模拟信号** 时间和函数值均连续

### 1.2.3 周期信号和非周期信号

若令周期信号的周期趋于无穷大，则成为非周期信号

### 1.2.4 能量信号和功率信号

$$
\begin{array}{}
& \text{信号能量 }E & \text{信号功率 }P \\\hline
\text{连续信号}
& \displaystyle\lim_{ \alpha \to \infty } \int_{-\alpha}^{\alpha} \big|f(t)\big|^{2} \mathrm dt
& \displaystyle\lim_{ \alpha \to \infty } \frac{1}{2\alpha} \int_{-\alpha}^{\alpha} \big|f(t)\big|^{2} \mathrm dt  \\
\text{离散信号}
& \displaystyle\lim_{ N \to \infty } \sum_{k=-N}^{N} \big|f(k)\big|^{2}
& \displaystyle\lim_{ N \to \infty } \dfrac{1}{2N+1} \sum_{k=-N}^{N} \big|f(k)\big|^{2}
\end{array}
$$

- **能量信号** 能量有限的信号

- **功率信号** 功率有限的信号，周期信号一般是功率信号

## 1.3 基本信号及其时域特性

### 1.3.1 普通连续信号

- **指数信号** $f(t)=K\mathrm e^{\alpha t}$，其中指数因子 $\alpha$，时间常数 $\tau=\cfrac{1}{|\alpha|}$

- **正弦信号** $f(t)=A\cos(\omega t-\theta)$

- **复指数信号** $f(t)=K\mathrm e^{(\alpha+\mathrm i\omega) t}$

- **抽样信号** $f(t)=\operatorname{Sa}t=\cfrac{\sin t}{t}$，这是个偶函数，一个重要性质是狄利克雷积分 $\displaystyle \int_{-\infty}^{+\infty}\operatorname{Sa}t\mathrm dt=\pi$

### 1.3.2 奇异信号

**奇异** 函数本身或其导数或其积分有不连续点，下面列举常用的奇异信号：

- **单位斜坡/变信号** $r(t)=t,\ t \geqslant 0$

- **单位阶跃信号** $\varepsilon(t)=1,\ t>0$ 是单位斜坡的导函数，$t=0$ 处不定义

- **单位冲激信号** $\delta(t)$ 是单位阶跃信号的导函数，表示冲击强度，用 $\uparrow(1)$ 表示，满足 $\displaystyle \int_{-\infty}^{+\infty}\delta(t)=1$ 且 $\delta(t)=0,\ t \neq 0$

- **单位冲激偶信号** $\delta'(t)$ 是单位冲激信号的导函数，满足 $\displaystyle \int_{-\infty}^{+\infty}\delta'(t)=0$

$$
\begin{array}{ccc}
& \text{冲激信号} \delta(t)
& \text{冲激偶信号} \delta(t) \\\hline
\text{与普通函数相乘}
& f(t)\delta(t) = f(0)\delta(t)
& f(t)\delta'(t) = f(0)\delta'(t) -f'(0)\delta(t) \\
\text{抽样性}
& \displaystyle \int_{-\infty}^{+\infty} f(t)\delta(t) \mathrm dt = f(0)
& \displaystyle \int_{-\infty}^{+\infty} f(t)\delta'(t) \mathrm dt = -f'(0)\\
\text{奇偶性}
& \delta(-t)=\delta(t)
& \delta'(-t)=-\delta'(t) \\
\text{尺度变换}
& \delta(at) = \dfrac{1}{|a|}\delta(t)
& \delta'(at) = \dfrac{1}{a|a|}\delta'(t)
\end{array}
$$

冲激信号与普通函数相乘的结果是由定义得到的．对

$$
f(t)\delta(t) = f(0)\delta(t)
$$

两边求导，得

$$
f'(t)\delta(t) + f(t)\delta'(t) = f(0)\delta'(t),
$$

结合 $f'(t)\delta(t) = f'(0)\delta(t)$，于是

$$
f(t)\delta'(t) = f(0)\delta'(t) - f'(0)\delta(t).
$$

这就证明了冲激偶信号与普通函数相乘的结果．

这里特别强调，如果出现冲激（偶）信号与普通函数相乘，必须化简．

**例** 计算 $\displaystyle \int_{-4}^{4}(t^{2}+\mathrm e^{-2t})[\delta(2t-6)-\delta'(t+2)]\mathrm dt$．

**解** 由抽样性，原式

$$
\begin{aligned}
&=\int_{-4}^{4}
(t^{2}+\mathrm e^{-2t})
[0.5\delta(t-3)-\delta'(t+2)]
\mathrm dt \\
&=0.5\big[t^{2}+\mathrm e^{-2t}\big]_{t=3}
-\Big[-\big(t^{2}+\mathrm e^{-2t}\big)'\Big]_{t=-2} \\
&=0.5+0.5\mathrm e^{-6}-2\mathrm e^{4}  .
\end{aligned}
$$

### 1.3.3 基本离散信号

- **单位阶跃序列** $\varepsilon(k)=1,\ k \geqslant 0$，注意在 $t=0$ 处有定义，是单位序列的前缀和，即 $\varepsilon(k) = \sum \limits_{i=-\infty}^{k}\delta(i)=\sum \limits_{n=0}^{\infty}\delta(k-n)$

- **单位序列** $\delta(k)=1,\ k=0$，类似于单位冲激信号，是单位阶跃序列的差分，即 $\delta(k) = \varepsilon(k) - \varepsilon(k-1)$

- **单边指数序列** $f(k)=a^{k}\varepsilon(k)$

- **正弦序列** $f(k)=\sin\omega_{0}k$，如果周期 $T=\cfrac{2\pi}{\omega_{0}}$ 是有理数，设 $T=\cfrac{q}{p}$，其中 $p\perp q$，则最小正周期为 $T_{0}=q$，否则如果周期是无理数，正弦序列没有周期

- **复指数序列** $f(k)=K\mathrm e^{(\alpha+\mathrm i\omega) k}=Ka^{k}\mathrm e^{\mathrm i\omega k}$

## 1.4 信号的基本运算

信号的基本运算包括线性运算，平移、反转、尺度变换，微积分，差分、求和．

这里着重强调差分，$\Delta, \nabla$ 是差分算子，前者为前向差分，后者为后向差分，即

$$
\begin{aligned}
\Delta f(k) &= f(k+1)-f(k) \\
\nabla f(k) &= f(k)-f(k-1) \\
\end{aligned}
$$

这两者的关系是 $\nabla f(k) = \Delta f(k-1)$．

## 1.5 系统的描述及分类

### 1.5.1 系统的描述方法

系统模型可用数学表达式或框图法描述，

- 连续系统中，$\int$ 是积分器，$x^{(j)}(t)\overset{\int}{\to}x^{(j-1)}(t)$，

$$
\begin{cases}
y(t)=\sum\limits_{j=0}^{\infty} a_{j}x^{(j)}(t) \\
f(t)=\sum\limits_{i=0}^{\infty} b_{i}x^{(i)}(t)
\end{cases}
\Longrightarrow 
\sum_{i=0}^{\infty} b_{i}y^{(i)}(t)
=\sum_{j=0}^{\infty} a_{j}f^{(j)}(t).
$$

- 离散系统中，$D$ 是位移器，$x(k)\overset{D}{\to}x(k-1)$，

$$
\begin{cases}
y(k)=\sum\limits_{j=0}^{\infty} a_{j}x(k-j) \\
f(k)=\sum\limits_{i=0}^{\infty} b_{i}x(k-i)
\end{cases}
\Longrightarrow 
\sum_{i=0}^{\infty} b_{i}y(k-i)
=\sum_{j=0}^{\infty} a_{j}f(k-j).
$$

### 1.5.2 系统的分类

讨论线性时不变系统 (**L**inear **T**ime - **I**nvariant Systems)

## 1.6 线性时不变系统的性质

- **线性性** 线性动态系统满足 **分解特性**，即响应是输入信号 $\lbrace f(t) \rbrace$ 和初始状态 $\lbrace x(0) \rbrace$ 单独作用所引起的响应之和，且分别满足 **零输入线性**、**零状态线性**，线性需同时满足 **均匀/齐次性** 和 **叠加/可加性**，例如 $f(t)+1,\ f^{2}(t), \ x(0)f(t)$ 是非线性的

- **时不变性** 响应 $y$ 形式与激励 $f$ 接入系统的时间无关，例如 $f(2t),\ f(\mathrm e^{t}),\ f(-t),\ tf(t)$ 是时变的

- **因果性** 响应 $y$ 后于激励 $f$，例如 $f(t+1),\ f(-t)$ 是非因果的

- **稳定性** 有界的输入 $f$ 产生有界的零状态响应 $y$



<br><br>

*[返回目录](../notes/)*

2024-09-13：［和師姐一起學數學］信号与系统 第一章 信号与系统的基本概念（本篇）
2024-10-16：[［和師姐一起學數學］信号与系统 第二章 连续时间系统的时域分析](../posts/cb7b11a.html)
2024-10-21：[［和師姐一起學數學］信号与系统 第三章 离散时间系统的时域分析](../posts/f70b9775.html)
2024-10-22：[［和師姐一起學數學］信号与系统 第四章 连续时间信号与系统的频域分析（上）](../posts/962dcafc.html)
2024-11-17：[［和師姐一起學數學］信号与系统 第四章 连续时间信号与系统的频域分析（下）](../posts/2e479d4c.html)
2024-11-18：[［和師姐一起學數學］信号与系统 第五章 连续时间信号与系统的复频域分析](../posts/80f29746.html)