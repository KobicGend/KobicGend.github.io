---
title: Educational Codeforces Round 171
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
abbrlink: '97e64557'
date: 2024-10-28 00:34:12
updated: 2024-10-28 01:24:21
---
## [A. Perpendicular Segments](https://codeforces.com/contest/2026/problem/A)

矩形里最长的两段垂直线段是最大正方形的对角线。

```cpp
#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;
using ll = long long;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int x, y, k;
        cin >> x >> y >> k;

        int s = min(x, y);

        cout << "0 0 " << s << " " << s << "\n";
        cout << "0 " << s << " " << s << " 0\n";
    }

    return 0;
}
```


## [B. Black Cells](https://codeforces.com/contest/2026/problem/B)

对于偶数，有唯一解，即是 $a_{2k}-a_{2k-1}$ 的最大值；对于奇数，可以选择某个 $k$ 不选 $a_{2k}-a_{2k-1}$ 这一段，也就是 $a_{2}-a_{1},a_{4}-a_{3},\dots ,a_{2k-2}-a_{2k-3},a_{2k+1}-a_{2k},\dots ,a_{n}-a_{n-1}$ 的最大值，再对所有 $k$ 求最小值，枚举即可。

时间复杂度 $\Theta(n^{2})$。

```cpp
#include <iostream>
#include <algorithm>
#include <vector>
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

        vector<ll> a(n);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }

        ll ans = 8e18;
        if (n % 2 == 0) {
            ll mx = 0;
            for (int i = 0; i + 1 < n; i += 2) {
                mx = max(mx, a[i + 1] - a[i]);
            }
            ans = mx;
        } else {
            for (int j = 0; j < n; j += 2) {
                ll mx = 0;
                for (int i = 0; i + 1 < n; i += 2) {
                    if (i == j) i++;
                    mx = max(mx, a[i + 1] - a[i]);
                }
                ans = min(ans, mx);
            }
        }

        ans = max(ans, 1ll);
        cout << ans << "\n";
    }

    return 0;
}
```

## [C. Action Figures](https://codeforces.com/contest/2026/problem/C)（贪心模拟）

倒着循环。

如果是 1，这个可能不需要花钱，放到一个 `deque` 里表示暂时不花钱；如果是 0，必须和之前（也就是下标靠后的）的一起买，从 `deque` 取出一个不花钱的商品，这两个一起买，价格是这一位的价格，如果 `deque` 为空，那这个商品必定花钱（和之前一起买）。

如果最后 `deque` 非空，选择其中较小的一半购买。

事实上 `deque` 中有价值的部分是它的大小，所以直接开个变量 `siz` 就行。

时间复杂度 $\Theta(n)$。

```cpp
#include <iostream>
#include <algorithm>
#include <vector>
#include <deque>
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

        string s;
        cin >> s;
        s = ' ' + s;

        deque<int> Q;
        ll ans = 0;
        for (int i = n; i; i--) {
            if (s[i] == '1') {
                Q.push_back(i);
            } else if (Q.empty()) {
                ans += i;
            } else {
                Q.pop_front();
                ans += i;
            }
        }

        while (!Q.empty()) {
            ans += Q.back();
            Q.pop_back();
            if (!Q.empty()) Q.pop_front();
        }

        cout << ans << "\n";
    }

    return 0;
}
```

## [D. Sums of Segments](https://codeforces.com/contest/2026/problem/D)（前缀和计算）

问题在于怎么算 $s(m,m)+s(m,m+1)+\dots+s(m,t)$，后面部分就简单了。

我们先算 $s(m,m)+s(m,m+1)+\dots+s(m,n)$，它等于 $\sum \limits_{i=m}^{n}(n-i+1)a_{i}$，是 $(n-i+1)a_{i}$ 的后缀和。而 $s(m,m)+s(m,m+1)+\dots+s(m,t)$ 等于 $\sum \limits_{i=m}^{t}(t-i+1)a_{i}$，稍作变形便是 $\sum \limits_{i=m}^{n}(n-i+1)a_{i}-\sum \limits_{i=t+1}^{n}(n-i+1)a_{i}-(n-t) \sum\limits_{i=m}^{t}a_{i}$。

然后把 $b$ 序列分成若干段，第 $i$ 段的长度为 $n-i+1$，二分出在第几段，将整段加上零碎的即可。

时间复杂度 $\Theta(n+q\log n)$。

```cpp
#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;
using ll = long long;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;

    vector<ll> sa(n + 1), ia(n), sufia(n + 1), pre(n + 1);

    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        sa[i + 1] = sa[i] + x;
        ia[i] = (n - i) * x;
    }
    for (int i = n - 1; i >= 0; i--) {
        sufia[i] = sufia[i + 1] + ia[i];
    }

    auto calia = [&](ll m, ll t) {
        return sufia[m] - sufia[t] - (n - t) * (sa[t] - sa[m]);
    };

    for (int i = 0; i < n; i++) {
        pre[i + 1] = pre[i] + calia(i, n);
    }

    auto cal = [&](ll m) {
        ll l = 0, r = n;
        while (l <= r) {
            ll mid = l + r >> 1;
            if ((1ll * (n + n - (mid - 1)) * mid / 2) <= m) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        ll mid = r;
        ll id = m - (1ll * (n + n - (mid - 1)) * mid / 2);
        return pre[mid] + calia(mid, mid + id);
    };

    int q;
    cin >> q;

    while (q--) {
        ll l, r;
        cin >> l >> r;
        l--;

        cout << (cal(r) - cal(l)) << "\n";
    }

    return 0;
}
```


## [E. Best Subsequence](https://codeforces.com/contest/2026/problem/E)（最大权闭合子图）

每个东西有选或不选两种状态，而且每个东西都状态确定，价值也相应确定。

> 赛时考虑过 DP，但每个数之间关系很强，很难转移；考虑过字典树，但本题每个二进制位是独立的，字典树强加了一个顺序；考虑过连边跑最短路，但这种方法适用于二者的关系，而不是很多数之间的关系。

> 画出了 01 矩阵（行是数，列是二进制位），很像二分图，又不是最大匹配，所以想换一种连边方式跑最大流。

选择一个二进制位，损失为 1，不选一个数，损失为 1，理想情况是 n，求最小损失。

从源点向每个数连边权为 1 的边，从每个二进制位向汇点连边权为 1 的边，对于每个数，如果某个二进制位为 1，则由这个数向二进制位连边权为无穷的边。则最小损失是最小割。

答案为理想情况减去最小损失。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

struct MaxFlow {
    vector<vector<array<int, 3>>> E;
    vector<int> level, curr;

    MaxFlow(int n) : E(n), level(n), curr(n) {}

    void add(int u, int v, int w) {
        E[u].push_back({ w, v, int(E[v].size()) });
        E[v].push_back({ 0, u, int(E[u].size()) - 1 });
    }

    bool bfs(int s, int t) {
        queue<int> q;
        fill(level.begin(), level.end(), 0);
        fill(curr.begin(), curr.end(), 0);
        level[s] = 1;
        q.push(s);
        while (!q.empty()) {
            int u = q.front();
            q.pop();
            for (auto& [w, v, id] : E[u]) {
                if (w && !level[v]) {
                    level[v] = level[u] + 1;
                    q.push(v);
                }
            }
        }
        return level[t] > 0;
    }

    int dfs(int u, int t, int maxf) {
        if (u == t) return maxf;
        for (int& i = curr[u]; i < E[u].size(); i++) {
            auto& [w, v, id] = E[u][i];
            if (w && (level[v] == level[u] + 1)) {
                int f = dfs(v, t, min(maxf, w));
                if (f) {
                    w -= f;
                    E[v][id][0] += f;
                    curr[u] = i;
                    return f;
                }
            }
        }
        return 0;
    }

    int dinic(int s, int t) {
        int ans = 0;
        while (bfs(s, t)) {
            while (int f = dfs(s, t, 1e9)) {
                ans += f;
            }
        }
        return ans;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        MaxFlow G(n + 62);

        int s = n + 60, t = n + 61;
        for (int i = 0; i < n; i++) {
            ll x;
            cin >> x;
            G.add(s, i, 1);
            for (int bit = 0; bit < 60; bit++) {
                if (x >> bit & 1) {
                    G.add(i, n + bit, 1e9);
                }
            }
        }
        
        for (int bit = 0; bit < 60; bit++) {
            G.add(n + bit, t, 1);
        }

        cout << n - G.dinic(s, t) << "\n";    
    }

    return 0;
}
```