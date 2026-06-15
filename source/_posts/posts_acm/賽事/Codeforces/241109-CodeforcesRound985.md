---
title: 'Refact.ai Match 1 (Codeforces Round 985, Div 1+2) A-F'
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
abbrlink: f4714df8
date: 2024-11-10 01:22:51
updated: 2024-11-10 20:35:45
---

## [A. Set](https://codeforces.com/contest/2029/problem/A)

**题意** 给一个包含区间 $[l, \ r]$ 中所有整数组成一个集合 $S$ 和一个整数 $k$。一次操作是在集合 $S$ 中选择一个数字 $x$，满足 $S$ 中至少有 $k$ 个 $x$ 的倍数，从 $S$ 中删除 $x$。求最大操作次数。

**思路** 一个数 $x$ 的最小的 $k$ 个倍数分别是 $x,2x,..,kx$，如果这些数都存在于集合中，也就是说 $kx \leqslant r$，就可以删去 $x$。基于贪心，从小到大依次删去 $x$。

最终能删去的 $x$ 满足 $l \leqslant x \leqslant \lfloor \dfrac{r}{k} \rfloor$。

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int l, r, k;
        cin >> l >> r >> k;

        cout << max(0, r / k - l + 1) << endl;
    }

    return 0;
}
```

## [B. Replacement](https://codeforces.com/contest/2029/problem/B)

**题意** 给一个长度为 $n$ 的 $01$ 字符串 $s$  和一个长度为 $n - 1$ 的 $01$ 字符串 $r$。可以对 $s$ 执行 $n-1$ 次操作， 在第 $i$ 次操作中， 选择一个 $k$ ，满足 $s_{k} \neq s_{k + 1}$，并将 $s_{k}s_{k + 1}$ 替换为 $r_{i}$。问能否执行完 $n-1$ 次操作。

**思路** 对于每次操作，首先 $s$ 必须包含相邻的 $01$ 或 $10$（若不然，$s$ 为全 $0$ 串或全 $1$ 串），如果 $r_{i}=0$，相当于从 $s$ 中删去一个 $1$，如果 $r_{i}=1$，相当于从 $s$ 中删去一个 $0$。每次看能否操作即可。

时间复杂度 $\Theta(n)$。

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

        string s;
        cin >> s;

        int cnt[2]{};
        for (int i = 0; i < n; i++) {
            cnt[s[i] - '0']++;
        }

        cin >> s;

        bool ok = 1;
        for (int i = 0; i < n - 1; i++) {
            if (cnt[s[i] - '0'] > 0 && cnt['1' - s[i]] > 0) {
                cnt['1' - s[i]]--;
            } else {
                ok = 0;
            }
        }        

        if (ok) {
            cout << "YES\n";
        } else {
            cout << "NO\n";
        }
    }

    return 0;
}
```

## [C. New Rating](https://codeforces.com/contest/2029/problem/C)

**题意** 你的 rating 是 $x$，初始为 $0$ ，给定一个数组 $a$，遍历数组 $a$，
1. 若 $a_{i} > x$ , $x= x+1$
2. 若 $a_{i}=x$ , $x$ 不变
3. 若 $a_{i} < x$ , $x = x-1$ 

可以选择跳过 $a$ 中的一个 Hack 区间（至少跳过一个数），最大化最终的 rating。

**思路一** 问题转化为是否存在某个前缀和某个后缀满足题意。

记录前缀 rating 的最大值 $u$ 和后缀 rating 的最小值 $v$，如果 $u \geqslant v$，就可以选择某个 $x\in[v,u]$，当前缀 rating 为 $x$ 后进入 Hack 区间，在后缀 rating 为 $x$ 后退出 Hack 区间。

由于初始 rating 为 0，前缀 rating 可以直接求得。后缀不好求，但发现后缀最小值关于最终 rating 具有单调性，因此可以二分最终 rating，再直接求得后缀最小值。

时间复杂度 $\Theta(n\log n)$。

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
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }

        auto check = [&](int x) {
            vector<int> pre(n), suf(n, x);
            int now = 0;
            for (int i = 0; i < n - 1; i++) {
                if (now > a[i]) now--;
                else if (now < a[i]) now++;
                pre[i + 1] = max(pre[i], now);
            }
            now = x;
            for (int i = n - 1; i; i--) {
                if (now > a[i]) now++;
                else if (now <= a[i]) now--;
                suf[i - 1] = min(suf[i], now);
            }

            for (int i = 0; i < n; i++) {
                if (pre[i] >= suf[i]) return true;
            }
            return false;
        };

        int l = 0, r = n;
        while (l <= r) {
            int mid = l + r >> 1;
            if (!check(mid)) r = mid - 1;
            else l = mid + 1;
        }
        cout << r << endl;
    }

    return 0;
}
```

**思路二** 设 $dp_{i,j}$ 表示选完前 $i$ 个成绩，状态为 $j$，其中

- $j=0$，还未进入 Hack 区间

- $j = 1$，正在 Hack 区间

- $j=2$，已经退出 Hack 区间

存的值为最大 rating。第一维可省略。

时间复杂度 $\Theta(n)$。

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
        
        int dp0 = 0, dp1 = -n, dp2 = -n;
        for (int i = 0; i < n; i++) {
            int a;
            cin >> a;

            dp2 = max(dp2, dp1);
            dp1 = max(dp1, dp0);

            if (dp0 > a) dp0--;
            else if (dp0 < a) dp0++;

            if (dp2 > a) dp2--;
            else if (dp2 < a) dp2++;
        }
        
        cout << max(dp1, dp2) << endl;
    }
    
    return 0;
}
```

## [D. Cool Graph](https://codeforces.com/contest/2029/problem/D)

考虑边多了（也就是有环）怎么办，边少了（有边但不联通）怎么办。

如果某个点 $x$ 的度超过了 $2$，就删去其中两条边 $x-y,\ x-z$，即操作 $(x,y,z)$，直到度小于 $2$。这样每次操作至少会减少一条边，操作次数不会超过 $m$。

如果没有边，已经满足题意。

现在这张图是一些孤立的边。对于某两个连通块，设其中一个连通块有边 $x-y$，选择另一个连通块中任意一个点 $z$，操作 $(x,y,z)$，就可以把这两个联通块连通，而且连通后仍然是一棵树。初始至多 $n$ 个连通块，每次操作至少会减少一个连通块，操作次数不会超过 $n$。

总的操作次数不会超过 $m+n$。

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n, m;
        cin >> n >> m;

        vector<map<int, bool>> E(n);
        auto add = [&](int u, int v) {
            if (E[u].count(v)) E[u].erase(v), E[v].erase(u);
            else E[u][v] = E[v][u] = 1;
        };
        auto get = [&](int u) {
            return (*E[u].begin()).first;
        };

        while (m--) {
            int u, v;
            cin >> u >> v;
            u--, v--;
            add(u, v);
        }

        vector<array<int, 3>> res;
        for (int i = 0; i < n; i++) {
            while (E[i].size() > 1) {
                int u = get(i); add(u, i);
                int v = get(i); add(v, i);
                add(u, v);
                res.push_back({ i, u, v });
            }
        }

        vector<int> vis(n);
        int u = -1, v = -1;
        for (int i = 0; i < n; i++) {
            if (E[i].size() == 1) {
                u = i, v = get(i);
                vis[u] = 1;
                vis[v] = 1;
                break;
            }
        }

        if (u != -1) {
            for (int i = 0; i < n; i++) {
                if (vis[i]) continue;
                vis[i] = 1;
                if (!E[i].empty()) vis[get(i)] = 1;
                res.push_back({ i, u, v });
                u = i;
            }
        }

        cout << res.size() << endl;
        for (auto [x, y, z] : res) {
            cout << ++x << " " << ++y << " " << ++z << endl;
        }
    }

    return 0;
}
```

UPD：可以直接枚举给的每一条边，只要 $u, v$ 都不是 1，就用 1 把 $u, v$ 消掉，最后只剩下若干个孤立点和一个星状图，把孤立点再逐个连接到 1 上。操作次数也是不超过 $m+n$。

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n, m;
        cin >> n >> m;

        map<int, int> E;
        auto add = [&](int u) {
            if (E.count(u)) E.erase(u);
            else E[u] = 1;            
        };

        vector<array<int, 3>> res;
        while (m--) {
            int u, v;
            cin >> u >> v;
            u--, v--;
            if (u == 0) {
                add(v);
            } else if (v == 0) {
                add(u);
            } else {
                res.push_back({ 0, u, v });   
                add(u), add(v);
            }         
        }

        if (!E.empty()) {
            int u = (*E.begin()).first;
            for (int v = 1; v < n; v++) {
                if (E.count(v)) continue;
                res.push_back({ 0, v, u });
                u = v;
            }
        }

        cout << res.size() << endl;
        for (auto [x, y, z] : res) {
            cout << ++x << " " << ++y << " " << ++z << endl;
        }
    }

    return 0;
}
```

## [E. Common Generator](https://codeforces.com/contest/2029/problem/E)

**题意** 对于 $x$，定义一次操作为选择 $x$ 的一个非 $1$ 因子 $d$，置 $x\leftarrow x+d$，如果若干次操作后 $x=y$，就称初始 $x$ 能变成 $y$。现在给定一个集合 $a\ (a_{i}  \geqslant  2)$，问是否存在一个数 $x\ (x\geqslant2)$ 使得 $x$ 能变成所有 $a_{i}$。

**思路** 没有任何数可以变成素数，因此集合中只能出现一个素数，且这个素数就是答案。$2$ 可以变成任何合数（$1\times 2\to s_{0}\times 2\to s_{0}\times s_{1}$），因此如果集合中没有素数，就让答案为 $2$。

现在检验所选素数 $p$ 能否变成所有 $a_{i}$。

如果 $a_{i}$ 是 $p$ 的倍数，是可行的。否则，设 $a_{i}=s_{0}\cdot s_{1}$。希望 $1\times p\to 2\times p\to\dots\to s_{0}\times s_{1}$，发现如果 $s_{0} \geqslant 2,s_{1} \geqslant p$ 就可行，因此基于贪心，$s_{0}$ 应当取最小素因子。这并不是全部可行情形，可以先 $2\times p\to 2\times s_{0}d$，再 $s_{0}\times 2d\to s_{0}\times s_{1}$，所以说，如果存在某个 $d$ 满足 $p \leqslant s_{0}d \land 2d \leqslant s_{1}$ 就可行。这个 $d$ 可以在 $\Theta(1)$ 时间内找出并判断。

时间复杂度 $\Theta(n)$。

```cpp
#include <bits/stdc++.h>
using namespace std;

constexpr int N = 4e5 + 8;
vector<int> prime;
int mint[N];

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

    for (int i = 2; i < N; ++i) {
        if (!mint[i]) mint[i] = i, prime.push_back(i);
        for (auto& p : prime) {
            if (1ll * i * p >= N) break;
            mint[i * p] = p;
            if (p == mint[i]) break;
        }
    }
    mint[1] = 1;

    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        vector<int> a(n);
        int p = -1, ok = true;
        for (int i = 0; i < n; i++) {
            cin >> a[i];
            if (mint[a[i]] == a[i]) {
                if (p == -1) p = a[i];
                else ok = false;
            }
        }
        if (p == -1) p = 2;

        for (int i = 0; i < n; i++) {
            if (a[i] == p) continue;
            int d;
            if (a[i] & 1) {
                d = 2 * (p + mint[a[i]] - 1) / mint[a[i]];
            } else {
                d = p;
            }
            if (d > a[i] / mint[a[i]]) {
                ok = false;
            }
        }

        if (!ok) {
            cout << -1 << endl;
        } else {
            cout << p << endl;
        }
    }

    return 0;
}
```

## [F. Palindrome Everywhere](https://codeforces.com/contest/2029/problem/F)

又是 01 串，又是奇偶。。

如果同时出现 RR 和 BB 就无解。

否则，如果有 RR，就把 R 变成 1，B 变成 0，如果有 BB，就把 B 变成 1，R 变成 0。

这个 01 串总是一个 1 串接上一个 0，再一个 1 串接上一个 0 这样循环的，统计每个 1 串的长度。而且不关心具体长度，只关心奇偶性（因为可以在某个 1 上面绕圈，而绕圈不改变奇偶）。

结论是：

- 长度为偶数的 1 串超过一个，无解（以其中一个偶串的端点为起点，以另一个偶串的第一个位置为终点，这样，出发时必然经过一个偶串，到达时必然经过一个奇串，不合法）

- 长度为偶数的 1 串恰好一个，有解（具体构造方法可参考样例三的解释，构造出的回文串仅包含两个长度为偶数的 1 串，其中一个是原串里的，另一个是在长度为奇数的 1 串上「掉头」产生的）

- 长度为偶数的 1 串不存在，这时当且仅当长度为奇数的 1 串恰好有一个时有解（有解是显然的；如果有两个长度为奇数的 1 串，分别以这两个串的左端点为起点和终点就无解）


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
        string s;
        cin >> n >> s;

        int p = -1;
        for (int i = 0; i < n; i++) {
            if (s[i] != s[(i + 1) % n]) {
                p = (i + 1) % n;
                break;
            }
        }

        if (p == -1) {
            cout << "YES\n";
            continue;
        }

        s = s.substr(p) + s.substr(0, p);

        int R = s.find("RR");
        int B = s.find("BB");

        if (R != -1 && B != -1 || R == -1 && B == -1) {
            cout << "NO\n";
            continue;
        }

        char base = (R != -1) ? 'R' : 'B';

        int cnt[2]{};
        int k = 0;
        for (auto& c : s) {
            if (c == base) {
                k++;
            } else {
                if (k) cnt[k & 1]++;
                k = 0;
            }
        }
        if (k) cnt[k & 1]++;

        if (cnt[0] == 1 || cnt[1] <= 1 && cnt[0] == 0) {
            cout << "YES\n";
        } else {
            cout << "NO\n";
        }        
    }

    return 0;
}
```