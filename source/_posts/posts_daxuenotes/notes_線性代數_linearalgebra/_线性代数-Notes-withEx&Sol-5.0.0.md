---
header: ${pageNo} / ${totalPages}                                                                        Linear Algebra - Notes                                                    written by XiaoMing

footer:
---

# 线性代数 Linear Algebra <img src=".\data\dog.jpg" alt="dog" style="zoom:8%;" />

　　您正在阅读的是 “ **详细版** ”，包括定理证明、典型例题习题和解题方法，如果仅需要重要定义和定理，请查看另一个文件．

**写在前面**

　　这是一本笔记．

　　基于王然老师在中国传媒大学通信工程专业的讲座，和同济大学数学科学学院编写的《工程数学　线性代数》（第七版）．

　　这本笔记是自己在学习中对于线代的一些不成熟的理解 ~ 我尝试将例题和习题与书本的定义定理相联系，纵向深入、横向拓展，厘清它的脉络．此外，我尽可能地减少了大段文字叙述，取而代之的是分点叙述和富有建筑美的证明（嗯？

　　~~别再因为线代割腕了 /大笑！~~ 希望你们能从另一个视角感受线代的美，并享受这个令人惊叹的学科，祝愿你们在追寻人类历史上最伟大的智力冒险时一帆风顺！

　　在此特别感谢王然老师和我的班主任张莉老师 :D

　　最后，送每个读者一个四叶草🍀，祝期末考试顺利 ~ 

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

## 第〇章　线性方程组

> 线性方程组贯穿于整个线性代数，是线性代数的重要内容，主要包括线性方程的有解判别准则、求解方法和解的结构．因此，我们单独将其列为一章．

### 0.1　非齐次线性方程组和齐次线性方程组

**$$\pmb{n}$$ 元线性方程组** 设有 $$n$$ 个未知数 $$m$$ 个方程的线性方程组 $$\begin{cases} a_{11}x_{1} + a_{12}x_{2} + \cdots + a_{1n}x_{n} = b_{1} \\ a_{21}x_{1} + a_{22}x_{2} + \cdots + a_{2n}x_{n} = b_{2} \\ \cdots\cdots \\ a_{m1}x_{1} + a_{m2}x_{2} + \cdots + a_{mn}x_{n} = b_{m} \end{cases}$$，当常数项 $$\sum b_{i}^2\ne0$$ 时，称该方程组为 $$n$$ 元非齐次线性方程组，否则称为 $$n$$ 元齐次线性方程组．

非齐次线性方程组的系数矩阵、未知数矩阵和常数项矩阵、增广矩阵分别为：
$$
\begin{align}

\pmb{A} &= (a_{ij})_{m \times n} \\

\pmb{x} &= (x_{1},~ x_{2},~ \cdots,~ x_{n})^\mathrm{T} \\

\pmb{b} &= (b_{1},~ b_{2},~ \cdots,~ b_{m})^\mathrm{T} \\

\pmb{B} &= ( \begin{array}{c|c} \pmb{A} & \pmb{b} \end{array} ) = \begin{pmatrix} a_{11} & a_{12} & \cdots & a_{1n} & b_{1} \\ a_{21} & a_{22} & \cdots & a_{2n} & b_{2} \\ \vdots & \vdots & \ddots & \vdots & \vdots \\ a_{m1} & a_{m2} & \cdots & a_{mn} & b_{m} \\ \end{pmatrix}

\end{align}
$$

### 0.2　克拉默法则

**克拉默法则** 如果线性方程组 $$\begin{cases} a_{11}x_{1} + a_{12}x_{2} + \cdots = b_{1} \\ a_{21}x_{1} + a_{22}x_{2} + \cdots = b_{2} \\ \cdots\cdots\cdots\cdots \\ a_{n1}x_{1} + a_{n2}x_{2} + \cdots = b_{n} \\ \end{cases}$$ 的系数矩阵 $$\pmb A$$ 的行列式不等于零，即 $$\left\lvert\pmb  A \right\rvert = \begin{vmatrix} a_{11} & \cdots & a_{1n} \\ \vdots & & \vdots \\ a_{n1} & \cdots & a_{nn} \\ \end{vmatrix} \ne 0$$，则该方程组有惟一解 $$\displaystyle x_{i} = \frac{\left\lvert\pmb  A_{i} \right\rvert}{\left\lvert\pmb  A \right\rvert}$$，其中 $$\pmb A_{i} = \begin{pmatrix} a_{11} & \cdots & a_{1, i - 1} & b_{1} & a_{1, i + 1} & \cdots & a_{1n} \\ \vdots & & \vdots & \vdots & \vdots & & \vdots \\ a_{n1} & \cdots & a_{n, i - 1} & b_{n} & a_{n, i + 1} & \cdots & a_{nn} \\ \end{pmatrix} $$．

> 注意用克拉默法则解方程组的两个条件：(1)方程个数等于未知量个数；(2)系数行列式不等于零．
>
> 克拉默法则建立了线性方程组的解和已知的系数与常数项之间的关系，它主要适用于理论推导．

<div style="page-break-after:always;"></div>

### 0.3　线性方程组解的判定

**$$\pmb n$$ 元齐次线性方程组解的判定** $$n$$ 元齐次线性方程组 $$\pmb{Ax}=\pmb{0}$$ 解的情况如下：

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

> **例题 4.24 & 习题 4.28**　求两个齐次线性方程组 $$\pmb {Ax}=\pmb O$$ 和 $$\pmb{Bx}=\pmb O$$ 的 **公共解**，并判断它们是否 **同解**．
>
> 解：为求公共解，可：
> 　　 (1) 已知两组方程，将方程联立得到公共解；
> 　　 (2) 已知一组方程组和一个方程的通解，将通解代入前一个方程组得到参数的关系；
> 　　 (3) 已知两个方程的通解，将两组方程解对应相等得到系数关系．
>
> 　　**两齐次线性方程组同解，表明它们的系数阵的行向量组等价**，即 $$R(\pmb A)=R(\pmb B)$$．这是因为这两个方程组有相同的解空间 $$S$$，由 $$\mathscr{Thm4.7}$$  有 $$\dim S=n-R(\pmb A)=n-R(\pmb B)$$．
>
> 评注：**同解方程组看行向量组，方程组有无解看列向量组**．这是因为，一个行向量代表一个方程，行向量组的一次初等行变换相当于对方程组做一次同解变形；所以，两个方程组的增广矩阵行向量组等价，即这两个方程组可从一个同解变形为另外一个，它们是同解的方程组．至于用列向量，往往都是由矩阵的秩转化而来．

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

> 这里给出一些矩阵可交换的条件：
>
> - 矩阵 $$\pmb{A}$$ 与 $$\pmb{O},~k\pmb{E},~\pmb{A},~\pmb{A}^{-1},~\pmb{A}^{\mathrm{T}},~\pmb{A}^{*}$$，以及 $$f(\pmb{A},~\pmb{A}^{-1},~\pmb{A}^{*})$$ 可交换．
> - 充要条件：$$(\pmb{AB})^{-1} = \pmb{A}^{-1}\pmb{B}^{-1}$$；$$(\pmb{AB})^{\mathrm{T}} = \pmb{A}^{\mathrm{T}}\pmb{B}^{\mathrm{T}}$$；$$(\pmb{AB})^{*} = \pmb{A}^{*}\pmb{B}^{*}$$；$$(\pmb{AB})^{k} = \pmb{A}^{k}\pmb{B}^{k}$$ 等．
> - 充分条件：$$\pmb{AB}$$ 为对称矩阵（如 $$\pmb{AB}=\pmb{E}$$）；$$\pmb{A},~\pmb{B}$$ 皆是对称矩阵；$$\pmb{A},~\pmb{B}$$ 皆是对角矩阵； $$\pmb{A}$$ 和 $$\pmb{B}$$ 拥有相同的特征向量；$$m\pmb{A} = (\pmb{A}-n\pmb{E})\pmb{B} \iff \pmb{AB} = n\pmb{B} + m\pmb{A}$$．
> - 如果矩阵 $$\pmb{A}$$ 和矩阵 $$\pmb{B}$$ 可交换，那么 $$\pmb{A}$$ 和 $$\pmb{B}^{-1}$$ 可交换．如果矩阵 $$\pmb{A}$$ 分别和矩阵 $$\pmb{B}_1,~\pmb{B}_2$$ 可交换，那么 $$\pmb{A}$$ 和 $$k_1\pmb{B}_1+k_2\pmb{B}_2,~ \pmb{B}_1\pmb{B}_2$$ 可交换．

此外，矩阵乘法一般不满足消去律；两个矩阵的乘积如果是零矩阵，这两个矩阵不一定是零矩阵，也即如果两个矩阵 $$\pmb{A},~\pmb{B}$$ 满足 $$\pmb{AB}=\pmb{O}$$，不一定能推出 $$\pmb{A}=\pmb{O}$$ 或 $$\pmb{B}=\pmb{O}$$ ．

> 这里给出两个特例：
>
> - 若 $$\pmb{A}^\mathrm{T}\pmb{A}=\pmb{O}$$，则 $$\pmb{A}=\pmb{O}$$．（例 2.19）
>
>   证明：设 $$\pmb{A} = (a_{ij})_{m \times n}$$，将矩阵 $$\pmb{A}$$ 按列分块为 $$(\pmb{a_1},~\pmb{a_2},~\dots,~\pmb{a_n})$$，于是 $$\pmb{A}^\mathrm{T}\pmb{A}=(\pmb{a_i}^\mathrm{T}\pmb{a_j})_{n\times n}=\pmb{O}$$，得到 $$\pmb{a_i}^\mathrm{T}\pmb{a_i}=0$$，即 $$\sum_{k=1}^{m} a_{ik}^2=0$$，进而每个 $$a_{ik}=0$$，得证．
>
> - 若 $$\pmb{AB}=\pmb{O}$$，且 $$\pmb{B}$$ 是列满秩矩阵，则 $$\pmb{A}=\pmb{O}$$．（例 3.9）
>
>   引理 1：设 $$\pmb{A} = (a_{ij})_{m \times n}$$，若 $$\pmb{A}\pmb{B}=\pmb{C}$$，且 $$R(\pmb A)=n$$，则 $$R(\pmb B)=R(\pmb C)$$．
>
>   引理 1 的证明：以 $$m$$ 阶矩阵 $$\pmb{P}$$ 左乘 $$\pmb{A}$$，将其化为行最简形 $$\begin{pmatrix} \pmb{E}_n \\ \pmb{O} \end{pmatrix}$$，则 $$R(\pmb C)=R(\pmb{PC})=R(\pmb{PAB})=R\left(\begin{pmatrix} \pmb{E}_n \\ \pmb{O} \end{pmatrix}\pmb B\right)=R\begin{pmatrix} \pmb{B} \\ \pmb{O} \end{pmatrix}=R(\pmb{B})$$．
>
>   引理 2：设 $$\pmb{A} = (a_{ij})_{m \times n}$$，若 $$\pmb{A}\pmb{B}=\pmb{A}\pmb{C}$$，且 $$R(\pmb A)=n$$，则 $$\pmb B=\pmb C$$．
>
>   引理 2 的证明：$$\pmb{P}\pmb{A}\pmb{B}=\pmb{P}\pmb{A}\pmb{C} \Rightarrow \begin{pmatrix} \pmb{E}_n \\ \pmb{O} \end{pmatrix}\pmb B = \begin{pmatrix} \pmb{E}_n \\ \pmb{O} \end{pmatrix}\pmb C \Rightarrow \begin{pmatrix} \pmb{B} \\ \pmb{O} \end{pmatrix} = \begin{pmatrix} \pmb{C} \\ \pmb{O} \end{pmatrix} \Rightarrow \pmb B=\pmb C$$．
>
>   原题的证明：显然．

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

> 对于 (6) 的证明：
>
> 本题已约定方阵 $$\pmb{A}$$ 可逆，首先由 $$\pmb{A}\pmb{A}^{*} = |\pmb{A}|\pmb{E}$$，即 $$\displaystyle\frac{1}{|\pmb{A}|} \pmb{A}\pmb{A}^{*} = \pmb{E}$$，知 $$\pmb{A}^{*}$$ 可逆，以下证明所给命题．
>
> 一方面 $$\displaystyle\pmb{A}\pmb{A}^{*} = |\pmb{A}|\pmb{E} \iff (\pmb{A}^{*})^{-1} = \frac{1}{|\pmb{A}|}\pmb{A}$$，另一方面 $$\displaystyle\pmb{A}^{-1}(\pmb{A}^{-1})^{*} = \left|\pmb{A}^{-1}\right|\pmb{E} \iff (\pmb{A}^{-1})^{*} = \frac{1}{|\pmb{A}|}\pmb{A}$$，便证明了结论．
>
> 对于 (7) 的证明：
>
> 情形 1：如矩阵 $$\pmb{A}$$ 不可逆，也即 $$|\pmb{A}|=0$$，则有 $$\pmb{A}\pmb{A}^{*}=\pmb{O}$$．为了证明 $$|\pmb{A}^{*}|=0$$，用反证法．假设 $$|\pmb{A}^{*}|\ne0$$，即 $$\pmb{A}^{*}$$ 可逆，对上式右乘 $$(\pmb{A}^{*})^{-1}$$，得 $$\pmb{A}=\pmb{O}$$．这表明，矩阵 $$\pmb{A}$$ 的全部元素是 $$0$$，行列式 $$| \pmb{A} |$$ 的各个元素的代数余子式皆为 $$0$$，也就是 $$\pmb{A}^{*}$$ 的全部元素都是 $$0$$，这表明 $$\pmb{A}^{*}=\pmb{O}$$，$$|\pmb{A}^{*}|=0$$，与假设矛盾，因此假设不成立，故 $$|\pmb{A}^{*}|=0$$ 得证．
> 另法：如矩阵 $$\pmb{A}$$ 不可逆，也即 $$|\pmb{A}|=0$$，则存在可逆矩阵 $$\pmb{P},\pmb{Q}$$，使 $$\pmb{PAQ}=\pmb{\Lambda}=\begin{pmatrix} \pmb{E}_{r} & \pmb{O}\\ \pmb{O} & \pmb{O} \end{pmatrix}$$．注意到，若 $$r \leq n-2$$，则 $$\pmb{\Lambda}^{*}=\pmb{O}$$，若 $$r=n-1$$，则 $$\pmb\Lambda^{*}=\begin{pmatrix} \pmb{O} & \pmb{O}\\ \pmb{O} & 1 \end{pmatrix}$$，无论哪种情况，都有 $$\left|\pmb\Lambda^{*}\right|=0$$，从而 $$0=\left|(\pmb P \pmb{A} \pmb Q)^{*}\right|=\left|\pmb Q^{*} \pmb{A}^{*}\pmb P^{*}\right|=\left|\pmb Q^{*}\left\|\pmb{A}^{*}\right\| \pmb P^{*}\right| $$，上式中 $$\pmb P^{*}, \pmb Q^{*}$$ 都是可逆矩阵，因此 $$\left|\pmb{A}^{*}\right|=0=|\pmb{A}|^{n-1}$$ 仍然成立.
>
> 情形 2：如矩阵 $$\pmb{A}$$ 可逆，也即 $$|\pmb{A}|\ne0$$．对 $$\pmb{A}\pmb{A}^{*} = |\pmb{A}|\pmb{E}$$ 两边取行列式知 $$|\pmb{A}||\pmb{A}^{*}| = \big||\pmb{A}|\pmb{E}\big| = |\pmb{A}|^{n}$$，两边约去 $$|\pmb{A}|\ne0$$ 即证．

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

矩阵的伴随矩阵有类似于转置和逆的性质，这里给出并证明：

1. $$(\pmb{A} \pmb{B})^{*}=\pmb{B}^{*} \pmb{A}^{*}.$$

   - 若 $$\pmb{A} \pmb{B}$$ 可逆，有 $$(\pmb{A} \pmb{B})^{*}=|\pmb{A} \pmb{B}|(\pmb{A} \pmb{B})^{-1} =|\pmb{B}| \pmb{B}^{-1}|\pmb{A}| \pmb{A}^{-1}=\pmb{B}^{*} \pmb{A}^{*} $$；

   - 否则，考虑 $$\pmb{A}_{1}=\pmb{A}+x \pmb{E},~ \pmb{B}_{1}=\pmb{B}+x \pmb{E}$$，则存在无穷多个 $$x$$ 的值使得 $$\pmb{A}_{1}, \pmb{B}_{1}$$ 都可逆，于是有 $$\left(\pmb{A}_{1} \pmb{B}_{1}\right)^{*}=\pmb{B}_{1}^{*} \pmb{A}_{1}^{*}$$，上面两边矩阵的元素都是 $$x$$的多项式，且有无穷多个 $$x$$ 的值使得等式成立，从而等式恒成立，于是当 $$x=0$$ 时，即得结论成立．

2. $$(k \pmb{A})^{*}=k^{n-1} \pmb{A}^{*}~(k\in\R)$$，特别地，$$(-\pmb{A})^{*}=\left\{\begin{array}{ll} -\pmb{A}^{*},& n=2k \\ \pmb{A}^{*},& n=2k+1 \end{array}\right..$$
   - 若 $$k\pmb{A}$$ 可逆，有 $$(k \pmb{A})^{*}=|k \pmb{A}|(k \pmb{A})^{-1}=k^{n}|\pmb{A}| k^{-1} \pmb{A}^{-1} =k^{n-1}|\pmb{A}| \pmb{A}^{-1}=k^{n-1} \pmb{A}^{*}$$；
   - 否则，考虑 $$\pmb{A}_1=k\pmb{A}+t\pmb{E}$$，则存在无穷多个 $$t$$ 的值使得 $$\pmb{A}_{1}$$ 可逆，从而 $$(k \pmb{A}+t \pmb{E})^{*}=|k \pmb{A}+t \pmb{E}|(k \pmb{A}+t \pmb{E})^{-1}$$ 对无穷多个 $$t$$ 的值成立，由于等式两边是关于 $$t$$ 的多项式，从而上式恒成立，令 $$t=0$$ 可得结论．

3. $$\left(\pmb{A}^{\rm T}\right)^{*}=\left(\pmb{A}^{*}\right)^{\rm T}.$$
   - 若 $$\pmb{A}$$ 可逆，则 $$\pmb{A}^{\rm T}$$ 也可逆，故 $$\left(\pmb{A}^{\rm T}\right)^{*}=\left|\pmb{A}^{\rm T}\right|\left(\pmb{A}^{\rm T}\right)^{-1} =|\pmb{A}|\left(\pmb{A}^{-1}\right)^{\rm T}=\left(|\pmb{A}| \pmb{A}^{-1}\right)^{\rm T}=\left(\pmb{A}^{*}\right)^{\rm T}$$；
   - 否则，考虑 $$\pmb{A}_{1}=\pmb{A}+t \pmb{E}$$，则存在无穷多个 $$t$$ 的值使得 $$\pmb{A}_{1}$$ 可逆，从而 $$\left(\pmb{A}_{1}^{\rm T}\right)^{*}=\left(\pmb{A}_{1}^{*}\right)^{\rm T}$$ 对无穷多个 $$t$$ 的值成立，由于等式两边是关于 $$t$$ 的多项式，从而上式恒成立，令 $$t=0$$ 可得结论．

4. $$R\left(\pmb{A}^{*}\right)=\left\{\begin{array}{ll} n, &\text{if }R(\pmb{A})=n \\ 1, &\text{if }R(\pmb{A})=n-1 \\ 0, &\text{if }R(\pmb{A}) \le n-2 \end{array}\right..$$（2023 中国传媒大学）
   - 若 $$R(\pmb{A})=n$$，则 $$|\pmb{A}| \neq 0$$，由 $$\pmb{A} \pmb{A}^{*}=|\pmb{A}| \pmb{E}$$，取行列式得 $$\left|\pmb{A}^{*}\right|=|\pmb{A}|^{n-1} \neq 0$$，故 $$R\left(\pmb{A}^{*}\right)=n$$；
   - 若 $$R(\pmb{A})=n-1$$，则 $$|\pmb{A}|=0$$，一方面，$$\pmb{A}$$ 至少有一个 $$n-1$$ 阶子式不为 $$0$$，即 $$\pmb{A}^{*} \ne \pmb{O},~ R(\pmb{A}^{*}) \geqslant 1$$，另一方面，由 $$\pmb{A} \pmb{A}^{*}=|\pmb{A}| \pmb{E}=0$$，知 $$R(\pmb{A})+R(\pmb{A}^{*}) \leqslant n $$，得到 $$R(\pmb{A}^{*}) \leqslant1$$，综合以上两方面有 $$ R(\pmb{A}^{*})=1$$；
   - 若 $$R(\pmb{A})\leqslant n-2$$，$$\pmb{A}$$ 的任意 $$n -1$$ 行皆线性相关，故它的任意 $$n-1$$ 阶子式都为 $$0$$，所以 $$\pmb{A}^{*}=\pmb{O}$$，所以 $$R(\pmb{A}^{*})=0$$．

5. $$\left(\pmb{A}^{*}\right)^{*}=|\pmb{A}|^{n-2} \pmb{A}$$
   - 若 $$\pmb{A}$$ 可逆，$$\left(\pmb{A}^{*}\right)^{*}=\left|\pmb{A}^{*}\right|\left(\pmb{A}^{*}\right)^{-1}=|\pmb{A}|^{n-1}\left(\pmb{A}^{-1}\right)^{*} =|\pmb{A}|^{n-1}|\pmb{A}|^{-1} \pmb{A}=|\pmb{A}|^{n-2} \pmb{A}$$；
   - 否则，有 $$|\pmb{A}|=0$$，则 $$R\left(\pmb{A}^{*}\right)=1 \text{ or } 0$$，故 $$\left(\pmb{A}^{*}\right)^{*}=\pmb{O}=|\pmb{A}|^{n-2} \pmb{A}$$．

6. $$\pmb{A}^{*}$$ 是 $$\pmb{A}$$ 的多项式
   - 若 $$R(\pmb{A})=n$$，设 $$\pmb{A}$$ 的特征多项式为 $$f(x)=x^{n}+a_{n-1} x^{n-1}+\cdots+a_{1} x+a_{0} $$，则 $$0=\pmb{A}^{n}+a_{n-1} \pmb{A}^{n-1}+\cdots+a_{1} \pmb{A}+a_{0} \pmb{E}$$，于是 $$\pmb{A}^{-1}=-\frac{1}{a_{0}}\left(\pmb{A}^{n-1}+a_{n-1} \pmb{A}^{n-2}+\cdots+a_{1} \pmb{E}\right) $$，而$$\pmb{A}^{*}=|\pmb{A}| \pmb{A}^{-1}$$,从而结论成立；
   - 否则，考虑 $$\pmb{A}_{1}=\pmb{A}+t \pmb{E}$$，由于存在无穷多个 $$t$$ 的值使得 $$\pmb{A}_{1}$$ 可逆，由上式可得 $$\pmb{A}_{1}^{*}=g\left(\pmb{A}_{1}\right) $$，由于等式两边是关于 $$t$$ 的多项式，从而上式恒成立，令 $$t=0$$ 可得结论．

7. 已知 $$\pmb{A}^{*}$$，且 $$\pmb{A}^{*}$$ 可逆，求 $$\pmb{A}$$．
   - 思路：由 $$|\pmb{A}^{*}| = |\pmb{A}|^{n-1}$$ 求得 $$|\pmb{A}|$$，进而 $$\pmb{A} = |\pmb{A}| (\pmb{A}^{*})^{-1}$$．
   - 这里限定 $$\pmb{A}^{*}$$ 可逆，是因为若不然，$$\pmb{A}^{*}$$ 对应的 $$\pmb{A}$$ 可能不止一种．

> （2018西安电子科技大学）设 $$\pmb{A}$$ 为 $$n$$ 阶实非零矩阵，且 $$a_{i j}=A_{i j}$$，证明 $$\pmb{A}$$ 可逆，并求 $$\pmb{A}^{-1}$$．
>
> 解：题目实际说 $$\pmb{A}^{\rm T}=\pmb{A}^{*}$$．
>
> 我们使用反证法说明 $$|\pmb{A}|\ne0$$，假设这不成立，即有 $$|\pmb{A}|=0$$，那么 $$\pmb{A} \pmb{A}^{\rm T}=\pmb{A} \pmb{A}^{*}=|\pmb{A}| \pmb{E}=\pmb{O}$$，熟知此时 $$\pmb{A}=\pmb{O}$$，与题设矛盾，因此假设不成立，即 $$|\pmb{A}|\ne0$$，因此 $$\pmb{A}$$ 可逆．
>
> 下面说明 $$|\pmb{A}|>0$$．这是由于对行列式展开，得 $$|\pmb{A}|=\sum a_{1i} A_{1i}=\sum a_{1i}^2\geqslant0$$，于是 $$|\pmb{A}|>0$$．
>
> 对 $$\pmb{A} \pmb{A}^{\rm T}=\pmb{A} \pmb{A}^{*}=|\pmb{A}| \pmb{E}$$，两边取行列式，得 $$|\pmb{A}|^2 = |\pmb{A}|^{n}$$．如果 $$n$$ 是奇数，则 $$|\pmb{A}|=1 \text{ or } 0$$，如果 $$n$$ 是偶数，则 $$|\pmb{A}|=\pm1 \text{ or } 0$$．又 $$|\pmb{A}|>0$$，故只能 $$|\pmb{A}|=1$$，这样， $$\pmb{A} \pmb{A}^{\rm T}=|\pmb{A}| \pmb{E}=\pmb{E}$$，便得到了 $$\pmb{A}^{-1}= \pmb{A}^{\rm T}$$．
>
> 变式 1：设 $$\pmb{A}=(a_{ij})_{3\times3}$$ 满足 $$\pmb{A}^{\rm T}=\pmb{A}^{*}$$，且 $$a_{11}=a_{12}=a_{13}>0$$，求 $$a_{11}$$．
>
> 变式 2：设 $$\pmb{A}=(a_{ij})_{3\times3}$$ 满足 $$\pmb{A}\ne\pmb{O}$$，记 $$A_{ij}$$ 为 $$a_{ij}$$ 的代数余子式，且 $$A_{ij}+a_{ij}=0$$，求 $$|\pmb{A}|$$．

> （2012河南师范大学）设 $$A=\left(\begin{array}{ccccc} 0 & x_{1}+x_{2} & x_{1}+x_{3} & \cdots & x_{1}+x_{n} \\ x_{2}+x_{1} & 0 & x_{2}+x_{3} & \cdots & x_{2}+x_{n} \\ x_{3}+x_{1} & x_{3}+x_{2} & 0 & \cdots & x_{3}+x_{n} \\ \vdots & \vdots & \vdots & & \vdots \\ x_{n}+x_{1} & x_{n}+x_{2} & x_{n}+x_{3} & \cdots & 0 \end{array}\right), x_{i} \neq 0, n>2\\$$
>
> 证明 $$R\left(\pmb{A}^{*}\right)=n \text{ or } 1$$．
>
> 证：实际要证明 $$R(\pmb{A})=n \text{ or } n-1$$．



> **例题 2.1**	求与 $$\pmb{A}=\begin{pmatrix}1 & 1\\0 & 2\end{pmatrix}$$​ 可交换的矩阵．
>
> 解：设 $$\pmb{B}=\begin{pmatrix}x & y\\z & u\end{pmatrix}$$，代入 $$\pmb{A}\pmb{B}=\pmb{B}\pmb{A}$$ 求解即可．

> **例题 2.2**	证明任一矩阵 $$\pmb{A}$$ 都可表示成对称阵与反对称阵之和．
>
> 证明：注意到 $$\pmb{B}=\pmb{A}+\pmb{A}^\mathrm{T}$$ 是一个对称矩阵， $$\pmb{C}=\pmb{A}-\pmb{A}^\mathrm{T}$$ 是一个反对称矩阵，于是 $$\displaystyle\frac12\pmb{B}$$ 与 $$\displaystyle\frac12\pmb{C}$$ 为所求．

> **例题 2.3**	若方阵 $$\pmb{A}$$ 可逆，且 $$\pmb{A}\pmb{B}=\pmb{A}+2\pmb{B}$$，证明 $$\pmb{B}$$ 可逆，并求它的逆矩阵．
>
> 解：注意到 $$(\pmb{A}-2\pmb{E})\pmb{B}=\pmb{A} \iff \pmb{A}^{-1}(\pmb{A}-2\pmb{E})\pmb{B}=\pmb{E}$$，则 $$\pmb{B}^{-1}=\pmb{E}-2\pmb{A}^{-1}$$．

> **例题 2.4**	若 $$3$$ 阶方阵 $$\pmb{A}$$ 满足 $$| \pmb{A} |=2$$，求 $$\left|(2\pmb{A})^{-1}-\pmb{A}^{*}\right|$$．
>
> 解：原式 $$\displaystyle=\left|\frac12\pmb{A}^{-1}-2\pmb{A}^{-1}\right|=\big(-\frac32\big)^{3}\left|\pmb{A}^{-1}\right|=-\frac{27}{16}$$．

> **例题 2.5**	求 $$\pmb{A}^{n}$$．
>
> 思路 1：找出 $$\pmb{A}$$ 满足的关系式；
> 思路 2：找规律，归纳．
> 思路 3：将 $$\pmb{A}$$ 对角化．

> **例题 2.6**	设 $$3$$ 维列向量 $$\pmb{\alpha},~\pmb{\beta}$$，求 $$(\pmb{\alpha}\pmb{\beta}^\mathrm{T})^{n}$$．
>
> 解：注意到 $$\pmb{\beta}^\mathrm{T}\pmb{\alpha}$$ 是一个数，则可转化为 $$\pmb{\alpha}(\pmb{\beta}^\mathrm{T}\pmb{\alpha})^{n-1}\pmb{\beta}^\mathrm{T}=(\pmb{\beta}^\mathrm{T}\pmb{\alpha})^{n-1}\pmb{\alpha}\pmb{\beta}^\mathrm{T}$$．

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

>$$\mathscr{Def3.2}$$ 的初等矩阵表述：设 $$\pmb{A}$$ 为任意 $$m\times n$$ 矩阵，则存在 $$m$$ 阶初等矩阵 $$\pmb{P_1},\pmb{P_2},\cdots,\pmb{P_s}$$ 与 $$n$$ 阶初等矩阵 $$\pmb{Q_1,Q_2,\cdots,Q_t}$$ ，使得 $$\pmb{P_s}\pmb{P_{s-1}}\cdots \pmb{P_1AQ_1} \cdots \pmb{Q_{t-1}Q_{t}}= \begin{pmatrix} \pmb{E_r}&\pmb{0}\\ \pmb{0}&\pmb{0}\end{pmatrix}$$．
>
>推论：$$n$$ 阶可逆矩阵 $$\pmb{A}$$ 必等价于单位矩阵 $$\pmb{E}_n$$，进而根据推论，任意可逆矩阵都可以表示为初等矩阵与单位矩阵的乘积，又有任意矩阵乘以单位矩阵等于其自身，故可逆矩阵可以表示为有限个初等矩阵的乘积．
>
>等价的本质描述其实是两个矩阵具有相同的标准形，因此若两矩阵等价，则肯定可以通过左乘和右乘两个可逆矩阵来进行转换.其中每个可逆矩阵都是一系列初等矩阵的乘积．
>
>我们可以根据这个结论来计算一个矩阵的可逆矩阵：$$(\pmb{A}~|~ \pmb{E}) \sim (\pmb{E}~|~\pmb{A^{-1}})$$，显然当我们将其按行并排时只能进行初等行变换．

### 3.2　矩阵的秩

【$$\mathscr{Def3.4}$$】**子式** 在 $$m \times n$$ 矩阵 $$\pmb{A}$$ 中，任取 $$k$$ 行 $$k$$ 列，位于这些行列交叉处的 $$k^{2}$$ 个元素，不改变它们在 $$\pmb A$$ 中所处的位置次序而得的 $$k$$ 阶行列式．

【$$\mathscr{Def3.5}$$】**秩** 若矩阵 $$\pmb A$$ 中存在一个不为零的 $$r$$ 阶子式，且所有 $$r+1$$ 阶子式全为零，那么数 $$r$$ 称为矩阵 $$\pmb A$$ 的秩，记作 $$R(\pmb A)$$，简言之，即矩阵的最高阶非零子式的阶数，也即非零子式的最高阶数．规定零矩阵的秩为 $$0$$．

矩阵的秩的性质：*（具体证明请参看课本，本笔记稍后补充）*
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

### 3.3　矩阵分块法

把矩阵当数处理，是分块矩阵最大的便利之处．

<div style="page-break-after:always;"></div>

## 第四章　向量组

### 4.1　向量组

【$$\mathscr{Def4.1}$$】**$$n$$ 维向量**： $$n$$ 个有次序的数 $$a_1,a_2,\dots,a_n$$ 所组成的数组 $$a=\left(a_{1}, a_{2}, \dots, a_{n}\right)$$ ，其中的数 $$a_i$$ 称为向量的第 $$i$$ 个 **分量**．**向量组**：若干个同 **维数** 的列向量或行向量所组成的集合．

1. 只讨论实向量，即分量全为实数的向量，另有复向量．
2. $$n$$ 维行向量和 $$n$$ 维列向量总被看作是两个不同的向量，当没有明确说明是行向量还是列向量时，都当作列向量；
3. 行向量和列向量都按照矩阵的运算法则进行运算；
5. 含有限个向量的有序向量组可以与矩阵一一对应．

<img src=".\data\image-20231129123204005.png" alt="image-20231129123204005" style="zoom:20%;" />



### 4.2　向量组的外部关系

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



【$$\mathscr{Def4.3}$$】【$$\mathscr{Thm4.2}$$】【$$\mathscr{Thm4.3}$$】定义两向量组的 **线性表示 ** （习题 4.1）：
$$
\begin {align}

& 向量组 B 能由向量组 A 线性表示 \\

\iff& 向量组 B 中每个向量都能由向量组 A 线性表示 \\

\iff& \exist K, \quad \text{s.t.} \quad B=AK \\

\iff& AX=B 有解 \\

\iff& R(A,B) = R(A) \geqslant R(B) \\

\end {align}
$$
并定义两向量组 **等价** （例题 4.2 & 习题 4.2&19）：
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

> 两个矩阵的等价与两个向量组的等价的区别和联系：
>
> 1. 两个不同型的矩阵是不可能等价的，但两个不同型的向量组可以等价．
>
> 2. 若矩阵 $$A$$ 经初等行变换变成 $$B$$ ，即 $$A$$ 与 $$B$$ 行等价，则 $$A$$ 与 $$B$$ 的行向量组等价；
>
>　若矩阵 $$A$$ 经初等列变换变成 $$C$$ ，即 $$A$$ 与 $$C$$ 列等价，则 $$A$$ 与 $$C$$ 的列向量组等价；
>
>　若矩阵 $$A$$ 既经初等行变换又经初等列变换变成 $$D$$ ，那么矩阵 $$A$$ 与 $$D$$ 等价，但 $$A$$ 与 $$D$$ 的行向量组与列向量组未必等价．
>
> 3. 设两列向量组等价，且它们所含向量个数相同，记为 $$m$$，那么它们对应的两个 $$n\times m$$ 矩阵列等价，从而一定等价，但不一定行等价．
>
>　类似地，若两个含向量个数相同的行向量组等价，则它们对应的两矩阵行等价，从而一定等价，但不一定列等价．



> **例题 4.1**　给出向量 $$b$$ 能由向量组 $$A:a_1,a_2,\dots,a_n$$，证明向量 $$b$$ 能由 $$A$$ 组线性表示，并求出表达式．
>
> 解：将 $$B=(A,b)$$ 化为行最简形矩阵，得方程 $$\left(a_1,a_2,\dots,a_n\right)x=b$$ 的通解 $$x=\left(\begin{array}{c}x_1 \\x_2 \\\vdots \\x_n\end{array}\right) = \sum c_i\xi_i = \left(\begin{array}{c}f_1(c_i) \\f_2(c_i) \\\vdots \\f_n(c_i)\end{array}\right)$$ ，其中 $$c_i \in \mathbb{R}$$ 为自由变量，从而得表达式 $$b=\left(a_1,a_2,\dots,a_n\right) \left(\begin{array}{c}x_1 \\x_2 \\\vdots \\x_n\end{array}\right)=f_1(c_i)a_1+f_2(c_i)a_2+\dots+f_n(c_i)a_n$$．



**$$n$$ 维单位坐标向量**： $$n$$ 维单位矩阵 $$E=(e_1,e_2,\dots,e_n)$$ 的列向量．

【命题】任何一个 $$n$$ 维向量都可以由 $$n$$ 维单位坐标向量组线性表示．

> **例题 4.3**　设 $$n$$ 维向量组 $$A$$ 构成 $$n\times m$$ 型矩阵 $$A$$，证明： $$n$$ 维单位坐标向量组可以由向量组 $$A$$ 线性表示的充要条件是 $$R(A)=n$$．
>
> 证明：只要证明 $$R(A,E)=n$$，由习题三24.知成立．
>
> 评注：本题用矩阵语言描述：对矩阵 $$A_{n\times m}$$，
> $$
> \exist K_{m\times n} , \quad \text{s.t.} \quad AK=E_n \iff R(A)=n
> $$
> 或
> $$
> 方程A_{n\times m}X=E_n有解 \iff R(A)=n
> $$



### 4.3　向量组的内部关系

【$$\mathscr{Def4.4}$$】【$$\mathscr{Thm4.4}$$】定义向量组的 **线性相关** 和 **线性无关** （例题 4.5 & 习题 4.3&4）：

$$
\begin {align}

& 向量组 A:a_1,a_2,\dots,a_n 线性相关 \\

\iff& \exist k_1,k_2,\dots,k_n \left(\prod k_i \ne 0\right),
\quad \text{s.t.} \quad
k_1a_1+k_2a_2+\dots+k_na_n=0 \\

\iff& \exist k_1,k_2,\dots,k_n \left(\prod k_i \ne 0\right),
\quad \text{s.t.} \quad
A x=
\begin{pmatrix}
a_{11} & a_{12} & \ldots & a_{1n} \\
a_{21} & a_{22} & \ldots & a_{2 n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{s 1} & a_{s 2} & \ldots & a_{s n}
\end{pmatrix}
\begin{pmatrix}k_{1} \\k_{2} \\\vdots \\k_{n}\end{pmatrix}=0 \\

\iff& Ax=0有非零解 \\

\iff& R(A)<n\\\\\\

& 向量组 A:a_1,a_2,\dots,a_n 线性无关 \\

\iff& \forall k_1,k_2,\dots,k_n \left(\prod k_i \ne 0\right), \quad
k_1a_1+k_2a_2+\dots+k_na_n\neq0 \\

\iff& Ax=0有且仅有零解 \\

\iff& R(A)=n \\

\end {align}
$$

1. 线性相关通常对 $$n\geqslant2$$ 而言．

   但 $$n=1$$ 时定义同样适用，即当 $$a=0$$ 时，线性相关；当 $$a\ne0$$ 时，线性无关．

2. 当 $$n=2$$ 时，$$a_1,a_2$$ 线性相关 $$\iff a_1,a_2$$ 对应分量成比例（$$\iff a_1,a_2$$ 共线）．（习题 4.5）

3. 零向量线性相关，包含零向量的向量组线性相关．

4. $$n$$ 维单位坐标向量组 $$E$$ 线性无关．

   > 证明（例题 4.4）：注意 $$R(E)=n$$，利用 $$\mathscr{Thm4.4}$$ 即得．



【**命题**】　向量组 $$A:a_1,a_2,\dots,a_n(n\geqslant 2)$$ 线性相关 $$\iff$$ 至少有一个向量可以由剩下的 $$n-1$$ 个向量线性表示．

> 证明：用定义不难证明．
>
> 注意：向量组 $$a_1,a_2,\dots,a_n$$ 线性相关，不能得出 $$a_1$$ 可以由 $$a_2,\dots,a_n$$ 线性表示．（习题 4.8）



> 【**命题**】　向量组 $$a,b$$ 线性相关 $$\Rightarrow$$ 向量组 $$a,ka+lb$$ 线性相关．（习题 4.6）
>
> 注意：向量组 $$a,b$$ 线性相关，向量组 $$c,d$$ 线性相关，那么向量组 $$a+c,b+d$$ 不一定线性相关．（习题 4.7）
>　　　 向量组 $$a+c,b+d$$ 线性相关(无关)，那么向量组 $$a,b$$、向量组 $$c,d$$ 不一定线性相关(无关)．（习题 4.8）
>　　　 向量组 $$a,b$$ 线性相关，向量组 $$c,d$$ 线性相关，不能得出存在不全为 0 的实数 $$\lambda,\mu$$ 使 $$\lambda a+\mu b=0$$ 和 $$\lambda c+\mu d=0$$ 同时成立．（习题 4.8，此即两个齐次方程有非零解不能得出有公共非零解）



> **例题 4.6**　已知向量组 $$A:a_1,a_2,a_3$$ 线性无关，$$b_1=a_1+a_2, \quad b_2=a_2+a_3, \quad b_3=a_3+a_1$$ ，证明：向量组 $$B:b_1,b_2,b_3$$ 线性无关．
>
> 法1：定义（习题 4.9）
> 注意设未知数应当对于 $$B$$，再利用 $$A$$ 的条件得出未知数之间的关系．
>
> 法2：线性方程组的解
> 记 $$B=AK$$，其中 $$K=\left(\begin{array}{cccc} 1 & 0 & 1 \\ 1 & 1 & 0 \\ 0 & 1 & 1 \end{array}\right)$$．设 $$Bx=0$$, 以 $$B=AK$$ 代入得 $$A(Kx)=0$$．因为矩阵 $$A$$ 的列向量组线性无关，根据线性无关的定义，$$Kx=0$$．又因为 $$|K|≠0$$，所以 $$Kx=0$$ 只有零解 $$x=0$$，即 $$Bx=0$$ 也只有零解．于是 $$B$$ 的列向量组 $$b_1,b_2,b_3$$ 线性无关．
>
> 法3：矩阵的秩（习题 4.10&11）
> 因 $$|K|≠0$$，即 $$K$$ 可逆，所以由可逆阵相乘不改变矩阵的秩知 $$R(B)=R(A)=3$$，结论立刻成立．



【$$\mathscr{Thm4.5.1.1}$$】（部分有 $$\Rightarrow$$ 整体有）$$A_0:a_1,a_2,\dots,a_r$$ 线性相关 $$\Rightarrow A:a_1,a_2,\dots,a_r,a_{r+1}\dots,a_n$$ 线性相关
（整体无 $$\Rightarrow$$ 部分无）$$A:a_1,a_2,\dots,a_n$$ 线性无关 $$\Rightarrow A_0:a_1,a_2,\dots,a_r(r\leqslant n)$$ 线性无关

> 证明：反复利用 $$\mathscr{Thm4.4}$$ 有 $$R(A)\leqslant R(A_0)+1<r+1\leqslant n$$．



> 【$$\mathscr{Thm4.5.1.2}$$】（低维无 $$\Rightarrow$$ 高维无）设有两个列向量组 $$A: a_{1}, a_{2}, \dots, a_{m}, \quad B: b_{1}, b_{2}, \dots, b_{m}$$ ，其中 $${a}_{j}=\left(\begin{array}{c}{a}_{1 j} \\{a}_{2 j} \\\vdots \\{a}_{r j}\end{array}\right), \quad {b}_{j}=\left(\begin{array}{c}{a}_{1 j} \\{a}_{2 j} \\\vdots \\{a}_{r j} \\{a}_{r+1, j}\end{array}\right), \quad {j}=1,2, \dots, {m}$$ ，即向量 $$b_j$$ 是由向量 $$a_j$$ 添加一个分量而成，若 $$a$$ 线性无关，则 $$b$$ 也线性无关
>
> 推论： $$r$$ 维向量组的每个向量添上 $$n-r$$ 个分量，成为 $$n$$ 维向量组．若 $$r$$ 维向量组线性无关，则 $$n$$ 维向量组亦线性无关；反过来，若 $$n$$ 维向量组线性相关，则 $$r$$ 维向量组亦线性相关．（这里可以从线性无关相关的表达式思考，结论就比较显然）



> 【$$\mathscr{Thm4.5.1.3}$$】（同步改变向量的分量顺序没有影响）设 $$A: a_{1}, a_{2}, \dots, a_{m}, \quad B: b_{1}, b_{2}, \dots, b_{m}$$ ，其中 $$a_{j}=\left(\begin{array}{c}a_{1 j} \\{a}_{2 j} \\\vdots \\{a}_{n j}\end{array}\right), \quad {b}_{j}=\left(\begin{array}{c}{a}_{2 j} \\{a}_{1 j} \\\vdots \\{a}_{n j}\end{array}\right), \quad {j}=1,2, \dots, {m}$$ ，即向量 $$b_j$$ 是把 $$a_i$$ 的第一二个分量对调，则两个向量组的线性相关性相同．
>
> 推广：只要是任意改变排列都不影响线性相关性．



【$$\mathscr{Thm4.5.2}$$】当 $$m>n$$ 时， $$m$$ 个 $$n$$ 维向量 $$a_{1}, a_{2}, \dots, a_{m}$$ 线性相关．特别地 $$n+1$$ 个 $$n$$ 维向量线性相关．

> （在这里 $$n$$ 是未知量的个数， $$m$$ 是方程的个数，所以当方程个数比未知数多时，显然满足）
>
> 证明：记 $$m$$ 个 $$n$$ 维向量构成矩阵 $$A_{n\times m}$$，则 $$R(A)\leqslant n<m$$．



【$$\mathscr{Thm4.5.3}$$​】（添加的关系）设 $$A:a_1,a_2,\dots,a_n$$​ 线性无关，$$B:a_1,a_2,\dots,a_n,b$$​ 线性相关，则 $$b$$​ 可以由 $$A$$​ 线性表示，且表达式惟一．

> 证明： $$n=R(A)\leqslant R(B)<n+1\Rightarrow R(B)=n\Rightarrow R(A)=R(B)$$，则方程组 $$Ax=b$$ 有惟一解，于是向量 $$b$$ 能由 $$A$$ 组线性表示，且表达式惟一．



> **例题 4.7**　设向量组 $$a_1, a_2, a_3$$ 线性相关，向量组 $$a_2, a_3, a_4$$ 线性无关，证明：
> (1) $$a_1$$ 能由 $$a_2, a_3$$ 线性表示；
> (2) $$a_4$$ 不能由 $$a_1, a_2, a_3$$ 线性表示．
>
> 证明：
> (1) 反复利用 $$\mathscr{Thm4.5}$$．
> (2) 用反证法，并结合(1)的结论知 $$a_4$$ 能由 $$a_2, a_3$$ 线性表示，便产生了矛盾．



### 4.4　向量组的秩和最大无关组

考虑无限多个向量．将向量组定义中向量个数的有限性去掉，推广相关定理，以向量组的最大无关组过渡．

> 证明：取最大无关组，并利用最大无关组和原向量组线性相关以及线性相关的传递性即可．



【$$\mathscr{Def4.5}$$】称向量组 $$A$$ 的一个部分组 $$A_0$$ 为向量组 $$A$$ 的 **最大线性无关组（最大无关组）**，当：

向量组 $$A$$ 中的 $$r$$ 个向量构成的向量组 $$A_0$$ 满足：
(1) 向量组 $$A_0$$ 线性无关；
(2) $$A$$ 中任意 $$r+1$$ 个向量都线性相关．

或

向量组 $$A$$ 的一个部分组 $$A_0$$ 满足：
(1) 向量组 $$A_0$$ 线性无关；
(2) 向量组 $$A$$ 中的任一向量都由 $$A_0$$ 线性表示．

以上两种表述等价．

> 等价性的证明：
>
> 设 $$A$$ 中任意 $$r+1$$ 个向量构成向量组 $$A_1$$ ，则 $$A_1$$ 能由 $$A_0$$ 线性表示，由 $$\mathscr{Thm4.3}$$ 知 $$R(A_1)\leqslant R(A_0)=r<r+1$$ ，由 $$\mathscr{Thm4.4}$$ 知 $$A_1$$ 线性相关，此即第一种表述的条件(2)．

向量组 $$A$$ 的 **秩**：最大无关组 $$A_0$$ 的向量个数 $$r$$ ，因此不同的最大无关组中包含的向量个数相同．

1. 规定：只含零向量的向量组没有最大无关组，它的秩为 $$0$$ ．

2. 向量组的最大无关组一般不惟一．

3. 线性无关的向量组的最大无关组是其本身．

4. 向量组的最大无关组与原向量组等价，借此把无限化为有限的问题．

   > 证明：利用 $$\mathscr{Thm4.5.1.1}$$ 和 $$\mathscr{Thm4.5.3}$$ 分别可证充分性和必要性．



> **例题 4.8**　求全体 $$n$$ 维向量构成的向量组 $$\mathbb{R}^n$$ 的秩．
>
> 解：由 例题 4.4 知 $$E_n$$ 线性无关，又由 $$\mathscr{Thm4.5.2}$$ 知其中任意 $$n+1$$ 个向量线性相关，故秩为 $$n$$．
>
> 评注：$$E_n$$ 即是 $$\mathbb{R}^n$$ 的一个最大无关组，且任意 $$n$$ 个线性无关的 $$n$$ 维向量都是 $$\mathbb{R}^n$$ 的一个最大无关组（基），由此知 $$\mathbb{R}^n$$ 的维数为 $$n$$，故称 $$\mathbb{R}^n$$ 为 $$n$$ 维向量空间．（习题 4.17）



> **例题 4.9**　求齐次线性方程组的全体解向量构成的向量组 $$S$$ 的秩．
>
> 解：记 $$S=\left\{x \mid x=\sum c_i\xi_i, c_i\in\mathbb{R} \right\}$$ ，则 $$S$$ 可以由 $$\xi_i$$ 构成的向量组 $$\Xi$$ 线性表示，且可证 $$\Xi$$ 线性无关，则 $$\Xi$$ 是一个最大无关组， $$S$$ 的秩为 $$\Xi$$ 的元素个数，也即方程组自由未知量的个数．



【$$\mathscr{Thm4.6}$$】矩阵的秩等于它的 **行秩**，也等于它的 **列秩**．

> 证明：设 $$A=(a_1,a_2,\dots,a_m), R(A)=r$$，并设 $$r$$ 阶子式 $$D_r\ne0$$，知 $$D_r$$ 所在的 $$r$$ 列构成的 $$n\times r$$ 矩阵的秩为 $$r$$，由 $$\mathscr{Thm4.4}$$ 知此 $$r$$ 列线性无关．又由 $$𝐴$$ 中所有 $$𝑟+1$$ 阶子式均为零，知 $$𝐴$$ 中任意 $$𝑟+1$$ 个列向量构成的 $$n\times (r+1)$$ 矩阵的秩小于 $$r+1$$，故此 $$r$$ 列线性相关．因此 $$D_r$$ 所在的 $$r$$ 列是 $$A$$ 的列向量的一个最大无关组，所以列向量组的秩等于 $$r$$．类似可证 $$A$$ 的行向量组的秩也等于 $$R(A)$$．

推论：设矩阵 $$𝐴$$ 的某个 $$r$$ 阶子式 $$D_r$$ 是 $$𝐴$$ 的最高阶非零子式，则 $$D_r$$ 所在的 $$r$$ 个行向量即是 $$𝐴$$ 的行向量组的一个最大无关组；$$D_r$$ 所在的 $$r$$ 个列向量即是 $$𝐴$$ 的列向量组的一个最大无关组．



> 【命题】矩阵 $$A$$ 经过初等行变换化为矩阵 $$B$$，则 $$A,B$$ 的行向量组之间等价，而 $$A,B$$ 的列向量组之间有相同的线性组合关系．由此知 $$R(A,B)=R(B,A)$$．



>**例题 4.10**　给定矩阵 $$A$$（略），求矩阵 $$A$$ 的列向量组的一个最大无关组，并把不属最大无关组的列向量用最大无关组线性表示．（习题 4.14）
>
>解：对 $$A$$ 施行初等行变换变为行阶梯形矩阵，由 $$R(A)=3$$ 知列向量组的最大无关组含 $$3$$ 个向量，而三个非零行的第一个非零元在 $$1,2,4$$ 三列，注意将 $$(a_1,a_2,a_4)$$ 变为行阶梯形矩阵的秩也为 $$3$$ ，故 $$a_1,a_2,a_4$$ 为矩阵 $$A$$ 的列向量组的一个最大无关组．
>再将 $$A$$ 化成行最简形 $$B$$，现在， $$B=\left(\begin{array}{ccccc} 1 & 0 & -1 & 0 & 4\\ 0 & 1 & -1 & 0 & 3 \\ 0 & 0 & 0 & 1 & -3 \\ 0 & 0 & 0 & 0 & 0\end{array}\right)$$．
>
>*由于方程 $$Ax=0$$ 与 $$Bx=0$$ 同解，故向量 $$a_1,a_2,a_3,a_4,a_5$$ 之间与向量 $$b_1,b_2,b_3,b_4,b_5$$ 之间有相同的线性相关性．且有 $$b_3=-b_1-b_2,b_5=4b_1+3b_2-3b_4$$，故也有 $$a_3=-a_1-a_2, a_5=4a_1+3a_2-3a_4$$．*
>
>评注：最后一段的斜体字可以省略，直接得出结果 $$a_3=-a_1-a_2, a_5=4a_1+3a_2-3a_4$$．



> **例题 4.11**　设向量组 $$B$$ 能由向量组 $$A$$ 线性表示，且它们的秩相等，证明向量组 $$A$$ 与向量组 $$B$$ 等价．
>
> 设 $$R_A=R_B=r$$．
>
> 法1：向量组 $$A$$ 和向量组 $$B$$ 合并而成的向量组 $$C$$，因 $$B$$ 组能由 $$A$$ 组线性表示，由 $$\mathscr{Thm4.2}$$ 知 $$R_A=R_C$$，再结合条件知 $$R_A=R_B=R_C$$，再由 $$\mathscr{Thm4.2}$$ 便证明了结论．
>
> 法2：只要证明向量组 $$A$$ 能由向量组 $$B$$ 线性表示．设 $$A$$ 组和 $$B$$ 组的最大无关组分别为 $$A_0$$ 和 $$B_0$$，则由 $$B$$ 组能由 $$A$$ 组线性表示知 $$B_0$$ 组能由 $$A_0$$ 组线性表示．则存在 $$r$$ 阶方阵 $$K$$，使 $$B_0=A_0K$$．由此式知 $$R(K)\geqslant R(B)=r$$，而 $$R(K)\leqslant r$$，故只能 $$R(K)=r$$．则方阵 $$K$$ 可逆，进而 $$A_0=B_0K^{-1}$$，这表明 $$A_0$$ 组能由 $$B_0$$ 组线性表示，则 $$A$$ 组能由 $$B$$ 组线性表示．



> **习题 4.16**　设 $$R(a,b)=R(a,b,c)=2$$，$$R(a,b,d)=3$$，求 $$R(a,b,2c-3d)$$．
>
> 解：利用 $$\mathscr{Thm4.4}$$ 找出线性无关的向量，并得出 $$a,b,c,d$$ 的一个最大无关组是 $$A_0:a,b,d$$，这样将 $$a,b,2c-3d$$ 用 $$A_0$$ 表示，发现系数阵可逆，则 $$R(a,b,2c-3d)=R(a,b,d)=3$$． 



> **习题 4.18**　设向量组 $$𝐴: 𝑎_1, 𝑎_2, \dots , 𝑎_n$$ 线性相关，且 $$𝑎_1 \ne 0$$．证明存在某个向量 $$𝑎_s (2\leqslant s\leqslant n)$$ 能由 $$𝑎_1, 𝑎_2, \dots , 𝑎_{s−1}$$ 线性表示．
>
> 法 1（由条件出发）：
>　　 使用定义，知存在不全为 $$0$$ 的 $$k_1,k_2,\dots,k_n$$，使 $$k_1a_1+k_2a_2+\dots+k_na_n=0(*)$$ 成立．
>　　 结合 $$𝑎_1 \ne 0$$，用反证法可以证明 $$k_2,\dots,k_n$$ 也不全为 $$0$$．
>　　 不妨设 $$s_0(2\leqslant s_0\leqslant n)$$ 满足 $$k_2=\dots=k_{s_0}\ne0,k_{s_0+1}=\dots=k_n=0$$．
>　　 代入 $$(*)$$ 式有 $$k_1a_1+k_2a_2+\dots+k_{s_0}a_{s_0}=0$$，这表明 $$a_{s_0}$$ 可以由 $$a_1,a_2,\dots,a_{s_0-1}$$ 线性表示．
>　　 那么取 $$s=s_0$$ 即可．
>
> 法 2（逆否命题）：原问题等价于
> 已知不存在某个向量 $$a_s (2\leqslant s\leqslant n)$$ 使 $$a_s$$ 能由 $$𝑎_1, 𝑎_2, \dots , 𝑎_{s−1}$$ 线性表示，证明向量组 $$𝐴: 𝑎_1, 𝑎_2, \dots , 𝑎_n$$ 线性无关．
> 证明：设 $$k_1a_1+k_2a_2+\dots+k_na_n=0(*)$$．
>　　 对于 $$2\leqslant s\leqslant n$$，由于 $$a_s$$ 不能由 $$a_1, a_2, \dots , a_{s−1}$$ 线性表示，易得 $$k_s=0(2\leqslant s\leqslant n)$$．
>　　 代入 $$(*)$$ 式有 $$k_1a_1=0$$，由题设 $$𝑎_1 \ne 0$$，故 $$k_1=0$$．
>　　 也即 $$k_1=k_2=\dots=k_n=0$$，则 $$(*)$$ 式表明向量组 $$A$$ 线性无关．
>
> 法 3（秩和具体形式）：
>　　 记 $$\widetilde A$$ 是 $$𝐴$$ 的行最简形，由于 $$𝑅(𝐴) < 𝑚$$，那么 $$\widetilde A$$ 中一定存在不含首非零元的一列 $$\widetilde a_s$$．
>　　 因为 $$a_1\ne0$$, 那么 $$\widetilde A$$ 第 1 列含首非零元，于是 $$\widetilde a_s$$ 不在第 1 列，所以 $$s\geqslant2$$．
>　　 由 $$\widetilde A$$ 可知 $$\widetilde a_s$$ 由 $$\widetilde a_1,\widetilde a_2,\dots,\widetilde a_{s-1}$$ 线性表示，故 $$a_s$$ 能由 $$𝑎_1, 𝑎_2, \dots , 𝑎_{s−1}$$ 线性表示．（初等行变换不改变列向量的线性表达的系数）
>
> 评注：法 3 是老师给的参考答案，需要考虑矩阵具体的形式，比较抽象（可以写一些具体的数感受一下）．法 1 的难点在不妨设，法 2 的难点在逆否转化．个人感觉法 2 的可操作性较强．



### 4.5　向量空间

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



> **例题 4.18**　证明：等价向量组生成的向量空间相等．（习题 4.22）
>
> 证明：分别证明 $$L_1\subseteq L_2$$ 和 $$L_2\subseteq L_1$$．由 $$\forall x\in L_1$$，$$x$$ 可由 $$A$$ 组线性表示且 $$A$$ 组和 $$B$$ 组等价，知 $$x$$ 可由 $$B$$ 组线性表示，则 $$x\in L_2$$，便证明了 $$L_1\subseteq L_2$$．



> **例题 4.19 & 习题 4.23**　(1) 验证向量组 $$A$$ 是 $$\mathbb{R}^3$$ 的一个基；(2) 求 $$B$$ 在这个基下的坐标．
>
> 解：(1) 只要验证 $$A$$ 的列向量线性无关，即证矩阵 $$A\sim E$$．(2) 即 $$X=A^{-1}B$$ 的列向量．



> 【**命题**】证明：(1) 从基 $$a_1,a_2,\dots,a_n$$ 到 $$b_1,b_2,\dots,b_n$$ 的过渡矩阵 $$P=A^{-1}B$$；
>　　　　　　   (2) 设向量 $$\alpha\in\mathbb{R}^n$$ 在旧基和新基下的坐标分别为 $$y_1,y_2,\dots,y_n$$ 和 $$z_1,z_2,\dots,z_n$$，则它在两个基下的坐标变换公式为 $$\left(z_1,z_2,\dots,z_n\right)^\mathrm T=P^{-1}\left(y_1,y_2,\dots,y_n\right)^\mathrm T$$．（例题 4.21 & 习题 4.24）
> 
>证明： (1) $$(b_1,b_2,\dots,b_n)=(e_1,e_2,\dots,e_n)B=(a_1,a_2,\dots,a_n)A^{-1}B$$．
>　　　  (2) $$\alpha=A\left(y_1,y_2,\dots,y_n\right)^\mathrm T=B\left(z_1,z_2,\dots,z_n\right)^\mathrm T$$．（例题 4.20）

<div style="page-break-after:always;"></div>

## 第五章　相似矩阵及二次型

### 5.1　向量的内积、范数

【$$\mathscr{Def5.1}$$】$$n$$ 维列向量 $$x =\left(x_1,x_2,\dots,x_n\right)^\mathrm T,y = \left(y_1,y_2,\dots,y_n\right)^\mathrm T$$ 的 **内积**： $$(x,y) = x^\mathrm Ty = \sum_{i=1}^n x_iy_i$$．

1. 内积满足交换律和线性运算．
2. 当 $$x=0$$ 时，$$(x,x) = 0$$；当 $$x\neq0$$ 时，$$(x,x)>0$$．
3. （施瓦兹不等式）$$(x,y)^2 \leqslant (x,x)(y,y)$$．

> 证明：仅证明 3.．设 $$z = x - \lambda y$$，则 $$(z,z) = (x - \lambda y,x-\lambda y) = (x,x-\lambda y) + (-\lambda y, $$ $$x-\lambda y) = (x,x) + (-\lambda y,x) + (-\lambda y,x) + (-\lambda y,-\lambda y) =(x,x)-2\lambda(y,x) + \lambda ^2(y,y)$$，将上式看作关于 $$\lambda$$ 的函数，结合性质 (4)，有 $$f(\lambda) = (x,x)-2\lambda(y,x) + \lambda ^2(y,y) \geqslant 0$$，其判别式 $$\Delta = 4(x,y)^2 - 4(x,x)(y,y) \leqslant 0$$，即得 $$(x,y)^2 \leqslant (x,x)(y,y)$$．

【$$\mathscr{Def5.2}$$】向量 $$x$$ 的 **范数** $$||x||=\sqrt{(x,x)}$$．向量 $$x$$ 和 $$y$$ 的 **夹角** $$\theta=\arccos\frac{(x,y)}{||x||·||y||}$$．

### 5.2　向量的正交性

向量 $$x$$ 和 $$y$$ **正交**：$$(x,y)=0$$．

【$$\mathscr{Thm5.1}$$】正交向量组线性无关．

> 证明：使用定义．

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

**对于矩阵与向量乘积 $$Ax$$ 的直观理解**
(1)  $$A$$ 为 **改造机**，理解为空间(坐标基)仍然没有变，而是把向量 $$x$$ 进行了改造；
(2)  $$A$$ 为 **转换器**，理解为 $$x$$ 没有变，只是空间(坐标基)变了，从而看待这个向量的方向和大小都遵循新的空间(坐标基)．

> *举个不恰当的例子（~~根据真实情境改编~~）：*
> *如果 x=(0.04) 代表舍长在传子的月末生活费，现有式子 Ax=0.64．*
> *把 A 当作改造机时，Ax=0.64 表明舍长的钱还在他手上，但是通过 A 变多了，可能是某个好舍友发了个大红包改造了他的钱数；*
> *而把 A 当作转换器时，它能实现不同平行世界之间的转换，在小仙女的帮助下，舍长来到了仙女国，Ax=0.64 说明他在这个新世界的钱的面额为 0.64，但是钱并没有变化，还是这么多，因为仙女国的 0.64 和传子的 0.04 是一样的．*

一般来说，一个向量 $$x$$ 在经过某个矩阵 $$A$$ 的改造为 $$Ax$$ 后，其长度和方向都会有所变化．但有些矩阵能够遇到自己的情投意合的对象 $$x$$，他们经过改造后输出的值和输入共线，这是十分稀少且难得的是一件事情！首先矩阵 $$A$$ 一定是 **方阵**，如果 **非零列向量** $$x$$ 满足所述，则称其为 **特征向量**，$$\lambda=\frac{Ax}{x}$$ 为 **特征值**，这样的变换为伸缩变换．*（$$\mathscr{Def5.6}$$）*

找对象总不能碰运气吧 ~ 下面我们帮助 $$A$$ 找到她情投意合的对象：*（什、、、*

- 步骤①：由 $$Ax=\lambda x$$ 得 $$(A-\lambda E)x=0$$，这是一个齐次线性方程组，它有非零解的充要条件是 **特征多项式** $$|A-\lambda E|=0$$，称为 **特征方程**，则可求出所有的特征值．
- 步骤②：对每个特征值 $$\lambda_i$$，代回定义式就可以求出齐次线性方程组的基础解系，基础解系中每个向量 $$p_i$$ 的线性组合 $$\sum k_ip_i \left(\sum k_i^2\ne 0 \right)$$ 就是特征向量．因此一个特征值可能对应多个特征向量，但一个特征向量只对应一个特征值．*（例 5.5&5.6）*

以上就是本节的引入，但也是核心内容，是不是炒鸡简单 ~

> 参考资料：[《特征值与特征向量、矩阵相似对角化、二次型》个人笔记 (https://zhuanlan.zhihu.com/p/659161802)](https://zhuanlan.zhihu.com/p/659161802)

下面放性质（证明皆从略，请按括号里的标注参看课本）：

1. $$n$$ 阶方阵在复数范围内有 $$n$$ 个特征值．*（代数基本定理）*

   (1) 所有特征值之和等于方阵的 **迹**（trace，$$\operatorname{tr} (A)=\sum a_{ii}$$）．

   (2) 所有特征值之积等于方阵的行列式．

   　 推论：如果这些特征值都不为 0，那么这个方阵可逆．*至此矩阵逆的六种等价表述集结完毕！*

2. 对方阵作多项式，她的特征值也对应作多项式*（~~很浪漫呢 ~~~）*，而对应于特征值的特征向量不变．*（例 5.7&5.8）*

   对方阵作转置，她的特征值不变（也可以理解为一阶行列式作转置，~~*所以还是很浪漫*~~），而特征向量需要另算．

3. 对应于不同特征值的特征向量线性无关．*（$$\mathscr{Thm5.2}$$，理解：特征向量表示的是矩阵变换中只有伸缩变换没有旋转变换的方向向量，特征值是这个方向的伸缩系数，一个方向当然只有一个伸缩系数．）*

   推论：对应于两个不同特征值的线性无关的特征向量组，合起来仍线性无关．*（$$\mathscr{Thm5.2}$$ 推论）*

4. 不同特征值对应特征向量的线性组合不是特征向量．*（例 5.9）*

### 5.4　对角化

#### 5.4.1　一般矩阵的相似对角化

> *回到刚才的例子，我们把 A 理解为改造机，舍友发了个红包 A 让舍长的钱变多了，即 Ax=0.64，这是舍长在传子的情况．假设在舍长是在仙女国收到的红包，面额为 B，那么 B 是多少呢？设 P=2 是转换器，也就是两个国家的汇率，那么 Px=0.08 为舍长在仙女国的剩余生活费，又收到了 B 的红包，则生活费变为 B(Px)=1.28，另一方面舍长在传子的生活费按汇率计算就是 P(Ax)=1.28，这两者是相等的，即 BPx=PAx，也即 AP=PB，A 和 B 竟然是相似的！也就是说，**相似矩阵在两个平行时空中代表同一个变换**，在这个例子中，变换就是舍友发的红包．（~~抱歉我的表达能力仅限于此了 你们可能没听懂~~）*

**相似**：矩阵 $$B$$ 是矩阵 $$A$$ 的 **相似矩阵**，或矩阵 $$A$$ 与 $$B$$ 相似，即 $$P^{-1}AP=B$$．对 $$A$$ 进行 $$P^{-1}AP$$ 运算称为对 $$A$$ 进行 **相似变换**，可逆矩阵 $$P$$ 称为把 $$A$$ 变成 $$B$$ 的 **相似变换矩阵**．*（$$\mathscr{Def5.7}$$）*

1. 相似是特殊的等价，因此相似矩阵的秩相同．
2. 相似矩阵的特征多项式、特征值都相同，因此行列式相同．*（$$\mathscr{Thm5.3}$$）*

> *舍长的要求比较高，他对在仙女国收到的红包 B 并不满意，可能是自己的小数乘除法实在太差了，以至于他不知道这些钱够不够买 2 元的冰激凌，于是他要求前往另一个国家，使自己收到的红包必须是 2 的倍数 Λ，这样他可以恰好用这些钱来买冰激凌（假设蜜雪在每个国家的冰激凌都是 2 元），那么这个国家应如何寻找呢？*

**相似对角化**：对 $$n$$ 阶方阵 $$A$$，寻求相似变换矩阵 $$P$$，使得 $$P^{-1}AP= \Lambda$$ 为对角矩阵．

【条件】$$A$$ 有 $$n$$ 个线性无关的特征向量 $$\leftarrow$$ $$A$$ 的 $$n$$ 个特征值互不相等．*（$$\mathscr{Thm5.4}$$）*

【证明】注意 $$AP= P\Lambda \iff Ap_i=\lambda_ip_i(1\leqslant i\leqslant n)$$ ．*（$$\mathscr{Thm5.3}$$ 的推论，$$\lambda_i$$ 是 $$A$$ 的特征值，$$P$$ 的列向量 $$p_i$$ 就是 $$A$$ 对应于特征值 $$\lambda_i$$ 的特征向量）*

【意义】计算矩阵多项式 $$\varphi(A)=P^{-1}\varphi(\Lambda)P=P^{-1}\prod_{i=1}^n\varphi(\lambda_i)P$$．*（例 5.13）*

【求法】接 5.3，步骤③：将 $$n$$ 个线性无关的特征向量（如果有）拼成一个矩阵 $$P$$，特征值作为对角矩阵 $$\Lambda$$ 的对角元，注意排列次序一致．*（例 5.10&11）*

#### 5.4.2　合同对角化

**合同**：$$n$$ 阶矩阵 $$A$$ 和 $$B$$ 合同，若有可逆矩阵 $$C$$ ，使 $$B=C^\mathrm TAC$$．

**合同对角化**：对 $$n$$ 阶方阵 $$A$$，寻找合同变换矩阵 $$P$$，使 $$P^\mathrm TAP=\Lambda$$ 为对角矩阵．

#### 5.4.3　对称矩阵的正交对角化

> *经过一番检索，舍长的小助手小明（对，就是作者我）找到了一系列满足条件的国家，这下舍长的选择恐惧症犯了，他下令：要找到最标准最规范的一个国家！*

**对称矩阵**：$$A^\mathrm T=A$$．

1. 对称矩阵的特征值都是实数，故齐次线性方程组是实系数的，从而对应的特征向量可以取实向量；
2. 对称矩阵的对应不同特征值的特征向量正交（比线性无关更强）．
3. $$n$$ 阶对称矩阵 $$A$$ 的特征方程有 $$k$$ 重根 $$\lambda$$，则 $$R(A-\lambda E)=n-k$$ ，从而对应特征值 $$\lambda$$ 恰有 $$k$$ 个线性无关的特征向量．

**正交对角化**：对 $$n$$ 阶方阵 $$A$$，寻找正交阵 $$P$$，使 $$P^{-1}AP=P^\mathrm TAP=\Lambda$$ 为对角矩阵．

【定理】实对称矩阵必可正交对角化．*（$$\mathscr{Thm5.5}$$）*

【求法】接 5.4.1，在步骤②和③之间增加：将每组特征向量正交化、单位化．*（例 5.12）*

### 5.5　对角化的应用举隅——二次型的标准化

**二次型**：设 $$x=\left(x_1,x_2,\dots,x_n\right)^\mathrm T$$，二次齐次函数 $$f(x)=\sum_{i,j=1}^{n}a_{ij}x_ix_j=x^\mathrm TAx$$，其中 $$A=(a_{ij})$$ 称为 **二次型的矩阵**．

**二次型的秩**：$$r=R(A)\leqslant n$$．

#### 5.5.1　二次型的标准化

**二次型的标准化**：二次型必可经正交变换 $$x=Py$$ 化为 **标准型**（只含平方项的二次型） $$f=\sum_{i=1}^n\lambda_iy_i^2$$，其中 $$\lambda_i$$ 是二次型的矩阵的特征值，$$P$$ 是合同对角化得到的正交阵．*（$$\mathscr{Thm5.6}$$）*

**二次型的规范化**：二次型必可经可逆变换 $$x=Cy$$ 化为 **规范型**（是标准型，且系数满足 $$k_i\in\{-1,0,1\}$$） $$f=\sum_{i=1}^n\frac{\lambda_i}{|\lambda_i|}y_i^2$$，其中  $$C=PK,~~K=\operatorname{diag}(k_i),~~k_i=\left\{\begin{array}{lr}\frac{1}{\sqrt{|\lambda_i|}} , &i\leqslant r\\ 1, &i>r \end{array}\right.$$ ．*（$$\mathscr{Thm5.6}$$ 推论）（例 5.14）*

#### 5.5.2　判定二次型正负定性

称二次型 $$f(x)=x^\mathrm TAx$$ 为 **正(负)定二次型**，或称对称矩阵 $$A$$ 是 **正(负)定** 的，如果 $$\forall x\ne0,~~f(x)>0~(<0)$$．

判定二次型正负定性：

- **定　　   义 **：正定 $$\iff\forall x\ne0,~~f(x)>0$$；
　 　　　　　　　　　　　　　　　　　　　　负定 $$\iff\forall x\ne0,~~f(x)<0$$．

- **惯 性 指 数 **：正定 $$\iff$$ 标准形的系数全都为正 $$\iff$$ 规范形的系数全都为 1 $$\iff$$ 正惯性指数为 $$n$$．二次型的 **正(负)惯性指数** 为标准形中正(负)系数个数．它的数量是确定的，此即 **惯性定理**．正惯性指数与负惯性指数的和等于二次型的秩．*（$$\mathscr{Thm5.7\&8}$$）*

- **矩阵特征值**：正定 $$\iff$$ 二次型的矩阵特征值全为正．*（$$\mathscr{Thm5.8}$$ 推论）*

- **顺序主子式**：正定 $$\iff$$ 二次型的矩阵各阶顺序主子式全为正；*（$$\mathscr{Thm5.9}$$，赫尔维茨定理）*
  　　　　   　　　　　　　　　　　　　　　　　　　　负定 $$\iff$$ 偶数阶顺序主子式为正，而奇数阶顺序主子式为负．
  
- ***合　　   同**：正定 $$\iff$$ 二次型的矩阵与单位矩阵合同，即存在可逆矩阵 $$C$$ ，使得 $$A=C^\mathrm TC$$．*



> *最后总结一下下：*

### 5.*　本章解答题方法总结

- 步骤〇（仅 二次型）：求出二次型的矩阵．
- 步骤①：由 $$|A-\lambda E|=0$$，解出所有的特征值．
- 步骤②：对每个特征值 $$\lambda_i$$，代回 $$(A-\lambda E)x=0$$ 求出齐次线性方程组的基础解系，基础解系中每个向量 $$p_i$$ 的线性组合 $$\sum k_ip_i \left(\sum k_i^2\ne 0 \right)$$ 就是特征向量．
- 步骤③（仅 正交对角化 和 二次型）：将每组特征向量正交化、单位化．
- 步骤④：将 $$n$$ 个线性无关的特征向量（如果有）拼成一个矩阵 $$P$$，特征值作为对角矩阵 $$\Lambda$$ 的对角元，注意排列次序一致．
- 步骤⑤（仅 二次型）：还原为二次型．

<div style="page-break-after:always;"></div>

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





<img src=".\data\dog.jpg" alt="dog" style="zoom:32%;" />

<div style="page-break-after:always;"></div>

## 附　答疑区

欢迎 *[联系我们](https://www.askbox.ink/box/uu/DHPONQF7?uid=69e68fd831b7284904aa42b596e33c7d)* 匿名提问*（其它联系方式请见 <a href="#线性代数 Linear Algebra">第一页</a>）*，我会选取有价值的问题放在这里！



**Part 1　线性代数相关**

$$\mathcal{QUESTION~01}$$　在求解特征向量时，若选取的自由未知数不同，得到的基础解系不同，那么得到的特征向量也就不同，是这样的吗？
　　是滴 ~ 事实上，一方面不同的基础解系是等价的（注意我的表述，不代表任何与基础解系等价的向量组都是基础解系，另一个前提是线性无关），另一方面特征向量是特征子空间的基，向量空间不同的基相互等价．因此，使用另外一个基础解系得到仍然是特征向量，它们相互等价．

$$\mathcal{QUESTION~02}$$　不同的基础解系等价吗？
　　不同的基础解系等价．
　　解释：基础解系是一个向量组 $$\pmb{A}=(a_1,~a_2,~a_3)$$，这个向量组可张成齐次线性方程组的解空间．若基础解系与另外一个向量组 $$\pmb{B}$$ 等价，那么 $$\pmb{A}$$ 组和 $$\pmb{B}$$ 组能相互线性表示．则 $$\pmb{B}$$ 组的向量均可由基础解系，即 $$\pmb{A}$$ 组线性表示．于是，这个 $$\pmb{B}$$ 组应该也是方程组的基础解系了．

$$\mathcal{QUESTION~03}$$　一个向量组是基础解系的条件是什么？
　　一个向量组是基础解系的 **充要条件是：向量个数为 $$\pmb{n-r}$$，线性无关，是原方程组的解**．
　　若已有一个基础解系，那么所给向量组一定与这个基础解系等价，这是一个必要条件．

例：<img src=".\data\线性代数-Notes-withEx&Sol-4.0.0\image-20240107150526033.png" alt="image-20240107150526033" style="zoom:50%;" />

- A 项，等价向量组的向量个数不一定相等，也就是不一定是 3，错．
- B 项，等秩只是最大无关组的向量个数相等，向量组的向量个数不一定相等，错．（或者这样想：等秩不一定等价）
- C 项，它们线性相关（取 $$k_1=k_2=k_3$$ 便知），错．
- D 项，易于验证，皆满足．





**Part 2　其它**

$$\mathcal{QUESTION~01}$$　这篇笔记是用什么编辑器编写的？
　　当然是 $$\LaTeX$$！这篇笔记是由 markdown 格式转为了 PDF，使用 Typora 软件编辑．

$$\mathcal{QUESTION~02}$$　是什么让你无偿分享笔记的？
　　考虑到这两点：
　　　　别人能传播并且赏识我的作品是我的荣幸；
　　　　追求真理和欣赏美，是所有人平等的权利，是不能用金钱来计算的．
　











