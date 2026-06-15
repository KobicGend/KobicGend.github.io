---
title: 2025 ICPC Asia EC 网络赛第二场 CDEHIJK
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
description: The 2025 ICPC Asia East Continent Online Contest (II)
highlight_shrink: true
abbrlink: 133b4430
date: 2025-09-14 19:30:00
updated: 2025-09-14 19:30:00
---

官方题解：[2025 ICPC Asia EC Online Round2 官方题解 - 知乎](https://zhuanlan.zhihu.com/p/1950637403929806516)

https://pintia.cn/rankings/1964904761885741056

# [C. Jiaxun!](https://qoj.ac/contest/2524/problem/14316)

二分答案，复杂度 $\mathcal{O}(\log S)$。

check 的想法是，匀一匀总能匀出来（似乎是 Hall 定理保证的）。

对于 mask $t$，必须满足能为 $t$ 提供题目的 $F$ （即满足 $s \cap t$ 非空的 $F_{s}$）之和 $\geqslant |t|\times\text{mid}$。比如对于 2,3 这两个人，要满足能为 2,3 提供题目的 $F$ 之和（即 $F_{2},F_{3},\dots,F_{7}$） $\geqslant 2\times\text{mid}$。

```cpp
#include <bits/stdc++.h>
using namespace std;

signed main() {
    int t;
    cin >> t;

    while (t--) {
        int S;
        cin >> S;

        array<int, 8> F{};
        for (int i = 1; i < 8; i++) {
            cin >> F[i];
        }

        auto check = [&](int mid) {
            for (unsigned t = 1; t < 8; t++) {
                int sum = 0;
                for (unsigned s = 1; s < 8; s++) {
                    if ((s & t) > 0) {
                        sum += F[s];
                    }
                }
                if (mid * popcount(t) > sum) {
                    return false;
                }
            }
            return true;
        };

        int lo = 0, hi = S;
        while (lo <= hi) {
            int mid = lo + hi >> 1;
            if (!check(mid)) {
                hi = mid - 1;
            } else {
                lo = mid + 1;
            }
        }
        cout << lo - 1 << endl;
    }

    return 0;
}
```

实际上这个二分可以省略。

```cpp
#include <bits/stdc++.h>
using namespace std;

signed main() {
    int t;
    cin >> t;

    while (t--) {
        int S;
        cin >> S;

        array<int, 8> F{};
        for (int i = 1; i < 8; i++) {
            cin >> F[i];
        }

        int res = S;
        for (unsigned t = 1; t < 8; t++) {
            int sum = 0;
            for (unsigned s = 1; s < 8; s++) {
                if ((s & t) > 0) {
                    sum += F[s];
                }
            }
            res = min(res, sum / popcount(t));
        }
        cout << res << endl;
    }

    return 0;
}
```

# [D. Arcane Behemoths](https://qoj.ac/contest/2524/problem/14317)

只保留一项是最优的，而且是从大到小依次删除。

不妨升序排序 $A$，若序列第 $i$ 项作为子序列的第 $k$ 小，则这一位置的贡献系数是

$$
f_{k} = \begin{cases}
1, & k=1 \\
2^{k-2}, & k \geqslant 2 
\end{cases}
$$

前 $i-1$ 个数要选 $k-1$ 个，后面 $N-i$ 个数可选可不选，方案数是 $\dbinom{i-1}{k-1} 2^{N-i}$，因此答案为

$$
\begin{aligned}
\text{Answer} 
&= \sum_{i=1}^{N} \sum_{k=1}^{i} \binom{i-1}{k-1} 2^{N-i} A_{i} f_{k} \\
&= \sum_{i=1}^{N} 2^{N-i} A_{i} \bigg[ 1 + \sum_{k=2}^{i} \binom{i-1}{k-1} 2^{k-2}  \bigg] \\
&= \sum_{i=1}^{N} 2^{N-i} A_{i} \bigg[ 1 + \dfrac{1}{2}(3^{i - 1} - 1) \bigg]
\end{aligned}
$$

复杂度 $\mathcal{O}(N)$。

（写这个题的时候还没有写取模类）

```cpp
#include <bits/stdc++.h>
using namespace std;

constexpr int mod = 998'244'353;
constexpr int inv2 = mod + 1 >> 1;

signed main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        vector<int> a(n);
        for (auto& x : a) cin >> x;
        sort(a.begin(), a.end());

        vector<int> pow2(n + 1);
        pow2[0] = 1;
        for (int i = 0; i < n; i++) {
            pow2[i + 1] = 2LL * pow2[i] % mod;
        }

        int res = 0;
        int pow3 = 1;
        for (int i = 0; i < n; i++) {
            res += 1LL * a[i] * ((1 + 1LL * (pow3 - 1) * inv2 % mod) % mod) % mod * pow2[n - 1 - i] % mod;
            res %= mod;
            pow3 = 1LL * pow3 * 3 % mod;
        }
        if (res < 0) {
            res += mod;
        }
        cout << res << endl;
    }

    return 0;
}
```


# [E. Zero](https://qoj.ac/contest/2524/problem/14318)

## 方法 1 构建递推数列

设 $f_{n}$ 表示长 $n$ 序列，值域为 $M$ 的答案，则

$$
f_{n} = 2^{M} \big( 2^{M}-1 \big)^{n-2} - f_{n-2} \big( 2^{M}-1 \big)
$$

含义是，第一个数有 $2^{M}$ 种选法，第 $2\sim n-1$ 个数皆有 $2^{M}-1$ 种选法，最后一个数是唯一确定的，因为要保证异或和为 0。但是这样可能会导致最后两个数相同，此时前 $n-2$ 个数的异或和为 0，是合法序列，方案数有 $f_{n-2}$，需要减去 $f_{n-2} \big( 2^{M}-1 \big)$。

### 方法 1.1 直接求解递推数列

$$
f_{n} = 2^{M} \big( 2^{M}-1 \big)^{n-2} - f_{n-2} \big( 2^{M}-1 \big)
$$

递推式等价于
$$
\Big[ f_{n} - \big( 2^{M}-1 \big)^{n-1} \Big] + \big( 2^{M}-1 \big) \Big[ f_{n-2} - \big( 2^{M}-1 \big)^{n-3} \Big] = 0
$$

利用累乘法，得到通项

$$
f_{N} = \begin{cases}
\big( 2^{M}-1 \big)^{N-1} + \big( 1 - 2^{M} \big)^{N/2-1} \big( f_{2} - \big( 2^{M}-1 \big) \big), & 2 \mid N \\
\big( 2^{M}-1 \big)^{N-1} + \big( 1 - 2^{M} \big)^{(N+1)/2-1} ( f_{1} - 1 ), & 2 \nmid N 
\end{cases}
$$

代入初始条件

$$
\begin{cases}
f_{1} = 1 \\
f_{2} = 0
\end{cases}
$$

就得到了最终结果

$$
f_{N} = \begin{cases}
\big( 2^{M}-1 \big)^{N-1} + \big( 1 - 2^{M} \big)^{N/2}, & 2 \mid N \\
\big( 2^{M}-1 \big)^{N-1}, & 2 \nmid N 
\end{cases}
$$

复杂度 $\mathcal{O}(\log M + \log N)$。

代码中 Z 是取模类。

```cpp
signed main() {
    int t;
    cin >> t;

    while (t--) {
        int N, M;
        cin >> N >> M;

        Z g = qpow(Z(2), M) - 1;

        Z res = qpow(g, N - 1);
        if (N % 2 == 0) {
            res += qpow(-g, N / 2);
        }
        cout << res << endl;
    }

    return 0;
}
```

### 方法 1.2 矩阵快速幂

$$
f_{n} = 2^{M} \big( 2^{M}-1 \big)^{n-2} - f_{n-2} \big( 2^{M}-1 \big)
$$

这个东西是线性递推（线性变换），可以用矩阵表示，但不是齐次常系数。为写成矩阵的形式，需要在矩阵里添加一维存储 $\big( 2^{M}-1 \big)^{n}$：

$$
\begin{bmatrix}
f_{n} \\
f_{n-2} \\
\big( 2^{M}-1 \big)^{n}
\end{bmatrix}
=
\begin{bmatrix}
-\big( 2^{M}-1 \big) & 0 & 2^{M} \\
1 & 0 & 0 \\
0 & 0 & \big( 2^{M}-1 \big)^{2}
\end{bmatrix}
\begin{bmatrix}
f_{n-2} \\
f_{n-4} \\
\big( 2^{M}-1 \big)^{n-2}
\end{bmatrix}
$$

然后分奇偶快速幂就好了。

复杂度 $\mathcal{O}[K^{3}(\log M + \log N)]$，$K=3$。

```cpp
struct Matrix : array<array<Z, 3>, 3> {
    Matrix(int x = 0) {
        for (int i = 0; i < 3; i++) {
            (*this)[i][i] = x;
        }
    }
    friend Matrix operator * (const Matrix& a, const Matrix& b) {
        Matrix res;
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                for (int k = 0; k < 3; k++) {
                    res[i][j] += a[i][k] * b[k][j];
                }
            }
        }
        return res;
    }
};

int main() {
    int t;
    cin >> t;

    while (t--) {
        ll N, M;
        cin >> N >> M;
    
        if (N == 1) {
            cout << 1 << endl;
            continue;
        }
    
        Z g = qpow(Z(2), M) - 1;
    
        Matrix T;
        T[0][0] = -g;
        T[0][2] = g + 1;
        T[1][0] = 1;
        T[2][2] = g * g;
    
        Matrix v0;
        ll exp;
        if (N % 2 == 0) { 
            v0[0][0] = 0;           // f_2
            v0[1][0] = 0;           // f_0
            v0[2][0] = g * g;
            exp = (N - 2) / 2;
        } else {
            v0[0][0] = g * g;       // f_3
            v0[1][0] = 1;           // f_1
            v0[2][0] = g * g * g;
            exp = (N - 3) / 2;
        }
    
        Matrix v = qpow(T, exp, Matrix(1)) * v0;
        cout << v[0][0] << endl;
    }

    return 0;
}
```

## 方法 2 对差分计数（官方题解的方法）

对于奇数长度，只需要确定后 $N-1$ 项与前一项的异或值 $d_{i}$，第一项的值就自然确定，这是因为

$$
A_{1} \oplus (A_{1} \oplus d_{1})  \oplus (A_{1} \oplus d_{1} \oplus d_{2}) \oplus \dots=0 \Longrightarrow A_{1} = d_{2} \oplus d_{4} \oplus    \dots  
$$

由于每个 $d_{i}$ 非零，选 $d_{i}$ 的方法数是 $\big( 2^{M}-1 \big)$，总方法数 $\big( 2^{M}-1 \big)^{N-1}$。

对于偶数长度，也有类似的式子

$$
A_{1} \oplus (A_{1} \oplus d_{1})  \oplus (A_{1} \oplus d_{1} \oplus d_{2}) \oplus \dots=0
$$

化简出来等价于

$$
0 = d_{1} \oplus d_{3} \oplus \dots
$$

另外一个条件是每个 $d_{i}$ 非零。现在求解 $d_{1},d_{3}.,,,$ 的方案数。

记 $f(n)$ 表示长度为 $n$ 的序列，满足异或和为 0 且每一项非零的方案数；记 $g(n)$ 表示长度为 $n$ 的序列，满足异或和为 0 的方案数。

考虑用 $f$ 表示 $g$，从长度为 $n$ 的序列中选出 $n-m$ 项为 0，剩余 $m$ 项非零，就有

$$
\displaystyle g(n) = \sum_{m = 0}^{n} \dbinom{n}{m} f(m)
$$

做二项式反演得到

$$
\displaystyle f(n) = \sum_{m = 0}^{n}(-1)^{n - m} \dbinom{n}{m} g(m)
$$

根据定义 $g(n) = 2^{M(n-1)}$（并补充定义 $g(0)=1$）代入得到

$$
\begin{aligned}
f(n) 
&= (-1)^{n - 0} \dbinom{n}{0} g(0) + \sum_{m = 1}^{n}(-1)^{n - m} \dbinom{n}{m} g(m) \\
&= (-1)^{n} + \sum_{m = 1}^{n}(-1)^{n - m} \dbinom{n}{m} 2^{M (m-1)} \\
&= (-1)^{n} - (-1)^{n - 0} \dbinom{n}{0} 2^{M (0-1)} + \sum_{m = 0}^{n}(-1)^{n - m} \dbinom{n}{m} 2^{M (m-1)} \\
&= (-1)^{n} - (-1)^{n} 2^{-M} + 2^{-M} \sum_{m = 0}^{n}(-1)^{n - m} \dbinom{n}{m} 2^{M m} \\
&= (-1)^{n} - (-1)^{n} 2^{-M} + 2^{-M} \big( 2^{M} - 1 \big)^{n} \\
\end{aligned} 
$$

此外，$A_{1}$ 有 $2^{M}$ 种选法，$d_{2},d_{4}$ 任选非零的数，有 $\big( 2^{M}-1 \big)^{N/2-1}$ 种选法，总的方案数是

$$
\begin{aligned}
\text{Answer} 
&= 2^{M} \big( 2^{M}-1 \big)^{N/2-1} f\bigg(\dfrac{N}{2}\bigg) \\
&= \big( 2^{M}-1 \big)^{N/2-1} \Big[ 2^{M} (-1)^{N/2} - (-1)^{N/2} + \big( 2^{M} - 1 \big)^{N/2} \Big] \\
&= \big( 2^{M}-1 \big)^{N/2-1} \Big[ \big( 2^{M} - 1 \big) (-1)^{N/2} + \big( 2^{M} - 1 \big)^{N/2} \Big] \\
&= \big( 2^{M}-1 \big)^{N-1} + \big( 1 - 2^{M} \big)^{N/2}
\end{aligned}
$$

# [H. Tree Shuffling](https://qoj.ac/contest/2524/problem/14321)

枚举端点 $x,y$ 并钦定这两个端点满足 $a_{x} \neq x,a_{y} \neq y$ ，中间的点随意。设链长是 $n$，容斥得到方案数是

$$
f(n) = n!-2(n-1)!+(n-2)!
$$

表示这 $n$ 个点都任意 shuffle 的方案数，减去 $a_{x} = x$ 的方案数，再减去 $a_{y} = y$ 的方案数，再加上同时满足 $a_{x} = x$ 和 $a_{y} = y$ 的方案数。

复杂度 $\mathcal{O}(N^{2})$。

代码中 Z 是取模类。

```cpp
signed main() {
    int t;
    cin >> t;

    while (t--) {
        int N;
        cin >> N;

        vector<vector<int>> adj(N);
        for (int i = 1; i < N; i++) {
            int x, y;
            cin >> x >> y;
            x--;
            y--;
            adj[x].push_back(y);
            adj[y].push_back(x);
        }

        vector<int> d(N);
        vector<vector<int>> subtree(N);
        auto dfs = [&](auto&& self, int x, int p) -> void {
            if (p != -1) {
                adj[x].erase(find(adj[x].begin(), adj[x].end(), p));
            }
            subtree[x].push_back(x);
            for (auto y : adj[x]) {
                d[y] = d[x] + 1;
                self(self, y, x);
                for (auto z : subtree[y]) {
                    subtree[x].push_back(z);
                }
            }
        };
        dfs(dfs, 0, -1);

        auto cal = [&](int n) -> Z {
            assert(n != 1);
            return fac[n] - 2 * fac[n - 1] + fac[n - 2];
        };

        Z res = 0;
        for (int lca = 0; lca < N; lca++) {
            for (int i = 0; i < adj[lca].size(); i++) {
                for (auto x : subtree[adj[lca][i]]) {
                    int n = d[x] - d[lca] + 1;
                    res += cal(n);
                    for (int j = 0; j < i; j++) {
                        for (auto y : subtree[adj[lca][j]]) {
                            int n = d[x] + d[y] - 2 * d[lca] + 1;
                            res += cal(n);
                        }
                    }
                }
            }
        }
        res += 1;
        cout << res << endl;
    }

    return 0;
}
```

# [I. DAG Query](https://qoj.ac/contest/2524/problem/14322)

路径上至多 $N-1$ 条边，因此答案是关于 $k$ 的 $N-1$ 次多项式。

询问 $f(1,N,i)$，$i=1,2,\dots,N-1$，又已知 $f(1,N,0)=0$，做 Lagrange 插值：

$$
\displaystyle f(1,N,K) = \sum_{k=0}^{N-1} f(1,N,k) \prod_{i: i \neq k} \dfrac{K-i}{k-i}
$$

复杂度 $\mathcal{O}(N)$。

代码中 Z 是取模类。

```cpp
signed main() {
    int N, M;
    cin >> N >> M;

    for (int i = 0; i < M; i++) {
        int x, y;
        cin >> x >> y;
    }

    vector<int> f(N);
    for (int i = 1; i < N; i++) {
        cout << "? 1 " << N << " " << i << endl;
        cin >> f[i];
    }

    cout << "!" << endl;
    int K;
    cin >> K;

    N--;
    vector<Z> pre(N + 1), suf(N + 1);
    pre[0] = 1;
    for (int i = 0; i < N; i++) {
        pre[i + 1] = pre[i] * (K - i);
    }
    suf[N] = 1;
    for (int i = N; i > 0; i--) {
        suf[i - 1] = suf[i] * (K - i);
    }

    Z res = 0;
    for (int k = 0; k <= N; k++) {
        res += f[k] * pre[k] * suf[k] * invfac[k] * invfac[N - k] * (N - k & 1 ? -1 : 1);
    }
    cout << res << endl;

    return 0;
}
```


# [J. Reconstruct the tree](https://qoj.ac/contest/2524/problem/14323)

为所给的无序对 $u-v$ 连边，必然构成完全 $k$ 分图（能划分成若干组，同一组内任意两点无边，不同组内任意两点有边）。

设有 $m$ 个点未出现在输入中（代码中的 `other`），分别标号 $1',2',\dots$，那么把组 $i$ 中的点挂在标号 $i'$ 上，再把这些标号 $i'$ 挂在另一个未出现的点上，就构造出了一种方案。于是有解时必须 $k<m$。

> 判断完全 $k$ 分图：$u,v$ 在同一集合中 $\iff$ $u,v$ 的邻接表相同。先将邻接表相同的点放入同一组，再检查是否满足不同组内任意两点有边。

> 判断集合相同：XOR Hash。

此外，完全图、链及完全二分图的情况略有不同，不过大体思路都是一样的。需要大力分类讨论。

```cpp
#include <bits/stdc++.h>
using namespace std;

using ull = unsigned long long;
mt19937_64 rnd(chrono::steady_clock::now().time_since_epoch().count());

signed main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    int t;
    cin >> t;

    while (t--) {
        int N, M;
        cin >> N >> M;

        vector<vector<int>> adj(N);
        set<int> pos;
        set<int> other;
        for (int x = 0; x < N; x++) {
            other.insert(x);
        }
        for (int _ = 0; _ < M; _++) {
            int x, y;
            cin >> x >> y;
            x--;
            y--;
            adj[x].push_back(y);
            adj[y].push_back(x);
            pos.insert(x);
            pos.insert(y);
            other.erase(x);
            other.erase(y);
        }

        map<ull, vector<int>> mp;
        vector<ull> hash(N);
        vector<ull> h(N);
        for (int x = 0; x < N; x++) {
            h[x] = rnd();
        }
        for (auto p : pos) {
            for (auto x : adj[p]) {
                hash[p] ^= h[x];
            }
            mp[hash[p]].push_back(p);
        }

        bool ok = true;
        for (auto p : pos) {
            if (mp[hash[p]].size() + adj[p].size() != pos.size()) {
                ok = false;
            }
        }
        int k = mp.size();

        if (!ok) {
            cout << "NO" << endl;
            continue;
        }

        if (k == pos.size()) { // 完全图
            if (k == 2) { // 构造一条链
                cout << "YES" << endl;
                if (N == 2) {
                    cout << "1 2" << endl;
                } else {
                    auto st = *other.begin();
                    other.erase(other.begin());
                    auto ed = st;
                    while (other.size()) {
                        auto now = *other.begin();
                        other.erase(other.begin());
                        cout << now + 1 << " " << ed + 1 << endl;
                        ed = now;
                    }
                    cout << *pos.begin() + 1 << " " << st + 1 << endl;
                    cout << *prev(pos.end()) + 1 << " " << ed + 1 << endl;
                }
            } else if (other.size() == 1) {  // 构造菊花
                cout << "YES" << endl;
                auto st = *other.begin();
                for (auto ed : pos) {
                    cout << ed + 1 << " " << st + 1 << endl;
                }
            } else if (k < other.size()) {  // 同完美 k 分图
                cout << "YES" << endl;
                auto st = *other.begin();
                other.erase(other.begin());
                while (pos.size()) {
                    auto ed = *pos.begin();
                    auto mid = *other.begin();
                    other.erase(other.begin());
                    pos.erase(pos.begin());
                    cout << ed + 1 << " " << mid + 1 << endl;
                    cout << mid + 1 << " " << st + 1 << endl;
                }
                while (other.size()) {
                    auto mid = *other.begin();
                    other.erase(other.begin());
                    cout << mid + 1 << " " << st + 1 << endl;
                }
            } else {
                cout << "NO" << endl;
            }
        } else { // 完美 k 分图
            if (k == 2) { // 完美二分图
                if (other.size() < 2) {
                    cout << "NO" << endl;
                } else {
                    cout << "YES" << endl;
                    auto st = *other.begin();
                    other.erase(other.begin());
                    auto ed = st;
                    while (other.size()) {
                        auto now = *other.begin();
                        other.erase(other.begin());
                        cout << now + 1 << " " << ed + 1 << endl;
                        ed = now;
                    }
                    for (auto p : (*mp.begin()).second) {
                        cout << p + 1 << " " << st + 1 << endl;
                    }
                    for (auto p : (*mp.rbegin()).second) {
                        cout << p + 1 << " " << ed + 1 << endl;
                    }
                }
            } else { // 完美 k 分图
                if (other.size() <= k) {
                    cout << "NO" << endl;
                } else {
                    cout << "YES" << endl;
                    auto st = *other.begin();
                    other.erase(other.begin());
                    for (auto& [_, vec] : mp) {
                        auto mid = *other.begin();
                        other.erase(other.begin());
                        for (auto p : vec) {
                            cout << p + 1 << " " << mid + 1 << endl;
                        }
                        cout << mid + 1 << " " << st + 1 << endl;
                    }
                    while (!other.empty()) {
                        auto mid = *other.begin();
                        other.erase(other.begin());
                        cout << mid + 1 << " " << st + 1 << endl;
                    }
                }
            }
        }
    }

    return 0;
}
```

# [K. The Only Heart](https://qoj.ac/contest/2524/problem/14324)

题目说的就是重心。重心有两个 $\iff$ 存在一条边，它两边的点的数量相等。

我们计算重心有两个的方案数，考虑 DP。

**状态表示**：

- $f_{u,k}$ 表示以 $u$ 为根的子树内，包含节点 $u$ 的连通块大小为 $k$ 的数量；
- $g_{u,k}$ 表示包含 $u$ 的父节点，不含 $u$ 的子树的连通块大小为 $k$ 的数量。

**转移方程**：将 $f_{u},g_{u}$ 视为多项式，即设

$$
\begin{aligned}
f_{u}(z) = \sum_{k=0}^{\infty} z^{k} f_{u,k} \\
g_{u}(z) = \sum_{k=0}^{\infty} z^{k} g_{u,k}
\end{aligned}
$$

则

$$
\begin{aligned}
f_{u}(z) &= z \times \prod_{v \in \text{children}(u)} (f_v + 1) \\
g_u(z) &= z \times (g_{\operatorname{parent}(u)} + 1) \times  \prod_{c \in \text{sibling}(u)} (f_c+1)
\end{aligned}
$$

多项式乘法的含义是对连通块大小做背包，其中 $z$ 项表示必须选 $u$ 点，$+1$ 表示可以不选整个子树。

$g_{u}$ 中 $c \in \text{sibling}(u)$ 部分用前后缀优化容易求得。由于 $g_{u}$ 只有 $k \leqslant \text{size}(u)$ 的部分有用，边做乘法边 resize，复杂度是经典树形背包的复杂度 $\mathcal{O}(N^{2})$。

**最终答案**：

$$
\displaystyle \sum_{u=1}^{N} \sum_{k=1}^{N} f_{u,k} - f_{u,k} g_{u,k}
$$

## 代码

```cpp
vector<Z> operator * (const vector<Z>& a, const vector<Z>& b) {
    vector<Z> c(a.size() + b.size() - 1);
    for (int i = 0; i < a.size(); i++) {
        for (int j = 0; j < b.size(); j++) {
            c[i + j] += a[i] * b[j];
        }
    }
    return c;
}

signed main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;
        vector<vector<int>> adj(n);
        for (int i = 1; i < n; i++) {
            int x, y;
            cin >> x >> y;
            x--, y--;
            adj[x].push_back(y);
            adj[y].push_back(x);
        }

        vector<vector<Z>> f(n);
        vector<int> parent(n, -1);
        auto dfs = [&](auto&& self, int x) -> void {
            if (parent[x] != -1) {
                adj[x].erase(find(adj[x].begin(), adj[x].end(), parent[x]));
            }
            f[x] = { 0, 1 };
            for (auto y : adj[x]) {
                if (y == parent[x]) continue;
                parent[y] = x;
                self(self, y);
                f[x] = f[x] * f[y];
            }
            f[x][0] = 1;
        };
        dfs(dfs, 0);

        vector<vector<Z>> g(n);
        auto dfs2 = [&](auto&& self, int x) -> void {
            int m = adj[x].size();
            if (m == 0) {
                return;
            }
            vector<vector<Z>> pre(m + 1), suf(m);
            pre[0] = { 1 };
            for (int i = 0; i < m; i++) {
                pre[i + 1] = pre[i] * f[adj[x][i]];
            }
            suf[m - 1] = { 1 };
            for (int i = m - 1; i > 0; i--) {
                suf[i - 1] = suf[i] * f[adj[x][i]];
            }            
            for (int i = 0; i < m; i++) {
                auto y = adj[x][i];
                g[y] = { 0, 1 };
                g[y] = g[y] * g[x];
                g[y].resize(f[y].size());
                g[y] = g[y] * pre[i];
                g[y].resize(f[y].size());
                g[y] = g[y] * suf[i];
                g[y].resize(f[y].size());
                g[y][0] = 1;
                self(self, y);
            }
        };
        g[0] = { 1 };
        dfs2(dfs2, 0);

        Z res = 0;
        for (int x = 0; x < n; x++) {
            res += accumulate(f[x].begin(), f[x].end(), Z(0));
            for (int k = 0; k < min(g[x].size(), f[x].size()); k++) {
                res -= g[x][k] * f[x][k];
            }
        }
        cout << res << endl;
    }

    return 0;
}
```

## 复杂度分析

**$f$ 的复杂度分析**（经典树形背包）：

设 $u$ 是 $v$ 的父节点，对于 $f_{u} \gets f_{u} \times f_v$，$f_v$ 的长度恰好是 $\operatorname{size}(v)$，而转移之前 $f_{u}$ 的长度至多为 $\operatorname{size}(u) - \operatorname{size}(v)$，因此单次乘法复杂度 $\operatorname{size}(v) \cdot [\operatorname{size}(u) - \operatorname{size}(v)]$，求和得到：

$$
\begin{aligned}
&\ \ \ \, \  \sum_{u=1}^{N} \sum_{v \in \operatorname{children}(u)} \operatorname{size}(v) \cdot [\operatorname{size}(u) - \operatorname{size}(v)] \\
&= \sum_{u=1}^{N} \Bigg[ \operatorname{size}(u) \Bigg( \sum_{v \in \operatorname{children}(u)} \operatorname{size}(v) \Bigg) - \sum_{v \in \operatorname{children}(u)} \operatorname{size}^{2}(v) \Bigg] \\
&= \sum_{u=1}^{N} \Bigg[ \operatorname{size}^{2}(u) - \sum_{v \in \operatorname{children}(u)} \operatorname{size}^{2}(v) \Bigg] \\
&= \operatorname{size}^{2}(\text{root}) = N^{2}
\end{aligned}
$$

更直观的理解是，任意两个点只在它们的 LCA 处发生一次交互，产生 1 的时间复杂度贡献。

**$g$ 的复杂度分析**：

前后缀预处理部分与 $f$ 的形式类似，复杂度相同。

对于转移 $g_{v} \gets g_{v} \times \text{pre}_{v}$ 和 $g_{v} \gets g_{v} \times \text{suf}_{v}$，由于已经限定 $g_{v}$ 长度至多 $\operatorname{size}(v)$，而且 $\text{pre}_{v}$ 的长度至多为 $\operatorname{size}(u) - \operatorname{size}(v)$，所以单次乘法也是 $\operatorname{size}(v) \cdot [\operatorname{size}(u) - \operatorname{size}(v)]$，求和结果与上面相同。总复杂度 $\mathcal{O}(N^{2})$。

另外，如果先算 pre * suf 复杂度就没有保证了，会 TLE。
