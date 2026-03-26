---
title: Codeforces Round 1016 (Div. 3) G（二进制比大小）
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
abbrlink: 9d8579ee
date: 2025-04-09 11:12:00
updated: 2025-04-09 11:29:00
---

[CF2093G. Shorten the Array](https://codeforces.com/contest/2093/problem/G)

**题意** 给定长度为 $n$ 的数组 $a$，从中找出两个数 $a_{i},a_{j}$ 满足 $a_{i}\oplus a_{j} \geqslant k$，并最大化两数距离（即最大化 $j-i+1$），输出这个最大距离。找不到则输出 $-1$。

**思路** *两数异或最大可以用字典树，但本题有个更好写的做法。*

比大小问题，可以转化为判断相等。

给定 $b$，枚举 `b += lowbit(b)`（其本质是把 $b$ 的一个 0 变 1，低位都变 0）。如果 $a \geqslant b$，那么必然存在一个枚举结果 $b'$，满足 $a$ 同样位数变 0 后与 $b'$ 相同。

比如 $b$ 是 10110，一个数大于等于 $b$，只能是 1011?、11??? 或 1????? 这几种形式。而枚举 `b += lowbit(b)`，刚好会得到 10110 $\to$ 11000 $\to$ 100000 $\to$ 1000000 $\to$ …… 满足 $a$ 低位都变 0 后与 $b'$ 相同。

这样，我们就把 $a \geqslant b$ 问题转化为判断 32 次 $a'=b'$。

回到本题，只需枚举 `k += lowbit(k)`，同时把 $a_{i}$ 的低位都变 0，判断是否存在 $a_{i}'\oplus a_{j}' = k'$，用桶存下标即可。时间复杂度 $\operatorname{O}(n\log^{2} V)$，$V=10^{9}$。 

```cpp
#include <bits/stdc++.h>
using namespace std;
constexpr int inf = 0x3f3f3f3f;

int main() {
    int t;
    cin >> t;

	while (t--) {
        int n, k;
        cin >> n >> k;

        vector<int> a(n);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }

        int res = inf;
        if (k == 0) {
            res = 1;
        }
        for ( ; k > 0; k += (k & -k)) {
            map<int, int> mp;
            for (int i = 0; i < n; i++) {
                int x = a[i] & ~((k & -k) - 1);
                if (mp.count(k ^ x)) {
                    res = min(res, i - mp[k ^ x] + 1);
                }
                mp[x] = i;
            }
        }
        cout << (res == inf ? -1 : res) << endl;
    }

    return 0;
}
```

**练习**：[2023 山东省赛 J. Not Another Path Query Problem](https://codeforces.com/gym/104417/problem/J)


--- 

UPD：上面代码复杂度略高，TLE。可以用 vector 二分代替 map，实现 $\operatorname{O}(n\log n\log V)$ 的复杂度。

```cpp
int main() {
    int t;
    cin >> t;

	while (t--) {
        int n, k;
        cin >> n >> k;

        vector<int> a(n);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }

        int res = inf;
        if (k == 0) {
            res = 1;
        }
        for ( ; k > 0; k += k & -k) {
            vector<pair<int, int>> mp(n);
            for (int i = 0; i < n; i++) {
                mp[i].first = a[i] & ~((k & -k) - 1);
                mp[i].second = -i;
            }
            sort(mp.begin(), mp.end());
            for (int i = 0; i < n; i++) {
                int b = a[i] & ~((k & -k) - 1);
                auto it = lower_bound(mp.begin(), mp.end(), pair(b ^ k, -i));
                if (it == mp.end() || it->first != (b ^ k)) {
                    continue;
                }
                int j = -it->second;
                res = min(res, abs(i - j) + 1);
            }
        }
        cout << (res == inf ? -1 : res) << endl;
    }

    return 0;
}
```