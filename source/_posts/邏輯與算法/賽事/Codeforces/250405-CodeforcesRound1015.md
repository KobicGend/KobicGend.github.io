---
title: 'Teza Round 1 (Codeforces Round 1015, Div. 1 + Div. 2) A-D'
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
abbrlink: f81a4519
date: 2025-04-06 22:55:00
updated: 2025-04-08 00:14:00
---

## [2084A - Max and Mod](https://codeforces.com/contest/2084/problem/A)

A 题先看样例，猜测 $n$ 为偶数时无解。结合题意知只能是 $?,?,2,3,4,\dots,n-1$ 的形式。

如果 $n$ 是奇数，为了保证 $\max\lbrace a_{2},a_{3} \rbrace \bmod 3=2$，不能按样例取 $a_{2}=n$，应该是 $a_{2}=1$。最终构造出 $n,1,2,3,4,\dots,n-1$。

如果 $n$ 是偶数，$n$ 放在 $a_{1}$ 或者 $a_{2}$ 都不行，因此无解。

```cpp
#include <bits/stdc++.h>
using namespace std;

signed main() {
    cin.tie(nullptr)->ios::sync_with_stdio(false);

    for (int t = (cin >> t, t); t--; ) {
        int n;
        cin >> n;

        if (n % 2 == 0) {
            cout << -1 << endl;
        } else {
            cout << n << endl;
            for (int i = 1; i < n; i++) {
                cout << i << endl;
            }
        }
    }

    return 0;
}
```

## [2084B - MIN = GCD](https://codeforces.com/contest/2084/problem/B)

要求 $\min=\gcd$。首先考虑 $\gcd$ 的代数性质，右式这串数的 $\gcd$ 一定小于等于他们的最小值，进而左式的运算结果小于等于右式所有数的最小值。所以全局最小值 $x$ 放在左边。

再考虑剩下的数如何填最优。左式的最小值已经确定为 $x$，其它数放在左边没有影响。只需考虑右边，希望找出一些数的 $\gcd$ 等于 $x$。所以贪心地把所有 $x$ 的倍数都放在右边，验证这些数的 $\gcd$ 是否等于 $x$，如果等于则有解，否则无解。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

signed main() {
    cin.tie(nullptr)->ios::sync_with_stdio(false);

    for (int t = (cin >> t, t); t--; ) {
        int n;
        cin >> n;

        vector<ll> a(n);
        int imin = 0;
        for (int i = 0; i < n; i++) {
            cin >> a[i];
            if (a[i] < a[imin]) {
                imin = i;
            }
        }

        ll d = 0;
        for (int i = 0; i < n; i++) {
            if (i == imin) {
                continue;
            }
            if (a[i] % a[imin] == 0) {
                d = gcd(d, a[i]);
            }
        }

        if (d == a[imin]) {
            cout << "Yes" << endl;
        } else {
            cout << "No" << endl;
        }
    }

    return 0;
}
```

## [2084C - You Soared Afar With Grace](https://codeforces.com/contest/2084/problem/C)

$(x,y)$ 只能和 $(y,x)$ 配对。当 $n$ 为偶数时全部为 $(x,y)$ 与 $(y,x)$ 配对，当 $n$ 为奇数时有且仅有一组满足 $x=y$，位于序列最中间，其余全部为 $(x,y)$ 与 $(y,x)$ 配对。

操作方案的实现细节比较多。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

signed main() {
    cin.tie(nullptr)->ios::sync_with_stdio(false);

    for (int t = (cin >> t, t); t--; ) {
        int n;
        cin >> n;

        map<pair<int, int>, int> mp;
        vector<pair<int, int>> a(n);
        for (int i = 0; i < n; i++) {
            cin >> a[i].first;
        }
        for (int i = 0; i < n; i++) {
            cin >> a[i].second;
        }
        for (int i = 0; i < n; i++) {
            mp[a[i]] = i;
        }

        bool ok = true;
        vector<pair<int, int>> res;
        auto add = [&](int i, int j) {
            if (i == j) return;
            swap(a[i], a[j]);
            swap(mp[a[i]], mp[a[j]]);
            res.push_back({ i, j });
        };
        int maxcnt = n % 2;
        int id = 0;
        for (int i = 0; i < n; i++) {
            auto [x, y] = a[i];
            if (x == y) {
                if (--maxcnt < 0) {
                    ok = false;
                } else {
                    id = i;
                }
            }
        }
        if (n % 2 == 1) {
            add(id, n / 2);
        }
        for (int i = 0; i < n; i++) {
            auto [x, y] = a[i];
            if (!mp.count({ y, x })) {
                ok = false;
            } else {
                add(n - 1 - i, mp[{ y, x }]);
            }
        }

        if (!ok) {
            cout << -1 << endl;
        } else {
            cout << res.size() << endl;
            for (auto [x, y] : res) {
                cout << x + 1 << " " << y + 1 << endl;
            }
        }
    }

    return 0;
}
```

## [2084D - Arcology On Permafrost](https://codeforces.com/contest/2084/problem/D)

序列中应该有足够多的 $0\sim \mathrm{mex}-1$，至少 $m+1$ 个。因为总是可以删除 $m$ 个相同的数，要保证删不掉就至少有 $m+1$ 个。这样 $\mathrm{mex}\cdot(m+1) \leqslant n$。

构造 $0,1,2,\dots,\mathrm{mex}-1,0,1,2,\dots,\mathrm{mex}-1,\dots$，最大程度分散相同的数。

验证样例发现 $k$ 较大时，可能一次删去两个 0，这样 $m$ 次操作就会删去不止 $m$ 个相同的数。要保证任意两个相同的数的间隔 $\geqslant k$。

最终取周期 $T=\max\lbrace k,\lfloor \frac{n}{m+1} \rfloor \rbrace$，构造 $0,1,2,\dots,T-1,0,1,2,\dots,T-1,\dots$，最大程度分散相同的数。

```cpp
#include <bits/stdc++.h>
using namespace std;

signed main() {
    cin.tie(nullptr)->ios::sync_with_stdio(false);

    for (int t = (cin >> t, t); t--; ) {
        int n, m, k;
        cin >> n >> m >> k;

        int x = max(k, n / (m + 1));
        for (int i = 0; i < n; i++) {
            cout << i % x << " ";
        }
        cout << endl;
    }

    return 0;
}
```



一次操作是捡一个最小值往前扔，但是不能越过更小的数。所以如果 $a_{i}<a_{j}\land p_{a_{i}}<p_{a_{j}}$，那么 $p_{b_{i}}<p_{b_{j}}$。也就是说相对位置不能变。