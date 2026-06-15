---
title: XCPC wiki - Bipartite Graph 二分图
tags:
  - 算法
  - 筆記
  - ACM
  - 圖論
categories:
  - - 筆記
    - XCPCwiki
abbrlink: 3df4fa8c
hide: true
date: 2025-01-24 22:05:00
updated: 2025-01-24 22:05:00
description:
---

**二分图** 中的点由两个集合组成，且两个集合内部没有边。

## 二分图的判定

**方法 1 (Backtracking algorithm m coloring problem)**：等对图中的点染色，使每条边的两端点异色。([VJspr7A - 封锁阳光大学](https://www.luogu.com.cn/problem/P1330))

如果两个集合中的点分别染成黑色和白色，二分图中的每一条边都一定是连接一个黑色点和一个白色点。


| Input                    | Output |
| ------------------------ | ------ |
| 3 3<br>1 2<br>1 3<br>2 3 | No     |
| 3 2<br>1 2<br>2 3        | Yes    |


```cpp
bool bipartite = true;
vector<int> c(n, -1);
c[0] = 0;
queue<int> Q;
Q.push(0);
while (!Q.empty()) {
    int u = Q.front();
    Q.pop();
    for (auto& v : E[u]) {
        if (c[v] == -1) {
            c[v] = 1 ^ c[u];
            Q.push(v);
        }
        else if (c[v] == c[u]) {
            bipartite = false;
        }
    }
}
cout << (bipartite ? "Yes" : "No") << '\n';
```


**方法 2（并查集）**：开选择题（模为 2 的带权并查集），合并 `dsu.uno(u, v, 1)` 失败表明不是二分图。

**方法 3（找奇环）**：二分图不存在奇环。



<div STYLE="page-break-after: always;"></div>



## 二分图的最大匹配数

- **匹配** (matching)：任意两条边都没有公共顶点的边集。
- **最大匹配**：所含匹配边数最多的匹配。
- **最小点覆盖**：最少的点的数量使二分图所有的边都至少有一个端点在这些点之中。
- **交替路**：从一个未匹配点出发，依次经过非匹配边、匹配边、非匹配边……形成的路径。
- **增广路** (agumenting path)：从一个未匹配点出发，走交替路，如果途径另一个未匹配点，则这条交替路称为增广路。

当找到一条增广路径时，未匹配边的数量比已匹配边的数量恰好多 1。所以如果将一条增广路径中匹配的边断开，并将所有的未匹配边变成匹配边，就得到了一个更优的解，匹配数增加 1。

根据 König 定理，一个二分图中的最大匹配数等于这个图中的最小点覆盖数，而求最大匹配，实际是找增广路。

### Hungarian Algorithm, KM

用 DFS 找增广路，时间复杂度 $\Theta(nm)$，适用于稠密图。

```cpp
// 邻接矩阵存单向边 E[u].push_back(v);
vector<int> npy(m, -1);
for (int u = 0; u < n; ++u) {
    vector<int> vis(m);
    auto dfs = [&](this auto&& self, int u) -> bool {
        for (auto& v : E[u]) {
            if (vis[v]) continue;
            vis[v] = 1;
            if (npy[v] == -1 || self(npy[v])) {
                npy[v] = u;
                return true;
            }
        }
        return false;
    };
    dfs(u);
}
```

### Hopcroft-Karp, HK

在每一次迭代中，都是基于当前的解（即当前的匹配）去寻找增广路径。在迭代中加入 BFS，可以同时找多条增广路径，并且保证每次寻找到的增广路都是当前增广路中最短的从而优化效率。

时间复杂度 $\Theta(e\sqrt{ n+m })$，适用于稀疏图。

```cpp
struct MaxMatch {
    int n, m, dis;
    vector<vector<int>> E;
    vector<int> nx, ny, dx, dy, vis;

    MaxMatch(int n, int m) : n(n), m(m), dis(0), E(n), nx(n, -1), ny(m, -1), dx(n), dy(m), vis(m) {}

    void add(int u, int v) {
        E[u].push_back(v);
    }

    bool bfs() {
        dis = inf;
        fill(dx.begin(), dx.end(), -1);
        fill(dy.begin(), dy.end(), -1);
        queue<int> Q;
        for (int i = 0; i < n; ++i) {
            if (nx[i] == -1) Q.push(i), dx[i] = 0;
        }
        while (!Q.empty()) {
            int u = Q.front(); Q.pop();
            if (dx[u] > dis) break;
            for (auto v : E[u]) {
                if (dy[v] == -1) {
                    dy[v] = dx[u] + 1;
                    if (ny[v] == -1) dis = dy[v];
                    else dx[ny[v]] = dy[v] + 1, Q.push(ny[v]);
                }
            }
        }
        return dis != inf;
    }

    bool dfs(int u) {
        for (auto v : E[u]) {
            if (!vis[v] && dy[v] == dx[u] + 1) {
                vis[v] = true;
                if (ny[v] != -1 && dy[v] == dis) continue;
                if (ny[v] == -1 || dfs(ny[v])) {
                    ny[v] = u;
                    nx[u] = v;
                    return true;
                }
            }
        }
        return false;
    }

    int work() {
        int res = 0;
        while (bfs()) {
            fill(vis.begin(), vis.end(), false);
            for (int i = 0; i < n; ++i) {
                if (nx[i] == -1 && dfs(i)) ++res;
            }
        }
        return res;
    }
};

int main() {
    int n, m, e;
    cin >> n >> m >> e;
    MaxMatch G(n, m);
    while (e--) {
        int u, v;
        cin >> u >> v;
        u--, v--;
        G.add(u, v);
    }
    cout << G.work() << "\n";
    return 0;
}
```

### Edmonds-Karp, EK

跑网络流，理论时间复杂度 $\Theta(e\sqrt{ n+m })$，但实际速度比 HK 慢，不适用。

### Problems

**例 1** 黑白棋盘，可选择交换两行或交换两列，能否在若干次操作后，使棋盘的主对角线均为黑色。([洛谷 P1129 矩阵游戏](https://www.luogu.com.cn/problem/P1129))

```cpp
int n;
cin >> n;
MaxMatch G(n, n);
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        int x;
        cin >> x;
        if (x) G.add(i, j);
    }
}
cout << (G.work() == n ? "Yes" : "No") << "\n";
```

**例 2** 黑白棋盘，可选择将某一行或某一列的白色全部变为黑色，求将棋盘全变为黑色的最小操作次数。


<div STYLE="page-break-after: always;"></div>



## 完全 k 分图的判定

https://codeforces.com/problemset/problem/1228/D

```cpp
int col[N];
struct node {
    int id;
    basic_string<int> E;
    bool operator < (const node& b) const {
        return E < b.E;
    }
} s[N];

void eachT() {
    int n = read(), m = read();
    for (int i = 1; i <= n; ++i) {
        s[i].id = i;
    }

    while (m--) {
        int u = read(), v = read();
        s[u].E.push_back(v);
        s[v].E.push_back(u);
    }

    for (int i = 1; i <= n; ++i) {
        sort(s[i].E.begin(), s[i].E.end());
    }

    sort(s + 1, s + n + 1);
    if (s[1].E.empty()) {
        printf("-1\n");
        return;
    }

    int cnt = 1;
    col[s[1].id] = 1;
    for (int i = 2; i <= n; ++i) {
        if (s[i].E == s[i - 1].E) {
            col[s[i].id] = col[s[i - 1].id];
        }
        else {
            col[s[i].id] = ++cnt;
        }
    }

    // 是 cnt 分图
    for (int i = 1; i <= n; ++i) {
        printf("%d ", col[i]);
    }
}
```

<div STYLE="page-break-after: always;"></div>


