---
title: 2025 CCPC 哈尔滨补题记录 (热身赛+正赛 ABGIJKL)
tags:
  - 題解
  - 筆記
  - ACM
  - 算法
  - 區域賽
categories:
  - 邏輯與算法
  - 賽事
  - Contest
description: 第十一届中国大学生程序设计竞赛 哈尔滨站
highlight_shrink: true
abbrlink: c2703ff8
date: 2025-11-19 00:00:00
updated: 2025-11-19 00:00:00
---

正赛的几道 Easy，不是很简单，如果评为 Easy-Medium 也不过分。

热身赛 ACD 都是听群友思路补的。

## [热身赛 A. 秘术「天文密葬法」](https://qoj.ac/contest/2577/problem/14838)

【思路】哈希，选个模数 $p$（至少满足 $p>n,\ p> m$），在模意义下计算并验证。

【实现】枚举 $n$，计算 $m=\dfrac{n!}{x} \bmod p$。如果 $m\in[1,n-1]$，就说明找到了答案；否则说明此时 $m$ 不是整数，不是答案。

【注意】不同的输入有 $\mathcal{O}(n^{2})$ 种，为了哈希后不冲突，需要选取一个较大的模数（1E18 级别），或者双模。

复杂度线性，$\mathcal{O}(|S| + n)$。

```cpp
#include <bits/stdc++.h>
using namespace std;

using u64 = unsigned long long;

template<class T>
constexpr T qpow(T a, u64 n, T res = 1) {
    for (; n; n /= 2, a *= a) {
        if (n & 1) {
            res *= a;
        }
    }
    return res;
}

template<u64 M>
constexpr u64 mul(u64 a, u64 b) {
    return (a * b - u64(1.L * a * b / M - 0.5L) * M) % M;
}

template<class U, U M>
struct ModInt {
    constexpr ModInt() : x(0) {}

    constexpr ModInt(const u64& x) : x(x % Mod()) {}

    constexpr static U Mod() { return M; }
    constexpr U val() const { return x; }

    constexpr ModInt inv() const {
        return qpow(*this, Mod() - 2);
    }

    constexpr ModInt& operator *= (const ModInt& b)& {
        x = mul<Mod()>(x, b.val());
        return *this;
    }
    constexpr ModInt& operator += (const ModInt& b)& {
        x += b.val();
        if (x >= Mod()) x -= Mod();
        return *this;
    }
    constexpr ModInt& operator /= (const ModInt& b)& {
        return *this *= b.inv();
    }

    friend constexpr ModInt operator * (ModInt a, const ModInt& b) { 
        return a *= b; 
    }
    friend constexpr ModInt operator + (ModInt a, const ModInt& b) { 
        return a += b; 
    }
    friend constexpr ModInt operator / (ModInt a, const ModInt& b) { 
        return a /= b; 
    }
private:
    U x;
};

constexpr u64 Mod = (1ULL << 61) - 1;
using Z = ModInt<u64, Mod>;

int main() {
    string s;
    cin >> s;

    Z x = 0;
    for (auto c : s) {
        x = x * 10 + (c - '0');
    }

    Z fac = 1;
    for (int n = 1; ; n++) {
        fac *= n;
        auto m = (fac / x).val();
        if (1 <= m && m < n) {
            cout << n << ' ' << m << '\n';
            return 0;
        }
    }

    return 0;
}
```

## [热身赛 B. 天才琪露诺与雾之湖的宝藏](https://qoj.ac/contest/2577/problem/14839)

分类：如果边是斜着的，直接输出 $(x_{1},y_{2})$；如果给定的边是垂直的，就更简单了。

```cpp
#include <bits/stdc++.h>
using namespace std;

constexpr int inf = 1e9;

int main() {
    int x1, y1, x2, y2;
    cin >> x1 >> y1 >> x2 >> y2;    

    if (x1 == x2) {
        for (auto x : {x1 - 1, x1 + 1}) {
            if (-inf <= x && x <= inf) {
                cout << x << " " << y1 << "\n";
                break;
            }
        }
    } else if (y1 == y2) {
        for (auto y : {y1 - 1, y1 + 1}) {
            if (-inf <= y && y <= inf) {
                cout << x1 << " " << y << "\n";
                break;
            }
        }
    } else {
        cout << x1 << " " << y2 << "\n";
    }

    return 0;
}
```

## [热身赛 C. 天才琪露诺与克劳恩皮丝](https://qoj.ac/contest/2577/problem/14840)

【思路】$g$ 具有分形结构，考虑分块。设块长 $B=2^{k}$，那么每个块内的结构都相同。1 操作对块打标记，2 操作向左找到哪些标记会影响这个位置。

复杂度大约是 $\mathcal{O}(m \sqrt{ n })$。

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll = long long;

int main() {
    constexpr int N = 3e5 + 10;
    vector<int> g(N);
    for (int i = 1; i < N; i++) {
        if (i % 2 == 1) {
            g[i] = 1;
        } else {
            g[i] = g[i / 2] * 2;
        }
    }
    for (int i = 1; i < N; i++) {
        g[i] += g[i - 1];
    }

    int n, m;
    cin >> n >> m;

    constexpr int B = 512;
    ll ans = 0;
    vector<ll> lazy(n);

    while (m--) {
        int opt;
        cin >> opt;

        if (opt == 1) {
            ll x, w;
            cin >> x >> w;
            x ^= ans;
            w ^= ans;
            x--;
            for (int i = 0; x + g[i] < n; i += B) {
                lazy[x + g[i]] += w;
            }
        } else {
            ll x;
            cin >> x;
            x ^= ans;
            x--;
            ans = 0;
            for (int i = 0; i < B && x - g[i] >= 0; i++) {
                ans += lazy[x - g[i]];
            }
            cout << ans << '\n';
        }
    }

    return 0;
}
```

## [热身赛 D. 楼观楼观楼楼时间到了](https://qoj.ac/contest/2577/problem/14841)

原题链接：https://www.luogu.com.cn/problem/P8008

```cpp
#include <bits/stdc++.h>
using namespace std;

constexpr double eps = 1E-9;
using numbers::pi;
using Point = complex<double>;

int main() {
    int n;
    cin >> n;

    vector<Point> p(n);
    for (int i = 0; i < n; i++) {
        double x, y;
        cin >> x >> y;
        p[i] = Point(x, y);
    }

    double theta, a;
    cin >> theta >> a;

    theta = theta / 180.0 * pi;
    a *= sin(theta);

    for (int i = 0; i < n; i++) {
        double r = abs(p[i]);
        double angle = arg(p[i]);
        angle -= theta;
        p[i] = polar(r, angle);
    }

    double res = 0;
    for (int i = 0; i < n; i++) {
        Point p1 = p[i];
        Point p2 = p[(i + 1) % n];

        double x1 = p1.real(), y1 = p1.imag() / a;
        double x2 = p2.real(), y2 = p2.imag() / a;

        double yl = ceil(y1 - eps);
        double yr = floor(y2 + eps);

        double xl = x1 + (x2 - x1) * (yl - y1) / (y2 - y1);
        double xh = x1 + (x2 - x1) * (yr - y1) / (y2 - y1);

        res -= (xl + xh) * (yr - yl + 1) / 2.0;
    }

    cout << fixed << setprecision(10) << res << '\n';

    return 0;
}
```

## [A. k-子集和最大公约数问题](https://qoj.ac/contest/2575/problem/14814)（数论）

【前置知识】GCD 的性质 $\gcd(a,b)=\gcd(a,a-b)$，数论经典技巧设 $d=\gcd(a,b),a=a_{1}d,b=b_{1}d$ 以得到一组互素的整数。

【解】所求是 $S=\gcd((k-1) a_{1}+a_{1}, \ (k-1) a_{1}+a_{2}, \ (k-1) a_{1}+a_{3}, \ \cdots)$，保留第一项，剩下的项与前一项利用上面的性质做差分，得到 $S=\gcd(k a_{1}, \ a_{1}-a_{2}, \ a_{2}-a_{3}, \ \cdots)$。

计算 $d=\gcd(a_{1}-a_{2}, \ a_{2}-a_{3}, \ \cdots)$ 后，只需要最大化 $S = \gcd(k a_{1}, d)$。

- 如果 $d=0$，$S=k a_{1}$，输出 infinite。
- 否则设 $g=\gcd(a_{1},d)$，那么 $S=g \gcd(k, \frac{d}{g})$，取 $k=\frac{d}{g}$ 就能得到 $S$ 的最大值为 $d$。

```cpp
void solve() {
    int n;
    cin >> n;

    vector<ll> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }

    ll d = 0;
    for (int i = 1; i < n; i++) {
        d = gcd(d, abs(a[i] - a[i - 1]));
    }

    if (d == 0) {
        cout << "infinite\n";
    } else {
        ll g = gcd(a[0], d);
        cout << d << " " << d / g << "\n";
    }
    return;
}
```

## [B. 液压机](https://qoj.ac/contest/2575/problem/14815)（模拟计算）

```cpp
#define double long double

constexpr double eps = 1E-9;
int sgn(double x) {
    return (fabs(x) <= eps) ? 0 : (x < 0 ? -1 : 1);
}

void solve() {
    double x, y, vx, vy, y1, y2, vy1, vy2, x1, x2, vx1, vx2;
    cin >> x >> y >> vx >> vy >> y1 >> y2 >> vy1 >> vy2 >> x1 >> x2 >> vx1 >> vx2;

    double tott = (y2 - y1) / (vy1 + vy2);
    y = y1 + vy1 * tott;

    if (sgn(vx1) == 0 && sgn(vx2) == 0) {
        double period = 2.0 * (x2 - x1) / vx;
        tott = fmod(tott, period);
    }
    while (sgn(tott) > 0) {
        double t;
        if (vx > 0) {
            t = abs(x - x2) / (abs(vx) - vx2);
            if (sgn(vx2 - abs(vx)) >= 0 || sgn(tott - t) <= 0) {
                t = tott;
            }
        } else {
            t = abs(x - x1) / (abs(vx) - vx1);
            if (sgn(vx1 - abs(vx)) >= 0 || sgn(tott - t) <= 0) {
                t = tott;
            }
        }
        tott -= t;
        x += vx * t;
        x1 -= vx1 * t;
        x2 += vx2 * t;
        vx = -vx;
    }
    cout << fixed << setprecision(15) << x << " " << y << endl;
}
```


## [G. 扫雪](https://qoj.ac/contest/2575/problem/14820)（贪心）

【思路】先考虑如果只有一行怎么做：从左向右扫，如果有个地方是负数，就贪心找左边距离它最近的正数，二者相消。

如果有多行，第一行按上述思路单独处理，然后把余下的正数转移给下一行，再单独处理第二行。

复杂度是 $\mathcal{O}(mn)$。

```cpp
void solve() {
    int n, m;
    cin >> n >> m;

    vector<ll> cur(m);
    ll res = 0;
    for (int _ = 0; _ < n; _++) {
        vector<int> stk;
        for (int i = 0; i < m; i++) {
            int x;
            cin >> x;
            cur[i] += x;  // 把余下的正数转移给下一行
            if (cur[i] >= 0) {
                stk.push_back(i);
            } else {
                while (!stk.empty()) {
                    ll& x = cur[stk.back()];  // 贪心找左边距离它最近的正数
                    ll& y = cur[i];
                    auto minn = min(x, -y);  // 相消
                    x -= minn;
                    y += minn;
                    if (x == 0) {
                        stk.pop_back();
                    } else {
                        break;
                    }
                }
                if (cur[i] < 0) {
                    res -= cur[i];  // 消不掉，需要填雪
                    cur[i] = 0;
                }
            }
        }
    }
    res += accumulate(cur.begin(), cur.end(), 0LL);
    cout << res << endl;
}
```

## [I. 六边形翻转](https://qoj.ac/contest/2575/problem/14822)

*判几个奇偶性，很无趣，不解释了。*

*另外这应该是《最强大脑》的原题。*

```cpp
void solve() {
    map<int, bool> xs, ys, zs;
    int n, m;
    cin >> n >> m;
    for (auto n : {n, m}) {
        while (n--) {
            int x, y, z;
            cin >> x >> y >> z;
            xs[x] ^= 1;
            ys[y] ^= 1;
            zs[z] ^= 1;
        }
    }
    for (auto mp : {xs, ys, zs}) {
        for (auto [key, val] : mp) {
            if (val) {
                cout << "NO\n";
                return;
            }
        }
    }
    cout << "YES\n";
    return;
}
```

## [J. 幻想乡的裁判长](https://qoj.ac/contest/2575/problem/14823)（回文串）

先将所有 $w$ 变成两个 $v$，做 Manacher。代码里只保留了相同的连续字符的数量，方便写一些。

现在有两个问题：

- ov 串的最长回文串不一定对应 ovw 串的最长回文串，这可以枚举每个回文中心求最长半径解决。
- ov 串的回文串在 ovw 串里不一定合法，所以如果边界是 vw 串，需要枚举所有可能的位置（如 vwv 的合法位置有 0134）

复杂度是 $\mathcal{O}(n)$。

```cpp
vector<int> Manacher(const vector<int>& t) {
    const int n = t.size();
    vector<int> rad(n);
    for (int i = 0, j = 0; i < n; i++) {
        if (2 * j - i >= 0 && j + rad[j] > i) {
            rad[i] = min(rad[2 * j - i], j + rad[j] - i);
        }
        while (i - rad[i] >= 0 && i + rad[i] < n && t[i - rad[i]] == t[i + rad[i]]) {
            rad[i]++;
        }
        if (i + rad[i] > j + rad[j]) {
            j = i;
        }
    }
    return rad;
}

void solve() {
    int n;
    cin >> n;

    string s;
    cin >> s;

    vector<int> nums;  // 相同的连续字符的数量
    vector<int> lens;  // 真实长度
    vector<int> opts;  // 字符
    vector<vector<int>> strs;  // 合法位置的差分，即所有虚假长度
    for (int i = 0; i < n; i++) {
        char c = s[i] == 'o' ? 'o' : 'v';
        int len = (s[i] == 'w') + 1;
        if (!opts.empty() && c == opts.back()) {
            nums.back() += len;
            lens.back() += 1;
            strs.back().push_back(len);
        } else {
            nums.push_back(len);
            opts.push_back(c);
            lens.push_back(1);
            strs.push_back({len});
        }
    }

    auto rad = Manacher(nums);
    vector<vector<int>> bucpre(lens.size()), bucsuf(lens.size());
    for (int i = 0; i < rad.size(); i++) {
        if (opts[i] == 'o') continue;
        int siz = accumulate(strs[i].begin(), strs[i].end(), 0);
        bucpre[i].resize(siz + 1);  // 哪些前缀位置合法
        bucsuf[i].resize(siz + 1);  // 哪些后缀位置合法
        int pre = 0;
        int len = 0;
        for (int j = 0; j < strs[i].size(); j++) {
            pre += strs[i][j];
            len += 1;
            bucpre[i][pre] = len;
        }
        int suf = 0;
        len = 0;
        for (int j = int(strs[i].size()) - 1; j >= 0; j--) {
            suf += strs[i][j];
            len += 1;
            bucsuf[i][suf] = len;
        }
    }

    vector<int> prelens(lens.size() + 1);
    for (int i = 0; i < lens.size(); i++) {
        prelens[i + 1] = prelens[i] + lens[i];
    }

    int reslen = 0, resl = -1;
    auto chres = [&](int len, int l) {
        if (len > reslen) {
            reslen = len;
            resl = l;
        }
    };

    for (int i = 0; i < rad.size(); i++) {
        int l = i - rad[i];
        int r = i + rad[i];
        int len = prelens[r] - prelens[l + 1];  // 中间的真实长度
        chres(len, prelens[l + 1]);
        if (l >= 0 && r < lens.size()) {
            if (opts[l] == 'o') { // 左右的类型，是o的话取min
                chres(len + 2 * min(lens[l], lens[r]), prelens[l + 1] - min(lens[l], lens[r]));
            } else if (bucsuf[l].size() < bucpre[r].size()) {  // 是vw的话枚举合法位置
                for (int u = 0; u < bucsuf[l].size(); u++) {
                    if (bucsuf[l][u] && bucpre[r][u]) {
                        chres(len + bucsuf[l][u] + bucpre[r][u], prelens[l + 1] - bucsuf[l][u]);
                    }
                }
            } else {
                for (int u = 0; u < bucpre[r].size(); u++) {
                    if (bucsuf[l][u] && bucpre[r][u]) {
                        chres(len + bucsuf[l][u] + bucpre[r][u], prelens[l + 1] - bucsuf[l][u]);
                    }
                }
            }
        }
    }
    cout << s.substr(resl, reslen) << '\n';
}
```

## [K. 01 背包](https://qoj.ac/contest/2575/problem/14824)（构造）

*构造方法是唯一的，有点坏。。*

【思路】归纳得到至少 $n$ 个物品，而且体积只能是 $1,2,3,\dots,n$。

我们希望 $1$ 的性价比最高，但是选择 1 和 $k-1$ 不如选择 $k$，于是 $v_{1} > \dfrac{v_{k}}{k}, v_{1} + v_{k-1} < v_{k}$。

第二个条件化简一下，得到 $v_{2} \geqslant v_{1} + 1, \ v_{3} \geqslant v_{1}+v_{2}+1 \geqslant 2v_{1}+2, \ v_{4} \geqslant 3v_{1}+3, \dots$，于是取 $v_{k} = (k-1)(v_{1}+1)$。

再根据第一个条件，$n v_{1} > v_{n} = (n-1)(v_{1}+1)$，得到 $v_{1} \geqslant n$，于是取 $v_{1}=n$。

```cpp
void solve() {
    int n;
    cin >> n;

    cout << n << "\n";
    for (int i = 1; i <= n; i++) {
        cout << i << " ";
    }
    cout << "\n";
    for (int i = 1; i <= n; i++) {
        cout << (i == 1 ? n : ll(i - 1) * (n + 1)) << " ";
    }
    cout << "\n";
    return;
}
```

## [L. 网格避障](https://qoj.ac/contest/2575/problem/14825)（BFS，枚举）

【思路】数据范围很小，考虑一个 $\mathcal{O}(2^{k} mn)$ 的做法：先 $\mathcal{O}(2^{k})$ 枚举怎么躲避，这样就得到了一些可以走的格子，和一些不能走的格子。在可以走的格子的内部做 BFS 求最短路。

因为知道 BFS 的顺序（从左到右，再从上到下或从下到上），代码中直接用循环写的，可以省些码量。

复杂度是 $\mathcal{O}(2^{k} mn)$。

【注意】$n,m$ 不要写反。

```cpp
constexpr int inf = 0x3f3f3f3f3f3f3f3f;

void chmin(int& x, int y) {
    if (x > y) {
        x = y;
    }
}

void solve() {
    int n, m;
    cin >> n >> m;

    int k;
    cin >> k;
    vector<pair<int, int>> obstacles(k);
    for (auto& [r, c] : obstacles) {
        cin >> r >> c;
        r--;
        c--;
    }

    for (unsigned mask = 0; mask < 1 << k; mask++) {
        vector dis(n, vector<int>(m, inf));
        vector ugly(n, vector<int>(m));
        for (int bit = 0; bit < k; bit++) {
            auto [r, c] = obstacles[bit];
            if (mask >> bit & 1) { // 1 : down ok
                for (int i = 0; i <= r; i++) { // above not ok
                    ugly[i][c] = true;
                }
            } else {
                for (int i = r; i < n; i++) {
                    ugly[i][c] = true;
                }
            }
        }
        for (int i = 0; i < n; i++) {
            dis[i][0] = 0;
        }
        for (int j = 1; j < m; j++) {
            for (int i = 0; i < n; i++) {
                if (!ugly[i][j]) chmin(dis[i][j], dis[i][j - 1] + 1);
            }
            for (int i = 1; i < n; i++) {
                if (!ugly[i][j]) chmin(dis[i][j], dis[i - 1][j] + 1);
            }
            for (int i = n - 2; i >= 0; i--) {
                if (!ugly[i][j]) chmin(dis[i][j], dis[i + 1][j] + 1);
            }
        }
        int res = inf;
        for (int i = 0; i < n; i++) {
            chmin(res, dis[i].back());
        }
        cout << (res == inf ? -1 : res) << " ";
    }
    cout << endl;
}
```

