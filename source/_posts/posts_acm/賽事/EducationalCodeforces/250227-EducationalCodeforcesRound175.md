---
title: Educational Codeforces Round 175 (Rated for Div. 2) A-E
tags:
  - 題解
  - 筆記
  - ACM
  - 算法
  - 練習賽
categories:
  - posts_acm
  - 賽事
  - EducationalCodeforces
cover: /img/posts/acm/codeforces-cover.webp
top_img: /img/posts/acm/codeforces.webp
highlight_shrink: true
abbrlink: 6370b5c4
date: 2025-02-28 11:24:00
updated: 2025-02-28 11:24:00
---
## [2070A. FizzBuzz Remixed](https://codeforces.com/contest/2070/problem/A)

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int J;
    cin >> J;
    
    while (J--) {
        int n;
        cin >> n;

        cout << (n / 15 * 3 + min(n % 15, 2) + 1) << endl;
    }
    
    return 0;
}
```

## [2070B - Robot Program](https://codeforces.com/contest/2070/problem/B)

{% folding blue, 仔细审题 %}

{% endfolding %}

{% folding blue, 题解 %}

分为两部分考虑，从起点走到 0，从 0 下一次走到 0。

{% endfolding %}

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    int J;
    cin >> J;
    
    while (J--) {
        int n, t;
        ll k;
        cin >> n >> t >> k;

        string s;
        cin >> s;

        ll res = 0;
        int x = t;
        for (auto c : s) {
            if (c == 'L') x--;
            else x++;
            k--;
            if (x == 0) {
                res++;
                break;
            }
            if (k == 0) {
                break;
            }
        }
        if (k == 0 || x) {
            cout << res << endl;
            continue;
        }   

        assert(x == 0);
        int cnt = 0;
        for (auto c : s) {
            if (c == 'L') x--;
            else x++;
            cnt++;
            if (x == 0) {
                break;
            }
        }
        if (x == 0) res += k / cnt;
        cout << res << endl;
    }
    
    return 0;
}
```

## [2070C - Limited Repainting](https://codeforces.com/contest/2070/problem/C)

{% folding blue, 所求是最大值最小问题，可以用什么方法？ %}

二分答案。

问题转化为，$\geqslant x$ 的色块必须正确，$<x$ 的色块无所谓，或者说可以忽略，能否用 $k$ 次完成？

{% endfolding %}

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int J;
    cin >> J;
    
    while (J--) {
        int n, k;
        cin >> n >> k;

        string s;
        cin >> s;

        vector<int> a(n);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }

        auto check = [&](int mid) {
            string b;
            for (int i = 0; i < n; i++) {
                if (a[i] > mid) {
                    b += s[i];  // 必须要正确的 新字符串
                }
            }
            int cnt = 0;
            int res = 0;
            for (int i = 0; i < b.size(); i++) {
                if (b[i] == 'R') {
                    if (cnt) res++;  // 贪心考虑，连续的B段需要染色一次
                    cnt = 0;
                } else {
                    cnt++;
                }
            }
            if (cnt) res++;
            return res <= k;
        };

        int l = 0, r = 1e9 + 8;;
        while (l <= r) {
            int mid = l + r >> 1;
            if (check(mid)) {
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        cout << l << endl;
    }
    
    return 0;
}
```

## [2070D - Tree Jumps](https://codeforces.com/contest/2070/problem/D)

写复杂了。正着转移简单一些，这里就不细讲我的思路了。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
constexpr ll mod = 998244353;

int main() {
    int J;
    cin >> J;
    
    while (J--) {
        int n;
        cin >> n;

        vector<vector<int>> dis(n);
        vector<vector<int>> E(n);
        vector<int> d(n);
        for (int i = 1; i < n; i++) {
            int p;
            cin >> p;
            p--;
            E[p].push_back(i);
            d[i] = d[p] + 1;
            dis[d[i]].push_back(i);
        }

        vector<int> dp(n);
        vector<int> sum(n + 1);
        for (int i = n - 1; i > 0; i--) {
            for (auto u : dis[i]) {
                dp[u] = sum[i + 1] + 1;
                dp[u] %= mod;
                for (auto v : E[u]) {
                    dp[u] -= dp[v];
                    dp[u] %= mod;
                    dp[u] += mod;
                    dp[u] %= mod;
                }
            }
            for (auto u : dis[i]) {
                sum[i] += dp[u];
                sum[i] %= mod;
            }
        }
        ll res = 1;
        for (auto u : E[0]) {
            res += dp[u];
            res %= mod;
        }
        cout << res << endl;
    }
    
    return 0;
}
```

## [2070E - Game with Binary String](https://codeforces.com/contest/2070/problem/E)


{% folding blue, 后手优先选 10（含 01），这样就是双方 00 - 10 - 00 ... 交替选择。先手何时必胜？ %}

称先后手各操作一次为一轮。每轮操作 0 的个数 -3，1 的个数 -1。如此操作直到取不满一轮。

如果剩下没有 1，那有足够多的 0 先手便胜利，即 $c_{0} \geqslant 2,c_{1}=0$，再加上前面操作了 $q$ 轮次，初始 01 数量满足 $c_{0}-2 \geqslant 3c_{1}$；

如果剩下一个 1，那只有 0 的数量为 2 时先手胜利，即 $c_{0}=2,c_{1}=1$，再加上前面操作了 $q$ 轮次，初始 01 数量满足 $c_{0}-2 = 3c_{1}-1$。

{% endfolding %}


{% folding blue, 0 1 数量都是 3 倍关系，考虑给 0 赋一个权值 1，给 1 赋一个权值 -3，进一步简化条件。 %}

给 0 赋一个权值 1，给 1 赋一个权值 -3。于是区间权值和为 $c_{0}-3c_{1}$。

结合刚才得到的结论，区间权值和 $w \geqslant 2$ 或 $w=-1$。

{% endfolding %}


{% folding blue, 回忆这样的问题：给定序列，问有多少子区间的和为 0。 %}

将区间和转为前缀和，对于本题是 $s_{r} -2\geqslant s_{l}$ 或 $s_{r}+1=s_{l}$。

用桶存 $s_{l}$。

第二个式子是等式，直接从桶里拿。

```cpp
res += mp[s[r] + 1];
```

第一个式子是不等式，需要一个辅助指针 $p$ 记录桶里 $\leqslant$ 某数的数量 sum。

```cpp
while (p < s[r] - 2) {
    p++;
    sum += mp[p];
}
while (p > s[r] - 2) {
    sum -= mp[p];
    p--;
}
// 现在 p == pre[r] - 2
res += sum;
```

{% endfolding %}

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    int n;
    cin >> n;

    string s;
    cin >> s;

    int pre = 0;
    map<int, int> mp;
    mp[0] = 1;
    ll res = 0;
    int sum = 0;
    int p = -1;
    for (int i = 0; i < n; i++) {
        int x = s[i] == '0' ? 1 : -3;
        pre += x;

        // 桶值(pre[l]) == 目标(pre[r] + 1)
        res += mp[pre + 1];

        // 桶值(pre[l]) <= 目标(pre[r] - 2)
        while (p < pre - 2) {
            p++;
            sum += mp[p];
        }
        while (p > pre - 2) {
            sum -= mp[p];
            p--;
        }
        // 现在 p == pre[r] - 2
        res += sum;

        mp[pre]++;
        if (p >= pre) {
            sum++;
        }
    }
    cout << res << endl;
    
    return 0;
}
```