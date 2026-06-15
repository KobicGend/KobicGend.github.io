---
title: Codeforces Round 1019 (Div. 2) A-D
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
abbrlink: d7b3b678
date: 2025-04-22 00:41:00
updated: 2025-04-22 00:41:00
---
## [2103A. Common Multiple](https://codeforces.com/contest/2103/problem/A)

```cpp
void solve() {
    int n;
    cin >> n;
    
    vector<int> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    
    sort(a.begin(), a.end());
    a.erase(unique(a.begin(), a.end()), a.end());
    
    cout << a.size() << endl;
}
```

## [2103B. Binary Typewriter](https://codeforces.com/contest/2103/problem/B)

交换一次至多消除两处不同 res - 2，但不可能完全消除不同，res 至少剩 1。

```cpp
void solve() {
    int n;
    cin >> n;
    string s;
    cin >> s;
    s = '0' + s;
    
    int res = 0;
    for (int i = 0; i < n; i++) {
        res += s[i] != s[i + 1];
    }
    if (res) {
        res = max(1, res - 2);
    }
    res += n;

    cout << res << endl;
}
```


## [2103C. Median Splits](https://codeforces.com/contest/2103/problem/C)

当 $a_{i} \leqslant k$ 时置 $a_{i}=1$，否则置 0，问题化为这个 01 串能否分成三段，每段中位数的中位数为 1。