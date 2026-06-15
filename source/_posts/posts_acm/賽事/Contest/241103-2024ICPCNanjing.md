---
title: 2024 ICPC 南京个人题解 (7 题 BCEGJKM)
tags:
  - 題解
  - 筆記
  - ACM
  - 算法
  - 區域賽
categories:
  - posts_acm
  - 賽事
  - Contest
description: >-
  The 2024 ICPC Asia Nanjing Regional Contest (The 3rd Universal Cup. Stage 16:
  Nanjing)
highlight_shrink: true
abbrlink: e52d32f
date: 2024-11-07 09:09:44
updated: 2024-11-07 09:09:44
---
[Link](https://codeforces.com/gym/105484/)

出题人预测难度：EJ BK GIM ACF DH L
实际通过人数排序：EJ KGB C IMF AHDL
个人难度排序：EJ BMGK C

## B. Birthday Gift（思维）

给定 $012$ 串，最优化操作若干次，每次：
- 将某个 $2$ 改为 $0$ 或 $1$；
- 选择两个相邻的 $0$ 消去，剩余部分连接；
- 选择两个相邻的 $1$ 消去。

最小化最终序列长度。数据范围：$n \leqslant 2\times 10^{5}$。

**思路** 奇数位的两个 0 一定不能互相消去，相邻（也就是奇偶性不同的）两个 0 一定可以消去。我们记录互消之后剩下的 0 和 1，贪心地将 2 变成 0 和 1 即可。注意剩余奇数个 2 的情形。

时间复杂度 $\Theta(n)$。

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    
    int t;
    cin >> t;

    while (t--) {
        string s;
        cin >> s;

        int cnt2 = 0, cnt[2][2]{};
        for (int i = 0; i < s.size(); i++) {
            if (s[i] == '2') {
                cnt2++;
            } else {
                cnt[i & 1][s[i] - '0']++;
            }
        }

        int cnt1 = abs(cnt[0][1] - cnt[1][1]);  // 剩下的1
        int cnt0 = abs(cnt[0][0] - cnt[1][0]);  // 剩下的0

        int tmp = min(cnt0, cnt2);  // 用2消0
        cnt2 -= tmp;
        cnt0 -= tmp;

        tmp = min(cnt1, cnt2);  // 用2消1
        cnt2 -= tmp;
        cnt1 -= tmp;

        cnt2 %= 2;  // 剩下的2两两互消

        cout << (cnt0 + cnt1 + cnt2) << endl;
    }

    return 0;
}
```

官方题解先将奇数位 01 互换，本质是一样的。


## C. Topology（树形 DP）- UPSOLVE

> 约定：$u$ 的父亲为 $p_{u}$，子树大小为 $s_{u}$，深度为 $d_{u}$。节点编号 $[0,n)$。

**引理**（拓扑序计数）给定一棵树，在点上写一个排列，使得每个点的点权比其父亲的数大的方案数，这等价于，满足每个节点的父亲排在他前面的排列方案数为 $\dfrac{n!}{\prod_{i=0}^{n-1} s_{i}}$。

**题意** 求满足 $p_{i}=i$ 的拓扑序计数。数据范围：$n \leqslant 5000$。

**思路** 树形 DP，常见的 $f_{p_{u}}\leftarrow f_{u}$ 不易转移，考虑从外而内地 DP，也就是 $f_{u}\leftarrow f_{p_{u}}$。值得注意的是，为避免后效性，这里的设 $f_{u}$ 表示处理除去 $u$ 子树以外的其它节点的状态。

对于本题，设 **键** $f_{u,i}$ 表示处理除去 $u$ 子树以外的其它节点，且 **在 $\boldsymbol{u}$ 处填 $\boldsymbol{i}$** ，**值** 是 **方案数**。

思考如何转移 $f_{u}\leftarrow f_{p_{u}}$，对于本题是 $f_{u,j}\leftarrow f_{p_{u},i}$，也就是 $p_{u}$ 填 $i$，$u$ 填 $j$，需要同时处理在 $p_{u}$ 子树而不在 $u$ 子树的其它节点。

两个问题：哪些位置？什么顺序？

- 空位：由于 $u$ 子树的节点必须放在 $u$ 后面，所以 $u$ 后面至少要留 $s_{u}-1$ 个给子树，其余位置可以填，所以选择的方案数是 $\operatorname{C}_{n-j-1}^{s_{u-1}}$。这不是转移系数，因为如果已经钦定 $u$ 子树中节点的位置，DP 就有后效性了。再回看转移目标，需要 $p_{u}$ 后面至少要留 $s_{p_{u}}-1$ 个给子树，除去 $u$ 子树中 $s_{u}$ 那些节点，现在需要钦定的只有 $s_{p_{u}}-1-s_{u}$ 个节点，因此选择的方案数是 $a=\operatorname{C}_{n-i-1-s_{u}}^{s_{p_{u}}-1-s_{u}}$。

- 顺序：需要计算 $u$ 所有兄弟节点的子树拓扑序方案数，根据上面的引理，$v$ 子树的拓扑序计数是 $\dfrac{s_{v}!}{\prod_{i\in s_{v}} s_{i}}$，因此所需方案数是
  $$
  b=\prod_{v}\dfrac{s_{v}!}{\prod_{i\in s_{v}} s_{i}}=\dfrac{(s_{p_{u}}-s_{u})!}{\big(\prod_{i\in s_{p_{u}}} s_{i}\big)/\big(\prod_{i\in s_{u}} s_{i}\big)}
  $$

这两个式子相乘 $ab$ 就是转移系数。这样的转移是 $\Theta(n^{2})$ 的，不难用前缀和优化到 $\Theta(n)$。

现在得到的不是答案，因为 $f_{u,i}$ 还没有考虑 $u$ 的子树。

- 空位：需要钦定 $u$ 子树所有节点的位置，所以方案数就是刚才提到的 $c=\operatorname{C}_{n-i-1}^{s_{u-1}}$

- 顺序：即是 $u$ 子树的拓扑序 $d=\dfrac{s_{u}!}{\prod_{i\in s_{u}} s_{i}}$。

所以拓扑序中 $u$ 填 $i$ 的方案数 $g_{u,i}=cdf_{u,i}$，这就是所求。

总的时空复杂度 $\Theta(n^{2})$。

（没用取模类，代码很丑）

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

constexpr int mod = 998244353;
constexpr int N = 5e3 + 8;
ll fac[N], ifac[N];

ll qpow(ll a, ll n) {
    ll res = 1;
    while (n) {
        if (n & 1) res = res * a % mod;
        a = a * a % mod;
        n >>= 1;
    }
    return res;
}

ll inv(ll n) {
    return qpow(n, mod - 2);
}

void init(int n) {
    fac[0] = ifac[0] = 1;
    for (int i = 1; i <= n; i++) {
        fac[i] = fac[i - 1] * i % mod;
    }
    ifac[n] = inv(fac[n]);
    for (int i = n; i > 0; i--) {
        ifac[i - 1] = ifac[i] * i % mod;
    }
}

ll C(int n, int m) {
    if (n < m || m < 0) return 0;
    return fac[n] * ifac[m] % mod * ifac[n - m] % mod;
}

int main() {
    int n;
    cin >> n;

    init(n);

    vector p(n, -1);
    for (int i = 1; i < n; i++) {
        cin >> p[i];
        p[i]--;
    }

    vector siz(n, 1LL); // 子树大小
    for (int i = n - 1; i; i--) {
        siz[p[i]] += siz[i];
    }

    auto psiz = siz;  // 子树的siz之积 prod-siz
    for (int i = n - 1; i; i--) {
        psiz[p[i]] *= psiz[i];
        psiz[p[i]] %= mod;
    }

    vector dp(n, vector<ll>(n));
    dp[0][0] = 1;
    for (int i = 1; i < n; i++) {
        vector<ll> pre(n);
        for (int j = 0; j < n - 1; j++) {
            ll tmp = dp[p[i]][j] * C(n - 1 - j - siz[i], siz[p[i]] - 1 - siz[i]) % mod;
            (pre[j + 1] += pre[j] + tmp) %= mod;
        }
        ll tmp = fac[siz[p[i]] - siz[i] - 1] * inv(psiz[p[i]]) % mod * psiz[i] % mod * siz[p[i]] % mod;
        for (int j = 1; j < n; j++) {
            (dp[i][j] += pre[j] * tmp) %= mod;
        }
    }

    for (int i = 0; i < n; i++) {
        cout << (dp[i][i] * C(n - 1 - i, siz[i] - 1) % mod * fac[siz[i]] % mod * inv(psiz[i]) % mod) << " \n"[i == n - 1];
    }

    return 0;
}
```

## E. Left Shifting 3（签到）

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n, k;
        cin >> n >> k;
        k = min(n, k);

        string s;
        cin >> s;
        s += s;
        s = ' ' + s;

        vector<int> f(2 * n);
        for (int i = 0; i + 6 < 2 * n; i++) {
            if (s.substr(i, 7) == "nanjing") {
                f[i]++;
            }
            f[i + 1] += f[i];
        }

        int maxx = 0;
        for (int i = 0; i <= k; i++) {
            maxx = max(maxx, f[max(0, n + i - 6)] - f[i]);
        }
        cout << maxx << endl;
    }

    return 0;
}
```

## G. Binary Tree（交互、树）- UPSOLVE

给定一棵二叉树，找隐藏的特殊节点，每次询问 $x,y$，返回这两者到特殊节点的距离大小关系，至多 $\lfloor \log_{2}n \rfloor$ 次。数据范围：$n \leqslant 10^{5}$。

**思路** 问直径是不行的，每问 $\log_{2}k$ 次可以砍掉 $k$ 个节点，$n=\sum k$，则 $\sum\log_{2}k=\log_{2}\prod k>\log_{2}\sum k=\log_{2}n$，次数超了。

希望每次询问砍掉 **至少一半** 的节点，考虑问重心，类似点分治的想法。

每个点至多有三个相邻节点 $x,y,z$，按称假砝码的思路，问其中两个节点 $x,y$，若 $d_{x}>d_{y}$ 则在 $y$ 那边，若 $d_{x}<d_{y}$ 则在 $x$ 那边，若 $d_{x}=d_{y}$ 则在 $z$ 那边，**或者是重心自己**。

问题出在至少一半和或者是重心自己，如果总共 $5$ 个节点，且 $s_{x}=1,s_{y}=1,s_{z}=2$，如果问到 $d_{x}=d_{y}$，那么剩下的是 $z$ 那边的子树或重心自己，剩下了 $3$ 个节点，这是不行的。所以问其中两个节点 $x,y$ 不是任意选的，应当问子树大小较大的两个。

这样每次询问一定能砍掉至少一半的节点。

```cpp
#include<bits/stdc++.h>
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

        int _cnt = 0, _max = __lg(n);
        auto query = [&](int x, int y) {
            assert(++_cnt <= _max);
            cout << "? " << ++x << " " << ++y << endl;
            cin >> x;
            return x;
        };
        
        auto answer = [&](int x) {
            cout << "! " << ++x << endl;
        };

        vector<vector<int>> E(n);

        for (int i = 0; i < n; i++) {
            int l, r;
            cin >> l >> r;
            l--, r--;
            if (l != -1) E[i].push_back(l), E[l].push_back(i);
            if (r != -1) E[i].push_back(r), E[r].push_back(i);
        }

        int s = 0;
        while (1) {
            vector<int> siz(n), mss(n);
            auto dfs = [&](auto&& self, int u, int p) -> void {
                siz[u] = 1;
                for (auto v : E[u]) {
                    if (v == p) continue;
                    self(self, v, u);
                    siz[u] += siz[v];
                    mss[u] = max(mss[u], siz[v]);
                }
            };
            dfs(dfs, s, -1);

            int ctr;
            int tot = siz[s];
            for (int u = 0; u < n; u++) {
                mss[u] = max(mss[u], tot - siz[u]);
                if (siz[u] && mss[u] <= tot / 2) ctr = u;
            }

            if (E[ctr].empty()) {
                answer(ctr);
                break;
            } else if (E[ctr].size() == 1) {
                int u = ctr, v = E[ctr][0];
                int x = query(u, v);
                if (x == 0) {  // d(u) < d(v)
                    answer(u);
                    break;
                } else {  // d(u) > d(v)
                    answer(v);
                    break;
                }
            } else {
                sort(E[ctr].begin(), E[ctr].end(), [&](const int u, const int v) {
                    return mss[u] < mss[v];
                });

                int u = E[ctr][0], v = E[ctr][1];
                int x = query(u, v);
                if (x == 0) {  // d(u) < d(v)
                    s = u;
                    E[s].erase(find(E[s].begin(), E[s].end(), ctr));
                } else if (x == 2) {  // d(u) > d(v)
                    s = v;
                    E[s].erase(find(E[s].begin(), E[s].end(), ctr));
                } else {  // d(u) == d(v)
                    s = ctr;
                    E[s].erase(E[s].begin());
                    E[s].erase(E[s].begin());
                }
            }
        }
    }

    return 0;
}
```


## J. Social Media（签到）

第二个签到。枚举一条边的两个端点，或者选择两个度最大的点而不考虑之间的边。

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n, m, k;
        cin >> k >> m >> n;

        vector<int> good(n);
        while (k--) {
            int x;
            cin >> x;
            x--;
            good[x] = 1;
        }

        map<pair<int, int>, int> edge;
        vector<int> deg(n);
        int sum = 0;
        while (m--) {
            int x, y;
            cin >> x >> y;
            x--, y--;
            if (x > y) swap(x, y);
            if (good[x] && good[y]) {
                sum++;
            } else if (x == y) {
                deg[x]++;
            } else if (good[x]) {
                deg[y]++;
            } else if (good[y]) {
                deg[x]++;
            } else {
                edge[{ x, y }]++;
            }
        }

        int ans = 0;
        for (auto [e, w] : edge) {
            auto [x, y] = e;
            ans = max(ans, deg[x] + deg[y] + w);
        }

        sort(deg.begin(), deg.end(), greater<>());
        ans = max(ans, n == 1 ? deg[0] : deg[0] + deg[1]);

        ans += sum;
        cout << ans << "\n";
    }

    return 0;
}
```


## K. Strips（贪心）- UPSOLVE

先不考虑右边界，贪心地放纸条，这样可以保证最小数量。再加上右边界，如果纸条超出边界或重合就向左挪动，这样可以保证在数量不变的同时使之合法。

如果超出左边界，就说明不合法，那一定无解。有解时，数量已经保证最小，且在挪动过程中找到了一组可行方案。

除去排序，时间复杂度 $\Theta(n+m)$。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n, m, k, w;
        cin >> n >> m >> k >> w;

        vector<pair<int, int>> a(n + m + 2);
        for (int i = 0; i < n; i++) {
            int x;
            cin >> x;
            a[i] = { x, 1 };
        }
        for (int i = 0; i < m; i++) {
            int x;
            cin >> x;
            a[i + n] = { x, 0 };
        }
        a[n + m] = { w + 1, 0 };
        sort(a.begin(), a.end());

        bool ok = 1;
        vector<int> anss;
        int L = 0, R = 0;
        for (int i = 0; i < a.size(); i++) {
            if (a[i].second) continue;   // 跳过红点
            L = R, R = i;
            vector<int> ans;
            for (int j = L + 1; j < R; j++) {
                int tmp = a[j].first;
                ans.push_back(tmp);
                while (j + 1 < R && a[j + 1].first < tmp + k) j++;
            }
            if (ans.empty()) continue;
            ans.push_back(a[R].first);  // 最后一个不能超过右边界
            for (int j = ans.size() - 1; j; j--) {
                if (ans[j - 1] > ans[j] - k) {
                    ans[j - 1] = ans[j] - k;  // 有重叠就移动
                }
            }
            if (ans[0] <= a[L].first) {  // 第一个不能超过左边界
                ok = 0;
                break;
            }
            ans.pop_back();
            for (auto x : ans) {
                anss.push_back(x);
            }
        }

        if (!ok) {
            cout << -1 << endl;
        } else {
            cout << anss.size() << endl;
            for (auto x : anss) {
                cout << x << " ";
            }
            cout << endl;
        }
    }

    return 0;
}
```



## M. Ordainer of Inexorable Judgment（计算几何）- UPSOLVE

**思路** 临界状态是 $2n$ 条切线，算出这些切线的倾斜角，找到多边形所在半平面内的最大最小的倾斜角。

一些 Tip：

- 如何求切线：可以按高中解析几何思路暴力解方程，也可以直接用角度关系得到切点的倾斜角。

- 初始方向的处理：将所有切线的倾斜角减去初始倾斜角。

- 如何找所在半平面：排序后看相邻两项，如果超过 $\pi$，这两项就是分界线。

- 半平面跨过 $x=0$ 如何处理：取反，求打不到的区间，这个区间是不会跨过 $x=0$ 的。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

using T = double;
const double eps = 1e-9, pi = acos(-1.0);
int sgn(T x) {
    return (fabs(x) <= eps) ? 0 : (x < 0 ? -1 : 1);
}

struct P {
    T x, y;
    P() : x(0), y(0) {}
    P(T x, T y) : x(x), y(y) {}
    P(T r, double alpha, int _) : x(r * cos(alpha)), y(r * sin(alpha)) {}
    bool operator==(P o) { return sgn(x - o.x) == 0 && sgn(y - o.y) == 0; }
    P operator+(P o) { return P(x + o.x, y + o.y); }
    P operator-(P o) { return P(x - o.x, y - o.y); }
    T operator*(P o) { return x * o.y - y * o.x; }
    T operator^(P o) { return x * o.x + y * o.y; }
    friend double abs(P o) { return sqrt(o.x * o.x + o.y * o.y); }
    double angle() { double res = atan2(y, x); if (sgn(res) < 0) res += (2 * pi); return res; }
};

int main() {
    int n;
    cin >> n;

    P P0;
    cin >> P0.x >> P0.y;
    double t0 = P0.angle();

    int rad, t;
    cin >> rad >> t;

    vector<double> alpha;  // 存所有的倾斜角
    for (int i = 0; i < n; i++) {
        P Q;
        cin >> Q.x >> Q.y;
        double phi = acos(rad / abs(Q));
        alpha.push_back((Q - P(rad, (Q.angle() + phi), 1)).angle());
        alpha.push_back((Q - P(rad, (Q.angle() - phi), 1)).angle());
    }

    for (int i = 0; i < 2 * n; i++) {
        alpha[i] -= t0;
        if (alpha[i] < 0) alpha[i] += 2 * pi;
    }

    double L = -1, R = -1;
    sort(alpha.begin(), alpha.end());
    bool flag = 1;
    if (alpha[0] + pi > alpha.back()) {
        L = alpha[0], R = alpha.back();
        flag = 0;
    } else for (int i = 1; i < 2 * n; i++) {
        if (alpha[i - 1] + pi < alpha[i]) {
            L = alpha[i - 1], R = alpha[i];
        }
    }

    double q = floor(t / (2 * pi));  // quotient
    double r = fmod(t, (2 * pi));    // remainder
    double ans = q * (R - L);  // full circles
    if (r > L) ans += r - L;
    if (r > R) ans -= r - R;   // partial circle

    cout << fixed << setprecision(15);
    if (flag) {
        cout << (t - ans) << endl;
    } else {
        cout << ans << endl;
    }

    return 0;
}
```



