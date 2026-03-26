# 实现

前 $$N$$ 行直接算：

```cpp
const int maxN = 3e5 + 7, N = 512;
int a[N][maxN];
for (int j = 1; j < N; ++j) {
	for (int i = 0; i < n - j; ++i) {
		a[j][i] = a[j - 1][i] ^ a[j - 1][i + 1];
	}
}
```

按上面的分析，$$N$$ 只能取 $$2$$ 的幂，且应该在 $$\sqrt{\text{maxN}}$$ 级别最优，因此我们取 $$512$$。

预处理模二杨辉三角：

```cpp
const int M = 587;
int b[M][M];

b[0][0] = 1;
for (int j = 1; j < M; ++j) {
	b[j][0] = b[j][j] = 1;
	for (int i = 1; i < j; ++i)
		b[j][i] = b[j - 1][i] ^ b[j - 1][i - 1];
}
```

因为计算 $$x=Nq+r$$ 需要用到杨辉三角的第 $$q$$ 行，$$q$$ 的最大取值是 $$\lceil\frac{x}{N}\rceil$$，因此至少要预处理这么多行，即 $$M=\lceil\frac{x}{N}\rceil=587$$。

核心部分：

```cpp
inline int solve(int x, int y) {
	int q = x / N, r = x % N;
	int ans = 0;
	for (int i = 0; i <= q; ++i) { // 第q行的杨辉三角
		if (b[q][i] == 1) // 是1 需要计算
			ans ^= a[r][i * N + y]; // 依次计算 y和r是余数或者说偏差 *N是因为每两个数之间插入N-1个0
	}
	return ans;
}
```

时间复杂度 $$\Theta(Nn+M^2+qM)\approx\Theta(n+q)$$，实测 $$\text{1778ms}$$。

# `AC code`

```cpp
#include <cstdio>

#define Code int main() { int T=1;
#define Codes int main() { int T=read();
#define by while (T--) eachT();
#define HTLDL return 0;
#define HappyHDUPKSAI }
inline long long read() { char st; long long x = 0; int fu = 1; st = getchar(); while (st > 57 || st < 48) { if (st == 45) fu = -1; st = getchar(); }while (st <= 57 && st >= 48) { x = (x << 3) + (x << 1) + st - 48; st = getchar(); }return x * fu; }

typedef long long ll;
const int maxN = 3e5 + 7, N = 512, M = 587;
int a[N][maxN], b[M][M];

inline int solve(int y, int x) {
	int q = x / N, r = x % N;
	int ans = 0;
	for (int i = 0; i <= q; ++i) {
		if (b[q][i] == 1)
			ans ^= a[r][i * N + y];
	}
	return ans;
}

void eachT() {
	int n = read();

	for (int i = 0; i < n; ++i) a[0][i] = read();
	for (int j = 1; j < N; ++j) {
		for (int i = 0; i < n - j; ++i)
			a[j][i] = a[j - 1][i] ^ a[j - 1][i + 1];
	} // 前N行直接算

	b[0][0] = 1;
	for (int j = 1; j < M; ++j) {
		b[j][0] = b[j][j] = 1;
		for (int i = 1; i < j; ++i)
			b[j][i] = b[j - 1][i] ^ b[j - 1][i - 1];
	} // 楊輝三角

	int q = read();
	while (q--) printf("%d\n", solve(read(), read()));
}

Code by HTLDL
HappyHDUPKSAI
```

