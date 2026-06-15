---
title: 'Codeforces Round 1057 A-E [251010]'
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
abbrlink: 9a94a6e6
date: 2025-07-20 02:37:00
updated: 2025-07-20 02:37:00
---
## [2153A - Circle of Apple Trees](https://codeforces.com/contest/2153/problem/A)

```cpp
void solve() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    cout << set(a.begin(), a.end()).size() << endl;
    return;
}
```

## [2153B - Bitwise Reversion](https://codeforces.com/contest/2153/problem/B)

每一个二进制位独立，只需考虑 $x,y,z\in \lbrace 0,1 \rbrace$ 的情形，手玩一下发现只有 011 无解。

```cpp
void solve() {
    int x, y, z;
    cin >> x >> y >> z;
    
    for (int bit = 0; bit < 30; bit++) {
        vector v{x >> bit & 1, y >> bit & 1, z >> bit & 1};
        sort(v.begin(), v.end());
        if (v == vector{0, 1, 1}) {
            cout << "NO" << endl;
            return;
        }
    }
    cout << "YES" << endl;
    return;
}
```

## [2153C - Symmetrical Polygons](https://codeforces.com/contest/2153/problem/C)

仔细枚举所有情形。。太容易 WA

```cpp
void solve() {
    int n;
    cin >> n;

    map<int, int> mp;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        mp[x]++;
    }

    ll sum = 0;
    int cnt = 0;
    vector<int> vec;
    for (auto [k, v] : mp) {
        if (v & 1) {
            vec.push_back(k);
            v--;
        }
        sum += 1LL * v * k;
        cnt += v;
    }
    ll res = 0;
    if (cnt > 2) {
        res = sum;
    }
    for (int i = vec.size() - 1; i > 0; i--) {
        int x = vec[i - 1];
        int y = vec[i];
        if (y < x + sum) {
            res = max(res, sum + x + y);
        }
    }
    for (int i = vec.size() - 1; i >= 0; i--) {
        if (vec[i] < sum) {
            res = max(res, sum + vec[i]);
        }
    }
    cout << res << endl;
    return;
}
```

## [2153D - Not Alone](https://codeforces.com/contest/2153/problem/D)

长度 $4$ 分成两个长度 $2$ 肯定更好。这是考虑到两个数 $x,y$ 变成 $[x,y]$ 中任意一个的代价都是一样的，这样如果变成超出 $[x,y]$ 区间代价更大，一定不好。

然后是一个比较典型的线性 DP，枚举分段点，段长不超过 3。

为处理环形序列，可以枚举序列的起点，枚举次数也不超过 3。

复杂度 $\mathcal{O}(n)$。

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll = long long;
using ull = unsigned long long;
using ulll = unsigned __int128;

constexpr ll inf = 0x3f3f3f3f3f3f3f3f;

void solve() {
    int n;
    cin >> n;

    vector<int> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }

    ll res = inf;
    for (int _ = 0; _ < 4; _++) {
        vector<ll> dp(n, inf);
        for (int r = 0; r < n; r++) {
            for (int l = max(0, r - 4); l < r; l++) {
                for (int i = l; i <= r; i++) {
                    ll sum = 0;
                    for (int j = l; j <= r; j++) {
                        sum += abs(a[j] - a[i]);
                    }
                    dp[r] = min(dp[r], (l == 0 ? 0 : dp[l - 1]) + sum);
                }
            }
        }
        res = min(res, dp[n - 1]);
        rotate(a.begin(), a.begin() + 1, a.end());
    }
    cout << res << endl;
}

signed main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    for (int _ = (cin >> _, _); _--; )
        solve();

    return 0;
}
```

## [2153E - Zero Trailing Factorial](https://codeforces.com/contest/2153/problem/E)

需要一些注意到。

注意到，对于素数 $p$，$v_{p}(n!) \leqslant v_{p}((n+1)!)$；特别地，若 $n<p$，$v_{p}(n!)=0$，若 $n=p$，$v_{p}(n!)=1$。

这告诉我们如果 $x<p \leqslant n$，取 $k=p$，这样 $v_{p}(x!)=0$，$v_{p}(n!)>0$，$x$ 的答案为 0。

剩下的数呢？熟知 $10^{7}$ 内素数距离是 $10^{2}$ 量级，剩下的数一定不多。考虑暴力跑，枚举 $x$。

考虑 $k$ 的形态，假设 $k$ 中有两个素因子 $p<q$，那么 $v_{p}(n!) \geqslant v_{q}(n!)$，最终的贡献总是那个 $v_{q}(n!)$ 比较小的产生的，另一个素因子完全没用。所以没必要选两个素因子。这样 $k=p^{\alpha}$ 最优。

再考虑哪些 $p$ 是有用的，这个 $p$ 一定是 $[x,n]$ 中某个数的素因子。

现在就可以暴力枚举了。

复杂度估计：枚举 $x$，$\mathcal{O}(\text{prime\_gap})$，$p$ 的数量 $\mathcal{O}(\text{prime\_gap}\log V)$，检查 $\mathcal{O}(\log V)$，$\log V=25$，$\text{prime\_gap}=300$，$100 组数据，能过。下面代码只跑了 300ms。

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll = long long;
using ull = unsigned long long;
using ulll = unsigned __int128;

constexpr int inf = 0x3f3f3f3f;

struct sieve {
    vector<int> minp, primes;
    sieve(int N = 1E7 + 1) : minp(N) {
        minp[1] = 1;
        for (int n = 2; n < N; n++) {
            if (!minp[n]) {
                minp[n] = n;
                primes.push_back(n);
            }
            for (int p : primes) {
                if (1ll * n * p >= N) break;
                minp[n * p] = p;
                if (p == minp[n]) {
                    break;
                }
            }
        }
    }
} sieve;

void solve() {
    int n, m;
    cin >> n >> m;
    
    auto p = *--ranges::upper_bound(sieve.primes, n);
    ll res = 0;
    set<int> vec;
    {
        int xx = n;
        while (xx > 1) {
            int p = sieve.minp[xx];
            vec.insert(p);
            while (xx % p == 0) {
                xx /= p;
            }
        }
    }
    for (int x = n - 1; x >= p; x--) {
        int xx = x;
        while (xx > 1) {
            int p = sieve.minp[xx];
            vec.insert(p);
            while (xx % p == 0) {
                xx /= p;
            }
        }
        ll aans = inf;
        for (auto p : vec) {
            ll ans1 = 0;
            ll ans2 = 0;
            for (ll pp = p; pp <= x; pp *= p) {
                ans1 += x / pp;
            }
            for (ll pp = p; pp <= n; pp *= p) {
                ans2 += n / pp;
            }
            for (ll pp = p, cnt = 1; pp <= m; pp *= p, cnt++) {
                if (ans1 / cnt != ans2 / cnt) {
                    aans = min(aans, ans1 / cnt);
                }
            }
        }
        res += aans;
    }
    cout << res << endl;
}

signed main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    for (int _ = (cin >> _, _); _--; )
        solve();

    return 0;
}
```

