---
title: 2024 ICPC 南京补题记录 (8 题 BCEGIJKM)
tags:
  - 題解
  - 筆記
  - ACM
  - 算法
  - 區域賽
categories:
  - posts_acm
  - 賽事
  - Contest
description: >-
  The 2024 ICPC Asia Nanjing Regional Contest (The 3rd Universal Cup. Stage 16:
  Nanjing)
highlight_shrink: true
abbrlink: faa769f
date: 2025-10-15 00:00:00
updated: 2025-10-15 00:00:00
---

[The 3rd Universal Cup. Stage 16: Nanjing - Dashboard - Contest - QOJ.ac](https://qoj.ac/contest/1828)

出题人预测难度：EJ BK GIM ACF DH L
实际通过人数排序：EJ KGB C IMF AHDL
个人难度排序：EJ BM GK IC
牌线：3/4/5特快

## B. Birthday Gift（思维）【Medium】

*太像 CF。赛时 297 极限通过。*

【题意】给定 $012$ 串，最优化操作若干次，每次自选：
- 将某个 $2$ 改为 $0$ 或 $1$；
- 选择两个相邻的 $0$ 消去，剩余部分连接；
- 选择两个相邻的 $1$ 消去，剩余部分连接。

最小化最终序列长度。数据范围：$n \leqslant 2\times 10^{5}$。

奇数位的两个 0 一定不能互相消去，相邻（也就是奇偶性不同的）两个 0 一定可以消去。我们记录互消之后剩下的 0 和 1，贪心地将 2 变成 0 和 1 即可。

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;

    while (t--) {
        string s;
        cin >> s;

        int cnt2 = 0, cnt[2][2]{};
        for (int i = 0; i < s.size(); i++) {
            if (s[i] == '2') {
                cnt2++;
            } else {
                cnt[i & 1][s[i] - '0']++;
            }
        }

        int cnt1 = abs(cnt[0][1] - cnt[1][1]);  // 剩下的1
        int cnt0 = abs(cnt[0][0] - cnt[1][0]);  // 剩下的0

        int tmp = min(cnt0, cnt2);  // 用2消0
        cnt2 -= tmp;
        cnt0 -= tmp;

        tmp = min(cnt1, cnt2);  // 用2消1
        cnt2 -= tmp;
        cnt1 -= tmp;

        cnt2 %= 2;  // 剩下的2两两互消

        cout << (cnt0 + cnt1 + cnt2) << endl;
    }

    return 0;
}
```

官方题解先将奇数位 01 互换，本质是一样的。

花絮：赛后补题，队长写了一份极短的代码 AC 了，被队友质疑。然后就……发现这题数据弱了（数据竟然没有小数据暴力），样例是唯一的 $n$ 为奇数的情形。好在问题不大，赛时应该没有放过错解。现在出题组已经添加大量 Hack 数据。


## C. Topology（Top-down 树形+组合计数 DP）【Legendary】

【题意】外向树，对每个 $i$ 求满足 $w_{i}=i$ 的拓扑序计数。$n \leqslant 5000$。

约定 $p_{u}$ 表示父节点，$s_{u}$ 表示子树大小。节点编号与拓扑序编号均为 0-index。

**引理**（拓扑序计数）给定一棵树，在点上写一个排列，使得每个点的点权比其父亲的数大的方案数，这等价于，满足每个节点的父亲排在他前面的排列方案数为 $\dfrac{n!}{\prod_{i=0}^{n-1} s_{i}}$。

对于本题，考虑树形 DP，常见的 $f_{p_{u}}\leftarrow f_{u}$ 不易转移（没有办法处理子树的合并，子树间相互影响），因此考虑从根到叶的 DP，也就是 $f_{u}\leftarrow f_{p_{u}}$。

**状态表示**：
设 $f_{u,i}$ 表示处理除去 $u$ 子树以外的其它节点，且限制在 $u$ 处填 $i$，拓扑序方案数。

**状态转移**：
对于转移 $f_{u,j}\leftarrow f_{p_{u},i}$，也就是 $p_{u}$ 填 $i$，$u$ 填 $j$，需要同时处理在 $p_{u}$ 子树而不在 $u$ 子树的其它节点。下面从空位和顺序两个步骤讨论转移系数。

空位：

错误的方法：由于 $u$ 子树的节点必须放在 $u$ 后面，所以 $u$ 后面至少要留 $s_{u}-1$ 个给子树节点。由由于 $u$ 填 $j$，$u$ 后面有 $n-j-1$ 个空位，所以选择的方案数是 $\dbinom{n-j-1}{s_{u}-1}$。这不是转移系数，因为如果已经钦定 $u$ 子树中节点的位置，DP 就有后效性了。

正确的方法：需要 $p_{u}$ 后面至少要留 $s_{p_{u}}-1$ 个给子树，除去 $u$ 子树中 $s_{u}$ 那些节点，现在需要钦定的只有 $s_{p_{u}}-1-s_{u}$ 个节点，因此选择的方案数是 $\dbinom{n-i-1-s_{u}}{s_{p_{u}}-1-s_{u}}$。

顺序：需要计算 $u$ 所有兄弟节点的子树拓扑序方案数。根据上面的引理，$v$ 子树的拓扑序计数是 $\dfrac{s_{v}!}{\prod_{i\in s_{v}} s_{i}}$，因此所需方案数是
  $$
  \prod_{v}\dfrac{s_{v}!}{\prod_{i\in s_{v}} s_{i}}=\dfrac{(s_{p_{u}}-s_{u})!}{\big(\prod_{i\in s_{p_{u}}} s_{i}\big)/\big(\prod_{i\in s_{u}} s_{i}\big)}
  $$

因此得到转移
$$
f_{u,j} = \sum_{i=0}^{j-1} \dbinom{n-i-1-s_{u}}{s_{p_{u}}-1-s_{u}}\dfrac{(s_{p_{u}}-s_{u})!}{\big(\prod_{i\in s_{p_{u}}} s_{i}\big)/\big(\prod_{i\in s_{u}} s_{i}\big)}f_{p_{u},i}
$$
这样的转移是 $\mathcal{O}(n^{2})$ 的，不难用前缀和优化到 $\mathcal{O}(n)$。

**最终答案：**
$$
\dbinom{n-i-1}{s_{u-1}}\dfrac{s_{u}!}{\prod_{i\in s_{u}} s_{i}}f_{u,i}
$$

总复杂度 $\mathcal{O}(n^{2})$。

```cpp
void solve() {
    int n;
    cin >> n;
    
    vector<int> p(n, -1); 
    for (int u = 1; u < n; u++) {
        cin >> p[u];
        p[u]--;
    }
    
    vector<int> siz(n, 1); // 子树大小
    for (int u = n - 1; u; u--) {
        siz[p[u]] += siz[u];
    }

    vector<Z> psiz(n);  // 子树的siz之积
    for (int u = 0; u < n; u++) {
        psiz[u] = siz[u];
    }
    for (int u = n - 1; u; u--) {
        psiz[p[u]] *= psiz[u];
    }
    
    vector f(n, vector<Z>(n));
    f[0][0] = 1;
    for (int u = 1; u < n; u++) {
        Z tmp = Fac(siz[p[u]] - siz[u] - 1) / psiz[p[u]] * psiz[u] * siz[p[u]];
        Z pre = 0;
        for (int j = 0; j < n; j++) {
            f[u][j] += pre * tmp;
            pre += f[p[u]][j] * Binom(n - 1 - j - siz[u], siz[p[u]] - 1 - siz[u]);
        }
    }
    
    for (int i = 0; i < n; i++) {
        int u = i;
        cout << (f[u][i] * Binom(n - 1 - i, siz[u] - 1) * Fac(siz[u]) / psiz[u]) << " \n"[i == n - 1];
    }
}
```

## E. Left Shifting 3【Easy】

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n, k;
        cin >> n >> k;
        k = min(n, k);

        string s;
        cin >> s;
        s += s;
        s = ' ' + s;

        vector<int> f(2 * n);
        for (int i = 0; i + 6 < 2 * n; i++) {
            if (s.substr(i, 7) == "nanjing") {
                f[i]++;
            }
            f[i + 1] += f[i];
        }

        int maxx = 0;
        for (int i = 0; i <= k; i++) {
            maxx = max(maxx, f[max(0, n + i - 6)] - f[i]);
        }
        cout << maxx << endl;
    }

    return 0;
}
```

## G. Binary Tree（树的重心）【Hard】

【题意】给定一棵二叉树，找隐藏的特殊节点，每次询问 $x,y$，返回这两者到特殊节点的距离大小关系，至多 $\lfloor \log_{2}n \rfloor$ 次。$n \leqslant 10^{5}$。

*这个题太妙了。这道题考察了算法思想（类似点分治），但并不是传统的点分治。而且降低门槛，让所有队伍有条件分析研究出这个算法思想。并不是抄个板子，把算法单纯地作为工具。个人认为这是算法竞赛的大趋势。*

问直径是不行的，每问 $\log_{2}k$ 次可以砍掉 $k$ 个节点，$n=\sum k$，则 $\sum\log_{2}k=\log_{2}\prod k>\log_{2}\sum k=\log_{2}n$，次数超了。

希望每次询问砍掉 **至少一半** 的节点，考虑问重心。

每个点至多有三个相邻节点 $x,y,z$，按称假砝码的思路，问其中两个节点 $x,y$，若 $d_{x}>d_{y}$ 则在 $y$ 那边，若 $d_{x}<d_{y}$ 则在 $x$ 那边，若 $d_{x}=d_{y}$ 则在 $z$ 那边，**或者是重心自己**。

问题出在至少一半和或者是重心自己，如果总共 $5$ 个节点，且 $s_{x}=1,s_{y}=1,s_{z}=2$，且问到 $d_{x}=d_{y}$，那么剩下的是 $z$ 那边的子树或重心自己，剩下了 $3$ 个节点，这是不行的。所以问其中两个节点 $x,y$ 不是任意选的，应当**问子树大小较大的两个**。

这样每次询问一定能（严格地）砍掉至少一半的节点。

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll = long long;
using ull = unsigned long long;
using ulll = unsigned __int128;

void solve() {
    int n;
    cin >> n;

    int cnt = 0, cntmax = __lg(n);
    auto query = [&](int x, int y) {
        assert(++cnt <= cntmax);
        cout << "? " << (x + 1) << " " << (y + 1) << endl;
        cin >> x;
        return x;
    };
    auto answer = [&](int x) {
        cout << "! " << (x + 1) << endl;
    };

    vector<vector<int>> adj(n);
    for (int x = 0; x < n; x++) {
        for (int _ = 0; _ < 2; _++) {
            int y;
            cin >> y;
            if (y == 0) continue;
            y--;
            adj[x].push_back(y);
            adj[y].push_back(x);
        }
    }

    int s = 0;
    while (1) {
        // 找重心 begin
        vector<int> siz(n, 1);
        [&](this auto&& self, int x, int p = -1) -> void {
            for (const auto& y : adj[x]) {
                if (y == p) {
                    continue;
                }
                self(y, x);
                siz[x] += siz[y];
            }
        } (s);

        vector<int> mss(n);
        [&](this auto&& self, int x, int p = -1) -> void {
            for (const auto& y : adj[x]) {
                if (y == p) {
                    continue;
                }
                self(y, x);
                mss[x] = max(mss[x], siz[y]);
            }
            mss[x] = max(mss[x], siz[s] - siz[x]);
        } (s);

        int ctr = [&](this auto&& self, int x, int p = -1) -> int {
            for (const auto& y : adj[x]) {
                if (y == p || 2 * siz[y] <= siz[s]) {
                    continue;
                }
                return self(y, x);
            }
            return x;
        } (s);
        // 找重心 end

        if (adj[ctr].empty()) {
            answer(ctr);
            break;
        } else if (adj[ctr].size() == 1) {
            int x = ctr, y = adj[ctr][0];
            int res = query(x, y);
            if (res == 0) {  // d(x) < d(y)
                answer(x);
                break;
            } else {  // d(x) > d(y)
                answer(y);
                break;
            }
        } else {
            ranges::sort(adj[ctr], {}, [&](int x) { return mss[x]; });
            int x = adj[ctr][0], y = adj[ctr][1];
            int res = query(x, y);
            if (res == 0) {  // d(x) < d(y)
                s = x;
                adj[s].erase(ranges::find(adj[s], ctr));
            } else if (res == 2) {  // d(x) > d(y)
                s = y;
                adj[s].erase(ranges::find(adj[s], ctr));
            } else {  // d(x) == d(y)
                s = ctr;
                adj[s].erase(adj[s].begin());
                adj[s].erase(adj[s].begin());
            }
        }
    }
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

花絮：赛时 assert 的写法是这样的，

```cpp
cntt = 0;
maxx = 1 << __lg(n);  // 应当是 maxx = __lg(n);
```

所以没有 RE ，队长赛后感慨人工智能时代交互也变聪明了，非适应交互变成了适应性交互。「他会在知道我 WA 的时候让我 WA 掉，这时候还没超次数……」

## I. Bingo（组合计数，多项式）【Master】

【题意】给定 $N,M$ 和一个长度为 $NM$ 的数组 $A = (A_{1}, A_{2},\dots , A_{NM})$，将其打乱之后填入 $N \times M$ 的网格中。定义 Bingo 数为最小的整数 $k$，满足存在至少一行或者一列，其中所有的数都 $\leqslant k$。要求出所有 $(NM)!$ 种打乱方式的 Bingo 整数之和，对 998244353 取模。$NM \leqslant 200000$。

（*个人习惯用小写表示指标，大写表示常量，这样可以清楚地看出哪些是可以尝试优化的临时变量*）

**Part 1 - Min-Max 反演**

先考虑对于某一种确定的填数方法，Bingo 数是什么。

「所有的数都 $\leqslant k$」表明这一行（列）的最大值 $\leqslant k$；存在至少一行或者一列，且要 $k$ 最小，则网格 Bingo 数为所有行列的最大值的最小值。更具体地，对于每一行（列），设 $x_{i}$ 为该行（列）的最大值，并设 $S$ 为所有行（列）的 $x_{i}$ 的集合，则 Bingo 数为 $\min(S)$。

最大值的最小值不好处理，考虑 **Min-Max 反演**（Min-Max 容斥），转化为最大值的最大值。

> 对于一个集合 $S$，其最小值（即全部元素的最小值，记作 $\min(S)$）与最大值可以由下式求得：
> $$
> \boxed{
> \begin{aligned}
> \displaystyle \min(S) = \sum_{\varnothing \neq T \subset S}^{} (-1)^{|T|-1} \max(T), \\
> \displaystyle \max(S) = \sum_{\varnothing \neq T \subset S}^{} (-1)^{|T|-1} \min(T).
> \end{aligned}
> }
> $$
回到本题，所求答案为所有 $(N M)!$ 种打乱方式的 $\min(S)$ 之和，这可以用 $\max(T)$ 表示。

$x_{i}$ 为该行（列）的最大值，$S$ 表示所有行（列）的 $x_{i}$ 的集合。$T$ 表示 $S$ 的子集，也即选择的 $n$ 行 $m$ 列的 $x_{i}$ 的集合，而 $x_{i}$ 表示某一行（列）的最大值，所以 $T$ 表示选择的 $n$ 行 $m$ 列的所有元素的最大值。

**Part 2 - 计数**

不妨设序列从小到大排列，对于每一个 $k=1,2,\dots,NM$，若 $\max(T)=A_{k}$，下求有多少种填数方法。

设选择了 $n$ 行 $m$ 列，选择方案为 $\displaystyle \binom{N}{n} \binom{M}{m}$，且一共选择了 $c = M n + N m - n m$ 个元素，$T$ 的元素数量为 $|T|=n+m$。

由于 $\max(T)=A_{k}$，则比 $A_{k}$ 小的 $k-1$ 个元素还需要选择 $c-1$ 个，总共这 $c$ 个元素任意填，方案数 $\displaystyle \binom{k-1}{c-1} c!(N M-c)!$。

于是答案为 
$$
\begin{aligned}
\min(S) 
&= \sum_{\varnothing \neq T \subset S}^{} (-1)^{|T|-1} \max(T)
\\
&= \sum_{k=1}^{N M}\sum_{n=1}^{N}\sum_{m=1}^{M} (-1)^{n+m-1}
A_{k} \binom{N}{n} \binom{M}{m} \binom{k-1}{c-1} c!(N M-c)!
\end{aligned}
$$
表示选择了 $n$ 行 $m$ 列，且最大值为 $a_{k}$ 时的答案对 $n,m,k$ 求和。

暴力求需要三重循环枚举 $n,m,k$，复杂度是 $\mathcal{O}[(N M)^2]$。

**Part 3 - 卷积优化**

将式子转化为卷积快速求解。我们要求的是这一坨 
$$
\sum_{k=1}^{N M}\sum_{n=1}^{N}\sum_{m=1}^{M} (-1)^{n+m-1}
A_{k} \binom{N}{n} \binom{M}{m} \binom{k-1}{c-1} c! (N M-c)!
$$
交换求和号
$$
\sum_{n = 1}^{N} \sum_{m = 1}^{M} (-1)^{n+m-1} \binom{N}{n} \binom{M}{m} \cdot 
\sum_{k=1}^{N M} A_{k} \binom{k-1}{c-1} \cdot c! (N M-c)!
$$

考察
$$
\sum_{k=1}^{N M} A_{k} \binom{k-1}{c-1} \cdot c! (N M-c)!
$$
对于固定的 $c$，把 $k$ 优化掉，
$$
\begin{aligned}
&= \sum_{k=1}^{N M} A_{k} \cdot \frac{(k-1)!}{(c-1)!(k-c)!} \cdot c! (N M-c)!
\\ 
&= \sum_{k=1}^{N M} \frac{A_{k} (k-1)!}{(k-c)!} \cdot c (N M-c)!
\\ 
&= c (N M-c)! \cdot \sum_{k=1}^{N M} \frac{A_{k} (k-1)!}{(k-c)!}
\end{aligned}
$$

进一步考察
$$
F[c] = \sum_{k=1}^{N M} \frac{A_{k} (k-1)!}{(k-c)!}
$$
设 $f[n] = A_{n} (n-1)!$，$g[n] = \dfrac{1}{(N M - n)!}$，做卷积 $h = f \ast g$，得到
$$
h[n] 
= \sum_{k = 0}^{n} f[k] \cdot g[n-k]
= \sum_{k = 0}^{n} \frac{A_{k} (k-1)!}{(N M - n + k)!}
$$
可见
$$
h[N M + c]
= \sum_{k=1}^{N M} \frac{A_{k} (k-1)!}{(k-c)!}
$$
就是我们需要的 $F$，即 $F[c] = h[N M + c]$。

总答案
$$
\sum_{n = 1}^{N} \sum_{m = 1}^{M} (-1)^{n+m-1} \binom{N}{n} \binom{M}{m} \cdot c(N M-c)!\cdot h[N M + c]
$$
其中 $c = M n + N m - n m$。

预处理阶乘和组合数，先求 $h$ 数组，再二重循环枚举 $n,m$，总时间复杂度 $\mathcal{O}(N M\log N M)$。

```cpp
int main() {
    int N, M;
    cin >> N >> M;

    vector<int> a(N * M + 1);
    for (int i = 1; i <= N * M; i++) {
        cin >> a[i];
    }
    sort(a.begin(), a.end());

    vector<Z> f(N * M + 1);
    vector<Z> g(N * M + 1);
    for (int i = 1; i <= N * M; i++) {
        f[i] = a[i] * fac[i - 1];
    }
    for (int i = 0; i <= N * M; i++) {
        g[i] = invfac[N * M - i];
    }
    auto h = f * g;

    Z res = 0;
    for (int n = 0; n <= N; n++) {
        for (int m = 0; m <= M; m++) {
            int c = M * n + N * m - n * m;
            res += (n + m & 1 ? 1 : -1) 
                  * binom(N, n) * binom(M, m) 
                  * c * fac[N * M - c] * h[N * M + c];
        }
    }
    cout << res << endl;
}
```

## J. Social Media【Easy】

第二个签到。枚举一条边的两个端点，或者选择两个度最大的点而不考虑之间的边。

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n, m, k;
        cin >> k >> m >> n;

        vector<int> good(n);
        while (k--) {
            int x;
            cin >> x;
            x--;
            good[x] = 1;
        }

        map<pair<int, int>, int> edge;
        vector<int> deg(n);
        int sum = 0;
        while (m--) {
            int x, y;
            cin >> x >> y;
            x--, y--;
            if (x > y) swap(x, y);
            if (good[x] && good[y]) {
                sum++;
            } else if (x == y) {
                deg[x]++;
            } else if (good[x]) {
                deg[y]++;
            } else if (good[y]) {
                deg[x]++;
            } else {
                edge[{ x, y }]++;
            }
        }

        int ans = 0;
        for (auto [e, w] : edge) {
            auto [x, y] = e;
            ans = max(ans, deg[x] + deg[y] + w);
        }

        sort(deg.begin(), deg.end(), greater<>());
        ans = max(ans, n == 1 ? deg[0] : deg[0] + deg[1]);

        ans += sum;
        cout << ans << "\n";
    }

    return 0;
}
```


## K. Strips（贪心）【Hard】

*贪心，好难。*

【题意】有 $w$ 个格子排成一行。这些格子 中，有 $n$ 个是红色的，$m$ 个是黑色的，剩下的格子是白色的。接下来需要用一些不相交的纸条覆盖所有红色格子。每张纸条必须覆盖 $k$ 个连续的格子。每个红色格子都要被覆盖，每个黑色格子都不能被覆盖，且纸条数要尽量小。构造一个方案。

先不考虑格子的右边界，贪心地放纸条，这样可以保证最小数量。

再加上右边界，如果纸条超出边界或重合就向左挪动，逐步调整，这样可以保证在数量不变的同时使之合法。

如果超出左边界，就说明不合法，那一定无解。有解时，数量已经保证最小，且在挪动过程中找到了一组可行方案。

实现起来不是很简单。

版本 1：

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n, m, k, w;
        cin >> n >> m >> k >> w;

        vector<pair<int, int>> a(n + m + 2);
        for (int i = 0; i < n; i++) {
            int x;
            cin >> x;
            a[i] = { x, 1 };
        }
        for (int i = 0; i < m; i++) {
            int x;
            cin >> x;
            a[i + n] = { x, 0 };
        }
        a[n + m] = { w + 1, 0 };
        sort(a.begin(), a.end());

        bool ok = 1;
        vector<int> anss;
        int L = 0, R = 0;
        for (int i = 0; i < a.size(); i++) {
            if (a[i].second) continue;   // 跳过红点
            L = R, R = i;
            vector<int> ans;
            for (int j = L + 1; j < R; j++) {
                int tmp = a[j].first;
                ans.push_back(tmp);
                while (j + 1 < R && a[j + 1].first < tmp + k) j++;
            }
            if (ans.empty()) continue;
            ans.push_back(a[R].first);  // 最后一个不能超过右边界
            for (int j = ans.size() - 1; j; j--) {
                if (ans[j - 1] > ans[j] - k) {
                    ans[j - 1] = ans[j] - k;  // 有重叠就移动
                }
            }
            if (ans[0] <= a[L].first) {  // 第一个不能超过左边界
                ok = 0;
                break;
            }
            ans.pop_back();
            for (auto x : ans) {
                anss.push_back(x);
            }
        }

        if (!ok) {
            cout << -1 << endl;
        } else {
            cout << anss.size() << endl;
            for (auto x : anss) {
                cout << x << " ";
            }
            cout << endl;
        }
    }

    return 0;
}
```

版本 2：

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
const ll N = 2e5 + 10;
const ll inf = 1e18;

void eachT()
{
    int n, m, k, w;
    cin >> n >> m >> k >> w;
    vector<int> a(n), b(m + 2);
    for (int i = 0; i < n; i++)
    {
        cin >> a[i];
    }
    sort(a.begin(), a.end());
    for (int i = 1; i <= m; i++)
    {
        cin >> b[i];
    }
    b[0] = 0;
    b[m + 1] = w + 1;
    sort(b.begin(), b.end());

    bool ok = 1;
    vector<int> res;

    auto solve = [&](vector<ll>& a, int& l, int& r) -> void
    {
        vector<int> pos;
        int len = a.size();
        for (int i = 0; i < len; )
        {
            pos.push_back(a[i] + k - 1);
            int p = upper_bound(a.begin(), a.end(), a[i] + k - 1) - a.begin();
            if (a[p] == r)
            {
                for (auto x : pos)
                {
                    res.push_back(x - k + 1);
                }
                return;
            }
            else if (a[p] == inf)
            {
                pos[pos.size() - 1] = r - 1;
                for (int j = pos.size() - 1; j >= 0; j--)
                {
                    if (pos[j] - k + 1 <= l)
                    {
                        ok = 0;
                        return;
                    }
                    if (j >= 1 && pos[j] - k + 1 <= pos[j - 1])
                    {
                        pos[j - 1] = pos[j] - k;
                    }   
                    else
                    {
                        for (auto x : pos)
                        {
                            res.push_back(x - k + 1);
                        }
                        return;
                    }
                }
            }
            else
            {
                i = p;
            }
        }
    };

    int now = 1;
    vector<ll> aa;
    for (int i = 0; i < n;)
    {
        if (!ok)
        {
            break;
        }
        while (a[i] > b[now])
        {
            now++;
        }
        while (a[i] <= b[now])
        {
            aa.push_back(a[i]);
            i++;
            if (i >= n)
            {
                break;
            }
        }
        aa.push_back(b[now]);
        aa.push_back(inf);
        solve(aa, b[now - 1], b[now]);
        aa.clear();
        now++;
        
    }
    if (!ok)
    {
        cout << -1 << endl;
    }
    else
    {
        cout << res.size() << endl;
        for (auto x : res)
        {
            cout << x << " ";
        }
        cout << endl;
    }

}

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(0), cout.tie(0);

    int T = 1;
    cin >> T;
    while (T--)
    {
        eachT();
    }
}

```


## M. Ordainer of Inexorable Judgment（计算几何）【Medium】

*没有用到叉乘的计算几何。补题感觉并不难，但赛时通过人数极少。*

【题意】给定二维平面的区域是一条以原点为端点的射线和所有距离射线 $\leqslant d$ 的点的集合。射线的初始方向向量给定，会以每个单位时间 1 弧度的顺序旋转。给定一个 $n$ 个顶点的凸多边形，保证凸多边形目标距离原点 $>d$。求区间在时间 $[0,t]$ 中区域与凸多边形有交的时间区间长度。

临界状态是凸多边形顶点做半径为 $d$ 的圆的 $2n$ 条切线，算出这些切线的倾斜角，找到多边形所在半平面内的最大最小的倾斜角。

一些 Tip：

- 如何求切线：可以按高中解析几何思路暴力解方程，也可以直接用角度关系得到切点的倾斜角。
- 初始方向的处理：将所有切线的倾斜角减去初始倾斜角。
- 如何找所在半平面：排序后看相邻两项，如果超过 $\pi$，这两项就是分界线。
- 半平面跨过 $x=0$ 如何处理：取反，求打不到的区间，这个区间是不会跨过 $x=0$ 的。

```cpp
#include <bits/stdc++.h>
using namespace std;

using numbers::pi;  // acos(-1.0)
using Point = complex<double>;

int main() {
    cout << fixed << setprecision(15);
    
    int N, x, y, Rad, T;
    cin >> N >> x >> y >> Rad >> T;

    Point P0 = Point(x, y);
    double t0 = arg(P0);

    vector<double> alpha;
    alpha.reserve(2 * N);
    for (int i = 0; i < N; i++) {
        int x, y;
        cin >> x >> y;
        Point Q = Point(x, y);
        double phi = acos(Rad / abs(Q));   // 切点-原点-多边形顶点 形成的角度
        // 切点的角 arg(Q) + phi
        // 切点 H = polar(Rad, arg(Q) + phi)
        // 切点-多边形顶点 向量 Q - H
        // 这个向量的倾斜角 arg() 即是所求
        alpha.push_back(arg(Q - polar((double)Rad, (arg(Q) + phi))));
        // 另外一边的切线同理
        alpha.push_back(arg(Q - polar((double)Rad, (arg(Q) - phi))));
    }
    
    // 减去初始角度
    for (int i = 0; i < 2 * N; i++) {
        alpha[i] -= t0;
        if (alpha[i] < 0) alpha[i] += 2 * pi;
    }
    ranges::sort(alpha);

    double lo = -1, hi = -1;
    bool flag = 1;
    if (alpha[0] + pi > alpha.back()) {
        lo = alpha[0], hi = alpha.back();
        flag = 0;
    } else for (int i = 1; i < 2 * N; i++) {
        if (alpha[i - 1] + pi < alpha[i]) {
            lo = alpha[i - 1], hi = alpha[i];
        }
    }

    double r = fmod(T, (2 * pi));   // remainder
    double q = (T - r) / (2 * pi);  // quotient
    double res = q * (hi - lo);     // full circles
    if (r > lo) res += r - lo;
    if (r > hi) res -= r - hi;      // partial circle

    if (flag) {
        cout << T - res << endl;
    } else {
        cout << res << endl;
    }    

    return 0;
}
```



