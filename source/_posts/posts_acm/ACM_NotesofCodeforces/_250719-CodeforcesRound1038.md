---
title: 'Codeforces Round 1038 A-E [250719]'
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
abbrlink: 9f8f6ca2
date: 2025-07-20 02:37:00
updated: 2025-07-20 02:37:00
---

# Codeforces Round 1038 A-E [250719]

官方题解很详细，这里就简单写一写我的思考路径。

# [2122A - Greedy Grid](https://codeforces.com/contest/2122/problem/A)

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    int t;
    cin >> t;

    while (t--) [] {
        int n, m;
        cin >> n >> m;

        if (n == 1 || m == 1 || n == 2 && m == 2) {
            cout << "NO" << endl;
        } else {
            cout << "YES" << endl; 
        }
    } ();

    return 0;
}
```

# [2122B - Pile Shuffling](https://codeforces.com/contest/2122/problem/B)

答案可以表示为 （移出去的 + 拿进来的） / 2。算一下至少移出去多少，至少拿进来多少。注意开 long long。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    int t;
    cin >> t;

    while (t--) [] {
        int n;
        cin >> n;

        ll res = 0;
        while (n--) {
            ll a, b, c, d;
            cin >> a >> b >> c >> d;

            if (b > d) {
                res += a + c + abs(b - d);
            } else {
                res += abs(a - c) + abs(b - d);
            }
        }
        cout << res / 2 << endl;
    } ();

    return 0;
}
```

# [2122C - Manhattan Pairs](https://codeforces.com/contest/2122/problem/C)

如果只有一个维度，以中位数为界分两部分就好了。但这里有二维，而且行列不独立，那可能要分别以 $x,y$ 中位数为界分四部分。

最简单的情况是，左上和右下配对，左下和右上配对。算一算是否一定可以配对好：

- 设左上、右上、右下和左下的点的个数分别为 $A,B,C,D$。
- 左右两部分相等，得到 $A+D=B+C$；
- 上下两部分相等，得到 $A+B=C+D$。
- 这两个方程相加减，就能得到 $A=C,B=D$。

这说明一定可以左上和右下配对，左下和右上配对。

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    int t;
    cin >> t;

    while (t--) [] {
        int n;
        cin >> n;

        vector<pair<int, int>> x(n), y(n);
        for (int i = 0; i < n; i++) {
            cin >> x[i].first >> y[i].first;
            x[i].second = y[i].second = i;
        }
        ranges::sort(x);
        ranges::sort(y);

        vector<pair<int, int>> res(n);
        for (int i = 0; i < n; i++) {
            res[x[i].second].first = i < n / 2;
            res[y[i].second].second = i < n / 2;
        }

        vector<int> ans[4];
        for (int i = 0; i < n; i++) {
            ans[res[i].first * 2 + res[i].second].push_back(i);
        }

        for (int i = 0; i < ans[0].size(); i++) {
            cout << ans[0][i] + 1 << " " << ans[3][i] + 1 << endl;
        }
        for (int i = 0; i < ans[1].size(); i++) {
            cout << ans[1][i] + 1 << " " << ans[2][i] + 1 << endl;
        }
        return;
    } ();

    return 0;
}
```

# [2122D - Traffic Lights](https://codeforces.com/contest/2122/problem/D)

其实题目不难，可能大多数人（包括我）看到最短路就条件反射 Dijkstra 或 BFS。这里的最短路有两种限制，而且有优先级，直接塞在 priority_queue 里排序并不好处理。不妨换个思路，枚举其中一个限制，动态求另一个限制的最小值。

具体来说，设 $d(t,x)$ 表示 $t$ 秒后到达 $x$ 点最少需要停顿多少秒。外层循环枚举时间，内层循环枚举每条边。

尽管总边数 $m=n^{2}$，但每一时刻有用的边至多 $n$ 条，所以转移的复杂度总计 $\operatorname{O}(n^{2})$。

其实有点像 Bellman-Ford 的想法，令停顿的边权为 1，正常走的边权是 0，求起点到终点的恰好 $t$ 边最短路。传统的 Bellman-Ford 中，外层循环是轮次，这里我们为轮次赋予实际意义，即时间。

```cpp
#include <bits/stdc++.h>
using namespace std;

constexpr int inf = 0x3f3f3f3f;

int main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    int t;
    cin >> t;

    while (t--) [] {
        int n, m;
        cin >> n >> m;

        vector<vector<int>> adj(n);
        for (int i = 0; i < m; i++) {
            int x, y;
            cin >> x >> y;
            x--;
            y--;
            adj[x].push_back(y);
            adj[y].push_back(x);
        }

        vector<int> f(n, inf);
        f[0] = 0;
        for (int t = 0; t < 2 * n; t++) {
            vector<int> nf(n, inf);
            for (auto x = 0; x < n; x++) {
                int y = adj[x][t % adj[x].size()];
                nf[y] = min(nf[y], f[x]);
                nf[x] = min(nf[x], f[x] + 1);
            }
            f = nf;
            if (f[n - 1] != inf) {
                cout << t + 1 << " " << f[n - 1] << endl;
                return;
            }
        }
        assert(false);
        return;
    } ();

    return 0;
}
```

# [2122E - Greedy Grid Counting](https://codeforces.com/contest/2122/problem/E)

调了两个小时……

题目中说的限制，翻译成数学语言是：
- 如果 $b_{i}>a_{i+1}$，那么这条路比另外一条路更好，必须 $b_{i}+b_{i+1} \geqslant a_{i+1}+a_{i+2}$， $b_{i}+b_{i+1}+b_{i+2} \geqslant a_{i+1}+a_{i+2}+a_{i+3}$……

移项，转化为
- 如果 $a_{i+1}-b_{i}<0$，那么必须 $b_{i}-a_{i+1} \geqslant (a_{i+2}-b_{i+1})$， $b_{i}-a_{i+1} \geqslant (a_{i+2}-b_{i+1})+(a_{i+3}-b_{i+2})$……，也就是 $b_{i}-a_{i+1} \geqslant \displaystyle \max_{j > i} \bigg\lbrace \sum_{k = i + 1}^{j} (a_{k+1}-b_{k}) \bigg\rbrace$
- 否则没有限制。

所以说 $i$ 位置 $b_{i}$ 的填法只与后面有关，考虑倒着 DP。

除了位置 $i$ 以外，关键元素是 $\displaystyle \max_{j > i} \bigg\lbrace \sum_{k = i + 1}^{j} (a_{k+1}-b_{k}) \bigg\rbrace$（这个式子是最大子段和的形式，也可以倒着递推求得），即 $a_{i+1}-b_{i}$ 的组合，于是考虑以 $a_{i+1}-b_{i}$ 这个整体做 DP。
- 设 $f(i,v)$ 表示，满足 $v=\displaystyle \max_{j > i} \bigg\lbrace \sum_{k = i + 1}^{j} (a_{k+1}-b_{k}) \bigg\rbrace$ 的方案数。
- 转移方向为 $f(i,\max\lbrace v,v+a_{i+1}-b_{i} \rbrace) \leftarrow f(i+1,v)$。转移时，外层循环枚举位置 $i$ ，内层枚举 $x=a_{i+1}-b_{i}$ 的值做转移。
- 注意，如果 $x=a_{i+1}-b_{i}<0$ 就有限制，需要控制循环的范围。

复杂度 $\mathcal{O}(nk^{2})$。

```cpp
#include <bits/stdc++.h>
using namespace std;
using Z = mull<u32, 998'244'353>;  // 取模类

int main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    int t;
    cin >> t;

    while (t--) [] {
        int n, k;
        cin >> n >> k;

        vector<int> a(n), b(n);
        for (auto& x : a) {
            cin >> x;
        }
        for (auto& x : b) {
            cin >> x;
        }

        vector<Z> f(k + 1);
        f[0] = 1;
        for (int i = n - 2; i >= 0; i--) {
            vector<Z> nf(k + 1);
            vector<int> ways(2 * k);  // 预处理转移系数
            for (int bi = 1; bi <= k; bi++) {  // b[i] = bi
                for (int aj = 1; aj <= k; aj++) {  // a[i + 1] = aj
                    if (b[i] != -1 && b[i] != bi) continue;
                    if (a[i + 1] != -1 && a[i + 1] != aj) continue;
                    ways[aj - bi + k]++;
                }
            }
            for (int x = 1 - k; x < k; x++) {  // x = a[i + 1] - b[i]
                if (x < 0) {  // 分两类 a[i + 1] < b[i] 此时有限制
                    for (int v = 0; v <= -x; v++) {  // 保证 b[i] - a[i + 1] >= v
                        nf[max(0, x + v)] += f[v] * ways[x + k];
                    }
                } else {
                    for (int v = 0; v <= k; v++) {
                        nf[min(k, x + v)] += f[v] * ways[x + k];
                    }
                }
            }
            f = move(nf);
        }
        Z res = accumulate(f.begin(), f.end(), Z(0));
        res *= (b.back() == -1 ? k : 1);
        res *= (a[0] == -1 ? k : 1);
        cout << res << endl;
        return;
    } ();

    return 0;
}
```