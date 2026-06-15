---
title: 樹上問題 - 樹剖 啓發式合併
tags:
  - 算法
  - 圖論
  - 筆記
  - ACM
categories:
  - - 筆記
    - 算法筆記
abbrlink: 5ba6d4a3
date: 2024-05-08 12:00:00
updated: 2024-07-08 09:00:00
description:
---

# Segment Tree on Tree

## Heavy Path Decomposition

**树链剖分** 把一棵树分割成若干条链，以便于维护（路径、子树）信息。

**重链剖分 (Heavy Path Decomposition)** 从树上每个 **轻节点** 出发，不断向下走 **重边**，构成一条链。这样，树被剖分成了 $l$ 条链（$l$ 是轻节点的数量）。对于节点数为 $n$ 的树，从任意节点向上走到根节点，经过的轻边数量不超过 $\log n$。

使用两次 DFS 完成重链剖分。

```cpp
const int N = 1e6 + 8;
std::vector<int> E[N];
int fa[N], hson[N], siz[N], dep[N], top[N];
int unix, dfsn[N], dfsnR[N], tdfsn[N];  // DFS树: 时间戳 DFS序 子树的最大DFS序 DFS序对应的节点编号

void dfs1(int u, int fau = 0) {
    int mx = 0;
    dep[u] = dep[fau] + 1;                          // 更新深度
    siz[u] = 1;
    for (auto v : E[u]) {
        if (v == fau) continue;
        dfs1(v, u);
        fa[v] = u;                                  // 更新父节点
        siz[u] += siz[v];                           // 更新子树大小
        if (siz[v] > mx) hson[u] = v, mx = siz[v];  // 更新重儿子
    }
}

void dfs2(int u, int fau = 0) {
    dfsn[u] = ++unix, tdfsn[unix] = u;
    if (hson[u]) {
        top[hson[u]] = top[u];                      // 重儿子的头是父的头
        dfs2(hson[u], u);
    }  // 先遍历重子节点
    for (auto v : E[u]) {
        if (v == fau || v == hson[u]) continue;
        top[v] = v;                                 // 轻儿子的头是自己
        dfs2(v, u);
    }  // 再遍历轻子节点
    dfsnR[u] = unix;
}

void eachT() {
    dfs1(rt);
    top[rt] = rt;
    dfs2(rt);
}
```




<div STYLE="page-break-after: always;"></div>

## LCA

若 $u,v$ 在同一条链上，LCA 是深度较小的那个节点；否则，将链头深度较大的节点跳转到其链头的父节点上，直至两点在同一条链上。

```cpp
int getlca(int u, int v) {
    while (top[u] != top[v]) {
        if (dep[top[u]] > dep[top[v]]) u = fa[top[u]];
        else v = fa[top[v]];
    }
    return dep[u] > dep[v] ? v : u;
}
```


## Segment Tree on Tree

每棵子树的 DFS 序都是连续的，且根节点 DFS 序最小；而且，如果优先遍历重子节点，那么同一条链上的节点的 DFS 序也是连续的，且链头节点 DFS 序最小。

注意，建线段树的时候不是按节点编号建，而是按 DFS 序建。

```cpp
void update_path(int u, int v, int d) {
    while (top[u] != top[v]) {
        if (dep[top[u]] > dep[top[v]]) update(dfsn[top[u]], dfsn[u], d), u = fa[top[u]];
        else update(dfsn[top[v]], dfsn[v], d), v = fa[top[v]];
    }
    if (dep[u] > dep[v]) update(dfsn[v], dfsn[u], d);
    else update(dfsn[u], dfsn[v], d);
}

int query_path(int u, int v) {
    int ans = 0;
    while (top[u] != top[v]) {
        if (dep[top[u]] > dep[top[v]]) ans += query(dfsn[top[u]], dfsn[u]), u = fa[top[u]];
        else ans += query(dfsn[top[v]], dfsn[v]), v = fa[top[v]];
    }
    if (dep[u] > dep[v]) ans += query(dfsn[v], dfsn[u]);
    else ans += query(dfsn[u], dfsn[v]);
    return ans;
}

void update_subtree(int u, int d) {
    update(dfsn[u], dfsnR[u], d);
}

int query_subtree(int x) {
    return query(dfsn[x], dfsnR[x]);
}
```

> 例题：[CF877E](https://codeforces.com/problemset/problem/877/E)（模板）

<div STYLE="page-break-after: always;"></div>

## DSU on Tree

**树上启发式合并 (DSU On Tree)** 用于解决 **询问每个节点关于其子树的某些信息** 的问题，需离线，且不支持修改。

- 因简单的树形 DP 在空间上不能满足，所以不能存储每个节点的信息，而是要 **资源复用**。
- 又因为在压缩空间后，需要对每个节点暴力统计子树的信息，在时间上又不能满足，所以 **启发式地**（基于人类的经验和直观感觉，优化算法）保留重子树的信息，以节约时间。

时间复杂度 $\Theta(n\log n)$，空间复杂度 $\Theta(n)$。

设某个节点 $u$ 的答案需要用到的资源是 $\operatorname{info}_u$，
- 遍历所有轻子树，递归求解子树，计算但不保留对 $\operatorname{info}_u$ 的影响；
- 遍历重子树，递归求解子树，计算且保留对 $\operatorname{info}_u$ 的影响，保留以求解当前节点；
- 遍历所有轻子树，计算对 $\operatorname{info}_u$ 的影响，以求解当前节点。

```cpp
void add(int u) {}  // 增加u对info的影响
void del(int u) {}  // 去除u对info的影响
void cal(int u) {}  // 利用info计算u的ans

void dfs(int u, int fau = -1, bool keep = 1) {
    // 遍历轻子树 递归求解
    for (auto v : E[u]) {
        if (v != fau && v != hson[u]) dfs(v, u, 0);
    }
    
    // 遍历重子树 递归求解 求解当前节点
    if (hson[u]) dfs(hson[u], u, 1);
    
    // 遍历轻子树 求解当前节点
    add(u);
    for (auto v : E[u]) {
        if (v != fau && v != hson[u])
            for (int i = dfsn[v]; i <= dfsnR[v]; ++i) add(tdfsn[i]);  // 计算对info的影响
    }
    
    // 利用info计算ans
    cal(u);
    
    // 不保留对info的影响 回溯前删除
    if (!keep) {
        for (int i = dfsn[u]; i <= dfsnR[u]; ++i) del(tdfsn[i]);  // 删除对info的影响
    }
}

void eachT() {
    dfs1(rt);
    top[rt] = rt, dfs2(rt);  // 如对DFS生成树先遍历重子节点无要求 可省略 并将DFS生成树移到dfs1()中
    dfs(rt);
}
```

### 例题

有根树。在以 $u$ 为根的子树中，出现次数 $\geqslant k$ 的颜色有多少种。(2400, [CF375D](https://codeforces.com/problemset/problem/375/D))

```cpp
int c[N];    // 颜色
int cnt[N];  // 每种颜色出现的次数
int sum[N];  // 出现次数大于等于k的颜色有多少种
std::vector<std::pair<int, int> > Q[N];
int Qns[N];

void add(int u) {
    cnt[c[u]] += 1;  // 这种颜色多一个
    sum[cnt[c[u]]] += 1;  // 这个数量的颜色多一个
}  // 增加u对info的影响

void del(int u) {
    sum[cnt[c[u]]] -= 1;
    cnt[c[u]] -= 1;
}  // 去除u对info的影响

void cal(int u) {
    for (auto& [k, id] : Q[u]) {
        Qns[id] = sum[k];
    }
}  // 利用info计算u的ans
```

有根树。在以 $u$ 为根的子树中，出现次数最多的颜色（可能有多个）占领 $u$，求占领 $u$ 的所有颜色的编号之和。(2300, [CF600E](https://codeforces.com/problemset/problem/600/E))

```cpp
int c[N], cnt[N], maxsum;
ll sum, ans[N];

void add(int u) {
    int x = ++cnt[c[u]];
    if (x > maxsum) maxsum = x, sum = c[u];
    else if (x == maxsum) sum += c[u];
}  // 增加u对info的影响

void del(int u) {
    --cnt[c[u]];
    maxsum = sum = 0;  // 需要初始化
}  // 去除u对info的影响

void cal(int u) {
    ans[u] = sum;
}  // 利用info计算u的ans
```