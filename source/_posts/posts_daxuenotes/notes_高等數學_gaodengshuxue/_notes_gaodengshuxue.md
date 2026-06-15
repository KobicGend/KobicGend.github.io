---
title: 基于历年中国传媒大学高等数学期中考试试卷的复习笔记——第九章 多元函数微分学［简中］
tags:
  - 筆記
  - 數學
  - 高等數學
categories:
  - - 筆記
    - 大學筆記
description: 高等数学复习笔记。
aside: true
cover: /img/posts/notes/notes-gaoshu.webp
top_img: /img/posts/notes/notes-gaoshu.webp
abbrlink: 8fc65cfa
date: 2024-04-15 22:16:25
updated: 2024-04-16 21:33:58
---


$$
\Huge 高 \ 数 \ 期 \ 中 = 套 \ 公 \ 式 \\\\
$$

$$
\qquad\qquad\qquad\qquad\qquad——基于历年中国传媒大学高等数学期中考试试卷的复习笔记
$$


# Part2 微积分

## §2.4 平面点集、多元函数、二元函数的极限和连续性

### §2.4.1 平面点集

#### 一、平面点集 *E*

平面上的点 $P$ 可以用一有序实数对 $(x,y)$ 唯一表示。

**两点 $P_1(x_1,y_1),\ P_2(x_2,y_2)$ 间的距离** $d(P_1,P_2)=\sqrt{(x_1-x_2)^2+(y_1-y_2)^2}$，满足正定性和三角不等式。

平面上满足某条件 $T$ 的点的集合称为平面点集，记作 $E=\lbrace P\mid P \text{ satisfies } T\rbrace$，如

- 全平面 ${\mathbb{R}^2} = \big\lbrace {( {x,y} ) \mid - \infty < x < + \infty , - \infty < y < + \infty } \big\rbrace$；
- 圆 $C = \big\lbrace(x,y) \mid (x-a)^2 + (x-b)^2 < r^2\big\rbrace$；
- 矩形 $S = \big\lbrace (x,y) \mid a \leqslant x \leqslant b,c \leqslant y \leqslant d \big\rbrace = [a,b] \times [c,d]$。

平面点列 $\lbrace P_n\rbrace$ 是特殊的平面点集。



#### 二、邻域

- 一维去心邻域 $\overset{\circ}{U} ( x_0,\delta ) = \lbrace x \mid 0 <  \left|{x - {x_0}}  \right| < \delta \rbrace$。

- **圆邻域** $U(P,\delta) = \lbrace x \mid (x-x_0)^2 + (y-y_0)^2 < \delta \rbrace$；

  去心圆邻域 $\overset{\circ}{U}(P,\delta) = \lbrace x \mid (x-x_0)^2 + (y-y_0)^2 < \delta ,(x,y) \ne (x_0,y_0) \rbrace$；

- ***方邻域** $U(P,\delta) = \lbrace x \mid \left|x-x_0\right| < \delta , \left|y-y_0\right| < \delta \rbrace$，*

  *去心方邻域 $\overset{\circ}{U}(P,\delta) = \lbrace x\mid \left|x-x_0\right| < \delta , \left|y-y_0\right| < \delta ,(x,y) \ne (x_0,y_0) \rbrace$*，

  *因任一圆邻域都可以包含于某一方邻域，反之亦然，所以圆邻域与方邻域一般不加区分，或曰 **方邻域与圆邻域等价**。*



#### 三、点与点集的关系

1. 按点 $P$ 在 $E$ 的内外分：
   - **内点** $\exists \delta > 0, \text{ s.t. } U(P,\delta) \subset E$；
   - **外点** $\exists \delta > 0, \text{ s.t. } U(P,\delta) \cap E = \varnothing$；
   - **边界点** $\forall \delta > 0, U(P,\delta) \cap E \ne \varnothing \land U(P,\delta) \subset E^c$（$P$ 点的任意邻域内既有属于 $E$ 的点，也有不属于 $E$ 的点），*其中 $E^c = \mathbb{R}^2 \text{\\}  E$ 为 **余集***，全体边界点的全体构成 $E$ 的 **边界** $\partial E$。
  
2. 按点 $P$ 的近旁是否聚集 $E$ 的无穷多个点分：
    - **聚点** $\forall \delta > 0,\ U(P,\delta) \subset E$，或 $\forall\delta>0,\ N(P_0,\delta)\cap E$ 是一个无穷集，或存在互异的点列 $\lbrace P_n\rbrace \subset E$ 使 $P_n\to P_0,\ n\to\infty$；
    - ***孤立点** $\forall \delta > 0, U(P,\delta) \cap E = \varnothing$*；
    
    *孤立点—界点，内点—聚点，非孤立的界点—聚点；
    既不是聚点又不是孤立点的点—外点；
    边界点—孤立点或聚点，可以属于 $E$（闭集），也可以不属于 $E$（开集）；
    聚点可以属于 $E$，也可以不属于 $E$；*

#### 四、点集

1. **开集** 每一点都是内点，即无边界点；
   **闭集** 所有聚点都属于 $E$（可包括孤立点），**或** 只有孤立点；
   不开也不闭的点集；
   *既开又闭的点集（$\varnothing$ 和 $\mathbb{R}^2$）。*

2. 区域 *在各教材中的定义不同，同济高数中的定义特指开区域*；
   **开区域** 连通（若 $E$ 中任意两点都可以用完全属于 $E$ 的有限条直线段连接起来）的开集；
   **闭区域** 开区域和所有边界；
   *半开半闭区域 开区域和部分边界*。

3. 有界集
   - $\exists U(O,\delta) \supseteq E$
   - *$\exists D = [a,b]\times[c,d] \supseteq E$*
   - *$E$ 的 **直径** $d(E) = \underset{P_1,P_2 \in E}{\operatorname{sup}} \rho(P_1,P_2)$ 为有限值*；
   无界集 $\forall U(O,\delta) \not\supset E$。



### §2.4.2 二元函数的极限（二重极限）

设 $f$ 为定义在 $D\subset\mathbb{R}^2$ 上的二元函数，$P_0$ 为 $D$ 的一个聚点，$A$ 是一个确定的实数，若 $\forall\varepsilon>0, \exists\delta>0$, such that $\forall p\in N_\circ(P_0,\delta)\cap D ,\ 有\ |f(P)-A|<\varepsilon$，则称 $A$ 为 $f$ 在 $D$ 上当 $P\to P_0$ 时的极限，记作 $\lim_{P\to P_0}f(P)=A$ 或 $\lim_{x\to x_0\\y\to y_0}f(x,y)=A$ 或 $\lim_{(x,y)\to(x_0,y_0)}f(x,y)$。等价描述：

$$
\forall\varepsilon>0,\ \exists\delta>0,\ \forall|x-x_0|<\delta,\ |y-y_0|<\delta \land (x,y)\neq(x_0,y_0),\ 有\ |f(x,y)-A|<\varepsilon
$$


若 $\lim\limits_{(x,y)\to(x_0,y_0)}f(x,y)=A$，则对于定义域内任意一条趋向于点 $(x_0,y_0)$ 的路径 $c$，都有
$$
\lim_{\begin{array}{}(x,y)\to(x_0,y_0)\\(x,y)\in c\end{array}}f(x,y)=A
$$
因此，如果能找到两条不同的路径，极限不相同，则表明 $\lim\limits_{(x,y)\to(x_0,y_0)}f(x,y)$ 不存在。

> **例** 函数 $f(x,y)=\begin{cases}\dfrac{xy}{x^2+y^2}, & x^2+y^2\ne0 \\ 0, & x^2+y^2 = 0 \end{cases}$ 当 $(x,y)\to(0,0)$ 时的极限。
> **解** 置 $P(x,y)$ 沿 $y=kx(k\ne0)$ 趋于 $(0,0)$，得极限值为 $\dfrac{k}{k^2+1}$，其随 $k$ 的变化而变化，因此极限不存在。
>
> (2022) 极限 $L=\lim\limits_{(x,y)\to(0,0)}\dfrac{xy}{x+y}$ 不存在。
>
> **思路** 取一些数引出矛盾就能证明。构造题要大胆尝试，如取 $y=x$ 和 $y=x^2-x$。



### §2.4.3 二元函数的连续性

关于连续性、间断点等的定义不再赘述，如在 $(x_0,y_0)$ 连续即 $\lim\limits_{(x,y)\to(x_0,y_0)}f(x,y)=f(x_0,y_0)$，亦满足曾学的性质，如无穷大无穷小、初等函数连续性等。

一元连续函数看成二元函数时仍是连续的。

> 求 $L=\displaystyle\lim\limits_{(x,y)\to(0,2)}\frac{\sin(xy)}{x}$。
>
> **解**
> $$
> \begin{aligned}
> L
> &= \lim\limits_{(x,y)\to(0,2)}\frac{\sin(xy)}{xy}y \\
> &= \lim\limits_{(x,y)\to(0,2)}\frac{\sin(xy)}{xy} \lim\limits_{(x,y)\to(0,2)}y \\
> &= \lim\limits_{xy\to0}\frac{\sin(xy)}{xy} \lim\limits_{y\to2}y \\
> &= 1\times2=2
> \end{aligned}
> $$
>



## §2.5 多元函数的微分

### §2.5.1 可微性

#### 一、全微分

设二元函数 $z=f(x,y)$ 在点 $P_0$ 的某邻域 $U(P_0)$ 内有定义，对于 $U(P_0)$ 中的点 $P(x,y)=(x+\Delta x, y+\Delta y)$，在点 $P_0$ 处的

 - **全增量** $\Delta z = f(x_0+\Delta x, y_0+\Delta y)-f(x_0,y_0)$，
 - **全微分** $\left.\mathrm dz\right|_{x=x_0,y=y_0}=A\Delta x+ B\Delta y$，若 $\exists A,B$，s.t. $\Delta z= A\Delta x + B\Delta y + o(\rho)$。

#### 二、偏导数

若二元函数在 $P_0$ 处可微，令 $\Delta y \equiv 0$，在点 $P_0$ 处关于 $x$ 的

 - **偏增量** $\Delta_x z = A\Delta x + \alpha\Delta x$，
 - **偏微分** $A\Delta x$。

将多元函数的微分问题变成熟悉的一元函数微分。

邻域内有定义、极限存在时，在点 $(x_0,y_0)$ 关于 $x$ 的

 - **偏导数**：$\displaystyle\left.\frac{\partial f}{\partial x} \right|_{(x_0,y_0)}=\displaystyle\lim_{\Delta x\to 0}\frac{\Delta_xf(x_0,y_0)}{\Delta x}=\displaystyle\lim_{\Delta x\to 0}\frac{f(x_0+\Delta x, y_0)-f(x_0,y_0)}{\Delta x}$。
   
   > 根据一元函数微分和导数的关系，将偏增量 $\Delta_x z = A\Delta x + \alpha\Delta x$ 中 $\Delta x$ 除到等式的右边 $\frac{\Delta_xz}{\Delta x}=A + \alpha$，当 $\Delta x\to 0$ 时，得到偏导数 $\lim_{\Delta x\to 0}\frac{\Delta_x z}{\Delta x} = \lim_{\Delta x\to 0}(A+\alpha) = A$。




> (2022) 设 $f(x,y)=\begin{cases}\dfrac{\sin x^2y}{xy}, & xy\ne0 \\ 0, & xy=0\end{cases}$，求 $f_x(0,1)$。
>
> **思路** 即求 $\lim\limits_{\Delta x\to 0}\dfrac{f(0+\Delta x, 1)-f(0,1)}{\Delta x}$，代入即 $\lim\limits_{\Delta x\to 0}\dfrac{\sin (\Delta x)^2}{(\Delta x)^2}=1$。

#### 三、可微的条件

**可微的必要条件** 若二元函数 $f$ 在其定义域内一点 $(x,y)$ 可微，则在该点关于每个自变量的偏导数都存在，且全微分
$$
\mathrm df = \frac{\partial{f}}{\partial x}\mathrm dx+\frac{\partial{f}}{\partial y}\mathrm dy
$$
**可微的充分条件** 若函数 $z=f(x,y)$ 的偏导数在点 $(x_0,y_0)$ 的某邻域上存在，且 $f_x$ 与 $f_y$ 在点 $(x_0,y_0)$ 连续，则函数在点 $(x_0,y_0)$ 可微。

- 各个偏导数连续 $\to$ 可微 $\to$ 连续、偏导数存在；
- 偏导数存在 $\not\to$ 连续、可微（与一元不同）；
- 可微 $\not\to$ 各个偏导数连续；
- 连续 $\not\to$ 偏导数存在，可微。



> **例 1**(2019) 按定义证明 $z=\begin{cases}\displaystyle\frac{xy}{x^2+y^2}, & x^2+y^2\ne0 \\ 0, & x^2+y^2 = 0 \end{cases}$ 当 $(x,y)\to(0,0)$ 时偏导数存在，但不连续。
>
> **证明** (1) 由
> $$
> \left.\frac{\partial f}{\partial x} \right|_{(0,0)}
> =\lim_{\Delta x\to 0}\frac{f(0+\Delta x, 0)-f(0,0)}{\Delta x} 
> =\lim_{\Delta x\to 0}\frac{0-0}{\Delta x} =0
> $$
> 知关于 $x$ 的偏导数存在，同理关于 $y$ 的亦存在。
>
> (2) 置 $P(x,y)$ 沿 $y=kx(k\ne0)$ 趋于 $(0,0)$，得
> $$
> \lim_{(x,y)\to(0,0)}z=\lim_{x\to 0}\frac{x\cdot kx}{(x)^2\cdot(kx)^2}=\frac{k}{k^2+1}
> $$
> 其随 $k$ 的变化而变化，因此当 $(x,y)\to(0,0)$ 时的极限不存在，故不连续。

> **例 2** 按定义证明 $z=\begin{cases}\displaystyle\frac{xy}{\sqrt{x^2+y^2}}, & x^2+y^2\ne0 \\ 0, & x^2+y^2 = 0 \end{cases}$ 当 $(x,y)\to(0,0)$ 时偏导数存在，但不可微。
>
> **证明** (1) 易知偏导数存在，且 $f_x(0,0)=f_y(0,0)=0$。
>
> (2) 用反证法证明不可微，假设有 $\Delta z= A\Delta x + B\Delta y + o(\rho)$，其中 $A=f_x(0,0)=0,B=f_y(0,0)=0$，即 $\Delta z=o(\rho)$，有 
> $$
> \lim\limits_{\rho\to0}\frac{\Delta z}{\rho}=0,
> $$
> 而当点 $(\Delta x,\Delta y)$ 沿直线 $y=x$ 趋于点 $(0,0)$ 时，$\Delta x = \Delta y$，此时
> $$
> \begin{aligned}
> \lim\limits_{\rho\to0}\frac{\Delta z}{\rho} 
> &=\lim_{(\Delta x,\Delta y)\to(0,0)}\frac{f(0+\Delta x, 0+\Delta y)-f(0,0)}{\sqrt{(\Delta x)^2+(\Delta y)^2}} \\
> &=\lim_{(\Delta x,\Delta y)\to(0,0)}\frac{\Delta x\Delta y}{(\Delta x)^2+(\Delta y)^2} \\
> &=\lim_{\Delta x\to0}\frac{(\Delta x)^2}{2(\Delta x)^2} 
> = \frac{1}{2}.
> \end{aligned}
> $$
> 产生了矛盾，故不可微。

> **例 3** 按定义证明 $z=\begin{cases}(x^2+y^2)\sin\frac{1}{x^2+y^2}, & x^2+y^2\ne0 \\ 0, & x^2+y^2 = 0 \end{cases}$ 当 $(x,y)\to(0,0)$ 时可微，但偏导数不连续。
>
> **证明** 略。

> **例 4** 按定义证明 $z=\sqrt{|xy|}$ 在 $(0,0)$ 处不可微。
>
> **证明** 易知 $f_x(0,0)=f_y(0,0)=0$。
> $$
> \begin{aligned}
> \lim_{\rho\to0}\frac{\Delta z - A\Delta x + B\Delta y}{\rho}
> &= \lim_{\rho\to0}\frac{(\sqrt{|\Delta x\Delta y|}-0)-0\Delta x-0\Delta y}{\rho} \\
> &= \lim_{\rho\to0}\frac{\sqrt{|\rho\sin\theta\cdot\rho\cos\theta|}}{\rho} \\
> &= \lim_{\rho\to0}\sqrt{|\sin\theta\cos\theta|}
> \end{aligned}
> $$
> 不存在，故不可微。









### §2.5.2 偏导函数与求偏导法则

#### 一、偏导函数

求偏导数，把其他自变量看作常数，化为一元函数的求导问题。



#### 二、复合函数的偏导数

若函数 $u = \varphi(x, y), \ v = \psi(x, y)$ 在点 $(x, y)$ 可微，$z = f(u, v)$ 在点 $(u, v)$ 可微，则复合函数 $z = f(\varphi(x, y), \psi(x, y))$ 在点 $(x, y)$ 可微，且关于自变量 $x$ 与 $y$ 的偏导数

$$
\begin{aligned}
\frac{ \partial z }{\partial x} = \frac{ \partial z }{\partial u}\frac{ \partial u }{\partial x} + \frac{ \partial z }{\partial v}\frac{ \partial v }{\partial x} \\
\frac{ \partial z }{\partial y} = \frac{ \partial z }{\partial u}\frac{ \partial u }{\partial y} + \frac{ \partial z }{\partial v}\frac{ \partial v }{\partial y}
\end{aligned}
$$

一般地，若 $f(u_1,\cdots,u_m)$ 在点 $(u_1,\cdots,u_m)$ 可微，$u_k = g_k(x_1,\cdots,x_n)\ (k=1,2,\cdots,m)$ 在点 $(x_1,\cdots,x_n)$ 具有关于 $x_i\ (i=1,2,\cdots,n)$ 的偏导数，则复合函数 $f(g_1(x_1,\cdots,x_n),g_2(x_1,\cdots,x_n),\cdots,g_m(x_1,\cdots,x_n))$ 关于自变量 $x_i$ 的偏导数

$$
\frac{\partial f}{\partial x_i}=\sum^n_{k=1}\frac{\partial f}{\partial u_k}\frac{\partial u_k}{\partial x_i}\ (i=1,2,\cdots,n)
$$



#### 三、复合函数的全微分

若以 $x$ 和 $y$ 为自变量的函数 $z=f(x,y)$ 可微，则
$$
\mathrm dz = \frac{\partial z}{\partial x}\mathrm dx + \frac{\partial z}{\partial y}\mathrm dy
$$

若函数 $x=\varphi(s,t),\ y=\psi(s,t)$ 在点 $(s,t)$ 可微，则

$$
\begin{aligned}
\mathrm{d}z
&=\frac{\partial z}{\partial s} \mathrm{~d} s+\frac{\partial z}{\partial t} \mathrm{~d} t \\ 
&=\left(\frac{\partial z}{\partial x} \frac{\partial x}{\partial s}+\frac{\partial z}{\partial y} \frac{\partial y}{\partial s}\right) \mathrm{d} s
+\left(\frac{\partial z}{\partial x} \frac{\partial x}{\partial t}+\frac{\partial z}{\partial y} \frac{\partial y}{\partial t}\right) \mathrm{d} t 
\\ 
&=\frac{\partial z}{\partial x}
\left(\frac{\partial x}{\partial s} \mathrm{d} s+\frac{\partial x}{\partial t} \mathrm{~d} t\right)
+\frac{\partial z}{\partial y}
\left(\frac{\partial y}{\partial s} \mathrm{d} s+\frac{\partial y}{\partial t} \mathrm{d} t\right)
\\
&=\frac{\partial z}{\partial x}\mathrm{d} x
+\frac{\partial z}{\partial y}\mathrm{d} y
\end{aligned}
$$

是为 **全微分形式不变性**。

> (2011) 设 $y=2x, f(x,y)=x^2+3x, f_x(x,y)=6x+1$，求 $f_y(x,y)$。
>
> **解** 对 $f(x,y)=x^2+3x$ 等式两边求全微分，即 $f_x(x,y)+\dfrac{\mathrm dy}{\mathrm dx}f_y(x,y)=2x+3$，代入即得。

#### 四、高阶偏导

$$
\begin{aligned} \frac{\partial}{\partial x}\left(\frac{\partial z}{\partial x}\right)
&=\frac{\partial^{2} z}{\partial x^{2}}=f_{x x}(x, y) \\
\frac{\partial}{\partial y}\left(\frac{\partial z}{\partial x}\right)
&=\frac{\partial^{2} z}{\partial x \partial y}=f_{x y}(x, y) \\
\frac{\partial}{\partial x}\left(\frac{\partial z}{\partial y}\right)
&=\frac{\partial^{2} z}{\partial y \partial x}=f_{yx}(x, y) \\
\frac{\partial}{\partial y}\left(\frac{\partial z}{\partial y}\right)
&=\frac{\partial^{2} z}{\partial y^{2}}=f_{y y}(x, y) \end{aligned}
$$

混合偏导与求导顺序无关，即
$$
f_{xy}(x,y) = f_{yx}(x,y)
$$

> (2022) 设 $z=f(xe^y,x,y)$，且 $f$ 具有二阶连续的偏导数，求  $\dfrac{\partial z^2}{\partial x\partial y}$。
>
> **析** 熟悉记号 $f_{1}',f_{12}''$ 等的含义，并注意 $\dfrac{\partial}{\partial x}f_1'$ 与 $\dfrac{\partial z}{\partial x}$ 的关系。
>
> **解**
> $$
> \begin{aligned}
> {\color{violet}{\frac{\partial z}{\partial x}}}
> &= f_{1}'\frac{\partial}{\partial x}xe^y
> + f_{2}'\frac{\partial}{\partial x}x
> + f_{3}'\frac{\partial}{\partial x}y \\
> &= {\color{violet}{e^yf_{1}' + f_{2}'}}
> \\
> \frac{\partial z}{\partial y}
> &= f_{1}'\frac{\partial}{\partial y}xe^y
> + f_{2}'\frac{\partial}{\partial y}x
> + f_{3}'\frac{\partial}{\partial y}y \\
> &= xe^yf_{1}' + f_{3}'
> \\
> \frac{\partial z^2}{\partial x\partial y}
> &= \frac{\partial}{\partial x}\left(xe^yf_{1}' + f_{3}'\right) \\
> &= xe^y{\color{violet}{\frac{\partial}{\partial x}f_{1}'}}
> + e^yf_{1}'
> + \frac{\partial}{\partial x}f_{3}' \\
> &= xe^y\left({\color{violet}{e^yf_{11}'' + f_{21}''}}\right)
> + e^yf_{1}'
> + \left(e^yf_{13}'' + f_{23}''\right) \\
> &= xe^{2y}f_{11}' + xe^yf_{21}''
> + e^yf_{1}'
> + e^yf_{13}'' + f_{23}'' \\
> \end{aligned}
> $$





#### 五、隐函数求导法则

设方程 $F(x,y)=0$，若隐函数 $y=f(x)$ 存在且可导，有
$$
\boxed{\dfrac{\mathrm dy}{\mathrm dx} = -\dfrac{F_x}{F_y}}
$$
推广到多个变元有类似的式子；推广到方程组即：

对于 $F(x,y,u,v)=0,G(x,y,u,v)=0$​，有
$$
\begin{cases}
F_x + F_u\dfrac{\partial u}{\partial x} + F_v\dfrac{\partial v}{\partial x}=0\\\\
G_y + G_u\dfrac{\partial u}{\partial x} + G_v\dfrac{\partial v}{\partial x}=0
\end{cases}
$$
在 $J=\begin{vmatrix}F_u & F_v \\ G_u & G_v\end{vmatrix}\ne0$​ 的条件下，解出
$$
\begin{cases}
\dfrac{\partial u}{\partial x}
= -\dfrac{1}{J}\dfrac{\partial(F,G)}{\partial(x,v)}
= -\dfrac{1}{J}\begin{vmatrix}F_x & F_v \\ G_x & G_v\end{vmatrix}\\\\
\dfrac{\partial v}{\partial x}
= -\dfrac{1}{J}\dfrac{\partial(F,G)}{\partial(u,x)}
= -\dfrac{1}{J}\begin{vmatrix}F_u & F_x \\ G_u & G_x\end{vmatrix}
\end{cases}
$$

> (2022) 设 $z=z(x,y)$ 由 $F\big(x+\dfrac{z}{y},y+\dfrac{z}{x}\big)=0$ 所确定，证明 $x\dfrac{\partial z}{\partial x}+y\dfrac{\partial z}{\partial y}=z-xy$。
>
> **思路** 命 $G(x,y,z)=F\big(x+\dfrac{z}{y},y+\dfrac{z}{x}\big)$，以 $F_1',F_2'$ 表示 $G_x,G_y,G_z$，代入即可。



### §2.5.3 多元函数的微分的几何意义

#### 一、多元函数的微分的几何意义 [^1]

> 在解析几何中，一元函数的微分是函数在曲线上某点处的切线方程，$A$ 表示切线的斜率，二元函数的全微分是切平面方程，$A,B$ 是函数在 $P_0$ 处的偏导数。
>
> 在可微曲面 $f(x,y)$ 的任意点 $(x,y,f)$ 上作切平面，则在足够小的邻域内，切平面上的点 $(x+\mathrm dx,y+\mathrm dy,z+\mathrm df)$ 是曲面上点的近似。
>
> 对于一元函数 $f(x)$ 上的任意一点 $(x,f(x))$ 的法向量为 $(f'(x),-1)$。推广到二元函数，对于二元函数 $f(x,y)$ 上的任意一点 $(x,y,f(x,y))$ 的法向量，它在 $ZOX$ 面的投影为 $(\frac{\partial{f}}{\partial x},-1)$，在 $ZOY$ 面的投影为 $(\frac{\partial{f}}{\partial y},-1)$，可知在三维函数空间中的法向量 $\bs{N} = (\frac{\partial{f}}{\partial x},\frac{\partial{f}}{\partial y},-1)$。
>
> 又由于法向量与切向量 $\bs{T}=(\mathrm dx,\mathrm dy,\mathrm df)$ 垂直，有
>
> $$
> \bs{N}\cdot\bs{T}=\frac{\partial{f}}{\partial x}\mathrm dx + \frac{\partial{f}}{\partial y}\mathrm dy + (-1)\mathrm df=0
> $$
> 即全微分公式。
>
> 将 $\mathrm dx,\mathrm dy,\mathrm df$ 展开，
> $$
> \frac{\partial{f}}{\partial x}(x-x_0) + \frac{\partial{f}}{\partial y}(y-y_0) - (z-z_0) = 0
> $$
> 即切平面的点法式方程。
>
> 再回看书上的这段话：
>
> > 二元函数 $f(x,y)$ 可以看成是三维空间中的曲面，令 $y = y_0$ 是得到一个一元函数 $f(x,y_0)$，这个一元函数可以看成曲面与 $y=y_0$ 平面的相交曲线。那么 $f_x(x_0,y_0)$ 的几何意义就是相交曲线在 $x = x_0$ 处切线的斜率。

[^1]: 参考 https://zhuanlan.zhihu.com/p/90858099





#### 二、空间曲线的切线和法平面

**思路** 化参数式，求方向向量。

**方法** 设曲线 $\begin{cases}x=\varphi (t)\\ y=\psi (t)\\ z=\omega (t)\end{cases}$，当 $t=t_0$ 时，点 $P$ 的

- 坐标 $P\big(\varphi(t_0),\phi(t_0),\omega(t_0)\big)$；
- 方向向量 $\bs{T} = \big(\varphi'(t_0),\phi'(t_0),\omega'(t_0)\big)$；
- 切线方程 $\dfrac{x-x_0}{\varphi'(t_0)}=\dfrac{y-y_0}{\psi'(t_0)}=\dfrac{z-z_0}{\omega'(t_0)}$；
- 法平面 $\varphi'(t_0)(x-x_0)+\psi'(t_0)(y-y_0)+\omega'(t_0)(z-z_0)=0$。

对于 $\begin{cases}F(x,y,z)=0\\ G(x,y,z)=0\end{cases}$，设 $x$ 为参数，并依隐函数求导法则求出 $\begin{cases}x=x\\y=\varphi(x)\\z=\psi(x)\end{cases}$，化归为上述情形。

当然亦可套公式：某点 $P(x_0,y_0,z_0)$ 处的
 - 方向向量 $\bs{T}=\begin{vmatrix}\vec{i}&\vec{j}&\vec{k}\\F_x&F_y&F_z\\G_x&G_y&G_z\end{vmatrix}$；
 - 切线方程 $\dfrac{x-x_0}{\begin{vmatrix}F_y&F_z\\ G_y&G_z\end{vmatrix}}=\dfrac{y-y_0}{\begin{vmatrix}F_x&F_z\\ G_x&G_z\end{vmatrix}}=\dfrac{z-z_0}{\begin{vmatrix}F_x&F_y\\ G_x&G_y\end{vmatrix}}$；
 - 法平面 $\left | \begin{matrix}x-x_0&y-y_0&z-z_0\\ F_x&F_y&F_z\\ G_x&G_y&G_z\end{matrix}\right |=0$。


### §2.5.5 多元函数的极值与最值

#### 一、多元函数的无条件极值

**必要条件** $z=f(x,y)$ 在 $(x_0,y_0)$ 取得极值且偏导存在，则 $f_x(x_0,y_0)=f_y(x_0,y_0)=0$。

**几何意义** $z=f(x,y)$ 在 $(x_0,y_0)$ 取得极值且偏导存在，则在 $(x_0,y_0,f(x_0,y_0))$ 有水平切面，且 $\bs{N}=(f_x,f_y,-1)|_{P_0}=(0,0,-1)$，切平面方程 $z=f(x_0,y_0)$。

**方法** 为求 $f_x(x,y)=f_y(x,y)=0$，只需求驻点 $\nabla f=(f_x,f_y)=\bs{0}$。

**充分条件** $z=f(x,y)$ 在 $U(P_0)$ 具有一阶及二阶连续偏导，$f_x(x_0,y_0)=f_y(x_0,y_0)=0$。令 $f_{xx}(x_0,y_0)=A$，$f_{xy}(x_0,y_0)=B$，$f_{yy}(x_0,y_0)=C$，

- $AC-B^2\gt 0$，具有极值，其中 $A\gt 0$ 极小，$A\lt 0$ 极大
- $AC-B^2\lt 0$，无法取得极值
- $AC-B^2=0$，无法确定

#### 二、多元函数的无条件最值

类似一元，由极值点（驻点或偏导不存在）和边界点讨论最值。



#### 三、多元函数的有条件极值

求 L 驻点→条件极值点：$L(x,y,\lambda)=\underset{目标}{f(x,y)}+\lambda\underset{约束}{\varphi(x,y)}$



> 求旋转抛物面 $z=x^2+y^2$ 与平面 $x+y-2z=2$ 间的最短距离。
>
> **代数法** 设 $(x, y, z)$ 是旋转拋物面 $z=x^2+y^2$ 上一点，则它到平面 $x+y-2 z=2$ 的距离为 $d=\dfrac{|x+y-2 z-2|}{\sqrt{6}}$。考虑目标函数 $d^2=\dfrac{(x+y-2 z-2)^2}{6}$，作拉格朗日函数
> $$
> L(x, y, z)=\frac{(x+y-2 z-2)^2}{6}+\lambda\left(x^2+y^2-z\right)
> $$
>
> 分别令 $L_x=0,L_y=0,L_z=0$，结合条件 $z=x^2+y^2$，解这个四元方程组得 $(x,y,z)=\Big(\dfrac{1}{4},\dfrac{1}{4},\dfrac{1}{8}\Big)$。一方面，只有一个可能极值点；另一方面，从几何上知道，这个最短距离一定存在。所以点 $\Big(\dfrac{1}{4},\dfrac{1}{4},\dfrac{1}{8}\Big)$ 就是所求的最小值点，最短距离为
> $$
> d=\frac{\left|\frac{1}{4}+\frac{1}{4}-2 \cdot \frac{1}{8}-2\right|}{\sqrt{6}}=\frac{7}{24} \sqrt{6}
> $$
>
> **几何法** 设点 $\left(x_0, y_0, z_0\right)$ 为旋转抛物面 $z=x^2+y^2$ 上到平面 $x+y-2 z=2$ 距离最短的点，则旋转抛物面 $z=x^2+y^2$ 在点 $\left(x_0, y_0, z_0\right)$处的切平面必平行于平面 $x+y-2 z=2$。因此，$z=x^2+y^2$ 在点 $\left(x_0, y_0, z_0\right)$ 处的切平面的法向量 $\bs{n}_1=\left(2 x_0, 2 y_0,-1\right)$ 与 $(1,1,-2)$ 共线，解得 $x_0=\dfrac{1}{4}, y_0=\dfrac{1}{4}$，下同。







4 中值定理与泰勒公式
二元函数的种植定理与泰勒公式与一元函数的拉格朗日中值定理和泰勒公式相仿，对于多元的情况也有相同的定理，只是形式上更加复杂一点。

凸区域的定义：若区域 D 上任意两点的连线都含于 D ，则称 D 为凸区域。也即若 D 为凸区域，则对区域内任意两点 P_1(x_1,y_1),\ P_2(x_2,y_2) 和一切 \lambda\ (0\leqslant\lambda\leqslant1) ，恒有：

P(x_1+\lambda(x_2-x_1), y_1+\lambda(y_2-y_1))\in D




中值定理：设二元函数 f 满足如下条件：

在凸开域 D\subset R^2 上连续，
在 D 的所有内点都可微，
则对 D 内任意两点 P(a,b),\ Q(a+h,b+k)\in D ，存在某 \theta\ (0<\theta<1) ，使得：

f(a+h,b+k)-f(a,b)=f_x(a+\theta h,b+\theta k)h+f_y(a+\theta h,b+\theta k)k



泰勒定理：若函数 f 在点 P_0(x_0,y_0) 的某邻域 U(P_0) 上有直到 n+1 阶的连续偏导数，则对 U(P_0) 内任一点 (x_0+h,y_0+k) ，存在相应的 \theta \in (0,1) ，使得：

\begin{aligned} f\left(x_{0}+h, y_{0}+k\right)=& f\left(x_{0}, y_{0}\right)+\left(h \frac{\partial}{\partial x}+k \frac{\partial}{\partial y}\right) f\left(x_{0}, y_{0}\right) \\ &+\frac{1}{2 !}\left(h \frac{\partial}{\partial x}+k \frac{\partial}{\partial y}\right)^{2} f\left(x_{0}, y_{0}\right)+\cdots \\ &+\frac{1}{n !}\left(h \frac{\partial}{\partial x}+k \frac{\partial}{\partial y}\right)^{n} f\left(x_{0}, y_{0}\right) \\ &+\frac{1}{(n+1) !}\left(h \frac{\partial}{\partial x}+k \frac{\partial}{\partial y}\right)^{n+1} f\left(x_{0}+\theta h, y_{0}+\theta k\right) \end{aligned}

该式称为二元函数 f 在点 P_0 的 n 阶泰勒公式。

5 函数的极值
二元函数的极值定义：设函数 f 在点 P(x_0,y_0) 都某邻域内有定义，若对于任何点 P(x,y)\in U(P_0) 成立不等式：

f(P)\leqslant f(P_0),\ 或\ f(P)\ge f(P_0)

则称函数 f 在点 P_0 取得极大值（或极小值）， P_0 称为极大值点（或极小值点）。



极值必要条件：若函数 f 在点 P_0(x_0,y_0) 存在偏导数，且在 P_0 取得极值，则有：

f_x(x_0,y_0)=0,\ f_y(x_0,y_0)=0

P_0 称为函数的稳定点。该定理指出：极值点一定是稳定点，但稳定点不一定是极值点。



极值充分条件：设二次函数 f 在点 P_0(x_0,y_0) 的某邻域上具有二阶连续偏导，且 P_0 是稳定点，则当矩阵：

H_{f}\left(P_{0}\right)=\left(\begin{array}{ll} f_{x=}\left(P_{0}\right) & f_{x y}\left(P_{0}\right) \\ f_{y x}\left(P_{0}\right) & f_{y y}\left(P_{0}\right) \end{array}\right)

是正定矩阵时， f 在 P_0 取得极小值；当 H_f(P_0) 是负定矩阵时， f 在 P_0 取得极大值；当 H_f(P_0) 是不定矩阵时， f 在 P_0 不取极值。

H_{f}\left(P_{0}\right) 称为黑赛矩阵。




## §2.6 重积分

### §2.6.6　曲线积分 ds

$I$ 在 $D$ 内 **与路径无关**，则 $I \equiv 0$，即 $\dfrac{\partial Q}{\partial x}=\dfrac{\partial P}{\partial y}$ 在 $D$ 内恒成立。

特别地，

$$
\iint_{D}f(y) \mathrm dx\mathrm dy
= \oint_L xf(y) \mathrm dy
\quad(Q=x,P=0)
$$

置 $Q=\dfrac{x}{2},\ P=-\dfrac{y}{2}$，则 $D$ 的面积

$$
A
= \iint_{D} \mathrm dx\mathrm dy 
= \dfrac{1}{2}\oint_{L} x \mathrm dy-y \mathrm dx
$$

### §2.6.7　曲面积分 dS

在 $D$ 内 **与路径无关**，则 $\dfrac{\partial P}{\partial x}+\dfrac{\partial Q}{\partial y}+\dfrac{\partial R}{\partial z} = 0$ 在 $D$ 内恒成立。

# §5　级数

## §5.1　数项级数

### §5.1.1　级数的定义

兹有数列 $\lbrace u_n\rbrace$，定义
- **级数 (series)**：无穷项前缀和 $\sum\limits_{n=1}^{\infty}u_n=u_1+u_2+\cdots+u_n+\cdots$ 级数与数列是前缀和的关系，反过来，数列与级数是差分的关系。
- **通项**：每一项 $u_n$
- 第 $n$ 个 **部分和**：$S_n=\sum\limits_{k=1}^{\infty}u_k$
- 级数 $\sum\limits_{n=1}^{\infty}u_n$ **收敛 (converge)**：部分和序列 $\lbrace S_n\rbrace$ 收敛于 $S$，或者说算出来不是无穷大
- 收敛级数的 **和 (sum)**：$S=\sum\limits_{n=1}^{\infty}u_n$，类似极限，补充定义发散极数的和，也记作 $S=\sum\limits_{n=1}^{\infty}u_n =+\infty$（或 $-\infty$）
- 收敛级数的 **余和 (tail)**：$r_n=S-S_n=\sum\limits_{k=n+1}^{\infty}u_k$
- 级数 $\sum\limits_{n=1}^{\infty}u_n$ **发散 (diverge)**：部分和序列$\lbrace S_n\rbrace$ 发散


### §5.1.2　级数的性质

- 两收敛级数的线性组合收敛，和等于两级数和的线性组合。
- 在级数中添加或删除有限多项（但不改变原有的项的顺序）不会改变其敛散性。因此，级数的敛散性与有限多项无关，而是取决于后面的无穷多项，它是级数的一种整体的性质。
- 在收敛级数的项中任意添加括号（但不改变原有的项的顺序）所得级数仍收敛，并且和不变。逆命题不一定不成立。但如果每个内所有项均同号，那么原级数也收敛，且极限相等。
- 级数与其部分和数列具有相同的敛散性。
- **柯西收敛准则** 级数 $\sum\limits_{n=1}^{\infty}u_n$ 收敛的充要条件是：对任意的 $\varepsilon>0$ ，均存在 $N\in \mathbb{N}^{*}$，使得对任意 $n>m>N$，有 $|S_m-S_n|=\left|\sum\limits_{k=n+1}^{m}u_k\right|<\varepsilon$。
  推论：级数 $\sum\limits_{n=1}^{\infty}u_n$ 收敛，则 $\lim\limits_{n\to\infty} u_n=0$，反之不一定成立。

常见级数如

- **几何级数 (geometric series)** $\sum\limits_{n=1}^{\infty}q^{n-1}$：$q\neq1$ 时，$S_n=\dfrac{1-q^n}{1-q}$，所以这个级数在 $|q|<1$ 时收敛，收敛于 $\dfrac{q}{1-q}$，在 $|q| \geqslant 1$ 时发散。
- **调和级数 (harmonic series)** $\sum\limits_{n=1}^{\infty}\dfrac{1}{n}$：$\left| \sum \limits_{k=m+1}^{2m} \dfrac{1}{k} \right| \geqslant \left| \sum \limits_{k=m+1}^{2m} \dfrac{1}{2m} \right|=\dfrac{1}{2}$，因此取 $\varepsilon=\dfrac{1}{2}$，由柯西收敛准则知发散。此外，调和级数是刚刚好发散的。 


### §5.1.3　正项级数　

首先研究正项级数。

- **正项级数** $\forall n \geqslant 0,\ u_n \geqslant 0$

注意到正项级数的部分和序列是单调递增的，有

$$
\text{定理} \qquad \sum\limits_{n=1}^{\infty}u_{n} \text{ 收敛} \iff \lbrace S_{n} \rbrace \text{ 有界}
$$

基于这个定理，对于两个正项级数 $\sum\limits_{n=1}^{\infty}u_n,\ \sum\limits_{n=1}^{\infty}v_n$（分别简记为 $U,\ V$）有如下最基本的判别法：

$$
\begin{array}{cccc}
\text{判别法} & \text{条件} & \text{收敛} & \text{发散} \\
\hline
& \forall n>n_{0},\ u_n \leqslant  cv_n \\
\text{比较判别法}
& \lim\limits_{n\to\infty}\dfrac{u_n}{v_n } \in [0,+\infty) 
& U \Leftarrow V
& U \Rightarrow V \\
& \forall n>n_{0},\ \dfrac{u_{n+1}}{u_n}\leqslant\dfrac{v_{n+1}}{v_n}
\end{array}
$$

选取已知收敛性的 $v_{n}$，利用比较判别法即可得到 $u_{n}$ 的收敛性。特别地，

$$
\begin{array}{cccc}
\text{判别法} & \text{条件} & \text{收敛} & \text{发散} \\
\hline
\text{d'Alembert判别法}
& \rho=\lim\limits_{n\to \infty}\dfrac{u_{n+1}}{u_n}
& \rho<1
& \rho>1
\\
\text{柯西判别法}
& \rho=\lim\limits_{n\to \infty} \sqrt[n]{u_n}
& \rho<1
& \rho>1
\\
\text{极限判别法}
& \lim\limits_{n\to \infty} n^{\alpha}u_{n} \in (0,+\infty)
& \alpha>1
& \alpha=1
\\
\text{积分判别法}
\end{array}
$$


## 三 任意项级数

在上节中我们讨论了正项级数的敛散性问题，接下来的两节将转而研究通项可正可负的那些级数. 在本节中我们将对形如 \sum\limits_{n=z}^{\infty}a_nb_n 的级数给出两个判定收敛的方法，即阿贝尔判别法和狄利克雷判别法而它们的基础是以挪威数学家阿贝尔的名字命名的求和公式.

### 3.1 阿贝尔求和公式


再来看一下此处要说的Abel公式：

设 $(a_n)_{n\in\mathbb{Z}} 和 (b_n)_{n\in\mathbb{Z}}$ 是复数集 \mathbb{C} 的两个元素集，那么对任意的 $M\in \mathbb{Z}$ 以及 $N\in\mathbb{Z_{>0}}$ 有  

$\sum\limits_{i=m+1}^{m+n}a_ib_i=a_{m+n}B_{m+n}+\sum\limits_{k=m+1}^{m+n-1}(a_k-a_{k+1})B_k$ ，其中 $B_k=\sum\limits_{i=m+1}^kb_i$ .

其实就是把原文中从第一层爬楼梯变成从第 m+1 层开始爬楼梯

特别地，如果 $(a_n)_{n\in\mathbb{Z}} 是 \mathbb{R}$ 的一个单调的元素族而且 $\sup\limits_{n<k\leq m+n}|B_k|\leq\rho$ ,

那么有 $\left| \sum\limits_{m<i\leq m+n}a_ib_i\right|\leq \rho(|a_{m+1}|+2|a_{m+n}|)$

### 3.2 阿贝尔判别法

设数列 $\lbrace a_n\rbrace$  单调且有界，而且级数 $\sum\limits_{n=1}^{\infty}b_n$ 收敛，那么级数 $\sum\limits_{n=1}^{\infty}a_n b_n$ 收敛.

### 3.3 狄利克雷判别法

设数列 \lbrace a_n\rbrace  单调趋于 0 ，而且级数 \sum\limits_{n=1}^{\infty}b_n 的部分和有界，那么级数 $\sum\limits_{n=1}^{\infty}a_n b_n$ 收敛.

### 3.4 莱布尼茨判别法

**交错级数** 各项正负交错

**莱布尼茨判别法** 若数列 $\lbrace a_n\rbrace$  单调趋于 $0$，则级数 $\sum\limits_{n=1}^{\infty}(-1)^na_n$ 收敛。



## 四 绝对收敛与条件收敛


如果 $\sum\limits_{n=1}^{\infty}|u_n|$ 收敛，那么 $\sum\limits_{n=1}^{\infty}u_n$ 也收敛。

该结论的逆命题未必成立，即如果 $\sum\limits_{n=1}^{\infty}u_n$ 收敛，那么 $\sum\limits_{n=1}^{\infty}|u_n|$ 未必收敛，因此定义

- **绝对收敛** 收敛极数加上个绝对值（即 $\sum\limits_{n=1}^{\infty}|u_n|$）也收敛
- **条件收敛** 收敛极数加上个绝对值（即 $\sum\limits_{n=1}^{\infty}|u_n|$）不收敛



### 4.2 重排

> 极限常学常新，总是一再挑战着人类有限的认知. 极限最特别的地方就在于它从不在乎眼下一城一池的得失，而是一切向后看. \hspace{240pt}——摘自@三川啦啦啦

  

设 \sum\limits_{n=1}^{\infty}u_n 是一个级数，如果 \sigma:\mathbb{Z_{>0}}\to \mathbb{Z_{>0}} 是双射，那么就称 \sum\limits_{n=1}^{\infty}u_{\sigma(n)} 是 \sum\limits_{n=1}^{\infty}u_n 的一个重排.

这么说有些抽象，举个例子就好了. 比如交错调和级数：

\sum\limits_{n=1}^{\infty}(-1)^{n-1}\cfrac1n=\cfrac11-\cfrac12+\cfrac13-\cfrac14+\cfrac15-\cfrac16+...

而 1-\cfrac12-\cfrac14 +\cfrac13-\cfrac16-\cfrac18+... 就是一个重排.

因为加法满足交换律和结合律，所以当我们把有限多个数相加时，任意改变求和项的次序不会影响求和的结果. 但级数的情形就不同了，**改变求和项的顺序是有可能改变级数的敛散性的**. 在这一点上，绝对收敛级数与条件收敛级数显示出了巨大的差异，我们下面来逐一进行讨论.

首先还是看一下刚才交错调和级数的例子，为什么上面的例子中我们没有写等号，而是独立写了两行，因为它们不相等！

如果我们记

\begin{align}A_1&=\sum\limits_{2|x}\left(\cfrac1{x-1}-\cfrac1{x}\right)\\&=\left(\cfrac11-\cfrac12\right)+\left(\cfrac13-\cfrac14\right)+\left(\cfrac15-\cfrac16\right)+... + \left(\cfrac1{x-1}-\cfrac1{x}\right)+... \end{align}

A_2=\left( 1-\cfrac12-\cfrac14 \right) +\left(\cfrac13-\cfrac16-\cfrac18\right) +...+\left(\cfrac1{x-1}-\cfrac1{2x-2}-\cfrac1{2x}\right) +...

如果我们把对应括号里的数相减，得到

\begin{align}A_1-A_2&=\sum\limits_{2|x}\left(\cfrac1{x-1}-\cfrac1{x}-\cfrac1{x-1}+\cfrac1{2x-2}+\cfrac1{2x}\right)\\&= \sum\limits_{2|x}\left(\cfrac1{2x-2}-\cfrac1{2x}\right)\\&=\cfrac12\sum\limits_{2|x}\left(\cfrac1{x-1}-\cfrac1{x}\right)\\&=\cfrac12A_1 \end{align}

所以 A_1=2A_2 .

但实际上， A_1,A_2 元素相同，只是元素排列的不同. A_1 是一正对应一负， A_2 是一正对应两负.

所以 {\color{red}{级数不能随意改变元素顺序！}}

在这我又忍不住多扯一点题外话了. 网上流传这样一种说法：正整数之和等于 -\cfrac1{12} . 以下是所谓的证明：

\begin{align} s\ =1+&2+3+4+5+6+……\\ s_1=1-&1+1-1+1-1+……\\ s_2=1-&2+3-4+5-6+……\\ 2s_2 =1-&2+3-4+5-6+……\\ +&1-2+3-4+5+…… \end{align}

错位相加，就会得到：

2 s_2=1-1+1-1……=s_1

所以： s_2=\cfrac12 s_1

\begin{align} s-s_2&=4+8+12+16…\\&=4(1+2+3+4+…)\\&=4 s \end{align}

所以： s=-\cfrac13 s_2 ， s=-\cfrac16 s_1

\begin{align}s_1&=1-1+1-1+1……\\&=1-(1-1+1-1+1-1……)\\&=1-s_1 \end{align}

所以 s_1=\cfrac12 ， s=-\cfrac1{12} .

当然这是不可能的，怎么？我今天买你一个苹果，明天买两个...到头来还欠你十二分之一个不成？

问题就出在：无穷级数不能随便改变元素顺序(错位相加)，也不能随便加括号！

以下我们定义如下记号

x^+=\max (x,0),x^-=-\min (x,0) .

所以有

x^+=\dfrac{|x|+x}2=\begin{cases} x, &\ \ \ x>0 \\ 0, &\ \ \ x\leq 0 \\ \end{cases}

x^-=\dfrac{|x|-x}2= \begin{cases} -x,&x<0\\ 0,&x\geq0 \end{cases}

### 4.3 引理

(1)如果级数 \sum\limits_{n=1}^{\infty}u_n 绝对收敛，那么 \sum\limits_{n=1}^{\infty}u_n^+ 和 \sum\limits_{n=1}^{\infty}u_n ^- 均收敛.

(2)如果级数 \sum\limits_{n=1}^{\infty}u_n 条件收敛(例如 \sum\limits_{n=1}^{\infty}\dfrac{(-1)^n}{n}, 收敛但不绝对收敛)，那么 \sum\limits_{n=1}^{\infty}u_n^+ 和 \sum\limits_{n=1}^{\infty}u_n ^- 均发散于 +\infty .

### 4.4 狄利克雷重排定理

设级数 \sum\limits_{n=1}^{\infty}u_n {\color{red}{绝对收敛}} ，再设 \sum\limits_{n=1}^{\infty}u'_n 是将 \sum\limits_{n=1}^{\infty}u_n 的项重排后所得的级数，那么 \sum\limits_{n=1}^{\infty}u’_n 也绝对收敛，且和于原级数相等.

通过狄利克雷重排定理，我们可以知道，对于绝对收敛级数而言，任意改变求和次序不会影响求和结果，这与有限多个数求和的情形相同，是一个非常好的性质. 但这对条件收敛级数并不成立，事实上，黎曼在1854年的论文《论函数的三角级数表示》中给出了如下结论，人们常把它称作**黎曼重排定理(Riemann rearrangement theorem)**.

### 4.5 黎曼重排定理

设级数 \sum\limits_{n=1}^{\infty}u_n {\color{red}{条件收敛}} ，那么对任意的 A (可以是实数或 \infty )，均可将\sum\limits_{n=1}^{\infty}u_n 重排使得重排后的级数的和为 A .

## 五 级数的乘法

在命题1.4中我们介绍了级数的线性运算，在本节中我们将介绍级数的乘法. 众所周知，对于形如 $(a_1+a_2+…+a_n)(b_1+b_2+…+b_m)$

的两个有限和相乘的情形，我们可以用分配律将其展开. 但级数乘法的情况就不同了，因为这里有无穷多项，所以无法直接展开，从而我们需要像命题1.4中相加的情形一样，将那些所有可能出现的项 $a_ib_j(i≥1，j≥1)$ 按某种方式进行合并以作为乘积级数的通项. 常用的合并方式有两种，它们分别给出了级数的柯西乘积和狄利克雷乘积

首先来介绍柯西乘积，为了说明清楚其由来，我们先给出形式幂级数的概念

### 5.1 形式幂级数

关于一个字母 X 的**形式幂级数(formal power series)**是指形如 $\sum\limits_{n=0}^{\infty}a_nX^n$ 的表达式,其中 a_n(n≥0) 均为实数.

下面来考虑形式幂级数的乘积. 如果两个形式幂级数\sum\limits_{n=0}^{\infty}a_nX^n和\sum\limits_{n=0}^{\infty}b_nX^n的乘积也是一个形式幂级数，记作\sum\limits_{n=0}^{\infty}c_nX^n，那么 c_n 应该等于多少呢?一个容易想到的想法是：把级数\sum\limits_{n=0}^{\infty}a_nX^n的每一项与\sum\limits_{n=0}^{\infty}b_nX^n的每一项相乘，并把 X 的同次幂的项合并，如此一来应当有

c_nX^n= \sum\limits_{k+l=n}a_kX^k\cdot b_lX^l=\bigg(\sum\limits_{k+l=n}a_kb_l\bigg)X^n

从而 c_n=\sum\limits_{k+l=n}a_kb_l\ \ \ \ \ (5.1)

如果取 X=1 ，则那么由上述讨论知将由(4.8)所定义的级数 \sum\limits_{n=0}^{\infty}c_n 当作 \sum\limits_{n=0}^{\infty}a_n 与 \sum\limits_{n=0}^{\infty}b_n 的乘积是一个很自然的选择.

### 5.2 柯西乘积

> 我们称由 (5.1) 所定义的级数 \sum\limits_{n=0}^{\infty}c_n 是 \sum\limits_{n=0}^{\infty}a_n 与 \sum\limits_{n=0}^{\infty}b_n的**柯西乘积**.

按照上面的讨论，我们自然希望当\sum\limits_{n=0}^{\infty}a_n 与 \sum\limits_{n=0}^{\infty}b_n收敛时，有 \sum\limits_{n=0}^{\infty}c_n 收敛.

但是一般来说，有以下两个结论：

**(1)** \sum\limits_{n=0}^{\infty}a_n **和** \sum\limits_{n=0}^{\infty}b_n **收敛并不一定可以保证柯西乘积收敛.**

例如，我们取 a_n=b_n=\dfrac{(-1)^n}{\sqrt{n}} ,\hspace{20pt}\forall n \in \mathbb{Z_{>0}}

那么由莱布尼茨判别法和这两个级数收敛可以知道 c_n=\sum_\limits{k+l=n}a_kb_l=(-1)^n\sum\limits_{k=1}^n\dfrac{1}{\sqrt{k(n-k)}}

所以，我们由基本不等式可以得到 |c_n|=\sum\limits_{k=1}^n\dfrac{1}{\sqrt{k(n-k)}}\geq \sum\limits_{k=1}^n\cfrac2{k+(n-k)}=\dfrac {2(n-1)}n\geq 1\hspace{20pt} \forall n \geq2

因此， \sum\limits_{n=0}^{\infty}c_n 是发散的.

**(2)与之对应，** \sum\limits_{n=0}^{\infty}a_n **和** \sum\limits_{n=0}^{\infty}b_n **发散并不一定可以保证柯西乘积发散.**

例如： a_0=b_0=1 ,当 n\geq 1 时，

a_n=-\left(\dfrac 32\right)^n ， b_n=\left(\cfrac32\right)^{n-1}\left(2^n+\cfrac1{2^{n+1}}\right)

由莱布尼茨判别法和 a_n,b_n 都是发散的，我们可以得到 c_n=\sum_\limits{k+l=n}a_kb_l \\= \left(\cfrac32\right)^{n-1}\left(2^n+\cfrac1{2^{n+1}}\right)-\left(\dfrac 32\right)^n -\left(\dfrac{3}{2}\right)^{n-1}\sum_\limits{k=1}^{n-1}\left(2^k+\cfrac1{2^{k+1}}\right)\\ =\left(\cfrac32\right)^{n-1}\left(2^n+\cfrac1{2^{n+1}}\right)-\left(\dfrac 32\right)^n-\left(\dfrac{3}{2}\right)^{n-1}\left(2^{n}-\cfrac32-\cfrac1{2^{n}}\right)\\ =\left(\cfrac32\right)^{n-1}\cdot\cfrac1{2^{n+1}}+\cfrac12\left(\cfrac34\right)^{n-1} \\=\left(\cfrac34\right)^{n}

### 5.3 狄利克雷级数

> 设 s\in\mathbb{R} ,形如 \sum\limits_{n=0}^{\infty}\dfrac{a_n}{n^s} 的级数被称为**狄利克雷级数(Dirichlet series)**.

现在我们考虑两个狄利克雷级数 \sum\limits_{n=0}^{\infty}\dfrac{a_n}{n^s} 和 \sum\limits_{n=0}^{\infty}\dfrac{b_n}{n^s} 的乘积，如果结果也是一个狄利克雷级数，不妨记为 \sum\limits_{n=0}^{\infty}\dfrac{c_n}{n^s} ，那么 c_n 应该是多少呢？

### 5.4 狄利克雷乘积

其实我们可以仿照柯西乘积来考虑狄利克雷乘积，因此自然可以想到把两个狄利克雷级数 \sum\limits_{n=0}^{\infty}\dfrac{a_n}{n^s} 和 \sum\limits_{n=0}^{\infty}\dfrac{b_n}{n^s} 中分母乘积相等的那些项合并起来.

举个具体的例子吧，比如我们现在想要知道 \sum\limits_{n=0}^{\infty}\dfrac{c_n}{n^s} 中第 6 项分子 c_6 是多少.

c_6 的对应分母是 6^s ，那么我们就要看 \sum\limits_{n=0}^{\infty}\dfrac{a_n}{n^s} 和 \sum\limits_{n=0}^{\infty}\dfrac{b_n}{n^s} 中哪些项的分母乘起来可以凑出 6^s .

6 的素因子有 1，2，3，6 ，所以分母 6^s=1^s\cdot6^s=2^s\cdot 3^s

所以 c_6=a_1\cdot b_6+a_2\cdot b_3+a_3\cdot b_2+a_6\cdot b_1

这样，我们发现每一组 a,b 的下标乘起来正好是 c 的下标.

进而推广到 c_n=\sum\limits_{kl=n}a_kb_l . (5.4)

我们称由 (5.4) 所定义的级数 \sum\limits_{n=0}^{\infty}c_n 是 \sum\limits_{n=0}^{\infty}a_n 与 \sum\limits_{n=0}^{\infty}b_n的**狄利克雷乘积**.


## 幂级数

- **幂级数** $\sum \limits_{n=0}^{\infty} a_{n}x^{n}$
- **幂级数的系数** $\lbrace a_{n} \rbrace$
- **收敛域** 使得这个幂极数收敛的 $x$ 的取值域，根据 Abel 定理，这个收敛域的形式是 $|x|<R$，其中等号的选取需要取决于幂级数在 $x=\pm R$ 处的收敛性，这里的 $R$ 称为收敛半径，设 $\rho=\lim\limits_{ n \to \infty } \left| \dfrac{a_{n+1}}{a_{n}}\right|$，则 $R=\dfrac{1}{\rho}$，区间 $(-R,R)$ 称为收敛区间




# §5　级数

## §5.1　数项级数

**正项级数** 正项级数的部分和序列是单调递增的，有

$$
\text{定理} \qquad \sum\limits_{n=1}^{\infty}u_{n} \text{ 收敛} \iff \lbrace S_{n} \rbrace \text{ 有界}
$$

基于这个定理，对于两个正项级数 $\sum\limits_{n=1}^{\infty}u_n,\ \sum\limits_{n=1}^{\infty}v_n$（分别简记为 $U,\ V$）有如下最基本的判别法：

$$
\begin{array}{cccc}
\text{判别法} & \text{条件} & \text{收敛} & \text{发散} \\
\hline
& \forall n>n_{0},\ u_n \leqslant  cv_n \\
\text{比较判别法}
& \lim\limits_{n\to\infty}\dfrac{u_n}{v_n } \in [0,+\infty) 
& U \Leftarrow V
& U \Rightarrow V \\
& \forall n>n_{0},\ \dfrac{u_{n+1}}{u_n}\leqslant\dfrac{v_{n+1}}{v_n}
\end{array}
$$

选取已知收敛性的 $v_{n}$，利用比较判别法即可得到 $u_{n}$ 的收敛性。特别地，

$$
\begin{array}{cccc}
\text{判别法} & \text{条件} & \text{收敛} & \text{发散} \\
\hline
\text{d'Alembert判别法}
& \rho=\lim\limits_{n\to \infty}\dfrac{u_{n+1}}{u_n}
& \rho<1
& \rho>1
\\
\text{柯西判别法}
& \rho=\lim\limits_{n\to \infty} \sqrt[n]{u_n}
& \rho<1
& \rho>1
\\
\text{极限判别法}
& \lim\limits_{n\to \infty} n^{\alpha}u_{n} \in (0,+\infty)
& \alpha>1
& \alpha=1
\\
\text{积分判别法}
\end{array}
$$

**交错级数的莱布尼茨判别法** 若数列 $\lbrace a_n\rbrace$  单调趋于 $0$，则级数 $\sum\limits_{n=1}^{\infty}(-1)^na_n$ 收敛。

如果 $\sum\limits_{n=1}^{\infty}|u_n|$ 收敛，那么 $\sum\limits_{n=1}^{\infty}u_n$ 也收敛。该结论的逆命题未必成立，即如果 $\sum\limits_{n=1}^{\infty}u_n$ 收敛，那么 $\sum\limits_{n=1}^{\infty}|u_n|$ 未必收敛，因此定义
- **绝对收敛** 收敛极数加上个绝对值（即 $\sum\limits_{n=1}^{\infty}|u_n|$）也收敛
- **条件收敛** 收敛极数加上个绝对值（即 $\sum\limits_{n=1}^{\infty}|u_n|$）不收敛

## §5.2　幂级数

幂级数 $\sum \limits_{n=0}^{\infty} a_{n}x^{f(n)}$，置 $\rho=\lim\limits_{ n \to \infty } \left| \dfrac{a_{n+1}x^{f(n+1)}}{a_{n}x^{f(n)}}\right|=1$，得收敛半径 $R=|x|$，收敛区间 $(-R,R)$，再算幂级数在 $x=\pm R$ 处的收敛性，如果收敛就将开区间改为闭区间，得到 **收敛域**。

**函数展开成幂级数** 

$$
\begin{aligned}
\mathrm e^{- x} & = \sum_{n = 0}^{\infty}{(-1)^{n} \frac{x^{n}}{n!}}\ (-\infty < x <  + \infty) \\
\ln (x + 1) & = \sum_{n = 0}^{\infty}{(-1)^{n} \frac{x^{n + 1}}{n + 1}}\ (-1 < x \leqslant 1) \\
\sin x & = \sum_{n = 0}^{\infty}{(-1)^{n}\frac{x^{2n + 1}}{(2n + 1)!}} \ (-\infty < x <  + \infty) \\
\cos x & = \sum_{n = 0}^{\infty}{(-1)^{n}\frac{x^{2n}}{(2n)!}} \ (-\infty < x <  + \infty) \\
 \frac{1}{1 + x} & = \sum_{n = 0}^{\infty}{(-1)^nx^{n}}\ (-1 < x < 1) \\
(1 + x)^\alpha & = 1 + \sum_{n = 1}^{\infty}{\frac{\alpha(\alpha - 1)\cdots(\alpha - n + 1)}{n!} x^{n}} (-1 < x < 1) \\
\arctan x & = \sum_{n = 0}^{\infty}{(-1)^{n} \frac{x^{2n + 1}}{2n + 1}}\ (-1 \leqslant x \leqslant  1) \\
\end{aligned}
$$

## §5.3　傅里叶级数

**函数展开成傅里叶级数** $f(x)=\displaystyle \dfrac{a_{0}}{2}+\sum_{n=1}^{\infty}a_{n}\cos nx+b_{n}\sin nx$，其中
$$
\begin{cases}
\displaystyle a_{n}=\dfrac{1}{\pi} \int_{-\pi}^{\pi}f(x)\cos nx\mathrm dx  \\
\displaystyle b_{n}=\dfrac{1}{\pi} \int_{-\pi}^{\pi}f(x)\sin nx\mathrm dx 
\end{cases}
$$

<div style="page-break-after:always;"></div>

# 附录

**幂指对**
$$
\begin{array}{ccc} 
\hline

\displaystyle\int_{}^{}{f (x) \mathrm{d}x}& f (x)  & f^\prime (x) \\ 

\hline

\left\{
\begin{array}{ll}
\dfrac{ x^{k+1}}{k+1}+C, & \text{if }k\ne-1 \\
\ln\left|x\right|+C, & \text{if }k=-1
\end{array}\right.

& x^{k} & kx^{k-1} \\ 

\displaystyle\frac{a^{x}}{\ln a}+C & a^{x} & a^{x}\ln a \\ 

\displaystyle\frac{1}{\ln a} x (\ln x-1) +C & \log_{a}x & \displaystyle\frac{1}{x\ln a}\\ 

\hline
\end{array}
$$

**三角函数荟萃**
$$
\begin{array}{ccc} 
\hline

\displaystyle\int_{}^{}{f (x) \mathrm{d}x}& f (x)  & f^\prime (x) \\ 

\hline

-\cos x +C& \sin x & \cos x\\ 
\sin x +C& \cos x & -\sin x\\ 
\ln{|\csc x-\cot x|}+C & \csc x & -\csc x\cot x\\ 
\ln{|\sec x+\tan x|}+C & \sec x & \sec x\tan x \\ 
\ln{|\sec x|}+C=-\ln{|\cos x|}+C & \tan x & \sec^2x \\ 
-\ln{|\csc x|}+C=\ln{|\sin x|}+C & \cot x & -\csc^2x \\ 

\hline

\dfrac{1}{4} (2x+\sin{2x}) +C & \cos^2x & -\sin{2x} \\
\dfrac{1}{4} (2x-\sin{2x}) +C & \sin^2x & \sin{2x} \\

\hline

x\arcsin x+\sqrt{1-x^2}+C & \arcsin x & \dfrac{1}{\sqrt{1-x^2}} \\ 
x\arccos x-\sqrt{1-x^2}+C & \arccos x & \dfrac{-1}{\sqrt{1-x^2}} \\ 
x\arctan x-\dfrac{1}{2}\ln{|x^2+1|}+C & \arctan x & \dfrac{1}{1+x^2} \\ 

\hline
\end{array}
$$
**其它**
$$
\begin{align}

&\int_{}^{}\frac{\mathrm dx}{\sqrt{x^2+1}}=\ln\left (x+\sqrt{x^2+1}\right) +C=\operatorname{arcsinh}{x}+C \\
&\int_{}^{}\frac{\mathrm dx}{\sqrt{x^2-1}}=\ln\left (x+\sqrt{x^2-1}\right) +C=\operatorname{arcsinh}{x}+C \\
&\int_{}^{}\frac{\mathrm dx}{1-x^2}=\frac{1}{2}\ln\frac{1+x}{1-x} +C=\operatorname{arctanh}{x}+C 

\end{align}
$$

**华莱式**
$$
\displaystyle\int_{0}^{\frac{\pi}{2}}{\sin^nx\mathrm{d}x}
\displaystyle=\int_{0}^{\frac{\pi}{2}}{\cos^nx\mathrm{d}x}
\displaystyle=\left\{
\begin{array}{ll}
\dfrac{ (n-1) !!}{n!!} & n\text{ is odd.}\\
\dfrac{ (n-1) !!}{n!!} \cdot \dfrac{\pi}{2} & n\text{ is even.}
\end{array}\right.
$$

**高阶导数**
$$
\left[\text{Leibniz formula}\right]\qquad\begin{align}

 (u v) ^{ (n) }&=\sum_{k=0}^{n} C_{n}^{k} u^{ (n-k) } v^{ (k) }\\
&=uv^{ (n) }+C_n^1u^{'}v^{ (n-1) }+\cdots+C_n^{n-1}u^{ (n-1) }v^{'}+u^{ (n) }v \\

\end{align}
$$

$$
\begin{array}{cc}
\hline
\displaystyle f (x)  & f^{\left ( n \right) } (x) \\ 
\hline

a^x & a^x\ln ^na \\
{\mathrm e}^x & {\mathrm e}^x \\

\hline

x^{\mu} & \mu \left ( \mu -1 \right)  \cdots \left ( \mu -n+1 \right)  x^{\mu -n} \\
x^{n} & n! \\
x^{-1} &  (-1) ^n\dfrac{n!}{x^{n+1}}\\
\dfrac{1}{x+a} 
& \displaystyle\dfrac{ (-1) ^nn!}{ (x+a) ^{n+1}} \\
\bs{\dfrac{1}{kx+b}}
& \bs{\displaystyle{\dfrac{ (-1) ^{n}k^{n}n!}{ (kx+b) ^{n+1}}}} \\

\hline

\log _ax
& \displaystyle\frac{\left ( -1 \right)  ^{n-1}\left ( n-1 \right)  !}{x^n\ln a} \\
\ln (kx+b) 
& \displaystyle\dfrac{ (-1) ^{n-1}k^n (n-1) !}{ (kx+b) ^{n}} \\

\hline

\sin \left ( kx+a \right)  & \displaystyle k^n\sin \left ( kx+a+\frac{n\pi}{2} \right)  \\

\cos \left ( kx+a \right)  & \displaystyle k^n\cos \left ( kx+a+\frac{n\pi}{2} \right)  \\

\hline
\end{array}
$$

**定积分**

区间再现公式 ：$$\displaystyle\int_{a}^{b}{f (x) \mathrm{d}x}=\int_{a}^{b}{f (a+b-x) \mathrm{d}x}$$

增强版区间再现公式：$$\displaystyle\int_{a}^{b}{f (x) \mathrm{d}x}=\int_{a}^{\frac{a+b}{2}}{f (x) +f (a+b-x) \mathrm{d}x}=\int_{\frac{a+b}{2}}^{b}{f (x) +f (a+b-x) \mathrm{d}x}$$

更强的区间再现公式：设 $f (x) ,~g (x)$ 为 $[a,b]$ 上的连续函数，若 $f (x) =f (a+b-x) ,~g (x) +g (a+b-x) =m$，其中 $m$ 为常数，则有 $\displaystyle\int_{a}^{b}f (x) g (x) \mathrm{d}x=\frac{m}{2}\int_{a}^{b}f (x) \mathrm{d}x$

扩展的定积分公式：
$$
\begin{align}

& \int_{0}^{\pi}{xf (\sin x) }\mathrm{d}x = \frac{\pi}{2}\int_{0}^{\pi}{f (\sin x) }\mathrm{d}x = \pi\int_{0}^{\frac{\pi}{2}}{f (\sin x) }\mathrm{d}x \\

&\int_{0}^{\frac{\pi}{2}}{f (\sin x) }\mathrm{d}x = \int_{0}^{\frac{\pi}{2}}{f (\cos x) }\mathrm{d}x \\

&\int_{0}^{\frac{\pi}{2}}{f (\sin x,\cos x) }\mathrm{d}x = \int_{0}^{\frac{\pi}{2}}{f (\cos x,\sin x) }\mathrm{d}x \\

&\int_{a}^{b}{f (x) }\mathrm{d}x = \int_{-\frac{\pi}{2}}^{\frac{\pi}{2}}{f\left (\frac{a+b}{2}+\frac{b-a}{2}\sin x\right) }\cdot\frac{b-a}{2}\cos x\mathrm{d}x = \int_{0}^{1}{ (b-a) f[a+ (b-a) x]}\mathrm{d}x\\

&\int_{-a}^{a}{f (x) }\mathrm{d}x = \int_{0}^{a}{f (x) +f (-x) }\mathrm{d}x\\ 

\end{align}
$$



<div style="page-break-after:always;"></div>
