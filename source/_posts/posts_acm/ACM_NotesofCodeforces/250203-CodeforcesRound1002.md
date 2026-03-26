---
title: Codeforces Round 1002 (Div. 2) A - D
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
abbrlink: 81949ac
date: 2025-02-03 01:02:00
updated: 2025-02-03 01:02:00
---

以后的题解按 Q&A 的形式写，这也是我赛时的思考方法 ~

## [2059A - Milya and Two Arrays](https://codeforces.com/contest/2059/problem/A)

```cpp
#include <bits/stdc++.h>
using namespace std;    

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        set<int> a, b;
        for (int i = 0; i < n; i++) {
            int x;
            cin >> x;
            a.insert(x);
        }
        for (int i = 0; i < n; i++) {
            int x;
            cin >> x;
            b.insert(x);
        }

        cout << (a.size() + b.size() >= 4 ? "YES" : "NO") << endl;
    }
    
    return 0;
}
```

## [2059B - Cost of the Array](https://codeforces.com/contest/2059/problem/B)

卡 B 果断跳过，做完 C D 才回去写的 B。

**Q1** 条件好复杂，情况也很多，我怎么判断？

**A1** 情况很多就对了，说明这很灵活很自由。再读题，需要找第一个 $b_{i} \neq i$，那如果答案为 1，就说明要找一个 $b_{1} \neq 1$，也即 $a_{i} \neq 1$，这个条件很松。

**Q2** 还有其它限制呢，什么样的 $a_{i} \neq 1$ 满足题意？

**A2** 首先 $i>1$（1 下标）。$i$ 也不能太大，毕竟这是第一段，需要给后面留足空间，这不难推得是 $1<i \leqslant n-(k-2)$。

**Q3** 如果找不到 $a_{i} \neq 1$ 怎么办？

**A3** 答案将 $>1$，而且有很多 $a_{i}=1$。现在要找一个 $b_{2} \neq 2$。

观察第三个样例，$1<i \leqslant n-(k-2)$ 解得 $i=2,3$，于是 $b_{1}=a_{2}=1,b_{2}=a_{3}=1 \neq 2$ 就找到了一个 $b_{2} \neq 2$。

更进一步，只要解出来的 $i$ 的数量不止一个，那第二个 $i$ 就一定满足 $b_{2}=a_{i}=1 \neq 2$。

这就需要进一步分类讨论 $n=k$ 和 $n \neq k$。

**Q4** 如何实现？

**A4** 先分两种情况，$n=k$ 和 $n \neq k$。前者分段方法唯一，暴力算答案。后者进一步分为能否找到 $a_{i} \neq 1$。

```cpp
#include <bits/stdc++.h>
using LL = long long;
using ll = long long;
using namespace std;    

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n, k;
        cin >> n >> k;

        vector<int> a(n);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }       

        if (n == k) {
            int mex = 1;
            for (int i = 1; i < n; i += 2) {
                if (a[i] != mex) {
                    break;
                } else {
                    mex++;
                }
            }
            cout << mex << endl;
        } else {
            bool flag = false;
            for (int i = 1; i < n - (k - 2); i++) {
                if (a[i] != 1) {
                    flag = true;
                    break;
                }
            }
            cout << (2 - flag) << endl;
        }
    }
    
    return 0;
}
```

## [2059C - Customer Service](https://codeforces.com/contest/2059/problem/C)

**Q1** 这能做吗？

**A1** 请先检查有没有读错题：

1. 最终留下的是后缀和，而不是前缀和；

2. 除去长度为 $n$ 的后缀和，每个后缀和的长度互不相同；

3. 最大化 $n$ 个后缀和（称为 $c$ 序列）的 mex；

4. $a_{i} \geqslant 1$。*如果没有这一条，这或许是个 NP-hard 问题。*

**Q2** 我没有读错题。这道题的突破口在哪里？

**A2** 关注 $a_{i} \geqslant 1$。思考如果答案 mex $>1$，什么样的后缀和可能是 1？什么样的后缀和可能是 2？

**Q3** 请说具体点。

**A3** 我们总能清空一行，于是 $c$ 序列一定包含 $0$。

如果 mex $>1$，说明 $c$ 序列至少有一个 $1$。如果某个后缀和为 1，且每个元素 $a_{i} \geqslant 1$，那这个后缀和只能有且仅有一个元素，且这个元素为 1，也就是 xxxxx1 的形式。

如果 mex $>2$，说明 $c$ 序列至少有一个 $1$ 和一个 2。如果某个后缀和为 2，可能是 xxxxx2，也可能是 xxxx11。由于 $c$ 序列包含 $1$，所以已经存在长度为 1 的后缀和。按题意「每个后缀和的长度互不相同」，后缀和为 2 的序列只能是 xxxx11 的形式。

以此类推，后缀和为 $k$ 只能是 xxxx111...11 的形式。

记录后缀 1 的数量。每次只要能找到某个后缀长度 $\geqslant k$，就说明 $c$ 序列可以出现这个元素。

时间复杂度 $\operatorname{O}(n^{2}+n\log n)$

```cpp
#include <bits/stdc++.h>
using namespace std;    

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        priority_queue<int, vector<int>, greater<>> Q;  // 存所有后缀1的个数
        for (int i = 0; i < n; i++) {
            vector<int> a(n);
            for (int j = 0; j < n; j++) {
                cin >> a[j];
            }
            int j = n - 1;
            while (j >= 0 && a[j] == 1) {
                j--;
            }
            Q.push(n - 1 - j);  // 后缀1的个数
        }

        int mex = 0;
        while (!Q.empty()) {
            while (!Q.empty() && Q.top() < mex) {
                Q.pop();
            }
            if (Q.empty()) {
                break;
            }
            Q.pop();  // 选取一个>=mex的后缀1
            mex++;
        }
        cout << mex << endl;
    }
    
    return 0;
}
```



## [2059D - Graph and Graph](https://codeforces.com/contest/2059/problem/D)

**Q1** 什么时候结果将无限大？

**A1** 先讨论什么时候不是无限大，这说明在某一次操作之后，$|u_{1}-u_{2}|$ 总是为 0。也就是说，两张图 **至少存在一组完全相同的边**。否则，结果将无限大。

**Q2** 不考虑最小化结果，我如何判断能否走到一组点？

**A2** **BFS**。由于每一对点 $(x,y)$ 只会经过一次，所以 BFS 的不同状态数只有 $\operatorname{O}(n^{2})$，可以接受。

**Q3** 现在有很多组完全相同的边，我如何判断找到了其中一组可能的点？

**A3** 一种方法是用 `std::map` 或 `std::set` 的 `count` 函数。也可以从终点倒着 BFS（我的写法），具体来说是把所有终点一并扔到 queue 里，这样起点唯一，就好判断了。

**Q4** 如何最小化结果？

**A4** 这个问题类似于求最短路，我们仿照 **Dijkstra** 的思想，用堆存所有可能值，每次取出最小代价的一对点，push 所有相邻的点对。时间复杂度多个 $\log$。

```cpp
#include <bits/stdc++.h>
using LL = long long;
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

        int s1, s2;
        cin >> s1 >> s2;
        s1--, s2--;

        int m;
        cin >> m;
        vector<pair<int, int>> edge1(m);
        vector<vector<int>> E1(n);
        for (auto& [u, v] : edge1) {
            cin >> u >> v;
            u--, v--;
            E1[u].push_back(v);
            E1[v].push_back(u);
        }

        cin >> m;
        vector<pair<int, int>> edge2(m);
        vector<vector<int>> E2(n);
        for (auto& [u, v] : edge2) {
            cin >> u >> v;
            u--, v--;
            E2[u].push_back(v);
            E2[v].push_back(u);
        }

        priority_queue<tuple<ll, int, int>, vector<tuple<ll, int, int>>, greater<>> Q;
        for (auto [u1, v1] : edge1) {
            for (auto [u2, v2] : edge2) {
	            // 找一组完全相同的边
                if (u1 == u2 && v1 == v2) {
                    Q.push({ 0, u1, u1 });
                }
                if (u1 == v2 && v1 == u2) {
                    Q.push({ 0, u1, u1 });
                }
            }
        }

        vector vis(n, vector<int>(n));
        ll res = -1;

        while (!Q.empty()) {
            auto [d, u1, u2] = Q.top();
            Q.pop();

            if (vis[u1][u2]) continue;
            vis[u1][u2] = true;

            if (u1 == s1 && u2 == s2) {
                res = d;
                break;
            }

            d += abs(u1 - u2);

            for (auto v1 : E1[u1]) {
                for (auto v2 : E2[u2]) {
                    Q.push({ d, v1, v2 });  // 相邻的点对
                }
            }
        }

        cout << res << endl;
    }
    
    return 0;
}
```