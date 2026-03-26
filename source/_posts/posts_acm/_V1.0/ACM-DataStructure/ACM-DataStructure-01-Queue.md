---
title: 數據結構 - 单调栈与单调队列
tags:
  - 算法
  - 數據結構
  - 筆記
  - ACM
categories:
  - - 筆記
    - 算法筆記
abbrlink: 8847c03d
date: 2024-03-28 09:20:13
updated: 2024-03-30 09:19:56
description:
---

# 单调栈与单调队列

**题意** 给定一个环，判断有多少元素满足：所有以这个元素为起始的区间的和非负。(普及+/提高, [VJwin2C - 好消息，坏消息](https://www.luogu.com.cn/problem/P2629))

**Step1 断环为链**

注意所需的数组范围变大，`N` 应改为 `2*N`。

```cpp
int n = read();
for (int i = 1; i <= n; ++i) a[i + n] = a[i] = read();  // 断环为链
for (int i = 1; i <= 2 * n - 1; ++i) s[i] = s[i - 1] + a[i];  // 前缀和
```

**Step2 单调队列**

> 熟知可以用前缀和表示区间之和，如区间 `k~l` 等于 `a[l]-a[k-1]`，那么要判断区间和是否为正数，只要最小前缀和是否大于前面数的和。以前缀和作为单调队列，维护单调队列是递增的，以保证留下最小的元素。

需计算 $k$ 的个数，满足 $\forall i\in[k,k+n],~a_k+a_{k+1}+\dots+a_{k+n} \geqslant 0$，它等价于 $\forall i,~s_i \geqslant s_{k-1}$，只需判断 $\min\limits_{k \leqslant i\leqslant k+n} s_i \geqslant s_{k-1}$，以单调队列 **维护 $\large\min\limits^{}_{k \leqslant i\leqslant k+n} s_i$**。

```cpp
int ans = 0;
std::deque<int> Q;
for (int i = 1; i <= 2 * n - 1; ++i) {
    while (!Q.empty() && Q.front() + n < i) Q.pop_front();  // 毕业
    while (!Q.empty() && s[Q.back()] >= s[i]) Q.pop_back();
    Q.push_back(i);  // 维护s的单调增性 使新生入队
    if (i > n - 1 && s[Q.front()] - s[i - n] >= 0) ++ans;
}
printf("%d\n", ans);
```




<div STYLE="page-break-after: always;"></div>



**题意** 给定一个数组，选择若干间断点，这些位置将原数组分成若干段，求选择的这些位置的元素和与每一段中所有的元素和的最大值的最小值。(1900, [CF922D. Blocking Elements](https://codeforces.com/contest/1918/problem/D))

**Step1 二分**

我们选取界限 $x$，考虑如何选择间断点，使得最大值 $\leqslant x$，事实上，我们只需要 **最优化地选取** 间断点，然后判断所有间断点的和是否 $\leqslant x$ 即可，如是，则减小上界，否则增大下界，如此二分。所谓最优化地选取，即是 **使所有间断点的和最小**。

如何最优化地选取？显然，贪心是错误的。

>如反例 $\{1, 2, 3, 4, 5\}$，贪心的答案是 ${6}$。因当 $x=5$ 时，会贪心地选择 $1,2$，然后以 $3$ 为间断点，最终不合题意。

那么就需要使用 `dp` 了。

**Step2 `dp`**

状态：$f(i)$ 表示以第 $i$ 个数作为间断点，它之前所有间断点的和的最小值；

状转方程：$f(i)=a_i+\min\limits_{a_{j+1}+a_{j+2}+\dots+a_{i-1}\leqslant x} f(j)$。

>状转方程的解释 以第 $i$ 个数作为间断点，考虑前一个间断点的位置 $j$，这个间断点需要满足的条件是，两个间断点之间的数之和 $\leqslant x$，即 $a_{j+1}+a_{j+2}+\dots+a_{i-1}\leqslant x$，满足这个条件的位置 $j$ 可能有多个，我们取它们的最小值，即 $<i$ 的所有间断点的和的最小值，再加上 $a_i$ 即是 $i$ 之前所有间断点的和的最小值。

**Step3 单调队列**

因需快速地求 $\large\min\limits_{a_{j+1}+a_{j+2}+\dots+a_{i-1}\leqslant x} f(j)$，维护单调队列。

```cpp
const int N = 2e5 + 8;
ll a[N], s[N], dp[N];

void eachT() {
    int n = read();
    ll l = 1e18, r = 0, mid = 0;
    for (int i = 1; i <= n; ++i) {
        a[i] = read();
        s[i] = s[i - 1] + a[i];
        l = min(l, a[i]), r += a[i];
    }
    a[n + 1] = 0;
    auto half = [&](ll x) {
        std::deque<ll> Q;
        Q.push_back(0);
        for (int i = 1; i <= n + 1; ++i) {
            while (!Q.empty() && s[i - 1] - s[Q.front()] > x) Q.pop_front();  // 毕业
            dp[i] = dp[Q.front()] + a[i];
            while (!Q.empty() && dp[Q.back()] >= dp[i]) Q.pop_back();  // 维护dp的单调增性 使新生入队
            Q.push_back(i);
        }
        return dp[n + 1] > x;
    };
    while (l <= r) half(mid = l + r >> 1) ? l = mid + 1 : r = mid - 1;
    printf("%lld\n", l);
}
```

**题意** 求平均值最大的一个区间，且区间长度在指定范围内。(  
普及+/提高, [VJwin9F - 寻找段落](https://www.luogu.com.cn/problem/P1419))

**Step1 二分**

> 二分平均值，对于每个猜测的平均值，我们将每个元素减去这个平均值，这时，如果能找到某个区间的和大于 `0`，说明还有平均值更大的区间，则调大平均值。

我们选取界限 $x$​，若 $\exists\,l,r,~\text{s.t.}~mn \leqslant r-l+1 \leqslant mx,~\frac{1}{r-l+1}(a_{l}+a_{l+1}+\dots+a_{r}) > x,$ 说明还有平均值更大的区间，需要调大平均值。

**Step2 单调队列**

设 $s_k=\sum\limits_{i=1}^{k}(a_i-x)$，上式等价于 $\exists\,l,r,~(a_{l}-x)+(a_{l+1}-x)+\dots+(a_{r}-x) > 0$，即 $\exists\,l,r,~s_{r}-s_{l-1}>0$，当然，我们只需判断 $\forall\,l,r,~s_{r}-s_{l-1}\leqslant0$ 即可，只需判断 $\min\limits_{l+mn-1 \leqslant r\leqslant l+mx-1} s_r \geqslant s_{l-1}$，以单调队列 **维护 $\large\min\limits^{}_{l+mn-1 \leqslant r\leqslant l+mx-1} s_r$**。

**注意** 将目之所及的 `int` 都要改为 `double`。

**代码** 二分函数：

```cpp
bool half(dd x) {
    for (int i = 1; i <= n; ++i) {
        s[i] = s[i - 1] + a[i] - x;
    } // 前缀和处理
    std::deque<int> Q; // 存储的是编号
    for (int i = mn; i <= n; ++i) {
        while (!Q.empty() && i - Q.front() >= mx) Q.pop_front(); // 毕业
        while (!Q.empty() && s[Q.back()] > s[i-mn]) Q.pop_back();
        Q.push_back(i - mn);  // 维护s的单调增性 使新生入队
        if (s[i] - s[Q.front()] >= 0)
            return 1;                             // 区间和大于0
    }
    return 0;
}
```

主函数：

```cpp
scanf("%d %d %d", &n, &s, &t);
for (int i = 1; i <= n; ++i) scanf("%lf", &a[i]);
dd lt = 0, rt = 1e9;
while (rt - lt > eps) { dd mid = (lt + rt) / 2; if (half(mid)) lt = mid; else rt = mid; }
printf("%.3lf\n", lt);
```

**评注** 题解给了一种新方法：**人工限制程序的运行时间，强行退出，亦即 `(double)clock() / CLOCKS_PER_SEC <= 0.95`，需要 `#include <ctime>` 头文件**。完整代码：

```cpp
scanf("%d %d %d", &n, &s, &t);
for (int i = 1; i <= n; ++i) {
    scanf("%lf", &a[i]);
    sum[i] = sum[i - 1] + a[i];
}
dd ans = -1e9;
for (int i = s; i <= t && (double)clock() / CLOCKS_PER_SEC <= 0.95; ++i) {
    for (int j = i; j <= n; ++j) {
        ans = max(ans, (sum[j] - sum[j - i]) / i);
    }
}
printf("%.3lf\n", ans);
```




