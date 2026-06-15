---
title: Codeforces Round 1021 Div1A-D (Div2C-F)
tags:
  - 題解
  - 筆記
  - ACM
  - 算法
  - 練習賽
categories:
  - 邏輯與算法
  - 賽事
  - Codeforces
cover: /img/posts/acm/codeforces-cover.webp
top_img: /img/posts/acm/codeforces.webp
highlight_shrink: true
abbrlink: 85c25635
date: 2025-04-26 22:00:00
updated: 2025-04-26 22:45:00
---
## [2097A - Sports Betting](https://codeforces.com/contest/2097/problem/A)

连续若干数的出现次数依次为 4 或 2 1 ... 1 2。

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        map<int, int> mp;
        for (int i = 0; i < n; i++) {
            int x;
            cin >> x;
            mp[x]++;
        }

        bool ok = false;
        int lst = -1;
        bool flag = false;
        for (auto& [k, v] : mp) {
            if (v >= 4) {
                ok = true;
            }
            if (k != lst + 1) {
                lst = k;
                flag = false;
            }
            if (v >= 2) {
                if (flag) {
                    ok = true;
                } else {
                    flag = true;
                }
            }
            lst = k;
        }
        if (ok) {
            cout << "Yes" << endl;
        } else {
            cout << "No" << endl;
        }
    }

    return 0;
}
```

---
## [2097B - Baggage Claim](https://codeforces.com/contest/2097/problem/B)

两步，先填唯一确定的，再计数。

先把唯一的填好。
- 同 x 或同 y 只能填中间，一定唯一；
- 对角线也有可能唯一，对角线两个格子，但是另一个格子被占了，就唯一了；
- 可以用拓扑排序实现，谁只能选一个（相当于度数为一），就把这个格子占用，其它如果还要占这个格子，就度数减一，如果度数为一就入队。

拓扑排序结束后，会剩下很多度数为二的，这才有选择空间。
- 如果一条路径能选 u v，就连通 u v。
- 对于每个连通块
    - 如果 n 条路径选 n+1 个格子，方案数为 n+1；
    - 如果 n 条路径选 n 个格子，方案数为 2（本质是环，参考 k=11 的那个样例）；
    - 如果 n 条路径选小于 n 个格子，无解；

```cpp
#include <bits/stdc++.h>

using namespace std;
using ll = long long;
using uint = unsigned;
using ull = unsigned long long;
using ulll = unsigned __int128;

constexpr ull inf = 0x3f3f3f3f3f3f3f3f;
constexpr ull mod = 1e9 + 7;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n, m, k;
        cin >> n >> m >> k;

        vector vis(n, vector<int>(m));
        vector<array<int, 2>> a(k + 1);
        for (auto& [x, y] : a) {
            cin >> x >> y;
            x--;
            y--;
            vis[x][y] = 1;
        }

        bool ok = true;
        vector need(n, vector<vector<int>>(m));
        vector<vector<array<int, 2>>> adj(k);
        for (int i = 0; i < k; i++) {
            auto [x0, y0] = a[i + 1];
            auto [x1, y1] = a[i];
            if (abs(x0 - x1) + abs(y0 - y1) != 2) {
                ok = false;
                break;
            }
            if (x0 == x1 || y0 == y1) {
                int x = (x0 + x1) / 2;
                int y = (y0 + y1) / 2;
                if (vis[x][y]) {
                    ok = false;
                    break;
                }
                need[x][y].push_back(i);
                adj[i].push_back({ x, y });
            } else {
                if (vis[x0][y1] && vis[x1][y0]) {
                    ok = false;
                    break;
                }
                if (!vis[x0][y1]) {
                    need[x0][y1].push_back(i);
                    adj[i].push_back({ x0, y1 });
                }
                if (!vis[x1][y0]) {
                    need[x1][y0].push_back(i);
                    adj[i].push_back({ x1, y0 });
                }
            }
        }
        queue<int> Q;
        for (int i = 0; i < k; i++) {
            if (adj[i].size() == 1) {
                Q.push(i);
            }
        }
        while (!Q.empty()) {
            int u = Q.front();
            Q.pop();
            if (adj[u].size() != 1) {
                ok = false;
                break;
            }
            auto [x, y] = adj[u][0];
            if (vis[x][y]) {
                ok = false;
                break;
            }
            vis[x][y] = 1;
            for (auto v : need[x][y]) {
                auto it = find(adj[v].begin(), adj[v].end(), array<int, 2>{x, y});
                if (it == adj[v].end()) continue;
                adj[v].erase(it);
                if (adj[v].size() == 1) {
                    Q.push(v);
                }
            }
        }

        vector<vector<int>> dsu(n * m);
        vector<int> cnt(n * m);
        for (int i = 0; i < n * m; i++) {
            dsu[i].push_back(i);
            cnt[i] = 1;
        }
        auto uno = [&](int u, int v) {
            if (u = dsu[u][0], v = dsu[v][0]; u == v) {
                cnt[u]++;
                return;
            }
            if (dsu[u].size() < dsu[v].size()) swap(u, v);
            for (auto x : dsu[v]) {
                dsu[u].push_back(x);
                dsu[x] = { u }; 
            }
            cnt[u] += cnt[v];
        };
       
        auto change = [&](array<int, 2> x) {
            return x[0] * m + x[1];
        };
        for (int i = 0; i < k; i++) { 
            if (adj[i].size() == 2) {
                uno(change(adj[i][0]), change(adj[i][1]));
            }
        }
        ll res = 1;
        for (int i = 0; i < n * m; i++) {
            if (i == dsu[i][0]) {
                if (cnt[i] > dsu[i].size() + 1) {
                    ok = false;
                } else if (cnt[i] == dsu[i].size() + 1) {
                    res *= 2;
                } else if (cnt[i] == dsu[i].size()) {
                    res *= cnt[i];
                }
                res %= mod;
            }
        }
        if (!ok) {
            res = 0;
        }
        cout << res << endl;
    }

    return 0;
}
```

---
## [2097C - Bermuda Triangle](https://codeforces.com/contest/2097/problem/C)

*算是比较基础的 EXGCD 题目*

反射是假的，做对称后要求射出的直线能经过某个 $(\alpha n,\beta n)$。

问题等价于解关于正整数 $k$ 的同余方程组
$$
\begin{cases}
x+ku \equiv 0 \pmod n   \\
y+kv \equiv 0 \pmod n  
\end{cases}
$$

先解关于正整数 $a$ 的同余方程 $x+au \equiv 0 \pmod n$，这是个很基础的问题，用 EXGCD 解决：
- 设 $g_{1}=\operatorname{GCD}(u,n)$。
- 当 $g_{1}\not\mid x$ 时方程无解。
- 每个数都同除 GCD，即设 $x=x_{1}g_{1},u=u_{1}g_{1},n=n_{1}g_{1}$，则 $a=-x_{1}\cdot u_{1}^{-1} \pmod {n_{1}}$。

对于 $y+bv \equiv 0 \pmod n$ 同理， $b=-x_{2}\cdot v_{2}^{-1} \pmod {n_{2}}$。

上面只求出了
$$
\begin{cases}
x+au \equiv 0 \pmod n   \\
y+bv \equiv 0 \pmod n  
\end{cases}
$$
的解。题目还要求 $a=b$，也就是说要找到一个 $k$，满足
$$
\begin{cases}
k \equiv a \pmod {n_{1}}  \\
k \equiv b \pmod {n_{2}}
\end{cases}
$$
设 $k=pn_{1}+a=qn_{2}+b$，其中 $p,q$ 为待求解的正整数，问题化为求解不定方程
$$
pn_{1}-qn_{2}=b-a
$$
的解，这直接用 EXGCD 就能求解。进而通过 $p,q$ 求出 $k$ 的值。

```cpp
#include <bits/stdc++.h>

using namespace std;
using ll = long long;
using uint = unsigned;
using ull = unsigned long long;
using ulll = unsigned __int128;

constexpr ull inf = 0x3f3f3f3f3f3f3f3f;
constexpr ull mod = 1e9 + 7;

constexpr pair<ll, ll> exgcd(ll a, ll b) {  // 满足 ax + by = gcd(a, b) 的一个解 x
    a %= b;
    if (a < 0) a += b;
    if (a == 0) return { b, 0 };
    ll s = b, t = a;
    ll m0 = 0, m1 = 1;
    while (t) {
        ll u = s / t;
        s -= t * u;
        m0 -= m1 * u;
        swap(s, t);
        swap(m0, m1);
    }
    if (m0 < 0) m0 += b / s;
    return { s, m0 };
}

pair<ll, ll> exexgcd(ll a, ll b, ll c) {
    ll d = gcd(a, b);
    if (c % d) return { -1, -1 }; // 无解
    a /= d, b /= d, c /= d;
    auto [s, x] = exgcd(a, b);
    ll y = (c - a * x) / b;
    x = ((x * c % b) + b * d) % b;
    y = (c - a * x) / b;
    return { x, y };
}
// 同余方程 ax == c (mod b) 的最小正整数解
// 即解不定方程 ax + by = c
// 调用exexgcd(a,b,c);

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n, x, y, u, v;
        cin >> n >> x >> y >> u >> v;

        int d = gcd(u, v);
        u /= d;
        v /= d;

        int g1 = gcd(u, n);
        if (x % g1) {
            cout << -1 << endl;
            continue;
        }
        int n1 = n / g1;
        int x1 = x / g1;
        int u1 = u / g1;
        auto [a, _] = exexgcd(u1, n1, -x1);

        int g2 = gcd(v, n);
        if (y % g2) {
            cout << -1 << endl;
            continue;
        }
        int n2 = n / g2;
        int y2 = y / g2;
        int v2 = v / g2;
        auto [b, _] = exexgcd(v2, n2, -y2);

        int g = gcd(n1, n2);
        if ((a - b) % g) {
            cout << -1 << endl;
            continue;
        }
        auto [p, q] = exexgcd(n1, n2, b - a);
        q = -q;
        ll k = p * n1 + a;

        x = x + k * u;
        y = y + k * v;

        ll res = 0;
        res += x / n - 1;
        res += y / n - 1;
        res += (x + y) / (2 * n);
        res += abs(x - y) / (2 * n);
        cout << res << endl;
    }

    return 0;
}
```

## [2097D - Homework](https://codeforces.com/contest/2097/problem/D)

*有点模板题的感觉。。*

按题目操作把字符串分割为最小单元后，每个都可以任意异或。只需判断 $s$ 的全部最小单元构成的线性基与 $t$ 形成的是否相同。

std::bitset 只能定长，实现时可以考虑手写 bitset，或者对最小单元的长度分治。下面的代码采用后者。

```cpp
#include <bits/stdc++.h>

using namespace std;
using ll = long long;
using uint = unsigned;
using ull = unsigned long long;
using ulll = unsigned __int128;

constexpr ull inf = 0x3f3f3f3f3f3f3f3f;
constexpr ull mod = 1e9 + 7;
constexpr ull N = 1000;
constexpr ull M = 1e6;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        string s, t;
        cin >> s >> t;

        int l = n >> __builtin_ctz(n);

        if (l < 1000) {
            auto solve = [&](const string& s) {
                vector<bitset<N>> h(l);
                auto add = [&](bitset<N> b) {
                    for (int i = 0; i < l; i++) {
                        if (b.test(i)) {
                            if (h[i].none()) {
                                for (int j = i + 1; j < l; j++) {
                                    if (!h[j].none() && b.test(j)) {
                                        b ^= h[j];
                                    }
                                }
                                for (int j = 0; j < i; j++) {
                                    if (!h[j].none() && h[j].test(i)) {
                                        h[j] ^= b;
                                    }
                                }
                                h[i] = b;
                                return;
                            }
                            b ^= h[i];
                        }
                    }
                };
                for (int i = 0; i < n; i += l) {
                    bitset<N> b(s.substr(i, l));
                    add(b);
                }
                return h;
            };
            if (solve(s) == solve(t)) {
                cout << "Yes" << endl;
            } else {
                cout << "No" << endl;
            }
        } else {
            auto solve = [&](const string& s) {
                map<int, bitset<M>> h;  
                auto add = [&](bitset<M> b) {
                    for (int i = 0; i < l; i++) {
                        if (b.test(i)) {
                            if (h[i].none()) {
                                for (int j = i + 1; j < l; j++) {
                                    if (h.count(j) && b.test(j)) {
                                        b ^= h[j];
                                    }
                                }
                                for (int j = 0; j < i; j++) {
                                    if (h.count(j) && h[j].test(i)) {
                                        h[j] ^= b;
                                    }
                                }
                                h[i] = b;
                                return;
                            }
                            b ^= h[i];
                        }
                    }
                };
                for (int i = 0; i < n; i += l) {
                    bitset<M> b(s.substr(i, l));
                    add(b);
                }
                return h;
            };
            if (solve(s) == solve(t)) {
                cout << "Yes" << endl;
            } else {
                cout << "No" << endl;
            }
        }
    }

    return 0;
}
```