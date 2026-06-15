---
title: Codeforces Round 993 (Div. 4) G（有向基环树）
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
abbrlink: b58ac671
date: 2024-12-16 13:51:00
updated: 2024-12-16 14:40:00
---
## [2044G - Medium Demon Problem](https://codeforces.com/contest/2044/problem/G1)

**G1 题意** 有向图，每个点的出度为 1，有点权。每秒末，对于每条边 $u\to v$，如果 $w_{u}>0$，则置 $w_{u}:=w_{u}-1,\ w_{v}:=w_{v}+1$，操作后，如果某个 $w_{u}>1$，则置 $w_{u}:=1$。问几秒后将达到稳定。

**G2 题意** 有向图，每个点的出度为 1，有点权。每秒末，对于每条边 $u\to v$，如果 $w_{u}>0$，则置 $w_{u}:=w_{u}-1,\ w_{v}:=w_{v}+1$。问几秒后将达到稳定。

两者区别是 G1 规定操作后，如果某个 $w_{u}>1$，则置 $w_{u}:=1$。

这个图是有向基环树森林（即对于每个连通块，是一个有向环上面长了若干棵树）。点权会随着箭头（边）流动，最终汇聚到环上，然后在环上产生循环，达到稳定。

对于 G1：

- 把边想象成容量无穷的水管，但流动需要一秒。如果没有其它点权流过来，那下一秒就会变成 0。

- 所以想法是，如果点权为 0，就把所有出边删掉，表示没有点权能流动，每一秒找入度为 0 的点删去，重复操作，直至找不到那就稳定了。

- 实现类似拓扑排序，删去入度为 0 的点，并令出边的度数减 1。

对于 G2：

- 把边想象成容量限制为 1 的水管，流动仍需要一秒。所以如果某个点权是 $w_{u}$，那至少需要 $w_{u}$ 秒才能全部流走。

- 考虑环上长出来的每棵树的根，所有树上的点权都需要经过这个点，一方面，设这棵树的大小为 $s$，那么至少需要 $s$ 秒才能全部流走；另一方面，这个点的点权总是非 0，因此每秒都可以流走 1。因此，这棵树恰好需要 $s$ 秒。

- 对于每棵树分别计算，取其中的最大值。

- 实现也是用拓扑排序，DP 数组存子树大小。

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
 
        vector<vector<int>> E(n);
        vector<int> deg(n);
        for (int i = 0; i < n; i++) {
            int x;
            cin >> x;
            x--;
            E[i].push_back(x);
            deg[x]++;
        }
 
        queue<int> Q;
        vector<int> d(n, 1);
        for (int i = 0; i < n; i++) {
            if (deg[i] == 0) Q.push(i);
        }

        int maxd = 0;
        while (!Q.empty()) {
            int u = Q.front(); Q.pop();
            maxd = max(maxd, d[u]);
            for (auto v : E[u]) {
                // d[v] += d[u];   // G2 加上这行 存子树大小
                if (--deg[v] == 0) {
                    Q.push(v);
                    // d[v] = d[u] + 1;   // G1 加上这行 存距离
                }
            }
        }
        
        cout << (maxd + 2) << endl;
    }
    return 0;
}
```
