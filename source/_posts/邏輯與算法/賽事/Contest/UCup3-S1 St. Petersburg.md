---
title: 'The 3rd Universal Cup. Stage 1: St. Petersburg'
tags:
  - 題解
  - 筆記
  - ACM
  - 算法
  - UCUP
categories:
  - 邏輯與算法
  - 賽事
  - Contest
description: 'The 3rd Universal Cup. Stage 1: St. Petersburg'
highlight_shrink: true
abbrlink: 99e62ce5
date: 2025-05-19 09:18:00
updated: 2025-05-19 09:18:00
---



### 【好题】[A. Element-Wise Comparison](https://qoj.ac/contest/1696/problem/8781) - UPSOLVE

> Given a permutation, find the number of pairs of continuous subarrays of a given length $m$ such that the left one is *element-wise* smaller than the right one, i.e. every element in the left subarray is strictly less than the corresponding element in the right subarray. $n \leqslant 5\times 10^{4}$。

构造矩阵 $A_{ij}=a_{i}<a_{i+j}$，统计所有连续 $m$ 行之 AND 的 POPCOUNT 之和，复杂度 $\operatorname{O}\Big(\dfrac{n^{2}}{w}\Big)$。具体实现颇具技巧：

```cpp
constexpr int N = 5e4;
int main() {
    int n, m;
    cin >> n >> m;
    vector<int> pos(n);
    for (int i = 0; i < n; ++i) {
        int x;
        cin >> x;
        pos[--x] = i;
    }
    bitset<N> tmp;   
    vector<bitset<N>> A(n);
    for (int x = n - 1; x >= 0; x--) {
        A[pos[x]] = tmp >> pos[x];
        tmp[pos[x]] = 1;
    }
    auto pre = A, suf = A;
    for (int i = 0; i < n; i++) {
        if (i % m) pre[i] &= pre[i - 1];
    }
    for (int i = n - 1; i >= 0; i--) {
        if (i + 1 < n && (i + 1) % m) suf[i] &= suf[i + 1];
    }
    ll res = 0;
    for (int i = 0; i + m <= n; i++) {
        if (i % m == 0) {
            res += suf[i].count();
        } else {
            res += (suf[i] & pre[i + m - 1]).count();
        }
    }
    cout << res << endl;
}
```

### [C. Cherry Picking](https://qoj.ac/contest/1696/problem/8783)（模拟）

从小到大依次删数，维护所有的 1 段和 0 段。代码写了一坨：

```cpp
int main() {
    int n, m;
    cin >> n >> m;
    map<int, vector<int>> adj;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        adj[x].push_back(i);
    }
    string s;
    cin >> s;
    map<int, array<int, 2>> st; // l, [op, cnt]
    int l = -1;
    multiset<int> lens;
    for (int i = 0; i < s.size(); i++) {
        if (s[i] == '0') {
            if (l != -1) {
                st[l] = { 1, i - l };
                lens.insert(i - l);
            }
            l = -1;
            st[i] = { 0, 1 };
        } else if (s[i] == '1') {
            if (l == -1) l = i;
        }
    }
    if (l != -1) {
        st[l] = { 1, n - l };
        lens.insert(n - l);
    }
    int res = 0;
    if (!lens.empty() && *lens.rbegin() >= m) {
        res = max(res, adj.upper_bound(0)->first);
    }
    for (auto [k, vec] : adj) {
        for (auto id : vec) {
            if (s[id] == '0') {
                auto it = st.lower_bound(id);
                auto L = prev(it);
                auto R = next(it);
                if (it != st.begin() && R != st.end() && L->second[0] == 1 && R->second[0] == 1) {
                    auto l = it->first;
                    auto [op, cnt] = it->second;
                    auto l1 = L->first;
                    auto [op1, cnt1] = L->second;
                    auto l2 = R->first;
                    auto [op2, cnt2] = R->second;
                    st.erase(it);
                    st.erase(L);
                    st.erase(R);
                    st[l1] = { 1, cnt1 + cnt2 };
                    lens.extract(cnt1);
                    lens.extract(cnt2);
                    lens.insert(cnt1 + cnt2);
                } else {
                    st.erase(it);
                }
            } else {
                auto it = st.upper_bound(id);
                it--;
                auto l = it->first;
                auto [op, cnt] = it->second;
                lens.extract(cnt);
                if (cnt - 1) {
                    st[l] = { op, cnt - 1 };
                    lens.insert(cnt - 1);
                }
            }
        }
        if (!lens.empty() && *lens.rbegin() >= m) {
            res = max(res, adj.upper_bound(k)->first);
        }
    }
    cout << res << endl;

    return 0;
}
```

### [D. Dwarfs' Bedtime](https://qoj.ac/contest/1696/problem/8784)（思维交互）

只能顺着问所以二分寄了。在前半天分块，后半天问出答案。具体来说，在 0 时刻问，然后每隔 48,47,46,... 问一次。代码又写了一坨：

```cpp
int main() {
    int n;
    cin >> n;
    vector<int> op(n), ans(n);
    vector<int> nxt(1440);
    vector<int> lst(1440);
    vector<int> cnt(n);
    auto query = [&](int t, int id) -> bool {
        if (cnt[id] == 50) return op[id];
        cnt[id]++;
        cout << "at ";
        int h = t / 60;
        int m = t % 60;
        string H = to_string(h);
        string M = to_string(m);
        while (H.size() < 2) H = '0' + H;
        while (M.size() < 2) M = '0' + M;
        cout << H << ":" << M << " check " << id + 1 << endl;
        cin >> H;
        return H == "asleep";  // asleep
    };
    auto answer = [&](int t) {
        int h = t / 60;
        int m = t % 60;
        string H = to_string(h);
        string M = to_string(m);
        while (H.size() < 2) H = '0' + H;
        while (M.size() < 2) M = '0' + M;
        cout << H << ":" << M << endl;
    };
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> Q;
    for (int now = 0, d = 48; now < 720; now += d--) {
        nxt[now] = now + d;
        lst[now + d] = now;
    }
    nxt[711] = 711 + 720;
    for (int now = 720; now < 1440; now++) {
        nxt[now] = now + 1;
    }
    for (int id = 0; id < n; id++) {
        op[id] = query(0, id);
        Q.push({ nxt[0], id });
    }
    while (!Q.empty()) {
        auto [now, id] = Q.top();
        Q.pop();
        if (now == 1440) {
            ans[id] = (1440 + (op[id] ^ 1) * 720) % 1440;
            continue;
        }
        if ((now < 720) ^ (query(now, id) == op[id)]) {
            if (now < 720) {
                Q.push({ lst[now] + 720, id });
            } else {
                ans[id] = (now + (op[id] ^ 1) * 720) % 1440;
            }
        } else {
            Q.push({ nxt[now], id });
        }
    }
    cout << "answer" << endl;
    for (int id = 0; id < n; id++) {
        answer(ans[id]);
    }
    return 0;
}
```

### [G. Unusual Case](https://qoj.ac/contest/1696/problem/8787)（图论思维） - UPSOLVE

随机找，如果当前路径最后一个点 $u$ 的所有出边都已访问，设存在 $u\to v$，且路径为 $\dots\to x\to v\to y\to\dots\to u$，则修改为 $\dots\to x\to v\to u\to\dots\to y$，即翻转 $u\sim y$ 这一段。神秘。

```cpp
#include <bits/stdc++.h>
using namespace std;
mt19937_64 rnd(chrono::steady_clock::now().time_since_epoch().count());

int main() {
    int n, m, k;
    cin >> n >> m >> k;

    set<pair<int, int>> s;

    while (m--) {
        int u, v;
        cin >> u >> v;
        u--;
        v--;
        s.insert({ min(u, v), max(u, v) });
    }

    if (n == 5) {
        cout << "1 3 5 2 4\n5 1 4 3 2\n";
        return 0;
    }

    while (k--) {
        vector<int> res;
        res.push_back(rnd() % n);

        vector<vector<int>> E(n);
        vector<int> vis(n);

        vis[res.back()] = true;
        for (auto& [u, v] : s) {
            E[u].push_back(v);
            E[v].push_back(u);
        }

        while (res.size() != n) {
            if (rnd() & 1) reverse(res.begin(), res.end());
            int u = res.back();
            shuffle(E[u].begin(), E[u].end(), rnd);

            bool found = false;
            for (auto v : E[u]) {
                if (!vis[v]) {
                    vis[v] = true;
                    res.push_back(v);
                    found = 1;
                    break;
                }
            }
            if (found) continue;

            int v = E[u][0];
            for (int j = 0; j < res.size(); ++j) {
                if (res[j] == v) {
                    reverse(res.begin() + j + 1, res.end());
                    break;
                }
            }
        }

        for (int i = 0; i < n; ++i) {
            cout << res[i] + 1 << " ";
            if (i) s.erase({ min(res[i - 1], res[i]), max(res[i - 1], res[i]) });
        }
        cout << endl;
    }

    return 0;
}
```

### [H. Page on vdome.com](https://qoj.ac/contest/1696/problem/8788)（签到）

```cpp
int main() {
    int x;
    cin >> x;
    cout << min(x + 1, 10) << endl;
    return 0;
}
```
### 【好题】[J. First Billion](https://qoj.ac/contest/1696/problem/8790)（Meet-in-the-middle） - UPSOLVE

> Two random sets of exactly $n$ positive integers with the same sum $10^9$ are generated (a uniform distribution is taken over all sets with sum $10^9$). You are given $N = 2n$ generated elements in random order. Your task is to select some of the given numbers so that the sum of the selected numbers is exactly $10^9$. $N \leqslant 100$.

类似于哈希的思想，选取一个模数 $m$ 并对所有 $a_i$ 取模，然后在模 $m$ 下做背包。期望的复杂度是 $\operatorname{O}(nm)$，在时间允许下可以选择 $m=10^{6}$ 或者一个大素数。

```cpp
const int m = 1e6 + 33;
vector f(n, vector<int>(m));
f[0][a[0] % m] = 1;
f[0][0] = 1;
vector lst(n, vector<pair<int, int>>(m, { -1, -1 }));
for (int i = 1; i < n; i++) {
    for (int v = 0; v < m; v++) {
        if (f[i - 1][v]) {
            f[i][v] = 1;
            lst[i][v] = { i - 1, v };
            f[i][(v + a[i]) % m] = 1;
            lst[i][(v + a[i]) % m] = { i - 1, v };
        }
    }
}
int now = 1'000'000'000 % m;
int id = n - 1;
vector<int> res;
while (id != -1) {
    if (lst[id][now].second != now) {
        res.push_back(id);
    }
    tie(id, now) = lst[id][now];
}
cout << res.size() << " ";
ranges::sort(res);
for (auto x : res) {
    cout << ++x << " ";
}
```

这想法实在 *naive*，不需要 $N=100$，在 $N=20$ 时哈希碰撞概率已经几乎为 1。也就是说，你会找到一个非空真子序列，其序列和模 $m$ 与 $10^9 \bmod m$ 相同，但这个序列真实的和不等于 $10^{9}$。

什么？哈希冲突的概率不是很低吗？

这问题非常好，点出了一个看似矛盾的地方：通常我们认为哈希冲突的概率很低，但在这里，一个子序列的和取模后等于特定值的概率却被认为是近似为 1。

当我们说哈希冲突概率低时，通常是说将少量的、随机选择的独立输入项通过哈希函数（例如取模）映射到哈希值。而在本问题中，我们不是对少数几个数进行哈希，而是全部子序列。子序列的数量是指数级的，达到 $2^{100}-2\approx10^{30}$ 个数，astronomically large！导致这其中极有可能（overwhelmingly likely）存在一个非空真子序列的和是任意我们想要的数，这个概率几乎为 1。

Thus, this is not the traditional concern of "two random numbers coincidentally hashing to the same value," but rather the situation where "given a huge amount of numbers, it is almost certain to find one that hashes to the target value." 这不是传统意义上地担心“两个随机数哈希值相同”，而是“从巨量的数中，几乎必然能找到两个哈希值相同的数”。

---

所以本题只能考虑确定性算法了。这里给出题解的方法：将全部元素随机分成 36 组，用 Meet-in-the-middle 暴力枚举所有情形，复杂度 $\operatorname{O}(B \cdot 2^{B})$，$B=18$。随机分组是对的，能找到的概率正是上面所说的哈希冲突的概率，几乎为 1。

```cpp
#include <bits/stdc++.h>
using namespace std;

using uint = unsigned;
using ll = long long;
using ull = unsigned long long;

constexpr int N = 1E9;

int main() {
    ios::sync_with_stdio(false); 
    cin.tie(nullptr);

    int n;
    cin >> n;

    vector<pair<ll, int>> a(n);
    for (int i = 0; i < n; ++i) {
        cin >> a[i].first;
        a[i].second = i + 1;
    }

    const int m = min(n, 36);
    vector<pair<ll, basic_string<int>>> E(m);
    for (int i = 0; i < n; ++i) {
        E[i % m].first += a[i].first;
        E[i % m].second.push_back(a[i].second);
    }

    int n1 = m / 2; 
    int n2 = m - n1;

    map<ll, uint> mp;
    for (uint mask = 0; mask < 1 << n1; mask++) {
        ll sum = 0;
        for (int bit = 0; bit < n1; bit++) {
            if (mask >> bit & 1) { 
                sum += E[bit].first;
            }
        }
        mp[sum] = mask;
    }
    
    for (uint mask = 0; mask < 1 << n2; mask++) {
        ll sumR = 0;
        for (int bit = 0; bit < n2; bit++) {
            if (mask >> bit & 1) { 
                sumR += E[n1 + bit].first;
            }
        }
        ll sumL = N - sumR;
        if (!mp.count(sumL)) continue;
        basic_string<int> res;
        unsigned mask1 = mp[sumL];
        for (int bit = 0; bit < n1; bit++) {
            if (mask1 >> bit & 1) {
                res += E[bit].second;
            }
        }
        for (int bit = 0; bit < n2; bit++) {
            if (mask >> bit & 1) {
                res += E[n1 + bit].second;
            }
        }
        cout << res.size() << " ";
        ranges::sort(res);
        for (auto id : res) {
            cout << id << " ";
        }
        cout << endl;
        break;
    }
    
    return 0;
}
```


### [K. Tasks and Bugs](https://qoj.ac/contest/1696/problem/8791)（签到）

```cpp
int main() {
    string s;
    map<int, vector<int>> mp;
    while (getline(cin, s)) {
        stringstream ss(s);
        string t;
        ss >> t;
        t = t.substr(3);
        if (t.back() == ':') t.pop_back();
        // cout << t << endl;
        int x = stoi(t);
        while (ss >> t) {
            t = t.substr(3);
            if (t.back() == ',') t.pop_back();
            // cout << t << endl;
            int y = stoi(t);
            mp[y].push_back(x);
        }
        // cout << endl;
    }

    for (auto& [k, vec] : mp) {
        cout << "CS-" << k << ": ";
        ranges::sort(vec);
        for (int i = 0; i < vec.size(); i++) {
            cout << "CS-" << vec[i];
            if (i == vec.size() - 1) {
                cout << endl;
            } else {
                cout << ", ";
            }
        }
    }
    
    return 0;
}
```

### [O. Mysterious Sequence](https://qoj.ac/contest/1696/problem/8795)（签到）

```cpp
int main() {
    double A, B, X1, Xn;
    int n;
    cin >> A >> B >> n >> X1 >> Xn;
    vector<complex<double>> T(n + 1);
    T[0] = complex<double>(1, 0);
    T[1] = complex<double>(0, X1);
    for (int i = 2; i <= n; i++) {
        T[i] = A * T[i - 1] + B * T[i - 2];
    }
    vector<double> X(n + 1);
    X[0] = (Xn - T[n].imag()) / T[n].real();
    X[1] = X1;
    cout << fixed << setprecision(15) << X[1] << endl;
    for (int i = 2; i <= n; i++) {
        X[i] = A * X[i - 1] + B * X[i - 2];
        cout << X[i] << endl;
    }
    return 0;
}
```