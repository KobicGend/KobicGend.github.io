---
title: Educational Codeforces Round 174 A - F
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
abbrlink: 91891fa6
date: 2025-03-17 20:42:00
updated: 2025-03-17 20:42:00
---
（一个月前的比赛）


## [2069A - Was there an Array?](https://codeforces.com/contest/2069/problem/A)

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
        n -= 2;

        vector<int> b(n);
        for (int i = 0; i < n; i++) {
            cin >> b[i];
        }

        bool flag = 1;
        for (int i = 1; i < n - 1; i++) {
            if (b[i - 1] == 1 && b[i] == 0 && b[i + 1] == 1) {
                flag = 0;
            }
        }
        cout << (flag ? "YES" : "NO") << endl;
    }
    
    return 0;
}
```

## [2069B - Set of Strangers](https://codeforces.com/contest/2069/problem/B)

对于每种颜色，至多两次（按国际象棋棋盘黑白染色，只需要两次），如果有相邻，必然两次，否则一次。

```cpp
#include <bits/stdc++.h>
using namespace std;
using LL = long long;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n, m;
        cin >> n >> m;

        vector a(n, vector<int>(m));
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                cin >> a[i][j];
                a[i][j]--;
            }
        }

        vector<int> cnt(n * m);
        vector<int> flag(n * m);
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                cnt[a[i][j]]++;
                if (i && a[i][j] == a[i - 1][j]) {
                    flag[a[i][j]] = 1;
                }
                if (j && a[i][j] == a[i][j - 1]) {
                    flag[a[i][j]] = 1;
                }
            }
        }

        for (int i = 0; i < n * m; i++) {
            cnt[i] = cnt[i] > 0;
            cnt[i] += flag[i];
        }

        cout << (accumulate(cnt.begin(), cnt.end(), 0LL) - *max_element(cnt.begin(), cnt.end())) << endl;
    }
    
    return 0;
}
```

## [2069C - Beautiful Sequence](https://codeforces.com/contest/2069/problem/C)

```cpp
#include <bits/stdc++.h>
using namespace std;
using LL = long long;

constexpr LL mod = 998244353;

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

        LL res = 0;
        LL sum = 0;
        int cnt1 = 0;
        for (int i = 0; i < n; i++) {
            if (a[i] == 1) {
                cnt1++;
            } else if (a[i] == 2) {
                sum <<= 1;
                sum += cnt1;
                sum %= mod;
            } else {
                res += sum;
                res %= mod;
            }
        }
        cout << res << endl;
    }
    
    return 0;
}
```


## 2069F - Graph Inclusion

称图 $A$ 包含 (include) 图 $B$，当且仅当图 $B$ 的每个连通分量都是图 $A$ 某个连通分量的子集。给定两个空图 $A$ 和 $B$，多次向其中一个图加边或删边。在每次查询后，计算为使图 $A$ 包含图 $B$，需要向图 $A$ 添加的最小边数。

静态：$A\cup B$ 的连通块数减去 $A$ 的连通块数。

动态：只需动态维护某个集合的连通块数。

```cpp
int n, q;
cin >> n >> q;
const int p = 1, L = 0, R = q;
map<array<int, 2>, int> mp[2];  // 加入边的时间
vector<array<int, 4>> que[2];   // l, r, u, v
for (int i = 0; i < q; i++) {
    char op;
    int u, v;
    cin >> op >> u >> v;
    u--, v--;
    if (u > v) swap(u, v);
    op -= 'A';
    if (mp[op].count({ u, v })) {  // 有边则删去
        que[op].push_back({ mp[op][{ u, v }], i, u, v });
        mp[op].erase({ u, v });
    } else {  // 无边
        mp[op][{ u, v }] = i;
    }
}
for (int op = 0; op < 2; op++) {
    for (auto [k, _] : mp[op]) {  // 最后如果还有边 全部删去
        auto [u, v] = k;
        que[op].push_back({ mp[op][{ u, v }], q, u, v });
    }
}
vector<vector<array<int, 2>>> edge((R - L) << 2);
DisjointSets dsu(n);
vector<int> ans(R - L);
auto solve = [&](this auto&& solve, int p, int L, int R, int op) -> void {
    int now = dsu.now();
    for (auto& [u, v] : edge[p]) {
        dsu.uno(u, v);
    }
    if (leaf) ans[L] += op * dsu.now();
    else solve(lson, op), solve(rson, op);
    return dsu.undo(now);      // 这子树处理完毕 撤销所连接的边
};
for (auto& [l, r, u, v] : que[0]) {
    auto add = [&](this auto&& add, int p, int L, int R) {
        if (l <= L && R <= r) return edge[p].push_back({ u, v });
        if (l < mid) add(lson);
        if (mid < r) add(rson);
    };
    add(curr);
}
solve(curr, -1);
for (auto& [l, r, u, v] : que[1]) {
    auto add = [&](this auto&& add, int p, int L, int R) {
        if (l <= L && R <= r) return edge[p].push_back({ u, v });
        if (l < mid) add(lson);
        if (mid < r) add(rson);
    };
    add(curr);
}
solve(curr, 1);
for (int i = 0; i < q; i++) {
    cout << (ans[i]) << endl;
}
```
