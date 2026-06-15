---
title: Trie
tags:
  - ACM
  - 算法
  - 筆記
categories:
  - posts_acm
  - 知識
  - String
abbrlink: bbb9beee
---

### CMG 最喜欢的字典树题——主机场「新懐質問」

*本题名称来自「新しい、でも懐かしい質問」（新的，但是令人怀念的问题），因为有人说命题人的题目都很有年代感……

> 给定 $N, K$ 和一个字符串集合 $S = (S_{1}, S_{2}, \dots, S_{N})$，任选 $K$ 元子集 $T\subset S$，最小化 $\max\limits_{a,b\in T,a \neq b}^{}\operatorname{LCP}(a,b)$。$2\leqslant K \leqslant N \leqslant 10^6$ 且 $\sum |S_i| \leqslant 10^6$。（[2023GDCPC E. New but Nostalgic Problem](https://codeforces.com/gym/104369/problem/E)）

```cpp
#include <bits/stdc++.h>
using namespace std;

constexpr int ALPHABET = 26;

struct Node {
    int ecnt{}; // 以该节点为末字符的字符串数量
    int icnt{}; // 经过该节点的字符串数量
    array<Node*, ALPHABET> next{};
};

int main() {
    int t;
    cin >> t;

    while (t--) {
        int N, K;
        cin >> N >> K;

        Node* root = new Node();
    
        while (N--) {
            string s;
            cin >> s;
            for (auto& c : s) c -= 'a';

            Node* p = root;
            p->icnt++;
            for (auto c : s) {
                auto& q = p->next[c];
                if (!q) q = new Node();
                p = q;
                p->icnt++;
            }
            p->ecnt++;
        }
    
        // 逐位确定答案，从前向后遍历，每一位都尽可能选不一样的
        auto p = root;  // 目前已确定的答案前缀在 trie 上是哪个节点
        int num = 0;   // 已经选择的数量
        string res;
        while (1) {
            // 判断答案是否就是 p 所在的节点
            num += p->ecnt;  // 以p为末字符的字符串一定都可以选
            for (int i = 0; i < 26; i++) {
                if (p->next[i] && p->next[i]->icnt) {
                    num++;  // 该节点的下一位'a'+i有字符串经过
                }
            }
            if (num >= K) {  // 答案确实就是 p 所在的节点
                break;
            }
            for (int i = 0; i < 26; i++) {
                if (p->next[i] && p->next[i]->icnt) {  // 该节点的下一位'a'+i有字符串经过 为了让字典序尽量小 需要从a到z来枚举
                    // 比i小的子树里的字符串都可以选
                    num += p->next[i]->icnt - 1;  // 这里-1的原因是上一个循环已经加过1了
                    if (num >= K) {
                        num -= p->next[i]->icnt;  // 当前子数不确定 减掉 留到下一个字符
                        p = p->next[i];
                        res += 'a' + i;
                        break;
                    }
                }
            }
        }
        if (res == "") {
            cout << "EMPTY" << endl;
        } else {
            cout << res << endl;
        }
    }

    return 0;
}
```

### 2022 ICPC 杭州 K. Master of Both

> 给定 $N$ 个字符串，$Q$ 次询问，每次询问给定一个字母之间的大小顺序，即给定字典序排序方法，问在该顺序下这 $N$ 个字符串（按规定字典序排序的）的逆序对个数。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

constexpr int ALPHABET = 27;

struct Node {
    int icnt{}; 
    array<Node*, ALPHABET> next{};
};

signed main() {
    int N, Q;
    cin >> N >> Q;
    
    Node* root = new Node();
    
    array<array<ll, ALPHABET>, ALPHABET> cnt{};
    
    while (N--) {
        string s;
        cin >> s;
        for (auto& c : s) c = c - 'a' + 1;
        s = s + char(0);  // 为方便和空串比较，令空为比a小的字符
        
        Node* p = root;
        p->icnt++;
        for (auto& c : s) {
            auto& q = p->next[c];
            if (!q) q = new Node();
            for (int i = 0; i < ALPHABET; i++) {
                if (i == c) continue;
                if (p->next[i]) {
                    cnt[c][i] += p->next[i]->icnt; // 边插入边处理
                }
            }
            p = q;
            p->icnt++;
        }
    }
    
    while (Q--) {
        string s;
        cin >> s;
        for (auto& c : s) c = c - 'a' + 1;
        s = char(0) + s;
        
        ll res = 0;
        for (int l = 0; l < ALPHABET; l++) {
            for (int r = l + 1; r < ALPHABET; r++) {
                res += cnt[s[l]][s[r]];
            }
        }
        cout << res << endl;
    }
    
    return 0;
}
```


### [2025 春 杭电多校 03 1007 宝石商店](https://acm.hdu.edu.cn/contest/problem?cid=1152&pid=1007)（01 字典树，前缀字典树）

> 给定数组 $A$，多次询问给定 $L,R,V$，求区间 $i\in[L,R]$ 中最大的 $A_{i} \oplus V$。

字典树信息可减，给每个 $[1,i]$ 的前缀建树，把 $[L,R]$ 拆成两个小区间之差。

```cpp
// 先写个池子
struct node {
    int icnt{};
    array<Node, 2> next{};
};
void solve() {
    int N, Q;
    cin >> N >> Q;
    vector<Node> pre(N + 1);
    pre[0] = newNode();
    for (int i = 0; i < N; i++) {
        uint x;
        cin >> x;
        Node rt = newNode();
        auto p = rt;
        p->icnt++;
        for (int bit = B; bit >= 0; bit--) {
            bool c = x >> bit & 1;
            if (!p->next[c]) p->next[c] = newNode();
            p = p->next[c];
            p->icnt++;
        }
        auto merge = [&](auto&& merge, Node x, Node y) {
            if (!x) return y;
            if (!y) return x;
            x->icnt += y->icnt;
            for (int i = 0; i < 2; i++) {
                x->next[i] = merge(merge, x->next[i], y->next[i]);
            }
            return x;
        };
        pre[i + 1] = merge(merge, rt, pre[i]);
    }
    while (Q--) {
        int l, r, x;
        cin >> l >> r >> x;
        l--;
        auto pl = pre[l], pr = pre[r];
        uint max = 0;
        for (int bit = B; bit >= 0; bit--) {
            bool c = x >> bit & 1 ^ 1;
            uint sum = 0;
            if (pl && pl->next[c]) sum -= pl->next[c]->icnt;
            if (pr && pr->next[c]) sum += pr->next[c]->icnt;
            if (sum > 0) {
                max |= 1u << bit;
                if (pl) pl = pl->next[c];
                if (pr) pr = pr->next[c];
            } else {
                if (pl) pl = pl->next[!c];
                if (pr) pr = pr->next[!c];
            }
        }
        cout << max << endl;
    }
}
```

本题还有一个更简单的方法，直接在每个节点上存有哪些编号经过，要判断有没有 $[L,R]$，二分就行。复杂度多个二分的 $\log$。


### [2024 山东邀请赛 G-Cosmic Travel](https://qoj.ac/problem/9411)（01 字典树，线段树式字典树查询，字典树形 DP 预处理）

Given $N$ numbers $(A_1, A_2, \cdots, A_N)$ and $Q$ queries. For each query, given $L, R, K$ and compute

$$
\sum_{x=L}^{R} \underset{i=1}{\overset{N}{K\!\operatorname{-thmin}}} \lbrace A_i \oplus x \rbrace \bmod 998244353 
$$

$0 \leqslant A_{i},L,R < 2^{60}$,  $1 \leqslant N, Q \leqslant 10^5$.

建一棵 01-Trie，按类似线段树的方法做查询（蒽，这俩都是二叉树，非常类似，我想命题人也是从这点入手命题的）。

设当前节点 $p$，设 $p$ 子树的低位部分是 $[0, 2^{d+1})$，其左子树范围 $[0,2^{d})$，右子树 $2^{d}+[0,2^{d})$。

回忆线段树 range query 的写法，需要考虑查询区间 $[L,R]$ 与左右子树的关系。有三种：区间完全在右子树、区间完全在左子树以及区间跨越了中点。对于前两种，继续递归；对于第三种，将查询区间分成两部分，化归为前两种并继续递归。

这样递归下去，任意查询区间 $[L,R]$ 都能被分解成若干个 Trie 树的完整子树的查询，只需要预处理出每个完整子树的答案，就能高效地计算出最终答案。

对于一个查询，在树的每一层最多访问两个节点，因此单组查询复杂度 $\mathcal{O}(\log V)$。

现在考虑预处理，我们需要对每个节点 $p$，对于所有可能的低位查询值 $x\in[0, 2^{d+1})$，求出 $A_i \oplus x$ 的第 $k$ 小的总和，即

$$
f(p, k) = \sum_{x=0}^{2^{d+1}-1} \underset{A_{i}\in \operatorname{subtree}(p)}{k\!\operatorname{-thmin}} \lbrace A_i \oplus x \rbrace 
$$

从叶子开始向上 DP，转移分为 $x$ 的二进制第 $d$ 位填 0/1 两种。

总复杂度 $\mathcal{O}[(N+Q)\log V]$。

```cpp
struct Node {
    Node* lc{};
    Node* rc{};
    int cnt{};
    vector<Z> rk;
};

void solve() {
    int N, Q;
    cin >> N >> Q;

    Node* root = new Node();

    while (N--) {
        ull x;
        cin >> x;
        auto p = root;
        p->cnt++;
        for (int i = 59; i >= 0; i--) {
            auto& q = x >> i & 1 ? p->rc : p->lc;
            if (!q) q = new Node();
            p = q;
            p->cnt++;
        }
    }
    
    auto build = [&](this auto&& build, Node*& p, int d = 59) -> void {
        if (!p) {
            p = new Node();
            return;
        }
        p->rk.resize(p->cnt);
        if (d == -1) {
            return;
        }
        build(p->lc, d - 1);
        build(p->rc, d - 1);
        for (int k = 0; k < p->cnt; k++) {
            // x的第d位为0
            if (k < p->lc->cnt) {
                p->rk[k] += p->lc->rk[k];
            } else {
                p->rk[k] += p->rc->rk[k - p->lc->cnt] + Z(1ULL << d) * (1ULL << d);
            }
            // x的第d位为1
            if (k < p->rc->cnt) {
                p->rk[k] += p->rc->rk[k];
            } else {
                p->rk[k] += p->lc->rk[k - p->rc->cnt] + Z(1ULL << d) * (1ULL << d);
            }
        }
    };
    build(root);
    
    auto query = [&](this auto&& query, Node* p, ull L, ull R, int k, ull x = 0, int d = 59) -> Z {
        if (L >= R) {
            return 0;
        }
        if (R - L == (1ULL << (d + 1))) {
            return p->rk[k] + Z(x) * (R - L);
        }
        ull M = L & (~((1ULL << d) - 1)) | (1ULL << d);
        
        Z res = 0;
        // x的第d位为0
        if (k < p->lc->cnt) {
            res += query(p->lc, L, min(R, M), k, x, d - 1);
        } else {
            res += query(p->rc, L, min(R, M), k - p->lc->cnt, x | 1ULL << d, d - 1);
        }
        // x的第d位为1
        if (k < p->rc->cnt) {
            res += query(p->rc, max(L, M), R, k, x, d - 1);
        } else {
            res += query(p->lc, max(L, M), R, k - p->rc->cnt, x | 1ULL << d, d - 1);
        }
        return res;
    };

    while (Q--) {
        ull L, R;
        int K;
        cin >> L >> R >> K;
        K--;
        cout << query(root, L, R + 1, K) << endl;
    }
    
    return;
}
```


## [CF965E](https://codeforces.com/gym/695059/problem/F)

对于一棵有若干个节点的树，其中一些节点上有一个球，每次可以把球移动至它到根节点的路径中没有球的节点上，问最终所有球的深度之和的最小值。

考虑对每个节点维护一个大根堆，记录其子树内球的深度。合并子树时，只需要把其每个子节点的大根堆进行启发式合并即可。如果根节点上没有球，贪心地把子树内深度最深的球移动至根节点上。