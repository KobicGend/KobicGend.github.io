---
title: Easy Ver.
tags:
  - ACM
  - 算法
  - 筆記
categories:
  - 邏輯與算法
  - 問題
  - 原創問題
abbrlink: 3f840476
---

## Statement

*The only difference between the easy and hard versions is that in this version, you **cannot** perform any operations to change the vertex weights.*

You are given a tree consisting of $N$ vertices. Each vertex $i$ is assigned a weight $W_i \in \{0, 1\}$.

We define the weight of a simple path as follow: 

- Let $P = (v_0, v_1, \dots, v_k)$ be a simple path from vertex $U$ to vertex $V$, such that $v_0 = U$, $v_k = V$. 
- Let $S(P)$ be the binary string formed by sequentially concatenating the weights of the vertices along the path: $S(P) = w(v_0) + w(v_1) + \dots + w(v_k)$, where $+$ denotes the string concatenation operator. 
- The path weight $\mathcal{W}(P)$ is the numerical value of $S(P)$ interpreted as a binary number.

Your task is to find the maximum possible numerical value represented by such a binary string over all simple paths in the tree, and output this maximum value as a binary string.

给定一棵包含 $N$ 个节点的树。点权 $W_i \in \{0, 1\}$。

定义简单路径的权值：将沿途经过的节点的权重 $W_i$ 按访问顺序拼接而成的二进制字符串所代表的数值。

请计算整棵树中所有简单路径权值的最大值，并以二进制字符串的形式输出该最大值。

## Input

The first line contains a single integer $N$ ($1 \leqslant N \leqslant 10^6$) — the number of vertices in the tree.

The second line contains $N$ integers $W_1, W_2, \ldots, W_N$ ($W_i \in \{0, 1\}$) — the weights assigned to each vertex.（或者改成字符串读入）

Each of the next $N - 1$ lines contains two integers $U$ and $V$ ($1 \le U, V \le N$, $U \neq V$) — denoting an undirected edge between vertex $U$ and vertex $V$.

It is guaranteed that the given edges form a valid tree.

## Output

Print a single binary string (without leading zeros, unless the answer is simply "0") representing the maximum weight among all possible simple paths in the tree.

## Solution

特判全树无点权为 1 的节点。否则一定选择一个 1，走最长的链。

首先预处理两个东西：

- 【点能走的最大长度】维护节点向下的最大链长 $f_{\text{down}}(x)$、以及向上的最大链长 $f_{\text{up}}(x)$。

  - 很经典的 DP。
  - 第一趟 DFS（自底向上）：$f_{\text{down}}(x) = 1 + \max_{v \in \text{children}(x)} \{f_{\text{down}}(v)\}$

  - 第二趟 DFS（自顶向下）：$f_{\text{up}}(y) = 1 + \max \left( f_{\text{up}}(x), 1 + \max_{z \in \text{sibling}(y)} f_{\text{down}}(z) \} \right)$

  - 节点 $x$ 能延伸的最大长度为 $L(x) = \max(f_{\text{down}}(x), f_{\text{up}}(x))$

- 【有向边能走的最大长度】有向边从节点 $u$ 指向节点 $v$ 的最大延伸长度为 $E(u, v)$：

  - 若 $v$ 是 $u$ 的父节点：$E(u, v) = f_u(u)$

  - 若 $v$ 是 $u$ 的子节点：$E(u, v) = f_d(v) + 1$

主流程：

- 【枚举边】倒序枚举当前路径还剩下多少长度 $l$，枚举满足 $E(u, v)=l$ 的所有边 $(u,v)$。
- 【检查边的合法性——可达】同时维护哪些点当前可达，不枚举不可达的边。
- 【检查边的合法性——简单】题目要求是简单路径。如果起点 `x` 在上一轮只有一种走法来到这里，并且当前要去的节点 `y` 刚好就是上一轮来到 `x` 的来源，那么这就是走回头路了，`continue` 跳过这条边。反过来，如果有多种不同的路径可以到达 `x`，即使其中一条来自 `y`，我们也可以选择从其他路径走过来，再走向 `y`。这时候走向 `y` 就是合法的。
- 【走最大，筛选下一步的边】根据终点 `y` 的权重是 0 还是 1 分类。优先选 1。筛选出下一步可行的边。
- 【更新相关信息】清空上一轮的活跃节点信息，维护哪些点当前可达，和走到的方法数。

复杂度 $O(N)$。

## Code

```cpp
#include <bits/stdc++.h>

int main() {
    std::ios::sync_with_stdio(false);
    std::cin.tie(nullptr);

    int N;
    std::cin >> N;

    std::vector<int> W(N);
    for (int i = 0; i < N; i++) {
        std::cin >> W[i];
    }

    std::vector<std::vector<int>> Adj(N);
    for (int i = 0; i < N - 1; i++) {
        int X, Y;
        std::cin >> X >> Y;
        X--; 
        Y--;
        Adj[X].push_back(Y);
        Adj[Y].push_back(X);
    }

    std::vector<int> down(N);
    std::vector<std::vector<std::pair<int, int>>> edges_by_maxlen(N + 1);

    auto dfs1 = [&](this auto&& dfs1, int x, int p) -> void {
        if (p != -1) {
            Adj[x].erase(std::ranges::find(Adj[x], p)); 
        }
        down[x] = 1;
        for (auto y : Adj[x]) {
            dfs1(y, x);
            down[x] = std::max(down[x], down[y] + 1);
            edges_by_maxlen[down[y] + 1].push_back({x, y});
        }
    };
    dfs1(0, -1);

    std::vector<int> up(N);
    auto dfs2 = [&](this auto&& dfs2, int x) -> void {
        int m = Adj[x].size();
        std::vector<int> pre(m + 1);
        std::vector<int> suf(m + 1);
        for (int i = 0; i < m; i++) {
            auto y = Adj[x][i];
            pre[i + 1] = std::max(pre[i], down[y]);
        }
        for (int i = m - 1; i >= 0; i--) {
            auto y = Adj[x][i];
            suf[i] = std::max(suf[i + 1], down[y]);
        }
        for (int i = 0; i < m; i++) {
            auto y = Adj[x][i];
            int max_sibling = std::max(pre[i], suf[i + 1]);
            up[y] = 1 + std::max(up[x], max_sibling > 0 ? max_sibling + 1 : 0);
            edges_by_maxlen[up[y]].push_back({y, x});
            dfs2(y);
        }
    };
    up[0] = 1;
    dfs2(0);

    int maxL = 0;
    std::vector<int> L(N);
    for (int i = 0; i < N; i++) {
        if (W[i] == 1) {
            L[i] = std::max(down[i], up[i]);
            maxL = std::max(maxL, L[i]);
        }
    }

    if (maxL == 0) {
        std::cout << "0\n";
        return 0;
    }

    std::string ans = "1";
    std::vector<int> active_nodes;
    std::vector<int> reach_count(N);

    for (int i = 0; i < N; i++) {
        if (W[i] == 1 && L[i] == maxL) {
            reach_count[i] = int('cutecube');
            active_nodes.push_back(i);
        }
    }

    std::vector<int> from(N, -1);
    for (int l = maxL; l >= 2; l--) {
        std::array<std::vector<std::pair<int, int>>, 2> valid_edges;
        for (auto [x, y] : edges_by_maxlen[l]) {            
            if (reach_count[x] > 0) {
                if (reach_count[x] == 1 && y == from[x]) {
                    continue;
                }
                valid_edges[W[y]].push_back({x, y});
            }
        }
        
        int maxW = 0;
        for (auto w : {0, 1}) {
            if (!valid_edges[w].empty()) {
                maxW = w;
            }
        }
        ans += maxW + '0';
        
        for (auto x : active_nodes) {
            reach_count[x] = 0;
            from[x] = -1;
        }
        active_nodes.clear();
        
        for (auto [x, y] : valid_edges[maxW]) {
            if (reach_count[y] == 0) {
                from[y] = x;
                active_nodes.push_back(y);
            }
            reach_count[y]++;
        }
    }

    std::cout << ans << "\n";

    return 0;
}
```


