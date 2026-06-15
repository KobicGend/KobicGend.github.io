---
title: Codeforces Round 1001 (Div. 12) A - C
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
abbrlink: a03861ed
date: 2025-01-27 02:05:00
updated: 2025-01-27 02:05:00
---
## [2062A - String](https://codeforces.com/contest/2062/problem/A)

没读题，看样例后就直接写了。

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    
    int t;
    cin >> t;

    while (t--) {
        string s;
        cin >> s;

        cout << count(s.begin(), s.end(), '1') << endl;
    }
    
    return 0;
}
```


## [2062B - Clockwork](https://codeforces.com/contest/2062/problem/B)

最优就是从这头走到那头，再走回这头，如此反复。

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    
    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;
        
        vector<int> a(n);
        bool ok = true;
        for (int i = 0; i < n; ++i) {
            cin >> a[i];
            if (a[i] <= 2 * max(i, n - i - 1)) {
                ok = false;
            }
        }

        cout << (ok ? "YES" : "NO") << endl;
    }
    
    return 0;
}
```

## [2062C - Cirno and Operations](https://codeforces.com/contest/2062/problem/C)

翻转只会让结果相差一个相反数。数据范围较小，直接模拟每次操作，将操作结果的绝对值取最大值。

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
        
        vector<ll> a(n);
        for (int i = 0; i < n; ++i) {
            cin >> a[i];
        }

        ll maxx = accumulate(a.begin(), a.end(), 0LL);
        for (int t = 1; t < n; t++) {
            vector<ll> b(n - t);
            for (int i = 0; i < n - t; i++) {
                b[i] = a[i + 1] - a[i];
            }
            a = b;
            maxx = max(maxx, abs(accumulate(a.begin(), a.end(), 0LL)));
        }
        cout << maxx << endl;
    }
    
    return 0;
}
```