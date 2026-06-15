---
title: 2025 CCPC Online 网络预选赛 ADEFGK
tags:
  - 題解
  - 筆記
  - ACM
  - 算法
  - 網絡賽
categories:
  - 邏輯與算法
  - 賽事
  - Contest
description: 第十一届中国大学生程序设计竞赛网络预选赛（CCPC Online 2025）
highlight_shrink: true
abbrlink: 437ae90e
date: 2025-09-21 19:30:00
updated: 2025-09-21 19:30:00
---

https://pintia.cn/rankings/1967841176776331264

## [A. 整点正方形计数2](https://qoj.ac/contest/2534/problem/14547)（枚举，差分）

枚举正方形的形态，即枚举边长向量为 $(a,b)$，计算这个正方形对每个点的贡献。每个相同形态的正方形对相同位置的点的贡献是一个矩形，用二维差分做矩形加。

考虑到 $a + b  \leqslant \min\lbrace n, m \rbrace$，枚举次数是 $\mathcal{O}(\min\lbrace n, m \rbrace^{2}) = \mathcal{O}(m n)$。总复杂度 $\mathcal{O}(m n)$。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
#define endl '\n'

int main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    int n, m;
    cin >> n >> m;
    n++, m++;

    vector g(n + 1, vector<ll>(m + 1));
    for (int a = 0; a < min(n, m); a++) {
        for (int b = 1; b + a < min(n, m); b++) {
            auto work = [&](int l, int u) {
                int r = m - a - b + l, d = n - b - a + u;
                g[u][l]++;
                g[u][r]--;
                g[d][l]--;
                g[d][r]++;
            };
            work(0, a);
            work(b, 0);
            work(a, a + b);
            work(a + b, b);
        }
    }
    
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (i) g[i][j] += g[i - 1][j];
            if (j) g[i][j] += g[i][j - 1];
            if (i && j) g[i][j] -= g[i - 1][j - 1];
            cout << g[i][j] << " ";
        }
        cout << endl;
    }
        
    return 0;
}
```

## [C. 造桥与砍树](https://qoj.ac/contest/2534/problem/14549)（最小生成树）

*赛后补的，感谢评论区大佬点拨*

*这个题方法真是多样，听说有用各种高级数据结构或者乱搞过的*

要求稠密图的最小生成树，但是 $n=10^{5}$。

*首先要指明，如果按某种策略贪心地从这 $n^{2}$ 条边中选取 $\mathcal{O}(n)$ 条（甚至 $\mathcal{O}(n\sqrt{ n })$ 条边），跑稀疏图最小生成树，是不可取的。反例很容易找。*

最常见的最小生成树算法有两种，Kruskal 和 Prim。

如果是 Kruskal，我们能很容易地知道边权为 $w$ 的边有哪些，第一步可以把 $1\sim k-1,2 \sim k - 2,\dots$ 合并，然后就不知道哪些已经在同一连通块了，除了暴力没什么招儿。

如果是 Prim，回忆 Prim 原理：时刻监控哪个点可以生长出一条边，并选取最小者。模板中用 pq 维护所有潜在的边，但现在我们知道所有边的权值，就不要都塞 pq 里，只塞一个。具体来说是，对于每个点，二分找到哪个边权最小，把这个最小的塞 pq 里。如果之后取出来了，就再二分塞一个，这样保证每个点都恰好有一条出边在 pq 里，时刻保持一个「能生长的」状态。

复杂度 $\mathcal{O}(n\log k)$，代码也是很好写的：

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
#define endl '\n'

int main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    int t;
    cin >> t;

    while (t--) {
        int n, k;
        cin >> n >> k;

        multiset<int> s;
        while (n--) {
            int x;
            cin >> x;
            x %= k;
            s.insert(x);
        }

        auto get = [&](int x) {
            auto it = s.lower_bound(k - x);
            return *(it == s.end() ? s.begin() : it);
        };
        
        priority_queue<array<int, 3>> pq;

        auto x = *s.begin();  // 取一个起点
        s.erase(s.begin());

        auto y = get(x);    // 取 x 的一个出边
        pq.push({ -(x + y) % k, y, x });

        ll res = 0;
        while (!pq.empty()) {
            auto [w, x, p] = pq.top();  // 取出 x，p 是前驱
            pq.pop();

            if (!s.contains(x)) { // 相当于模板里 if (used[x])
                // 用掉了 (p, x) 再给 p 找一个出边，保证每个点都恰好有一条出边在 pq 里
                auto y = get(p);
                pq.push({ -(p + y) % k, y, p });
                
                continue;
            }
            s.extract(x);  // 相当于模板里 used[x] = true;
            
            res += -w;

            if (s.empty()) break;

            // 用掉了 (p, x) 再给 p 找一个出边，保证每个点都恰好有一条出边在 pq 里
            auto y = get(p);
            pq.push({ -(p + y) % k, y, p });

            // 给新加入 MST 的 x 找一个出边
            y = get(x);
            pq.push({ -(x + y) % k, y, x });
        }

        cout << res << endl;
    }

    return 0;
}
```


## [D. 通配符匹配](https://qoj.ac/contest/2534/problem/14550)（字符串匹配）

设 $s$ 中用 `*` 隔开的串是 $s_{0},s_{1},\dots,s_{k}$。

先考虑 $s$ 首尾没有 `*`，那就是要找对于每个 $s_{0}$ 的出现，能接多少个 $s_{k}$。基于贪心，在 $s_{0}$ 的位置后找第一个 $s_{1}$ 的出现，再找 $s_{2}$，直至 $s_{k}$，找到的这个 $s_{k}$ 后面每一个 $s_{k}$ 都可以加到答案里。

如果 $s$ 首尾有 `*`，可以在上述结果上乘一个系数，这样特判比较多（我们赛时的方法）。也可以在 $s$ 的首/尾增加一个空串，这样程序能自动处理（见如下代码）。

KMP/Hash 找所有出现，`next` 数组预处理下一个出现，复杂度 $\mathcal{O}(n k)$。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
#define endl '\n'

int main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    string s, t;
    cin >> s >> t;

    if (s == string(s.size(), '*')) {
        cout << (t.size() + 1ll) * t.size() / 2 << endl;
        return 0;
    }

    vector<string> ss;
    if (s[0] == '*') {
        ss.push_back("");
    }
    for (int l = 0, r = 0; r <= s.size(); r++) {
        if (s[r] == '*' || r == s.size()) {
            string tmp = s.substr(l, r - l);
            if (tmp != "") {
                ss.push_back(tmp);
            }
            l = r + 1;
        }
    }
    if (s.back() == '*') {
        ss.push_back("");
    }
        
    vector<vector<pair<int, int>>> pos(ss.size());
    constexpr int inf = 0x3f3f3f3f;
    vector next(ss.size(), vector<pair<int, int>>(t.size() + 1, {inf, inf}));
    for (int k = 0; k < ss.size(); k++) {
        auto& s = ss[k];
        // KMP
        vector<int> fail(s.size() + 1);
        for (int i = 1, j = 0; i < s.size(); i++) {
            while (j && s[i] != s[j]) {
                j = fail[j];
            }
            j += s[i] == s[j];
            fail[i + 1] = j;
        }
        if (s == "") {
            pos[k].push_back({ 0, 0 });
        }
        for (int i = 0, j = 0; i < t.size(); i++) {
            while (j && t[i] != s[j]) {
                j = fail[j];
            }
            j += t[i] == s[j];
            if (j == s.size()) {
                pos[k].push_back({ i - j + 1, i + 1 });
                j = fail[j];
            }
        }
        // 预处理 next 数组
        for (auto [l, r] : pos[k]) {
            next[k][l] = { l, r };
        }
        for (int i = t.size() - 1; i >= 0; i--) {
            next[k][i] = min(next[k][i], next[k][i + 1]);
        }
    }

    vector<int> cntr(t.size() + 1);
    for (auto [l, r] : pos.back()) {
        cntr[l]++;
    }
    if (ss.size() > 1) {
        for (int i = t.size() - 1; i >= 0; i--) {
            cntr[i] += cntr[i + 1];
        }
    }

    ll res = 0;
    for (auto [l, r] : pos[0]) {
        for (int k = 1; k < pos.size(); k++) {
            tie(l, r) = next[k][r];
            if (l == inf) {
                break;
            }
        }
        if (l != inf) {
            res += cntr[l];
        }
    }
    cout << res << endl;

    return 0;
}

/*
**
hello
15

c*c*p*c
cccpppccc
6

*ab*abc*xyz*
dabcdabcabcdxyzdxyzd
36

abc*abc*xyz*
abcabcabcddxyzdxyzd
12

*a*b
xyzabab
10
*/
```

## [E. 看比赛回放](https://qoj.ac/contest/2534/problem/14551)（签到）

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

void eachT() {
    ll n, m;
    cin >> n >> m;
    int x = min((n + 1) / 2, m - (n + 1) / 2);
    cout << 2 * x + 1 << endl;
}

int main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    int t;
    cin >> t;

    while (t--) {
        eachT();
    }
    
    return 0;
}
```

## [F. 连线博弈](https://qoj.ac/contest/2534/problem/14552)（SG，Hash）

博弈部分是模板题：sg 打表，同一状态下的子游戏 - 异或；同一游戏后续的子状态 - mex。

为找到初始棋盘的子游戏大小，可以用一些数据结构精确维护。此外有随机化方法 XOR-Hash：对圆环用随机数 Hash 染色，颜色（即异或值）相同的在一个子游戏中。（这个 trick 在 CF Div3 中经常出现，如 [CF1996G. Penacony](https://codeforces.com/contest/1996/problem/G)：给定 $n$ 个点、$n$ 条双向边的环。有 $m$ 对点对 $a_i,b_i$，要求删掉尽可能多的边，使得删完后，每对 $a_i,b_i$ 仍联通。求出剩余边数的最小值。）

赛时写了个离散化丑爆了，打 map 就行。复杂度 1log。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using ull = unsigned long long;
#define endl '\n'

int _sg[5000]; // nim和不为0先手必胜

ll sg(ll x) { 
    int t = (x - 100) / 34;
    t = max(t, 0);
    return _sg[x - (t * 34)];
}

mt19937_64 rnd(chrono::steady_clock::now().time_since_epoch().count());

void eachT() {   
    int n, m;
    cin >> n >> m;

    map<int, ull> diff;
    while (m--) {
        int l, r;
        cin >> l >> r;
        auto x = rnd();
        diff[l] ^= x;
        diff[r] ^= x;
    }
    map<ull, int> lens;
    int lst = -1;
    ull pre = 0;
    diff[n] = 0;
    for (auto& [x, val] : diff) {
        lens[pre] += x - lst - 1;
        pre ^= val;
        lst = x;
    }
    int ans = 0;
    for (auto& [_, x] : lens) {
        ans ^= sg(x);
    }
    if (ans) cout << "YES" << endl;
    else cout << "NO" << endl;
}

int main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    for (int i = 1; i <= 200; i++) {
        _sg[i] = -1;
    }
    _sg[0] = 0;
    _sg[1] = 0;
    _sg[2] = 1;
    _sg[3] = 1;
    for (int x = 2; x <= 200; x++) {
        set<int> st;
        for (int i = 0; i <= x - 2; i++) {
            int j = x - i - 2;
            st.insert(_sg[i] ^ _sg[j]);
        }
        int mex = 0;
        for (auto s : st) {
            if (s == mex) mex++;
            else {
                _sg[x] = mex;
                break;
            }
        }
        _sg[x] = mex;
    }

    // for (int x = 0; x <= 200; x++) {
    //     assert(_sg[x] == sg(x));
    // }

    // for (int i = 0; i <= 500; i++) {
    //     // cout << "sg[" << i << "] == " << sg[i] << endl;
    //     cout << sg(i) << " ";
    //     if (i % 34 == 33) {
    //         cout << "\n";
    //     }
    // }
    
    int t;
    cin >> t;

    while (t--) {
        eachT();
    }

    return 0;
}

/*
0 0 1 1 2 0 3 1 1 0 3 3 2 2 4 0 5 2 2 3 3 0 1 1 3 0 2 1 1 0 4 5 2 7 
4 0 1 1 2 0 3 1 1 0 3 3 2 2 4 4 5 5 2 3 3 0 1 1 3 0 2 1 1 0 4 5 3 7
4 8 1 1 2 0 3 1 1 0 3 3 2 2 4 4 5 5 9 3 3 0 1 1 3 0 2 1 1 0 4 5 3 7
4 8 1 1 2 0 3 1 1 0 3 3 2 2 4 4 5 5 9 3 3 0 1 1 3 0 2 1 1 0 4 5 3 7
4 8 1 1 2 0 3 1 1 0 3 3 2 2 4 4 5 5 9 3 3 0 1 1 3 0 2 1 1 0 4 5 3 7
4 8 1 1 2 0 3 1 1 0 3 3 2 2 4 4 5 5 9 3 3 0 1 1 3 0 2 1 1 0 4 5 3 7
4 8 1 1 2 0 3 1 1 0 3 3 2 2 4 4 5 5 9 3 3 0 1 1 3 0 2 1 1 0 4 5 3 7
*/
```

## [G. 序列与整数对](https://qoj.ac/contest/2534/problem/14553)

### 方法一 根号分治

考虑根号分治。按 x 和 y 的出现次数，遍历那个出现次数少的，找另一个。

- 有一者出现次数小于 $B$ 就暴力，单次复杂度 $\mathcal{O}(B \log n)$，总复杂度不超过 $\mathcal{O}(q B \log n)$。
- 两个出现次数都大于 $B$ 就暴力之后记忆化，由于总是遍历那个出现次数少的，那么对于出现次数为 $c$ 的 $x$，枚举次数不超过 $\mathcal{O}(c \cdot \frac{n}{c}) =\mathcal{O}(n)$，又由于满足这个限制的 x 只有 $\frac{n}{B}$ 个，总复杂度不超过 $\mathcal{O}(n \frac{n}{B} \log n)$。

令 $q B \log n = n \frac{n}{B} \log n$，取 $B=\sqrt{ \dfrac{n^{2}}{q} }$，这样复杂度是 $\mathcal{O}(n \sqrt{ q } \log n)$（大概是这个）。

注意特判 $x=y$。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
#define endl '\n'

int main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    int n, q;
    cin >> n >> q;

    vector<int> a(n);
    map<int, vector<int>> mp;
    for (int i = 0; i < n; i++) {
        cin >> a[i];
        mp[a[i]].push_back(i);
    }

    const int B = 500;
    map<pair<int, int>, ll> ans;

    while (q--) {
        int x, y;
        cin >> x >> y;

        if (x == y) {
            ll m = mp[x].size();
            cout << (m - 1) * m / 2 << endl;
            continue;
        }

        auto& mpx = mp[x];
        auto& mpy = mp[y];
        if (mpx.size() < B) {  // B log n
            ll res = 0;
            for (auto p : mpx) {
                res += mpy.end() - lower_bound(mpy.begin(), mpy.end(), p);
            }
            cout << res << endl;
        } else if (mpy.size() < B) {  // B log n
            ll res = 0;
            for (auto p : mpy) {
                res += lower_bound(mpx.begin(), mpx.end(), p) - mp[x].begin();
            }
            cout << res << endl;
        } else {
            if (ans.count({ x, y })) {  // log n
                cout << ans[{ x, y }] << endl;
            } else {
                if (mpx.size() < mpy.size()) {
                    ll res = 0;     
                    for (auto p : mpx) {
                        res += mpy.end() - lower_bound(mpy.begin(), mpy.end(), p);
                    }
                    cout << res << endl;
                    ans[{ x, y }] = res;
                } else {
                    ll res = 0;
                    for (auto p : mpy) {
                        res += lower_bound(mpx.begin(), mpx.end(), p) - mp[x].begin();
                    }
                    cout << res << endl;
                    ans[{ x, y }] = res;
                }
            }
        }
    }
        
    return 0;
}
```

### 方法二 暴力枚举

仔细看代码，代码与根号分治没啥关系，都是遍历那个出现次数少的然后加个记忆化。所以完全可以把根号那个 if 去掉。也就是暴力的复杂度就是根号的，没必要再手动分治了。

因此复杂度和方法一相同，毕竟代码等价。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
#define endl '\n'

int main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    int n, q;
    cin >> n >> q;

    vector<int> a(n);
    map<int, vector<int>> mp;
    for (int i = 0; i < n; i++) {
        cin >> a[i];
        mp[a[i]].push_back(i);
    }

    map<pair<int, int>, ll> ans;

    while (q--) {
        int x, y;
        cin >> x >> y;

        if (x == y) {
            ll m = mp[x].size();
            cout << (m - 1) * m / 2 << endl;
            continue;
        }

        auto& mpx = mp[x];
        auto& mpy = mp[y];

        if (ans.count({ x, y })) {
            cout << ans[{ x, y }] << endl;
        } else {
            if (mpx.size() < mpy.size()) {
                ll res = 0;     
                for (auto p : mpx) {
                    res += mpy.end() - lower_bound(mpy.begin(), mpy.end(), p);
                }
                cout << res << endl;
                ans[{ x, y }] = res;
            } else {
                ll res = 0;
                for (auto p : mpy) {
                    res += lower_bound(mpx.begin(), mpx.end(), p) - mp[x].begin();
                }
                cout << res << endl;
                ans[{ x, y }] = res;
            }
        }
    }
        
    return 0;
}
```


## [K. 置换环](https://qoj.ac/contest/2534/problem/14557)（签到）

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    int n;
    cin >> n;

    cout << (n + 1LL) * n / 2 << endl;
    for (int i = n; i >= 1; i--) {
        cout << i << " ";
    }
    cout << endl;
        
    return 0;
}
```