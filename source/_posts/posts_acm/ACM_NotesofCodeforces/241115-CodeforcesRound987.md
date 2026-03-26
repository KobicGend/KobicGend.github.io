---
title: Codeforces Round 987 (Div. 2) A-E
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
abbrlink: 6232907f
date: 2024-11-15 22:45:32
updated: 2024-11-15 22:45:32
---
## [CF2031A. Penchick and Modern Monument](https://codeforces.com/contest/2031/problem/A)

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<int> cnt(n);
        for (int i = 0; i < n; i++) {
            int x;
            cin >> x;
            x--;
            cnt[x]++;
        }
        int maxx = 0;
        for (int i = 0; i < n; i++) {
            maxx = max(maxx, cnt[i]);
        }
        cout << (n - maxx) << endl;
    }
    return 0;
}
```

## [CF2031B. Penchick and Satay Sticks](https://codeforces.com/contest/2031/problem/B)

每个数只会交换一次，模拟所有交换然后判断是否合法。

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<int> a(n);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }
        for (int i = 1; i < n; i++) {
            if (a[i] == a[i - 1] - 1) {
                swap(a[i], a[i - 1]);
            }
        }
        cout << (is_sorted(a.begin(), a.end()) ? "YES" : "NO") << endl;
    }
    return 0;
}
```

## [CF2031C. Penchick and BBQ Buns](https://codeforces.com/contest/2031/problem/C)

偶数的答案显然。对于奇数，必然有一个数出现三次，其下标之差是勾股数，最小的勾股数是 $3^{2}+4^{2}=5^{2}$，最靠近的三个下标是 $1,10,26$，因此如果 $n$ 是小于 $27$ 的奇数就无解。

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        if (n % 2 == 0) {
            for (int i = 0; i < n / 2; i++) {
                cout << (i + 1) << " " << (i + 1) << " ";
            }
            cout << endl;
        } else if (n < 27) {
            cout << "-1\n";
        } else {
            cout << "1 2 3 3 1 ";
            for (int i = 0; i < 6; i++) {
                cout << (i + 4) << " " << (i + 4) << " ";
            }
            cout << "2 ";
            for (int i = 0; i < 4; i++) {
                cout << (i + 10) << " " << (i + 10) << " ";
            }
            cout << "2 ";
            for (int i = 0; i < (n - 27) / 2; i++) {
                cout << (i + 14) << " " << (i + 14) << " ";
            }
            cout << endl;
        }
    }
    return 0;
}
```

## [CF2031D. Penchick and Desert Rabbit](https://codeforces.com/contest/2031/problem/D)

每次操作可以向右跳到严格小于当前数的点上，或者向左跳跳到严格大于当前数的点上。以每个数为起点，问最右可以跳到哪里。

对于某两个相邻连通块 $L,R$，如果 $L$ 的最大值比 $R$ 的最小值小，那么 $R$ 的任意点就能够走到 $L$ 的任意点。连通 $L,R$，并将 $R$ 的答案更新为 $L$ 的最大值。

用并查集维护所有的连通块。由于每个连通块都是区间，也可以用栈维护。时间复杂度 $\Theta(n)$。

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<array<int, 3>> stk;
        for (int i = 0; i < n; i++) {
            int x;
            cin >> x;
            auto [minn, maxx, len] = array{ x, x, 1 };
            while (!stk.empty() && stk.back()[1] > minn) {
                minn = min(minn, stk.back()[0]);
                maxx = max(maxx, stk.back()[1]);
                len += stk.back()[2];
                stk.pop_back();
            }
            stk.push_back({ minn, maxx, len });
        }
        for (auto [minn, maxx, len] : stk) {
            for (int i = 0; i < len; i++) {
                cout << maxx << " ";
            }
        }
        cout << "\n";
    }
    return 0;
}
```

```cpp
signed main() {
	int t;
	cin >> t;
	while (t--) {
		int n;
		cin >> n;
		vector<int> maxl(n);
		vector<int> a(n);
		for (int i = 0; i < n; i++) {
			cin >> a[i];
			maxl[i] = a[i];
            if (i) {
                maxl[i] = max(maxl[i], maxl[i - 1]);
            }
		}
		vector<int> minr(n);
		for (int i = n - 1; i >= 0; i--) {
            minr[i] = a[i];
            if (i != n - 1) {
                minr[i] = min(minr[i], minr[i + 1]);
            }
		}
		vector<int> ans(n);
		ans[n - 1] = maxl[n - 1];
		for (int i = n - 2; i >= 0; i--) {
			if (minr[i + 1] >= maxl[i]) {
				ans[i] = maxl[i];
			} else {
				ans[i] = ans[i + 1];
			}
		}
		for (int i = 0; i < n; i++) {
			cout << ans[i] << " ";
		}
		cout << endl;
	}
	return 0;
}
```

## [CF2031E. Penchick and Chloe's Trees](https://codeforces.com/contest/2031/problem/E)

设 $u$ 子树对应的二叉树最低高度为 $h_{u}$。

- 一方面，$h_{u} \geqslant h_{v}+1$；

- 另一方面，$2^{h_{u}}$ 应当大于等于 $\sum 2^{h_{v}}$，且 $h_{u}$ 尽量小。

因此转移方程为

$$
h_{u}=\max\left\lbrace h_{v}+1,\left\lceil \log_{2} \sum 2^{h_{v}} \right\rceil\right\rbrace
$$

维护所有 $2$ 的幂次，模拟加法。时间复杂度 $\Theta(n\log n)$。

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<int> p(n);
        for (int i = 1; i < n; i++) {
            cin >> p[i];
            p[i]--;
        }
        vector<priority_queue<int, vector<int>, greater<>>> Q(n);
        vector<int> h(n);
        for (int i = n - 1; i >= 0; i--) {
            while (Q[i].size() > 1) {
                int x = Q[i].top(); Q[i].pop();
                int y = Q[i].top(); Q[i].pop();
                Q[i].push(max(x, y) + 1);
            }
            h[i] = max(h[i], Q[i].empty() ? 0 : Q[i].top());
            if (i) {
                Q[p[i]].push(h[i]);
                h[p[i]] = max(h[p[i]], h[i] + 1);
            }
        }
        cout << h[0] << endl;
    }
    return 0;
}
```