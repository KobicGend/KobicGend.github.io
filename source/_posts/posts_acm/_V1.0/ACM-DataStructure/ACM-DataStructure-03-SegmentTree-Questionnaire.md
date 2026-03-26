---
title: "CUC-ACM-2024-Summer-Training Round #1 线段树进阶 - 题解"
tags:
  - 算法
  - 數據結構
  - 筆記
  - ACM
  - 題解
categories:
  - - 筆記
    - 算法筆記
abbrlink: 4c0e75ca
highlight_shrink: true
date: 2024-06-15 17:00:00
updated: 2024-07-08 17:00:00
description:
---

<div style="text-align:left;"> <p><font size="4px">
<a href="https://kobicgend.top/posts/8303a602.html">讲解</a>；
<a href="https://kobicgend.top/pdf/JINJIESegmentTree.pdf">课件</a>；
<a href="https://vjudge.net.cn/contest/638487">练习</a>；
<a href="https://kobicgend.top/posts/4c0e75ca.html">题解</a></font></p></div>

<div style="text-align:left;"> <p><font size="5px"><a href="https://kobicgend.top/posts/4c0e75ca.html">更好的阅读体验</a></font></p></div>


| ID  | Difficulty | Topic         | Link                                                                                     |
| --- | ---------- | ------------- | ---------------------------------------------------------------------------------------- |
| A   | ⭐⭐⭐        | 权值线段树、贪心博弈    | [2022 ICPC 沈阳 I. Quartz Collection](https://codeforces.com/gym/104160/problem/I)         |
| B   | ⭐          | （例题）线段树区间赋值   | [CF915E. Physical Education Lessons](https://codeforces.com/problemset/problem/915/E)    |
| C   | ⭐          | （例题）权值线段树     | [洛谷P3369 【模板】普通平衡树](https://www.luogu.com.cn/problem/P3369)                              |
| D   | ⭐⭐⭐        | （例题）并查集、线段树合并 | [BZOJ4399. 魔法少女LJJ](https://vjudge.net.cn/problem/BZOJ-4399/origin)                      |
| E   | ⭐⭐         | （例题）树、线段树合并   | [CF208E. Blood Cousins](https://codeforces.com/problemset/problem/208/E)                 |
| F   | ⭐⭐⭐        | （例题）线段树二分     | [abc292Ex - Rating Estimator](https://atcoder.jp/contests/abc292/tasks/abc292_h?lang=en) |
| G   | ⭐⭐⭐        | 线段树二分         | [CF1440E. Greedy Shopping](https://codeforces.com/problemset/problem/1440/E)             |
| H   | ⭐⭐⭐⭐       | 树、线段树、状压      | [CF620E. New Year Tree](https://codeforces.com/problemset/problem/620/E)                 |
| I   | ⭐⭐⭐        | 树、线段树合并       | [2022 女生赛 L. 彩色的树](https://codeforces.com/gym/104081/problem/L)                          |
| J   | ⭐⭐⭐⭐⭐      | 权值线段树、动态规划    | [洛谷P4309[TJOI2013]最长上升子序列](https://www.luogu.com.cn/problem/P4309)                       |
| K   | ⭐⭐         | 图论、线段树综合应用、思维 | [洛谷P5025[SNOI2017]](https://www.luogu.com.cn/problem/P5025)                              |
| L   | ⭐          | 树、线段树合并       | [CF1009F. Dominant Indices](https://codeforces.com/problemset/problem/1009/F)            |
|     |            |               |                                                                                          |



<div STYLE="page-break-after: always;"></div>

# A. Quartz Collection

> 当时完美地解决了 Step1，但是不会线段树。

## Tag

Games, Greedy, Data Structures

## Description

$n$ 种石头，每种石头有两块，价值分别为 $a_{i},\ b_{i}$。A 和 B 按照 ABBAABBAABBA 的顺序依次购买一块石头。

规定：
- 每种石头每个人只能买一次，即对于每种石头，要么买第一块，要么买第二块；
- 对于每种石头，只有当第一块被买走才能买第二块。

两个人都最小化买齐 $n$ 种石头的花费，求 A 的最小花费。按顺序给出 $m$ 次永久修改，每次修改给出这个答案。

## Notes

### Step1 假博弈真贪心

这部分比较简单。

称 $a_{i} - b_{i}$ 为 *代价*，两个人均希望代价尽可能小，故按代价从小到大排序。
- 对于 $a_{i} \leqslant b_{i}$ 的部分，两人均优先买第一块，于是按购买顺序依次买第一块，即 A 买 $a_{0}$，B 买 $a_{1}$，B 买 $a_{2}$，A 买 $a_{3}$…… A 买到的第一块石头的下标 $i,\ i \equiv 0, 3 \pmod 4$。
- 对于 $a_{i} > b_{i}$ 的部分，两人均避免买第一块，于是能买第二块就买第二块，否则选择代价最小的第一块购买。考虑 $a_{i} \leqslant b_{i}$ 都买完后轮到了谁：
    - 若 $a_{i} \leqslant b_{i}$ 的数量为奇数，设有 $m$ 个。
      这部分的购买情况是 ABB / AAB / BAABBAA… 或 ABBAA / BBAAB / BAABBAA…，无论哪种情况，$a_{i} \leqslant b_{i}$ 都买完后都轮到了 B，且为 BAABBAA。
      于是 B 先买代价最小的 $a_{m}$，然后 A 买对应的第二块 $b_{m}$，再买 $a_{m+1}$，B 买 $b_{m+1},\ a_{m+2}$……
      A 买到的第一块石头的下标 $i,\ i-m \equiv 1, 3 \pmod 4$。
    - 若 $a_{i} \leqslant b_{i}$ 的数量为偶数，类似地分析，ABBA / ABBA / ABBAABB，$a_{i} \leqslant b_{i}$ 都买完后都轮到了 A，于是 A 买到的第一块石头的下标 $i,\ i-m \equiv 0, 2 \pmod 4$。
      将上面两部分的结果相加，再加上 $\sum b_{i}$，即是答案。

### Step2 线段树

这部分也比较简单。

首先明确，因涉及排名，我们需要建立 **权值线段树**，具体地，以代价 $a_{i} - b_{i}$ 建立权值线段树。

**维护什么？**
- 每个数出现的次数 `siz`，常规的权值线段树。
- 排名为 $i$ 的数的总和，记为 `sum[4]`，其中 `tree[p].sum[k]` 表示节点 $p$ 对应的区间 $[l,r]$ 中，排名为 $i,\ i \equiv k \pmod 4$ 的数的总和。

**如何更新？** 考察两个方面，即 `push_up` 和对叶的操作。
- `push_up`：
    - 对于 `siz`，常规操作，`tree[p].siz = tree[ls].siz + tree[rs].siz`；
    - 对于 `sum[4]`，感性地理解一下，不难得到 `tree[p].sum[i] = tree[ls].sum[i] + tree[rs].sum[i-m]`，即左节点排名为 $i,\ i \equiv k$ 的总和加上右节点排名为 $i,\ i-m \equiv k$ 的总和相加，其中 $m$ 是左节点的数的数量。
- 对叶的操作：
    - 对于 `siz`，常规操作，`tree[p].siz += d`；
    - 对于 `sum[4]`，因为叶只有一个数，那排名就是 0，容易想到 `tree[p].val[0] += x * d`，但这样是错误的，原因是 **相同的数也应当要排名**，具体写法参见代码。

**如何查询？**
- 注意到查询只需要查询根节点 $\mathrm{rt}$，所以只需写一个简略的函数：置值域为 $[-10^{5},10^{5}]$，这样，根节点的左儿子即是 $a_{i} - b_{i} \leqslant 0$，右儿子即是 $a_{i} - b_{i} > 0$，**天然地将树分成了两块**。根据 Step1 的推断，对于左儿子，查询 `sum[0] + sum[3]`，对于右儿子，视左儿子的节点个数分情况讨论，再将两者求和即可。

## Code

```cpp
#include <cstdio>
using ll = long long;
const int N = 2e5 + 8;

inline ll read() {
    ll Y = getchar(), S = 0, C = 1;
    while (Y > 57 || Y < 48) { if (Y == 45) C = -1; Y = getchar(); }
    while (Y <= 57 && Y >= 48) { S = (S << 3) + (S << 1) + Y - 48; Y = getchar(); }
    return S * C;
}

struct SEGTREE {
    int siz;
    ll sum[4];
} tree[N << 2];
int L = -1e5, R = 1e5;  // 指定递归起点
int n, m;
ll a[N], b[N], sum0;
#define ls p<<1
#define rs p<<1|1
#define mid (cl+cr>>1)

// 在这个函数中写需要维护的东西
void push_up(int p) {
    tree[p].siz = tree[ls].siz + tree[rs].siz;
    for (int i = 0; i < 4; ++i) {
        tree[p].sum[i]
            = tree[ls].sum[i]
            + tree[rs].sum[((i - tree[ls].siz) % 4 + 4) % 4];
    }
}

// 更新
void update(int x, int d, int p = 1, int cl = L, int cr = R) {
    if (cl == cr) {  // 叶子的处理
        // WA: tree[p].sum[0] += x * d;
        if (d == 1) tree[p].sum[tree[p].siz % 4] += x;
        else  tree[p].sum[(tree[p].siz - 1) % 4] -= x;
        tree[p].siz += d;
        return;
    }
    if (x <= mid) update(x, d, ls, cl, mid);
    if (x > mid)  update(x, d, rs, mid + 1, cr);
    push_up(p);
}

// 查询
ll query(int p = 1) {
    ll sum1 = tree[ls].sum[0] + tree[ls].sum[3];  // 左节点a_i-b_i<0的情形
    ll sum2 = tree[ls].siz & 1
        ? tree[rs].sum[1] + tree[rs].sum[3]
        : tree[rs].sum[0] + tree[rs].sum[2];      // 右节点a_i-b_i>0的情形 需分两种情况讨论
    return sum1 + sum2 + sum0;
}

// 权值线段树模板
inline void insert(int x) { update(x, 1); }
inline void remove(int x) { update(x, -1); }

int main() {
    n = read(), m = read();
    for (int i = 1; i <= n; ++i) {
        a[i] = read(), b[i] = read();
        sum0 += b[i];
        insert(a[i] - b[i]);
    }
    printf("%lld\n", query());

    while (m--) {
        int pos = read(), aa = read(), bb = read();
        remove(a[pos] - b[pos]);
        insert(aa - bb);
        sum0 = sum0 - b[pos] + bb;
        a[pos] = aa;
        b[pos] = bb;
        printf("%lld\n", query());
    }
    return 0;
}
```



<div STYLE="page-break-after: always;"></div>

# B. Physical Education Lessons

### Notes

修改操作是区间赋值，只需

```cpp
struct SEGTREE {
    ll val;       // 区间和
    ll mrk = -1;  // 懒标记
} tree[N << 2];
int n, arr[N];
#define mid (cl+cr>>1)

// 在这两个函数中写需要维护的东西
inline void push_up(SEGTREE& p, SEGTREE l, SEGTREE r) {
    p.val = l.val + r.val;
}
inline void push_down(SEGTREE& p, int mrk, int len) {
    p.val = mrk * len;
    p.mrk = mrk;
}

// 下传与回溯
inline void push_up(int p) { push_up(tree[p], tree[ls], tree[rs]); }
inline void push_down(int p, int len) {
    if (tree[p].mrk == -1) return;           // 这里没有标记 返回
    push_down(tree[ls], tree[p].mrk, len - len / 2);     // 左子区间传递
    push_down(tree[rs], tree[p].mrk, len / 2);           // 右子区间传递
    tree[p].mrk = -1;                                    // 传递后 标记清空
}
```

### Code

```cpp
#include <cstdio>
using ll = long long;
const int N = 16000000 + 8;

inline ll read() {
    ll Y = getchar(), S = 0, C = 1;
    while (Y > 57 || Y < 48) { if (Y == 45) C = -1; Y = getchar(); }
    while (Y <= 57 && Y >= 48) { S = (S << 3) + (S << 1) + Y - 48; Y = getchar(); }
    return S * C;
}

struct SEGTREE {
    int val, mrk = -1;
    int ls, rs;
} tree[N];
int L, R, pcnt;
#define mid (cl+cr>>1)

// 在这两个函数中写需要维护的东西
inline void push_up(SEGTREE& p, SEGTREE l, SEGTREE r) {
    p.val = l.val + r.val;
}
inline void push_down(int& p, int x, int len) {
    if (!p) p = ++pcnt;     // 开点
    tree[p].val = x * len;
    tree[p].mrk = x;
}

// 下传与回溯
inline void push_up(int p) { push_up(tree[p], tree[tree[p].ls], tree[tree[p].rs]); }
inline void push_down(int p, int len) {
    if (len <= 1 || tree[p].mrk == -1) return;          // 这里没有标记 返回
    push_down(tree[p].ls, tree[p].mrk, len - len / 2);  // 左子区间传递
    push_down(tree[p].rs, tree[p].mrk, len / 2);        // 右子区间传递
    tree[p].mrk = -1;                                   // 传递后 标记清空
}

SEGTREE query(int l, int r, int p = 1, int cl = L, int cr = R) {
    if (cl >= l && cr <= r) return tree[p];  // 查询的区间包含当前节点区间 返回当前节点区间
    push_down(p, cr - cl + 1);
    if (mid >= r) return query(l, r, tree[p].ls, cl, mid);
    if (mid < l)  return query(l, r, tree[p].rs, mid + 1, cr);
    SEGTREE ans;
    push_up(ans, query(l, r, tree[p].rs, mid + 1, cr), query(l, r, tree[p].ls, cl, mid));
    return ans;
}

void update(int l, int r, int d, int p = 1, int cl = L, int cr = R) {
    if (cl >= l && cr <= r) return push_down(p, d, cr - cl + 1);
    push_down(p, cr - cl + 1);
    if (mid >= l) update(l, r, d, tree[p].ls, cl, mid);
    if (mid < r)  update(l, r, d, tree[p].rs, mid + 1, cr);
    push_up(p);
}

int main() {
    int n = read();
    L = 1, R = n, pcnt = 0;  // 初始化数据范围[L,R]
    update(1, n, 1);
    for (int q = read(); q--; ) {
        int l = read(), r = read(), op = read();
        update(l, r, op - 1);
        printf("%d\n", query(1, n).val);    // 等价于 tree[1].val
    }
    return 0;
}
```


<div STYLE="page-break-after: always;"></div>

# C

模板。

```cpp
#include <cstdio>

using ll = long long;

inline ll read() {
    ll Y = getchar(), S = 0, C = 1;
    while (Y > 57 || Y < 48) { if (Y == 45) C = -1; Y = getchar(); }
    while (Y <= 57 && Y >= 48) { S = (S << 3) + (S << 1) + Y - 48; Y = getchar(); }
    return S * C;
}

const int N = 16000000 + 8;
struct SEGTREE {
    int val, ls, rs;
} tree[N];
int L, R, rt, pcnt;  // 递归起点 根节点 节点时间戳

void update(int x, int d, int& p = rt, int cl = L, int cr = R) {
    if (!p) p = ++pcnt;
    if (cl == cr) return tree[p].val += d, void();
    int mid = (cl + cr) >> 1;
    if (x <= mid) update(x, d, tree[p].ls, cl, mid);
    if (x > mid)  update(x, d, tree[p].rs, mid + 1, cr);
    tree[p].val = tree[tree[p].ls].val + tree[tree[p].rs].val;
}

int query(int l, int r, int p = 1, int cl = L, int cr = R) {
    if (cl >= l && cr <= r) return tree[p].val;
    int mid = (cl + cr) >> 1;
    if (mid >= r) return query(l, r, tree[p].ls, cl, mid);
    if (mid < l)  return query(l, r, tree[p].rs, mid + 1, cr);
    return query(l, r, tree[p].rs, mid + 1, cr) + query(l, r, tree[p].ls, cl, mid);
}

inline void insert(int x) { update(x, 1); }  // 插入
inline void remove(int x) { update(x, -1); }  // 删除
inline int countl(int x) { return query(L, x - 1); }
inline int countg(int x) { return query(x + 1, R); }
inline int rankof(int x) { return countl(x) + 1; }  // 排名 (比当前数小的数的个数+1)
int kthnum(int x, int p = rt, int cl = L, int cr = R) {  // 指定排名的数
    if (cl == cr) return cl;
    int mid = (cl + cr) >> 1;
    if (tree[tree[p].ls].val >= x) return kthnum(x, tree[p].ls, cl, mid);  // 往左搜
    else return kthnum(x - tree[tree[p].ls].val, tree[p].rs, mid + 1, cr);  // 往右搜
}
inline int prenum(int x) { return kthnum(countl(x)); }  // 前驱
inline int sucnum(int x) { return kthnum(tree[rt].val - countg(x) + 1); }  // 后继

int main() {
    L = -1e8, R = 1e8, rt = 0, pcnt = 0;  // 指定递归起点 初始化根节点 节点时间戳
    for (int q = read(); q--; ) {
        int op = read(), x = read();
        if (op == 1) insert(x);
        if (op == 2) remove(x);
        if (op == 3) printf("%d\n", rankof(x));
        if (op == 4) printf("%d\n", kthnum(x));
        if (op == 5) printf("%d\n", prenum(x));
        if (op == 6) printf("%d\n", sucnum(x));
    }
    return 0;
}
```




<div STYLE="page-break-after: always;"></div>

# D

### Note

用并查集维护连通性。为了查询每个连通块里的第 $k$ 大，自然想到权值线段树，每个联通块都需要维护一个权值线段树。在并查集合并联通块的同时合并线段树。

操作 1, 2, 7 是基础写法。

操作 3, 4：以 3 为例，把大于 $b$ 的变成 $b$ 等价于把大于 $b$ 的都删除，即区间赋值，再插入这么多个 $b$，即权值线段树的插入，为了知道需要插入多少个，需先查询这段区间数的数量 `siz`。

操作 5：权值线段树的 `kthnum` 模板函数。

操作 6：需维护区间积，显然这个积会爆 LL，稍作转换，维护区间 $\log$ 和。

### Code

```cpp
#include <cstdio>
#include <algorithm>
#include <cmath>
using ll = long long;
const int N = 4e5 + 8, M = 1e7;

inline ll read() {
    ll Y = getchar(), S = 0, C = 1;
    while (Y > 57 || Y < 48) { if (Y == 45) C = -1; Y = getchar(); }
    while (Y <= 57 && Y >= 48) { S = (S << 3) + (S << 1) + Y - 48; Y = getchar(); }
    return S * C;
}

/// ----------------线段树----------------
struct SEGTREE {
    int siz, mrk;
    double mul;
    int ls, rs;
} tree[M];
int  n, L, R, pcnt, rt[N];
#define mid (cl+cr>>1)

// 在这两个函数中写需要维护的东西
inline void push_up(SEGTREE& p, SEGTREE& l, SEGTREE& r) {
    p.siz = l.siz + r.siz;
    p.mul = l.mul + r.mul;
}
void push_down(SEGTREE& p) {
    p.siz = p.mul = 0;
    p.mrk = 1;
}

// 下传与回溯
inline void push_up(int& p) { push_up(tree[p], tree[tree[p].ls], tree[tree[p].rs]); }
void push_down(int& p) {
    if (!tree[p].mrk) return;
    push_down(tree[tree[p].ls]);
    push_down(tree[tree[p].rs]);
    tree[p].mrk = 0;
}

// 插入d个x 当前节点区间[cl,cr] 节点编号p
void update(int x, int d, int& p, int cl = L, int cr = R) {
    if (!p) p = ++pcnt;
    tree[p].siz += d, tree[p].mul += d * log2(x);
    if (cl == cr) return;
    push_down(p);
    if (x <= mid) update(x, d, tree[p].ls, cl, mid);
    else update(x, d, tree[p].rs, mid + 1, cr);
    push_up(p);
}

// [l,r]赋值为0
void update2(int l, int r, int& p, int cl = L, int cr = R) {
    if (!p) return;
    if (l <= cl && cr <= r) return push_down(tree[p]);
    push_down(p);
    if (l <= mid) update2(l, r, tree[p].ls, cl, mid);
    if (r > mid)  update2(l, r, tree[p].rs, mid + 1, cr);
    push_up(p);
}

// 查询[l,r] 当前节点区间[cl,cr] 节点编号p
int query(int l, int r, int& p, int cl = L, int cr = R) {
    if (!p) return 0;
    if (l <= cl && cr <= r) return tree[p].siz;
    push_down(p);
    int ans = 0;
    if (l <= mid) ans += query(l, r, tree[p].ls, cl, mid);
    if (r > mid)  ans += query(l, r, tree[p].rs, mid + 1, cr);
    return ans;
}

// 权值线段树模板
int kthnum(int k, int& p, int cl = L, int cr = R) {
    if (cl == cr) return cl;
    push_down(p);
    if (k <= tree[tree[p].ls].siz) return kthnum(k, tree[p].ls, cl, mid);
    else return kthnum(k - tree[tree[p].ls].siz, tree[p].rs, mid + 1, cr);
}

// 将树上节点x,y合并到节点x
int merge(int x, int y, int cl = L, int cr = R) {
    if (!x || !y) return x | y;      // 一方为空 递归到叶 返回非空的那个节点
    if (cl == cr) return push_up(tree[x], tree[x], tree[y]), x;
    push_down(x), push_down(y);
    tree[x].ls = merge(tree[x].ls, tree[y].ls, cl, mid);      // x的左节点和y的左节点合并为x的左节点 
    tree[x].rs = merge(tree[x].rs, tree[y].rs, mid + 1, cr);  // x的右节点和y的右节点合并为x的右节点 
    push_up(x);                                               // 更新当前节点信息
    return x;
}

/// ----------------并查集----------------
int fa[N];
void init() { for (int i = 1; i < N; ++i) fa[i] = i; }
int find(int x) { return x == fa[x] ? x : fa[x] = find(fa[x]); }
void uno(int x, int y) { fa[y] = x; }

/// ----------------主函数----------------
int main() {
    L = 1, R = 1e9, pcnt = 0;
    init();  // 并查集要初始化
    for (int q = read(); q--; ) {
        int op = read(), a, b, num;
        switch (op) {
            case 1:
                // 新建
                a = read();
                update(a, 1, rt[++n]);  // 将1个a插入新节点的权值线段树
                break;
            case 2:
                // 连接
                a = find(read()), b = find(read());
                if (a == b) break;  // 不能合并自己
                rt[a] = rt[b] = merge(rt[a], rt[b]);
                uno(a, b);
                break;
            case 3:
                // 把小于b的变成b
                a = find(read()), b = read();
                num = query(L, b, rt[a]);  // 需要删除L~b所有的数 共num个
                update2(L, b, rt[a]);          // 删除L~b
                update(b, num, rt[a]);     // 将num个b插入权值线段树n
                break;
            case 4:
                // 把大于b的变成b
                a = find(read()), b = read();
                num = query(b, R, rt[a]);
                update2(b, R, rt[a]);
                update(b, num, rt[a]);
                break;
            case 5:
                // 求a的第b小
                a = find(read()), b = read();
                printf("%d\n", kthnum(b, rt[a]));
                break;
            case 6:
                // 比较a和b的乘积的大小
                a = find(read()), b = find(read());
                printf("%d\n", tree[rt[a]].mul > tree[rt[b]].mul);
                break;
            case 7:
                // 节点a的siz
                a = find(read());
                printf("%d\n", tree[rt[a]].siz);  // 根节点的siz 无需使用query函数
                break;
            default:
                break;
        }
    }
    return 0;
}
```

<div STYLE="page-break-after: always;"></div>

# E

### Notes

某个节点的 $p$-级表亲的深度相同，每次询问即 $v$ 的 $p$-级祖先的深度为 $\text{dep}_{p}$ 的儿子个数。

树具有天然的合并性质，即某节点的子树信息全部来自于它子节点的子树信息。因此先计算子节点，再计算父节点，在树上 DFS 的过程中，将子树的信息合并到父节点上。

```cpp
void dfs(int u) {
    rt[u] = ++pcnt;                    // 为这个节点建一棵树
    update(dep[u], 1, rt[u]);          // 把信息存进去
    for (auto v : E[u]) {
        dfs(v);                        // 先把子树的信息算好
        rt[u] = merge(rt[u], rt[v]);   // 把子树的信息存到这个节点上
    }
    // 计算与这个节点相关的答案
    ...
}
```

回到本题，

**维护什么？**
权值线段树维护 **每一深度的节点个数**，区间加。

**如何更新？**
每遍历一个点，就向权值线段树中插入这个点的深度。

**如何合并？**
权值线段树合并模板，略。

**如何查询？**
先离线存储询问，对于询问 $v,p$，存储 $p$-级祖先和 $\text{dep}_{p}$（如果 $p$-级祖先不存在，则不存储，此时答案是 0）。这样只需要统计每一个节点 $u$ 对应的深度 $\text{dep}$ 的答案，即查询 $u$ 对应的权值线段树上从 $\text{dep}$ 到 $\text{dep}$ 的数量，`query(dep, dep, rt[u])`。

**提示：**

1. 题给的图是森林，可以创建一个虚拟的「超级爸爸」是每个树根的祖先，将森林化为一棵树。（警钟敲烂！新增节点会导致深度 +1，也会导致小于某个深度的节点总数 +1，不理解的看 [CTSC1997 选课](https://www.luogu.com.cn/problem/P2014)）

2. 求 $v$ 的 $p$-级祖先，类似于求 LCA，倍增向上跳：

```cpp
std::vector<int> E[N];
int Log2[N], fa[33][N], dep[N], w[N];
int rt[N];

void initlca(int u, int fau = 0) {
    dep[u] = dep[fau] + 1;
    fa[0][u] = fau;
    for (int i = 1; i <= Log2[dep[u]]; ++i) {
        fa[i][u] = fa[i-1][fa[i-1][u]];
    }  // u的第2^{i-1}个父节点的第2^{i-1}个父节点即第2^{i}个父节点
    for (auto v : E[u]) {
        initlca(v, u);
    }
}

// v的k级祖先
int getast(int v, int k) {
    k = dep[v] - k;  // 期望的深度
    if (k <= 0) return -1;  // v没有k级祖先
    while (dep[v] > k)
        v = fa[Log2[dep[v] - k]][v];
    return v;
}
```

3. 离线存储答案：

```cpp
std::vector<std::pair<int, int> > que[N];
int ans[N];

int q = read();
for (int i = 1; i <= q; ++i) {
    int v = read(), p = read();
    int fav = getast(v, p);             // v的p级祖先
    que[fav].push_back({ dep[v],i });   // 存储每个询问 第二维是编号id
}

/* 计算答案 */

for (int i = 1; i <= q; ++i) {
    printf("%d ", ans[i]);
}
```

### Code

```cpp
#include <cstdio>
#include <vector>
using ll = long long;
const int N = 2e5 + 8, M = 1e7 + 8;

inline ll read() {
    ll Y = getchar(), S = 0, C = 1;
    while (Y > 57 || Y < 48) { if (Y == 45) C = -1; Y = getchar(); }
    while (Y <= 57 && Y >= 48) { S = (S << 3) + (S << 1) + Y - 48; Y = getchar(); }
    return S * C;
}

/// ----------------线段树----------------
struct SEGTREE {
    ll val;
    int ls, rs;
} tree[M];
int L, R, pcnt;  // 递归起点 节点时间戳
#define mid (cl+cr>>1)

inline void push_up(SEGTREE& p, SEGTREE l, SEGTREE r) { p.val = l.val + r.val; }
inline void push_up(int p) { push_up(tree[p], tree[tree[p].ls], tree[tree[p].rs]); }

int query(int l, int r, int p, int cl = L, int cr = R) {
    if (cl >= l && cr <= r) return tree[p].val;
    if (mid >= r) return query(l, r, tree[p].ls, cl, mid);
    if (mid < l)  return query(l, r, tree[p].rs, mid + 1, cr);
    return query(l, r, tree[p].rs, mid + 1, cr) + query(l, r, tree[p].ls, cl, mid);
}

void update(int x, int d, int& p, int cl = L, int cr = R) {
    if (!p) p = ++pcnt;
    if (cl == cr) return tree[p].val += d, void();
    if (x <= mid) update(x, d, tree[p].ls, cl, mid);
    if (x > mid)  update(x, d, tree[p].rs, mid + 1, cr);
    push_up(p);
}

// 将树上节点x,y合并到节点x
int merge(int x, int y, int cl = L, int cr = R) {
    if (!x || !y) return x | y;                               // 一方为空 递归到叶 返回非空的那个节点
    if (cl == cr) return tree[x].val += tree[y].val/* 合并叶子结点x,y 将y的信息传递给x */, x;
    tree[x].ls = merge(tree[x].ls, tree[y].ls, cl, mid);      // x的左节点和y的左节点合并为x的左节点 
    tree[x].rs = merge(tree[x].rs, tree[y].rs, mid + 1, cr);  // x的右节点和y的右节点合并为x的右节点 
    push_up(x);                                               // 更新当前节点信息
    return x;
}

/// ----------------树+LCA----------------
std::vector<int> E[N];
int Log2[N], fa[33][N], dep[N], w[N];
int rt[N];

void initlca(int u, int fau = 0) {
    dep[u] = dep[fau] + 1;
    fa[0][u] = fau;
    for (int i = 1; i <= Log2[dep[u]]; ++i) fa[i][u] = fa[i - 1][fa[i - 1][u]];
    for (auto v : E[u]) initlca(v, u);
}

// v的k级祖先
int getast(int v, int k) {
    k = dep[v] - k;  // 期望的深度
    if (k <= 1) return -1;  // v没有k级祖先
    while (dep[v] > k) v = fa[Log2[dep[v] - k]][v];
    return v;
}

/// ----------------线段树合并----------------
std::vector<std::pair<int, int> > que[N];
int ans[N];

void dfs(int u) {
    rt[u] = ++pcnt;                       // 为这个节点建一棵树
    update(dep[u], 1, rt[u]);             // 把信息存进去
    for (auto v : E[u]) {
        dfs(v);                           // 先把子树的信息算好
        rt[u] = merge(rt[u], rt[v]);      // 把子树的信息存到这个节点上
    }
    // 计算与这个节点相关的答案
    for (auto [depth, id] : que[u]) {
        ans[id] = query(depth, depth, rt[u]) - 1;
    }
}

/// ----------------主函数----------------
int main() {
    int n = read();
    L = 0, R = n + 1, pcnt = 0;
    for (int i = 2; i < N; ++i) Log2[i] = Log2[i / 2] + 1;
    for (int i = 1; i <= n; ++i) {
        int x = read();
        if (!x) x = n + 1;  // 给森林一个虚拟根节点n+1
        E[x].push_back(i);
    }
    initlca(n + 1);
    int q = read();
    for (int i = 1; i <= q; ++i) {
        int v = read(), p = read();
        int fav = getast(v, p);                  // v的p级祖先
        if (fav == -1) ans[i] = 0;               // v没有p级祖先 答案是0
        else que[fav].push_back({ dep[v],i });   // 存储每个询问
    }

    dfs(n + 1);  // 线段树合并 计算答案

    for (int i = 1; i <= q; ++i) {
        printf("%d ", ans[i]);
    }

    return 0;
}
```




<div STYLE="page-break-after: always;"></div>

# F. Rating Estimator

### Notes

将所有数减去 $B$，前缀平均值 $\geqslant B$ 转化为前缀和 $\geqslant 0$，需要找到第一个 $\geqslant 0$ 的前缀。（很经典的分式化整式，回忆 [洛谷 P1419 寻找段落](https://www.luogu.com.cn/problem/P1419)）

与例题不同，本题减去 $B$ 的序列允许是负数，因而 **不具有单调性**，不能直接二分。转换思路，直接以线段树存储 **前缀和序列**。

**维护什么？**
**区间最大值**，线段树上二分找所求。

```cpp
inline void push_up(SEGTREE& p, SEGTREE l, SEGTREE r) {
    p.val = std::max(l.val, r.val);
}
```

**如何二分？**
对于某个节点 $p$，如果在左儿子对应的区间上找到了一个区间最大值 $\geqslant 0$ 的，那答案在左儿子，否则在右儿子上找 $\geqslant 0$ 的，如果都找不到，就说明所求不存在。

```cpp
// 小清新二分 当前节点区间[cl,cr] 节点编号p
int bisrch(int p = 1, int cl = 1, int cr = n) {
    if (tree[p].val < 0) return -1;  // 整个区间不合题意
    if (cl == cr) return cl;         // 到达叶子 返回编号
    push_down(p, cr - cl + 1);
    int res = bisrch(ls, cl, mid);   // 优先看左边
    if (res != -1) return res;       // 左边合题意
    return bisrch(rs, mid + 1, cr);  // 左边不合题意再看右边
}
```

**如何更新？** 
只有单点修改，对于前缀和序列来说，就是进行了一次 **区间加**。（题设没有区间修改，间接证明了这种方法的合理性）

```cpp
inline void push_down(SEGTREE& p, ll mrk, int len) {
    p.val += mrk;
    p.mrk += mrk;
}
```

时间复杂度 $\Theta((n+q)\log n)$，空间 $\Theta(n)$。

### Code

```cpp
#include <cstdio>
#include <algorithm>
using ll = long long;
const int N = 5e5 + 10;

inline ll read() {
    ll Y = getchar(), S = 0, C = 1;
    while (Y > 57 || Y < 48) { if (Y == 45) C = -1; Y = getchar(); }
    while (Y <= 57 && Y >= 48) { S = (S << 3) + (S << 1) + Y - 48; Y = getchar(); }
    return S * C;
}

/// ----------------线段树----------------
struct SEGTREE {
    ll val; // 区间最大值
    ll mrk; // 懒标记
} tree[N << 2];
ll arr[N];
int n;
#define ls (p<<1)
#define rs (p<<1|1)
#define mid (cl+cr>>1)

// 在这两个函数中写需要维护的东西
inline void push_up(SEGTREE& p, SEGTREE l, SEGTREE r) {
    p.val = std::max(l.val, r.val);  // 维护区间最大值
}
inline void push_down(SEGTREE& p, ll mrk, int len) {
    p.val += mrk;
    p.mrk += mrk;
}

// 下传与回溯
inline void push_up(int p) { push_up(tree[p], tree[ls], tree[rs]); }
inline void push_down(int p, int len) {
    if (len <= 1) return;
    push_down(tree[ls], tree[p].mrk, len - len / 2);
    push_down(tree[rs], tree[p].mrk, len / 2);
    tree[p].mrk = 0;
}

// 建树 当前节点区间[cl,cr] 节点编号p
void build(int p = 1, int cl = 1, int cr = n) {
    if (cl == cr) return tree[p].val = arr[cl], void();
    build(ls, cl, mid);
    build(rs, mid + 1, cr);
    push_up(p);
}

// 查询[l,r] 当前节点区间[cl,cr] 节点编号p
SEGTREE query(int l, int r, int p = 1, int cl = 1, int cr = n) {
    if (cl >= l && cr <= r) return tree[p];
    push_down(p, cr - cl + 1);
    if (mid >= r) return query(l, r, ls, cl, mid);
    if (mid < l)  return query(l, r, rs, mid + 1, cr);
    SEGTREE ans;
    push_up(ans, query(l, r, ls, cl, mid), query(l, r, rs, mid + 1, cr));
    return ans;
}

// 为[l,r]每个数加d 当前节点区间[cl,cr] 节点编号p
void update(int l, int r, ll d, int p = 1, int cl = 1, int cr = n) {
    if (cl >= l && cr <= r) return push_down(tree[p], d, cr - cl + 1);
    push_down(p, cr - cl + 1);
    if (mid >= l) update(l, r, d, ls, cl, mid);
    if (mid < r)  update(l, r, d, rs, mid + 1, cr);
    push_up(p);
}

// 小清新二分 当前节点区间[cl,cr] 节点编号p
int bisrch(int p = 1, int cl = 1, int cr = n) {
    if (tree[p].val < 0) return -1;  // 整个区间不合题意
    if (cl == cr) return cl;         // 到达叶子 返回编号
    push_down(p, cr - cl + 1);
    int res = bisrch(ls, cl, mid);   // 优先看左边
    if (res != -1) return res;       // 左边合题意
    return bisrch(rs, mid + 1, cr);  // 左边不合题意再看右边
}

/// ----------------主函数----------------
int a[N];
int main() {
    n = read();
    int B = read(), q = read();

    for (int i = 1; i <= n; ++i) {
        a[i] = read() - B;
        arr[i] = arr[i - 1] + a[i];
    }
    build();

    while (q--) {
        int c = read(), x = read() - B;
        update(c, n, x - a[c]);
        a[c] = x;

        int pos = bisrch();
        if (pos == -1) pos = n;
        printf("%.12lf\n", 1.0 * query(pos, pos).val / pos + B);
    }

    return 0;
}
```



<div STYLE="page-break-after: always;"></div>

# G. Greedy Shopping

### Notes

题给初始序列单调不增，进一步考察，序列在任意时刻都 **单调不增**。（题目的每个条件都是有用的）

操作 1，对 $[1, x]$ **区间赋值**。由于序列单调不增，因此存在一个分界线，它左边都不需要修改，右边都需要修改。这个分界线由 **二分** 获得，具体来说，如果当前区间的最小值 $>y$，则本区间不需要修改，如果当前区间的最大值 $<y$，则应当修改当前区间。需要 **维护区间最大最小值**。

```cpp
void push_up(SEGMENT& p, SEGMENT& l, SEGMENT& r) {
    p.val = l.val + r.val;
    p.mn = std::min(l.mn, r.mn);
    p.mx = std::max(l.mx, r.mx);
}
void push_down(SEGMENT& p, ll mrk, int len) {
    p.val = mrk * len;
    p.mn = mrk, p.mx = mrk;
    p.mrk = mrk;
}
```

上面提到「如果当前区间的最小值 $>y$，则本区间不需要修改」，因此更新函数需要加上一行：

```cpp
void update(int l, int r, int d, int p = 1, int cl = 1, int cr = n) {
    if (cl >= l && cr <= r) {
        if (tree[p].mn >= d) return;
        if (tree[p].mx < d)  return push_down(tree[p], d, cr - cl + 1);
    }
    ...
}
```

操作 2，进行询问区间 $[x, n]$。单调性保证购买的区间连续，为 $[x,p]$，即询问前缀和大于 $y+S_{x-1}$ 的第一个位置 $p$，**线段树二分** 模板。由于返回值是买的个数，二分函数需要稍作修改：

```cpp
int bisrch(int l, int r, int& cur, int p = 1, int cl = 1, int cr = n) {
    if (cl >= l && cr <= r) {
        if (cur < tree[p].mn) {  // 买不起
            return 0;
        }
        if (cur >= tree[p].val) {  // 买
            cur -= tree[p].val;  // 花费tree[p].val
            return cr - cl + 1;  // 买了cr-cl+1个
        }
        if (cl == cr) {
            return 0;  // 递归到叶
        }
    }
    ...
}
```

时间复杂度 $\Theta((n+q)\log n)$，空间 $\Theta(n)$。

### Code

```cpp
#include <cstdio>
#include <algorithm>
using ll = long long;
const int N = 2e5 + 10;

inline ll read() {
    ll Y = getchar(), S = 0, C = 1;
    while (Y > 57 || Y < 48) { if (Y == 45) C = -1; Y = getchar(); }
    while (Y <= 57 && Y >= 48) { S = (S << 3) + (S << 1) + Y - 48; Y = getchar(); }
    return S * C;
}

/// ----------------线段树----------------
struct SEGMENT {
    ll val;     // 区间和
    int mn, mx; // 区间最值
    ll mrk;     // 懒标记
} tree[N << 2];
int arr[N];
int n, m;
#define ls p<<1
#define rs p<<1|1
#define mid (cl+cr>>1)

// 在这两个函数中写需要维护的东西
void push_up(SEGMENT& p, SEGMENT& l, SEGMENT& r) {
    p.val = l.val + r.val;
    p.mn = std::min(l.mn, r.mn);
    p.mx = std::max(l.mx, r.mx);
}
void push_down(SEGMENT& p, ll mrk, int len) {
    p.val = mrk * len;
    p.mn = mrk, p.mx = mrk;
    p.mrk = mrk;
}

// 下传与回溯
void push_up(int p) { push_up(tree[p], tree[ls], tree[rs]); }
void push_down(int p, int len) {
    if (!tree[p].mrk) return;
    push_down(tree[ls], tree[p].mrk, len - len / 2);
    push_down(tree[rs], tree[p].mrk, len / 2);
    tree[p].mrk = 0;
}

// 建树 当前节点区间[cl,cr] 节点编号p
void build(int p = 1, int cl = 1, int cr = n) {
    if (cl == cr) return tree[p] = { arr[cl], arr[cl], arr[cl], 0 }, void();
    build(ls, cl, mid);
    build(rs, mid + 1, cr);
    push_up(p);
}

// 查询[l,r] 当前节点区间[cl,cr] 节点编号p
void update(int l, int r, int d, int p = 1, int cl = 1, int cr = n) {
    if (cl >= l && cr <= r) {
        if (tree[p].mn >= d) return;
        if (tree[p].mx < d)  return push_down(tree[p], d, cr - cl + 1);
    }
    push_down(p, cr - cl + 1);
    if (mid >= l) update(l, r, d, ls, cl, mid);
    if (mid < r)  update(l, r, d, rs, mid + 1, cr);
    push_up(p);
}

// 二分查询[l,r] 当前剩下的钱cur 当前节点区间[cl,cr] 节点编号p
int bisrch(int l, int r, int& cur, int p = 1, int cl = 1, int cr = n) {
    if (cl >= l && cr <= r) {
        if (cur < tree[p].mn) return 0;  // 买不起
        if (cur >= tree[p].val) return cur -= tree[p].val, cr - cl + 1;  // 买了cr-cl+1个，花费tree[p].val
        if (cl == cr) return 0;  // 递归到叶
    }
    push_down(p, cr - cl + 1);
    int ans = 0;
    if (mid >= l) ans += bisrch(l, r, cur, ls, cl, mid);
    if (mid < r)  ans += bisrch(l, r, cur, rs, mid + 1, cr);
    return ans;
}

/// ----------------主函数----------------
int main() {
    n = read(), m = read();
    for (int i = 1; i <= n; ++i) arr[i] = read();
    build();
    while (m--) {
        int op = read(), x = read(), y = read();
        if (op == 1) update(1, x, y);
        else printf("%d\n", bisrch(x, n, y));
    }
    return 0;
}
```


<div STYLE="page-break-after: always;"></div>

# H. New Year Tree

### Notes

因子树修改，以线段树存储每个节点颜色，按 **DFS 序** 将子树修改转化为区间修改。注意到颜色数只有 60，考虑 **状压**，如果有颜色 `x`，则存储 `1ll<<x`。

**维护什么？**
区间按位或，颜色种类即是按位或后的 1 的个数。

```cpp
inline void push_up(SEGTREE& p, SEGTREE l, SEGTREE r) {
    p.val = l.val | r.val;
}
```

**如何修改？**
将子树改为同一种颜色，即是将区间改为同一个数，即区间赋值。

```cpp
inline void push_down(SEGTREE& p, ll mrk) {
    p.val = p.mrk = mrk;\
}
```

**如何查询？**
问子树颜色种类，查询对应区间的按位或，再求其中 1 的个数。

```cpp
inline int count1s(ll x) {
    int ans = 0;
    for (int bit = 0; bit < 64; ++bit)
        if ((1ll << bit) & x) ++ans;
    return ans;
}
```

或者使用效率更高的 `__builtin_popcount()` 函数，即

```cpp
template <typename T>  
unsigned int __builtin_popcount(T u) {  
    u = (u & 0x55555555) + ((u >> 1) & 0x55555555);  
    u = (u & 0x33333333) + ((u >> 2) & 0x33333333);  
    u = (u & 0x0F0F0F0F) + ((u >> 4) & 0x0F0F0F0F);  
    u = (u & 0x00FF00FF) + ((u >> 8) & 0x00FF00FF);  
    u = (u & 0x0000FFFF) + ((u >> 16) & 0x0000FFFF);  
    return u;  
}
```

### Code

```cpp
#include <cstdio>
#include <iostream>
#include <algorithm>
#include <vector>
using ll = long long;
const int N = 4e5 + 10;

inline ll read() {
    ll Y = getchar(), S = 0, C = 1;
    while (Y > 57 || Y < 48) { if (Y == 45) C = -1; Y = getchar(); }
    while (Y <= 57 && Y >= 48) { S = (S << 3) + (S << 1) + Y - 48; Y = getchar(); }
    return S * C;
}

/// ----------------线段树----------------
struct SEGTREE {
    ll val;       // 区间或
    ll mrk = -1;  // 懒标记
} tree[N << 2];
int n;
ll arr[N];
#define ls p<<1
#define rs p<<1|1
#define mid (cl+cr>>1)

// 在这两个函数中写需要维护的东西
inline void push_up(SEGTREE& p, SEGTREE l, SEGTREE r) {
    p.val = l.val | r.val;    // 维护的是区间或
}
inline void push_down(SEGTREE& p, ll mrk) {
    p.val = p.mrk = mrk;      // 典型的区间赋值
}

inline void push_up(int p) { push_up(tree[p], tree[ls], tree[rs]); }
inline void push_down(int p) {
    if (tree[p].mrk == -1) return;       // 这里没有标记 返回
    push_down(tree[ls], tree[p].mrk);    // 左子区间传递
    push_down(tree[rs], tree[p].mrk);    // 右子区间传递
    tree[p].mrk = -1;                    // 传递后 标记清空
}

void build(int p = 1, int cl = 1, int cr = n) {
    tree[p].mrk = -1;                                     // 初始化
    if (cl == cr) return tree[p].val = arr[cl], void();  // 到树的叶 结束
    build(ls, cl, mid);                                  // 左子区间[l,mid]
    build(rs, mid + 1, cr);                              // 右子区间[mid+1,r]
    push_up(p);
}

SEGTREE query(int l, int r, int p = 1, int cl = 1, int cr = n) {
    if (cl >= l && cr <= r) return tree[p];  // 查询的区间包含当前节点区间 返回当前节点区间
    push_down(p);
    if (mid >= r) return query(l, r, ls, cl, mid);
    if (mid < l)  return query(l, r, rs, mid + 1, cr);
    SEGTREE ans;
    push_up(ans, query(l, r, ls, cl, mid), query(l, r, rs, mid + 1, cr));
    return ans;
}

void update(int l, int r, ll d, int p = 1, int cl = 1, int cr = n) {
    if (cl >= l && cr <= r) return push_down(tree[p], d);  // 查询的区间包含当前节点区间
    push_down(p);
    if (mid >= l) update(l, r, d, ls, cl, mid);
    if (mid < r)  update(l, r, d, rs, mid + 1, cr);
    push_up(p);
}

/// ----------------DFS序----------------
std::vector<int> E[N];
int unix, dfsn[N], dfsnR[N];  // DFS树: 时间戳 DFS序 子树的最大DFS序
void dfs(int u, int fau = 0) {
    dfsn[u] = ++unix;
    for (auto v : E[u]) {
        if (v != fau) dfs(v, u);
    }
    dfsnR[u] = unix;
}

/// ----------------主函数----------------
inline int count1s(ll x) {
    int ans = 0;
    for (int bit = 0; bit < 64; ++bit)
        if ((1ll << bit) & x) ++ans;
    return ans;
}
ll w[N];
signed main() {
    n = read();
    int q = read();
    for (int i = 1; i <= n; ++i) {
        w[i] = read();
    }
    for (int i = 2; i <= n; ++i) {
        int u = read(), v = read();
        E[u].push_back(v);
        E[v].push_back(u);
    }
    dfs(1);

    for (int i = 1; i <= n; ++i) {
        arr[dfsn[i]] = 1ll << w[i];
    }
    build();

    while (q--) {
        int op = read();
        if (op == 1) {
            ll x = read(), d = 1ll << read();
            update(dfsn[x], dfsnR[x], d);
        }
        else {
            int x = read();
            ll res = query(dfsn[x], dfsnR[x]).val;
            printf("%d\n", count1s(res));
        }
    }

    return 0;
}
```




<div STYLE="page-break-after: always;"></div>

# I. Colourful Tree

### Notes

**维护什么？**
问颜色的种类数，那就用权值线段树维护 **颜色的种类**，对于叶节点即是 0 或 1，`push_up` 操作是相加。此外，为了知道某种颜色有没有，需要维护这种 **颜色的数量**，只用于计算叶子的颜色数是 0 还是 1，无需 `push_up`。

```cpp
void push_up(int p) {
    tree[p].val = tree[tree[p].ls].val + tree[tree[p].rs].val;
}
void push_down(int& p, int val) {
    tree[p].cnt += val;
    tree[p].val = tree[p].cnt != 0;
}
```

**如何更新？**
与模板题不同，我们没有按深度存储颜色，因为线段树维护的是颜色而不是深度

### Code

```cpp
#include <cstdio>
#include <vector>
#include <algorithm>
using ll = long long;
const int N = 2e5 + 8, M = 1e7 + 8;

inline ll read() {
    ll Y = getchar(), S = 0, C = 1;
    while (Y > 57 || Y < 48) { if (Y == 45) C = -1; Y = getchar(); }
    while (Y <= 57 && Y >= 48) { S = (S << 3) + (S << 1) + Y - 48; Y = getchar(); }
    return S * C;
}

/// ----------------线段树----------------
struct SEGTREE {
    int cnt;   // 叶节点的某种颜色个数
    int val;   // 颜色种类
    int ls, rs;
} tree[M];
int n, pcnt;
#define mid (cl+cr>>1)

void push_up(int p) {
    tree[p].val = tree[tree[p].ls].val + tree[tree[p].rs].val;
}
void push_down(int& p, int val) {
    tree[p].cnt += val;
    tree[p].val = tree[p].cnt != 0;
}

void update(int x, int d, int& p, int cl = 1, int cr = n) {
    if (!p) p = ++pcnt;
    if (cl == cr) return push_down(p, d);
    if (x <= mid) update(x, d, tree[p].ls, cl, mid);
    if (x > mid)  update(x, d, tree[p].rs, mid + 1, cr);
    push_up(p);
}

int merge(int x, int y, int cl = 1, int cr = n) {
    if (!x || !y) return x | y;
    if (cl == cr) return push_down(x, tree[y].cnt), x;
    tree[x].ls = merge(tree[x].ls, tree[y].ls, cl, mid);
    tree[x].rs = merge(tree[x].rs, tree[y].rs, mid + 1, cr);
    push_up(x);
    return x;
}

/// ----------------树+LCA----------------
std::vector<int> E[N], ksons[N];
int Log2[N], fa[22][N], dep[N];
int c[N];

void initlca(int u, int fau = 0) {
    dep[u] = dep[fau] + 1;
    fa[0][u] = fau;
    for (int i = 1; i <= Log2[dep[u]]; ++i) fa[i][u] = fa[i - 1][fa[i - 1][u]];
    for (auto& v : E[u]) if (v != fau) initlca(v, u);
}

// v的k级祖先
int getast(int v, int k) {
    k = dep[v] - k;
    if (k <= 0) return -1;
    while (dep[v] > k) v = fa[Log2[dep[v] - k]][v];
    return v;
}

/// ----------------线段树合并----------------
int ans[N];
void dfs(int u, int fau = 0) {
    for (auto& v : E[u]) {
        if (v == fau) continue;
        dfs(v, u);
        merge(u, v);
    }

    update(c[u], 1, u);         // 添加u的颜色
    for (auto& c : ksons[u]) {
        update(c, -1, u);       // 删除u的k+1层儿子的颜色
    }

    ans[u] = tree[u].val;
}

/// ----------------主函数----------------
int main() {
    n = read();
    int k = read();
    for (int i = 1; i <= n; ++i) {
        c[i] = read();
    }

    // 存边和初始化
    for (int i = 2; i < N; ++i) Log2[i] = Log2[i / 2] + 1;
    for (int i = 1; i < n; ++i) {
        int u = read(), v = read();
        E[u].push_back(v);
        E[v].push_back(u);
    }
    initlca(1);

    // 统计每个节点的k+1层儿子
    for (int i = 1; i <= n; ++i) {
        int x = getast(i, k + 1);
        if (x != -1) ksons[x].push_back(c[i]);
    }

    pcnt = n;
    dfs(1);

    for (int q = read(); q--; ) {
        int x = read();
        printf("%d\n", ans[x]);
    }
    return 0;
}
```





<div STYLE="page-break-after: always;"></div>

# J. LIS

### Notes

设题给序列为 $a$，最终得到的排列为 $b$。先求 $b$。

以 `0 1 0 2 2` 为例：

```
  1
  1     2
3 1     2
3 1   4 2
3 1 5 4 2
```

注意力涣散地观察到，从前向后将 $i$ 插入到位置 $p_i$，如果倒着看插入过程（即把最终序列 $b$ 逐个删除），每次删除的数 $i$ 在剩余序列的第 $a_{i}$ 位。模拟这个删数过程，用权值线段树维护第 $k$ 小，就能得到序列 $b$。

```cpp
for (int i = 1; i <= n; ++i) {
    a[i] = read();
    insert(i);             // 初始化 得到一个满序列 便于删除
}
for (int i = n; i >= 1; --i) {
    int t = kthnum(a[i]);  // 当前剩余序列的第 a_i 位是 b 的第 t 位
    b[t] = i;              // b 的第 t 位是 i
    remove(t);
}
```

现在得到了排列 $b$，用动态规划求每一时刻的最长上升子序列长度。

首先回顾求最长上升子序列的板子：

```cpp
// dp初始化为最大
int mx = 0;
for (int i = 1; i <= n; ++i) {
    int t = std::lower_bound(dp + 1, dp + n + 1, b[i]) - dp;
    dp[t] = b[i];
    mx = std::max(mx, t);
}
printf("%d\n", mx);
```

发现上面的 `t` 就是每时刻的最长上升子序列长度，又由于插入过程是有时间先后的，所以需要将每一时刻的 `t` 按 `b[]` 的大小排序，再取最大值输出。

```cpp
int mx = 0;
for (int i = 1; i <= n; ++i) {
    int t = std::lower_bound(dp + 1, dp + n + 1, b[i]) - dp;
    dp[t] = b[i];
    ans[b[i]] = t;
}
for (int i = 1; i <= n; ++i) {
    printf("%d\n", mx = std::max(mx, ans[i]));
}
```

### Code

```cpp
#include <cstdio>
#include <algorithm>
using ll = long long;
const int N = 3e6 + 8;

inline ll read() {
    ll Y = getchar(), S = 0, C = 1;
    while (Y > 57 || Y < 48) { if (Y == 45) C = -1; Y = getchar(); }
    while (Y <= 57 && Y >= 48) { S = (S << 3) + (S << 1) + Y - 48; Y = getchar(); }
    return S * C;
}

/// ----------------线段树----------------
struct SEGTREE {
    int val;
} tree[N];
int n, pcnt;
#define ls p<<1
#define rs p<<1|1
#define mid (cl+cr>>1)

void update(int x, int d, int p = 1, int cl = 1, int cr = n) {
    if (cl == cr) return tree[p].val += d, void();
    if (x <= mid) update(x, d, ls, cl, mid);
    if (x > mid)  update(x, d, rs, mid + 1, cr);
    tree[p].val = tree[ls].val + tree[rs].val;
}

int query(int l, int r, int p = 1, int cl = 1, int cr = n) {
    if (cl >= l && cr <= r) return tree[p].val;
    if (mid >= r) return query(l, r, ls, cl, mid);
    if (mid < l)  return query(l, r, rs, mid + 1, cr);
    return query(l, r, rs, mid + 1, cr) + query(l, r, ls, cl, mid);
}

// 权值线段树
inline void insert(int x) { update(x, 1); }  // 插入
inline void remove(int x) { update(x, -1); }  // 删除
int kthnum(int x, int p = 1, int cl = 1, int cr = n) {  // 指定排名的数
    if (cl == cr) return cl;
    if (tree[ls].val >= x) return kthnum(x, ls, cl, mid);  // 往左搜
    else return kthnum(x - tree[ls].val, rs, mid + 1, cr);  // 往右搜
}

/// ----------------主函数----------------
int a[N], b[N], dp[N], ans[N];
int main() {
    n = read();
    pcnt = 0;
    for (int i = 1; i <= n; ++i) {
        a[i] = read() + 1;
        insert(i);             // 初始化 得到一个满序列 便于删除
        dp[i] = 0x3f3f3f3f;    // 初始化 dp
    }
    for (int i = n; i >= 1; --i) {
        int t = kthnum(a[i]);  // 当前剩余序列的第 a_i 位是 b 的第 t 位
        b[t] = i;              // b 的第 t 位是 i
        remove(t);
    }
    int mx = 0;
    for (int i = 1; i <= n; ++i) {
        int t = std::lower_bound(dp + 1, dp + n + 1, b[i]) - dp;
        dp[t] = b[i];
        ans[b[i]] = t;
    }
    for (int i = 1; i <= n; ++i) {
        printf("%d\n", mx = std::max(mx, ans[i]));
    }
}
```





<div STYLE="page-break-after: always;"></div>

# K. Slime

有一定技巧，需要建模而实现简单，码量大但大部分是抄板子，写起来很爽的好题，此外本题有使用史莱姆算法的纯思维的解法。

## 方法一 (建模)

**建模** 若 $x$ 能直接吞噬 $y$，则在图上连边 $y\to x$，最终能吞噬的个数 $f(x)$ 即有向图上能到达 $x$ 的点数。

**连边** 显然地，对于每个固定的 $x$，所有的 $y$ 都连续，也即是一个区间，记为 $[l,r]$，于是需要连边 $[l,r]\to x$。最坏情况下需要连 $n^{2}$ 条边，空间无法接受，但区间连边提示我们，可以 **线段树优化建图**。时间 $\Theta(n\log n)$，空间 $\Theta(n)$。

连边函数：

```cpp
// [l,r]向x连边
void addedge(int l, int r, int x, int p = 1, int cl = 1, int cr = n) {
    if (l <= cl && cr <= r) return E[p].push_back(x);
    if (mid >= l) addedge(l, r, x, ls, cl, mid);
    if (mid < r)  addedge(l, r, x, rs, mid + 1, cr);
}
```

根据线段树上的点的关系，子节点需要向父节点连边，这可以边建树边连：

```cpp
// 建树 树上的边先连上
void build(int p = 1, int cl = 1, int cr = n) {
    if (cl == cr) {
        w[p] = { cl,cl };
        rt[cl] = p;
        return;
    }
    E[ls].push_back(p);
    E[rs].push_back(p);
    build(ls, cl, mid);
    build(rs, mid + 1, cr);
}
```

**求能到达的点数** 按 [缩点模板题](https://www.luogu.com.cn/problem/P3387) 的思路，跑肽键 (Tarjan) 和拓扑 (Topo)。时间 $\Theta(n+m)=\Theta(n)$（边数 $m=4n$），空间 $\Theta(n)$。

和模板题不同，由于线段树上的点不是并列关系，不能简单地将点权相加。

> 比如把树上点 1 和 $\mathrm{ls}$ 缩成一个点，点 1 实际上是原图中的 $[1,n]$，是 $n$ 个点的集合，同理点 $\mathrm{ls}$ 是 $[1,n/2]$ 这 $n/2$ 个点的集合。如果简单粗暴地相加，得到的新点包将含 $1.5n$ 个点，显然不是我们想要的。

因此用 $l,r$ 记录每个史莱姆能吞噬的范围，缩点就是把这些史莱姆揉在一起，新史莱姆能吞噬的范围就是 $[l_{\min},r_{\max}]$。

> 还是刚才的例子，把 $[1,n]$ 和 $[1,n/2]$ 缩在一起，得到的是 $[1,n]$，实际上是 $n$ 个点。

为了尽可能地减少代码修改，我们重新定义点权相加：

```cpp
struct node {
    int l = 1e9, r;  // 吞噬范围
    node& operator+=(const node& other) {
        l = std::min(l, other.l);
        r = std::max(r, other.r);
        return *this;
    }
} w[N];
```

这样调用 `w[to]+=w[u]` 即可，保证新范围是 $[l_{\min},r_{\max}]$（即 `w[u].l` 到 `w[u].r`）的同时不需要修改肽键和拓扑里的任何代码。

**计算** 现在得到了缩点后每个点 `u` 能到达的范围 `w[u].r - w[u].l + 1`，那对于原图点 `i`，在线段树上的点编号是 `rt[i]`，缩点后编号是 `fa[rt[i]]`，它能到达的范围就是 `w[fa[rt[i]]].r - w[fa[rt[i]]].l + 1`。按题设求和即可。

总的时间 $\Theta(n\log n)$，空间 $\Theta(n)$。

### Code

```cpp
#include <cstdio>
#include <algorithm>
#include <vector>
#include <stack>
#include <queue>
using ll = long long;
const int N = 2e6 + 8;
const int MOD = 1e9 + 7;

inline ll read() {
    ll Y = getchar(), S = 0, C = 1;
    while (Y > 57 || Y < 48) { if (Y == 45) C = -1; Y = getchar(); }
    while (Y <= 57 && Y >= 48) { S = (S << 3) + (S << 1) + Y - 48; Y = getchar(); }
    return S * C;
}

/// ----------------结构体----------------
struct node {
    int l = 1e9, r;  // 吞噬范围
    node& operator+=(const node& other) {
        l = std::min(l, other.l);
        r = std::max(r, other.r);
        return *this;
    }
} w[N];
int n, rt[N];

/// ----------------肽键和拓扑 都是抄板子----------------
std::vector<int> E[N];
std::vector<int> Etmp[N];
node wtmp[N];
int dfsn[N], low[N], fa[N], unix;
std::stack<int> S;

void eachTarjan(int u) {
    dfsn[u] = low[u] = ++unix;       // 记录DFS序
    S.push(u);
    // DP更新low[u]
    for (auto v : E[u]) {
        if (!dfsn[v]) eachTarjan(v), low[u] = std::min(low[u], low[v]);
        else if (!fa[v]) low[u] = std::min(low[u], dfsn[v]);
    }
    // u是SCC的根
    if (low[u] == dfsn[u]) {
        int top;
        do {
            top = S.top(); S.pop();    // 出栈
            fa[top] = u;               // 记录u的子节点的根为u
        } while (top != u);            // 不断弹出直到根u弹出为止
    }
}

inline void tarjan(int n) {
    // Tarjan
    for (int u = 1; u <= n; ++u) {
        if (!dfsn[u]) eachTarjan(u);
    }
    // 重构图 将子树的性质嫁接到SCC的根上
    for (int u = 1; u <= n; ++u) {
        for (auto v : E[u]) {
            if (fa[u] != fa[v]) Etmp[fa[u]].push_back(fa[v]);
        }                              // 存储新的边
        wtmp[fa[u]] += w[u];           // 存储新的边权
    }
    for (int u = 1; u <= n; ++u) {
        w[u] = wtmp[u];
        E[u] = Etmp[u];
        std::sort(E[u].begin(), E[u].end());
        E[u].erase(std::unique(E[u].begin(), E[u].end()), E[u].end());
    }
}

int deg[N];
inline void topo(int n) {
    for (int u = 1; u <= n; ++u) {
        for (auto v : E[u]) deg[v] += 1;
    }
    std::queue<int> Q;
    for (int u = 1; u <= n; ++u) {
        if (!deg[u] && u == fa[u]) Q.push(u);
    }
    while (!Q.empty()) {
        int u = Q.front(); Q.pop();
        for (auto to : E[u]) {
            w[to] += w[u];
            deg[to] -= 1;
            if (!deg[to]) {
                Q.push(to);
            }
        }
    }
}

/// ----------------线段树----------------
#define ls p<<1
#define rs p<<1|1
#define mid ((cl+cr)>>1)

// 建树 树上的边先连上
void build(int p = 1, int cl = 1, int cr = n) {
    if (cl == cr) return w[p] = { cl,cl }, rt[cl] = p, void();
    E[ls].push_back(p), build(ls, cl, mid);
    E[rs].push_back(p), build(rs, mid + 1, cr);
}

// [l,r]向x连边
void addedge(int l, int r, int x, int p = 1, int cl = 1, int cr = n) {
    if (l <= cl && cr <= r) return E[p].push_back(x);
    if (mid >= l) addedge(l, r, x, ls, cl, mid);
    if (mid < r)  addedge(l, r, x, rs, mid + 1, cr);
}

/// ----------------主函数----------------
ll xi[N], ri[N];  // 1e18 范围需要 LL
int main() {
    n = read();

    for (int i = 1; i <= n; ++i) {
        xi[i] = read(), ri[i] = read();
    }

    build();
    for (int i = 1; i <= n; ++i) {
        int l = std::lower_bound(xi + 1, xi + n + 1, xi[i] - ri[i]) - xi,      // 二分找第一个大于等于 xi[i]-ri[i] 的 l 即是下界
            r = std::upper_bound(xi + 1, xi + n + 1, xi[i] + ri[i]) - xi - 1;  // 二分找第一个大于 xi[i]+ri[i] 的 r 即是上界上面的那一个 再 -1 即是上界
        addedge(l, r, rt[i]);   // Slime i will eat [l,r]
        // rt[] 数组表示 i 在新图上点的编号是 rt[i]
    }

    tarjan(n << 2), topo(n << 2);  // 缩个点再跑一圈

    ll ans = 0;
    for (int i = 1; i <= n; ++i) {
        ans += 1ll * i * (w[fa[rt[i]]].r - w[fa[rt[i]]].l + 1);
        ans %= MOD;
    }
    printf("%lld", ans);

    return 0;
}
```

## 方法二 (史莱姆)

苯人正在研究 **史莱姆算法**，有机会再补。


<div STYLE="page-break-after: always;"></div>

# L. Dominant Indices

### Description

有根树，设 $d(x,y)$ 表示 $x$ 子树内到 $x$ 距离为 $y$ 的点的个数，对于每个$x$，求满足 $d(x,y)$ 最大的最小的 $y$。

### Notes

**维护什么？**
每个深度的点的个数，维护区间最大值，为求 $y$，需记录取到最大值的编号，即代码中的 $\rm{id}$。

```cpp
inline void push_up(SEGTREE& p, SEGTREE l, SEGTREE r) {
    if (l.val >= r.val) {
        p.val = l.val;
        p.id = l.id;
    }
    else {
        p.val = r.val;
        p.id = r.id;
    }
}
```

### Code

```cpp
#include <cstdio>
#include <vector>
using ll = long long;
const int N = 1e6 + 8, M = 2.5e7 + 8;

inline ll read() {
    ll Y = getchar(), S = 0, C = 1;
    while (Y > 57 || Y < 48) { if (Y == 45) C = -1; Y = getchar(); }
    while (Y <= 57 && Y >= 48) { S = (S << 3) + (S << 1) + Y - 48; Y = getchar(); }
    return S * C;
}

/// ----------------线段树----------------
struct SEGTREE {
    int val;  // 区间最大值
    int id;   // 区间最大值编号
    int ls, rs;
} tree[M];
int n, pcnt;  // 递归起点 节点时间戳
#define mid (cl+cr>>1)

// 在这两个函数中写需要维护的东西
inline void push_up(SEGTREE& p, SEGTREE l, SEGTREE r) {
    if (l.val >= r.val) {
        p.val = l.val;
        p.id = l.id;
    }
    else {
        p.val = r.val;
        p.id = r.id;
    }
}
inline void push_down(int& p, int val, int id) {
    if (!p) p = ++pcnt;
    tree[p].val += val;
    tree[p].id = id;
}

inline void push_up(int p) { push_up(tree[p], tree[tree[p].ls], tree[tree[p].rs]); }

SEGTREE query(int l, int r, int p, int cl = 1, int cr = n) {
    if (cl >= l && cr <= r) return tree[p];
    if (mid >= r) return query(l, r, tree[p].ls, cl, mid);
    if (mid < l)  return query(l, r, tree[p].rs, mid + 1, cr);
    SEGTREE ans;
    push_up(ans, query(l, r, tree[p].ls, cl, mid), query(l, r, tree[p].rs, mid + 1, cr));
    return ans;
}

void update(int x, int d, int& p, int cl = 1, int cr = n) {
    push_down(p, 1, x);
    if (cl == cr) return;
    if (x <= mid) update(x, d, tree[p].ls, cl, mid);
    if (x > mid)  update(x, d, tree[p].rs, mid + 1, cr);
    push_up(p);
}

// 将树上节点x,y合并到节点x
int merge(int x, int y, int cl = 1, int cr = n) {
    if (!x || !y) return x | y;
    if (cl == cr) return push_down(x, tree[y].val, cl), x;
    tree[x].ls = merge(tree[x].ls, tree[y].ls, cl, mid);
    tree[x].rs = merge(tree[x].rs, tree[y].rs, mid + 1, cr);
    push_up(x);
    return x;
}

/// ----------------线段树合并----------------
std::vector<int> E[N];
int dep[N], ans[N];

void dfs(int u, int fau = 0) {
    dep[u] = dep[fau] + 1;
    update(dep[u], 1, u);  // 把信息存进去
    for (auto v : E[u]) {
        if (v == fau) continue;
        dfs(v, u);
        merge(u, v);
    }
    ans[u] = query(dep[u], n, u).id - dep[u];
}

/// ----------------主函数----------------
int main() {
    n = read(), pcnt = n;

    for (int i = 2; i <= n; ++i) {
        int u = read(), v = read();
        E[u].push_back(v);
        E[v].push_back(u);
    }

    dfs(1);
    for (int i = 1; i <= n; ++i) {
        printf("%d\n", ans[i]);
    }

    return 0;
}
```