---
title: Codeforces Round 1000 (Div. 2) A - E
tags:
  - 題解
  - 筆記
  - ACM
  - 算法
  - 練習賽
categories:
  - - 筆記
    - 練習賽
cover: /img/posts/acm/codeforces-cover.webp
top_img: /img/posts/acm/codeforces.webp
highlight_shrink: true
abbrlink: f8be5c59
date: 2025-01-22 22:49:00
updated: 2025-01-22 23:57:00
---

## [2063A - Minimal Coprime](https://codeforces.com/contest/2063/problem/A)

称一个区间 $[\ell,r]$ 为 minimal coprime，如果它不存在左右端点互素的真子区间，

- 如果原区间长度 $\geqslant 3$，考虑真子区间 $[\ell,\ell+1]$，它左右端点互素，因此不是 minimal coprime；

- 如果原区间长度 $=2$，且 $\ell>1$，则 $\ell+1=r$，它自己是互素的，其全部真子区间为 $[\ell,\ell],[r,r]$，都是左右端点不互素的，是 minimal coprime。

- 如果原区间长度 $=1$，且 $\ell \neq 1$，它自己左右端点不互素，不是 minimal coprime；

- 特别地，$[1,1]$ 是 minimal coprime，$[1,2]$ 不是 minimal coprime。

综上 $[1,1],[2,3],[3,4],[4,5]$ 这样的区间是 minimal coprime。因此如果输入 $\ell \neq 1 \land r \neq 1$，答案是 $r-\ell$，否则为 $1$。

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int a, b;
        cin >> a >> b;

        if (a == 1 && b == 1) {
            cout << 1 << endl;
        } else {
            cout << b - a << endl;
        }
    }

    return 0;
}
```


## [2063B - Subsequence Update](https://codeforces.com/contest/2063/problem/B)

不能同时选中 $[\ell,r]$ 左边的和右边的，因为这样交换仍然不在 $[\ell,r]$ 内。

找 $[1,r]$ 最小的若干数，找 $[\ell,n]$ 最小的若干数，两者最小值即是答案。总复杂度 $\operatorname{O}(n\log n)$。

```cpp
#include <bits/stdc++.h>
using ll = long long;
using namespace std;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n, l, r;
        cin >> n >> l >> r;
        l--;

        vector<int> L, R;
        for (int i = 0; i < n; i++) {
            int x;
            cin >> x;
            if (i < r) {
                L.push_back(x);
            }
            if (i >= l) {
                R.push_back(x);
            }
        }

        sort(L.begin(), L.end());
        sort(R.begin(), R.end());
        
        ll ansa = accumulate(L.begin(), L.begin() + r - l, 0LL);
        ll ansb = accumulate(R.begin(), R.begin() + r - l, 0LL);

        cout << min(ansa, ansb) << endl;
    }
    
    return 0;
}
```

## [2063C - Remove Exactly Two](https://codeforces.com/contest/2063/problem/C)（枚举）

随意贪心一般是错的，复杂度允许的情况下请尽可能多枚举。

具体来说，枚举删去的第一个点 $u$，再枚举另外一个点 $v$。第二次枚举有一些技巧，分两类讨论：

- 与 $u$ 相邻的点 $v$，直接枚举。由于总边数是 $n-1$，那么总枚举次数是 $2(n-1)$。复杂度 $\operatorname{O}(n)$。

- 与 $u$ 不相邻的点 $v$，这数量有点多，不能枚举，但是可以贪心选 deg 最大的那个 $v$。具体实现方法是，用堆存储所有的 deg，第一次枚举到 $u$ 时，删去与之相邻的所有点，查找最大值，再将刚删去的点加回来。复杂度 $\operatorname{O}(n\log n)$。

总复杂度 $\operatorname{O}(n\log n)$。

```cpp
#include <bits/stdc++.h>
using ll = long long;
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    
    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        vector<vector<int>> E(n);
        vector<int> deg(n);
        for (int i = 1; i < n; i++) {
            int u, v;
            cin >> u >> v;
            u--, v--;
            E[u].push_back(v);
            E[v].push_back(u);
            deg[u]++;
            deg[v]++;
        }

        int res = 0;
        multiset<int> s;
        for (int u = 0; u < n; u++) {
            s.insert(deg[u]);
        }
        for (int u = 0; u < n; u++) {
            s.extract(deg[u]);
            for (auto v : E[u]) {
                s.extract(deg[v]);
            }
            if (!s.empty()) {
                res = max(res, deg[u] + *s.rbegin() - 1);
            }
            for (auto v : E[u]) {
                s.insert(deg[v]);
            }
            s.insert(deg[u]);
            for (auto v : E[u]) {
                res = max(res, deg[u] + deg[v] - 2);
            }
        }

        cout << res << endl;
    }

    return 0;
}
```


## [2063D - Game With Triangles](https://codeforces.com/contest/2063/problem/D)（反悔贪心）

$k$ 最大值为 $\min\Big\lbrace n,m, \dfrac{n+m}{3} \Big\rbrace$。

比较 $a$ 和 $b$ 中最远的两个哪个更远，选更远的删去（不妨设删去了 $a$ 的头和尾），那还需要在 $b$ 中删去一个数，显然是删中间的。这里不用真实地删，**记录个数就行**。

如果还能操作，但 $b$ 剩下的元素很多，而 $a$ 不到两个元素，就需要 **反悔「退货」**（样例 3）。把刚刚删掉的那个加回来，撤销上一次的一切操作，这样退回来两个 $a$ 和一个 $b$，就可以愉快操作 $b$ 数组了。

除排序外时间复杂度线性。

```cpp
#include <bits/stdc++.h>
using ll = long long;
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    
    int t;
    cin >> t;

    while (t--) {
        int n, m;
        cin >> n >> m;

        deque<ll> a(n), b(m);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }
        for (int i = 0; i < m; i++) {
            cin >> b[i];
        }
        sort(a.begin(), a.end());
        sort(b.begin(), b.end());

        int kmax = min({ (n + m) / 3, n, m });
        cout << kmax << endl;

        ll res = 0;
        stack<pair<ll, ll>> A, B;
        int cntA = n, cntB = m;
        auto adda = [&] {
            assert(cntA >= 2 && cntB >= 1);
            auto al = a.front(); a.pop_front();
            auto ar = a.back(); a.pop_back();
            res += ar - al;
            cntA -= 2;
            cntB -= 1;
            A.push({ al, ar });
        };
        auto addb = [&] {
            assert(cntB >= 2 && cntA >= 1);
            auto bl = b.front(); b.pop_front();
            auto br = b.back(); b.pop_back();
            res += br - bl;
            cntA -= 1;
            cntB -= 2;
            B.push({ bl, br });
        };
        auto dela = [&] {
            auto [al, ar] = A.top();
            res -= ar - al;
            cntA += 2;
            cntB += 1;
            A.pop();
        };
        auto delb = [&] {
            auto [bl, br] = B.top();
            res -= br - bl;
            cntA += 1;
            cntB += 2;
            B.pop();
        };
        
        for (int k = 0; k < kmax; k++) {
            if (cntA >= 2 && cntB >= 2 && a.back() - a.front() > b.back() - b.front() || cntA >= 2 && cntB == 1) {
                adda();
            } else if (cntB >= 2 && cntA >= 2 && a.back() - a.front() <= b.back() - b.front() || cntB >= 2 && cntA == 1) {
                addb();
            } else if (cntB == 0) { 
                delb();[  // 反悔
                adda();
                adda();
            } else if (cntA == 0) {
                dela();
                addb();
                addb();
            } else {
                assert(false);
            }
            cout << res << " ";
        }
        cout << endl;
    }

    return 0;
}
```


## [2063E - Triangle Tree](https://codeforces.com/contest/2063/problem/E)（数学）

题目说着玄乎，变形一下拆项求就行，主要考细心。

如果已知三角形两条边 $a,b$，那么第三边 $c$ 的取值种类是 $(a+b)-|a-b|-1$。

- 对于好 pair $(u,v)$，按题意 $a=d_{u}-d_{lca},\ b=d_{v}-d_{lca}$（$d$ 表示深度），代入上式得到 $d_{u}+d_{v}-2d_{lca}-|d_{u}-d_{v}|-1$。

- 题目说，坏的 pair 定义为 0，事实上，如果将坏 pair 代入上面的计算公式，结果总是 -1。

- 也就是说求和的时候 -1 那项只有好 pair 要计算，坏 pair 按 $d_{u}+d_{v}-2d_{lca}-|d_{u}-d_{v}|$ 计算即可。

对所有 $u,v$ 求和，
$$
\begin{aligned}
&\sum_{1 \leqslant  u \leqslant  v \leqslant n }[d_{u}+d_{v}-2d_{lca}-|d_{u}-d_{v}|+(\text{如果好就-1})] \\
=&-\text{好pair总数}+\sum_{1 \leqslant  u \leqslant  v \leqslant n }(d_{u}+d_{v}-2d_{lca}-|d_{u}-d_{v}|) \\
=&-\text{好pair总数}+\sum_{1 \leqslant  u \leqslant  v \leqslant n }(d_{u}+d_{v})-2\sum_{1 \leqslant  u \leqslant  v \leqslant n }d_{lca}-\sum_{1 \leqslant  u \leqslant  v \leqslant n }|d_{u}-d_{v}|
\end{aligned}
$$

逐项计算：

1. 好 pair 总数：也就是对于每个点 $u$，有哪些 pair $(v,w)$ 的 LCA 是点 $u$，这里要求 $v \neq u,w \neq u$。这个问题蛮常见的。遍历 $u$ 的所有儿子，每个儿子的子树中任意点可以选其它儿子的子树的任意节点。

2. $\displaystyle \sum_{1 \leqslant  u \leqslant  v \leqslant n }(d_{u}+d_{v})$：这就等于 $(n+1)d_{u}$，因为如果 $u \neq v$，有 $n-1$ 个 $d_{u}$，如果 $u=v$，还有俩 $d_{u}$。

3. $\displaystyle \sum_{1 \leqslant  u \leqslant  v \leqslant n }d_{lca}$：这个 $\sum$ 表示个数，表示有哪些 pair $(v,w)$ 的 LCA 是点 $u$，这里允许 $v=u$，在好 pair 总数中加上 $\operatorname{siz}_{u}$ 即可。

4. $\displaystyle \sum_{1 \leqslant  u \leqslant  v \leqslant n }|d_{u}-d_{v}|$：就是求一堆数中两两差之和，先排序，排名第 $i$ （0 下标）的系数是 $n-2i-1$。

```cpp
#include <bits/stdc++.h>
using ll = long long;
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    
    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        vector<vector<int>> E(n);
        for (int i = 1; i < n; i++) {
            int u, v;
            cin >> u >> v;
            u--, v--;
            E[u].push_back(v);
            E[v].push_back(u);
        }

        vector<int> dep(n), siz(n);
        ll res = 0;
        auto dfs = [&](this auto&& dfs, int u, int p) -> void {
            ll cnt = 0, sum = 0;  // 算 1 3
            siz[u] = 1;
            for (auto v : E[u]) {
                if (v == p) continue;
                dep[v] = dep[u] + 1;
                dfs(v, u);
                siz[u] += siz[v];
                cnt += siz[v] * sum;
                sum += siz[v];
            }
            res -= 2 * (cnt + siz[u]) * dep[u];  // 算 3
            res -= cnt;  // 算 1
        };
        dfs(0, -1);
        
        sort(dep.begin(), dep.end());
        for (int i = 0; i < n; i++) {
            res += 1LL * (n + 1) * dep[i];          // 算 2
            res += 1LL * dep[i] * (n - i - 1 - i);  // 算 4
        }

        cout << res << endl;
    }

    return 0;
}
```

