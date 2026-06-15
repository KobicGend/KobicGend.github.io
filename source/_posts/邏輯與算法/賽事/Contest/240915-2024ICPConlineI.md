---
title: 2024 ICPC 網絡賽第一場
tags:
  - 題解
  - 筆記
  - ACM
  - 算法
  - 網絡賽
categories:
  - 邏輯與算法
  - 賽事
  - Contest
description: The 2024 ICPC Asia East Continent Online Contest (I)
highlight_shrink: true
abbrlink: f1fd8c4a
date: 2024-09-15 23:28:01
updated: 2024-09-15 23:28:01
---

## L. Bull Farm（建模，缩点）

考虑空位的移动，合法的按钮只有两种：要么是排列，要么只有两个数相同。对于前者，空位只能沿着排列移动，对于后者，是 $x\to a,x\to b$ 这样的形式，不难推导。

如果空位可以从 $u$ 移动到 $v$，则连一条有向边 $u\to v$。问题化为，只允许使用前 $c$ 组边，在有向图上 $a$ 是否可达 $b$。

对于固定的图，这是个很经典的问题，**先缩点，拓扑排序时用 bitset 维护即可**，参考 [洛谷 P10480 可达性统计](https://www.luogu.com.cn/problem/P10480)。

加上只允许使用前 $c$ 组边的限制，我们只需要 **离线询问**，不断加边。**每加一组边，重新缩点并拓扑排序**。

注意图比较特殊，要么是环（这样缩点之后就没有边了），要么是两条边，每次只有 $n+l$ 条边，缩点和拓扑排序的复杂度都是点数 + 边数（拓扑还有 bitset 的复杂度），跑 $l$ 次，再加上预处理连边的复杂度，最终复杂度是  $\Theta\big(l(n+l) \log n\big)$。

对多次 Tarjan 不熟，所以缩点之后又套了个并查集，应该是不需要的。

```cpp
int read() {
    char u, v;
    cin >> u >> v;
    return (u - 48) * 50 + v - 48;
}

const int N = 2008;

void eachT() {
    int n, l, q;
    cin >> n >> l >> q;

    vector<vector<pair<int, int>>> E(l + 1);
    for (int i = 1; i <= l; ++i) {
        vector<int> t(n + 1), cnt(n + 1);
        for (int j = 1; j <= n; ++j) {
            t[j] = read();
            cnt[t[j]] += 1;
        }
        int mul = -1, zero = -1, ok = 1;
        for (int j = 1; j <= n; ++j) {
            if (cnt[j] == 2) {
                if (mul == -1) mul = j;
                else ok = 0;
            }
            if (cnt[j] == 0) {
                if (zero == -1) zero = j;
                else ok = 0;
            }
        }
        if (!ok) continue;
        if (mul == -1) {
            for (int j = 1; j <= n; ++j) {
                E[i].emplace_back(j, t[j]);
            }
        }
        else for (int j = 1; j <= n; ++j) {
            if (cnt[t[j]] == 2) {
                E[i].emplace_back(j, zero);
            }
        }
    }

    vector<vector<tuple<int, int, int>>> que(l + 1);
    for (int i = 0; i < q; ++i) {
        int a = read(), b = read(), c = read();
        que[c].emplace_back(a, b, i);
    }

    vector<int> ans(q);
    vector<vector<int>> adj(n + 1);
    DSU dsu(n);
    for (int c = 0; c <= l; ++c) {
        for (auto& [u, v] : E[c]) {
            adj[dsu.find(v)].push_back(dsu.find(u));
        }

        // Tarjan
        vector<int> dfn(n + 1), low(n + 1), fa(n + 1);
        int unix = 0;
        stack<int> stk;
        auto dfs = [&](auto&& self, int u) -> void {
            dfn[u] = low[u] = ++unix;
            stk.push(u);
            for (auto& v : adj[u]) {
                if (!dfn[v]) self(self, v), low[u] = min(low[u], low[v]);
                else if (!fa[v]) low[u] = min(low[u], dfn[v]);
            }
            if (low[u] == dfn[u]) {
                int v;
                do {
                    v = stk.top(); stk.pop();
                    fa[v] = u;
                } while (v != u);
            }
        };
        for (int u = 1; u <= n; ++u) {
            if (!dfn[u]) dfs(dfs, u);
        }

        vector<vector<int>> tadj(n + 1);
        for (int u = 1; u <= n; ++u) {
            for (auto& v : adj[u]) {
                if (fa[u] != fa[v]) tadj[fa[u]].push_back(fa[v]);
            }
        }
        for (int u = 1; u <= n; ++u) {
            dsu.uno(fa[u], u);
            adj[u] = tadj[u];
            adj[u].erase(unique(adj[u].begin(), adj[u].end()), adj[u].end());
        }

        vector<int> deg(n + 1);
        vector<bitset<N>> dp(n + 1);
        for (int u = 1; u <= n; ++u) {
            for (auto v : adj[u]) {
                deg[v] += 1;
            }
        }
        queue<int> Q;
        for (int u = 1; u <= n; ++u) {
            dp[u][u] = 1;
            if (!deg[u]) Q.push(u);
        }
        while (!Q.empty()) {
            int u = Q.front(); Q.pop();
            for (auto to : adj[u]) {
                deg[to] -= 1;
                dp[to] |= dp[u];
                if (!deg[to]) Q.push(to);
            }
        }

        for (auto& [a, b, id] : que[c]) {
            if (dp[dsu.find(a)][dsu.find(b)] == 1) ans[id] = 1;
        }
    }

    for (int i = 0; i < q; ++i) {
        cout << ans[i];
    }
    cout << '\n';
}
```

UPD：如果强制在线也是可以做的。

把按钮编号看做权值，预处理从 $a$ 到 $b$ 的最短路（这里的最短指的是路径上权值最大的边最小），枚举起点跑 $n$ 次 BFS（类似堆优化 dijkstra）。

但全源最短路的复杂度是 $\Theta(mn)=\Theta(n^{3})$ 的，需要优化。减少边数的想法和上面类似：这道题的环很多，而且环中的点都是相互连通的。对于一个大小为 $k$ 的连通块，实际上只有 $k-1$ 条边是有用的，所以看似最坏有 $n$ 个环 $n^2$ 条边，有用的最多只有 $n-1$ 条。为保证双向连通，连双向边，这样总边数是 $2(n-1)+2l$，复杂度可以通过。

```cpp
void eachT() {
    int n, l, q;
    cin >> n >> l >> q;

    vector<vector<pair<int, int>>> E(n + 1);
    DSU dsu(n);
    for (int i = 1; i <= l; ++i) {
        vector<int> t(n + 1), cnt(n + 1);
        for (int j = 1; j <= n; ++j) {
            t[j] = read();
            cnt[t[j]] += 1;
        }
        int mul = -1, zero = -1, ok = 1;
        for (int j = 1; j <= n; ++j) {
            if (cnt[j] == 2) {
                if (mul == -1) mul = j;
                else ok = 0;
            }
            if (cnt[j] == 0) {
                if (zero == -1) zero = j;
                else ok = 0;
            }
        }
        if (!ok) continue;
        if (mul == -1) {
            for (int j = 1; j <= n; ++j) {
                if (dsu.uno(j, t[j])) {
                    E[j].emplace_back(i, t[j]);
                    E[t[j]].emplace_back(i, j);
                }
            }
        }
        else for (int j = 1; j <= n; ++j) {
            if (cnt[t[j]] == 2) {
                E[j].emplace_back(i, zero);
            }
        }
    }

    vector dis(n + 1, vector<int>(n + 1, 0x3f3f3f3f));
    for (int s = 1; s <= n; ++s) {
        vector<int> vis(n + 1);
        dis[s][s] = 0;
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> Q;
        Q.push({ 0, s });
        while (!Q.empty()) {
            auto [d, u] = Q.top(); Q.pop();
            if (vis[u]) continue;
            vis[u] = 1;
            for (auto& [w, v] : E[u]) {
                if (dis[s][v] > max(dis[s][u], w)) {
                    dis[s][v] = max(dis[s][u], w);
                    Q.push({ dis[s][v], v });
                }
            }
        }
    }

    while (q--) {
        int a = read(), b = read(), c = read();
        cout << (dis[a][b] <= c ? '1' : '0');
    }
    cout << '\n';
}
```

## C. Permutation Counting 4（思维）

我们画一个 $n\times n$ 的方阵，第 $i$ 行第 $j$ 列为 $1$ 当前仅当 $l_{i} \leqslant j \leqslant r_{i}$，即 $p_{i}$ 可能会取到 $j$。

熟知，黑白棋盘，可选择交换两行或交换两列，问能否在若干次操作后，使棋盘的主对角线均为黑色，可以用二分图的匈牙利算法解决。对于本题，如果能找到一些 $1$，它们分布在不同的行列，则有解，这实际上是二分图的最大匹配数。问方案数，那就是二分图的最大匹配的方案数。

上面写的没用，一方面时间复杂度不允许，另一方面，我们只关心奇偶性，不必求出具体方案数。

但是上面的思路启发我们 **从 $\mathtt{01}$ 矩阵考虑**。

考虑这几种情形：
- $[1,1],[2,2]$，唯一解；
- $[1,2],[2,2]$，唯一解；
- $[1,2],[1,2]$，两组解。

对于第三个情形，这两个 $[1,2]$ 中的数是可交换的，所以有两组解，如果有三组或更多可交换，还是偶数组解；对于第二个情形，$[1,2]$ 这个区间是取不到 $2$ 的，因为第二个区间只能取 $2$，所以要求差集，用 $[1,2]$ 减去 $[1,1]$，这个情形与 $[1,1],[2,2]$ 是等价的。

所以猜测，这些区间任意相减，答案奇偶性不变。

可以确定的是，单位阵的答案是奇数，而 $\begin{bmatrix}1&0&0\\0&1&0\\0&0&0\end{bmatrix}$ 这种不满秩的情形都是无解，即偶数。

那么结论就是：**当前仅当这个矩阵与单位阵等价时，答案为奇数**。

模拟这个化行阶梯矩阵的过程即可：

```cpp
void eachT() {
    int n;
    cin >> n;

    vector<vector<int>> v(n + 2);
    for (int i = 0; i < n; ++i) {
        int l, r;
        cin >> l >> r;
        v[l].push_back(r);
    }

    bool ok = 1;

    for (int l = 1; l <= n; ++l) {
        if (v[l].empty()) {
            ok = 0;
            break;
        }

        sort(v[l].begin(), v[l].end(), greater<>());
        int big = v[l][0];

        for (int j = 1; j < v[l].size(); ++j) {
            if (v[l][j - 1] == v[l][j]) {
                ok = 0;
                break;
            }
            int r = v[l][j];
            v[r + 1].push_back(big);
        }

        if (ok == 0) break;
    }

    cout << ok << '\n';
}
```

上面代码的复杂度不定，最坏可能到 $n^{2}$。仔细思考奇数和偶数矩阵的特点，如果是偶数那必定不满秩，也就是说，一定有几个区间加加减减会消掉，这些区间的端点会构成一个环。因此结论是，有环是偶数，否则是奇数。

环可以用并查集判断，时间复杂度 $\Theta(n)$。

```cpp
void eachT() {
    int n;
    cin >> n;

    DSU dsu(n);
    bool ok = 1;
    for (int i = 0; i < n; ++i) {
        int l, r;
        cin >> l >> r;
        l--;
        if (!dsu.uno(l, r)) {
            ok = 0;
        }
    }
    cout << ok << '\n';
}
```


## G. The Median of the Median of the Median（二分 + 前缀和）

先看两个很经典的题 [洛谷 P2824 排序](https://www.luogu.com.cn/problem/P2824)、 [AGC006D. Median Pyramid Hard](https://atcoder.jp/contests/agc006/tasks/agc006_d)。

类似的思路，二分答案为 $x$，将小于等于 $x$ 的数设为 $1$，否则为 $-1$，按题意模拟（其中求中位数就是看区间内数的总和与 $0$ 的大小）。

时间复杂度 $\Theta(n^{2}\log n)$。

```cpp
const int N = 2008;
int arr[N], sa[N];
int b[N][N], sb[N][N];

void eachT() {
    int n;
    cin >> n;

    for (int i = 1; i <= n; ++i) {
        cin >> arr[i];
    }

    auto check = [&](int x) {
        sa[0] = 0;
        for (int i = 1; i <= n; ++i) {
            int a = arr[i] <= x ? 1 : -1;
            sa[i] = sa[i - 1] + a;
        }
        for (int i = 1; i <= n; ++i) {
            for (int j = i; j <= n; ++j) {
                b[i][j] = sa[j] - sa[i - 1] >= 0 ? 1 : -1;
            }
        }
        for (int i = 1; i <= n; ++i) {
            for (int j = 1; j <= n; ++j) {
                sb[i][j] = sb[i - 1][j] + sb[i][j - 1] - sb[i - 1][j - 1] + b[i][j];
            }
        }
        int sum = 0;
        for (int i = 1; i <= n; ++i) {
            for (int j = i; j <= n; ++j) {
                int c = sb[j][j] - sb[i - 1][j] - sb[j][i - 1] + sb[i - 1][i - 1] >= 0 ? 1 : -1;
                sum += c;
            }
        }
        return sum >= 0;
    };

    int l = 0, r = 1e9 + 1;
    while (l <= r) {
        int mid = l + r >> 1;
        if (check(mid)) r = mid - 1;
        else l = mid + 1;
    }
    cout << l << '\n';
}
```


## F. Make Max（单调栈）

基于贪心，从最小的数开始，将每个数 $a_{i}$ 变成比它大一点点的数（严格地说，是左侧最近的比 $a_{i}$ 大的数，与右侧最近的比 $a_{i}$ 大的数的较小值），记为 $f_{i}$，如此反复。

为了记录能操作几次，倒着看这个过程，就有 $\operatorname{ans(i)}=\operatorname{ans}(f_{i})+1$。

「左侧最近的比 $a_{i}$ 大的数」可用单调栈求得。

时间复杂度 $\Theta(n\log n)$，时间在于离散化。

```cpp
void eachT() {
    int n;
    cin >> n;

    vector<int> a(n);
    vector<int> alls;
    vector<vector<int>> vec(n);  // 值为i的元素的下标
    for (int i = 0; i < n; ++i) {
        cin >> a[i];
        alls.push_back(a[i]);
    }

    // 离散化
    sort(alls.begin(), alls.end());
    unique(alls.begin(), alls.end());
    for (int i = 0; i < n; ++i) {
        a[i] = lower_bound(alls.begin(), alls.end(), a[i]) - alls.begin();
        vec[a[i]].push_back(i);
    }

    vector<int> lst(n), nxt(n);

    vector<int> stk;
    for (int i = 0; i < n; ++i) {
        while (!stk.empty() && a[i] >= a[stk.back()]) {
            stk.pop_back();
        }
        lst[i] = stk.empty() ? -1 : stk.back();
        stk.push_back(i);
    }

    stk.clear();
    for (int i = n - 1; i >= 0; --i) {
        while (!stk.empty() && a[i] >= a[stk.back()]) {
            stk.pop_back();
        }
        nxt[i] = stk.empty() ? -1 : stk.back();
        stk.push_back(i);
    }

    vector<int> ans(n);
    for (int j = n - 1; j >= 0; --j) {
        for (auto& i : vec[j]) {
            int fa;
            if (nxt[i] == -1 && lst[i] == -1) continue;
            if (nxt[i] == -1) fa = lst[i];
            else if (lst[i] == -1) fa = nxt[i];
            else if (a[nxt[i]] > a[lst[i]]) fa = lst[i];
            else fa = nxt[i];
            ans[i] = ans[fa] + 1;
        }
    }

    ll anss = 0;
    for (int i = 0; i < n; ++i) {
        anss += ans[i];
    }
    cout << anss << '\n';
}
```


## A. World Cup（思维）

蛮有意思的题目。

```cpp
void eachT() {
    int me;
    cin >> me;

    int rk = 1;
    for (int i = 1; i < 32; ++i) {
        int x;
        cin >> x;

        if (x > me) ++rk;
    }

    int ans;
    if (rk == 1) ans = 1;
    else if (rk <= 5) ans = 2;
    else if (rk <= 19) ans = 4;
    else if (rk <= 26) ans = 8;
    else if (rk <= 30) ans = 16;
    else ans = 32;

    cout << ans << '\n';
}
```

## M. Find the Easiest Problem（签到）

```cpp
void eachT() {
    int n;
    cin >> n;

    map<string, vector<string>> a;
    while (n--) {
        string name, id, op;
        cin >> name >> id >> op;

        if (op[0] == 'a') {
            a[id].push_back(name);
        }
    }

    string mx = "";
    for (auto& [k, vec] : a) {
        sort(vec.begin(), vec.end());
        vec.erase(unique(vec.begin(), vec.end()), vec.end());

        if (a[mx].size() < a[k].size()) {
            mx = k;
        }
    }

    cout << mx << '\n';
}
```