---
title: Educational Codeforces Round 168 (Rated for Div. 2) A - E
tags:
  - 題解
  - 筆記
  - ACM
  - 算法
  - 練習賽
categories:
  - 邏輯與算法
  - 賽事
  - EducationalCodeforces
cover: /img/posts/acm/codeforces-cover.webp
top_img: /img/posts/acm/codeforces.webp
highlight_shrink: true
abbrlink: 84f4f18a
date: 2024-07-31 02:23:56
updated: 2024-08-02 11:53:37
---

[Educational Codeforces Round 168 (Rated for Div. 2)](https://codeforces.com/contest/1997)

## CF1997A. Strong Password (3)

```cpp
#include <iostream>
using ll = long long;

void eachT() {
    std::string s;
    std::cin >> s;

    for (int i = 1; i < s.length(); ++i) {
        if (s[i] == s[i - 1]) {
            std::cout << s.substr(0, i) << (s[i] == 'a' ? 'b' : 'a') << s.substr(i) << '\n';
            return;
        }
    }
    std::cout << (s[0] == 'a' ? 'b' : 'a') << s << '\n';
}

int main() {
    int T;
    std::cin >> T;

    while (T--) {
        eachT();
    }

    return 0;
}
```


## CF1997B. Make Three Regions (8)

找一个串为 `x.x`，另一个串为 `...` 的位置。

时间复杂度 $\Theta(n)$。

```cpp
#include <iostream>
using ll = long long;

void eachT() {
    int n;
    std::string s[2];
    std::cin >> n >> s[0] >> s[1];

    int res = 0;
    for (int t = 0; t <= 1; ++t) {
        for (int i = 0; i < n - 2; ++i) {
            res += s[t].substr(i, 3) == "x.x" and s[t ^ 1].substr(i, 3) == "...";
        }
    }

    std::cout << res << '\n';
}

int main() {
    int T;
    std::cin >> T;

    while (T--) {
        eachT();
    }

    return 0;
}
```

## CF1997C. Even Positions (14)

**方法一** 看到括号立刻想到用栈维护。如果这一位是 `_`，优先取 `)` 与前面的匹配。

时间复杂度 $\Theta(n)$。

```cpp
#include <iostream>
#include <vector>
using ll = long long;

void eachT() {
    int n;
    std::string s;
    std::cin >> n >> s;

    ll res = 0;
    std::vector<int> pos;
    for (int i = 0; i < n; ++i) {
        if (s[i] == '_') {
            if (pos.empty()) s[i] = '(';
            else s[i] = ')';
        }

        if (s[i] == '(') pos.push_back(i);
        else res += i - pos.back(), pos.pop_back();
    }

    std::cout << res << '\n';
}

int main() {
    int T;
    std::cin >> T;

    while (T--) {
        eachT();
    }

    return 0;
}
```

**方法二** 答案即是将 `(` 转化为 1，`)` 转化为 -1 的前缀和的和。

```cpp
void eachT() {
    int n;
    std::string s;
    std::cin >> n >> s;

    ll res = 0, pre = 0;
    for (int i = 0; i < n; ++i) {
        if (s[i] == '_') {
            if (!pre) s[i] = '(';
            else s[i] = ')';
        }

        pre += s[i] == '(' ? 1 : -1;
        res += pre;
    }

    std::cout << res << '\n';
}
```

## CF1997D. Maximize the Root (27+10)

贪心，从叶到根，每个点的权值尽可能平均。树形 DP，转移方程：
$$
f_{u}=\begin{cases}
\min\lbrace f_{v} \rbrace, & \min\lbrace f_{v} \rbrace<w_{u} \\
\dfrac{1}{2}\left(w_{u}+\min\lbrace f_{v} \rbrace\right), & \min\lbrace f_{v} \rbrace \geqslant  w_{u}
\end{cases}
$$
其中叶子节点的 $f_{u}=w_{u}$。答案即是 $w_{1}+\min\lbrace f_{v} \rbrace$。（以上 $v$ 都表示 $u$ 的儿子）

时间复杂度 $\Theta(n)$。

```cpp
#include <iostream>
#include <vector>
using ll = long long;
const int N = 2e5 + 8;
inline ll read() {
    ll S = 0, C = 0; char Y = getchar();
    while (Y > 57 || Y < 48) C |= Y == 45, Y = getchar();
    while (Y <= 57 and Y >= 48) S = (S << 3) + (S << 1) + Y - 48, Y = getchar();
    return C ? -S : S;
}

std::vector<int> E[N];
int w[N];

void dfs(int u) {
    int mn = 0x3f3f3f3f;

    if (E[u].empty()) mn = w[u];
    else for (auto& v : E[u]) {
        dfs(v);

        mn = std::min(mn, w[v]);
    }

    if (u == 1) w[u] = w[u] + mn;
    else if (w[u] > mn) w[u] = mn;
    else w[u] = w[u] + mn >> 1;
}

void eachT() {
    int n = read();
    for (int u = 1; u <= n; ++u) {
        E[u].clear();
        w[u] = read();
    }
    for (int u = 2; u <= n; ++u) {
        E[read()].push_back(u);
    }

    dfs(1);

    printf("%lld\n", w[1]);
}

int main() {
    for (int T = read(); T--; eachT());
    return 0;
}
```

## CF1997E. Level Up

**方法一** 首先离线询问。

无论用什么方法，$k=1$ 时总是退化为暴力，因此考虑根号分治，当 $k<\sqrt{ n }$ 时暴力。这部分的复杂度 $\Theta(n\sqrt{ n })$。

当 $k>\sqrt{ n }$ 时，level 的变化不会太大，在 $\dfrac{n}{k}=\sqrt{ n }$ 级别。所需从某个 level 快速跳到下一个 level 的位置，也就使得区间内 > level 的数的个数刚好为 $k$，预处理前缀和，在前缀和数组上二分实现。这部分的复杂度是个调和级数，约为 $\Theta(\sqrt{ n }\log^{2} n)$。

总的时间复杂度不会超过 $\Theta(n\sqrt{ n })$。

由于空间有限，预处理前缀和不能处理太多，我们取 $M=300$，这样可以取分治的分界线为 $\max\left\lbrace \dfrac{n}{300},\sqrt{ n } \right\rbrace$，最终取定 $B=1000$。

空间复杂度 $\Theta(300n)$。

```cpp
#include <cstdio>
#include <cmath>
#include <algorithm>
#include <vector>
using ll = long long;
inline ll read() {
    ll S = 0, C = 0; char Y = getchar();
    while (Y > 57 || Y < 48) C |= Y == 45, Y = getchar();
    while (Y <= 57 and Y >= 48) S = (S << 3) + (S << 1) + Y - 48, Y = getchar();
    return C ? -S : S;
}

constexpr int M = 300, B = 1000;

void eachT() {
    int n = read(), q = read();

    std::vector<int> a(n + 1);
    for (int i = 1; i <= n; ++i) {
        a[i] = read();
    }

    std::vector<std::vector<int> > pre(M, std::vector<int>(n + 1, 0));
    for (int j = 0; j < M; ++j) {
        for (int i = 1; i <= n; ++i) {
            pre[j][i] = pre[j][i - 1] + (a[i] > j);
        }
    }

    std::vector<std::vector<std::pair<int, int> > > ask(n + 1);
    std::vector<int> ans(q + 1);
    for (int i = 1; i <= q; ++i) {
        int id = read(), k = read();
        if (k > n / 2) {
            ans[i] = id <= k or a[id] > 1;
        }  // 小小优化 k>n/2 直接出答案
        else {
            ask[k].emplace_back(id, i);
        }
    }

    for (int k = 1; k <= n / 2; ++k) {
        if (ask[k].empty()) continue;
        std::sort(ask[k].begin(), ask[k].end());  // 注意要排序

        // 小范围直接暴力
        if (k <= B) {
            int now = 1, cnt = 0, it = 0;
            for (int i = 1; i <= n; ++i) {
                while (it < ask[k].size() and ask[k][it].first == i) {  // 注意询问有相同 因此是while
                    ans[ask[k][it].second] = a[i] >= now;
                    ++it;
                }
                if (a[i] >= now and ++cnt == k) ++now, cnt = 0;
            }
        }

        // 大范围二分跳
        else {
            int pos = 0, now = 0, it = 0;
            while (pos <= n) {
                pos = std::lower_bound(pre[now].begin() + pos, pre[now].end(), pre[now][pos] + k) - pre[now].begin();  // 跳到第一个>now有k个的位置
                now += 1;
                while (it < ask[k].size() and ask[k][it].first <= pos) {  // 和上面一样的
                    ans[ask[k][it].second] = a[ask[k][it].first] >= now;
                    ++it;
                }
            }
        }
    }

    for (int i = 1; i <= q; ++i) {
        printf("%s\n", ans[i] ? "YES" : "NO");
    }
}

int main() {
    eachT();
    return 0;
}
```

**方法二** 预处理答案，在线询问输出也是可以做的。

```cpp
#include <cstdio>
#include <cmath>
#include <algorithm>
#include <vector>
using ll = long long;
inline ll read() {
    ll S = 0, C = 0; char Y = getchar();
    while (Y > 57 || Y < 48) C |= Y == 45, Y = getchar();
    while (Y <= 57 and Y >= 48) S = (S << 3) + (S << 1) + Y - 48, Y = getchar();
    return C ? -S : S;
}

constexpr int M = 300, B = 3000;

void eachT() {
    int n = read(), q = read();

    std::vector<int> a(n + 1);
    for (int i = 1; i <= n; ++i) {
        a[i] = read();
    }

    std::vector<std::vector<int> > pre(M, std::vector<int>(n + 1, 0));
    for (int i = 1; i <= n; ++i) {
        for (int j = 0; j < M; ++j) {
            pre[j][i] = pre[j][i - 1] + (a[i] > j);
        }
    }
    
    std::vector<std::vector<int> > uplevel(n + 1);
    for (int k = 1; k <= n; ++k) {
        uplevel[k].push_back(0);
        if (k <= B) {
            int now = 0, cnt = 0;
            for (int i = 1; i <= n; ++i) {
                if (a[i] > now and ++cnt == k) {
                    uplevel[k].push_back(i);
                    now++;
                    cnt = 0;
                }
            }
        }
        else {
            int now = 0, pos = 0;
            while (pos <= n) {
                pos = std::lower_bound(pre[now].begin(), pre[now].end(), k + pre[now][pos]) - pre[now].begin();
                uplevel[k].push_back(pos);
                now++;
            }
        }
    }

    for (int i = 0; i < q; ++i) {
        int id = read(), k = read();
        auto ok = a[id] >= uplevel[k].size() or id <= uplevel[k][a[id]];
        printf("%s\n", ok ? "YES" : "NO");
    }
}

int main() {
    eachT();
    return 0;
}
```