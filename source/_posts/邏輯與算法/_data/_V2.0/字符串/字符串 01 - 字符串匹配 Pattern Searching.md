---
title: XCPC wiki - 字符串 01 - 字符串匹配 Pattern Searching
tags:
  - 算法
  - 筆記
  - ACM
  - 字符串
categories:
  - - 筆記
    - XCPCwiki
abbrlink: 7cc41661
hide: true
date: 2025-01-24 22:05:00
updated: 2025-01-24 22:05:00
description:
---


*Given a text `s[]` and a pattern `p[]`, print all occurrences of `p[]` in `s[]`.*

## Brute force solution

最坏时间复杂度 $\Theta(mn)$。

```cpp
int i = 0, j = 0;
while (i < s.length()) {
    if (s[i] == T[j]) ++i, ++j;
    else i = i-j+1, j = 0;
    if (j == T.length()) {              // 匹配成功
        printf("[%d-%d] ", i-j, i-1);
        i = i - j + 1;
        j = 0;
    }
}
```


<div STYLE="page-break-after: always;"></div>


## KMP Algorithm

> ——Knuth-Morris-Pratt 字符串查找算法

**PMT**（Partial Match Table，**部分匹配表**）$\operatorname{pmt}(i)$ 表示字符串 $p$ 的前 $i$ 位字符中最长公共前后缀的长度。这样，在 Brute force solution 中，$j$ 就被赋为一个合适的值，即 $\operatorname{pmt}(j-1)$。使用 **自我匹配** 求出 $\operatorname{pmt}$。

```cpp
struct KMP {
    string P;         // Pattern
    vector<int> pmt;  // Partial Match Table

    KMP(string& p) {
        P = p;
        pmt.resize(P.length());
        for (int i = 1, j = 0; i < P.length(); ++i) {
            while (j && P[i] != P[j]) j = pmt[j - 1];   // 前移j指针 直到成功匹配或移到头为止
            if (P[i] == P[j]) ++j;                      // 当前位匹配成功 j指针右移
            pmt[i] = j;                                 // 更新pmt的值
        }
    }

    auto solve(const string& S) {
        vector<pair<int, int> > res;
        for (int i = 0, j = 0; i < S.length(); ++i) {
            while (j && S[i] != P[j]) j = pmt[j - 1];   // 前移j指针 直到成功匹配或移到头为止
            if (S[i] == P[j]) ++j;                      // 当前位匹配成功 j指针右移
            if (j == P.length()) {                      // 匹配成功
                res.push_back({ i - j + 1, i });        // 找到 [i-j+1, i] 为一个匹配串
                j = pmt[j - 1];                         // 初始化
            }
        }
        return res;
    }
};  // KMP

void eachT() {
    KMP kmp;   // cin >> P

    string s; cin >> s;
    auto res = kmp.solve(s);
    if (res.empty()) {
        cout << "Not Found\n";
    }
    else for (auto& [l, r] : res) {
        cout << "Found at " << l << ' ' << r << '\n';
    }
}
```


<div STYLE="page-break-after: always;"></div>


## AC Automaton (Aho-Corasick Automaton)

AC 自动机是 **以 Trie 的结构为基础**，结合 **KMP 的思想** 建立的自动机，用于解决 **多模式匹配** 等任务。

```cpp
struct AhoCorasick {
    static constexpr int ALPHABET = 26;
    struct Node {
        int len;
        int link;
        array<int, ALPHABET> next;
        Node() : link{}, next{} {}
    };
    
    vector<Node> t;
    
    AhoCorasick() {
        init();
    }
    
    void init() {
        t.assign(2, Node());
        t[0].next.fill(1);
        t[0].len = -1;
    }
    
    int newNode() {
        t.emplace_back();
        return t.size() - 1;
    }
    
    int add(const vector<int> &a) {
        int p = 1;
        for (auto x : a) {
            if (t[p].next[x] == 0) {
                t[p].next[x] = newNode();
                t[t[p].next[x]].len = t[p].len + 1;
            }
            p = t[p].next[x];
        }
        return p;
    }
    
    int add(const string &a, char offset = 'a') {
        vector<int> b(a.size());
        for (int i = 0; i < a.size(); i++) {
            b[i] = a[i] - offset;
        }
        return add(b);
    }
    
    void work() {
        queue<int> q;
        q.push(1);
        
        while (!q.empty()) {
            int x = q.front();
            q.pop();
            
            for (int i = 0; i < ALPHABET; i++) {
                if (t[x].next[i] == 0) {
                    t[x].next[i] = t[t[x].link].next[i];
                } else {
                    t[t[x].next[i]].link = t[t[x].link].next[i];
                    q.push(t[x].next[i]);
                }
            }
        }
    }
    
    int next(int p, int x) {
        return t[p].next[x];
    }
    
    int next(int p, char c, char offset = 'a') {
        return next(p, c - 'a');
    }
    
    int link(int p) {
        return t[p].link;
    }
    
    int len(int p) {
        return t[p].len;
    }
    
    int size() {
        return t.size();
    }
};
```


旧版：

```cpp
#include <queue>
struct ACA {
    string P;              // 主串
    int pcnt = 0;
    vector<int> tree[26];  // 字典树
    vector<int> sum;        // 记录每个节点的子节点个数

    ACA() {
        cin >> P;
        for (int i = 0; i < 26; i++) tree[i].resize(N);
    }

    int in(constexpr string& S) {
        int u = 0;
        for (auto& c : S) {
            if (!tree[c - 'a'][u]) tree[c - 'a'][u] = ++pcnt;
            u = tree[c - 'a'][u];
        }
        return u;
    }

    void solve() {
        vector<int> fail(pcnt + 1);      // 失配指针

        // BFS
        queue<int> Q;
        for (int c = 0; c < 26; c++) {
            if (tree[c][0]) Q.push(tree[c][0]);
        }
        while (!Q.empty()) {
            int u = Q.front(); Q.pop();
            for (int c = 0; c < 26; c++) {
                if (tree[c][u]) {
                    fail[tree[c][u]] = tree[c][fail[u]];
                    Q.push(tree[c][u]);
                }
                else {
                    tree[c][u] = tree[c][fail[u]];
                }
            }
        }

        sum.resize(pcnt + 1);
        int u = 0;
        for (auto c : P) {
            u = tree[c - 'a'][u];
            sum[u] += 1;
        }

        vector<vector<int> > E(pcnt + 1);
        for (int u = 1; u <= pcnt; u++) {
            E[fail[u]].push_back(u);
        }
        auto dfs = [&](auto self, int u = 0) -> void {
            for (auto v : E[u]) {
                self(self, v);
                sum[u] += sum[v];
            }
        };
        dfs(dfs);
    }
};  // AC Automaton
```



### 模板题

在 A 里面找有 C 的 B

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <queue>
using ll = long long;
constexpr int N = 2e5 + 5;

struct ACA {

};

struct KMP {

};

int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);

    int T;
    cin >> T;
    while (T--) {
        int n;
        cin >> n;
        vector<int> ok(n, 1);

        ACA aca;   // cin >> A
        KMP kmp;   // cin >> C

        vector<int> pos(n);
        for (int i = 0; i < n; ++i) {
            string B1, B2;
            cin >> B1 >> B2;

            pos[i] = aca.in(B1);
            if (!kmp.solve(B2)) ok[i] = 0;
        }

        aca.solve();

        for (int i = 0; i < n; i++) {
            if (aca.sum[pos[i]] == 0) ok[i] = 0;
        }

        for (int i = 0; i < n; i++) {
            if (ok[i]) cout << i + 1 << ' ';
        }
        cout << '\n';
    }

    return 0;
}
```

<div STYLE="page-break-after: always;"></div>


## 例题

### 洛谷-P2375

**题意** 求字符串 $p$ 的前 $i$ 位字符中 **不重叠的** 公共前后缀的数量。

**思路** 引例：求字符串 $p$ 的前 $i$ 位字符中公共前后缀的数量。

回忆更新 $\operatorname{pmt}$ 的方法：$\operatorname{pmt}(i):=j$，这时串 $s$ 的第 $\sim i$ 位与第 $0\sim j-1$ 位是匹配的，也就是前 $i$ 位的后缀与长度为 $j$ 的前缀匹配，这个匹配的长度就是 $\operatorname{pmt}(i)$。

显然地，$\operatorname{pmt}[\operatorname{pmt}(i)]$ 也是一个合法的匹配长度。例如，`abacabad`，它的 $\operatorname{pmt}$ 为 `aba`，$\operatorname{pmt}(6)=3$。而对于 `aba`，其 $\operatorname{pmt}$ 是 `a`，$\operatorname{pmt}(3)=1$。注意到 `a` 也是 `abacabad` 的公共前后缀，其长度 $1=\operatorname{pmt}(3)=\operatorname{pmt}[\operatorname{pmt}(6)]$。

依次类推，$\operatorname{pmt}[\operatorname{pmt}(i)],\ \operatorname{pmt}\lbrace\operatorname{pmt}[\operatorname{pmt}(i)]\rbrace$ 都是……**串 $s$ 的最长公共前后缀的最长公共前后缀也是串 $s$ 的公共前后缀，那么，串 $s$ 的公共前后缀的数量就是它的 $\operatorname{pmt}$ 的公共前后缀的数量再加上 1**，即 $\operatorname{num}(i)=\operatorname{num}[\operatorname{pmt(i)}]+1$，这就得到了 $\operatorname{num}$ 数组的递推公式。

再结合初始值 $\operatorname{num}(0)=1$（即一个字母的公共前后缀数量为 1，就是它自己），就能求出 $\operatorname{num}$ 数组了。

```cpp
num[0] = 1;
for (int i = 1, j = 0; i < p.length(); ++i) {
    while (j and p[i] != p[j]) j = pmt[j - 1]; // 前移j指针 直到成功匹配或移到头为止
    j += p[i] == p[j];                         // 当前位匹配成功 j指针右移
    pmt[i] = j;                                // 更新pmt的值
    num[i] = num[j - 1] + 1;                   // 初始的num值
}
```


回到原题，再看刚才的递推公式 $\operatorname{num}(i)=\operatorname{num}[\operatorname{pmt(i)}]+1$，这个 $\operatorname{pmt}$ 有可能很长，比如 `abababa` 的 $\operatorname{pmt}$ 就是 `ababa`，如果按这个长度套用公式，所得的公共前后缀就会重叠了，即 `ab` **`aba`** `ba`。

为避免这个问题，希望求出 **小于 $s$ 的长度的一半** 的最长的公共前后缀，记为 $\operatorname{pmt}'$，其长度为 $j'$ ，那么 $\operatorname{num}(i)=\operatorname{num}[\operatorname{pmt'(i)}]+1$。

如何求 $\operatorname{pmt}'$？刚才提到，串 $s$ 的最长公共前后缀的最长公共前后缀也是串 $s$ 的公共前后缀，那我们就不断递推计算最长公共前后缀，直到长度合适（即 $j> \dfrac{i+1}{2}$），得到的就是所需的公共前后缀。`while (j > i+1>>1) j = pmt[j-1]`。

得到合适的公共前后缀的长度 $j'$ 后，套用公式计算即可。

```cpp
constexpr int N = 3e6 + 8;
constexpr int MOD = 1e9 + 7;
int pmt[N], num[N];

void eachT() {
    std::string p; std::cin >> p;
    
    memset(pmt, 0, sizeof pmt);
    memset(num, 0, sizeof num);
    num[0] = 1;

    for (int i = 1, j = 0; i < p.length(); ++i) {
        while (j and p[i] != p[j]) j = pmt[j - 1]; // 前移j指针 直到成功匹配或移到头为止
        j += p[i] == p[j];                         // 当前位匹配成功 j指针右移
        pmt[i] = j;                                // 更新pmt的值
        num[i] = num[j - 1] + 1;                   // 初始的num值
    }

    ll ans = 1;
    for (int i = 1, j = 0; i < p.length(); ++i) {
        while (j and p[i] != p[j]) j = pmt[j - 1]; // 前移j指针 直到成功匹配或移到头为止
        j += p[i] == p[j];                         // 当前位匹配成功 j指针右移
        while (j > i + 1 >> 1) j = pmt[j - 1];
        ans *= (num[j - 1] + 1);
        ans %= MOD;
    }

    printf("%lld\n", ans);
}
```

<div STYLE="page-break-after: always;"></div>
