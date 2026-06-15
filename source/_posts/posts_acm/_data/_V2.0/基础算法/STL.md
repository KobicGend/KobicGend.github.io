---
title: XCPC wiki - STL
tags:
  - 算法
  - 筆記
  - ACM
  - 基礎算法
categories:
  - - 筆記
    - XCPCwiki
abbrlink: 45827ca4
hide: true
date: 2025-01-24 22:05:00
updated: 2025-01-24 22:05:00
description:
---

## multiset 的 maintain 法

枚举左端点，使用大小根堆 maintain 求出所有右端点的答案。时间复杂度 $\Theta(n^{2}\log n)$。

**例 1** 求 $\lbrace a \rbrace$ 的所有子序列的中位数，数据范围：$n \leqslant 2000,\ 0 \leqslant a_{i} \leqslant 10^{9}$。

```cpp
int n = read();
for (int i = 1; i <= n; i++) a[i] = read();
for (int i = 1; i <= n; i++) {
    priority_queue<int, vector<int>> L;
    priority_queue<int, vector<int>, greater<>> R;
    int mid = a[i];
    for (int j = i + 1; j <= n; j++) {
        if (a[j] >= mid) R.push(a[j]);
        else L.push(a[j]);
        if (L.size() == R.size() + 1) {
            R.push(mid);
            mid = L.top();
            L.pop();
        }
        else if (R.size() == L.size() + 2) {
            L.push(mid);
            mid = R.top();
            R.pop();
        }
        cout << "[" << i << ", " << j << "] 的中位数是 " << mid << endl;
    }
}
```


**例 2** 进行至多 $k$ 次操作，每次操作可以把一个元素 +1 或 -1，求操作后最长的顺子。([K. Rainbow Subarray](https://codeforces.com/gym/104901/problem/K), [[../contests/VP/2024-10-07-Autumn6-2023ICPC济南|2024-10-07-Autumn6-2023ICPC济南]])

考虑 $a_{i+1}-a_{i}=1\iff a_{i}-i=a_{j}-j$，问题转化为把一个数组里所有元素都变得相同的最小操作数，也就是数轴上若干个点到哪个点的距离之和最小，答案是中位数。双指针 + 大小根堆动态求中位数。时间复杂度 $\Theta(n\log V)$。

TLE：套了个二分，复杂度 $\Theta(n\log n\log V)$，实际上双指针就行了。

```cpp
int n;
ll k;
cin >> n >> k;
vector<int> a(n);
for (int i = 0; i < n; ++i) {
    cin >> a[i];
    a[i] -= i;
}

multiset<int> L, R;  // < , >=
ll mid = a[0];
ll sumL = 0, sumR = 0;

auto maintain = [&]() {
    if (L.size() == R.size() + 1) {
        auto x = *L.rbegin();
        L.erase(prev(L.end()));
        sumL -= x;
        R.insert(x);
        sumR += x;
    }
    else if (R.size() == L.size() + 2) {
        auto x = *R.begin();
        R.erase(R.begin());
        sumR -= x;
        L.insert(x);
        sumL += x;
    }
    mid = *R.begin();
};

int ans = 0;
for (int l = 0, r = 0; r < n; ++r) {
    if (a[r] >= mid) {
        R.insert(a[r]);
        sumR += a[r];
    }
    else {
        L.insert(a[r]);
        sumL += a[r];
    }
    maintain();

    if ((ll(L.size()) * mid - sumL) + (sumR - ll(R.size()) * mid) <= k) {
        ans = max(ans, r - l + 1);
    }
    else {
        if (a[l] >= mid) {
            R.extract(a[l]);
            sumR -= a[l];
        }
        else {
            L.extract(a[l]);
            sumL -= a[l];
        }
        maintain();
        l++;
    }
}

cout << ans << "\n";
```


**例 3** 找出 $k$ 个二元组并重新排为 $(a_1,b_1),(a_2,b_2),…,(a_k,b_k)$ ，最大化 $k$ 使得：$\sum\limits_{i=1}^ka_i+\sum\limits_{i=1}^{k-1}|b_i-b_{i+1}| \leqslant L$。数据范围：$n \leqslant 2000,\ 0 \leqslant a_{i},b_{i},l \leqslant 10^{9}$。([CF1935C. Messenger in MAC](https://codeforces.com/contest/1935/problem/c))

**思路** 最优策略下，一定按 $b$ 的降序排序，枚举左右端点 $l,r$，原式化为 $\sum\limits_{i=l}^ra_i+(b_r-b_l)\leqslant L$。

```cpp
int n = read(), L = read();
vector<pair<int, int>> a(n);
for (int i = 0; i < n; ++i) {
    a[i].second = read(), a[i].first = read();
}
sort(a.begin(), a.end());

int ans = 0;
for (int l = 0; l < n; ++l) {
    priority_queue<int> Q;
    int sum = 0;
    for (int r = l; r < n; ++r) {
        Q.push(a[r].second);
        sum += a[r].second;
        while (!Q.empty() && sum + a[r].first - a[l].first > L) {
            sum -= Q.top();
            Q.pop();
        }
        ans = max(ans, (int)Q.size());
    }
}
cout << ans << '\n';
```

## set

### [CF1974F. Cutting Game](https://codeforces.com/contest/1974/problem/f)

给定一个 $a \times b$ 的网格，上面有 $n$ 个位置两两不同的棋子。有两个人轮流进行 $m$ 次操作。每个操作分为四种类型：
- `U k` 删除当前棋盘最上面 $k$ 行；
- `D k` 删除当前棋盘最下面 $k$ 行；
- `L k` 删除当前棋盘最左面 $k$ 列；
- `R k` 删除当前棋盘最右面 $k$ 列。

保证每次操作后，棋盘不会被删除完。每次操作之后玩家获得的分数为删除的区域中棋子的个数，问最终两人的得分。

```cpp
class cmp {
public:
    bool operator()(const pair<int, int>& a, const pair<int, int>& b) const {
        return a.second == b.second ? (a.first < b.first) : (a.second < b.second);
    }
};

void eachT() {
    int U = 1, D = read(), L = 1, R = read();
    int n = read(), m = read();

    set<pair<int, int>> S1;
    set<pair<int, int>, cmp> S2;

    for (int i = 1; i <= n; ++i) {
        int x = read(), y = read();
        S1.insert({ x,y });
        S2.insert({ x,y });
    }

    int op = 0;
    ll ans[2] = { 0 };
    for (int i = 1; i <= m; ++i) {
        char c = getchar(); int k = read();
        switch (c) {
            case 'U':
                U += k;
                while (1) {
                    if (S1.empty()) break;
                    auto t = *S1.begin();
                    if (t.first < U) {
                        S1.erase(t);
                        S2.erase(t);
                        ans[op] += 1;
                    }
                    else break;
                }
                break;
            case 'D':
                D -= k;
                while (1) {
                    if (S1.empty()) break;
                    auto t = *S1.rbegin();
                    if (t.first > D) {
                        S1.erase(t);
                        S2.erase(t);
                        ans[op] += 1;
                    }
                    else break;
                }
                break;
            case 'L':
                L += k;
                while (1) {
                    if (S2.empty()) break;
                    auto t = *S2.begin();
                    if (t.second < L) {
                        S1.erase(t);
                        S2.erase(t);
                        ans[op] += 1;
                    }
                    else break;
                }
                break;
            case 'R':
                R -= k;
                while (1) {
                    if (S2.empty()) break;
                    auto t = *S2.rbegin();
                    if (t.second > R) {
                        S1.erase(t);
                        S2.erase(t);
                        ans[op] += 1;
                    }
                    else break;
                }
                break;
            default:
                break;
        }
        op ^= 1;
    }
    printf("%lld %lld\n", ans[0], ans[1]);
}
```

## 栈 stack

### 中缀表达式和后缀表达式

```cpp
#include <iostream>
#include <stack>
#include <cassert>
using namespace std;

int cmp(char a, char b) {
    if (b == '(') {
        return 1;
    }
    else if ((b == '^') && (a == '+' || a == '-' || a == '*' || a == '/' || a == '(')) {
        return 1;
    }
    else if ((b == '*' || b == '/') && (a == '+' || a == '-' || a == '(')) {
        return 1;
    }
    else if ((b == '+' || b == '-') && (a == '(')) {
        return 1;
    }
    else {
        return 0;
    }
}

int pow(int x, int y) {
    int res = 1;
    for (int i = 0; i < y; i++) {
        res *= x;
    }
    return res;
}

int cal(const string& s) {
    stack<int> stk;
    int n = 0;
    for (const auto& c : s) {
        if (isdigit(c)) {
            n = n * 10 + (c - '0');
        }
        else if (c == ' ') {
            stk.push(n);
            n = 0;
        }
        else {
            int x = stk.top(); stk.pop();
            int y = stk.top(); stk.pop();
            switch (c) {
                case '+': n = y + x; break;
                case '-': n = y - x; break;
                case '*': n = y * x; break;
                case '/': n = y / x; break;
                case '^': n = pow(y, x); break;
                default: break;
            }
        }
    }
    return stk.top();
}

string i2p(const string& str) {
    stack<char> stk;
    string s;
    for (const auto& c : str) {
        if (isdigit(c)) {
            s += c;
            continue;
        }
        if (!stk.empty() && s.back() != ' ') {
            s += ' ';
        }
        if (c == ')') {
            while (!stk.empty() && stk.top() != '(') {
                s += stk.top(); stk.pop();
                s += ' ';
            }
            stk.pop();
        }
        else if (!stk.empty() && !cmp(stk.top(), c)) {
            while (!stk.empty() && (!cmp(stk.top(), c))) {
                s += stk.top(); stk.pop();
                s += ' ';
            }
            stk.push(c);
        }
        else {
            stk.push(c);
        }
    }
    return s;
}

int main() {
    string s;
    cin >> s;
    s = '(' + s + ')';
    cout << cal(i2p(s)) << "\n";
    return 0;
}

// 8-(3+2*6)/5+4 = 9
// 16/2^3 = 2
```