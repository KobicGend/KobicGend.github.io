---
title: XCPC wiki - 2-Sat
tags:
  - 算法
  - 筆記
  - ACM
  - 圖論
categories:
  - - 筆記
    - XCPCwiki
abbrlink: 5c90a9e2
hide: true
date: 2025-01-24 22:05:00
updated: 2025-01-24 22:05:00
description:
---


```cpp
struct TwoSat {
	int n;
	vector<vector<int>> E;
	vertor<int> ans;
	TwoSat(int n) : n(n), E(2 * n), ans(n) {}
	void add(int u, bool f, int v, bool g) {
		E[2 * u + !f].push_back(2 * v + g);
		E[2 * v + !g].push_back(2 * u + f);
	}
	bool satisfiable() {
		vector<int> id(2 * n, -1), dfn(2 * n, -1), low(2 * n, -1);
		vector<int> stk;
		int unix = 0, cnt = 0;
		function<void(int)> tarjan = [&](int u) {
			stk.push_back(u);
			dfn[u] = low[u] = unix++;
			for (auto v : E[u]) {
				if (dfn[v] == -1) {
					tarjan(v);
					low[u] = min(low[u], low[v]);
				} else if (id[v] == -1) {
					low[u] = min(low[u], dfn[v]);
				}
			}
			if (dfn[u] == low[u]) {
				int v;
				do {
					v = stk.back();
					stk.pop_back();
					id[v] = cnt;
				} while (v != u);
				++cnt;
			}
		};
		for (int i = 0; i < 2 * n; ++i) if (dfn[i] == -1) tarjan(i);
		for (int i = 0; i < n; ++i) {
			if (id[2 * i] == id[2 * i + 1]) return false;
			ans[i] = id[2 * i] > id[2 * i + 1];
		}
		return true;
	}
	vertor<int> answer() { return ans; }
};
```