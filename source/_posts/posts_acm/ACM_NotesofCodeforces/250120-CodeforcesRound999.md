---
title: IAEPC Preliminary Contest (Codeforces Round 999, Div. 1 + Div. 2) A-F1
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
abbrlink: 3001d52c
date: 2025-01-21 03:09:00
updated: 2025-01-21 22:51:00
---
## [2061A - Kevin and Arithmetic](https://codeforces.com/contest/2061/problem/A)

第一个偶数，后面都是奇数。

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
        
        int cnt = 0;
        bool flag = 0;
        for (int i = 0; i < n; i++) {
            int x;
            cin >> x;
            cnt += x % 2;
            flag |= x % 2 == 0;
        }
        if (flag) cnt++;
        else cnt--;
        cout << cnt << endl;
    }

    return 0;
}
```

## [2061B - Kevin and Geometry](https://codeforces.com/contest/2061/problem/B)

腰尽可能长，上下底尽可能接近。

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
        sort(a.begin(), a.end(), greater<>());
        int id = -1;
        for (int i = 1; i < n; i++) {
            if (a[i] == a[i - 1]) {
                id = i;
                break;
            }
        }

        if (id == -1) {
            cout << -1 << endl;
        } else {
            vector<int> res;
            res.push_back(a[id]);
            res.push_back(a[id]);

            int lst = -1, now = -1;
            int minn = 1e9, id1 = -1, id2 = -1;
            for (int i = 0; i < n; i++) {
                if (i == id || i == id - 1) {
                    continue;
                }
                lst = now;
                now = i;
                if (lst == -1) continue;
                if (a[lst] - a[now] < minn) {
                    minn = a[lst] - a[now];
                    id1 = lst;
                    id2 = now;
                }
            }

            res.push_back(a[id1]);
            res.push_back(a[id2]);

            sort(res.begin(), res.end(), greater<>());
            if (res[0] < res[1] + res[2] + res[3]) {
                cout << res[0] << " " << res[1] << " " << res[2] << " " << res[3] << endl;
            } else {
                cout << -1 << endl;
            }
        }
    }

    return 0;
}
```

## [2061C - Kevin and Puzzle](https://codeforces.com/contest/2061/problem/C)

设 $dp_{i,j}$ 表示第 $i$ 个人前面有 $j$ 个人撒谎的方案数。

如果 $i$ 为真，则 $dp_{i,a_{i}}=dp_{i-2,a_{i}-1}+dp_{i-1,a_{i}}$。否则不转移。答案为 $dp_{n-1,*}+dp_{n,*}$。

虽然是二维 DP，但实际的键很少，只有 $2n$，可以用 std::map 实现，复杂度 $\operatorname{O}(n\log n)$。

记得取模，以及关注初始化的方法。

```cpp
#include <bits/stdc++.h>
using ll = long long;
using namespace std;

constexpr int mod = 998244353;

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

        if (n == 1) {
            cout << ((a[0] == 0) ? 2 : 1) << endl;
            continue;
        }
        
        vector<map<int, int>> dp(n);
        // 初始化
        if (a[0] == 0) {
            dp[0][0] = 1;
        }
        if (a[1] == 1) {
            dp[1][1] = 1;
        } else if (a[1] == 0 && a[0] == 0) {
            dp[1][0] = 1;
        } 

        // 转移
        for (int i = 2; i < n; i++) {
            dp[i][a[i]] = dp[i - 2][a[i] - 1] + dp[i - 1][a[i]];     
            dp[i][a[i]] %= mod;
        }

        // 答案
        ll res = 0;
        for (auto [_, v] : dp[n - 2]) {
            res += v;
            res %= mod;
        }
        for (auto [_, v] : dp[n - 1]) {
            res += v;
            res %= mod;
        }
        cout << res << endl;
    }

    return 0;
}
```

## [2061D - Kevin and Numbers](https://codeforces.com/contest/2061/problem/D)

如果由 $x,y$ 生成 $z=x+y$，那么 $x,y$ 分别是 $\lfloor \cfrac{z}{2} \rfloor$ 和 $\lceil \cfrac{z}{2} \rceil$，所以倒着看操作就是唯一的。

取出 $b$ 中的最大值，如果在 $a$ 中能找到，则同时删除，否则分成两半再塞进 $b$ 里去，如此反复直至 $b$ 空或 $b$ 溢出。由于每次操作 $b$ 数组数量会增加 1，所以至多操作 $n-m$ 次。

时间复杂度 $\operatorname{O}(n\log n)$。

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
        
        multiset<int> a, b;
        for (int i = 0; i < n; i++) {
            int x;
            cin >> x;
            a.insert(x);
        }
        for (int i = 0; i < m; i++) {
            int x;
            cin >> x;
            b.insert(-x);
        }

        while (!b.empty() && b.size() <= a.size()) {
            auto x = -(*b.begin());
            b.erase(b.begin());
            if (a.find(x) != a.end()) {
                a.extract(x);
            } else {
                int y = x / 2, z = x - y;
                b.insert(-y);
                b.insert(-z);
            }
        }

        cout << (a == b ? "Yes" : "No") << endl;  // 其实是a,b皆空
    }

    return 0;
}
```

## [2061E - Kevin and And](https://codeforces.com/contest/2061/problem/E)

首先想到的一种的贪心方法是，将 $a_{i}\to a_{i}\&b_{j}$ 的所有差值塞进 priority_queue 里，贪心取比较大的，然后 WA2。这种贪心似乎有些问题，因为先 & 某个 $b_{i}$ 或者先 & 另一个 $b_{i}$ 的结果不一样，或者说每个数操作的「路径」不一样，贪心地选择某条路并不靠谱。

如果考虑 DP，可以预处理每个 $a_{i}$ 升级 $j$ 次的最优解，将每个 $a_{i}$ 看作一组物品，做分组背包，但这样时空都是 $\operatorname{O}(nk)$，无法通过。

同学提出「等级升级法」，称操作一次为「升一级」，提前预处理每个 $a_{i}$ 升级 $j$ 次的最优解，然后把每次升级的代价塞进 priority_queue 后贪心取比较大的。

这样就没有上面说的路径问题了，因为从 $j$ 级提升到 $j+1$ 级没有前后效性，与之前之后如何操作都没有关系，只与当前级别有关，就这一条路径。而且，每次升级的代价单调减，也就是 2 升 3 一定比 1 升 2 小，没有「能垒」。如果不是位与，是手动赋值等级一等于 1、等级二等于 2 等级三等于 9999999 那就完了，会被其他等级一等于 2 的竞争掉。现在所有东西都单调，且互不冲突，顺着贪就行。

时间复杂度 $\operatorname{O}((n+m)\cdot 2^{m}+k\log k)$，$1024\cdot 10^{5}$ 的复杂度是可以通过的。

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
        int n, m, k;
        cin >> n >> m >> k;
        
        vector<int> a(n), b(m);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }
        for (int i = 0; i < m; i++) {
            cin >> b[i];
        }
        
        // 预处理 b[j] 的 & 结果
        vector<int> sum(1 << m, (1 << 30) - 1);
        for (int bit = 0; bit < (1 << m); bit++) {
            for (int j = 0; j < m; j++) {
                if (bit >> j & 1) {
                    sum[bit] &= b[j];
                }
            }
        }
        
        priority_queue<int> Q;
        for (int i = 0; i < n; i++) {
            vector<int> dp(m + 1);  // dp[j] : 升级 j 次的最大收益
            for (int bit = 0; bit < (1 << m); bit++) {
                // 这里不能再套一个 m 循环，会超时，改成上面提前预处理
                // int sum = (1 << 30) - 1, cnt = 0;
                // for (int j = 0; j < m; j++) {
                //     if (bit >> j & 1) {
                //         sum &= b[j];
                //         cnt++;
                //     }
                // }
                int cnt = __builtin_popcount(bit);
                dp[cnt] = max(dp[cnt], a[i] ^ (a[i] & sum[bit]));
            }
            for (int j = 0; j < m; j++) {
                Q.push(dp[j + 1] - dp[j]);  // 等级提升一次的收益
            }
        }
        
        ll ans = accumulate(a.begin(), a.end(), 0LL);
        while (!Q.empty() && k--) {
            ans -= Q.top();
            Q.pop();
        }        
        cout << ans << endl;
    }
    
    return 0;
}
```

## [2061F1 - Kevin and Binary String (Easy Version)](https://codeforces.com/contest/2061/problem/F1)

可以发现有解情况下，无论如何操作，操作次数都是一样的。

直接模拟交换，$t$ 的某块数不够就交换 $s$，如果交换之后 $s$ 的这块数的数量超过 $t$ 就无解，否则一直交换直至相等。

可以用双指针或队列等实现，时间复杂度线性。

一个预处理技巧：先把字符串用数字表示，比如两个 0 三个 1 四个 0 就是 $\lbrace 2,3,4 \rbrace$。如果 $s,t$ 首位不同，那么 $s$ 必须先交换一次，将 $s,t$ 数组统一为第一位表示 0 的个数，第二位是 1 的个数，第三位是 0 的个数，以此类推。

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
        string s, t;
        cin >> s >> t;

        deque<int> S, T;    

        // 将 s 转换为 S 数组，记录连续 0/1 的长度    
        int len = 0;
        for (int i = 1; i < s.size(); i++) {
            len++;
            if (s[i] != s[i - 1]) {
                S.push_back(len);
                len = 0;
            }
        }
        len++;
        S.push_back(len);
        
        S.push_back(0);
        S.push_back(0);
        S.push_back(0);
        S.push_back(0);

        // 将 t 转换为 T 数组，记录连续 0/1 的长度
        len = 0;
        for (int i = 1; i < t.size(); i++) {
            len++;
            if (t[i] != t[i - 1]) {
                T.push_back(len);
                len = 0;
            }
        }
        len++;
        T.push_back(len);

        int res = 0;
        bool ok = 1;

        // 如果 t 的第一个字符与 s 的第一个字符不同，那么 s 必须先交换一次
        if (t[0] != s[0]) {
            S[2] += S[0];
            S.pop_front();
            res++;
        }

        while (!T.empty()) {
            int x = S.front(); S.pop_front();
            int y = T.front(); T.pop_front();

            while (x < y && S.size() >= 3) {
                // 交换 S[0] 和 S[1]
                x += S[1];
                S[2] += S[0];
                S.pop_front();
                S.pop_front();
                res++;
            }
            
            if (x != y || S.empty()) {
                ok = 0;
                break;
            }
        }

        if (!ok) {
            cout << -1 << endl;
        } else {
            cout << res << endl;
        }
    }

    return 0;
}
```