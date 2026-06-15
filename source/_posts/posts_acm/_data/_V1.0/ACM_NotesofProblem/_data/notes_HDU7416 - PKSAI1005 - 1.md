---
title: 'notes_HDU7416 - PKSAI1005 - 1'
tags:
  - ACM
  - 算法
  - 筆記
---





# 题意

给定大小为 $$n$$ 的数组 $$\{a_n\}$$。

构造 $$b$$ 数组，$$b_{x, y} = \begin{cases} a_y, & x=0 \\ b_{x-1,y} \oplus b_{x-1,y+1} , & x>0  \end{cases}~$$（其中，$$x+y \leqslant n-1$$，$$\oplus$$ 表示异或操作）

有 $$q$$ 次询问，给定 $$(x, y)$$，求 $$b_{x, y}$$。

# 思路

## Step0

首先应考虑如何减小计算次数。

依异或运算的性质 $$x \oplus x=0$$，每一个数至多计算一次。（显然的）

我们首先想到将 $$b_{x, y}$$ 化到第一行计算，容易知道，计算 $$b_{x, y}$$ 只需要用到第一行的 $$b_{0, y},~b_{0, y+1},~\dots,~b_{0, y+x}$$ 这些数。哪些数需要计算呢？我们可以通过 **在异或表达式中出现的次数** 进行判断，如出现奇数次，就需要计算，如果是偶数次，那么就消掉了，不需要计算。

> 举个栗子，计算 $$b_{2,2}=b_{1,2} \oplus b_{1,3}=b_{0,2} \oplus b_{0,3} \oplus b_{0,3} \oplus b_{0,4}$$，它实际上等于 $$b_{0,2} \oplus b_{0,4}$$。我们称 $$b_{0,3}$$ 出现偶数次，$$b_{0,2}$$ 和 $$b_{0,4}$$ 出现奇数次。

如何判断出现的次数呢？

## Step1 模二杨辉三角

> 刚才的栗子中，$$b_{0,2},b_{0,3},b_{0,4}$$ 出现的次数分别是 $$1,2,1$$，它是杨辉三角的第 $$2$$ 行。

能够证明，在 $$b_{x, y}$$ 的异或表达式中，$$b_{0, y},~b_{0, y+1},~\dots,~b_{0, y+x}$$ 出现的次数恰好是杨辉三角的第 $$x$$ 行。因此需要知道，**杨辉三角中，哪些项是奇数，哪些是偶数**。

先打个表：



> 打表程序（最朴素的杨辉三角）：
>
> ```cpp
> int a[88][88] = { 0 };
> for (int i = 0; i < n; ++i) {
>     a[i][0] = a[i][i] = 1;
>     for (int j = 1; j < i; ++j) a[i][j] = a[i-1][j] ^ a[i-1][j-1];
> }
> for (int i = 0; i < n; ++i) {
>     std::cout << '\n' << i << ":\t";
>     for (int j = 0; j < 88 - i; ++j) std::cout << " ";
>     for (int j = 0; j < i + 1; ++j) std::cout << a[i][j] << " ";
> }
> ```

我发现它的第 $$2^i$$ 行只有首末项是奇数，其它是偶数，而第 $$2^i-1$$ 行全为奇数。有一个想法是，将欲求的项化到第 $$2^i$$ 行之前的两项，即 $$b_{x,y}=b_{x-2^i,y} \oplus b_{x-2^i,y+2^i}$$，再（依二进制位）递归计算。

> 如 $$x=19 \xrightarrow{19-16=3} x=3 \xrightarrow{3-2=1} x=1 \xrightarrow{1-1=0} x=0$$。

这样计算的项数会比较少……吗？每有一个二进制位为 $$1$$，计算次数就要翻倍，最坏情况需要计算 $$2^{15}$$ 次，$$\text{TLE}$$。

一个自然的想法是不要全部化为 $$x=0$$，可以先预处理前 $$N$$ 行，化到 $$x<N$$ 时直接出结果（有点 **根号分治** 的想法），但依旧 $$\text{TLE}$$。我们必须解决「计算次数就要翻倍」这个问题。

再次问这个问题：如何减小计算次数？

既然我们决定化到 $$x<N$$ 了，那到底哪一行合适？

## Step2 分形

借助你强大的观察力，发现，**模二杨辉三角第 $$\boldsymbol x$$ 行的数是由 $$\boldsymbol{\frac xN}$$ 行的每两个数之间插入 $$\boldsymbol{N-1}$$ 个 $$\boldsymbol0$$ 得到的（其中 $$\boldsymbol{N=2^i}$$**）。

没注意到也没关系，如果你的注意力足够……~~近视~~的话，能发现上面那个图形是个 **分形**。

> *分形是一种可以分成数个部分，且每一部分都是整体缩小后的形状的形态特征。*

有什么用？我们可以从图中「抽出」一个图形，比如，每隔 $$4$$ 行 $$4$$ 列的数全部提取出来，依旧是一个模二杨辉三角。同样可得，第 $$x$$ 行的数是由 $$\frac x4$$ 行的每两个数之间插入 $$3$$ 个 $$0$$ 得到的。
$$
{\color{green}1} \\
{\color{blue}1~1} \\
{\color{blue}1~0~1} \\
1~1~1~1 \\
{\color{red}1}~0~0~0~{\color{red}1} \\
1~1~0~0~1~1 \\
1~0~1~0~1~0~1 \\
1~1~1~1~1~1~1~1 \\
{\color{red}1}~0~0~0~{\color{red}0}~0~0~0~{\color{red}1} \\
$$
这样的递归就快很多了：如果 $$x=Nq$$（绿色的尖尖），直接看第 $$0$$ 行（最下面一行红色）中哪些数需要计算，一步结束。而第 $$0$$ 行又和蓝色的杨辉三角的最下面一行（实际上是第 $$q$$ 行的杨辉三角）相同，依据杨辉三角第 $$q$$ 行的 $$01$$ 值就能判断第 $$0$$ 行哪些数需要计算了。

如果带有余数 $$x=Nq+r$$，考虑子三角，化到第 $$r$$ 行，因为已经预处理前 $$N$$ 行了，第 $$r$$ 行的所有数已知，需要计算的数同理依据蓝色的杨辉三角判断。

# 实现

前 $$N$$ 行直接算：

```cpp
for (int j = 1; j < N; ++j) {
    for (int i = 0; i < n - j; ++i) {
        a[j][i] = a[j - 1][i] ^ a[j - 1][i + 1];
    }
}
```

预处理杨辉三角：

```cpp
b[0][0] = 1;
for (int j = 1; j < M; ++j) {
    b[j][0] = b[j][j] = 1;
    for (int i = 1; i < j; ++i)
        b[j][i] = b[j - 1][i] ^ b[j - 1][i - 1];
}
```

核心部分：

```cpp
inline int solve(int x, int y) {
    int q = x / N, r = x % N;
    int ans = 0;
    for (int i = 0; i <= q; ++i) { // 第q行的杨辉三角
        if (b[q][i] == 1) // 是1 需要计算
            ans ^= a[r][i * N + y]; // 依次计算 y和r是余数或者说偏差 *N是因为每两个数之间插入N-1个0
    }
    return ans;
}
```



# `AC code`

```cpp
#include <cstdio>

#define Code int main() { int T=1;
#define Codes int main() { int T=read();
#define by while (T--) eachT();
#define HTLDL return 0;
#define HappyHDUPKSAI }
inline long long read() { char st; long long x = 0; int fu = 1; st = getchar(); while (st > 57 || st < 48) { if (st == 45) fu = -1; st = getchar(); }while (st <= 57 && st >= 48) { x = (x << 3) + (x << 1) + st - 48; st = getchar(); }return x * fu; }

typedef long long ll;
const int maxN = 3e5 + 7, N = 512, M = 587;
int a[N][maxN], b[M][M];

inline int solve(int y, int x) {
    int q = x / N, r = x % N;
    int ans = 0;
    for (int i = 0; i <= q; ++i) {
        if (b[q][i] == 1)
            ans ^= a[r][i * N + y];
    }
    return ans;
}

void eachT() {
    int n = read();

    for (int i = 0; i < n; ++i) a[0][i] = read();
    for (int j = 1; j < N; ++j) {
        for (int i = 0; i < n - j; ++i)
            a[j][i] = a[j - 1][i] ^ a[j - 1][i + 1];
    } // 前N行直接算

    b[0][0] = 1;
    for (int j = 1; j < M; ++j) {
        b[j][0] = b[j][j] = 1;
        for (int i = 1; i < j; ++i)
            b[j][i] = b[j - 1][i] ^ b[j - 1][i - 1];
    } // 楊輝三角

    int q = read();
    while (q--) printf("%d\n", solve(read(), read()));
}

Code by HTLDL
HappyHDUPKSAI
```

