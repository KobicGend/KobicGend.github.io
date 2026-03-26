---
title: 2025 ICPC 西安补题记录 (8 题 BFGIJKLM)
tags:
  - 題解
  - 筆記
  - ACM
  - 算法
  - 區域賽
categories:
  - - 筆記
    - 區域賽
description: >-
  The 2025 ICPC Asia Xi'an Regional Contest (The 4th Universal Cup. Extra Stage
  1: Xi'an (Unrated))
highlight_shrink: true
abbrlink: 84f9628a
date: 2025-11-10 00:00:00
updated: 2025-11-10 00:00:00
---


牌线：4 / 5 快 / 7 / 10

喜欢 KM。

VP 反思：

- 读题时边读边写关键题意，不要读完后凭感觉回忆题目，全是错的。

- 如果输出复杂的题 WA 了，仔细列出可能哪个地方挂了，Yes No 判错了还是输出数量不对还是修改的位置不对，一一检查。


## [B. Beautiful Dangos](https://qoj.ac/contest/2562/problem/14682)（二分，分类讨论）【Hard】

**二分** 最优长度（当然可以通过双指针或者其它技巧省略二分）。

有了最优长度就可以遍历所有 $\mathcal{O}(n)$ 个可行区间，**对每个区间 check**。

check 的充分必要条件是 **对于三个字符，每个字符单独放的时候都合法**。（如果忽略边上两个，那么只需要出现次数最多的那个不超过 n/2。考虑边上两个也就加减 eps 的区别，还是 n/2 左右。如果最多的那个能放，那剩下两个也就都能放。考虑到会有并列最多，check 3个比较好。）

现在得到了最优区间以及一组可行端点。具体填法还需要做一些分类讨论，代码写得特别丑不过为了完整性还是放上来了。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

#define endl '\n'

constexpr int inf = 0x3f3f3f3f;

const string CWP = "CWP";

void solve() {
    int n;
    cin >> n;

    string s;
    cin >> s;

    for (auto& c : s) {
        c = CWP.find(c);
    }

    int l = n, r = -1;
    for (int i = 1; i < n; i++) {
        if (s[i] == s[i - 1]) {
            l = min(l, i);
            r = max(r, i - 1);
        }
    }

    if (l == n && r == -1) {
        cout << "Beautiful" << endl;
        return;
    }

    vector<array<int, 3>> pre(n + 1);
    for (int i = 0; i < n; i++) {
        pre[i + 1] = pre[i];
        pre[i + 1][s[i]]++;
    }

    if (ranges::max(pre[n]) > (n + 1) / 2) {
        cout << "Impossible" << endl;
        return;
    }

    cout << "Possible" << endl;

    array<int, 3> res{inf, inf, inf}; // len, L, R
    auto solve = [&](int l, int r) { 
        auto check = [&](int len) {
            // [l, r] subset [L, R]
            for (int L = 0; L + len - 1 < n; L++) {
                int R = L + len - 1;
                if (L <= l && r <= R) {
                    bool ok = true;
                    array<int, 3> cnt{};
                    for (int o = 0; o < 3; o++) {
                        cnt[o] = pre[R + 1][o] - pre[L][o];
                    }
                    for (int o = 0; o < 3; o++) {
                        int x = 0;
                        x += L > 0 && o == s[L - 1];
                        x += R < n - 1 && o == s[R + 1];
                        if (cnt[o] > (len + 1 - x) / 2) {
                            ok = false;
                        }
                    }
                    if (ok) {
                        return array{len, L, R};
                    }
                }
            }
            return array{inf, inf, inf};
        };
        int lo = r - l + 1;
        int hi = n + 1;
        while (lo < hi) {
            int mid = lo + hi >> 1;
            if (check(mid) != array{inf, inf, inf}) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        res = min(res, check(lo));
    };
    if (l != r + 1) {
        solve(l, r);
    } else {
        solve(l, l);
        solve(r, r);
    }

    int L = res[1];
    int R = res[2];

    assert(L < n && R < n);
    cout << L + 1 << " " << R + 1 << endl;

    array<int, 3> cnt{};
    for (int o = 0; o < 3; o++) {
        cnt[o] = pre[R + 1][o] - pre[L][o];
    }

    for (auto seq : {array{0, 1, 2}, {0, 2, 1}, {1, 0, 2}, {1, 2, 0}, {2, 1, 0}, {2, 0, 1}}) {
        for (int op = 0; op < 2; op++) {
            vector<int> vis(n);
            bool ok = true;
            for (int j = 0; j < 3; j++) {
                int o = seq[j];
                if (!ok) {
                    break;
                }
                if (op ? j == 0 : j) {
                    int i = L;
                    for (int _ = 0; _ < cnt[o]; _++) {
                        while (i <= R && vis[i]) {
                            i++;
                        }
                        if (i == R + 1) {
                            ok = false;
                            break;
                        }
                        vis[i] = true;
                        s[i] = o;
                        i += 2;
                    }
                } else {
                    int i = R;
                    for (int _ = 0; _ < cnt[o]; _++) {
                        while (i >= L && vis[i]) {
                            i--;
                        }
                        if (i == L - 1) {
                            ok = false;
                            break;
                        }
                        vis[i] = true;
                        s[i] = o;
                        i -= 2;
                    }
                }
            }
            if (!ok) {
                continue;
            }

            int l = n, r = -1;
            for (int i = 1; i < n; i++) {
                if (s[i] == s[i - 1]) {
                    l = min(l, i);
                    r = max(r, i - 1);
                }
            }
            if (l == n && r == -1) {
                for (auto& c : s) {
                    c = CWP[c];
                }
                cout << s << endl;
                return;
            }
        }
    }
    assert(false);
    return;
}

signed main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    int t;
    cin >> t;

    while (t--) {
        solve();
    }

    return 0;
}
```

## [F. Follow the Penguins](https://qoj.ac/contest/2562/problem/14686)（模拟）【Medium】

找到最快追上导师的人，计算其答案，并重新计算以它为导师的人的时间。重复这个过程，直到每个人都追上其导师。

用堆加速，存储（追上导师的时间，人），复杂度是 $\mathcal{O}(n\log n)$。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

#define endl '\n'

constexpr ll inf = 0x3f3f3f3f3f3f3f3f;

signed main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    int n;
    cin >> n;

    vector<int> target(n);
    vector<vector<int>> adj(n);
    for (int i = 0; i < n; i++) {
        cin >> target[i];
        target[i]--;
        adj[target[i]].push_back(i);
    }

    vector<int> pos(n);
    for (int i = 0; i < n; i++) {
        cin >> pos[i];
        pos[i] *= 2;
    }

    vector<int> dir(n);
    for (int i = 0; i < n; i++) {
        if (pos[target[i]] < pos[i]) {
            dir[i] = -1;
        } else {
            dir[i] = 1;
        }
    }

    set<pair<int, int>> s;
    for (int x = 0; x < n; x++) {
        if (dir[x] != dir[target[x]]) {
            s.insert({ abs(pos[target[x]] - pos[x]) / 2, x });  // 追上导师的时间，人
        }
    }

    vector<ll> res(n, -1);
    vector<ll> npos(n);
    while (!s.empty()) {
        auto [time, x] = *s.begin();
        s.erase(s.begin());

        if (res[x] != -1) {
            continue;
        }
        res[x] = time;
        npos[x] = pos[x] + res[x] * dir[x];

        for (auto y : adj[x]) {
            s.erase({ abs(pos[target[y]] - pos[y]) / 2, y });
            s.insert({ abs(npos[x] - pos[y]), y });
        }
    }
    for (auto x : res) {
        cout << x << " ";
    }
    cout << endl;

    return 0;
}
```

## [G. Grand Voting](https://qoj.ac/contest/2562/problem/14687)【Easy】

读错题 WA 一发，写错了又 WA 一发。

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    sort(a.begin(), a.end());
    int s = 0;
    for (int i = 0; i < n; i++) {
        if (s >= a[i]) {
            s++;
        } else {
            s--;
        }
    }
    int maxx = s;
    s = 0;
    for (int i = n - 1; i >= 0; i--) {
        if (s >= a[i]) {
            s++;
        } else {
            s--;
        }
    }
    int minn = s;

    cout << maxx << " " << minn << endl;

    return 0;
}
```


## [I. Imagined Holly](https://qoj.ac/contest/2562/problem/14689)（树，思维）【Medium】

类似于给定 $u,v$，求树上 $u-v$ 点权异或和那种题。本题中，$A_{u,v}=A_{1,u}\oplus A_{1,v}\oplus \operatorname{lca}(u,v)$。这就直接得到了每两个点的 lca。

再依据这个关系 **拓扑排序** 就能知道树的结构。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

#define endl '\n'

int main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    int n;
    cin >> n;

    vector a(n, vector<int>(n));
    for (int i = 0; i < n; i++) {
        for (int j = i; j < n; j++) {
            cin >> a[i][j];
            a[j][i] = a[i][j];
        }
    }

    vector<vector<int>> adj(n);
    for (int u = 0; u < n; u++) {
        for (int v = u; v < n; v++) {
            int lca = a[u][v] ^ a[0][u] ^ a[0][v];
            lca--;
            if (lca != u) {
                adj[lca].push_back(u);
            }
            if (lca != v) {
                adj[lca].push_back(v);
            }
        }
    }

    vector<int> deg(n);
    for (int x = 0; x < n; x++) {
        for (auto y : adj[x]) {
            deg[y]++;
        }
    }
    queue<int> Q;
    for (int x = 0; x < n; x++) {
        if (deg[x] == 0) {
            Q.push(x);
        }
    }

    vector<pair<int, int>> res;
    while (!Q.empty()) {
        auto x = Q.front();
        Q.pop();
        for (auto y : adj[x]) {
            if (--deg[y] == 0) {
                res.push_back({x, y});
                Q.push(y);
            }
        }
    }

    for (auto [x, y] : res) {
        cout << x + 1 << " " << y + 1 << endl;
    }

    return 0;
}
```


## [J. January's Color](https://qoj.ac/contest/2562/problem/14690)（树形 DP）【Medium】

最优的过程是：先间接得到 $x$ 的兄弟，将他们合并得到父节点 $x'$，再间接得到 $x'$ 的兄弟，将他们合并得到父节点 $x''$，如此反复，直至得到 $y$。

所以需要预处理三个东西：

- 间接得到 $x$ 的最小代价 $f$
- 间接得到 $x$ 的兄弟的最小代价 $g$
- 询问 $x \ 1$ 的答案 $\sum g$

这些都可以在树上 DFS 时求得，复杂度 $\mathcal{O}(n\log n)$。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

#define endl '\n'

constexpr ll inf = 0x3f3f3f3f3f3f3f3f;

int main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    int t;
    cin >> t;

    while (t--) {
        int n, q;
        cin >> n >> q;

        vector<ll> c(n);
        for (int i = 0; i < n; i++) {
            cin >> c[i];
        }

        vector<vector<int>> adj(n);
        for (int i = 1; i < n; i++) {
            int x, y;
            cin >> x >> y;
            x--;
            y--;
            adj[x].push_back(y);
            adj[y].push_back(x);
        }

        vector<int> parent(n, -1);
        vector<int> dfn(n), dfm(n), ord;
        auto dfs0 = [&](this auto self, int x) -> void {
            if (parent[x] != -1) {
                adj[x].erase(find(adj[x].begin(), adj[x].end(), parent[x]));
            }
            dfn[x] = ord.size();
            ord.push_back(x);
            for (auto y : adj[x]) {
                parent[y] = x;
                self(y);
            }
            dfm[x] = ord.size();
        };
        dfs0(0);

        vector<ll> f(n);  // get himself
        vector<ll> g(n);  // get his parent
        auto dfs1 = [&](this auto self, int x) -> void {
            f[x] = c[x];
            if (adj[x].empty()) {
                return;
            }
            int m = adj[x].size();
            vector<ll> v;
            for (auto y : adj[x]) {
                self(y);
                v.push_back(f[y]);
            }
            auto pre = v, suf = v;
            for (int i = 1; i < m; i++) {
                pre[i] = min(pre[i], pre[i - 1]);
            }
            for (int i = m - 2; i >= 0; i--) {
                suf[i] = min(suf[i], suf[i + 1]);
            }
            for (int i = 0; i < m; i++) {
                int y = adj[x][i];
                g[y] = inf;
                if (i > 0) {
                    g[y] = min(g[y], pre[i - 1]);
                }
                if (i < m - 1) {
                    g[y] = min(g[y], suf[i + 1]);
                }
            }
            sort(v.begin(), v.end());
            f[x] = min(f[x], v[0] + v[1]);
        };
        dfs1(0);

        vector<ll> sumg(n);
        auto dfs2 = [&](this auto self, int x) -> void {
            for (auto y : adj[x]) {
                sumg[y] = g[y] + sumg[x];
                self(y);
            }
        };
        dfs2(0);

        auto is_ancester = [&](int x, int y) {
            return dfn[x] <= dfn[y] && dfn[y] < dfm[x];
        };

        while (q--) {
            int x, y;
            cin >> x >> y;
            x--;
            y--;
            if (!is_ancester(y, x)) {
                cout << -1 << endl;
            } else {
                cout << sumg[x] - sumg[y] << endl;
            }
        }
    }

    return 0;
}
```

## [K. Killing Bits](https://qoj.ac/contest/2562/problem/14691)（图论建模，网络流）【Expert】

【题意】给定两个长度为 $n$ 的序列 $a,b \ (0 \leqslant a_{i},b_{i} \leqslant n-1)$，每次可以选择一个 permutation $p \ (0 \leqslant p_{i} \leqslant n-1)$，置 $a_{i} \gets a_{i} \operatorname{\&} p_{i}$，问能否操作多次将 $a$ 变成 $b$。$n \leqslant 5\times 10^{4}$。

非常妙妙题。

先说结论：特判掉 trivial cases 后，序列至少操作一次且满足 $a_{i} \operatorname{\&} b_{i}=b_{i}$，只需要检查是否存在一个 permutation $p$，满足 $b_{i}\operatorname{\&}p_{i}=b_{i}$ 即可。

必要性是显然的，如果用 $p$ 操作得到的 $b$ 是合法的结果，必然满足 $b_{i}\operatorname{\&}p_{i}=b_{i}$。下面说明充分性，需要证明若 $p$ 满足 $b_{i}\operatorname{\&}p_{i}=b_{i}$，则必然存在一种操作方法，能将 $a$ 变成 $b$。对于每个 $i$ 分别考虑。若 $b_{i}=p_{i}$，则 $a_{i}\gets b_{i}$ 已经成立。否则设 $j$ 满足 $b_{i}=p_{j}$，我们取 permutation $q$ 满足 $q_{i}=p_{j},\ q_{j}=p_{i}$。一方面，用 $q$ 操作后，$a_{i}\gets a_{i} \operatorname{\&} q_{i}\iff a_{i}\gets a_{i} \operatorname{\&} b_{i}$ 得到了我们想要的结果；另一方面，$a_{j}\gets a_{i} \operatorname{\&} q_{j}$ 不会有副作用，已知 $b_{i}\operatorname{\&}p_{i}=b_{i}\iff p_{j}\operatorname{\&}q_{j}=p_{j}$，且已知 $b_{j}\operatorname{\&}p_{j}=b_{j}$，所以 $b_{j}\operatorname{\&}q_{j}=b_{j}$，在操作 $a_{j}\gets a_{i} \operatorname{\&} q_{j}$ 之后仍然满足 $a_{j} \operatorname{\&} b_{j}=b_{j}$，没有影响。

这个东西可以用网络流判断：

- 源点连 $b_{i}$，容量为 1；
- $i$ 连 $i \mid 2^{k}$，容量为 $+\infty$，表示 AND 运算；
- $i$ 连汇点，容量为 1。

判断最大流是否为 $n$ 即可。

边数 $\mathcal{O}(n\log n)$，考虑到图结构，复杂度估计是不超过二分图匹配的复杂度 $\mathcal{O}(M\sqrt{ N }) = \mathcal{O}(n \sqrt{ n } \log n)$，可以通过。

```cpp
void solve() {
    int n;
    cin >> n;

    vector<int> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }

    vector<int> b(n);
    for (int i = 0; i < n; i++) {
        cin >> b[i];
    }

    for (int i = 0; i < n; i++) {
        if ((a[i] & b[i]) != b[i]) {
            cout << "No\n";
            return;
        }
    }

    if (a == b) {
        cout << "Yes\n";
        return;
    }

    int s = n;
    int t = s + 1;
    MaxFlow maxflow(t + 1);
    for (int i = 0; i < n; i++) {
        maxflow.add(s, b[i], 1);
        maxflow.add(i, t, 1);
        for (int bit = 0; bit < 20; bit++) {
            if (i >> bit & 1) {
                maxflow.add(i ^ (1 << bit), i, inf);
            }
        }
    }

    auto flow = maxflow.dinic(s, t);
    if (flow == n) {
        cout << "Yes\n";
    } else {
        cout << "No\n";
    }
    return;
}
```

## [L. Let's Make a Convex!](https://qoj.ac/contest/2562/problem/14692)（贪心，双指针）【Easy】

充要条件：**除最长边以外的边长和 $>$ 最长边**。

最长边确定后，可以从比它小的边中贪心选 $k-1$ 条长边，组成多边形的其它边。也就是说，**选出的边是连续区间**。

于是得到这样的过程：首先取最长的那条边（记为 $r$），并选取其它所有边（记最小的为 $l$），判断是否合法。如果合法，那么记录 $k=r-l$ 的答案，并令 $l\gets l+1$；如果不合法，说明需要调小最大边，令 $r\gets r-1$。模拟即可。

*双指针写越界 WA 了。*

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

#define endl '\n'

int main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    int t;
    cin >> t;
    
    while (t--) {
        int n;
        cin >> n;

        vector<ll> a(n);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }
        sort(a.begin(), a.end());

        vector<ll> pre(n + 1);
        for (int i = 0; i < n; i++) {
            pre[i + 1] = pre[i] + a[i];
        }
        
        int l = 0;
        int r = n - 1;
        vector<ll> ans(n);
        while (l <= r) {
            while (l > 0 && pre[r] - pre[l] <= a[r]) {
                l--;
                r--;
            }
            if (pre[r] - pre[l] > a[r]) {
                ans[r - l] = pre[r] - pre[l] + a[r]; 
                l++;
            } else {
                r--;
            }
        }

        for (auto x : ans) {
            cout << x << " ";
        }
        cout << endl;
    }

    return 0;
}
```

## [M. Mystique as Iris](https://qoj.ac/contest/2562/problem/14693)（状态机 DP）【Expert】

【题意】给定一个长度为 $n$ 的序列 $a$，问有多少种方案把 $-1$ 替换为 $1\sim m$ 的数，使得此序列可以通过若干次操作，每次可以选择一个两个相邻的数 $x,y$，置 $x\gets x-1,\ y\gets0$，然后删除所有的 0，最终将序列变空。$n \leqslant 10^{6},\ m \leqslant 10^{8}$。

妙妙题。

合法序列有三种：有 $2$ 到 $n-1$ 中任意一个数；头或尾是 1；有连续两个 1。此外全 1 且奇数需要特判一下。

现在，本质不同的数只有三种：$1$，$2\sim n-1$，$n\sim m$。

我们直接 DP 求解方案，考虑一个三个状态的状态机，状态 0 表示当前序列末尾是 1，状态 1 表示当前序列末尾是 $n\sim m$，状态 2 表示当前序列已经合法。只需要考虑一下从一个状态输入一个字符后到哪一个状态，以及这个转移的系数即可。

初始状态是 0，接受状态是 0 / 2。

复杂度 $\mathcal{O}(n)$。

![[../Untitled/img/ce187b85667f0576573edf0b3e6cff5a_720.png]]

```cpp
void solve() {
    int n, m;
    cin >> n >> m;

    array<Z, 3> f{1, 0, 0}; 
    bool allone = n & 1;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        if (x != -1 && x != 1) {
            allone = false;
        }
        array<Z, 3> nf;
        if (x == -1 || x == 1) {
            nf[2] += f[0];
            nf[0] += f[1];
            nf[2] += f[2];
        }
        if (x == -1 || x >= n) {
            Z coef = x == -1 ? max(0, m - n + 1) : 1;
            nf[1] += coef * f[0];
            nf[1] += coef * f[1];
            nf[2] += coef * f[2];
        }
        if (x == -1 || 2 <= x && x <= n - 1) {
            Z coef = x == -1 ? (min(m, n - 1) - 1) : 1;
            nf[2] += coef * f[0];
            nf[2] += coef * f[1];
            nf[2] += coef * f[2];
        }
        f = nf;
    }
    cout << (f[0] + f[2] - allone) << endl;
}
```
