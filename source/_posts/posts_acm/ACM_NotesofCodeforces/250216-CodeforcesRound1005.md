---
title: Codeforces Round 1005 (Div. 2) A-E
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
abbrlink: 33bacc2b
date: 2025-02-17 00:40:00
updated: 2025-02-17 00:40:00
---
## [2064A - Brogramming Contest](https://codeforces.com/contest/2064/problem/A)

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        string s;;
        cin >> s;

        s = '0' + s;
        int res = 0;
        for (int i = 1; i < s.size(); i++) {
            res += s[i] != s[i - 1];
        }
        cout << res << endl;
    }
    
    return 0;
}
```

## [2064B - Variety is Discouraged](https://codeforces.com/contest/2064/problem/B)

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
        vector<int> cnt(n);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
            a[i]--;
            cnt[a[i]]++;
        }

        int l = -1, r = -1;
        int resl = 0;
        int resr = 0;
        for (int i = 0; i < n; i++) {
            if (cnt[a[i]] == 1) {
                r = i;
                if (r - l > resr - resl) {
                    resl = l;
                    resr = r;
                }
            } else {
                l = i;
            }
        }
        if (resl == resr) {
            cout << 0 << endl;
        } else {
            cout << (resl + 2) << " " << (resr + 1) << endl;
        }
    }
    
    return 0;
}
```


## [2064C - Remove the Ends](https://codeforces.com/contest/2064/problem/C)

```cpp
#include <bits/stdc++.h>
using namespace std;
using LL = long long;

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

        vector<LL> pre(n + 1);
        for (int i = 0; i < n; i++) {
            pre[i + 1] = pre[i] + max(0, a[i]);
        }

        vector<LL> suf(n + 1);
        for (int i = n - 1; i >= 0; i--) {
            suf[i] = suf[i + 1] + min(0, a[i]);
        }

        LL res = 0;
        for (int i = 0; i <= n; i++) {
            res = max(res, pre[i] - suf[i]);
        }
        cout << res << endl;
    }
    
    return 0;
}
```
  

## [2064D - Eating](https://codeforces.com/contest/2064/problem/D)

（个人感觉比 E 难。。赛后一分钟做出来的）

（UPD：这题有点做复杂了）

**Hint1** 题目要二进制比大小，自然从最高位开始看。

**Hint2** 向前吞噬时，什么时候最高位会变，会怎么变？

最高位一定是单调不增的，只有当遇到一个与 $x$ 最高位相同的数时，最高位才会改变，并且减小。

**Hint3** 变化次数最多 30 次，可以从这里入手。

希望每次最快找到与 $x$ 最高位相同的数的位置 $j$，并快速计算当前的 $x$ 值。

（前者是 `lst[i][bit]`，表示第 $i$ 之前第一个 bit 位是 1 的数；后者利用前缀异或和，算区间异或和）

具体来说，当前在 $i$，先跳到 $j+1$，然后比较 $x \oplus \operatorname{sum}(j+1,i) \geqslant a_{j}$，如果这成立就可以吞噬 $a_{j}$，否则终止。

还有一个小问题，如果 $a$ 中有比 $x$ 最高位还大的数，就形成了一堵墙，强制终止（代码里的 $\ell$）。

```cpp
#include <bits/stdc++.h>

#define cer(x) //cerr << #x << " == " << (x) << endl;
#define cerr(x, y) //cerr << #x << " == " << (x) << ", " << #y << " == " << (y) << endl;
#define cern //cerr << endl;

using namespace std;
using LL = long long;
using LLL = __int128;

constexpr LL D = 30;
constexpr LL mod = 998244353;
constexpr LL inf = 0x3f3f3f3f3f3f3f3f;  

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n, q;
        cin >> n >> q;

        vector<int> a(n);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }

        vector lst(n + 1, vector<int>(D, -1));
        vector<int> pre(n + 1);
        for (int i = 0; i < n; i++) {
            lst[i + 1] = lst[i];
            for (int bit = 0; bit < D; bit++) {
                if (a[i] >> bit & 1) {
                    lst[i + 1][bit] = i;
                }
            }
            pre[i + 1] = pre[i] ^ a[i];
        }

        auto get = [&](int l, int r) {
            return pre[r] ^ pre[l + 1];
        };

        while (q--) {
            int x;
            cin >> x;

            int i = n;
            int l = -1;
            for (int bit = D - 1; bit >= 0; bit--) {
                if (x >> bit & 1) {
                    if ((lst[i][bit] != -1) && ((x ^ get(lst[i][bit], i)) >= a[lst[i][bit]])) {
                        x ^= get(lst[i][bit], i);
                        x ^= a[lst[i][bit]];
                        i = lst[i][bit];
                    } else {
                        l = max(l, lst[i][bit]);
                        break;
                        break;
                    }
                }
                l = max(l, lst[i][bit]);
            }
            cout << (n - 1 - l) << " ";
        }
        cout << endl;
    }
    
    return 0;
}
```

UPD：我的 lst 数组是「上一个」，包括所有出现过的二进制位，官方题解是「最后一个」，只统计最高位。确实这样设 lst 写起来更简洁更易理解。

命名失误。上一个叫 left 更合适，lst 还是留给最后一个吧…… left-right，fst-lst。

```cpp
#include <bits/stdc++.h>

#define cer(x) cerr << #x << " == " << (x) << endl;
#define cerr(x, y) cerr << #x << " == " << (x) << ", " << #y << " == " << (y) << endl;
#define cern cerr << endl;

using namespace std;
using LL = long long;
using LLL = __int128;

constexpr LL D = 30;
constexpr LL mod = 998244353;
constexpr LL inf = 0x3f3f3f3f3f3f3f3f;  

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n, q;
        cin >> n >> q;

        vector<int> a(n);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }

        vector<array<int, 30>> left(n);
        left[0].fill(-1);
        for (int i = 0; i < n; i++) {
            if (i) left[i] = left[i - 1];
            int d = __lg(a[i]);
            for (int bit = 0; bit <= d; bit++) {
                left[i][bit] = i;
            }
        }

        auto pre = a;
        for (int i = 1; i < n; i++) {
            pre[i] ^= pre[i - 1];
        }
        
        while (q--) {
            int x;
            cin >> x;
            
            int i = n - 1;
            while (x > 0 && i >= 0) {
                int bit = __lg(x);
                x ^= pre[i] ^ pre[left[i][bit]];
                i = left[i][bit];
                if (i == -1 || x < a[i]) {
                    break;
                }
                x ^= a[i];
                i--;
            }            
            cout << (n - 1 - i) << " ";
        }
        cout << endl;
    }
    
    return 0;
}
```

## [2064E - Mycraft Sand Sort](https://codeforces.com/contest/2064/problem/E)

（没用到线段树和并查集……STL 逃课做法？

**Hint1** 观察最左侧一列。

最左侧一列没有下落，所以 **c 数组是唯一确定的**。只需算 p 的方案数。

**Hint2** 观察相邻两列的变化，什么时候会增加方案数？

掉落后颜色的相对位置不变，而且图是阶梯型，相邻两列只会减少一个数字。

如果该数字在该位置只出现了一次，那么仅有一种可能删除。比如，第一列颜色是 12345，第二列是 1234，那么 5 消失了，而且是最后一位的 5 消失了，只有这一种情况。

那如果是颜色 12344 变成 1234 呢？4 消失了，而且有两种可能。

只有连续一串相同的数字长度变小了，才会有选择删去谁的可能，此时方案数就应该乘上这个 **相同数字串的长度**。

再比如颜色 21113 -> 2113，方案数乘 3（3 个数字 1 都可以被选择删除）。给一个样例，答案是 12：

```
5
4 3 2 1 5
4 4 1 1 4
```

**Hint3** 我知道怎样求解答案了，如何快速计算？

（实现方法应该不唯一）

可以用 set 存每个连续段的 $\ell$，段的长度，以及这一段的颜色。比如 2 2 1 2 2，记录的是 {1, 2, 2} {3, 1, 1} {4, 2, 2}。

二分找到消失数的下标对应的 set 元素，给答案乘上这一段的长度，然后把段长减一，表示删去一个元素。

如果段长是 0，直接删去这个元素。须注意，如果删去后左右两个元素的颜色相同，需要把它们合并（像祖玛），比如 2 2 1 2 2，删去第三个位置 1 后变成 {1, 4, 2}。


```cpp
#include <bits/stdc++.h>

#define cer(x) cerr << #x << " == " << (x) << endl;
#define cerr(x, y) cerr << #x << " == " << (x) << ", " << #y << " == " << (y) << endl;
#define cern cerr << endl;

using namespace std;
using LL = long long;
using LLL = __int128;

constexpr LL N = 5e6 + 8;
constexpr LL mod = 998244353;
constexpr LL inf = 0x3f3f3f3f3f3f3f3f;  

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        vector<int> id(n);
        for (int i = 0; i < n; i++) {
            int x;
            cin >> x;
            x--;
            id[x] = i;
        }

        vector<int> c(n);
        for (int i = 0; i < n; i++) {
            cin >> c[i];
            c[i]--;
        }

        set<array<int, 3>> s;
        s.insert({ -1, -1, -1 });
        s.insert({ n, n, -2 });
        int l = 0, len = 0;
        for (int i = 0; i < n; i++) {
            if (i && c[i] != c[i - 1]) {
                s.insert({ l, len, c[i - 1] });
                len = 0;
                l = i;
            }
            len++;
        }
        s.insert({ l, len, c[n - 1] });

        LL res = 1;
        for (int i = 0; i < n; i++) {
            int x = id[i];

            auto it = s.upper_bound({ x, n, n });
            it--;

            auto [l, len, c] = *it;
            res *= len;
            res %= mod;

            if (len == 1) {
                auto [l1, len1, c1] = *prev(it);
                auto [l2, len2, c2] = *next(it);
                if (c1 == c2) {
                    s.erase({ l1, len1, c1 });
                    s.erase({ l2, len2, c2 });
                    s.insert({ l1, len1 + len2, c1 });
                }
            } else {
                s.insert({ l, len - 1, c });
            }
            s.erase({ l, len, c });
        }
        cout << res << endl;        
    }

    return 0;
}
```