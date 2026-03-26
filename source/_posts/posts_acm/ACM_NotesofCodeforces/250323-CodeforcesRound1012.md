---
title: Codeforces Round 1012 (Div. 1) A B1 C1
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
abbrlink: 462d840a
date: 2025-03-23 15:29:00
updated: 2025-03-23 17:40:00
---

## [2089A - Simple Permutation](https://codeforces.com/contest/2089/problem/A)

从小往大顺着选，如果不是素数就选个稍微大一点的让结果是素数。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

constexpr int N = 5e5 + 5;

vector<int> prime;
int mint[N];   // 最小素因子

bool is_prime(int x) {
    return mint[x] == x;
}

signed main() {
    ios::sync_with_stdio(false);
	cin.tie(nullptr), cout.tie(nullptr);

    for (int i = 2; i < N; i++) {
        if (!mint[i]) mint[i] = i, prime.push_back(i);
        for (auto& p : prime) {
            if (1ll * i * p >= N) break;
            mint[i * p] = p;
            if (p == mint[i]) break;
        }
    }
    
	int J;
	cin >> J;
    
	while (J--) {
        int n;
        cin >> n;

        set<int> s;
        for (int i = 1; i <= n; i++) {
            s.insert(i);
        }

        vector<int> res;
        ll sum = 0;
        for (int i = 1; i <= n; i++) {
            int x = *s.begin();
            int now = (sum + x - 1) / i + 1;
			while (!is_prime(now)) {
				now++;
			}
			int need = i * (now - 1) + 1 - sum;
			auto it = s.lower_bound(need);
			if (it == s.end()) {
				it--;
			}
			int x = *it;
			sum += x;
			s.erase(x);
			res.push_back(x);
        }

        for (int i = 0; i < n; i++) {
            cout << res[i] << ' ';
        }
        cout << endl;
  
        // sum = 0;
        // for (int i = 0; i < n; i++) {
        //     sum += res[i];
        //     cout << (sum - 1) / (i + 1) + 1 << ' ';
        // }
        // cout << endl;
    }
    
	return 0;
}
```


## [2089B1 - Canteen (Easy Version)](https://codeforces.com/contest/2089/problem/B1)

每操作一次 $(a_{i},b_{i})$，序列 $a,b$ 中 0 的个数就会增多一个。因此真正有用的操作数（不是题目中的轮数）不会超过 $2n$。

提供一种常数巨大的写法，用 bitset 存 $a,b$ 中仍然不是 0 的位置，将这两个 bitset 作与，就能得到本轮所有需要操作的 $(a_{i},b_{i})$ 了。

```cpp
#include <bits/stdc++.h>

using namespace std;
using ll = long long;

constexpr int N = 2e5 + 5;

bitset<N> A, B;

signed main() {
    ios::sync_with_stdio(false);
	cin.tie(nullptr), cout.tie(nullptr);
    
	int J;
	cin >> J;
    
	while (J--) {
        int n, k;
        cin >> n >> k;

        vector<int> a(n);
        for (int i = 0; i < n; i++) {
	        cin >> a[i];
        }

        vector<int> b(n);
        for (int i = 0; i < n; i++) {
	        cin >> b[i];
        }

        for (int i = 0; i < n; i++) {
            A[i] = 1;
            B[i] = 1;
        }

        int cnt = 0;

        for (int d = 0; d < n; d++) {
            auto C = A & B;
            for (int i = C._Find_first(); i != N; i = C._Find_next(i)) {
                int& x = a[(i - d + n) % n];
                int& y = b[i];
                if (x > y) {
                    x -= y;
                    y = 0;
                    B[i] = 0;
                } else {
                    y -= x;
                    x = 0;
                    A[i] = 0;
                    cnt++;
                }
            }
            if (cnt == n) {
                cout << d + 1 << endl;
                break;
            }
            A <<= 1;
            A[0] = A[n];
            A[n] = 0;
        }
    }
    
	return 0;
}
```

## [2089C1 - Key of Like (Easy Version)](https://codeforces.com/contest/2089/problem/C1)

最优方法是对每个锁孔，拿所有钥匙挨个试一遍。

先设 $n\to \infty$，设 $f(\ell,i)$ 表示 $\ell$ 把锁时第 $i$ 个人的答案。

考虑递推，已经算出 $\ell-1$ 把锁时的答案 $f(\ell-1,1),f(\ell-1,2),\dots$。如果增加一把锁，不妨设第一个人先尝试这把锁。

有 $\cfrac{1}{\ell}$ 的概率第一个人一次成功，那么他后面的人就是 $\ell-1$ 的情况，
$$
\begin{cases}
f(\ell,1)=\cfrac{1}{\ell}, \\
f(\ell,2)=\cfrac{1}{\ell}f(\ell-1,1), \\
f(\ell,3)=\cfrac{1}{\ell}f(\ell-1,2), \\
\cdots
\end{cases}
$$

有 $\cfrac{1}{\ell}$ 的概率第一个人失败，第二个人成功，那么他后面的人也是 $\ell-1$ 的情况，
$$
\begin{cases}
f(\ell,1)=0, \\
f(\ell,2)=\cfrac{1}{\ell}, \\
f(\ell,3)=\cfrac{1}{\ell}f(\ell-1,1), \\
f(\ell,4)=\cfrac{1}{\ell}f(\ell-1,2), \\
\cdots
\end{cases}
$$

这样总共有 $\ell$ 种情况，全部累加。

不难写出这样的代码：

```cpp
vector<Z> res(l * l);
for (int x = 1; x <= l; x++) {
	Z inv = Z(1) / x;
	vector<Z> nres(l * l);
	for (int i = 0; i < x; i++) {
		nres[i] += inv;
		for (int j = 0; j + i + 1 < x * x; j++) {
			nres[j + i + 1] += res[j] * inv;
		}
	}
	res = nres;
}
vector<Z> ans(n);
for (int i = 0; i < l * l; i++) {
	ans[i % n] += res[i];
}
for (int i = 0; i < n; i++) {
	cout << ans[i] << " ";
}
cout << endl;
```

复杂度为 $\operatorname{O}(\ell^{3})$，需要优化。

所需答案的下标是模 $n$ 的，因此上述所有下标均可以在模 $n$ 下运算：

```cpp
vector<Z> res(n);
for (int x = 1; x <= l; x++) {
	Z inv = Z(1) / x;
	vector<Z> nres(n);
	for (int i = 0; i < x; i++) {
		nres[i % n] += inv;
		for (int j = 0; j < n; j++) {
			nres[(j + i + 1) % n] += res[j] * inv;
		}
	}
	res = nres;
}
```

复杂度为 $\operatorname{O}(n^{}\ell^{2})$，仍需要优化。

发现第二层循环的 $x$，有大部分的内层循环完全相同，把这层循环也在模 $n$ 下运算：

```cpp
vector<Z> res(n);
for (int x = 1; x <= l; x++) {
	Z inv = Z(1) / x;
	vector<Z> nres(n);
	int q = x / n, r = x % n;
	for (int i = 0; i < n; i++) {
		nres[i % n] += inv * q;
		for (int j = 0; j < n; j++) {
			nres[(j + i + 1) % n] += res[j] * inv * q;
		}
	}
	for (int i = 0; i < r; i++) {
		nres[i % n] += inv;
		for (int j = 0; j < n; j++) {
			nres[(j + i + 1) % n] += res[j] * inv;
		}
	}
	res = nres;
}
```

最终复杂度 $\operatorname{O}(n^{2}\ell)$。