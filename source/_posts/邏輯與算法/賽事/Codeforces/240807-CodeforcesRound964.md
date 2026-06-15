---
title: Codeforces Round 964 (Div. 4)
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
abbrlink: f0969b96
date: 2024-08-07 01:02:16
updated: 2024-08-07 01:02:16
---

[Codeforces Round 964 (Div. 4)](https://codeforces.com/contest/1999)

## A. A+B Again? (2)

```cpp
#include <cstdio>
using ll = long long;
inline ll read() {
    ll S = 0, C = 0; char Y = getchar();
    while (Y > 57 || Y < 48) C |= Y == 45, Y = getchar();
    while (Y <= 57 && Y >= 48) S = (S << 3) + (S << 1) + Y - 48, Y = getchar();
    return C ? -S : S;
}

void eachT() {
    int n = read();
    printf("%d\n", n % 10 + n / 10);
}

int main() {
    for (int T = read(); T--; eachT());
    return 0;
}
```

## B. Card Game (50+20)

仔细枚举所有可能情形，注意一轮赢一轮平局也算赢。

```cpp
#include <cstdio>
using ll = long long;
inline ll read() {
    ll S = 0, C = 0; char Y = getchar();
    while (Y > 57 || Y < 48) C |= Y == 45, Y = getchar();
    while (Y <= 57 && Y >= 48) S = (S << 3) + (S << 1) + Y - 48, Y = getchar();
    return C ? -S : S;
}

void eachT() {
    int a1 = read(), a2 = read(), b1 = read(), b2 = read();
    
    int res = 0;
    res += a1 > b1 and a2 > b2;
    res += a1 > b2 and a2 > b1;

    res += a1 > b1 and a2 == b2;
    res += a2 > b1 and a1 == b2;
    res += a1 > b2 and a2 == b1;
    res += a2 > b2 and a1 == b1;

    printf("%d\n", res * 2);
}

int main() {
    for (int T = read(); T--; eachT());
    return 0;
}
```

## C. Showering (21)

```cpp
#include <cstdio>
#include <vector>
using ll = long long;
using pii = std::pair<int, int>;
inline ll read() {
    ll S = 0, C = 0; char Y = getchar();
    while (Y > 57 || Y < 48) C |= Y == 45, Y = getchar();
    while (Y <= 57 && Y >= 48) S = (S << 3) + (S << 1) + Y - 48, Y = getchar();
    return C ? -S : S;
}

void eachT() {
    int n = read(), s = read(), m = read();

    std::vector<pii> a(n + 1);
    for (int i = 1; i <= n; ++i) {
        a[i - 1].second = read();
        a[i].first = read();
    }
    a[n].second = m;

    for (int i = 0; i <= n; ++i) {
        if (a[i].second - a[i].first >= s) {
            printf("YES\n");
            return;
        }
    }
    printf("NO\n");
    return;
}

int main() {
    for (int T = read(); T--; eachT());
    return 0;
}
```

## D. Slavic's Exam (30)

比较板的匹配练习，这种写法在离线询问中也很常见。

```cpp
#include <iostream>
using ll = long long;

void eachT() {
    std::string s, t;
    std::cin >> s >> t;

    int j = 0;
    for (int i = 0; i < s.size(); ++i) {
        if (s[i] == t[j]) {
            ++j;
        }
        else if (s[i] == '?') {
            s[i] = j < t.size() ? t[j] : 'a';
            ++j;
        }
    }

    if (j < t.size()) {
        std::cout << "NO\n";
    }
    else {
        std::cout << "YES\n" << s << '\n';
    }
}

int main() {
    int T;
    std::cin >> T;
    while (T--) eachT();

    return 0;
}
```


## E. Triple Operations (29)

首先把 $l$ 当作 $y$，任意其它数当作 $x$，使 $l$ 变为 $0$，然后把这个 $0$ 当作 $x$，逐步将其它所有数变为 $0$。

设 $3^{i} \leqslant a<3^{i+1}$，将 $a$ 变为 $0$ 需要 $i+1$ 步。因此有 $\min\lbrace  3^{i+1}-1,r\rbrace-\max\lbrace 3^{i},l \rbrace$ 个数的步数为 $i+1$，枚举 $i$。

时间复杂度 $\Theta(\log r)$。

```cpp
#include <cstdio>
#include <algorithm>
#include <vector>
using ll = long long;
using pii = std::pair<int, int>;
inline ll read() {
    ll S = 0, C = 0; char Y = getchar();
    while (Y > 57 || Y < 48) C |= Y == 45, Y = getchar();
    while (Y <= 57 && Y >= 48) S = (S << 3) + (S << 1) + Y - 48, Y = getchar();
    return C ? -S : S;
}

void eachT() {
    int l = read(), r = read();

    ll res = 0;
    for (int i = 0, pow = 1; pow <= r; ++i) {
        if (pow <= l and l < 3 * pow) {
            res += i + 1;
        }

        int L = std::max(l, pow);
        int R = std::min(r, pow * 3 - 1);
        if (L <= R) res += (R - L + 1) * (i + 1);

        pow *= 3;
    }

    printf("%lld\n", res);
}

int main() {
    for (int T = read(); T--; eachT());
    return 0;
}
```

## F. Expected Median (65+10)

至少有 $\dfrac{k+1}{2}$ 个 $1$。枚举有 $i$ 个 $1$，这时的答案为 $\operatorname{C}_{\operatorname{cnt_{1}}}^{i}\cdot \operatorname{C}_{\operatorname{cnt_{0}}}^{k-i}$，对 $i$ 求和。

每个 test case 时间复杂度 $\Theta(k)$，预处理复杂度 $\Theta(n)$。

```cpp
#include <iostream>
#include <algorithm>
#include <vector>
using Z = ModInt<1000000007>; // 省略了取模类 
const int N = 2e5 + 8;
Z fac[N], ifac[N];

Z C(int n, int m) {
    return fac[n] * ifac[m] * ifac[n - m];
}

Z A(int n, int m) {
    return fac[n] * ifac[n - m];
}

void beforeT() {
    int n = 2e5;
    fac[0] = 1;
    for (int i = 1; i <= n; i++) fac[i] = fac[i - 1] * i;
    ifac[n] = fac[n].inv();
    for (int i = n; i >= 1; i--) ifac[i - 1] = ifac[i] * i;
}

void eachT() {
    int n, k;
    std::cin >> n >> k;

    int cnt[2] = { 0 };
    for (int i = 0; i < n; ++i) {
        int x;
        std::cin >> x;
        ++cnt[x];
    }

    Z res = 0;

    int L = std::max(k + 1 >> 1, k - cnt[0]);
    int R = std::min(k, cnt[1]);
    for (int i = L; i <= R; ++i) {
        res += C(cnt[1], i) * C(cnt[0], k - i);
    }

    std::cout << res << '\n';
}

int main() {
    int T;
    std::cin >> T;

    beforeT();
    while (T--) eachT();

    return 0;
}
```

## G2. Ruler (hard version) (62)

不妨 $a<b$，那么返回的结果只有三种可能：$(a+1)(b+1),\ (a+1)b,\ ab$，分别表示答案在 $[2,a],\ (a,b],\ (b,999]$。将可能的区间平均分成三份，询问上下三等分点 $a,b$（类似三分法）。

询问次数不会超过 $\lceil \log_{3}{999} \rceil=7$ 次。（如果采用二分的策略，需要 $\lceil \log_{2}{999} \rceil=10$ 次，对应于 easy version）

```cpp
#include <iostream>

int query(int a, int b) {
    std::cout << "? " << a << ' ' << b << '\n';
    std::cout.flush();

    int x;
    std::cin >> x;
    return x;
}

void answer(int a) {
    std::cout << "! " << a << '\n';
    std::cout.flush();
}

void eachT() {
    int l = 2, r = 999;
    while (l <= r) {
        int lt = l + (r - l) / 3, rt = r - (r - l) / 3;
        int a = lt, b = rt;

        int x = query(a, b);
        if (x == a * b) {
            l = rt + 1;
        }
        else if (x == (a + 1) * (b + 1)) {
            r = lt - 1;
        }
        else {
            l = lt + 1;
            r = rt - 1;
        }
    }
    answer(l);
}

int main() {
    std::ios::sync_with_stdio(0);
    std::cin.tie(0);
    std::cout.tie(0);

    int T;
    std::cin >> T;

    while (T--) {
        eachT();
    }

    return 0;
}
```