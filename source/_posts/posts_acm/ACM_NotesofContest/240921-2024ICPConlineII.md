---
title: 2024 ICPC 網絡賽第二場
tags:
  - 題解
  - 筆記
  - ACM
  - 算法
  - 網絡賽
categories:
  - - 筆記
    - 網絡賽
description: The 2024 ICPC Asia East Continent Online Contest (II)
highlight_shrink: true
abbrlink: c1eb6092
date: 2024-09-21 21:44:50
updated: 2024-09-21 21:44:50
---

[The 2024 ICPC Asia East Continent Online Contest (II) - Dashboard - Contest - QOJ.ac](https://qoj.ac/contest/1799)
[Dashboard - The 2024 ICPC Asia EC Regionals Online Contest (II) - Codeforces](https://codeforces.com/gym/105358)

官方题解：[2024 ICPC 网络赛 第二场简要题解](https://zhuanlan.zhihu.com/p/721328425)

不会 DP 不会字符串

## [E - Escape](https://codeforces.com/gym/105358/problem/E) (-80)


机器人的活动范围距离起点的距离最大是 $d$，把所有起点扔到队列里，用 BFS 预处理找到到达每个点的步数。

对于某个点，玩家到达步数是 $x$，机器人到达步数是 $y$，则如果 $x$ 与 $y$ 的奇偶性相同，且 $x \geqslant y$，这个点就走不能经过。对于同一个点的 $x,y$ 可能有多个，只要存在一个 $x$，对于所有的 $y$ 都满足上述条件即可。因此只需与奇数 $y$ 或偶数 $y$ 的最小值比较。BFS 可以保证第一次访问的点就是最小值。

用 BFS 寻路。寻路的时候记录步数 $x$，与同奇偶性的 $y$ 比较，同时记录到达这个点的前驱，以输出路径。

每个点都可以经过两次，所以 `vis` 等数组都开成二维的，奇偶相互独立。

注意输出路径时不能写 `if (u == 1) break`，可能玩家走 `1->2->3->1` 改变奇偶性，导致实际路径长度与输出的不符。在 BFS 里走到 $n$ 就输出返回是比较好的写法。

Bonus：如果数据有 $d=0$ 需特判，则不用考虑所有机器人，因为它们必定原地爆炸。

```cpp
void eachT() {
    int n, m, D;
    cin >> n >> m >> D;

    vector<vector<int>> E(n);
    while (m--) {
        int u, v;
        cin >> u >> v;
        u--, v--;
        E[u].push_back(v);
        E[v].push_back(u);
    }

    queue<pair<int, int>> Q;

    vector val(n, array{ inf, inf });
    int k;
    cin >> k;
    while (k--) {
        int x;
        cin >> x;
        x--;
        val[x][0] = 0;
        Q.push({ 0, x });
    }

    while (!Q.empty()) {
        auto [d, u] = Q.front();
        Q.pop();
        if (d >= D) continue;
        ++d;
        for (auto& v : E[u]) {
            if (val[v][d & 1] != inf) continue;
            val[v][d & 1] = d;
            Q.push({ d, v });
        }
    }

    vector from(n, array{ -1, -1 });
    Q.push({ 0, 0 });
    while (!Q.empty()) {
        auto [d, u] = Q.front();
        Q.pop();

        if (u == n - 1) {
            cout << d << '\n';
            vector<int> path;
            while (d >= 0) {
                path.push_back(u);
                u = from[u][d & 1];
                d--;
            }
            for (int i = path.size() - 1; i >= 0; --i) {
                cout << path[i] + 1 << ' ';
            }
            cout << '\n';
            return;
        }

        ++d;
        for (auto& v : E[u]) {
            if (d >= val[v][d & 1]) continue;
            if (~from[v][d & 1]) continue;
            from[v][d & 1] = u;
            Q.push({ d, v });
        }
    }

    cout << "-1\n";
}
```


## [L - 502 Bad Gateway](https://codeforces.com/gym/105358/problem/L) (54)

每个数的期望次数是固定的，而且贪心地，大数再掷一次，小数等待。

分界线不知道，可以设分界线为 $x$，小于等于 $x$ 的数等待，记每次掷骰子期望需要**再**等待 $E$ 秒，有
$$
E=\frac{1}{n}(1+2+\dots+x)+\dfrac{n-x}{n}(E+1)
$$

化简得
$$
E=\frac{x}{2}+\frac{n}{x}-\frac{1}{2}
$$

是个对勾函数，欲求最小值，取 $x=\sqrt{ 2n }$ 附近的两个正整数最优，比较一下即可。

注意答案需要开 LL。

时间复杂度 $\Theta(T)$。

```cpp
#include <iostream>
#include <vector>
#include <numeric>
#include <cmath>
using namespace std;
using ll = long long;

void solve() {
    int n;
    cin >> n;

    ll x = sqrt(2 * n);
    if (x / 2.0 + 1.0 * n / x > (x + 1) / 2.0 + 1.0 * n / (x + 1)) {
        ++x;
    }

    ll f1 = x * x + 2 * n - x;
    ll f2 = 2 * x;
    ll d = gcd(f1, f2);
    f1 /= d, f2 /= d;

    cout << f1 << ' ' << f2 << '\n';
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    int T = 1;
    cin >> T;

    while (T--) {
        solve();
    }

    return 0;
}
```

## [G - Game](https://codeforces.com/gym/105358/problem/G) (197+20)

平局相当于再来一次，所以每小局概率就是二人获胜概率的比例。

筹码是按照辗转相减的方式减少的，用辗转相除加速辗转相减：
- 如果甲的筹码比乙少，必须一直赢，直到翻盘；
- 如果甲的筹码比乙多，每局都可以输或者赢，直至筹码比乙少；
- 最终两人筹码相同，赢的概率就是小局赢的概率。

具体式子不写了，见代码。

时间复杂度 $\Theta(T\log^{2})$

```cpp
#include <iostream>
using namespace std;
using ll = long long;
constexpr int mod = 998244353;

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

void solve() {
    ll x, y, p0, p1, b;
    cin >> x >> y >> p0 >> p1 >> b;

    ll ssss = inv(p0 + p1);
    p0 = p0 * ssss % mod;
    p1 = p1 * ssss % mod;

    ll invq = inv(p1 - 1);

    ll res = 0, pow = 1;
    while (x && y) {
        if (x == y) {
            res += pow * p0 % mod;
            res %= mod;
            break;
        }
        else if (x > y) {
            int q = x / y, r = x % y;
            res += pow * p0 % mod * (qpow(p1, q) - 1) % mod * invq % mod;
            res %= mod;
            res += mod;
            res %= mod;

            pow *= qpow(p1, q);
            pow %= mod;

            x = r;
        }
        else {  // x<y
            int q = y / x, r = y % x;
            if (r == 0) {
                q--;
                r = x;
            }

            pow *= qpow(p0, q);
            pow %= mod;

            y = r;
        }
    }

    cout << res << '\n';
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    int T;
    cin >> T;

    while (T--) {
        solve();
    }

    return 0;
}
```

## [J - Stacking of Goods](https://codeforces.com/gym/105358/problem/J) (91+20)

首先 $c_{i}$ 和 $w_{n+1-i}$ 的地位等价，不能单独地按某一维排序。需要最大化 $c_{1},w_{n}$，最小化 $w_{1},c_{n}$，而且式子是关于 $\sum cw$ 的形式，猜测按 $\cfrac{c}{w}$ 降序最优。

用调整法证明：欲求式
$$
S=\sum_{i=1}^{n}\left( c_{i}\sum_{j=i+1}^{n}w_{j} \right)
$$
若记交换 $k,k+1$ 后得到的结果为 $S'$，则
$$
S'-S=c_{k+1}w_{k}-c_{k}w_{k+1}
$$

如果有 $\cfrac{c_{k}}{w_{k}}<\cfrac{c_{k+1}}{w_{k+1}}$，则 $S'-S>0$，即交换后结果不减。因此如果 $\cfrac{c_{k}}{w_{k}}<\cfrac{c_{k+1}}{w_{k+1}}$，我们总是可以交换 $k,k+1$ 使结果更优。因此最终按 $\cfrac{c}{w}$ 降序排序。

读入需要 LL。

时间复杂度 $\Theta(n\log n)$。

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
using ll = long long;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    int n;
    cin >> n;

    vector<pair<ll, ll>> a(n);
    ll res = 0;
    for (int i = 0; i < n; ++i) {
        ll w, v, c;
        cin >> w >> v >> c;

        res += v;
        a[i] = { w, c };
    }
    sort(a.begin(), a.end(),
        [&](const pair<ll, ll>& a, const pair<ll, ll>& b) {
        return 1ll * a.first * b.second < 1ll * b.first * a.second;
    });

    ll sumc = 0;
    for (int i = 0; i < n; ++i) {
        res -= a[i].first * sumc;
        sumc += a[i].second;
    }

    cout << res << '\n';

    return 0;
}
```

## [I - Strange Binary](https://codeforces.com/gym/105358/problem/I) (82)

低位有 $1$ 的情况下高位 $0$ 可以消掉，如 `0 0 0 1 -> 1 -1 -1 -1`。而末尾的 $0$ 无法通过此操作消除，因此末尾有两个及以上的 $0$ 就无解。

时间复杂度 $\Theta(T\log n)$。

```cpp
#include <iostream>
#include <vector>
using namespace std;
using ll = long long;

void solve() {
    int n;
    cin >> n;

    if (n == 0 || (n & -n) > 2) {
        cout << "NO\n";
        return;
    }

    int D = 32;
    vector<int> a(D);
    for (int bit = 0; bit < D; ++bit) {
        a[bit] = n >> bit & 1;
        if (bit && !a[bit] && a[bit - 1]) {
            a[bit] = 1;
            a[bit - 1] = -1;
        }
    }

    cout << "YES\n";
    for (int bit = 0; bit < D; ++bit) {
        cout << a[bit] << " \n"[(bit + 1) % 8 == 0];
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    int T = 1;
    cin >> T;

    while (T--) {
        solve();
    }

    return 0;
}
```


## [A - Gambling on Choosing Regionals](https://codeforces.com/gym/105358/problem/A) (132)

选择容量最小的赛站，最坏高手都在自己这个赛站。按排名从高到低依次统计答案，用桶记次数。

时间复杂度 $\Theta(n\log n)$。

```cpp
#include <iostream>
#include <algorithm>
#include <vector>
#include <unordered_map>
using namespace std;
using ll = long long;
const int inf = 0x3f3f3f3f;

struct node {
    int x;
    string s;
    int id;
    int ans;
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    int n, k;
    cin >> n >> k;

    int minn = inf;
    for (int i = 0; i < k; i++) {
        int x;
        cin >> x;
        minn = min(minn, x);
    }

    vector<node> a(n);
    for (int i = 0; i < n; i++) {
        int x;
        string s;
        cin >> x >> s;
        a[i] = { x, s, i, 0 };
    }

    sort(a.begin(), a.end(), [&](const auto& A, const auto& B) {
        return A.x > B.x;
    });

    unordered_map<string, int> cnt;
    int sum = 0;  // front
    for (int i = 0; i < n; i++) {
        a[i].ans = sum - (cnt[a[i].s] == minn);
        if (cnt[a[i].s] < minn) {
            cnt[a[i].s]++;
            sum++;
        }
    }

    sort(a.begin(), a.end(), [&](const auto& A, const auto& B) {
        return A.id < B.id;
    });

    for (int i = 0; i < n; i++) {
        cout << a[i].ans + 1 << endl;
    }

    return 0;
}
```


## [F - Tourist](https://codeforces.com/gym/105358/problem/F) (7)

```cpp
#include <iostream>
using namespace std;
using ll = long long;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    int n;
    cin >> n;

    ll sum = 1500;
    for (int i = 0; i < n; ++i) {
        int x;
        cin >> x;
        sum += x;
        if (sum >= 4000) {
            cout << i + 1 << '\n';
            return 0;
        }
    }

    cout << -1 << '\n';

    return 0;
}
```