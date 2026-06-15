---
title: Codeforces Round 994 (Div. 2) A - D
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
abbrlink: e7841a6f
date: 2024-12-21 00:02:00
updated: 2024-12-06 13:10:00
---
冬至快乐！

## [2049A - MEX Destruction](https://codeforces.com/contest/2049/problem/A)

- 如果全 0，不需要操作，否则至少需要操作一次；

- 任何一个序列不包含 0 的序列操作一次都会变成 0；

- 任何一个序列操作两次都会变成 0，因此答案不超过 2；

- 什么时候只需要操作一次？

- 所有非零的数都连续，操作这个连续的段即可，否则一次不够。

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

        deque<int> a(n);
        for(int i = 0; i < n; i++) {
            cin >> a[i];
        }
        while (!a.empty() && a.front() == 0) {
            a.pop_front();
        }
        while (!a.empty() && a.back() == 0) {
            a.pop_back();
        }
        int ans = 0;
        if (!a.empty()) {
            ans = 1;
            for (int i = 0; i < a.size(); i++) {
                if (a[i] == 0) {
                    ans = 2;
                }
            }
        }
        cout << ans << endl;
    }

    return 0;
}
```


## [2049B - pspspsps](https://codeforces.com/contest/2049/problem/B)

观察：

- 比如说 $n=5$，第 3 位是 p，第 4 位是 s，那么 1 ~ 3 位是 1 ~ 3 的排列，4 ~ 5 位是 1 ~ 2 的排列，发现 1 和 2 不可能同时满足这两个条件。

  进一步，如果有 p 在 s 左边，都不行。

- 再比如 $n=5$，第 2 位是 s，第 4 位是 p，那么 2 ~ 5 位是 1 ~ 4 的排列，说明第 1 位是 5，而 1 ~ 4 位也是 1 ~ 4 的排列，说明第 5 位是 5，出现了矛盾。

  所以说如果 p 在 s 右边，必须有一者在最边上。

在满足上面两个条件下，最边上那个数没有任何约束，就化为了只有 s 或只有 p 的情形，是可行的。

结论：

- 没有 p 或 s 可行；

- 否则，所有 p 都应在 s 右边，且要么唯一的 p 在最后一个位置，要么唯一的 s 在第一个位置。

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

        string s;
        cin >> s;

        int fstp = n - 1, lsts = 0;
        for (int i = 0; i < n; i++) {
            if (s[i] == 'p') {
                fstp = i;
                break;
            }
        }
        for (int i = 0; i < n; i++) {
            if (s[i] == 's') {
                lsts = i;
            }
        }
        if (lsts <= fstp && (lsts == 0 || fstp == n - 1)) {
            cout << "YES" << endl;
        } else {
            cout << "NO" << endl;
        }
    }

    return 0;
}
```

## [2049C - MEX Cycle](https://codeforces.com/contest/2049/problem/C)

先思考，如果没有 $x$ 与 $y$ 是朋友的额外约束怎么做。

- 大致是 1 0 1 0 ... 的形式，如果 $n$ 是奇数，可以在任意两个数之间插入 2。

加上 $x$ 与 $y$ 是朋友的限制呢？

- 如果这两个数原来就是一个 1 一个 0，那没有额外限制；

- 否则需要调整：

   - 如果 $n$ 是奇数，刚才说至少要加一个 2，那么把 $x$ 设为 2 就行了；

   - 如果 $n$ 是偶数，也需要选一个位置是 2，不妨把 $x$ 设为 2，为了保证 $x$ 这个位置的 mex 确实为 2，需要让旁边两个是 1，$y$ 是 0。

实现：

- 从设 $x$ 为 0，$y$ 为 2，从 $x$ 开始向两边 1 0 1 0；

- 特判不需要修改的情况。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n, x, y;
        cin >> n >> x >> y;
        x--, y--;

        vector<int> res(n, -1);
        int now = 0;
        for (int i = x; i != y; i = (i + 1) % n) {
            res[i] = now;
            now ^= 1;
        }
        now = 0;
        for (int i = x; i != y; i = (i + n - 1) % n) {
            res[i] = now;
            now ^= 1;
        }
        res[x] = 0;
        res[y] = 2 - (res[(y + 1) % n] == 0 && res[(y + n - 1) % n] == 0);

        for (int i = 0; i < n; i++) {
            cout << res[i] << " ";
        }
        cout << endl;        
    }

    return 0;
}
```


## [2049D - Shift + Esc](https://codeforces.com/contest/2049/problem/D)

如果不能交换，设 $dp_{i,j}$ 表示走到第 $i$ 行第 $j$ 列的最小代价，转移是容易的，用 $dp_{i-1,k}$ 更新 $dp_{i,j}$，增加的代价是第 $i$ 行从 $j$ 到 $k$ 最小的和是多少。这部分复杂度是 $\mathrm O(nm)$。

下面求第 $i$ 行从 $j$ 到 $k$ 最小的和 `minn[i][j][k]`。

固定区间长度，循环长度为 $(k-j+1)$ 的这 $n$ 个区间找最小的和。先看区间长度为 1 的情形。

对于下标 $q$，如果把 $a_{p}$ 平移到 $a_{q}$，那么 $q$ 这个位置的代价是 $a_{p}+(p-q+1)K$（先不考虑取模），那么下标 $q$ 的最小代价是 $\min\limits_{p}\lbrace a_{p}+(p-q+1)K \rbrace$。这个暴力更新是 $\mathrm O(m^{2})$ 的，加上不同的区间长度不同的行，时间复杂度达到 $\mathrm O(nm^{3})$，不能通过，希望更新的复杂度是线性 $\mathrm O(m)$。

上面的更新有很多浪费。如果已经更新了 $q$，那么再更新 $q-1$ 时，只需要用 $q$ 的更新结果来更新 $q-1$，而不需要再循环每个数，也就是 $dp_{q-1}\leftarrow dp_{q}+K$，$dp_{q-1}=\min\lbrace a_{q-1},dp_{q}+K \rbrace$。所以用 $q$ 更新 $q-1$，再用 $q-1$ 更新 $q-2$，如此循环。

循环一轮不够，因为还需要用 $1$ 来更新 $n$，需要再循环一轮。为什么两轮就够？这有两种理解方法：

- 一轮循环只能让 $1$ 这个位置更新完全，第二次循环是把这个最小值更新到数组的每一个位置，然后所有就都是最小值了。

- 考虑倍长。比如求区间和，$n=10$，需要算 5,6,7,8,9,10,1,2,3 的和，倍长之后就是算 5 到 13 的和。这个也是同理，需要用 3 更新 5，那倍长之后就是用 13 更新 5，倍长之后的数组只需要一轮循环，那原数组就需要两轮循环。

更新的复杂度是 $\mathrm O(m)$，总时间 $\mathrm O(nm^{2})$。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
constexpr ll inf = 1e18;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n, m, K;
        cin >> n >> m >> K;

        vector a(n, vector<int>(m));
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                cin >> a[i][j];
            }
        }

        vector minn(n, vector(m, vector<ll>(m)));
        for (int i = 0; i < n; i++) {
            for (int len = 0; len < m; len++) {
                ll sum = 0;
                int l = 0, r = len;
                for (int j = r; j > l; j--) {
                    sum += a[i][j];
                }

                ll now = inf;
                for (int t = 0; t < 2 * m; t++) {
                    sum += a[i][l];
                    minn[i][l][r] = now = min(now + K, sum);
                    sum -= a[i][r];
                    
                    l = (l - 1 + m) % m;
                    r = (r - 1 + m) % m;
                }
            }
        }

        vector dp(n, vector<ll>(m, inf));  // 走到第 i 行，第 j 列的最小代价
        for (int j = 0; j < m; j++) {
            dp[0][j] = minn[0][0][j];
        }
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < m; j++) {
                for (int k = 0; k <= j; k++) {
                    dp[i][j] = min(dp[i][j], dp[i - 1][k] + minn[i][k][j]);
                }
            }
        }
        cout << dp.back().back() << endl;
    }

    return 0;
}
```

今天的题有点难度，而且用语言有点难说清楚