---
title: Educational Codeforces Round 172 A - D
tags:
  - 題解
  - 筆記
  - ACM
  - 算法
  - 練習賽
categories:
  - - 筆記
    - 練習賽
cover: /img/posts/acm/codeforces-cover.webp
top_img: /img/posts/acm/codeforces.webp
highlight_shrink: true
abbrlink: 1c574bb0
date: 2024-12-03 00:12:00
updated: 2024-12-03 07:50:00
---
## [2042A - Greedy Monocarp](https://codeforces.com/contest/2042/problem/A)

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n, k;
        cin >> n >> k;

        vector<int> a(n);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }
        sort(a.begin(), a.end(), greater<>());

        for (int i = 0; i < n; i++) {
            if (a[i] <= k) {
                k -= a[i];
            } else {
                break;
            }
        }

        cout << k << endl;
    }

    return 0;
}
```

## [2042B - Game with Colored Marbles](https://codeforces.com/contest/2042/problem/B)

先选只出现一次的数，因为 A 选择，分数  +2，B 选择，阻止分数 +2；而如果选其他的数，一次操作只能使分数 +1。

选完所有只出现一次的数之后再看剩下的，最优策略下，A 必然每种数都选择一次，但不能选完每种数。

时间复杂度 $\Theta(n)$。

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        vector<int> a(n);
        for (int i = 0; i < n; i++) {
            int x;
            cin >> x;
            x--;
            a[x]++;
        }

        array<int, 3> cnt{};
        for (int i = 0; i < n; i++) {
            if (a[i] > 2) {
                cnt[2]++;
            } else {
                cnt[a[i]]++;
            }
        }

        int ans = 0;
        ans += (cnt[1] + 1) / 2 * 2;
        ans += cnt[2];
        cout << ans << endl;
    }

    return 0;
}
```

## [2042C - Competitive Fishing](https://codeforces.com/contest/2042/problem/C)

（本题和 2023 山东邀请赛 F. Divide the Sequence 几乎完全相同）

首先把 $0$ 换成 $-1$，问题化为：

- 设分成 $t$ 段，第 $i$ 段 $[l_{i},r_{i}]$ 的和是 $s_{i}$，要求 $\sum \limits_{i=1}^{t} (i-1) s_{i}  \geqslant  k$。

感性理解：在某个位置分段，它后面的元素的贡献都要 +1。

推式子做法：对于这种 $\sum \limits_{i=1}^{t} i\times\square$ 的式子，很常见的做法是作指标变换把 $i$ 去掉，

$$
\begin{aligned}
\sum_{i=1}^{t} (i-1) s_{i}
& = \sum_{i=2}^{t} (i-1) s_{i} \\
& = \sum_{i=2}^{t} \sum_{j=2}^{i} s_{i} \\
& = \sum_{j=2}^{t} \sum_{i=j}^{t} s_{i} \\
& = \sum \limits_{j=2}^{t}\operatorname{suf}_{l_{j}}
\end{aligned}
$$

这样答案就很显然了，贪心地取后缀和最大的加起来，加到 $k$ 为止。

时间复杂度 $\Theta(n\log n)$。

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n, k;
        cin >> n >> k;

        vector<int> a(n);
        for (int i = 0; i < n; i++) {
            char c;
            cin >> c;
            if (c == '1') {
                a[i] = 1;
            } else {
                a[i] = -1;
            }
        }

        vector<int> suf(n);
        for (int i = n - 1; i >= 1; i--) {
            suf[i - 1] = suf[i] + a[i];
        }
        sort(suf.begin(), suf.end(), greater<>());

        int cnt = 0;
        while (k > 0 && cnt < n && suf[cnt] > 0) {
            k -= suf[cnt];
            cnt++;
        }

        if (k <= 0) {
            cout << ++cnt << endl;
        } else {
            cout << -1 << endl;
        }
    }

    return 0;
}
```

## [2042D - Recommendations](https://codeforces.com/contest/2042/problem/D)

题目需要求包含区间 $[l_{i},r_{i}]$ 的所有区间的左端点最大值和右端点最小值。

先求包含区间 $[l_{i},r_{i}]$ 的所有区间右端点最小值。首先区间 $j$ 要满足 $l_{j} \leqslant l_{i}$，因此按左端点升序排序，依次处理每个区间。对于第 $i$ 个区间，所求包含这段区间的所有区间的右端点最小值，是之前 $(j \leqslant i)$ 所有满足 $r_{j} \geqslant r_{i}$ 的区间右端点最小值，用 `set` 存所有的区间右端点，只需在 `set` 中找 $\geqslant r_{i}$ 的最小值，用 `lower_bound` 二分即可。

包含区间 $[l_{i},r_{i}]$ 的所有区间左端点最大值，可以类似求得。

特判有两个区间完全相同的情形，这两个区间的答案皆是 $0$。

时间复杂度 $\Theta(n\log n)$。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
constexpr int inf = 0x3f3f3f3f;

struct node {
    int l, r, id, res = 0;
};

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        vector<node> a(n);
        for (int i = 0; i < n; i++) {
            int l, r;
            cin >> l >> r;
            a[i] = { l, r, i };
        }
        sort(a.begin(), a.end(), [](auto& x, auto& y) {
            return x.l == y.l ? x.r > y.r : x.l < y.l;
        });
        
        set<int> s;
        s.insert(inf);
        for (int i = 0; i < n; i++) {
            int tmp = *s.lower_bound(a[i].r);
            s.insert(a[i].r);
            if (tmp != inf) a[i].res += tmp - a[i].r;
        }

        s.clear();
        s.insert(inf);
        sort(a.begin(), a.end(), [](auto& x, auto& y) {
            return x.r == y.r ? x.l < y.l : x.r > y.r;
        });
        for (int i = 0; i < n; i++) {
            int tmp = *s.lower_bound(-a[i].l);
            s.insert(-a[i].l);
            if (tmp != inf) a[i].res += a[i].l + tmp;
        }

        sort(a.begin(), a.end(), [](auto& x, auto& y) {
            return x.l == y.l ? x.r < y.r : x.l < y.l;
        });
        for (int i = 1; i < n; i++) {
            if (a[i].l == a[i - 1].l && a[i].r == a[i - 1].r) {
                a[i].res = 0;
                a[i - 1].res = 0;
            }
        }

        sort(a.begin(), a.end(), [](auto& x, auto& y) {
            return x.id < y.id;
        });
        for (int i = 0; i < n; i++) {
            cout << a[i].res << endl;
        }
    }

    return 0;
}
```