---
abbrlink: '0'
---
动态 DP 简称 DDP，一说是带修改操作的 DP，一说是将 DP 的一个维度作为时间轴以动态求解 DP。

## 线性 DP 的矩阵表示法

——让我们回归本质，将一切线性操作归为矩阵。

既然（狭义的）线性 DP 的转移方程是线性变换，就必然可以用矩阵表示。

基础矩阵乘法和快速幂：

```cpp
using Matrix = vector<vector<int>>;
constexpr Matrix operator * (const Matrix& A, const Matrix& B) {
    int n = A.size();
    Matrix C(n, vector<int>(n));
    for (int k = 0; k < n; k++) {
	    for (int i = 0; i < n; i++) {
	        for (int j = 0; j < n; j++) {
                C[i][j] += A[i][k] * B[k][j];
            }	
        }	
    }	
    return C;
}
constexpr Matrix qpow(Matrix A, int k) {
    int n = A.size();
    Matrix B(n, vector<int>(n));
    for (int i = 0; i < n; i++) B[i][i] = 1;
    for ( ; k; k >>= 1) {
        if (k & 1) B = B * A;
        A = A * A;
    }
    return B;
}
```

### 普通线性 DP——[CF2018D - Max Plus Min Plus Size (2200)](https://codeforces.com/contest/2018/problem/D)

> 给定长度为 $N$ 的序列 $A = (A_{1}, A_{2}, \dots, A_{N})$，可以选取数组中的一些元素，将它们染成红色，但任意两个相邻的元素不能同时被染成红色。最大化红色元素中的最大值 + 红色元素中的最小值 + 红色元素的总个数。$N \leqslant 2 \times 10^{5}$。

枚举最小值 $A_{i}$，问题转化为 $A_{i}$ 必须被染成红色，且其它所有被染红的元素 $A_{j}$​ 都必须满足 $A_{j} \geqslant A_{i}$。

下面先讨论最小值为 $A_{i}$ 的情形，需要最大化最大值 + 总个数，考虑 DP。

设状态 $f_{k,0/1,0/1}$ 表示位置 $k$ 是/否染红（第一个 0/1），且是/否钦定最大值在 $[1,k]$ 中（第二个 0/1），存储最大值 + 总个数。

初始状态：$f_{0} = (0, 0, 0, 0)^{\mathrm T}$。

状态转移：如果 $A_{k} \geqslant A_{i}$，则允许被染红，
$$
\begin{cases}
f_{k,0,0} = \max(f_{k-1,0,0}, f_{k-1,0,1}) \\
f_{k,0,1} = f_{k-1,0,0} + 1 \\
f_{k,1,0} = \max(f_{k-1,1,0}, f_{k-1,1,1}) \\
f_{k,1,1} = \max(f_{k-1,0,0} + A_k+1, f_{k-1,1,0} + 1)
\end{cases}
$$
否则不允许被染红，
$$
\begin{cases}
f_{k,0,0} = \max(f_{k-1,0,0}, f_{k-1,0,1}) \\
f_{k,0,1} = -\infty \\
f_{k,1,0} = \max(f_{k-1,1,0}, f_{k-1,1,1}) \\
f_{k,1,1} = -\infty
\end{cases}
$$
欲求 $\max\lbrace f_{N, 0 / 1, 1} + A_{i} \rbrace$。

上面的写法有点丑，不容易看出本质（尤其是结合律），可以采用矩阵以更清晰地表示。

标准的矩阵乘法是
$$
(\boldsymbol{A} \cdot \boldsymbol{B})_{i j} = \sum_{k = 1}^{N} (\boldsymbol{A}_{i k} \times \boldsymbol{B}_{k j})
$$
为了计算 DP 最小值，将 **加法** ($\sum$) 替换为 **取最小值** (min)，
将 **乘法** ($\times$) 替换为 **普通加法** (+)，得到一种新的矩阵乘法规则
$$(\boldsymbol{A} \cdot \boldsymbol{B})_{i j} = \min_{k = 1}^{N} (\boldsymbol{A}_{i k} + \boldsymbol{B}_{k j})$$

注意 $\min$ 运算的单位元是 $+\infty$，因此单位阵 $\boldsymbol{I}$ 的对角线为全 0，其余为 $+\infty$。

*你会发现代码和 Floyd 一模一样。*

```cpp
using Matrix = vector<vector<int>>;
constexpr Matrix operator * (const Matrix& A, const Matrix& B) {
    const int n = A.size();
    Matrix C(n, vector<int>(n, inf));
    for (int k = 0; k < n; k++) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                C[i][j] = min(C[i][j], A[i][k] + B[k][j]);
            }
        }
    }
    return C;
}
constexpr Matrix qpow(Matrix A, int k) {
    const int n = A.size();
    Matrix B(n, vector<int>(n, inf));
    for (int i = 0; i < n; i++) B[i][i] = 0;
    for ( ; k; k >>= 1) {
        if (k & 1) B = B * A;
        A = A * A;
    }
    return B;
}
```

计算 DP 最大值同理。

*为什么这种规则下仍满足矩阵的性质？*

*这里，加法 $+$ 定义为取最小值，满足幂等性 (Idempotency)，乘法 $\times$ 定义为普通加法，即热带半环 (Tropical Semiring) 中的 Min-Plus 半环。其中，广义加法 $+$ 和广义乘法 $\times$ 构成半环 (Semiring)，即满足加法 $+$ 构成交换幺半群 (Commutative Monoid)，乘法 $\times$ 构成幺半群且对加法 $+$ 满足分配律 (Distributive Law)，零元零化乘法（零元乘任意一个数都等于零元）。*

*「热带 (Tropical)」这个名字据说是为了纪念巴西数学家 Imre Simon，他是这个领域的先驱之一，而巴西地处热带。这个命名并没有数学上的直接含义，更多的是一种致敬。*

*热带半环是半环的一种具体实例，为许多图论算法和 DP 问题提供了一个自然的代数框架，尤其是 Min-Plus 半环。从上面的例子也能看出，其运算规则恰好能描述这些问题中的状态转移和优化过程。*

回到本题，如果 $A_{k} \geqslant A_{i}$，则
$$
\begin{bmatrix}
f_{k,0,0} \\
f_{k,0,1} \\
f_{k,1,0} \\
f_{k,1,1}
\end{bmatrix}
=
\begin{bmatrix}
0 & 0 & -\infty & -\infty \\
1 & -\infty & -\infty & -\infty \\
-\infty & -\infty & 0 & 0 \\
A_k+1 & -\infty & 1 & -\infty
\end{bmatrix}
\otimes
\begin{bmatrix}
f_{k-1,0,0} \\
f_{k-1,0,1} \\
f_{k-1,1,0} \\
f_{k-1,1,1}
\end{bmatrix}
$$
否则，
$$
\begin{bmatrix}
f_{k,0,0} \\
f_{k,0,1} \\
f_{k,1,0} \\
f_{k,1,1}
\end{bmatrix}
=
\begin{bmatrix}
0 & 0 & -\infty & -\infty \\
-\infty & -\infty & -\infty & -\infty \\
-\infty & -\infty & 0 & 0 \\
-\infty & -\infty & -\infty & -\infty
\end{bmatrix}
\otimes
\begin{bmatrix}
f_{k-1,0,0} \\
f_{k-1,0,1} \\
f_{k-1,1,0} \\
f_{k-1,1,1}
\end{bmatrix}
$$
复杂度 $\mathcal{O}(N K^{3})$，$K=4$。

对于不同的最小值 $A_{i}$，考虑降序枚举最小值，依次修改这些位置对应的矩阵。使用线段树维护单点修改矩阵乘，复杂度 $\mathcal{O}(K^{3} N \log N)$，$K=4$。

```cpp
constexpr ll inf = 0x3f3f3f3f3f3f3f3f;
struct Info : array<array<ll, 4>, 4> {
	Info() {
		for (int i = 0; i < 4; i++) {
			for (int j = 0; j < 4; j++) {
				(*this)[i][j] = (i == j ? 0 : -inf);
			}
		}
	}
};
Info operator + (const Info& a, const Info& b) {
	Info c;
	for (int i = 0; i < 4; i++) {
		for (int j = 0; j < 4; j++) {
			c[i][j] = -inf;
			for (int k = 0; k < 4; k++) {
				c[i][j] = max(c[i][j], a[k][j] + b[i][k]);
			}
		}
	}
	return c;
}
void solve() {
	int n;
	cin >> n;

	vector<int> A(n);
	for (int i = 0; i < n; i++) {
		cin >> A[i];
	}

	vector<int> ord(n);
	iota(ord.begin(), ord.end(), 0);
	sort(ord.begin(), ord.end(), [&](int i, int j) {
		return A[i] > A[j];
	});

	Info M0;
	for (int i = 0; i < 4; i++) {
		for (int j = 0; j < 4; j++) {
			M0[i][j] = -inf;
		}
	}
	M0[0][0] = 0;
	M0[0][1] = 0;
	M0[2][2] = 0;
	M0[2][3] = 0;
	SegmentTree<Info> seg(n);
	for (int i = 0; i < n; i++) {
		seg.update(i, M0);
	}
	ll ans = 0;
	for (auto i : ord) {
		Info M1 = M0;
		M1[1][0] = 1;
		M1[3][0] = A[i] + 1;
		M1[3][2] = 1;
		seg.update(i, M1);
		auto res = seg.query(0, n);
		ans = max(ans, max(res[2][0], res[3][0]) + A[i]);
	}
	cout << ans << endl;
}
```

### 树形线性 DP——洛谷 P4719 动态最大权独立集

> 给定一棵 $N$ 个点的树，每个点都有一个权值。$Q$ 次操作，每次操作会修改一个点 $x$ 的权值为 $y$，然后回答当前整棵树的最大权独立集的权值总和。

首先考虑没有修改操作的静态版本。设 $f_{u, 0 / 1}$ 表示(不)选择 $u$ 号点时，以 $u$ 号点为根的子树的最大权独立集，则
$$
\begin{cases}
f_{u, 0} = \sum_{v \in \operatorname{children}(u)} \max(f_{v, 0}, f_{v, 1})  \\
f_{u, 1} = w_{u} + \sum_{v \in \operatorname{children}(u)} f_{v, 0}
\end{cases}
$$
答案是 $\max(f_{\text{root}, 0}, f_{\text{root}, 1})$。

为了优化修改操作，引入重链剖分，并将 DP 方程根据重儿子 (heavy child) 和轻儿子 (light children) 进行拆分。设 $g_{u, 0 / 1}$ 表示(不)选择节点 $u$ 时，仅考虑它自身和所有轻儿子的子树贡献的最大权独立集，即
$$
\begin{cases}
g_{u, 0} = \sum_{v \in \operatorname{lightchildren}(u)} \max(f_{v, 0}, f_{v, 1})  \\
g_{u, 1} = w_{u} + \sum_{v \in \operatorname{lightchildren}(u)} f_{v, 0}
\end{cases}
$$
这样，
$$
\begin{cases}
f_{u, 0} = g_{u, 0} + \max(f_{\operatorname{heavychild}(u), 0}, f_{\operatorname{heavychild}(u), 1})  \\
f_{u, 1} = g_{u, 1} + f_{\operatorname{heavychild}(u), 0}
\end{cases}
$$

这个 DP 方程可以用 Max-Plus 规则下的矩阵表示为
$$
\begin{bmatrix} f_{u, 0} \\ f_{u, 1} \end{bmatrix} = \begin{bmatrix} g_{u, 0} & g_{u, 0} \\ g_{u, 1} & -\infty \end{bmatrix} \otimes \begin{bmatrix} f_{\operatorname{heavychild}(u), 0} \\ f_{\operatorname{heavychild}(u), 1} \end{bmatrix}
$$

也就是说，每个节点 $u$ 都关联一个这样的 $2 \times 2$ 转移矩阵
$$
\boldsymbol{M}_u = \begin{bmatrix} g_{u, 0} & g_{u, 0} \\ g_{u, 1} & -\infty \end{bmatrix}
$$
于是
$$
\boldsymbol{f}_{u} = \boldsymbol{M}_{u} \otimes  \boldsymbol{f}_{\operatorname{heavychild}(u)}
$$

考虑一条重链，设这重链为 $u_1 \to u_2 \to \dots \to u_k$。一条链的末端节点 $u_k$ 一定是叶子节点，因此来自它下方的贡献可以视为空集，其 DP 向量为 $\begin{bmatrix} 0 \\ -\infty \end{bmatrix}$。

在这条链上，转移方程是这样的：
$$
\begin{cases}
\boldsymbol{f}_{u_{1}} = \boldsymbol{M}_{u_{1}} \otimes \boldsymbol{f}_{u_{2}} \\
\boldsymbol{f}_{u_{2}} = \boldsymbol{M}_{u_{2}} \otimes \boldsymbol{f}_{u_{3}} \\
\cdots \\
\boldsymbol{f}_{u_{k-1}} = \boldsymbol{M}_{u_{k-1}} \otimes \boldsymbol{f}_{u_{k}} \\
\boldsymbol{f}_{u_{k}} = \boldsymbol{M}_{u_{k}} \otimes \begin{bmatrix} 0 \\ -\infty \end{bmatrix}
\end{cases}
\implies
\boldsymbol{f}_{u_1} = (\boldsymbol{M}_{u_1} \otimes \boldsymbol{M}_{u_2} \otimes \dots \otimes \boldsymbol{M}_{u_k}) \otimes \begin{bmatrix} 0 \\ -\infty \end{bmatrix}
$$
这意味着，一条重链上所有矩阵的乘积包含了计算该链头最终 DP 值所需的所有信息，可以使用线段树维护区间信息。

因此，节点 $u$ 的权值改变 $\implies$ 它自身的矩阵 $\boldsymbol{M}_{u}$ 变化 $\implies$ 整条重链的矩阵乘积变化 $\implies$ 链头的 DP 值 $\boldsymbol{f}_{\operatorname{top}(u)}$ 变化。

这个变化直接（通过轻边）影响了父节点 $\operatorname{parent}(\operatorname{top}(u))$ 的 $g$ 值。通过比较新旧两个状态，我们可以得到一个清晰的递推更新规则，也就是实际计算时所用的方法：
$$
\begin{cases}
g_{\operatorname{parent}(\operatorname{top}(u)), 0} \gets g'_{\operatorname{parent}(\operatorname{top}(u)), 0} - \max(f'_{\operatorname{top}(u), 0}, f'_{\operatorname{top}(u), 1}) + \max(f_{\operatorname{top}(u), 0}, f_{\operatorname{top}(u), 1}) \\
g_{\operatorname{parent}(\operatorname{top}(u)), 1} \gets g'_{\operatorname{parent}(\operatorname{top}(u)), 1} - f'_{\operatorname{top}(u), 0} + f_{\operatorname{top}(u), 0}
\end{cases}
$$
这个公式的含义是新的 $g$ 值 = 旧的 $g$ 值 - 旧的贡献 + 新的贡献。

当 $g_p$ 的值被计算出来后，节点 $p$ 自身的转移矩阵 $\boldsymbol{M}_p$ 也就随之更新了。这会进一步影响 $\operatorname{parent}(\operatorname{top}(u))$ 所在的重链，从而将更新向着根又推进了一步。

整个流程写完整是：节点 $u$ 的权值 $\implies$ 它自身的矩阵 $\boldsymbol{M}_{u}$ $\implies$ 整条重链的矩阵乘积 $\implies$ 链头的 DP 值 $\boldsymbol{f}_{\operatorname{top}(u)}$ $\implies$ 链头的父节点的 DP 值及其矩阵 $\boldsymbol{g}_{\operatorname{parent}(\operatorname{top}(u))},\boldsymbol{M}_{\operatorname{parent}(\operatorname{top}(u))}$ $\implies$ 链头的父节点所在重链的矩阵乘积 $\implies$ 这条重链的矩阵乘积 $\implies$ 这条重链的链头 $\implies \cdots \implies$ 根节点的 DP 值。

由于重链剖分保证任意点到根的路径为 $\mathcal{O}(\log N)$ 条重链和轻边交替形成，加上线段树单点修改的复杂度 $\mathcal{O}(\log N)$，这整个更新过程复杂度为 $\mathcal{O}(\log^{2} N)$。

总复杂度 $\mathcal{O}(N\log N + Q \log^{2} N)$。

```cpp
// 线段树+树剖模板略
int main() {
    int N, Q;
    cin >> N >> Q;

    vector<int> A(N);
    for (int i = 0; i < N; i++) {
        cin >> A[i];
    }
    
    for (int i = 1; i < N; i++) {
        int x, y;
        cin >> x >> y;
        x--; y--;
        adj[x].push_back(y);
        adj[y].push_back(x);
    }
    work(0);

    vector<array<int, 2>> f(N), g(N);
    for (auto x : vector(ord.rbegin(), ord.rend())) {
        f[x][0] = 0;
        f[x][1] = g[x][1] = A[x];
        for (auto y : adj[x]) {
            f[x][0] += max(f[y][0], f[y][1]);
            f[x][1] += f[y][0];
            if (y != adj[x][0]) {
                g[x][0] += max(f[y][0], f[y][1]);
                g[x][1] += f[y][0];
            }
        }
    }

    SegmentTree<Matrix> seg(N);
    for (int x = 0; x < N; x++) {
        seg.apply(dfn[x], Matrix(g[x][0], g[x][0], g[x][1], -inf));
    }

    while (Q--) {
        int x, w;
        cin >> x >> w;
        x--;
        
        g[x][1] += w - A[x];
        A[x] = w;

        while (x != -1) {
            Matrix M = seg.query(dfn[top[x]], end[top[x]]);
            if (parent[top[x]] != -1) {
                g[parent[top[x]]][0] -= max(M[0][0], M[1][0]);
                g[parent[top[x]]][1] -= M[0][0];
            }
            
            seg.apply(dfn[x], Matrix(g[x][0], g[x][0], g[x][1], -inf));
            
            M = seg.query(dfn[top[x]], end[top[x]]);
            if (parent[top[x]] != -1) {
                g[parent[top[x]]][0] += max(M[0][0], M[1][0]);
                g[parent[top[x]]][1] += M[0][0];
            }

            x = parent[top[x]];
        }
        
        Matrix res = seg.query(dfn[0], end[0]);
        cout << max(res[0][0], res[1][0]) << endl;
    }

    return 0;
}
```


### 图形线性 DP——恰好 k 边最短路

[[../图 GRAPH/2 最短路 OPTIMAL PATHS#Bellman-Ford, Floyd-Warshall (DP)|Link]]

此题被 ACwing 收录，大概是最最经典的问题。

[The 3rd Universal Cup. Stage 13: Sendai M. Do Not Turn Back](https://qoj.ac/contest/1812/problem/9488)

无向图，问 $1$ to $N$ 有多少长为 $K$ 的 walk，即可以走重边但不能走回头路。
$N \leqslant 100,K \leqslant 10^{9}$，modulo 998244353。

设 $f_{k,v}$ 为从起点出发，走 $k$ 步，最终到达顶点 $v$ 的有效路径数量，则
$$
f_{k,v} = \sum_{u \to v} f_{k-1,u} - (\operatorname{deg}(v)-1) \cdot f_{k-2,v}
$$
即
$$
\begin{cases}
F_{k} = E \cdot F_{k-1} - (D - I) F_{k-2} \\
F_{2} = E \cdot F_{k-1} - D F_{0} \\
F_{1} = E \\
F_{0} = I
\end{cases}
$$
这可以写成矩阵乘法的形式：
$$
\begin{pmatrix} F_k \\ F_{k-1} \end{pmatrix} = \begin{pmatrix} E & I-D \\ I & 0 \end{pmatrix} \cdot \begin{pmatrix} F_{k-1} \\ F_{k-2} \end{pmatrix}
$$

```cpp
#include <bits/stdc++.h>
using namespace std;

struct matrix : vector<vector<int>> {
	int n, m;
	matrix(int n) : n(n), m(n) {
        assign(n, vector<int>(n, 0));
    }
	matrix(int n, int m, int k = 0) : n(n), m(m) {
        assign(n, vector<int>(m));
        for (int i = 0; i < min(n, m); i++) {
            (*this)[i][i] = k;
        }
    }
};
constexpr int mod = 998244353;
matrix operator * (const matrix &x, const matrix &y) {
	assert(x.m == y.n);
	matrix z(x.n, y.m);
	for (int k = 0; k < x.m; k++) {
		for (int i = 0; i < x.n; i++) {
			for (int j = 0; j < y.m; j++) {
				z[i][j] += 1LL * x[i][k] * y[k][j] % mod;
				z[i][j] %= mod;
			}
		}
	}
	return z;
}
matrix qpow(matrix a, int k) {
	assert(a.n == a.m);
	matrix res(a.n, a.n, 1);
	for ( ; k; k >>= 1, a = a * a) {
		if (k & 1) res = res * a;
	}
	return res;
}

signed main() {
	ios::sync_with_stdio(false);
	cin.tie(nullptr);

    int n, m, k;
    cin >> n >> m >> k;
    matrix E(n), D(n), I(n, n, 1);
    for (int i = 0; i < m; i++) {
        int x, y;
        cin >> x >> y;
        x--;
        y--;
        E[x][y] = 1;
        E[y][x] = 1;
        D[x][x]++;
        D[y][y]++;
    }
    matrix X1 = E;
    matrix X2 = E * E;
    matrix S(2 * n, n);
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            S[i][j] = (X2[i][j] - D[i][j] + mod) % mod;
            S[n + i][j] = X1[i][j];
        }
    }
    matrix P(2 * n, 2 * n);
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            P[i][j] = E[i][j];
            P[n + i][j] = I[i][j];
            P[i][n + j] = (I[i][j] - D[i][j] + mod) % mod;
        }
    }
    cout << (qpow(P, k - 2) * S)[0][n - 1] << endl;

	return 0;
}
```

### 子序列 DP——[2024 CCPC 网络赛 D. 编码器-解码器](https://codeforces.com/gym/105336/problem/D)

题意简洁，代码极短，需要一定思维的好题。

> 给定两个字符串 $S,T$，长度分别为 $n,m$，按如下方式生成字符串 $S'_{n}$：
> 
> - 第一次操作：$S_{1}' = S_{1}$；
> - 第二次至第 $n$ 次操作：$S_{i}' = S_{i-1}' + S_{i} +S_{i-1}'$。
> 
> 求字符串 $T$ 在 $S'_{n}$ 的所有子序列中出现的次数。$1 \leqslant |S| \leqslant  100$，$1  \leqslant |T| \leqslant  100$。

对于一个字符串 $A$，考虑 $(|T| + 1) \times (|T| + 1)$ 的矩阵 $\operatorname{mat}(A)$，其中 $\operatorname{mat}(A)_{l,r}$ 表示字符串 $T$ 的子串 $[l,r)$ 在字符串 $A$ 的所有子序列中出现的次数，特别地 $\operatorname{mat}(A)_{ii} = 1$。

于是，字符串拼接 $S_{i}' = S_{i-1}' + S_{i} +S_{i-1}'$ 等价于
$$
\operatorname{mat}(S_{i}') = \operatorname{mat}(S_{i-1}') \times \operatorname{mat}(S_{i}) \times \operatorname{mat}(S_{i-1}')
$$
单个字符对应的矩阵 $\operatorname{mat}(S_{i})$ 容易求得，其余部分按题意递归计算。复杂度 $\mathcal{O}(|S| |T|^{3})$。

```cpp
#include <bits/stdc++.h>
using namespace std;
constexpr int P = 998'244'353;

struct Matrix : vector<vector<int>> {
    Matrix(int n, int num) {
        resize(n, vector<int>(n));
        for (int i = 0; i < n; i++) {
            (*this)[i][i] = num;
        }
    }
};

constexpr Matrix operator * (const Matrix& A, const Matrix& B) {
    int n = A.size();
    Matrix C(n, 0);
    for (int k = 0; k < n; k++) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                C[i][j] = (C[i][j] + 1LL * A[i][k] * B[k][j]) % P;
            }	
        }	
    }	
    return C;
}

int main() {
    string s, t;
    cin >> s >> t;

	Matrix res(t.size() + 1, 1);
	for (int i = 0; i < s.size(); i++) {
        Matrix M(t.size() + 1, 1);
        for (int j = 0; j < t.size(); j++) {
            M[j][j + 1] = s[i] == t[j];
        }
		res = res * M * res;
	}
	cout << res[0][t.size()] << endl;
 
    return 0;
}
```

### 子串 DP——[2025 牛客多校 5B - Extra Training](https://ac.nowcoder.com/acm/contest/108302/B)

> 给定一长度为 $N$，字符集大小为 $V = 52$ 的字符串 $S$ 和一参数 $K$，求 $K$ 个可空 $S$ 连续子串拼接可产生的本质不同可空串数，答案对 998244353 取模。$N \leqslant 5\times 10^{5}, K \leqslant 10^{9}$。

希望每个本质不同的串只被拼接组合一次。

设 $f_{i}$ 表示上一步添加的子串的首字符是 $i$ 的方案数。从状态 $f_{i}$ 转移到状态 $f_{j}$ 的系数 $M_{ij}$，等于有多少个以 $i$ 开头的子串，当它后面跟上一个字符 $j$ 之后，就不再是 $S$ 的子串了。

例如，$S = (a,b)$，则
$$
\boldsymbol{M} = 
\begin{bmatrix}
2 & 1 & 2 \\
1 & 1 & 1 \\
0 & 0 & 1 \\
\end{bmatrix}
\quad \quad
\boldsymbol{M}^{2} = 
\begin{bmatrix}
5 & 3 & 7 \\
3 & 2 & 4 \\
0 & 0 & 1 \\
\end{bmatrix}
$$
于是 $K = 1$ 的答案为 $2+1+1=4$，$K = 2$ 的答案为 $7+4+1=12$。

用后缀自动机预处理转移系数，用矩阵快速幂优化转移，复杂度 $\mathcal{O}(NV + V^{3} \log K)$。

```cpp
constexpr int N = ALPHABET + 1;
using Matrix = array<array<Z, N>, N>;
Matrix operator * (const Matrix& A, const Matrix& B) {
    Matrix C{};
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            for (int k = 0; k < N; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    return C;
}

void solve() {
    int N, K;
    cin >> N >> K;

    string s;
    cin >> s;

    Node* root = newNode();
    Node* p = root;
    for (auto& c : s) {
        if (isupper(c)) {
            c = c - 'A' + 26; 
        } else {
            c = c - 'a'; 
        }
        p = extend(root, p, c);
    }
	sort();
    
    Matrix coef{};
    coef[ALPHABET][ALPHABET] = 1; 

    for (auto p : order) {
        for (auto b = 0; b < ALPHABET; b++) {
            if (p->next[b]) {
                p->nexts.push_back(b);
            } 
        }
    }
    
    for (auto i = 0; i < ALPHABET; i++) {
        if (!root->next[i]) {
            continue; 
        }
        
        auto s = root->next[i];
        for (auto p : order) {
            p->dp = 0; 
        }
        s->dp = 1;

		// 以 root->next[i] 为起点，任意满足 p->next[j] == nullptr 的节点 p 为终点的路径数量
		// N V^2 的方法
        for (auto p : sam.order) {
            for (auto j = 0; j < ALPHABET; j++) {
                if (p->next[j]) {
                    p->next[j]->dp += p->dp;
                } else {
                    coef[i][j] += p->dp;
                }
            }
            coef[i][ALPHABET] += p->dp;
        }
        
		// N V 的方法
        Z sum = 0;
        for (auto p : order) {
            for (auto b : p->nexts) {
                p->next[b]->dp += p->dp;
            }
            sum += p->dp;
        }
        for (auto b = 0; b <= ALPHABET; b++) {
            coef[i][b] = sum;
        }        
        for (auto p : order) {
            for (auto b : p->nexts) {
                coef[i][b] -= p->dp;
            }
        }
    }
    
    Matrix res = qpow(coef, K);
    
    Z ans = 0;
    for (auto i = 0; i <= ALPHABET; i++) {
        ans += res[i][ALPHABET]; 
    }
    cout << ans << endl;
}
```

## 扫描线

将 DP 的一个维度作为时间轴以动态求解 DP。

### [2025 牛客校 10F. Sensei and Yuuka Going Shopping](https://ac.nowcoder.com/acm/contest/108307/F)

把序列切三段，最大化每段都出现的元素数量。

```cpp
struct Lazy {
    int add{};
    void apply(const Lazy& o) & {
        add += o.add;
    }
};
struct Info {
    int maxx{ -inf };
    int imax{};
    void apply(const Lazy& o) & {
        maxx += o.add;
    }
};
Info operator + (const Info& l, const Info& r) {
    if (l.maxx > r.maxx) {
        return l;
    } else {
        return r;
    }
}

void eachT() {
    int n;
    cin >> n;

    vector<int> a(n);
    for (auto& x : a) {
        cin >> x;
    }

    auto alls = a;
    sort(alls.begin(), alls.end());
    alls.erase(unique(alls.begin(), alls.end()), alls.end());

    const int V = alls.size();
    vector<vector<int>> adj(V);
    for (int i = 0; i < n; i++) {
        a[i] = lower_bound(alls.begin(), alls.end(), a[i]) - alls.begin();
        adj[a[i]].push_back(i);
    }

    vector<Info> info(n);
    for (int i = 0; i < n; i++) {
        info[i] = { 0, i };
    }
    LazySegmentTree<Info, Lazy> seg(info);
    vector<pair<int, int>> cur(V);
    int resx = -1, resl = -1, resr = -1;
    for (int i = 0; i < n; i++) {
        int x = a[i];
        auto it = upper_bound(adj[x].begin(), adj[x].end(), i);
        int l = it == adj[x].end() ? n : *it;
        int r = adj[x].back();
        seg.update(cur[x].first, cur[x].second, { -1 });
        cur[x] = { l + 1, r + 1 };
        seg.update(cur[x].first, cur[x].second, { 1 });
        auto res = seg.query(i, n);
        if (res.maxx > resx) {
            resx = res.maxx;
            resl = i + 1;
            resr = res.imax;
        }
    }
    cout << resx << endl;
    cout << resl + 1 << " " << resr + 1 << endl;
}
```


### DP 打 Tag：2024 牛客多校 9B - Break Sequence

> 求序列的划分方法数，满足每段中每个数出现的次数都不在集合 $S$ 中。$1 \leqslant a_{i} \leqslant n \leqslant 2\times 10^{5},\ |S| \leqslant 10$。

设 $f_{i}$ 表示序列中前 $i$ 个数的划分方法数，如果没有约束条件，转移方程为 $f_{i}=\sum \limits_{1 \leqslant j<i } f_{j}$，约束条件表示 $f_{i}$ 不能由某些 $f_{j}$ 转移而来，将不能转移的 $j$ 打上 Tag，即是求所有没有 Tag 的 $f_{j}$ 之和。

```cpp
constexpr int N = 2e5 + 5, mod = 998244353;
struct mark {
	int add{ 0 };   // 加法标记
	void apply(const mark& o, int s)& {
		add += o.add;
	}
};
struct info {
	int mn{ 0 };  // 最小值
	int tot{ 0 }; // 最小值的个数
	void apply(const mark& o, int s)& {
		mn += o.add;
	}
	void apply(const info& o)& {
		*this = o;
	}
	friend info operator + (const info& l, const info& r) {
		if (l.mn < r.mn) return l;
		if (l.mn > r.mn) return r;
		return { l.mn, (l.tot + r.tot) % mod };
	}
};

void eachT() {
	int n, m;
	cin >> n >> m;

	vector<int> a(n);
	for (int i = 0; i < n; ++i) {
		cin >> a[i];  // a[i] in [1,n] 无需离散化
	}

	vector<vector<int>> pos(n + 1);
	for (int v = 1; v <= n; ++v) {
		pos[v].push_back(0);
	}
	for (int i = 0; i < n; ++i) {
		pos[a[i]].push_back(i + 1);
	}
	for (int v = 1; v <= n; ++v) {
		pos[v].push_back(n + 1);
	}

	vector<vector<array<int, 3>>> c(n + 2);
	while (m--) {
		int x;
		cin >> x;
		for (int v = 1; v <= n; ++v) {
			for (int i = x; i + 1 < pos[v].size(); ++i) {
				int L = pos[v][i - x];
				int R = pos[v][i - x + 1] - 1;
				int st = pos[v][i];
				int ed = pos[v][i + 1];
				c[st].push_back({ L, R, 1 });  // 从st开始[L,R]打上Tag
				c[ed].push_back({ L, R, -1 }); // 从ed开始[L,R]撤去Tag
			}
		}
	}

	vector<int> f(n + 2);

	SMT<info, mark> smt;
	smt.init(0, n);
	smt.modify(0, { 0, 1 });

	for (int i = 1; i <= n; ++i) {
		for (auto& [l, r, val] : c[i]) {
			smt.modify(l, r, { val });           // 打个Tag
		}

		auto qq = smt.query(0, n);
		f[i] = qq.tot * (qq.mn == 0);      // 求集合中没有Tag的dp值之和

		smt.modify(i, { 0, f[i] });        // 当前的dp值扔到集合里去
	}

	cout << f[n] << '\n';
}
```


### 2024 牛客多校 7D-Interval Selection

给定一个由 $n$ 个整数组成的数组 $a$。求满足每个数都出现恰好 $k$ 次的子数组数量。


```cpp
struct mark {
	int add{ 0 };   // 加法标记
	void apply(const mark& o, int s)& {
		add += o.add;
	}
};

struct info {
	int mn{ 0 };  // 最小值
	ll tot{ 0 }; // 最小值的个数
	void apply(const mark& o, int s)& {
		mn += o.add;
	}
	void apply(const info& o)& {
		*this = o;
	}
	friend info operator + (const info& l, const info& r) {
		if (l.mn < r.mn) return l;
		if (l.mn > r.mn) return r;
		return { l.mn, l.tot + r.tot };
	}
};

SMT<info, mark> smt;
void eachT() {
	int n, k;
	cin >> n >> k;

	vector<int> a(n), alls;
	for (int i = 0; i < n; ++i) {
		cin >> a[i];
		alls.push_back(a[i]);
	}
	sort(alls.begin(), alls.end());
	alls.erase(unique(alls.begin(), alls.end()), alls.end());
	for (int i = 0; i < n; ++i) {
		a[i] = lower_bound(alls.begin(), alls.end(), a[i]) - alls.begin() + 1;
	}

	vector<vector<int>> pos(n + 1);
	for (int i = 0; i < n; ++i) {
		pos[a[i]].push_back(i + 1);
	}
	for (int v = 1; v <= n; ++v) {
		pos[v].push_back(n + 1);
	}

	vector<vector<array<int, 3>>> c(n + 2);
	for (int v = 1; v <= n; ++v) {
		for (int i = 0; i + 1 < pos[v].size(); ++i) {
			int st = pos[v][i], ed = pos[v][i + 1];
			// 只有[L,R]是ok的 其余区间都打上Tag
			if (i >= k - 1) {
				int L = i >= k ? pos[v][i - k] + 1 : 1, R = pos[v][i - k + 1];
				c[st].push_back({ L, R, -1 });
				c[ed].push_back({ L, R, 1 });
			}
			c[st].push_back({ 1, st, 1 });
			c[ed].push_back({ 1, st, -1 });
		}
	}

	smt.init(1, n);
	for (int i = 1; i <= n; ++i) {
		smt.modify(i, { 0, 1 });
	}

	ll res = 0;
	for (int i = 1; i <= n; ++i) {
		for (auto& [l, r, val] : c[i]) {
			smt.modify(l, r, { val });
		}

		auto qq = smt.query(1, i);
		res += qq.tot * (qq.mn == 0);
	}
	cout << res << "\n";
}
```

### 2024 杭电多校 4012 - 寻找宝藏

[[../《区域赛难题攻坚档案》/2024杭电多校/2024-07-29：2024“钉耙编程”中国大学生算法设计超级联赛（4）#4012 - 寻找宝藏|2024-07-29：2024“钉耙编程”中国大学生算法设计超级联赛（4）]]

你得到了一张藏宝图，这上面标记了埋藏在地底下的 $n$ 个海盗藏宝箱，编号依次为 $1$ 到 $n$，第 $i$ 个宝箱的坐标是 $(i,p_i)$，打开它你将得到 $v_i$ 枚金币。  
  
你现在位于 $(0,0)$，每次你可以选择从 $(x,y)$ 移动到 $(x+1,y)$ 或者 $(x,y+1)$，当你位于某个宝箱正上方时，你将可以挖出它并拿走里面的所有金币。  
  
不幸的是，有一个危险的陷阱区域没有被标记出来！通过多方调研，你得知这是一个边平行坐标轴的矩形区域，它是 $m$ 种可能的位置分布之一。请对于每种可能的情况分别计算按照最优路线你能拿走多少金币。  
  
假设陷阱区域的位置分布是第 $i$ 种可能，假设它是以 $(x_1,y_1)$ 和 $(x_2,y_2)$ 为对顶点的矩形，那么 $(x,y)$ 是陷阱当且仅当 $x_1\leq x\leq x_2$ 且 $y_1\leq y\leq y_2$。你的路线不能途径任何陷阱点。当然，你只需要考虑当前的第 $i$ 个矩形，不需要考虑其它 $m-1$ 个矩形。

[2024暑期集训补题（线段树优化DP + 扫描线）-CSDN博客](https://blog.csdn.net/a2216760004/article/details/140806605)


```cpp
struct info {
	ll mx{ 0 };  // 最大值
	void apply(const info& o)& {
		*this = o;
	}
	friend info operator + (const info& l, const info& r) {
		return { max(l.mx, r.mx) };
	}
};

struct Rectangle {
	int L, R, D, U; 
	ll LD; 
	ll RU; 
	ll ans;  
} que[N];
vector<int> L[N], R[N];
int p[N];
ll f[N], g[N], h[N], w[N];
SMT<info> smt;
void eachT() {
	ll n, m;
	cin >> n >> m;

	for (int i = 1; i <= n; ++i) {
		cin >> p[i] >> w[i];
		L[i].clear();
		R[i].clear();
	}

	for (int i = 1; i <= m; ++i) {
		cin >> que[i].L >> que[i].D >> que[i].R >> que[i].U;
		L[que[i].L].push_back(i);
		R[que[i].R].push_back(i);
	}

	smt.init(1, n);
	for (int i = 1; i <= n; ++i) {
		for (auto id : L[i]) {
			que[id].LD = smt.query(1, que[id].U).mx;
		}
		f[i] = smt.query(1, p[i]).mx + w[i];
		smt.modify(p[i], { f[i] });
		for (auto id : R[i]) {
			que[id].RU = smt.query(1, que[id].D - 1).mx;
		}
	}

	smt.init(1, n);
	for (int i = n; i >= 1; i--) {
		for (auto id : R[i]) {
			que[id].RU += smt.query(que[id].D, n).mx;
		}
		g[i] = smt.query(p[i], n).mx + w[i];
		h[i] = f[i] + g[i] - w[i];
		smt.modify(p[i], { g[i] });
		for (auto id : L[i]) {
			que[id].LD += smt.query(que[id].U + 1, n).mx;
		}
	}

	for (int i = 1; i <= m; ++i) {
		que[i].ans = max(que[i].LD, que[i].RU);
	}

	smt.init(1, n);
	for (int i = 1; i <= n; ++i) {
		for (auto id : L[i]) {
			chmax(que[id].ans, smt.query(que[id].U, n).mx);
		}
		smt.modify(p[i], { h[i] });
	}

	smt.init(1, n);
	for (int i = n; i >= 1; i--) {
		for (auto id : R[i]) {
			que[id].ans = max(que[id].ans, smt.query(1, que[id].D).mx);
		}
		smt.modify(p[i], { h[i] });
	}

	for (int i = 1; i <= m; ++i) {
		cout << que[i].ans << '\n';
	}
}
```


