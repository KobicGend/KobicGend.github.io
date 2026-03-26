---
title: 2023 CCPC 深圳｜Apr.27 CUC-ACM-2024-Spring-Training Round
tags:
  - 題解
  - 練習賽
  - 筆記
  - ACM
categories:
  - - 筆記
    - 練習賽
description: 第九届中国大学生程序设计竞赛（深圳）
highlight_shrink: true
abbrlink: 35f7c81e
date: 2024-04-27 17:00:00
updated: 2024-04-27 17:00:00
---


[第九届中国大学生程序设计竞赛（深圳）](https://cpc.csgrandeur.cn/csgoj/problemset#search=%E7%AC%AC%E4%B9%9D%E5%B1%8A%E4%B8%AD%E5%9B%BD%E5%A4%A7%E5%AD%A6%E7%94%9F%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%E7%AB%9E%E8%B5%9B%EF%BC%88%E6%B7%B1%E5%9C%B3%EF%BC%89-%EF%BC%88CCPC2023-Shenzhen%EF%BC%89)

现场题解：[CCPC2023深圳-题目讲解](https://www.bilibili.com/video/BV1SN411M7e9)

## [A. 一道好题](https://cpc.csgrandeur.cn/csgoj/problemset/problem?pid=1237)

> 不错的分治题，作为签到刚刚好

**题意** 初始为 0 的序列，两种操作，一是给下标为 $x$ 的数 $+1$，二是给值为 $x$ 的数 $+1$，至多 $20000$ 次操作得到目标序列。$n \leqslant 1000$。

**思路** 对操作分治，则操作一每个数至多 $\log n$ 次，操作二至多 $n$ 次，总次数是 $\Theta(n\log n)$ 的。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    int n;
    cin >> n;

    vector<int> a(n);
    for (int i = 0; i < n; ++i) {
        cin >> a[i];
    }

    vector<pair<int, int>> res;
    auto dfs = [&](auto&& self, int l, int r) -> void {
        if (r - l < 2) return;
        int mid = l + r >> 1;
        for (int i = 0; i < n; ++i) {
            if (mid <= a[i] && a[i] < r) {
                res.push_back({ 2, i + 1 });
            }
        }
        for (int i = l + 1; i < mid; ++i) {
            res.push_back({ 1, i });
        }
        self(self, l, mid);
        self(self, mid, r);
    };
    dfs(dfs, 0, n + 1);

    cout << res.size() << "\n";
    for (auto& [a, b] : res) {
        cout << a << " " << b << "\n";
    }

    return 0;
}
/**********************************************************************
    Problem: 1237
    User: KobicGend
    Language: C++
    Result: AC
    Time:24 ms
    Memory:2548 kb
**********************************************************************/
```

简单的验证程序：

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    int n = 4;
    vector<int> a(n);

    int q;
    cin >> q;
    while (q--) {
        int op, x;
        cin >> op >> x;
        if (op == 1) {
            for (int i = 0; i < n; ++i) {
                if (a[i] == x) a[i]++;
            }
        }
        else {
            x--;
            a[x]++;
        }
    }
    
    for (int i = 0; i < n; ++i) {
        cout << a[i] << " ";
    }

    return 0;
}
```

初见时写的代码（略有修改）：

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    int n;
    cin >> n;

    vector<pair<int, int>> a(n);
    for (int i = 0; i < n; ++i) {
        int x;
        cin >> x;
        a[i] = { x, i + 1 };
    }
    sort(a.begin(), a.end());

    vector<pair<int, int>> ans;
    auto solve = [&](auto&& self, int l, int r, int mn = 0) -> void {
        if (l > r) return;
        int mx = -1, mxnum = 0;
        for (int i = l; i <= r; ++i) {
            if ((r - i + 1) * (a[i].first - mn) > mx) {
                mx = (r - i + 1) * (a[i].first - mn);
                mxnum = i;
            }
        }
        if (a[mxnum].first > mn) {
            for (int i = mxnum; i <= r; ++i) {
                ans.push_back({ 2, a[i].second });
            }
        }
        for (int i = mn + 1; i < a[mxnum].first; ++i) {
            ans.push_back({ 1, i });
        }
        self(self, mxnum + 1, r, a[mxnum].first);
        self(self, l, mxnum - 1, mn);
    };
    solve(solve, 0, n - 1);

    cout << ans.size() << "\n";
    for (auto [k, v] : ans) {
        cout << k << " " << v << "\n";
    }

    return 0;
}

/**********************************************************************
    Problem: 1237
    User: KobicGend
    Language: C++
    Result: AC
    Time:19 ms
    Memory:2552 kb
**********************************************************************/
```


## [F. 见面礼](https://cpc.csgrandeur.cn/csgoj/problemset/problem?pid=1242)

> 小思维，初学图论时的练习题，队友提的思路我写的代码，做出来还是很得意的。当时不懂基环树，写了个很丑的 dfs 找环

**题意** 给定一个无向图，你需要求有多少种选择图上的一个点 $p$ 和一条边的方案，使得删去这条边后图变成一棵树，且这棵树以 $p$ 为根时每个节点的儿子个数均不超过 $3$。保证至少存在一种这样的方案。

**思路** 保证有解所以一定是基环树，删去的边是环上的边，而且每个点的度数 $\leqslant 5$ 。枚举删去的边，剩下的点如果有度数为 $5$ 的，则不合法，如果合法，度数 $\leqslant 3$ 的点都可以为根。

时间复杂度 $\Theta(n)$。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    int n;
    cin >> n;

    vector<vector<pair<int, int>>> E(n);
    for (int i = 0; i < n; ++i) {
        int u, v;
        cin >> u >> v;
        u--, v--;
        E[u].push_back({ v, i });
        E[v].push_back({ u, i });
    }

    // 拓扑排序
    queue<int> Q;
    vector<int> deg(n), vis(n);
    for (int u = 0; u < n; ++u) {
        deg[u] = E[u].size();
        if (deg[u] == 1) Q.push(u);
    }
    while (!Q.empty()) {
        int v = Q.front(); Q.pop();
        vis[v] = 1;
        for (auto [u, id] : E[v]) {
            if (deg[u] > 1) {
                if (--deg[u] == 1) Q.push(u);
            }
        }
    }

    // dfs找环
    vector<int> V;
    for (int u = 0; u < n; ++u) {
        if (vis[u]) continue; 
        V.push_back(u);
        int fromid = -1;
        do for (auto [v, id] : E[V.back()]) {
            if (deg[v] != 1 && id != fromid) {
                vis[v] = 1;
                fromid = id;
                V.push_back(v);
                break;
            }
        } while (u != V.back());
    }

    ll ans = 0;
    vector<int> cnt(6);
    for (int u = 0; u < n; ++u) {
        deg[u] = E[u].size();
        cnt[deg[u]]++;
    }
    for (int i = 1; i < V.size(); ++i) {
        int u = V[i], v = V[i - 1];
        auto tcnt = cnt;
        --tcnt[deg[u]];
        --tcnt[deg[v]];
        ++tcnt[deg[u] - 1];
        ++tcnt[deg[v] - 1];

        if (tcnt[5]) continue;
        ans += tcnt[1] + tcnt[2] + tcnt[3];
    }

    cout << ans << "\n";

    return 0;
}
/**********************************************************************
    Problem: 1242
    User: KobicGend
    Language: C++
    Result: AC
    Time:85 ms
    Memory:9448 kb
**********************************************************************/
```

丑陋的 dfs：

```cpp
bool flag = 0;
void dfs(int u, int fau = 0) {
    if (vis[u]) {
        circle.push_back(u);
        for (int i = fau; i != u; i = fa[i]) {
            circle.push_back(i);
        }
        flag = 1;
        circle.push_back(u);
        return;
    }
    vis[u] = 1;
    fa[u] = fau;
    for (auto v : E[u]) {
        if (v != fau) {
            dfs(v, u);
            if (flag) return;
        }
    }
}
```

## [G. 相似基因序列问题](https://cpc.csgrandeur.cn/csgoj/problemset/problem?pid=1243)

**题意** 给定 $n$ 个长度为 $m$ 的字符串 $s_1, \dots,s_N$。定义两个字符串相似：最多只有 $k$ 个对应字母不同。$q$ 组询问，每次给出一个长度为 $m$ 的字符串，问与几个 $s_{i}$ 相似。数据范围：$1 \leqslant n, q \leqslant 300$，$1 \leqslant m \leqslant 60,000$，$1 \leqslant K \leqslant 10$。

**思路** 突破口是 $k$ 很小，也就是说字符串大部分是相同的，用倍增 / 二分跳到下一个不相同的位置。$n,q$ 也很小，所以两两匹配就行。时间复杂度 $\Theta(qnk\log m)$。

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
    string s;
    vector<mull> h;
    Hash() {
        cin >> s;
        init(s);
    }
    Hash(const string& s) : s(s) {
        init(s);
    }
    void init(const string& s) {
        if (power[0] == 0) {
            power[0] = 1;
            for (int i = 1; i < N; i++) {
                power[i] = power[i - 1] * H;
            }
        }
        const int n = s.;
        h.resize(n + 1);
        for (int i = 0; i < length(); i++) {
            h[i + 1] = h[i] * H + s[i];
        }
    }
    mull operator()(int l, int r) {
        return h[r] - h[l] * power[r - l];
    }
    auto length() {
        return s.length();
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    int n, q, m, k;
    cin >> n >> q >> m >> k;

    vector<Hash> s(n);

    while (q--) {
        Hash t;
        
        int res = 0;
        for (int id = 0; id < n; ++id) {
            int kcnt = 0, i = 0;
            while (i < m) {  // 比较第i位是否相同
                if (t(i, i + 1) != s[id](i, i + 1)) {
                    if (++kcnt > k) break;
                }
                int len = m - i;
                while (len) {
                    if (t(i, i + len) != s[id](i, i + len)) len /= 2;
                    else break;
                }
                i += max(1, len);
            }
            res += kcnt <= k;
        }
        cout << res << endl;
    }

    return 0;
}
```


## [I. 不定方程](https://cpc.csgrandeur.cn/csgoj/problemset/problem?pid=1245)

> 讨厌推式子，讨厌炸 LL 且用 double 会炸精度的题

**题意** 求不定方程 $n=a^{k}-b^{k}$ 的正整数解。

**思路** $a-b\mid n$，枚举 $n$ 的约数 $t=a-b$。但枚举约数的复杂度是 $\sqrt{ n }$ 的，需要优化。事实上 $a-b$ 不会很大，做个简单的估计：
$$
n=a^{k}-b^{k} \geqslant a^{3}-b^{3}=(a-b)(a^{2}+ab+b^{2})>ta^{2}>t^{3}
$$

因此 $t \leqslant \sqrt[3]{ n } \leqslant 10^{6}$。代入得 $n=(t+b)^{k}-b^{k}$，单调，二分 $b$ 看是否有整数解。

慎用 `double`。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
constexpr ll mx = 1e12;
constexpr ll inf = 2e18;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        ll n, k;
        cin >> n >> k;

        int ans = 0;
        auto solve = [&](ll t) {
            auto cal = [&](ll b) {
                ll a = b + t;
                vector<ll> powa(k), powb(k);
                powa[0] = powb[0] = 1;
                for (int i = 1; i < k; ++i) {
                    if (1.0 * powa[i - 1] * a > inf) return inf;
                    powa[i] = powa[i - 1] * a;
                    if (1.0 * powb[i - 1] * b > inf) return inf;
                    powb[i] = powb[i - 1] * b;
                }
                ll sum = 0;
                for (int i = 0; i < k; ++i) {
                    if (1.0 + sum + powa[i] * powb[k - 1 - i] > inf) return inf;
                    sum += powa[i] * powb[k - 1 - i];
                }
                if (1.0 * sum * (a - b) > inf) return inf;
                sum *= a - b;
                return sum;
            };
            ll l = 1, r = 1e9;
            while (l < r) {
                ll mid = l + r >> 1;
                if (cal(mid) >= n) r = mid;
                else l = mid + 1;
            }
            ans += cal(l) == n;
        };

        for (ll i = 1; i * i <= min(mx, n); ++i) {
            if (n % i) continue;
            solve(i);
            if (i != n / i) solve(n / i);
        }

        cout << ans << "\n";
    }

    return 0;
}

/**********************************************************************
    Problem: 1245
    User: KobicGend
    Language: C++
    Result: AC
    Time:259 ms
    Memory:2380 kb
**********************************************************************/
```


```cpp
void shu() {
    i64 N, K;
    cin >> N >> K;

    int ans = 0;
    auto solve = [&](i64 t) {
        int l = 1, r = 1e9;
        while (l < r) {
            int mid = l + r >> 1;
            i128 p1 = 1, p2 = 1;
            for (int i = 0; i < K; i++) {
                p1 *= mid + t;
                p2 *= mid;
                if (p1 > 1E30) break;
            }
            auto res = p1 - p2;
            if (res == N) {
                ans += 1;
                return;
            } else if (res > N) {
                r = mid;
            } else {
                l = mid + 1;
            }
        }
    };

    for (i64 i = 1; i * i * i <= N; i++) {
        if (N % i) continue;
        solve(i);
        if (i != N / i) solve(N / i);
    }

    cout << ans << "\n";
    
    return;
}
```


又是数学

暴力的复杂度是 $\Theta(kn^{3})$，不能通过，期望复杂度 $\Theta(kn)$，突破口在 $M=10^{k}-1$。

先给所有数 $a_{i}$ 取模，这样三个数加起来不会超过 $3M$，只能是 $2M$ 或 $M$（还有 $0$，特判），也就是 $199\dots98$ 和 $99\dots99$。这个 $199\dots98$ 看上去不是很友好，可以做一个转换：把每个数 $a_{i}$ 变成 $a_{i}-M$，这样原先加起来是 $199\dots98$ 现在就是 $-99\dots99$ 了。

先考虑和为 $99\dots99$ 的。