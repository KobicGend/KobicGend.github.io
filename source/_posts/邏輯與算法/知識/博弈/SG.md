---
title: SG
tags:
  - ACM
  - 算法
  - 筆記
categories:
  - 邏輯與算法
  - 知識
  - 博弈
abbrlink: 38f7c85b
---


## hdu summer 05 - 1006 支配游戏

两个玩家在一张无向图上进行博弈，任意两个节点之间最多一条边相连。这张图由若干个**互不相交的连通块**组成，每个连通块要么是一条**简单路径**（记为1），要么是一个**简单环**。
在游戏中，两个玩家轮流行动。在每一轮中，当前玩家必须选择一个顶点 u，该顶点需能**支配**至少一个**未被支配**的顶点，**注意，该顶点并不要求是未被支配的**。一个顶点 u 能够支配它自己以及所有与它相邻的顶点。
当某个顶点被选中后，它以及所有被其支配的顶点都会被标记为**已支配**。
若某位玩家在其回合无法进行操作（即没有可以支配未被支配顶点的顶点可选），则该玩家输掉游戏。
判断在双方都采取最优策略的前提下，**先手玩家是否必胜**。

设 $sg[n][i]$ 为长度为 $n$ 且所有节点都没有被选择的链的两端有 $i$ 个已经被支配。
打表枚举选择每个点支配取 $sg$ 。
长度为 $n$ 的环 $sg$ 值为 `bool(!sg[n - 1][2])`。
``` cpp
// 打表
int sg[100][3]; //
sg[0][0] = 0;
sg[0][1] = 0;
sg[0][2] = 0;
sg[1][0] = 1; //
sg[1][1] = 0;
sg[1][2] = 0;
sg[2][0] = 1;
sg[2][1] = 1;
sg[2][2] = 0;
for (int i = 3; i < 100; i++) {
    for (int j = 0; j < 3; j++) {
        if (j == 0) { // kong
            set<int> st;
            for (int k = 0;  k < i; k++) {
                int kk = i - k - 1;
                st.insert(sg[k][1] ^ sg[kk][1]);
            }
            int cnt = 0;
            for (auto x : st) {
                if (x == cnt) {
                    cnt++;
                } else {
                    sg[i][0] = cnt;
                    break;
                }
            }
            sg[i][0] = cnt;
        } else if (j == 1) { // dan
            set<int> st;
            for (int k = 0; k < i; k++) {
                int kk = i - k - 1;
                st.insert(sg[k][2] ^ sg[kk][1]);
            }
            int cnt = 0;
            for (auto x : st) {
                if (x == cnt) {
                    cnt++;
                } else {
                    sg[i][1] = cnt;
                    break;
                }
            }
            sg[i][1] = cnt;

        } else { // shuang
            set<int> st;
            for (int k = 0; k < i; k++) {
                int kk = i - k - 1;
                st.insert(sg[k][2] ^ sg[kk][2]);
            }
            int cnt = 0;
            for (auto x : st) {
                if (x == cnt) {
                    cnt++;
                } else {
                    sg[i][2] = cnt;
                    break;
                }
            }
            sg[i][2] = cnt;
        }
    }
}
for (int i = 0; i < 100; i++) {
    cout << "sg[" << i << "][0] = " << sg[i][0] 
         << ", sg[" << i << "][1] = " << sg[i][1] 
         << ", sg[" << i << "][2] = " << sg[i][2] << endl;
}
```

```cpp
// 解
int n;
cin >> n;
int sg = 0;
for (int i = 0; i < n; i++) {
    int x, num;
    cin >> x >> num;
    if (num == 0) { // 环
        int y = (x + 1) % 4;
        if (y) sg ^= 0;
        else sg ^= 1;
    } else { // 链
        if (x == 1 || x == 2 ) {
            sg ^= 1;
        } else if (x == 3) {
            sg ^= 2;
        } else {
            if (x % 4 == 0) {
                sg ^= 0;
            } else if (x % 4 == 1) {
                sg ^= 1;
            } else if (x % 4 == 2) {
                sg ^= 1;
            } else if (x % 4 == 3) {
                sg ^= 3;
            }
        }
    }
}
if (sg) {
    cout << "Yes" << endl;
} else {
    cout << "No" << endl;
}
```

## [2025 CCPC Online 网络预选赛 F. 连线博弈](https://qoj.ac/contest/2534/problem/14552)（SG，Hash）

博弈部分是 SG 打表。

为找到初始棋盘的子游戏大小，可以用一些数据结构精确维护。此外有随机化方法 XOR-Hash：对圆环用随机数 Hash 染色，颜色（即异或值）相同的在一个子游戏中。（这个 trick 在 CF Div3 中经常出现，如 [CF1996G. Penacony](https://codeforces.com/contest/1996/problem/G)：给定 $n$ 个点、$n$ 条双向边的环。有 $m$ 对点对 $a_i,b_i$，要求删掉尽可能多的边，使得删完后，每对 $a_i,b_i$ 仍联通。求出剩余边数的最小值。）

赛时写了个离散化丑爆了，打 map 就行。复杂度 1log。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using ull = unsigned long long;
#define endl '\n'

int _sg[5000]; // nim和不为0先手必胜

ll sg(ll x) { 
    int t = (x - 100) / 34;
    t = max(t, 0);
    return _sg[x - (t * 34)];
}

mt19937_64 rnd(chrono::steady_clock::now().time_since_epoch().count());

void eachT() {   
    int n, m;
    cin >> n >> m;

    map<int, ull> diff;
    while (m--) {
        int l, r;
        cin >> l >> r;
        auto x = rnd();
        diff[l] ^= x;
        diff[r] ^= x;
    }
    map<ull, int> lens;
    int lst = -1;
    ull pre = 0;
    diff[n] = 0;
    for (auto& [x, val] : diff) {
        lens[pre] += x - lst - 1;
        pre ^= val;
        lst = x;
    }
    int ans = 0;
    for (auto& [_, x] : lens) {
        ans ^= sg(x);
    }
    if (ans) cout << "YES" << endl;
    else cout << "NO" << endl;
}

int main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    for (int i = 1; i <= 200; i++) {
        _sg[i] = -1;
    }
    _sg[0] = 0;
    _sg[1] = 0;
    _sg[2] = 1;
    _sg[3] = 1;
    for (int x = 2; x <= 200; x++) {
        set<int> st;
        for (int i = 0; i <= x - 2; i++) {
            int j = x - i - 2;
            st.insert(_sg[i] ^ _sg[j]);
        }
        int mex = 0;
        for (auto s : st) {
            if (s == mex) mex++;
            else {
                _sg[x] = mex;
                break;
            }
        }
        _sg[x] = mex;
    }

    // for (int x = 0; x <= 200; x++) {
    //     assert(_sg[x] == sg(x));
    // }

    // for (int i = 0; i <= 500; i++) {
    //     // cout << "sg[" << i << "] == " << sg[i] << endl;
    //     cout << sg(i) << " ";
    //     if (i % 34 == 33) {
    //         cout << "\n";
    //     }
    // }
    
    int t;
    cin >> t;

    while (t--) {
        eachT();
    }

    return 0;
}

/*
0 0 1 1 2 0 3 1 1 0 3 3 2 2 4 0 5 2 2 3 3 0 1 1 3 0 2 1 1 0 4 5 2 7 
4 0 1 1 2 0 3 1 1 0 3 3 2 2 4 4 5 5 2 3 3 0 1 1 3 0 2 1 1 0 4 5 3 7
4 8 1 1 2 0 3 1 1 0 3 3 2 2 4 4 5 5 9 3 3 0 1 1 3 0 2 1 1 0 4 5 3 7
4 8 1 1 2 0 3 1 1 0 3 3 2 2 4 4 5 5 9 3 3 0 1 1 3 0 2 1 1 0 4 5 3 7
4 8 1 1 2 0 3 1 1 0 3 3 2 2 4 4 5 5 9 3 3 0 1 1 3 0 2 1 1 0 4 5 3 7
4 8 1 1 2 0 3 1 1 0 3 3 2 2 4 4 5 5 9 3 3 0 1 1 3 0 2 1 1 0 4 5 3 7
4 8 1 1 2 0 3 1 1 0 3 3 2 2 4 4 5 5 9 3 3 0 1 1 3 0 2 1 1 0 4 5 3 7
*/
```

## [2026 ICPC 深圳邀请赛 F. Astra](https://qoj.ac/contest/3588/problem/17758?v=1)

每条边将树化为两棵子树，共计 $\mathcal{O}(N)$ 个子树。每个子树是一个子游戏，有一个 SG 值，大子树的 SG 值可以用小子树的 SG 值得到，枚举 $\mathcal{O}(N)$ 条可能的路径即可。

