---
title: ［和師姐一起學數學］信号与系统 第四章 连续时间信号与系统的频域分析（下）
tags:
  - 筆記
  - 數學
  - 信號與系統
categories:
  - posts_daxuenotes
  - notes_信號與系統_Signals&Systems
description: 信號與系統 第四章 連續時間信號與系統的頻域分析（下）
cover: /img/posts/notes/notes-signalsandsystems.webp
top_img: /img/posts/notes/notes-signalsandsystems.webp
aside: true
abbrlink: 2e479d4c
date: 2024-11-07 20:09:29
updated: 2024-11-07 20:09:29
---
*[返回目录](../notes/)*


# 第四章 连续时间信号与系统的频域分析

## 4.3 周期信号的傅里叶变换

回忆，周期信号对应于傅里叶级数（离散谱），非周期信号对应于傅里叶变换（连续谱）。我们把周期信号与非周期信号的分析方法统一起来，使傅里叶变换得到更广泛的应用。

对周期信号 $f_{T}(t)$ 做傅里叶级数展开，即

$$
f_{T}(t)=
\sum_{n=-\infty}^{\infty}
F_{n}\mathrm e^{\mathrm in\Omega t},
$$

式中 $\Omega=\dfrac{2\pi}{T}$ 表示周期信号 $f_{T}(t)$ 的角频率．再做傅里叶变换，得到

$$
\begin{aligned}
\mathscr{F}[f_{T}(t)]
&=\mathscr{F}\bigg[
\sum_{n=-\infty}^{\infty}
F_{n}
\mathrm e^{\mathrm in\Omega t}
\bigg] \\
&=\sum_{n=-\infty}^{\infty}
F_{n}
\mathscr{F}\big[
\mathrm e^{\mathrm in\Omega t}
\big] \\
&=2\pi\sum_{n=-\infty}^{\infty}
F_{n}
\delta(\omega-n\Omega). \\
\end{aligned}
$$

例如 **周期冲激信号的傅里叶变换**

$$
\begin{aligned}
\mathscr{F}[\delta_{T}(t)]
&= 2\pi\sum_{n=-\infty}^{\infty}
\frac{1}{T}
\delta(\omega-n\Omega) \\
&= \Omega\sum_{n=-\infty}^{\infty}
\delta(\omega-n\Omega) \\
&\overset{\Delta}{=}
\Omega\delta_{\Omega}(\omega).
\end{aligned}
$$

将周期信号表示为

$$
\boxed{
f_{T}(t)=f_{0}(t)*\delta_{T}(t)
}
$$

并结合时域卷积性质，周期信号的傅里叶变换

$$
\begin{aligned}
\mathscr{F}[f_{T}(t)]
&= \mathscr{F}
[f_{0}(t)*\delta_{T}(t)] \\
&= \mathscr{F}
[f_{0}(t)]
\cdot\mathscr{F}
[\delta_{T}(t)] \\
&= F_{0}(\mathrm i\omega)
\cdot\Omega\sum_{n=-\infty}^{\infty}
\delta(\omega-n\Omega) \\
&= \Omega\sum_{n=-\infty}^{\infty}
F_{0}(\mathrm in\Omega)
\delta(\omega-n\Omega).
\end{aligned}
$$

这就得到了计算周期信号的傅里叶变换的两种方法：

$$
\boxed{
\begin{aligned}
\mathscr{F}[f_{T}(t)]
&= 2\pi\sum_{n=-\infty}^{\infty}
F_{n}
\delta(\omega-n\Omega) \\
&= \Omega\sum_{n=-\infty}^{\infty}
F_{0}(\mathrm in\Omega)
\delta(\omega-n\Omega)
\end{aligned}
}
$$

两式对比，有 $F_{0}(\mathrm i\omega)$ 与 $F_{n}$ 的关系

$$
\boxed{
F_{n}
=\frac{1}{T} F_{0}(\mathrm in\Omega)
=\frac{1}{T} F_{0}(\mathrm i\omega)
\Bigg|_{\omega=n \Omega}
}
$$


## 4.4 抽样与抽样（取样/采样）定理

采样定理是连续信号转换为数字信号的理论基础。

模-数 (Analog / Digital) 转换：对模拟信号进行采样，得到离散的样值信号，然后对样值进行量化、编码。


### 4.4.1 信号的时域采样(取样)

均匀取样：抽样间隔 $T_{s}$ 相同，是为取样周期，$\omega_{s}$ 为取样角频率。

设 $s(t)$ 为采样脉冲(周期脉冲)，则采样信号

$$
f_{s}(t) = f(t) * s(t)
$$


当s(t)为周期矩形脉冲时称为矩形脉冲采样

当s(t)为周期冲激信号时称为理想采样

### 4.4.2 采样信号的频谱

讨论 $\mathscr{F}[f_{s}(t)]$ 与 $\mathscr{F}[f(t)]$ 的关系。

## 4.5 LTI 系统的频域分析

时域分析法和频域分析法是以不同的观点对 LTI 系统进行分析。

我们在第二章中提及，将激励信号 $e(t)$ 分解为无穷多个冲激信号之和，借助系统的冲激响应、线性、时不变性质求解系统对任意信号激励下的零状态响应 $y_{\mathrm{zs}}(t)$，有

$$
y_{\mathrm{zs}}(t)=e(t)*h(t),
$$

这是在时域上分析的，将上式两边做傅里叶变换，得到

$$
Y_{\mathrm{zs}}(\mathrm i\omega)
= E(\mathrm i\omega) H(\mathrm i\omega),
$$

这是在频域上分析的。

式中 $H(\mathrm i\omega)$ 表示 **频率响应函数**，定义为

$$
H(\mathrm i\omega)
= \dfrac{Y_{\mathrm{zs}}(\mathrm i\omega)}{E(\mathrm i\omega)}
= |H(\mathrm i\omega)| \mathrm e^{\mathrm i\varphi(\omega)},
$$

这反映了系统的频域特性，用于研究系统的零状态响应。

**例 1** 兹有连续系统的微分方程为 $y''(t)+4 y'(t)+3 y(t)=e'(t)-e(t)$，求该系统的单位冲激响应。

**解** 在方程两边做傅里叶变换，

$$
(\mathrm i\omega)^2 Y(\mathrm i\omega)
+ 4 \mathrm i\omega Y(\mathrm i\omega)
+ 3 Y(\mathrm i\omega) 
= \mathrm i\omega E(\mathrm i\omega)
- E(\mathrm i\omega),
$$

整理，该系统的频率响应

$$
H(\mathrm i\omega)
= \frac{Y(\mathrm i\omega)}{E(\mathrm i\omega)}
= \frac{\mathrm i\omega-1}{(\mathrm i\omega)^2+4 \mathrm i\omega+3}
= \frac{2}{\mathrm i\omega+3}
- \frac{1}{\mathrm i\omega+1},
$$

做傅里叶反变换，得到该系统的单位冲激响应

$$
h(t) = (2 e^{-3t}-e^{-t}) \varepsilon(t).
$$

**例 2** 求系统对虚指数信号 $e(t) = \mathrm e^{\mathrm i\omega_{0}}$ 的零状态响应。

**解** 根据卷积的定义式，

$$
\begin{aligned}
y_{\mathrm{zs}}(t)
&= \mathrm e^{\mathrm i\omega_{0}t} * h(t) \\
&= \int_{-\infty}^{+\infty}
h(\tau) \mathrm e^{\mathrm i\omega_{0} (t-\tau)} \mathrm d\tau \\
&= \mathrm e^{\mathrm i\omega_{0}t}
\int_{-\infty}^{+\infty}
h(\tau) \mathrm e^{- \mathrm i\omega_{0} \tau} \mathrm d\tau \\
&= H(\mathrm i\omega_{0})
\mathrm e^{\mathrm i\omega_{0}t} \\
&= |H(\mathrm i\omega_{0})|
\mathrm e^{\mathrm i [\omega_{0}t + \varphi(\omega_{0})]}.
\end{aligned}
$$

系统的零状态响应仍为同频率的虚指数信号，其幅度和相位由系统函数 $H(\mathrm i\omega_{0})$ 确定。

**例 3** 求系统对正弦信号 $e(t) = \cos\omega_{0}t$ 的零状态响应。

**解** 








<br><br>

*[返回目录](../notes/)*

2024-09-13：[［和師姐一起學數學］信号与系统 第一章 信号与系统的基本概念](../posts/3d4d4abc.html)
2024-10-16：[［和師姐一起學數學］信号与系统 第二章 连续时间系统的时域分析](../posts/cb7b11a.html)
2024-10-21：[［和師姐一起學數學］信号与系统 第三章 离散时间系统的时域分析](../posts/f70b9775.html)
2024-10-22：[［和師姐一起學數學］信号与系统 第四章 连续时间信号与系统的频域分析（上）](../posts/962dcafc.html)
2024-11-17：［和師姐一起學數學］信号与系统 第四章 连续时间信号与系统的频域分析（下）（本篇）
2024-11-18：[［和師姐一起學數學］信号与系统 第五章 连续时间信号与系统的复频域分析](../posts/80f29746.html)