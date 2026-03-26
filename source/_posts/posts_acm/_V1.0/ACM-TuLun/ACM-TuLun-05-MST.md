---
title: 圖論 - 最小生成樹
tags:
  - 算法
  - 圖論
  - 筆記
  - ACM
categories:
  - - 筆記
    - 算法筆記
abbrlink: a5317783
date: 2024-04-24 12:00:00
updated: 2024-04-24 12:00:00
description:
---


# Minimum Spanning Tree


构建最小生成树，求最小生成树的边权之和。



## Kruskal (DSU)

**思路** 按边权从小到大的顺序开始合併连通图，如果没有环，那么它一定是最小生成树的一条边。时间复杂度 $\Theta(m\log m)$，空间复杂度 $\Theta(m)$。

```cpp
int fa[N];
inline void init(int n) { for (int i = 1; i <= n; ++i) fa[i] = i; }
int find(int x) { return x == fa[x] ? x : (fa[x] = find(fa[x])); }
inline void uno(int x, int y) { fa[find(x)] = find(y); }

void eachT() {
    int n = read();
    init(n);

    vector<tuple<int, int, int> > E;
    for (int m = read(); m--; ) {
        int u = read(), v = read(), w = read();
        E.push_back({ w,u,v });
    }
    sort(E.begin(), E.end());

    int ans = 0;  // 边权之和
    for (auto [w, u, v] : E) {
        if (find(u) != find(v)) {
            ans += w;
            uno(u, v);
        }
    }
    print(ans);
}
```



<div STYLE="page-break-after: always;"></div>

## Prim

### 稠密图

时间复杂度 $\Theta(n^2)$，空间复杂度 $\Theta(n)$。

```cpp
int E[N][N];
int dis[N], vis[N];

void eachT() {
    int n = read();
    for (int i = 1; i <= n; ++i) for (int j = 1; j <= n; ++j) E[i][j] = read();
    vis[1] = 1;
    dis[1] = 0;
    int ans = 0;
    for (int u = 1; u <= n; ++u) {
        int v = 1, mn = 1e9;
        for (int i = 1; i <= n; ++i)
            if (!vis[i] && dis[i] < mn)
                v = i, mn = dis[i];
        vis[v] = 1;
        ans += dis[v];
        for (int i = 1; i <= n; ++i)
            dis[i] = min(dis[i], E[v][i]);
    }
    print(ans);
}
```


### 堆优化 Prim（稀疏图）

**思路** 维护边权从小到大的优先队列，循环判断队首元素是否在生成树中，若是，将与它相连的所有边添加到优先队列中。时间复杂度 $\Theta(n\log n)$，空间复杂度 $\Theta(m)$。

```cpp
struct node {
    int y, w;
    bool operator<(const node& _) const {
        return w > _.w;
    }
};
vector<node> E[N];
int vis[N];

void eachT() {
    int n = read();
    for (int m = read(); m--; ) {
        int u = read(), v = read(), w = read();
        E[u].push_back({ v, w });
        E[v].push_back({ u, w });
    }

    int ans = 0;  // 边权之和
    priority_queue<node> Q;
    Q.push({ 1,0 });
    while (!Q.empty()) {
        auto [u, w] = Q.top(); Q.pop();
        if (!vis[u]) {
            vis[u] = 1;
            ans += w;
            for (auto [v, w] : E[u]) {
                if (!vis[v]) Q.push({ v,w });
            }
        }
    }
    print(ans);
}
```



<div STYLE="page-break-after: always;"></div>

## 例題

**[VJspr1H - Counting Graphs - UPSLOVE](https://codeforces.com/contest/1857/problem/G)**

**題意** 

**思路** 考慮每一條邊的取值，爲了不影響惟一的最小生成樹，它的取值應當嚴格大於所在環（熟知，在樹中連一條邊將形成惟一的環）的每一條邊的權值，依乘法原理即可算出取值情況。

> 樣例三中 `1 2 3 || 1 3 2 || 3 4 6 || 3 5 1`，已有 $4$ 條邊，還可以連 $C_5^2-4=6$ 條邊，如邊 $e_{15}$，它所在的環是 $1-2-3-5$，這些邊的權值分別爲 $3,2,1$，所以 $e_{15}$ 最小值是 $4$，可取 $wmax-4+1=3$ 種，當然還有不連的情形，共 $4$ 種，類似算出其它邊，答案是 $4 \times 4 \times 5 \times 1 \times 1 \times 1=80$。

一種思路是枚舉所有的邊，從一个端点 `dfs` 到另一个端点，算出最小取值，但顯然這樣會超時。

邊數很大，一一遍歷至少是 $\Theta(n^2)$ 的複雜度，應當簡化運算。

注意到，這些數值有很多相同的，我們只需要找出 **每一取值出現的次數**，依快速冪計算，能大大降低複雜度。

下面的問題便是，如何找出每一取值 $a$ 出現的次數 $n$。注意到，取值大小 $a$ 僅與所在環的最大權值有關，我們就研究這个最大權值，看它能決定多少邊的取值。事實上，它能決定的是數值更小的環。因此，我們 **按邊權從小到大的順序構建這棵數**，以保證每一條邊出現時，已構建的邊的權值都比它小。如下一條邊的權值是 $w$，則每條邊的可能情形有 $wmax-w+1$ 種；至於出現次數，將兩條邊連接時，完全圖應當增加 $S_1S_2$ 條邊，所以會有 $S_1S_2-1$ 條未連接的邊，它們的取值都有 $wmax-w+1$ 種，計算 $(wmax-w+1)^{S_1S_2-1}$ 即可。

```cpp
inline void uno(int i, int j) {
    int x = find(i), y = find(j);
    if (x == y) return;
    if (rr[x] <= rr[y])
        fa[x] = y, num[y] += num[x];
    else
        fa[y] = x, num[x] += num[y];
    if (rr[x] == rr[y])
        rr[y]++;
}
void eachT() {
    int n = read(), wmax = read();
    init(n);
    for (int i = 1; i <= n - 1; ++i) {
        e[i].x = read(), e[i].y = read(), e[i].w = read();
    }
    std::sort(e + 1, e + n - 1 + 1);
    ll ans = 1;
    for (int i = 1; i <= n - 1; ++i) {
        if (find(e[i].x) != find(e[i].y)) {
            ans = ans * qpow(1ll * wmax - e[i].w + 1, 1ll * num[find(e[i].x)] * num[find(e[i].y)] - 1) % MOD;
            uno(e[i].x, e[i].y);
        }
    }
    print(ans);
}
```



**[VJspr7B - 营救](https://www.luogu.com.cn/problem/P1396)**

**題意** 求兩點間路徑上最大邊權最小值。

**思路一** 建立最小生成樹上，第一次連通時即是結果：

```cpp
void eachT() {
    // 略
    int st = read(), end = read();
    ll ans = 0;
    for (auto [w, u, v] : E) {
        if (find(u) != find(v)) {
            uno(u, v);
            if(find(st) == find(end)) return print(w);
        }
    }
}
```

**思路二** 二分答案，判斷使用這些邊是否能將圖連通：

```cpp
void eachT() {
    int n = read(), m = read(), st = read(), end = read();

    vector<tuple<int, int, int> > E;
    while (m--) {
        int u = read(), v = read(), w = read();
        E.push_back({ w,u,v });
    }

    auto half = [&](int x) {
        init(n);
        for (auto [w, u, v] : E) if (find(u) != find(v) && w <= x) uno(u, v);
        return find(st) == find(end);
    };

    int l = 0, r = 2e5, mid = -1;
    while (l <= r) mid = l + r >> 1, half(mid) ? r = mid - 1 : l = mid + 1;
    printf("%d\n", l);
}
```



