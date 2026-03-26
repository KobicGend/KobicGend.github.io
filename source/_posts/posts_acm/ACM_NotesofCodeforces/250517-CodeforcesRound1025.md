---
title: Codeforces Round 1025 (Div. 2) CD
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
abbrlink: 518dc1dd
date: 2025-05-18 13:21:00
updated: 2025-05-18 13:21:00
---
## [2109C - Hacking Numbers](https://codeforces.com/contest/2109/problem/C3)

*像是游戏书的思维题*

大方向是，用最少步骤得到一个确定的数 $y$，加上 $n-y$ 得到答案。

C1：由于初始 $x$ 范围巨大，先用 digit 操作是比较好的。发现两次 digit 操作的结果 $x \leqslant 16$，再按二进制拆分，四次就能得到 $x=1$。总计 $6 + 1 = 7$ 次。

```cpp
int n;
cin >> n;
int x;
cout << "digit" << endl;
cin >> x;
cout << "digit" << endl;
cin >> x;
cout << "add " << -8 << endl;
cin >> x;
cout << "add " << -4 << endl;
cin >> x;
cout << "add " << -2 << endl;
cin >> x;
cout << "add " << -1 << endl;
cin >> x;
cout << "add " << n - 1 << endl;
cin >> x;
cout << "!" << endl;
cin >> x; 
```

C2：不好解释。。敲了半小时计算器发现的

```cpp
int n;
cin >> n;
int x;
cout << "mul " << 9 << endl;
cin >> x;
cout << "digit" << endl;
cin >> x;
cout << "digit" << endl;
cin >> x;
cout << "add " << n - 9 << endl;
cin >> x;
cout << "!" << endl;
cin >> x;
```

C3：呃，比较熟知的结果是 7 * 9 = 63，7 * 99,999 = 699,993，想到这一点应该就能试出来

```cpp
int n;
cin >> n;
int x;
cout << "mul " << 999999999 << endl;
cin >> x;
cout << "digit" << endl;
cin >> x;
if (n - 81) {
	cout << "add " << n - 81 << endl;
	cin >> x;
}
cout << "!" << endl;
cin >> x;
```

*脑电波题蛙，作为算法竞赛题真合适吗*

给个证明：设 $N = 999999999 = 10^9 - 1$。以下证明对于正整数 $n  \leqslant  10^9$，$S(Nn) = 81$，其中 $S(x)$ 表示 $x$ 的数码和。

证明：9 是最大的数位，因此 $S(N-x)=S(N)-S(x)=81-S(x)$ 对 $0 \leqslant x \leqslant N$ 都成立。这里已经出现了 81，我们尝试变形。

$$
\begin{aligned}
81
&= S(x) + S(N-x) \\
&= S(x \cdot 10^{9}) + S(N-x)
\end{aligned}
$$

由于 $x \cdot 10^{9}$ 的后九位都是 0，$N-x$ 至多后九位，因此相加后互不冲突，即

$$
\begin{aligned}
81
&= S(x \cdot 10^{9}) + S(N-x) \\
&= S(x \cdot 10^{9} + N-x) \\
&= S[x \cdot (10^{9}-1) + N] \\
&= S(Nx+N) \\
&= S[(x+1)N]
\end{aligned}
$$

再令 $y=x+1\in[1,10^{9}]$，就证明了 $S(Ny)=81$。


## [2109D - D/D/D](https://codeforces.com/contest/2109/problem/D)（奇偶分层图）

对每个顶点，BFS 计算奇数步和偶数步最短路。

考虑将所有可用的步长数字加起来，并判断奇偶性。如果 sum 是偶数就与偶数步最短路比较，否则 sum 是奇数就与奇数步最短路比较，sum 大于等于 dis 就可达。

或者，需要改变 sum 的奇偶性。最优策略是从 sum 中减去最小的奇数步长 minodd，得到新的总和 sum2，sum2 大于等于 dis 就可达。

复杂度 $\operatorname{O}(n+m+l)$。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

constexpr ll inf = 0x3f3f3f3f3f3f3f3f;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n, m, l;
        cin >> n >> m >> l;

        ll minodd = inf;  // inf > sum of all elements
        ll sum = 0;
        while (l--) {
            int x;
            cin >> x;
            if (x & 1) {
                minodd = min<ll>(minodd, x);
            }
            sum += x;
        }
        ll sum2 = sum - minodd;  // When there are no odd numbers, sum2 < 0
        
        vector<vector<int>> E(2 * n);
        auto add = [&](int u, int v) {
            E[u].push_back(v);
            E[v].push_back(u);
        };
        while (m--) {
            int u, v;
            cin >> u >> v;
            u--;
            v--;
            add(u, v + n);
            add(u + n, v);
        }

        // BFS
        vector<int> dis(2 * n, -1);
        dis[0] = 0;
        queue<int> Q;
        Q.push(0);
        while (!Q.empty()) {
            int u = Q.front();
            Q.pop();
            for (auto& v : E[u]) {
                if (dis[v] != -1) continue;
                dis[v] = dis[u] + 1;
                Q.push(v);
            }
        }

        string res(n, '0');
        for (int i = 0; i < 2 * n; i++) {
            if (dis[i] == -1) continue;
            if (dis[i] % 2 == sum % 2) {
                if (dis[i] <= sum) {
                    res[i % n] = '1';
                }
            } else {
                if (dis[i] <= sum2) {
                    res[i % n] = '1';
                }
            }
        }
        cout << res << endl;                
    }

    return 0;
}
```

## [2109E - Binary String Wowee](https://codeforces.com/contest/2109/problem/E)

第 $i$ 位的操作次数只与后缀有关，考虑倒着 DP，设 $dp_{i,j}$ 表示对 $i$ 的后缀操作 $j$ 次的方案数。

考虑转移 $dp_{i,j}\leftarrow dp_{i-1,k}$，即第 $i$ 位处操作 $j-k$ 次的方案数。每次操作，第 $i$ 位都会翻转。如果 $s_{i}=0$，只能是总共操作偶数次后才能操作第 $i$ 位。也就是说对于这个 $j$ 长的操作序列，操作第 $i$ 位只能放在第奇数位置上，方案数是 $\dbinom{\lceil \frac{j}{2}  \rceil}{j-k}$。如果 $s_{i}=1$，就只能放在第偶数位置上，方案数是 $\dbinom{\lfloor \frac{j}{2}  \rfloor}{j-k}$。

```cpp
int N, K;
string S;
cin >> N >> K >> S;

vector<Z> f(K + 1);
f[0] = 1;
for (int i = N - 1; i >= 0; i--) {
	vector<Z> nf(K + 1);
	for (int j = 0; j <= K; j++) {
		for (int k = 0; k <= j; k++) {
			nf[j] += f[k] * binom((j + (S[i] == '0')) / 2, j - k);
		}
	}
	f = nf;
}
cout << f[K] << endl;
```