---
title: XCPC wiki - BITMASK
tags:
  - 算法
  - 筆記
  - ACM
  - 基礎算法
categories:
  - - 筆記
    - XCPCwiki
abbrlink: f76a2448
hide: true
date: 2025-01-24 22:05:00
updated: 2025-01-24 22:05:00
description:
---

## 两个数异或——01 字典树

处理异或问题，求一个数 $x$ 与一组数中某个数 $a_{i}$ 异或后的最大/小值，时间 $\Theta(n)-\Theta(1)$。

**两个数的最大异或** 给出一组数，从中选两个数异或，求最大值，也就是对每一个数分别解决从一组数中选一个数与给定数异或最大的子问题。一般来说，一组数中取任意个数求最大/最小异或和用线性基，取两个数求最大/最小异或用 01 字典树。

**树上最大异或路径** 设 $d_{u}$ 表示从根到 $u$ 路径权值异或和，根据异或的自反性，$u$ 到 $v$ 的路径异或和即是 $d_{u}\oplus d_{v}$，问题转化为求所有 $d$ 中两个数的最大异或。

**例 1** 给定一棵有 $n$ 个节点的带点权树，$q$ 个操作：
1. 将树上的每条边异或 $y$；
2. 给定节点 $v$，选取树上的一个节点 $u$，虚拟地加一条边权为 $x$ 连接 $u-v$ 边，使得原树存在一个环，最大化环上的边的异或和，并输出最大值。([CF1980G. Yasya and the Mysterious Tree](https://codeforces.com/contest/1980/problem/G))

```cpp
int n, q;
cin >> n >> q;

vector<vector<pair<int, int>>> E(n);
for (int i = 1; i < n; i++) {
    int u, v, w;
    cin >> u >> v >> w;
    u--, v--;
    E[u].push_back({ w, v });
    E[v].push_back({ w, u });
}

vector<int> dep(n), dis(n);
auto dfs = [&](auto&& self, int u, int p) -> void {
    for (auto [w, v] : E[u]) {
        if (v == p) continue;
        dep[v] = dep[u] ^ 1;
        dis[v] = dis[u] ^ w;
        self(self, v, u);
    }
};
dfs(dfs, 0, -1);

trie[0].init(), trie[1].init();
for (int u = 0; u < n; ++u) {
    trie[dep[u]].modify(dis[u], 1);
}

int w = 0;
while (q--) {
    char op;
    cin >> op;
    if (op == '^') {
        int y;
        cin >> y;
        w ^= y;
    }
    else {
        int u, x;
        cin >> u >> x;
        u--;
        x ^= dis[u] ^ (dep[u] * w);
        trie[dep[u]].modify(dis[u], -1);
        cout << max(trie[0].getmax(x), trie[1].getmax(x ^ w)) << " \n"[q == 0];
        trie[dep[u]].modify(dis[u], 1);
    }
}
```

### 模板：集合与、或、异或

```cpp
#include <cstdio>
#include <algorithm>
#include <cassert>
#include <cstring>
constexpr int N = 1e7 + 8;
constexpr int INF = 2147483647;
using ll = long long;
using namespace std;
inline ll read() {
    ll S = 0, C = 0; char Y = getchar();
    while (Y > 57 || Y < 48) C |= Y == 45, Y = getchar();
    while (Y <= 57 && Y >= 48) S = (S << 3) + (S << 1) + Y - 48, Y = getchar();
    return C ? -S : S;
}

struct Trie {
    struct Mrk {
        int o, a, x;  // o=1:需要赋为1, a=1:需要赋为0, x=1:需要xor
        void merge(Mrk& b) {
            int chg;
            /*
            o=0, b.a=0 -> chg=0 -> o=0
            o=0, b.a=1 -> chg=0 -> o=0
            o=1, b.a=0 -> chg=0 -> o=1
            o=1, b.a=1 -> chg=1 -> o=0
            */
            chg = o & b.a;
            o ^= chg;

            /*
            a=0, b.o=0 -> chg=0 -> a=0
            a=0, b.o=1 -> chg=0 -> a=0
            a=1, b.o=0 -> chg=0 -> a=1
            a=1, b.o=1 -> chg=1 -> a=0
            */
            chg = a & b.o;
            a ^= chg;

            /*
            o=0, a=0, b.x=0 -> chg=0 -> o=0, a=0, x^=0
            o=0, a=1, b.x=0 -> chg=0 -> o=0, a=1, x^=0
            o=1, a=0, b.x=0 -> chg=0 -> o=1, a=0, x^=0
            o=0, a=0, b.x=1 -> chg=0 -> o=0, a=0, x^=1
            o=0, a=1, b.x=1 -> chg=1 -> o=1, a=0, x^=1
            o=1, a=0, b.x=1 -> chg=1 -> o=0, a=1, x^=1
            */
            chg = (o & b.x) | (a & b.x);
            o ^= chg;
            o |= b.o;
            a ^= chg;
            a |= b.a;
            //x ^= b.x;
            x ^= chg;
            x ^= ((x & b.a) | (x & b.o)) ^ b.x;

            assert((o & a) == 0);  // o a不能同时为1
        }
    };

    int pcnt;
    int nxt[N][2];
    Mrk mrk[N];
    void init(int p) {
        nxt[p][0] = nxt[p][1] = 0;
        mrk[p] = { 0, 0, 0 };
    }
    void init() {
        pcnt = 0;
        init(pcnt);
    }

    void merge(int& q, int& p, int bit) {
        if (!q || !p) return q |= p, p = 0, void();
        if (bit == -1) return p = 0, void();
        push_down(q, bit);
        push_down(p, bit);
        merge(nxt[q][0], nxt[p][0], bit - 1);
        merge(nxt[q][1], nxt[p][1], bit - 1);
        p = 0;
    }

    void push_down(int p, int bit) {
        if (mrk[p].o & (1 << bit)) merge(nxt[p][1], nxt[p][0], bit - 1);
        if (mrk[p].a & (1 << bit)) merge(nxt[p][0], nxt[p][1], bit - 1);
        if (mrk[p].x & (1 << bit)) swap(nxt[p][0], nxt[p][1]);
        if (nxt[p][0]) mrk[nxt[p][0]].merge(mrk[p]);
        if (nxt[p][1]) mrk[nxt[p][1]].merge(mrk[p]);
        mrk[p] = { 0, 0, 0 };
    }

    void insert(int val, int p = 0) {
        for (int bit = 30; ~bit; --bit) {
            push_down(p, bit);
            bool c = val & (1 << bit);
            if (!nxt[p][c]) {
                nxt[p][c] = ++pcnt;
                init(pcnt);
            }
            p = nxt[p][c];
        }
    }

    int query(int val, int p = 0, ll res = 0) {
        for (int bit = 30; ~bit; --bit) {
            push_down(p, bit);
            bool c = val & (1 << bit);
            if (nxt[p][!c]) p = nxt[p][!c], res |= 1 << bit;
            else p = nxt[p][c];
        }
        return res;
    }

    void Or(int val) {
        Mrk t = { val, 0, 0 };
        mrk[0].merge(t);
    }

    void And(int val) {
        Mrk t = { 0, INF ^ val, 0 };
        mrk[0].merge(t);
    }

    void Xor(int val) {
        Mrk t = { 0, 0, val };
        mrk[0].merge(t);
    }
} T;

void eachT() {
    int n = read(), m = read();

    T.init();
    while (n--) {
        int x = read();
        T.insert(x);
    }

    while (m--) {
        int op = read(), x = read();
        if (op == 1) T.insert(x);
        if (op == 2) T.Or(x);
        if (op == 3) T.And(x);
        if (op == 4) T.Xor(x);
        if (op == 5) printf("%d\n", T.query(x));
    }
}
```


### 388535 (Hard Version)

**题意** 将序列 $[l,l+1,\cdots,r]$ 每个数异或 $x$ 并打乱顺序，给出这个序列 $a$ 和 $l,r$，求 $x$。数据范围：$0 \leqslant l \leqslant r < 2^{17}$。

**思路** $x$ 一定为某个 $l\oplus a_{i}$，枚举 $x$。**数组满足排列的性质，那么通过判断最大值与最小值即可判断两个排列是否相同**。对于本题，只需判断 $l\oplus a_{i}$ 与这组数异或后的最小值和最大值是否是 $l,r$ 即可，用 01 字典树，最终复杂度是枚举的复杂度 $\Theta(n)$。

```cpp
void eachT() {
    int l = read(), r = read();

    T.init();
    
    vector<int> a(r + 1);
    for (int i = l; i <= r; ++i) {
        a[i] = read();
        T.insert(a[i]);
    }

    for (int i = l; i <= r; ++i) {
        int x = a[i] ^ l;
        if (T.getmn(x) == l && T.getmx(x) == r) {
            printf("%d\n", x);
            return;
        }
    }
}
```

## 区间快速位运算

**区间快速或** 先构造一个长度为 $l\oplus r+1$ 的二进制数，只有第一位是 $1$，其他为 $0$，因为 $l$ 异或 $r$ 的最高位一定是第一位不同的二进制位。然后减 $1$ 一定是长度为 $l\oplus r$ 的二进制数，每一位都是一，然后用它与 $l$ 按位或。

**区间快速与** 显然，结果一定是 $l$ 与 $r$ 相同的部分加一串 $0$，因为后面的部分一定会被若干个数清零。与上面一样，最后用 $l$ 与它做按位与即可，这样就可以清零后面的位了。

**区间快速异或** 根据异或的可逆性，转化为求 $1,2,3...x$ 的异或和，结果如下：
- $x\bmod 4=0$，结果为 $x$；
- $x\bmod 4=1$，结果为 $1$；
- $x\bmod 4=2$，结果为 $x+1$；
- $x\bmod 4=3$，结果为 $0$。

```cpp
unsigned getor(unsigned l, unsigned r) {
    return l | ((1ULL << std::bit_width(l ^ r)) - 1);
}

unsigned getand(unsigned l, unsigned r) {
    return l & ~((1ULL << std::bit_width(l ^ r)) - 1);
}

unsigned getxor(unsigned x) {
    if (x < 0) return 0;
    if (x % 4 == 0) return x;
    if (x % 4 == 1) return 1;
    if (x % 4 == 2) return x + 1;
    if (x % 4 == 3) return 0;
    return 0;
}

unsigned getxor(unsigned l, unsigned r) {
    return getxor(l - 1) ^ getxor(r);
}
```

## 大小判定定理

二进制下的大小判定定理：
- $a > b\iff a$ 存在一个前缀大于 $b$ 的等长前缀

### [2023SDCPCJ. Not Another Path Query Problem](https://codeforces.com/gym/104417/problem/J)

[[../图论/图论技巧集#[2023SDCPCJ. Not Another Path Query Problem](https //codeforces.com/gym/104417/problem/J)|图论习题集]]

**题意** 给定一 $n$ 点 $m$ 边带权无向图和定值 $V$。每次询问一对 $u, v$ 之间是否存在一条路径，其所有边按位与 $\geqslant V$。

数据范围：$1 \leqslant n \leqslant 10^5,\ 0 \leqslant m \leqslant 5 \times 10^5,\ 1 \leqslant q \leqslant 5 \times 10^5,\ 0 \leqslant V < 2^{60}$。

**思路** 按位枚举满足约束的路径权值的前缀：

```cpp
while (V) check(V), V += lowbit(V);
``` 

如果一条路径上所有边的权值的前缀都为 $V$，那么这条路径上所有边按位与的结果，即这条路径的权值，前缀为 $V$。根据大小判定定理，这样的路径满足约束。

使用并查集或 BFS 染色维护满足条件的点。

时间复杂度 $\Theta(60(n+m+q))$。

```cpp
int n, m, q;
ll V;
cin >> n >> m >> q >> V;

vector<tuple<ll, int, int>> E(m);
for (auto& [w, u, v] : E) {
    cin >> u >> v >> w;
}

vector<array<int, 3>> que(q);
for (auto& [u, v, _] : que) {
    cin >> u >> v;
}

auto check = [&](ll x) {
    DSU dsu(n);
    for (auto& [w, u, v] : E) {
        if ((w & x) == x) dsu.uno(u, v);
    }
    for (auto& [u, v, ans] : que) {
        ans |= dsu.same(u, v);
    }
};

if (V == 0) check(0);  // TLEon3
else while (V) check(V), V += V & -V;

for (auto& [u, v, ans] : que) {
    cout << (ans ? "Yes" : "No") << "\n";
}
```



## 异或同余类

**题意** 有一个 $n$ 个顶点的无向图，顶点编号从 $1$ 到 $n$。两个顶点 $u, v$ 之间有边当且仅当 $u \oplus v$ 为质数。求颜色数量最小的染色方案，使得所有有边相连的顶点对不同色。([CF1991D. Prime XOR Coloring](https://codeforces.com/contest/1991/problem/D))

**思路** 当 $n \geqslant 6$ 时，一方面，由于 $1,3,4,6$ 两两异或都是质数，颜色至少是 $4$ 种。另一方面，熟知，**若 $\boldsymbol{2^{k}\mid a-b}$，则 $\boldsymbol{2^{k}\mid a\oplus b}$**，取 $k=2$，则所有模 $4$ 的同余类中两两异或为 $4$ 的倍数，是合数，按模 $4$ 的同余类染色即可，因此颜色数至多是 $4$ 种。

```cpp
const int res[] = { 1, 2, 2, 3, 3, 4 };
const int num[] = { 0, 1, 2, 2, 3, 3, 4 };

void eachT() {
    int n;
    cin >> n;

    if (n < 6) {
        cout << num[n] << '\n';
        for (int i = 0; i < n; i++) {
            cout << res[i] << ' ';
        }
    }
    else {
        cout << 4 << '\n';
        for (int i = 0; i < n; i++) {
            cout << (i % 4) + 1 << ' ';
        }
    }
    cout << '\n';
}
```

## 逐位拆分

### 2024 杭电多校 10010 - A+B Problem

[[../contests/2024杭电多校/2024-08-18：2024“钉耙编程”中国大学生算法设计超级联赛（10）|2024-08-18：2024“钉耙编程”中国大学生算法设计超级联赛（10）]]

$q$ 组询问，每次询问给定两个非负整数 $a,b$，输出 $(a+b)\bmod 2^{32}$。你需要“离线”回答每组询问。具体地，记第 $i$ 次回答的答案为 $ans_i$，在第 $i$ 组询问中你读入 $a_i',b_i'$ 后，真正询问的值为 $a_i=a_i' \oplus ans_{i-1}$，$b_i=b_i' \oplus ans_{i-1}$。特殊地，记 $ans_0=ans_q$。请求出 $ans_1,...,ans_q$ 并输出。如果存在多组解，请输出字典序最小的解。

最低位没有进位，故从最低位逐位确定。

```cpp
void eachT() {
    int n = read();

    vector<unsigned> a(n + 1), b(n + 1), ans(n + 1);
    for (int i = 1; i <= n; ++i) {
        a[i] = read(), b[i] = read();
    }

    for (int bit = 0; bit < 32; ++bit) {
        auto ans0 = ans, ans1 = ans;

        ans0[0] &= 1ll << bit;
        ans1[0] |= 1ll << bit;

        for (int i = 1; i <= n; ++i) {
            ans0[i] += ((a[i] ^ ans0[i - 1]) & (1ll << bit)) + ((b[i] ^ ans0[i - 1]) & (1ll << bit));
            ans1[i] += ((a[i] ^ ans1[i - 1]) & (1ll << bit)) + ((b[i] ^ ans1[i - 1]) & (1ll << bit));
        }

        assert(!((ans1[n] & (1ll << bit)) ^ (ans0[n] & (1ll << bit))));
        ans = ans1[n] & (1ll << bit) ? ans1 : ans0;
    }

    for (int i = 1; i <= n; ++i) {
        printf("%u\n", ans[i]);
    }
}
```


```cpp
void eachT() {
    int n = read();

    vector<unsigned> a(n + 1), b(n + 1), ans(n + 1);
    for (int i = 1; i <= n; ++i) {
        a[i] = read(), b[i] = read();
    }

    for (int bit = 0; bit < 32; ++bit) {
        ans[0] = ans[n];
        for (int i = 1; i <= n; ++i) {
            ans[i] += ((a[i] ^ ans[i - 1]) + (b[i] ^ ans[i - 1])) & 1u << bit;
        }
    }

    for (int i = 1; i <= n; ++i) {
        cout << ans[i] << '\n';
    }
}
```

### [VJ14A - XOR Construction](https://codeforces.com/problemset/problem/1895/D)

给定长度为 $n-1$ 的数列 $a$，构造长度为 $n$ 的数列 $b$ 同时满足：
- $b$ 是 $0$ 到 $n-1$ 的排列。
- $\forall i \in [1,n-1],a_i=b_i⊕b_{i+1}$。

```cpp
void eachT() {
    int n;
    cin >> n;

    vector<int> a(n), ans(n);
    for (int i = 1; i < n; i++) {
        cin >> a[i];
    }

    for (int bit = 0; bit <= D; bit++) {
        int sum = 1;
        ans[0] |= 1ll << bit;
        for (int i = 1; i < n; i++) {
            ans[i] |= (a[i] & (1ll << bit)) ^ (ans[i - 1] & (1ll << bit));
            if (ans[i] & (1ll << bit)) sum++;
            if (i & (1ll << bit)) sum--;
        }
        if (sum) {
            for (int i = 0; i < n; i++) {
                ans[i] ^= 1ll << bit;
            }
        }
    }

    for (int i = 0; i < n; i++) {
        cout << ans[i] << " ";
    }
    cout << endl;
}
```

## 例题

### 绝世好题

给定一个长度为 $n$ 的数列 $a_i$，求 $a_i$ 的子序列 $b_i$ 的最长长度 $k$，满足 $b_i \& b_{i-1} \ne 0$。

```cpp
void eachT() {
    int n = read();
    int ans = 0;
    vector<int> dp(D);
    while (n--) {
        int x = read();
        for (int k = 0; k < D; ++k)
            if (x & (1 << k)) ++dp[k];
        int maxx = 0;
        for (int k = 0; k < D; ++k)
            maxx = max(maxx, dp[k]);
        for (int k = 0; k < D; ++k)
            if (x & (1 << k)) dp[k] = maxx;
        ans = max(ans, maxx);
    }
    cout << ans << endl;
}
```

### XOR Break — Solo Version

给定一个初始值为 $n$ 的整数变量 $x$。每次操作可以把 $x$ 变成 $y$，其中 $0 \lt y \lt x$ 且 $0 \lt (x \oplus y) \lt x$。

确定是否可以使用最多 $63$ 次操作将 $x$ 转换为 $m$。

```cpp
void eachT() {
    ll n = read(), m = read();

    ll sum = 0;
    bool ok = 1;
    vector<ll> res;
    res.push_back(n);
    for (int bit = 0; bit < 64; ++bit) {
        if ((n & (1ll << bit)) > (m & (1ll << bit))) {
            sum += 1ll << bit;
            if ((res.back() ^ sum) > res.back() || sum > res.back()) ok = 0;
            res.push_back(res.back() ^ sum);
            sum = 0;
        }
        else if ((n & (1ll << bit)) < (m & (1ll << bit))) {
            sum += 1ll << bit;
        }
    }

    if (ok) {
        printf("%d\n", res.size() - 1);
        for (int i = 0; i < res.size(); ++i) {
            printf("%lld%c", res[i], " \n"[i == res.size() - 1]);
        }
    }
    else {
        printf("-1\n");
    }
}
```

### XOR Break — Game Version

游戏从正整数 $n$ 开始，玩家轮流进行。在游戏的每个回合中，都会发生以下事件：
- 拥有整数 $p$ 的玩家将它分解成两个整数 $p_{1}$ 和 $p_{2}$ ，其中 $0 < p_{1} < p$ 、 $0 < p_{2} < p$ 和 $p_{1} \oplus p_{2} = p$ 。
- 如果不存在 $p_{1}$、$p_{2}$ ，输。
- 否则，对手会选择 $p_{1}$ 或 $p_{2}$ 其中之一，对局将以所选整数继续进行。

最多执行 $63$ 次分解操作获胜。可选择先后手。

```cpp
void eachT() {
    ll n;
    cin >> n;

    bool me = 0;
    if (__builtin_popcountl(n) & 1) {
        cout << "second" << endl;
        me = 0;
    }
    else {
        cout << "first" << endl;
        me = 1;
    }

    ll x = n, y = -1;
    while (x || y) {
        if (me) {
            if (__builtin_popcountl(x) & 1) {
                swap(x, y);
            }

            y = 1ll << __lg(x);
            x = x - y;

            cout << x << " " << y << endl;
        }
        else {
            cin >> x >> y;
        }
        me ^= 1;
    }
}
```

### [CF1937C. Bitwise Operation Wizard](https://codeforces.com/contest/1937/problem/C)

交互，一个 $0\sim n-1$ 的排列。
- **询问** 下标 $a,b,c,d$，交互器计算 $x = (p_a \mid p_b)$ 和 $y = (p_c \mid p_d)$ 并返回 $x < y$、$x > y$ 或 $x = y$。不超过 $3n$ 次。
- **答案** 两个下标 $i$ 和 $j$，满足 $p_i \oplus p_j$ 最大。

```cpp
char query(int a, int b, int c, int d) {
    cout << "? " << a << ' ' << b << ' ' << c << ' ' << d << endl;

    char x;
    cin >> x;
    return x;
}

void ans(int a, int b) {
    cout << "! " << a << ' ' << b << endl;
}

void eachT() {
    int n;
    cin >> n;

    int mx = 0;  // 最大值 n-1 的下标
    for (int i = 1; i < n; ++i) {
        auto res = query(mx, mx, i, i);

        if (res == '<') {
            mx = i;
        }
    }

    // 异或最大的 按位或也最大
    vector<int> v;
    v.push_back(mx);
    for (int i = 0; i < n; ++i) {
        if (i == mx) continue;

        auto res = query(i, mx, v[0], mx);

        if (res == '=') {
            v.push_back(i);
        }
        else if (res == '>') {
            v.clear();
            v.push_back(i);
        }
    }

    // 按位或最大的之中 最小值才满足异或最大
    int mn = v[0];
    for (int i = 1; i < v.size(); ++i) {
        auto res = query(mn, mn, v[i], v[i]);

        if (res == '>') {
            mn = v[i];
        }
    }

    ans(mx, mn);
}
```

### 2024 牛客多校 1D - XOR of Suffix Sums 

[[../contests/2024牛客多校/2024-07-16：2024牛客暑期多校训练营1#*D - XOR of Suffix Sums|2024-07-16：2024牛客暑期多校训练营1]]

维护一个初始为空的非负整数序列，$q$ 次操作，每次操作依次执行：
- 移除末尾的 $t$ 个整数；
- 在末尾加入一个整数 $x$；
- 输出当前序列所有后缀和的 XOR 和（答案对 $2097152$ 取模）．

| Input                                     | Output                |
| ----------------------------------------- | --------------------- |
| 5<br>0 1<br>0 2<br>1 3<br>0 6<br>2 100000 | 1<br>1<br>7<br>5<br>1 |

**题意** 首先 **将后缀和转化为前缀和**（这是因为对于每次操作，后缀和皆会变化，而前缀和只有一项变化）．

记前缀和序列为 $p_{1},p_{2},\dots,p_{n}$，所求即是 ${\Large\oplus}_{i=1}^{n-1}(p_{n}-p_{i})\oplus p_{n}$．

先考虑 ${\Large\oplus}_{i=1}^{n-1}(p_{n}-p_{i})$．

注意到答案对 $2097152=2^{21}$ 取模，从 **异或的本质** 考虑，分别计算答案 **每一个二进制位**．

对于二进制第 $d\ (0 \leqslant d<21)$ 位，只需求满足 $p_{n}-p_{i}$ 的二进制第 $d$ 位是 $1$ 的 $i$ 的个数，即满足
$$
(p_{n}-p_{i}) \bmod 2^{d+1} \geqslant 2^{d}
$$
的 $i$ 的个数．

这是个 **统计个数问题**，用权值 **线段树** 维护．

**维护什么？**
需要开 $21$ 个线段树，每一个存对应的模值．因需查询 $i$ 的个数，存储所有的 $p_{i} \bmod 2^{d+1}$．

**如何查询？**
需要查询线段树中 $(p_{n}-x) \bmod 2^{d+1} \geqslant 2^{d}$ 的 $x$ 的个数，记 $t=p_{n} \bmod 2^{d+1}$，这就等价于查询区间
$$
\left(t-2^{d+1},\ t-2^{d}\right]\cup\left(t,\ t+2^{d}\right]
$$
中 $x$ 的个数．如果个数是奇数，说明满足 $p_{n}-p_{i}$ 的二进制第 $d$ 位是 $1$ 的 $i$ 的个数是奇数，异或之后 ${\Large\oplus}_{i=1}^{n-1}(p_{n}-p_{i})$ 中这一位是 $1$，答案需要加上 $2^{d}$；如果个数是偶数，同理有异或之后 ${\Large\oplus}_{i=1}^{n-1}(p_{n}-p_{i})$ 中这一位是 $0$，答案不变．

由于是单点修改，区间查询，我们用码量更小的 **树状数组** 代替线段树．由于树状数组只支持正整数，而需要用到 $0$，因此存储时都 $+1$．

```cpp
#include <algorithm>
#include <cstdio>
#include <vector>
const int N = 6e6 + 8;
const int M = 21;
const int MOD = 1 << 21;
inline int read() {
    int Y = getchar(), S = 0, C = 1;
    while (Y > 57 || Y < 48) { if (Y == 45) C = -1; Y = getchar(); }
    while (Y <= 57 && Y >= 48) { S = (S << 3) + (S << 1) + Y - 48; Y = getchar(); }
    return S * C;
}

// 开21个树状数组
struct BIT {
    int tree[N];
    inline int lowbit(int _n) { return _n & (-_n); }
    inline void update(int i, int x) {
        for (int p = i; p < N; p += lowbit(p)) tree[p] += x;
    }
    inline int query(int i) {
        int ans = 0;
        for (int p = i; p >= 1; p -= lowbit(p)) ans += tree[p];
        return ans;
    }
    inline int query(int l, int r) {
        return query(r) - query(l - 1);
    }
} tr[M];

// 更新 将i位置的数加上num
inline void update(int i, int x) {
    for (int d = 0; d < M; d++) {
        tr[d].update((i % (1 << (d + 1))) + 1, x);
    }
}

int p[N];  // 前缀和
int main() {
    int n = 1;  // 数组中元素个数
    for (int q = read(); q--;) {
        int t = read(), v = read();
        while (t--) {
            update(p[n], -1);  // 删除一个
            n--;
        }
        n++;
        p[n] = (p[n - 1] + v) % MOD;  // 计算新的前缀和p[n]

        // 查询 分别计算每一个二进制位 按题解模拟
        int ans = 0;
        for (int d = 0; d < M; d++) {
            int t = p[n] % (1 << (d + 1));
            int res = tr[d].query((t + 1) + 1, (t + (1 << d)) + 1)
                    + tr[d].query((t - (1 << (d + 1)) + 1) + 1, (t - (1 << d)) + 1); // 区间中x的个数
            if (res & 1) ans += 1 << d;
        }
        ans ^= p[n];  // 再异或上p[n]
        printf("%d\n", ans);

        update(p[n], 1);  // 插入当前前缀和
    }
    return 0;
}
```


<div STYLE="page-break-after: always;"></div>


### 2024 牛客多校 2E - GCD VS XOR

[[../contests/2024牛客多校/2024-07-18：2024牛客暑期多校训练营2#E. GCD VS XOR|2024-07-18：2024牛客暑期多校训练营2]]

**题意** 给定 $x$，找到一个满足如下条件的 $y$：
1. $0<y<x$；
2. $\gcd(x,y)=x\oplus y$．

**思路** 对于奇数 $x$，取 $y=x-1$，则 $\gcd(x,y)=x\oplus y=1$．对于偶数 $x=2t$，如果 $t$ 是奇数，可取 $y=2(t-1)$，这样，
$$
\gcd(x,y)=2\gcd(t,t-1)=2,\ x\oplus y=2\cdot(t\oplus t-1)=2
$$
以此类推，设 $x=2^{k}\cdot t$，其中 $t$ 是奇数，就可以取 $y=2^{k}(t-1)$，也就是说，取 $y=x-\operatorname{lowbit}(x)$．如果 $x$ 不能被表示为这样的形式，即 $x=2^{k}$，则无解．

```cpp
#include <cstdio>
using ll = long long;
inline ll read() {
    ll x = 0, f = 0; char c = getchar();
    while (c > 57 || c < 48) f |= c == 45, c = getchar();
    while (c <= 57 && c >= 48) x = (x << 3) + (x << 1) + c - 48, c = getchar();
    return f ? -x : x;
}

int main() {
    for (int T = read(); T--;) {
        ll x = read();
        ll ans = x - (x & (-x));
        if (ans == 0) ans = -1;
        printf("%lld\n", ans);
    }
    return 0;
}
```

### 2024 杭电多校 8012 - cats 的电脑中毒

定义两个数的距离为异或后二进制中 1 的数量，给定三个数，求 $[1,2^{n}]$ 中所有数与这三个数的距离的最小值的最大值。数据范围：$n \leqslant 2\times10^{5}$。

```cpp
void eachT() {
    int n;
    string a, b, c;
    cin >> n >> a >> b >> c;
    int f11 = 0, f10 = 0, f01 = 0, f00 = 0;
    for (int i = 0; i < n; ++i) {
        if (a[i] == '1') {
            b[i] = '1' + '0' - b[i];
            c[i] = '1' + '0' - c[i];
        }
        if (b[i] == '1' && c[i] == '0') f10 += 1;
        if (b[i] == '1' && c[i] == '1') f11 += 1;
        if (b[i] == '0' && c[i] == '1') f01 += 1;
        if (b[i] == '0' && c[i] == '0') f00 += 1;
    }
    cout << f00 + min({ (f10 + f11) / 2 + f01,
                        (f01 + f11) / 2 + f10,
                        (f10 + f01) / 2 + f11
                      }) << '\n';
}
```

### [CF1994E - Wooden Game](https://codeforces.com/contest/1994/problem/e)

**题意** 给定一个有根树森林 $K=\left\{T_1,T_2,\dots,T_k\right\}$，可以移除森林中任意树的子树，然后将其加入森林。求通过任意次操作，所能得到的 ${\Large\ominus}_{i=1}^{|K|}\left|T_i\right|$ 的最大值。

**思路** 不难注意到答案与树的具体结构无关，只与树的节点数有关，进而问题转化为：
- 给定一个正整数集合 $K=\left\{T_1,T_2,\dots,T_k\right\}$，可以选择一个元素 $x=a+b$ 从集合中删去，再将 $a$ 和 $b$ 加入集合。

从最高位贪心选择。

```cpp
void eachT() {
    int n = read();

    vector<int> v[D];
    for (int i = 0; i < n; ++i) {
        int x = read();
        for (int j = 2; j <= x; ++j) read();
        v[__lg(x)].push_back(x);
    }

    int ans = 0;
    for (int bit = D - 1; bit >= 0; bit--) {
        if (v[bit].size() >= 2) {
            ans |= (1 << bit);
            ans |= (1 << bit) - 1;
        }
        else if (v[bit].size() == 1) {
            if (ans & (1 << bit)) {
                ans |= (1 << bit) - 1;
            }
            else {
                ans |= (1 << bit);
                int x = v[bit][0] ^ (1 << bit);
                if (x) v[__lg(x)].push_back(x);
            }
        }
    }

    printf("%d\n", ans);
}
```

另有一种码量小，但复杂度高的做法，注意到 $\sum x$ 很小，可以通过：

```cpp
void eachT() {
    int n = read();

    int ans = 0;
    for (int i = 0; i < n; ++i) {
        int x = read(), tmp = ans;
        for (int j = 2; j <= x; ++j) read();
        for (int j = 1; j <= x; ++j) {
            ans = max(tmp | j, ans);
        }
    }

    printf("%d\n", ans);
}
```



### [CF1988C - Increasing Sequence with Fixed OR](https://codeforces.com/contest/1988/problem/C)

构造最长的严格递增正数列 $\{a_n\}$，满足 $a_i \ominus a_{i-1}=n$。

```cpp
vector<ll> ans;
for (int bit = 60; bit >= 0; bit--) {
    if ((1ll << bit) & n && n - (1ll << bit)) {
        ans.push_back(n - (1ll << bit));
    }
}
ans.push_back(n);
```

### [CF922C. XOR-distance](https://codeforces.com/contest/1918/problem/C)

**题意** 给定  $a,b,r$，求 $x\in[0,r]$，使 $| (a\oplus x)-(b\oplus x)|$ 最小。

**思路** 不妨 $a>b$，考虑每一个二进制位，$x$ 取 $0$ 还是 $1$。若 $a,~b$ 的这一二进制位相同 $x$ 取什么都没有影响；否则，若 $x$ 是 $0$，则 $a,~b$ 不变，若 $x$ 是 $1$，则 $a,~b$ 对应的二进制位交换。我们期望变成 $10000-01111$ 这种形式，可将 $a,~b$ 的差距最小化。具体实现方法是，从最高位一一遍历，若可交换，判断是否 $a$ 的这一位是 $1$ 且 $b$ 的这一位是 $0$，如果是，则交换，即将 $x$ 的这一位设为 $1$。

```cpp
void eachT() {
    ll a, b, mx;
    cin >> a >> b >> mx;
    if (b > a) swap(a, b);
    for (int bit = min(__lg(a ^ b) - 1, __lg(mx)); bit >= 0; bit--) {
        if ((a & (1ll << bit)) == (b & (1ll << bit))) continue;
        if ((a & (1ll << bit)) && ((1ll << bit) <= mx)) {
            a ^= (1ll << bit);
            b ^= (1ll << bit);
            mx -= (1ll << bit);
        }
    }
    cout << a - b << '\n';
}
```

### [CF1935E. Distance Learning Courses in MAC](https://codeforces.com/contest/1935/problem/e)

给定 $n$ 个区间 $[l_i,r_i]$ 与 $q$ 次询问。每次询问给定 $[L,R]$，你需要从 $[L,R]$ 内挑选若干个区间，再从每个区间中挑选一个数，最大化它们按位或的值，输出这个最大值。

数据范围：$n,q \leqslant 2\times 10^5,0 \leqslant l_i \leqslant r_i<2^{30}$。

$l_{i}$ 和 $r_{i}$ 的公共前缀一定会选，这部分扔到 RMQ 里求区间或。再看剩下的部分，此时一定有 $l_{i}<r_{i}$，这时候 $l_{i}$ 就可以滚了，然后就是个经典的问题。

```cpp
void eachT() {
    int n;
    cin >> n;

    vector<int> a(n);
    vector<array<int, D>> d(n);
    for (int i = 0; i < n; ++i) {
        int x, y;
        cin >> x >> y;
        for (int bit = D - 1; ~bit; --bit) {
            if ((x ^ y) >> bit & 1) {
                for (; ~bit; --bit) {
                    d[i][bit] |= (y >> bit) & 1;
                }
                break;
            }
            else {
                a[i] |= y & 1ll << bit;
            }
        }
    }

    vector<array<int, D>> cnt(n + 1);
    for (int bit = D - 1; ~bit; --bit) {
        for (int i = 0; i < n; ++i) {
            cnt[i + 1][bit] = cnt[i][bit] + d[i][bit];
        }
    }

    RMQ A(a);

    int q;
    cin >> q;
    while (q--) {
        int l, r;
        cin >> l >> r;
        l--;

        int ans = A(l, r);
        for (int bit = D - 1; ~bit; --bit) {
            int cntt = cnt[r][bit] - cnt[l][bit] + (ans >> bit & 1);
            if (cntt >= 2) {
                ans |= (1ll << bit + 1) - 1;
            }
            else if (cntt == 1) {
                ans |= (1ll << bit);
            }
        }
        cout << ans << " \n"[q == 0];
    }
}
```