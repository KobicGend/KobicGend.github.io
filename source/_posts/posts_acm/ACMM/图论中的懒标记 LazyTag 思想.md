---
title: 【算法杂谈+好题分享】图论中的懒标记 LazyTag 思想
tags:
  - 算法
  - 筆記
  - ACM
  - 圖論
categories:
  - - 筆記
    - XCPCwiki
abbrlink: 366bb2f2
hide: true
date: 2025-04-01 08:14:00
updated: 2025-04-01 08:14:00
description:
---

想必读者第一次听说懒标记 (LazyTag) 是在线段树区间修改中，其实懒标记思想在图论及更多方面中也有应用。其核心思想在于「**延迟计算**」，即通过标记的方式记录对某个有相同性质的对象（如线段树的区间、图中的连通块等）的 **整体操作**，而不是立即操作每个元素。

# 一、并查集维护连通性——[The 2025 ICPC Latin America Championship D. Dangerous City](https://codeforces.com/gym/105789/problem/D)

## Description

给定无向图，有点权。路径权值定义为路径上（含端点）所有点权最大值，定义 $f(u, v)$ 为所有 $u$ 到 $v$ 路径中值最小的一条。对每个 $u$ 求 $s_u = \displaystyle \sum_{v=1}^n f(u, v)$。$n,m \leqslant 3\cdot 10^{5}$。
## Notes

**将点权转化为边权**，设 $u-v$ 的边权 $w=\max\lbrace w_{u},w_{v} \rbrace$，则路径权值就是路径上边权最大值。

按 **Kruskal** 的想法，按边权从小到大遍历这些边。两点 $u,v$ 第一次连通时，当前遍历的边权 $w$ 就是 $f(u, v)$。遍历每条边后，将这条边两个端点所在的连通块合并，用并查集维护图连通性（并查集维护无向图连通性其实是并查集的本质）。设将连通块 $A, B$ 合并，则这条边对 $A$ 中所有点的贡献为 $w \times |B$|，对 $B$ 中所有点的贡献为 $w \times |A|$。

由于需要记录连通块的具体元素，我们选择 **并查集启发式合并**。**不妨设 $|A| \geqslant |B|$，则 $B$ 可以遍历，$A$ 不能遍历。** 并查集合并时将 $B$ 中所有元素加入 $A$，可以证明复杂度是 $\operatorname{O}(n\log n)$。并查集启发式合并 code：

```cpp
vector<vector<int>> dsu(n);
for (int i = 0; i < n; i++) {
    dsu[i].push_back(i);
}
auto uno = [&](int x, int y) {
    if (x = dsu[x][0], y = dsu[y][0]; x == y) {
        return;   // 如果已经在同一个集合里，就不需要合并
    }
    if (dsu[x].size() < dsu[y].size()) {
        swap(x, y);    // 让小集合合并到大集合里
    }
    for (auto z : dsu[y]) {   // 不能写成 for (int i = 0; i < dsu[y].size(); i++)
        dsu[x].push_back(z);  // 合并
        dsu[z] = { x }; 
    }
};
```

对于 $B$，在合并时同时记录 $B$ 中元素的答案。

对于 $A$，不遍历其中元素的前提下如何记录答案？
- 用 **懒标记 LazyTag** 记录 $A$ 这个整体需要加上多少答案；
- 在集合 $A$ 销毁（即合并到其它集合上）时，再将懒标记 LazyTag 分配给每个元素；
- 将另一个集合 $B$ 合并到已有懒标记 LazyTag 的集合 $A$ 时，需要给 $B$ 的每个元素减去 $A$ 已有的标记。

上面的过程可以与线段树区间修改类比。对于一个较大的待修改区间，我们无需一一遍历，而是打个懒标记 LazyTag，表示整体操作。当需要访问这区间的某个子区间时，再将懒标记 LazyTag 下传给左右子树，同时删除原有标记。

```cpp
lazy[u] += 1ll * dsu[v].size() * w;
lazy[v] += 1ll * dsu[u].size() * w;
for (auto x : dsu[v]) {
	val[x] += lazy[v] - lazy[u];
}
```

总时间复杂度 $\operatorname{O}(m\log n)$。

## Code

```cpp
int N, M;
cin >> N >> M;

vector<ll> val(N);
for (auto& x : val) {
	cin >> x;
}

vector<array<int, 3>> edge(M);
for (auto& [w, x, y] : edge) {
	cin >> x >> y;
	x--, y--;
	w = max(val[x], val[y]);     // 将点权转化为边权
}
sort(edge.begin(), edge.end());  // 按边权从小到大遍历

// DSU
vector<vector<int>> dsu(N);
for (int i = 0; i < N; i++) {
	dsu[i].push_back(i);
}

vector<ll> lazy(N);
for (auto [w, x, y] : edge) {  // 按边权从小到大遍历
	if (x = dsu[x][0], y = dsu[y][0]; x == y) {
        continue;    // 如果已经在同一个集合里，就不需要合并
    }
	if (dsu[x].size() < dsu[y].size()) {
        swap(x, y);  // 让小集合合并到大集合里
    }
	lazy[x] += 1ll * dsu[y].size() * w;
	lazy[y] += 1ll * dsu[x].size() * w;
	for (auto z : dsu[y]) {
		val[z] += lazy[y] - lazy[x];
		dsu[x].push_back(z);  // 合并
		dsu[z] = { x };
	}
}

for (int x = 0; x < N; x++) {
	val[x] += lazy[dsu[x][0]];  // 将懒标记加到每个点上
	cout << val[x] << " ";
}
cout << endl;
```


# 二、根号分治——[2025 春 杭电多校 04 1010 图之图](https://acm.hdu.edu.cn/contest/problem?cid=1153&pid=1010)（图论中的 LazyTag）

*在学习本题前请先熟悉 **无向图转化为有向图思想**（[洛谷 P1989 无向图三元环计数](https://www.luogu.com.cn/problem/P1989)）与 **图论根号分治思想**（经典中的经典之 [Hammer to Fall](https://codeforces.com/gym/104065/problem/E)，用 multiset，和官方题解做法不太一样）。*

## Description

给定 $N$ 点有向图，点有颜色，颜色编号不超过 $n$。输入 $m$ 对无序颜色对 $x,y$（可能出现 $x=y$），如果点 $u, v\ (u<v)$ 的颜色恰好分别为 $x,y$ 或 $y,x$，则连边 $u\to v$。求 $1$ 到 $N$ 的路径数量，结果对 $10^9+7$ 取模。$n,m,N \leqslant 2\cdot 10^{5}$。

## Notes

设 $dp_{x}$ 表示 $1$ 到 $x$ 的路径数量，有朴素递推式
$$
dp_{x} =
\begin{cases}
1, & x=1, \\
\sum_{y\to x}dp_{y}, &\text{otherwise}.
\end{cases}
$$

不能暴力建图，边数可能达到 $N^{2}$，复杂度为 $\operatorname{O}(N^{3})$。于是 **按颜色建图**，这样点数边数分别为 $n,m$。

设 $\operatorname{val}(u)$ 表示颜色为 $u$ 的所有点的 dp 值之和，那么先更新 $dp_{x}=\sum_{v\to u}\operatorname{val}(v)$，再更新 $\operatorname{val}(u)\leftarrow dp_{x}$，其中 $u$ 表示 $x$ 的颜色。

```cpp
vector<Z> val(n), dp(N);
for (int x = 0; x < N; x++) {
	int u = color[x];
	if (x == 0) {
		dp[x] = 1;
	} else for (auto v : E[u]) { 
		dp[x] += val[v];
	}
	val[u] += dp[x];
}
```

现在的时间复杂度为 $\operatorname{O}(Nm)$，仍然不能通过。问题出在度数较大的点（下称大点）需要遍历很多边，复杂度较高。

*小点行动敏捷，而大点体型庞大步履维艰。于是大点压榨奴役小点，让小点自己暴力更新后，再把信息送给大点，为大点的更新做好准备（真过分呢）。*

**按点的大小分治**。对于大点，设 $\operatorname{lazy}(u)$ 表示 $u$ 相邻点的 dp 值之和。如果 $u$ 是小点，仍按上述式子朴素递推；如果 $u$ 是大点，那么 $dp_{x}=\operatorname{lazy}(u)$。转移 dp 后需更新相邻大点 $v$ 的 lazy，令 $\operatorname{lazy}(v)\leftarrow dp_{x}$。

```cpp
vector<Z> val(n), lazy(n), dp(N);
for (int x = 0; x < N; x++) {
	int u = color[x];
	if (x == 0) {
		dp[x] = 1;
	} else if (E[u].size() > B) {  // 大点直接用lazyTag
		dp[x] = lazy[u];
	} else for (auto v : E[u]) {   // 小点暴力更新
		dp[x] += val[v];
	}
	val[u] += dp[x];
	for (auto v : G[u]) {  // 把信息送给大点
		lazy[v] += dp[x];
	}
}
```

复杂度分析：设有 $k = \dfrac{2m}{B}$ 个度数超过 $B$ 的点，询问小点的复杂度是 $\operatorname{O}(B)$，询问大点的复杂度是 $\operatorname{O}(1)$，此外每次询问更新大点还需时间 $\operatorname{O}(k)=\operatorname{O}\Big(\dfrac{2m}{B}\Big)$，总时间复杂度是  $\operatorname{O}\bigg[ m + q \cdot\max\Big(B, \dfrac{2m}{B}\Big)\bigg]$。取 $B=\sqrt{ 2m }$ 最优，故也称 **根号分治**，适合 $10^{4}\sim 2\cdot 10^{5}$ 的数据范围。最终时间复杂度 $\operatorname{O}(q\sqrt{ m })$。

## Code

```cpp
int N, n;
cin >> N >> n;
vector<int> color(N);
for (int i = 0; i < N; i++) {
	cin >> color[i];
	color[i]--;
}
vector<vector<int>> E(n);
int m;
cin >> m;
const int B = ceil(sqrt(2 * m));
while (m--) {
	int u, v;
	cin >> u >> v;
	u--;
	v--;
	E[u].push_back(v);
	if (u != v) {  // 注意自环
		E[v].push_back(u);
	}
}
vector<vector<int>> G(n);
for (int u = 0; u < n; u++) {
	for (auto v : E[u]) {
		if (E[v].size() > B) {
			G[u].push_back(v);  // 所有点连大点
		}
	}
}
vector<Z> val(n), lazy(n), dp(N);
for (int x = 0; x < N; x++) {
	int u = color[x];
	if (x == 0) {
		dp[x] = 1;
	} else if (E[u].size() > B) {  // 大点直接用lazyTag
		dp[x] = lazy[u];
	} else for (auto v : E[u]) {   // 小点暴力更新
		dp[x] += val[v];
	}
	val[u] += dp[x];
	for (auto v : G[u]) {  // 把信息送给大点
		lazy[v] += dp[x];
	}
}
cout << dp.back() << endl;
```

# 三、二叉树分治——[杭电多校 1004 - 传送](https://acm.hdu.edu.cn/showproblem.php?pid=74362024)

*在学习本题前请先熟悉 **可撤销并查集**（用栈实现的，有别于可持久化并查集）与 **二叉树分治**（也称线段树分治），并完成 [洛谷 P5787](https://www.luogu.com.cn/problem/P5787)。*

## Description

给定一个 $n$ 节点的图，在 $n$ 时间内有 $m$ 条边会出现后消失，求出每个节点与节点 1 连通的时间编号之和，输出每个节点答案的异或和。$n,m \leqslant 6\cdot 10^{5}$。

## Notes

这种边会出现后消失的动态连通性问题，对时间建立二叉树，分治解决。

天才的 LazyTag：递归到叶，也即到达某个确定的时刻时，对当前 1 所在的连通块的根节点打上一个 LazyTag，表示整个连通块需要加上这个值。设 $u$ 是 $v$ 的祖先，如果断开 $u,v$，需要将 $v$ 加上 $u$ 的 LazyTag；如果连接 $u,v$，需要将 $v$ 减去 $u$ 的 LazyTag。

## Code

```cpp
struct DSU {
    vector<int> p, siz;
    vector<ll> lazy;
    vector<pair<int, int>> op;
    vector<pair<int*, int>> his;
    DSU(int n) : p(n), siz(n, 1), lazy(n) { iota(p.begin(), p.end(), 0); }
    int find(int x) { while (x != p[x]) x = p[x]; return x; }
    bool same(int x, int y) { return find(x) == find(y); }
    bool uno(int x, int y) {
        x = find(x), y = find(y);
        if (same(x, y)) return false;
        if (siz[x] < siz[y]) swap(x, y); 
        his.emplace_back(&siz[x], siz[x]);
        siz[x] += siz[y];
        his.emplace_back(&p[y], p[y]);
        p[y] = x;
        // 魔改DSU，记录每个点的 lazy 值
        op.emplace_back(x, y);
        lazy[op.back().second] -= lazy[op.back().first];
        return true;
    }
    int now() { return his.size(); }  // 返回当前时间 h
    void undo(int h) {  // undo 到 h
        while (now() > h) {
            *his.back().first = his.back().second;
            his.pop_back();
            *his.back().first = his.back().second;
            his.pop_back();
            // 魔改DSU，记录每个点的 lazy 值
            lazy[op.back().second] += lazy[op.back().first];
            op.pop_back();
        }
    }
};

int main() {
    #define ls (p<<1)
    #define rs (p<<1|1)
    #define mid ((L+R)>>1)

    int n, m;
    cin >> n >> m;

    vector<vector<pair<int, int>>> E(n << 2);
    while (m--) {
        int u, v, l, r;
        cin >> u >> v >> l >> r;
        u--, v--;
        l--;
        if (u > v) swap(u, v);
        auto add = [&](this auto&& add, int p, int L, int R) -> void {
            if (l <= L && R <= r) {
                E[p].push_back({ u, v });
            } else if (l < R && L < r) {
                add(ls, L, mid), add(rs, mid, R);
            }
        };
        add(1, 0, n);
    }

    DSU dsu(n);
    auto solve = [&](this auto&& solve, int p, int L, int R) -> void {
        int h = dsu.now();
        for (auto [u, v] : E[p]) {
            dsu.uno(u, v);
        }
        if (R - L == 1) {
            dsu.lazy[dsu.find(0)] += L + 1;
        } else {
            solve(ls, L, mid), solve(rs, mid, R);
        }
        return dsu.undo(h);
    };
    solve(1, 0, n);

    ll res = 0;
    for (int i = 0; i < n; i++) {
        res ^= dsu.lazy[i];
    }
    cout << res << endl;

    return 0;
}
```