---
title: Codeforces Round 921 D Good Trip［简中］
tags:
  - 題解
  - 筆記
  - ACM
categories:
  - - 筆記
    - 題解
abbrlink: 63766c5
date: 2024-02-23 21:11:49
updated: 2024-02-24 14:21:33
description:
---
# [CF921D. Good Trip](https://codeforces.com/contest/1925/problem/D)

## 题意

$n$ 个人，$m$ 对朋友，第 $j$ 对朋友的友谊值为 $f_j~(1\leqslant j\leqslant m)$，进行 $k$ 次选择，每次等概率地选择俩人，如果选择的俩人是一对朋友，他们的友谊值将增加 $1$．求所有被选中的 $k$ 对的友谊值总和的期望值（在增加之前）．

## 思路

*为了书写方便，以下记 $p=C_n^2$*．

易知分母是 $(C_n^2)^k$，它表示每次选择有 $C_n^2$ 种选择方式，共选择 $k$ 次，以下计算分子，分子是所有可能的选择方式的友谊值的总和．

因为只考虑友谊值的总和，它符合加法原理，所以可以按照朋友分开计算友谊值，再相加．

对于某对朋友，可能选择了 $0\sim k$ 次，如在 $k$ 次选择中选择 $i$ 次这对朋友，根据二项式定理，有 $C_k^i\cdot 1^i\cdot\big(C_n^2-1\big)^{k-i}$ 种选择方式，每种选择的友谊值总和为 $f+(f+1)+(f+2)+\dots+(f+i-1)=if+C_i^2$，因此所有情况的友谊值的总和为 $C_k^ip^{k-i}\big(if+C_i^2\big)$

将上式对 $i$ 求和，稍加化简，即

$$
\begin{align}

S_j &=\sum_{i=0}^{k} C_k^i (p-1)^{k-i} \big(if+C_i^2\big) \\

&= \sum_{i=1}^{k} i C_k^i (p-1)^{k-i}f 
 + \frac12\sum_{i=2}^{k} i(i-1) C_k^i (p-1)^{k-i} \\

&= \sum_{i=1}^{k} kC_{k-1}^{i-1} (p-1)^{k-i}f 
 + \frac12\sum_{i=2}^{k} k(k-1)C_{k-2}^{i-2} (p-1)^{k-i} \\

&= kf\sum_{i=0}^{k-1} C_{k-1}^{i} (p-1)^{k-1-i}
 + \frac12k(k-1)\sum_{i=0}^{k-2} C_{k-2}^{i} (p-1)^{k-2-i} \\

&= kfp^{k-1}
 + \frac12k(k-1)p^{k-2}, \\

\end{align}
$$

熟知，$\sum\limits_{i=0}^{k} C_{k}^{i} p^{k-i} = (p+1)^{k}$．

由于我们有 $m$ 对朋友，对这些朋友求和，

$$
\begin{align}

\sum_{j=1}^{m}S_j 

&=\sum_{j=1}^{m} \Big(kf_jp^{k-1} + \frac12k(k-1)p^{k-2} \Big) \\

&=kp^{k-1}\sum_{j=1}^{m}f_j + mC_k^2p^{k-2}, \\

\end{align}
$$

即是最终的分子．

答案即是
$$
{\rm ans} = \frac{kp^{k-1}\sum_{j=1}^{m}f_j + mC_k^2p^{k-2}}{(C_n^2)^k}.
$$
## 代码

### 核心部分

（省略了取模）

```cpp
ll n = read(), m = read(), k = read();
ll p = C2(n), ans = C2(k) * m * qpow(p, k - 2), sum = 0;
while (m--) {
	read(), read();
	sum += read();
}
ans += k * sum * qpow(p, k - 1);
print(ans * qpow(qpow(p, k), MOD - 2));
```

## `ACcode`

```cpp
#include <cstdio>
typedef long long ll;
const int MOD = 1e9 + 7;

inline ll read() { char st; ll x = 0; int fu = 1; st = getchar(); while (st > 57 || st < 48) { if (st == 45) fu = -1; st = getchar(); }while (st <= 57 && st >= 48) { x = (x << 3) + (x << 1) + st - 48; st = getchar(); }return x * fu; }
inline ll C2(ll x) { return x * (x - 1) / 2; }
ll qpow(ll a, ll n) { if (n < 0) return 0; ll ans = 1; while (n) { if (n & 1) ans = ans * a % MOD; a = a * a % MOD; n >>= 1; } return ans; }

void eachT() {
	ll n = read(), m = read(), k = read();
	ll p = C2(n) % MOD, ans = C2(k) % MOD * m % MOD * qpow(p, k - 2) % MOD, sum = 0;
	while (m--) read(), read(), sum = (sum + read()) % MOD;
	ans = (ans + k * sum % MOD * qpow(p, k - 1) % MOD) % MOD;
	printf("%lld\n", ans * qpow(qpow(p, k) % MOD, MOD - 2) % MOD);
}

int main() {
	int T = read();
	while (T--) eachT();
	return 0;
}
```

时间复杂度 $\Theta(m+\log n)$，77ms，跑起来呼呼的．

## 评注

数据范围较小，不化简也能过．