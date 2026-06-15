---
title: Codeforces Round 1009 (Div. 3) E - G
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
abbrlink: ec4161c0
date: 2025-03-11 08:58:00
updated: 2025-03-11 08:58:00
---
## [2074E - Empty Triangle](https://codeforces.com/contest/2074/problem/E)

**Hint 1** 随机化

平面上 $n$ 个点是毫无规律的，就算每个点问一次也只能问到 $3\times 75$ 个点，这个数远小于 $1500$，想要让每个点地位平等，考虑随机。

**Hint 2** 从一个已知的三角形往里缩

相比包含特殊点的三角形，不包含的三角形其面积相对较小。而且包含特殊点的三角形内部一定有答案。如果问到一个包含特殊点的三角形，想法是往里缩，直到找到答案。

具体地，如果问到 $x-y-z$ 里面包含 $u$，可能会考虑继续问 $x-y-u$ 或 $x-u-z$ 或 $u-y-z$。这里有好几种选择，用随机数选。

```cpp
#include <bits/stdc++.h>
using namespace std;

mt19937_64 rnd(chrono::steady_clock::now().time_since_epoch().count());

int main() {
    int J;
    cin >> J;

    while (J--) {
        int n;
        cin >> n;

        array<int, 3> x{ 1, 2, 3 };
        while (true) {
            cout << "? " << x[0] << ' ' << x[1] << ' ' << x[2] << endl;
            int u;
            cin >> u;
            if (u == 0) {
                cout << "! " << x[0] << " " << x[1] << " " << x[2] << endl;
                break;
            } else {
                int op = rnd() % 3;
                x[op] = u;
            }
        }
    }

    return 0;
}
```

## [2074F - Counting Necessary Nodes](https://codeforces.com/contest/2074/problem/F)

**Hint** 正难则反

如果直接算答案，需要找里面的最大矩形，然后扣掉，剩下的部分是若干个小矩形，越算越多，十分复杂。

倒着想，考虑把四个小区间合并成一个大区间，算减少了多少区间，减少了 3 倍的大区间数量。这样一直合并，直至不能合并时就是答案。

也可以这样想，找里面的最大矩形，不扣掉，而是拆成小一点的若干矩形，需要补上 3 倍的大区间数量。这样一直拆开大矩形，直至矩形大小为 1。用大小为 1 的正方形数量减去补上的数量就是答案。

```cpp
#include <bits/stdc++.h>

using namespace std;
using ll = long long;
using uint = unsigned;
using ull = unsigned long long;

int main() {
    int J;
    cin >> J;

    while (J--) {
        int l1, r1, l2, r2;
        cin >> l1 >> r1 >> l2 >> r2;

        ull res = 0;
        for (int bit = 1; bit < 30; bit++) {
            int s = 1 << bit;
            int rr1 = r1 / s * s;   // 比r1小的最大的s的倍数
            int rr2 = r2 / s * s;
            int ll1 = (l1 + s - 1) / s * s;  // 比l1大的最小的s的倍数
            int ll2 = (l2 + s - 1) / s * s;
            if (ll1 >= rr1 || ll2 >= rr2) {
                continue;
            }
            res -= 3ull * (rr1 - ll1) / s * (rr2 - ll2) / s;  // 3倍的大矩形数量
        }
        res += 1ull * (r1 - l1) * (r2 - l2);
        cout << res << endl;
    }

    return 0;
}
```


## [2074G - Game With Triangles: Season 2](https://codeforces.com/contest/2074/problem/G)

**Hint** 环是假的，看成区间做区间 DP

直观上可以把环看作拱形桥。

从外向内考虑每个区间，如果选择 $u<v<w$ 构成三角形，那么可以继续在 $[u+1,v-1],[v+1,w-1]$ 中选择。

按类似区间 DP 的写法，先处理小区间，再向外扩张。具体转移见代码。


```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    int J;
    cin >> J;

    while (J--) {
        int n;
        cin >> n;

        vector<int> a(n);
        for (auto& x : a) {
            cin >> x;
        }

        vector dp(n, vector<ll>(n));
        for (int r = 0; r < n; r++) {
            for (int l = r; l >= 0; l--) {
                for (int i = l; i < r; i++) {
                    if (i != l) {
                        dp[l][r] = max(dp[l][r], 1ll * a[l] * a[i] * a[r] + dp[l + 1][i - 1] + dp[i + 1][r - 1]);  // 选择 l,i,r
                    }
                    dp[l][r] = max(dp[l][r], dp[l][i] + dp[i + 1][r]);  // 什么都不选，拆成两个区间
                }
            }
        }
        cout << dp[0][n - 1] << endl;
    }

    return 0;
}
```