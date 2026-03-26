---
title: Codeforces Round 982 (Div. 2)
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
abbrlink: f9a46751
date: 2024-10-27 02:05:04
updated: 2024-10-27 11:32:40
---
## [A. Rectangle Arrangement](https://codeforces.com/contest/2027/problem/A)

取最大值的正确性：凸阶梯形平移后即是矩形，其周长与矩形周长相等。

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

        int X = 0, Y = 0;
        while (n--) {
            int x, y;
            cin >> x >> y;
            X = max(X, x);
            Y = max(Y, y);
        }
        cout << (X + Y) * 2 << "\n";
    }

    return 0;
}
```

## [B. Stalin Sort](https://codeforces.com/contest/2027/problem/B)（转化）

非递增序列在 Stalin 排序后只剩一个数，所以只需考虑这个问题：
- 至少删去几个数，得到的新数组在 Stalin 排序后只剩一个数。

那么第一个数必须大于剩下所有的数，枚举第一个数，时间复杂度 $\Theta(n^{2})$。

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

        vector<int> a(n);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }
        
        int minn = 1e9;
        for (int i = 0; i < n; i++) {
            int cnt = i;
            for (int j = i + 1; j < n; j++) {
                cnt += a[j] > a[i];
            }
            minn = min(minn, cnt);
        }
        cout << minn << "\n";
    }

    return 0;
}
```


## [C. Add Zeros](https://codeforces.com/contest/2027/problem/C)（建图 BFS / DFS）

每个数只能操作一次，对于一种 0 的数量，可能有很多种操作选择，每种选择对应于另一种 0 的数量。

建图，如果 $u$ 个 0 在操作后可以达到 $v$ 个 0，则连边 $u\to v$，问题化为以 0 为起点能达到的点的最大编号，BFS 或 DFS 皆可。

时间复杂度 $\Theta(n\log n)$，注意开 LL。

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

        map<ll, vector<ll>> E;
        for (ll i = 0; i < n; i++) {
            ll x;
            cin >> x;
            if (i && i + x - n >= 0) {
                E[i + x - n].push_back(i + x - n + i);
            }
        }

        queue<ll> Q;
        Q.push(0);
        ll ans = 0;
        map<ll, bool> vis;
        while (!Q.empty()) {
            auto u = Q.front(); Q.pop();
            ans = max(ans, u);
            for (auto v : E[u]) {
                if (!vis.count(v)) {
                    vis[v] = 1;
                    Q.push(v);
                }
            }
        }
        cout << (n + ans) << "\n";
    }

    return 0;
}
```



## [D1. The Endspeaker (Easy Version)](https://codeforces.com/contest/2027/problem/D1)（最短路）

求最小代价，建图。题目说进行一次操作二，移除和为 $b_{k}$ 的前缀，那么如果从 $i,j$ 满足 $\sum\limits_{s=i}^{j-1}a_{s} \leqslant b_{k}$，则连边 $i\to j$，边权为 $m-k$。而且贪心地，对于每一对 $(j,k)$，只需选择最小的 $i$ 连边。

但这样并不能保证先走 $k$ 小的，再走 $k$ 大的。考虑动态加边求最短路，每遍历一个 $b_{k}$，就用新边更新最短路，这样在走 $k$ 对应的边时，所有比 $k$ 小的边都走过了，也就保证了题目要求。

跑 $m$ 次 Dijkstra，每次的边数是 $n$，时间复杂度 $\Theta(mn\log n)$。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
constexpr ll Inf = 0x3f3f3f3f3f3f3f3f;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n, m;
        cin >> n >> m;

        vector<int> a(n), b(m);
        vector<ll> pre(n + 1);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
            pre[i + 1] = pre[i] + a[i];
        }
        for (int j = 0; j < m; j++) {
            cin >> b[j];
        }

        vector dis(n + 1, Inf);
        dis[0] = 0;
        for (int j = 0; j < m; j++) {
            vector<vector<array<int, 2>>> E(n + 1);
            priority_queue<pair<ll, int>, vector<pair<ll, int>>, greater<>> Q;
            vector vis(n + 1, false);
            for (int l = 0, r = 1; r <= n; r++) {
                while (pre[r] - pre[l] > b[j]) l++;
                E[l].push_back({ m - j - 1, r });
                Q.push({ dis[l], l });
            }
            while (!Q.empty()) {
                auto [d, u] = Q.top(); Q.pop();
                if (vis[u]) continue;
                vis[u] = 1;
                for (auto [w, v] : E[u]) {
                    if (dis[v] > w + d) {
                        dis[v] = w + d;
                        Q.push({ dis[v], v });
                    }
                }
            }
        }

        if (dis[n] != Inf) {
            cout << dis[n] << "\n";
        } else {
            cout << "-1\n";
        }
    }

    return 0;
}
```

由于所有的边 $u\to v$ 都满足 $u<v$，后面的最短路只被前面影响，因此Dijkstra 可以省略，而是用一个循环代替。（这就类似于 Tarjan 缩点后的 Topo 排序不需要写 queue，用循环就能完成。）

代码精简为：

```cpp
vector dis(n + 1, Inf);
dis[0] = 0;
for (int j = 0; j < m; j++) {
    for (int l = 0, r = 1; r <= n; r++) {
        while (pre[r] - pre[l] > b[j]) l++;
        // E[l].push_back({ m - j - 1, r });
        dis[r] = min(dis[r], dis[l] + m - j - 1);
    }
}
```

时间复杂度 $\Theta(mn)$。这与 DP 做法十分相似（听队友说类似背包，大概意思是 $m$ 个物体 $b$，并将 $a$ 视为容量，博主不太懂 DP 这里就不详细展开了）。

完整代码：

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
constexpr ll Inf = 0x3f3f3f3f3f3f3f3f;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n, m;
        cin >> n >> m;

        vector<int> a(n), b(m);
        vector<ll> pre(n + 1);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
            pre[i + 1] = pre[i] + a[i];
        }
        for (int j = 0; j < m; j++) {
            cin >> b[j];
        }

        vector dis(n + 1, Inf);
        dis[0] = 0;
        for (int j = 0; j < m; j++) {
            for (int l = 0, r = 1; r <= n; r++) {
                while (pre[r] - pre[l] > b[j]) l++;
                dis[r] = min(dis[r], dis[l] + m - j - 1);
            }
        }

        if (dis[n] != Inf) {
            cout << dis[n] << "\n";
        } else {
            cout << "-1\n";
        }
    }

    return 0;
}
```


## [D2. The Endspeaker (Hard Version)](https://codeforces.com/contest/2027/problem/D2)（最短路计数）

这时就不能贪心地，对于每一对 $(j,k)$，只需选择最小的 $i$ 连边了，因为会破坏计数的不重不漏性。但如果暴力连边，边的数量将达到 $\Theta(mn^{2})$ 级别，复杂度不允许。

其实不需要真正地连边（事实上在上面的优化中已经体现了），希望在用循环实现的求最短路过程中，仿照最短路计数的方法计数。首先最小的 $i$ 向 $j$ 一定要连边，我们只需找其它哪些边 $h\to j$ 对最短路数量有贡献，并记录贡献大小即可。

因为最短路长度相同，需要保证 $d_{i}=d_{h}$，从 $l$ 到 $r$ 枚举 $h$。如果某个 $h$ 已经不满足 $d_{i}=d_{h}$，就可以结束循环了，这是由于本题的建图比较特殊，从每一个起点向后连的边权是递增的，进而最短路长度 $d$ 数组一定是递增的。

写出来是这样的：

```cpp  
vector dis(n + 1, Inf);
vector pcnt(n + 1, 0LL);
dis[0] = 0;
pcnt[0] = 1;
for (int j = 0; j < m; j++) {
    for (int l = 0, r = 1; r <= n; r++) {
        while (pre[r] - pre[l] > b[j]) l++;

        ll sum = 0;
        for (int h = l; h < r; h++) {
            if (dis[h] == dis[l]) {
                (sum += pcnt[h]) %= mod;
            } else {
                break;
            }
        }
        
        ll t = dis[l] + m - j - 1;
        if (t < dis[r]) {
            dis[r] = t;
            pcnt[r] = sum;
        } else if (t == dis[r]) {
            (pcnt[r] += sum) %= mod;
        }
    }
}
```

这样复杂度仍然很高，需要优化。

其实能够看出，上面内层 $h$ 的循环是有重复的。基于 $d$ 数组的单调性，我们可以用双指针优化：

```cpp
vector dis(n + 1, Inf);
vector pcnt(n + 1, 0LL);
dis[0] = 0;
pcnt[0] = 1;
for (int j = 0; j < m; j++) {
    ll sum = 0;
    for (int l = 0, r = 1, h = 0; r <= n; r++) {
        while (pre[r] - pre[l] > b[j]) {
            (sum -= pcnt[l]) %= mod;
            l++;
        }

        if (h < l) {
            h = l;
            sum = 0;
        }

        while (h < r) {
            if (dis[h] == dis[l]) {
                (sum += pcnt[h]) %= mod;
            } else {
                break;
            }
            h++;
        }
        
        ll t = dis[l] + m - j - 1;
        if (t < dis[r]) {
            dis[r] = t;
            pcnt[r] = sum;
        } else if (t == dis[r]) {
            (pcnt[r] += sum) %= mod;
        }
    }
}
```

时间复杂度 $\Theta(mn)$。完整代码：

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
constexpr ll Inf = 0x3f3f3f3f3f3f3f3f;
constexpr int mod = 1e9 + 7;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n, m;
        cin >> n >> m;

        vector<int> a(n), b(m);
        vector<ll> pre(n + 1);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
            pre[i + 1] = pre[i] + a[i];
        }
        for (int j = 0; j < m; j++) {
            cin >> b[j];
        }

        vector dis(n + 1, Inf);
        vector pcnt(n + 1, 0LL);
        dis[0] = 0;
        pcnt[0] = 1;
        for (int j = 0; j < m; j++) {
            ll sum = 0;
            for (int l = 0, r = 1, h = 0; r <= n; r++) {
                while (pre[r] - pre[l] > b[j]) {
                    (sum -= pcnt[l]) %= mod;
                    l++;
                }

                if (h < l) {
                    h = l;
                    sum = 0;
                }

                while (h < r) {
                    if (dis[h] == dis[l]) {
                        (sum += pcnt[h]) %= mod;
                    } else {
                        break;
                    }
                    h++;
                }
                
                ll t = dis[l] + m - j - 1;
                if (t < dis[r]) {
                    dis[r] = t;
                    pcnt[r] = sum;
                } else if (t == dis[r]) {
                    (pcnt[r] += sum) %= mod;
                }
            }
        }

        if (dis[n] != Inf) {
            cout << dis[n] << " " << ((pcnt[n] += mod) %= mod) << "\n";
        } else {
            cout << "-1\n";
        }
    }

    return 0;
}
```