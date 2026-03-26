---
title: Codeforces Round 990 div2A-2D
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
abbrlink: ebeac076
date: 2024-12-03 20:15:00
updated: 2024-12-03 23:34:00
---
感觉最近几场 CF 加难度了

## [2047A - Alyona and a Square Jigsaw Puzzle](https://codeforces.com/contest/2047/problem/A)

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        int sum = 0, res = 0;
        while (n--) {
            int x;
            cin >> x;
            sum += x;
            res += (sum & 1) && (int(sqrt(sum)) * int(sqrt(sum)) == sum);
        }
        cout << res << endl;
    }

    return 0;
}
```

## [2047B - Replace Character](https://codeforces.com/contest/2047/problem/B)

策略：把出现次数最少的字母换成出现次数最多的字母。时间复杂度 $\Theta(n)$。

简要分析：如果 $n$ 个字母全不同，则排列数为 $n!$，出现 $k$ 次的某个字母贡献为 $\dfrac{1}{k!}$。设把出现 $a$ 次的字母变成出现 $b$ 次的字母，原贡献是 $\dfrac{1}{a!b!}$，修改后的贡献是 $\dfrac{1}{(a-1)!\cdot (b+1)!}$。贡献的变化是 $\dfrac{1}{(a-1)!\cdot (b+1)!}\Big/\dfrac{1}{a!b!}=\dfrac{a}{b+1}$，希望贡献尽可能小，因此选取最小的 $a$ 和最大的 $b$。

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        string s;
        cin >> s;

        int cnt[26]{};
        for (auto c : s) {
            cnt[c - 'a']++;
        }

        int imin = 0;
        for (int i = 0; i < n; i++) {
            if (cnt[s[i] - 'a'] <= cnt[s[imin] - 'a']) {
                imin = i;
            }
        }
        int imax = imin;
        for (int i = 0; i < n; i++) {
            if (s[i] != s[imin] && cnt[s[i] - 'a'] >= cnt[s[imax] - 'a']) {
                imax = i;
            }
        }
        s[imin] = s[imax];
        cout << s << endl;
    }

    return 0;
}
```

## [2047C / 2046A - Swap Columns and Find a Path](https://codeforces.com/contest/2046/problem/A)

观察：顺序任意，因此问题化为某些列选上面的，某些列选下面的，有一列的上下两格全选。

策略：假定已经确定哪一列上下两格全选，那么对于其它列，贪心选较大的。

实现：$\Theta(n)$ 枚举全选的那一列，再 $\Theta(n)$ 计算其它列。时间复杂度 $\Theta(n^{2})$。

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

        vector<int> a(n), b(n);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }
        for (int i = 0; i < n; i++) {
            cin >> b[i];
        }

        ll res = -1e18;
        for (int i = 0; i < n; i++) {
            ll sum = a[i] + b[i];
            for (int j = 0; j < n; j++) {
                if (i == j) continue;
                sum += max(a[j], b[j]);
            }
            res = max(res, sum);
        }
        cout << res << endl;
    }

    return 0;
}
```

优化为线性：

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        vector<int> a(n), b(n);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }
        for (int i = 0; i < n; i++) {
            cin >> b[i];
            if (a[i] < b[i]) swap(a[i], b[i]);
        }

        cout << accumulate(a.begin(), a.end(), 0LL) 
            + *max_element(b.begin(), b.end()) << endl;
    }

    return 0;
}
```

## [2047D / 2046B - Move Back at a Cost](https://codeforces.com/contest/2046/problem/B)

观察 1：序列中最前面的最小值不能被操作，它前面的数都要操作一次放到后面。

观察 2：**每个数只会被操作一次**。因为操作后能任意改变顺序，多操作只会使数值更大。这样对于不被操作的数，按先后顺序输出，对于操作一次的数，排序后从小到大输出。

现在问题化为，找出哪些数不被操作。

暴力方案：选取序列中的最小值输出，然后将它前面的数加 1 并按从小到大的顺序放到最后，如此循环。期望复杂度 $\Theta(n^{2})$。

优化：我们只讨论哪些数不被操作，所以放到最后的不作考虑。这样每次都是选后面序列中的最小值，如此循环，所选出的数实际上是序列 **后缀最小值**。此外，并不是所有序列后缀最小值都要选，因为不被操作不能超过它前面的数 + 1。

实现：用 **单调栈** 维护序列后缀最小值，同时记录前缀最小值，时间复杂度 $\Theta(n)$。

```cpp
#include <bits/stdc++.h>
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

        vector<int> stk, out;
        for (int i = 0; i < n; i++) {
            while (!stk.empty() && a[i] < stk.back()) {
                out.push_back(stk.back() + 1);
                stk.pop_back();
            }
            stk.push_back(a[i]);
        }

        sort(out.begin(), out.end());
        while (!stk.empty() && stk.back() > out[0]) {
            out.push_back(stk.back() + 1);
            stk.pop_back();
        }

        for (auto x : stk) {
            cout << x << " ";
        }
        sort(out.begin(), out.end());
        for (auto x : out) {
            cout << x << " ";
        }
        cout << endl;
    }

    return 0;
}
```