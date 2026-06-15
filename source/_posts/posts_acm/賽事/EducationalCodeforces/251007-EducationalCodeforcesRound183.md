---
title: 'Educational Codeforces Round 183 ABCDF [251007]'
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
abbrlink: 470816bd
date: 2025-10-07 02:05:00
updated: 2025-10-07 02:05:00
---
重操旧业了，CF 还是要好好打

# [A - Candies for Nephews](https://codeforces.com/contest/2145/problem/A)

```cpp
void solve() {
    int n;
    cin >> n;

    cout << ((3 - n % 3) % 3) << endl;
}    
```

# [B - Deck of Cards](https://codeforces.com/contest/2145/problem/B)

```cpp
void solve() {
    int n, k;
    cin >> n >> k;

    string s;
    cin >> s;
    
    if (k == n) { 
        cout << string(n, '-') << endl;
        return;
    }

    int c0 = count(s.begin(), s.end(), '0');
    int c1 = count(s.begin(), s.end(), '1');
    int c2 = count(s.begin(), s.end(), '2');

    if (n - c0 - c1 - c2 - c2 >= 0) {
        int c3 = n - c0 - c1 - c2 - c2;
        cout << string(c0, '-') 
              + string(c2, '?')
              + string(c3, '+') 
              + string(c2, '?') 
              + string(c1, '-') << endl;
    } else {
        cout << string(c0, '-') 
              + string(n - c0 - c1, '?') 
              + string(c1, '-') << endl;
    }
}        
```

# [C - Monocarp's String](https://codeforces.com/contest/2145/problem/C)（枚举）

留下的字符是一个前缀与一个后缀拼起来，设 a 为 1，b 为 -1，则合法的方案当且仅当前缀和与后缀和相加 = 0。

枚举所有后缀，并存储所有前缀的前缀和与长度。在枚举的后缀以前的所有前缀中，找到一个相加 = 0 的最长前缀，并记录答案。

复杂度 $\mathcal{O}(n\log n)$。

```cpp
void solve() {
    int n;
    cin >> n;

    vector<int> a(n);

    map<int, set<int>> mp;
    int pre = 0;
    for (int i = 0; i < n; i++) {
        char c;
        cin >> c;
        a[i] = (c == 'a' ? 1 : -1);
        pre += a[i];
        mp[pre].insert(i + 1);
    }

    int tot = pre;

    int suf = 0;
    int res = 1'000'000'000;
    if (mp[-suf].size()) {
        res = min(res, n - *mp[-suf].rbegin());
    }
    mp[0].insert(0);
    for (int i = n - 1; i >= 0; i--) {
        mp[pre].erase(i + 1);
        pre -= a[i];
        suf += a[i];
        if (mp[-suf].size()) {
            res = min(res, i - *mp[-suf].rbegin());
        }
    }
    cout << (res == 1'000'000'000 ? -1 : res) << endl;
}     
```

# [D - Inversion Value of a Permutation](https://codeforces.com/contest/2145/problem/D)（暴力）

发现这个有解条件很奇怪，应该不是手玩构造题。又发现数据范围很小，考虑暴力。

要求没有逆序对的区间数总数 $\binom{N}{2}-K$。一个长度为 $n$ 的升序区间，有 $\binom{n}{2}$ 个子区间没有逆序对。我们可以将若干升序串拼起来，这样升序串内部没有逆序对，跨过分割线的都有逆序对。

为找到具体方案，这个问题其实是二维背包：一个物体有 $n$ 的体积和 $\binom{n}{2}$ 的重量，需要总体积是 $N$，总重量是 $\binom{N}{2}-K$。物品总数不会超过 $N^{2}$，于是 $\mathcal{O}(N^{2}\cdot N\cdot K)=\mathcal{O}(N^{5})$ 做背包的预处理，然后回溯方案。

考虑到预处理的复杂度过高，可以提前对每个 $N$ 做背包预处理，再处理 $T$ 组查询。这样复杂度粗略估计是 $\mathcal{O}(N^{6} + T N^{2})$，可以通过。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using ull = unsigned long long;

void solve() {
    const int N = 30;
    int K = N * (N - 1) / 2;
    vector<pair<int, int>> w;
    w.push_back({0, 0});
    for (int n = 1; n <= N; n++) {
        int k = n * (n - 1) / 2;
        for (int _ = n; _ <= N; _ += n) {
            w.push_back({n, k});
        }
    }
    int M = w.size() - 1;

    vector dp(M + 1, vector(N + 1, vector<int>(K + 1)));
    vector lst(M + 1, vector(N + 1, vector<pair<int, int>>(K + 1, {-1, -1})));
    dp[0][0][0] = 1;
    for (int m = 1; m <= M; m++) {
        auto [wn, wk] = w[m];
        for (int n = 0; n <= N; n++) {
            for (int k = 0; k <= K; k++) {
                dp[m][n][k] = dp[m - 1][n][k];
                lst[m][n][k] = {n, k};
                if (n >= wn && k >= wk && dp[m - 1][n - wn][k - wk]) {
                    dp[m][n][k] = 1;
                    lst[m][n][k] = {n - wn, k - wk};
                }
            }
        }
    }

    for (int _ = (cin >> _, _); _--; ) {
        int N, K; 
        cin >> N >> K;
        
        K = N * (N - 1) / 2 - K;
        if (dp[M][N][K] == 0) {
            cout << "0" << endl;
            continue;
        }

        pair<int, int> cur = {N, K};
        int num = N;
        for (int m = M; m > 0; m--) {
            auto [n, k] = cur;
            auto [nn, kk] = lst[m][n][k];
            if (kk != k) {
                for (int k = 1; k <= w[m].first; k++) {
                    cout << num - w[m].first + k << " ";
                }
                num -= w[m].first;
            }        
            cur = {nn, kk};
        }
        while (num > 0) {
            cout << num << " ";
            num--;
        }
        cout << endl;
    }
}

signed main() {
    cin.tie(nullptr)->sync_with_stdio(false);
    
    // for (int _ = (cin >> _, _); _--; )
        solve();

    return 0;
}
```

E 题目太长没看

# [F - Long Journey](https://codeforces.com/contest/2145/problem/F)（计算）

首先有一个观察，当前能走就走一步，否则不动，这样一定不劣。

由于所在位置具有周期性，周期是 $\operatorname{LCM}(1,2,\dots,10)=2520$，陷阱的时间也具有周期性。所以整个移动都是有周期的。而且周期不大，是 $2520n$。

模拟走路的过程找到这个周期，将中间这段直接计算，然后再模拟走到目的地。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using ull = unsigned long long;

void solve() {
    ll n;
    ll m;
    cin >> n >> m;

    vector<ll> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    vector<ll> b(n);
    for (int i = 0; i < n; i++) {
        cin >> b[i];
    }

    ll pos = 0;   // 当前位置
    ll time = 0;      // 当前时间/周期
    ll distance = 0;  // 周期内前进的距离
    vector<ll> vis(2520, -1);
    vis[0] = 0;
    for (int j = 0; j < 2520; j++) {
        // 走n个时间
        for (int i = 0; i < n; i++) {
            time++;
            if ((pos + 1) % a[i] != b[i]) {  // 能走
                pos++;  // 走
            }
            if (pos == m) { // 走到了
                cout << time << endl;
                return;
            }
        }
        if (vis[pos % 2520] != -1) { // 走到了之前走过的位置，说明发现了周期
            time -= vis[pos % 2520];
            distance = pos - pos % 2520;
            break;
        }
        vis[pos % 2520] = time;
    }
    if (distance == 0) {
        cout << -1 << endl;
        return;
    }
    ll quotient = (m - vis[pos % 2520]) / distance;
    time = vis[pos % 2520] + quotient * time;

    pos = pos % 2520 + quotient * distance;
    if (pos == m) {
        cout << time << endl;
        return;
    }
    // 再模拟一次 走到终点
    for (int j = 0; j < 2520; j++) {
        for (int i = 0; i < n; i++) {
            time++;
            if ((pos + 1) % a[i] != b[i]) {
                pos++;
            }
            if (pos == m) {
                cout << time << endl;
                return;
            }
        }
    }
    assert(false);
}

signed main() {
    cin.tie(nullptr)->sync_with_stdio(false);
    
    for (int _ = (cin >> _, _); _--; )
        solve();

    return 0;
}
```