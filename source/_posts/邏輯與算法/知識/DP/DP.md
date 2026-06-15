---
title: DP
tags:
  - ACM
  - 算法
  - 筆記
categories:
  - 邏輯與算法
  - 知識
  - DP
abbrlink: bea7c90a
---

## [2150C](https://codeforces.com/contest/2150/problem/C)

给定权值 $V$ 和排列 $A, B$。

设集合 $U$。依次进行 $N$ 次操作，每次任选一种：

* 找到当前的最小下标 $i$ 使得 $A_{i} \in S$，将 $A_{i}$ 从 $S$ 中移除，将 $A_{i}$ 加入 $U$。
* 找到当前的最小下标 $i$ 使得 $B_i \in S$，将 $B_i$ 从 $S$ 中移除。

求在所有可能的合法操作序列中，最大化 $\sum_{k\in U}V_{k}$。

### 方法：DP

充要条件：对于任意一对满足 $j < i$（即元素 $A_j$ 在排列 $A$ 中出现在 $A_i$ 的前面）且 $B^{-1}_{A_j} > B^{-1}_{A_i}$（即元素 $A_j$ 在排列 $B$ 中出现在 $A_i$ 的后面）的下标对 $(i, j)$，如果 $A_i \in U$，那么必须有 $A_j \in U$。

逆否命题：如果 $A_i \in U$，且 $A_j \not \in U$，那么它们不能同时满足 $j < i$ 且 $B^{-1}_{A_j} > B^{-1}_{A_i}$。

按 $i$ 从小到大进行决策，考虑所有满足 $A_j \not \in U$ 的 $j$，由于天然满足 $j < i$，则不能满足 $B^{-1}_{A_j} > B^{-1}_{A_i}$，即必须 $\max_{j:A_j \not \in U} B^{-1}_{A_j} \leqslant B^{-1}_{A_i}$。

考虑设 $f(i, x)$ 表示已决策前 $i$ 个元素，且 $x=\max_{j:A_j \not \in U} B^{-1}_{A_j}$ 时的最优解。

- 若 $A_{i} \not\in U$，$f(i, \max(x, B^{-1}_{A_j})) \gets f(i - 1, x)$；
- 若 $A_{i} \in U$，当 $x \leqslant B^{-1}_{A_i}$ 时，有 $f(i, x) \gets f(i-1, x) + V_{A_i}$。

初始值：$f(0, 0) = 0$。
答案：$\max f(N, *)$。

用线段树维护 $f(x)$，转移即区间最值、单点修改、区间加。

```cpp
std::vector<Info> init(N + 1);
init[0] = {0};
LazySegmentTree<Info, Lazy> seg(init);
for (int i = 0; i < N; i++) {
    int p = invB[A[i]];
    auto [M] = seg.query(0, p + 1);
    seg.update(0, p + 1, {V[A[i]]});
    auto [cur_p] = seg.query(p, p + 1);
    seg.modify(p, {std::max(M, cur_p)});
}
auto [ans] = seg.query(0, N + 1);
```

### 方法：最大权闭合子图

充要条件：如果选择了 $A_i \in U$，那么对于所有满足 $j < i$ 且 $B^{-1}_{A_j} > B^{-1}_{A_i}$ 的 $j$，必须有 $A_j \in U$。

即选了 $A_i$，就必须选 $A_j$。

1. 所有 $V_k > 0$ 的点与源点 $S$ 相连，容量 $V_k$。
2. 所有 $V_k < 0$ 的点与汇点 $T$ 相连，容量 $|V_k|$。
3. 如果选 $i$ 必须选 $j$（即 $j < i$ 且 $B^{-1}_{A_j} > B^{-1}_{A_i}$），则从 $i$ 向 $j$ 连边，容量 $+\infty$。

最终的最大收益 $= \sum_{V_k > 0} V_k -$ 最小割，表示满足依赖关系，我们不得不放弃的正权值，或者被迫承受的负权值。

代码的遍历顺序是 $i$ 从 $0$ 到 $N-1$，这意味着天然满足了 $j < i$ 的条件。当我们处理到第 $i$ 个元素时，之前遍历过的元素都是候选的 $j$。

遇到负权点时，相当于在图中增加了一个与汇点 $T$ 相连的节点。将其容量记录在 `std::map` 中，键为其在 $B$ 中的位置 $p=B^{-1}_{A_i}$。这些记录下来的负权值，就是后续正权点可以用来推流的目标。

遇到正权点时，首先将其乐观地全部加入 `max_profit`（即公式中的 $\sum_{V_k > 0} V_k$）。接下来，由于它可能依赖于前面遍历过的负权点，我们需要为其寻找能够割掉的代价。

根据条件 $B^{-1}_{A_j} > B^{-1}_{A_i}$，当前正权点只能流向位置大于 $p=B^{-1}_{A_i}$ 的负权点。因此，使用 `capacity.lower_bound(p)` 查找所有满足条件的负权点。从满足的最小的 $B^{-1}_{A_j}$ 开始，尝试用当前的 `flow` 去扣除负权点的容量，并同时从 `max_profit` 中减去这部分流出的代价。



# 填加乘
## [CF2028F. Alice's Adventures in Addition](https://codeforces.com/contest/2028/problem/F)

> 在序列中填加号或乘号，使运算结果恰好等于 $m$。$1 \leqslant n\leqslant 2\times10^{5},\ 0 \leqslant a_{i} \leqslant 10^{4},\ 1 \leqslant m\leqslant 10^{4}$。

乘法的优先级高，设 $dp_{i,x}$ 表示处理到第 $i$ 个数，

- 键：上一个加号之后的所有数乘积为 $x$；

- 值：上一个加号之前能表示出的所有数的集合，用 bitset 维护。

转移分为 $a_{i}$ 前面填加号或乘号两种。具体见代码。

暴力转移的复杂度是对的，因为至多 20 个数乘起来就超过 $10^{6}$ 了，键不会很多，转移量在 $\log m$ 级别，每次转移是 bitset 的复杂度 $\log m$。最终时间复杂度 $\Theta(n\log^{2}m)$，空间复杂度 $\Theta(\log^{2}m)$。

```cpp
constexpr int N = 1e4 + 8;
map<int, bitset<N>> dp;
dp[a[0]] = 1;
for (int i = 1; i < n; i++) {
    map<int, bitset<N>> ndp;
    for (auto& [x, mp] : dp) {  // 乘号
        // if (x * a[i] > m) continue;  // WA6 直接跳过而不转移
        ndp[min(m + 1, x * a[i])] |= mp;
    }
    for (auto& [x, mp] : dp) {  // 加号
        ndp[a[i]] |= mp << x;
    }
    dp = ndp;
}
bitset<N> res;
for (auto& [x, mp] : dp) {
    res |= mp << x;
}
cout << (res[m] ? "YES" : "NO") << endl;
```

## 第十届中国大学生程序设计竞赛总决赛 G. + and × with a sugar / + , × 与糖

```cpp
int n;
cin >> n;
deque<int> a(n);
for (int i = 0; i < n; i++) {
    cin >> a[i];
}
int sum = 0;
while (!a.empty() && a.back() == 1) {
    sum++;
    a.pop_back();
}
while (!a.empty() && a.front() == 1) {
    sum++;
    a.pop_front();
}
bool flag = false;
ll res = 1;
for (int i = 0; i < a.size(); i++) {
    res *= a[i];
    res %= mod;
    if (res > 2 * n) {
        flag = true;
    }
}
if (n == 0 || flag) {
    cout << (res + sum) % mod << endl;
    continue;
}
map<int, int> f;
f[a[0]] = 0;
for (int i = 1; i < a.size(); i++) {
    map<int, int> nf;
    for (auto& [k, v] : f) {
        chmax(nf[k * a[i]], v);
        chmax(nf[a[i]], v + k);
    }
    f = nf;
}
int ans = 0;
for (auto& [k, v] : f) {
    chmax(ans, v + k);
}
cout << ans + sum << endl;
```