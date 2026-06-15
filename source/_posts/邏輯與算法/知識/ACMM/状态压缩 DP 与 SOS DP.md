---
abbrlink: '0'
categories:
  - 邏輯與算法
  - 知識
  - ACMM
---
参考：

- https://codeforces.com/blog/entry/45223

- https://www.cnblogs.com/znpdco/p/18172429

## 〇  引入

**题意** 起初有一个数字 $0$，每一秒钟随机选择一个数字与手上的数字作按位或。选择数字 $i$ 的概率是 $p_i$。问期望多少秒后，手上的数字变成 $2^n-1$。([洛谷 P3175 [HAOI2015] 按位或](https://www.luogu.com.cn/problem/P3175))

> **分析** 二进制 $n$ 位数字每一位都要变成 1，先分开考虑，求每一位变成 1 的期望时间，然后再合并。但每种情形并不独立，相加后需要减去一些，有点容斥原理的感觉。
> 考虑 Min-Max 反演的期望形式。
> 设 $x_{i}$ 表示第 $i$ 个二进制位变为 1 的期望时间，$S$ 是所有 $x_{i}$ 的集合，那么 $\operatorname{E}[\min(S)]$ 表示某个集合 $T$ 中 **有一个** 位置变成 1 的期望时间，$\operatorname{E}[\min(S)]$ 表示 **所有** 位置都变成 1 的期望时间。*（这里的定义不太符合数学规范，但不影响理解）*
> 所求是 $\operatorname{E}[\max(S)]$，转化为 $\operatorname{E}[\min(T)]$ 求解。这样有一个位置变成 1，也即变成 1 这个事件第一次发生，就可以套用几何分布，$\operatorname{E}[\min(T)]=\dfrac{1}{\sum_{A\cap T \neq \varnothing}p_{A}}=\dfrac{1}{1-\sum_{A\subset \overline{T}}p_{A}}$。

下面介绍如何求解形如 $F_{S}=\displaystyle \sum_{A\subset S}f(A)$ 这种 **下标是子集关系的求和问题**。

## 一　二进制表示与集合

一个数的二进制表示可以看作是一个集合，二进制第 $i$ 位对应集合的第 $i$ 个元素，0 表示不在集合中，1 表示在集合中。对应的位运算也可看作是对集合的操作，如

- 空集 $\varnothing$ 对应于 `0`，全集对应于 `-1`，即二进制都是 1；

- 交集 $a \cap b$ ——按位与 `a & b`；

- 并集 $a \cup b$ ——按位或 `a | b`；

- 补集 $\overline{a}$ ——按位取反 `~a` 或 `a ^ ((1 << n) - 1)`；

- 差集 $a \setminus b$ —— `a & (~b)`；

- 对称差 $a \Delta b$ ——按位异或 `a ^ b`；

- $t$ 是 $s$ 的子集 $t\subset s$ —— `(t | s) == s`；

- $t$ 是 $s$ 的超集 $t\supset s$ —— `(t & s) == s`；

- $s$ 的元素个数 $|s|$ —— `__builtin_popcountll(s)` 或 `s.count()`；

- `__builtin_ctzll`：末尾的 0，即对 lowbit 取 `__lg`；

- `__builtin_clzll`：开头的 0，用 31 减是 `__lg`。（复杂度都是 $\operatorname{O}(1)$，如果是 long long，函数名末尾加 ll，31 改成 63）



## 二　子集和超集和

### 子集和（高维前缀和）

$F_{S}=\displaystyle \sum_{A\subset S}f(A)$ 转化为位运算语言即 $F_{s}=\displaystyle \sum_{t|s=s}f_{t}$。

暴力状压 DP 枚举子集，时间复杂度是 $\operatorname{O}(3^{n})$。【$n=17$ 时 $\operatorname{O}(3^{n})=\operatorname{O}(10^{8})$】

```cpp
for (int s = 0; s < 1 << n; s++) {
    for (int t = s; t; t = (t - 1) & s) { // 降序遍历 s 的非空子集 t
        sum[s] += a[t];
    }
    sum[s] += a[0]; // 加上 s 的空子集 
}
```

优化此过程，设 $f_{i,s}$ 表示只有最低 $i$ 位与 $s$ 不同的 mask 之和，复杂度为 $\operatorname{O}(n\cdot2^{n})$。【$n=22$ 时 $\operatorname{O}(n\cdot2^{n})=\operatorname{O}(10^{8})$】

```cpp
for (int i = 0; i < n; i++) {
    for (int j = 0; j < 1 << n; j++) {
        if (j >> i & 1) {
            f[j][i] = f[j][i - 1] + f[j ^ (1 << i)][i - 1];
        } else {
            f[j][i] = f[j][i - 1];
        }
    }
}
```

滚动数组为：

```cpp
for (int i = 0; i < n; i++) {
    for (int j = 0; j < 1 << n; j++) {
        if (j >> i & 1) {
            f[j] += f[j ^ (1 << i)];
        }
    }
}
```

这就是最经典的 SOS DP，下面是一些变式。

### 子集和反演（高维差分）

如果
$$
\boxed{
F_{s} = \sum_{t|s=s}^{} f_{t}
}
\longleftrightarrow
F_{S} = \sum_{T\subseteq S} f_{T}
$$
那么反演式为
$$
\boxed{
f_{t} = \sum_{s | t = t}^{} (-1)^{|t| - |s|}F_{s}
}
\longleftrightarrow
f_{T} = \sum_{S\subseteq T} (-1)^{|T|-|S|} F_{S}
$$

将上面代码加号改成减号，就是做反演。

```cpp
// 求子集和
template <typename T> 
void FMTOR(vector<T>& a, int o) {
    const int n = __lg(a.size());
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < 1 << n; j++) {
            if (j >> i & 1) {
                a[j] += o * a[j ^ (1 << i)];
            }
        }
    }
}

// 另一种实现方法
template <typename T>
void FWTOR(vector<T>& a, int o) {
    const int n = a.size();
    for (int mid = 1; mid < n; mid <<= 1) {
        for (int i = 0; i < n; i += mid << 1) {
            for (int j = 0; j < mid; j++) {
                a[i + j + mid] += o * a[i + j];
            }
        }
    }
}
```

上面两段代码也分别称作莫比乌斯 (Mobius) 变换和沃尔什 (Walsh) 变换。

### 超集和（高维后缀和与差分）

将每个数按位取反，就能得到超集和：

```cpp
// 求超集和
template <typename T> 
void FMTAND(vector<T>& a, int o) {
    const int n = __lg(a.size());
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < 1 << n; j++) {
            if (j >> i & 1) {
                a[j ^ (1 << i)] += o * a[j];
            }
        }
    }
}

// 另一种实现方法
template <typename T>
void FWTAND(vector<T>& a, int o) {
    const int n = a.size();
    for (int mid = 1; mid < n; mid <<= 1) {
        for (int i = 0; i < n; i += mid << 1) {
            for (int j = 0; j < mid; j++) {
                a[i + j] += o * a[i + j + mid];
            }
        }
    }
}
```

## 三　位卷积

### 或卷积

在[[../数学/组合计数|上篇文章]]中，你已经知道 $\displaystyle a_{k}=\sum_{i+j=k}^{}f_{i}g_{j}$ 这种式子可以用卷积结合 FFT 或 NTT 快速求解。如果指标关系不是 $i+j=k$，而是 $i\mid j=k$，就需要用到子集和变换及其反演。

将两个序列 $f,g$ 的子集和相乘后做子集和反演，得到 **或卷积** $\displaystyle a_{k}=\sum_{i|j=k}^{}f_{i}g_{j}$。证明：
$$
\begin{aligned}
A_{s}
&= \sum_{t|s=s}^{} a_{t}
= \sum_{t|s=s}^{} \sum_{i|j=t}^{}f_{i}g_{j} 
= \sum_{i|j|s=s}^{} f_{i}g_{j} \\
&= \sum_{i|s=s}^{} f_{i} \sum_{j|s=s}^{}g_{j} 
= F_{s}G_{s}

\end{aligned}
$$

```cpp
template <typename T>
vector<T> operator | (vector<T> a, vector<T> b) {  // 求或卷积
    const int n = a.size();
    FWTOR(a, 1);  // 或者 FMTOR(a, 1);
    FWTOR(b, 1);
    for (int i = 0; i < n; i++) {
        a[i] *= b[i];
    }
    FWTOR(a, -1);
    return a;
}
```

### 与卷积

将两个序列 $f,g$ 的超集和相乘后做超集和反演，得到 **与卷积** $\displaystyle a_{k}=\sum_{i\&j=k}^{}f_{i}g_{j}$。

```cpp
template <typename T>
vector<T> operator & (vector<T> a, vector<T> b) {  // 求与卷积
    const int n = a.size();
    FWTAND(a, 1);
    FWTAND(b, 1);
    for (int i = 0; i < n; i++) {
        a[i] *= b[i];
    }
    FWTAND(a, -1);
    return a;
}
```

### 异或卷积

异或比较复杂，设 $x\circ y$ 表示 $x$ 与 $y$ 二进制中公共 1 的数量，那么调用按位异或变换将得到 $A_{i}=\displaystyle \sum_{j\circ i=0} a_{j}-\sum_{j\circ i=1} a_{j}$，目前感觉没什么用；将两个序列 $f,g$ 在平行时空相乘后做反变换，得到 **异或卷积** $\displaystyle a_{k}=\sum_{i\oplus j=k}^{}f_{i}g_{j}$。

```cpp
template <typename T, typename U>
void FWTXOR(vector<T>& a, U o) {  // 异或变换 
    const int n = a.size();
    for (int mid = 1; mid < n; mid <<= 1) {
        for (int i = 0; i < n; i += mid << 1) {
            for (int j = 0; j < mid; j++) {
                auto& x = a[i + j];
                auto& y = a[i + j + mid];
                tie(x, y) = pair(o * (x + y), o * (x - y));
            }
        }
    }
}

template <typename T>
vector<T> operator ^ (vector<T> a, vector<T> b) {  // 求异或卷积
    const int n = a.size();
    FWTXOR(a, 1);
    FWTXOR(b, 1);
    for (int i = 0; i < n; i++) {
        a[i] *= b[i];
    }
    FWTXOR(a, Z(1) / 2);
    return a;
}
```

### 子集卷积 × 一般 DP 的设计思路

**子集卷积** 定义为 $\displaystyle a_{k}=\sum_{i\&j=0,i|j=k}^{}f_{i}g_{j}$。

处理下标两种限制的卷积太过麻烦，不妨扩维，设
$$
f_{p,i}'
=\begin{cases}
0, & |i| \neq p \\
f_{i}, & |i| = p \\
\end{cases}
$$
$g_{q,j}'$ 同理，我们求 $a_{r,k}'$，
$$
a_{r,k}'
=\sum_{p+q=r,i\&j=0,i|j=k}^{}f_{p,i}'g_{q,j}'
=\sum_{p+q=r}^{}\sum_{i|j=k}^{}f_{p,i}'g_{q,j}',
$$

现在不需要考虑限制条件 $i\&j=0$，将下标的两种限制转化为两种下标的限制。

$\displaystyle \sum_{i|j=k}^{}f_{p,i}'g_{q,j}'$ 是 $f_{p}'$ 与 $g_{q}'$ 的或卷积，先枚举外层循环，内层做或卷积即可。时间复杂度 $\operatorname{O}(n^{2}\cdot 2^{n})$，$n=18$ 时 $\operatorname{O}(n^{2}\cdot 2^{n})=\operatorname{O}(10^{8})$，比 $\operatorname{O}(3^{n})$ 的方法略快。

```cpp
cin >> n;
vector f(n + 1, vector<Z>(1 << n));
vector g(n + 1, vector<Z>(1 << n));
vector a(n + 1, vector<Z>(1 << n));
for (int i = 0; i < (1 << n); i++) {
    cin >> f[__builtin_popcount(i)][i];
}
for (int i = 0; i < (1 << n); i++) {
    cin >> g[__builtin_popcount(i)][i];
}
for (int i = 0; i <= n; i++) {
    FMTOR(f[i], 1); 
    FMTOR(g[i], 1);
}
for (int r = 0; r <= n; r++) {
    for (int p = 0; p <= r; p++) {
        for (int s = 0; s < 1 << n; s++) {
            a[r][s] += f[p][s] * g[r - p][s];
        }
    }
}
for (int i = 0; i <= n; i++) {
    FMTOR(a[i], -1);
}
for (int i = 0; i < (1 << n); i++) {
    cout << a[__builtin_popcount(i)][i] << " ";
}
cout << endl;
```


## 四　

### 数论中的莫比乌斯变换

在数论中，莫比乌斯变换是这种形式
$$
f(n)=\sum_{d\mid n}g(d)\iff g(n)=\sum_{d\mid n}\mu(d)g\left(\dfrac{n}{d}\right) 
$$
其他的变换可以看[狄利克雷卷积和莫比乌斯反演](https://zhuanlan.zhihu.com/p/646539446)。

如果我们传入的参数 $n$ 是一个 Square Free Number，即没有平方因子的数，这种数由于仅存在 0/1 的指数，所以可以用二进制表示， g 函数是一个恰好仅与传入参数有关的式子，那么我们就能将上式改写成：
$$
f(S)=\sum_{T\subseteq S}g(T)\iff g(T)=\sum_{S\subseteq T}(-1)^{|T\setminus S|}f(S) 
$$
本质上就是广义莫比乌斯变换的一种特殊形式。
