---
title: Codeforces Round 991 (Div. 3) A-G
tags:
  - 題解
  - 筆記
  - ACM
  - 算法
  - 練習賽
categories:
  - 邏輯與算法
  - 賽事
  - Codeforces
cover: /img/posts/acm/codeforces-cover.webp
top_img: /img/posts/acm/codeforces.webp
highlight_shrink: true
abbrlink: 659b2a8
date: 2024-12-06 00:02:00
updated: 2024-12-06 13:10:00
---
## [2050A - Line Breaks](https://codeforces.com/contest/2050/problem/A)

按题意模拟。

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n, k;
        cin >> n >> k;

        vector<int> a(n);
        for (int i = 0; i < n; i++) {
            string s;
            cin >> s;
            a[i] = s.size();
        }

        int sum = 0;
        for (int i = 0; i < n; i++) {
            if (k >= a[i]) {
                k -= a[i];
                sum++;
            } else {
                break;
            }
        }

        cout << sum << endl;
    }

    return 0;
}
```

## [2050B - Transfusion](https://codeforces.com/contest/2050/problem/B)

奇数项可以任意交换，偶数项之间可以任意交换，奇偶项不能交换。因此如果奇、偶数项的和分别能均分，且这个值相等，就可行。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        int cnt[2]{};
        ll sum[2]{};
        for (int i = 0; i < n; i++) {
            int x;
            cin >> x;
            cnt[i % 2]++;
            sum[i % 2] += x;
        }

        if (sum[0] % cnt[0] == 0 && sum[1] % cnt[1] == 0 && sum[0] / cnt[0] == sum[1] / cnt[1]) {
            cout << "YES\n";
        } else {
            cout << "NO\n";
        }
    }

    return 0;
}
```

## [2050C - Uninteresting Number](https://codeforces.com/contest/2050/problem/C)

被 9 整除等价于数码和被 9 整除。

方法一（DP）

设 $dp_{i,j}$ 表示：

- 键：对于前 $i$ 个字符，数码和模 9 为 $j$ 

- 值：bool

转移为 $dp_{i,j+x}\leftarrow dp_{i-1,j}$，其中 $x=s_{i}$ 是这一位的数码，如果 $x$ 为 2 或 3，需要额外转移 $dp_{i,j+x^{2}}\leftarrow dp_{i-1,j}$。

时间复杂度 $\Theta(n)$。

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;

    while (t--) {
        string s;
        cin >> s;

        array<bool, 9> dp{};
        dp[0] = true;
        for (auto& c : s) {
            int x = c - '0';
            array<bool, 9> ndp{};
            for (int i = 0; i < 9; i++) {
                ndp[(i + x) % 9] |= dp[i];
            }
            if (x == 2) {
                for (int i = 0; i < 9; i++) {
                    ndp[(i + 4) % 9] |= dp[i];
                }
            }
            if (x == 3) {
                for (int i = 0; i < 9; i++) {
                    ndp[i] |= dp[i];
                }
            }
            dp = ndp;
        }
        cout << (dp[0] ? "YES" : "NO") << '\n';
    }

    return 0;
}
```

方法二（枚举）

由于 $\operatorname{lcm}(2,3,9)=18$，故至多修改 $\dfrac{18}{2}=9$ 个 2，至多修改 6 个 3，可以直接枚举。

## [2050D - Digital string maximization](https://codeforces.com/contest/2050/problem/D)

对于每一位 $s_{i}=x$，至多向前挪 $x$ 次（否则就小于 0 了）。枚举挪到哪里最优，然后插入这个位置。

时间复杂度 $\Theta(n)$。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    int t;
    cin >> t;

    while (t--) {
        string s;
        cin >> s;

        const int n = s.size();
        vector<int> res;
        for (int i = 0; i < n; i++) {
            int x = s[i] - '0';
            int jmax = 0;
            for (int j = 1; j <= x && i - j >= 0; j++) {
                if (res[i - j] < x - j) {
                    jmax = j;
                }
            }
            res.insert(res.begin() + i - jmax, x - jmax);
        }

        for (auto x : res) {
            cout << x;
        }
        cout << endl;
    }

    return 0;
}
```

## [2050E - Three Strings](https://codeforces.com/contest/2050/problem/E)

设 $dp_{i,j}$ 表示

- 键：将 $a$ 的前 $j$ 个字符，$b$ 的前 $i-j$ 个字符放入 $c$ 的前 $i$ 个字符

- 值：最小操作次数

转移到 $i$ 时，对于 $dp_{i,j}$，分为这一位填 $a_{j}$ 或填 $b_{i-j}$ 两种。

时间复杂度 $\Theta[n(n+m)]$。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
constexpr int inf = 0x3f3f3f3f;

int main() {
    int t;
    cin >> t;

    while (t--) {
        string a, b, c;
        cin >> a >> b >> c;

        const int n = a.size();
        const int m = b.size();

        a = '$' + a;
        b = '$' + b;
        c = '$' + c;

        vector<int> dp(n + 1, inf);
        dp[0] = 0;
        for (int i = 1; i <= n + m; i++) {
            vector<int> ndp(n + 1, inf);
            for (int j = 0; j <= n; j++) {
                if (j > 0) ndp[j] = min(ndp[j], dp[j - 1] + (a[j] != c[i]));
                if (i - j > 0 && i - j <= m) ndp[j] = min(ndp[j], dp[j] + (b[i - j] != c[i]));  // 写清范围 别RE
            }
            dp = ndp;
        }
        cout << dp[n] << '\n';  // 不是 min(dp[*])
    }

    return 0;
}
```




## [2050F - Maximum modulo equality](https://codeforces.com/contest/2050/problem/F)

题设等价于

$$
\begin{cases}
m\mid a_{l} - a_{l+1},\\
m \mid a_{l+1} - a_{l+2},  \\
\cdots \\
m \mid a_{r-1} - a_{r},
\end{cases}
$$

因此

$$
m\mid \operatorname{gcd}(a_{l} - a_{l+1},\ a_{l+1} - a_{l+2},\ \dots ,\ a_{r-1} - a_{r})
$$

$m$ 取右边那个式子最优。

用 ST 表维护差分数组的 gcd，时间复杂度 $\Theta[(n+q)\log n]$。

```cpp
#include <bits/stdc++.h>
using namespace std;

struct RMQ {  // 存的是值
    static constexpr int D = 30;
    vector<int> t[D + 1];

    explicit RMQ(vector<int>& a) {
        const int n = a.size();
        t[0] = a;
        for (int d = 1; d <= __lg(n); d++) {
            t[d].resize(n);
            for (int i = 0; i + (1ll << d) <= n; ++i) {
                t[d][i] = gcd(t[d - 1][i], t[d - 1][i + (1ll << (d - 1))]);
            }
        }
    }

    int operator()(int l, int r) {  // [l, r)
        if (l >= r) return 0;
        int d = __lg(r - l);
        return gcd(t[d][l], t[d][r - (1ll << d)]);
    }
};

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n, q;
        cin >> n >> q;

        vector<int> a(n), b(n - 1);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
            if (i) b[i - 1] = abs(a[i] - a[i - 1]);
        }

        RMQ rmq(b);
        while (q--) {
            int l, r;
            cin >> l >> r;
            l--, r--;
            cout << rmq(l, r) << " \n"[q == 0];
        }
    }

    return 0;
}
```


## [2050G - Tree Destruction](https://codeforces.com/contest/2050/problem/G)

- 选择一个点删去，贡献是它的度数；

- 选择两个相邻的点（即一条边），贡献是 -2。

问题化为带边权带点权的树直径问题。时间复杂度 $\Theta(n)$。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
constexpr int inf = 0x3f3f3f3f;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        vector<vector<int>> E(n);
        for (int i = 1; i < n; i++) {
            int u, v;
            cin >> u >> v;
            u--, v--;
            E[u].push_back(v);
            E[v].push_back(u);
        }

        vector<int> dp(n);
        int res = 0;
        auto dfs = [&](this auto&& self, int u, int p) -> void {
            int deg = E[u].size();
            dp[u] = deg;
            res = max(res, deg);
            for (auto v : E[u]) {
                if (v == p) continue;
                self(v, u);
                res = max(res, dp[u] + dp[v] - 2);
                dp[u] = max(dp[u], dp[v] + deg - 2);
            }
        };
        dfs(0, -1);
        cout << res << endl;
    }

    return 0;
}
```