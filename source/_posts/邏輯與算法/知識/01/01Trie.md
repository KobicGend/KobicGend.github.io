---
title: 01Trie
tags:
  - ACM
  - 算法
  - 筆記
categories:
  - 邏輯與算法
  - 知識
  - '01'
abbrlink: b30456ca
---

```cpp
struct Node {
    std::array<Node*, 2> next{};
    int icnt = 0;
};

void insert(Node*& p, int val, int bit = 30) {
    if (!p) {
        p = new Node();
    }
    p->icnt++;
    if (bit == -1) return;
    int c = (val >> bit) & 1;
    insert(p->next[c], val, bit - 1);
}

bool extract(Node*& p, int val, int bit = 30) {
    if (!p) return false;
    if (bit >= 0) {
        int c = (val >> bit) & 1;
        if (!extract(p->next[c], val, bit - 1)) {
            return false;
        }
    }
    if (--p->icnt == 0) {
        delete p;
        p = nullptr;
    }
    return true;
}

// 计算满足 x ^ P <= L 的元素数量
i64 count_less_than(Node* p, int P, int L, int bit = 30) {
    if (!p || bit == -1) return 0;
    int c = (P >> bit) & 1;
    i64 ans = 0;
    if ((L >> bit) & 1) {
        if (p->next[c]) {
            ans += p->next[c]->icnt;
        }
        if (p->next[c ^ 1]) {
            ans += count_less_than(p->next[c ^ 1], P, L, bit - 1);
        }
    } else {
        if (p->next[c]) {
            ans += count_less_than(p->next[c], P, L, bit - 1);
        }
    }
    return ans;
}

i64 get_kth_min(Node* p, int P, int k, int bit = 30) {
    if (!p || bit == -1) return 0;
    int c = (P >> bit) & 1;
    int cnt_pref = (p->next[c] ? p->next[c]->icnt : 0);
    
    if (k <= cnt_pref) {
        return get_kth_min(p->next[c], P, k, bit - 1);
    } else {
        return get_kth_min(p->next[c ^ 1], P, k - cnt_pref, bit - 1) + (1LL << bit);
    }
}

i64 get_min_val(Node* p, int val, int bit = 30) {
    if (!p || bit == -1) return 0;
    int c = (val >> bit) & 1;
    if (p->next[c]) {
        return get_min_val(p->next[c], val, bit - 1);
    }
    return get_min_val(p->next[c ^ 1], val, bit - 1) + (1LL << bit);
}

i64 get_max_val(Node* p, int val, int bit = 30) {
    if (!p || bit == -1) return 0;
    int c = (val >> bit) & 1;
    if (p->next[c ^ 1]) {
        return get_max_val(p->next[c ^ 1], val, bit - 1) + (1LL << bit);
    }
    return get_max_val(p->next[c], val, bit - 1);
}

i64 get_min_two_trees(Node* u, Node* v, int bit = 30) {
    if (bit == -1) return 0;
    i64 res = 1LL << 60;    
    if ((u->next[0] && v->next[0]) || (u->next[1] && v->next[1])) {
        if (u->next[0] && v->next[0]) {
            chmin(res, get_min_two_trees(u->next[0], v->next[0], bit - 1));
        }
        if (u->next[1] && v->next[1]) {
            chmin(res, get_min_two_trees(u->next[1], v->next[1], bit - 1));
        }
    } else {
        if (u->next[0] && v->next[1]) {
            chmin(res, get_min_two_trees(u->next[0], v->next[1], bit - 1) + (1LL << bit));
        }
        if (u->next[1] && v->next[0]) {
            chmin(res, get_min_two_trees(u->next[1], v->next[0], bit - 1) + (1LL << bit));
        }
    }
    return res;
}

i64 get_max_two_trees(Node* u, Node* v, int bit = 30) {
    if (bit == -1) return 0;
    i64 res = -1;    
    if ((u->next[0] && v->next[1]) || (u->next[1] && v->next[0])) {
        if (u->next[0] && v->next[1]) {
            chmax(res, get_max_two_trees(u->next[0], v->next[1], bit - 1) + (1LL << bit));
        }
        if (u->next[1] && v->next[0]) {
            chmax(res, get_max_two_trees(u->next[1], v->next[0], bit - 1) + (1LL << bit));
        }
    } else {
        if (u->next[0] && v->next[0]) {
            chmax(res, get_max_two_trees(u->next[0], v->next[0], bit - 1));
        }
        if (u->next[1] && v->next[1]) {
            chmax(res, get_max_two_trees(u->next[1], v->next[1], bit - 1));
        }
    }
    return res;
}
```


## [CF888G](https://codeforces.com/gym/695059/problem/J)

A complete undirected graph. $w_{i j} = A_{i} \oplus A_{j}$. Calculate the weight of the minimum spanning tree.

考虑 trie 的每个分叉点，在这里需要把两个子树（子连通块）合并。调用 `get_min_two_trees`，查找两棵字典树中异或的最小值。