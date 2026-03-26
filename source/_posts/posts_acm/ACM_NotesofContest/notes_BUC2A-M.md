---
title: 北化排位赛（二）A-M［简中］
tags:
  - 題解
  - 練習賽
  - 筆記
  - ACM
categories:
  - - 筆記
    - 練習賽
abbrlink: 982204b1
date: 2024-01-26 18:52:44
updated: 2024-01-26 22:26:57
description: 'BUCTOJ - Contest3388 - 2024寒假集训 - 排位赛竞赛（二）A-M'
---
# BUC2

## BUC3388A - 三五倍数

**答案** 233168

**思路** 暴力。

**代码** 

```cpp
int ans = 0;
for (int i = 1; i < 1000; ++i)
    if (!(i % 3) || !(i % 5)) ans += i;
printf("%d\n", ans);
```

## BUC3388B - 回文乘积

**答案** 906609

**思路** 无需技巧地暴力，答案秒出。

**代码** 

```cpp
int ans = 0;
for (int i = 100; i < 1000; ++i)
    for (int j = 100; j < 1000; ++j)
        if (judge(i * j)) ans = max(ans, i * j);
printf("%d\n", ans);
```

其中 `judge()` 函数：

```cpp
bool judge(int n) {
    int s = n, y = 0;
    while (s > 0) y = y * 10 + s % 10, s = s / 10;
    return y == n;
}
```

## BUC3388C - 整除正数

**答案** 61465412

**思路** 统计每个数的每个素因子的幂次，每个素因子取最高的幂次，再相乘。

**代码**

```cpp
for (int i = 2; i <= 2023; ++i) {
    memset(t, 0, sizeof t);
    int n = i;
    for (int j = 2; j <= n; ++j) {
        while (!(n % j)) n /= j, ++t[j];
        a[j] = max(a[j], t[j]);
    }
}
ll ans = 1;
for (int i = 2; i <= 2023; ++i) ans = ans * qpow(i, a[i]) % MOD;
printf("%lld\n", ans % MOD);
```

## BUC3388D - Fibonacci

**思路** 手算（？）然后直接输出即可。

**代码**

```cpp
ll a[] = { 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368, 75025, 121393, 196418, 317811, 514229, 832040, 1346269, 2178309, 3524578, 5702887, 9227465, 14930352, 24157817, 39088169, 63245986, 102334155, 165580141, 267914296, 433494437, 701408733, 1134903170, 1836311903, 2971215073, 4807526976 };
int n; scanf("%d", &n);
printf("%lld\n", a[n]);
```

## BUC3388E - 字串加工

```cpp
bool is1 = 0, is0 = 0;
ll cnt = 0;
scanf("%s", s);
for (int i = 0; i < strlen(s); ++i) {
    if (s[i] == '1') is1 = 1;
    else is0 = 1;
    if (is1 && is0) ++cnt, is1 = is0 = 0;
}
printf("%lld\n", cnt);
```

## BUC3388F - 有趣的制造

**思路** 首先预处理找到所有喜欢的数

```cpp
int cnt = 0;
void dfs(std::string a,  int pos,  int x) {
    if (pos == x) {
        std::cout << a << ", ";
        ++cnt;
        return;
    }
    dfs(a + "3", pos + 1, x);
    dfs(a + "7", pos + 1, x);
}
void eachT() {
    std::cout << "a[] = { 0, ";
    for (int i = 1; i < 10; ++i) {
        dfs("3", 1, i);
        dfs("7", 1, i);
        std::cout << "3333333333 }";
    }
}
```

然后得到这么一串结果 `a[] = { 0, 3, 7, 33, 37, 73, 77, 333, 337, 373, 377,
733, 737, 773, 777, 3333, 3337, `……

又，计算 $f(x)$ 的前 $x$​ 项：

```cpp
ll solve(int x) {
    int p = std::lower_bound(a, a + 1023, x) - a;
    ll ans = 0;
    for (int i = 1; i < p; ++i) ans += a[i] * (a[i] - a[i - 1]);
    ans += a[p] * (x - a[p - 1]);
    return ans;
}
```

答案即是 `solve(r) - solve(l - 1)`。

## BUC3388G - 流吧！我的眼泪

**思路** 二分。

**代码** 二分判断函数：

```cpp
bool half(int x) {
    ll sum = 0;
    for (int i = 0; i < n; ++i) sum += (a[i] - 1) / x + 1;
    return sum > m;
}
```

注意向上取整 $\lceil\frac{A}{B}\rceil$ 用代码写为 `(A-1)/B+1`。

## BUC3388H - 再会，谢谢所有的鱼 - UPSOLVE

**思路** *（初学DP，不知道这算不算）* 先枚举第一个区间，用一个数组 `b[]` 存每一个点左边的连续 $k$ 项的和的最大值，再枚举第二个区间，每次枚举的连续 $k$ 项和加上预处理结果，取最大值即可。

**代码**

```cpp
int n, k;
scanf("%d %d", &n, &k);
for (int i = 1; i <= n; ++i) {
    scanf("%lld", &a[i]);
    s[i] = s[i - 1] + a[i];
    b[i] = -1e18; // 注意這裏也要初始化
}
ll ans = -1e18;
for (int i = k; i <= n; ++i)
    b[i] = max(b[i - 1], s[i] - s[i - k]);
for (int i = k; i <= n - k; ++i)
    ans = max(ans, b[i] + s[i + k] - s[i]);
printf("%lld\n", ans);
```

## BUC3388I - 木头加工

**思路** 即求最大公约数。

**代码** 

```cpp
int n;
ll x, ans;
scanf("%d%lld", &n, &ans);
while (--n) {
    scanf("%lld", &x);
    ans = gcd(ans, x);
}
printf("%lld\n", ans);
```

## BUC3388J - 进阶 Fibonacci

$\color{magenta}\rm First blood \text{撒花！}$

**思路** 首先注意 $\rm Fibonacci$ 前 $n$ 项的平方和等于 $F_nF_{n+1}$，所以这本质还是求 $\rm Fibonacci$ 数列。数据很大，用数组存已经不现实了，公式法也会超时，而且不能取模。事实上，这是矩阵快速幂的典型例题，可参考 [洛谷P1962][https://www.luogu.com.cn/problem/P1962]。

**代码** 

```cpp
struct matrix {
    ll a1, a2, b1, b2;
    matrix(ll a1, ll a2, ll b1, ll b2) : a1(a1), a2(a2), b1(b1), b2(b2) {}
    matrix operator*(const matrix& y) {
        matrix ans((a1 * y.a1 + a2 * y.b1) % MOD,
            (a1 * y.a2 + a2 * y.b2) % MOD,
            (b1 * y.a1 + b2 * y.b1) % MOD,
            (b1 * y.a2 + b2 * y.b2) % MOD);
        return ans;
    }
};

matrix qpow(matrix a, ll n) {
    matrix ans(1, 0, 0, 1);
    while (n) {
        if (n & 1) ans = ans * a;
        a = a * a;
        n >>= 1;
    }
    return ans;
}

void eachT() {
    ll x;
    matrix M(0, 1, 1, 1);
    scanf("%lld", &x);
    matrix ans = qpow(M, x + 1);
    printf("%lld\n", (ans.a1 * ans.a2) % MOD);
}
```

## BUC3388K - 数轴世界郊游

$\color{magenta}\rm \text{再次} First blood \text{撒花！}$

**思路** 一个格子一个格子搜，贪心地搜，优先找只能在这个格子里的，再找活动范围小的。

**实现** 首先定义两个结构体，`t[]` 用来临时存每次询问的数据：

```
struct node {
    ll l, r;
} a[maxN], t[maxN];
bool cmp(node a, node b) { return (a.l == b.l) ? (a.r < b.r) : (a.l < b.l); }
```

每次询问初始化结构体：`memset(&t, 0, sizeof(struct node));`。

首先将在查询范围内的点存入 `t[]`：

```cpp
for (int i = 0; i < n; ++i) {
    if (a[i].l <= r && a[i].r >= l) { // 在查詢範圍內 沾個邊就行
        t[cnt].l = max(a[i].l, l); // 截斷不在範圍內的部分
        t[cnt].r = min(a[i].r, r);
        ++cnt; // 在查詢範圍內的總數
    }
} // 將在查詢範圍內的存入臨時數組
```

然后一个个搜，具体过程见注释：

```cpp
while (l <= r) {
    std::sort(t + pos, t + cnt, cmp); // 按照優先級排序
    while (t[pos].r < l && pos < cnt) pos++; // 找到第一個符合條件的 因爲截斷後存在l>r的數據
    if (pos == cnt) break; // 搜到盡頭 退出
    if (t[pos].l == l && t[pos].l <= t[pos].r) // 合乎題意
        ++ans, ++pos; // 結果和搜索序號都加1
    ++l;
    for (int i = pos; i < cnt; ++i)
        t[i].l = max(t[i].l, l); // 更新下界 截斷不在範圍內的部分
}
```

愉快输出 `printf("%d\n", ans);`

$\mathbf{WA}$ 第五行 `if (t[pos].l == l && t[pos].l <= t[pos].r)` 写的是 `if (t[pos].l >= l)`，某些不在这个格子活动的点也算进去了。

## BUC3388L - 超级 Fibonacci

<span id="blue">[Link](./a1f015a4.html)</span>

## BUC3388M - 数字显示屏仿真

**思路** 把样例给的图案存起来*（用C写过游戏的应该熟悉这个过程，作者上次模拟UNO牌，就是这样画的）*

```cpp
std::string s[5][10] = {
{" - ","   "," - "," - ","   "," - "," - "," - "," - "," - "},
{"| |","  |","  |","  |","| |","|  ","|  ","  |","| |","| |"},
{"   ","   "," - "," - "," - "," - "," - ","   "," - "," - "},
{"| |","  |","|  ","  |","  |","  |","| |","  |","| |","  |"},
{" - ","   "," - "," - ","   "," - "," - ","   "," - "," - "} };
```

然后按要求输出即可：

```cpp
std::string a;
std::cin >> a;
for (int j = 0; j < 5; ++j) {
    for (int i = 0; i < a.size(); ++i)
        std::cout << s[j][a[i] - '0'];
    std::cout << std::endl;
}
```

## 總結

今天突然長腦子了！做起來炒雞順利，以平均五分鐘一題的速度 $\rm AC$ 了 $\rm ABCDEJI$，然後在 $\rm K$ 上耗了一個小時，先回去把 $\rm GM$ 秒了，又磨了一個小時寫 $\rm K$，搶到了一血，最後兩個題 $\rm HL$，看這兩個都不像是我會寫的亞子就睡了一覺、、、、醒來後寫 $\rm L$，做出來提交時顯示比賽結束、、、晚了 $10$ 分鐘，痛失 $\rm onlyAC$、、、、
