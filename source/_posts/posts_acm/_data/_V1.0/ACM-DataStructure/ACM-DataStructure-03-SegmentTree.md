---
title: 數據結構 - ST表 樹狀數組 線段樹
tags:
  - 算法
  - 數據結構
  - 筆記
  - ACM
categories:
  - - 筆記
    - 算法筆記
abbrlink: '8303a602'
date: 2024-03-28 09:20:13
updated: 2024-03-30 09:19:56
description:
---

<div style="text-align:left;"> <p><font size="4px">
<a href="https://kobicgend.top/posts/8303a602.html">讲解</a>；
<a href="https://kobicgend.top/pdf/JINJIESegmentTree.pdf">课件</a>；
<a href="https://vjudge.net.cn/contest/638487">练习</a>；
<a href="https://kobicgend.top/posts/4c0e75ca.html">题解</a></font></p></div>


# ST Table

**ST 表 (Sparse Table, 稀疏表)** 基于 **倍增** 思想，用于解决 **可重复贡献问题$^\dagger$**，支持在 $\Theta(1)$ 的时间内 **区间查询**，不支持在线修改。

预处理时间复杂度 $\Theta(n\log n)$，查询时间复杂度 $\Theta(1)$。

> $^\dagger:$ 区间询问对应的运算符 $*$ 满足 $x*x=x$ 和结合律 $(x*y)*z=x*(y*z)$ ，如 $\max,\ \min,\ \oplus,\ |\ ,\ \&,\ \gcd$ 等，包括 RMQ (Range Maximum/Minimum Query) 问题和区间 GCD。

以查询区间的最大值、最小值为例：

```cpp
int arr[N];
int Log2[N], hi[33][N], lo[33][N];

void beforeT() {
    for (int i = 2; i < N; ++i) Log2[i] = Log2[i / 2] + 1;
}

void init(int n) {
    for (int i = 1; i <= n; ++i) hi[0][i] = lo[0][i] = arr[i];
    for (int i = 1; (1ll << i) < n; ++i) {
        for (int j = 1; j + (1ll << i) - 1 <= n; ++j) {
            hi[i][j] = max(hi[i-1][j], hi[i-1][j + (1ll << i - 1)]);
            lo[i][j] = min(lo[i-1][j], lo[i-1][j + (1ll << i - 1)]);
        }
    }
}

int querymx(int l, int r) {
    int d = Log2[r - l + 1];
    return max(hi[d][l], hi[d][r - (1ll << d) + 1]);
}

int querymn(int l, int r) {
    int d = Log2[r - l + 1];
    return min(lo[d][l], lo[d][r - (1ll << d) + 1]);
}

void eachT() {
    int n = read();
    for (int i = 1; i <= n; ++i) arr[i] = read();
    init(n);
    for (int q = read(); q--; ) {
        int l = read(), r = read();
        printf("%d\n", querymx(l, r) - querymn(l, r));
    }
}
```

> 例题 [洛谷P2880](https://www.luogu.com.cn/problem/P2880)

<div STYLE="page-break-after: always;"></div>

# BIT

**树状数组 (bisrch Index Tree, 二进制下标树)** 用于维护满足 **结合律** 和 **可差分**（即具有逆运算，如和、积、异或）的区间信息，支持在 $\Theta(n)$ 的空间和 $\Theta(\log n)$ 的时间内 **单点修改** 和 **区间查询**。

树上节点 $p$ 存储区间 $(p-\operatorname{lowbit}p,\ p]$ 的某个性质，其中 $\operatorname{lowbit}p$ 表示 $p$ 的二进制中 1 的最低位。前缀查询 $[1,p]$ 可按二进制拆成对 $\Theta(\log p)$ 个子区间求和。

以维护区间的和（单点修改和区间查询）为例：

```cpp
int n;
ll tree[N];

inline int lowbit(int _n) { return _n & (-_n); }

inline void update(int i, int num) {
    for (int p = i; p < N; p += lowbit(p)) tree[p] += num;
}  // 修改 a[i] += num

inline ll query(int i) {
    ll ans = 0;
    for (int p = i; p; p -= lowbit(p)) ans += tree[p];
    return ans;
}  // 查询 return pre[i]

inline ll query(int l, int r) {
    return query(r) - query(l - 1);
}  // 查询 [l,r]

void eachT() {
    memset(tree, 0, sizeof tree);
    n = read();
    for (int i = 1; i <= n; ++i) update(i, read());
    for (int q = read(); q--; ) {
        int op = read();
        if (op) update(i, num);
        else print(query(l, r));
    }
}
```

> 例题 [洛谷P3374](https://www.luogu.com.cn/problem/P3374)


<div STYLE="page-break-after: always;"></div>

#### BIT.1 权值树状数组

将序列从后向前倒着插入 BIT，插入 $a_i$ 前，统计已插入的比 $a_i$ 小的数字的数量 `query(a[i])`，即是序列中满足 $j>i,\ a_j<a_i$ 的数量，也即 $a_i$ 对应的逆序对的数量。考虑到给出的数字较大，且存在负数，又注意到逆序数只与数字的相对大小有关，先 **离散化**。

```cpp
// BIT板子略

int a[N];
std::pair<int, int> b[N];

void eachT() {
    memset(tree, 0, sizeof tree);
    n = read();
    for (int i = 1; i <= n; ++i) b[i] = { read(),i };
    std::sort(b + 1, b + n + 1);
    for (int i = 1; i <= n; ++i) a[b[i].second] = i;  // 离散化
    
    ll sum = 0;
    for (int i = n; i >= 1; --i) {
        sum += query(a[i]);    // 插入前统计
        update(a[i], 1);       // 倒着插入
    }
    printf("%lld\n", sum);
}
```

**注** 更标准的离散化写法，即复制、排序、去重、查找，时间复杂度 $\Theta(n\log n)$：

```cpp
int arr[N], val[N];
void eachT() {
    memcpy(val, arr, sizeof arr);                       // 复制
    std::sort(val, val + n);                            // 排序
    int val_size = std::unique(val, val + val) - val;   // 去重
    for (int i = 0; i < n; ++i)                         // 查找
        arr[i] = std::lower_bound(val, val + val_size, arr[i]) - val + 1;
}
```

> 例题 [HDU1394 Minimum Inversion Number](https://acm.hdu.edu.cn/showproblem.php?pid=1394)

<div STYLE="page-break-after: always;"></div>


### BIT.2 高阶前缀和

#### BIT.2.1 区间修改和单点查询

利用差分，将此问题转化为单点修改和区间查询。具体地，记 $b_i = a_i - a_{i-1}$，则 $a_i = \sum b_j$，用 BIT 维护序列 $\lbrace b_i\rbrace$ 的前缀和，修改 $[l,r]$ 即 $b_l:=b_l+x,\ b_{r+1}:=b_{r+1}-x$。

```cpp
void eachT() {
    memset(tree, 0, sizeof tree);
    n = read();
    for (int i = 1; i <= n; ++i) {
        a[i] = read();
        update(i, a[i] - a[i - 1]);
    }
    for (int q = read(); q--; ) {
        int op = read();
        if (op) update(l, num), update(r + 1, -num);
        else print(query(x));
    }
}
```

> 例题 [洛谷P3368](https://www.luogu.com.cn/problem/P3368)


<div STYLE="page-break-after: always;"></div>

#### BIT.2.2 区间修改和区间查询

即线段树模板题。

类似地，利用差分，
$$s_k
= \sum_{i=1}^{k} a_i
= \sum_{i=1}^{k} \sum_{j=1}^{i} b_j
= \sum_{i=1}^{k} \sum_{j=i}^{k} b_i
= (k+1) \sum_{i=1}^{k} b_i - \sum\limits_{i=1}^{k} ib_i
$$
用两个 BIT 分别维护序列 $\lbrace b_i\rbrace$、$\lbrace ib_i\rbrace$ 的前缀和。

```cpp
int n;
ll tree[N], tree2[N];

inline int lowbit(int _n) { return _n & (-_n); }

inline void update(int i, int num) {
    for (int p = i; p < N; p += lowbit(p)) {
        tree[p] += num, tree2[p] += num * i;
    }   // 维护什么写什么
}

inline ll query(int i) {
    ll ans = 0;
    for (int p = i; p; p -= lowbit(p)) {
        ans += (i + 1) * tree[p] - tree2[p];
    }   // 计算公式是什么就写什么
    return ans;
}

inline ll query(int l, int r) {
    return query(r) - query(l - 1);
}

void eachT() {
    memset(tree, 0, sizeof tree);
    n = read();
    for (int i = 1; i <= n; ++i) {
        a[i] = read();
        update(i, a[i] - a[i-1]);
    }
    for (int q = read(); q--; ) {
        int op = read();
        if (op) update(l, num), update(r + 1, -num);
        else print(query(l, r));
    }
}
```

> 例题 [洛谷P3372](https://www.luogu.com.cn/problem/P3372)


#### BIT2.3 高阶前缀和

一般地，对于 $m$ 阶前缀和，计算 $C_{k-x+m-1}^{m-1}$，得到关于 $x$ 的多项式 $a_0x^0 + a_1x^1 + a_2x^2 + \cdots$，则
$$s_k = a_0\sum\limits_{i=1}^{k} b_i + a_1 \sum\limits_{i=1}^{k} ib_i + a_2 \sum\limits_{i=1}^{k} i^2b_i + \cdots
$$

例如，当 $m=3$ 时，$s_k = \left(k^2+3k+2\right)\sum\limits_{i=1}^{k} b_i + \left(-2k-3\right) \sum\limits_{i=1}^{k} ib_i + \sum\limits_{i=1}^{k} i^2b_i$。



### BIT.2 多维 BIT

二维数组的区间修改和区间查询：构造差分数组 $b_{ij}$，则 
$$
\begin{aligned}
s_{uv}
= \sum\limits_{i=1}^{u}\sum\limits_{j=1}^{v} a_{ij}
&= \sum\limits_{i=1}^{u}\sum\limits_{j=1}^{v} \sum\limits_{k=1}^{i}\sum\limits_{l=1}^{j} b_{kl} \\
&= \sum\limits_{i=1}^{u}\sum\limits_{j=1}^{v} \sum\limits_{k=i}^{u}\sum\limits_{l=j}^{v} b_{ij} \\
&= \sum\limits_{i=1}^{u}\sum\limits_{j=1}^{v} 
(u-i+1)(v-j+1)b_{ij} \\
&= (u+1)(v+1)\sum\limits_{i=1}^{u}\sum\limits_{j=1}^{v}b_{ij} 
-u\sum\limits_{i=1}^{u}\sum\limits_{j=1}^{v}jb_{ij} \\
&\qquad\ -v\sum\limits_{i=1}^{u}\sum\limits_{j=1}^{v}ib_{ij} 
+\sum\limits_{i=1}^{u}\sum\limits_{j=1}^{v}ijb_{ij} 
\end{aligned}
$$

用四个 BIT 分别维护序列 $\lbrace b_{ij}\rbrace$、$\lbrace ib_{ij}\rbrace$、$\lbrace jb_{ij}\rbrace$、$\lbrace ijb_{ij}\rbrace$ 的前缀和。

```cpp
ll t1[N][N], t2[N][N], t3[N][N], t4[N][N];

inline int lowbit(int _n) { return _n & (-_n); }

inline void update(int i, int j, int num) {
    for (int p = i; p < N; p += lowbit(p)) {
        for (int q = j; q < N; q += lowbit(q)) {
            t1[p][q] += num;
            t2[p][q] += j * num;
            t3[p][q] += i * num;
            t4[p][q] += i * j * num;
        }   // 维护什么写什么
    }
}

inline ll query(int i, int j) {
    ll ans = 0;
    for (int p = i; p; p -= lowbit(p)) {
        for (int q = j; q; q -= lowbit(q)) {
            ans += (i + 1) * (j + 1) * t1[p][q]
                - (i + 1) * t2[p][q]
                - (j + 1) * t3[p][q]
                + t4[p][q];
        }   // 计算公式是什么就写什么
    }
    return ans;
}

void eachT() {
    for (int q = read(); q--; ) {
        int op = read();
        if (op) {
            int x1 = read(), y1 = read(), x2 = read(), y2 = read(), num = read();
            update(x1, y1, num);
            update(x2 + 1, y1, -num);
            update(x1, y2 + 1, -num);
            update(x2 + 1, y2 + 1, num);
        } else {
            int x1 = read(), y1 = read(), x2 = read(), y2 = read();
            printf("%lld\n", query(x2, y2)
                - query(x1 - 1, y2)
                - query(x2, y1 - 1)
                + query(x1 - 1, y1 - 1));
        }
    }
}
```

例题 [洛谷P4514上帝造题的七分钟](https://www.luogu.com.cn/problem/P4514)



<div STYLE="page-break-after: always;"></div>

### BIT.3 后缀 BIT

维护后缀和。交换 `update` 和 `query` 的跳转方式。

```cpp
int n;
ll tree[N];

inline int lowbit(int _n) { return _n & (-_n); }

inline void update(int i, int num) {
    for (int p = i; p; p -= lowbit(p)) tree[p] += num;
}  // 修改 a[i] += num

inline ll query(int i) {
    ll ans = 0;
    for (int p = i; p < N; p += lowbit(p)) ans += tree[p];
    return ans;
}  // 查询 return lst[i]
```

对于可减信息，用前缀后缀 BIT 维护是一样的。但在当信息不可减且可转化为询问后缀时，能够不翻转序列地维护修改和查询。







<div STYLE="page-break-after: always;"></div>

# Segment Tree

**线段树 (Segment Tree)** 用于维护满足 **结合律** 的区间信息，支持在 $\Theta(\log n)$ 的时间内 **区间修改** 和 **区间查询**。

线段树是一棵 **平衡二叉树**，树上每个 **节点** $\boldsymbol{p}$ 都存储一条 **线段（区间）** $\boldsymbol{[l,r]}$ 的某个性质，节点 $p$ 的左右子节点的编号分别为 $2p$ 和 $2p+1$ ，分别储存 $[l, \mathrm{mid}]$ 和 $[\mathrm{mid}+1, r]$。

修改时，使用 **懒标记** $\boldsymbol{\mathrm{mark}_p}$，表示该节点 $p$ 对应的区间上每一个点都要加上某个数，用到它的 **子区间** 的时候，再向下 **传递** 修改。

预处理时间复杂度 $\Theta(n)$，查询或修改时间复杂度 $\Theta(\log n)$。

例：维护区间的和，修改操作是区间增加某数

```cpp
struct SEGTREE {
    ll val; // 区间和
    ll mrk; // 懒标记
} tree[N << 2];
int n, arr[N];
#define ls p<<1
#define rs p<<1|1
#define mid (cl+cr>>1)

// 在这两个函数中写需要维护的东西
inline void push_up(SEGTREE& p, SEGTREE l, SEGTREE r) {
    p.val = l.val + r.val;
}
inline void push_down(SEGTREE& p, int mrk, int len) {
    p.val += mrk * len;
    p.mrk += mrk;
}

// 下传与回溯
inline void push_up(int p) { push_up(tree[p], tree[ls], tree[rs]); }
inline void push_down(int p, int len) {
    if (len <= 1) return;                                // 传递到树的叶 结束
    push_down(tree[ls], tree[p].mrk, len - len / 2);     // 左子区间传递
    push_down(tree[rs], tree[p].mrk, len / 2);           // 右子区间传递
    tree[p].mrk = 0;                                     // 传递后 标记清空
}

// 建树 当前节点区间[cl,cr] 节点编号p
void build(int p = 1, int cl = 1, int cr = n) {
    tree[p].mrk = 0;                                     // 初始化
    if (cl == cr) return tree[p].val = arr[cl], void();  // 到树的叶 结束
    build(ls, cl, mid);                                  // 左子区间[l,mid]
    build(rs, mid + 1, cr);                              // 右子区间[mid+1,r]
    push_up(p);                                          // 更新当前节点信息
}

// 查询[l,r] 当前节点区间[cl,cr] 节点编号p
SEGTREE query(int l, int r, int p = 1, int cl = 1, int cr = n) {
    if (cl >= l && cr <= r) return tree[p];  // 查询的区间包含当前节点区间 返回当前节点区间
    push_down(p, cr - cl + 1);
    if (mid >= r) return query(l, r, ls, cl, mid);
    if (mid < l)  return query(l, r, rs, mid + 1, cr);
    SEGTREE ans;
    push_up(ans, query(l, r, ls, cl, mid), query(l, r, rs, mid + 1, cr));
    return ans;
}

// 为[l,r]每个数加d 当前节点区间[cl,cr] 节点编号p
void update(int l, int r, ll d, int p = 1, int cl = 1, int cr = n) {
    if (cl >= l && cr <= r) return push_down(tree[p], d, cr - cl + 1);  // 查询的区间包含当前节点区间
    push_down(p, cr - cl + 1);
    if (mid >= l) update(l, r, d, ls, cl, mid);
    if (mid < r)  update(l, r, d, rs, mid + 1, cr);
    push_up(p);    // 更新当前节点信息
}

void eachT() {
    n = read();
    for (int i = 1; i <= n; ++i) arr[i] = read();
    build();
    for (int q = read(); q--; ) op = read() ? update(l, r, d) : print(query(l, r).val);
}
```

> 例题 [洛谷P3372](https://www.luogu.com.cn/problem/P3372)，[洛谷P3373](https://www.luogu.com.cn/problem/P3373)（利于理解懒标记）


<div STYLE="page-break-after: always;"></div>

### SegTree.1 动态开点

当值域为 $v$ 时，普通的线段树的空间复杂度是 $\Theta(4v)$。如果 $v$ 巨大，但查询次数 $q$ 较小时，边修改边建树，这样空间的复杂度是 $\Theta(q\log v)$。

递归的起点是区间 $[L,R]$，依数据范围修改，允许是负数。注意，这里的 `>>1` 不能写为 `/2`。

```cpp
struct SEGTREE {
    ll val, mrk;
    int ls, rs;
} tree[N];
int L, R, pcnt;  // 递归起点 节点时间戳
#define mid (cl+cr>>1)

// 在这两个函数中写需要维护的东西
inline void push_up(SEGTREE& p, SEGTREE l, SEGTREE r) {
    p.val = l.val + r.val;
}
inline void push_down(int& p, int mrk, int len) {
    if (!p) p = ++pcnt;
    tree[p].val += mrk * len;
    tree[p].mrk += mrk;
}

inline void push_up(int p) { push_up(tree[p], tree[tree[p].ls], tree[tree[p].rs]); }
inline void push_down(int p, int len) {
    if (!tree[p].mrk) return;
    push_down(tree[p].ls, tree[p].mrk, len - len / 2);
    push_down(tree[p].rs, tree[p].mrk, len / 2);
    tree[p].mrk = 0;
}

SEGTREE query(int l, int r, int p = 1, int cl = L, int cr = R) {
    if (cl >= l && cr <= r) return tree[p];
    push_down(p, cr - cl + 1);
    if (mid >= r) return query(l, r, tree[p].ls, cl, mid);
    if (mid < l)  return query(l, r, tree[p].rs, mid + 1, cr);
    SEGTREE ans;
    push_up(ans, query(l, r, tree[p].ls, cl, mid), query(l, r, tree[p].rs, mid + 1, cr));
    return ans;
}

void update(int l, int r, ll d, int p = 1, int cl = L, int cr = R) {
    if (cl >= l && cr <= r) return push_down(p, d, cr - cl + 1);
    push_down(p, cr - cl + 1);
    if (mid >= l) update(l, r, d, tree[p].ls, cl, mid);
    if (mid < r)  update(l, r, d, tree[p].rs, mid + 1, cr);
    push_up(p);
}

void eachT() {
    int n = read();
    L = 1, R = n, pcnt = 1;  // 指定递归起点为初始化数据范围[L,R] 初始化节点时间戳
    for (int q = read(); q--; ) op = read() ? update(l, r, d) : print(query(l, r).val);
}
```



<div STYLE="page-break-after: always;"></div>

### SegTree.2 线段树二分

**具有单调性才能二分！**

例：非负序列，单点修改，全局查询前缀和大于 $S$ 的第一个位置 $p$，$n \leqslant 5\times 10^{5},\ q \leqslant 5\times 10^{6}$。

线段树维护区间和。对于朴素二分，每次 `check` 需查询单点前缀和，一次询问复杂度 $\Theta(\log^{2}n)$；而线段树的分治结构 **合并二分和查询的过程**，实现 $\Theta(\log n)$ 的复杂度。

考察二分过程，第一次查询 $[1, n]$ 中点 $m$ 处的前缀和 $s_m$，它等于线段树根节点左儿子的权值。若 $s_m > S$，说明答案在 $[1, m]$，否则答案在 $[m + 1, n]$。对于前者，第二次查询 $[1, m]$ 中点 $m_{l}$ 处的前缀和 $s_{m_{l}}$，它等于根节点左儿子的左儿子的权值；对于后者，第二次查询 $[m + 1, r]$ 中点 $m_{r}$ 处的前缀和，它等于 $s_m$ 加上根节点右儿子的左儿子的权值……不断递归，直至进入叶子节点。

以 $\text{cur}$ 记录已查询到的累计前缀和。递归至节点 $p$ 时，查询左儿子的权值 $\text{val}_{p_{l}}$，比较 $\text{cur}+\text{val}_{p_{l}}$ 与 $S$ 的大小，如果 $\text{cur}+\text{val}_{p_{l}}>S$，向左递归，$\text{cur}$ 不变；否则向右递归，并 $\text{cur}:=\text{cur}+\text{val}_{p_{l}}$。

```cpp
// 全局二分 已查询到的累计前缀和&cur 限制lim 当前节点区间[cl,cr] 节点编号p
int bisrch(ll& cur, ll lim, int p = 1, int cl = 1, int cr = n) {
    if (cur + tree[p].val <= lim) return cur += tree[p].val, -1; // 全加上都不够 那目标位置不在当前区间 全加上然后返回-1
    if (cl == cr) return cl;                    // 到叶子 既然能过的来那一定是目标
    push_down(p);
    int res = bisrch(cur, lim, ls, cl, mid);    // 先向左递归找
    if (res != -1) return res;                  // 左边不是-1说明左边有解 那不用管右边了
    return bisrch(cur, lim, rs, mid + 1, cr);   // 左边无解再看右边 右边无论有没有解都是看右边
}
```

在区间 $[l, r]$ 查询前缀和大于 $S$ 的第一个位置 $p$，大同小异，直接给出代码：

```cpp
// 区间[l,r]局部二分 已查询到的累计前缀和&cur 限制lim 当前节点区间[cl,cr] 节点编号p
int bisrch(int l, int r, ll& cur, ll lim, int p = 1, int cl = 1, int cr = n) {
    if (cl >= l && cr <= r) {  // 查询区间包含当前区间
        if (cur + tree[p].val <= lim) return cur += tree[p].val, -1; // 全加上都不够 那目标位置不在当前区间 全加上然后返回-1
        if (cl == cr) return cl;                                     // 到叶子 是目标
        // 否则继续二分
    }
    push_down(p);
    if (mid >= l) {
        int res = bisrch(l, r, cur, lim, ls, cl, mid);               // 先向左递归找
        if (res != -1) return res;                                   // 左边有解
    }
    if (mid < r) return bisrch(l, r, cur, lim, rs, mid + 1, cr);     // 左边无解再看右边
    return -1;
}
```

线段树二分灵活性很强，没有绝对固定的模板。





<div STYLE="page-break-after: always;"></div>


### SegTree.3 权值线段树

用线段树维护 **桶**，在 $\Theta(\log v)$ 的时间内查询某个范围内的数出现的总次数、第 $k$ 大数、前驱后继等。空间复杂度 $\Theta(q\log v)$。

权值线段树无需懒标记 `mrk`，由于是单点更新，也无需 `push_down` 和 `push_up` 函数，而是递归到底、区间相加，代码相对于普通线段树更短，这也是较 **平衡树** 的优势，但是当值域较大、询问较多时空间占用较大。

```cpp
struct SEGTREE {
    int val, ls, rs;
} tree[N];
int L, R, rt, pcnt;  // 递归起点 根节点 节点时间戳
#define mid (cl+cr>>1)

void update(int x, int d, int& p = rt, int cl = L, int cr = R) {
    if (!p) p = ++pcnt;
    if (cl == cr) return tree[p].val += d, void();
    if (x <= mid) update(x, d, tree[p].ls, cl, mid);
    if (x > mid)  update(x, d, tree[p].rs, mid + 1, cr);
    tree[p].val = tree[tree[p].ls].val + tree[tree[p].rs].val;
}

int query(int l, int r, int p = 1, int cl = L, int cr = R) {
    if (cl >= l && cr <= r) return tree[p].val;
    if (mid >= r) return query(l, r, tree[p].ls, cl, mid);
    if (mid < l)  return query(l, r, tree[p].rs, mid + 1, cr);
    return query(l, r, tree[p].rs, mid + 1, cr) + query(l, r, tree[p].ls, cl, mid);
}

inline void insert(int x) { update(x, 1); }               // 插入
inline void remove(int x) { update(x, -1); }              // 删除
inline int countl(int x) { return query(L, x - 1); }
inline int countg(int x) { return query(x + 1, R); }
inline int rankof(int x) { return countl(x) + 1; }        // 排名 (比当前数小的数的个数+1)
int kthnum(int x, int p = rt, int cl = L, int cr = R) {   // 指定排名的数
    if (cl == cr) return cl;
    if (tree[tree[p].ls].val >= x) return kthnum(x, tree[p].ls, cl, mid);    // 往左搜
    else return kthnum(x - tree[tree[p].ls].val, tree[p].rs, mid + 1, cr);   // 往右搜
}
inline int prenum(int x) { return kthnum(countl(x)); }  // 前驱
inline int sucnum(int x) { return kthnum(tree[rt].val - countg(x) + 1); }  // 后继

void eachT() {
    L = -1e8, R = 1e8, rt = 0, pcnt = 0;  // 指定递归起点 初始化根节点 节点时间戳
    for (int q = read(); q--; ) {
        insert(x); remove(x);
        print(rankof(x), kthnum(x), prenum(x), sucnum(x));
    }
}
```


> 例题 [洛谷P3369](https://www.luogu.com.cn/problem/P3369)（模板），[洛谷P4309 最长上升子序列](https://www.luogu.com.cn/problem/P4309)（从前向后将 $i$ 插入到位置 $p_i$，如果倒着看插入过程（即把最终序列 $b$ 逐个删除），每次删除的数 $i$ 在剩余序列的第 $a_{i}$ 位。模拟这个删数过程，用权值线段树维护第 $k$ 小，就能得到序列 $b$） 




<div STYLE="page-break-after: always;"></div>

### SegTree.4 线段树合并

维护 **从若干子结构合并成大结构** 的合并过程中所有出现过的结构的完整信息，如 **并查集**、树上每个节点的 **子树信息** 等。时空复杂度与开的总点数相同，为线性对数。

动态开点，`rt[p]` 表示节点 $p$ 所在树的根节点 unix。递归地将两棵线段树的节点信息对应合并：

```cpp
// 将树上节点x,y合并到节点z
int merge(int x, int y, int cl = L, int cr = R) {
    if (!x || !y) return x | y;                  // 一方为空 递归到叶 返回非空的那个节点
    int z = ++pcnt;
    if (cl == cr) return /* 合并叶子节点x,y 将y的信息传递给x */, z;
    push_down(x), push_down(y);
    tree[z].ls = merge(tree[x].ls, tree[y].ls, cl, mid);      // x的左节点和y的左节点合并为z的左节点 
    tree[z].rs = merge(tree[x].rs, tree[y].rs, mid + 1, cr);  // x的右节点和y的右节点合并为z的右节点 
    push_up(z);                                               // 更新当前节点信息
    return z;
}

void eachT() {
    L = 1, R = n, pcnt = 0;
    for (int i = 1; i <= n; ++i) {
        rt[i] = ++pcnt;          // 建立根节点
        update(num, 1, rt[i]);   // 将num插入权值线段树i 指定树的根是rt[i]
    }  // 建n颗权值线段树
    for (int q = read(); q--; ) {
        rt[x] = rt[y] = merge(rt[x], rt[y]);     // 从树根开始合并x,y 并将x和y的根设置为新根
    }
}
```

上面的写法保留原来两棵线段树的信息，创建了一棵新树，因此需要额外的一倍空间。如果不要求保留原来的信息，优先选择直接把第二棵树的信息加到第一棵树上，这不需要新建节点，但会毁掉原先的两棵树：

```cpp
// 将树上节点x,y合并到节点x
int merge(int x, int y, int cl = L, int cr = R) {
    if (!x || !y) return x | y;      // 一方为空 递归到叶 返回非空的那个节点
    if (cl == cr) return /* 合并叶子节点x,y 将y的信息传递给x */, x;
    push_down(x), push_down(y);
    tree[x].ls = merge(tree[x].ls, tree[y].ls, cl, mid);      // x的左节点和y的左节点合并为x的左节点 
    tree[x].rs = merge(tree[x].rs, tree[y].rs, mid + 1, cr);  // x的右节点和y的右节点合并为x的右节点 
    push_up(x);                                               // 更新当前节点信息
    return x;
}
```

不可以把自己和自己合并！


<div STYLE="page-break-after: always;"></div>


### SegTree.5.1 线段树上树

回忆 **树的 DFS 序**：每个节点在 DFS 中的进出栈的时间序列。每棵子树的 DFS 序都是连续的，且子树上根节点 DFS 序最小。因此，$u$ 的子树上所有节点的编号介于 `dfsn[u]` 和 `dfsnR[u]` 之间，其中 `dfsnR[u]` 是结束遍历 $u$ 的子树的最后一个节点的 DFS 序。

```cpp
std::vector<int> E[N];
int unix, dfsn[N], dfsnR[N];  // DFS树: 时间戳 DFS序 子树的最大DFS序
void dfs(int u, int fau = 0) {
    dfsn[u] = ++unix;
    for (auto v : E[u]) {
        if (v != fau) dfs(v, u);
    }
    dfsnR[u] = unix;
}
```

这个良好性质 **将树转化为 (广义的) 区间**，对 $u$ 的 **子树** 的操作即是对 **区间** `dfsn[u]` $\sim$ `dfsnR[u]` 的操作。

这支持在 $\Theta(\log n)$ 的时间内实现单点修改查询、子树修改查询、路径修改查询，在树根固定的问题中应用广泛。

具体代码实现：[Segment Tree on Tree](https://kobicgend.top/posts/5ba6d4a3)

<br>

### SegTree.5.2 线段树优化建图

有 $n$ 个点，$q$ 个询问，每次询问给出一个操作，在这些操作后求 $1$ 到 $n$ 的最短路。$n \leqslant 1\times 10^{5},\ q \leqslant 1\times 10^{5}$。
- `1 u v w`：连一条 $u\to v$ 的有向边，权值为 $w$；
- `2 u l r w`：对于所有 $i\in[l,r]$，连一条 $u\to i$ 的有向边，权值为 $w$；
- `3 u l r w`：对于所有 $i\in[l,r]$，连一条 $i\to u$ 的有向边，权值为 $w$；
- `4 l1 r1 l2 r2 w`：对于所有 $i\in[l_{1},r_{1}],j\in[l_{2},r_{2}]$，连一条 $i\to j$ 的有向边，权值为 $w$；

无论何种最短路方法，从建图就卡住了。注意到，题给建图是区间，联想到线段树，可以利用线段树减少连边数量，从而降低复杂度。

