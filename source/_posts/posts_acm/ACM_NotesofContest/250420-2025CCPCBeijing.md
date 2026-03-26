---
title: 2025 CCPC 北京市赛暨小米杯全国邀请赛 比赛记录+个人题解
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
  The 2024 ICPC Asia Nanjing Regional Contest (The 3rd Universal Cup. Stage 16:
  Nanjing)
highlight_shrink: true
abbrlink: 9151d4ed
date: 2025-05-14 19:51:00
updated: 2025-05-14 19:51:00
---

[补题链接](https://codeforces.com/gym/105851)，[官方题解](https://codeforces.com/gym/105851/attachments/download/31235/solution.pdf)，[榜单](https://pintia.cn/rankings/1911705434392723456)，[知乎](https://www.zhihu.com/question/1893964087592977529)

五题银尾，也算是复仇成功了

## [A. 删除 01 串](https://codeforces.com/gym/105851/problem/A)（签到）

小分讨签到，队友开局两分钟说 A 签，我上机迅速写完 AC。

## [C. 砝码](https://codeforces.com/gym/105851/problem/C)（签到）

有点连蒙带猜，稳妥一点写了个二分答案。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

void eachT() {
    int n, m;
    cin >> n >> m;

    if (m < 40 && (n >= (1ll << m))) {
        cout << -1 << endl;
    } else {
        auto check = [&](int x) {
            ll sum = 0;
            ll now = 1;
            ll cnt = m;
            while (cnt && now < x) {
                sum += now;
                now *= 2;
                cnt--;
            }
            sum += cnt * x;
            return sum >= n;
        };
        int l = 1, r = n;
        while (l <= r) {
            int mid = l + r >> 1;
            if (check(mid)) {
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        cout << l << endl;
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

    int T = 1;
    cin >> T;
    while (T--) {
        eachT();
    }
    return 0;
}
```

队友补题写的不二分方法：

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

void eachT() {
    ll n, m;
    cin >> n >> m;

    ll sum = 0;
    for (int bit = 0; ; bit++) {
        sum += 1ll << bit;
        m--;
        if (m == 0) {
            if (sum >= n) {
                cout << (1ll << bit) << endl;
                return;
            } else {
                cout << -1 << endl;
                return;
            }
        }
        ll x = (n - sum + m - 1) / m;
        if (x <= (1ll << (bit + 1))) {
            cout << max(x, 1ll << bit) << endl;
            return;
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

    int T = 1;
    cin >> T;
    while (T--) {
        eachT();
    }
    return 0;
}
```

## [D. 最近公共祖先 - UPSOLVE](https://codeforces.com/gym/105851/problem/D)（树据结构）

*挺硬的题，可以作为树上启发式合并的模板*

> 两棵有根树 $S$ 和 $T$，计算有多少个二元组 $(x,y)$ 满足 $x<y$ 且 $\operatorname{LCA}_{S}(x,y)=\operatorname{LCA}_{T}(x,y)$。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

template <typename T>
struct Fenwick {
    Fenwick(int n) {
        n++;
        a.resize(this->n = n);
    }

    // o 位置加上 v
    void apply(int o, const T& v) {
        o++;
        while (o < n) a[o] += v, o += o & -o;
    }

    // [0, o) 的和
    T query(int o) {
        T res{};
        while (o > 0) res += a[o], o -= o & -o;
        return res;
    }

    // [l, r) 的和
    T query(int l, int r) {
        return query(r) - query(l);
    }

private:
    int n;
    vector<T> a;
};

template<class Info>
struct Tree {
    int n, unix;
    vector<vector<int>> E;
    vector<int> parent, dep, siz, top, dfn, dfnR, seq;
    Fenwick<Info> seg;

    Tree(int n) :
        n(n), unix(0),
        E(n),
        parent(n, -1), dep(n), siz(n), top(n), dfn(n), dfnR(n), seq(n),
        seg(n) {
    }

    void add(int u, int v) {
        E[u].push_back(v);
        E[v].push_back(u);
    }

    void work(int s) {
        top[s] = s;
        dep[s] = 0;
        parent[s] = -1;
        dfs1(s);
        dfs2(s);
    }

    void dfs1(int u) {
        if (parent[u] != -1) {  // 必须删
            E[u].erase(ranges::find(E[u], parent[u]));
        }
        siz[u] = 1;
        for (auto& v : E[u]) {  // 必须加引用
            parent[v] = u;
            dep[v] = dep[u] + 1;
            dfs1(v);
            siz[u] += siz[v];
            if (siz[v] > siz[E[u][0]]) {
                swap(v, E[u][0]);
            }
        }
    }

    void dfs2(int u) {
        seq[dfn[u] = unix++] = u;
        for (auto& v : E[u]) {
            top[v] = v == E[u][0] ? top[u] : v;
            dfs2(v);
        }
        dfnR[u] = unix;  // 欧拉序：seq[dfnR[u] = unix++] = u;
    }

    // u,v的最近公共祖先
    int lca(int u, int v) {
        while (top[u] != top[v]) {
            if (dep[top[u]] > dep[top[v]]) u = parent[top[u]];
            else v = parent[top[v]];
        }
        return dep[u] > dep[v] ? v : u;
    }

    // u到v的路径长度
    int dist(int u, int v) {
        return dep[u] + dep[v] - 2 * dep[lca(u, v)];
    }

    // u是否是v的祖先 v是否在u的子树中
    bool isAncester(int u, int v) {
        return dfn[u] <= dfn[v] && dfn[v] < dfnR[u];
    }

    // u的k级祖先
    int kthAncester(int u, int k) {
        if (dep[u] < k) return -1;
        int d = dep[u] - k;
        while (dep[top[u]] > d) {
            u = parent[top[u]];
        }
        return seq[dfn[u] - dep[u] + d];
    }

    // 找u朝向v的第一个儿子
    int getSon(int u, int v) {
        if (dep[u] > dep[v]) return -1;
        return kthAncester(v, dep[v] - dep[u] - 1);
    }

    // 查询u节点的子树
    Info queryTree(int u) {
        return seg.query(dfn[u], dfnR[u]);
    }

    // 修改u节点
    void applyNode(int u, const int& d) {
        seg.apply(dfn[u], d);
    }

    vector<int> subtree(int u) {
        vector<int> res;
        for (int i = dfn[u]; i < dfnR[u]; i++) {
            res.push_back(seq[i]);
        }
        return res;
    }
};

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        Tree<int> S(n);
        for (int i = 1; i < n; i++) {
            int u, v;
            cin >> u >> v;
            u--; v--;
            S.add(u, v);
        }
        S.work(0);

        Tree<int> T(n);
        for (int i = 1; i < n; i++) {
            int u, v;
            cin >> u >> v;
            u--; v--;
            T.add(u, v);
        }
        T.work(0);

        ll res = 0;
        auto dfs = [&](auto&& dfs, int u, bool keep) -> void {
            // 遍历轻子树 递归求解所有轻子树内部的答案
            for (auto& v : S.E[u]) {
                if (v != S.E[u].front()) {
                    dfs(dfs, v, false);
                }
            }
            // 遍历重子树 递归求解重子树内部的答案
            if (S.E[u].size()) {
                dfs(dfs, S.E[u].front(), true);
            }
            res += T.queryTree(u);
            T.applyNode(u, 1);
            // 遍历轻子树 求解当前节点u关于其子树信息的答案
            for (auto& v : S.E[u]) {
                if (v != S.E[u].front()) {
                    for (auto x : S.subtree(v)) {
                        if (T.isAncester(u, x)) {
                            res += T.queryTree(u) - T.queryTree(T.getSon(u, x));
                        }
                    }
                    for (auto x : S.subtree(v)) {
                        T.applyNode(x, 1);
                    }
                }
            }
            // 不保留对info的影响 回溯前删除
            if (!keep) {
                for (auto x : S.subtree(u)) {
                    T.applyNode(x, -1);
                }
            }
        };
        dfs(dfs, 0, true);

        cout << res << endl;
    }

    return 0;
}
```

## [E. 布置WAP](https://codeforces.com/gym/105851/problem/E)（计算几何、二分）

> 给定平面上 $n$ 个点和一条直线。在直线上找到一个点，最小化该点到 $n$ 个点的距离的最大值。数据范围：$1 \leqslant n\leqslant 10^{5},|x|,|y| \leqslant 10^{4}$。

最小最大，显然二分答案。不卡精度不卡时间，后面就看实现方法了。为了方便算圆和直线的交点，我们是先把直线变换到 $x$ 轴。

整型除法没乘 1.0 WA 了一次，我的锅。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const double eps = 1e-9;
int sgn(double x) {
    return (fabs(x) <= eps) ? 0 : (x < 0 ? -1 : 1);
}

using P = complex<double>;
#define xx real()
#define yy imag()

void eachT() {
    int n;
    cin >> n;

    vector<P> p(n);
    for (int i = 0; i < n; i++) {
        int x, y;
        cin >> x >> y;
        p[i] = P(x, y);
    }

    int a, b, c;
    cin >> a >> b >> c;
    if (a) {
        auto alpha = arg(P(b, -a));
        P x0(-1.0 * c / a, 0);
        for (int i = 0; i < n; i++) {
            p[i] = (p[i] - x0) * polar(1.0, -alpha) + x0;
        }
    } else if (b) {
        P y0(0, -1.0 * c / b);
        for (int i = 0; i < n; i++) {
            p[i] -= y0;
        }
    }

    auto check = [&](double r) {
        double lmax = -1e18, rmin = 1e18;
        for (int i = 0; i < n; i++) {
            if (sgn(r - abs(p[i].yy)) < 0) {
                return false;
            }
            double d = sqrt(r * r - p[i].yy * p[i].yy);
            lmax = max(lmax, p[i].xx - d);
            rmin = min(rmin, p[i].xx + d);
            if (sgn(rmin - lmax) < 0) {
                return false;
            }
        }
        return true;
    };

    double l = 0, r = 1e6;
    for (int _ = 0; _ < 50; _++) {
        double mid = (l + r) / 2;
        (check(mid) ? r : l) = mid;
    }
    cout << l << endl;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

    cout << fixed << setprecision(15);

    int t = 1;
    cin >> t;
    while (t--) {
        eachT();
    }
    return 0;
}
```

## [G. 萤火虫难题](https://codeforces.com/gym/105851/problem/G)（DP）

> 给定序列，求满足相邻元素的颜色 $c_{i}$ 不同且 $w_{i}$ 不互质的最长子序列长度。

不互质好做，DP 转移的时候从素因子来再转移到素因子去就好了，然后我不会了扔给学 DP 的队友。队友说为了颜色不同，给每个 DP 值存两种不同颜色的最优解，就一定能转移了。这样转移复杂度 $\operatorname{O}(\log V)$，总复杂度 $\operatorname{O}(n\log V)$。

合作完成，但是存两种不同颜色的最优解那里写得有点混乱 WA 了，我先去写了会 E，队友找 BUG。一个很明显的错误是 1 没有任何素因子，所以如果 $c$ 全是 1 就完蛋了，没有任何转移，输出 0。修改之后还是 WA。最后决定仔细重写一遍存两种颜色，磕磕绊绊过了，罚了一小时。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

constexpr int N = 5e5 + 8;

vector<int> prime;
int minp[N];
array<array<int, 2>, 2> f[N]; // f[素因子p][最大0/次大1][颜色0/值1]

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

    minp[1] = 1;
    for (int i = 2; i < N; i++) {
        if (!minp[i]) {
            minp[i] = i;
            prime.push_back(i);
        }
        for (auto p : prime) {
            if (i * p >= N) {
                break;
            }
            minp[i * p] = p;
            if (p == minp[i]) {
                break;
            }
        }
    }

    int n;
    cin >> n;
    vector<int> w(n), c(n);
    for (int i = 0; i < n; i++) {
        cin >> w[i];
    }
    for (int i = 0; i < n; i++) {
        cin >> c[i];
    }

    int ans = 1;
    for (int i = 0; i < n; i++) {
        vector<int> factor;
        while (w[i] > 1) {
            int x = minp[w[i]];
            while (w[i] % x == 0) {
                w[i] /= x;
            }
            factor.push_back(x);
        }

        int res = 1;
        for (auto x : factor) { // f[素因子p][最大0/次大1][颜色0/值1]
            if (c[i] != f[x][0][0]) {
                res = max(res, f[x][0][1] + 1);
            }
            if (c[i] != f[x][1][0]) {
                res = max(res, f[x][1][1] + 1);
            }
        }
        for (auto x : factor) { 
            if (c[i] != f[x][0][0]) {
                if (res > f[x][0][1]) {
                    f[x][1] = f[x][0];
                    f[x][0] = {c[i], res};
                } else if (res > f[x][1][1]) {
                    f[x][1] = {c[i], res};
                }
            } else {
                if (res > f[x][0][1]) {
                    f[x][0] = {c[i], res};
                }
            }
            assert(f[x][0][0] != f[x][1][0]);
        }
        ans = max(ans, res);
    }
    cout << ans << endl;

    return 0;
}
```

## [H. 矩阵除法](https://codeforces.com/gym/105851/problem/I)（线性代数）

> 对于 $n \times m$ 的 01 矩阵 $A$ 和 $m \times p$ 的 01 矩阵 $B$，定义它们的乘积为一个 $n \times p$ 的 01 矩阵 $C$，$C_{i,j} = \bigoplus_{k=1}^{m} \left( A_{i,k} \& B_{k,j} \right)$。给出 $A,C$，找出一个 $B$，或报告不存在。数据范围：$n,m,p \leqslant 1000$。

三个线代低手听到一群人大喊模二矩阵乘法，并不知道有什么用。

于是手画样例大力观察，发现 $B$ 的每列独立，又发现 $C$ 的任意三行如果 $C_{i}\oplus C_{j}=C_{k}$ 那么必须 $A_{i}\oplus A_{j}=A_{k}$，用线性基就可以搞。这样复杂度是 $\operatorname{O}\Big(\dfrac{n^{4}}{w}\Big)$（假定 $n,m,p$ 同阶），有点巨大，再次大力观察发现 $B$ 虽然每列独立，但求解时只与 $A$ 和 $C$ 有关，可以把 $B$ 并起来求解，这样复杂度少个 $n$，$\operatorname{O}\Big(\dfrac{n^{3}}{w}\Big)$，可以通过了。问题是 $B$ 怎么构造，队长去了趟卫生间后恍然大悟，化行最简后输出最高位那一行就行，迅速写完然后 WA 了。

对拍结果完全不对，原来是化行最简写反了，constexpr N = 8 忘改了交上去 RE，最后罚了两次高罚时通过。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

constexpr int N = 1000;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

    int n, m, p;
    cin >> n >> m >> p;

    vector<bitset<N>> a(n);
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            int x;
            cin >> x;
            a[i][j] = x;
        }
    }

    vector<bitset<N>> c(n);
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < p; j++) {
            int x;
            cin >> x;
            c[i][j] = x;
        }
    }

    vector<bitset<N>> ha(N);
    vector<bitset<N>> hc(N);
    for (int i = 0; i < n; i++) {
        auto insert = [&] {
            for (int bit = 0; bit < m; bit++) {
                if (a[i].test(bit)) {
                    if (ha[bit].none()) {
                        for (int rua = bit + 1; rua < m; rua++) {
                            if (ha[rua].any() && a[i].test(rua)) {
                                a[i] ^= ha[rua];
                                c[i] ^= hc[rua];
                            }
                        }
                        for (int rua = 0; rua < bit; rua++) {
                            if (ha[rua].test(bit)) {
                                ha[rua] ^= a[i];
                                hc[rua] ^= c[i];
                            }
                        }
                        ha[bit] = a[i];
                        hc[bit] = c[i];
                        return true;
                    }
                    a[i] ^= ha[bit];
                    c[i] ^= hc[bit];
                }
            }
            return c[i].none();
        };
        if (!insert()) {
            cout << "No" << endl;
            return 0;
        }
    }

    cout << "Yes" << endl;
    vector<bitset<N>> b(m);
    for (int i = 0; i < m; i++) {
        for (int bit = 0; bit < m; bit++) {
            if (ha[i].test(bit)) {
                b[i] = hc[bit];
                break;
            }
        }
    }

    for (int i = 0; i < m; i++) {
        for (int j = 0; j < p; j++) {
            cout << b[i][j] << " ";
        }
        cout << endl;
    }

    return 0;
}
```

## [I. 最小 LCM - UPSOLVE](https://codeforces.com/gym/105851/problem/I)（数论）

*数论是不是有点多了，这是第三道涉及数论的题*

*赛时乱搞没搞出来（需要认真推式子的题乱搞肯定不行了。。*

> 给定 $a,b,k$，对于 $0 \leqslant x,y \leqslant k$，最小化 $\operatorname{LCM}(a+x,b+y)$。数据范围：$1 \leqslant a,b,k \leqslant 10^{14}$。

设 $u=a+x,v=b+y$，则 $a \leqslant u \leqslant a+k,b \leqslant v \leqslant b+k$，要求最小化 $\operatorname{LCM}(u,v)$。

LCM 转 GCD，设 $d=(u,v)$，$u=du_{1},v=dv_{1}$（*止步于此*），需最小化 $\cfrac{uv}{d}=du_{1}v_{1}$。当 $d$ 确定时，需要 $u_{1},v_{1}$ 都尽可能小，也就是 $u,v$ 要尽可能小，而 $u$ 的最小值是最小的 $\geqslant a$ 的 $d$ 的倍数，即 $u=d \cdot\Big\lceil \dfrac{a}{d} \Big\rceil$，同理 $v=d \cdot\Big\lceil \dfrac{b}{d} \Big\rceil$。

枚举 $d$，但这样 $d$ 的数量很多。考虑到 $\Big\lceil \dfrac{a}{d} \Big\rceil$ 的取值只有 $\operatorname{O}(\sqrt{ a })$ 种，而且当 $\Big\lceil \dfrac{a}{d} \Big\rceil$ 确定时，一定取最小的 $d$。转为分别枚举 $\Big\lceil \dfrac{a}{d} \Big\rceil$ 和 $\Big\lceil \dfrac{b}{d} \Big\rceil$ 的左端点 $d$。

复杂度 $\operatorname{O}(\sqrt{ a }+\sqrt{ b })$。时限比较紧，不能多 $\log$，不能有多余的 `int128`。

```cpp
#include <bits/stdc++.h>

using namespace std;
using ull = unsigned long long;
using ulll = unsigned __int128;

constexpr ull inf = 0x3f3f3f3f3f3f3f3f;

ull ceil(ull n, ull m) {
    return (n + m - 1) / m;
}

ostream& operator<<(ostream& os, ulll n) {
    string s;
    while (n) {
        s += '0' + n % 10;
        n /= 10;
    }
    ranges::reverse(s);
    return os << s;
}

int main() {
    int t;
    cin >> t;

    while (t--) {
        ull a, b, k;
        cin >> a >> b >> k;

        ulll res = inf;
        res *= res;
        for (int _ = 0; _ < 2; _++) {
            for (ull l = a, r = a; r >= 1; r = l - 1) {
                l = ceil(a, ceil(a, r));
                ull u = l * ceil(a, l);
                ull v = l * ceil(b, l);
                if (u <= a + k && v <= b + k) {
                    res = min(res, (ulll)u / l * v);
                }
            }
            swap(a, b);
        }
        cout << res << endl;
    }

    return 0;
}
```


## [J. 四舍五入 - UPSOLVE](https://codeforces.com/gym/105851/problem/J)（数论、倍增）

> 给定 $m$ 和 $q$ 组询问 $x,y$，问能否把 $x$ 操作若干次得到 $y$，并求最小操作次数。每次操作 $x$ 可以选择一个不超过 $m$ 的进制 $k$，将 $x$ 写作 $k$ 进制的形式，然后四舍五入最低位得到新的 $x'$。数据范围：$k,q,x,y \leqslant 10^{5}$。

*倍增+倍增，好题*

调完 H 队友说 J 会了。倒着来，预处理每个 $x'$ 可以由哪些 $x$ 得到，发现 $x$ 的所有取值其实是连续的区间。从 $y$ 开始倒着扩张这个区间，直到扩张到 $x$ 止。三个人推了三次式子确认没问题就上机写了。

复杂度是 $\operatorname{O}(N\log N+q?)$，? 是操作次数。根据经验，神秘数论题有神秘定理帮助我们，我们天真地以为操作次数一定不多（最多一千吧）。

但是 T 了。限制操作次数会 WA，不限制又 T，尝试各种优化无法战胜。。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
const ll inf = 0x3f3f3f3f3f3f3f3f;

template <class T, class Cmp = less<T>> // greater:最大值 less:最小值
struct RMQ {  // 存的是值
    const Cmp cmp = Cmp();
    array<vector<T>, 20> t;

    RMQ(vector<T>& a) {
        const int n = a.size();
        t[0] = a;
        for (int d = 1; d <= __lg(n); d++) {
            t[d].resize(n);
            for (int i = 0; i + (1 << d) <= n; i++) {
                t[d][i] = min(t[d - 1][i], t[d - 1][i + (1 << (d - 1))], cmp);
            }
        }
    }

    T operator()(int l, int r) {  // [l, r)
        if (l >= r) return max(inf, -inf, cmp);
        int d = __lg(r - l);
        return min(t[d][l], t[d][r - (1 << d)], cmp);
    }
};

const int N = 2e5 + 10;  // 这里要稍微开大一点
vector<int> factor[N];

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

    int q, m;
    cin >> q >> m;

    for (int p = 1; p < N; p++) {
        for (int i = p; i < N; i += p) {
            factor[i].push_back(p);
        }
    }

    vector<int> l(N), r(N);  // x' 可以由 x in l[x']-r[x'] 得到
    for (int i = 1; i < N; i++) {
        auto it = ranges::upper_bound(factor[i], m);
        it--;
        int p = *it;

        l[i] = i - p / 2;
        r[i] = i + (p - 1) / 2;
        l[i] = max(l[i], 0);
        r[i] = min(r[i], N - 1);
    }
    l[0] = 0;
    r[0] = (m - 1) / 2;

    RMQ<int, less<>> L(l);
    RMQ<int, greater<>> R(r);

    while (q--) {
        int x, y;
        cin >> x >> y;
        auto solve = [&](int x, int y) {
            int l = y, r = y;
            ll ans = 1;
            for (;;) {
                int nl = L(l, r + 1);  // 扩张一次
                int nr = R(l, r + 1);
                if (nl == l && nr == r) {  // 扩张失败
                    return -1ll;
                }
                if (nl <= x && x <= nr) {
                    return ans;
                }
                l = nl, r = nr;
                ans += 1;
            }
            return ans;
        };
        cout << solve(x, y) << endl;
    }
    return 0;
}
```

（*止步于此*）

题解说要倍增，恍然大悟。连续多次操作是可以打包的。直接把复杂度降低为 $\log?$ 级别，? 是操作次数。显然操作次数不会超过 $2N$，现在管他有没有神秘定理都不可能 T 了。

```cpp
    l[0] = 0;
    r[0] = (m - 1) / 2;
   
    // 上面没区别 
    vector<RMQ<int, less<>>> L{ l };
    vector<RMQ<int, greater<>>> R{ r };

    for (int _ = 1; _ < 20; _++) {
        auto rmq1 = L.back();
        auto rmq2 = R.back();
        vector<int> l(N), r(N);
        for (int i = 0; i < N; i++) {
            l[i] = rmq1(rmq1(i, i + 1), rmq2(i, i + 1) + 1);
            r[i] = rmq2(rmq1(i, i + 1), rmq2(i, i + 1) + 1);
        }
        L.push_back(l);
        R.push_back(r);
    }

    while (q--) {
        int x, y;
        cin >> x >> y;
        int l = y, r = y;
        ll ans = 1;
        for (int bit = 19; bit >= 0; bit--) {
            int nl = L[bit](l, r + 1);
            int nr = R[bit](l, r + 1);
            if (nr < x || x < nl) {
                l = nl, r = nr;
                ans += 1ll << bit;
            }
        }
        if (ans == (1 << 20)) {
            cout << -1 << endl;
        } else {
            cout << ans << endl;
        }
    }
    return 0;
}
```


剩下三题暂时不在能力范围内 ~

