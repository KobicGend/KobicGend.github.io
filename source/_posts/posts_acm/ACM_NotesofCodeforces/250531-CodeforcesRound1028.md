---
title: Codeforces Round 1028 Div.1ABD / Div.2CDF
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
abbrlink: 26af8780
date: 2025-06-01 22:29:00
updated: 2025-06-01 22:29:00
---
## [2115A / 2116C - Gellyfish and Flaming Peony](https://codeforces.com/contest/2115/problem/A)

题意：给定一个包含 $n$ 个正整数的数组 $a$。任意次操作：选择两个索引 $i$ 和 $j$，然后将 $a_i$ 的值更新为 $\gcd(a_i, a_j)$。求出让数组中所有元素都相等所需的最少操作次数。

所有元素最终必然会相等，且等于整个初始数组的 GCD。问题的核心就变成了如何求得最小的 GCD。

**方法一**：看到 5000 考虑 $\mathcal O(n^{2})$ 的 DP。设 $dp_{i,x}$ 表示前 $i$ 个数中至少需要选出几个数才能组合出 GCD 等于 $x$。复杂度 $\mathcal O(nV\log V)$，$V=5000$，能过。

```cpp
#include <bits/stdc++.h>
using namespace std;

using uint = unsigned;
using ll = long long;
using ull = unsigned long long;
using ulll = unsigned __int128;

constexpr ll inf = 0x3f3f3f3f3f3f3f3f;

void solve() {
    int n;
    cin >> n;

    vector<int> a(n);
    int d = 0;
    for (int i = 0; i < n; i++) {
        cin >> a[i]; 
        d = gcd(d, a[i]); 
    }

    int cnt = 0;
    int has_one = 0;
    for (int i = 0; i < n; i++) {
        cnt += a[i] != d;
        if (a[i] == d) has_one = 1;
    }

    const int N = 5001;
    vector<int> dp(N, inf);
    for (int i = 0; i < n; i++) {
        auto ndp = dp;
        ndp[a[i]] = 0;
        for (int j = 1; j < N; j++) {
            ndp[gcd(j, a[i])] = min(ndp[gcd(j, a[i])], dp[j] + 1);
        } 
        dp = ndp;
    }
    cout << (dp[d] + cnt - 1 + has_one) << endl;
}

int main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    for (int t = (cin >> t, t); t--; )
        solve();

    return 0;
}
```

题意：给定一个包含 $n$ 个正整数的数组 $a$。任意次操作：选择两个索引 $i$ 和 $j$，然后将 $a_i$ 的值更新为 $\gcd(a_i, a_j)$。求出让数组中所有元素都相等所需的最少操作次数。

官方题解给出了本题的 Bonus 版本：Try to solve $n, a_i \leq 2 \times 10^5$ with only one test case. 设值域为 $V$，期望复杂度 $\mathcal{O}(V\log V)$。

---

所有元素最终必然会相等，且等于整个初始数组的 GCD。问题的核心就变成了如何求得最小的 GCD。

考虑到求得最小的 GCD 需要的数不会很多，事实上最大只会是 $\omega(V)=8$，即 $V$ 以内一个数的最大素因子个数。

我们采用迭代的方式求解。迭代 $t$ 轮次后得到：**恰好选出 $t$ 个数（允许重复），它们的 GCD 可能为哪些**。循环 $\omega(V)$ 轮次后就找出答案，每轮迭代期望复杂度 $\mathcal{O}(V\log V)$。

设 
- $f[i]$: 初始数组中数字 $i$ 的出现次数，
- $g[t][i]$: 迭代 $t$ 轮次后，数字 $i$ 当前是否可以被表示为若干个数的 GCD。
每一轮迭代需要用 $f$ 来更新 $g[t]$，具体来说是 $g[t][i]$ 将被赋值为：是否有可能从 $f$ 中选一个数 $x$，再从 $g[t-1]$ 选一个数 $y$，且其最大公约数 $\gcd(x, y)=i$。

$x$ 和 $y$ 都一定是 $i$ 的倍数，枚举 $i$ 的倍数（两个 log），加上 gcd 的判断（一个 log），复杂度 $\mathcal{O}(V\log^{3} V)$。

总的复杂度 $\mathcal{O}(V\log^{3} V\omega(V))$，跑 2e5 的数据还是有点危险的。

---

进一步优化，引入辅助数组
- $h[t][i]$ 表示：是否有可能从 $f$ 中选一个数 $x$，再从 $g[t-1]$ 选一个数 $y$，它们的最大公约数 $\gcd(x, y)$ 是 $i$ 的倍数。
这样 $x$ 和 $y$ 都一定是 $i$ 的倍数，通过枚举倍数在 $\mathcal{O}(V\log V)$ 的时间就能求出 $h$ 数组。

显然 $\displaystyle h[t][n]=\sum_{k}g[t][nk]$，为用 $h[t]$ 表示 $g[t]$ 需要用到莫比乌斯反演，
$$
\displaystyle g[t][n] = \sum_{k}\mu[k] \cdot h[t][n k]
$$

总的复杂度 $\mathcal{O}(V\log V \cdot\omega(V))$。

注：莫比乌斯反演
$$
\begin{aligned}
f[n]=\displaystyle \sum_{d \mid n} g[d]
&\quad\iff\quad 
g[n]=f[n]\ast\mu[n]=\sum_{d \mid n} \mu[d]\cdot f\Big[\frac{n}{d}\Big]
\\
f[n] = \sum_{d=1}^{\infty} g[n d]
&\quad\iff\quad 
g[n] = \sum_{d=1}^{\infty} \mu[d] \cdot f[n d]
\end{aligned}
$$
其中莫比乌斯函数 $\mu[n] = \begin{cases} 1, & n = 1 \\ 0, & \exists d > 1, d^{2} \mid n \\ (-1)^{\omega(n)}, & \text{otherwise}\end{cases}$ 可以用欧拉筛线性预处理。

核心代码：

```cpp
vector<int> f(V);       // f[i]: 初始数组中数字 i 的出现次数
vector<int> g(V);       // g[i]: 数字 i 当前是否可以被表示出来

for (auto x : a) {
	f[x] = 1;
	g[x] = 1;
}

for (int t = 1; ; t++) {
	vector<int> h(V);
	for (int i = 1; i < V; i++) {
		int sumf = 0;
		int sumg = 0;
		for (int j = i; j < V; j += i) {
			sumf += f[j];
			sumg += g[j];
		}
		h[i] = sumf * sumg;
	}
	for (int i = 1; i < V; i++) {
		g[i] = 0;
		for (int k = 1; i * k < V; k++) {
			g[i] += mu[k] * h[i * k];
		}
	}
	if (g[d] > 0) {
		cout << (t + n - 1) << endl;
		return;
	}
}
```

---

Zeta - Möbius Transform 用于计算偏序集上一个元素的所有上级（或下级）元素的某个函数值的总和。在这里我们将其应用到「倍数——因子」这个上下级关系，即
$$
X[n] = \sum_{d=1}^{\infty} x[nd] 
$$
代码里算 `sumf` 和 `sumg` 就是在求 Mobius 变换。

上面讲解中的 $h[t]$ 实际上是 $f$ 和 $g[t-1]$ GCD 卷积的变换域表示，一个域的卷积对应于另一个域的乘法，$h[t][k]=F[k]\cdot G[t][k]$；而从 $h[t]$ 倒推 $g[t]$ 的过程，实际做了一次反 Mobius 变换。

从这个角度看，没有必要每次循环都先正变换再反变换。直接一直在变换域做点值乘法，只判断 $g[t][d]$ 这一项是否大于 0。

复杂度 $\mathcal{O}(V\log V+V\cdot\omega(V))$。

核心代码：

```cpp
vector<int> f(V);       // f[i]: 初始数组中数字 i 的出现次数
for (auto x : a) {
	f[x] = 1;
}

vector<int> F(V);   // f 的变换域表示，原代码的 sumf
for (int i = 1; i < V; i++) {
	for (int j = i; j < V; j += i) {
		F[i] += f[j];
	}
}
auto G = F;  // g[0] 的变换域表示，原代码的 sumg

for (int t = 1; ; t++) {
	for (int i = 1; i < V; i++) {
		G[i] *= F[i];  // 做一次卷积 g[t] = g[t - 1] * f <=> G[t][i] = G[t][i] * F[i]
	}
	int res = 0;   // 原代码的 g[t][d]，第 t 次变换后，d 的值
	for (int k = 1; d * k < V; k++) {
		res += mu[k] * G[d * k];
	}
	if (res > 0) {
		cout << (t + n - 1) << endl;
		return;
	}
}
```

---

完整代码：

```cpp
#include <bits/stdc++.h>
using namespace std;

constexpr int N = 1e4;
vector<int> prime;
int minp[N];   // 最小素因子
int mu[N];     // 莫比乌斯函数

void solve() {
    int n;
    cin >> n;

    vector<int> a(n);
    int d = 0;
    for (int i = 0; i < n; i++) {
        cin >> a[i];
        d = gcd(d, a[i]);
    }

    int cnt = count(a.begin(), a.end(), d);
    if (cnt) {
        cout << (n - cnt) << endl;
        return;
    }

    const int V = *max_element(a.begin(), a.end()) + 1;

    vector<int> f(V);       // f[i]: 初始数组中数字 i 的出现次数
    for (auto x : a) {
        f[x] = 1;
    }

    vector<int> F(V);   // f 的变换域表示，原代码的 sumf
    for (int i = 1; i < V; i++) {
        for (int j = i; j < V; j += i) {
            F[i] += f[j];
        }
    }
    auto G = F;  // g[0] 的变换域表示，原代码的 sumg

    for (int t = 1; ; t++) {
        for (int i = 1; i < V; i++) {
            G[i] *= F[i];  // 做一次卷积 g[t] = g[t - 1] * f <=> G[t][i] = G[t][i] * F[i]
        }
        int res = 0;   // 原代码的 g[t][d]，第 t 次变换后，d 的值
        for (int k = 1; d * k < V; k++) {
            res += mu[k] * G[d * k];
        }
        if (res > 0) {
            cout << (t + n - 1) << endl;
            return;
        }
    }
}

int main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    minp[1] = 1;
    mu[1] = 1;
    for (int i = 2; i < N; i++) {
        if (!minp[i]) {
            minp[i] = i;
            prime.push_back(i);
            mu[i] = -1;
        }
        for (auto p : prime) {
            if (i * p >= N) break;
            minp[i * p] = p;
            if (p == minp[i]) {
                mu[i * p] = 0;
                break;
            }
            mu[i * p] = -mu[i];
        }
    }

    for (int t = (cin >> t, t); t--; )
        solve();

    return 0;
}
```

评注：
1. 数论中很多东西不太大，比如素数距离和素因子个数等，看似有好几层循环实际上很小。
2. 「恰好」不好做，尝试转化为「至少」或「至多」，再反演得到结果。本题是把 GCD 恰好等于某数转化为 GCD 是某数的倍数。

## [2115B / 2116D - Gellyfish and Camellia Japonica](https://codeforces.com/contest/2115/problem/B)

大概想法是先找出必要条件，再验证充分性。

倒着求出每个数的下界（$a_{x} \geqslant a_z,\ a_{y} \geqslant a_{z}$），取 $a$ 为这个下界，再验证构造出的这个 $a$ 是否合法。复杂度 $\mathcal O(n+q)$。

```cpp
#include <bits/stdc++.h>
using namespace std;

void solve() {
    int n, q;
    cin >> n >> q;

    vector<int> b(n);
    for (int i = 0; i < n; i++) {
        cin >> b[i];
    }

    vector<array<int, 3>> que(q);
    for (auto& [x, y, z] : que) {
        cin >> x >> y >> z;
        x--, y--, z--;
    }
    reverse(que.begin(), que.end());

    auto a = b;
    for (auto& [x, y, z] : que) {
        a[y] = max(a[y], a[z]);
        a[x] = max(a[x], a[z]);
        if (z != x && z != y) {   // 特别注意这个判断
            a[z] = 0;
        }
    }

    reverse(que.begin(), que.end());
    auto c = a;
    for (auto& [x, y, z] : que) {
        c[z] = min(c[x], c[y]);
    }

    if (b != c) {
        cout << -1 << endl;
        return;
    }

    for (int i = 0; i < n; i++) {
        cout << a[i] << " ";
    }
    cout << endl;
}

int main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    for (int t = (cin >> t, t); t--; )
        solve();

    return 0;
}
```

## [2115D / 2116F - Gellyfish and Forget-Me-Not](https://codeforces.com/contest/2115/problem/D) - UPSOLVE

这题方法应该不少，写一个相对好理解的。

先置 $a_{i}:=a_{i}\oplus b_{i},\mathrm{res}:=\mathrm {res}\oplus b_{i}$，这样相当于每个人可以选择要不要 $a_{i}$。

考虑 $a$ 只有 01 怎么做：最后一个拿到 $a =1$ 的人有决定权，可以改成他想要的数。因此检查最后一个 $a =1$ 的位置，如果是 $c=1$，那么答案为 1，否则答案为 0。

如果有多位，就要知道每一个二进制位的决定权在谁手上。倒序遍历（因为要找最后一个位置）$a$ 并插入线性基，设将 $a_{i}$ 插入线性基后的最高位为 $2^{d}$，那么 $d$ 的决定权就在 $c_{i}$ 手上。

现在，从高到低遍历每个二进制位，这一位 $d$ 的决定权在谁手上，这个人就能把这一位变成他想要的数（ $c=1$ 则变成 1，否则变成 0）。

```cpp
#include <bits/stdc++.h>
using namespace std;

using uint = unsigned;
using ll = long long;
using ull = unsigned long long;
using ulll = unsigned __int128;

constexpr int B = 60;

void solve() {
    int n;
    cin >> n;

    vector<ull> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    ull res = 0;
    for (int i = 0; i < n; i++) {
        ull x;
        cin >> x;
        a[i] ^= x;
        res ^= x;
    }
    string c;
    cin >> c;

    array<ull, B> h{};   // 线性基
    array<bool, B> op{};
    for (int i = n - 1; i >= 0; i--) {
        auto& x = a[i];
        for (int bit = B - 1; bit >= 0; bit--) {
            if (x >> bit & 1) {
                if (!h[bit]) {
                    op[bit] = c[i] - '0';
                    h[bit] = x;
                    break;
                } else {
                    x ^= h[bit];
                }
            }
        }
    }
    for (int bit = B - 1; bit >= 0; bit--) {
        if (op[bit] ^ (res >> bit & 1)) {
            res ^= h[bit];
        }
    }
    cout << res << endl;
}

int main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    for (int t = (cin >> t, t); t--; )
        solve();

    return 0;
}
```



