---
title: ［和師姐一起學數學］信号与系统 第四章 连续时间信号与系统的频域分析（上）
tags:
  - 筆記
  - 數學
  - 信號與系統
categories:
  - posts_daxuenotes
  - notes_信號與系統_Signals&Systems
description: 信號與系統 第四章 連續時間信號與系統的頻域分析（上）
cover: /img/posts/notes/notes-signalsandsystems.webp
top_img: /img/posts/notes/notes-signalsandsystems.webp
aside: true
abbrlink: 962dcafc
date: 2024-10-15 10:23:09
updated: 2024-10-25 18:30:10
---
*[返回目录](../notes/)*

# 第四章 连续时间信号与系统的频域分析

## 4.1 连续时间周期函数的频谱分析

### 4.1.1 傅里叶级数

函数可以看作无穷维的向量，我们将《线性代数》中提及的向量正交性、正交化等概念推广到函数．

称两个函数 $g_{1}(t), g_{2}(t)$ 在区间 $(t_{1},t_{2})$ 上 **正交**，若这两个函数在 $(t_{1},t_{2})$ 上有定义，且 **内积** 为零，即

$$
\boxed{\int_{t_{1}}^{t_{2}}g_{1}^{*}(t)g_{2}(t)\mathrm dt=0} 
$$

**正交函数集** 没有零函数，且两两函数正交的函数集，即 $\forall i,j\in[1,n]$，有

$$
\int_{t_{1}}^{t_{2}}g_{i}(t)g_{j}(t)\mathrm dt=
\begin{cases}
0 & i\neq j, \\
k_{i}\neq 0 & i=j.
\end{cases}
$$

与向量类似，函数空间中的任意函数均可分解为基本函数的线性组合．对于区间上的一个正交函数集，这区间上的任意函数 $f(t)$ 可用该正交函数集的线性组合近似表示，即

$$
f(t)\approx\sum_{i=1}^{n}c_{i}g_{i}(t).
$$

**完备的正交函数集** 满足均方误差 ${\overline\varepsilon}^{2}=0$ 的正交函数集，它通常包含无穷多个函数，此时

$$
f(t)=\sum_{i=1}^{\infty}c_{i}g_{i}(t),
$$

式中，系数

$$
c_{i}
= \dfrac{
\int_{ t_{1} }^{ t_{2} }
g_{i}^{*}(t) f(t)
\mathrm dt
}{
\int_{ t_{1} }^{ t_{2} }
g_{i}^{*}(t) g_{i}(t)
\mathrm dt
}.
$$

**归一化的正交函数集** 满足 $k_{i}=1$ 的正交函数集．

**周期函数的级数展开** 周期函数可以在周期内分解为基本函数的线性组合，这些基本函数在周期内两两正交，构成正交函数集．

#### 4.1.1.1 三角傅里叶级数展开

**三角函数集** $\lbrace 1,\cos n\Omega t,\sin n\Omega t,\ n=\pm 1,\pm 2,\dots \rbrace$ 在区间 $(t_{0},t_{0}+T)$ 上是完备的正交函数集，因此周期函数 $f_{T}(t)$ 在区间 $(t_{0},t_{0}+T)$ 上可用三角函数的线性组合表示，这就是 **三角傅里叶级数展开**．

设

$$
\boxed{
f_{T}(t)=\frac{a_{0}}{2}+\sum_{n=1}^{\infty}a_{n}\cos n\Omega t+b_{n}\sin n\Omega t
}
$$

式中 $\Omega=\dfrac{2\pi}{T}$ 表示周期函数 $f_{T}(t)$ 的角频率．

熟知 **华莱式**

$$
\small
\int_{0}^{\frac{\pi}{2}}{\sin^nx\mathrm{d}x}
=\int_{0}^{\frac{\pi}{2}}{\cos^nx\mathrm{d}x}
=\left\{
\begin{array}{ll}
\dfrac{(n-1)!!}{n!!} & n\text{ is odd.}\\
\dfrac{(n-1)!!}{n!!} \cdot \dfrac{\pi}{2} & n\text{ is even.}
\end{array}\right.
$$

并结合系数计算公式，有

$$
\begin{cases}
a_{n}
=\dfrac{\int_{t_{0}}^{t_{0}+T}f(t)\cos n\Omega t\mathrm dt}{\int_{t_{0}}^{t_{0}+T}\cos^{2} n\Omega t\mathrm dt}, \\
b_{n}
=\dfrac{\int_{t_{0}}^{t_{0}+T}f(t)\sin n\Omega t\mathrm dt}{\int_{t_{0}}^{t_{0}+T}\sin^{2} n\Omega t\mathrm dt}, \\
\dfrac{a_{0}}{2}
=\dfrac{\int_{t_{0}}^{t_{0}+T}f(t)\mathrm dt}{\int_{t_{0}}^{t_{0}+T}1^{2} \mathrm dt},
\end{cases}
$$

化简得

$$
\boxed{
\begin{cases}
a_{n}
=\displaystyle\frac{2}{T}\int_{t_{0}}^{t_{0}+T}f(t)\cos n\Omega t\mathrm dt \\
b_{n}
=\displaystyle\frac{2}{T}\int_{t_{0}}^{t_{0}+T}f(t)\sin n\Omega t\mathrm dt \\
\dfrac{a_{0}}{2}
=\displaystyle\frac{1}{T}\int_{t_{0}}^{t_{0}+T}f(t)\mathrm dt
\end{cases}
}
$$

这和《高等数学》中直接给出的结论是相同的，数学绝不是机械地套公式计算，现在我们从新的角度更深刻地理解了（三角）傅里叶级数．在学习傅里叶变换之后，本文将给出一个实际应用．

下面推导 **周期矩形函数** 的三角形式的傅里叶级数：

$$
\begin{cases}
a_{n}
=\displaystyle\frac{2}{T}\int_{0}^{\frac{T}{2}}\cos n\Omega t\mathrm dt
=0, \\
b_{n}
=\displaystyle\frac{2}{T}\int_{0}^{\frac{T}{2}}\sin n\Omega t\mathrm dt
=\dfrac{1}{n\pi}\big(1-(-1)^{n}\big), \\
a_{0}
=\displaystyle\frac{2}{T}\int_{0}^{\frac{T}{2}}\mathrm dt
=1, \\
\end{cases}
$$

于是

$$
f(t)=\frac{1}{2}+\frac{2}{\pi}\sum_{n=1}^{\infty} \dfrac{1}{2n-1}\sin (2n-1)\Omega t.
$$

上式表明，周期矩形函数可以分解得到一系列的正弦函数，也可以由直流函数和正弦函数合成周期矩形函数．而且，取的项数越多，均方误差越小，相加后的波形越逼近 $f(t)$，用完备正交函数集表示时，需要无穷项的线性组合，即当 $n\to +\infty$ 时，

$$
\overline\varepsilon^{2}=\dfrac{1}{t_{1}-t_{2}}\int_{t_{1}}^{t_{2}}\Big[ f(t)-\sum_{i=1}^{n}c_{i}g_{i}(t)\Big]^{2}\mathrm dt\to 0.
$$

此外，频率低的分量振幅大，组成方波的主体，频率高的分量振幅小，主要影响方波的边沿，说明边沿陡峭的波形含高频分量丰富，边沿缓慢的波形含低频分量丰富．所含谐波项越多合成波形越与方波接近，合成波形的尖峰越靠近间断点，但不明显减小，$n\to +\infty$ 时在间断点处仍有 9% 的偏差，但尖峰下面的面积趋于零，从均方误差意义上认为与原波形没有误差，这就是 **吉布斯现象**．

#### 4.1.1.2 复指数傅里叶级数展开

**复指数函数集** $\lbrace \mathrm e^{\mathrm in\Omega t},\ n=0,\pm 1,\pm 2,\dots \rbrace$ 在区间 $(t_{0},t_{0}+T)$ 上是完备的正交函数集，因此周期函数 $f_{T}(t)$ 在区间 $(t_{0},t_{0}+T)$ 上可用复指数函数的线性组合表示，这就是 **复指数傅里叶级数展开**．

设

$$
\boxed{
f_{T}(t)=
\sum_{n=-\infty}^{\infty}
F_{n}\mathrm e^{\mathrm in\Omega t}
}
$$

式中 $\Omega=\dfrac{2\pi}{T}$ 表示周期函数 $f_{T}(t)$ 的角频率．

结合系数计算公式，有

$$
F_{n}
=\dfrac{\int_{t_{0}}^{t_{0}+T}f(t)\mathrm e^{-\mathrm in\Omega t}\mathrm dt}{\int_{t_{0}}^{t_{0}+T}\mathrm e^{\mathrm in\Omega t}\mathrm e^{-\mathrm in\Omega t}\mathrm dt},
$$

化简得

$$
\boxed{F_{n}=\frac{1}{T}\int_{t_{0}}^{t_{0}+T}f(t)\mathrm e^{-\mathrm in\Omega t} \mathrm dt}
$$

下面推导 **矩形脉冲函数** 的指数形式的傅里叶级数：

$$
\begin{aligned}
F_{n}
&=\frac{1}{T}\int_{t_{0}}^{t_{0}+T}f(t)\mathrm e^{-\mathrm in\Omega t} \mathrm dt \\
&=\frac{1}{T}\int_{-\frac{\tau}{2}}^{\frac{\tau}{2}}\mathrm e^{-\mathrm in\Omega t} \mathrm dt \\
&=\dfrac{\tau}{T}\operatorname{Sa}\dfrac{n\Omega \tau}{2},
\end{aligned}
$$

于是

$$
f(t)=\sum_{n=-\infty}^{\infty}\dfrac{\tau}{T}\operatorname{Sa}\dfrac{n\Omega \tau}{2}\mathrm e^{\mathrm in\omega t} .
$$

#### 4.1.1.3 三角傅里叶级数与复指数傅里叶级数的关系

三角形式的傅里叶系数与指数形式的傅里叶系数是等价的，由

$$
\begin{aligned}
f_{T}(t)
&=\frac{a_{0}}{2}+\sum_{n=1}^{\infty}a_{n}\cos n\Omega t+b_{n}\sin n\Omega t \\
&=\frac{A_{0}}{2}+\sum_{n=1}^{\infty}A_{n}\cos (n\Omega t+\varphi_{n}) \\
&= \sum_{n=-\infty}^{\infty}F_{n}\mathrm e^{\mathrm in\Omega t},
\end{aligned}
$$

知

$$
\begin{cases}
a_{0}=A_{0} \\
a_{n}=A_{n}\cos\varphi_{n} \\
b_{n}=-A_{n}\sin\varphi_{n} \\
F_{n}=\dfrac{1}{2}A_{n}\mathrm e^{\mathrm i\varphi_{n} } 
\end{cases}
\quad
\begin{cases}
A_{0}=a_{0} \\
A_{n}=\sqrt{ a_{n}^{2}+b_{n}^{2} } \\
F_{n}=\dfrac{1}{2}(a_{n}-\mathrm ib_{n}) \\
\varphi_{n}=-\arctan \dfrac{b_{n}}{a_{n}}.
\end{cases}
$$

值得注意的是，上述 $a_{n},b_{n},A_{n},\varphi_{n},F_{n}$ 均是关于 $n\Omega$（或 $n$）的函数，其中 $F_{n}$ 是复函数，且 $\operatorname{Re}F_{n},\ a_{n},\ |F_{n}|,\ A_{n}$ 是 **偶函数**，$\operatorname{Im}F_{n},\ b_{n},\ \varphi_{n}$ 是 **奇函数**．

任何（满足狄里赫利条件的）周期函数都可以分解成 **直流分量** $\dfrac{A_{0}}{2}$ 和无穷多项 **谐波**（$n$ 次 **谐波** $A_{n}\cos (n\Omega t+\varphi_{n})$，特别地，一次谐波 $A_{1}\cos (\Omega t+\varphi_{1})$ 也称作 **基波**）分量之和的形式．

### 4.1.2 函数的对称性

**整个周期对称** 决定傅里叶展开式中是否含有正弦分量或余弦分量，具体地，

- **偶函数**（关于纵轴对称）——**偶分量**，含有 **直流项和余弦项**，不含正弦项；

- **奇函数**（关于原点对称）——**奇分量**，含有 **正弦项**，不含直流项和余弦项；

- **非奇非偶函数**——偶分量与奇分量之和，且其中的直流项和余弦项由偶分量决定，正弦项由由奇分量决定；

**半个周期对称** 决定傅里叶展开式中是否含有偶次谐波或奇次谐波，具体地，

- **半波对称**（偶谐）函数（沿时间轴平移半个周期后与原波形 **完全重合**）——含有 **偶次谐波**，不含奇次谐波；

- **半波镜像对称**（奇谐）函数（沿时间轴平移半个周期后与原波形 **关于横轴对称**）——含有 **奇次谐波**，不含偶次谐波．

当波形满足某种对称关系时，在傅里叶级数中某些项将不出现，利用这些特性可简化傅里叶系数的计算．

### 4.1.3 周期函数的频谱

傅里叶系数都是离散频率 $n\Omega$ 的函数，反映了组成周期函数的不同频率分量的幅度、相位随频率变化的特性．

**频谱图**（频谱特性曲线）把组成周期函数的不同频率分量（即各次谐波）的幅度和相位随频率变化的特性直观地用图形描述．频谱完全由傅里叶系数决定．函数分解为三角形式傅里叶级数时用单边频谱（$x \geqslant 0$）表示，函数分解为指数形式傅里叶级数时用双边频谱（$x\in\mathbb{Z}$）表示．

- **横坐标** 频率 $ω=n\Omega$（或 $f$）
- **幅度谱纵坐标** 各谐波的振幅 $A_{n}$（或 $|F_{n}|$）
	- **谱线** 每条竖线代表该频率分量的幅度
	- **包络线** 连接各谱线顶点的曲线
- **相位谱纵坐标** 各谐波的相位 $\varphi_{n}$

周期函数频谱的特点是 **离散**、**谐波**（各分量所含频率均为周期函数角频率 $\Omega$ 的整数倍，即 $n\Omega$）、**收敛**（谐波幅度随 $n$ 的增大而减小，当 $n\to+\infty$ 时，$A_{n},F_{n}\to 0$）．

特别地在周期矩形函数中，定义 **有效频带宽度（带宽）** $\boxed{B_{\omega}=\frac{2\pi}{\tau}}$，单位是 rad/s，$\boxed{B_{f}=\frac{1}{\tau}}$，单位是 Hz (s⁻¹)．

带宽与周期 $T$ 无关，只与脉冲持续时间（脉冲宽度）$\tau$ 成反比．$\tau$ 越窄，函数的带宽越宽，$F_{n}$ 幅度减小．而周期 $T$ 影响谱线间隔，$T$ 变大时 $\Omega$ 变小，谱线间隔变密，$F_{n}$ 幅度减小．

### 4.1.4 周期函数的功率谱

我们在第一章中提及，周期函数一般是功率函数，并给出了一般功率函数的功率计算公式，现在就周期函数进一步推导．

周期函数 $f(t)$ 的平均功率为

$$
\begin{aligned}
P
&=\frac{1}{T} 
\int_{-\frac{T}{2}}^{\frac{T}{2}} 
|f(t)|^{2}
\mathrm dt \\
&=\frac{1}{T} 
\int_{-\frac{T}{2}}^{\frac{T}{2}} 
f(t)\cdot f^{*}(t)
\mathrm dt \\
&=\frac{1}{T} 
\int_{-\frac{T}{2}}^{\frac{T}{2}} 
\sum_{n=-\infty}^{\infty}
F_{n}\mathrm e^{\mathrm in\Omega t}
\sum_{m=-\infty}^{\infty}
F_{m}\mathrm e^{\mathrm im\Omega t}
\mathrm dt \\
&=\frac{1}{T} 
\int_{-\frac{T}{2}}^{\frac{T}{2}} 
\sum_{n=-\infty}^{\infty}
|F_{n}|^{2}
\mathrm dt \\
&=\sum_{n=-\infty}^{\infty}
|F_{n}|^{2},
\end{aligned}
$$

于是

$$
\boxed{P=\frac{1}{T} \int_{-\frac{T}{2}}^{\frac{T}{2}} |f(t)|^{2}\mathrm dt 
=\sum_{n=-\infty}^{\infty}|F_{n}|^{2}}
$$

这就是功率函数的 **帕斯瓦尔 (Parseval) 恒等式**．特别注意这里的 $f(t),F_{n}$ 都是复函数，不能写为 $f^{2}(t)$ 或 $F^{2}_{n}$．

此式表明，周期函数在时域中的功率等于频域中各谐波分量功率之和，即周期函数在时域和在频域的功率是守恒的．

例如，有效带宽内的功率占总功率的百分比为

$$
\dfrac{P_{\text{带内}}}{P_{\text{总}}}
=\frac{
\sum_{-B_{\omega}}^{B_{\omega}}|F_{n}|^{2}}{\frac{1}{T} \int_{-T/2}^{T/2} |f(t)|^{2}\mathrm dt}.
$$

## 4.2 连续时间非周期函数的频谱

### 4.2.1 从傅里叶级数到傅里叶变换

回忆复指数傅里叶级数展开：

$$
\begin{aligned}
&f_{T}(t)=\sum_{n=-\infty}^{\infty}F_{n}\mathrm e^{\mathrm in\Omega t}, \\
&F_{n}=\frac{1}{T}\int_{t_{0}}^{t_{0}+T}f(t)\mathrm e^{-\mathrm in\Omega t} \mathrm dt .
\end{aligned}
$$

式中 $\Omega=\dfrac{2\pi}{T}$ 表示周期函数 $f_{T}(t)$ 的角频率．

在上式中令 $T\to +\infty$，周期函数变成了非周期函数，由于 $\Omega\to 0$，离散谱变成连续谱，离散频率 $n\Omega$ 变为连续频率 $\omega$，有 $f(t)$ 的 **频谱密度函数**（简称频谱函数）

$$
\begin{aligned}
F(\omega)
&=\lim_{ T \to +\infty } F_{n}T \\
&=\lim_{ T \to +\infty } \int_{t_{0}}^{t_{0}+T}f(t)\mathrm e^{-\mathrm in\Omega t} \mathrm dt \\
&=\int_{-\infty}^{+\infty}f(t)\mathrm e^{-\mathrm i \omega t} \mathrm dt,
\end{aligned}
$$

这就是 **傅里叶正变换**，记作 $\mathscr{F}[*](\omega)$．

相应地，$\mathscr{F}[f(t)](\omega)$ 的 **原函数**

$$
\begin{aligned}
f(t)
&=\frac{1}{T}\sum_{n=-\infty}^{\infty}F_{n}T\mathrm e^{\mathrm in\Omega t} \\
&=\frac{1}{2\pi}\int_{-\infty}^{+\infty}\mathscr{F}[f(t)](\omega)\mathrm e^{\mathrm i \omega t} \mathrm d\omega ,
\end{aligned}
$$

这就是 **傅里叶反变换**，记作 $\mathscr{F}^{-1}[*](t)$．

$$
\boxed{\begin{cases}
\mathscr{F}[f(t)](\omega)
=\displaystyle\int_{-\infty}^{+\infty}f(t)\mathrm e^{-\mathrm i \omega t} \mathrm dt \\
\mathscr{F}^{-1}[\mathscr{F}[f(t)](\omega)](t)
=\displaystyle\frac{1}{2\pi}\int_{-\infty}^{+\infty}\mathscr{F}[f(t)](\omega)\mathrm e^{\mathrm i \omega t} \mathrm d\omega
\end{cases}}
$$

值得注意的是，$f(t)$ 的傅里叶变换存在的充分条件是 $f(t)$ **绝对可积**，即

$$
\int_{-\infty}^{+\infty}|f(t)|\mathrm dt<+\infty .
$$

### 4.2.2 非周期函数的频谱

函数（信号）有两种描述方法，即时域描述和频域描述．时域是函数在时间轴随时间变化的总体概括，而频域是将函数做傅里叶变换得到的复频域的表达式，所画出的波形就是频谱图．

非周期函数的频谱密度函数即傅里叶变换．傅里叶变换建立了时域与频域间的关系，是有明确的物理意义的。

$$
\begin{array}{ccc}
\text{时域} &\longleftrightarrow& \text{频域}  \\ \hline
\text{周期信号} &\longleftrightarrow& \text{离散谱}  \\
\text{离散信号} &\longleftrightarrow& \text{周期性} \\
\text{连续信号} &\longleftrightarrow& \text{非周期} \\
\text{非周期信号} &\longleftrightarrow&  \text{连续谱}
\end{array}
$$

非周期函数也看作由无穷多个不同频率的正弦分量组成，只不过其基波频率趋近无穷小量，它包含了从零到无穷大的所有频率分量，因此幅度谱和相位谱都是连续谱，形状与所对应的周期函数离散频谱包络相似．

**矩形脉冲**（门函数）$f(t)=g_{\tau}(t)$ 的傅里叶变换

$$
\begin{aligned}
\mathscr{F}[g_{\tau}(t)](\omega)
&=\int_{-\frac{\tau}{2}}^{\frac{\tau}{2}}
\mathrm e^{-\mathrm i \omega t}
\mathrm dt \\
&=\dfrac{1}{-\omega}
\mathrm e^{-\mathrm i \omega t}
\bigg|_{-\frac{\tau}{2}}^{\frac{\tau}{2}} \\
&=\dfrac{1}{\omega}
\sin\dfrac{\omega \tau}{2} \\
&=\tau \operatorname{Sa}\dfrac{\omega \tau}{2}.
\end{aligned}
$$

矩形脉冲函数在时域中持续的时间有限，是为时限函数，但在频域中其频谱延续到无限．矩形函数在时域中持续的时间越短，函数的带宽越宽．

**单边指数函数** $f(t)=\mathrm e^{-\alpha t}\varepsilon(t)$ 的傅里叶变换

$$
\begin{aligned}
\mathscr{F}[ \mathrm e^{-\alpha t}\varepsilon(t) ](\omega)
&=\int_{0}^{+\infty}
\mathrm e^{-\alpha t}\mathrm e^{-\mathrm i \omega t}
\mathrm dt \\
&=\dfrac{1}{-\alpha-\omega}
\mathrm e^{-(\alpha+\mathrm i \omega) t}
\bigg|_{0}^{+\infty} \\
&=\dfrac{1}{\alpha+\mathrm i \omega}.
\end{aligned}
$$

**偶双边指数函数** $f(t)=\mathrm e^{-\alpha |t|}$ 的傅里叶变换

$$
\begin{aligned}
\mathscr{F}[\mathrm e^{-\alpha |t|}](\omega)
&=\int_{0}^{+\infty}
\mathrm e^{-\alpha t}\mathrm e^{-\mathrm i \omega t}
\mathrm dt
+\int_{-\infty}^{0}
\mathrm e^{\alpha t}\mathrm e^{-\mathrm i \omega t}
\mathrm dt \\
&=\dfrac{1}{-\alpha-\mathrm i \omega}
\mathrm e^{-(\alpha+\mathrm i \omega) t}
\bigg|_{0}^{+\infty}
+\dfrac{1}{\alpha-\mathrm i \omega}
\mathrm e^{(\alpha-\omega) t}
\bigg|_{-\infty}^{0} \\
&=\dfrac{1}{\alpha+\mathrm i \omega}
+\dfrac{1}{\alpha-\mathrm i \omega} \\
&=\dfrac{2\alpha}{\alpha^{2}+\omega^{2}}.
\end{aligned}
$$

**奇双边指数函数** $f(t)=\frac{|t|}{t}\mathrm e^{-\alpha |t|}$ 的傅里叶变换

$$
\begin{aligned}
\mathscr{F}\Big[\frac{|t|}{t}\mathrm e^{-\alpha |t|}\Big](\omega)
&=\int_{0}^{+\infty}
\mathrm e^{-\alpha t}\mathrm e^{-\mathrm i \omega t}
\mathrm dt
+\int_{-\infty}^{0}
-\mathrm e^{\alpha t}\mathrm e^{-\mathrm i \omega t}
\mathrm dt \\
&=\dfrac{1}{-\alpha-\mathrm i \omega}
\mathrm e^{-(\alpha+\mathrm i \omega) t}
\bigg|_{0}^{+\infty}
-\dfrac{1}{\alpha-\mathrm i \omega}
\mathrm e^{(\alpha-\mathrm i \omega) t}
\bigg|_{-\infty}^{0} \\
&=\dfrac{1}{\alpha+\mathrm i \omega}
-\dfrac{1}{\alpha-\mathrm i \omega} \\
&=\dfrac{-2\omega}{\alpha^{2}+\omega^{2}}
\end{aligned}
$$

**冲激函数** $f(t)=\delta(t)$ 的傅里叶变换为

$$
\mathscr{F}[\delta(t)](\omega)
=\int_{-\infty}^{+\infty}
\delta(t)\mathrm e^{-\mathrm i \omega t}
\mathrm dt
=1,
$$

冲激函数频谱密度在 $-\infty<\omega<+\infty$ 间处处相等，常称其为均匀谱或白色谱．

**冲激偶函数** $f(t)=\delta'(t)$ 的傅里叶变换为

$$
\begin{aligned}
\mathscr{F}[\delta'(t)](\omega)
&=\int_{-\infty}^{+\infty}
\delta'(t)\mathrm e^{-\mathrm i \omega t}
\mathrm dt \\
&=\int_{-\infty}^{+\infty}
\delta'(t)
-\delta(t)(-\omega)
\mathrm dt \\
&=\omega.
\end{aligned}
$$

**单位直流函数** $f(t)=1$ 的傅里叶变换为

$$
\mathscr{F}[1](\omega)
=\int_{-\infty}^{+\infty}
\mathrm e^{-\mathrm i \omega t}
\mathrm dt
=+\infty,
$$

这是错误的，因为单位直流函数 $f(t)=1$ 不是绝对可积的，不能用定义式求其频谱，但注意到，如果在傅里叶反变换中取 $\mathscr{F}[f(t)](\omega)=\delta(\omega)$，有

$$
f(t)
=\frac{1}{2\pi}
\int_{-\infty}^{+\infty}
\delta(\omega)\mathrm e^{\mathrm i \omega t} 
\mathrm d\omega
=\frac{1}{2\pi},
$$

因此，

$$
\mathscr{F}[1](\omega)
= 2\pi\delta(\omega).
$$

**符号函数** $\operatorname{sgn}(t)=\frac{|t|}{t}$ 的傅里叶变换亦不能直接求得，我们借助奇双边指数函数 $f(t)=\frac{|t|}{t}\mathrm e^{-\alpha |t|}$ 的傅里叶变换，取 $\alpha\to 0$，得

$$
\mathscr{F}[\operatorname{sgn}(t)](\omega)
=\lim_{ \alpha \to 0 }
\dfrac{-2\omega}{\alpha^{2}+\omega^{2}}
=\dfrac{-2\mathrm i}{\omega}
=\dfrac{2}{\mathrm i \omega}.
$$


### 4.2.3 傅里叶变换的性质

本节研究在某一域中对函数进行某种运算时在另一域中所引起的效应，即傅里叶变换的 13 个性质，这些性质大多可以由定义直接推得．

#### 一、线性性

$$
\boxed{
\mathscr{F}[\alpha_{1}f_{1}(t)+\alpha_{2}f_{2}(t)](\omega)
= \alpha_{1}\mathscr{F}[f_{1}(t)](\omega)
+ \alpha_{2}\mathscr{F}[f_{2}(t)](\omega)
}
$$

利用这个性质可求得 **阶跃函数** $\varepsilon(t)$ 的频谱

$$
\begin{aligned}
\mathscr{F}[\varepsilon(t)](\omega)
&= \mathscr{F}\Big[ \frac{1}{2}+\frac{1}{2}\operatorname{sgn}(t)\Big](\omega) \\
&= \frac{1}{2}\mathscr{F}[1](\omega)
+ \frac{1}{2}\mathscr{F}[\operatorname{sgn}(t)](\omega) \\
&= \pi\delta(\omega)+\dfrac{1}{\mathrm i \omega} .
\end{aligned}
$$

阶跃函数的频谱也可以在时域范围内由单边指数函数 $f(t)=\mathrm e^{-\alpha t}\varepsilon(t)$ 取 $\alpha\to 0$ 得到，

$$
\mathscr{F}[\varepsilon(t)](\omega)
= \lim_{ \alpha \to 0 }\dfrac{1}{\alpha+\mathrm i \omega} 
= \dfrac{1}{\mathrm i \omega}, 
$$

这与上面的结果是相悖的，少了个冲激函数，这是为什么呢？复极限与实极限不同，我们分离实虚部再看：

$$
\mathscr{F}[\varepsilon(t)](\omega)
= \lim_{ \alpha \to 0 }\dfrac{\alpha}{\alpha^{2}+\omega^{2}} 
+ \mathrm i\lim_{ \alpha \to 0 }\dfrac{-\omega}{\alpha^{2}+\omega^{2}} ,
$$

对于虚部，

$$
\dfrac{-\omega}{\alpha^{2}+\omega^{2}}\to -\dfrac{1}{\omega}
\quad (\alpha\to 0),
$$

对于实部，

$$
\dfrac{\alpha}{\alpha^{2}+\omega^{2}}\to 0
\quad (\alpha\to 0),
$$

这就出现问题了，当函数趋于 $0$ 时，得到的不是 $0$，而应当是冲激函数 $S\delta(\omega)$，系数是这个函数与 $x$ 围成的面积

$$
\begin{aligned}
S
&=\int_{-\infty}^{+\infty}
\dfrac{\alpha}{\alpha^{2}+\omega^{2}}
\mathrm d\omega  \\
&=\int_{-\infty}^{+\infty}
\dfrac{1}{1+x^{2}}
\mathrm dx
\quad\Big(x=\frac{\omega}{\alpha}\Big) \\
&=\big[\arctan x\big]_{-\infty}^{+\infty} \\
&= \pi,
\end{aligned}
$$

于是

$$
\lim_{ \alpha \to 0 }\dfrac{\alpha}{\alpha^{2}+\omega^{2}} =\pi\delta(\omega),
$$

得到

$$
\mathscr{F}[\varepsilon(t)](\omega)
= \lim_{ \alpha \to 0 }\dfrac{1}{\alpha+\mathrm i \omega} 
= \pi\delta(\omega)+\dfrac{1}{\mathrm i \omega}, 
$$

这样的结果就正确了。

#### 二、奇偶性

$$
\boxed{
\begin{aligned}
& \mathscr{F}[f^{*}(t)](\omega)
= \mathscr{F}[f(t)]^{*}(-\omega) \\
& \mathscr{F}[f(-t)](\omega)
= \mathscr{F}[f(t)](-\omega) \\
& \mathscr{F}[f^{*}(-t)](\omega)
= \mathscr{F}[f(t)]^{*}(\omega)
\end{aligned}}
$$

特别地，当 $f(t)$ 为 **实偶函数** 时，

$$
\begin{array}{ccccc}
f(t)
&=& f^{*}(t)
&=& f(-t) \\
\mathscr{F}[f(t)](\omega)
&=& \mathscr{F}[f(t)]^{*}(-\omega)
&=& \mathscr{F}[f(t)](-\omega) \\
\end{array}
$$

故 $\mathscr{F}[f(t)](\omega)$ 是 $\omega$ 的 **实偶函数**，如矩阵脉冲函数（门函数）和偶双边指数函数；

当 $f(t)$ 为 **实奇函数** 时，

$$
\begin{array}{ccccc}
f(t)
&=& f^{*}(t)
&=& -f(-t) \\
\mathscr{F}[f(t)](\omega)
&=& \mathscr{F}[f(t)]^{*}(-\omega)
&=& -\mathscr{F}[f(t)](-\omega)  \\
\end{array}
$$

故 $\mathscr{F}[f(t)](\omega)$ 是 $\omega$ 的 **虚奇函数**，如符号函数和奇双边指数函数．

#### 三、对称性 / 互易性

$$
\boxed{\mathscr{F}[F(t)]=2\pi f(-\omega)}
$$

**证明** 在傅里叶反变换

$$
f(t)
=\frac{1}{2\pi}
\int_{-\infty}^{+\infty}
\mathscr{F}[f(t)](\omega)
\cdot \mathrm e^{\mathrm i \omega t}
\mathrm d\omega
$$

中作变量代换 $t:=-\omega,\ \omega:=t$，则

$$
f(-\omega)
= \frac{1}{2\pi}
\int_{-\infty}^{+\infty}
\mathscr{F}[f(t)](t) 
\cdot \mathrm e^{-\mathrm i \omega t}
\mathrm dt,
$$

根据定义，

$$
\begin{aligned}
\mathscr{F}[F(t)]
&=\int_{-\infty}^{+\infty}F(t)\mathrm e^{-\mathrm i \omega t} \mathrm dt \\
&=2\pi f(-\omega).
\end{aligned}
$$

**例 1** 求单位直流函数 $f(t)=1$ 的频谱．

**解** 由于 $\mathscr{F}[\delta(t)]=1$，依互易性有

$$
\mathscr{F}[F(1)]=2\pi \delta(-\omega)=2\pi \delta(\omega).
$$

这就解释了在 4.3.2 节「注意到」的原因．

**例 2** 求 $\operatorname{Sa}$ 函数的频谱．

**解** 在 $\mathscr{F}[g_{\tau}(t)]= \tau \operatorname{Sa}\dfrac{\omega \tau}{2}$ 中取 $\tau=2$，即 $\mathscr{F}[g_{2}(t)]= 2\operatorname{Sa}\omega$，依互易性有

$$
\mathscr{F}[\operatorname{Sa} t]
=2\pi \frac{1}{2}g_{2}(-\omega)
=\pi g_{2}(\omega).
$$

将这个结果代回傅里叶变换的定义式

$$
\mathscr{F}[f(t)](\omega)
=\int_{-\infty}^{+\infty}
\operatorname{Sa}t
\cdot\mathrm e^{-\mathrm i \omega t} 
\mathrm dt
=\pi g_{2}(\omega),
$$

因此

$$
F(\mathrm i 0)
=\int_{-\infty}^{+\infty}
\operatorname{Sa}t
\mathrm dt
=\pi g_{2}(0)
=\pi.
$$

我们利用傅里叶变换解决了高等数学中难以计算的积分问题．

#### 四、坐标变换（时移、频移、尺变）

$$
\boxed{
\begin{aligned}
&\mathscr{F}[f(t-t_{0})]
=\mathscr{F}[f(t)](\omega)\cdot\mathrm e^{-\mathrm i \omega t_{0} } \\
&\mathscr{F}[f(\alpha t)]= 
\dfrac{1}{|\alpha |}F\Big(\mathrm i\dfrac{\omega}{\alpha}\Big) \\
&\mathscr{F}[f(t)\cdot\mathrm e^{\mathrm i \omega_{0}t}]
=F[\mathrm i(\omega-\omega_{0})] \\
\end{aligned}}
$$

对于时域平移性，由于 $\mathscr{F}[1]=2\pi\delta(\omega)$，因此

$$
\begin{aligned}
&\mathscr{F}[\mathrm e^{\mathrm i \omega_{0}t}]
=2\pi\delta(\omega-\omega_{0}), \\
&\mathscr{F}[\mathrm e^{-\mathrm i \omega_{0}t}]
=2\pi\delta(\omega+\omega_{0}).
\end{aligned}
$$

进一步推得三角函数的频谱

$$
\boxed{
\begin{aligned}
&\mathscr{F}[\cos\omega_{0}t]
=\pi[\delta(\omega+\omega_{0})+\delta(\omega-\omega_{0})] \\
&\mathscr{F}[\sin\omega_{0}t]
=\mathrm i \pi[\delta(\omega+\omega_{0})-\delta(\omega-\omega_{0})]
\end{aligned}
}
$$

对于尺度变换/时域缩放性，当 $\alpha>1$ 时，时域压缩，频域扩展并幅度变小；当 $\alpha<1$ 时，时域扩展，频域压缩并幅度变大．

对于频域平移/频谱搬移性，在通信系统如调幅、同步解调、混频等过程中应用广泛，如求矩形调幅函数 $y(t)=g_{\tau}(t)\cos\omega_{0}t$ 的频谱．

**例** 求 $f(t)=3\mathrm e^{-(3+2\mathrm i)t}\varepsilon(t+1)$ 的频谱．

$$
\begin{aligned}
&\mathscr{F}[\mathrm e^{-3t}\varepsilon(t)]
=\dfrac{1}{3+\mathrm i \omega}, \\
\Longrightarrow&\mathscr{F}[\mathrm e^{-3(t+1)}\varepsilon(t+1)]
=\dfrac{\mathrm e^{\mathrm i \omega }}{3+\mathrm i \omega}, \\
\Longrightarrow&\mathscr{F}[3\mathrm e^{(3-\mathrm i2)t}\mathrm e^{-3(t+1)}\varepsilon(t+1)]
=\dfrac{3\mathrm e^{3+\mathrm i(\omega+2) }}{3+\mathrm i(\omega+2)}. \\
\end{aligned}
$$

#### 五、时域频域的卷积、微积分定理

**时域卷积性质**

$$
\boxed{
\mathscr{F}[f_{1}(t)*f_{2}(t)]
=F_{1}(\omega)\cdot F_{2}(\omega) 
}
$$

**频域卷积性质**

$$
\boxed{
\mathscr{F}[f_{1}(t)\cdot f_{2}(t)]
=\dfrac{1}{2\pi}F_{1}(\omega)* F_{2}(\omega)
}
$$

利用卷积的微积分性质不难推得 **时域微积分性质**

$$
\boxed{
\begin{aligned}
&\mathscr{F}\Big[\dfrac{\mathrm d^{n}}{\mathrm dt^{n}}f(t)\Big]
=(\omega)^{n}\mathscr{F}[f(t)](\omega) \\
&\mathscr{F}\Big[ \int_{-\infty}^{t}f(t)\mathrm dt \Big]
=\dfrac{1}{\omega}\mathscr{F}[f(t)](\omega)+\pi F(0)\delta(\omega) \\
\end{aligned}}
$$

结合互易性得到 **频域微积分性质**

$$
\begin{aligned}
&\mathscr{F}\big[(-\mathrm it)^{n}f(t)\big]
=\dfrac{\mathrm d^{n}}{\mathrm d\omega^{n}}\mathscr{F}[f(t)](\omega) \\
&\mathscr{F}\Big[\dfrac{1}{-\mathrm it}f(t)+\pi f(0)\delta(t)\Big]
=\int_{-\infty}^{\omega}\mathscr{F}[f(t)](\omega)\mathrm d\omega  \\
\end{aligned}
$$

**例** 求宽度为 $\tau$，幅度为 $1$ 的 **三角脉冲函数** 的频谱。

两个宽度分别为 $\tau_{1} \geqslant \tau_{2}$ 的矩阵脉冲函数 $g_{\tau_{1}}(t),g_{\tau_{2}}(t)$ 相卷的结果是一个梯形函数，其下底宽 $2(\tau_{1}+\tau_{2})$，上底宽 $2(\tau_{1}-\tau_{2})$，高为 $2\tau_{2}$。如果取 $\tau_{1}=\tau_{2}=\tau$，也就是等宽矩阵脉冲函数相卷，就得到一个三角脉冲函数，它的宽度为 $2\tau$，幅度为 $\tau$。

因此题给三角脉冲函数可以写为两个矩阵脉冲函数 $\sqrt{ \frac{2}{\tau} } g_{\frac{\tau}{2}} (t)$ 之卷，

$$
f(t)
= \sqrt{ \frac{2}{\tau} } g_{\frac{\tau}{2}} (t)
* \sqrt{ \frac{2}{\tau} } g_{\frac{\tau}{2}} (t),
$$

于是

$$
\mathscr{F}[f(t)](\omega)
= \bigg[\sqrt{ \frac{2}{\tau} } \frac{\tau}{2} \operatorname{Sa} \dfrac{\omega\tau}{4}\bigg]^{2}
= \frac{\tau}{2} \operatorname{Sa}^{2} \dfrac{\omega\tau}{4}.
$$

也可以先对题给三角脉冲函数求导，

$$
f'(t)
= \frac{2}{\tau} g_{\frac{\tau}{2}} \big(t+\frac{\tau}{4}\big)
- \frac{2}{\tau} g_{\frac{\tau}{2}} \big(t-\frac{\tau}{4}\big),
$$

由于

$$
\mathscr{F}[f'(t)]
= \operatorname{Sa} \frac{\omega\tau}{4}\mathrm e^{\mathrm i \omega\frac{\tau}{4}} 
- \operatorname{Sa} \frac{\omega\tau}{4}\mathrm e^{-\mathrm i \omega\frac{\tau}{4}} 
= 2\mathrm i \operatorname{Sa} \frac{\omega\tau}{4} \sin\frac{\omega\tau}{4},
$$

故

$$
\mathscr{F}[f(t)]
= \dfrac{1}{\omega}\mathscr{F}[f'(t)]+\pi \mathscr{F}[f'(0)]\delta(\omega)
= \frac{\tau}{2} \operatorname{Sa}^{2} \frac{\omega\tau}{4}.
$$

### 4.2.4 非周期函数的能量谱

非周期函数 $f(t)$ 的能量为

$$
\boxed{
E=\int_{-\infty}^{+\infty} f^{2}(t)\mathrm dt 
=\frac{1}{2\pi}\int_{-\infty}^{+\infty}|\mathscr{F}[f(t)](\omega)|^{2}\mathrm d\omega}
$$

这就是能量函数的 **帕斯瓦尔 (Parseval) 恒等式**．此式表明，非周期函数的能量可以在时域中计算，也可以在频域中计算，这两者是可以相互转换的．

下表展示了典型函数的频谱（傅里叶变换）：

$$
\begin{array}{ll}
\mathscr{F}[f(t)]
& \mathscr{F}[f(t)](\omega) \\\hline
\mathscr{F}[g_{\tau}(t)]
& \tau \operatorname{Sa}\dfrac{\omega \tau}{2} \\
\mathscr{F}[\mathrm e^{-\alpha t}\varepsilon(t)]
& \dfrac{1}{\alpha+\mathrm i \omega} \\
\mathscr{F}[\mathrm e^{-\alpha |t|}]
& \dfrac{2\alpha}{\alpha^{2}+\omega^{2}} \\
\mathscr{F}[\frac{|t|}{t}\mathrm e^{-\alpha |t|}]
& \dfrac{-2\mathrm i \omega}{\alpha^{2}+\omega^{2}} \\
\mathscr{F}[\delta(t)]
& 1 \\
\mathscr{F}[1]
& 2\pi\delta(\omega) \\
\mathscr{F}[\operatorname{sgn}(t)]
& \dfrac{2}{\mathrm i \omega} \\
\mathscr{F}[\varepsilon(t)]
& \pi\delta(\omega)+\dfrac{1}{\mathrm i \omega} \\
\end{array}
$$















<br><br>

*[返回目录](../notes/)*

2024-09-13：[［和師姐一起學數學］信号与系统 第一章 信号与系统的基本概念](../posts/3d4d4abc.html)
2024-10-16：[［和師姐一起學數學］信号与系统 第二章 连续时间系统的时域分析](../posts/cb7b11a.html)
2024-10-21：[［和師姐一起學數學］信号与系统 第三章 离散时间系统的时域分析](../posts/f70b9775.html)
2024-10-22：［和師姐一起學數學］信号与系统 第四章 连续时间信号与系统的频域分析（上）（本篇）
2024-11-17：[［和師姐一起學數學］信号与系统 第四章 连续时间信号与系统的频域分析（下）](../posts/2e479d4c.html)
2024-11-18：[［和師姐一起學數學］信号与系统 第五章 连续时间信号与系统的复频域分析](../posts/80f29746.html)