---
title: 樹上問題 - 樹形 DP
tags:
  - 算法
  - 圖論
  - 筆記
  - ACM
categories:
  - - 筆記
    - 算法筆記
abbrlink: 43a1bd89
date: 2024-05-08 12:00:00
updated: 2024-05-08 12:00:00
description:
---

# TreeDP

1. 树，有根有点权。点集 $S$ 满足：若父节点 $\in S$，则子节点 $\not\in S$。最大化 $S$ 点权和。（**树的最大独立集**）

```cpp
int n, w[N], dp[N][2];
void dfs(int u) {
    dp[u][1] = w[u];
    for (auto v : E[u]) {
        dfs(v);
        dp[u][0] += max(dp[v][0], dp[v][1]);
        dp[u][1] += dp[v][0];
    }
}
print(max(dp[rt][0], dp[rt][1]));
```

2. 树，有根有点权。$m$ 元点集 $S$ 满足：若子节点 $\in S$，则父节点 $\in S$。最大化 $S$ 点权和。（**树上背包**）

```cpp
int n, m, w[N], dp[N][M];
void dfs(int u) {
    dp[u][1] = w[u];
    for (auto v : E[u]) {
        dfs(v);
        for (int k = m; k >= 1; --k) {
            for (int i = k; i <= m; ++i)
                dp[u][i] = max(dp[u][i], dp[u][k] + dp[v][i-k]);  // i>=k
        }
    }
}
printf(dp[st][m]);
```

3. 树，有点权。最大化子树点权和。（**最大点权和**）

```cpp
int n, w[N], dp[N];
int ans = -0x3f3f3f3f;
void dfs(int u) {
    dp[u] = w[u];
    for (auto v : E[u]) {
        dfs(v);
        dp[u] = max(dp[u] + dp[v], dp[u]);
    }
    ans = max(ans, dp[u]);
}
print(ans);
```

4. 树。点集 $S$ 满足：对于树的每一条边 $E_{uv}$，有 $u\in S \lor v\in S$。最小化 $S$ 的元素数量。（**树的最小点覆盖**）

```cpp
int n, dp[N][2];
void dfs(int u) {
    dp[u][0] = 0, dp[u][1] = 1;
    for (auto v : E[u]) {
        dfs(v);
        dp[u][0] += dp[v][1];
        dp[u][1] += min(dp[v][1], dp[v][0]);
    }
}
print(min(dp[rt][0], dp[rt][1]));
```

5. 树。求一个结点，使得以这个结点为根时，所有结点的深度之和最大。（**换根 DP**）

```cpp
int n, siz[N], dep[N], dp[N];
int mnnum = 0;
void dfs(int u, int fau = 0) {
    siz[u] = 1;
    dp[u] = dep[u] = dep[fau] + 1;
    for (auto v : E[u]) {
        if (v == fau) continue;
        dfs(v, u);
        siz[u] += siz[v];
        dp[u] += dp[v];
    }
}
void dfs2(int u, int fau = 0) {
    for (auto v : E[u]) {
        if (v == fau) continue;
        dp[v] = dp[u] - (siz[v]) + (n - siz[v]);
        dfs2(v, u);
    }
    if (dp[u] >= dp[mnnum]) mnnum = u;
}
print(mnnum);
```

6. 树。求树上最长路径的长度。（**树的直径**）

```cpp
int n, d, dp1[N], dp2[N];
void dfs(int u, int fau = -1) {
    dp1[u] = dp2[u] = 0;
    for (auto v : E[u]) {
        if (v == fau) continue;
        dfs(v, u);
        int t = dp1[v] + 1;
        if (t > dp1[u]) dp2[u] = dp1[u], dp1[u] = t;
        else if (t > dp2[u]) dp2[u] = t;
    }
    d = std::max(d, dp1[u] + dp2[u]);
}
print(d);
```



## 例题

树。$n$ 个节点，以 $1$ 为根。每个叶节点不重不漏地填上 $1,2,\cdots, k$ 的数字；每个非叶节点都有一个操作 max 或 min，表示此节点点权等于其所有子节点点权中最大（小）值。求根节点点权的最大值。(1900, [CF1153D](https://codeforces.com/problemset/problem/1153/D))

```cpp
int dp[N];
int cnt = 0;  // 叶的数量
void dfs(int u) {
	if (E[u].empty()) dp[u] = 1, cnt += 1;
	if (w[u]) dp[u] = 2e9;
	for (auto v : E[u]) {
		dfs(v);
		if (w[u] == 0) dp[u] += dp[v];
		else dp[u] = min(dp[u], dp[v]);
	}
}
print(cnt + 1 - dp[1])
```



树。$n$ 个节点。求树上路径长度等于 $k$ 的数量。(1800, [CF161D](https://codeforces.com/problemset/problem/161/D))

```cpp
int k, dp[N][K];
ll ans = 0;
void dfs(int u, int fau = -1) {
	for (auto v : E[u]) {
		if (v == fau) continue;
		dfs(v, u);
		for (int i = 1; i <= k; ++i) ans += dp[v][i - 1] * dp[u][k - i];
		for (int i = 1; i <= k; ++i) dp[u][i] += dp[v][i - 1];
	}
	dp[u][0] = 1;
	ans += dp[u][k];
}
print(ans);
```