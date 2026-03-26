---
title: 'Codeforces Round 1036 A-F1 [250706]'
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
abbrlink: 75c95844
date: 2025-07-07 01:16:00
updated: 2025-07-07 01:16:00
---
# [2124A - Deranged Deletions](https://codeforces.com/contest/2124/problem/A)

$m=2$ 的降序序列总是 derangement 的。

如果一个序列存在 $i<j$ 且 $a_{i}>a_{j}$，即存在 $m=2$ 的降序子序列，则保留这两个元素，derangement。

否则，这个序列单调不降，其任意一个子序列也单调不降，不存在 derangement 的子序列。

复杂度 $\mathcal{O}(n^{2})$，也可以做到 $\mathcal{O}(n)$。

```cpp
auto solve = [&] {
	int n;
	cin >> n;

	vector<int> a(n);
	for (int i = 0; i < n; i++) {
		cin >> a[i];
	}

	for (int i = 0; i < n; i++) {
		for (int j = i + 1; j < n; j++) {
			if (a[i] > a[j]) {
				cout << "YES" << endl;
				cout << 2 << endl;
				cout << a[i] << ' ' << a[j] << endl;
				return;
			}
		}
	}
	cout << "NO" << endl;
};
```

# [2124B - Minimise Sum](https://codeforces.com/contest/2124/problem/B)

为影响最小，选择 $i+1=j$（这样只有最多一项的值变大），枚举 $i$ 即可。

复杂度 $\mathcal{O}(n)$。

```cpp
auto solve = [&] {
	int n;
	cin >> n;

	vector<int> a(n);
	for (int i = 0; i < n; i++) {
		cin >> a[i];
	}

	ll res = inf;
	ll sum = 0;
	int minn = inf; 
	for (int i = 0; i < n; i++) {
		if (i < n - 1) {
			res = min(res, sum + min(minn, a[i] + a[i + 1]));
		}
		if (a[i] < minn) {
			minn = a[i];
		}
		sum += minn;
	}
	res = min(res, sum);
	cout << res << endl;            
};
```

# [2124C - Subset Multiplication](https://codeforces.com/contest/2124/problem/C)

如果某个 $b_{i-1}\nmid b_{i}$，必须置 $x := \dfrac{b_{i-1}}{\gcd(b_{i-1}, b_{i})}$，并给 $b_{i-1}$ 除掉 $x$。

如果有多个 $b_{i-1}\nmid b_{i}$，就置 $x$ 为所有 $\dfrac{b_{i-1}}{\gcd(b_{i-1}, b_{i})}$ 的最小公倍数 lcm，这样每个都能满足要求了。

每个数只由它后面的数决定，因此倒着循环。

复杂度 $\mathcal{O}(n\log n)$。

```cpp
auto solve = [&] {
	int n;
	cin >> n;

	vector<int> b(n);
	for (int i = 0; i < n; i++) {
		cin >> b[i];
	}         

	int x = 1;
	for (int i = n - 1; i > 0; i--) {
		if (b[i] % b[i - 1] != 0) {
			x = lcm(x, b[i - 1] / gcd(b[i - 1], b[i]));
			b[i - 1] /= x;
		}
	}
	cout << x << endl;
};
```

# [2124D - Make a Palindrome](https://codeforces.com/contest/2124/problem/D)

需要几个观察：

1. 数组最后剩下的元素个数 $\geqslant k-1$。

2. 比整个数组的第 $k$ 小数 $w$ 还要小的数，一定删不掉。

3. 比 $w$ 大的数，一定能删掉。

4. 在 1 的条件下，等于 $w$ 的数，想删就能删。这是因为执行 3 之后，等于 $w$ 的数始终是整个数组的第 $k$ 小，可以删去任意一个。

现在我们贪心地，

- 把比 $w$ 大的数全删了。

- 判断比 $w$ 小的数能否构成回文串，如果不能，NO。

- 如果数量不足 $k-1$，就还需要等于 $w$ 的数来补全，这些等于 $w$ 的数是插空站在小于 $w$ 的数中间的，每个空里等于 $w$ 的数量也要构成回文串，左右对称。

```cpp
auto solve = [&] {
	int n, k;
	cin >> n >> k;

	vector<int> a(n);
	for (int i = 0; i < n; i++) {
		cin >> a[i];
	}         

	auto b = a;
	sort(b.begin(), b.end());
	int w = b[k - 1];  
	
	vector<int> c;
	int cnt = 0;
	vector<int> d;
	for (int i = 0; i < n; i++) {
		if (a[i] < w) {
			c.push_back(a[i]);
			d.push_back(cnt);  // 每个空里等于 w 的数量
			cnt = 0;
		} else if (a[i] == w) {
			cnt++;
		}
	}
	d.push_back(cnt);  // 每个空里等于 w 的数量
	
	for (int i = 0; i < d.size(); i++) {
		d[i] = min(d[i], d[d.size() - i - 1]);  // 每个空里等于 w 的数量也要构成回文串，左右对称
	}
	
	if (c != vector(c.rbegin(), c.rend())) {  // 比 w 小的数不回文
		cout << "NO" << endl;
		return;
	}
	
	if (accumulate(d.begin(), d.end(), 0) + c.size() < k - 1) {  // 数量还不够
		cout << "NO" << endl;
		return;
	}
	cout << "YES" << endl;
};
```

# [2124E - Make it Zero](https://codeforces.com/contest/2124/problem/E)

*不知道 17 次哪来的，两次足够。*

首先判掉一次的情形。

否则设最中间的那个元素为 $a_{i}$，$\displaystyle D=\sum_{j=1}^{i-1}a_{j}$，$\displaystyle E=\sum_{j=i+1}^{n}a_{j}$，满足 $D+a_{i} \geqslant E,\quad D \leqslant a_{i}+E \quad (1)$。

先试试两次行不行，如果可以，就是拆成
$$
\begin{cases}
D_{1}+a_{i 1}=E_{1} \\
D_{2}=a_{i 2}+E_{2}
\end{cases}
$$

解这个方程能得到 $a_{i 1}=\dfrac{E+a_{i}-D}{2}, \quad a_{i 2}=\dfrac{D+a_{i}-E}{2}$，这俩东西按 (1) 得知都是非负的，可行。

只需验证是否满足 $a_{i 1} \leqslant E_{1} \leqslant E, \quad a_{i 2} \leqslant D_{2} \leqslant D$ 即可，如不满足一定无解（直观感受是最中间的那个大数特别大，1 100000 2 3 这样的）。

其余情况一定有解，随便构造就行，比如可以取
$$
\begin{cases}
0+a_{i 1}=a_{i 1} \\
D=a_{i 2}+(E-a_{i 1})
\end{cases}
$$
这样两组。

*代码写得有点丑*

```cpp
auto solve = [&] {
	int n;
	cin >> n;

	vector<ll> a(n);
	for (int i = 0; i < n; i++) {
		cin >> a[i];
	}         

	ll sum = accumulate(a.begin(), a.end(), 0ll);
	if (sum % 2 != 0) {
		cout << -1 << endl;
		return;
	}
	ll sum1 = 0;
	int i = 0;
	while (i < n && sum1 < sum / 2) {
		sum1 += a[i];
		i++;
	}
	if (sum1 == sum / 2) {
		cout << 1 << endl;
		for (int i = 0; i < n; i++) {
			cout << a[i] << " ";
		}
		cout << endl;
	} else {
		i--;
		
		ll D = sum1 - a[i];
		ll E = sum - sum1;
		ll ai1 = (E + a[i] - D) / 2;
		ll ai2 = (D + a[i] - E) / 2;
		
		if (E < ai1 || D < ai2) {
			cout << -1 << endl;
			return;
		}
		
		cout << 2 << endl;

		ll need = D;
		for (int j = 0; j < i; j++) {
			ll x = min(need, a[j]);
			cout << x << " ";
			need -= x;
			a[j] -= x;
		}
		cout << ai2 << " ";
		
		need = E - ai1;
		for (int j = i + 1; j < n; j++) {
			ll x = min(need, a[j]);
			cout << x << " ";
			need -= x;
			a[j] -= x;
		}
		cout << endl;

		for (int j = 0; j < i; j++) {
			cout << 0 << " ";
		}
		cout << ai1 << " ";
		
		need = ai1;
		for (int j = i + 1; j < n; j++) {
			ll x = min(need, a[j]);
			cout << x << " ";
			need -= x;
		}
		cout << endl;
	}
};
```

# [2124F1 - Appending Permutations (Easy Version)](https://codeforces.com/contest/2124/problem/F1)

很容易想到按每一段来 DP，设 $f_{i}$ 表示只考虑前 $i$ 个数的方案数，从 $f_{j},\ j<i$ 转移而来，复杂度 $\mathcal{O}(n^{2})$。

至于转移系数，F1 的数据范围允许我们枚举 $s,r$，看有多少合法。

总复杂度 $\mathcal{O}(n^{4})$。

*这一部分的代码：（还有第二部分）*

```cpp
auto solve = [&] {
	int n, m;
	cin >> n >> m;

	vector adj(n + 1, vector<int>(n + 1));
	while (m--) {
		int i, x;
		cin >> i >> x;
		adj[i][x] = 1;
	}

	vector<Z> f(n + 1);
	f[0] = 1;
	for (int i = 1; i <= n; i++) {
		for (int j = 0; j < i; j++) {
			Z sum = 0;
			int s = i - j;
			for (int r = 1; r <= s; r++) {
				int pos = j;
				int num = r - 1;
				bool ok = true;
				for (int _ = 1; _ <= s; _++) {
					pos++;
					num %= s;
					num++;
					if (adj[pos][num]) {
						ok = false;
					}
				}
				if (ok) {
					f[i] += f[j];
				}
			}
		}
	}
	cout << f[n] << endl;
};
```

测样例发现算多了。

比如 1 2 3 4 1 2，从 $j=2$ 可以转移到 $i=6$，从 $j=4$ 也可以转移到 $i=6$，就算重复了。

计算重复只有可能是，两个段的 $r=1$，且前一个段的 $s$ 大于这一个段的 $s$。

修改 DP 数组为 $f_{i,s}$ 表示只考虑前 $i$ 个数，且最后一个段长为 $s$ 的全部方案数。再引入辅助数组 $g_{i,s}$ 表示只考虑前 $i$ 个数，最后一个段长为 $s$，且最后一个段的 $r=1$ 的方案数。

转移的时候如果 $r=1$，把相应的 $g$ 减掉即可。

总复杂度 $\mathcal{O}(n^{4})$。

```cpp
auto solve = [&] {
	int n, m;
	cin >> n >> m;

	vector adj(n + 1, vector<int>(n + 1));
	while (m--) {
		int i, x;
		cin >> i >> x;
		adj[i][x] = 1;
	}

	vector f(n + 1, vector<Z>(n + 1));
	vector g(n + 1, vector<Z>(n + 1));
	f[0][0] = 1;
	for (int i = 1; i <= n; i++) {
		for (int j = 0; j < i; j++) {
			Z sum = 0;
			int s = i - j;
			for (int r = 1; r <= s; r++) {
				int pos = j;
				int num = r - 1;
				bool ok = true;
				for (int _ = 1; _ <= s; _++) {
					pos++;
					num %= s;
					num++;
					if (adj[pos][num]) {
						ok = false;
					}
				}
				if (ok) {
					for (int k = 0; k <= n; k++) {
						f[i][s] += f[j][k];
						if (r == 1) {
							g[i][s] += f[j][k];
						}
					}
					if (r == 1) {
						for (int k = s + 1; k <= n; k++) {
							f[i][s] -= g[j][k];
						}
					}
				}
			}
		}
	}
	Z res = 0;
	for (int i = 1; i <= n; i++) {
		res += f[n][i];
	}
	cout << res << endl;
};
```