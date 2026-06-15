---
title: "Codeforces Round 992 (Div. 2)\r A-E"
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
abbrlink: dfa1838d
date: 2024-12-06 00:02:00
updated: 2024-12-06 13:10:00
---

## [2040A - Game of Division](https://codeforces.com/contest/2040/problem/A)

数据范围较小，枚举 $i$ 即可。

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        int k;
        cin >> k;

        vector<int> a(n);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }

        int res = -1;
        for (int i = 0; i < n; i++) {
            bool ok = true;
            for (int j = 0; j < n; j++) {
                if (j == i) continue;
                if (abs(a[i] - a[j]) % k == 0) {
                    ok = false;
                }
            }
            if (ok) {
                res = i;
            }
        }

        if (res == -1) {
            cout << "NO" << endl;
        } else {
            cout << "YES" << endl;
            cout << res + 1 << endl;
        }
    }

    return 0;
}
```

## [2040B - Paint a Strip](https://codeforces.com/contest/2040/problem/B)

题目说，区间内 $1$ 的个数大于等于 $0$ 的个数，就可以把 $0$ 都变成 $1$。

假设 $a$ 数组是无限长的。最优方法是从一端开始，先 $a_{1}=1$，那下一个 $1$ 放在 $a_{4}=1$ 最优，然后用操作二把 $a_{1}\sim a_{4}$ 都变成 $1$。再下一个是 $a_{10}=1$，以此类推。

找规律，若 $a_{n}=1$，则 $a_{2n+2}=1$。按这个方法填完 $a$ 数组，答案就是 $a_{1}\sim a_{n}$ 中 $1$ 的个数，如果 $a_{n}=0$，答案需要再加 $1$。

由于未保证 $\sum n$ 的范围，需先打表预处理所有答案，再 $\Theta(1)$ 查询输出。总时间复杂度 $\Theta(N+t)$。

```cpp
#include <bits/stdc++.h>
using namespace std;
constexpr int N = 1e5 + 8;
int res[N];

int main() {
    int sum = 1, cnt = 1;
    res[1] = 1;
    for (int i = 2; i < N; i++) {
        res[i] = cnt + 1;
        if (sum * 2 + 2 == i) {
            sum = i;
            cnt++;
        }
    }

    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        cout << res[n] << endl;
    }

    return 0;
}
```

## [2040C - Ordered Permutations](https://codeforces.com/contest/2040/problem/C)

直观感受小数要放边上，这样包含小数的子序列会更少，进一步，$i\sim n$ 这些数必须挨着。

假设从大到小倒着填，那么 $n - 1$ 有填在 $n$ 前或后两种选择，$n-2$ 也有两种选择……总共的方案数是 $2^{n-1}$。因此若 $k > 2^{n-1}$ 就无解。

由于 $1$ 填在前或后有两种选择，且填在前有一半的方案，填在后有另一半的方案，所以如果要求字典序是前一半小（$k \leqslant 2^{n-2}$），就把 $1$ 填在前，否则填在后。再判断 $2$ 是填在前或后，如此递推下去，直至填完。

时间复杂度 $\Theta(n)$。注意开 LL，以及 $n$ 较大时 $k$ 一定小于 $2^{n}$，不能对一个很大的 $n$ 做左移运算 `1ll << n`。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    int t;
    cin >> t;

    while (t--) {
        ll n, k;
        cin >> n >> k;

        if (n < 60 && (1LL << n - 1) < k) {
            cout << -1 << endl;
        } else {
            k--;
            vector<int> res(n);
            int l = 0, r = n - 1;
            for (int bit = n - 1; bit >= 0; bit--) {
                if (bit >= 60 || k < (1LL << bit - 1)) {
                    res[l++] = n - bit;
                } else {
                    res[r--] = n - bit;
                    k -= 1LL << bit - 1;
                }
            }
            for (auto x : res) {
                cout << x << " ";
            }
            cout << endl;
        }
    }

    return 0;
}
```

## [2040D - Non Prime Tree](https://codeforces.com/contest/2040/problem/D)

*不错的构造，与传统构造的套路不太一样。*

两个抓手是 $1$ 和 $4$，这两个数是最小的非素数。

差值全为 $1$ 并不现实，所以需要在合适的地方加 $4$。而且 $1$ 要尽可能多地填。

自然想到先选择一条链，其相邻差值为 $1$，对于这条链上的某个点 $u$，如果还有其它分支，那可以填 $w_{u}+4,w_{u}+6,w_{u}+8,\dots$，从这个点引出的其它链，仍然是相邻差值为 $1$。（相当于将树剖分为若干条链，每条链相邻差值为 $1$，链与链之间差 $\geqslant 4$ 的偶数）

实现时可以按 DFS 的顺序，第一个儿子就是在同一条链上，否则新开一条链。

正确性：最坏情况的菊花图，根填 $1$，第一个儿子是 $2$，其余填 $5,7,9,\dots$，也不会超过 $2n$。其它情况链更多，更不会超过 $2n$。

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        vector<vector<int>> E(n);
        for (int i = 1; i < n; i++) {
            int u, v;
            cin >> u >> v;
            u--, v--;
            E[u].push_back(v);
            E[v].push_back(u);
        }

        vector<int> w(n);
        int now = 0;
        auto dfs = [&](this auto&& self, int u, int p) -> void {
            int fst = 1;
            for (auto v : E[u]) {
                if (v == p) continue;
                if (fst) {
                    now = w[v] = (w[u] + 1);
                    fst = 0;
                } else {
                    int res = now - w[u] + 2;
                    if (res < 4) res = 4;
                    else if (res & 1) res++;
                    now = w[v] = (w[u] + res);
                }
                self(v, u);
            }
        };
        now = w[0] = 1;
        dfs(0, -1);

        for (int i = 0; i < n; i++) {
            cout << w[i] << " ";
        }
        cout << endl;
    }

    return 0;
}
```
