---
title: Codeforces Round 998 (Div. 3) A - G
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
abbrlink: '15059883'
date: 2025-01-20 01:02:00
updated: 2025-01-20 03:18:00
---
## [2060A - Fibonacciness](https://codeforces.com/contest/2060/problem/A)

暴力枚举所有的 $a_{3}$。

```cpp
#include <bits/stdc++.h>
using ll = long long;
using namespace std;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int a1, a2, a4, a5;
        cin >> a1 >> a2 >> a4 >> a5;

        int res = 0;
        for (int a3 = -100; a3 <= 100; a3++) {
            int cnt = 0;
            cnt += a1 + a2 == a3;
            cnt += a2 + a3 == a4;
            cnt += a3 + a4 == a5;
            res = max(res, cnt);
        }
        cout << res << endl;
    }

    return 0;
}
```

## [2060B - Farmer John's Card Game](https://codeforces.com/contest/2060/problem/B)（思维）

主要是读题。每行内部顺序无要求；如果第 $i$ 行的最小值小于第 $j$ 行的最小值，那么 $i$ 应该排在 $j$ 前面。而且如果按行按列都升序排序之后，必须是形如
$$
\begin{array}{ccc}
0 & 3 & 6 \\
1 & 4 & 7 \\
2 & 5 & 8
\end{array}
$$


```cpp
#include <bits/stdc++.h>
using ll = long long;
using namespace std;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n, m;
        cin >> n >> m;

        vector a(n, vector<int>(m));
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                cin >> a[i][j];
            }
            sort(a[i].begin(), a[i].end());
        }
        
        vector<int> p(n);
        iota(p.begin(), p.end(), 0);
        sort(p.begin(), p.end(), [&](int i, int j) {
            return a[i] < a[j];
        });  

        bool ok = true;
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (a[p[i]][j] - 1 != a[p[i - 1]][j]) {
                    ok = false;
                }
            }
        }

        if (!ok) {
            cout << -1 << endl;
        } else {
            for (int i = 0; i < n; i++) {
                cout << p[i] + 1 << " ";
            }
            cout << endl;
        }
    }

    return 0;
}
```

## [2060C - Game of Mathletes](https://codeforces.com/contest/2060/problem/C)（假博弈）

```cpp
#include <bits/stdc++.h>
using ll = long long;
using namespace std;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n, k;
        cin >> n >> k;

        vector<int> cnt(n + 1);
        for (int i = 0; i < n; i++) {
            int x;
            cin >> x;
            cnt[x]++;
        }

        int ans = 0;
        for (int i = 1; i < (k + 1) / 2; i++) {
            ans += min(cnt[i], cnt[k - i]);
        }
        if (k % 2 == 0) {
            ans += cnt[k / 2] / 2;
        }
        cout << ans << endl;
    }

    return 0;
}
```

## [2060D - Subtract Min Sort](https://codeforces.com/contest/2060/problem/D)（思维）

一些分析：

- 对于前两个数，如果 $a_{1}>a_{2}$ 那已经无解。

- 否则设 $a_{1} \leqslant a_{2}$。需不需要操作前两项呢？

- 考虑 $a_{1}<a_{2}>a_{3}$，不能先操作 $a_{2}$ 和 $a_{3}$，因为这样会让 $a_{3}$ 变成 0，意味着只能 $a_{1}=a_{2}=0$，但一般做不到。所以应当先操作 $a_{1}$ 和 $a_{2}$。

- 考虑 $a_{1}<a_{2}<a_{3}>a_{4}$，也不能先操作 $a_{2}$ 和 $a_{3}$，因为这样会让 $a_{2}$ 变成 0，$a_{1}>a_{2}$ 于是不可行。

归纳下来，最优方法就是从左往右顺着操作一遍，然后看是否升序。时间复杂度线性。

```cpp
#include <bits/stdc++.h>
using ll = long long;
using namespace std;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        vector<int> a(n);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }

        for (int i = 1; i < n; i++) {
            int minn = min(a[i], a[i - 1]);
            a[i] -= minn;
            a[i - 1] -= minn;
        }

        cout << (is_sorted(a.begin(), a.end()) ? "YES" : "NO") << endl;
    }

    return 0;
}
```





## [2060E - Graph Composition](https://codeforces.com/contest/2060/problem/E)（并查集）

如果原图有边，新图却不连通，那这条边必须删去。

现在只需要补边。用原图剩下的边建图，看有多少连通块，和新图差几个连通块就需要加几条边。

用并查集判断是否连通，时间复杂度近线性。

```cpp
#include <bits/stdc++.h>
using ll = long long;
using namespace std;

struct DSU {
    vector<int> p, siz;
    
    DSU(int n) : p(n + 1), siz(n + 1, 1) {
        iota(p.begin(), p.end(), 0);
    }
    
    int find(int x) {
        while (x != p[x]) x = p[x] = p[p[x]]; // 路径压缩
        return x;
    }
    
    bool same(int x, int y) {
        return find(x) == find(y);
    }
    
    bool uno(int x, int y) {
        x = find(x), y = find(y);
        if (same(x, y)) return false;
        siz[x] += siz[y];
        p[y] = x;
        return true;
    }
    
    int size(int x) {
        return siz[find(x)];
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n, m1, m2;
        cin >> n >> m1 >> m2;

        vector<pair<int, int>> E1(m1);
        for (auto& [u, v] : E1) {
            cin >> u >> v;
            u--, v--;
        }

        DSU dsu1(n), dsu2(n);
        while (m2--) {
            int u, v;
            cin >> u >> v;
            u--, v--;
            dsu2.uno(u, v);
        }

        int res = 0;
        for (auto& [u, v] : E1) {
            if (!dsu2.same(u, v)) {
                res++;
            } else {
                dsu1.uno(u, v);
            }
        }

        int siz1 = 0, siz2 = 0;
        for (int i = 0; i < n; i++) {
            siz1 += dsu1.find(i) == i;
            siz2 += dsu2.find(i) == i;
        }
        res -= siz2 - siz1;
        cout << res << endl;
    }

    return 0;
}
```



## [2060F - Multiplicative Arrays](https://codeforces.com/contest/2060/problem/F)（DP 组合数学）

首先如果 $n$ 很大，这些 $a_{i}$ 大部分都是 1，具体来说，$2^{20}>10^{5}$，所以至多只有 20 个非 1 的数，从这里入手。

设 $dp_{n,d}$ 表示 $a_{1}a_{2}\dots a_{d}=n$ 的方案数，其中 $a_{i} \neq 1$，于是可以做如下转移：
$$
dp_{n,d}\leftarrow dp_{x,d-1}, \quad x\mid n,\ 1<x<n
$$
表示最后一个填它某个因数，前面用已知的转移。方案数求和。

填 1。填上 1 之后总长度恰为 $\ell$，乘积为 $n$ 的方案数为
$$
f(n,\ell)=\displaystyle  
\sum_{d=1}^{\ell}\operatorname{C}_{\ell}^{d}dp_{n,d},
$$
也就是选 $d$ 个位置填不是 1 的数。

现在需要求最长长度是 $L$ 的，那就是
$$
\displaystyle  
\sum_{\ell=1}^{L}f(n,\ell)
=\sum_{\ell=1}^{L}\sum_{d=1}^{\ell}\operatorname{C}_{\ell}^{d}dp_{n,d}.
$$
这有两个 $\sum$，复杂度不允许，利用组合数的性质化简，
$$
=\sum_{d=1}^{L}\sum_{\ell=d}^{L}\operatorname{C}_{\ell}^{d}dp_{n,d}
=\sum_{d=1}^{L}\Bigg(\sum_{\ell=d}^{L}\operatorname{C}_{\ell}^{d}\Bigg)dp_{n,d}
=\sum_{d=1}^{L}\operatorname{C}_{L+1}^{d+1}dp_{n,d}.
$$
这就是最终答案。

时间复杂度 $\operatorname{O}(DN\sqrt{ N }+tDN)$，这里 $D=20,N=10^{5}$。本地能跑出来就没问题。可以用预处理因子的方法将复杂度降低到 $\operatorname{O}(DN\log N+tDN)$。

```cpp
#include <bits/stdc++.h>
using ll = long long;
using namespace std;

constexpr int mod = 998244353;
constexpr int maxN = 1e5 + 8;
constexpr int maxD = 20;
ll dp[maxD][maxN];  // dp[d][n] : x_1 * x_2 * ... * x_d == n

ll qpow(ll a, ll n) {
    ll res = 1;
    while (n) {
        if (n & 1) res = res * a % mod;
        a = a * a % mod;
        n >>= 1;
    }
    return res;
}

ll inv(ll n) {
    return qpow(n, mod - 2);
}


int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    
    for (int n = 1; n < maxN; n++) {
        dp[1][n] = 1;
    }

    for (int d = 2; d < maxD; d++) {
        for (int n = 1; n < maxN; n++) {
            for (int i = 2; i * i <= n; i++) {
                if (n % i == 0) {
                    dp[d][n] += dp[d - 1][i];
                    dp[d][n] %= mod;
                    if (n / i != i) {
                        dp[d][n] += dp[d - 1][n / i];
                        dp[d][n] %= mod;
                    }
                }
            }
        }
    }

    int t;
    cin >> t;

    while (t--) {
        int N, D;
        cin >> N >> D;
        
        cout << D << " ";

        for (int n = 2; n <= N; n++) {
            ll res = 0;

            // 数据过大，组合数不能预处理阶乘
            // 先算 C(D + 1, 2)
            ll CC = (D + 1LL) * D / 2;
            CC %= mod;  // 记得随时取模 不然下面会爆LL

            for (int d = 1; d < min(maxD, D); d++) {
                res += CC * dp[d][n];
                res %= mod;

                // 利用 C(D + 1, d + 1) 算 C(D + 1, d + 2)
                CC *= (D - d);
                CC %= mod;
                CC *= inv(d + 2);
                CC %= mod;
            }

            cout << res << " ";
        }
        cout << endl;
    }

    return 0;
}
```

附：证明
$$
\displaystyle  
\sum_{k=n}^{m}\operatorname{C}_{k}^{n}=\operatorname{C}_{m+1}^{n+1}
$$

$$
\begin{aligned}
\operatorname{LHS}
&=\operatorname{C}_{n}^{n}+\operatorname{C}_{n+1}^{n}+\operatorname{C}_{n+2}^{n}+\dots+\operatorname{C}_{m}^{n} \\
&=\big(\operatorname{C}_{n+1}^{n+1}+\operatorname{C}_{n+1}^{n}\big)+\operatorname{C}_{n+2}^{n}+\dots+\operatorname{C}_{m}^{n} \\
&=\operatorname{C}_{n+2}^{n+1}+\operatorname{C}_{n+2}^{n}+\dots+\operatorname{C}_{m}^{n} \\
&=\cdots \\
&=\operatorname{C}_{m}^{n+1}+\operatorname{C}_{m}^{n} \\
&=\operatorname{RHS}
\end{aligned}
$$

高中还是蛮常用的。

## [2060G - Bugged Sort](https://codeforces.com/contest/2060/problem/G)（思维）

**题意** 可执行任意次操作：

- 选定两个下标 $i$ 和 $j$，将 $a_i$ 与 $b_j$ 交换，同时将 $b_i$ 与 $a_j$ 交换。

问能否同时将 $a,b$ 按升序排序。

**思路** 有如下结论：

- 操作一次，$a_{i}$ 对面还是 $b_{i}$，$b_{i}$ 对面还是 $a_{i}$，但是上下关系会翻转（定义翻转为 swap$(a_{i},b_{i})$）；

- 操作一次，有且仅有两组将翻转；

- 如果 $n \geqslant 3$，则必然可以交换两列而不翻转（例如要换 1 列和 2 列，操作方案是 (1,3), (2,3), (1,2)）。

所以现在化为，① **可以任意排序**，② **只能翻转偶数次**（记翻转次数为 cnt），问是否有解。

再转换一下，**不要关注中间是如何操作的**，只要 ① **最终状态有序**，② 初始状态和最终状态满足 **翻转偶数次**，就一定有操作方法，也就一定有解。

还是按 B 的思路排序：不妨翻转为 $a_{i}<b_{i}$，按 $a$ 升序排序，如果现在 $b$ 不是升序则无解。现在的问题是，在有序的前提下，能否 **构造** 出只翻转偶数次的序列。

先看两个例子：

- 比如序列 $\begin{bmatrix}{\color{green}6} & 2 & 1 \\ {\color{green}5} & 4 & 3 \end{bmatrix}$。直接排序得到 $\begin{bmatrix}1 & 2 & {\color{green}5} \\ 3 & 4 & {\color{green}6} \end{bmatrix}$，总共翻转奇数次，不行。而另一个有序序列是 $\begin{bmatrix}1 & 2 & {\color{green}6} \\ 3 & 4 & {\color{green}5} \end{bmatrix}$，总共翻转偶数次，可行。这就构造出了一个合法序列 $\begin{bmatrix}1 & 2 & {\color{green}6} \\ 3 & 4 & {\color{green}5} \end{bmatrix}$。

- 再如序列 $\begin{bmatrix}{\color{green}7} & {\color{green}6} & 2 & 1 \\ {\color{green}5} & {\color{green}8} & 4 & 3 \end{bmatrix}$。直接排序得到 $\begin{bmatrix}1 & 2 & {\color{green}5} & {\color{green}6} \\ 3 & 4 & {\color{green}7} & {\color{green}8} \end{bmatrix}$，总共翻转奇数次，不行。尝试将绿色部分整体翻转，得到 $\begin{bmatrix}1 & 2 & {\color{green}7} & {\color{green}8} \\ 3 & 4 & {\color{green}5} & {\color{green}6} \end{bmatrix}$，总共翻转奇数次，但还是不行。尝试将白色部分整体翻转，也不行。可以发现这种情况总是无解。

再次强调，不要关注中间是如何操作的，只要能构造出合法的最终状态就有解。

问题一：什么时候能整体翻转？

- 如果 $a_{i-1}<b_{i},\ b_{i-1}<a_{i}$，也即翻转后仍然有序，就可以把下标 $[i,n]$ 这一段整体翻转（也可以把下标 $[1,i-1]$ 这一段整体翻转）。

问题二：整体翻转能够构造出合法解吗？

- 如果某次翻转的段的长度是偶数，那翻转并不会改变 cnt 的奇偶性，没用；否则如果是奇数，就能随意改变 cnt 的奇偶性。
- 只要存在某个段为奇数，就能随意改变 cnt 的奇偶性，一定有解；
- 否则，cnt 的奇偶性在排序后就确定了，没有构造空间。

总结：在可能有序的前提下，如果能随意改变 cnt 的奇偶性，或者 cnt 本就是偶数，则有解。

时间复杂度 $\operatorname{O}(n\log n)$，主要是排序。

```cpp
#include <bits/stdc++.h>
using ll = long long;
using namespace std;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        vector<array<int, 2>> a(n);
        int cnt = 0;
        for (int i = 0; i < n; i++) {
            cin >> a[i][0];
        }
        for (int i = 0; i < n; i++) {
            cin >> a[i][1];
            if (a[i][0] > a[i][1]) {
                swap(a[i][0], a[i][1]);
                cnt++;
            }
        }
        sort(a.begin(), a.end());

        bool good = false;
        bool ok = true;
        for (int i = 1; i < n; i++) {
            if (a[i - 1][1] < a[i][0]) {// 翻转后仍有序
                if (i % 2 == 1) {
                    good = true;  // 这个段长为奇数，能随意改变 cnt 的奇偶性
                }
            } else if (a[i - 1][1] > a[i][1]) {  // 不是有序的
                ok = false;
            }
        }

        if (ok && (good || cnt % 2 == 0 || n % 2 == 1)) {
            cout << "Yes" << endl;
        } else {
            cout << "No" << endl;
        }
    }

    return 0;
}
```