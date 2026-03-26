---
title: 2025 ICPC 武汉 (热身赛CD+正赛EFHIM)
tags:
  - 題解
  - 筆記
  - ACM
  - 算法
  - 區域賽
categories:
  - - 筆記
    - 區域賽
highlight_shrink: true
abbrlink: ff1ee3a5
date: 2025-12-07 00:00:00
updated: 2025-12-07 00:00:00
description:
---

暂不打算补 ABC。I 是妙妙题。

## [热身赛 C - Guess Numbers](https://codeforces.com/gym/104828/problem/I)（位运算）【Medium】

【简化问题】考虑值域为 $[0,1]$ 的情况，只需要问 0 0、0 1、1 0 三次即可确定。

【原问题】我们可以问 0 0、0 1、1 0 三次确定 $x,y$ 的奇偶性（二进制最后一位），然后再问 0 0、0 2、2 0 得到二进制倒数第二位，以此类推。

总询问次数 $3\log V = 180$。

```c++
#include <bits/stdc++.h>
using namespace std;
using ull = unsigned long long;

int main() {
    int t;
    cin >> t;

    while (t--) {
        ull x = 0, y = 0;

        auto query = [&](ull a, ull b) {
            a &= (1ULL << 61) - 1;
            b &= (1ULL << 61) - 1;
            cout << "? " << a << ' ' << b << endl;
            cin >> a;
            return a;
        };

        for (int bit = 0; bit < 60; bit++) {
            if (query(-x, -y) >> bit & 1 ^ 1) {

            } else if (query((-x) ^ (1ULL << bit), -y) >> bit & 1 ^ 1) {
                x ^= (1ULL << bit);
            } else if (query(-x, (-y) ^ (1ULL << bit)) >> bit & 1 ^ 1) {
                y ^= (1ULL << bit);
            } else {
                x ^= (1ULL << bit);
                y ^= (1ULL << bit);
            }
        }
        cout << "! " << x << ' ' << y << endl;
    }

    return 0;
}
```

## [热身赛 D. Dolls](https://qoj.ac/contest/1871/problem/9865)（贪心、倍增、二分）【Expert】

性质：**如果一段区间可以合并成一个，则其任意子区间都可以合并成一个套娃。**

以下所有讨论都基于这个性质。

问题：**最多能合并几次？**
问题化为：最多能分成多少个段，其中每段都能合并。
做法：考虑一个贪心，以 1 为左端点，贪心地将右侧的套娃合并到这个区间中，得到 $[1,r]$ 这一段。然后再以 $r+1$ 为左端点，寻找下一个段。

问题化为：**指定一个区间的左端点，最多能向右合并多少套娃？**
做法：二分。

问题化为（二分的 check）：**给定一个套娃序列，能否将这些套娃全部合并成一个？**
做法：当任意相邻的两个套娃可以紧密合并时，就立即合并它们。因需要离散化，复杂度 $\mathcal{O}(n\log n)$。

分析一下复杂度，二分 check 的复杂度是 $\mathcal{O}(n\log n)$，其中 $n$ 是区间长度。所以必须保证 $\sum n=N$ 时，复杂度才能保证在 $\mathcal{O}(N\log^{2} N)$。应当先倍增的查找二分的右端点，再精细二分。

```c++
void solve() {
    int N;
    cin >> N;

    vector<int> A(N);
    for (int i = 0; i < N; i++) {
        cin >> A[i];
        A[i]--;
    }

    auto check = [&](int l, int r) {
        vector<int> a(A.begin() + l, A.begin() + r);
        auto g = a;
        ranges::sort(g);
        g.erase(ranges::unique(g).begin(), g.end());
        for (auto& x : a) {
            x = ranges::lower_bound(g, x) - g.begin();
        }
        vector<pair<int, int>> stk;
        for (auto x : a) {
            pair<int, int> cur {x, x};
            while (!stk.empty()) {
                if (stk.back().second + 1 == cur.first) {
                    cur = {stk.back().first, cur.second};
                    stk.pop_back();
                } else if (cur.second + 1 == stk.back().first) {
                    cur = {cur.first, stk.back().second};
                    stk.pop_back();
                } else {
                    break;
                }
            }
            stk.push_back(cur);
        }
        return stk.size() == 1;
    };

    int res = 0;
    int l = 0;
    while (l < N) {
        int lo = l + 1, hi = N + 1;
        for (int k = 1; k + l <= N; k *= 2) {
            if (!check(l, l + k)) {
                hi = l + k;
                break;
            }
        }
        while (lo < hi) {
            int mid = lo + hi >> 1;
            if (check(l, mid)) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        lo--;
        l = lo;
        res++;
    }
    cout << N - res << '\n';
    
    return;
}
```

## [E. Magic Trick](https://qoj.ac/contest/2609/problem/14723)【Easy】

【思路】首先至少需要有两个相邻的数，才可以开始操作。

比如 `1 2 7 -> 8 9 7 -> 7 8 9 -> 1 2 9`，这样可以利用这两个相邻的数，把第三个数变成任何奇偶性相同的。 

【解】两种情形：
- 初始就相同；
- $s$ 和 $t$ 中至少需要有两个相邻的数，且 $s$ 和 $t$ 中奇数的个数、偶数的个数分别相同。

```c++
void solve() {
    int N;
    std::cin >> N;

    std::multiset<int> S;
    std::array<int, 2> cntS {};
    bool flagS = false;
    for (int i = 0; i < N; i++) {
        int x;
        std::cin >> x;
        S.insert(x);
        cntS[x % 2]++;
        if (S.contains(x - 1) || S.contains(x + 1)) {
            flagS = true;
        }
    }
    std::multiset<int> T;
    std::array<int, 2> cntT {};
    bool flagT = false;
    for (int i = 0; i < N; i++) {
        int x;
        std::cin >> x;
        T.insert(x);
        cntT[x % 2]++;
        if (T.contains(x - 1) || T.contains(x + 1)) {
            flagT = true;
        }
    }

    if (S == T) {
        std::cout << "Yes\n";
    } else if (flagS && flagT && cntS == cntT) {
        std::cout << "Yes\n";
    } else {
        std::cout << "No\n";
    }
    
    return;
}
```

## [F. Divide and Conquer](https://qoj.ac/contest/2609/problem/14724)【Easy】

我们需要解决两个问题：

1. 如何选取最少的 $x$ 满足要求？
2. 已经确定操作次数，答案是多少？

对于 1，考虑贪心，取一个 $R$ 最小的线段 $[L,R]$，那么取 $x = R$。这样，这个 $x$ 就是所有需要选取的 $x$ 中最小的那一个，符合贪心标准。然后同时处理掉包含 $x$ 的线段，再取剩下中 $R$ 最小的线段，以此类推。

对于 2，是 $\lfloor \log_{2} x \rfloor + 1$。

```c++
void solve() {
    int N, Q;
    std::cin >> N >> Q;

    std::vector<std::pair<int, int>> segs(Q);
    for (auto& [L, R] : segs) {
        std::cin >> L >> R;
    }

    std::ranges::sort(segs, {}, [](const std::pair<int, int>& a) {
        return a.second;
    }); 

    int cnt = 0;
    int cur = -1;
    for (auto& [L, R] : segs) {
        if (L > cur) {
            cnt++;
            cur = R;
        }
    }

    std::cout << (std::__lg(cnt) + 1) << '\n';

    return;
}
```

## [H. Restore the Array](https://qoj.ac/contest/2609/problem/14726)（01 字典树，交互）【Hard】

先问 0 得到 max，再问 max 得到另一个数，现在就有两个数 $x,y$ 了。

异或最大考虑 **01 字典树**。$x,y$ 在字典树上有一个分叉点，这个时候未知的数一定和 $x,y$ 有公共前缀，那么就只需要确定在 $x,y$ 哪个子树里面。

每次询问都是在 **恰好有一个数的子树中** 问 **有没有另外一个** *（具体问的是：分叉点高位取反，后面几位与子树里的数相同）（有数的那棵子树里面恰好只有一个数，因为交互器返回 XOR 最大值，就会优先走第一个有分叉的地方，换言之，分叉点只会越来越靠下）*。

如果有，就插入字典树，于是得到一些新的分叉点和新子树 *（分叉点的左子树和分叉点的右子树）*，接着问子树，又得到一些分叉点和子树，如此 **递归** 下去。

每次询问要么确定一个新数同时增加一个潜在的子树，要么剪掉一个子树，总次数是 $2n-2$。

```c++
struct Node {
    array<Node*, 2> next;
    unsigned x; 
};

constexpr unsigned inf = (1U << 30) - 1;

void solve() {
    int N;
    cin >> N;

    int cnt = 0, max = 2 * N - 2;
    auto query = [&](unsigned c) {
        assert(c < (1U << 30));
        assert(++cnt <= max);
        cout << "? " << c << endl;
        cin >> c;
        return c;
    };

    Node* root = new Node();
    queue<unsigned> Q;
    set<unsigned> res;
    auto insert = [&](unsigned x) {
        res.insert(x);
        Node* p = root;
        for (int bit = 30; bit >= 0; bit--) {
            bool c = x >> bit & 1;
            Node*& q = p->next[c];
            if (!q) {
                q = new Node();
                q->x = x;
                if (p->next[!c]) {
                    Q.push(inf & (p->next[0]->x ^ (~0U << bit)));
                    Q.push(inf & (p->next[1]->x ^ (~0U << bit)));
                }
            }
            p = q;
        }
    };

    auto x = query(0);
    insert(x);
    Q.push(x);
    while (!Q.empty() && res.size() < N) {
        auto x = Q.front();
        Q.pop();
        insert(x ^ query(x));
    }

    cout << "! ";
    for (auto x : res) {
        cout << x << " ";
    }
    cout << endl;
}
```

## [I. Dolls 2](https://qoj.ac/contest/2609/problem/14727)（DP）【Expert】

*估计多数人都去写AB了吧，四五百行有的写了。。尽管赛时只过了两队，这题的思维和实现难度其实并不高*

【题意】给定套娃规则，问至少合并多少次之后，就不能再合并了。

*建议先做热身赛 D。*

【思路】我们称合并后的套娃是一个 *段*。

如果段的最值在段中间，就可以无痛分成有交的两段，因此最优情况下最值一定在段两端，进而段内部单调。

问题化为（几乎还是原题的意思）：**把排列分成最多段，每个段内部单调，相邻段不能合并**。$n -$ 最大段数就是答案。

【实现】暴力枚举所有可能的段，共 $\mathcal{O}(n)$ 个。然后 DP，设 $f(i)$ 为以编号为 $i$ 的段结尾能选择的最大段数，枚举前一个可能的段 $j$ 做转移，满足这个限制的 $j$ 只有 $\mathcal{O}(1)$ 个。因此复杂度 $\mathcal{O}(n)$。

```c++
#include <bits/stdc++.h>
using namespace std;

constexpr int inf = 0x3f3f3f3f;

void chmax(int& x, int y) {
    if (x < y) {
        x = y;
    }
}

void solve() {
    int N;
    cin >> N;

    vector<int> A(N);
    for (int i = 0; i < N; i++) {
        cin >> A[i];
        A[i]--;
    }

    vector<array<int, 2>> seg;
    for (int l = 0, r = 1; r < N; r++) {
        if (r == N - 1 || A[r] > max(A[r - 1], A[r + 1]) || A[r] < min(A[r - 1], A[r + 1])) {
            // A[r] 是一个局部最大值或最小值，要分成一个段
            // 这里 +1-1 是因为不知道极值点在左右哪个段里，需要枚举
            if (l + 0 <= r - 0) seg.push_back({ l + 0, r - 0 });
            if (l + 0 <= r - 1) seg.push_back({ l + 0, r - 1 });
            if (l + 1 <= r - 0) seg.push_back({ l + 1, r - 0 });
            if (l + 1 <= r - 1) seg.push_back({ l + 1, r - 1 });
            l = r;
        }
    }
    ranges::sort(seg);
    seg.erase(ranges::unique(seg).begin(), seg.end());

    auto check = [&](int l1, int r1, int l2, int r2) {
        // check if [l1, r1] and [l2, r2] are intersected
        if (l1 > r1) swap(l1, r1);
        if (l2 > r2) swap(l2, r2);
        return max(l1, l2) <= min(r1, r2);
    };

    vector<int> f(seg.size(), -inf);
    int ans = 0;
    for (int i = 0; i < seg.size(); i++) {
        auto [l1, r1] = seg[i];     
        if (l1 == 0) {
            f[i] = 1;
        } else for (int j = max(0, i - 8); j < i; j++) {  // 这里我也不确定要跑几个，8个比较稳妥
            auto [l2, r2] = seg[j];
            if (r2 + 1 == l1 && check(A[l2], A[r2], A[l1], A[r1])) {
                chmax(f[i], f[j] + 1);
            }
        }
        if (r1 == N - 1) {
            chmax(ans, f[i]);
        }
    }
    cout << N - ans << "\n";
    
    return;
}
```

## [M. Kingdom of Construction](https://qoj.ac/contest/2609/problem/14731)（线性代数）【Hard】

先取 $S = \varnothing$，于是需要构造 $\det(A_{S}) = 1 + \sum_{i \in S} a_{i}$。

可以试试 $n=2$，手写一下式子，需要

$$
\begin{aligned}
A_{11} &= 1 + a_{1} \\
A_{22} &= 1 + a_{2} \\
A_{11} A_{22} - A_{12} A_{21} &= 1 + a_{1} + a_{2} \\
\end{aligned}
$$

所以主对角线都是 $A_{ii} = 1 + a_{i}$ 是确定的，然后看看第三个式子，

$$
(1 + a_{1}) (1 + a_{2}) - A_{12} A_{21} = 1 + a_{1} + a_{2} 
\Longrightarrow A_{12} A_{21} = a_{1} a_{2}
$$

有没有一点眉目了？如果还没看出来可以试试 $n = 3$。

我们可以构造 $A_{ii} = 1 + a_{i}$，$A_{i *} = a_{i}$。

【注意】需要取模。但是这个东西赛时没卡，有点过分。

```c++
constexpr int P = 998244353;
void solve() {
    int N;
    std::cin >> N;
    for (int i = 0; i < N; i++) {
        int x;
        std::cin >> x;
        for (int j = 0; j < N; j++) {
            std::cout << (x + (i == j)) % P << " ";
        }
        std::cout << "\n";
    }
    return;
}
```
