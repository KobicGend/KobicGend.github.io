---
title: 2025 ICPC 成都补题记录 (9 题 ABCDGJKLM)
tags:
  - 題解
  - 筆記
  - ACM
  - 算法
  - 區域賽
categories:
  - - 筆記
    - 區域賽
description: >-
  The 2025 ICPC Asia Chengdu Regional Contest (The 4th Universal Cup. Stage 4:
  Grand Prix of Chengdu)
highlight_shrink: true
abbrlink: a0ec1062
date: 2025-11-04 00:00:00
updated: 2025-11-04 00:00:00
---

出题组难度排序：GJ ABDL CKM HI EF
个人难度排序：JG A BL CM DK

总体题目质量不错，除了 BL 有点偏科技。

VP 过了 6 题，后面还有三个题能做但时间严重不足（A WA 了好几次，L 写了两次错解占用大量时间，D 本身就很费时），整体代码量非常大，细节也比较多，难度还是蛮高的。

# [A. A Lot of Paintings](https://qoj.ac/contest/2567/problem/14706)【Medium】

总和应该是恰好 100% 才对。如果超过 100，就尽可能令 $x\gets x-0.5$；如果不到 100，就尽可能令 $x\gets x+0.49999$（在数据范围内可以多写几个 9）。

注意最后输出的结果应当是精确的总和为 1，不能强行抹零。

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll = long long;

constexpr ll inf = 10'000'000;

int main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        vector<ll> a(n);
        for (auto& x : a) {
            cin >> x;
            x *= inf;
        }

        ll sum = accumulate(a.begin(), a.end(), 0ll);
        ll need;
        if (sum == (100 * inf)) {
            need = 0;
        } else if (sum > (100 * inf)) {
            need = abs(sum - (100 * inf));
            for (int i = 0; i < n; i++) {
                if (a[i]) {
                    ll minn = min<ll>(need, inf / 2);
                    a[i] -= minn;
                    need -= minn;
                }
            }
        } else {
            need = abs(sum - (100 * inf));
            for (int i = 0; i < n; i++) {
                if (a[i] < (100 * inf)) {
                    ll minn = min<ll>(need, inf / 2 - 1);
                    a[i] += minn;
                    need -= minn;
                }
            }
        }
        if (need) {
            cout << "No\n";
        } else {
            cout << "Yes\n";
            for (auto x : a) {
                cout << x << " ";
            }
            cout << endl;
        }
    }

    return 0;
}
```

# [B. Blood Memories](https://qoj.ac/contest/2567/problem/14707)（倍增/快速幂优化 DP）【Hard】

$2^{n}$ 压缩每个人每回合是否进行操作。

我们可以 DP 得到：上一轮操作的 mask 为 $s$，这一轮操作的 mask 为 $t$，可以造成的最大伤害之和。

我们需要求：初始 mask 为空，$r$ 轮后的 mask 为任意，可以造成的最大伤害之和。

由于每一次转移都是一样的，可以用倍增加速。这个倍增用类似快速幂的写法比较容易实现，当然写传统倍增的 $2^{d}$ 步转移矩阵也可以。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

constexpr vector<vector<ll>> operator * (const vector<vector<ll>>& A, const vector<vector<ll>>& B) {
    const int n = A.size();
    vector C(n, vector<ll>(n));
    for (int k = 0; k < n; k++) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                C[i][j] = max(C[i][j], A[i][k] + B[k][j]);
            }
        }
    }   
    return C;
}

int main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    int t;
    cin >> t;

    while (t--) {
        int n, m, k, r;
        cin >> n >> m >> k >> r;

        vector<ll> a(n), c(n);
        for (int i = 0; i < n; i++) {
            cin >> a[i] >> c[i];
        }

        vector M(1U << n, vector<ll>(1U << n));
        for (unsigned s = 0; s < 1U << n; s++) {
            for (unsigned t = 0; t < 1U << n; t++) {
                ll tota = 0, totc = 0;
                for (int bit = 0; bit < n; bit++) {
                    if (t >> bit & 1) {
                        totc += c[bit] + k * (s >> bit & 1);
                        tota += a[bit];
                    }
                }
                if (totc <= m) {
                    M[s][t] = tota;
                }
            }
        }

        vector Mr(1U << n, vector<ll>(1U << n));
        for ( ; r; r >>= 1) {
            if (r & 1) Mr = Mr * M;
            M = M * M;
        }
        
        ll max = 0;
        for (int i = 0; i < 1U << n; i++) {
            max = std::max(max, ranges::max(Mr[i]));
        }
        cout << max << endl;
    }

    return 0;
}
```


# [C. Crossing River](https://qoj.ac/contest/2567/problem/14708)【Hard】

首先可以二分答案，二分最后一个到达的时间，然后枚举最后一次是送左边还是送右边。check 的时候一定是贪心最后送到达最晚的，其次是次晚的，以此类推。如果发现不能送了就 check 失败。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    int N, M, K;
    cin >> N >> M >> K;

    vector<array<ll, 3>> A;
    A.reserve(N + M);
    for (int i = 0; i < N; i++) {
        int x;
        cin >> x;
        A.push_back({x, 0, i});
    }
    for (int i = 0; i < M; i++) {
        int x;
        cin >> x;
        A.push_back({x, 1, i});
    }
    ranges::sort(A, greater());

    auto check = [&](ll mid) {  // 二分最后一个到达的时间
        auto check = [&](bool st) {  // 最后一次是送左边还是送右边
            vector<array<ll, 3>> res;
            ll curA = mid - K, curB = mid - 2 * K;
            if (st) {
                swap(curA, curB);
            }
            for (auto [x, op, id] : A) {
                if (op == 0) {
                    if (x > curA) {  // 不能送了就 check 失败
                        return pair(false, vector<array<ll, 3>>());
                    }
                    res.push_back({curA, op, id});
                    curA -= 2 * K;
                } else {
                    if (x > curB) {
                        return pair(false, vector<array<ll, 3>>());
                    }
                    res.push_back({curB, op, id});
                    curB -= 2 * K;
                }
            }
            return pair(true, res);
        };
        for (int o = 0; o < 2; o++) {  // 枚举最后一次是送左边还是送右边
            auto [success, res] = check(o);
            if (success) {
                return pair(true, res);
            }
        }
        return pair(false, vector<array<ll, 3>>());
    };

    ll lo = 0, hi = 1E16;
    while (lo < hi) {
        ll mid = lo + hi >> 1;
        if (check(mid).first) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    auto [success, res] = check(lo);
    ranges::sort(res);
    cout << lo << '\n';
    for (auto [x, op, id] : res) {
        cout << x << ' ' << op << ' ' << id + 1 << '\n';
    }

    return 0;
}
```

这个二分其实没什么必要，我们可以直接计算出最后到达的时间。

上面的代码等价于：

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll = long long;

int main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    int N, M, K;
    cin >> N >> M >> K;

    vector<array<ll, 2>> A(N);
    for (int i = 0; i < N; i++) {
        int x;
        cin >> x;
        A[i] = {x, i};
    }
    ranges::sort(A);

    vector<array<ll, 2>> B(M);
    for (int i = 0; i < M; i++) {
        int x;
        cin >> x;
        B[i] = {x, i};
    }
    ranges::sort(B);

    for (int i = 1; i < N; i++) {
        A[i][0] = max(A[i - 1][0] + 2 * K, A[i][0]);
    }
    for (int i = 1; i < M; i++) {
        B[i][0] = max(B[i - 1][0] + 2 * K, B[i][0]);
    }

    ll time1 = max(A.back()[0] + K, B.back()[0] + 2 * K);
    ll time2 = max(A.back()[0] + 2 * K, B.back()[0] + K);
    ll time, timeA, timeB;
    if (time1 <= time2) {
        time = time1;
        timeA = time1 - K;
        timeB = time1 - 2 * K;
    } else {
        time = time2;
        timeA = time2 - 2 * K;
        timeB = time2 - K;
    }

    vector<array<ll, 3>> res;
    for (int i = N - 1; i >= 0; i--) {
        res.push_back({timeA, 0, A[i][1]});
        timeA -= 2 * K;
    }
    for (int i = M - 1; i >= 0; i--) {
        res.push_back({timeB, 1, B[i][1]});
        timeB -= 2 * K;
    }
    
    ranges::sort(res);
    cout << time << '\n';
    for (auto [x, op, id] : res) {
        cout << x << ' ' << op << ' ' << id + 1 << '\n';
    }

    return 0;
}
```

# [D. Deductive Snooker Scoring](https://qoj.ac/contest/2567/problem/14709)【Hard】（模拟，搜索）

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
const ll inf = 0x3f3f3f3f3f3f3f3f;

void eachT() {
    int a, b, n, p;
    cin >> a >> b >> n >> p;

    auto solve = [&](int s, int x) {
        array<int, 8> num{};
        num[7] = s / 7;
        x -= num[7];
        s %= 7;
        if (s == 1) {
            num[7]--;
            num[6]++;
            s++;
        }
        if (s != 0) {
            num[s]++;
            x--;
        }
        num[0] = x;
        return num;
    };

    auto check = [&](int n, int a, int b) {
        for (int x = 0; x <= n; x++) {
            int sa = a;
            int sb = b;

            int y = n - x;
            sa -= x;
            sb -= y;
            if (sa < 0 || sb < 0) continue;

            if (sa > 7 * x || sb > 7 * y) continue;

            if (sa == 1 || sb == 1) continue;

            auto numa = solve(sa, x);
            auto numb = solve(sb, y);

            return pair(numa, numb);
        }
        return pair(array{ -1, -1, -1, -1, -1, -1, -1, -1 }, array{ -1, -1, -1, -1, -1, -1, -1, -1 });
    };

    bool ok = 1;
    string ans;

    if (n >= 6) {
        auto [numa, numb] = check(21 - n, a, b);

        if (numa == array{ -1, -1, -1, -1, -1, -1, -1, -1 } && numb == array{ -1, -1, -1, -1, -1, -1, -1, -1 }) {
            ok = 0;
        } else {
            for (int i = 0; i <= 7; i++) {
                int x = numa[i];
                if (x == 0) continue;

                for (int _ = 0; _ < x; _++) {
                    if (i == 0) {
                        ans += "1//";
                    } else {
                        ans += '1';
                        ans += ('0' + i);
                    }
                }
            }
            ans += '/';
            for (int i = 0; i <= 7; i++) {
                int x = numb[i];
                if (x == 0) continue;

                for (int _ = 0; _ < x; _++) {
                    if (i == 0) {
                        ans += "1//";
                    } else {
                        ans += '1';
                        ans += ('0' + i);
                    }
                }
            }
            if (p == 0) ans += '/';
        }
    } else {
        int x = 6 - n;
        array<int, 6> s{ 2, 3, 4, 5, 6, 7 };
        int okk = 0;
        for (int mask = 0; mask < 1 << x; mask++) {
            int sa = a, sb = b;
            for (int bit = 0; bit < x; bit++) {
                if (mask >> bit & 1) {
                    sa -= s[bit];
                } else {
                    sb -= s[bit];
                }
            }

            if (n == 0) {
                if ((mask >> (x - 1) & 1) == p) {
                    continue;
                }
            }

            if (sa < 0 || sb < 0) continue;

            auto [numa, numb] = check(15, sa, sb);

            if (numa == array{ -1, -1, -1, -1, -1, -1, -1, -1 } && numb == array{ -1, -1, -1, -1, -1, -1, -1, -1 }) {
                continue;
            }

            for (int i = 0; i <= 7; i++) {
                int x = numa[i];
                if (x == 0) continue;

                for (int _ = 0; _ < x; _++) {
                    if (i == 0) {
                        ans += "1//";
                    } else {
                        ans += '1';
                        ans += ('0' + i);
                    }
                }
            }
            ans += '/';
            for (int i = 0; i <= 7; i++) {
                int x = numb[i];
                if (x == 0) continue;

                for (int _ = 0; _ < x; _++) {
                    if (i == 0) {
                        ans += "1//";
                    } else {
                        ans += '1';
                        ans += ('0' + i);
                    }
                }
            }

            int f = 1;

            for (int bit = 0; bit < x; bit++) {
                if (mask >> bit & 1) {
                    if (f == 1) {
                        ans += '/';
                        f = 0;
                    }
                    ans += ('0' + s[bit]);

                } else {
                    if (f == 0) {
                        ans += '/';
                        f = 1;
                    }
                    ans += ('0' + s[bit]);
                }
            }

            if (f != p) ans += '/';

            okk = 1;
            break;
        }
        ok &= okk;
    }

    if (ok) {
        cout << ans << endl;
    } else {
        cout << "NA" << endl;
    }
}

int main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    int T = 1;
    cin >> T;
    while (T--) {
        eachT();
    }
}
```

# [G. GCD of Subsets](https://qoj.ac/contest/2567/problem/14712)（数论）【Easy】

最优配对法是 $k$ 自己或者 $\lbrace n k,(n+1) k \rbrace$。于是优先把不是 $k$ 的倍数的变成 $k$，再把 $k$ 的倍数变成 $k$。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    int t;
    cin >> t;

    while (t--) {
        ll n, k, m;
        cin >> n >> k >> m;

        ll cntk = 1;
        ll cntmulk = n / k - cntk;
        ll cntother = n - cntk - cntmulk;

        ll min = std::min(m, cntother);
        m -= min;
        cntother -= min;
        cntk += min;
        
        min = std::min(m, cntmulk);
        m -= min;
        cntmulk -= min;
        cntk += min;

        cout << (cntk + cntmulk / 2) << endl;
    }

    return 0;
}
```

# [J. Judging Papers](https://qoj.ac/contest/2567/problem/14715)【Easy】

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    int t;
    cin >> t;

    while (t--) {
        int n, m, k, b;
        cin >> n >> m >> k >> b;
        int kind1 = 0;
        int kind2 = 0;
        for (int i = 0; i < n; i++) {
            ll score = 0;
            ll finalscore = 0;
            for (int j = 0; j < m; j++) {
                int tmp;
                cin >> tmp;
                score += tmp;
                if (tmp >= 1) {
                    tmp--;
                } else if (tmp <= 0) {
                    tmp++;
                }
                finalscore += tmp;
            }
            if (score >= k) {
                kind1++;
            } else if (finalscore >= k) {
                kind2++;
            }
        }
        ll ans = kind1 + min(b, kind2);
        cout << ans << endl;
    }

    return 0;
}
```

# [K. K-Coverage](https://qoj.ac/contest/2567/problem/14716)（线段树）【Hard】

*（官方题解是线性的，暂时没看懂）*

约定：$\mathbb{I}(P)$ 在 $P$ 为真时取 1，否则取 0。

**基础贡献**：先预处理出初始每个位置 $j$ 被 $d_{j}$ 条线段覆盖，然后考虑移动线段的影响。

**枚举移动的贡献**：首先考虑一个暴力，枚举把第 $i$ 条线段 $[l_{i}, l_{i}+L)$ 移动到 $[x, x + L)$，这样做对答案的影响是

$$
\operatorname{cost}(i,x) = 
\sum_{j \in [l_{i}, l_{i}+L) \setminus [x, x + L)} \operatorname{ex}(j)
+ \sum_{j \in [x, x + L) \setminus [l_{i}, l_{i}+L)} \operatorname{in}(j)
$$

其中 $\operatorname{ex}(j) = \mathbb{I}(d_{j}=k+1) - \mathbb{I}(d_{j}=k), \ \operatorname{in}(j) = \mathbb{I}(d_{j}=k-1) - \mathbb{I}(d_{j}=k)$ 分别表示移走/移入包含 $j$ 处的线段对 $j$ 的贡献。取差集是避免 $[l_{i}, l_{i}+L)$ 与 $[x, x + L)$ 相交时重复计算。

取最大的 cost 就是最优贡献。现在复杂度是 $\mathcal{O}(n^{2})$。

**优化枚举**：**枚举位置 $x$，动态求解** $\operatorname{cost}(i,x)$，考虑从 $x$ 变化到 $x+1$ 的影响（这里需要仔细推导一下）：


$$
\begin{aligned}
\Delta\operatorname{cost}(i)
= \operatorname{cost}(i,x+1) - \operatorname{cost}(i,x)
&= \operatorname{ex}(x) \cdot \mathbb{I}(x \in [l_{i}, l_{i}+L))
\\
&- \operatorname{ex}(x + L) \cdot \mathbb{I}(x + L \in [l_{i}, l_{i}+L))
\\
&- \operatorname{in}(x) \cdot \mathbb{I}(x \notin [l_{i}, l_{i}+L))
\\
&+ \operatorname{in}(x + L) \cdot \mathbb{I}(x + L \notin [l_{i}, l_{i}+L))
\end{aligned}
$$

分别计算这四项。以 $\operatorname{ex}(x) \cdot \mathbb{I}(x \in [l_{i}, l_{i}+L))$ 为例，满足这个限制的 $l_{i}$ 是一个区间 $x - L < l_{i} \leqslant x$，可以用 **二分** 找到所有需要操作的下标 $i$，对这些 $i$ 做 **区间加** $\operatorname{ex}(x)$（可以使用线段树等）。

复杂度 $\mathcal{O}(n\log n)$。

```cpp
// 线段树
constexpr int inf = 0x3f3f3f3f;
struct Lazy {
    int add{};
    void apply(const Lazy& x) {
        add += x.add;
    }
};
struct Info {
    int max = -inf;
    void apply(const Lazy& x) {
        max += x.add;
    }
};
Info operator + (const Info& l, const Info& r) {
    return { max(l.max, r.max) };
}

void solve() {
	int N, L, K;
	cin >> N >> L >> K;

	vector<int> l(N);
	for (int i = 0; i < N; i++) {
		cin >> l[i];
	}
	ranges::sort(l);

	vector<int> d(6 * N);   // 尽可能开大一点
	for (int i = 0; i < N; i++) {
		d[l[i]]++;
		d[l[i] + L]--;
	}
	for (int j = 1; j < d.size(); j++) {
		d[j] += d[j - 1];
	}

	LazySegmentTree<Info, Lazy> cost(N, {0});
	auto add = [&](int val, int lo, int hi) {
		// (lo, hi]
		int i = ranges::upper_bound(l, lo) - l.begin();
		int j = ranges::upper_bound(l, hi) - l.begin();
		// [i, j)
		cost.update(i, j, {val});
	};

	vector<int> ex(d.size());  // exclude a segment
	vector<int> in(d.size());  // include a segment
	int tot{};
	for (int j = 0; j < d.size(); j++) {
		ex[j] = (d[j] == K + 1) - (d[j] == K);
		in[j] = (d[j] == K - 1) - (d[j] == K);
		tot += (d[j] == K);
		add(ex[j], j - L, j);  // 初始移动到无穷远
	}

	int res = tot;
	for (int x = -L; x < 0; x++) {
		add(+in[x + L], -1, x);
		add(-ex[x + L], x, x + L);
		add(+in[x + L], x + L, d.size());
	}
	for (int x = 0; x + L < d.size(); x++) {
		res = max(res, tot + cost.query(0, N).max);
		add(-in[x], -1, x - L);  // x to x + 1
		add(+ex[x], x - L, x);
		add(-in[x], x, d.size());
		add(+in[x + L], -1, x);
		add(-ex[x + L], x, x + L);
		add(+in[x + L], x + L, d.size());
	}
	cout << res << '\n';
}
```

# [L. Label Matching](https://qoj.ac/contest/2567/problem/14717)（树上启发式合并 DSU on Tree）【Hard】

没什么好说的，无聊的模板题，只需要填一下 add 函数。

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    int t;
    cin >> t;

    while (t--) {
        int N;
        cin >> N;

        vector<int> A(N), B(N);
        for (int i = 0; i < N; i++) {
            cin >> A[i];  
            A[i]--;
        }
        for (int i = 0; i < N; i++) {
            cin >> B[i];   
            B[i]--;
        }

        vector<vector<int>> adj(N);
        for (int i = 1; i < N; i++) {
            int x, y;
            cin >> x >> y;
            x--;
            y--;
            adj[x].push_back(y);
            adj[y].push_back(x);
        }

        vector<int> parent(N, -1), siz(N);
        [&](this auto&& self, int x) -> void {
            if (parent[x] != -1) {
                adj[x].erase(ranges::find(adj[x], parent[x]));
            }
            siz[x] = 1;
            for (auto& y : adj[x]) {
                parent[y] = x;
                self(y);
                siz[x] += siz[y];
                if (siz[y] > siz[adj[x][0]]) {
                    swap(y, adj[x][0]);
                }
            }
        } (0);

        string res(N, '0');
        int cntA{}, cntB{}, cnt0A{}, cnt0B{};
        vector<int> cnt(N);
        auto add = [&](int x, int delta) {
            auto change = [&](int num, int delta) {
                cntA -= max(0, cnt[num]);
                cntB -= max(0, -cnt[num]);
                cnt[num] += delta;
                cntA += max(0, cnt[num]);
                cntB += max(0, -cnt[num]);
            };
            if (A[x] == -1) {
                cnt0A += delta;
            } else {
                change(A[x], delta);
            }
            if (B[x] == -1) {
                cnt0B += delta;
            } else {
                change(B[x], -delta);
            }
        };
        auto dfs = [&](this auto&& self, int x, bool keep) -> void {
            for (auto y : adj[x]) {
                if (y != adj[x].front()) {
                    self(y, false);
                }
            }
            if (adj[x].size()) {
                self(adj[x].front(), true);
            }
            add(x, 1);
            for (auto y : adj[x]) {
                if (y != adj[x].front()) {
                    [&](this auto&& self, int x) -> void {
                        add(x, 1);
                        for (auto y : adj[x]) {
                            self(y);
                        }
                    } (y);
                }
            }
            if (cnt0A >= cntB && cnt0B >= cntA) {
                res[x] = '1';
            } else {
                res[x] = '0';
            }
            if (!keep) {
                [&](this auto&& self, int x) -> void {
                    add(x, -1);
                    for (auto y : adj[x]) {
                        self(y);
                    }
                } (x);
            }
        };
        dfs(0, true);
        cout << res << endl;
    }

    return 0;
}
```


# [M. Meeting for Meals](https://qoj.ac/contest/2563/problem/14718)（图论，最短路）【Hard】

思路：对每个人求一个势力范围，满足

1. 势力范围互不相交
2. 两个人势力范围的边界点（可能在边中间）到这两个人的起始点距离相同
3. 从起始点，经过范围中的点再到目标，时间不超过约束

做法：把所有人一起扔到 pq 里 Dijkstra，先得到势力范围里的顶点。然后枚举边，求边上具体的分界线，最后答案就是分界点到人距离的最小值。为满足 3，需要在 Dijkstra 入队的时候加一个 if；12 在 Dijkstra 过程中自然满足，因为求的是最短路。

每个点只会访问一次，复杂度和 Dijkstra 相同。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

constexpr ll inf = 0x3f3f3f3f3f3f3f3f;

signed main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    int t;
    cin >> t;

    while (t--) {
        int n, m, k;
        cin >> n >> m >> k;

        vector<int> friends(k);
        for (auto& x : friends) {
            cin >> x;
            x--;
        }

        vector<vector<pair<int, int>>> adj(n);
        vector<tuple<int, int, int>> edge(m);
        for (auto& [x, y, w] : edge) {
            cin >> x >> y >> w;
            w *= 2;
            x--;
            y--;
            adj[x].push_back({ w, y });
            adj[y].push_back({ w, x });
        }
        
        priority_queue<tuple<ll, int, int>, vector<tuple<ll, int, int>>, greater<>> Q;
        vector<ll> dis0(n, inf);  // dis0[x] = dis(0, x)
        vector<int> vis(n);
        int s = 0;  // mall
        Q.push({ 0, s, s }); 
        dis0[s] = 0;

        while (!Q.empty()) {
            auto [_, x, s] = Q.top(); // [dis, cur node, start node]
            Q.pop();

            if (vis[x]) {
                continue;
            }
            vis[x] = true;

            for (auto [w, y] : adj[x]) {
                if (dis0[y] > dis0[x] + w) {
                    dis0[y] = dis0[x] + w;
                    Q.push({ dis0[y], y, s });
                }
            }
        }

        ll dismax = 0;
        for (auto x : friends) { 
            dismax = max(dismax, dis0[x]);
        }

        vector<int> bel(n, -1);
        vector<ll> dis(n, inf);
        for (auto x : friends) {
            Q.push({ 0, x, x });
            dis[x] = 0;
        }

        while (!Q.empty()) {
            auto [_, x, s] = Q.top();
            Q.pop();

            if (dis[x] + dis0[x] > dismax) {
                continue;
            }

            if (bel[x] != -1) {
                continue;
            }
            bel[x] = s;

            for (auto [w, y] : adj[x]) {
                if (dis[y] > dis[x] + w) {
                    dis[y] = dis[x] + w;
                    Q.push({ dis[y], y, s });
                }
            }
        }

        vector<ll> res(n, inf);
        for (auto [x, y, w] : edge) {
            if (bel[x] == bel[y] || bel[x] == -1 || bel[y] == -1) {
                continue;
            }
            ll dx = (dis[x] < dis[y]) ?
                    (w + (dis[y] - dis[x])) / 2 :
                    (w - (dis[x] - dis[y])) / 2;
            ll dy = w - dx;
            ll t = dx + dis[x];

            ll t1 = dis0[x] + dx;
            ll t2 = dis0[y] + dy;
            if (t + t1 > dismax && t + t2 > dismax) {
                continue;
            }
            res[bel[x]] = min(res[bel[x]], t);
            res[bel[y]] = min(res[bel[y]], t);
        }

        for (auto x : friends) {
            ll ans = dismax - res[x];
            cout << ans / 2;
            if (ans & 1) {
                cout << ".5";
            } else {
                cout << ".0";
            }
            cout << " ";
        }
        cout << endl;    
    }
    
    return 0;
}
```


