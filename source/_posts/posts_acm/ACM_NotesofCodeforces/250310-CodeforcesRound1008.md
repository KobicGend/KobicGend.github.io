---
title: Codeforces Round 1008 (Div. 1) A - C
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
abbrlink: ec4161c0
date: 2025-03-11 08:58:00
updated: 2025-03-11 08:58:00
---
## [2077A/2078C - Breach of Faith](https://codeforces.com/contest/2077/problem/A)

取较大的 $\cfrac{n}{2}+1$ 个放在奇数位，较小的放在偶数位。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    int J;
    cin >> J;

    while (J--) {
        int n;
        cin >> n;

        vector<int> a(n * 2);
        for (int i = 0; i < n * 2; i++) {
            cin >> a[i];
        }
        sort(a.begin(), a.end());

        vector<ll> res(n * 2 + 1);
        ll sum = 0;
        for (int i = 0; i < n - 1; i++) {
            res[i * 2 + 1] = a[i];
            sum -= a[i];
        }
        for (int i = n - 1; i < n * 2; i++) {
            res[i * 2 - n * 2 + 2] = a[i];
            sum += a[i];
        }
        res[n * 2 - 1] = sum;
        for (int i = 0; i < n * 2 + 1; i++) {
            cout << res[i] << " ";
        }
        cout << endl;
    }

    return 0;
}
```


## [2077B/2078E - Finding OR Sum](https://codeforces.com/contest/2077/problem/B)

**Hint 1** 不妨加强问题，用两次询问确定 $x,y$。


**Hint 2** 如果二进制下只有一位数，如何询问？

两次就能确定所有情况，那一定是问一次 0 问一次 1。


**Hint 3** 如果有多位数，每一位数都应该问一次 0 和 1。具体应怎样询问？

问 000000$_{(2)}$ 和 111111$_{(2)}$ 不行，第二个询问丢了信息。为了最大化保留信息，应当问 010101$_{(2)}$ 和 101010$_{(2)}$。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using uint = unsigned;
using ull = unsigned long long;

int main() {
    int J;
    cin >> J;

    while (J--) {
        ull x = 0, y = 0;

        ull a = 0;
        for (int bit = 0; bit < 30; bit += 2) {
            a |= 1ull << bit;
        }
        cout << a << endl;
        cin >> a;

        for (int bit = 1; bit < 30; bit += 2) {
            ull tmp = a >> bit & 3;
            assert(tmp);
            if (tmp == 2) {
                x |= 1ull << bit;
            } else if (tmp == 3) {
                x |= 1ull << bit;
                y |= 1ull << bit;
            }
        }

        ull b = 0;
        for (int bit = 1; bit < 30; bit += 2) {
            b |= 1ull << bit;
        }
        cout << b << endl;
        cin >> b;
        b++;
        for (int bit = 0; bit < 30; bit += 2) {
            ull tmp = b >> bit & 3;
            assert(tmp);
            if (tmp == 2) {
                x |= 1ull << bit;
            } else if (tmp == 3) {
                x |= 1ull << bit;
                y |= 1ull << bit;
            }
        }

        cout << "!" << endl;
        cin >> a;
        cout << (a | x) + (a | y) << endl;
    }

    return 0;
}
```



## [2077C/2078F - Binary Subsequence Value Sum](https://codeforces.com/contest/2077/problem/C)

**Hint 1** 化简问题，最大值的取法是确定的。

$F$ 等价于 1 的个数减去 0 的个数，**把 0 看作 -1**，这样 $F$ 等价于区间和。

需要 $x(\mathrm{sum}-x)$ 最大，取最大值时 $x=\lfloor \cfrac{\mathrm{sum}}{2} \rfloor$，而且这个值一定可以取到。

问题化为对所有子序列求权值和，权值定义为：如果子序列和为 $2k$，那么权值为 $f(2k)=k^{2}$，如果子序列和为 $2k+1$，那么权值为 $f(2k+1)=k(k+1)$。直接计算的复杂度是 $\operatorname{O}(2^{n})$。


**Hint 2** 先求解一个确定的字符串。考虑用递推优化，当前已有若干权值，增加一个数之后，权值会怎么变化？

如果这个数是 1，原先的权值和是 $\sum f(x)$，那么新增加的权值和（也就是包含这个数的子序列的权值和）是 $\sum f(x+1)$。

要先找 $f(x)$ 与 $f(x+1)$ 的关系。当 $x$ 是偶数时，$f(x+1)=f(x)+\cfrac{x}{2}$，当 $x$ 是奇数时，$f(x+1)=f(x)+\cfrac{x+1}{2}$。再求个 $\sum$，设 $\mathrm{cnt}$ 表示奇数序列的数量，$\mathrm{sum}$ 表示所有自变量的和，$\mathrm{res}$ 表示所有因变量的和，即答案，有这样的关系：

$$
\begin{cases}
\Delta\mathrm{res}= \mathrm{res}+ \dfrac{\mathrm{sum}+\mathrm{cnt}}{2} \\
\Delta\mathrm{cnt}= \mathrm{cnt} \\
\Delta\mathrm{sum}= \mathrm{sum}+2\mathrm{cnt} \\
\end{cases}
$$

再加上原先已有的权值，转移如下：

$$
\begin{cases}
\mathrm{res}\leftarrow 2 \mathrm{res}+ \dfrac{\mathrm{sum}+\mathrm{cnt}}{2} \\
\mathrm{cnt}\leftarrow 2 \mathrm{cnt} \\
\mathrm{sum}\leftarrow 2 (\mathrm{sum}+\mathrm{cnt}) \\
\end{cases}
$$

如果这个数是 0，有类似的式子：

$$
\begin{cases}
\mathrm{res}\leftarrow 2 \mathrm{res}- \dfrac{\mathrm{sum}-\mathrm{cnt}}{2} \\
\mathrm{cnt}\leftarrow 2 \mathrm{cnt} \\
\mathrm{sum}\leftarrow 2 (\mathrm{sum}-\mathrm{cnt}) \\
\end{cases}
$$

```cpp
Z cnt = 1;
Z sum = s[0] == '1' ? 1 : -1;
Z res = 0;
for (int i = 1; i < n; i++) {
	if (s[i] == '1') {
		res *= 2;
		res += (sum + cnt) / 2;
		cnt *= 2;
		sum *= 2;
		sum += cnt;
	} else {
		res *= 2;
		res -= (sum - cnt) / 2;
		cnt *= 2;
		sum *= 2;
		sum -= cnt;
	}
}
```


**Hint 3** 为修改，上述过程可逆吗？

Hint 2 中把三个变量作修改，重新赋值，这过程可以看作一个方程组。显然这个方程组可逆。通过新值解出旧值，也就 **撤销** 了增加一个数这个操作。

然后再按 Hint 2 的步骤加一个数，即完成了修改。

具体见代码：

```cpp
while (q--) {
	int i;
	cin >> i;
	i--;
	auto& c = s[i];
	if (c == '1') {
		sum -= cnt;
		sum /= 2;
		cnt /= 2;
		res -= (sum + cnt) / 2;
		res /= 2;
	} else {
		sum += cnt;
		sum /= 2;
		cnt /= 2;
		res += (sum - cnt) / 2;
		res /= 2;
	}
	s[i] = (s[i] == '0' ? '1' : '0');
	if (c == '1') {
		res *= 2;
		res += (sum + cnt) / 2;
		cnt *= 2;
		sum *= 2;
		sum += cnt;
	} else {
		res *= 2;
		res -= (sum - cnt) / 2;
		cnt *= 2;
		sum *= 2;
		sum -= cnt;
	}
	cout << res << endl;
}
```

如果嫌上面代码丑可以做一些代数化简。完整代码：

```cpp
#include <bits/stdc++.h>

using namespace std;
using ll = long long;
using uint = unsigned;
using ull = unsigned long long;
using ulll = unsigned __int128;

constexpr ll mod = 998244353;

template<class T> constexpr T qpow(T a, ull b, T res = 1) { for (; b != 0; b /= 2, a *= a) if (b & 1) res *= a; return res; }
template<uint M> constexpr uint mul(uint a, uint b) { return ull(a) * b % M; }
template<ull M> constexpr ull mul(ull a, ull b) { return (a * b - ull(1.L * a * b / M - 0.5L) * M) % M; }

template<unsigned_integral U, U M>
struct mull {
    constexpr mull() : x(0) {}
    template<unsigned_integral T> constexpr mull(T x) : x(x % mod()) {}
    template<signed_integral T> constexpr mull(T x) { make_signed_t<U> v = x % make_signed_t<U>(mod()); if (v < 0) v += mod(); this->x = v; }
    constexpr static U mod() { return M; }
    constexpr U val() const { return x; }
    constexpr mull operator-() const { mull res; res.x = (x == 0 ? 0 : mod() - x); return res; }
    constexpr mull& operator*=(const mull& b) & { x = mul<mod()>(x, b.val()); return *this; }
    constexpr mull& operator+=(const mull& b) & { x += b.val(); if (x >= mod()) x -= mod(); return *this; }
    constexpr mull& operator-=(const mull& b) & { x -= b.val(); if (x >= mod()) x += mod(); return *this; }
    constexpr mull& operator/=(const mull& b) & { return *this *= qpow(b, mod() - 2); }
    friend constexpr mull operator*(mull a, const mull& b) { return a *= b; }
    friend constexpr mull operator+(mull a, const mull& b) { return a += b; }
    friend constexpr mull operator-(mull a, const mull& b) { return a -= b; }
    friend constexpr mull operator/(mull a, const mull& b) { return a /= b; }
    friend constexpr istream& operator>>(istream& is, mull& a) { ll i; is >> i; a = i; return is; }
    friend constexpr ostream& operator<<(ostream& os, const mull& a) { return os << a.val(); }
    friend constexpr bool operator==(const mull& a, const mull& b) { return a.val() == b.val(); }
    friend constexpr strong_ordering operator<=>(const mull& a, const mull& b) { return a.val() <=> b.val(); }
private:
    U x;
};
using Z = mull<ull, mod>;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

    int J;
    cin >> J;

    while (J--) {
        int n, q;
        cin >> n >> q;
        
        string s;
        cin >> s;

        Z cnt = 1;
        Z sum = s[0] == '1' ? 1 : -1;
        Z res = 0;
        for (int i = 1; i < n; i++) {
            if (s[i] == '1') {
                res *= 2;
                res += (sum + cnt) / 2;
                cnt *= 2;
                sum *= 2;
                sum += cnt;
            } else {
                res *= 2;
                res -= (sum - cnt) / 2;
                cnt *= 2;
                sum *= 2;
                sum -= cnt;
            }
        }

        while (q--) {
            int i;
            cin >> i;
            i--;
            if (s[i] == '1') {
                sum -= cnt;
                res -= sum / 2;
                sum -= cnt;
                s[i] = '0';
            } else {
                sum += cnt;
                res += sum / 2;
                sum += cnt;
                s[i] = '1';
            }
            cout << res << endl;
        }
    }

    return 0;
}
```