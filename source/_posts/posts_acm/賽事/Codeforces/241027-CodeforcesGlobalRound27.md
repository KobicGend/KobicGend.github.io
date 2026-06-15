---
title: Codeforces Global Round 27 A-D
tags:
  - 題解
  - 筆記
  - ACM
  - 算法
  - 練習賽
categories:
  - posts_acm
  - 賽事
  - Codeforces
cover: /img/posts/acm/codeforces-cover.webp
top_img: /img/posts/acm/codeforces.webp
highlight_shrink: true
abbrlink: f9a46751
date: 2024-10-27 02:05:04
updated: 2024-10-27 11:32:40
---
## [A. Sliding](https://codeforces.com/contest/2035/problem/A)

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        ll n, m, r ,c;
        cin >> n >> m >> r >> c;

        ll ans = (n - r) * (2 * m - 1);
        ans += (m - c);
        cout << ans << "\n";
    }

    return 0;
}
```

## [B. Everyone Loves Tres](https://codeforces.com/contest/2035/problem/B)

依据样例，奇数是 3333333336366，偶数是 3333333366。

```cpp
#include <bits/stdc++.h>
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

        if (n % 2 == 0) {
            cout << string(n - 2, '3') << "66\n";
        } else if (n < 5) {
            cout << "-1\n";
        } else {
            cout << string(n - 4, '3') << "6366\n";
        }
    }

    return 0;
}
```

## [C. Alya and Permutation](https://codeforces.com/contest/2035/problem/C)

分奇偶讨论。

对于奇数，最后一次运算是与，会把之前的 1 变成 0，因此答案不会超过 $n$，而且最后一个数取 $n$ 最优，可以构造 $2\ 1\ 3\ 4\ \dots\ n$。

对于偶数，最后一次是或，能增加 1，最优解应当是二进制每一位都是 1，最后三个数取

```cpp
a[n] = (1 << __lg(n));
a[n - 1] = a[n] - 1;
a[n - 2] = a[n] - 2;
```

即可，前面可以随意构造，我的写法是先放所有偶数再放所有奇数，保证末尾是 1。

```cpp
#include <bits/stdc++.h>
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

        vector<int> a(n + 1);
        if (n % 2 == 0) {
            a[n] = (1 << __lg(n));
            a[n - 1] = a[n] - 1;
            a[n - 2] = a[n] - 2;

            int num = 0;
            for (int i = 1; i <= n - 3; i++) {
                if (num == a[n] - 3) num = a[n] - 1;
                if (num == a[n] - 4) num = a[n];
                if (num == n) num = -1;
                a[i] = (num += 2);
            }
        } else {
            int num = 0;
            for (int i = 1; i <= n; i++) {
                a[i] = ++num;
            }
            a[1] = 2, a[2] = 1;
        }

        int ans = 0;
        for (int i = 1; i <= n; i++) {
            i & 1 ? ans &= a[i] : ans |= a[i];
        }
        cout << ans << "\n";
        for (int i = 1; i <= n; i++) {
            cout << a[i] << " \n"[i == n];
        }
    }

    return 0;
}
```

## [D. Yet Another Real Number Problem](https://codeforces.com/contest/2035/problem/D)

贪心，谁大就乘到谁上面，所以需要维护哪些数是大的。用单调栈动态维护后缀最大值的位置，同时在栈中记录每个数字的原始大小和幂次。

注意两数比较大小时，需要按原始大小比较，而不是取模后。可以先比较 $2$ 的幂次，也可以取 `log2` 或用 `long double`，相比而言前者更加保险。

时间复杂度 $\Theta(n)$。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
constexpr int mod = 1e9 + 7;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        vector<array<int, 3>> stk;  // x, exp, pow=x*(2^exp)
        int sum = 0;
        while (n--) {
            int x;
            cin >> x;

            int exp = 0, pow = 1;
            while (x % 2 == 0) {
                x /= 2;
                exp++;
                pow <<= 1;
            }
            while (!stk.empty() && (exp > 30 || x * (1ll << exp) > stk.back()[0])) {
                auto [nx, nexp, npow] = stk.back();
                sum = (sum - 1ll * nx * npow + nx) % mod;
                pow = (1ll * pow * npow) % mod;
                exp += nexp;
                stk.pop_back();
            }
            stk.push_back({ x, exp, pow });
            sum = (sum + 1ll * x * pow) % mod;
            (sum += mod) %= mod;

            cout << sum << " \n"[!n];
        }
    }

    return 0;
}
```



## [F. Tree Operations](https://codeforces.com/contest/2035/problem/F)

一棵树，其中 $n$ 个节点扎根于节点 $x$。每个节点有一个初始非负值； $i$ 第一个节点的起始值为 $a_i$。

要使所有节点的值都等于 $0$ 。为此，您将在树上执行一系列操作，其中每个操作将在某个节点上执行。定义节点 $u$ 上的操作，在 $u$ 的子树中选择一个节点，并将其值递增或递减 $1$ 。在节点上执行操作的顺序如下：第 $i$ 次操作将在第 $(((i - 1) \bmod n) + 1)$ 次节点上执行。

注意，不能跳过操作。

假设您选择了最优的操作，找到在使所有节点的值等于 $0$ 之前必须执行的最小操作数。如果经过有限次运算，不可能使所有节点的值都等于 $0$ ，则输出 $-1$ 。

二分，但是直接二分答案是不行的，答案没有单调性。需要找个有单调性的东西，比如轮次（称 $1,2,\dots,n$ 为一轮）。如果 $q$ 轮可行，那 $q+2$ 轮一定可行；如果 $q$ 轮不可行，那 $q-2$ 轮一定不可行。

```cpp
#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;
using ll = long long;
const ll inf = 0x3f3f3f3f3f3f3f3f;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int t;
    cin >> t;

    while (t--) {
        int n, s;
        cin >> n >> s;
        s--;

        int r = 0;
        vector<int> w(n);
        for (int i = 0; i < n; ++i) {
            cin >> w[i];
            (r += w[i]) %= n;
        }

        vector<vector<int>> E(n);
        for (int i = 1; i < n; ++i) {
            int u, v;
            cin >> u >> v;
            u--, v--;
            E[u].push_back(v);
            E[v].push_back(u);
        }

        ll ans = inf;
        auto check = [&](int q) {
            for (int i = 0; i < n; ++i) {
                auto dfs = [&](this auto&& dfs, int u, int p) -> ll {
                    ll sum = w[u];

                    for (auto v : E[u]) {
                        if (v == p) continue;
                        sum += dfs(v, u);
                    }

                    sum -= q;
                    sum -= (u + n < r + i);
                    sum -= (u < r + i);

                    if (sum < 0) sum = -sum % 2;
                    return sum;
                };

                if (dfs(s, -1) == 0) {
                    ans = min(ans, 1ll * q * n + r + i);
                    return true;
                }
            }
            return false;
        };

        int lo = 0, hi = 1e9;
        while (lo < hi) {
            int mid = lo + hi >> 1;
            if (check(mid * 2)) hi = mid;
            else lo = mid + 1;
        }

        lo = 0, hi = 1e9;
        while (lo < hi) {
            int mid = lo + hi >> 1;
            if (check(mid * 2 + 1)) hi = mid;
            else lo = mid + 1;
        }

        cout << (ans == inf ? -1 : ans) << "\n";
    }

    return 0;
}
```