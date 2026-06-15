---
title: Codeforces Round 1007 (Div. 2) ABCE
tags:
  - 題解
  - 筆記
  - ACM
  - 算法
  - 練習賽
categories:
  - posts_acm
  - 賽事
  - Codeforces
cover: /img/posts/acm/codeforces-cover.webp
top_img: /img/posts/acm/codeforces.webp
highlight_shrink: true
abbrlink: c56c8314
date: 2025-03-01 09:08:00
updated: 2025-03-01 09:08:00
---

## [2071A - The Play Never Ends](https://codeforces.com/contest/2071/problem/A)


{% folding blue, 题解 %}

三人的排列方式实际是唯一的。

{% endfolding %}


```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        cout << (n % 3 == 1 ? "YES" : "NO") << endl;
    }

    return 0;
}
```

## [2071B - Perfecto](https://codeforces.com/contest/2071/problem/B)

{% folding blue, 题解 %}

不止 1 无解，例如 $1+2+\dots+8=36=6^{2}$，8 也无解。需要判断有无解，并避免出现这样的前缀。

可以构造 $2,1,3,4,5,6,7,9,8,10,11,\dots$，把 1 2 交换，8 9 交换……

记得开 long long。

{% endfolding %}


```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    // int x = 0;
    // for (int i = 1; i <= 100; i++) {
    //     x += i;
    //     if (1ll * (int)sqrt(x) * (int)sqrt(x) == x) cout << i << " ";
    // }

    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        ll x = 0;
        vector<int> res;
        for (int i = 1; i <= n; i++) {
            x += i;
            res.push_back(i);
            if (1ll * int(sqrt(x)) * int(sqrt(x)) == x) {
                res.pop_back();
                res.push_back(i + 1);
                x += i + 1;
                res.push_back(i);
                i++;
            }
        }

        if (res.size() != n) {
            cout << -1 << endl;
        } else {
            for (auto x : res) {
                cout << x << " ";
            }
            cout << endl;
        }
    }

    return 0;
}
```

## [2071C - Trapmigiano Reggiano](https://codeforces.com/contest/2071/problem/C)

{% folding blue, 方法一 %}

直观感受，需要把老鼠逼到起点到终点的路径上，应该先操作离路径远的，再操作离路径近的，这样尽管先拉远了最后也能拉回来。

依次考虑从起点到终点的路径（鱼的脊骨）上每个点 $u$，再考虑 $u$ 子树（也就是鱼的侧刺）上的所有点，将这些点按深度从深到浅输出。

为什么是对的呢，对于这个点 $u$，操作完深度 $x$ 的节点后，老鼠的深度必定 $\leqslant x$，这样最终老鼠位于 $u$ 点。按路径操作后，老鼠就在终点了。

{% endfolding %}


```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    int J;
    cin >> J;

    while (J--) {
        int n, s, t;
        cin >> n >> s >> t;
        s--;
        t--;

        vector<vector<int>> E(n);
        for (int i = 1; i < n; i++) {
            int u, v;
            cin >> u >> v;
            u--;
            v--;
            E[u].push_back(v);
            E[v].push_back(u);
        }

        // 找到s-t路径上所有点
        vector<int> vis(n), from(n, -1), path;
        auto dfs = [&](this auto&& self, int u, int p) {
            if (u == s) {
                while (u != -1) {
                    path.push_back(u);
                    vis[u] = 1;
                    u = from[u];
                }
            } else ​for (auto v : E[u]) {
                if (v == p) continue;
                from[v] = u;
                self(v, u);
            }
        };
        dfs(t, -1);
        
        vector<int> dep(n);
        for (int i = 0; i < path.size(); i++) {
            auto u = path[i];
            set<pair<int, int>> s;
            auto dfs2 = [&](this auto&& self, int u, int p) -> void {
                s.insert({ -dep[u], u });
                for (auto v : E[u]) {
                    if (v == p || vis[v]) continue;
                    dep[v] = dep[u] + 1;
                    self(v, u);
                }
            };
            dfs2(u, -1);
            for (auto [_, u] : s) {
                cout << (u + 1) << " ";
            }
        }
        cout << endl;
    }

    return 0;
}
```

{% folding blue, 方法二 %}

实际上和路径没什么关系，目标是把老鼠逼到终点，所以以终点为根， 将所有点按深度从深到浅输出即可。仍然是操作完深度 $x$ 的节点后，老鼠的深度必定 $\leqslant x$，最终老鼠位于根。

{% endfolding %}

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    int J;
    cin >> J;

    while (J--) {
        int n, t;
        cin >> n >> t >> t;
        t--;

        vector<vector<int>> E(n);
        for (int i = 1; i < n; i++) {
            int u, v;
            cin >> u >> v;
            u--;
            v--;
            E[u].push_back(v);
            E[v].push_back(u);
        }
        
        set<pair<int, int>> s;
        vector<int> dep(n);
        auto dfs2 = [&](this auto&& self, int u, int p) -> void {
            s.insert({ -dep[u], u });
            for (auto v : E[u]) {
                if (v == p) continue;
                dep[v] = dep[u] + 1;
                self(v, u);
            }
        };
        dfs2(t, -1);
        
        for (auto [_, u] : s) {
            cout << (u + 1) << " ";
        }
        cout << endl;
    }

    return 0;
}
```

## [2071E - LeaFall](https://codeforces.com/contest/2071/problem/E)

以下把题目中的 $\dfrac{p_{i}}{q_{i}}$ 记作 $p_{i}$，落下的概率是 $p_{i}$，没落下的概率是 $(1-p_{i})$。

{% folding blue, 拆解问题 %}

{% folding blue, 某一个点成为叶子的条件及概率 %}

这个点只能连一条边，也就是他邻居中除了一个点外都落下。当然，自己也不能落下。

比如它有三个邻居 123，那么成为叶子的概率就是 $\displaystyle (1-p_{u})\big[p_{1}p_{2}(1-p_{3})+p_{1}(1-p_{2})p_{3}+(1-p_{1})p_{2}p_{3}\big]$，化简得 $w_{u}=\displaystyle (1-p_{u})p_{1}p_{2}p_{3}\bigg(\dfrac{1-p_{1}}{p_{1}}+\dfrac{1-p_{2}}{p_{2}}+\dfrac{1-p_{3}}{p_{3}}\bigg)$。记 $\operatorname{prod}_{u}=(1-p_{u})p_{1}p_{2}p_{3}$。

```cpp
vector<Z> prod(n, 1);
vector<Z> wwww(n, 1);
for (int u = 0; u < n; u++) {
    Z sum = 0;
    for (auto v : E[u]) {
        prod[u] *= p[v];
        sum += (1 - p[v]) / p[v];
    }
    prod[u] *= (1 - p[u]);
    wwww[u] = prod[u] * sum;
}
```


{% endfolding %}



{% folding blue, 题目要求两个点，什么时候两个点相互独立，都是叶子概率是多少？ %}

刚才提到，一个点能否是叶子只与它自己和它的邻居有关。若要求相互独立，那 $u,v$ 就不能有共同的邻居，也就是说，这两个点的距离至少为 3。

相互独立，概率就好算了，两两的 $w_{u}$ 之积再求和。

这里先不管是否独立，一股脑都加上，等后面再修正。

```cpp
Z sum = 0;
for (int u = 0; u < n; u++) {
    res += sum * wwww[u];
    sum += wwww[u];
}
```

{% endfolding %}



{% folding blue, 如果两个点相邻，都是叶子概率是多少？ %}

这两个点都不能落下，所以其他邻居都要落下。概率是 $\dfrac{\operatorname{prod}_{u}}{p_{v}}\cdot\dfrac{\operatorname{prod}_{v}}{p_{u}}$。

```cpp
for (auto [u, v] : edge) {
    res -= wwww[u] * wwww[v];
    res += prod[u] * prod[v] / p[u] / p[v];
}
```

{% endfolding %}




{% folding blue, 如果两个点距离为 2（隔一个点 x），都是叶子概率是多少？ %}

从刚才相互独立的情形考虑，我们多算了哪些情形？是 $u$ 认为 $x$ 没有掉落（$u$ 成为叶子的前提是 $x$ 没有掉落），而 $v$ 认为 $x$ 掉落了。需要把这种情况的概率减掉。

 $u$ 认为 $x$ 没有掉落的概率是 $\operatorname{stay}_{u,x}=\operatorname{prod}_{u}\cdot \dfrac{1-p_{u}}{p_{u}}$，认为 $x$ 掉落的概率是 $\operatorname{fall}_{u,x}=w_{u}-\operatorname{stay}_{u,x}$。
 
那么上述情况的概率是 $\operatorname{stay}_{u,x}\cdot \operatorname{fall}_{v,x}$。

```cpp
Z sum = 0;
for (int i = 0; i < E[u].size(); i++) {
    auto v = E[u][i];
    stay[i] = prod[v] * (1 - p[u]) / p[u]; 
    fall[i] = wwww[v] - stay[i];
    sum += fall[i];
}
```

做到这里还不对。

$u$ 和 $v$ 都认为 $x$ 掉落时也有一些小问题，我们把 $x$ 掉落的概率算了两边，需要除掉一个。也就是减去错误的 $\operatorname{fall}_{u,x}\cdot\operatorname{fall}_{v,x}$ 再加上正确的 $\dfrac{\operatorname{fall}_{u,x}\cdot\operatorname{fall}_{v,x}}{p_{x}}$。

$u$ 和 $v$ 都认为 $x$ 没有掉落时也时同理。

```cpp
Z sumstay = 0;
Z sumfall = 0;
for (int i = 0; i < E[u].size(); i++) {
    res -= stay[i] * (sum - fall[i]);

    res -= sumstay * stay[i];
    res += sumstay * stay[i] / (1 - p[u]);
    sumstay += stay[i];

    res -= sumfall * fall[i];
    res += sumfall * fall[i] / (p[u]);
    sumfall += fall[i];
}
```

{% endfolding %}

{% endfolding %}



```cpp
using Z = ModInt<998244353>;

int main() {
    int J;
    cin >> J;

    while (J--) {
        int n;
        cin >> n;

        vector<Z> p(n);
        for (int i = 0; i < n; i++) {
            int x, y;
            cin >> x >> y;
            p[i] = Z(x) / y;
        }

        vector<vector<int>> E(n);
        vector<pair<int, int>> edge;
        for (int i = 1; i < n; i++) {
            int u, v;
            cin >> u >> v;
            u--;
            v--;
            E[u].push_back(v);
            E[v].push_back(u);
            edge.push_back({ u, v });
        }

        vector<Z> prod(n, 1);
        vector<Z> wwww(n, 1);
        for (int u = 0; u < n; u++) {
            Z sum = 0;
            for (auto v : E[u]) {
                prod[u] *= p[v];
                sum += (1 - p[v]) / p[v];
            }
            prod[u] *= (1 - p[u]);
            wwww[u] = prod[u] * sum;
        }

        Z res = 0;
        Z sum = 0;
        for (int u = 0; u < n; u++) {
            res += sum * wwww[u];
            sum += wwww[u];
        }

        // 隔一个
        for (int u = 0; u < n; u++) {
            vector<Z> stay(E[u].size());
            vector<Z> fall(E[u].size());

            Z sum = 0;
            for (int i = 0; i < E[u].size(); i++) {
                auto v = E[u][i];
                stay[i] = prod[v] * (1 - p[u]) / p[u]; 
                fall[i] = wwww[v] - stay[i];
                sum += fall[i];
            }

            Z sumstay = 0;
            Z sumfall = 0;
            for (int i = 0; i < E[u].size(); i++) {
                res -= stay[i] * (sum - fall[i]);

                res -= sumstay * stay[i];
                res += sumstay * stay[i] / (1 - p[u]);
                sumstay += stay[i];

                res -= sumfall * fall[i];
                res += sumfall * fall[i] / (p[u]);
                sumfall += fall[i];
            }
        }

        // 挨着
        for (auto [u, v] : edge) {
            res -= wwww[u] * wwww[v];
            res += prod[u] * prod[v] / p[u] / p[v];
        }

        cout << res << endl;
    }

    return 0;
}
```

