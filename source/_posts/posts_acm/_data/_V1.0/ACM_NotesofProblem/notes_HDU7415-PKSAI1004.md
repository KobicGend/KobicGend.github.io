---
title: 杭电个人PK赛(1) 1004合法数对［简中］
tags:
  - 題解
  - 筆記
  - ACM
categories:
  - - 筆記
    - 題解
abbrlink: e7f5867a
date: 2024-03-10 20:36:30
updated: 2024-03-15 10:51:17
description: '2024杭电ACM-个人PK赛(1) 1004合法数对 - HDU7415'
---

*[题目链接](https://acm.hdu.edu.cn/showproblem.php?pid=7415)*

# HDU7415 - PKSAI1004

## 题意

给定 $N$（以二进制的形式给出），求满足 $x,y \in [0,N]$，且 $x \oplus y = x \,|\, y$ 的数对 $(x,y)$ 的个数（对 $998244353$ 取模）．

---

## 思路

*（不想看分析的可直接看 <a href="##结论">结论</a> 或 <a href="##ACcode">代码</a> ）*

*（下文中 $N,x,y$ 等，若不加说明，指的是其二进制．）*

比较按位异或和按位与的运算法则，不难发现，**对于 $\boldsymbol x$ 和 $\boldsymbol y$ 的（二进制的）第 $\boldsymbol i$ 位 $\boldsymbol{x_i,y_i}$，有 $\boldsymbol{(x_i,y_i) = (0,0) \text{ or } (0,1) \text{ or } (1,0)}$，不能为 $\boldsymbol{(1,1)}$．**

如果 $N=\underbrace{11\dots1}_{n个}$，那么对于每一位，$(x_i,y_i)$ 都有 $3$ 种取值，答案为 $3^n$．（样例中 $27$ 的来源）

如果有 $0$，那么数对个数就没有这么多了，因为需要保证 $x,y \leqslant N$．

---

### 例子

先举个例子：$N=100$：从高位开始，如果 $(x_0,y_0)=(1,0)$，那么对于后面两位，$x_1,x_2$ 只能取 $0$，而 $y_1,y_2$ 则无限制．

为什么从高位开始？简单来说，比大小是从高位比的，如果 $x$ 最高位比 $N$ 小，那么 $x$ 一定比 $N$ 小，前一位将确定性地影响后面的选择．进一步联想到，比大小中这一位相同看下一位，应该 **从高位开始逐位看**．

回到 $N=100$，我们一位一位地看：

- 第一位是 $N_0=1$：有 $\operatorname{ans}(N_0)=3^1=3$ 种取值；
- 再加上下一位，$N_1=10$：第二位并不是总有 $3$ 种取值，应该比 $3N_0$ 少一些情形，具体地说，当 $(x_0,y_0)=(1,0)$ 时，第二位不能取 $(1,0)$，当 $(x_0,y_0)=(0,1)$ 时，第二位不能取 $(0,1)$，少了 $2$ 种，因此 $\operatorname{ans}(N_1)=3\times3-3=7$ 种取值；
- 接着向下看，$N_2=100$：它应该比 $3N_1$ 少一些情形，具体地说，当 $(x_{01},y_{01})=(10,00)$ 时，第三位不能取 $(1,0)$，当 $(x_{01},y_{01})=(10,01)$ 时，第三位亦不能取 $(1,0)$，少了 $2$ 种，当 $(x_{01},y_{01})=(0?,10)$ 时，也少了 $2$ 种，共少了 $4$ 种，因此 $\operatorname{ans}(N_2)=3\times7-4=17$ 种取值．

读者可以再写一些数感受一下，这里直接讨论一般情况了：

---

### 一般情况

因为是一位一位地看的，设前 $i$ 位是 $N_{0\sim i}$，其答案为 $\text{ans}$，考虑下一位（第 $i+1$ 位）．

如果下一位是 $1$，显然 $3$ 种取值都能取到，结果是 $3\text{ans}$．

如果下一位是 $0$，减少的情形应该只有当 $x_{0\sim i}=N_{0\sim i}$（或 $y_{0\sim i}=N_{0\sim i}$，先讨论 $x$），因为此时下一位被 $N$ 限制住了只能取 $0$，情形会减少；否则如果 $x$ 的前 $i$ 位有一位与 $N$ 不同，下一位都是可以任意取的．<br>
考虑 $x_{0\sim i}=N_{0\sim i}$，且 $x_{i+1}=1$ 时 $y$ 的可能取值，这是不合题意的，所以这时 $y$ 的可能取值数量就是不合题意的数量．<br>
如果 $x_{0\sim i}$ 的某一位 $x_j$ 是 $1$ 那么 $y_j$ 只能取 $0$，有一种取值，如果是 $0$ 那么 $y_j$ 可以取 $0$ 或 $1$，有两种取值，如果前 $i$ 位有 $m$ 个 $0$，依据乘法原理就有 $2^m$ 种取值，产生了 $2^m$ 种不合题意的情形，应当减去  $2^m$．
$y_{0\sim i}=N_{0\sim i}$ 是同理的，所以说，结果应当减去 $2\times2^m$，是 $3\text{ans}-2^{m+1}$．

---

## 结论

记 $\operatorname{ans}(N_{0\sim i})$ 表示将 $N$ 的前 $i$ 位作为 $N$ 对应的数对个数，$m_i$ 表示 $N$ 的前 $i$ 位中 $0$ 的个数，有
$$
\operatorname{ans}(N_{0\sim i})=

\begin{cases}

3, & i=0 \\

3\operatorname{ans}(N_{0\sim i-1}), & i>0 \land N_i=1 \\

3\operatorname{ans}(N_{0\sim i-1})-2^{m_i}, & i>0 \land N_i=0 \\

\end{cases}
$$
实现不难，这里就不详细解释了，直接放代码．

---

## `ACcode`

```cpp
#include <cstdio>
#include <cstring>
#define Code int main() { int T = 1;
#define Codes int main() { int T=read();
#define by while (T--) eachT();
#define HTLDL return 0;
#define HappyHDUPKSAI }
inline long long read() { char st; long long x = 0; int fu = 1; st = getchar(); while (st > 57 || st < 48) { if (st == 45) fu = -1; st = getchar(); }while (st <= 57 && st >= 48) { x = (x << 3) + (x << 1) + st - 48; st = getchar(); }return x * fu; }
typedef long long ll;
const ll MOD = 998244353;
char s[1234567];

void eachT() {
    scanf("%s", s);
    int len = strlen(s);
    ll ans = 1, pow = 1;
    for (int i = 0; i < len; ++i) {
        ans *= 3;
        if (s[i] == '0') {
            pow = (pow << 1) % MOD;
            ans -= pow;
        }
        ans = (ans + MOD) % MOD;
    }
    printf("%lld", ans);
}

Code by HTLDL
HappyHDUPKSAI
```

时间复杂度 $\Theta(n)$，实测 $\text{109ms}$，最优化可达到 $\text{15ms}$．
