---
header: ${pageNo} / ${totalPages}                                                                 Advanced Mathematics - Notes                                             written by XiaoMing

footer:
---

# 高等数学 - Notes（菜鸟直播版）

**写在前面**

　　再次送每个读者一个四叶草🍀，祝期末考试顺利 ~ 

　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　  中国传媒大学
​　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　 2023 级   小明同学
​　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　  2023 年 12 月



**一些说明**

1. 本笔记仅适合作为复习资料，但是不建议作为预习资料．切勿过于依赖本笔记．
2. 本笔记的格式和部分叙述具有强烈的个人习惯，若稍有不适，请立即停止阅读．
3. 本笔记允许自由转载，但仅可用于个人期末复习使用，不得用于任何商业用途．
4. 本笔记无偿提供给所有读者．我们不会收取任何费用，谨防诈骗！
5. 本笔记将会持续更新，请添加 QQ 群或个人博客以获取更新信息．
6. 由于编写仓促，本笔记难免有少量错误，恳请广大读者批评指正．



**联系方式**

​		勘误、交流、提问、催更、~~闲聊~~、~~互赞~~……请联系：
​				交流群：*[782175321](https://qm.qq.com/cgi-bin/qm/qr?authKey=G7oEFn%2B6NSGpPMuKqJ%2FjdCko0pdkdGBxC3vL36t02vOfC2E5AN8yoOJ1AZAbdy1t&k=Y0FqqfvgB8xsCWW4G2Hl35i1701yCjtK&noverify=0)*
​				博客：(搭建中)
​				QQ：[*3135209339*](https://qm.qq.com/cgi-bin/qm/qr?k=iqz4Z46LJhMGPWw8_Hq0KbBawUQNIj8n)
​				email：*cmg77@126.com*
​				匿名提问箱：*[小茗·可比克专卖店的提问箱 (https://www.askbox.ink/box/uu/DHPONQF7?uid=69e68fd831b7284904aa42b596e33c7d)](https://www.askbox.ink/box/uu/DHPONQF7?uid=69e68fd831b7284904aa42b596e33c7d)*



**更新历史**

1.0.0　　2023 年 12 月 29 日　　发布，首发于高数学霸课堂．

<div style="page-break-after:always;"></div>

**目录**

[TOC]



<div style="page-break-after:always;"></div>

## $$\mathcal{Part1}~~~$$函数与极限

### $$\S1.1~~~$$映射、函数

#### $$\S1.1.1~~~$$映射

***Key***

- 映射［定义域、值域的范围、对应法则］；
- 满射、单射、双射、一一映射、逆映射、复合映射；

***Notice***

- 值域的范围不同于值域；
- 只有单射才有逆映射；
- $$g$$ 和 $$f$$ 构成的复合映射是 $$(f\circ g)(x)=f\left[g(x)\right]$$，前提是 $$R_g\subset D_f$$，复合映射是有次序的；

#### $$\S1.1.2~~~$$函数

***Key***

- 概念：函数［定义域、对应法则］、自然定义域；
- 特性：有界性［有上界［$$\exists K, ~~\text{s.t.} ~~\forall x\in X, ~~f(x)\le K$$］、有下界、有界、无界］、单调性［增加、减少］、奇偶性；周期性；
- 反函数、直接函数；
- 复合函数［习惯说法］；
- 函数运算；
- 基本初等函数和初等函数：反三角函数、双曲函数；

***Notice***

- 有界$$\iff$$既有上界又有下界（习题1-1.10）；
- 周期函数不一定有最小正周期，如狄利克雷函数；
- 结合逆映射和复合映射考虑反函数和复合函数；

### $$\S1.2~~~$$数列极限

#### $$\S1.2.1~~~$$数列极限

***Key***

- 定义（收敛、极限不存在或发散）；
- 用定义求数列极限；
- 收敛数列性质：极限惟一、有界、保号性（极限为正那么后面所有项都是正、后面所有项非负那么极限非负）、子列（子列极限和原数列相同）和推论（若找到两个子列收敛于不同值则发散）；

***Notice***

- 收敛数列保号性的充分必要性，0；
- 子列的性质：子列 $$\{x_{n_k}\}$$ 中，$$n_k\ge k$$；

### $$\S1.3~~~$$函数极限

#### $$\S1.3.1~~~$$函数极限

***Key***

- 定义；
- 用定义求函数极限；
- 单侧极限、极限存在判定（左右极限各自存在且相等）；
- 函数极限性质：惟一、局部有界、局部保号（极限为正那么邻域所有项都是正、邻域所有项非负那么极限非负）和加强（大于极限的一半）、与数列极限的关系（数列收敛那么函数值数列也收敛）和推论（若找到两个数列的函数值极限收敛于不同值则函数极限不存在）；
- 极限运算法则：四则运算、复合函数极限；

***Notice***

- 收敛数列保号性的充分必要性，$$0$$ 是否可取；
- 子列的性质：子列 $$\{x_{n_k}\}$$ 中，$$n_k\ge k$$；

#### $$\S1.3.2~~~$$无穷大和无穷小

***Key***

- 无穷小、无穷小与函数极限的关系、有界量乘无穷小仍是无穷小；
- 无穷大、无穷大与无穷小的关系；
- 无穷小的比较：高(低/同)阶无穷小、等价无穷小、$$k$$ 阶无穷小；
- 等价无穷小的充要条件；
- 等价无穷小代换定理及推论；

***Notice***

- 将函数极限转为无穷小问题；
- 无穷小转无穷大注意 $$0$$；
- 无限个无穷小的和的讨论；

#### $$\S1.3.3~~~$$极限存在法则

***Key***

- 夹逼定理；
- 单调有界数列必有极限、推广到函数的情形；
- 柯西极限存在准则；

#### $$\S1.3.4~~~$$函数的连续性和间断点

***Key***

- 连续的三种判定（定义、极限等于函数值、左右连续）、和差积商和复合函数连续、初等函数连续；
- 间断点：
  - 第一类：左右极限都存在，可去间断点、跳跃间断点；
  - 第二类：无穷间断点、振荡间断点；

***Notice***

- 闭区间连续的定义；

#### $$\S1.3.5~~~$$闭区间上连续函数的性质

***Key***

- 有界性与最大值最小值定理；
- 零点定理；
- 介值定理；

<div style="page-break-after:always;"></div>

## $$\mathcal{Part2}$$　微积分

### $$\S2.1~~~$$导数与微分

#### $$\S2.1.1~~~$$导数与微分的概念

***Key***

- 导数的定义［极限、邻域］，导函数的定义；{21P2.4}

- 单侧导数（左/右导数存在）；

- 可导［极限存在］［左导数和右导数都存在且相等］、在开区间可导和在闭区间可导的区别；

- 可导性和连续性的关系：{21P2.2}
  $$
  \begin{array}{ccc}
  
  可导
  & \substack{\displaystyle\nLeftarrow \\ \displaystyle\Rightarrow}
  & 连续 \\
  
  \displaystyle\lim_{\Delta x\rightarrow0}\frac{\Delta y}{\Delta x}\text{ exists}
  && \displaystyle\lim_{\Delta x\rightarrow0}\Delta y=0
  
  \end{array}
  $$
  
- 增量、微分；

***Notice***

- 分段函数求导，在分段点处的导数需要单独讨论；
- 绝对值函数视为分段函数（因为不光滑）；
- 求 $$f(x)=\left\{\begin{array}{ll} 2x, & x\le1 \\ x^2 & x>1 \end{array}\right. $$ 的右导数。

#### $$\S2.1.2~~~$$求导

***Key***

- 使用定义求导；{21P1.3}
- 求导法则：基本初等函数、和差积商、复合函数 {21P1.1, 22P2.3}；
- 反函数的求导法则：设 $$y=f(x)$$ 的反函数 $$x=\varphi(y)$$，则 $$\frac{\mathrm dx}{\mathrm dy}=\frac{1}{\frac{\mathrm dy}{\mathrm dx}} \quad\text{or}\quad \varphi'(y)=\frac{1}{f'(x)}$$；
- 高阶导数：高阶导数公式、和差、积商（莱布尼兹公式）；
- 隐函数所确定的函数的导数：隐函数求导法则 {21P3.2}、幂指函数 {20P1.3}、对数求导法；
- 参数方程所确定的函数的导数：参数方程求导法则 {22P3.3}、参数方程的高阶导数；

***Notice***

- 反函数条件：$$f(x)$$ 可导，且 $$f'(x)\neq 0$$，则存在反函数 $$x=\varphi(y)$$​。

  解释：一个函数如果有反函数的就必须是单调的，而且不存在两个值，值与值之间是一一对应的，并且因变量和自变量之间是双射的，否则在原函数和反函数这两个函数一定会存在一对多和多对一的情况。

- 反函数求导实例：求 $$y=\arcsin(x)$$ 的导数。反函数 $$x=\sin(y)$$，反函数的导数 $$(x)'=\cos(y)$$，这里我们将 $$x=\sin(y)$$ 视为 $$y=f(x)$$，将 $$y=\arcsin(x)$$ 视为 $$x=\varphi(y)$$，由上面求导公式得 

  $$
  (\arcsin(x))'=\frac{1}{(\sin(y))'}=\frac{1}{\cos(y)}=\frac{1}{\sqrt{1-x^2}}
  $$
  
- $$\mathbb Q.$$​ $$y=\arcsin x$$​ 不是 $$y=\sin x$$​ 的反函数吗？$$x=\sin y$$​ 和 $$y=\arcsin x$$​ 不是一个东西吗？

  $$\mathbb A.$$ 首先要明白函数相等的概念：两个函数相等的条件是定义域和对应法则相同，与所选的字母无关。

  比如 $$y=2x$$ 和 $$y=2t$$ 互为相等函数，$$y=2x$$ 与 $$x=2y$$ 也是（尽管这两个函数在 $$xOy$$ 坐标系中画出的图像是不同的），因为实质上都是把自变量 $$×2$$，即对应法则 $$f$$ 相同。

  回到原题，$$y=\sin x$$ 与 $$x=\sin y$$ 互为相等函数，它们都是 $$y=\arcsin x$$ 的反函数。

  书上这么写应该是为了求导需要。那个求导公式的分母上是 $$f'(y)$$，是对关于 $$y$$ 的函数 $$\sin y$$ 求导的，所以写 $$x=\sin y$$ 比 $$y=\sin x$$ 方便求导。

#### $$\S2.1.3~~~$$微分中值定理

***Key***

- 费马引理；
- 罗尔定理；{期中考试题}
- 拉格朗日中值定理；{21P4.2}
- 柯西中值定理；

#### $$\S2.1.4~~~$$导数的应用

##### $$\S2.1.4.1~~~$$函数的近似计算

***Key***

- $$\Delta y \approx f'(x_0)\Delta x$$；
- $$f(x_0+\Delta x) \approx f(x_0)+f'(x_0)\Delta x$$；

##### $$\S2.1.4.2~~~$$泰勒公式

***Key***

- 带有佩亚诺/拉格朗日余项的 $$n$$ 阶泰勒公式/麦克劳林公式；{21P1.4}
  $$
  \begin{array}{r|c|c|}
  
  &\text{the n-th order} & \text{the n-th order} \\
  &\quad\text{Taylor's theorem}\quad & \quad\text{Maclaurin formula}\quad \\\\
  
  \text{with Peano's form of remainder} & \\\\
  
  \text{with Lagrange's form of remainder} &\\\text{ }
  
  \end{array}
  $$

- 带有拉格朗日余项的 $$n$$ 阶泰勒公式是拉格朗日中值定理的推广；

- 误差估计式；

##### $$\S2.1.4.3~~~$$求切线和法线

***Key***

- 切线和法线；

##### $$\S2.1.4.4~~~$$函数图形的描绘

***Key***

- 单调性、驻点、极值点；
- 凹凸性、拐点；
- 极值：定义、定理（极值点是驻点）、判定（一阶导数的符号、驻点处二阶导数的符号）；{21P2.3}
- 最值：闭区间端点和所有极值点的最值；
- 函数图形的描绘
  - 定义域、特性、求导数，
  - 划分区间（驻点、拐点、间断点、导数不存在的点），
  - 列表（确定单调性、凹凸性、拐点），
  - 变化趋势（渐近线、无穷远），
  - 取点画图；{20P3.3}

***Notice***

- 驻点；
- 等号仅在有限个点处成立；
- 划分区间注意导数不存在的点；

##### $$\S2.1.4.5~~~$$曲率

***Key***

- 弧微分公式：$$\mathrm ds=\sqrt{1+y'^2}\mathrm dx$$；

- 曲率{21P3.3}；

- 曲率半径：$$\displaystyle \rho=\frac{1}{K}$$；

### $$\S2.2~~~$$不定积分

#### $$\S2.2.1~~~$$不定积分的概念

***Key***

- 原函数 {20P2.2}、不定积分；
- 原函数存在定理：连续函数定有原函数；
- 性质：线性组合、可将与积分变量无关的式子提出来；

***Notice***

- 连续函数就有原函数，不要求光滑；

#### $$\S2.2.2~~~$$不定积分的求法

***Key***

- 积分表（附录2）；{22P2.4, 20P3.4}

- 第一类换元法：$$\varphi(x)\mathrm dx=d\varPhi(x)$$；{20P3.5, 21P3.6}

- 第二类换元法：令积分变量为单调函数，有倒数代换、三角代换、根式代换；
  $$
  \begin{array}{ccl}
  
  \hline
  
  \text{I} &\displaystyle \frac{低次}{高次} &\displaystyle \text{Let}~~ x=\frac{1}{t}. \\
  
  \hline
  
  & \sqrt{a^2-x^2} &\displaystyle \text{Let}~~ x=a\sin t,~~ t \in \left(-\frac{\pi}{2}, \frac{\pi}{2}\right). \\
  
  \text{II}
  & \sqrt{x^2+a^2} &\displaystyle \text{Let}~~ x=a\tan t,~~ t \in \left(-\frac{\pi}{2}, \frac{\pi}{2}\right). \\
  
  & \sqrt{x^2-a^2} &\displaystyle \text{If}~~ x>a, ~~\text{let}~~ x=a\sec t,~~ t \in \left(0, \frac{\pi}{2}\right). \\
  
  \hline
  
  \text{III} & \sqrt{g(x)} & \text{Let}~~ t=\sqrt{g(x)},~~\text{i.e.}~~ x=g^{-1}(t^2). \\
  
  \hline
  
  \end{array}
  $$
  
- 分部法：优先级，多次分部积分、出现循环；

- 有理函数的积分：（通过化真分式、裂项）化归为以下情形，其中分母都是既约多项式 {21P3.4, 22P3.6}

  常数/一次型——$$\ln$$

  常数/二次型——$$\arctan$$

  一次/二次型——第一类换元后 $$\ln$$；

  特殊：分母是幂——第二类换元等等；

- 综合运用；

***Notice***

- 代换后不必考虑范围；
- 注意回代，三角代换的回代可借助三角形；

### $$\S2.3~~~$$定积分

#### $$\S2.3.1~~~$$定积分的概念

***Key***

- 条件：闭区间连续，或有界且只有有限个间断点，则闭区间可积；
- 几何含义；
- 性质：五个性质（线性组合、可加、定号、常数的、有界）、两个推论（定号的推论、绝对值不等式）；
- 积分中值定理；

#### $$\S2.3.2~~~$$定积分的求法

***Key***

- 定义法：插入若干分点，任取一点，最大区间长度趋于0；

- 近似计算：矩形法、梯形法等；

- 基本公式 {20P2.5, 22P1.3}：
  $$
  \begin{array}{cl}
  
  (1)
  &\displaystyle\left[\int_{a}^{x} f(t) \mathrm dt\right]' = f(x) \\
  
  \text{Generalization}:
  &\displaystyle\left[\int_{\psi(x)}^{\varphi(x)} f(t) \mathrm dt\right]'
  = f[\varphi(x)] \cdot \varphi'(x) - f[\psi(x)] \cdot \psi'(x) \\
  
  (2)
  &\displaystyle\int_{a}^{b} f(t) \mathrm dt = F(b) - F(a) \quad\left[\text{Newton-Leibniz formula}\right] \\
  
  \end{array}
  $$
  
- 换元法 {20P4, 21P4.1，凑微分：20P2.4, 22P3.6，三角函数：20P3.6,  21P3.5, 22P3.4}、分部法；

  进阶公式：奇函数 {20P1.5, P2.3, 21P1.1}、周期函数、区间再现；

***Notice***

- 定积分的换元法无需回代，而不定积分需要；
- 定积分的换元法的优势；

#### $$\S2.3.3~~~$$反常积分

***Key***

- 定积分的推广：无穷限的反常积分、无界函数的反常积分（瑕积分）；{22P1.4}
  - 定义（极限）；
  - 求法；
  - 审敛法：原函数的极限、绝对收敛的也收敛、极限审敛法（俩）；
- $$\Gamma$$ 函数；

***Notice***

- 瑕积分易忽视瑕点；

#### $$\S2.3.4~~~$$定积分的应用

***Key***

- 定积分的元素法；

- 平面图形的面积 {20P1.4, P3.7}：
  $$
  \begin{align}
  
  直角坐标型\quad & \displaystyle A=\int_{a}^{b}\big(f(x)-g(x)\big)\mathrm dx=\int_{f(a)}^{f(b)}\big(f^{-1}(y)-g^{-1}(y)\big)\mathrm dy \\
  
  极坐标型\quad &\displaystyle A=\int_{\alpha}^{\beta}\frac{1}{2} \rho^2(\theta)\mathrm d\theta
  
  \end{align}
  $$

- 体积：
  $$
  \begin{align}
  
  旋转体的\quad & \displaystyle V=\int_{\alpha}^{\beta}\pi f^2(x)\mathrm dx\\
  
  已知平行截面的\quad & \displaystyle V=\int_{\alpha}^{\beta}A(x)\mathrm dx
  
  \end{align}
  $$

- 平面曲线的弧长：
  $$
  \begin{array}{rll}
  
  普通函数形式\quad 
  & \displaystyle L:y=f(x) 
  &~~ \displaystyle s=\int_{a}^{b}\sqrt{1+f'^2\left( x \right)}\mathrm dx \\
  
  参数方程形式\quad 
  & \displaystyle L:\left\{\begin{matrix} x=\varphi (t)\\ y=\psi (t)\\ \end{matrix}\right.
  &~~ \displaystyle s=\int_{\alpha}^{\beta}\sqrt{\varphi '^2(t)+\psi '^2(t)}\mathrm dt \\
  
  极坐标方程形式\quad 
  & \displaystyle L:r=r\left(\theta\right)
  &~~ \displaystyle s=\int_{\alpha}^{\beta}\sqrt{r^2(\theta )+r'^2(\theta )}\mathrm d\theta \\
  
  \end{array}
  $$

***Notice***

- 平面图形的面积中积分变量的选取；



<div style="page-break-after:always;"></div>





<div style="page-break-after:always;"></div>

## 附录

### $$\S0.1~~~$$衔接知识

#### $$\S0.1.1~~~$$六个三角函数名

倒数关系：$$\tan\alpha\cot\alpha=1,~~\sin\alpha\csc\alpha=1,~~\cos\alpha\sec\alpha=1$$

商数关系：$$\sin\alpha=\tan\alpha\cos\alpha$$ 等（见下）

平方关系：$$\sin^2\alpha+\cos^2\alpha=1,~~\tan^2\alpha+1=\sec^2\alpha,~~\cot^2\alpha+1=\csc^2\alpha$$

六边形记忆法

![三角函数诱导公式_360百科](E:\Gaxy\学习\中国传媒大学\学习 - 【高】等【数】学\data\高等数学 - Notes\t014483619f934d7c3c.png)

规律1：六边形对角线互为倒数

规律2：三角形最高两端的平方之和加上中切的平方等于低端平方

规律3：任意一点的值等于这一点顺时针的第一个值与第二个值的比值

规律4：任意一点的值等于紧挨着这一点的两个端点的值的积



<div style="page-break-after:always;"></div>

#### $$\S0.1.2~~~$$三角函数公式

> 本部分节选自小明同学编写的《高中数学笔记 · 三角》，已经过作者同意（？）^[1]^
> 由于格式不兼容，所以可能有点点丑…… 有缘再修改
> 拓展的公式在高中不作记忆要求，但在大学…… 也不作…… 随你们吧

1.切化弦

![image-20231223231854751](E:\Gaxy\学习\中国传媒大学\学习 - 【高】等【数】学\data\高等数学 - Notes\image-20231223231854751.png)


2.正余互化

![image-20231223231911175](E:\Gaxy\学习\中国传媒大学\学习 - 【高】等【数】学\data\高等数学 - Notes\image-20231223231911175.png)

3.拆角公式

![image-20231223231949901](E:\Gaxy\学习\中国传媒大学\学习 - 【高】等【数】学\data\高等数学 - Notes\image-20231223231949901.png)

4.并角公式

若![image-20231223232002349](E:\Gaxy\学习\中国传媒大学\学习 - 【高】等【数】学\data\高等数学 - Notes\image-20231223232002349.png)，则![image-20231223232022332](E:\Gaxy\学习\中国传媒大学\学习 - 【高】等【数】学\data\高等数学 - Notes\image-20231223232022332.png)，其中![image-20231223232026317](E:\Gaxy\学习\中国传媒大学\学习 - 【高】等【数】学\data\高等数学 - Notes\image-20231223232026317.png)；![image-20231223232129402](E:\Gaxy\学习\中国传媒大学\学习 - 【高】等【数】学\data\高等数学 - Notes\image-20231223232129402.png)，其中![image-20231223232138632](E:\Gaxy\学习\中国传媒大学\学习 - 【高】等【数】学\data\高等数学 - Notes\image-20231223232138632.png)；
注：高中课本中的表述为![image-20231223232154094](E:\Gaxy\学习\中国传媒大学\学习 - 【高】等【数】学\data\高等数学 - Notes\image-20231223232154094.png)，其中![image-20231223232158494](E:\Gaxy\学习\中国传媒大学\学习 - 【高】等【数】学\data\高等数学 - Notes\image-20231223232158494.png)


5.(1) 倍角公式

![image-20231223232226860](E:\Gaxy\学习\中国传媒大学\学习 - 【高】等【数】学\data\高等数学 - Notes\image-20231223232226860.png)

拓展：

![image-20231223232233750](E:\Gaxy\学习\中国传媒大学\学习 - 【高】等【数】学\data\高等数学 - Notes\image-20231223232233750.png)

(2) 升幂公式

![image-20231223232241723](E:\Gaxy\学习\中国传媒大学\学习 - 【高】等【数】学\data\高等数学 - Notes\image-20231223232241723.png)

6.(1) 半角公式

![image-20231223232255890](E:\Gaxy\学习\中国传媒大学\学习 - 【高】等【数】学\data\高等数学 - Notes\image-20231223232255890.png)

(2) 万能公式（这里![image-20231223232308579](E:\Gaxy\学习\中国传媒大学\学习 - 【高】等【数】学\data\高等数学 - Notes - Chpt2\image-20231223232308579.png))

![image-20231223232304197](E:\Gaxy\学习\中国传媒大学\学习 - 【高】等【数】学\data\高等数学 - Notes\image-20231223232304197.png)

7.和差积互化

![image-20231223232331615](E:\Gaxy\学习\中国传媒大学\学习 - 【高】等【数】学\data\高等数学 - Notes\image-20231223232331615.png)

![image-20231223232337834](E:\Gaxy\学习\中国传媒大学\学习 - 【高】等【数】学\data\高等数学 - Notes\image-20231223232337834.png)

注：高中课本中的表述为

![image-20231223232342687](E:\Gaxy\学习\中国传媒大学\学习 - 【高】等【数】学\data\高等数学 - Notes\image-20231223232342687.png)

![image-20231223232347425](E:\Gaxy\学习\中国传媒大学\学习 - 【高】等【数】学\data\高等数学 - Notes\image-20231223232347425.png)

花香 · #%$限定口诀：
$$
赛加赛赛口，\\
赛减赛口赛，\\
口加口是口，\\
口减口负赛。
$$
<div style="page-break-after:always;"></div>

#### $$\S0.1.3~~~$$反三角函数

**定义域、值域、图像**

![image-20231223230017466](.\data\image-20231223230017466.png)

**同角反三角函数关系**
$$
\begin{align}

\arcsin x &= -\arcsin(-x) = \frac\pi 2-\arccos x = \arctan\frac{x}{\sqrt{1-x^2}} \\
&(\text{if }x>0,)=\arccos\sqrt{1-x^2} =\operatorname{arccot}\frac{\sqrt{1-x^2}}x \\\\

\arccos x &=\pi-\arccos(-x) =\frac\pi 2-\arcsin x =\operatorname{arccot}\frac{x}{\sqrt{1-x^2}}\\
&(\text{if }x>0,)=\arcsin\sqrt{1-x^2} =\arctan\frac{\sqrt{1-x^2}}x \\\\

\arctan x &=-\arctan(-x) =\frac\pi 2-\operatorname{arccot}x =\arcsin\frac{x}{\sqrt{1+x^2}}\\ 
&(\text{if }x>0,)=\arccos\frac 1{\sqrt{1+x^2}} =\operatorname{arccot}\frac 1x \\\\

\operatorname{arccot}x&=\pi-\operatorname{arccot}(-x) =\frac\pi2-\arctan x =\arccos \frac x{\sqrt{1+x^2}}\\
&(\text{if }x>0,)=\arcsin\frac1{\sqrt{1+x^2}} =\arctan\frac 1x 

\end{align}
$$
**反三角函数的二倍**
$$
\begin{array}{rll}

2\arcsin x
&=\arcsin(2x\sqrt{1-x^2}) &\big(|x|\le\frac{\sqrt{2}}{ 2}\big)\\ 
&=\pi-\arcsin(2x\sqrt{1-x^2}) &\big(\frac{\sqrt2}2<x\le1\big)\\ 
&=-\pi-\arcsin(2x\sqrt{1-x^2}) &\big(-1\le x<-\frac{\sqrt2}2\big)\\\\

2\arccos x
&=\arccos(2x^2-1) &(0\le x\le 1)\\ 
&=2\pi-\arccos(2x^2-1) &(-1\le x<0)\\\\

2\arctan x
&\displaystyle=\arctan\frac{2x}{1-x^2} &(|x|<1)\\ 
&\displaystyle=\pi+\arctan\frac{2x}{1-x^2} &(|x|>1)\\ 
&\displaystyle=-\pi+\arctan\frac{2x}{1-x^2} &(x<-1)

\end{array}
$$
**反三角函数的和差**
$$
\begin{array}{rll} 

\arcsin x+\arcsin y&=\arcsin(x\sqrt{1-y^2}+y\sqrt{1-x^2}) &(xy\le0 ~~~\or~~~ x^2+y^2\le1)\\

&=\pi-\arcsin(x\sqrt{1-y^2}+y\sqrt{1-x^2}) &(x>0,y>0,x^2+y^2>1)\\ 

&=-\pi-\arcsin(x\sqrt{1-y^2}+y\sqrt{1-x^2}) &(x<0,y<0,x^2+y^2>1)\\\\

\arcsin x-\arcsin y&=\arcsin(x\sqrt{1-y^2}-y\sqrt{1-x^2}) &(xy\ge0 ~~~\or~~~ x^2+y^2\le1)\\ 
&=\pi-\arcsin(x\sqrt{1-y^2}-y\sqrt{1-x^2}) &(x>0,y<0,x^2+y^2>1)\\ 
&=-\pi-\arcsin(x\sqrt{1-y^2}-y\sqrt{1-x^2}) &(x<0,y>0,x^2+y^2>1)\\ 

\\\hline\\

\arccos x+\arccos y&=\arccos[xy-\sqrt{(1-x^2)(1-y^2})] &(x+y\ge0)\\
&=2\pi-\arccos[xy-\sqrt{(1-x^2)(1-y^2})] &(x+y<0)\\\\

\arccos x-\arccos y&=-\arccos[xy+\sqrt{(1-x^2)(1-y^2})] &(x\ge y)\\ 
&=\arccos[xy+\sqrt{(1-x^2)(1-y^2})] &(x<y)\\

\\\hline\\

\arctan x+\arctan y
&\displaystyle=\arctan\frac{x+y}{1-xy} &(xy<1)\\
&\displaystyle=\pi+\arctan\frac{x+y}{1-xy} &(x>0,~~xy>1)\\ 
&\displaystyle=-\pi+\arctan\frac{x+y}{1-xy} &(x<0,~~xy>1)\\

\displaystyle\arctan x-\arctan y
&\displaystyle=\arctan\frac{x-y}{1+xy} &(xy>-1)\\ 
&\displaystyle=\pi+\arctan\frac{x-y}{1+xy} &(x>0,~~xy<-1)\\ 
&\displaystyle=-\pi+\arctan\frac{x-y}{1+xy} &(x<0,~~xy<-1)\\

\\\hline

\end{array}
$$
**余弦反余弦复合的重要关系**
$$
\cos(n\arccos x)=\frac{(x+\sqrt{x^2-1})^n+(x-\sqrt{x^2-1})^n}2\quad(n\ge 1)
$$


#### $$\S0.1.4~~~$$双曲函数

（课本P12）



<div style="page-break-after:always;"></div>







<div style="page-break-after:always;"></div>

### $$\S0.2~~~$$公式区

#### $$\S0.2.1~~~$$微积分

**幂指对**
$$
\begin{array}{ccc} 
\hline

\displaystyle\int_{}^{}{f(x)\mathrm{d}x}& f(x) & f^\prime(x)\\ 

\hline

\left\{
\begin{array}{ll}
\cfrac{ x^{k+1}}{k+1}+C, & \text{if }k\ne-1 \\
\ln\left|x\right|+C, & \text{if }k=-1
\end{array}\right.

& x^{k} & kx^{k-1} \\ 

\displaystyle\frac{a^{x}}{\ln a}+C & a^{x} & a^{x}\ln a \\ 

\displaystyle\frac{1}{\ln a} x(\ln x-1)+C & \log_{a}x & \displaystyle\frac{1}{x\ln a}\\ 

\hline
\end{array}
$$
**三角函数荟萃**
$$
\begin{array}{ccc} 
\hline

\displaystyle\int_{}^{}{f(x)\mathrm{d}x}& f(x) & f^\prime(x)\\ 

\hline

-\cos x +C& \sin x & \cos x\\ 
\sin x +C& \cos x & -\sin x\\ 
\ln{|\csc x-\cot x|}+C & \csc x & -\csc x\cot x\\ 
\ln{|\sec x+\tan x|}+C & \sec x & \sec x\tan x \\ 
\ln{|\sec x|}+C=-\ln{|\cos x|}+C & \tan x & \sec^2x \\ 
-\ln{|\csc x|}+C=\ln{|\sin x|}+C & \cot x & -\csc^2x \\ 

\hline

\cfrac{1}{4}(2x+\sin{2x})+C & \cos^2x & -\sin{2x} \\
\cfrac{1}{4}(2x-\sin{2x})+C & \sin^2x & \sin{2x} \\

\hline

x\arcsin x+\sqrt{1-x^2}+C & \arcsin x & \cfrac{1}{\sqrt{1-x^2}} \\ 
x\arccos x-\sqrt{1-x^2}+C & \arccos x & \cfrac{-1}{\sqrt{1-x^2}} \\ 
x\arctan x-\cfrac{1}{2}\ln{|x^2+1|}+C & \arctan x & \cfrac{1}{1+x^2} \\ 

\hline
\end{array}
$$
**其它**
$$
\begin{align}

&\int_{}^{}\frac{\mathrm dx}{\sqrt{x^2+1}}=\ln\left(x+\sqrt{x^2+1}\right)+C=\operatorname{arcsinh}{x}+C \\
&\int_{}^{}\frac{\mathrm dx}{\sqrt{x^2-1}}=\ln\left(x+\sqrt{x^2-1}\right)+C=\operatorname{arcsinh}{x}+C \\
&\int_{}^{}\frac{\mathrm dx}{1-x^2}=\frac{1}{2}\ln\frac{1+x}{1-x} +C=\operatorname{arctanh}{x}+C 

\end{align}
$$


<div style="page-break-after:always;"></div>

**点火公式**（华里士公式，简称 “华莱式”）
$$
\begin{array}{cl}

\text{ORG}
&\displaystyle\int_{0}^{\frac{\pi}{2}}{\sin^nx\mathrm{d}x}
&\displaystyle=\int_{0}^{\frac{\pi}{2}}{\cos^nx\mathrm{d}x}
&\displaystyle=\left\{
\begin{array}{ll}
\cfrac{(n-1)!!}{n!!} & n\text{ is odd.}\\
\cfrac{(n-1)!!}{n!!} \cdot \cfrac{\pi}{2} & n\text{ is even.}
\end{array}\right.\\

\text{I}
&\displaystyle\int_{0}^{\pi}{\sin^nx\mathrm{d}x}
&\displaystyle=2\int_{0}^{\frac{\pi}{2}}{\sin^nx\mathrm{d}x}
&\displaystyle=\left\{
\begin{array}{ll}
2\cdot\cfrac{(n-1)!!}{n!!} & n\text{ is odd.}\\
2\cdot\cfrac{(n-1)!!}{n!!} \cdot \cfrac{\pi}{2} & n\text{ is even.}
\end{array}\right. \\

\text{II}
&\displaystyle\int_{0}^{\pi}{\cos^nx\mathrm{d}x}
&&\displaystyle=\left\{
\begin{array}{ll}0 & n\text{ is odd.}\\
2\cdot\cfrac{(n-1)!!}{n!!} \cdot \cfrac{\pi}{2} & n\text{ is even.}
\end{array}\right. \\

\text{III}
&\displaystyle\int_{0}^{2\pi}{\sin^nx\mathrm{d}x}
&\displaystyle=\int_{0}^{2\pi}{\cos^nx\mathrm{d}x}
&=\displaystyle\left\{
\begin{array}{ll}0 & n\text{ is odd.}\\
4\cdot\cfrac{(n-1)!!}{n!!} \cdot \cfrac{\pi}{2} & n\text{ is even.} 
\end{array}\right.

\end{array}
$$

**高阶导数**
$$
\left[\text{Leibniz formula}\right]\qquad\begin{align}

(u v)^{(n)}&=\sum_{k=0}^{n} C_{n}^{k} u^{(n-k)} v^{(k)}\\
&=uv^{(n)}+C_n^1u^{'}v^{(n-1)}+\cdots+C_n^{n-1}u^{(n-1)}v^{'}+u^{(n)}v \\

\end{align}
$$

$$
\begin{array}{cc}
\hline
\displaystyle f(x) & f^{\left( n \right)}(x)\\ 
\hline

a^x & a^x\ln ^na \\
e^x & e^x \\

\hline

x^{\mu} & \mu \left( \mu -1 \right) \cdots \left( \mu -n+1 \right) x^{\mu -n} \\
x^{n} & n! \\
x^{-1} & (-1)^n\cfrac{n!}{x^{n+1}}\\
\cfrac{1}{x+a} 
& \displaystyle\cfrac{(-1)^nn!}{(x+a)^{n+1}} \\
\bold{\cfrac{1}{kx+b}}
& \bold{\displaystyle{\cfrac{(-1)^{n}k^{n}n!}{(kx+b)^{n+1}}}} \\

\hline

\log _ax
& \displaystyle\frac{\left( -1 \right) ^{n-1}\left( n-1 \right) !}{x^n\ln a} \\
\ln(kx+b)
& \displaystyle\cfrac{(-1)^{n-1}k^n(n-1)!}{(kx+b)^{n}} \\

\hline

\sin \left( kx+a \right) & \displaystyle k^n\sin \left( kx+a+\frac{n\pi}{2} \right) \\

\cos \left( kx+a \right) & \displaystyle k^n\cos \left( kx+a+\frac{n\pi}{2} \right) \\

\hline
\end{array}
$$




<div style="page-break-after:always;"></div>

**定积分**

区间再现公式 ：$$\displaystyle\int_{a}^{b}{f(x)\mathrm{d}x}=\int_{a}^{b}{f(a+b-x)\mathrm{d}x}$$

增强版区间再现公式：$$\displaystyle\int_{a}^{b}{f(x)\mathrm{d}x}=\int_{a}^{\frac{a+b}{2}}{f(x)+f(a+b-x)\mathrm{d}x}=\int_{\frac{a+b}{2}}^{b}{f(x)+f(a+b-x)\mathrm{d}x}$$

更强的区间再现公式：设 $$f(x),~g(x)$$ 为 $$[a,b]$$ 上的连续函数，若 $$f(x)=f(a+b-x),~g(x)+g(a+b-x)=m$$，其中 $$m$$ 为常数，则有 $$\displaystyle\int_{a}^{b}f(x)g(x)\mathrm{d}x=\frac{m}{2}\int_{a}^{b}f(x)\mathrm{d}x$$

扩展的定积分公式：
$$
\begin{align}

& \int_{0}^{\pi}{xf(\sin x)}\mathrm{d}x = \frac{\pi}{2}\int_{0}^{\pi}{f(\sin x)}\mathrm{d}x = \pi\int_{0}^{\frac{\pi}{2}}{f(\sin x)}\mathrm{d}x \\

&\int_{0}^{\frac{\pi}{2}}{f(\sin x)}\mathrm{d}x = \int_{0}^{\frac{\pi}{2}}{f(\cos x)}\mathrm{d}x \\

&\int_{0}^{\frac{\pi}{2}}{f(\sin x,\cos x)}\mathrm{d}x = \int_{0}^{\frac{\pi}{2}}{f(\cos x,\sin x)}\mathrm{d}x \\

&\int_{a}^{b}{f(x)}\mathrm{d}x = \int_{-\frac{\pi}{2}}^{\frac{\pi}{2}}{f\left(\frac{a+b}{2}+\frac{b-a}{2}\sin x\right)}\cdot\frac{b-a}{2}\cos x\mathrm{d}x = \int_{0}^{1}{(b-a)f[a+(b-a)x]}\mathrm{d}x\\

&\int_{-a}^{a}{f(x)}\mathrm{d}x = \int_{0}^{a}{f(x)+f(-x)}\mathrm{d}x\\ 

\end{align}
$$



<div style="page-break-after:always;"></div>

