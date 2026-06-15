---
title: >-
  Rayan Programming Contest 2024 - Selection (Codeforces Round 989, Div. 1 +
  Div. 2)
tags:
  - 題解
  - 筆記
  - ACM
  - 算法
  - 練習賽
categories:
  - 邏輯與算法
  - 賽事
  - Codeforces
cover: /img/posts/acm/codeforces-cover.webp
top_img: /img/posts/acm/codeforces.webp
highlight_shrink: true
abbrlink: b03926ab
date: 2024-12-02 01:30:00
updated: 2024-12-02 02:36:00
---
## [2034A - King Keykhosrow's Mystery](https://codeforces.com/contest/2034/problem/A)

虽然是 A 题，也简单写个证明：

由题意，$m \bmod a = m \bmod b$，设 $m = ta + r = kb + r$，则 $ta = kb$。希望 $t,k,r$ 尽可能小，则 $r = 0$。再设 $\gcd(a,b) = d,\ a = a_{0}d,\ b = b_{0}d$，则 $ta_{0} = kb_{0}$，由于 $a_{0},b_{0}$ 互素，只能取 $t = b_{0}$，此时 $m = ta = b_{0}a = \operatorname{lcm}(a, b)$。

不要按题意暴力，会 TLE。

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int a, b;
        cin >> a >> b;

        cout << lcm(a, b) << endl;
    }

    return 0;
}
```


## [2034B - Rakhsh's Revival](https://codeforces.com/contest/2034/problem/B)

贪心。时间复杂度 $\Theta(n)$。

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n, m, k;
        cin >> n >> m >> k;
        
        string s;
        cin >> s;
        
        int cnt = 0, ans = 0, r = 0;
        for (int i = 0; i < n; i++) {
            if (i >= r && s[i] == '0') {
                s[i] = '1';
                if (++cnt == m) {
                    ans++;
                    cnt = 0;
                    r = i + k;
                }
            } else {
                cnt = 0;
            }
        }
        cout << ans << "\n";
    }

    return 0;
}
```

## [2034C - Trapped in the Witch's Labyrinth](https://codeforces.com/contest/2034/problem/C)

CF 似乎没考过这种题……

连反边，从最外层 BFS/DFS 找到所有能出去的点，没有搜到的就是会被困住的（因为出现环搜不到，若干个 `?` 相连也搜不到）。最后扫一遍如果某个 `?` 点的周围四个点都是能出去的，那这个点也不可能被困住。

时间复杂度 $\Theta(mn)$。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n, m;
        cin >> n >> m;

        auto change = [&](int x, int y) {
            return x * (m + 1) + y;
        };
        auto get = [&](int x) {
            return pair(x / (m + 1), x % (m + 1));
        };

        vector<vector<int>> E((n + 2) * (m + 2));
        vector<int> deg((n + 2) * (m + 2));
        vector<int> res((n + 2) * (m + 2));
        vector<string> s(n + 2);

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                char c;
                cin >> c;

                int u = change(i, j), v;
                res[u] = 1;
                if (c == '?') continue;
                else if (c == 'U') v = change(i - 1, j);
                else if (c == 'D') v = change(i + 1, j);
                else if (c == 'L') v = change(i, j - 1);
                else if (c == 'R') v = change(i, j + 1);
                E[v].push_back(u);
                deg[u]++;
            }
        }

        queue<int> Q;
        for (int i = 1; i <= n; i++) {
            Q.push(change(i, 0));
            Q.push(change(i, m + 1));
        }
        for (int j = 1; j <= m; j++) {
            Q.push(change(0, j));
            Q.push(change(n + 1, j));
        }

        while (!Q.empty()) {
            int u = Q.front(); Q.pop();
            for (auto v : E[u]) {
                res[v] &= res[u];
                if (--deg[v] == 0) {
                    Q.push(v);
                }
            }
        }

        int ans = 0;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                int u = change(i, j);

                bool flag = 1;  // all neighbors are 0
                for (int v : { change(i - 1, j), change(i + 1, j), change(i, j - 1), change(i, j + 1) }) {
                    if (res[v] == 1) {
                        flag = 0;
                        break;
                    }
                }
                if (flag) {
                    res[u] = 0;
                }
                ans += res[u];
            }
        }
        cout << ans << '\n';
    }

    return 0;
}
```

## [2034D - Darius' Wisdom](https://codeforces.com/contest/2034/problem/D)

做法：

- 选取最左边的 `1` 和最右边的 `0`，或者最左边的 `2` 和最右边的 `1` 交换（先选谁没有影响），如此反复直至找不到。

合理性：

- 考虑所有未归位的数。如果有未归位的 `1`，要么最左边的未归位的 `1` 要变成 `0`，要么最右边的 `1` 要变成 `2`，这样每一步都可以使一个数归位，保证了操作次数在 $n - 1$ 以内。

- 如果所有的 `1` 都已经归位了，那需要额外的一次操作让 `1` 到其它位置，后续操作同上。这样除了第一步，每一步都可以使一个数归位，保证了操作次数在 $n$ 以内。

用 `set` 存位置，时间复杂度 $\Theta(n\log n)$。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        array<set<int>, 3> s;
        for (int i = 0; i < n; i++) {
            int x;
            cin >> x;
            s[x].insert(i);
        }

        s[2].insert(n);
        s[0].insert(-1);

        vector<array<int, 2>> res;
        for (int op = 0; ; op ^= 1) {
            int u = *s[1].begin();  // leftmost 1
            int v = *s[0].rbegin(); // rightmost 0
            if (u < v) {
                res.push_back({ u, v });
                s[1].erase(s[1].begin());
                s[0].erase(prev(s[0].end()));
                s[0].insert(u);
                s[1].insert(v);
                continue;
            } else {
                u = *s[2].begin();  // leftmost 2
                v = *s[1].rbegin(); // rightmost 1
                if (u < v) {
                    res.push_back({ u, v });
                    s[2].erase(s[2].begin());
                    s[1].erase(prev(s[1].end()));
                    s[1].insert(u);
                    s[2].insert(v);
                } else {
                    break;
                }
            }
        }

        cout << int(res.size()) << '\n';
        assert(int(res.size()) <= n);
        for (auto& [l, r] : res) {
            cout << l + 1 << ' ' << r + 1 << '\n';
        }
    }

    return 0;
}
```


## [2034E - Permutations Harmony](https://codeforces.com/contest/2034/problem/E)

构造，不好评价。

由于 $n\mid \frac{n(n+1)}{2}k$，因此如果 $n$ 是偶数，$k$ 是奇数就无解。$k = 1$ 除了 $n = 1$ 都无解。下面考虑剩下的情况：

$k = 3$ 是有解的，例如
$$
\begin{array}{ccccc}
1 & 2 & 3 & 4 & 5 \\
{\color{red}5} & 2 & {\color{blue}4} & 1 & {\color{green}3} \\
{\color{green}3} & {\color{red}5} & 2 & {\color{blue}4} & 1
\end{array}
$$

这样如果 $k$ 是奇数，就先构造三行让 $k$ 变成偶数。

剩下的就全排列轮换，相邻两行相加为 $n + 1$，如果轮换到了刚才构造的三行需要跳过。

如果全排列轮换之后总数能达到 $k$ 就有解，否则无解（事实上这种情况下只有 $k = n! - 1$ 无解）

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
const ll inf = 1e15;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n, k;
        cin >> n >> k;

        ll fac = 1;
        for (int i = 1; i <= n && fac < inf; i++) {
            fac *= i;
        }

        if (n % 2 == 0 && k % 2 == 1 || k > fac) {
            cout << "NO" << endl;
        } else if (k == 1) {
            if (n == 1) {
                cout << "YES" << endl;
                cout << 1 << endl;
            } else {
                cout << "NO" << endl;
            }
        } else {
            vector<vector<int>> res;
            
            vector b(3, vector<int>(n + 1));
            if (k % 2 == 1) {
                for (int i = 1; i <= n; i++) {
                    b[0][i] = i;
                    b[1][i] = (i & 1 ? (n + (1 - i) / 2) : ((n + 1) / 2 - i / 2));
                    b[2][i] = (i & 1 ? ((n + 1) / 2 - i / 2) : (n + (1 - i) / 2));
                }
                for (int i = 0; i < 3; i++) {
                    res.push_back(b[i]);
                }
                k -= 3;
            }

            vector<int> p(n + 1);
            iota(p.begin(), p.end(), 0);
            for (int t = 0; t < fac / 2 && k; t++) {
                vector a(2, vector<int>(n + 1));
                for (int i = 1; i <= n; i++) {
                    a[0][i] = p[i];
                    a[1][i] = n + 1 - p[i];
                }
                bool good = true;
                for (int j = 0; j < 2; j++) {
                    for (int k = 0; k < 3; k++) {
                        if (b[k] == a[j]) {
                            good = false;
                            break;
                        }
                    }
                }
                if (good) {
                    for (int j = 0; j < 2; j++) {
                        res.push_back(a[j]);
                    }
                    k -= 2;
                }
                next_permutation(p.begin() + 1, p.end());
            }

            if (k) {
                cout << "NO" << endl;
            } else {
                cout << "YES" << endl;
                for (int i = 0; i < res.size(); i++) {
                    for (int j = 1; j <= n; j++) {
                        cout << res[i][j] << " ";
                    }
                    cout << endl;
                }
            }
        }

    }

    return 0;
}
```