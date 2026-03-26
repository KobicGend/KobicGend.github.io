---
title: Educational Codeforces Round 176 (Rated for Div. 2) A-D
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
abbrlink: 6370b5c4
date: 2025-02-28 11:24:00
updated: 2025-02-28 11:24:00
---
edu 场神秘分类讨论，神秘推式子。

## [2075A - To Zero](https://codeforces.com/contest/2075/problem/A)

一次偶数那之后都是偶数。

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int J;
    cin >> J;

    while (J--) {
        int n, k;
        cin >> n >> k;

        int res = 0;
        if (n & 1) {
            n = max(0, n - k);
            res++;
        }  
        k--;
        res += (n + k - 1) / k;
        cout << res << endl;
    }

    return 0;
}
```

## [2075B - Array Recoloring](https://codeforces.com/contest/2075/problem/B)（分类讨论）

**Hint 1** 矛盾点在，最左右两边的数很可能最后取。什么时候只能最后取？什么时候无限制？

$k$ 比较大的时候一定能选到 $k+1$ 个较大值，先选边上的较大值，向两边选完边上其它所有数后，最后选中间的。具体来说是 $k>1$。

只有 $k=1$ 时，先选某个在中间的数，然后向两边扩散。

分 $k>1$ 和 $k=1$ 两种情况讨论。

时间复杂度 $\operatorname{O}(n\log n)$。


```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    int J;
    cin >> J;

    while (J--) {
        int n, k;
        cin >> n >> k;

        vector<int> a(n); 
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }

        if (k == 1) {
            cout << max({
                a[0] + *max_element(a.begin() + 1, a.end()),
                a[n - 1] + *max_element(a.begin(), a.end() - 1)
            }) << endl;
        } else {
            k++;
            sort(a.begin(), a.end(), greater<>());
            cout << accumulate(a.begin(), a.begin() + k, 0ll) << endl;
        }
    }

    return 0;
}
```

## [2075C - Two Colors](https://codeforces.com/contest/2075/problem/C)（双指针/二分）

经典双指针/二分



**Hint 1** 再仔细读题，必须选两种颜色。因此 $a_{i}=n$ 是假的。

$a_{i}$ 取不到 $n$（否则只有一种颜色），先将 $a_{i}$ 与 $n-1$ 取较小值。



**Hint 2** 对于确定的 $a_{i},a_{j}$，贡献多少答案？

$a_{i}+a_{j}-n+1$。当然这个数必须是正的才有贡献，也即 $a_{i}+a_{j} \geqslant n$。



**Hint 3** 对于确定的 $a_{i}$，如何对所有满足 $j>i$ 的 $a_{i},a_{j}$ 求答案？

升序排序后，先找到满足 $a_{i}+a_{p} \geqslant n$ 最小的 $p$。那么答案是 $\sum_{j \geqslant p} (a_{i}+a_{j}-n+1)=\mathrm{num}\cdot(a_{i}+n-1)+\sum_{j \geqslant p} a_{j}$。

上面 $\sum_{j \geqslant p} a_{j}$ 是后缀和，可以预处理求得。

时间复杂度 $\operatorname{O}(n\log n)$。


```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    int J;
    cin >> J;

    while (J--) {
        int n, m;
        cin >> n >> m;

        vector<int> a(m); 
        ll res = 0;
        for (int i = 0; i < m; i++) {
            cin >> a[i];
            if (a[i] == n) {
                a[i]--;
            }
        }
        sort(a.begin(), a.end());
        vector<ll> suf(m + 1);
        for (int i = m - 1; i >= 0; i--) {
            suf[i] = suf[i + 1] + a[i];
        }
        for (int i = 0; i < m; i++) {
            // a[i] + x >= n  ->  x >= n - a[i]
            auto it = lower_bound(a.begin() + i + 1, a.end(), n - a[i]);
            if (it != a.end()) {
                int num = a.end() - it;
                ll now = suf[it - a.begin()] + 1ll * num * (a[i] - n + 1);
                now *= 2;
                res += now;
            }
        }
        cout << res << endl;
    }

    return 0;
}
```

上面代码也可以用双指针优化为线性。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    int J;
    cin >> J;

    while (J--) {
        int n, m;
        cin >> n >> m;

        vector<int> a(m); 
        ll res = 0;
        for (int i = 0; i < m; i++) {
            cin >> a[i];
            if (a[i] == n) {
                a[i]--;
            }
        }
        sort(a.begin(), a.end());

        ll suf = 0;
        for (int l = 0, r = m; l < m; l++) {
            // a[l] + a[r] >= n
            if (r <= l) {
                suf -= a[r++];
            }
            while (r - 1 > l && a[l] + a[r - 1] >= n) {
                suf += a[--r];
            }
            ll now = suf + 1ll * (m - r) * (a[l] - n + 1);
            now *= 2;
            res += now;
        }
        cout << res << endl;
    }

    return 0;
}
```

## [2075D - Equalization](https://codeforces.com/contest/2075/problem/D)（背包 DP）

**Hint 1** 从二进制考虑，每次操作相当于什么？

从二进制考虑，每次操作相当于砍掉一个长度为 $k$ 的后缀。要求砍之后，$x,y$ 相同，也就是说要保留 $x,y$ 的前缀（这里的前缀指去除前导零后的前缀，不要求按位对齐）。

下设 $x,y$ 不算公共前缀的长度分别为 $a,b$。



**Hint 2** 如果对 $x$ 总共除掉 $2^{i}$，对 $y$ 总共除掉 $2^{j}$，$i,j$ 应满足什么条件？

首先 $i = a,j =b$ 是可以的。也可以多除一点，$i=a+1,j=b+1$ 也行，再多也可以，可以写成 $i=a+\Delta,j=b+\Delta$。

如果 $i,j$ 超过了 $x,y$ 二进制的长度，那么就没有 $+\Delta$ 的限制了。

可以枚举满足上述条件的 $(i,j)$。至多枚举 $\operatorname{O}(\log^{2}V)$ 次。



**Hint 3** 最后一步，已经确定对 $x$ 总共除掉 $2^{i}$，对 $y$ 总共除掉 $2^{j}$，如何求最小代价？

不妨换个思路，直接求所有 $(i,j)$ 的答案 $dp_{i,j}$。

用类似背包的思路 DP，相当于是一个物品 $k$ 可以分给第一个背包也可以给第二个背包也可以不给，即更新 $dp_{i+k,j}\leftarrow dp_{i,j}$，以及 $dp_{i,j+k}\leftarrow dp_{i,j}$。（具体见代码）

预处理的时间复杂度 $\operatorname{O}(\log ^{3}V)$。



总时间复杂度 $\operatorname{O}(\log^{3}V+T\log^{2}V)$。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ull = unsigned long long;

const ull inf = 0x3f3f3f3f3f3f3f3f;

// 转二进制
string BIN(ull x) {
    string res;
    while (x) {
        res += (x & 1) + '0';
        x >>= 1;
    }
    return res;
}

template<typename T>
void chmin(T& x, const T& y) {
    if (x > y) x = y;
}

int main() {
    int J;
    cin >> J;

    vector dp(60, vector<ull>(60, inf));
    dp[0][0] = 0;
    for (int k = 0; k < 60; k++) {
        auto ndp = dp;
        for (int x = 0; x < 60; x++) {
            for (int y = 0; y < 60; y++) {
                if (x + k < 60) chmin(ndp[x + k][y], dp[x][y] + (1ull << k));
                if (y + k < 60) chmin(ndp[x][y + k], dp[x][y] + (1ull << k));
            }
        }
        dp = ndp;
    }

    while (J--) {
        ull X, Y;
        cin >> X >> Y;
        string x = BIN(X), y = BIN(Y);
        
        ull res = inf;
        for (int j = x.size(); j < 60; j++) {
            for (int k = y.size(); k < 60; k++) {
                chmin(res, dp[j][k]);
            }
        }
        while (!x.empty() && !y.empty() && x.back() == y.back()) {
            x.pop_back();
            y.pop_back();
        }
        for (int j = 0; x.size() + j < 60 && y.size() + j < 60; j++) {
            chmin(res, dp[x.size() + j][y.size() + j]);
        }
        cout << res << endl;
    }

    return 0;
}
```



**Hint 1** $X_{i,k}=X_{j,k}$ 意味着什么？$a,b$ 分别可能有多少种取值？

$X_{i,k}=X_{j,k}\iff a_{i}\oplus b_{k}=a_{j}\oplus b_{k}\iff a_{i}=a_{j}$。也就是说，一旦两个元素相同，那么这两列的表头相同，这两列对应位置也就全部相同。（我赛时没想到）

若要求 $X$ 只有两种取值，那 **本质不同的只有两行两列**，也就是说 $a,b$ 分别最多有两种取值。

若有一者仅有一种取值，方案数很容易算，这里从略。下面只讨论 $a,b$ 都有两种取值的情形。不妨设前两行和前两列本质不同，并设 $a_{1} < a_{2},\ b_{1} < b_{2}$。


**Hint 2** 找到 $a_{1},b_{1},a_{2},b_{2}$ 的等价约束条件。

现在 $X_{1,1} \neq X_{1,2},X_{1,1} \neq X_{2,1}$，由要求只有两个不同的数，就必须 $X_{1,2}=X_{2,1}$，即 $a_{1}\oplus b_{1}\oplus a_{2}\oplus b_{2}=0$。另一方面，当  $a_{1}\oplus b_{1}\oplus a_{2}\oplus b_{2}=0$ 时，$X_{1,2}=X_{2,1},X_{1,1}=X_{2,2}$，满足只有两个不同的数的要求。

现在的问题是，求满足 $0 \leqslant a_{1} < a_{2} \leqslant A,\ 0 \leqslant b_{1} < b_{2} \leqslant B$，且 $a_{1}\oplus a_{2}= b_{1}\oplus b_{2}$ 的数量。



## [2075F - Beautiful Sequence Returns](https://codeforces.com/contest/2075/problem/F)（单调栈+双指针+线段树+二分）

*队友给的妙妙思路~*

**题意** 称一个整数序列为美丽的，如果：
- 每个元素左边有个元素比它小，且
- 每个元素右边有个元素比它大。

给定一个数组，求最长美丽子序列长度。


**Hint 1** 如果确定子序列左右端点，最长美丽子序列长度是多少？

问题等价于左端点 $\ell$ 为唯一最小值，右端点 $r$ 为唯一最大值。那么如果确定子序列左右端点，只需计算区间 $\ell<i<r$ 中在 $a_{l}<a_{i}<a_{r}$ 范围内的下标 $i$ 数量 cnt，长度即为 cnt + 2。


**Hint 2** 需要枚举哪些左右端点？

只需选取 *前缀最小值* 为左端点，*后缀最大值* 为右端点。因为如果 $\ell$ 左边还有比 $a_{\ell}$ 小的数，加上这个数一定更优，就不需要枚举这个 $\ell$ 了。



**Hint 3** 考虑双指针，枚举一个端点，动态求解另一个端点的最优答案。改变一者时，答案会有什么变化？

枚举右端点 $r$，「激活」合法（$\ell<i<r$ 且 $a_{l}<a_{i}<a_{r}$）的下标 $i$，把合法总数量记录在左端点 $\ell$ 上，也就是给每个左端点 $\ell$ 记录当前最长美丽子序列长度，如果多一个数合法就给每个 $\ell$ 都 +1，少一个合法就都 -1。

右端点从 $r$ 移动到 $r'<r$ 时，$r'<i<r$ 要全部取消激活。这里按下标枚举 $i$。

并且由于 $a_{r'}>a_{r}$，$1 \leqslant i<r'$ 中满足 $a_{r} \leqslant a_{i}<a_{r'}$ 的数要激活。这里按值枚举 $i$。

在整个过程中，每个数只会激活一次取消激活一次，复杂度已经达到线性。但问题在，把合法总数量记录在左端点 $\ell$ 上需要枚举很多 $\ell$，能否优化？



**Hint 4** 每次激活 $i$ 需要记录的左端点 $\ell$，有什么特点？如何快速找到？

每次激活 $i$ 需要记录的左端点 $\ell$ 其实是连续的区间 $[L,R)$。把合法总数量记录在左端点 $\ell$ 上，只需要做区间加。为求最优答案，只需要区间最大值。用线段树即可维护。

这个区间 $[L,R)$ 中的数 $j$ 满足 $a_{j}<a_{i}\land j<i$，也即 $L$ 对应于最小满足 $a_{j}<a_{i}$ 的 $j$，$R$ 对应于最小满足 $j \geqslant i$ 的 $j$。这两者都可以二分求得。

时间复杂度 $\operatorname{O}(n\log^{2}n)$。



```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

template<class Info, class Mark>
struct SegmentTree {
// 模板略
};
 
struct Mark {
    int add = 0;
    void apply(const Mark& o, int L, int R) & {  // 将标记o应用到当前节点[L,R)
        add += o.add;
    }
};

struct Info {
    int mx = 0;
    void apply(const Mark& o, int L, int R) & {   // 将标记o应用到当前节点[L,R)
        mx += o.add;
    }
    void apply(const Info& o) & {
        mx = max(mx, o.mx);
    }
    friend Info operator + (const Info& l, const Info& r) {
        return { max(l.mx, r.mx) };
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

    int J;
    cin >> J;

    while (J--) {
        int n;
        cin >> n;
        
        vector<int> a(n);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }

        // 离散化
        auto all = a;
        sort(all.begin(), all.end());
        all.erase(unique(all.begin(), all.end()), all.end());
        vector<vector<int>> adj(all.size());
        for (int i = 0; i < n; i++) {
            a[i] = lower_bound(all.begin(), all.end(), a[i]) - all.begin();
            adj[a[i]].push_back(i);
        }

        // 特判长度为1的情况
        if (is_sorted(a.rbegin(), a.rend())) {
            cout << 1 << endl;
            continue;
        }

        vector<int> pre;  // 前缀最小值的下标
        for (int i = 0; i < n; i++) {
            if (pre.empty() || a[i] < a[pre.back()]) {
                pre.push_back(i);
            }
        }

        vector<int> suf;  // 后缀最大值的下标
        for (int i = n - 1; i >= 0; i--) {
            if (suf.empty() || a[i] > a[suf.back()]) {
                suf.push_back(i);
            }
        }
        
        int ans = 1;
        SegmentTree<Info, Mark> tree(0, n);
        auto add = [&](int i, int v) {
            /// 暴力的写法
            // for (int j = 0; j < pre.size(); j++) {
            //     if (a[pre[j]] < a[i] && pre[j] < i) {
            //         tree.apply(j, j + 1, Mark{ v });
            //     }
            // }
            /// 二分的写法
            // 在pre中找最小的R满足 pre[R]>=i
            int R = lower_bound(pre.begin(), pre.end(), i) - pre.begin();
            // 在pre中找最小的L满足 a[pre[L]]<a[i]
            int L = lower_bound(pre.begin(), pre.end(), a[i], 
                [&](int id, int val) {
                    return a[id] >= val; 
                }) - pre.begin();
            tree.apply(L, R, Mark{ v });
        };
        int lstr = n;
        a.push_back(0);  // a[n] = 0 防止越界
        for (auto r : suf) {
            for (int i = r + 1; i < lstr; i++) {  // r'<i<r 全部取消激活
                if (a[i] < a[lstr]) add(i, -1);
            }
            for (int v = a[lstr]; v < a[r]; v++) {  // i<r' 中满足 a_{r}<=a_{i}<a_{r'} 的数要激活
                for (auto i : adj[v]) {
                    if (i < r) add(i, 1);
                }
            }
            ans = max(ans, 2 + tree.query(0, n).mx);            
            lstr = r;
        }        
        cout << ans << endl;
    }

    return 0;
}
```
