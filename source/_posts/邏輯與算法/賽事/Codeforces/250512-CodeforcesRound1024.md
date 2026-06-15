---
title: Codeforces Round 1024 (Div. 1)
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
abbrlink: eb1cd565
date: 2025-05-13 23:56:00
updated: 2025-05-13 23:56:00
---
## [A - Mex in the Grid](https://codeforces.com/contest/2101/problem/A)

由于不含 0 的网格的 MEX 都是 0，希望更多的网格包括 0，所以 0 放在正中间。数越小就要越靠近中心（严格证明可以看看官方题解），可以构造

```
9 8 7 6 
10 1 0 5 
11 2 3 4 
12 13 14 15 
```

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;
        
        vector a(n, vector<int>(n));
        int x = (n + 1) / 2 - 1;
        int y = (n + 1) / 2 - 1;
        int cur = n % 2;
        for (int d = n % 2 + 1; d <= n; d += 2) {
            x++;
            y++;
            for (auto [dx, dy] : {array{-1, 0}, {0, -1}, {1, 0}, {0, 1}}) {
                for (int _ = 0; _ < d; _++) {
                    x += dx;
                    y += dy;
                    a[x][y] = cur++;
                }
            }
        }

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                cout << a[i][j] << " ";
            }
            cout << endl;
        }
        cout << endl;
    }

    return 0;
}
```


## [B - Quartet Swapping](https://codeforces.com/contest/2101/problem/B)

首先元素位置的奇偶性不会变。样例告诉我们大概率是可以自由调整的，调整为奇序列升序，偶序列升序。

但有个例外，考虑交换的本质是逆序对 +1/-1，因此整个排列的逆序对 +2/0/-2，即奇偶性总是不变。如果排序后，整个序列逆序对的奇偶性不对了，就需要交换最后一项和倒数第三项。

时间复杂度 $\operatorname{O}(n\log n)$。

```cpp
#include <bits/stdc++.h>
using namespace std;

int cal(const vector<int>& a) {  // 算置换数，置换的奇偶性和逆序对奇偶性相同
    int n = a.size();
    vector<int> vis(n);
    int res = 0;
    for (int i = 0; i < n; i++) {
        if (vis[i]) continue;
        int cnt = 0;
        for (int u = i; !vis[u]; u = a[u]) {
            vis[u] = true;
            cnt++;
        }
        res += cnt - 1;
    }
    return res;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        vector<int> a(n);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
            a[i]--;
        }

        int cnt1 = cal(a);
        ranges::sort(a | views::drop(0) | views::stride(2));
        ranges::sort(a | views::drop(1) | views::stride(2));
        int cnt2 = cal(a);

        if ((cnt1 - cnt2) % 2) {
            swap(a[n - 1], a[n - 3]);
        }
        for (int i = 0; i < n; i++) {
            cout << ++a[i] << " \n"[i == n - 1];
        }
    }

    return 0;
}
```

## [C - 23 Kingdom](https://codeforces.com/contest/2101/problem/C)

好题。

**题意** 定义 $d_x(c)$ 为序列 $c$ 中最前面的 $x$ 和最后面的 $x$ 之间的距离，如果序列中未出现 $x$，或者只出现一次，定义 $d_x(c)$ 为 0。给定序列 $a$，找到一个等长序列 $b$ 满足 $1\le b_i\le a_i$。最大化 $\sum\limits_{i=1}^n d_i(b)$。

**Step 1 考察最优序列 $b$ 的形态**

需要让尽可能多的值 $v$ 贡献 $d_v(b)$，并且每个贡献的 $d_v(b)$ 尽可能大。对于 $b$ 的构造方法，有一些显然的贪心：

- 每个对答案有贡献的值在序列 $b$ 中恰好出现两次；
- 考虑到约束 $b_i \le a_i$，较小的值更容易满足 $v \le a_i$，因此，如果我们选择 $k$ 个值，应该选择 $1, 2, \dots, k$；
- 将这 $k$ 个值尽可能放置在序列 $b$ 的最左边以及最右边。

例如，如果 $k=3$，$b$ 可能是 $b = (3,1,x,2,x,x,3,2,x,1)$ ，其中 $x$ 代表不贡献答案的值。

---

**Step 2 对于固定的 $k$，为了构造出合法的 $b$，考察 $a$ 要满足的条件**

假设我们已经确定要用值 $1, 2, \dots, k$ 来产生贡献。

我们需要在序列 $a$ 的一个尽可能短的前缀 $a_1, \dots, a_{L_k}$ 中找到 $k$ 个不同的位置，并在这些位置上放置 $1, 2, \dots, k$，同时满足 $b_{i} \leqslant a_{i}$ 的条件。类似地，也要找到尽可能短的后缀 $a_{R_k}, \dots, a_n$。

为了确保这 $2k$ 个位置是两两不同的，必须 $L_k < R_k$。

$k$ 递增时 $L_{k}$ 递增，$R_{k}$ 递减，两指针移动的次数为线性，可以枚举 $k$。

---

**Step 3 枚举 $k$，求解答案**

设左指针当前位于 $\ell$。

方法：开一个桶，对于当前 $a_{\ell}$，需要找到一个 $\leqslant a_{\ell}$ 且桶里没有的最大元素 $x$（这可以用 set 或并查集实现），如果找不到这样的 $x$，就继续移动指针 $\ell$，直到找到为止，然后把 $x$ 加入桶中。

正确性：桶中元素互不相同，且元素数量为 $k$，而且保证桶中元素分别大于等于 $1,2,\dots,k$，满足我们的需求。

时间复杂度 $\operatorname{O}(n)$ 或 $\operatorname{O}(n\log n)$。

并查集实现：

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

struct DisjointSets {
    vector<int> p;
    int tot;
    DisjointSets(int n) : p(n, -1), tot(n) {}
    int size(int u) { return -p[find(u)]; }
    int find(int u) { return p[u] < 0 ? u : p[u] = find(p[u]); }
    bool same(int u, int v) { return find(u) == find(v); }
    bool uno(int u, int v) {
        if (u = find(u), v = find(v); u == v) return false;
        return p[u] += p[v], p[v] = u, tot--;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        vector<int> a(n);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }

        int l = 0, r = n - 1;
        vector<bool> visl(n + 1), visr(n + 1);
        DisjointSets dsul(n + 1), dsur(n + 1);
        ll res = 0;
        while (l < r) {
            while (l + 1 < n && (visl[a[l]] && dsul.find(a[l]) == 0)) {
                l++;
            }
            int nl = dsul.find(a[l]);
            if (nl == 0) {
                break;
            }
            visl[nl] = true;
            dsul.uno(nl - 1, nl);

            while (r > 0 && (visr[a[r]] && dsur.find(a[r]) == 0)) {
                r--;
            }
            int nr = dsur.find(a[r]);
            if (nr == 0) {
                break;
            }
            visr[nr] = true;
            dsur.uno(nr - 1, nr);

            if (l >= r) {
                break;
            }
            res += r - l;
            l++, r--;
        }
        cout << res << endl;
    }

    return 0;
}
```

set 实现：

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        vector<int> a(n);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
            a[i]--;
        }

        auto range = views::iota(0, n);
        set<int> sl(range.begin(), range.end()), sr = sl;

        int l = 0, r = n - 1;
        ll res = 0;
        while (l < r) {
            while (l < n && sl.upper_bound(a[l]) == sl.begin()) {
                l++;
            }
            if (l == n) {
                break;
            }
            sl.erase(--sl.upper_bound(a[l]));

            while (r >= 0 && sr.upper_bound(a[r]) == sr.begin()) {
                r--;
            }
            if (r < 0) {
                break;
            }
            sr.erase(--sr.upper_bound(a[r]));

            if (l >= r) {
                break;
            }
            res += r - l;
            l++, r--;
        }
        cout << res << endl;
    }

    return 0;
}
```




合法的序列满足：LIS 和 LDS 恰好有一个公共元素 $a_{x}$，且 LIS 和 LDS 取遍所有元素。即 $x$ 左边的元素中比 $a_{x}$ 小的递增，比 $a_{x}$ 大的递降，右边的元素中比 $a_{x}$ 大的递增，比 $a_{x}$ 小的递降。

显然，一个合法序列的连续子序列也是合法的。一个 $\operatorname{O}(n^{2})$ 的暴力方案是，枚举LIS 和 LDS 恰好有一个公共元素 $a_{x}$，从 $x$ 向两边找到极大合法子序列 $[L_{x},R_{x}]$。

下面优化此过程，期望在 $\operatorname{O}(n\log n)$ 时间内求出 $L,R$ 数组。

把每个部分拆开看，先对于每个 $x$，求最小的 $i$，满足 $[i,x]$ 中比 $a_{x}$ 小的递增。