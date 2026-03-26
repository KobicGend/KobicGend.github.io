---
header: ${pageNo} / ${totalPages}                                                                        Linear Algebra - Notes                                                    written by XiaoMing

footer:
---

# 线性代数 Linear Algebra<img src=".\data\dog.jpg" alt="dog" style="zoom:8%;" />

​		您正在阅读的是 “ **精简版 **”，仅包括重要定义和定理，如果需要定理证明、典型例题习题或解题方法，请查看另一个文件．



**写在前面**

​		这是一本笔记．

​		基于王然老师在中国传媒大学通信工程专业的讲座，和同济大学数学科学学院编写的《工程数学　线性代数》（第七版）．

​		这本笔记是自己在学习中对于线代的一些不成熟的理解 ~ 我尝试将例题和习题与书本的定义定理相联系，纵向深入、横向拓展，厘清它的脉络．此外，我尽可能地减少了大段文字叙述，取而代之的是分点叙述和富有建筑美的证明（嗯？

​		~~别再因为线代割腕了 /大笑！~~ 希望你们能从另一个视角感受线代的美，并享受这个令人惊叹的学科，祝愿你们在追寻人类历史上最伟大的智力冒险时一帆风顺！

​		在此特别感谢王然老师和我的班主任张莉老师 :D

​		最后，送每个读者一个四叶草🍀，祝期末考试顺利 ~ 

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

<div style="page-break-after:always;"></div>

**更新历史**

5.0.0　　2024 年 01 月 08 日　　最终版．撒花！
4.0.0　　2024 年 01 月 07 日　　新增第二、三章．核心内容完结！
3.0.0　　2023 年 12 月 25 日　　口语考试结束！新增第一章．
2.0.2　　2023 年 12 月 21 日　　勘误．
2.0.1　　2023 年 12 月 16 日　　$$\LaTeX$$ 格式修订，将 $$\le$$ 修改为 $$\leqslant$$，将 $$A^T$$ 修改为 $$A^\mathrm T$$，将 $$\text{diag}$$ 修改为 $$\operatorname{diag}$$，将“。”修改为“．”．
2.0.0　　2023 年 12 月 12 日　　新增第五章，完善第四章剩余的内容．
1.1.0　　2023 年 12 月 11 日　　增补少量内容．修改了前言．
1.0.0　　2023 年 12 月 07 日　　发布．



**目录**

[TOC]

<div style="page-break-after:always;"></div>

## 第〇章　线性方程组

> 线性方程组贯穿于整个线性代数，是线性代数的重要内容，主要包括线性方程的有解判别准则、求解方法和解的结构．因此，我们单独将其列为一章．

### 0.1　非齐次线性方程组和齐次线性方程组

**$$\pmb{n}$$ 元线性方程组** 设有 $$n$$ 个未知数 $$m$$ 个方程的线性方程组 $$\begin{cases} a_{11}x_{1} + a_{12}x_{2} + \cdots + a_{1n}x_{n} = b_{1} \\ a_{21}x_{1} + a_{22}x_{2} + \cdots + a_{2n}x_{n} = b_{2} \\ \cdots\cdots \\ a_{m1}x_{1} + a_{m2}x_{2} + \cdots + a_{mn}x_{n} = b_{m} \end{cases}$$，当常数项 $$\sum b_{i}^2\ne0$$ 时，称该方程组为 $$n$$ 元非齐次线性方程组，否则称为 $$n$$ 元齐次线性方程组．

非齐次线性方程组的系数矩阵、未知数矩阵和常数项矩阵、增广矩阵．


### 0.2　克拉默法则

**克拉默法则** 如果线性方程组 $$\begin{cases} a_{11}x_{1} + a_{12}x_{2} + \cdots = b_{1} \\ a_{21}x_{1} + a_{22}x_{2} + \cdots = b_{2} \\ \cdots\cdots\cdots\cdots \\ a_{n1}x_{1} + a_{n2}x_{2} + \cdots = b_{n} \\ \end{cases}$$ 的系数矩阵 $$\pmb A$$ 的行列式不等于零，即 $$\left\lvert\pmb  A \right\rvert = \begin{vmatrix} a_{11} & \cdots & a_{1n} \\ \vdots & & \vdots \\ a_{n1} & \cdots & a_{nn} \\ \end{vmatrix} \ne 0$$，则该方程组有惟一解 $$\displaystyle x_{i} = \frac{\left\lvert\pmb  A_{i} \right\rvert}{\left\lvert\pmb  A \right\rvert}$$，其中 $$\pmb A_{i} = \begin{pmatrix} a_{11} & \cdots & a_{1, i - 1} & b_{1} & a_{1, i + 1} & \cdots & a_{1n} \\ \vdots & & \vdots & \vdots & \vdots & & \vdots \\ a_{n1} & \cdots & a_{n, i - 1} & b_{n} & a_{n, i + 1} & \cdots & a_{nn} \\ \end{pmatrix} $$．

### 0.3　线性方程组解的判定

**$$\pmb n$$ 元齐次线性方程组解的判定** $$n$$ 元齐次线性方程组 $$\pmb{Ax}=\pmb{O}$$ 解的情况如下：

- 有非零解的充分必要条件是 $$R(\pmb A)<n$$ ，即 $$| \pmb A | = 0$$
- 只有零解的充分必要条件是 $$R(\pmb A)=n$$ ，即 $$|\pmb A|\ne0$$

**$$\pmb n$$ 元非齐次线性方程组解的判定** $$n$$ 元非齐次线性方程组 $$\pmb{Ax}=\pmb{b}$$ 解的情况如下：

- 无解的充分必要条件是 $$R(\pmb A)<R(\pmb A,\pmb b)$$
- 有解的充分必要条件是 $$R(\pmb A)=R(\pmb A,\pmb b)$$ ，其中
  - 有惟一解的充分必要条件是 $$R(\pmb A)=R(\pmb A,\pmb b)=n$$
  - 有无穷多解的充分必要条件是 $$R(\pmb A)=R(\pmb A,\pmb b)<n$$


**矩阵方程解的判定** 矩阵方程 $$\pmb{AX}=\pmb{B}$$ 解的情况如下：

- 无解的充分必要条件是 $$R(\pmb A)<R(\pmb A,\pmb B)$$
- 有解的充分必要条件是 $$R(\pmb A)=R(\pmb A,\pmb B)$$

### 0.4　利用基础解系求解线性方程组

【$$\mathscr{Thm4.7}$$】设 $$R(\pmb A_{m\times n})=r$$，齐次线性方程组的解空间 $$S=\left\{\pmb x \mid\pmb{Ax}=\pmb O\right\}$$ 的一个基称为 **基础解系**．进而，解空间可表示为 $$S=\left\{c_1\xi_1+c_2\xi_2+\dots+c_{n-r}\xi_{n-r}\mid c_1,c_2,\dots,c_{n-r} \in\mathbb{R}\right\}$$，即 $$\dim S=n-r$$．而非齐次线性方程组的解集不是向量空间．

<div style="page-break-after:always;"></div>

## 第一章    行列式

本章所有证明从略，部分定义（已加粗）从略，请参见课本．

### 1.1    行列式的定义

【$$\mathscr{Def1.1}$$】设 $$n$$ 个元素为 $$1$$ 到 $$n$$ 这 $$n$$ 个自然数，并规定由大到小为标准次序．设 $$p_1p_2\dots p_n$$ 为这 $$n$$ 个自然数的一个排列，$$p_i(i=1,2,\dots,n)$$ 这个元素的 **逆序数** 是比 $$p_i$$ 大的且排在 $$p_i$$ 前面的元素个数 $$t_i$$．整个排列的逆序数 $$t(p_1p_2\dots p_n)=\sum_{t=1}^nt_i$$．若排列的逆序数是一个偶数，则称之为 **偶排列**；若是奇数，则称之为 **奇排列**．

*【$$\mathscr{Thm1.1}$$】**对换** 改变排列的奇偶性．排列经过奇数次对换其奇偶性发生改变，经过偶数次对换其奇偶性不变．当 $$n≥2$$ 时，在 $$n$$ 阶排列中，奇偶排列数目相等，即各有 $$\frac{n!}2$$ 个．*

【$$\mathscr{Def1.2}$$】**$$n$$ 阶行列式**：$$A = \det(a_{ij}) = \sum_{\left(p_{1}, \cdots, p_{n}\right) \in S_{n}}(-1)^{t\left(p_{1}, \cdots, p_{n}\right)} a_{p_{1} 1} a_{p_{2} 2} \cdots a_{p_{n} n}$$．

### 1.2    行列式的性质和计算方法之一

1. **上(下)三角行列式** 和 **对角行列式** 的值等于其 **主对角线** 上元素之积．

   而 *副对角的上(下)三角行列式* 和 *副对角行列式* 的值除了 **副对角线** 上元素之积外，需乘上 $$(-1)^{t\left(n(n-1)\dots1\right)} = (-1)^{C_n^2}$$．

2. $$A=A^\mathrm T$$（**转置**），值不变．这表明，行列式的行和列地位同等．

3. $$r_i\leftrightarrow r_j$$（对换两行），值变号．

   推论：某一行全为零，值等于零．

4. $$r_i\times k$$（某一行乘常数），值 $$\times k$$（乘这个常数）．

   推论：某两行成比例，值等于零．

5. $$r_j+k r_i$$（某一行乘常数后加到另一行上去），值不变．

6. 分解，如：$$\left|\begin{array}{cc} a+x & c+z \\ b+y & d+w \end{array}\right| = \left|\begin{array}{cc} a & c+z \\ b & d+w \end{array}\right| + \left|\begin{array}{cc} a+x & c \\ b+y & d \end{array}\right| \ne \left|\begin{array}{cc} a & c \\ b & d \end{array}\right| + \left|\begin{array}{cc} x & z \\ y & w \end{array}\right|$$

我们总能利用上述性质 5 将行列式化为上三角行列式，从而利用性质 1 计算出行列式的值．

### 1.3    行列式的逆归定义（按行(列)展开法则）和计算方法之二

元素 $$a_{ij}$$ 的 **余子式** $$M_{ij}$$：由行列式 $$A$$ 中划去第 $$i$$ 行 $$j$$ 列后剩下的 $$n-1$$ 阶行列式．

元素 $$a_{ij}$$ 的 **代数余子式** $$A_{ij}=(-1)^{i+j}M_{ij}$$．

【$$\mathscr{Thm1.2}$$】行列式按行(列)展开法则：$$A = \sum_{k=1}^n a_{ik}A_{ik},1\leqslant i\leqslant n$$，以及 $$\sum_{k=1}^n a_{ik}A_{jk}=0,i\ne j$$．合起来即 $$\sum_{k=1}^n a_{ik}A_{jk}=A\delta_{ij}$$，其中 $$\delta_{ij}=\left\{ \begin{array}{lr} 1, &i=j \\ 0, & i\ne j \end{array} \right.$$ ．

通过从某一行或某一列将行列式展开可以减低行列式的阶数，但如果不进行一定的初等变换会计算多个行列式并不能简化计算，所以在展开行列式时应当先进行一定的化简．

### 1.4    例题

> *这一节分两部分：第一部分介绍了一些特殊行列式的求法，如范德蒙德行列式、箭形行列式；第二部分是一般行列式的求值方法．*
> *考虑到咱们学习的是工科数学以及本笔记的功能，此部分从略．*
> *有兴趣的读者可以 <a href="#线性代数 Linear Algebra">联系我们</a> 获取 ~*

<div style="page-break-after:always;"></div>

## 第二章　矩阵（上）

### 2.1　矩阵

【$$\mathscr{Def2.1}$$】**矩阵** 由 $$m \times n$$ 个数 $$a_{ij}$$ 排成的 $$m$$ 行 $$n$$ 列的数表称为 $$m \times n$$ 矩阵，记作 $$\pmb{A}=(a_{ij})$$，其中 $$a_{ij}$$ 称为矩阵的 $$(m,n)$$ 元．

**同型矩阵** 两个矩阵的行数相等、列数相等时．

**相等矩阵** 对应元素相等的同型矩阵．

**实(复)矩阵** 元素是实(复)数的矩阵．

**零矩阵** 元素全为零的矩阵，记作 $$\pmb{O}$$．不同型的零矩阵不相等．

**行(列)矩阵** 只有一行(列)的矩阵，也称行(列)向量．

**$$n$$ 阶方阵** 当 $$m = n$$ 时的矩阵，即 $$n \times n$$ 矩阵．

**对角矩阵** 主对角线的元素不全为 $$0$$，且除主对角线之外其他元素都为 $$0$$ 的方阵，记作 $$\pmb{\Lambda} = \mathrm{diag}(\lambda_{1},~\lambda_{2},~\dots,~\lambda_{n})$$．

**纯量矩阵** 对角矩阵 $$\mathrm{diag}(\lambda,~\lambda,~\dots,~\lambda)$$．

**单位矩阵** 对角矩阵 $$\mathrm{diag}(1,~1,~\dots,~1)$$ 叫做 $$n$$ 阶单位矩阵，记作 $$\pmb{E}_{n}$$．

### 2.2　矩阵的运算

【$$\mathscr{Def2.5}$$】**矩阵转置** 矩阵 $$\pmb{A} = (a_{ij})_{m \times n}$$ 的转置矩阵为 $$\pmb{A}^\mathrm{T} = (a_{ji})_{n \times m}$$．矩阵转置满足对加法的分配律，以及 $$(\pmb{AB})^\mathrm{T} = \pmb{B}^\mathrm{T}\pmb{A}^\mathrm{T}$$．

【$$\mathscr{Def2.2}$$】**矩阵加法** 同型矩阵的对应元素相加．矩阵加法满足交换律和结合律．另定义 **负矩阵** 和 **矩阵减法**．

【$$\mathscr{Def2.3}$$】**矩阵数乘** 对矩阵的每个元素作乘法．矩阵数乘满足结合律、对数的分配律和对矩阵的分配律．

【$$\mathscr{Def2.4}$$】**矩阵乘法** 对于 $$m \times s$$ 矩阵 $$\pmb{A}$$ 和 $$s \times n$$ 矩阵 $$\pmb{B}$$ ，它们的乘法定义为 $$\pmb{C} = \pmb{AB} = (c_{ij})_{m \times n}$$ ，其中 $$c_{ij} = \sum_{k = 1}^{s}a_{ik}b_{kj}$$．矩阵乘法满足结合律和对矩阵的分配律．值得注意的是，它一般并不满足交换律，即 $$\pmb{A}\pmb{B} \ne \pmb{B}\pmb{A}$$．

此外，矩阵乘法一般不满足消去律；两个矩阵的乘积如果是零矩阵，这两个矩阵不一定是零矩阵，也即如果两个矩阵 $$\pmb{A},~\pmb{B}$$ 满足 $$\pmb{AB}=\pmb{O}$$，不一定能推出 $$\pmb{A}=\pmb{O}$$ 或 $$\pmb{B}=\pmb{O}$$ ．

> 这里给出两个特例：
>
> - 若 $$\pmb{A}^\mathrm{T}\pmb{A}=\pmb{O}$$，则 $$\pmb{A}=\pmb{O}$$．（例 2.19）
>
> - 若 $$\pmb{AB}=\pmb{O}$$，且 $$\pmb{B}$$ 是列满秩矩阵，则 $$\pmb{A}=\pmb{O}$$．（例 3.9）
>

行向量与列向量的相乘是一个数（即一阶矩阵），列向量与行向量的乘积是一个矩阵．

【$$\mathscr{Def2.6}$$】**方阵的行列式**  $$n$$ 阶方阵 $$\pmb{A}$$ 的行列式 $$| \pmb{A} |$$ 是由方阵 $$\pmb{A}$$ 的元素所构成的行列式．方阵的行列式满足：$$| \pmb{A}^\mathrm{T} | = | \pmb{A} |,~ \boxed{| \lambda\pmb{A} | = \lambda^{n} | \pmb{A} |},~ | \pmb{A}\pmb{B} | = | \pmb{A} || \pmb{B} |$$，推论有 $$| \pmb{A}\pmb{B} | = | \pmb{B}\pmb{A} |,~| \pmb{A}^{k} | = | \pmb{A} |^{k}$$．

### 2.3　伴随矩阵和逆矩阵

**伴随矩阵** 行列式 $$| \pmb{A} |$$ 的各个元素的代数余子式 $$A_{ij}$$ 所构成的矩阵 $$\pmb{A}^{*} = \begin{pmatrix} A_{11} & A_{21} & \cdots & A_{n1} \\ A_{12} & A_{22} & \cdots & A_{n2} \\ \vdots & \vdots & \ddots & \vdots \\ A_{1n} & A_{2n} & \cdots & A_{nn} \\ \end{pmatrix}$$．

【$$\mathscr{Def2.7}$$】**矩阵的逆** 六种等价表述：$$n$$ 阶方阵 $$\pmb{A}$$ 可逆，也就是 $$\pmb{A}^{-1}$$ 存在
$$
\begin {array}{rll}

\iff&
\exists \pmb{B}_{n \times n},~~\text{s.t.}~\pmb{A}\pmb{B} = \pmb{B}\pmb{A} = \pmb{E} 
& (定义) \\

\iff&
| \pmb{A} | \ne 0 
& (非奇异) \\

\iff&
\pmb{A} \sim \pmb{E} 
& (与单位阵等价) \\

\iff&
R(\pmb{A}) = n 
& (满秩) \\


\end {array}
$$
方阵 $$\pmb{A}$$ 和它的伴随矩阵、逆矩阵（如果存在）满足

$$
\begin{align}

(1)~~& (\pmb{A}^{-1})^{-1} = \pmb{A} \\

(2)~~& (\lambda \pmb{A})^{-1} = \lambda^{-1}\pmb{A}^{-1} \\

(3)~~& (\pmb{A}\pmb{B})^{-1} = \pmb{B}^{-1}\pmb{A}^{-1} \\

(4)~~& \pmb{A}\pmb{A}^{*} = \pmb{A}^{*}\pmb{A} = |\pmb{A}|\pmb{E} \\

(5)~~& \pmb{A}^{-1} = \frac{1}{| \pmb{A} |}\pmb{A}^{*} \\

(6)~~& \boxed{\displaystyle(\pmb{A}^{*})^{-1} = (\pmb{A}^{-1})^{*} = \frac{1}{|\pmb{A}|}\pmb{A}} \\

(7)~~& \boxed{\displaystyle|\pmb{A}^{*}| = |\pmb{A}|^{n-1}}


\end{align}
$$

特殊矩阵的逆
$$
\begin {align}

&
\pmb{A}=\begin{pmatrix}a & b\\c & d\end{pmatrix} 
\Rightarrow
\pmb{A}^{-1}=\cfrac{1}{ad-cb}\begin{pmatrix}d &-b\\-c & a\end{pmatrix} \\

& \pmb{E}^{-1} = \pmb{E} \\

&
\pmb{\Lambda} = \mathrm{diag}(\lambda_{1},\lambda_{2},\dots,\lambda_{n})
\Rightarrow
\pmb{\Lambda}^{-1} = \mathrm{diag}(\lambda_{1}^{-1},\lambda_{2}^{-1},\dots\lambda_{n}^{-1})


\end {align}
$$

<div style="page-break-after:always;"></div>

## 第三章　矩阵（下）

### 3.1　矩阵的初等变换

【$$\mathscr{Def3.1}$$】**矩阵的初等行变换**：

- $$r_i\leftrightarrow r_j$$（对调两行）
- $$r_i\times k~~(k\neq0)$$（以某数乘某一行中的所有元素）
- $$r_i + kr_j$$（把某一行所有元素乘某个数再加到另一行对应的元素上去）

把行换成列称为矩阵的初等列变换，它们二者均是初等变换．

【$$\mathscr{Thm3.1}$$】经过初等变换的矩阵便不再是原来的矩阵，但新矩阵与原矩阵 **等价**，记作 $$\pmb{A}\sim \pmb{B}$$．矩阵等价满足反身性、对称性、传递性．设 $$\pmb{A}$$ 与 $$\pmb{B}$$ 为 $$m \times n$$ 矩阵，那么
$$
\begin{align}

\pmb{A} \overset{r}{\sim} \pmb{B} 
&\iff 
\exists \pmb{P} = (p_{ij})_{m \times m},~|\pmb{P}| \ne 0 ~~ s.t.~\pmb{P}\pmb{A}=\pmb{B} \\

\pmb{A} \overset{r}{\sim} \pmb{B} 
&\iff
\exists \pmb{Q} = (q_{ij})_{n \times n},~|\pmb{Q}| \ne 0 ~~ s.t.~\pmb{A}\pmb{Q}=\pmb{B} \\

\pmb{A} \sim \pmb{B} 
&\iff
\exists \pmb{P} = (p_{ij})_{m \times m},~ \pmb{Q} = (q_{ij})_{n \times n},~ |\pmb{P}| \ne 0,~ |\pmb{Q}| \ne 0 ~~ s.t.~ \pmb{PAQ}=\pmb{B}

\end{align}
$$
【$$\mathscr{Def3.2}$$】任意 矩阵 $$\pmb{A}=(a_{ij})_{m\times n}$$ 都与 **行阶梯形矩阵**、**行最简形矩阵** 行等价，与 **标准形** $$\pmb{F}=\begin{pmatrix} \pmb{E_r}&\pmb{0}\\ \pmb{0}&\pmb{0}\end{pmatrix} $$ 等价．

【$$\mathscr{Def3.3}$$】**初等矩阵** 对矩阵的初等行(列)变换可以看成左(右)乘一个特殊矩阵，而这六种初等变换对应的三种特殊矩阵就称为 初等矩阵．初等矩阵指的是单位矩阵 $$\pmb{E}$$ 经一次初等变换得到的矩阵，分别记作 $$\pmb{E}_{ij},~\pmb{E}_i(k),~\pmb{E}_{ij}(k)$$．其逆阵显然也是初等矩阵，且 $$\pmb{E}_{ij}^{-1}=\pmb{E}_{ij}$$，$$\pmb{E}_i^{-1}=\pmb{E}_i(\frac{1}{k})$$，$$\pmb{E}_{ij}^{-1}(k)=\pmb{E}_{ij}(-k)$$．初等矩阵的行列式均等于 $$1$$．对 $$m\times n$$ 矩阵 $$\pmb{A}$$ ，作一次初等行(列)变换，等价于一个对应的 $$m(n)$$ 阶初等矩阵左(右)乘矩阵 $$\pmb{A}$$．

### 3.2　矩阵的秩

【$$\mathscr{Def3.4}$$】**子式** 在 $$m \times n$$ 矩阵 $$\pmb{A}$$ 中，任取 $$k$$ 行 $$k$$ 列，位于这些行列交叉处的 $$k^{2}$$ 个元素，不改变它们在 $$\pmb A$$ 中所处的位置次序而得的 $$k$$ 阶行列式．

【$$\mathscr{Def3.5}$$】**秩** 若矩阵 $$\pmb A$$ 中存在一个不为零的 $$r$$ 阶子式，且所有 $$r+1$$ 阶子式全为零，那么数 $$r$$ 称为矩阵 $$\pmb A$$ 的秩，记作 $$R(\pmb A)$$，简言之，即矩阵的最高阶非零子式的阶数，也即非零子式的最高阶数．规定零矩阵的秩为 $$0$$．

矩阵的秩的性质：
$$
\begin{align}

(1)~& R(\pmb{E}_n)=n \\
(2)~& 0\leqslant R(\pmb A_{m \times n})\leqslant\min\{m,n\} \\
(3)~& R(\pmb A^\mathrm T) = R(\pmb A) \\
(4)~& \pmb A\sim\pmb B \Longrightarrow R(\pmb A)=R(\pmb B) \\
(5)~& |\pmb P|\ne0,~|\pmb Q|\ne0 \Longrightarrow R(\pmb{PAQ})=R(\pmb{A}) \\
(6)~& \max\{R(\pmb A),R(\pmb B)\}\leqslant R(\pmb A,\pmb B)\leqslant R(\pmb A)+R(\pmb B) \\
(7)~& R(\pmb A+\pmb B)\leqslant R(\pmb A)+R(\pmb B) \\
(8)~& R(\pmb{AB})\leqslant\min\{R(\pmb A),R(\pmb B)\} \\
(9)~& \pmb{A}_{m \times n}\pmb{B}_{n \times l}=\pmb O \Longrightarrow R(\pmb A)+R(\pmb B) \leqslant n

\end{align}
$$

<div style="page-break-after:always;"></div>

## 第四章　向量组

### 4.1	向量组

【$$\mathscr{Def4.1}$$】**$$n$$ 维向量**： $$n$$ 个有次序的数 $$a_1,a_2,\dots,a_n$$ 所组成的数组 $$a=\left(a_{1}, a_{2}, \dots, a_{n}\right)$$ ，其中的数 $$a_i$$ 称为向量的第 $$i$$ 个 **分量**．**向量组**：若干个同 **维数** 的列向量或行向量所组成的集合．

1. 只讨论实向量，即分量全为实数的向量，另有复向量．
2. $$n$$ 维行向量和 $$n$$ 维列向量总被看作是两个不同的向量，当没有明确说明是行向量还是列向量时，都当作列向量；
3. 行向量和列向量都按照矩阵的运算法则进行运算；
4. 含有限个向量的有序向量组可以与矩阵一一对应．

### 4.2	向量组的外部关系

【$$\mathscr{Def4.1}$$】【$$\mathscr{Def4.2}$$】【$$\mathscr{Thm4.1}$$】给定向量 $$b$$ 和向量组  $$A:a_1,a_2,\dots,a_n$$ ，定义 **线性组合** 和 **线性表示**：
$$
\begin {align}

&向量𝑏是向量组𝐴的线性组合 \\

\iff& 向量 b 能由向量组 A 线性表示 \\

\iff& \exist k_1,k_2,\dots,k_n ,\quad \text{s.t.} \quad
b=k_1a_1+k_2a_2+\dots+k_na_n \\

\iff& AX=b 有解 \\

\iff& R(A) = R(A,b) \\

\end {align}
$$

1. $$k_1,k_2,\dots,k_n$$​ 为任意一组实数，称为这个线性组合的 **系数**．
2. 零向量是任何一组向量的线性组合．
3. 向量组中的任一向量 $$a_{i}$$ 都是此向量组的线性组合．

【$$\mathscr{Def4.3}$$】【$$\mathscr{Thm4.2}$$】【$$\mathscr{Thm4.3}$$】定义两向量组的 **线性表示**：
$$
\begin {align}

& 向量组 B 能由向量组 A 线性表示 \\

\iff& 向量组 B 中每个向量都能由向量组 A 线性表示 \\

\iff& \exist K, \quad \text{s.t.} \quad B=AK \\

\iff& AX=B 有解 \\

\iff& R(A,B) = R(A) \ge R(B) \\

\end {align}
$$
并定义两向量组 **等价**：
$$
\begin {align}

& 向量组 A 与向量组 B 等价 \\

\iff& A 组中每个向量能由 B 组线性表示\vee B 组中每个向量都能由 A 组线性表示 \\

\iff& A 组和 B 组能相互线性表示 \\

\iff& \exist 可逆阵 K, \quad \text{s.t.} \quad B=AK \\

\iff& R(A,B) = R(A) = R(B)

\end {align}
$$
1. 向量组 $$A$$ 与向量组 $$B$$ **行(列)等价**：向量组 $$A$$ 的行(列)向量组与向量组 $$B$$ 的行(列)向量组能相互线性表示（等价）．
2. 线性表示的 **系数矩阵**：若 $$C=AB$$ ，则矩阵 $$C$$ 的列向量组能由矩阵 $$A$$ 的列向量组线性表示， $$B$$ 为这一表示的系数矩阵；同时，矩阵 $$C$$ 的行向量组能由矩阵 $$B$$ 的行向量组线性表示， $$A$$ 为这一表示的系数矩阵．（这再一次体现了行左列右）

**$$n$$ 维单位坐标向量**： $$n$$ 维单位矩阵 $$E=(e_1,e_2,\dots,e_n)$$ 的列向量．

【命题】任何一个 $$n$$ 维向量都可以由 $$n$$ 维单位坐标向量组线性表示．

### 4.3	向量组的内部关系

【$$\mathscr{Def4.4}$$】【$$\mathscr{Thm4.4}$$】定义向量组的 **线性相关** 和 **线性无关**：

$$
\begin {align}

& 向量组 A:a_1,a_2,\dots,a_n 线性相关 \\

\iff& \exist k_1,k_2,\dots,k_n \left(\prod k_i \ne 0\right),
\quad \text{s.t.} \quad
k_1a_1+k_2a_2+\dots+k_na_n=0 \\

\iff& \exist k_1,k_2,\dots,k_n \left(\prod k_i \ne 0\right),
\quad \text{s.t.} \quad
A x=\left(\begin{array}{cccc}a_{11} & a_{12} & \ldots & a_{1 n} \\a_{21} & a_{22} & \ldots & a_{2 n} \\\vdots & \vdots && \vdots & \\a_{s 1} & a_{s 2} & \ldots & a_{s n}\end{array}\right)\left(\begin{array}{c}k_{1} \\k_{2} \\\vdots \\k_{n}\end{array}\right)=0 \\

\iff& Ax=0有非零解 \\

\iff& R(A)<n\\\\\\

& 向量组 A:a_1,a_2,\dots,a_n 线性无关 \\

\iff& \forall k_1,k_2,\dots,k_n \left(\prod k_i \ne 0\right), \quad
k_1a_1+k_2a_2+\dots+k_na_n\neq0 \\

\iff& Ax=0有且仅有零解 \\

\iff& R(A)=n \\

\end {align}
$$

1. 线性相关通常对 $$n\ge2$$ 而言．

   但 $$n=1$$ 时定义同样适用，即当 $$a=0$$ 时，线性相关；当 $$a\ne0$$ 时，线性无关．

2. 当 $$n=2$$ 时，$$a_1,a_2$$ 线性相关 $$\iff a_1,a_2$$ 对应分量成比例（$$\iff a_1,a_2$$ 共线）．

3. 零向量线性相关，包含零向量的向量组线性相关．

4. $$n$$ 维单位坐标向量组 $$E$$ 线性无关．

【**命题**】	向量组 $$A:a_1,a_2,\dots,a_n(n\ge 2)$$ 线性相关 $$\iff$$ 至少有一个向量可以由剩下的 $$n-1$$ 个向量线性表示．

【$$\mathscr{Thm4.5.1.1}$$】（部分有 $$\Rightarrow$$ 整体有）$$A_0:a_1,a_2,\dots,a_r$$ 线性相关 $$\Rightarrow A:a_1,a_2,\dots,a_r,a_{r+1}\dots,a_n$$ 线性相关
（整体无 $$\Rightarrow$$ 部分无）$$A:a_1,a_2,\dots,a_n$$ 线性无关 $$\Rightarrow A_0:a_1,a_2,\dots,a_r(r\leqslant n)$$ 线性无关

【$$\mathscr{Thm4.5.2}$$】当 $$m>n$$ 时， $$m$$ 个 $$n$$ 维向量 $$a_{1}, a_{2}, \dots, a_{m}$$ 线性相关．特别地 $$n+1$$ 个 $$n$$ 维向量线性相关．

【$$\mathscr{Thm4.5.3}$$​】（添加的关系）设 $$A:a_1,a_2,\dots,a_n$$​ 线性无关，$$B:a_1,a_2,\dots,a_n,b$$​ 线性相关，则 $$b$$​ 可以由 $$A$$​ 线性表示，且表达式惟一．

### 4.4	向量组的秩和最大无关组

考虑无限多个向量．将向量组定义中向量个数的有限性去掉，推广相关定理，以向量组的最大无关组过渡．

【$$\mathscr{Def4.5}$$】称向量组 $$A$$ 的一个部分组 $$A_0$$ 为向量组 $$A$$ 的 **最大线性无关组（最大无关组）**，当：

向量组 $$A$$ 中的 $$r$$ 个向量构成的向量组 $$A_0$$ 满足：
(1) 向量组 $$A_0$$ 线性无关；
(2) $$A$$ 中任意 $$r+1$$ 个向量都线性相关．

或

向量组 $$A$$ 的一个部分组 $$A_0$$ 满足：
(1) 向量组 $$A_0$$ 线性无关；
(2) 向量组 $$A$$ 中的任一向量都由 $$A_0$$ 线性表示．

以上两种表述等价．

向量组 $$A$$ 的 **秩**：最大无关组 $$A_0$$ 的向量个数 $$r$$ ，因此不同的最大无关组中包含的向量个数相同．

1. 规定：只含零向量的向量组没有最大无关组，它的秩为 $$0$$ ．

2. 向量组的最大无关组一般不惟一．

3. 线性无关的向量组的最大无关组是其本身．

4. 向量组的最大无关组与原向量组等价，借此把无限化为有限的问题．


【$$\mathscr{Thm4.6}$$】矩阵的秩等于它的 **行秩**，也等于它的 **列秩**．

推论：设矩阵 $$𝐴$$ 的某个 $$r$$ 阶子式 $$D_r$$ 是 $$𝐴$$ 的最高阶非零子式，则 $$D_r$$ 所在的 $$r$$ 个行向量即是 $$𝐴$$ 的行向量组的一个最大无关组；$$D_r$$ 所在的 $$r$$ 个列向量即是 $$𝐴$$ 的列向量组的一个最大无关组．

### 4.5	向量空间

【$$\mathscr{Def4.6}$$】集合 $$V$$ 为 **向量空间**，当满足：(1) $$V$$ 为 $$n$$ 维向量的集合；(2) $$V$$ 非空；(3) $$V$$​ 对于加法和数乘两种运算封闭．

$$n$$ 维向量空间 $$\mathbb{R}^n = \left\{x=\left(x_1,x_2,\dots,x_n\right)^\mathrm T \mid x_1,x_2,\dots,x_n \in \mathbb{R}\right\}$$．

$$n$$ 维向量空间中的 $$n-1$$ 维超平面：$$\pi = \left\{x=\left(x_1,x_2,\dots,x_n\right)^\mathrm T \mid a_1x_1+a_2x_2+\dots+a_nx_n=b\right\}$$．

【$$\mathscr{Def4.7}$$】$$V_1$$ 是 $$V_2$$ 的 **子空间**，当 $$V_1\subseteq V_2$$．

【$$\mathscr{Def4.8}$$】向量组 $$a_1,a_2,\dots,a_r$$ 为向量空间 $$V$$ 的一个 **基**（即最大无关组），当满足：(1) 向量 $$a_1,a_2,\dots,a_r\in V$$ ；(2) $$a_1,a_2,\dots,a_r$$ 线性无关；(3) $$V$$ 中任一向量都可由 $$a_1,a_2,\dots,a_r$$ 线性表示．

$$\mathbb{R}^n$$ 中的 **自然基**：$$e_1,e_2,\dots,e_n$$．

向量空间的 **维数**（即秩）：$$\dim V=r$$，并称 $$V$$ 是 $$r$$ 维向量空间．没有基的向量空间，即 $$0$$ 维向量空间的维数为 $$0$$．

【$$\mathscr{Def4.9}$$】 $$V$$ 中的任意向量 $$x$$ 在基 $$a_1,a_2,\dots,a_n$$ 下的 **坐标** 是 $$\lambda=(\lambda_{1}, \lambda_{2}, \dots, \lambda_{r})^\mathrm T$$：将 $$x$$ 表示为 $$x=\lambda_{1} a_{1}+\lambda_{2} a_{2}+\dots+\lambda_{n} a_{n}=(a_1,a_2,\dots,a_n)\lambda$$．由基 $$a_1,a_2,\dots,a_n$$ 所张（生）成的向量空间 $$\text{Span}\{a_1,a_2,\dots,a_n\}$$ 是 $$V = \left\{\lambda_{1} a_{1}+\lambda_{2} a_{2}+\dots+\lambda_{n} a_{n} \mid \lambda_{1}, \lambda_{2}, \dots, \lambda_n\in\mathbb{R}\right\}$$．

【$$\mathscr{Def4.10}$$】称 $$P$$ 是向量空间 $$V$$ 中的基 $$a_1,a_2,\dots,a_n$$ 到基 $$b_1,b_2,\dots,b_n$$ 的 **过渡矩阵**：若 $$\left(b_{1}, b_{2}, \dots, b_{n}\right)=\left(a_{1}, a_{2}, \dots, a_{n}\right) P$$，此即 **基变换公式**．

【$$\mathscr{Def4.11}$$】设向量空间 $$V$$ 中的向量 $$a$$ 在基 $$a_1,a_2,\dots,a_n$$ 中的坐标为 $$x$$，在基 $$b_1,b_2,\dots,b_n$$ 中的坐标为 $$y$$，则 $$x=Py$$，此即 **坐标变换公式**．

<div style="page-break-after:always;"></div>

## 第五章　相似矩阵及二次型

### 5.1　向量的内积、范数

【$$\mathscr{Def5.1}$$】$$n$$ 维列向量 $$x =\left(x_1,x_2,\dots,x_n\right)^\mathrm T,y = \left(y_1,y_2,\dots,y_n\right)^\mathrm T$$ 的 **内积**： $$(x,y) = x^\mathrm Ty = \sum_{i=1}^n x_iy_i$$．

1. 内积满足交换律和线性运算．
2. 当 $$x=0$$ 时，$$(x,x) = 0$$；当 $$x\neq0$$ 时，$$(x,x)>0$$．
3. （施瓦兹不等式）$$(x,y)^2 \leqslant (x,x)(y,y)$$．

【$$\mathscr{Def5.2}$$】向量 $$x$$ 的 **范数** $$||x||=\sqrt{(x,x)}$$．向量 $$x$$ 和 $$y$$ 的 **夹角** $$\theta=\arccos\frac{(x,y)}{||x||·||y||}$$．

### 5.2　向量的正交性

向量 $$x$$ 和 $$y$$ **正交**：$$(x,y)=0$$．

【$$\mathscr{Thm5.1}$$】正交向量组线性无关．

【$$\mathscr{Def5.3}$$】**标准正交基** $$\xi_1,\xi_2,\dots,\xi_n$$：单位向量、两两正交、向量空间 $$\mathbb{R}^n$$ 的一个基．

1. 向量空间中任一向量可表示为 $$a=\sum\lambda_i\xi_i$$，它在标准正交基下的坐标计算公式：$$\lambda_i=(a,\xi_i)$$．

2. 把向量空间的一个基 **标准正交化**：找到标准正交基与之等价，可先施密特正交化，再单位化．

   **施密特正交化**：
   $$
   \begin{align}
   b_1 &= a_1 , \\
   
   b_2 &= a_2-\frac{(b_1,a_2)}{||b_1||}b_1, \\
   
   b_3 &= a_3-\frac{(b_1,a_3)}{||b_1||}b_1-\frac{(b_2,a_3)}{||b_2||}b_2 \\
   
   & \cdots \\
   
   b_n &= a_n-\frac{(a_n,b_1)}{||b_1||}b_1-\dots-\frac{(a_n,b_{n-1})}{||b_{n-1}||}b_{n-1}
   
   \end{align}
   $$
   **单位化**：
   $$
   \xi_i=\frac{b_i}{||b_i||}, ~~ 1\leqslant i\leqslant n
   $$

【$$\mathscr{Def5.4}$$】**正交阵**：$$A^\mathrm TA=E\iff A^{-1}=A^\mathrm T\iff (a_i,a_j)=\delta_{ij}\iff A$$ 的列(行)向量组构成 $$\mathbb{R}^n$$ 的标准正交基．

1. 正交阵的逆或转置仍是正交阵，它的行列式只能为 $$\pm1$$．
2. 两个正交阵的积仍是正交阵．

【$$\mathscr{Def5.4}$$】**正交变换**：$$y=Px$$，其中 $$P$$ 为正交阵．性质：$$||y||=||x||$$．

### 5.3　特征值和特征向量

矩阵 $$A$$ 是 **方阵**，如果 **非零列向量** $$x$$ 满足 $$Ax=\lambda x$$，则称其为 **特征向量**，$$\lambda=\frac{Ax}{x}$$ 为 **特征值**．*（$$\mathscr{Def5.6}$$）*

1. $$n$$ 阶方阵在复数范围内有 $$n$$ 个特征值．

   (1) 所有特征值之和等于方阵的 **迹**（trace，$$\operatorname{tr} (A)=\sum a_{ii}$$）．

   (2) 所有特征值之积等于方阵的行列式．

   　 推论：如果这些特征值都不为 0，那么这个方阵可逆．

2. 对方阵作多项式，她的特征值也对应作多项式，而对应于特征值的特征向量不变．

   对方阵作转置，她的特征值不变（也可以理解为一阶行列式作转置），而特征向量需要另算．

3. 对应于不同特征值的特征向量线性无关．*（$$\mathscr{Thm5.2}$$）*

   推论：对应于两个不同特征值的线性无关的特征向量组，合起来仍线性无关．*（$$\mathscr{Thm5.2}$$ 推论）*

4. 不同特征值对应特征向量的线性组合不是特征向量．

### 5.4　对角化

#### 5.4.1　一般矩阵的相似对角化

**相似**：矩阵 $$B$$ 是矩阵 $$A$$ 的 **相似矩阵**，或矩阵 $$A$$ 与 $$B$$ 相似，即 $$P^{-1}AP=B$$．对 $$A$$ 进行 $$P^{-1}AP$$ 运算称为对 $$A$$ 进行 **相似变换**，可逆矩阵 $$P$$ 称为把 $$A$$ 变成 $$B$$ 的 **相似变换矩阵**．*（$$\mathscr{Def5.7}$$）*

1. 相似是特殊的等价，因此相似矩阵的秩相同．
2. 相似矩阵的特征多项式、特征值都相同，因此行列式相同．*（$$\mathscr{Thm5.3}$$）*

**相似对角化**：对 $$n$$ 阶方阵 $$A$$，寻求相似变换矩阵 $$P$$，使得 $$P^{-1}AP= \Lambda$$ 为对角矩阵．

【条件】$$A$$ 有 $$n$$ 个线性无关的特征向量 $$\Leftarrow$$ $$A$$ 的 $$n$$ 个特征值互不相等．*（$$\mathscr{Thm5.4}$$）*

【意义】计算矩阵多项式 $$\varphi(A)=P^{-1}\varphi(\Lambda)P=P^{-1}\prod_{i=1}^n\varphi(\lambda_i)P$$．*（例 5.13）*

#### 5.4.2　合同对角化

**合同**：$$n$$ 阶矩阵 $$A$$ 和 $$B$$ 合同，若有可逆矩阵 $$C$$ ，使 $$B=C^\mathrm TAC$$．

**合同对角化**：对 $$n$$ 阶方阵 $$A$$，寻找合同变换矩阵 $$P$$，使 $$P^\mathrm TAP=\Lambda$$ 为对角矩阵．

#### 5.4.3　对称矩阵的正交对角化

**对称矩阵**：$$A^\mathrm T=A$$．

1. 对称矩阵的特征值都是实数，故齐次线性方程组是实系数的，从而对应的特征向量可以取实向量；
2. 对称矩阵的对应不同特征值的特征向量正交（比线性无关更强）．
3. $$n$$ 阶对称矩阵 $$A$$ 的特征方程有 $$k$$ 重根 $$\lambda$$，则 $$R(A-\lambda E)=n-k$$ ，从而对应特征值 $$\lambda$$ 恰有 $$k$$ 个线性无关的特征向量．

【定理】实对称矩阵必可正交对角化．*（$$\mathscr{Thm5.5}$$）*

### 5.5　对角化的应用举隅——二次型的标准化

**二次型**：设 $$x=\left(x_1,x_2,\dots,x_n\right)^\mathrm T$$，二次齐次函数 $$f(x)=\sum_{i,j=1}^{n}a_{ij}x_ix_j=x^\mathrm TAx$$，其中 $$A=(a_{ij})$$ 称为 **二次型的矩阵**．

**二次型的秩**：$$r=R(A)\leqslant n$$．

#### 5.5.1　二次型的标准化

**二次型的标准化**：二次型必可经正交变换 $$x=Py$$ 化为 **标准型**（只含平方项的二次型） $$f=\sum_{i=1}^n\lambda_iy_i^2$$，其中 $$\lambda_i$$ 是二次型的矩阵的特征值，$$P$$ 是合同对角化得到的正交阵．*（$$\mathscr{Thm5.6}$$）*

**二次型的规范化**：二次型必可经可逆变换 $$x=Cy$$ 化为 **规范型**（是标准型，且系数满足 $$k_i\in\{-1,0,1\}$$） $$f=\sum_{i=1}^n\frac{\lambda_i}{|\lambda_i|}y_i^2$$，其中  $$C=PK,~~K=\operatorname{diag}(k_i),~~k_i=\left\{\begin{array}{lr}\frac{1}{\sqrt{|\lambda_i|}} , &i\leqslant r\\ 1, &i>r \end{array}\right.$$ ．*（$$\mathscr{Thm5.6}$$ 推论）*

#### 5.5.2　判定二次型正负定性

称二次型 $$f(x)=x^\mathrm TAx$$ 为 **正(负)定二次型**，或称对称矩阵 $$A$$ 是 **正(负)定** 的，如果 $$\forall x\ne0,~~f(x)>0~(<0)$$．

判定二次型正负定性：

- **定　　   义 **：正定 $$\iff\forall x\ne0,~~f(x)>0$$；
  　　　　　　　　　　　　　　　　　　　　负定 $$\iff\forall x\ne0,~~f(x)<0$$．
- **惯 性 指 数 **：正定 $$\iff$$ 标准形的系数全都为正 $$\iff$$ 规范形的系数全都为 1 $$\iff$$ 正惯性指数为 $$n$$．二次型的 **正(负)惯性指数** 为标准形中正(负)系数个数．它的数量是确定的，此即 **惯性定理**．正惯性指数与负惯性指数的和等于二次型的秩．*（$$\mathscr{Thm5.7\&8}$$）*
- **矩阵特征值**：正定 $$\iff$$ 二次型的矩阵特征值全为正．*（$$\mathscr{Thm5.8}$$ 推论）*
- **顺序主子式**：正定 $$\iff$$ 二次型的矩阵各阶顺序主子式全为正；*（$$\mathscr{Thm5.9}$$，赫尔维茨定理）*
  　　　　　　　　　　　　　　　　　　　　负定 $$\iff$$ 偶数阶顺序主子式为正，而奇数阶顺序主子式为负．



**写在最后**

　　以上就是本书的全部知识点！

　　完结撒花！

　　写到这里时已经是 Week15 的周末，线代仅剩最后的 3 次课……

　　真的很喜欢王然老师，他的魅力是其它任何一个老师都望尘莫及的（~~个人观点~~）．在开学之初我也是讨厌数学的，也为学不懂线代和高数而苦恼．但是在几次课之后对线代产生了极大的兴趣，放弃了宋浩，开始认真听每一节线代课，尝试仔细研读课本，甚至补充了一些著作和文献…… 这才有了这份笔记．可以说线代是我这学期惟一主动听的课．有次起晚了为了不迟到，10 分钟从宿舍飞到教室，89 秒冲上 7 楼，甚至创下了新纪录．

　　不知道该用什么形容词了，总之就是特别好特别好！就像是高一上学期的神仙老师们那么好！！！

　　*（这里补充对王然老师的一封感谢信，在结课后补上）*

　　最后再放一个 **线代吉祥物 “线 ‘性’ 小狗”** 吧，很可爱捏！

　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　 小明同学
​　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　2023 年 12 月 15 日

<img src=".\data\※ 线性代数-Notes-lite-2.0.1\dog.jpg" alt="dog" style="zoom:24%;" />
