---
title: Codeforces Round 980 (Div2A-Div1C)
tags:
  - 題解
  - 筆記
  - ACM
  - 算法
  - 練習賽
categories:
  - - 筆記
    - 練習賽
cover: /img/posts/acm/codeforces-cover.webp
top_img: /img/posts/acm/codeforces.webp
highlight_shrink: true
abbrlink: c359c097
date: 2024-10-21 13:31:36
updated: 2024-10-21 14:33:28
---


## [2A. Profitable Interest Rate](https://codeforces.com/contest/2024/problem/A)

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int a, b;
        cin >> a >> b;

        cout << max(0, a >= b ? a : 2 * a - b) << "\n";
    }

    return 0;
}
```

## [2B. Buying Lemonade](https://codeforces.com/contest/2024/problem/B)

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n, k;
        cin >> n >> k;

        vector<int> a(n);
        for (int i = 0; i < n; i++) { 
            cin >> a[i];
        }
        sort(a.begin(), a.end());

        ll sum = 0, res = n;
        for (int i = 0; i < n; i++) { 
            sum += 1ll * (i == 0 ? a[i] : a[i] - a[i - 1]) * (n - i);
            if (sum >= k) {
                res = i;
                break;
            }
        }
        cout << (k + res) << "\n";
    }

    return 0;
}
```

## [1A. Concatenation of Arrays](https://codeforces.com/contest/2023/problem/A)

**题意** 给定 $n$ 个二元组 $a_{i1},a_{i 2}$，排序后拼起来，最小化逆序对数。

**思路** 这种题不要乱猜。$a_{i1}$ 和 $a_{i 2}$ 的地位相同，较小值和较大值的地位也相同，先排一个再排一个在直觉上都不太对。

可以按 $a_{i1}+a_{i 2}$ 递增排序。用调整法可证。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        vector<pair<int, int>> a(n);
        for (int i = 0; i < n; i++) {
            cin >> a[i].first >> a[i].second;
        }

        sort(a.begin(), a.end(),
            [&](const pair<int, int>& a, const pair<int, int>& b) {
                return a.first + a.second < b.first + b.second;
            });

        for (int i = 0; i < n; i++) {
            cout << a[i].first << " " << a[i].second << " ";
        }   
        cout << "\n";
    }

    return 0;
}
```

## [1B. Skipping](https://codeforces.com/contest/2023/problem/B)

**题意** $n$ 个问题编号从 $1$ 到 $n$，每个问题有得分 $a_i$ 和参数 $b_i$。

从第一个问题开始回答，按如下次序回答每个问题，两种选择：
- 提交问题并获得 $a_i$ 分，然后问题作废，下一题的下标 $j$ 是满足 $j<i$ 且问题未作废的最大下标；
- 跳过问题，然后问题作废，下一题的下标 $j$ 是满足 $j \leqslant b_{i}$ 且问题未作废的最大下标。

最大化得分。

**思路** 这个「下一题」类似于图论中的有向边，最大化得分即是最长路，考虑建图。
- $i\to b_{i}$ 连边权为 $-a_{i}$ 的边，表示跳过问题；
- $i\to i-1$ 连边权为 $0$ 的边，表示提交问题；
- $i\to t$ 连边权为 $\sum_{j=1}^{i} a_{j}$ 的边，表示不再跳过问题，按顺序回答前面的每个问题直至结束。（其中 $t$ 是汇点）

跑 $1\to t$ 的最长路即是答案。共 $3n$ 条边，时间复杂度 $\Theta(n\log n)$。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
constexpr ll inf = 0x3f3f3f3f3f3f3f3f;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;
        n++;

        vector<int> a(n);
        vector<ll> pre(n);
        for (int i = 1; i < n; i++) {
            cin >> a[i];
            pre[i] = pre[i - 1] + a[i];
        }

        vector<vector<pair<ll, int>>> E(n);
        for (int i = 1; i < n; i++) {
            E[i].push_back({ 0, i - 1 });
            E[i].push_back({ pre[i], 0 });
        }    

        for (int i = 1; i < n; i++) {
            int x;
            cin >> x;
            E[i].push_back({ -a[i], x });
        }

        auto Dijkstra = [&](int s) {
            vector<int> vis(n);
            vector<ll> dis(n, -inf);
            dis[s] = 0;
            priority_queue<pair<ll, int>> Q;
            Q.push({ 0, s });
            while (!Q.empty()) {
                auto [d, u] = Q.top(); Q.pop();
                if (vis[u]) continue;    
                vis[u] = 1;
                for (auto& [w, v] : E[u]) {
                    if (dis[v] < w + d) {
                        dis[v] = w + d;      
                        Q.push({ dis[v], v });
                    }
                }
            }
            return dis;
        };
        auto d = Dijkstra(1);

        cout << d[0] << "\n";
    }

    return 0;
}
```

## [1C. C+K+S](https://codeforces.com/contest/2023/problem/C)

**题意** 给定两个强连通有向图，每个图都有恰好 $n$ 个顶点，但可能有不同数量的边，保证这些图中任何一个环的长度都是 $k$ 的倍数。已知每个顶点分为两种类型：出点或入点。

判断能否在原图之间添加恰好 $n$ 条有向边，满足：
- 任何添加的边的两端都位于不同的图中，且是从出点指向入点；
- 在生成的图中，任何一个环的长度都是 $k$ 的倍数。

**思路** 多数有向图的题目是暴力缩点，这题直接给出一个强连通分量，以前的方法不奏效了。

我们尝试从缩点的本质考虑。Tarjan 算法首先引入了 DFS 生成树，将边分为两类，树边和非树边，后者进一步分为前向边、反向边和横叉边。树是没有环的，对剩下的三组边分别讨论：（其中 $d$ 表示树上节点的深度）
- 对于反向边 $u\to v$，它直接与树边构成一个简单环，环长为 $d_{u}-d_{v}+1$，它应当为 $k$ 的倍数。
- 对于前向边和横叉边 $u\to v$，它们没有直接构成一个环，而是产生了捷径，捷径的长度与树上路径的长度之差应当为 $k$ 的倍数，于是有 $k\mid d_{u}-d_{v}+1$。

**总结：如果有一条非树边 $u\to v$，必须满足 $k\mid d_{u}-d_{v}+1$，即 $d_{u}+1 \equiv d_{v} \pmod k$。**

对于第一张图指向第二张图的边 $u\to v$，需要保证 $d_{u}+1 \equiv d_{v}+\Delta \pmod k$。为什么不是 $d_{u}+1 \equiv d_{v} \pmod k$ 呢？因为选择不同的起点开始做 DFS 生成树，得到的每个点的深度是不同的，但它们的相对深度一样，所以需要加上一个位移量 $\Delta$，这个 $\Delta$ 可以是任意整数。

先统计每个深度下点的个数 $\lbrace \operatorname{cnt}_{d_{u}} \rbrace$。只需要保证 $d_{u}+1$ 的个数 $\lbrace \operatorname{cnt}_{\text{图一,出点},d_{u}+1} \rbrace$ 和 $d_{v}$ 的个数 $\lbrace \operatorname{cnt}_{\text{图二,入点},d_{v}} \rbrace$ 这两个数组 **循环位移相等**，类似地，第二张图指向第一张图的边 $v\to u$ 要满足 $\lbrace \operatorname{cnt}_{\text{图二,出点},d_{u}+1} \rbrace$ 和 $d_{v}$ 的个数 $\lbrace \operatorname{cnt}_{\text{图一,入点},d_{v}} \rbrace$ 循环位移相等。

为了计算方便，代码中把两个数组 $\operatorname{cnt}_{出}$ 和 $\operatorname{cnt}_{入}$ 合并了，不合并也是可以的。对于第一张图，入点 $+1$，出点 $+n$，第二张图入点 $+n$，出点 $+1$。

判断两个数组循环位移相等是个经典问题，**倍长后哈希** 即可。

时间复杂度 $\Theta(n)$。

（哈希模板来自：[cup-pyy：一种比较科学的字符串哈希实现方法](https://zhuanlan.zhihu.com/p/784510655)，略有修改）

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using ull = unsigned long long;
using ulll = __uint128_t;

constexpr int N = 1e6 + 8;
constexpr ull mod = (1ull << 61) - 1;
mt19937_64 rnd(chrono::steady_clock::now().time_since_epoch().count());
uniform_int_distribution<ull> dist(mod / 2, mod - 1);
const ull H = dist(rnd);

struct mull {
    ull x;
    constexpr mull(ull x = 0) : x{ norm(x) } {}
    constexpr ull norm(ull x) const { return x >= mod ? x - mod : x; }
    friend constexpr mull operator*(mull a, mull b) { return ulll(a.x) * b.x % mod; }
    friend constexpr mull operator+(mull a, mull b) { return a.norm(a.x + b.x); }
    friend constexpr mull operator-(mull a, mull b) { return a.norm(a.x + mod - b.x); }
    friend constexpr bool operator==(mull a, mull b) { return a.x == b.x; }
    friend constexpr bool operator!=(mull a, mull b) { return a.x != b.x; }
} power[N];

struct Hash {
    vector<int> s;
    vector<mull> h;
    Hash(const vector<int>& s) : s(s) {
        init(s);
    }
    void init(const vector<int>& s) {
        const int n = s.size();
        h.resize(n + 1);
        for (int i = 0; i < n; i++) {
            h[i + 1] = h[i] * H + s[i];
        }
    }
    mull operator()(int l, int r) {
        return h[r] - h[l] * power[r - l];
    }
};

signed main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    power[0] = 1;
    for (int i = 1; i < N; i++) {
        power[i] = power[i - 1] * H;
    }

    int t;
    cin >> t;

    while (t--) {
        int n, k;
        cin >> n >> k;

        int ocnt[2]{};  // 出点的个数
        auto solve = [&](int op) {
            vector<int> a(n);
            for (int i = 0; i < n; i++) {
                cin >> a[i];
                ocnt[op] += a[i];
            }

            vector<vector<int>> E(n);
            int m;
            cin >> m;
            while (m--) {
                int u, v;
                cin >> u >> v;
                u--, v--;
                E[u].push_back(v);
            }

            vector<int> d(n, -1);
            auto dfs = [&](auto&& self, int u) -> void {
                for (auto v : E[u]) {
                    if (d[v] != -1) continue;
                    d[v] = d[u] + 1;
                    self(self, v);
                }
            };
            dfs(dfs, 0);

            // BFS 也可以
            // queue<int> Q;
            // Q.push(0);
            // d[0] = 0;
            // while (!Q.empty()) {
            //     int u = Q.front(); Q.pop();
            //     for (auto v : E[u]) {
            //         if (d[v] == -1) {
            //             d[v] = d[u] + 1;
            //             Q.push(v);
            //         }
            //     }
            // }

            vector<int> cnt(2 * k);
            for (int i = 0; i < n; i++) {
                cnt[(d[i] + a[i]) % k] += (a[i] ^ op) ? 1 : n;
            }
            for (int i = 0; i < k; i++) {
                cnt[i + k] = cnt[i];  // 倍长
            }
            return Hash(cnt);
        };

        auto L = solve(0);
        auto R = solve(1);
        
        bool ok = false;
        for (int i = 0; i < k; i++) {
            if (L(0, k) == R(i, i + k)) {
                ok = true;
            }
        }
        if (ocnt[0] == n || ocnt[1] == n) ok = true;  // 特判只有一种方向的边 没有增加环的数量 一定可行
        if (ocnt[0] + ocnt[1] != n) ok = false;       // 特判出入点数量不同

        cout << (ok ? "YES" : "NO") << "\n";
    }

    return 0;
}
```
