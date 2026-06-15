---
title: 【组合计数杂谈】三道 Bingo 游戏题（备份）
tags:
  - 算法
  - 筆記
  - ACM
  - 圖論
categories:
  - posts_acm
  - 知識
  - ACMM
abbrlink: 366bb2f2
hide: true
date: 2025-04-01 08:14:00
updated: 2025-04-01 08:14:00
description:
---



本文涉及的知识点：组合数公式，古典概型，Min-Max 反演及推广，卷积优化思想，状态压缩思想与状态压缩 DP，快速数论变换 NTT，快速数论变换 NTT，快速沃尔什变换 FWT。

*本系列教程「以题带讲」，以典型题目为载体，着重讲解知识点的适用条件和使用方法，而规避复杂的理论推导。*

我不擅长数学，对 CF 和区域赛的数学题，从简单计算到数论组合都望而却步。「tag 是数学吗那不做了。」

可能是因为网上的教程大多是罗列定理，给出大段证明，最后放几个例题链接。我没有耐心和能力读完整篇文章。



### 2024 ICPC World Finals Astana B. Bingo for the Win!

> Bingo 游戏，$n$ 个人每人要抢 $k$ 个数，主持人按随机顺序依次报数，报到每个数 $[1,10^{9}]$ 的概率相同。已知如果有多名选手要抢某个数字，那么编号小的选手总是优先抢到。问每个人成为最后一名（其他人都抢完了但自己还没抢完）的概率。

每个数只会对编号最大的选手贡献答案，贡献大小为这个数出现的总数。注意这是古典概型（每个基本事件出现的可能性相等），一个数出现一次有一倍贡献，那出现两次就有两倍贡献。概率的分母一定是 $nk$。

许多概率问题都能转化为计数问题解决，事件发生的概率 = 事件发生的结果数量 / 全部可能的结果数量。

```cpp
int n, m;
cin >> n >> m;
map<int, array<int, 2>> mp;
for (int i = 0; i < n; i++) {
    for (int j = 0; j < m; j++) {
        int x;
        cin >> x;
        auto& [cnt, lst] = mp[x];
        cnt++;
        lst = i;
    }
}
vector<int> ans(n);
for (auto& [_, v] : mp) {
    auto& [cnt, lst] = v;
    ans[lst] += cnt;
}
for (int i = 0; i < n; i++) {
    cout << (1.0 * ans[i] / m / n) << endl;
}
```


---
### [The 2024 ICPC Asia Nanjing Regional Contest I. Bingo](https://codeforces.com/gym/105484/problem/I)

> 给定一个长度为 $nm$ 的排列，将其打乱之后按顺序填入 $n \times m$ 的网格中。定义 Bingo 数为最小的整数 $k$，满足存在至少一行或者一列，其中所有的数都 $\leqslant  k$。要求出所有 $(nm)!$ 种打乱方式的 bingo 整数之和，对 998244353 取模。$nm \leqslant 200000$。

#### Part 1 - Min-Max 反演

先考虑对于某一种确定的填数方法，Bingo 数是什么。

「所有的数都 $\leqslant  k$」表明这一行（列）的最大值 $\leqslant  k$；存在至少一行或者一列，且要 $k$ 最小，则网格 Bingo 数为所有行列的最大值的最小值。更具体地，对于每一行（列），设 $x_{i}$ 为该行（列）的最大值，并设 $S$ 为所有行（列）的 $x_{i}$ 的集合，则 Bingo 数为 $\min(S)$。

最大值的最小值不好处理，考虑 **Min-Max 反演**（Min-Max 容斥），转化为最大值的最大值。

所求答案为所有 $(nm)!$ 种打乱方式的 $\min(S)$ 之和，这可以用 $\max(T)$ 表示。

回忆，$x_{i}$ 为该行（列）的最大值，$S$ 表示所有行（列）的 $x_{i}$ 的集合。$T$ 表示 $S$ 的子集，也即选择的若干行（列）的 $x_{i}$ 的集合，而 $x_{i}$ 表示一行（列）的最大值，所以 $T$ 表示选择的若干行（列）的所有元素的最大值。

#### Part 2 - 计数

对于确定的 $\max(T)$，即选出的最大值已经确定，下求有多少种填数方法。

设选择了 $x$ 行 $y$ 列，选择方案为 $\displaystyle \binom{n}{x} \binom{m}{y}$，且一共选择了 $c = mx + ny - xy$ 个元素，$T$ 的元素数量为 $|T|=x+y$。

不妨设序列从小到大排列，假设 $c$ 个元素的最大值为 $a_i$，即 $\max(T)=a_{i}$，则前 $i-1$ 个元素要选择 $c-1$ 个，总共这 $c$ 个元素任意填，方案数 $\displaystyle \binom{i-1}{c-1} c!(nm-c)!$。

于是答案为 
$$
\sum_{i=1}^{nm}\sum_{x=1}^{n}\sum_{y=1}^{m} (-1)^{x+y-1}
a_i \binom{n}{x} \binom{m}{y} \binom{i-1}{c-1} c!(nm-c)!
$$
表示选择了 $x$ 行 $y$ 列，且最大值为 $a_{i}$ 时的答案对 $x,y,i$ 求和。

暴力求需要三重循环枚举 $x,y,i$，复杂度是 $\operatorname{O}[(nm)^2]$。


#### Part 3 - 卷积优化

将式子转化为卷积快速求解。

对于固定的 $c$，把 $i$ 优化掉，
$$
\begin{aligned}
\sum_{i=1}^{nm} a_i \binom{i-1}{c-1} c!(nm-c)!
&= \sum_{i=1}^{nm} a_i \cdot \frac{(i-1)!}{(c-1)!(i-c)!} \cdot c!(nm-c)! \\ 
&= \sum_{i=1}^{nm} \frac{a_i (i-1)!}{(i-c)!} \cdot c(nm-c)!
\end{aligned}
$$
其中 $c(nm-c)!$ 是确定的数，只要考虑 $\displaystyle \sum_{i=1}^{nm} \frac{a_i (i-1)!}{(i-c)!}$。

指标之差为定值，对其中一个取相反数就是指标之和为定值了。设 $f_i = a_i (i-1)!$，$g_i = \dfrac{1}{(nm-i)!}$，设 $F=f*g$，那么 $\displaystyle F_x = \sum_{i+j=x} f_i g_j = \sum_{i+j=x} \frac{a_i (i-1)!}{(nm-x+i)!}$，可见 $F_{nm+c}$ 就是我们需要的 $\displaystyle \sum_{i=1}^{nm} \frac{a_i (i-1)!}{(i-c)!}$。

总答案 $\displaystyle \sum_{x=1}^{n}\sum_{y=1}^{m} (-1)^{c-1} \binom{n}{x} \binom{m}{y} \cdot c(nm-c)!\cdot F_{nm+c}$。

总时间复杂度 $\operatorname{O}(mn\log mn)$。

#### Code

```cpp
int n, m;
cin >> n >> m;
vector<int> a(n * m + 1);
for (int i = 1; i <= n * m; i++) {
    cin >> a[i];
}
sort(a.begin(), a.end());
vector<Z> f(n * m + 1);
vector<Z> g(n * m + 1);
for (int i = 1; i <= n * m; i++) {
    f[i] = a[i] * fac[i - 1];
}
for (int i = 0; i <= n * m; i++) {
    g[i] = invfac[n * m - i];
}
auto F = f * g;
Z res = 0;
for (int x = 0; x <= n; x++) {
    for (int y = 0; y <= m; y++) {
        int c = m * x + n * y - x * y;
        Z tmp = binom(n, x) * binom(m, y) * c * fac[n * m - c] * F[n * m + c];
        if ((x + y) % 2 == 0) tmp = -tmp;
        res += tmp;
    }
}
cout << res << endl;
```

---
### [2025“钉耙编程”中国大学生算法设计春季联赛（3） 1002 宾果游戏](https://acm.hdu.edu.cn/contest/problem?cid=1152&pid=1002)

> Bingo 游戏，某一行（列）上的格子全部被标记时，游戏结束。表格中有 $k$ 个给定位置无法做上标记，但主持人依然会报出被墨水污染的位置。求游戏结束的期望轮数。

第二题要求最大值 $\leqslant  k$，我们设 $x_{i}$ 为该行（列）的最大值。本题要求全部被标记，那么对于每一行（列），定义 $x_{i}$ 表示这一行（列）全部被标记的期望时间，$S$ 为所有 $x_{i}$ 的集合，那么所求为有一行（列）的 $x_{i}$ 发生的期望时间，也即 $\min(S)$。如果一个位置有标记，那这一行（列）的 $x_{i}$ 一定是正无穷，不会对 $\min(S)$ 有贡献，因此可以直接剔除，只考虑剩下的 $\min(S)$。

刚才我们说，Min-Max 反演常用于整体的最值不好做，但可以将子集分类，每一类具有相同的性质，容易求得最值的情形。

- 整体的最值不好做吗？$x_{i}$ 表示全部被标记，是 $\max$，要求 $\max$ 的 $\min$，不好求，但 $\max$ 的 $\max$ 好求，因此把 $\min(S)$ 用 Min-Max 反演转为子集的 $\max(T)$。思考 $\max(T)$ 的含义：$\max(T)$ 表示 $T$ 中所有行和列的 $x_{i}$ 发生的期望时间，而 $x_{i}$ 表示这一行（列）全部被标记，所以 $\max(T)$ 表示的是 $T$ 中所有格子都被标记的期望时间。

- 如何分类？再看公式的形式：$\displaystyle \operatorname{E}[\min(S)] = \sum_{\varnothing \neq T \subset S}^{} (-1)^{|T|-1} \operatorname{E}[\max(T)]$，由于概率均等，这里 $T$ 只关心集合大小，我们就按集合大小分类，转为求解 $N$ 个数字报出这 $x$ 行 $y$ 列所有 $c = mx + ny - xy$ 个数字的期望时间，这等于 $\displaystyle \sum_{i=1}^{c} \dfrac{N}{i}$。然后枚举 $x,y$ 求解。

#### Code

```cpp
int n, m, k;
cin >> n >> m >> k;
vector<int> goodX(n, 1);
vector<int> goodY(m, 1);
vector<Z> pre(n * m + 1);
for (int i = 1; i <= n * m; i++) {
    pre[i] = pre[i - 1] + inv[i];
}
while (k--) {
    int x, y;
    cin >> x >> y;
    x--;
    y--;
    goodX[x] = 0;
    goodY[y] = 0;
}
int cntX = count(goodX.begin(), goodX.end(), 1);
int cntY = count(goodY.begin(), goodY.end(), 1);
Z res = 0;
for (int x = 0; x <= cntX; x++) {
    for (int y = 0; y <= cntY; y++) {
        int c = m * x + n * y - x * y;
        Z tmp = binom(cntX, x) * binom(cntY, y) * pre[c] * n * m;
        if ((x + y) % 2 == 0) tmp = -tmp;
        res += tmp;
    }
}
cout << res << endl;
```

