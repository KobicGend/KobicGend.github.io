---
title: 2024CUC｜Mar.20 2024年中国传媒大学程序设计大赛
tags:
  - 題解
  - 練習賽
  - 筆記
  - ACM
categories:
  - - 筆記
    - 練習賽
description: 2024年中国传媒大学程序设计大赛
highlight_shrink: true
date: 2024-03‎-‎21‎ 0‏‎0:39:12
updated: 2024-09-17 14:19:08
abbrlink: 1cd03f4a
---

[2024年中国传媒大学程序设计大赛](https://ac.nowcoder.com/acm/contest/77562)

| ID  | Difficulty | Topic                                   | Status     |
| --- | ---------- | --------------------------------------- | ---------- |
| A   | ⭐⭐         | Implementation, Math                    | 83 (-1)    |
| B   | ⭐⭐⭐        | Math, Number theory                     | (Upsolved) |
| C   | ⭐          | Brute Force                             | 07 (-1)    |
| D   | ⭐⭐         | Constructive algorithms, Implementation | 16         |
| E   | ⭐⭐         | Constructive algorithms, Implementation | 121 (-1)   |
| F   | ⭐⭐⭐        | Graphs                                  | (Upsolved) |
| G   | ⭐⭐⭐⭐       | Implementation                          | (Upsolved) |
| H   | ⭐          | DFS, BFS                                | 49         |
| I   | ⭐⭐⭐⭐       | Math, Computational Geometry            | (Upsolved) |
| J   | ⭐⭐⭐        | Math, Number theory                     | 176 (-1)   |



## A_小苯的区间和疑惑

- **题意** 求包含 $a_i$ 的连续区间的所有数之和的最大值。

- **思路** *史莱姆法则：如果这个数左边的区间的贡献是负数，就不选择它。* 故从左向右遍历，记录左侧区间的和的最大值；再从右向左遍历，记录右侧的，相加即是结果。

- 
  ```cpp
  int n = read();
  for (int i = 1; i <= n; ++i) a[i] = read();
  for (int i = 1; i <= n; ++i) pre[i] = max(pre[i - 1] + a[i], a[i]);
  for (int i = n; i >= 1; --i) lst[i] = max(lst[i + 1] + a[i], a[i]);
  for (int i = 1; i <= n; ++i) printf("%lld ", pre[i] + lst[i] - a[i]);
  ```
  
  时间复杂度 $\Theta(n)$。
  
- **评注** 不开 `long long` 见祖宗。



## *B_小苯的三元组

- **题意** 求三元组 $(i,j,k)$ 对数，满足 $[a_i,a_j]\leqslant(a_j,a_k)$。

- **思路** 由 $(a_j,a_k)\leqslant a_j\leqslant[a_i,a_j]$，知必须 $(a_j,a_k)=a_j=[a_i,a_j]$，有 $a_i~|~a_j,~a_j~|~a_k$。暴力统计满足这些条件的数，下面的代码中，`mp[]` 是某个数出现的次数，`cnt[]` 是某个数和它的倍数出现的次数，`sum` 是某个数的所有倍数的它本身和它的倍数出现的次数之和。*（看似两层循环会超时，但实际上当 $a_i$ 的取值较大时循环跑不满，速度很快）*

- 
  ```cpp
  int n = read();
  for (int i = 0; i < n; ++i) ++mp[read()];
  for (int i = 1; i < maxN; ++i) {
      for (int j = i; j < maxN; j += i) cnt[j] += mp[i];
  }
  ll ans = 0;
  for (int i = 1; i < maxN; ++i) {
      ll sum = 0;
      for (int j = i; j < maxN; j += i) sum += mp[j];
      ans += mp[i] * cnt[i] * sum;
  }
  printf("%lld\n", ans);
  ```

  

## C_小红的 CUC（签到）

- 
  ```cpp
  int n = read();
  if (n < 3) cout << -1;
  else { string s(n - 3, 'A');  cout << "CUC" << s; }
  ```

- **评注** 仔细读题，必须是大写字母串。



## D_小红的矩阵构造（一）

- **题意** 游戏「Nonogram」的超级简化版，横纵坐标一定是排列。

- **思路** $x=n$ 的那一行都是 $1$，这样 $y=1$ 那一列填过了就不能再填了，所以 $x=n-1$ 的那一行除了 $y=1$ 那一列都是 $1$，进一步 $x=n-2$ 的那一行除了 $y=1$ 和 $y=2$ 那两列都是 $1$，以此类推，也就是说，如果 $x+y>n$，那么这一格就是 $1$。

- 
  ```cpp
  int n = read();
  for (int i = 0; i < n; ++i) a[i] = read();
  for (int i = 0; i < n; ++i) b[i] = read();
  for (int i = 0; i < n; ++i) {
      for (int j = 0; j < n; ++j) {
          if (a[i] + b[j] > n) printf("1");
          else printf("0");
      }
      printf("\n");
  }
  ```

  另版：

  ```cpp
  int n = read();
  for (int i = 0; i < n; ++i) a[i] = read();
  for (int i = 0; i < n; ++i) b[i] = read();
  for (int i = n; i; --i) {
      for (int j = n; j > n - i; --j)
          ans[i][j] = 1;
  }
  for (int i = 0; i < n; ++i) {
      for (int j = 0; j < n; ++j)
          printf("%d", ans[a[i]][b[j]]);
      printf("\n");
  }
  ```



## E_小红的矩阵构造（二）

- **题意** 大矩阵中恰好有 $k$ 个 $2\times2$ 的子矩形。

- **思路** 填满 $m\times n$ 的大矩形可得 $(m-1)\times(n-1)$ 个 $2\times2$ 的子矩形，从第一行开始放，放满了就放下一行。

- 
  ```cpp
  int n = read(), m = read(), k = read();
  if ((m - 1) * (n - 1) >= k) {
      int q = k / (m - 1), r = k - q * (m - 1);
      string s1(m, '1');
      for (int i = 1; i <= q + 1; ++i) cout << s1 << endl;
      if (q + 2 <= n) {
          for (int j = 1; j <= r + 1; ++j) cout << 1;
          for (int j = r + 2; j <= m; ++j) cout << 0;
          cout << endl;
      }
      string s2(m, '0');
      for (int i = q + 3; i <= n; ++i) cout << s2 << endl;
  } else printf("-1");
  ```

- **评注** 赛时脑子抽了，以为这些矩形不能有相邻边（就像样例那样）。



## #*F_小红的子树乘积*

*（树暂时不做）*

UPD on 2024-09-17

- **题意** 一棵有根树，根节点为 $1$ 号节点。求有多少个子树的节点编号乘积的因子数量不少于 $k$。

- **思路** 暴力分解质因数，对每个子树暴力计算。

- 
  ```cpp
  void eachT() {
      int n;
      ll K;
      cin >> n >> K;
  
      vector<vector<int>> E(n);
      for (int i = 1; i < n; ++i) {
          int u, v;
          cin >> u >> v;
          u--, v--;
  
          E[u].push_back(v);
          E[v].push_back(u);
      }
  
      int ans = 0;
  
      auto dfs = [&](auto&&self, int u, int p) -> map<ll, int> {
          map<ll, int> mp; // u点的质因数分解
  
          int w = u + 1;  // u点权值
          for (int i = 2; i * i <= w; ++i) {
              while (w % i == 0) {
                  mp[i]++;
                  w /= i;
              }
          }
          if (w > 1) mp[w]++;
  
          for (auto& v : E[u]) {
              if (v == p) continue;
              auto tmp = self(self, v, u);
              if (tmp.size() > mp.size()) swap(tmp, mp);
              for (auto& [k, v] : tmp) {
                  mp[k] += v;
              }
          }
          
          // mp是u的子树权值乘积的质因数分解
          // 计算约数个数
          ll res = 1;
          for (auto& [k, v] : mp) {
              res *= v + 1;
              if (res >= K) break;  // 剪枝
          }
          if (res >= K) ++ans;
          return mp;
      };
      dfs(dfs, 0, -1);
  
      cout << ans << '\n';
  }
  ```



## *G_小红的独特区间

- **题意** 求满足 **恰好** 包含 $3$ 种不同元素的连续子数组数量。

- **思路** 先转化问题，化为 **至少** 包含 $3$ 种不同元素减去至少包含 $4$ 种不同元素的方法数。

  我们求至少包含 $m$ 种不同元素的方法数。定义恰好包含 $m$ 种不同元素的区间的左端点 `lt` 和区间内的数字个数 `len`，按顺序遍历模拟。每遍历一个数，答案增加 `lt`，这是因为所求的是「至少」，那么 `lt` 左边任意点都可以作为左端点（这也是为什么求「至少」而不是「恰好」的原因）。

- 
  ```cpp
  ll solve(int n, int m) {
      map<int, int> cnt;
      int lt = 0, len = 0;
      ll ans = 0;
      for (int i = 0; i < n; ++i) {
          if (cnt[a[i]] == 0) ++len;
          ++cnt[a[i]];
          while (lt <= i && len >= m) {
              --cnt[a[lt]];
              if (cnt[a[lt]] == 0) --len;
              ++lt;
          }
          ans += lt;
      }
      return ans;
  }
  ```

  答案是 `solve(n, 3) - solve(n, 4)`。时间复杂度 $\Theta(n)$。

- **评注** 先离散化会更快一点，省去了 `while` 那个步骤。



## H_小红的生物实验

- **思路** `BFS` / `DFS` 模板题。

- 
  ```cpp
  int m, n;
  
  void dfs(int x, int y) {
      if (x < 0 || x > n + 1 || y < 0 || y > m + 1 || vis[x][y])
          return;
      if (mp[x][y] == '*') {
          vis[x][y] = 1;
          return;
      }
      vis[x][y] = 1;
      for (int i = 0; i < 4; ++i) {
          dfs(x + dx[i], y + dy[i]);
      }
  }
  
  
  void eachT() {
      n = read(), m = read();
  
      for (int i = 1; i <= n; ++i) {
          mp[i][0] = mp[i][m + 1] = '.';
          for (int j = 1; j <= m; ++j) cin >> mp[i][j];
      }
      for (int j = 0; j <= m + 1; ++j) {
          mp[0][j] = mp[n + 1][j] = '.';
      }
  
      dfs(0, 0);
  
      for (int i = 1; i <= n; ++i) {
          for (int j = 1; j <= m; ++j) {
              if (mp[i][j] == '*' && vis[i][j]) cout << '.';
              else cout << mp[i][j];
          }
          cout << endl;
      }
  }
  ```



## *I_小红种树（一）

- **题意** 树按等差数列增长，求每时刻最高的树和最低的树的差值之和。

- **思路** 分开考虑最大值和最小值，先看最大值。

  我们只需计算每棵树为最大值那段时间的左端点和右端点，再利用等差数列求和公式求和。

  为了求出左端点，只需将这棵树的方程与前一棵树的方程联立，右端点也是同理。

  显然，增长率大的将在某时刻超过增长率小的，更新最大值，因此按照增长率的大小排序。

  有一个问题是，有些树的初始值很小，没有办法作为最大值。我们可以用一个数组存储能作为最大值的树的编号，逐一放入，在放入时，判断是否会完全覆盖前一棵树，或者说，新树是否会在前一棵树成为最大值之前成为最大值，若是，那么前一棵树就无效了，将其踢出数组，继续比较，直到能放入为止。（实际是单调栈）

  现在我们得到所有能成为最大值的树的编号了，再按前面的方法计算就能得到每时刻最大值的和了。

  最小值同理，将最大值的过程翻过来即可。

- **实现**

  定义结构体存储树的起始点和增长率：

  ```cpp
  struct node {
      ll k, b;
      bool operator <(const node& _) const {
          return (k == _.k) ? (b > _.b) : k > _.k;
      }
  };
  node b[maxN];
  ```

  先维护所有能成为最大值的树的编号。考虑到栈不能遍历，我们手写一个栈，大概长这样：

  ```cpp
  int ss = 0; // s.size()
  for (int i = 1; i <= n; ++i) {
      while (ss > 1 && inte(s[ss], i) >= inte(s[ss], s[ss - 1])) --ss;
      s[++ss] = i;
  }
  ```

  其中 `inte(s[ss], i)` 表示栈顶元素和待入栈元素的交点坐标：

  ```cpp
  double inte(int i, int j) { // intersection 交点坐标 
      return 1.0 * (b[i].b - b[j].b) / (b[j].k - b[i].k);
  }
  ```

  除数可能为 0，此时是两条直线的增长率相同，在求最大值时，只需保留起始点较大的那一条，在循环内加上这一句：

  ```cpp
  int ss = 0; // s.size()
  for (int i = 1; i <= n; ++i) {
      if (i > 1 && b[i].k == b[i - 1].k) continue; // 增长率相同相同时保留起始点较大的
      while (ss > 1 && inte(s[ss], i) >= inte(s[ss], s[ss - 1])) --ss;
      s[++ss] = i;
  }
  ```

  维护完毕后一一计算。

  刚才说到，左端点是与前一棵树的交点，即 `l = inte(s[i], s[i + 1]) + 1`（需要加上一避免重复计算），右端点是 `r = inte(s[i], s[i - 1])`。依等差数列的求和公式有：

  ```cpp
  ll calc(int i, ll l, ll r) {
      return b[i].k * (l + r) * (r - l + 1) / 2 + b[i].b * (r - l + 1);
  }
  ```

  注意限定在 `[0,mx]` 范围内，加上 `l = max(0, l), r = min(mx, r)`，取最大最小值之后可能左端点更大了，再加上 `if (l > r) return 0`，而左端点等于右端点是需要计算的。

  对上面的式子求和，在主函数里写：

  ```cpp
  for (int i = 1; i <= ss; ++i) {
      ans += calc(s[i], floor(inte(s[i], s[i + 1])) + 1, floor(inte(s[i], s[i - 1]))) % MOD;
  }
  ```

  默认的 `double` 向 `int` 转换是向零取整，而我们需要向下/上同一个方向取整。

  两边界处会出现一点小问题，单独计算：`i==1` 时，结果是 `calc(s[1], floor(inte(s[1], s[2])) + 1, mx)`，`i==ss` 时，结果是 `calc(s[1], floor(inte(s[ss], 0)) + 1, floor(inte(s[ss], s[ss-1])))`，这里的 0 指 $x$ 轴，可以作为一个占位符号。

  最小值同理。

  为了完全对称，把区间从 `[l+1,r]` 改为 `[l,r-1]`，把 `floor` 改为 `ceil`。

  **完整代码**

  ```cpp
  double inte(int i, int j) { // intersection 交点坐标 
      return 1.0 * (b[i].b - b[j].b) / (b[j].k - b[i].k);
  }
  
  ll calc(ll mx, int i, ll l, ll r) {
      l = max(0, l), r = min(mx, r);
      if (l > r) return 0;
      return (b[i].k % MOD) * ((l + r) % MOD) % MOD * ((r - l + 1) % MOD) % MOD * 500000004 % MOD +
          (b[i].b % MOD) * ((r - l + 1) % MOD) % MOD;
  }
  
  void eachT() {
      int n = read();
      ll mx = read() - 1, ans = 0;
      for (int i = 1; i <= n; ++i) b[i].b = read();
      for (int i = 1; i <= n; ++i) b[i].k = read();
      sort(b + 1, b + n + 1);
  
      // 最大值
      int ss = 0;
      for (int i = 1; i <= n; ++i) {
          if (i > 1 && b[i].k == b[i - 1].k) continue;
          while (ss > 1 && inte(s[ss], i) >= inte(s[ss], s[ss - 1])) --ss;
          s[++ss] = i;
      }
      ans += calc(mx, s[1], floor(inte(s[1], s[2])) + 1, mx) % MOD;
      s[ss + 1] = 0;
      for (int i = 2; i <= ss; ++i) {
          ans = (ans + calc(mx, s[i], floor(inte(s[i], s[i + 1])) + 1, floor(inte(s[i], s[i - 1])))) % MOD;
          ans %= MOD;
      }
  
      // 最小值
      ss = 0;
      for (int i = n; i >= 1; --i) {
          if (i < n && b[i].k == b[i + 1].k) continue;
          while (ss > 1 && inte(s[ss], i) >= inte(s[ss], s[ss - 1])) --ss;
          s[++ss] = i;
      }
      ans = (ans - calc(mx, s[1], ceil(inte(s[1], s[2])), mx)) % MOD;
      s[ss + 1] = 0;
      for (int i = 2; i <= ss; ++i) {
          ans = (ans - calc(mx, s[i], ceil(inte(s[i], s[i + 1])), ceil(inte(s[i], s[i - 1])) - 1)) % MOD;
      }
  
      printf("%lld\n", (ans + MOD) % MOD);
  }
  ```

  时间复杂度 $\Theta(n)$。

- **评注** 题目本身不难但是细节很多。



## J_小红种树（二）

（符号说明：$\gcd\{a_i\}=\gcd(a_1,a_2,\dots,a_n)$ 表示数组的最大公约数，$f(a)$ 表示 $a$ 的约数个数）

- **题意** 给定数组 $\{a_i\}$ 和 $k$，求满足如下条件的数组 $\{b_i\}$ 的数量：$\forall i,\exists m,~a_i+mb_i$ 是一个恒定的值 $S$，且 $S\leqslant k$。

- **思路**

  注意到，若某个 $\{b_i\}$ 符合题意，那么 $\{\frac{b_i}{p}\}$ 也符合题意（其中 $p$ 是 $\{b_i\}$ 的某个公约数，也即 $\{b_i\}$ 的最大公约数的约数）。因此，我们可以先取 $m=1$ 讨论，**统计所有找到的 $\boldsymbol{\{b_i\}}$ 的最大公约数的约数个数 $\boldsymbol{f(\gcd\{b_i\})}$**，再求和即是所求。

  先取 $S=a_{\rm max}$，即 $b_i=a_i-a_{\rm max}$，这是一组满足条件的特解。

  为了叙述方便，我们 **记** $\boldsymbol{S_0=a_{\rm max},~b_{0i}=a_i-a_{\rm max}}$。

  对于某个 $S$ 的取值，考虑有多少组 $\{b_i\}$ 符合题意。设 $S=S_0+j~(0\leqslant j\leqslant k-a_{\rm max})$，则 $m=1$ 时，$b_i=b_{0i}+j$。为了求 $f(\gcd\{b_i\})$，利用 $\gcd\{b_i\}=\gcd\left(\gcd\{b_{0i}\},j\right)$*（暂不会证，也举不出反例）*，知只需求 $f\big(\gcd\left(\gcd\{b_{0i}\},j\right)\big)$。

  ~~感性地想一想~~，能够对这个式子产生贡献的，一定是 $j$ 有 $\gcd\{b_{0i}\}$ 的某个因子，反过来，对于 $\gcd\{b_{0i}\}$ 的所有因子，它的倍数都能对这个式子产生贡献。那么我们就**数数 $\boldsymbol{\gcd\{b_{0i}\}}$ 有多少因子，每个因子有多少个倍数在限定范围内**，这道题就解决了。

- **实现**

  ```cpp
  ll gcd(ll a, ll b) { return b == 0 ? a : gcd(b, a % b); }
  
  void eachT() {
      int n = read(), m = read(), mx = 0;
      for (int i = 0; i < n; ++i) {
          a[i] = read();
          mx = max(mx, a[i]); // a_max
      }
      
      int d = mx - a[0];
      for (int i = 0; i < n; ++i) {
          a[i] = mx - a[i]; // b_0i
          d = gcd(d, a[i]); // gcd(b_0i)
      }
      m -= mx; // 上文中提到j的上限是m-a_max
  
      set<int> res;
      for (ll i = 1; i * i <= d; ++i) { // 枚举约数
          if (d % i == 0) res.insert(i), res.insert(d / i);
      }
      
      ll ans = 0;
      for (auto i : res) ans += m / i + 1; // 每个因子i有m/i个倍数在限定范围内 +1是因为0也满足
      printf("%lld\n", ans);
  }
  ```

  时间复杂度 $\Theta(n\log n)$。

- **引理**
  $$
  \gcd\{c_i+t\}=\gcd(\gcd\{c_i\},t)
  $$
  只需证
  $$
  (a+t,~b+t)=((a,b),~t).
  $$
  设 $d=(a,b),~a=a_1d,~b=b_1d$，则只需证 $(a_1d+t,~b_1d+t)=(d,t)$。

  一方面，由 $(d,t)~|~d,~(d,t)~|~t$，得 $(d,t)~|~a_1d+t,~(d,t)~|~b_1d+t$，进而 $(d,t)~|~(a_1d+t,~b_1d+t)$。

  另一方面，$(a_1d+t,~b_1d+t)=(d(a_1-b_1),~b_1d+t)$
