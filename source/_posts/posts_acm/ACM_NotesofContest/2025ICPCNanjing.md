---
title: 2025 ICPC 南京补题记录 (6 题 BCFGIK)
tags:
  - 題解
  - 筆記
  - ACM
  - 算法
  - 區域賽
categories:
  - - 筆記
    - 區域賽
description: >-
  The 2025 ICPC Asia Nanjing Regional Contest (The 4th Universal Cup. Stage 5:
  Grand Prix of Nanjing)
highlight_shrink: true
abbrlink: 48a1885e
date: 2025-11-19 00:00:00
updated: 2025-11-19 00:00:00
---

## [B. What, More Kangaroos?](https://qoj.ac/contest/2581/problem/14802)（极角排序）【Medium】

【分析】给定 $n$ 个不等式 $a_{i} x + b_{i}y + c_{i} < 0$，找一组整数 $(x, y)$ 使得最多的不等式成立。

*这个东西直接做是半平面交，但我们没必要这样做。（我也不会这个板子）*

重要的观察是 $c_{i}>0$，这意味着所有平面都是不包含原点的。

我们可以不妨设找出的整数 $(x, y)$ 是无穷远点，进一步，最优点一定取平面的边界（像是拿着手电筒原地转圈，问哪个方向照到的最多。）

【做法】对所有平面边界的射线极角排序，算出每个地方的答案，取最大的。

```cpp
void solve() {
    int n;
    cin >> n;

    map<long double, int> mp;
    int cur = 0;
    for (int i = 0; i < n; i++) {
        int a, b, c;
        cin >> a >> b >> c;
        if (a == 0 && b == 0) {
            continue;
        }
        long double s = atan2l(a, -b); // 必须long double
        long double t = atan2l(-a, b);
        mp[s]++;
        mp[t]--;    
        if (s > t) {
            cur++;
        }
    }

    int ans = cur;
    for (auto [_, delta] : mp) {
        cur += delta;
        ans = max(ans, cur);
    }
    cout << ans << '\n';
}
```

## [C. Distributing Candies](https://qoj.ac/contest/2581/problem/14803)（签到）【Easy】

小清新签到。

```cpp
using ll = long long;
void solve() {
    ll n;
    cin >> n;

    if (n & 1) {
        cout << "No\n";
    } else {
        cout << "Yes\n";
        cout << n / 2 << " " << n / 2 << endl;
    }
}
```



## [F. Bitwise And Path](https://qoj.ac/contest/2581/problem/14806)（并查集，位运算）【Hard】

先考虑要做什么查询，再决定用什么数据结构维护及考虑如何修改。

【查询】从高到低逐位贪心确定答案。对于每一位，尝试将其加入当前已确定的结果中。因此需要维护 `dsu[mask]`：只考虑那些包含了 mask 中所有 1 的边（即满足 `(w & mask) == mask` 的边，其余边无所谓）构成的子图的连通性。检查利用这些边，能否使起点和终点连通。单次复杂度 $\log V$。

例如，边的二进制是 101，那么需要在 101,100,001,000 里连通，这里状态的 0 表示无所谓（边 0 或 1），1 表示边必须是 1。

【修改】$V$ 个并查集，有用的合并只有 $(n - 1) V$ 次。每次合并之后，会 $\log V$ 递归到下一层。所以总复杂度是 $(n - 1) V \log V$。

总复杂度 $\mathcal{O}(n \alpha(n) V \log V + q\log V)$。

```cpp
struct DisjointSets {
    vector<int> f;
    int tot;
    DisjointSets(int n) : f(n, -1), tot(n) {}
    int find(int x) {
        return f[x] < 0 ? x : f[x] = find(f[x]);
    }
    int size(int x) {
        return -f[find(x)];
    }
    bool same(int x, int y) {
        return find(x) == find(y);
    }
    bool uno(int x, int y) {
        x = find(x), y = find(y);
        if (x == y) return false;
        return f[x] += f[y], f[y] = x, tot--;
    }
};

void solve() {
    int n, q;
    cin >> n >> q;

    vector dsu(1 << 12, DisjointSets(n));

    ll ans = 0;
    while (q--) {
        char opt;
        cin >> opt;
        int x, y;
        cin >> x >> y;
        x--;
        y--;
        if (opt == '+') {
            int w;
            cin >> w;
            auto add = [&](this auto&& add, int w) -> void {
                if (dsu[w].uno(x, y)) {
                    for (int bit = 0; bit < 12; bit++) {
                        if (w >> bit & 1) {
                            add(w ^ (1U << bit));
                        }
                    }
                }
            };
            add(w);
        } else {
            int res = 0;
            for (int bit = 11; bit >= 0; bit--) {
                if (dsu[res | (1U << bit)].same(x, y)) {
                    res |= (1U << bit);
                }
            }
            if (!dsu[0].same(x, y)) {
                res = -1;
            }
            ans += res;
        }
    }
    cout << ans << endl;
}
```

## [G. Bucket Bonanza](https://qoj.ac/contest/2581/problem/14807)（二分，贪心）【Hard】

考虑时间-剩余容量的图像，这是分段一次函数。我们总是贪心地合并容量最小的和漏水最多的，因此时间越大，斜率越缓。

为确定合并时间，只需要计算这些一次函数的交点，维护一个凸壳。

多次询问在凸壳上二分。复杂度 $\mathcal{O}(q\log n)$。

```cpp
void solve() {
    int n;
    cin >> n;

    vector<ll> v(n);
    set<pair<ll, int>> setV; // v, id
    ll sumV = 0;
    for (int id = 0; id < n; id++) {
        cin >> v[id];
        sumV += v[id];
        setV.insert({v[id], id});
    }

    vector<ll> l(n);
    set<pair<ll, int>> setL; // l, id
    ll sumL = 0;
    for (int id = 0; id < n; id++) {
        cin >> l[id];
        sumL += l[id];
        setL.insert({l[id], id});
    }
    
    vector<array<ll, 3>> vec;
    vec.push_back({0, sumV, sumL}); // t, 一次函数形如 V = sumV - t * sumL

    while (setV.size()) {
        auto [_, id1] = *setV.begin();
        setV.erase(setV.begin());

        auto [_, id2] = *setL.rbegin();
        setL.erase(prev(setL.end()));

        sumV -= v[id1];
        sumL -= l[id2];

        if (id1 != id2) {   // 合并
            setV.erase({v[id2], id2});
            v[id1] = v[id2];
            setV.insert({v[id2], id1});
        }

        if (l[id2] == 0) {
            break;
        }

        auto [lt, lsumV, lsumL] = vec.back();  // 一次函数形如 V = lsumV - t * lsumL
        ll t = (lsumV - sumV - 1) / (lsumL - sumL) + 1;  // 一次函数交点的横坐标
        if (t == lt) {   // 线段退化成一个点，删去
            vec.pop_back();
        }
        vec.push_back({t, sumV, sumL});
    }

    int q;
    cin >> q;
    while (q--) {
        ll t;
        cin >> t;
        auto [_, sumV, sumL] = *--ranges::upper_bound(vec, array{t, inf, inf});
        cout << (sumV - t * sumL) << " ";
    }
    cout << '\n';
}
```

更简洁的写法：直接将容量和漏水速率排序，这样直接得到了每一段一次函数。

```cpp
void solve() {
    int n;
    cin >> n;

    vector<ll> v(n);
    for (int id = 0; id < n; id++) {
        cin >> v[id];
    }
    ranges::sort(v, greater());

    vector<ll> l(n);
    for (int id = 0; id < n; id++) {
        cin >> l[id];
    }
    ranges::sort(l);

    vector<ll> prev(n + 1), prel(n + 1);
    for (int id = 0; id < n; id++) {
        prev[id + 1] = prev[id] + v[id];
        prel[id + 1] = prel[id] + l[id];
    }

    int q;
    cin >> q;
    while (q--) {
        ll t;
        cin >> t;
        
        int lo = 0, hi = n;
        while (lo < hi) {
            int mid = lo + hi >> 1;
            if (v[mid] - l[mid] * t >= 0) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        cout << (prev[lo] - t * prel[lo]) << " ";
    }
    cout << '\n';
}
```


（计数）

*本来不打算补的。后来看到一个 tip 说可以枚举 `s[i] == s[j]` 做，遂尝试。*




## [I. Chi Fan](https://qoj.ac/contest/2581/problem/14809)（背包、期望 DP）【Hard】

【做法】设 $f(i,j,0/1/2/3)$ 表示从第 $i$ 天到最后一天，总共花费 $j$ 元钱最大期望。状态机 0/1/2/3，分别表示在第 $k$ 天之前 AB 都没付 / 仅 A 付 / 仅 B 付 / AB 都付。复杂度 $\mathcal{O}(n m)$。

【一些分析】这题的状态分为两部分： **确知的费用** 和 **随机的状态机**。前者的实现是 01 背包 DP，后者是期望 DP。

先说随机的状态机。

首先回忆一下期望 DP 的一般做法：
$$
\mathbb{E}(\text{当前}) = \text{当前收益} + \sum_{k} \mathbb{P}(\text{转移到状态} \ k) \times \mathbb{E}(\text{未来状态} \ k)
$$

依据题意，状态机是关于过去的（谁付过钱导致现在的状态）。虽然状态是由过去决定的，但我们在第 $i$ 天计算时，不需要知道过去具体发生了什么，我们只需要知道现在做决策 A 时，我的未来期望就是这么多即可。也就是说，在 DP 第 $i$ 天时，需要先知道第 $i+1$ 天的答案，因此期望 DP 的状态设的是从第 $k$ 天到最后一天。

如果第 $i$ 天出去吃，第 $i$ 天的状态 3 只能转移到第 $i+1$ 天的状态 0，状态 0/1/2 有一定概率转移到 1/2/3。所以，我们列出的转移方程类似于（先不考虑费用）
$$
f(i,?,0) \gets p \cdot f(i+1, ?,1) + q \cdot f(i+1, ?,2) + w
$$

那么如何加入确知的费用呢？

再加一个维度，实现我知道要花这么多钱的前提下，做某个决策未来会得到多少期望。这同时也满足了题目要求的最坏情况，因为我们已经为每一次决策预留足够的空间——先决定钱，再决定概率。

```cpp
// 遍历每一个可能的确知预算状态 i
for (int i = 0; i <= m - b; i++) { 
    // i + b : 确定的费用转移
    // 如果 i + b > m，循环条件限制了我们不会进入这里，保证了最坏情况不超标
    
    // ndp[i + b][0] : 第 k 天花费 i + b 且当前状态为 0 的最大期望
    chmax(ndp[i + b][0], 
          a +                // 今天的确定性收益
          p * dp[i][1] +     // 概率转移：如果A付钱，未来（第 k+1 天以后）基于状态1的期望
          q * dp[i][2]       // 概率转移：如果B付钱，未来（第 k+1 天以后）基于状态2的期望
    );
}
```

【完整代码】

```cpp
#include <bits/stdc++.h>
using namespace std;

#define double long double
constexpr double inf = 0x3f3f3f3f3f3f3f3f;

template<class T>
void chmax(T& a, T b) {
    if (a < b) {
        a = b;
    }
}

int main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    int n, m;
    cin >> n >> m;

    vector<array<int, 6>> v(n);
    for (auto& [a, b, c, d, e, x] : v) {
        cin >> a >> b >> c >> d >> e >> x;
    }
    ranges::reverse(v);

    vector<array<double, 4>> dp(m + 1);
    
    for (auto& [a, b, c, d, e, x] : v) {
        vector<array<double, 4>> ndp(m + 1);
        for (int i = 0; i <= m; i++) {
            ndp[i].fill(-inf);
        }

        double p = 0.01L * x;
        double q = 1 - p;

        // cafeteria
        for (int i = 0; i <= m - b; i++) {
            chmax(ndp[i + b][0], a + p * dp[i][1] + q * dp[i][2]);
            chmax(ndp[i + b][1], a + p * dp[i][1] + q * dp[i][3]);
            chmax(ndp[i + b][2], a + p * dp[i][3] + q * dp[i][2]);
            chmax(ndp[i + b][3], a + p * dp[i][3] + q * dp[i][3]);
        }

        // go out and taxi fare
        for (int i = 0; i <= m - d - e; i++) {
            chmax(ndp[i + d + e][3], c + dp[i][0]);
        }

        // go out and no taxi fare
        for (int i = 0; i <= m - d; i++) {
            chmax(ndp[i + d][0], c + p * dp[i][1] + q * dp[i][2]);
            chmax(ndp[i + d][1], c + p * dp[i][1] + q * dp[i][3]);
            chmax(ndp[i + d][2], c + p * dp[i][3] + q * dp[i][2]);
        }

        dp = ndp;
    }

    double res = -inf;
    for (int i = 0; i <= m; i++) {
        chmax(res, dp[i][0]);
    }
    if (res < 0) {
        cout << -1 << endl;
    } else {
        cout << fixed << setprecision(12) << res << endl;
    }

    return 0;
}
```


## [K. Xiangqi](https://qoj.ac/contest/2581/problem/14811)【Medium】

唯一的 Yes：无论马第一步怎么走，车都能在第一步吃掉马。

```cpp
void solve() {
    int xN, yN, xR, yR;
    cin >> xN >> yN >> xR >> yR;

    int dx = xN - xR;
    int dy = yN - yR;
    if (set{abs(dx), abs(dy)} == set{1, 2}) {
        cout << "NO\n";
        return;
    } 

    for (int dx = -2; dx <= 2; dx++) {
        for (int dy = -2; dy <= 2; dy++) {
            if (set{abs(dx), abs(dy)} == set{1, 2}) {
                int endx = xN + dx;
                int endy = yN + dy;
                int obsx = xN + (dx / 2);
                int obsy = yN + (dy / 2);
                if (endx >= 1 && endx <= 9 && endy >= 1 && endy <= 10) {  // 仍在范围内
                    if (pair(obsx, obsy) != pair(xR, yR)) {   // 没有蹩马腿
                        if (endx != xR && endy != yR) {   // 不会被抓住
                            cout << "NO\n";
                            return;
                        }
                    }
                }
            }
        }
    }
    cout << "YES\n";
    return;
}
```