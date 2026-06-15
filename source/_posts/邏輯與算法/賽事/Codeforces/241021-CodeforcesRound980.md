---
title: Codeforces Round 980 (Div2A-Div1C)
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
abbrlink: c359c097
date: 2024-10-21 13:31:36
updated: 2024-10-21 14:33:28
---


## [2A. Profitable Interest Rate](https://codeforces.com/contest/2024/problem/A)

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int a, b;
        cin >> a >> b;

        cout << max(0, a >= b ? a : 2 * a - b) << "\n";
    }

    return 0;
}
```

## [2B. Buying Lemonade](https://codeforces.com/contest/2024/problem/B)

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
        int n, k;
        cin >> n >> k;

        vector<int> a(n);
        for (int i = 0; i < n; i++) { 
            cin >> a[i];
        }
        sort(a.begin(), a.end());

        ll sum = 0, res = n;
        for (int i = 0; i < n; i++) { 
            sum += 1ll * (i == 0 ? a[i] : a[i] - a[i - 1]) * (n - i);
            if (sum >= k) {
                res = i;
                break;
            }
        }
        cout << (k + res) << "\n";
    }

    return 0;
}
```

## [1A. Concatenation of Arrays](https://codeforces.com/contest/2023/problem/A)

**题意** 给定 $n$ 个二元组 $a_{i1},a_{i 2}$，排序后拼起来，最小化逆序对数。

**思路** 这种题不要乱猜。$a_{i1}$ 和 $a_{i 2}$ 的地位相同，较小值和较大值的地位也相同，先排一个再排一个在直觉上都不太对。

可以按 $a_{i1}+a_{i 2}$ 递增排序。用调整法可证。

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

        vector<pair<int, int>> a(n);
        for (int i = 0; i < n; i++) {
            cin >> a[i].first >> a[i].second;
        }

        sort(a.begin(), a.end(),
            [&](const pair<int, int>& a, const pair<int, int>& b) {
                return a.first + a.second < b.first + b.second;
            });

        for (int i = 0; i < n; i++) {
            cout << a[i].first << " " << a[i].second << " ";
        }   
        cout << "\n";
    }

    return 0;
}
```

## [1B. Skipping](https://codeforces.com/contest/2023/problem/B)

**题意** $n$ 个问题编号从 $1$ 到 $n$，每个问题有得分 $a_i$ 和参数 $b_i$。

从第一个问题开始回答，按如下次序回答每个问题，两种选择：
- 提交问题并获得 $a_i$ 分，然后问题作废，下一题的下标 $j$ 是满足 $j<i$ 且问题未作废的最大下标；
- 跳过问题，然后问题作废，下一题的下标 $j$ 是满足 $j \leqslant b_{i}$ 且问题未作废的最大下标。

最大化得分。

**思路** 这个「下一题」类似于图论中的有向边，最大化得分即是最长路，考虑建图。
- $i\to b_{i}$ 连边权为 $-a_{i}$ 的边，表示跳过问题；
- $i\to i-1$ 连边权为 $0$ 的边，表示提交问题；
- $i\to t$ 连边权为 $\sum_{j=1}^{i} a_{j}$ 的边，表示不再跳过问题，按顺序回答前面的每个问题直至结束。（其中 $t$ 是汇点）

跑 $1\to t$ 的最长路即是答案。共 $3n$ 条边，时间复杂度 $\Theta(n\log n)$。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
constexpr ll inf = 0x3f3f3f3f3f3f3f3f;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;
        n++;

        vector<int> a(n);
        vector<ll> pre(n);
        for (int i = 1; i < n; i++) {
            cin >> a[i];
            pre[i] = pre[i - 1] + a[i];
        }

        vector<vector<pair<ll, int>>> E(n);
        for (int i = 1; i < n; i++) {
            E[i].push_back({ 0, i - 1 });
            E[i].push_back({ pre[i], 0 });
        }    

        for (int i = 1; i < n; i++) {
            int x;
            cin >> x;
            E[i].push_back({ -a[i], x });
        }

        auto Dijkstra = [&](int s) {
            vector<int> vis(n);
            vector<ll> dis(n, -inf);
            dis[s] = 0;
            priority_queue<pair<ll, int>> Q;
            Q.push({ 0, s });
            while (!Q.empty()) {
                auto [d, u] = Q.top(); Q.pop();
                if (vis[u]) continue;    
                vis[u] = 1;
                for (auto& [w, v] : E[u]) {
                    if (dis[v] < w + d) {
                        dis[v] = w + d;      
                        Q.push({ dis[v], v });
                    }
                }
            }
            return dis;
        };
        auto d = Dijkstra(1);

        cout << d[0] << "\n";
    }

    return 0;
}
```
