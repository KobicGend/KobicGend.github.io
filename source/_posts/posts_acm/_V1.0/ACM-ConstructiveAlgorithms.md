---
title: 構造
tags:
  - 算法
  - 數據結構
  - 筆記
  - ACM
categories:
  - - 筆記
    - 算法筆記
abbrlink: c2e6fb0c
date: 2024-05-12 12:00:00
updated: 2024-05-30 09:19:56
description:
---

# 構造

---
### 800

$\Large\mathcal{Q}.$ 給定 $n$ 和 $k$，找出長度最小的字符串 $s$，使得所有長度爲 $n$ 的用前 $k$ 个小寫英文字母組成的字符串都是 $s$ 的子串。([CF1925A. We Got Everything Covered!](https://codeforces.com/contest/1925/problem/A))

$\Large\mathcal{A}.$ $s=abc\dots xabc\dots x\dots abc\dots x$

---

$\Large\mathcal{Q}.$ 規定一个數列的求和方法，從前向後遍歷，若這一項大於前一項，按常規方式求和，否則將和清零。在 `1` 到 `n` 的全排列中找出和的最大值。([VJwin4D, CF1728B. Best Permutation](https://codeforces.com/problemset/problem/1728/B))

$\Large\mathcal{A}.$ $\begin{cases}\text{If }n=2k: & 2k-2,~ 2k-3,~ \dots,~ 3,~ 2,~  1,~  2k-1,~  2k \\ \text{If }n=2k+1: & 1,~ 2k-1,~  2k-2,~ 2k-3,~ \dots,~ 3,~  2,~  2k,~  2k+1\end{cases}$




---
### 900

$\Large\mathcal{Q}.$ 給定正整數數列 $\lbrace a_n \rbrace$，構造 $\lbrace b_n \rbrace$，滿足 $a_i \ne b_i(1\leqslant i\leqslant n)$，$\sum\limits_{i=1}^{n} a_i = \sum\limits_{i=1}^{n} b_i$。([VJwin14J, CF1856B. Good Arrays](https://codeforces.com/problemset/problem/1856/B))

$\Large\mathcal{A}.$ 如果某个元素是 `1`，那至少給它增加 `1`，我們只需要看非 `1` 的元素減少的量夠不夠給它增加 `1`，也就是它們的總和是否大於 `n`，再特判 `n=1` 的情形即可。

```cpp
ll n = read(), sum = 0;
for (int i = 0; i < n; ++i) {
    int x = read();
    if (x > 1) sum += x;
}
printf("%s\n", n > 1 && sum >= n ? "Yes" : "No");
```

另一種（或許更容易理解的）思路是：分別計算當前總和以及所需的最小和 `wt`。

```cpp
ll n = read(), sum = 0, wt = 0;
for (int i = 0; i < n; ++i) {
    int x = read();
    sum += x;
    if (x > 1) wt += 1;
    else wt += 2;
}
printf("%s\n", n > 1 && sum >= wt ? "Yes" : "No");
```

事實上上述兩種方法等價。




---
### 1800

$\Large\mathcal{Q}.$ 構造一個序列，任何集合 $\lbrace x \mid 1\leqslant x\leqslant n \land x\ne k \rbrace$ 中的數 $i$ 都可以是某個子序列的元素之和。([CF1966D. Missing Subsequence Sum](https://codeforces.com/contest/1966/problem/D))

$\Large\mathcal{A}.$ 

**引理** 如果我們已經能表示 $1\sim s$，且擁有數 $t>s$，則能表示 $t\sim t+s$。

**問題 1** 求一個數組，任何滿足 $1 \sim n$ 的數 $i$ 都可以是某個子序列的元素之和。

- 問題 1 的解答 取 $\lbrace 1,~2,~4,~\dots,~2^{w} \rbrace$，其中 $2^w\geqslant n$，具体地應取 $\lceil\log_2(n)\rceil-1$。爲敘述方便，以下記 $w=\lceil\log_2(n)\rceil - 1$。

**問題 2** 求一個數組，所有子序列的和恰好是 $1 \sim n$。

- 問題 2 的解答 注意到取 $\lbrace 1,~2,~4,~\dots,~2^{w-1} \rbrace$ 可表示 $1 \sim 2^{w}-1$，爲了恰好表示到 $n$，希望表示 $? \sim n$，根據引理，只需擁有數 $n-(2^{w}-1)$ 即可，因此我們取 $\lbrace 1,~2,~4,~\dots,~2^{w-1},~n-(2^{w}-1) \rbrace$。

**問題 3** 現在已經恰好能表示 $1\sim k-1$，求一個數組，任何滿足 $k+1 \sim n$ 的數 $i$ 都可以是某個子序列的元素之和。

- 問題 3 的解答 根據引理，已經擁有 $k+1$，因此可表示 $k+1\sim (k+1+k-1=2k)$，若是再擁有 $2k+1$，因此可表示 $2k+1\sim 3k$，再擁有 $3k+1$，因此可表示 $3k+1\sim 4k$。當然，此過程不能無限進行，畢竟有步數限制。但幸運的是，當擁有 $k+1,2k+1,3k+1$ 時，我們已經可以表示 $k+1\sim 6k+1$ 了，此時再添加 $6k+2$，便可表示 $k+1\sim 12k+3$，如此倍增，就能表示題設要求的所有數。

**原問題的解答** 根據問題 2，先取 $\lbrace 1,~2,~4,~\dots,~2^{v-1},~k-(2^{v}-1) \rbrace$，根據問題 3，再取 $\lbrace k+1,~2k+1,~3k+1,~2(3k+1),~2^2(3k+1),~\dots\rbrace$，即是問題的答案。

```cpp
int n = read(), k = read();
int bit = 0; while ((1ll << bit) <= k) ++bit; --bit;
vector<int> ans;
for (int i = 0; i < bit; ++i) ans.push_back(1ll << i);
if (k - (1ll << bit)) ans.push_back(k - (1ll << bit));
if (k + 1 <= n) ans.push_back(k + 1);
if (2 * k + 1 <= n) ans.push_back(2 * k + 1);
if (3 * k + 1 <= n) ans.push_back(3 * k + 1);
for (int x = 6 * k + 2; x <= n; x <<= 1) ans.push_back(x);
print(ans);
```

---

$\Large\mathcal{Q}.$ 給定 $n$，輸出一个數列，其中包含 $n$ 个遞增子列。([CF1922E. Increasing Subsequences](https://codeforces.com/contest/1922/problem/E))

$\Large\mathcal{A}.$ 注意到 $\{0,1,\dots,x-1\}$ 中有 $2^x$ 个遞增子列，我們對 $n$ 作二進制拆分，即 $n=2^{a_0}+2^{a_1}+\dots+2^{a_k}$，首先輸出 $0\sim a_k-1$，對於其它二進制位，可以錯位構造 $a^i$ 个數，但爲了節約輸出的个數，我們藉助第一位輸出的數，直接輸出 $a_i$ 即可。最終的輸出結果是 $0,1,\dots,a_k-1,a_{k-1},a_{k-2},\dots,a_0$。

```cpp
ll n = read();
vector<int> ans;
ll tmp = n, bit = -1; while (tmp) ++bit, tmp >>= 1; // 找到最高位
for (int i = 0; i < bit; ++i) ans.emplace_back(i); // 0 ~ a_k-1
while (bit--) if (n & (1ll << bit)) ans.emplace_back(bit); // a_{k-1} ~ a_0
printf("%lld\n", ans.size());
for (auto i : ans) printf("%d ", ans[i]);
printf("\n");
```


---

### 1900


$\Large\mathcal{Q}.$ 给定 $n,k$，构造 $n$ 个四元组，满足所有四元组的所有元素互不相同，且每个四元组的最大公约数皆为 $k$。求所有元素最大值最小的一组构造。

$\Large\mathcal{A}.$ 首先把所有四元组除以 $k$ ，那么所有四元组的最大公约数为 $1$。注意到，任意一个四元组都只能存在一个偶数，至少三个奇数，于是元素最大值的下界为 $6(n-1)+5=6n-1$。另一方面，每个四元组取 $6i+1,6i+2,6i+3,6i+5(0\leqslant i<n)$。

---
### 2300

$\Large\mathcal{Q}.$ 每次操作可選擇一个二元组 $(x_i,y_i)$，使得 $a_{x_i}$ 和 $a_{y_i}$ 的值變爲 $f(a_{x_i},a_{y_i})$。$f(x,y)$ 的值未知，但對於相同的 $x,y$，$f(x,y)$ 的值相同。給出一種操作方案使任意函數 $f$ 經過若干次操作後數列中最多只有 $2$ 个不同的數。([VJwin7F, CF1408F. Two Different](https://codeforces.com/problemset/problem/1408/F))

$\Large\mathcal{A}.$ 顯然，若數列的長度是 $n=2^k$，可分成 $2^{k-1}$ 組，兩兩操作，再錯位着操作，最終會全部相同。比如對於 $n=8$，可以這樣操作：`|  1 2  3 4  5 6  7 8  ||  1 3  2 4  5 7  6 8  ||  1 5  2 6  3 7  4 8  |`。那麼如果不是 $2$ 的冪呢？比如 $n=9$，劃分爲 $9=8+1=4+5$？實操後發現不行，實際上，不一定做加法拆分，可以先對前 $8$ 个操作，然後借用第 $2~8$ 个元素和後面第 $9$ 个元素一併操作，也就是 `|  1 2  3 4  5 6  7 8  ||  1 3  2 4  5 7  6 8  ||  1 5  2 6  3 7  4 8  ||||  2 3  4 5  6 7  8 9  ||  2 4  3 5  6 8  7 9  ||  2 6  3 7  4 8  5 9  |`。現在只要把這些數字輸出來就好了。

```cpp
int cnt = -1, t = n;
while (t) { cnt++; t >>= 1; }
t = 1 << cnt;  // 2的最高冪

for (int i = cnt; i >= 1; --i) { // 第i行（倒着數）2
    for (int j = 1; j <= (1 << i) / 2; j++) { // 組 第i行有(1 << i)/2組，組差爲t*2/(1 << i)，每个組的起始值爲t*2/(1 << i)*(組數-1)
        for (int k = 1; k <= t / (1 << i); k++) { // 每組的對數
            printf("%d %d\n", k + t * 2 / (1 << i) * (j - 1), k + t * 2 / (1 << i) * (j - 1) + t / (1 << i)); // 兩个數間隔t / (1 << cnt)
        }
    }
}
for (int i = cnt; i >= 1; --i) {
    for (int j = 1; j <= (1 << i) / 2; j++) {
        for (int k = 1; k <= t / (1 << i); k++) {
            printf("%d %d\n", n - t + k + t * 2 / (1 << i) * (j - 1), n - t + k + t * 2 / (1 << i) * (j - 1) + t / (1 << i));
        }
    }
}
```










輸出練習題

[BUC1E 杨辉三角](https://buctcoder.com/problem.php?cid=3377&pid=4)

- **題意** 輸出楊輝三角，注意每行第一个數字前沒有空格，其它數字的位寬爲楊輝三角中最大數的寬度加上一。

- **代碼** 主函數預處理：

  ```cpp
  for (int i = 0; i < maxN; ++i) {
      num[i][0] = num[i][i] = 1;
      for (int j = 1; j < i; ++j)
          num[i][j] = num[i - 1][j] + num[i - 1][j - 1];
  }
  ```

  每次詢問：

  ```cpp
  int maxx = num[n - 1][n / 2];
  int cnt = 0;
  while (maxx) maxx /= 10, ++cnt;
  for (int i = 0; i < n; ++i) {
      std::cout << std::setw(0) << num[i][0];
      for (int j = 1; j < i + 1; ++j)
          std::cout << std::setw(cnt+1) << num[i][j];
      std::cout << "\n";
  }
  std::cout << "\n";
  ```



