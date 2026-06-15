---
title: Codeforces Round 997 (Div. 2) A - E
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
abbrlink: b94b9e0b
date: 2025-01-18 01:32:00
updated: 2025-01-18 17:43:00
---

## [2056A - Shape Perimeter](https://codeforces.com/contest/2056/problem/A)

```cpp
#include <bits/stdc++.h>
using ll = long long;
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n, m;
        cin >> n >> m;

        int res = 4 * m * n;
        for (int i = 0, a, b; i < n; i++) {
            cin >> a >> b;
            if (i) res -= m - a + m - b << 1;
        }
        cout << res << endl;
    }

    return 0;
}
```

## [2056B - Find the Permutation](https://codeforces.com/contest/2056/problem/B)

如果学过图论就能发现这是个拓扑排序板子题，但没必要。

这是个无向图，但这不应该是无向图。先化为有向，也就是将对角线左下方的 01 互换。这样，$s_{ij}=1\iff a_{i}<a_{j}$ 就非常符合认知。

现在这个问题就好做了，有几个 1 就表示有几个比它小，那自然就排在那个位置。

时间复杂度 $\operatorname{O}(n^{2})$。

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
        vector<int> a(n);
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = 0; j < n; j++) {
                char x;
                cin >> x;
                sum += j <= i ^ x == '0';
            }
            a[sum] = i + 1;
        }
        for (int i = 0; i < n; i++) {
            cout << a[i] << " ";
        }
        cout << endl;
    }

    return 0;
}
```

附一个拓扑排序代码：

```cpp
#include <bits/stdc++.h>
using ll = long long;
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        vector<vector<int>> E(n);
        vector<int> deg(n);
        for (int i = 0; i < n; i++) {
            string s;
            cin >> s;
            for (int j = 0; j < n; j++) {
                if (i >= j) continue;
                if (s[j] == '1') {
                    E[i].push_back(j);
                    deg[j]++;
                } else {
                    E[j].push_back(i);
                    deg[i]++;
                }
            }
        }

        queue<int> Q;
        for (int i = 0; i < n; i++) {
            if (deg[i] == 0) {
                Q.push(i);
            }
        }

        vector<int> ans;
        while (!Q.empty()) {
            int u = Q.front();
            Q.pop();
            ans.push_back(u);
            for (auto v : E[u]) {
                if (--deg[v] == 0) {
                    Q.push(v);
                }
            }
        }

        for (int i = 0; i < n; i++) {
            cout << ans[i] + 1 << ' ';
        }
        cout << endl;
    }

    return 0;
}
```

## [2056C - Palindromic Subsequences](https://codeforces.com/contest/2056/problem/C)（构造）

先固定一些数，希望 **每加入一个数，就能至少多两个回文串**，这样肯定满足题意。那不妨左右边上先各放两个数 1 2 ??? 1 2，那再填中间（填不一样的）就行了。

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    
    while (t--) {
        int n;
        cin >> n;
        
        if (n == 6) {
            cout << "1 1 2 3 1 2" << endl;
            continue;
        }
        for (int i = 1; i <= n - 2; i++) {
            cout << i << " ";
        }
        cout << 1 << " " << 2 << endl;
    }
    
    return 0;
}
```

赛时方法如下：

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

        int x = (n + 1) / 2;
        if (x % 2 == 0) x--;
        int l = n - x >> 1, r = n - x - l;
        vector<int> res;
        for (int i = 0; i < x / 2; i++) {
            res.push_back(n);
        }
        for (int i = 0; i < l; i++) {
            res.push_back(i * 2 + 1);
        }
        res.push_back(n);
        for (int i = 0; i < r; i++) {
            res.push_back(i * 2 + 2);
        }
        for (int i = 0; i < x / 2; i++) {
            res.push_back(n);
        }

        for (int i = 0; i < n; i++) {
            cout << res[i] << " ";
        }
        cout << endl;
    }

    return 0;
}
```


## [2056D - Unique Median](https://codeforces.com/contest/2056/problem/D)（前缀和 + map）

范围 $a_{i} \leqslant 10$，从这里入手。*（不确定是否有针对 $a_{i} \leqslant 10^{5}$ 的方法）*

中位数问题，常见的方法是 **转化为 01 串**。这里我们 **枚举** $t \ (1 \leqslant t \leqslant 10)$，然后将 $\geqslant t$ 的置为 1，$<t$ 的置为 -1。

如何统计答案呢？题设要求中位数得两个相同，而刚刚已经把等于 $t$ 的变成 1 了，信息丢失（就算特别处理变成 0，也要求 cnt1 < cnt0 + cnt-1），这很难直接处理。

正难则反，**不符合题设条件** 的是，有恰好一半为 -1，另一半为 1。这问题我们很熟悉，就是找和为零的子串，用前缀和 + map 即可解决：因为和为零等价于 pre[l] = pre[r]，故扫描到 $r$ 时，统计 map 中值为 pre[r] 的数量，并将 pre[r] 加入桶中，作为另一个 $\ell$。

但做到这里还不够，会算重复，比如序列是，2 3 1 2，那么 [3, 1] 这个子序列在枚举分界线为 2 和 3 的时候就会重复统计。

这里方法很多。一个解决方案是，在枚举分界线时，**钦定较大那部分的最小值**。比如分界线为 2，就不能统计不包含 2 的子区间，所以在枚举到下一个 2 的时候，再把这俩 2 中间的前缀和加到桶里。

时间复杂度 $\operatorname{O}(vn)$，这里 $v=10$。

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
            a[i]--;
        }

        ll res = 1LL * n * (n + 1) >> 1;
        for (int t = 0; t < 10; t++) {
            vector<int> pre(n + 1);
            for (int i = 0; i < n; i++) {
                pre[i + 1] = pre[i] + (a[i] >= t ? 1 : -1);
            }
            map<int, int> mp;
            // 会算重复：
            // for (int r = 0; r < n; r++) {
            //     mp[pre[r]]++;
            //     res -= mp[pre[r + 1]];
            // }
            for (int l = 0, r = 0; r < n; r++) {
                if (a[r] == t) {  // 钦定较大那部分的最小值为t
                    for (; l <= r; l++) {
                        mp[pre[l]]++;  // 把这一块一起加进去
                    }
                }
                res -= mp[pre[r + 1]];
            }
        }
        cout << res << endl;
    }

    return 0;
}
```

也可以（或许更无脑？）先直接统计，然后把重复的减掉，因为重复的满足，较小部分的最大值与较大那边的最小值相差超过 2。很聪明的方法。

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

        vector<int> a(n);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }

        auto check = [&](int x, int y) {
            map<int, int> mp; // 前缀和出现的次数
            mp[0] = 1;
            int now = 0;
            ll ans = 0;
            for (int i = 0; i < n; i++) {
                if (a[i] <= x) {
                    now--;
                } else if (a[i] >= y) {
                    now++;
                } else {
                    mp.clear(); // 中位数改变了
                }
                ans += mp[now];
                mp[now]++;
            }
            return ans;
        };

        ll ans = 1LL * (n + 1) * n / 2;
        for (int x = 1; x <= 9; x++) {
            ans -= check(x, x + 1);
        }
        for (int x = 1; x < 9; x++) {
            ans += check(x, x + 2);
        }
        cout << ans << endl;
    }

    return 0;
}
```

## [2056E - Nested Segments](https://codeforces.com/contest/2056/problem/E)（组合数学）

不太组合数学的组合数学。

先不考虑 $m$，手画一下 $n=4$ 等小样例，发现这线段覆盖 **最优一定是一个盖着两个**，不可能盖三个，盖着的这两个线段（一般）是可以左右交换的，最里面长度为 1 的小线段没得选，剩下恰好 $n-1$ 条线段。所以题设就是求 $n-1$ 个节点构成二叉树的种类。

熟知（或者百度一下）：$n$ 个节点构成二叉树的种类是 **卡特兰数** $f_{n}=\dfrac{C_{2n}^{n}}{n+1}$。卡特兰数在组合数学中很常见，许多奇奇怪怪的方案数都是卡特兰数。

如果有限制，就相当于限制了二叉树的形态。对于第 $i$ 条限制线段，分两部分考虑；一部分是这线段对应节点 $u$ 的子树，把它拿出来单独算；另一部分是 $u$ 的父亲，那可以把 $u$ 看做一个小线段。呃呃好难描述，看下面这张图吧，蓝色是限制线段：

最后的问题是如何找到包含关系，这将线段按 $\ell$ 升序，$r$ 降序排序再利用 **栈** 即可判断。有点 DFS 序的感觉，栈顶是根，栈里的元素构成一条链而没有兄弟。

时间复杂度 $\operatorname{O}(n\log n)$。

```cpp
#include <bits/stdc++.h>
using ll = long long;
using namespace std;

constexpr int mod = 998244353;
constexpr int N = 1e6 + 8;
ll fac[N], ifac[N];

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
ll C(int n, int m) {
    if (n < m || m < 0) return 0;
    return fac[n] * ifac[m] % mod * ifac[n - m] % mod;
}
ll A(int n, int m) {
    return fac[n] * ifac[n - m] % mod;
}
ll Catalan(int n) {
    if (n <= 0) return 1;
    return (C(n * 2, n) + mod - C(n * 2, n - 1)) % mod;
}

int main() {
    int t;
    cin >> t;

    fac[0] = ifac[0] = 1;
    for (int i = 1; i <= N - 1; i++) {
        fac[i] = fac[i - 1] * i % mod;
    }
    ifac[N - 1] = inv(fac[N - 1]);
    for (int i = N - 1; i > 0; i--) {
        ifac[i - 1] = ifac[i] * i % mod;
    }

    while (t--) {
        int n, m;
        cin >> n >> m;

        vector<array<int, 3>> seg(m);
        bool all = false;
        for (auto& [l, r, len] : seg) {
            cin >> l >> r;
            l--;
            len = r - l;
            if (len == n) all = true;
        }
        if (!all) seg.push_back({ 0, n, n });
        sort(seg.begin(), seg.end(), [&](const auto& x, const auto& y) {
            return x[0] == y[0] ? x[1] > y[1] : x[0] < y[0];
        });

        vector<int> stk;
        for (int i = 0; i < seg.size(); i++) {
            auto& [l, r, len] = seg[i];
            while (!stk.empty() && l >= seg[stk.back()][1]) {  // 这里是 while，弹出所有兄弟，调了好久
                stk.pop_back();
            }
            if (!stk.empty()) {   // 记录一下真实的贡献是几个节点
                seg[stk.back()][2] -= r - l - 1;
            }
            stk.push_back(i);
        }

        ll res = 1;
        for (auto [l, r, len] : seg) {
            res = res * Catalan(len - 1) % mod;
        }
        cout << res << endl;
    }

    return 0;
}
```