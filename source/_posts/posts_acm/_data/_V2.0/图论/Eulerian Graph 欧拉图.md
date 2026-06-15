---
title: XCPC wiki - Eulerian Graph 欧拉图
tags:
  - 算法
  - 筆記
  - ACM
  - 圖論
categories:
  - - 筆記
    - XCPCwiki
abbrlink: 4e32aba2
hide: true
date: 2025-01-24 22:05:00
updated: 2025-01-24 22:05:00
description:
---

一笔画问题，也被称为欧拉路径定理或七桥问题。

- **欧拉通路** 通过图中每条边恰好一次的通路
- **欧拉回路** 通过图中每条边恰好一次的回路，即起点与终点相同的欧拉通路
- **欧拉图** 具有欧拉回路的图
- **半欧拉图** 具有欧拉通路但不具有欧拉回路的图

### 有向欧拉图

1. 有向图是欧拉图当且仅当：
    - 非零度顶点是强连通的
    - 每个顶点的入度和出度相等
2. 有向图是半欧拉图当且仅当：
    - 非零度顶点是弱连通的
    - 至多一个顶点的出度与入度之差为 1
    - 至多一个顶点的入度与出度之差为 1
    - 其他顶点的入度和出度相等

用 Hierholzer 算法找出一条欧拉(回)路，时间复杂度 $\Theta(n+m)$，如果需要输出字典序最小的欧拉(回)路，则是 $\Theta(n+m\log m)$ 的。

```cpp
int n, m;
cin >> n >> m;

vector<vector<int>> E(n);
while (m--) {
    int u, v;
    cin >> u >> v;
    u--, v--;
    E[u].push_back(v);
}

vector<int> deg(n);  // in-degree 入度
for (int u = 0; u < n; ++u) {
    sort(E[u].begin(), E[u].end(), greater<>());  // 输出字典序最小
    for (auto& v : E[u]) deg[v]++;
}

int s = -1, t = -1, ok = true;
for (int u = 0; u < n; ++u) {
    int d = E[u].size() - deg[u];  // out-in 出度-入度
    if (d == 1) {
        if (~s) ok = false;  // 至多一个顶点的出度与入度之差为 1
        s = u;
    }
    else if (d == -1) {
        if (~t) ok = false;  // 至多一个顶点的入度与出度之差为 1
        t = u;
    }
    else if (d) ok = false;  // 其他顶点的入度和出度相等
}
if (s == -1) s = 0;

vector<int> path;
auto dfs = [&](this auto&& self, int u) -> void {
    while (!E[u].empty()) {
        auto v = E[u].back();
        E[u].pop_back();
        self(v);
    }
    path.push_back(u);
};
if (ok) dfs(s);

if (path.empty()) {
    cout << "No\n";
}
else for (auto& u : vector(path.rbegin(), path.rend())) {
    cout << u + 1 << " ";
}
```


### 无向欧拉图

1. 无向图是欧拉图当且仅当：
    - 非零度顶点是连通的
    - 顶点的度数都是偶数
2. 无向图是半欧拉图当且仅当：
    - 非零度顶点是连通的
    - 恰有 2 个奇度顶点

```cpp
int n, m;
cin >> n >> m;

vector<vector<pair<int, int>>> E(n);
for (int i = 0; i < m; ++i) {
    int u, v;
    cin >> u >> v;
    u--, v--;
    E[u].push_back({ v, i });
    E[v].push_back({ u, i });
}

int ok = true;
vector<int> s;
for (int u = 0; u < n; ++u) {
    sort(E[u].begin(), E[u].end(), greater<>());
    if (E[u].size() & 1) {
        s.push_back(u);
    }
}
if (s.size() > 2) ok = false;
else if (s.empty()) s.push_back(0);
else sort(s.begin(), s.end());

vector<int> path;
vector<int> inpath(m);
auto dfs = [&](this auto&& self, int u) -> void {
    while (!E[u].empty()) {
        auto [v, id] = E[u].back(); E[u].pop_back();
        if (inpath[id]) continue; inpath[id] = 1;
        self(v);
    }
    path.push_back(u);
};
if (ok) dfs(s[0]);

if (path.empty()) {
    cout << "No\n";
}
else for (auto& u : vector(path.rbegin(), path.rend())) {
    cout << u + 1 << "\n";
}
```




关于为什么要回溯时入栈，倒着输出，而不是边遍历边输出

对比以下两种写法：

（一）

```cpp
void dfs(int u) {
    path.push_back(u);
    while (!E[u].empty()) {
        auto v = E[u].back();
        E[u].pop_back();
        dfs(v);
    }
}

for (auto& u : path) printf("%d ", u);
```

（二）

```cpp
void dfs(int u) {
    while (!E[u].empty()) {
        auto v = E[u].back();
        E[u].pop_back();
        dfs(v);
    }
    path.push_back(u);
}

reverse(path.begin(), path.end());
for (auto& u : path) printf("%d ", u);
```

先给 Hack 数据：

```
3 4
1 2
2 1
2 3
3 2
```

第一种的代码跑出来是 `1 2 1 3 2`，显然是错误的。

分析 DFS 的过程：

```
dfs(1): 包含边 2
    dfs(2): 包含边 1 3
        dfs(1): 没有边
        end
        dfs(3): 包含边 2
            dfs(2): 没有边
            end
        end
    end
end
```

问题在于「没有边」。

如果没有边，说明这个点已经遍历完毕，应该在路径的末尾输出，但 DFS 时会先进入这个点，告知程序这个点是路径末端的。但如果采用第一种代码的写法，这个点会直接计入路径并输出，这并不是我们想要的结果。

因此，路径末端的点会首先被找到，最先结束递归，并入栈，表明在结束 DFS 时入栈就是正确的。



如果有一个字典 $\Sigma$，其元素个数是 $\alpha$，那么其上的一个 de Bruijn 序列 $S$ 是一个长度为 $\alpha^n$ 的循环序列，$S$ 包含所有 $\Sigma$ 上长度为 $n$ 的子序列。

例如 $\Sigma = \lbrace 0,1 \rbrace$，其元素个数 $\alpha = 2$。如果 $n=3$，那么一个 de Bruijn 序列可以是 $S = 00011101$，其长度为 $\alpha^n = 2^3 = 8$，且包含了所有的长度为 $3$ 的子序列 $000 ,   001 ,   010 ,   011 ,   100 ,   101 ,   110 ,   111$。

为了生成包含所有长度为 $n$ 的二进制子序列的 de Bruijn 序列，画一个 de Bruijn 有向图。有向图的每一个顶点都是一个长度为 $n-1$ 的二进制的序列，共 $2^{n-1}$ 个顶点。每条有向边的边权为 $0$ 或 $1$。顶点 $A$ 指向顶点 $B$ 连边权为 $w$ 的边的条件是，把顶点 $A$ 代表的二进制序列的 **第一个** 比特 (bit) 去掉，然后在剩余的序列 **后面** 加上一个新的比特 $w$，等于顶点 $B$ 所代表的二进制序列。例如 ${\color{red}1}0110001\to 0110001{\color{blue}0},\ w={\color{blue}0}$。这个有向图中一共有 $2^{n - 1} \times 2 = 2^n$ 条边，跑欧拉回路得到的长度为 $2^n$ 的边权序列，就是包含所有 $\Sigma$ 上长度为 $n$ 的子序列的 de Bruijn 序列 $S$。