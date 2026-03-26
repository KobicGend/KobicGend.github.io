---
title: 2024 ICPC 昆明补题记录 (8 题 BCDEGHJLM)
tags:
  - 題解
  - 筆記
  - ACM
  - 算法
  - 區域賽
categories:
  - - 筆記
    - 區域賽
description: "The 2024 ICPC Asia Kunming Regional Contest (The 3rd Universal Cup. Stage 20: Kunming)"
highlight_shrink: true
abbrlink: 7bcd967d
date: 2025-10-24 00:00:00
updated: 2025-11-27 00:00:00
---
牌线：4 / 5快 / 7中 / 10

喜欢 B、C、D。这场的知识点题有点多，数学也有点太多。

## [B. Brackets](https://qoj.ac/contest/1871/problem/9863)（Hash，栈）【Expert】

没仔细看题解，下面是我们的做法。

【题意】给定一个长括号串（括号有四种类型），再给定 $m$ 括号串（都是长括号串的子括号串），尽可能多地将它们两两配对，拼起来，使每对都是合法括号序列。

先考察什么样的串可以匹配上。将配对括号内部消化后，得到的两个串中，其中一个串都是左括号，另一个串都是右括号，而且这两个串完全对称。

接下来的总思路是，用类似栈的结构从左向右加入括号，加入第 $i$ 位后，处理以第 $i$ 位结尾的子括号串，**先判断它是否内部消化后都是左括号，再计算 Hash 值，用 Hash 判断对称**。然后把字符串反过来，判断并计算右括号串。

第一个问题是，什么样的串内部消化后都是左括号？需要对于每个右括号，与之匹配的左括号不超过左端点。所以我们可以用一个数据结构（如线段树）维护**每个右括号匹配的左括号下标**，做区间最小值查询，判断这个最小值**是否大于左端点**，如大于，消化后就都是左括号。

第二个问题是，如何计算剩下来的左括号的 Hash 值？剩下来的左括号其实就是栈里的所有括号，只需要动态维护**栈的区间哈希**就好了。

复杂度一只 log。600ms。

```cpp
// 线段树略
struct Info {
    int min = inf;
    void apply(const Info& x) {
        min = x.min;
    }
};
Info operator + (const Info& l, const Info& r) {
    return { min(l.min, r.min) };
}

// 取模类略
mt19937_64 rnd(chrono::steady_clock::now().time_since_epoch().count());
constexpr u64 hmod = (1ULL << 61) - 1;
uniform_int_distribution<u64> dist(hmod / 2, hmod - 1);
const u64 H = dist(rnd);
using Z = mint<u64, hmod>;  // 取模类  

constexpr string bracket = "()[]{}<>";

void solve() {
    int n, m;
    cin >> n >> m;

    string s;
    cin >> s;

    vector<pair<int, int>> seg(m);
    for (auto& [l, r] : seg) {
        cin >> l >> r;
        l--;
        r--;
    }

    vector<Z> pow(n + 1);
    pow[0] = 1;
    for (int i = 0; i < n; i++) {
        pow[i + 1] = pow[i] * H;
    }

    array<map<ull, int>, 2> mp;
    for (int op = 0; op < 2; op++) {
        vector<int> stk;
        vector<vector<int>> adj(n);
        for (auto& [l, r] : seg) {
            adj[r].push_back(l);
        }
        SegmentTree<Info> segtree(n);
        vector<Z> h(n + 1);
        auto get = [&](int l, int r) {
            return h[r] - h[l] * pow[r - l];
        };
        for (int r = 0; r < n; r++) {
            int p = bracket.find(s[r]);
            if (p % 2 == 0) {  // left bracket 进栈并计算栈内哈希值
                stk.push_back(r);
                h[stk.size()] = h[stk.size() - 1] * H + s[r];  
            } else {  // right bracket 计算匹配的左括号位置
                if (!stk.empty() && s[stk.back()] == bracket[p ^ 1]) {
                    segtree.update(r, {stk.back()});
                    stk.pop_back();
                } else {  // 匹配不上 一定非法 算-1
                    segtree.update(r, {-1});
                }
            }
            for (auto l : adj[r]) {
                auto info = segtree.query(l, r + 1);
                if (info.min >= l) {
                    int i = ranges::lower_bound(stk, l) - stk.begin();
                    mp[op][get(i, stk.size()).val()]++;
                }
            }
        }
        ranges::reverse(s);
        for (auto& c : s) {  // 字符串翻过来
            c = bracket[bracket.find(c) ^ 1];
        }
        for (auto& [l, r] : seg) {  // 查询翻过来
            tie(l, r) = pair(n - 1 - r, n - 1 - l);
        }
    }
    int res = 0;
    for (auto& [h, cnt] : mp[0]) {
        if (h == 0) {  // 空串特判一下
            res += cnt / 2;
        } else {
            res += min(mp[0][h], mp[1][h]);
        }
    }
    cout << res << endl;
}
```



## [C. Coin](https://qoj.ac/contest/1871/problem/9864)（数学计算）【Medium】

> 政府决定削减海军的预算，并将节省下来的黄金直接分配给海盗。这成功地消灭了比海军更多的海盗。——煮鸡

【题意】设当前剩余的海盗数量为 $n$。海盗们排成一队，位于 $1, 1+k, 1+2k, \dots, 1+(\lceil\frac{n}{k}\rceil - 1) k$ 的海盗被淘汰。这个操作重复进行，直到只剩下一个海盗。最初站在哪里才能成为最后剩下的海盗？

倒着来，某一轮位于第 $p$ 位的人，前一轮位于第 $p+\Big\lceil \dfrac{p}{k-1} \Big\rceil$ 位。记 $r=\Big\lceil \dfrac{p}{k-1} \Big\rceil$。总是有连续若干轮的 $r$ 相同，把这些轮次打包计算。设当前位于第 $p$ 位，$\alpha$ 轮后新位置 $p'=p+\alpha r$，且 $\Big\lceil \dfrac{p'}{k-1} \Big\rceil>r$，即 $p'> r(k-1)$。联立解得 $\alpha >k-1-\dfrac{p}{r}$，取满足上面不等式的最小 $\alpha = \lfloor k-1-\frac{p}{r} \rfloor + 1$。又 $p'=p+\alpha r \leqslant n$，得到 $\alpha$ 的上界为 $\lfloor \frac{n-p}{r} \rfloor$。

复杂度 $\mathcal{O}(\sqrt{ n })$。

*这种题复杂度的证明可以考虑分治，但实现上没必要手动分治，按如上策略，复杂度自动就是 $\mathcal{O}(\sqrt{ n })$。*

核心代码仅 9 行。

```cpp
ll ceil(ll n, ll m) {
    if (n >= 0) return (n + m - 1) / m;
    else return n / m;
}

ll floor(ll n, ll m) {
    if (n >= 0) return n / m;
    else return (n - m + 1) / m;
}

void solve() {
    ll n, k;
    cin >> n >> k;
    ll p = 1;
    while (p + ceil(p, k - 1) <= n) {
        ll r = ceil(p, k - 1); 
        ll a = min(floor((k - 1) * r - p, r) + 1, (n - p) / r);
        p += a * r;
    }
    cout << p << endl;
}  
```

## [D. Dolls](https://qoj.ac/contest/1871/problem/9865)（贪心、倍增、二分）【Expert】

性质：如果一段区间可以合并成一个，则其任意子区间都可以合并成一个套娃。

以下所有讨论都基于这个性质。

问题：最多能合并几次？
问题化为：最多能分成多少个段，其中每段都能合并。
做法：考虑一个贪心，以 1 为左端点，贪心地将右侧的套娃合并到这个区间中，得到 $[1,r]$ 这一段。然后再以 $r+1$ 为左端点，寻找下一个段。

问题化为：指定一个区间的左端点，最多能向右合并多少套娃？
做法：二分。

问题化为（二分的 check）：给定一个套娃序列，能否将这些套娃全部合并成一个？
做法：当任意相邻的两个套娃可以紧密合并时，就立即合并它们。因需要离散化，复杂度 $\mathcal{O}(n\log n)$。

分析一下复杂度，二分 check 的复杂度是 $\mathcal{O}(n\log n)$，其中 $n$ 是区间长度。所以必须保证 $\sum n=N$ 时，复杂度才能保证在 $\mathcal{O}(N\log^{2} N)$。应当先倍增的查找二分的右端点，再精细二分。

```cpp
void solve() {
    int N;
    cin >> N;

    vector<int> A(N);
    for (int i = 0; i < N; i++) {
        cin >> A[i];
        A[i]--;
    }

    auto check = [&](int l, int r) {
        vector<int> a(A.begin() + l, A.begin() + r);
        auto g = a;
        ranges::sort(g);
        g.erase(ranges::unique(g).begin(), g.end());
        for (auto& x : a) {
            x = ranges::lower_bound(g, x) - g.begin();
        }
        vector<pair<int, int>> stk;
        for (auto x : a) {
            pair<int, int> cur {x, x};
            while (!stk.empty()) {
                if (stk.back().second + 1 == cur.first) {
                    cur = {stk.back().first, cur.second};
                    stk.pop_back();
                } else if (cur.second + 1 == stk.back().first) {
                    cur = {cur.first, stk.back().second};
                    stk.pop_back();
                } else {
                    break;
                }
            }
            stk.push_back(cur);
        }
        return stk.size() == 1;
    };

    int res = 0;
    int l = 0;
    while (l < N) {
        int lo = l + 1, hi = N + 1;
        for (int k = 1; k + l <= N; k *= 2) {
            if (!check(l, l + k)) {
                hi = l + k;
                break;
            }
        }
        while (lo < hi) {
            int mid = lo + hi >> 1;
            if (check(l, mid)) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        lo--;
        l = lo;
        res++;
    }
    cout << N - res << '\n';
    
    return;
}
```

## [E. Extracting Weights](https://qoj.ac/contest/1871/problem/9866)（线性方程组）【Medium】

【题意】给定一棵树，点有权值。根节点的权值为 0。交互询问距离为 $k$ 个两个点的简单路径上所有点权值的异或和。问能否通过计算所有点的权值。$n \leqslant 250$。

idea不错，但解法太公式+假交互，坏。

枚举所有可能的询问（枚举两端点，不断找 parent，注意把 LCA 也放进去），以及 $w_{0}=0$，得到 $\mathcal{O}(n^{2})$ 个 $n$ 元线性方程组。若有 $n$ 个线性无关就有解，并交互解方程。复杂度 $\mathcal{O}(n^{4}/ w)$。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using ull = unsigned long long;

constexpr unsigned N = 250;

int main() {
    int n, k;
    cin >> n >> k;
    
    vector<vector<int>> adj(n);
    for (int i = 1; i < n; i++) {
        int u, v;
        cin >> u >> v;
        u--, v--;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    vector<int> parent(n, -1);
    vector<int> dep(n);
    [&](this auto&& dfs, int x) -> void {
        for (auto y : adj[x]) {
            if (y == parent[x]) {
                continue;
            }
            parent[y] = x;
            dep[y] = dep[x] + 1;
            dfs(y);
        }
    } (0);

    vector<bitset<N>> eqs;
    vector<pair<int, int>> query;
    array<bitset<N>, N> ha{};
    array<int, N> hc{};
    auto insert = [&](bitset<N> a, int c) {
        for (int bit = 0; bit < N; bit++) {
            if (a.test(bit)) {
                if (!ha[bit].any()) {
                    for (int rua = bit + 1; rua < N; rua++) {
                        if (ha[rua].any() && a.test(rua)) {
                            a ^= ha[rua];
                            c ^= hc[rua];
                        }
                    }
                    for (int rua = 0; rua < bit; rua++) {
                        if (ha[rua].test(bit)) {
                            ha[rua] ^= a;
                            hc[rua] ^= c;
                        }
                    }
                    ha[bit] = a;
                    hc[bit] = c;
                    return true;
                }
                a ^= ha[bit];
                c ^= hc[bit];
            }
        }
        return false;
    };
    {
        bitset<N> eq;
        eq.set(0);
        insert(eq, 0);
    }
    for (int x = 0; x < n; x++) {
        for (int y = 0; y < n; y++) {
            int u = x, v = y;
            bitset<N> eq;
            while (u != v) {
                if (dep[u] < dep[v]) {
                    swap(u, v);
                }
                eq.set(u);
                u = parent[u];
            }
            eq.set(u);  // LCA 也要放进去
            if (eq.count() != k + 1) {  // 注意 k 是边数 eq 是点数
                continue;
            }
            if (insert(eq, 0)) {
                eqs.push_back(eq);
                query.push_back({x, y});
            }
        }
    }

    assert(eqs.size() <= n - 1);
    if (eqs.size() < n - 1) {
        cout << "NO" << endl;
        return;
    }

    cout << "YES" << endl;
    cout << "? " << n - 1;
    for (auto [x, y] : query) {
        cout << " " << x + 1 << " " << y + 1;
    }
    cout << endl;

    ha.fill(bitset<N>());
    hc.fill(0);
    {
        bitset<N> eq;
        eq.set(0);
        insert(eq, 0);
    }
    for (auto eq : eqs) {
        int c;
        cin >> c;
        insert(eq, c);
    }

    vector<int> res(n);
    for (int i = 0; i < n; i++) {
        for (int bit = 0; bit < N; bit++) {
            if (ha[bit].test(i)) {
                res[i] = hc[bit];
            }
        }
    }
    cout << "! ";
    for (int i = 1; i < n; i++) {
        cout << res[i] << " ";
    }
    cout << endl;

    return 0;
}
```

## [G. GCD](https://qoj.ac/contest/1871/problem/9868)（搜索，数论）【Hard】

【题意】给定两个正整数 $A$ 和 $B$，每次可以选一个数并减去 $\gcd(A,B)$。 问：至少要多少次操作，才能使两个数都变成 0？$A \leqslant 5000,B \leqslant 10^{18}$。$\sum A  \leqslant  10000$。

数论都比较神秘，可以先试试暴力，相信有一些神秘结论能证明暴力是对的 (x)。

本题的证明方法并不是很好想：考虑奇偶性，两次操作就能把 $A$ 和 $B$ 都变成偶数。进而只需要 $2 \log 5000 = 26$ 次就能归零。$\mathcal{O}(2^{26})$ 爆搜（甚至不需要记忆化）。

```cpp
void solve() {
    ll a, b;
    cin >> a >> b;

    queue<tuple<ll, ll, int>> Q;
    Q.push({a, b, 0});
    while (!Q.empty()) {
        auto [a, b, d] = Q.front();
        Q.pop();
        if (a == 0 && b == 0) {
            cout << d << endl;
            return;
        }
        if (a) {
            Q.push({a - gcd(a, b), b, d + 1});
        }
        if (b) {
            Q.push({a, b - gcd(a, b), d + 1});
        }
    }
}   
```

## [H. Horizon Scanning](https://qoj.ac/contest/1871/problem/9869)（极角排序）【Easy】

```cpp
#include <bits/stdc++.h>
using namespace std;

using numbers::pi;

int main() {
    int T;
    cin >> T;

    while (T--) {
        int N, K;
        cin >> N >> K;

        vector<double> A(N);
        for (int i = 0; i < N; i++) {
            int x, y;
            cin >> x >> y;
            A[i] = atan2(y, x);
        }
        ranges::sort(A);
        A.resize(2 * N);
        for (int i = 0; i < N; i++) {
            A[i + N] = A[i] + 2 * pi;
        }

        double res = 0;
        for (int i = K; i < 2 * N; i++) {
            res = max(res, A[i] - A[i - K]);
        }
        cout << fixed << setprecision(10) << res << "\n";
    }

    return 0;
}
```

## [J. Just another Sorting Problem](https://qoj.ac/contest/1871/problem/9871)（分讨，博弈）【Easy】

```cpp
void solve() {
    int n;
    string s;
    cin >> n >> s;

    vector<int> p(n);
    for (int i = 0; i < n; i++) {
        cin >> p[i];
        p[i]--;
    }

    int cnt = 0;
    for (int i = 0; i < n; i++) {
        if (p[i] == i) {
            cnt++;
        }
    }
    if (n > 3) {
        if (cnt == n - 2 && s[0] == 'A') {
            cout << "Alice\n";
        } else {
            cout << "Bob\n";
        }
    } else if (n == 2) {
        cout << "Alice\n";
    } else {
        if ((cnt == 1) ^ (s[0] == 'B')) {
            cout << "Alice\n";
        } else {
            cout << "Bob\n";
        }
    }
}   
```

## [L. Last Chance: Threads of Despair](https://qoj.ac/contest/1871/problem/9873)（数学计算，模拟）【Hard】

```cpp
void solve() {
    int n, m;
    cin >> n >> m;
    vector<int> a(n), b(m);
    int total_damage = 0;
    bool has1 = false;
    for (int i = 0; i < n; i++) {
        cin >> a[i];
        if (a[i] != 1) {
            a[i]--;
            total_damage++;
        } else if (!has1) {
            has1 = true;
            total_damage++;
            a[i]--;
        }
    }
    for (int i = 0; i < m; i++) {
        cin >> b[i];
    }
    sort(a.begin(), a.end());
    sort(b.begin(), b.end());
    int damage = 0;  // 当前的死亡爆炸伤害
    int ida = 0, idb = 0;
    while (idb < m) {
        if (ida < n && a[ida] <= damage) {  // 炸死a
            ida++;
            damage++;
        } else if (b[idb] <= damage) {   // 炸死b
            idb++;
            damage++;
        } else {   // 炸不死开始打
            ll minn = min(total_damage, b[idb] - damage);
            total_damage -= minn;
            b[idb] -= minn;
            if (b[idb] > damage) {  // 打不死了
                cout << "No" << endl;
                return;
            }
            idb++;
            damage++;
        }
    }
    cout << "Yes" << endl;
}
```
 
## [M. Matrix Construction](https://qoj.ac/contest/1871/problem/9874)（矩阵构造）【Easy】

```cpp
void solve() {
    int n, m;
    cin >> n >> m;
    
    int cur = 0;
    vector a(n, vector<int>(m));
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            a[i][j] = cur++;
        }
        if (m % 2 == 1 && i % 2 == 1) {
            rotate(a[i].begin(), a[i].begin() + 1, a[i].end());
        }
    }

    cout << "YES" << "\n";
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cout << a[i][j] + 1 << " \n"[j == m - 1];
        }
    }
}   
```

