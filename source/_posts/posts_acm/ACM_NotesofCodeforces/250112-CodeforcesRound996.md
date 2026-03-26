---
title: Codeforces Round 996 (Div. 2) A - D
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
abbrlink: 60243f0c
date: 2025-01-12 23:10:00
updated: 2025-01-13 01:01:00
---

## [2055A - Two Frogs](https://codeforces.com/contest/2055/problem/A)

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n, a, b;
        cin >> n >> a >> b;

        cout << ((a - b) % 2 == 0 ? "YES" : "NO") << endl;
    }

    return 0;
}
```

## [2055B - Crafting](https://codeforces.com/contest/2055/problem/B)

如果存在多个 $a_{i}<b_{i}$ 就无解，因为 A 加一的时候 B 减一，B 加一的时候 A 又要减一，这两者不可能同时增加。

现在只需要把一个 $a_{i}$ 变成 $b_{i}$，那就看其它的 $a_{j}$ 在减去 $b_{i}-a_{i}$ 之后会不会比 $b_{j}$ 小，如果会则无解。

时间复杂度线性。

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

        int cnt = 0, sum = 0;
        for (int i = 0; i < n; i++) {
            if (a[i] < b[i]) {
                cnt++;
                sum += b[i] - a[i];
                a[i] = b[i] + sum;
            }
        }
        for (int i = 0; i < n; i++) {
            if (a[i] - sum < b[i]) {
                cnt = 2;
            }
        }

        cout << (cnt > 1 ? "NO" : "YES") << endl;
    }

    return 0;
}
```

另法：

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        vector<int> d(n);
        for (int i = 0; i < n; i++) {
            int a, b;
            cin >> a >> b;
            d[i] = a - b;
        }
        sort(d.begin(), d.end());

        cout << (d[0] + d[1] < 0 ? "YES" : "NO") << endl;
    }

    return 0;
}
```

## [2055C - The Trail](https://codeforces.com/contest/2055/problem/C)

对于方阵，$x$ 取任意值都有解。为什么？轮流取必然能取到行或者列唯一空的那一个，这样可以一直填直到最后一个数。但行列总和都一样，最后一个数那行那列之和必然相等（有点填数独的感觉）

对于一般情况，由于 $mx=nx$，$x$ 只能取 0。

于是取 $x=0$。每次选择行或者列唯一空的那一个，计算应当填什么。

时间复杂度 $\operatorname{O}(mn)$。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n, m;
        cin >> n >> m;

        string s;
        cin >> s;

        vector a(n, vector<ll>(m));
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                cin >> a[i][j];
            }
        }

        int x = 0, y = 0;
        for (auto c : s) {
            ll sum = 0;
            if (c == 'D') {
                for (int i = 0; i < m; i++) {
                    sum += a[x][i];
                }
                a[x][y] = -sum;
                x++;
            } else {
                for (int i = 0; i < n; i++) {
                    sum += a[i][y];
                }
                a[x][y] = -sum;
                y++;
            }
        }

        ll sum = 0;
        for (int i = 0; i < m; i++) {
            sum += a[n - 1][i];
        }
        a[n - 1][m - 1] = -sum;            

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                cout << a[i][j] << " ";
            }
            cout << endl;
        }
    }

    return 0;
}
```

## [2055D - Scarecrow](https://codeforces.com/contest/2055/problem/D)

分为三个步骤：

1. 初始时刻，乌鸦已经受到惊吓，先找到其真正的初始位置；

2. 乌鸦左侧最靠近它的稻草人向右，右侧最靠近它的稻草人向左，直到乌鸦碰到右侧的稻草人；

3. 在此同时，将右边其它的稻草人尽可能地保持 $k$ 的间隔；

4. 重复以上步骤。

有几个小细节：

- 如果乌鸦右边没有稻草人，剩余时间直接计算为 $\ell-x$。

- 如果乌鸦左边没有稻草人，只能把右边最近的稻草人挪到乌鸦的位置。

时间复杂度线性。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
constexpr int inf = 0x3f3f3f3f;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n;
        ll k, l;
        cin >> n >> k >> l;
        k <<= 1;
        l <<= 1;

        vector<ll> a(n);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
            a[i] <<= 1;
        }

        ll x = 0;
        int i = 0;
        ll res = a[0];
        a[0] = 0;
        while (x < l) {
            // 步骤 1
            while (i < n && x >= a[i]) {
                x = max(x, a[i] + k);
                i++;
                a[i] = min(a[i] + res, max(a[i] - res, a[i - 1] + k));  // 步骤 3
            }
            if (x >= l) {
                break;
            }
            if (i == n) {
                res += l - x;
                break;
            }
            // 步骤 2
            ll d = a[i] - x >> 1;
            res += d;
            x += d;
            a[i] -= d;
        }
        cout << res << endl;
    }

    return 0;
}
```