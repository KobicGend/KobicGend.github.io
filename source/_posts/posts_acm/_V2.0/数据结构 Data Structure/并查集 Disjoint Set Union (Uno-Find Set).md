---
title: XCPC wiki - 并查集 Disjoint Set Union (Uno-Find Set)
tags:
  - 算法
  - 筆記
  - ACM
  - 數據結構
categories:
  - - 筆記
    - XCPCwiki
abbrlink: 3ef02b0
hide: true
date: 2025-01-24 22:05:00
updated: 2025-01-24 22:05:00
description:
---

## DSU01 - Find by Optimized Path Compression 路径压缩优化

```cpp
struct DSU {
    vector<int> p, siz;
    
    DSU(int n) : p(n + 1), siz(n + 1, 1) {
        iota(p.begin(), p.end(), 0);
    }
    
    int find(int x) {
        while (x != p[x]) x = p[x] = p[p[x]]; // 路径压缩
        return x;
    }
    
    bool same(int x, int y) {
        return find(x) == find(y);
    }
    
    bool uno(int x, int y) {
        x = find(x), y = find(y);
        if (same(x, y)) return false;
        siz[x] += siz[y];
        p[y] = x;
        return true;
    }
    
    int size(int x) {
        return siz[find(x)];
    }
};
```

### 基环树的判定

> *“都被分尸了能是一只克苏鲁吗？”——Shu*

**题意** 克苏鲁：An undirected graph that can be represented as a set of three or more rooted trees, whose roots are connected by a simple cycle. ([VJspr1F - Cthulhu](https://codeforces.com/problemset/problem/103/B))

![](https://vj.csgrandeur.cn/73602ea08d8098f23550dbab9372fdeb?v=1721059480)

**思路** 是连通图，且仅包含一个环。
- 如果在合并连通图时，发现两个元素的根节点相同，那么必然形成一个环
- 树满足 $v=e+1$，因此仅包含一个环时有 $v=e$。

```cpp
int n = read(), e = read();
DSU dsu(n);
int cnt = 0;
for (int i = 0; i < e; ++i) {
    int x = read(), y = read();
    if(!dsu.uno(x, y)) cnt += 1; // 父级相同 有环
}
printf("%s\n", cnt == 1 && n == e ? "FHTAGN!" : "NO"); // WAon46
```

### 合并相邻区间

**题意** ${\rm CYJian}$ 现在给你一个长度为 $N$ 的数列，你可以选择一个数 $x$，然后获得一个得分，得分越大越好。

得分是这样计算的：把小于等于 $x$ 的数标记，你的得分就是每一个连续标记的区间的长度的平方和除以你选择的数，区间的个数在 $l\sim r$ 的范围内。

多组询问，强制在线。(VJspr4G - 水の数列)

**思路** 预处理所有答案，用 ST 表得到区间最大值。

```cpp
struct node {
    ll x;    // 得分
    int y;   // 选择的数
    bool operator<(const node& o) const {
        return 1.0l * x / y == 1.0l * o.x / o.y ? y < o.y : 1.0l * x / y < 1.0l * o.x / o.y;
    }
};

void eachT() {
    int n = read(), q = read();

    map<int, vector<int>> mp;
    for (int i = 1; i <= n; i++) {
        int x = read();
        mp[x].push_back(i);
    }

    ll sco = 0, cnt = 0;
    vector<node> res(n + 1, { -1, -1 });
    DSU dsu(n);
    vector<int> vis(n + 1);
    for (auto& [x, vec] : mp) {
        for (auto& id : vec) {
            sco += 1;
            ++cnt;
            vis[id] = 1;

            if (id > 1 && vis[id - 1]) {
                sco += 2ll * dsu.size(id - 1) * dsu.size(id);
                --cnt;
                dsu.uno(id - 1, id);
            }
            if (id < n && vis[id + 1]) {
                sco += 2ll * dsu.size(id) * dsu.size(id + 1);
                --cnt;
                dsu.uno(id, id + 1);
            }
        }

        node tmp = { sco,x };
        if (res[cnt] < tmp) res[cnt] = tmp;
    }

    RMQ rmq(res);
    ll lstans = 0;
    while (q--) {
        int a = read(), b = read(), x = read(), y = read();
        int l = (a * lstans + x - 1) % n + 1;
        int r = (b * lstans + y - 1) % n + 1;
        if (l > r) swap(l, r);
        node cur = res[rmq.getmax(l, r)];
        printf("%lld %d\n%d %d %lld\n", cur.x, cur.y, l, r, lstans);
        lstans = cur.x * cur.y % n;
    }
}
```


### [VJspr7F - Cow and Snacks](https://codeforces.com/contest/1209/problem/D)

**题意** 有 $m$ 个客人，$n$ 种花，每种一朵，到店里买走他所喜欢的 $2$ 朵花中所有的。给出 $k$ 个客人的顺序，使买不到花的客人数量最少。

**思路** 以花为点，客人为边建图。一个大小为 $>1$ 的连通块可满足 $S_i-1$ 个客人，具体实现方法是，先任选一客人，再按 BFS 序选择其它客人。于是能买到的有 $\sum(S_i-1)=n-S$ 人，买不到的有 $m-(n-S)$ 人。

```cpp
int n = read(), m = read();
DSU dsu(n);
for (int i = 0; i < m; ++i) {
    int u = read(), v = read();
    dsu.uno(u, v);
}
int res = 0;
for (int i = 1; i <= n; ++i) {
    res += dsu.find(i) == i;
}
printf("%d\n", m - n + res);
```

**思路二**

```cpp
int n = read(), m = read();
DSU dsu(n);
int res = 0;
for (int i = 0; i < m; ++i) {
    int u = read(), v = read();
    if (!dsu.uno(u, v)) res += 1;
}
printf("%d\n", res);
```


### 倍增 + 并查集

一个长度为 $n$ 的大数，用 $S_1S_2S_3 \cdots S_n$表示，其中 $S_i$ 表示数的第 $i$ 位, $S_1$ 是数的最高位。告诉你一些限制条件，每个条件表示为四个数，$l_1,r_1,l_2,r_2$，即两个长度相同的区间，表示子串 $S_{l_1}S_{l_1+1}S_{l_1+2} \cdots S_{r_1}$ 与 $S_{l_2}S_{l_2+1}S_{l_2+2} \cdots S_{r_2}$ 完全相同。(VJspr4I - 萌萌哒)

```cpp
constexpr int D = 30;
int n = read(), m = read();
vector<DSU> dsu(D + 1, DSU(n));
while (m--) {
    int l1 = read(), r1 = read(), l2 = read(), r2 = read();
    int len = r1 - l1 + 1; // 区间长度

    for (int d = D; d >= 0; d--) {
        if (len & (1ll << d)) {
            dsu[d].uno(l1, l2); // 把对应区间并起来
            l1 += (1ll << d);
            l2 += (1ll << d);  // 倍增跳
        }
    }
}
for (int d = D - 1; d >= 0; d--) {
    for (int i = 1; i + (1ll << d) <= n; ++i) {
        int p = dsu[d + 1].find(i);
        if (i == p) continue;

        // 前一半和后一半的并查集合并
        dsu[d].uno(i, p);
        dsu[d].uno(i + (1ll << d), p + (1ll << d));
    }
}
int siz = 0;
for (int i = 1; i <= n; ++i) {
    siz += dsu[0].find(i) == i;
}
printf("%lld\n", (9 * qpow(10, siz - 1)) % mod);
```



### 2023 ICPC 济南 G. Gifts from Knowledge

```cpp
int n, m;
cin >> n >> m;

vector<string> s(n);
for (int i = 0; i < n; ++i) {
    cin >> s[i];
}

DSU dsu(2 * n);
bool ok = true;
for (int j = 0; j < m / 2; ++j) {
    vector<int> pos1, pos2;
    for (int i = 0; i < n; ++i) {
        if (s[i][j] == '1') pos1.push_back(i);
        if (s[i][m - j - 1] == '1') pos2.push_back(i);
    }
    int cnt = pos1.size() + pos2.size();
    if (cnt > 2) ok = false;
    else if (cnt == 2) {
        if (pos1.empty()) {
            dsu.uno(pos2[0], pos2[1] + n);
            dsu.uno(pos2[0] + n, pos2[1]);
        }
        else if (pos2.empty()) {
            dsu.uno(pos1[0], pos1[1] + n);
            dsu.uno(pos1[0] + n, pos1[1]);
        }
        else {
            if (pos1[0] == pos2[0]) continue;
            dsu.uno(pos1[0], pos2[0]);
            dsu.uno(pos1[0] + n, pos2[0] + n);
        }
    }
}

if (m & 1) {
    int cnt = 0;
    for (int i = 0; i < n; ++i) {
        cnt += s[i][m / 2] == '1';
    }
    if (cnt > 1) ok = false;
}

for (int i = 0; i < n; ++i) {
    if (dsu.same(i, i + n)) ok = false;
}

if (!ok) {
    cout << "0\n";
}
else {
    int siz = 0;
    for (int i = 0; i < 2 * n; ++i) {
        siz += dsu.find(i) == i;
    }
    siz /= 2;
    cout << qpow(2, siz) << "\n";
}
```





<div STYLE="page-break-after: always;"></div>

## DSU02 - Union By Rank 按秩启发式合并优化

（实际写的是按树的大小）

```cpp
struct DSU {
    vector<int> p, siz;

    DSU(int n) : p(n + 1), siz(n + 1, 1) {
        iota(p.begin(), p.end(), 0);
    }

    int find(int x) {
        while (x != p[x]) x = p[x];  // 不能路径压缩
        return p[x];
    }

    bool same(int x, int y) {
        return find(x) == find(y);
    }

    bool uno(int x, int y) {
        x = find(x), y = find(y);
        if (same(x, y)) return false;
        if (siz[x] < siz[y]) swap(x, y);  // 按秩启发式合并
        // 现在 siz[x] >= siz[y]
        siz[x] += siz[y];
        p[y] = x;
        return true;
    }

    int size(int x) {
        return siz[find(x)];
    }
};
```



### 给孙子记录爷爷的板子题

一张 $n$ 个节点的图，初始没有边，第 $i$ 个节点有 $m_{i}$ 个权值。对于两个节点 $x, y$，如果 $x$ 的某个权值与 $y$ 中某个权值相等，则 $x$ 和 $y$ 连通。求连通块数量。

数据范围：$n \leqslant 10^{6}$，$\sum m_{i} \leqslant 10^{6}$。

```cpp
struct DSU {
    vector<int> p;
    vector<vector<int>> son;
    vector<vector<int>> gson;
    unordered_map<int, int> gp;

    DSU() {}
    DSU(int n) {
        init(n);
    }

    void init(int n) {
        p.resize(n + 1);
        iota(p.begin(), p.end(), 0);
        son.resize(n + 1);
        gson.resize(n + 1);
        for (int i = 1; i <= n; ++i) {
            son[i].push_back(i);
        }
        gp.clear();
    }

    int find(int x) {
        while (x != p[x]) x = p[x];  // 不能路径压缩
        return p[x];
    }

    bool same(int x, int y) {
        return find(x) == find(y);
    }

    bool uno(int x, int y) {
        x = find(x), y = find(y);
        if (same(x, y)) return false;
        if (size(x) < size(y)) swap(x, y);  // 按秩启发式合并
        // 现在 size(x) >= size(y)
        for (auto u : son[y]) {
            son[x].push_back(u);
            p[u] = x;
            for (auto it : gson[u]) {
                gp[it] = x;
            }
        }
        son[y].clear();
        return true;
    }

    int size(int x) {
        return son[find(x)].size();
    }

    void add(int u, auto& x) {    // 给节点u增加一个权值x
        gson[p[u]].push_back(x);
        if (gp.count(x)) {
            uno(u, gp[x]);
        }
        else {
            gp[x] = u;
        }
    }
};

void eachT() {
    int n;
    cin >> n;

    DSU dsu(n);

    for (int i = 1; i <= n; ++i) {
        int m;
        cin >> m;

        while (m--) {
            int x;
            cin >> x;
            dsu.add(i, x);
        }
    }

    int ans = 0;
    for (int i = 1; i <= n; ++i) {
        ans += dsu.find(i) == i;
    }
    cout << ans << endl;
}
```

### 多图连通性

**题意** 给定 $d$ 张无向图，每张图都有 $n$ 个点。一开始，在任何一张图中都没有任何边。接下来有 $m$ 次操作，每次操作会给出 $a, b, k$，意为在第 $k$ 张图中的点 $a$ 和点 $b$ 之间添加一条无向边。你需要在每次操作之后输出有序数对 $(a, b)$ 的个数，满足 $a$ 点和 $b$ 点在 $d$ 张图中都连通。([[../contests/2024杭电多校/2024-07-22：2024“钉耙编程”中国大学生算法设计超级联赛（2）|2024 杭电多校 2012 - 图计算]], [洛谷 P8026](https://www.luogu.com.cn/problem/P8026))

数据范围：$d \leqslant 200$，$n \leqslant 5 \times 10^3$，$m \leqslant 10^6$。

**思路** 题目只考察连通性，不考察图更具体的结构，所以可以用 $d$ 个并查集维护。

两个点 $u$ 和 $v$ 在图 $i$ 上连通，当且仅当图 $i$ 上 $u$ 和 $v$ 的并查集祖先相同。因此，两个点 $u$ 和 $v$ 在 $d$ 张图上都连通，等价于对于任意 $i$，$u$ 和 $v$ 在第 $i$ 张图的并查集祖先相同。所以考虑对每个点 $u$ 维护一个长度为 $d$ 的字符串 $s_u$，$s_u(i)$ 表示第 $i$ 张图上 $u$ 的并查集祖先。于是 $u$ 和 $v$ 在 $d$ 张图上连通等价于 $s_u = s_v$。

我们动态地维护这 $n$ 个字符串的哈希值，对于哈希值相同的 $k$ 个字符串，可以给答案贡献 $k^2$。开桶记录即可。

现在考虑动态维护 $n$ 个字符串哈希值的复杂度。很明显，每次我们更改的字符串不能太多。对于一次在第 $k$ 张图连接 $a$ 和 $b$ 的操作，我们会修改 $s_u$ 的第 $k$ 个字符，其中 $u$ 是所有这次连边中在并查集上被更改祖先的点。我们要控制这个点数的量级。所以不路径压缩，考虑按并查集树的大小启发式合并。这样一来，一个点在第 $d$ 张图中，被更改祖先的次数不会超过 $\log n$ 次，每个字符串被修改的数量不超过 $d\log n$，所有字符串被修改的总次数为 $dn\log n$ 量级。

时间复杂度 $\Theta(dn\log n)$。

```cpp
constexpr int N = 5e3 + 8, D = 205;
ull ha[N];
int ans = 0;
unordered_map<ull, int> cnt;

void add(ull ha) {
    ans -= cnt[ha] * cnt[ha];
    ++cnt[ha];
    ans += cnt[ha] * cnt[ha];
}

void del(ull ha) {
    ans -= cnt[ha] * cnt[ha];
    if (--cnt[ha] == 0) cnt.erase(ha);
    ans += cnt[ha] * cnt[ha];
}

struct DSU {
    vector<int> p;
    vector<ull> val;
    vector<vector<int>> son;

    DSU() {}
    DSU(int n) {
        init(n);
    }

    void init(int n) {
        p.resize(n + 1);
        iota(p.begin(), p.end(), 0);
        val.resize(n + 1);
        son.resize(n + 1);
        for (int i = 1; i <= n; ++i) {
            son[i].push_back(i);
        }
    }

    int find(int x) {
        while (x != p[x]) x = p[x];  // 不能路径压缩
        return p[x];
    }

    bool same(int x, int y) {
        return find(x) == find(y);
    }

    bool uno(int x, int y) {
        x = find(x), y = find(y);
        if (same(x, y)) return false;
        if (size(x) < size(y)) swap(x, y);  // 按秩启发式合并
        // 现在 size(x) >= size(y)
        for (auto u : son[y]) {
            son[x].push_back(u);
            p[u] = x;

            del(ha[u]);
            ha[u] += val[x] - val[y];
            add(ha[u]);
        }
        son[y].clear();
        return true;
    }

    int size(int x) {
        return son[find(x)].size();
    }
};

void eachT() {
    int d = read(), n = read(), m = read();

    vector dsu(d, DSU(n));

    vector<ull> val(d);
    for (int i = 0; i < d; ++i) {
        val[i] = rng();
        for (int j = 1; j <= n; ++j) {
            dsu[i].val[j] = j * val[i];
            ha[j] += dsu[i].val[j];
        }
    }
    for (int j = 1; j <= n; ++j) {
        add(ha[j]);
    }

    while (m--) {
        int x = read(), y = read(), k = read();
        k--;
        dsu[k].uno(x, y);
        printf("%d\n", ans);
    }
}
```





<div STYLE="page-break-after: always;"></div>

## DSU03 - Shu sei Number 主机数 / 不取模的带权并查集

```cpp
struct SSN {  // Shu sei Number
    vector<int> p, siz, dep;

    SSN(int n) : p(n + 1), siz(n + 1, 1), dep(n + 1) {
        iota(p.begin(), p.end(), 0);
    }

    int find(int x) {
        if (x != p[x]) {
            int t = p[x];
            p[x] = find(p[x]);
            dep[x] += dep[t];
        }
        return p[x];
    }

    bool same(int x, int y, int d) {
        return find(x) == find(y) && (dep[x] + d - dep[y]);
    }

    bool uno(int x, int y, int d) {
        // 把y合并到x上 希望dep[x]+d=newdep[y]=dep[py]+dep[y]
        if (same(x, y, d)) return false;
        int dx = dep[x], dy = dep[y];
        x = find(x), y = find(y);
        dep[y] = dx + d - dy;
        p[y] = x;
        siz[x] += siz[y];    // 合并到x
        return true;
    }

    int size(int x) {
        return siz[find(x)];
    }
    
    int depth(int x) {
        find(x);
        return dep[x];
    }
};
```

### 最大深度

**题意** 有根树，每次操作连接两个节点，然后询问某一根节点所在树的的最大深度。([[../contests/2024牛客多校/2024-07-25：2024牛客暑期多校训练营4#A - LCT (51)|2024 牛客多校 4A - LCT]])

**思路** 稍修改 DSU 模板，增加 `vector<int> mxdep` 变量，合并时 `mxdep[px] = max(mxdep[px], mxdep[py] + dep[py])`。

```cpp
struct SSN {
    vector<int> p, siz, dep;
    vector<int> mxdep;

    SSN() {}
    SSN(int n) {
        init(n);
    }

    void init(int n) {
        p.resize(n + 1);
        iota(p.begin(), p.end(), 0);
        siz.assign(n + 1, 1);
        dep.assign(n + 1, 0);
        mxdep.assign(n + 1, 0);
    }

    int find(int x) {
        if (x != p[x]) {
            int t = p[x];
            p[x] = find(p[x]);
            dep[x] += dep[t];
        }
        return p[x];
    }

    bool same(int x, int y, int d) {
        return find(x) == find(y) && (dep[x] + d - dep[y]);
    }

    bool uno(int x, int y, int d) {
        // 把y合并到x上 希望dep[x]+d=newdep[y]=dep[y]+dep[y]
        if (same(x, y, d)) return false;
        int dx = dep[x], dy = dep[y];
        x = find(x), y = find(y);
        dep[y] = dx + d - dy;
        p[y] = x;
        siz[x] += siz[y];    // 合并到x
        mxdep[x] = max(mxdep[x], mxdep[y] + dep[y]);
        return true;
    }

    int size(int x) {
        return siz[find(x)];
    }
};

void eachT() {
    int n = read();

    SSN dsu(n);

    for (int i = 2; i <= n; ++i) {
        int p = read(), son = read(), q = read();
        dsu.uno(p, son, 1);
        printf("%lld ", dsu.mxdep[q]);
    }
    printf("\n");
}
```




<div STYLE="page-break-after: always;"></div>

## DSU04 - Logical Reasoning Puzzles 选择题 / 取模的带权并查集

```cpp
struct LRP {  // Logical Reasoning Puzzles
    vector<int> p, siz, dep;
    int mod;

    LRP(int n, int m) : mod(m), p(n + 1), siz(n + 1, 1), dep(n + 1) {
        iota(p.begin(), p.end(), 0);
    }

    int find(int x) {
        if (x != p[x]) {
            int t = p[x];
            p[x] = find(p[x]);
            dep[x] = (dep[x] + dep[t]) % mod;
        }
        return p[x];
    }

    bool same(int x, int y, int d) {
        return find(x) == find(y) && (dep[x] + d - dep[y]) % mod;
    }

    bool uno(int x, int y, int d) {
        // 把y合并到x上 希望dep[x]+d=newdep[y]=dep[py]+dep[y]
        if (same(x, y, d)) return false;
        int dx = dep[x], dy = dep[y];
        x = find(x), y = find(y);
        dep[y] = dx + d - dy;
        dep[y] = (dep[y] % mod + mod) % mod;
        p[y] = x;
        siz[x] += siz[y];    // 合并到x
        return true;
    }

    int size(int x) {
        return siz[find(x)];
    }
    
    int depth(int x) {
        find(x);
        return dep[x];
    }
};
```

### 选择题

一道有 $n$ 个选项的选择题，第 $i$ 个选项的内容的形式为：第 $a_i$ 个选项是正确/错误的。判断是否存在合法的答案，如存在，给出合法答案数、正确选项数量的最大值和最小值。([VJwin8I - 选择题](https://www.luogu.com.cn/problem/P6691))

```cpp
int cnt[N][2];

void eachT() {
    int n = read();

    LRP dsu(n, 2);

    for (int i = 1; i <= n; ++i) {
        int son = read(), opt = read();
        if (!dsu.uno(i, son, !opt)) {
            printf("No answer"); // 父級相同 但關系矛盾
            return;
        }
    }

    for (int i = 1; i <= n; ++i) {
        cnt[dsu.find(i)][dsu.dep[i]]++; // 記錄連通圖中0和1的個數
    }

    int res = 1, maxres = 0, minres = 0;
    for (int i = 1; i <= n; ++i) {
        if (dsu.find(i) == i) { // 根節點
            res = res * 2 % MOD;
            maxres += max(cnt[i][1], cnt[i][0]);
            minres += min(cnt[i][1], cnt[i][0]);
        }
    }
    printf("%d\n%d\n%d\n", res, maxres, minres);
}
```

**思路及代码** 首先我们定义 `tf[]`，表示 **与根节点的关系**，取 `1` or `0`。

我们从初始化、查询、合并、统计四个角度修改并查集：

**初始化** 注意若有多组输入，`tf[]` 也需初始化：

```cpp
inline void init(int n) {
    for (int i = 1; i <= n; ++i)
        fa[i] = i, tf[i] = 0;
}
```

**查询** 熟知，并查询的查询功能是递推（或许是递归，不重要了）找到根节点，这不需要修改。但需要注意，下述的合并过程仅仅是对根节点的 `tf[]` 作了修改，而其它节点没有，所以我们需要在查询过程中更新 `tf[]`，本题按异或(^)关系，写为 `tf[x] ^= tf[fa_x]`。

```cpp
int find(int x) {
    if (fa[x] != x) {
        int fa_x = fa[x];
        fa[x] = find(fa[x]);
        tf[x] ^= tf[fa_x]; // 此依题而异
    }
    return fa[x];
}
```

**合并** 熟知，并查询的合并功能是将甲节点的根 `fa_x` 连接至乙节点的根上。现在我们已知甲和乙是 `!opt` 的关系，为了使合并后甲和乙依旧保持 `!opt` 的关系，在合并时需要对甲节点的根 `fa_x` 与乙节点的根的关系作调整，以保证调整之后甲与根节点的关系 `tf[x] ^ tf[fa_x]` 和乙与根节点的关系 `tf[y]` 相差 `!opt`，也即 `tf[fa_x] ^ tf[x] ^ tf[y] = !opt`，因此，我们调整 `tf[fa_x]` 为 `tf[x] ^ tf[y] ^ !opt`。

```cpp
inline void uno(int x, int y, bool opt) {
    int fa_x = find(x), fa_y = find(y);
    if (fa_x != fa_y) {
        tf[fa_x] = tf[x] ^ tf[y] ^ !opt; // 此依题而异
        fa[fa_x] = fa_y;
    }
}
```

**统计** 首先是判断是否有解：

```cpp
for (int x = 1; x <= n; ++x) {
    int y = read(), opt = read(); // x 说 y 是 opt 的
    if (find(x) == find(y) && (tf[x] ^ tf[y] ^ !opt) == 1)
        flag = 0; // 父级相同 但关系矛盾
    else uno(x, y, opt);
}
if (!flag) { puts("No answer"); return; }
```

我们定义一个数组 `cnt[N][2]`，表示每个连通图中，同正确或同错误的选项个数（哪个表示正确哪个表示错误是无关系的，因为我们总可以调控根节点的正确性以切换正确或错误），统计方式是：

```cpp
for (int i = 1; i <= n; ++i) {
    cnt[find(i)][tf[i]]++; // 记录连通图中0和1的个数
}
```

对于合法答案数，是 $2^S$，其中 $S$ 是连通图总数，对于正确选项数量的最大（小）值，只需统计所有连通图中同正确同错误的数量的最大（小）值：

```cpp
int res = 1, cntmx = 0, cntmn = 0;
for (int i = 1; i <= n; ++i) {
    if (find(i) == i) { // 根节点
        res <<= 1;
        cntmx += max(cnt[i][1], cnt[i][0]);
        cntmn += min(cnt[i][1], cnt[i][0]);
    }
}
print(res, cntmx, cntmn);
```

完整代码：

```cpp
// 考場上很痛苦的一件事是 兩個問題不能兼得
// 原本第一問做出來了但第二問不對 折騰一番後第二問對了第一問又錯了
// ---
// (原思路)
// 有向圖
// 數【連通圖的個數】
// 如果某個環中0的個數是奇數，不合題意
// 一個起點能決定它指向的所有點
// 答案數=2的起點數次方
// 最大最小只需比較1和0的個數即可
// ---
// 這思路沒問題 但是不了解并查集所以就硬寫 寫了一個找父級函數和還原環的函數 累鼠
// 現在看其實就是并查集的過程 稍稍用并查集優化一下就好了

#include <cstdio>

typedef long long ll;
constexpr ll maxN = 1e6 + 7;
constexpr ll MOD = 998244353;
inline ll max(ll a, ll b) { return a > b ? a : b; }
inline ll min(ll a, ll b) { return a < b ? a : b; }

int fa[maxN];
bool tf[maxN]; // 和根節點的關系 1or0
int cnt[maxN][2];
bool flag = 1;

//int fa[maxN], rank[maxN];
inline void init(int n) {
    for (int i = 1; i <= n; ++i) fa[i] = i;
}
/// 和普通的并查集的init()一模一樣

int find(int x) {
    if (fa[x] == x) return fa[x];
    int fa_x = fa[x];
    fa[x] = find(fa[x]);
    tf[x] ^= tf[fa_x]; // 異或(^)關系
    return fa[x];
}
/// 普通的并查集的find()是這樣寫的：（不按秩合并，僅路徑壓縮）
//int find(int x) {
//    return x == fa[x] ? x : (fa[x] = find(fa[x]));
//}

inline void merge(int i, int son, bool opt) {
    if (find(i) != find(son)) {
        int tmp = find(i);
        fa[find(i)] = find(son);
        tf[tmp] = tf[i] ^ tf[son] ^ !opt;
    }
}
/// 普通的并查集的merge()是這樣寫的：
//inline void merge(int i, int j) {
//    fa[find(i)] = find(j);
//}


void eachT() {
    int n;
    scanf("%d", &n);

    init(n);

    for (int i = 1; i <= n; ++i) {
        int son, opt;
        scanf("%d%d", &son, &opt);
        if (find(i) == find(son) && (tf[i] ^ tf[son] ^ !opt) == 1) {
            printf("No answer"); // 父級相同 但關系矛盾
            return;
        }
        merge(i, son, opt);
    }

    for (int i = 1; i <= n; ++i) {
        cnt[find(i)][tf[i]]++; // 記錄連通圖中0和1的個數
    }

    int res = 1, maxres = 0, minans = 0;
    for (int i = 1; i <= n; ++i) {
        if (find(i) == i) { // 根節點
            res = ans * 2 % MOD;
            maxans += max(cnt[i][1], cnt[i][0]);
            minans += min(cnt[i][1], cnt[i][0]);
        }
    }
    printf("%d\n%d\n%d\n", ans, maxans, minans);
}

int main() {
    int T = 1;
    //scanf("%d\n", &T);
    while (T--) eachT();
    return 0;
}//*/
```

<div STYLE="page-break-after: always;"></div>

上题与根节点的关系只有 `1` 和 `0` 两种，下题的关系更加複杂。


### 食物链

动物王国中有三类动物 $A,B,C$，这三类动物的食物链构成了有趣的环形。$A$ 吃 $B$，$B$ 吃 $C$，$C$ 吃 $A$。现有 $N$ 个动物，以 $1 \sim N$ 编号。每个动物都是 $A,B,C$ 中的一种，但是我们并不知道它到底是哪一种。有人用两种说法对这 $N$ 个动物所构成的食物链关系进行描述：
- 第一种说法是 `1 X Y`，表示 $X$ 和 $Y$ 是同类。
- 第二种说法是`2 X Y`，表示 $X$ 吃 $Y$。

此人对 $N$ 个动物，用上述两种说法，一句接一句地说出 $K$ 句话，这 $K$ 句话有的是真的，有的是假的。当一句话满足下列三条之一时，这句话就是假话，否则就是真话。
- 当前的话与前面的某些真的话冲突，就是假话；
- 当前的话中 $X$ 或 $Y$ 比 $N$ 大，就是假话；
- 当前的话表示 $X$ 吃 $X$，就是假话。

你的任务是根据给定的 $N$ 和 $K$ 句话，输出假话的总数。([VJspr1B](http://poj.org/problem?id=1182) - [食物链](https://www.luogu.com.cn/problem/P2024))

```cpp
int n = read(), q = read();
LRP dsu(n, 3);
int res = 0;
while (q--) {
    int d = read() - 1, x = read(), y = read();
    res += (x > n || y > n || !dsu.uno(x, y, d));
}
printf("%d\n", res);
```

### 引入额外的变量——队列前方元素数量

定义合并操作是，将该元素所在队列移动到另一元素后面，求指定元素 **前面** 有几个元素。([VJspr1A - Cube Stacking](http://poj.org/problem?id=1988))

```cpp
LRP dsu(30000);
for (int q = read(); q--; ) {
    char c = getchar();
    if (c == 'M') {
        int x = read(), y = read();
        dsu.uno(dsu.find(y), dsu.find(x), dsu.size(y));
    }
    else {
        int x = read();
        dsu.find(x);  // WA: 更新x的數據
        printf("%d\n", dsu.dep[x]); // 查詢front
    }
}
```


### 特殊的差分约束

给出多组描述 $l,r,S$，表示 $a_l+\dots+a_r=S$，求与前文矛盾的描述的数量。([VJspr1I - How Many Answers Are Wrong](https://acm.hdu.edu.cn/showproblem.php?pid=3038))

```cpp
int n = read(), q = read();
LRP dsu(n + 1);
int res = 0;
while (q--) {
    int l = read(), r = read() + 1, d = read();
    res += (!dsu.uno(l, r, d));
}
printf("%d\n", res);
```




<div STYLE="page-break-after: always;"></div>

## DSU05 - 种类并查集 / 扩展域并查集

### 二分图

**题意** 给出婚配情况，判断是否有性别矛盾。([VJspr1C - A Bug's Life](http://poj.org/problem?id=2492))

**思路** 分两个并查集。合并时，将第一个并查集这个的元素与第二个的那个元素合并；查询时，如果第一个并查集和第二个并查集中某个元素在同一连通图中，则有性别矛盾。

```cpp
int n = read(), q = read();
DSU dsu(2 * n);
while (q--) {
    int x = read(), y = read();
    dsu.uno(x, y + n);
    dsu.uno(x + n, y);
}
bool ok = 1;
for (int i = 1; i <= n; ++i) {
    if (dsu.same(i, n + i)) ok = 0;
}
printf("%s\n\n", ok ? "No suspicious bugs found!" : "Suspicious bugs found!"); // PE
```

**评注** 我的方法是依“选择题”改编，前面的部分从略，主函数：

```cpp
int n = read(), q = read();
DSU dsu(n, 2);
bool ok = 1;
while (q--) {
    int x = read(), y = read();
    if (!dsu.uno(x, y, 1)) ok = 0; // 父级相同 但关系矛盾
}
printf("%s\n\n", ok ? "No suspicious bugs found!" : "Suspicious bugs found!"); // PE
```




<div STYLE="page-break-after: always;"></div>

### 食物链

**题意** 三类动物，甲吃乙， 乙吃丙，丙吃甲，求假话数量。([VJspr1B](http://poj.org/problem?id=1182) - [食物链](https://www.luogu.com.cn/problem/P2024))

**思路** 分三个并查集。

> 解释：
> 对于上一个题目，两个并查集实际上是“同性集”和“异性集”*（这是相互的关系，取决于研究对象在哪个集合，而不是说一个叫同性集而另一个叫异性集）*，所谓“将第一个的元素与第二个的合并”，即是将元素与异性合并在一个连通图中，所谓“第一个并查集和第二个并查集中某个元素在同一连通图中”，即是判断自己是不是在异性集中，如果是，那麽自己是自己的异性，显然是矛盾的。
> 对于本题，三个并查集实际上是“同类”、“食物”和“天敌”，我们可以人为地规定“吃”是前一个并查集吃后一个并查集（这样，捕食的方向已经由三个并查集的序号刻画，有向图便转化为类无向图）。只需将前一个并查集的甲元素与后一个并查集的乙元素连线（合并在一个连通图中，注意区分“并查集”和“连通图”），即可刻画“吃”这个关系，且注意，它们的捕食是循环的，所以这样是合理的。也就是说，对于两个已经连线的元素，如果在同一个并查集间，它们是同类关系，如果在不同的并查集间，它们是捕食关系。当然，与上一题不同的是，合并在同一组的元素，是在同一个并查集内合并。如何刻画矛盾？依题意，自己不能吃自己，所以，自己不能在对应的食物集中，也不能在天敌集中。

```cpp
int n = read(), q = read();
DSU dsu(3 * n);
int res = 0;
while (q--) {
    int opt = read(), x = read(), y = read();
    if (x > n || y > n) {
        res += 1;
    } else if (opt == 1) { // 同类
        if (dsu.same(x + n, y) || dsu.same(x, y + n)) {
            res += 1;
        } else {
            dsu.uno(x, y);
            dsu.uno(n + x, n + y);
            dsu.uno(n + n + x, n + n + y);
        }
    } else {
        if (dsu.same(x, y) || dsu.same(x + n, y)) {
            res += 1;
        } else {
            dsu.uno(x, n + y);
            dsu.uno(n + x, n + n + y);
            dsu.uno(n + n + x, y);
        }
    }
}
printf("%d\n", res);
```

## DSU06 - 可撤销并查集

**可撤销并查集**，或 **回滚并查集**，是在并查集的基础上增加了可以倒退回之前某一历史状态的功能。

并查集的应用主要是 kruskal 和连通块，可撤销并查集支持更复杂的 kruskal 问题和连通块的问题。([[../图论/图论技巧集#转化为并查集——维护连通性|转化为并查集——维护连通性]])

可撤销并查集 **不能路径压缩**，因为这会破坏和父节点之间的关系，故选用 **按秩合并**。

```cpp
#include <vector>
#include <numeric>

struct DSU {
    vector<int> p, siz;
    vector<pair<int&, int>> hp, hsiz;
    
    DSU(int n) : p(n + 1), siz(n + 1, 1) {
        iota(p.begin(), p.end(), 0);
    }
    
    int find(int x) {
        while (x != p[x]) x = p[x];  // 不能路径压缩
        return x;
    }

    bool same(int x, int y) {
        return find(x) == find(y);
    }

    bool uno(int x, int y) {
        x = find(x), y = find(y);
        if (same(x, y)) return false;
        if (siz[x] < siz[y]) swap(x, y);  // 按秩启发式合并
        hsiz.push_back({ siz[x], siz[x] });
        siz[x] += siz[y];
        hp.push_back({ p[y], p[y] });
        p[y] = x;
        return true;
    }

    int history() { return hp.size(); }  // 返回当前时间 h

    void roll(int h) {  // rollback 到 h
        while (hp.size() > h) {
            hp.back().first = hp.back().second;
            hp.pop_back();
            hsiz.back().first = hsiz.back().second;
            hsiz.pop_back();
        }
    }
};
```

## DSU07 - 可持久化并查集



<div STYLE="page-break-after: always;"></div>
