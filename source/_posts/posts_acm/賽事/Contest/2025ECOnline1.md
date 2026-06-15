---
title: 2025 ICPC Asia EC 网络赛第一场 ABCGIM
tags:
  - 題解
  - 筆記
  - ACM
  - 算法
  - 網絡賽
categories:
  - posts_acm
  - 賽事
  - Contest
description: The 2025 ICPC Asia East Continent Online Contest (I)
highlight_shrink: true
abbrlink: cc4cc3c4
date: 2025-09-07 19:30:00
updated: 2025-09-07 19:30:00
---

Link: [The 2025 ICPC Asia East Continent Online Contest (I) - Dashboard - Contest - QOJ.ac](https://qoj.ac/contest/2513)

Board: [外榜 - 2025 ICPC Asia EC网络预选赛 - 第一场](https://pintia.cn/rankings/1962439589388427264)

## [A. Who Can Win](https://qoj.ac/contest/2513/problem/14301)（模拟）

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
const ll inf = 0x3f3f3f3f3f3f3f3f;

struct node {
    string s;
    int id;
    int t;
    string state;
};

void eachT() {
    int n;
    cin >> n;
    map<string, int> mp;
    vector<array<int, 26>> problems;
    vector<array<int, 26>> penalty;

    int cnt = 0;

    vector<node> a(n);

    for (int i = 0; i < n; i++) {
        string s;
        char id;
        int t;
        string state;
        cin >> s >> id >> t >> state;
        a[i] = { s, id - 'A', t, state };
    }
    sort(a.begin(), a.end(), [&](const node& A, const node& B) {
        return A.t < B.t;
    });

    int p = n;

    for (int i = 0; i < n; i++) {
        auto [s, id, t, state] = a[i];
        if (!mp.count(s)) {
            mp[s] = cnt++;
            problems.push_back({});
            penalty.push_back({});
        }

        int duiwu = mp[s];

        if (state == "Unknown") {
            p = i;
            break;
        }

        if (state == "Accepted") {
            if (problems[duiwu][id] == 0) {
                problems[duiwu][id] = 1;
                penalty[duiwu][id] += t;
            }
        } else if (state == "Rejected") {
            if (problems[duiwu][id] == 0) {
                penalty[duiwu][id] += 20;
            }
        }
    }

    map<string, int> all_problems;
    map<string, int> all_penalty;

    map<string, vector<node>> mp2;

    for (int i = p; i < n; i++) {
        auto [s, id, t, state] = a[i];
        if (!mp.count(s)) {
            mp[s] = cnt++;
            problems.push_back({});
            penalty.push_back({});
        }

        mp2[s].push_back(a[i]);
    }

    for (auto [s, duiwu] : mp) {
        for (int i = 0; i < 26; i++) {
            if (problems[duiwu][i] == 1) {
                all_penalty[s] += penalty[duiwu][i];
                all_problems[s] += 1;
            }
        }
    }



    int MAX_problems = 0;
    int MIN_penalty = inf;

    for (auto [s, duiwu] : mp) {
        if (all_problems[s] > MAX_problems) {
            MAX_problems = all_problems[s];
            MIN_penalty = all_penalty[s];
        } else if (all_problems[s] == MAX_problems) {
            if (all_penalty[s] < MIN_penalty) {
                MIN_penalty = all_penalty[s];
            }
        }
    }

    vector<string> ans;
    for (auto [s, duiwu] : mp) {
        auto pros = problems[duiwu];
        auto pens = penalty[duiwu];

        int pro = all_problems[s];
        int pen = all_penalty[s];

        if (pro == MAX_problems && pen == MIN_penalty) {
            ans.push_back(s);
            continue;
        }

        for (auto [name, id, t, state] : mp2[s]) {
            assert(state == "Unknown");
            if (pros[id] == 0) {
                pros[id] = 1;
                pro += 1;
                pen += pens[id];
                pen += t;
            }
        }

        if (pro > MAX_problems) {
            ans.push_back(s);
        } else if (pro == MAX_problems) {
            if (pen <= MIN_penalty) {
                ans.push_back(s);
            }
        }
    }

    for (auto s : ans) {
        cout << s << " ";
    }
    cout << endl;
}

int main() {
    int T = 1;
    cin >> T;
    while (T--) {
        eachT();
    }

    return 0;
}
```

## [B. Creating Chaos](https://qoj.ac/contest/2513/problem/14302)（签到）

最方便的做法是保留 $1,2,\dots,n-k$ 或 $k+1,\dots,n$。

这样做的原理是，任意 $m+1$ 个数中至少有两个数模 $m$ 同余，这是避免不了的贡献值。而如果我们就取 $1,2,\dots,m+1$ 这些数，就恰好有两个数模 $m$ 同余，使得贡献达到最小。选出 $n-k$ 个数也是同理。

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;

    for (int i = 1; i <= k; i++) {
        cout << i << " ";
    }

    return 0;
}
```

## [C. Canvas Painting](https://qoj.ac/contest/2513/problem/14303)（贪心）

我们计算有哪些区间是能真正操作的，答案即为 $n-$ 操作数。

将一个数变成另一个数之后，就把包含它的某一个线段删掉。

不妨从左向右遍历，能变就变。而且基于贪心，一定删去最短的线段。

模拟删除的过程即可。复杂度 $\mathcal{O}(m\log m)$。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int m, n;
        cin >> m >> n;
        
        map<int, vector<int>> mp;
        while (m--) {
            int l, r;
            cin >> l >> r;
            mp[l].push_back(r);
        }
        vector adj(mp.begin(), mp.end());

        multiset<int> s;
        int res = n;
        for (int i = 0; i < adj.size(); i++) {
            auto& [l, vec] = adj[i];
            for (auto r : vec) {
                s.insert(r);
            }
            int nextl = i + 1 == adj.size() ? n : adj[i + 1].first;
            for (int j = l; j < nextl; j++) {
                while (!s.empty() && *s.begin() <= j) {
                    s.erase(s.begin());
                }
                if (s.empty()) {
                    break;
                }
                res--;
                s.erase(s.begin());
            }
        }
        cout << res << endl;
    }
    
    return 0;
}
```

## [D. Min-Max Tree](https://qoj.ac/contest/2513/problem/14304)（树）

最终答案是每个点权的线性组合，系数 0/1/-1，称 做0贡献 /  做正贡献 / 做负贡献。

划分连通块的条件保证了，任意一棵子树中，做正贡献的点与做负贡献的点的数量之差不超过 1。

于是考虑 DP，维护 $f_{u,0/1 /-1}$ 表示 $u$ 的子树中 正负平衡 / 多一个正贡献的点 / 多一个负贡献的点 的所有点贡献之和。

转移的情况比较多，例如 $u$ 的子树中正负平衡，有可能是 $u$ 每个子节点都正负平衡；也有可能是 $u$ 子节点除了一个正贡献，一个负贡献，其它正负平衡；还有可能是 $u$ 自己做正贡献，子节点有一个负贡献……枚举子节点中哪个做正哪个做负以转移。

复杂度 $\mathcal{O}(n)$。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

signed main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    int n;
    cin >> n;

    vector<int> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }

    if (n == 1) {
        cout << 0 << endl;
        return 0;
    }

    vector<vector<int>> adj(n);
    for (int i = 1; i < n; i++) {
        int x, y;
        cin >> x >> y;
        x--; y--;
        adj[x].push_back(y);
        adj[y].push_back(x);
    }

    // 0 : zero
    // 1 : positive
    // 2 : negative
    auto dfs = [&](auto&& self, int x, int p) -> array<ll, 3> {
        if (x && adj[x].size() == 1) {
            return { 0, a[x], -a[x] };
        }

        ll sum0 = 0;
        vector<ll> pos, nes;
        for (auto y : adj[x]) {
            if (y == p) {
                continue;
            }
            auto [ze, po, ne] = self(self, y, x);
            sum0 += ze;
            pos.push_back(po - ze);
            nes.push_back(ne - ze);
        }

        int m = pos.size();
        auto prepo = pos, sufpo = pos;
        auto prene = nes, sufne = nes;
        for (int i = 1; i < m; i++) {
            prepo[i] = max(prepo[i], prepo[i - 1]);
            prene[i] = max(prene[i], prene[i - 1]);
        }
        for (int i = m - 2; i >= 0; i--) {
            sufpo[i] = max(sufpo[i], sufpo[i + 1]);
            sufne[i] = max(sufne[i], sufne[i + 1]);
        }
        
        auto ze = max({
            sum0, 
            sum0 + a[x] + prene.back(), 
            sum0 - a[x] + prepo.back()
        });
        for (int i = 1; i < m; i++) {
            ze = max(ze, sum0 + prepo[i - 1] + sufne[i]);
            ze = max(ze, sum0 + prene[i - 1] + sufpo[i]);
        }
        auto po = max(sum0 + a[x], sum0 + prepo.back());
        auto ne = max(sum0 - a[x], sum0 + prene.back());
        return { ze, po, ne };
    };
    cout << dfs(dfs, 0, -1)[0] << endl;
    
    return 0;
}
```

## [G. Sorting](https://qoj.ac/contest/2513/problem/14307)（签到）

必须包含所有的 $(i,i+1)$。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    int n, m;
    cin >> n >> m;

    map<pair<int, int>, bool> mp;
    while (m--) {
        int a, b;
        cin >> a >> b;

        mp[{ a, b }] = true;
    }

    for (int i = 1; i < n; i++) {
        if (!mp.count({ i, i + 1 })) {
            cout << "No" << endl;
            return 0;
        }
    }

    cout << "Yes" << endl;

    return 0;
}
```

## [I. Knapsack Problem](https://qoj.ac/contest/2513/problem/14309)（图论）

对于一条路径，正反的结果是相同的。我们考察正向路径中最后一个背包，反向路径的话这是第一个，能装的点权不会比正向少。这样得到正向路径的总背包数 $\geqslant$ 反向路径的总背包数。根据对称性，就得到反 $\geqslant$ 正。于是正 $=$ 反。

用 Dijkstra 处理单源最短路，维护每个点的（最少背包数，剩余最大容量），复杂度 $\mathcal{O}[(m+n)\log n]$。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
constexpr ll inf = 0x3f3f3f3f3f3f3f3f;

void chmin(ll& x, const ll y) {
    if (x > y) {
        x = y;
    }
}

signed main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    int n, m, V, s;
    cin >> n >> m >> V >> s;
    s--;

    vector<vector<pair<int, int>>> adj(n);
    while (m--) {
        int x, y, w;
        cin >> x >> y >> w;
        x--; y--;
        adj[x].push_back({ w, y });
        adj[y].push_back({ w, x });
    }

    vector<int> vis(n);
    
    vector<ll> dis(n, inf);
    dis[s] = 0;

    priority_queue<pair<ll, int>> Q;
    Q.push({ 0, s });

    while (!Q.empty()) {
        auto [_, x] = Q.top();
        Q.pop();

        if (vis[x]) continue;
        vis[x] = true;

        for (auto [w, y] : adj[x]) {
            ll q = dis[x] / V, r = dis[x] % V;
            r += w;
            if (r > V) {
                q++;
                r = w;
            }
            ll ndis = q * V + r;
            if (dis[y] > ndis) {
                dis[y] = ndis;
                Q.push({ -dis[y], y });
            }
        }
    }

    for (int x = 0; x < n; x++) {
        if (dis[x] == inf) {
            cout << -1 << " ";
            continue;
        }
        ll q = dis[x] / V, r = dis[x] % V;
        if (r) {
            q++;
        }
        q = max(1LL, q);
        cout << q << " ";
    }
    cout << endl;
    
    return 0;
}
```

## [J. Moving on the Plane](https://qoj.ac/contest/2513/problem/14310)（UPSOLVED, 计数）

题意：给定平面上 $N$ 个点。$M$ 次操作，每次对每一个点向上下左右移动一格（必须移动）。求操作方法数，满足最终两两的 Manhattan distance $\leqslant K$。mod 998244353，$N \leqslant 50,M \leqslant 10^{5},K \leqslant 10$, $|X_{i}|,|Y_{i}| \leqslant 10^{5}$。

首先是，我们喜闻乐见的，Manhattan distance 转为 Chebyshev distance：
$$|x_{1} - x_{2}| + |y_{1}- y_{2}| = \max\{|(x_{1} + y_{1}) - (x_{2} + y_{2})|, |(x_{1} - y_{1}) - (x_{2} - y_{2})|\}$$

题目要求
$$
|x_{1} - x_{2}| + |y_{1}- y_{2}|  \leqslant K 
$$
于是化为
$$
\begin{cases}
|(x_{1} + y_{1}) - (x_{2} + y_{2})| \leqslant K \\
|(x_{1} - y_{1}) - (x_{2} - y_{2})| \leqslant K
\end{cases}
$$
两个维度相互独立，可以分别求解。

考虑这样的问题：给定线段上 $N$ 个点。$M$ 次操作，每次选择一个点向左右移动一格。求操作方法数，满足最终两两的距离 $\leqslant K$。mod 998244353，$N \leqslant 50,M \leqslant 10^{5},K \leqslant 10$, $|X_{i}| \leqslant 10^{5}$。

注意到 $K$ 很小。为了计算最终两两的距离 $\leqslant K$ 的方案数，枚举 $\ell,r$（$r-\ell \leqslant K$），求解将所有点移动到区间 $[\ell,r]$ 内部的方案数 $f_{l,r}$。进一步转化为将一个点 $X_{i}$ 移动到区间 $[\ell,r]$ 内部的方案数，其中枚举移动到的位置 $x$ 的方案数是 $\dbinom{M}{\frac{M+X_{i}-x}{2}}$。具体地，
$$
f_{\ell,r} = \prod_{i=1}^{N} \sum_{x=\ell}^{r} \dbinom{M}{\frac{M+X_{i}-x}{2}}
$$

这个 $f$ 会重复计数，需要做一个容斥（至多 $k$ $\to$ 恰好 $k$）得到最终结果。

复杂度 $\mathcal{O}[(M+V) N K]$。

```cpp
int main() {
    int N, M, K;
    cin >> N >> M >> K;

    vector<int> A(N), B(N);
    for (int i = 0; i < N; i++) {
        int X, Y;
        cin >> X >> Y;
        A[i] = X + Y;
        B[i] = X - Y;
    }

    auto cal = [&](vector<int>& X) {
        int min = *ranges::min_element(X);
        int max = *ranges::max_element(X);
        vector<Z> f(K + 1);
        for (int l = min - 2 * M; l <= max + M; l++) {
            vector<Z> sum(N);
            for (int r = l; r <= l + K; r++) {
                Z prod = 1;
                for (int n = 0; n < N; n++) {
                    if ((M + X[n] - r) % 2 == 0) {
                        sum[n] += binom(M, (M + X[n] - r) / 2);
                    }
                    prod *= sum[n];
                }
                f[r - l] += prod;
            }
        }
        return f[K] - f[K - 1];
        // 或者：
        for (int k = 1; k <= K; k++) {
            for (int j = 0; j < k; j++) {
                f[k] -= (k - j + 1) * f[j];
            }
        }
        return ranges::fold_left(f, Z(0), plus());
    };
    cout << (cal(A) * cal(B)) << endl;

    return 0;
}
```
## [M. Teleporter](https://qoj.ac/contest/2513/problem/14313)（图论）

路径形如：走树上的边 $\to$ 传送 $\to$ 走树上的边 $\to$ 

每次传送只有 $m$ 条边。总共 $k$ 轮，复杂度 $\mathcal{O}(km)$。

树上路径一定是先朝根走再朝叶子走，两轮松弛就能求出全源最短路，复杂度 $\mathcal{O}(n)$。总共 $k$ 轮，复杂度 $\mathcal{O}(kn)$。

总复杂度 $\mathcal{O}(k m + k n)$。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
constexpr ll inf = 0x3f3f3f3f3f3f3f3f;

void chmin(ll& x, const ll y) {
    if (x > y) {
        x = y;
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    int n, m;
    cin >> n >> m;

    vector<vector<pair<int, int>>> adj(n);
    for (int i = 1; i < n; i++) {
        int x, y, w;
        cin >> x >> y >> w;
        x--; y--;
        adj[x].push_back({ w, y });
        adj[y].push_back({ w, x });
    }
    
    vector<array<int, 3>> fward, bward;
    fward.reserve(n - 1);
    bward.reserve(n - 1);
    [&](this auto&& self, int x, int p) -> void {
        for (auto [w, y] : adj[x]) {
            if (y == p) {
                continue;
            }
            fward.push_back({ w, x, y });
            self(y, x);
            bward.push_back({ w, y, x });
        }
    } (0, -1);

    vector<array<int, 2>> teleporters;
    teleporters.reserve(m * 2);
    while (m--) {
        int x, y;
        cin >> x >> y;
        x--; y--;
        teleporters.push_back({ x, y });
        teleporters.push_back({ y, x });
    }

    vector<ll> dp(n, inf);
    dp[0] = 0;
    for (int k = 0; k <= n; k++) {
        for (auto [w, x, y] : bward) {
            chmin(dp[y], dp[x] + w);
        }
        for (auto [w, x, y] : fward) {
            chmin(dp[y], dp[x] + w);
        }
        cout << accumulate(dp.begin(), dp.end(), 0LL) << endl;

        auto ndp = dp;
        for (auto [x, y] : teleporters) {
            chmin(ndp[y], dp[x]);
        }
        dp = ndp;
    }
    
    return 0;
}
```