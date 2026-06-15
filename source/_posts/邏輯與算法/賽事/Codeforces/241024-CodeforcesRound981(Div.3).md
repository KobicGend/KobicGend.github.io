---
title: Codeforces Round 981 (Div. 3)
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
abbrlink: b88ed13
date: 2024-10-26 00:34:39
updated: 2024-10-26 00:34:39
---
如果没有特殊情况，以后每场 CF 都会写题解 > <


## A. Sakurako and Kosuke

奇偶题。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        cout << (n & 1 ? "Kosuke" : "Sakurako") << "\n";
    }

    return 0;
}
```


## B. Sakurako and Water

统计 $2n-1$ 条从左上到右下的斜线上所有负数的最小值，再求和即是答案。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        vector<vector<int>> a(n, vector<int>(n));
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                cin >> a[i][j];
            }
        }

        ll sum = 0;
        for (int k = -n + 1; k < n; k++) {
            int mx = 0;
            for (int i = max(-k, 0); i + k < n && i < n; i++) {
                if (a[i][i + k] < 0) {
                    mx = max(mx, -a[i][i + k]);
                }
            }
            sum += mx;
        }
        cout << sum << "\n";
    }

    return 0;
}
```


## C. Sakurako's Field Trip

从最中间开始确定，这样两边的就只和靠中间的那个数有关，贪心地交换即可。最后统计所求的数量。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        vector<int> a(n);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }

        for (int i = 1; n / 2 + i < n; i++) {
            if (a[n / 2 + i] == a[n / 2 + i - 1] || a[n - 1 - n / 2 - i] == a[n - 1 - n / 2 - i + 1]) {
                swap(a[n / 2 + i], a[n - 1 - n / 2 - i]);
            }
        }

        int cnt = 0;
        for (int i = 1; i < n; i++) {
            cnt += a[i] == a[i - 1];
        }
        cout << cnt << "\n";
    }

    return 0;
}
```


## D. Kousuke's Assignment

开个 map 记录前缀和，遇到前缀和相同的就记录答案，并将桶清空（因为要求区间不能相交）。

注意不要用 unordered_map，会 T。

时间复杂度 $\Theta(n\log n)$。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        map<ll, int> mp;
        mp[0] = 1;
        ll sum = 0, ans = 0;
        for (int i = 0; i < n; i++) {
            int x;
            cin >> x;
            sum += x;
            if (mp.count(sum)) {
                ans++;
                mp.clear();
            }
            mp[sum]++;
        }

        cout << ans << "\n";
    }

    return 0;
}
```


## E. Sakurako, Kosuke

小清新置换环题。

每个置换环对答案的贡献是 (环大小 - 1) / 2。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        vector<int> p(n);
        for (int i = 0; i < n; i++) {
            cin >> p[i];
            p[i]--;
        }

        vector<vector<int>> cycs;
        vector<int> vis(n);
        for (int i = 0; i < n; i++) {
            if (vis[i]) continue;
            int u = i;
            vector<int> cyc;
            do {
                cyc.push_back(u);
                vis[u] = true;
                u = p[u];
            } while (u != i);
            cycs.push_back(cyc);
        }

        int res = 0;
        for (auto& cyc : cycs) {
            res += (cyc.size() - 1) / 2;
        }
        cout << res << "\n";
    }

    return 0;
}
```



## F. Kosuke's Sloth

递推数列具有模周期性，而且我们知道，对于斐波那契数列，这个周期不会超过 $6\times$ 模数。暴力计算一个周期内的所有斐波那契数值，统计为 0 的个数，再计算所求。

时间复杂度 $\Theta\left( \sum k\log k \right)$。

不太理解为什么要用巨大的 $n$ 然后取模，本题完全可以将 $n$ 的范围设为 $10^{9}$，不要求取模。。

赛时因为取模不到位 WA 了两次，二分不单调的 cnt 数组 WA 了一次，式子推错了 WA 了一次。。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
constexpr int mod = 1e9 + 7;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        ll n, k;
        cin >> n >> k;

        if (k == 1) {
            cout << (n % mod) << "\n";  // 这里也要取模
        } else {
            vector<int> f(6 * k), cnt(6 * k, mod);
            f[0] = f[1] = 1;
            cnt[0] = cnt[1] = 0;
            for (int i = 2; ; i++) {
                f[i] = (f[i - 1] + f[i - 2]) % k;
                cnt[i] = cnt[i - 1] + (f[i] == 0);
                if (f[i] == 1 && f[i - 1] == 1) {
                    int len = i - 1;
                    cout << (((n - 1) / cnt[len] % mod * len) % mod + lower_bound(cnt.begin(), cnt.end(), (n - 1) % cnt[len] + 1) - cnt.begin() + 1) % mod << "\n";
                    break;
                }
            }
        }
    }

    return 0;
}
```
