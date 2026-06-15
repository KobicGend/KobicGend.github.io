---
title: 2024 CCPC 郑州补题记录 (8 题 BCDEFGIJ)
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
  第十届中国大学生程序设计竞赛 郑州站（CCPC 2024 Zhengzhou Site） (The 3rd Universal Cup. Stage 22:
  Zhengzhou)
highlight_shrink: true
abbrlink: ad9701dc
date: 2024-11-20 19:16:00
updated: 2024-11-20 19:16:00
---

CGAK 都是好题，尤其喜欢 C

[The 3rd Universal Cup. Stage 22: Zhengzhou - Dashboard - Contest - QOJ.ac](https://qoj.ac/contest/1873)
https://codeforces.com/gym/543949/
https://codeforces.com/gym/105632

题目分区：LBFM / C / GK / AJDIEH
牌线：4 题快 / 5 题快 / 6 题快

# [A. A + B = C Problem](https://qoj.ac/contest/1873/problem/9768)（构造）【Hard】

> 给定三个正整数 $p_{A},p_{B},p_{C}$，构造三个无穷长 01 串 $A,B,C$，满足周期分别为 $p_{A},p_{B},p_{C}$，且 $A\oplus B=C$。$10^{6}$。

> 拿到这题的第一反应是设 $p_{A} = dpq,\ p_{B} = dpr,\ p_{C} = dqr$，然后发现样例 2 并不能设为这种形式，就猜测不能表示便无解。（附：正确的设法是 $p_{A} = dpqa,\ p_{B} = dprb,\ p_{C} = dqrc$）

事实上，有解的必要条件是
$$
\begin{cases}
p_{C} \mid \operatorname{lcm}(p_{A},p_{B}) \\
p_{A} \mid \operatorname{lcm}(p_{B},p_{C}) \\
p_{B} \mid \operatorname{lcm}(p_{C},p_{A}) \\
\end{cases}
\iff
p_{A} = dpq,\ p_{B} = dpr,\ p_{C} = dqr
$$

简要证明如下：考虑 $S = A\oplus B$，它的一个周期是  $p_{S} = \operatorname{lcm}(p_{A},p_{B})$。题目要求 $C=S$。也就是说已知一个串以 $p_{S}$ 作为周期，那么最小周期 $p_{C}$ 需要满足什么条件？显然是 $p_{C} \mid p_{S}$，即 $p_{C} \mid \operatorname{lcm}(p_{A},p_{B})$。

至于是否充分，我们只要能构造出来就是充分的。

首先判掉一些平凡的情形。

- 如果三个相等 $p_{A}=p_{B}=p_{C}$：

    - If $p_{A}>2$，例如 (5, 5, 5) 构造 10000, 01000, 11000；
    - If $p_{A}=1$，全 0 或者 1, 1, 0；
    - If $p_{A}=2$，手玩枚举一下所有情形（其实就 1 种 10, 01），无解。

以下不妨设 $d = \gcd(p_{A},p_{B},p_{C}) = 1$，否则构造之后在相邻两个数之间插 $d-1$ 个 0。

- 如果存在恰好两个相等，不妨 $p_{A}=p_{B}$，因为已经设 $d = \gcd(p_{A},p_{B},p_{C}) = 1$，所以 $p_{C}=1$。例如 (4, 4, 1) 构造 1000, 0111, 1。

- 剩下就是互不相同，设 $p_{A} = pq,\ p_{B} = pr,\ p_{C} = qr$，其中 $p \neq q \neq r$。分别构造周期为 $p,q,r$ 的串，两两异或起来就好了。比如 (6, 10, 15)，先构造周期为 2,3,5 的 10, 100, 10000，异或之后得到 $10'10'10\oplus 100'100=001110$，$10'10'10'10'10\oplus 10000'10000$，$100'100'100'100'100\oplus 10000'10000'10000$。

QED.

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll = long long;
using ull = unsigned long long;
using ulll = unsigned __int128;

int main() {
    int T;
    cin >> T;

    while (T--) {
        int pA, pB, pC;
        cin >> pA >> pB >> pC;

        if (lcm(pA, pB) % pC || lcm(pA, pC) % pB || lcm(pB, pC) % pA) {
            cout << "NO" << endl;
        } else if (pA == pB && pB == pC) {
            if (pA == 2) {
                cout << "NO" << endl;
            } else if (pA == 1) {
                cout << "YES" << endl;
                cout << 1 << endl;
                cout << 1 << endl;
                cout << 0 << endl;
            } else {
                cout << "YES" << endl;
                cout << "10" << string(pA - 2, '0') << endl;
                cout << "01" << string(pA - 2, '0') << endl;
                cout << "11" << string(pA - 2, '0') << endl;
            }
        } else {
            int d = gcd(gcd(pA, pB), pC);
            string a, b, c;

            pA /= d;
            pB /= d;
            pC /= d;

            if (pA == 1 || pB == 1 || pC == 1) {
                if (pA == 1) {
                    a = "1";
                    b = "1" + string(pB - 1, '0');
                    c = "0" + string(pC - 1, '1');
                } else if (pB == 1) {
                    a = "0" + string(pA - 1, '1');
                    b = "1";
                    c = "1" + string(pC - 1, '0');
                } else {
                    a = "1" + string(pA - 1, '0');
                    b = "0" + string(pB - 1, '1');
                    c = "1";
                }
            } else {
                int p = gcd(pA, pB);
                int q = gcd(pA, pC);
                int r = gcd(pB, pC);
                for (int i = 0; i < pA; i++) {
                    int x = (i % p == 0) ^ (i % q == 0);
                    a += x + '0';
                }
                for (int i = 0; i < pB; i++) {
                    int x = (i % p == 0) ^ (i % r == 0);
                    b += x + '0';
                }
                for (int i = 0; i < pC; i++) {
                    int x = (i % q == 0) ^ (i % r == 0);
                    c += x + '0';
                }
            }

            cout << "YES" << endl;
            for (auto& x : a) cout << x << string(d - 1, '0'); cout << endl;
            for (auto& x : b) cout << x << string(d - 1, '0'); cout << endl;
            for (auto& x : c) cout << x << string(d - 1, '0'); cout << endl;
        }
    }
 
    return 0;
}
```

# [B - Rolling Stones](https://codeforces.com/gym/105632/problem/B)（模拟，BFS）【Medium】

折一个四面体，实际操作后发现，底面相同时，三个侧面的数字是确定的，因此每个位置只可能走过一次。BFS 即可。时间复杂度 $\mathcal{O}(n^{2})$。

```cpp
#include <bits/stdc++.h>
using namespace std;

const int dx[2][3] = {
    { 0, 0, -1 },
    { 0, 0, 1 },
};
const int dy[2][3] = {
    { -1, 1, -1 },
    { -1, 1, 1 },
};
const int to[2][5][3] = {{
     {},
     { 2, 4, 3 },
     { 1, 3, 4 },
     { 4, 2, 1 },
     { 3, 1, 2 }
}, {
     {},
     { 4, 2, 3 },
     { 3, 1, 4 },
     { 2, 4, 1 },
     { 1, 3, 2 }
}};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr); cout.tie(nullptr);

    int n;
    cin >> n;
    vector mp(n + 2, vector<int>(2 * n + 3));
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= 2 * i - 1; j++) {
            cin >> mp[i][j];
        }
    }

    queue<pair<int, int>> Q;
    Q.push({ 1, 1 });
    vector dis(n + 2, vector<int>(2 * n + 3, -1));
    dis[1][1] = 0;

    while (!Q.empty()) {
        auto [x, y] = Q.front(); 
        Q.pop();
        bool op = y & 1;
        for (int i = 0; i < 3; i++) {
            int nx = x + dx[op][i], ny = y + dy[op][i];
            if (mp[nx][ny] == 0) continue;
            if (dis[nx][ny] != -1) continue;
            if (mp[nx][ny] == to[op][mp[x][y]][i]) {
                dis[nx][ny] = dis[x][y] + 1;
                Q.push({ nx, ny });
            }
        }
    }

    int x, y;
    cin >> x >> y;
    cout << dis[x][y] << endl;

    return 0;
}
```

# [C - Middle Point](https://codeforces.com/gym/105632/problem/C)（模拟）【Medium】

正着不好做，但如果倒推，操作就是唯一的。

从目标倒着模拟，得到一组答案，顺便得到了有解条件以及策略的正确性。

```cpp
#include <bits/stdc++.h>
using namespace std;

// 判断正整数是不是二的幂
bool check(int x) {
    assert(x > 0);
    return (x & (x - 1)) == 0;
}

int main() {
    int A, B, X, Y;
    cin >> A >> B >> X >> Y;
    
    A = max(1, A);
    B = max(1, B);  // 特判范围是一条线或一个点的情形 避免d=0除零错误
    
    int d1 = gcd(A, X), d2 = gcd(B, Y);
    if (!check(A / d1) || !check(B / d2)) {
        cout << -1 << endl;
        return 0;
    }

    stack<array<int, 4>> res;
    while ((X != A && X != 0) || (Y != B && Y != 0)) {  // 没有到达四个角
        int cx = (X * 2 < A) ? 0 : A; 
        int cy = (Y * 2 < B) ? 0 : B;
        X = 2 * X - cx;
        Y = 2 * Y - cy;
        res.push({ X, Y, cx, cy });
    }

    cout << res.size() << endl;
    while (!res.empty()) {
        auto [x1, y1, x2, y2] = res.top(); 
        res.pop();
        cout << x1 << " " << y1 << " " << x2 << " " << y2 << endl; 
    }

    return 0;
}
```


# [F - Infinite Loop](https://codeforces.com/gym/105632/problem/F)（简单数学）【Easy】

只有两种情形，一种是第二天某个任务的开始时间和第一天相同，这样从这个任务开始，就会重复前一天的状态，是个循环；另一种是第二天和第一天任务开始时间完全不同，这样任务就会无限期拖延，且每天的拖延时间是相同的。两种都不难计算。

时间复杂度 $\mathcal{O}(n+q)$。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

    int n, k, q;
    cin >> n >> k >> q;

    vector<ll> a(n), b(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i] >> b[i];
    }

    ll now = 0;
    vector<ll> a1(n), a2(n);
    for (int i = 0; i < n; i++) {
        now = a1[i] = max(now, a[i]);
        now += b[i];
    }

    bool flag = 1;  // all diff
    for (int i = 0; i < n; i++) {
        now = a2[i] = max(now, a[i] + k);
        now += b[i];
        if (a2[i] == a1[i] + k) {
            flag = 0;
        }
    }
    ll delta = a2.back() - a1.back();
 
    while (q--) {
        int x, i;
        cin >> x >> i;
        i--;

        ll res;
        if (x == 1) {
            res = a1[i] + b[i] - 1;
        } else {
            res = a2[i] + b[i] - 1;
            if (flag) {  // all diff
                res += (x - 2ll) * delta;
            } else {
                res += (x - 2ll) * k;
            }
        }

        ll d = res / k, h = res % k;
        if (h == 0) {
            h = k;
            d--;
        }
        cout << (++d) << " " << h << endl;
    }

    return 0;
}
```

# [G. Same Sum](https://codeforces.com/gym/105632/problem/G)（哈希+线段树）【Hard】

> 给定长为 $N$ 的整数序列 $A$ 及 $Q$ 个操作：对于所有 $i \in [L,R]$，更新 $A_i \gets A_i + v$；并判断元素 $A_L, A_{L+1}, \ldots, A_R$ 是否能被分成 $(R-L+1)/2$ 对总和相同的整数对。$1 \leqslant N,Q,A_{i},v  \leqslant 2 \times 10^{5}$。

设 $c$ 是区间平均数，$f_{n}$ 表示区间内等于 $n$ 的数的数量，需要满足
$$
f_{c+n} = f_{c-n} \text{ for all } n \in \mathbb{Z}
$$
这就很有幂级数的味道了，考虑形式幂级数
$$
F(z) = \sum_{n=-\infty}^{+\infty} z^{n} f_{n}
$$
其中 $z$ 是形式参量。需要判断
$$
\dfrac{1}{z^{c}} F(z) = z^{c} F(z^{-1})
$$
可以随机一个 ULL 哈希值 $z=x$ 判定幂级数相等。

具体地，维护区间信息
$$
M_+(z) = \sum_{i=L}^{R} z^{A_i}, \quad
M_-(z) = \sum_{i=L}^{R} z^{-A_i}, \quad
c = \dfrac{1}{R-L+1} \sum_{i=L}^{R} A_i
$$
满足条件当且仅当 $M_+(z) = z^{2 c} M_-(z)$。

线段树维护区间乘区间和，复杂度 $\mathcal{O}(N + Q \log N)$。

```cpp
// 取模类+线段树

struct Lazy {
    i64 add{ 0 };   
    Z po{ 1 };  
    Z ne{ 1 };  
    void apply(const Lazy& o)& {
        add += o.add;
        po *= o.po;
        ne *= o.ne;
    }
};
struct Info {
    i64 sum{ 0 };
    Z po{ 0 };
    Z ne{ 0 };
    int len{ 1 };
    void apply(const Lazy& o)& {
        sum += o.add * len;
        po *= o.po;
        ne *= o.ne;
    }
};
Info operator + (const Info& L, const Info& R) {
    return { L.sum + R.sum, L.po + R.po, L.ne + R.ne, L.len + R.len };
}

constexpr int maxN = 4e5;
int main() {
    cin.tie(nullptr)->sync_with_stdio(false);
    
    Z po = u64(rnd());  // 随机数
    Z ne = 1 / po;      // 随机数的倒数

    vector<Z> powpo(maxN + 1), powne(maxN + 1);
    powpo[0] = 1;
    powne[0] = 1;
    for (auto i = 0; i < maxN; i++) {
        powpo[i + 1] = powpo[i] * po;
        powne[i + 1] = powne[i] * ne;
    }

    int N, Q;
    cin >> N >> Q;

    vector<Info> a(N);
    for (auto n = 0; n < N; n++) {
        int x;
        cin >> x;
        x *= 2;
        a[n] = { x, powpo[x], powne[x], 1 };
    }
    LazySegmentTree<Info, Lazy> seg(a);

    while (Q--) {
        int op;
        cin >> op;
    
        if (op == 1) {
            int L, R, v;
            cin >> L >> R >> v;
            L--;
            v *= 2;
            
            seg.update(L, R, { v, powpo[v], powne[v] });
        } else {
            int L, R;
            cin >> L >> R;
            L--;

            auto [sum, pores, neres, _] = seg.query(L, R);
            if (sum % (R - L) != 0) {
                cout << "NO\n";
            } else {
                auto c = sum / (R - L);  // 区间平均数
                if (pores * qpow(ne, c) == neres * qpow(po, c)) {
                    cout << "YES\n";
                } else {
                    cout << "NO\n";
                }
            }
        }
    }
    
    return 0;
}
```


# [K. Brotato](https://qoj.ac/contest/1873/problem/9778)（期望 DP）【Master】

> 游戏有 $n$ 个关卡，初始在第一关。每一关有 $p$ 的概率失败，且每一关失败的概率相互独立。如果在某一关失败，需要从第一关重新开始。有 $k$ 个特殊道具，失败后可以从当前关卡继续挑战（注意：这种情形下当前关卡被视作未通过）。求通关全部 $n$ 个关卡所需要的最小期望挑战次数。$1 \leqslant n \leqslant 10^{5}$，$0 \leqslant k \leqslant 10^{9}$，$0<p \leqslant 0.5$，$np \leqslant 20$。

## Notes1：观察

观察1：
1. 如果我们拥有无限道具，并且采取一失败就立刻使用道具的策略，通关时道具的期望使用次数为 $\dfrac{np}{1-p}$ 
2. 注意 $np \leqslant 20$ 的限制，所以当 $k$ 很大时我们可以认为采取上述策略是最优的
3. 事实上，当 $k > 165$ 时，答案可以直接近似为 $\dfrac{n}{1-p}$ 
证明1.1：
    对于每一关，我们通关的期望次数为 $\dfrac{1}{1-p}$ ，那么道具的期望使用次数就为 $\dfrac{1}{1-p}-1 = \dfrac{p}{1-p}$ ，因为有 $n$ 关，所以期望总次数为 $\dfrac{np}{1-p}$
证明1.3：
    $\dfrac{np}{1-p} + n = \dfrac{n}{1-p}$ 

观察2：
1. 当 "道具数" 较小时，我们会尽可能将道具留到后面的关卡使用
2. 当挑战失败时，我们会决策 是/否 使用道具。当 “道具数” 确定时，这一决策是单调的：存在 $t$ ，在 $t$ 关之前失败我们会选择从头开始，在 $t$ 关之后失败我们会选择使用道具

## Notes2：不使用道具

当 $k$ 较小时，考虑 DP。设 $f_{i,j}$ 表示当前有 $i$ 个道具，已通过 $j$ 关的情况下，还需要的最小期望挑战次数。

如果当前已经通过第 $j$ 关， 根据单调性，若在第 $j$ 关失败时不使用道具，则失败后在到达 $j + 1$ 关之前，都不会再使用道具。

从第 $j$ 关，不使用道具直到通过第 $j+1$ 关的期望次数为 ${\bigg(\dfrac{1}{1-p}\bigg)}^{j+1}$。

以下给出证明：

若第一次挑战时成功通关，那么次数为 $1$ ，概率为 $1-p$；若第一次挑战失败，问题则转化为求从第一关开始，不使用道具一直通到 $j+1$ 关所需要的最小期望挑战次数。

整理一下，现在要求的是 “不使用道具，从第一关开始到第 $k$ 关的最小期望挑战次数”（其实出题组很贴心，第一个样例就是这个，但赛时因不会求这个遂放弃）

设 $T_{k}$ 为通到第 $k$ 关的最小期望挑战次数，那么 $T_{k-1}$ 就为通到 $k - 1$ 关的最小期望挑战次数。假设我们已经通到 $k-1$ 关，那么再挑战一次，有 $p$ 的概率失败，还需要 $T_{k}$ 的次数，有 $1-p$ 的概率成功，还需要 $0$ 次。得到
$$
T_{k} = T_{k-1}+1+p T_{k}+(1-p) 0
$$
解得
$$
T_{k} = \dfrac{1-(1-p)^{k}}{p (1-p)^{k}}
$$

所以从第 $j$ 关，不使用道具通过 $j+1$ 关的期望挑战次数为
$$
1+0 (1-p)+p T_{j+1} = 1+p \dfrac{1-(1-p)^{j+1}}{p (1-p)^{j+1}}=\dfrac{1}{(1-p)^{j+1}}$$
所以在不使用道具的情况下， 
$$
f_{i,j}=\bigg(\dfrac{1}{1-p}\bigg)^{j+1}+f_{i,j+1}
$$

## Notes3：使用道具

$f_{i,j}$ 表示还剩 $i$ 个道具，已通过 $j$ 关，还需要的最小期望挑战次数。

那么当我们在这种状态下再挑战一次，有 $p$ 的概率还需要 $f_{i-1,j}$ 的挑战次数，有 $1-p$ 的概率还需要 $f_{i,j+1}$ 的挑战次数，所以
$$
f_{i,j}-1 = p f_{i-1,j} + (1-p) f_{i,j+1}
$$

我们也可以设其他状态，比如 “已经使用了 $i$ 个道具，已经通过 $j$ 关的情况下， 还需要的最小期望挑战次数 ，其关键在于要将已知量作为一个入度为 $0$ 的节点

版本一：$f_{i,j}$ 表示 “还剩 $i$ 个道具，已通过 $j$ 关，还需要的最小期望挑战次数”

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
#define double long double

double qpow(double a, ll b) {
    double res = 1;
    while (b) {
        if (b & 1) {
            res *= a;
        }
        b >>= 1;
        a = a * a;
    }
    return res;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0), cout.tie(0);

    int n, k;
    cin >> n >> k;
    double p, q;
    cin >> p;
    q = 1 - p;
    cout << fixed << setprecision(12);

    double ans;
    if (k > 165) {
        ans = n / (1 - p);
        cout << ans << endl;
        return;
    }

    vector<vector<double>> f(170, vector<double>(n + 1));

    for (int i = 0; i <= k; i++) {
        for (int j = n - 1; j >= 0; j--) {
            f[i][j] = qpow(1 / q, j + 1) + f[i][j + 1];
            if (i) f[i][j] = min(1 + p * f[i - 1][j] + q * f[i][j + 1], f[i][j]);
        }
    }
    ans = f[k][0];
    cout << ans << endl;

    return 0;
}
```

版本二：$f_{i,j}$ 表示 "已使用 $i$ 个道具，已通过 $j$ 关，还需要的最小期望挑战次数"

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
#define double long double

double qpow(double a, ll b) {
    double res = 1;
    while (b) {
        if (b & 1) {
            res *= a;
        }
        b >>= 1;
        a = a * a;
    }
    return res;
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(0), cout.tie(0);

    int n, k;
    cin >> n >> k;
    double p, q;
    cin >> p;
    q = 1 - p;
    cout << fixed << setprecision(12);
    cerr << fixed << setprecision(12);

    double ans;
    if (k > 165) {
        ans = n / (1 - p);
        cout << ans << endl;
        return;
    }

    vector<vector<double>> f(170, vector<double>(n + 1));

    for (int i = k; i >= 0; i--) {
        for (int j = n - 1; j >= 0; j--) {
            f[i][j] = f[i][j + 1] + qpow(1 / q, j + 1);
            if (i != k) f[i][j] = min(f[i][j], 1 + (1 - p) * f[i][j + 1] + p * f[i + 1][j]);
        }
    }

    ans = f[0][0];
    cout << ans << endl;

    return 0;
}
```

# [L - Z-order Curve](https://codeforces.com/gym/105632/problem/L)（签到）【Beginner】

周期是异或的 highbit，复杂度 $\mathcal{O}(1)$。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ull = unsigned long long;

int main() {
    int T;
    cin >> T;

    while (T--) {
        ull L, R;
        cin >> L >> R;
        ull x = 1ULL << std::__lg(L ^ R);
        cout << (L % x) << endl;
    }
 
    return 0;
}
```

# [M - Rejection Sampling](https://codeforces.com/gym/105632/problem/M)（数学，二分）【Medium】

> 给定 $N,K$ 和序列 $A = (A_{1},A_{2},\dots, A_{N})$，构造一组概率 $p_{1},p_{2},\dots, p_{N}$。一个随机抽奖机器每轮会以 $P_{i}$ 的概率选择 $i$，直到选到的集合大小恰好为 $K$ 时输出。要求概率满足 $\sum p_{i} = K$，且对于任意 $K$ 元子集 $S$，抽奖机器输出 $S$ 的概率 proportional to $\prod_{i\in S} A_{i}$。$K<N \leqslant 10^{5}$，$A_{i} \leqslant 10^{9}$。

要求构造 $p$ 满足
$$
\prod\limits_{i\in S} p_{i}\prod\limits_{i\notin S}(1-p_{i}) \propto \prod\limits_{i\in S} A_{i}
$$
等价于
$$
\dfrac{p_{i}}{1 - p_{i}} \propto A_{i}
$$
设比例系数为 $c$，得到 $p_{i}=\dfrac{A_{i}}{A_{i}+c}$，结合 $\sum p_{i} = K$，就需要
$$
\sum_{i=1}^{N}\frac{A_{i}}{A_{i}+c}=K.
$$

这个式子是关于 $c$ 的 $N$ 次多项式，不能直接求得。而左式关于 $c$ 是单调的，可以二分 $c$。

复杂度 $\mathcal{O}(N (\log V + \log \epsilon^{-1}))$。

特别注意，浮点数二分在 $l$ 和 $r$ 很大时，用 $r-l>\operatorname{eps}$ 是不行的，因为小数部分的精度已经丢失。先给出 TLE 代码：

```cpp
#include <bits/stdc++.h>
using namespace std;
#define double long double
constexpr double eps = 1e-18;

signed main() {
    cout << fixed << setprecision(12);

    int N, K;
    cin >> N >> K;

    vector<double> A(N);
    for (int i = 0; i < N; i++) {
        cin >> A[i];
    }

    auto calc = [&](double c) {
        vector<double> p(N);
        for (int i = 0; i < N; i++) {
            p[i] = A[i] / (A[i] + c);
        }
        return p;
    };

    double l = 0, r = 1e15;
    while (r - l > eps) {
        double mid = (l + r) / 2;
        auto p = calc(mid);
        if (accumulate(p.begin(), p.end(), 0.0l) < K) {
            r = mid;
        } else {
            l = mid;
        }
    }

    auto p = calc(l);
    for (int i = 0; i < N; i++) {
        cout << p[i] << endl;
    }

    return 0;
}
```

有三种修改方案：

1. 二分一个在 $[0,1]$ 之间的数，对于本题，可以二分 $p_{1}$。

2. 判断 $l$ 和 $r$ 的相对差：即判断 $\dfrac{r-l}{l}$ 是否在误差范围内。

```cpp
    double l = 0, r = 1e15;
    while ((r - l) / l > eps) {  // 修改这一行
        double mid = (l + r) / 2;
        auto p = calc(mid);
        if (accumulate(p.begin(), p.end(), 0.0l) < K) {
            r = mid;
        } else {
            l = mid;
        }
    }
```

3. 控制二分次数：$V \cdot \epsilon^{-1}=10^{15}\cdot 10^{18}=10^{23}$，$\log V + \log \epsilon^{-1}=76$，因此二分 $100$ 次足够。

```cpp
    double l = 0, r = 1e15;
    for (int _ = 0; _ < 100; _++) {
        double mid = (l + r) / 2;

    }
```

这三种都能跑到 100ms 以内。