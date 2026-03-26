---
title: '圖論 - 最短路問題'
tags:
  - 算法
  - 圖論
  - 筆記
  - ACM
categories:
  - - 筆記
    - 算法筆記
abbrlink: '8d5610d5'
date: 2024-04-10 12:00:00
updated: 2024-04-10 12:00:00
description:
---


# Short-Path Problem

- 单源最短路
  - 正权图
    - 朴素 Dÿkstra $\Theta(n^2)$
    - 优化 Dÿkstra $\Theta(m\log m)$
  - 负权图
    - Bellman - Ford $\Theta(nm)$
    - SPFA $\Theta(nm)$
- 多源最短路
  - 负权图
    - Johnson $\Theta(nm\log m)$
    - Floyd $\Theta(n^3)$


<div STYLE="page-break-after: always;"></div>

## 单源最短路

### 正权图

#### 朴素 Dÿkstra

从未确定最短路的点中选取最短路长度最小的点，松弛（$d_v=\min\left\lbrace d_v,\ d_u+w_{uv}\right\rbrace$）它的所有出边。

```cpp
int E[N][N];
int dis[N], vis[N];

void eachT() {
    int n = read();
    for (int i = 0; i <= n; ++i) {
        vis[i] = 0;
        dis[i] = 0x3f3f3f3f;
        for (int j = 0; j <= n; ++j) E[i][j] = 0x3f3f3f3f;
    }  // 点数n 并初始化

    for (int m = read(); m--;) {
        int u = read(), v = read(), w = read();
        E[u][v] = w;
    }  // 边数m 邻接矩阵存边

    int st = read();
    dis[st] = 0;  // 起始点初始化

    for (int u = -1;; u = -1) {
        // 从未确定最短路的点中选取最短路长度最小的点
        for (int i = 1; i <= n; ++i)
            if (!vis[i] && (u == -1 || dis[i] < dis[u])) u = i;
        if (u == -1) break; // 找不到 说明已经遍历完毕

        vis[u] = 1;  // 这个点的最短路已经确定
        // 松弛出边
        for (int i = 1; i <= n; ++i)
            if (!vis[i]) dis[i] = min(dis[i], dis[u] + E[u][i]);
    }
     for (int i = 1; i <= n; ++i) printf("%d ", dis[i] == 0x3f3f3f3f ? -1 : dis[i]);
}
```

时间复杂度 $\Theta(n^2)$，空间 $\Theta(n^2)$，适用于点数较少、边数较多的稠密图。



<div STYLE="page-break-after: always;"></div>

#### 优化 Dÿkstra

从未确定最短路的点集 $Q$ 中选取最短路长度最小的点，松弛它的所有出边，并将这些点加入 $Q$。利用 priority_queue 优化，存储 $\left\lbrace d_u,\ u \right\rbrace$，队首元素即是「最短路长度最小的点」。

路径数量的统计：更新时，若边权相同，则继承父节点的最短路数量；否则替换最短路数量。

```cpp
typedef pair<int, int> pii;

struct Edge {
    int nxt, to, w;
};
vector<Edge> E;
int head[N];
inline void add(int u, int v, int w) {
    E.push_back({ head[u], v, w });
    head[u] = E.size() - 1;
}  // 链式前向星

int dis[N], vis[N], path[N];
unsigned long long pcnt[N];

void Dijkstra(int n, int st) {
    for (int i = 0; i <= n; ++i) dis[i] = 0x3f3f3f3f, vis[i] = path[i] = pcnt[i] = 0;
    dis[st] = 0, pcnt[st] = 1;  // 初始化到自己的距离和最短路

    priority_queue<pii, vector<pii>, greater<pii> > Q;
    Q.push({ 0, st });
    while (!Q.empty()) {
        auto [dis_u, u] = Q.top(); Q.pop();
        if (vis[u]) continue;  // 取出未访问的点
        vis[u] = 1;
        for (int i = head[u]; i >= 1; i = E[i].nxt) {
            int to = E[i].to;
            if (dis[to] == E[i].w + dis_u) {
                pcnt[to] += pcnt[u];       // 继承最短路数量
            } else if (dis[to] > E[i].w + dis_u) {
                dis[to] = E[i].w + dis_u;  // 松弛
                path[to] = u;              // 前驱记录路径
                pcnt[to] = pcnt[u];        // 更新最短路数量
                Q.push({ dis[to], to });   // 已更新的点加入Q
            }
        }
    }
}

void eachT() {
    int n = read();
    E.push_back({ -1,0,0 });
    for (int m = read(); m--;) {
        int u = read(), v = read(), w = read();
        add(u, v, w);
    }  // 链式前向星存边

    int st = read();
    Dijkstra(n, st);

    for (int i = 1; i <= n; ++i) printf("%d ", dis[i] == 0x3f3f3f3f ? -1 : dis[i]);
    for (int i = 1; i <= n; ++i) printf("%lld ", pcnt[i]);

    int end = read();
    while (end != st) {
        printf("%d<-", end);
        end = path[end];
    }
    printf("%d\n", st);
}
```

时间复杂度 $\Theta(m\log m)$，空间 $\Theta(n)$，适用于点数较少、边数较多的稠密图。


<div STYLE="page-break-after: always;"></div>

### 负权图

#### Bellman - Ford

```cpp
vector<tuple<int, int, int> > E;
int bis[N];

bool BellmanFord(int n, int st) {
    for (int i = 1; i <= n; ++i) bis[i] = 0x3f3f3f3f;
    bis[st] = 0;

    for (int i = 1; i <= n; i++) {
        bool flag = 0;  // 判断一轮循环过程中是否发生松弛操作
        for (auto [w, u, v] : E) {
            if (bis[u] != 0x3f3f3f3f && bis[v] > bis[u] + w) {
                bis[v] = bis[u] + w;  // 松弛
                flag = 1;
            }
        }
        if (flag == 0) return 0;  // 没有可以松弛的边
    }
    return 1;  // n轮后仍存在可以松弛的边 存在负环
}

void eachT() {
    int n = read();
    for (int m = read(); m--;) {
        int u = read(), v = read(), w = read();
        E.push_back({ w,u,v });
    }  // 直接存边

    bool flag = 0;
    for (int i = 1; i <= n; ++i) {
        if (BellmanFord(n, i)) flag = 1; // 存在负环
    }
    if (flag) printf("-1");
}
```

时间复杂度 $\Theta(nm)$。



<div STYLE="page-break-after: always;"></div>

#### SPFA

Queue 优化 Bellman - Ford。

```cpp
vector<pair<int, int> > E[N];
int bis[N], cnt[N], vis[N];

bool SPFA(int n, int st) {
    for (int j = 1; j <= n; ++j) bis[j] = 0x3f3f3f3f, cnt[j] = vis[j] = 0;
    bis[st] = 0, vis[st] = 1, cnt[st] = 1;

    queue<int> Q;
    Q.push(st);
    while (!Q.empty()) {
        int u = Q.front(); Q.pop();
        vis[u] = 0;
        for (auto [w, v] : E[u]) {
            if (bis[u] != 0x3f3f3f3f && bis[v] > bis[u] + w) {
                bis[v] = bis[u] + w;
                if (!vis[v]) {
                    Q.push(v), vis[v] = 1;
                    cnt[v] += 1;
                    if (cnt[v] > n) return 1;  // 存在负环
                }
            }
        }
    }
    return 0;
}

void eachT() {
    int n = read();
    for (int m = read(); m--;) {
        int u = read(), v = read(), w = read();
        E[u].push_back({ w,v });
    }  // 邻接表存边

    bool flag = 0;
    for (int i = 1; i <= n; ++i) {
        if (SPFA(n, i)) flag = 1;  // 存在负环
    }
    if (flag) printf("-1");
}
```

时间复杂度最坏仍是 $\Theta(nm)$。



<div STYLE="page-break-after: always;"></div>

## 多源最短路

### 负权图

#### Johnson

因 Dÿkstra 不能处理负权图，我们以虚拟的 $n+1$ 号节点为起始点跑 SPFA，为每个点引入点权 $d_u$，将边权更新为 $E_{uv} := E_{uv} + d_u - d_v$，使边权皆为正，再跑 $n$ 遍优化 Dÿkstra。

```cpp
typedef pair<int, int> pii;

struct Edge {
    int nxt, to, w;
};
vector<Edge> E;
int head[N];
inline void add(int u, int v, int w) {
    E.push_back({ head[u], v, w });
    head[u] = E.size() - 1;
}

int bis[N], dis[N], cnt[N], vis[N];

bool SPFA(int n, int st) {
    for (int j = 1; j <= n; ++j) bis[j] = 0x3f3f3f3f, cnt[j] = vis[j] = 0;
    bis[st] = 0, vis[st] = 1, cnt[st] = 1;

    queue<int> Q;
    Q.push(st);
    while (!Q.empty()) {
        int u = Q.front(); Q.pop();
        vis[u] = 0;
        for (int i = head[u]; i >= 1; i = E[i].nxt) {
            int v = E[i].to, w = E[i].w;
            if (bis[u] != 0x3f3f3f3f && bis[v] > bis[u] + w) {
                bis[v] = bis[u] + w;
                if (!vis[v]) {
                    Q.push(v), vis[v] = 1;
                    cnt[v] += 1;
                    if (cnt[v] > n) return 1;
                }
            }
        }
    }
    return 0;
}

void Dijkstra(int n, int st) {
    for (int i = 0; i <= n; ++i) dis[i] = 0x3f3f3f3f, vis[i] = 0;
    dis[st] = 0;

    priority_queue<pii, vector<pii>, greater<pii> > Q;
    Q.push({ 0, st });
    while (!Q.empty()) {
        auto [dis_u, u] = Q.top(); Q.pop();
        if (vis[u]) continue;  // 取出未访问的点
        vis[u] = 1;
        for (int i = head[u]; i >= 1; i = E[i].nxt) {
            int to = E[i].to;
            if (dis[to] > E[i].w + dis_u) {
                dis[to] = E[i].w + dis_u;   // 松弛
                Q.push({ dis[to], to });    // 已更新的点加入Q
            }
        }
    }

    for (int j = 1; j <= n; j++)
        dis[j] += dis[j] == 0x3f3f3f3f ? 0 : bis[j] - bis[st]; // 复原
}

void eachT() {
    int n = read();
    E.push_back({ -1,0,0 });
    for (int m = read(); m--;) {
        int u = read(), v = read(), w = read();
        add(u, v, w);
    }  // 链式前向星存边

    for (int i = 1; i <= n; i++) add(n + 1, i, 0);  // 引入n+1号点 连接无权边
    if (SPFA(n + 1, n + 1)) return void(printf("-1"));  // 存在负环
    for (int u = 1; u <= n; u++) {
        for (int i = head[u]; i >= 1; i = E[i].nxt)
            E[i].w += bis[u] - bis[E[i].to];
    }  // 更新每条边的边权
    for (int i = 1; i <= n; i++) {
        Dijkstra(n, i);
        for (int j = 1; j <= n; j++) {
            printf("%d%c", dis[j] == 0x3f3f3f3f ? -1 : dis[j], " \n"[j == n]);
        }
    }
}
```

时间复杂度 $\Theta(nm\log m)$。



<div STYLE="page-break-after: always;"></div>

#### Floyd

$f_{k,i\to j}$ 表示只经过节点 $1\sim k$，从 $i$ 到 $j$ 的最短路。

由 $d_{i \to j}=\min\limits_k \left\lbrace d_{i \to k}+d_{k \to j} \right\rbrace$，得 $f_{k,i\to j}=\min \left\lbrace f_{k-1,i \to j},\ f_{k-1,i \to k}+f_{k-1,k \to j} \right\rbrace$。第一维可压缩。

```cpp
int dis[N][N];

void eachT() {
    int n = read();
    for (int i = 0; i <= n; ++i) {
        for (int j = 0; j <= n; ++j) dis[i][j] = 0x3f3f3f3f;
    }  // 点数n 并初始化

    for (int m = read(); m--;) {
        int u = read(), v = read(), w = read();
        dis[u][v] = w;
    }  // 边数m 邻接矩阵存边

    for (int i = 1; i <= n; ++i) dis[i][i] = 0; // 初始化
    for (int k = 1; k <= n; ++k) {
        for (int i = 1; i <= n; ++i)
            for (int j = 1; j <= n; ++j)
                dis[i][j] = min(dis[i][j], dis[i][k] + dis[k][j]);
    }
}
```

时间复杂度 $\Theta(n^3)$，空间复杂度 $\Theta(n^2)$。















