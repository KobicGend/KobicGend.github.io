---
title: 2024 ICPC 上海补题记录 (8 题 BCDEFGIJ)
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
  The 2024 ICPC Asia Shanghai Regional Contest (The 3rd Universal Cup. Stage 29:
  Metropolis)
highlight_shrink: true
abbrlink: fc457ea3
date: 2025-10-16 00:00:00
updated: 2025-10-16 00:00:00
---

牌线：3题快/5题快/6题

## [B. Basic Graph Algorithm](https://qoj.ac/contest/1913/problem/9038)（思维图论）【Medium】

与官方题解的做法 1 类似

```cpp
void solve() {
    int n, m;
    cin >> n >> m;

    vector<set<int>> adj(n);
    while (m--) {
        int x, y;
        cin >> x >> y;
        x--;
        y--;
        adj[x].insert(y);
        adj[y].insert(x);
    }
    auto init = adj;
    vector<int> stk;
    vector<pair<int, int>> res;
    auto add = [&](int x) {
        stk.push_back(x);
        for (auto u : init[x]) {
            adj[u].erase(x);
        }
    };
    for (int i = 0; i < n; i++) {
        int target;
        cin >> target;
        target--;
    
        while (1) {
            // 进入新连通图
            if (stk.empty()) {
                add(target);
                break;
            }
            auto x = stk.back();
            if (adj[x].contains(target)) {
                // 走
                add(target);
                break;
            }
            // 退
            if (adj[x].empty()) {
                stk.pop_back();
                continue;
            }
            // 连
            res.push_back({x, target});
            add(target);
            break;
        }
    }

    cout << res.size() << endl;
    for (auto [x, y] : res) {
        cout << x + 1 << " " << y + 1 << endl;
    }
}
```

## [C. Conquer the Multiples](https://qoj.ac/contest/1913/problem/9039)（博弈）【Easy】

```cpp
void solve() {
    int l, r;
    cin >> l >> r;

    if (l % 2 == 1) {
        if (2 * l > r) {
            if ((r - l) % 2 == 0) {
                cout << "Alice" << endl;
            } else {
                cout << "Bob" << endl;
            }
        } else {
            cout << "Alice" << endl;
        }
    } else {
        l++;
        if (2 * l > r) {
            if ((r - l) % 2 == 0) {
                cout << "Bob" << endl;
            } else {
                cout << "Alice" << endl;
            }
        } else {
            cout << "Bob" << endl;
        }
    }    
    return;
}
```


## [D. Decrease and Swap](https://qoj.ac/contest/1913/problem/9040)（思维）【Hard】

矛盾在于最后两位如果有 1 很难消去，所以需要从前面挪一些 1 到后面，解救这两个 1。

对于前面的 1，贪心操作把尽可能多的 1 往后挪（形如 1*1110*000->1*0111*000->10101100），剩下差不多四五位的时候直接判断。位数较小可以手玩或者打表。

```cpp
set<int> st {
    0b00001, 
    0b00010, 
    0b00011, 
    0b00101, 
    0b00110, 
    0b00111, 
    0b01001, 
    0b10001,
    0b10010,
    0b10011
};  // 无解的

signed main() {
    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        string s;
        cin >> s;

        if (ranges::count(s, '1') == 0) {
            cout << "Yes" << endl;
            continue;
        }
        
        int l = 0, r = 0;
        while (r < s.size()) {
            while (l == r && r < s.size() && s[r] == '0') {
                l++;
                r++;
            }
            while (r + 1 < s.size() && s[r + 1] == '1') {
                r++;
            }
            if (l == r) {
                l++;
                r++;
                continue;
            }
            if (r >= s.size()) {
                break;
            }
            if (l + 1 >= s.size()) {
                break;
            }
            s[l + 1] = '0';
            l += 2;
            r++;
            s[r] = '1';
        }

        unsigned x = 0;
        for (int i = max(0, int(s.size()) - 5); i < s.size(); i++) {
            x *= 2;
            x += s[i] - '0';
        }
        cout << (st.contains(x) ? "No" : "Yes") << endl;
    }

    return 0;
}
```


## [E. Equal Measure](https://qoj.ac/contest/1913/problem/9041)（VBCC+分类讨论）【Hard】

官方题解很详细，这里就不写了。

```cpp
struct VBCC {
    int n, cur, tot;
    vector<vector<pair<int, int>>> adj;
    vector<pair<int, int>> e;
    vector<int> dfn, low, bel, stk, vis;
    vector<set<int>> cnt;
    set<int> cut;
    vector<set<int>> node;
    vector<vector<int>> edge;

    VBCC(int n) : n(n), cur(0), tot(0), adj(n), dfn(n, -1), low(n), cnt(n) {}

    void add_edge(int x, int y) {
        adj[x].push_back({ y, int(e.size()) });
        adj[y].push_back({ x, int(e.size()) });
        e.push_back({ x, y });
    }

    void dfs(int x) {
        low[x] = dfn[x] = cur++;
        for (auto& [y, i] : adj[x]) {
            if (vis[i]) continue; vis[i] = 1;
            stk.push_back(i);
            if (dfn[y] == -1) {
                dfs(y);
                low[x] = min(low[x], low[y]);
                if (low[y] >= dfn[x]) {
                    int j;
                    do {
                        j = stk.back();
                        bel[j] = tot;
                        stk.pop_back();
                    } while (j != i);
                    tot++;
                }
            } else {
                low[x] = min(low[x], dfn[y]);
            }
        }
    }

    void work() {
        bel.assign(e.size(), -1);
        vis.resize(e.size());

        for (int x = 0; x < n; x++) {
            if (dfn[x] == -1) dfs(x);
        }

        for (int i = 0; i < e.size(); i++) {
            auto [x, y] = e[i];
            if (x == y) continue;
            cnt[x].insert(bel[i]);
            cnt[y].insert(bel[i]);
        }
        for (int x = 0; x < n; x++) {
            if (cnt[x].empty()) {
                cnt[x].insert(++tot);
            }
        }

        node.resize(tot);
        edge.resize(tot);
        for (int i = 0; i < e.size(); i++) {
            auto [x, y] = e[i];
            if (x == y) continue;
            edge[bel[i]].push_back(i);
            node[bel[i]].insert(x);
            node[bel[i]].insert(y);
        }

        for (int x = 0; x < n; x++) {
            if (cnt[x].size() >= 2) {
                cut.insert(x);
            }
        }
    }
};

void solve() {
    int n, m;
    cin >> n >> m;

    VBCC G(n);
    while (m--) {
        int x, y;
        cin >> x >> y;
        x--;
        y--;
        G.add_edge(x, y);
    }
    G.work();

    set<int> st;
    for (int i = 0; i < G.tot; i++) {
        map<int, vector<int>> adj;
        for (auto id : G.edge[i]) {
            auto [x, y] = G.e[id];
            adj[x].push_back(y);
            adj[y].push_back(x);
        }
        if (G.edge[i].size() <= 1) {
            continue;
        }
        map<int, vector<int>> degcnt;
        for (auto [x, vec] : adj) {
            degcnt[vec.size()].push_back(x);
        }
        if (degcnt.size() == 1) {
            if (degcnt.begin()->first == 2) {
                st.insert(G.edge[i].size());
            } else {
                cout << "No\n";
                return;
            }
        } else {
            degcnt.erase(2);
            if (degcnt.size() == 1) {
                auto [deg, vec] = *degcnt.begin();
                assert(vec.size() > 1);
                if (vec.size() > 2) {
                    cout << "No\n";
                    return;
                }
                int s = vec[0], t = vec[1];
                set<int> tmp;
                auto dfs = [&](this auto&& self, int x, int p, int cnt) -> void {
                    if (x == t) {
                        tmp.insert(cnt);
                        return;
                    }
                    for (auto y : adj[x]) {
                        if (y == p) {
                            continue;
                        }
                        self(y, x, cnt + 1);
                    }
                };
                dfs(s, -1, 0);
                if (tmp.size() >= 2) {
                    cout << "No\n";
                    return;
                }
                st.insert(2 * *tmp.begin());
            } else {
                cout << "No\n";
                return;
            }
        }
    }
    if (st.size() >= 2) {
        cout << "No\n";
    } else {
        cout << "Yes\n";
    }
}
```




## [F. Fast Bogosort](https://qoj.ac/contest/1913/problem/9042)（DP + CDQ 分治优化）【Expert】

*官方题解大力推式子，是最下策了。利用组合意义可以直接得到简洁的递推式。*

【题意】给定一个特定的随机排序算法：每次将序列切割成尽量多块，使得每一块内包含所有各自该有的数字，每一块独立区间 shuffle 后递归执行该算法。给定初始排列，求排序完成时区间 shuffle 次数的期望。$N \leqslant 10^{5}$。

### PART 1 DP

如果想怎么做分拆，就完全不可做。正确的做法是枚举分拆的第一分段点，把一个切 $k$ 刀的任务分解为切 1 刀 + 切 $k-1$ 刀，DP 求解。

令 $g(n)$ 表示长度为 $n$ 不可分割的排列数量，有转移方程
$$
g(n) = n! - \sum_{m=0}^{n-1} g(m) (n-m)!
$$
含义是全排列数减去可分割的排列数量，后者进一步枚举第一分段点 $m$，前 $m$ 个数不可分割，后 $n-m$ 个数任选，有 $g(m) (n-m)!$ 种方法。

令 $f(n)$ 表示长度为 $n$ 的随机排列的答案，
$$
f(n) = 1 + \dfrac{1}{n!} \sum_{m=0}^{n} g(m) (n-m)! \Big( f(m) + f(n-m) - 1 \Big)
$$
我们解释求和号里面的含义，枚举第一分段点 $m$，有 $g(m) (n-m)!$ 种方法。后面乘上的那个是递归的代价，分为两部分，前 $m$ 个数就是 $f(m)$，后 $n-m$ 个数不是 $f(n-m)$ 而是 $f(n-m) - 1$（注意 1 的时候不要减），因为刚才已经切割过了，不需要再切一次。

当然你会发现等号右边也有 $f(n)$ 项，需要稍作整理，化为严格递推式：

$$
f(n) = \dfrac{1}{n! - g(n)} \Bigg( n! + \sum_{m=0}^{n-1} g(m) (n-m)! \Big( f(m) + f(n-m) - \mathbb{I}(n - m \neq 1) \Big) \Bigg)
$$

现在的复杂度 $\mathcal{O}(n^{2})$。

```cpp
signed main() {
    int N;
    cin >> N;

    vector<Z> g(N + 1);
    for (int n = 1; n <= N; n++) {
        g[n] = Fac(n);
        for (int m = 1; m < n; m++) {
            g[n] -= g[m] * Fac(n - m);
        }
    }

    vector<Z> f(N + 1);
    for (int n = 1; n <= N; n++) {
        f[n] = Fac(n);
        for (int m = 1; m < n; m++) {
            f[n] += g[m] * Fac(n - m) * (f[m] + f[n - m] - (n - m != 1));
        }
        f[n] /= Fac(n) - g[n];
    }
    
    Z res = 0;
    int max = 0;
    int lst = -1;
    for (int i = 0; i < N; i++) {
        int x;
        cin >> x;
        x--;
        max = std::max(max, x);
        if (max == i) {
            res += f[i - lst];
            lst = i;
        }
    }
    cout << res << '\n';

    return 0;
}
```

### PART 2 CDQ 分治优化

我们要算这两个东西：
$$
\begin{aligned}
g(n) &= n! - \sum_{m=0}^{n-1} g(m) (n-m)!
\\
f(n) &= \dfrac{1}{n! - g(n)} \Bigg( n! + \sum_{m=0}^{n-1} g(m) (n-m)! \Big( f(m) + f(n-m) - \mathbb{I}(n - m \neq 1) \Big) \Bigg)
\end{aligned}
$$
发现很像 CDQ 分治多项式乘法。

> （CDQ 分治多项式乘法模板题）
> 给定序列 $B,C$ 和初始条件 $A(0)$，以及递推关系 $\displaystyle  A(n) = C(n) + \sum_{m=0}^{n-1} A(m) B(n - m)$，求序列 $f$。

为了凑出这个形式还需要做一些简单变形：
$$
\begin{aligned}
g(n) &= \underbrace{ n! }_{ C(n) } - \sum_{m=0}^{n-1} \underbrace{ g(m) }_{ A(m) } \underbrace{ (n-m)! }_{ B(n-m) }
\\
f(n) &= \dfrac{1}{n! - g(n)} \left( \underbrace{ n! - \sum_{m=0}^{n-2} g(m) (n-m)! }_{ C(n) }  + \sum_{m=0}^{n-1} \underbrace{ f(m) g(m) }_{ A_{1}(m) } \underbrace{ (n-m)! }_{ B_{1}(n-m) } + \sum_{m=0}^{n-1} \underbrace{ f(m) m! }_{ A_{2}(m) } \underbrace{ g(n-m) }_{ B_{2}(n-m) } \right)
\end{aligned}
$$
 直接做 CDQ 分治就好了，复杂度 $\mathcal{O}(n \log^2 n)$。
 
```cpp
signed main() {
    int N;
    cin >> N;

    Poly g(N + 1);
    [&](this auto self, int l, int r) -> void {
        if (r - l <= 1) {
            if (l == 0) {
                g[l] = 0;
            } else {
                g[l] = Fac(l) - g[l];
            }
            return;
        }
        int m = l + (r - l) / 2;
        self(l, m);
        Poly A(m - l);
        Poly B(r - l);
        for (int i = l; i < m; i++) {
            A[i - l] = g[i];
        }
        for (int i = 0; i < r - l; i++) {
            B[i] = fac[i];
        }
        A = A * B;
        for (int i = m; i < r; i++) {
            g[i] += A[i - l];
        }
        self(m, r);
    } (0, N + 1);

    Poly C = g * fac;
    for (int n = 1; n <= N; n++) {
        C[n] -= g[n] * fac[0];
        C[n] -= g[n - 1] * fac[1];
        C[n] = Fac(n) - C[n];
    }

    Poly f(N + 1);
    [&](this auto self, int l, int r) -> void {
        if (r - l <= 1) {
            if (l == 0) {
                f[l] = 0;
            } else {
                f[l] = (f[l] + C[l]) / (Fac(l) - g[l]);
            }
            return;
        }
        int m = l + (r - l) / 2;
        self(l, m);
        Poly A(m - l);
        Poly B(r - l);
        for (int i = l; i < m; i++) {
            A[i - l] = f[i] * g[i];
        }
        for (int i = 0; i < r - l; i++) {
            B[i] = fac[i];
        }
        A = A * B;
        for (int i = m; i < r; i++) {
            f[i] += A[i - l];
        }
        A.resize(m - l);
        B.resize(r - l);
        for (int i = l; i < m; i++) {
            A[i - l] = f[i] * fac[i];
        }
        for (int i = 0; i < r - l; i++) {
            B[i] = g[i];
        }
        A = A * B;
        for (int i = m; i < r; i++) {
            f[i] += A[i - l];
        }
        self(m, r);
    } (0, N + 1);
    
    Z res = 0;
    int max = 0;
    int lst = -1;
    for (int i = 0; i < N; i++) {
        int x;
        cin >> x;
        x--;
        max = std::max(max, x);
        if (max == i) {
            res += f[i - lst];
            lst = i;
        }
    }
    cout << res << '\n';

    return 0;
}
```

## [G. Geometry Task](https://qoj.ac/contest/1913/problem/9043)（二分 + 贪心）【Easy】

二分答案，只需检查能匹配数量超过一半。若红线斜率为正，则计算蓝线横坐标的最小值，按分界点从大到小贪心匹配蓝线。若红线斜率为负，就从小到大匹配。

- 注意二分界至少 2E18。
- 注意负数二分的 mid 写法（其中一种方法是一律向下取整，可以手写一个 floor 函数，在 C++20 以后也可以使用右移（注意 C++17 以前的负数右移是 Undefined Behavior））。
- 注意不能用 double 比大小，精度不够。
- 注意可能需要开 int128。
- 注意不等式两边同乘一个负数，不等号变号。

```cpp
using i64 = long long;
using i128 = __int128;

void solve() {
    int n;
    cin >> n;

    vector<i64> a(n), b(n), c(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    for (int i = 0; i < n; i++) {
        cin >> b[i];
    }
    for (int i = 0; i < n; i++) {
        cin >> c[i];
    }
    sort(c.begin(), c.end());

    auto check = [&](i64 mid) {
        int sum = 0;
        array<vector<int>, 3> vec;
        for (int i = 0; i < n; i++) {
            if (a[i] == 0) {
                vec[0].push_back(i);
            } else if (a[i] > 0) {
                vec[1].push_back(i);
            } else {
                vec[2].push_back(i);
            }
        }
        ranges::sort(vec[1], [&](int i, int j) {
            return i128(mid - b[i]) * a[j] < i128(mid - b[j]) * a[i];
        });
        ranges::sort(vec[2], [&](int i, int j) {
            return i128(mid - b[i]) * a[j] < i128(mid - b[j]) * a[i]; // a[x]<0
        });

        deque dq(c.begin(), c.end());
        for (auto i : vec[0]) {
            if (b[i] >= mid) {
                sum++;
            } else {
                sum--;
            }
        }
        for (auto i : views::reverse(vec[1])) {
            if (i128(mid - b[i]) > i128(dq.back()) * a[i]) {
                sum--;
            } else {
                sum++;
                dq.pop_back();
            }
        }
        for (auto i : vec[2]) {
            if (i128(mid - b[i]) > i128(dq.front()) * a[i]) {  // a[i]<0
                sum--;
            } else {
                sum++;
                dq.pop_front();
            }
        }
        return sum >= 0;
    };

    i64 lo = -3e18, hi = 3e18;
    while (lo < hi) {
        i64 mid = lo + hi >> 1;
        if (check(mid)) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }
    cout << lo - 1 << endl;
}
```

## [I. In Search of the Ultimate Artifact](https://qoj.ac/contest/1913/problem/9045)（贪心模拟【Easy】）

```cpp
constexpr int P = 998244353;
void solve() {
    int n, k;
    cin >> n >> k;

    vector<int> a(n);
    for (auto& x : a) cin >> x;
    ranges::sort(a, greater());

    int res = a[0] % P;   // 特别注意 % P
    for (int i = 1; i + k - 2 < n; i += k - 1) {
        int l = i, r = i + k - 2;
        bool zero = false;
        for (int j = l; j <= r; j++) {
            if (a[j] == 0) {
                zero = true;
            }            
        }
        if (zero) {
            break;
        }
        for (int j = l; j <= r; j++) {
            res = 1LL * res * a[j] % P;         
        }
    }
    cout << res << endl;
    
    return;
}
```


## [J. Just-in-Time Render Analysis](https://qoj.ac/contest/1913/problem/9046)（parse树 + 树上数据结构）【Expert】

*拼好题，拼得有点太生硬了。*

【题意】给定矩形，保证矩形边界不交，即构成一棵树。在这棵树上支持两种操作：切换点权 0/1；询问深度为 $k$ （根的深度为 0）的所有点，有多少子树内有点权为 1 的点。$N,Q \leqslant 5\times 10^{5}$。

*依据矩形建树有点难，所以评为 Expert。*

### PART 1 parse 树

只需要为每个矩形找到被包含的那个稍微大一点的矩形。

这里参考了题解的方法，用 std::set。用 set 维护矩形的上下边界的左端点，并按纵坐标从小到大逐步加入/删除左端点。在 set 里二分找比 $l$ 小的第一个左端点，则是父节点，在找到后把右端点和父节点加入 set。

具体逻辑看代码更清晰一些：

```cpp
vector<array<int, 5>> v;
for (int i = 1; i < N; i++) {
    int x1, y1, x2, y2;
    cin >> x1 >> y1 >> x2 >> y2;
    v.push_back({y1,  true, x1, x2, i});
    v.push_back({y2, false, x1, x2, i});
}
ranges::sort(v);

vector<int> parent(N, -1);
set<pair<int, int>> s;
s.insert({0, 0}); // 作为根节点
for (auto [y, op, l, r, i] : v) {
    if (op) {
        parent[i] = prev(s.lower_bound({l, 0}))->second;
        adj[parent[i]].push_back(i);
        s.insert({l, i});
        s.insert({r, parent[i]});
    } else {
        s.erase({l, i});
        s.erase({r, parent[i]});
    }
}
```

### PART 2 树上数据结构

需要维护每个深度有多少激活点（子树内有点权为 1 的点）。

我们将单点修改转为链加，加入点 $x$ 对查询的影响是一条链 $x\sim y$，其中 $y$ 是 $x$ 的祖先，满足这条链上每个点的子树权值和皆为 0。二分找到 $y$，并依据这条链的深度范围 $[d_{y},d_{x}]$ 修改。

代码比较无脑地写了 $\mathcal{O}(Q\log^{2}N)$，能做到 $\mathcal{O}(Q\log N)$。2log 极小甚至跑得比 1log 快。

```cpp
Fenwick<int> fen1(N); // 每个点的子树权值和
Fenwick<int> fen2(N); // 每个深度的激活点数量
vector<int> active(N);
auto get = [&](int x) {  // 返回 x 最近的激活祖先的深度
    int lo = 0, hi = dep[x] + 1;
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        int y = kth_ancester(x, mid);
        if (fen1(dfn[y], dfm[y]) == 0) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }
    return dep[x] - lo + 1;
};
for (int i = 0; i < Q; i++) {
    char op;
    cin >> op;
    if (op == '^') {
        int x;
        cin >> x;
        if (active[x]) {
            fen1.add(dfn[x], -1);
            fen2.add(get(x), -1);
            fen2.add(dep[x] + 1, 1);
        } else {
            fen2.add(get(x), 1);
            fen2.add(dep[x] + 1, -1);
            fen1.add(dfn[x], 1);
        }
        active[x] ^= true;
    } else {
        int k;
        cin >> k;
        cout << fen2(k + 2) << endl;
    }
}
```

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

template <typename T>
struct Fenwick {
    int N;
    vector<T> A;
    Fenwick(int N = 0) : N(N), A(N) {}
    // arr[x] += v
    void add(int x, const T& v) {
        for (x++; x <= N; x += x & -x) {
            A[x - 1] += v;
        }
    }
    // sum[0, x)
    T operator()(int x) const {
        T res{};
        for ( ; x > 0; x -= x & -x) {
            res += A[x - 1];
        }
        return res;
    }
    // sum[L, R)
    T operator()(int L, int R) const {
        return operator()(R) - operator()(L);
    }
};

int main() {
    int N, Q;
    cin >> N >> Q;
    N++;

    vector<array<int, 5>> v;
    for (int i = 1; i < N; i++) {
        int x1, y1, x2, y2;
        cin >> x1 >> y1 >> x2 >> y2;
        v.push_back({y1,  true, x1, x2, i});
        v.push_back({y2, false, x1, x2, i});
    }
    ranges::sort(v);

    vector<vector<int>> adj(N);
    vector<int> parent(N, -1), dep(N), siz(N), top(N), dfn(N), dfm(N), ord;
    set<pair<int, int>> s;
    s.insert({0, 0});
    for (auto [y, op, l, r, i] : v) {
        if (op) {
            parent[i] = prev(s.lower_bound({l, 0}))->second;
            adj[parent[i]].push_back(i);
            s.insert({l, i});
            s.insert({r, parent[i]});
        } else {
            s.erase({l, i});
            s.erase({r, parent[i]});
        }
    }

    // 树链剖分
    [&](this auto&& self, int x) -> void {
        siz[x] = 1;
        for (auto& y : adj[x]) {
            parent[y] = x;
            dep[y] = dep[x] + 1;
            self(y);
            siz[x] += siz[y];
            if (siz[y] > siz[adj[x][0]]) {
                swap(y, adj[x][0]);
            }
        }
    } (0);

    [&](this auto&& self, int x) -> void {
        dfn[x] = ord.size();
        ord.push_back(x);
        for (const auto& y : adj[x]) {
            top[y] = y == adj[x][0] ? top[x] : y;
            self(y);
        }
        dfm[x] = ord.size();
    } (0);

    auto kth_ancester = [&](int x, int k) {
        if (dep[x] < k) return -1;
        int d = dep[x] - k;
        while (dep[top[x]] > d) {
            x = parent[top[x]];
        }
        return ord[dfn[x] - dep[x] + d];
    };
    // 树链剖分 end

    Fenwick<int> fen1(N); // 每个点的子树权值和
    Fenwick<int> fen2(N); // 每个深度的激活点数量
    vector<int> active(N);
    auto get = [&](int x) {  // 返回 x 最近的激活祖先的深度
        int lo = 0, hi = dep[x] + 1;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            int y = kth_ancester(x, mid);
            if (fen1(dfn[y], dfm[y]) == 0) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return dep[x] - lo + 1;
    };
    for (int i = 0; i < Q; i++) {
        char op;
        cin >> op;
        if (op == '^') {
            int x;
            cin >> x;
            if (active[x]) {
                fen1.add(dfn[x], -1);
                fen2.add(get(x), -1);
                fen2.add(dep[x] + 1, 1);
            } else {
                fen2.add(get(x), 1);
                fen2.add(dep[x] + 1, -1);
                fen1.add(dfn[x], 1);
            }
            active[x] ^= true;
        } else {
            int k;
            cin >> k;
            cout << fen2(k + 2) << endl;
        }
    }

    return 0;
}
```

