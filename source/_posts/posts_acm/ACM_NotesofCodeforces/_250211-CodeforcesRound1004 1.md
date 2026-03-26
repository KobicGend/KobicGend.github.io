---
title: Codeforces Round 1004 (div2D - div 2F)
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
abbrlink: 
date: 2025-02-12 01:04:00
updated: 2025-02-12 01:04:00
---
div2A - C 明天补
## [1A2D - Object Identification](https://codeforces.com/contest/2066/problem/A)

**Hint1** 关注数据范围 $1 \leqslant x_{i} \leqslant n$，这启发我们如何分类？

两种情况，一种是排列，一种是至少有两数相同。


**Hint2** 只能问两次，能得到什么信息？

如果问 $(x,y)$ 和 $(y, x)$，B 图得到的结果一定相同，A 图可能有 0，这是个突破口。


**完整解析**

分两种情况：

(1) 如果 $x$ 构成排列，那么

- A 图是有向基环树森林，

- B 图是若干个横坐标互不相同的点。

问两个横坐标相差最大的点，如果结果大于 $n-1$ 则是 B 图。

(2) 如果 $x$ 至少有两数相同，或者说，至少有某个数没出现过，那么

- A 图有某个点没有出度，

- B 图有两个点横坐标相同。

问没有出度的那个点和其他任意一个点即可，如果询问结果有 0 则是 A 图。

```cpp
#include <bits/stdc++.h>

#define cerr(x) cerr << #x << " == " << (x) << endl;
#define cerr2(x, y) cerr << #x << " == " << (x) << ", " << #y << " == " << (y) << endl;

using namespace std;
using LL = long long;

constexpr LL inf = 0x3f3f3f3f3f3f3f3f;

auto query(int x, int y) {
    cout << "? " << (x + 1) << " " << (y + 1) << endl;
    cin >> x;
    return x;
}

auto answer(char c) {
    cout << "! " << c << endl;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        vector<int> p(n, -1);
        for (int i = 0; i < n; i++) {
            int x;
            cin >> x;
            x--;
            p[x] = i;
        }

        int x = -1;
        for (int i = 0; i < n; i++) {
            if (p[i] == -1) {
                x = i;
            }
        }

        if (x == -1) {
            if (query(p[0], p[n - 1]) >= n - 1 && query(p[n - 1], p[0]) >= n - 1) {
                answer('B');
            } else {
                answer('A');
            }
        } else {
            int y = 0;
            if (y == x) {
                y++;
            }

            if (query(x, y) && query(y, x)) {
                answer('B');
            } else {
                answer('A');
            }
        }
    }

    return 0;
}
```


## [1B2E - White Magic](https://codeforces.com/contest/2066/problem/B)

**Hint1** 哪种情况合法，且最容易计算？

没有 0，这样的答案是 $n$ 减去 0 的数量。


**Hint2** 如果有 0 怎么办？可以有几个？

只能出现一个 0，且保留最左端的 0 最优。


**Hint3** 从没有 0 的情形调整为保留一个 0 的情形，对答案产生了什么影响？

由于只多了一个 0，所以答案至多增加 1。只需要验证有没有可能增加 1，也就是说，验证保留一个 0 这种情况是否合法。

```cpp
#include <bits/stdc++.h>

#define cerr(x)  //cerr << #x << " == " << (x) << endl;
#define cerr2(x, y)  //cerr << #x << " == " << (x) << ", " << #y << " == " << (y) << endl;

using namespace std;
using LL = long long;

constexpr LL inf = 0x3f3f3f3f3f3f3f3f;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        vector<int> a(n);
        vector<int> zero;
        for (int i = 0; i < n; i++) {
            cin >> a[i];
            if (a[i] == 0) {
                zero.push_back(i);
            }
        }

        if (zero.empty()) {
            cout << n << endl;
        } else {
            int x = zero[0];
            vector<int> b;
            for (int i = 0; i < n; i++) {
                if (a[i] || i == x) {
                    b.push_back(a[i]);
                }
            }
    
            a = b;
            n = a.size();
    
            auto premin = a;
            for (int i = 1; i < n; i++) {
                premin[i] = min(premin[i], premin[i - 1]);
            }
    
            bool ok = true;
            vector<int> vis(n);
            int mex = 0;
            for (int i = n - 1; i >= 1; i--) {
                if (a[i] < n) {
                    vis[a[i]] = 1;
                }
                while (mex < n && vis[mex]) {
                    mex++;
                }
                if (premin[i - 1] < mex) {
                    ok = false;
                }
            }
            cout << (n - 1 + ok) << endl;
        }
    }

    return 0;
}
```

## [1C2F - Bitwise Slides](https://codeforces.com/contest/2066/problem/C)

**Hint1** 条件很苛刻。

假设现在是 $P=Q \neq R$，除非 $a_{i}=P\oplus R$ 这种情况下可以操作 $P,Q,R$ 三种，否则只能操作 $R$。

**Hint2** 没有办法记录所有 $P,Q,R$ 的可能值，如何优化状态表示？

其实同时对 $P,Q,R$ 异或一个数，不会产生任何影响，所以 $P=Q \neq R$ 可以写为 $0=0 \neq P\oplus R$，只用一个 $P\oplus R$ 表示就够了。

用一个容器存所有的状态，对于容器中的 $x$ 和 $a_{i}$：

- 如果 $x=a_{i}$，可以操作 $P,Q,R$ 三种，操作后 $f(x):=2f(x),f(0):=f(0)+f(x)$。

- 否则，只能操作 $R$，$f(x \oplus a_{i}):=f(x)$。

**Hint3** 尝试写一个 $\operatorname{O}(n^{2})$ 的暴力。

（实际上是 $\operatorname{O}(n^{2}\log n)$ 的）

```cpp
int n;
cin >> n;

map<int, LL> mp;
mp[0] = 1;
for (int i = 0; i < n; i++) {
	int x;
	cin >> x;

	map<int, LL> nmp;
	for (auto [k, v] : mp) {
		nmp[k ^ x] = v;
		if (k == 0) {
			nmp[x] = v * 3;
			nmp[x] %= mod;
		}
	}
	if (mp.count(x)) {
		nmp[x] += (nmp[0] << 1);
		nmp[x] %= mod;
	}
	mp = nmp;
}

LL res = 0;
for (auto [_, x] : mp) {
	res += x;
	res %= mod;
}
cout << res << endl;
```


**Hint4** 大量的 $f(x \oplus a_{i}):=f(x)$ 操作只是对容器中元素做一个「**平移**」，**没有真正转移**，浪费时间，如何优化？

记录 **平移偏移量**，也就是前缀异或和，记录的 $f(x)$，实际上是 $f(x \oplus \operatorname{pre})$。

```cpp
#include <bits/stdc++.h>

#define cerr(x) cerr << #x << " == " << (x) << endl;
#define cerr2(x, y) cerr << #x << " == " << (x) << ", " << #y << " == " << (y) << endl;

using namespace std;
using LL = long long;

constexpr LL inf = 0x3f3f3f3f3f3f3f3f;
constexpr LL mod = 1e9 + 7;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        map<int, LL> mp;
        mp[0] = 1;
        int pre = 0;
        for (int i = 0; i < n; i++) {
            int x;
            cin >> x;

            if (mp.count(pre)) {
                mp[pre] *= 3;
                mp[pre] %= mod;
            }
            if (mp.count(x ^ pre)) {
                mp[pre] += (mp[x ^ pre] << 1);
                mp[pre] %= mod;
            }
            pre ^= x;
        }

        LL res = 0;
        for (auto [_, x] : mp) {
            res += x;
            res %= mod;
        }
        cout << res << endl;
    }

    return 0;
}
```