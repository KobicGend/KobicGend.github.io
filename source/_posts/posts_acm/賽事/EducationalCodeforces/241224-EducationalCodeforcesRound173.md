---
title: Educational Codeforces Round 173 A - E
tags:
  - 題解
  - 筆記
  - ACM
  - 算法
  - 練習賽
categories:
  - posts_acm
  - 賽事
  - EducationalCodeforces
cover: /img/posts/acm/codeforces-cover.webp
top_img: /img/posts/acm/codeforces.webp
highlight_shrink: true
abbrlink: ba204004
date: 2024-12-21 00:02:00
updated: 2025-03-17 20:42:00
---
## [2043A - Coin Transformation](https://codeforces.com/contest/2043/problem/A)

按题意模拟。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    int t;
    cin >> t;

    while (t--) {
        ll x;
        cin >> x;

        ll ans = 1;
        while (x > 3) {
            x /= 4;
            ans <<= 1;
        }
        cout << ans << endl;
    }

    return 0;
}
```

## [2043B - Digits](https://codeforces.com/contest/2043/problem/B)（分类）

写 $n!$ 次数字 $d$。所以，他得到了数字 $dddddd…ddd$（$n!$ 位)。问某数字能够被从 $1$ 到 $9$ 的哪些奇数整除。

1 肯定有。

一个数是 5 的倍数等价于末位是 0 或 5，因此只能 $d=5$。

3 和 9 都是看数码和。对于 3，要求 $3\mid n! \cdot d$，如果 $d$ 是 3 或 9 已经成立，否则需要 $3\mid n!$，这等价于 $n \geqslant 3$；对于 9 也是类似分析，如果 $d$ 是 9 已经成立，如果 $d$ 是 3 或 6，需要 $3\mid n!$，这等价于 $n \geqslant 3$，否则需要 $9\mid n!$，这等价于 $n \geqslant 6$。

7 需要一点技巧，注意到 $1001=7\cdot 11\cdot 13$，而 $n \geqslant 3$ 时的数都是 1001 的倍数，所以 $n \geqslant 3$ 都可以，否则 $n=2$ 时只能 $d=7$。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n, d;
        cin >> n >> d;

        vector<int> res{ 1 };
        if (n >= 3 || d % 3 == 0) {
            res.push_back(3);
        }
        if (d == 5) {
            res.push_back(5);
        }
        if (n >= 3 || d == 7) {
            res.push_back(7);
        }
        if (n >= 6 || (n >= 3 && d % 3 == 0) || d == 9) {
            res.push_back(9);
        }

        for (auto x : res) {
            cout << x << " ";
        }
        cout << endl;
    }

    return 0;
}
```

## [2043C - Sums on Segments](https://codeforces.com/contest/2043/problem/C)（模拟）

先考虑全为 1，-1。

1，-1 这些数表明，这些子串和是连续的，如果子串和最小值是 $l$，子串和最大值为 $r$，那么 $[l,r]$ 中所有数都是可以取到的。问题化为最大最小子串和问题。

如果有一个特殊数，这个数将整个数组分成两块，左右都是全为 1，-1，化为了上面的问题。再考虑包含这个特殊数的子串，子串和仍然是连续的，类似地分别找出左边和右边的最大最小子串就能确定范围 $[l,r]$。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        vector<int> a(n);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }

        int p = 0;
        for (int i = 0; i < n; i++) {
            if (a[i] != 1 && a[i] != -1) {
                p = i;
            }
        }

        set<int> res;
        res.insert(0);
        int sum = 0;
        int maxr = 0, minr = 0;
        for (int i = p + 1; i < n; i++) {
            sum += a[i];
            maxr = max(maxr, sum);
            minr = min(minr, sum);
        }
        sum = 0;
        int maxl = 0, minl = 0;
        for (int i = p - 1; i >= 0; i--) {
            sum += a[i];
            maxl = max(maxl, sum);
            minl = min(minl, sum);
        }
        for (int i = minl + minr; i <= maxl + maxr; i++) {
            res.insert(a[p] + i);
        }

        auto solve = [&](int l, int r) {
            int maxsum = 0, maxx = -2e9;
            for (int i = l; i < r; i++) {
                maxsum += a[i];
                maxx = max(maxx, maxsum);
                if (maxsum < 0) {
                    maxsum = 0;
                }
            }
            int minsum = 0, minn = 2e9;
            for (int i = l; i < r; i++) {
                minsum += a[i];
                minn = min(minn, minsum);
                if (minsum > 0) {
                    minsum = 0;
                }
            }
            for (int i = minn; i <= maxx; i++) {
                res.insert(i);
            }
        };

        solve(0, p);
        solve(p + 1, n);

        cout << res.size() << endl;
        for (auto x : res) {
            cout << x << " ";
        }
        cout << endl;            
    }

    return 0;
}
```


## [2043D - Problem about GCD](https://codeforces.com/contest/2043/problem/D)（Guess 数论）

暴力能过。请参看 [atcoder 题解](https://atcoder.jp/contests/arc137/tasks/arc137_a/editorial)。

证明的一种方法是使用素数距离。在这个问题的约束条件下， $1500$ 个连续整数总是包含至少一个素数。因此，在 $(x,y)=(L,R),(L,R-1),\cdots,(L,R-1500)$ 中，至少有一个满足 $\gcd(x,y)=1$ 。由此可见 $K \leq 1500$ 。

事实上， $K$ 会比这个极限小得多。在 $R-5, \cdots, R$ 中，总有一个数与 $30$ 共乘，而在约束条件下，这个数总是与 $L, \cdots, L+16$ 中的某些数共乘。这就证明了 $K \leq 21$ 。使用 CRT 可以生成 $K=7$ 的情况。

更加详细的证明：


给定 $1 \leq L \leq R \leq 10^{18}$ 和 $R - L \geq 17$ ，证明存在满足以下条件的 $(x, y)$ ：

- $L \leq x \leq L + 16$
- $R - 5 \leq y \leq R$
- $\gcd(x, y) = 1$

特别是，可以证明存在 $(x, y)$ ，即 $\gcd(x, y) = 1$ 和 $R - L - 21 \leq y - x \leq R - L$ 。

首先，存在 $y$ 这样的 $R - 5 \leq y \leq R$ 和 $\gcd(y, 30) = 1$ 。这一点可以通过研究每个 $R \mod 30$ 得到证实。

设 $y$ 的各个素因子按升序排列为 $p_1, p_2, \ldots, p_k$ 。下列性质成立：

- $k \leq 12$
- $p_1 \geq 7$ （如果是 $k \geq 1$ ，以下也类似）
- $p_2 \geq 11$
- $p_3 \geq 13$
- $p_4 \geq 17$
- $p_5 \geq 19$
- $p_6 \geq 23$
- $p_7 \geq 29$
- $p_8 \geq 31$
- $p_9 \geq 37$
- $p_{10} \geq 41$
- $p_{11} \geq 43$
- $p_{12} \geq 47$

这一点可以通过贪婪地选择除 $2, 3, 5$ 以外的质因数，使它们的乘积不超过 $10^{18}$ 来验证。

设 $n_i$ 是 $p_i$ 的倍数在 $L, \ldots, L + 16$ 范围内的个数。因为 $n_i \leq \lceil 17 / p_i \rceil$ ，所以我们有

$$
 \sum n_i \leq 3 + 2 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 = 16 
$$

因此， $L, \ldots, L + 16$ 中存在一个不能被 $p_1, \ldots, p_k$ 中任何一个数整除的数。设这个数为 $x$ 。那么 $(x, y)$ 满足条件。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    int t;
    cin >> t;

    while (t--) {
        ll l, r, d;
        cin >> l >> r >> d;

        r = r / d;
        l = (l + d - 1) / d;

        bool ok = false;
        for (ll len = r - l; len >= 0; len--) {
            for (ll j = l; j + len <= r; j++) {
                if (gcd(j, j + len) == 1) {
                    l = j, r = j + len;
                    ok = true;
                    break;
                }
            }
            if (ok) break;
        }     

        if (!ok) {
            cout << -1 << " " << -1 << endl;
        } else {
            cout << (l * d) << " " << (r * d) << endl;
        }
    }

    return 0;
}
```

## [2043E - Matrix Transformation](https://codeforces.com/contest/2043/problem/E)（建模 DAG）

问题等价于给两个大小为 $n \times m$ 的 01 矩阵 $A$ 和 $B$，对矩阵 $A$ 任意次操作：把一行变成 0 或把一列变成 1。判断是否能将 $A$ 变成 $B$ 。

如果变了，那 B 最后必然有一个全 0 行或者全 1 列，把这列删掉，递归处理；如果没变，则必然与 A 相同。用拓扑排序删东西。

```cpp
#include <bits/stdc++.h>
using LL = long long;
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    
    int t;
    cin >> t;

    while (t--) {
        int n, m;
        cin >> n >> m;

        vector A(n, vector<int>(m));
        vector B(n, vector<int>(m));
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < m; ++j) {
                cin >> A[i][j];
            }
        }
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < m; ++j) {
                cin >> B[i][j];
            }
        }

        bool ok = true;
        for (int bit = 0; bit < 30; bit++) {
            vector a(n, vector<int>(m));
            vector b(n, vector<int>(m));
            for (int i = 0; i < n; ++i) {
                for (int j = 0; j < m; ++j) {
                    a[i][j] = (A[i][j] >> bit) & 1;
                    b[i][j] = (B[i][j] >> bit) & 1;
                }
            }

            vector<vector<int>> E(n + m);
            vector<int> deg(n + m);
            auto add = [&](int u, int v) {
                E[u].push_back(v);
                deg[v]++;
            };
            for (int i = 0; i < n; ++i) {
                for (int j = 0; j < m; ++j) {
                    b[i][j] ? add(n + j, i) : add(i, n + j);
                }
            }
            queue<int> Q;
            for (int i = 0; i < n + m; ++i) {
                if (!deg[i]) Q.push(i);
            }
            while (!Q.empty()) {
                int u = Q.front(); Q.pop();
                if (u < n) {
                    int i = u;
                    for (int j = 0; j < m; ++j) {
                        b[i][j] = a[i][j];
                    }
                } else {
                    int j = u - n;
                    for (int i = 0; i < n; ++i) {
                        b[i][j] = a[i][j];
                    }
                }
                for (auto v : E[u]) {
                    if (--deg[v] == 0) Q.push(v);
                }
            }

            for (int i = 0; i < n; ++i) {
                for (int j = 0; j < m; ++j) {
                    if (a[i][j] != b[i][j]) {
                        ok = false;
                    }
                }
            }
        }
        cout << (ok ? "Yes" : "No") << endl;
    }
    
    return 0;
}
```