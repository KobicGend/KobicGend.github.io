---
title: 算法程序實訓｜早讀講義
tags:
  - 算法
  - 筆記
  - ACM
categories:
  - - 筆記
    - 算法筆記
description: 中國傳媒大學校賽複習資料。
abbrlink: 8de1f3f0
date: 2024-03-12 08:39:15
updated: 2024-03-28 17:48:44

password: Shusei
abstract: This blog is encrypted. 本文已加密。
message: Please enter the password. 請輸入訪問密碼。
wrong_pass_message: 'Incorrect password, please try again. 密码不正確，請重試。'
wrong_hash_message: Bug found!
---


# 算法程序實訓｜早讀講義

**二次編寫**

- 優化合併
  - 合併了原「学习笔记」「算法学习笔记 - 详细解释版」；
  - 整理原「考後复盘自评」中重要易錯點；

- 依據考試內容精簡筆記
  - 刪除了廢話；
  - 刪除了考試範圍以外的知識；
  - 刪除了熟練掌握的知識；

- 重新排版，美化筆記
  - 修訂部分 markdown 格式錯誤；




## PART 0

```cpp
#include <bits/stdc++.h>
#include <cstdio>
#include <iostream>
#include <algorithm>
#include <utility> // pair; swap; hash(一般與unordered_map連用)
#include <cstring>
#include <string>
#include <cmath>
using namespace std;

typedef long long ll;
typedef unsigned long long ull;
typedef double dd;

inline ll read() {
    ll x = 0, f = 0; char c = getchar();
    while (c > 57 || c < 48) f |= c == 45, c = getchar();
    while (c <= 57 && c >= 48) x = (x << 3) + (x << 1) + c - 48, c = getchar();
    return f ? -x : x;
}

template<const int T>
struct ModInt {
    const static int _mod = T;
    int _x;
    ModInt(int _x = 0) : _x((_x + _mod) % _mod) {}
    ModInt(ll _x) : _x(int((_x + _mod) % _mod)) {}
    int vale() { return _x; }
    ModInt operator + (const ModInt& _a) const { int _b = _x + _a._x; return ModInt(_b < _mod ? _b : _b - _mod); }
    ModInt operator - (const ModInt& _a) const { int _b = _x - _a._x; return ModInt(_b < 0 ? _b + _mod : _b); }
    ModInt operator * (const ModInt& _a) const { return ModInt(1LL * _x * _a._x % _mod); }
    ModInt operator / (const ModInt& _a) const { return *this * _a.inv(); }
    bool operator == (const ModInt& _a) const { return _x == _a._x; };
    bool operator != (const ModInt& _a) const { return _x != _a._x; };
    void operator += (const ModInt& _a) { _x += _a._x; if (_x >= _mod) _x -= _mod; }
    void operator -= (const ModInt& _a) { _x -= _a._x; if (_x < 0) _x += _mod; }
    void operator *= (const ModInt& _a) { _x = 1LL * _x * _a._x % _mod; }
    void operator /= (const ModInt& _a) { *this = *this / _a; }
    friend ModInt operator + (int _y, const ModInt& _a) { int _b = _y + _a._x; return ModInt(_b < _mod ? _b : _b - _mod); }
    friend ModInt operator - (int _y, const ModInt& _a) { int _b = _y - _a._x; return ModInt(_b < 0 ? _b + _mod : _b); }
    friend ModInt operator * (int _y, const ModInt& _a) { return ModInt(1LL * _y * _a._x % _mod); }
    friend ModInt operator / (int _y, const ModInt& _a) { return ModInt(_y) / _a; }
    friend std::ostream& operator<<(std::ostream& os, const ModInt& _a) { return os << _a._x; }
    friend std::istream& operator>>(std::istream& is, ModInt& _t) { return is >> _t._x; }
    ModInt pow(ll n) const {
        if (n == 0) return 1;
        ModInt res(1), mul(_x);
        while (n) {
            if (n & 1) res *= mul;
            mul *= mul;
            n >>= 1;
        }
        return res;
    }
    ModInt inv() const {
        int _a = _x, _b = _mod, _u = 1, _v = 0;
        while (_b) {
            int _t = _a / _b;
            _a -= _t * _b; std::swap(_a, _b);
            _u -= _t * _v; std::swap(_u, _v);
        }
        if (_u < 0) _u += _mod;
        return _u;
    }
};
typedef ModInt<571373> mint;

inline void beforeT() {
    std::ios::sync_with_stdio(false); std::cin.tie(0), std::cout.tie(0);
}
```

計算機 $\rm 1s$ 能执行 $5\times10^8$ 次计算，若時間限制爲 $\rm 1s$，有

$$
\begin{array}{ccccccc}

\Theta(n) & \Theta(n\log n) & \Theta(n\sqrt n) & \Theta(n^2) & \Theta(n^3) & \Theta(2^n) & \Theta(n!) \\

n\le10^8 & n\leqslant10^6 & n\leqslant10^5 & n\leqslant5000 & n\leqslant300 & n\leqslant25 & n\leqslant11

\end{array}
$$


<div style="page-break-after:always;"></div>

## PART 1

### 第一～八講　`cpp` 基礎

#### 數据類型範圍

```cpp
char;             // -128 ~ 127 或 0 ~ 255
int;            // -32,768 ~ 32,767 或 -2,147,483,648 ~ 2,147,483,647
short;            // -32,768 ~ 32,767
long;            // -2,147,483,648 ~ 2,147,483,647
long long;        // -9,223,372,036,854,775,808 ~ 9,223,372,036,854,775,808
float;             // 1.2E-38 ~ 3.4E+38         6位有效位
double;            // 2.3E-308 ~ 1.7E+308         15位有效位
long double;    // 3.4E-4932 ~ 1.1E+4932     19位有效位
```

#### I/O流控制符

下列控制符均需頭文件 `#include <iomanip>`，绝大多數具有保留效力，除了 `setw`：

```cpp
/* 控制浮点數值显示 */
double a = 22.0/7;
cout << fixed << setprecision(3) << a << endl;         // 3.143 保留三位小數 %.3lf
cout << scientific << setprecision(2) << a << endl; // 3.143e+00 保留兩位小數的科学计數法 %.2e

/* 設置值的輸出宽度 */
cout << setw(8) << 10 << 20 << endl;                //       1020 設置宽度 %.*d
cout << setfill('*') << setw(8) << 10 << 20 << endl;// ******1020 設置填充字符
cout << left << setw(8) << 10 << 20 << endl;        // 10******20 左對齊 %-

/* 輸出八進制數和十六進制數 */ 
cout << dec << 1001 << endl;                    // 1001 十進制 %d
cout << hex << uppercase << 1001 << endl;        // 3E9  十六進制大写輸出 %X
cout << hex << nouppercase << 1001 << endl;        // 3e9  十六進制小写輸出 %x
cout << oct << 1001 << endl;                    // 1751 八進制 %o

/* 强制輸出小數点或符号 */
double b = 10.0/5;
cout << showpoint << b << endl;                    // 2.00000     %lf
cout << showpos << b << endl;                    // +2.00000 %+lf
cout << noshowpoint << b << endl;                // 2         %g
cout << noshowpos << b << endl;                    // 2.00000  %lf
```

#### 表達式優先級

不用記憶結合方向和優先級，加括號即可。


<div style="page-break-after:always;"></div>

### 第九講    前綴和与差分

- **一維前綴和**

  ```cpp
  s[i] = s[i-1] + a[i];             // 預處理
  s[r] - s[l-1];                     // 查詢 表示a[l] + a[l+1] + ... + a[r]
  ```

- **一維差分**

  ```cpp
  b[i] = a[i] - a[i-1];             // 預處理
  b[l] += c, b[r+1] -= c;         // 操作 给a数組中的[l,r]區间中的每一个數都加上c
  a[i] = a[i-1] + b[i];             // 查詢
  ```

- **二維前綴和**

  ```cpp
  s[i][j] = s[i-1][j] + s[i][j-1] - s[i-1][j-1] + a[i][j];    // 預處理
  s[x2, y2] - s[x1-1, y2] - s[x2, y1-1] + s[x1-1, y1-1];
  // 查詢 表示以(x1, y1)爲左上角，(x2, y2)爲右下角的子矩阵的和
  ```

- **二維差分**

  ```cpp
  b[i][j] = a[i][j] - a[i-1][j] - a[i][j-1] + a[i-1][j-1];    // 預處理
  b[x1][y1] += c;
  b[x1][y2+1] -= c;
  b[x2+1][y1] -= c;
  b[x2+1][y2+1] += c;
  // 操作 给a数組中的[(x1,x2),(y1,y2)]方阵中的每一个數都加上c
  a[i][j] = b[i][j] + a[i-1][j] + a[i][j-1] - a[i-1][j-1];    // 查詢
  ```

  

<div style="page-break-after:always;"></div>

### 第十講    排序

- **快排**

  - 原理：通過一趟快速排序將要排序的數据分割成獨立的兩部分，其中一部分的所有數据都比另外一部分的所有數据都要小，然後再按此方法對这兩部分數据分別进行快速排序，直到最後各部分只有單个數爲止。時間复杂度 $\Theta(n\log(n))$。
  - **標準模板库 `std::sort()`**，需要頭文件 `<algorithm>`。

- **歸併排序**

  - 原理：從兩个有序數組的表頭开始依次比較 a[i] 和 a[j] 的大小，如果 a[i] < a[j]，則將 a[i] 複製到歸併數組 r[k] 中，并且 i 和 k 都加 1 後移，否則將 a[j] 複製歸併到 r[k] 中，并且 j 和 k 都加 1 後移；如此循環下去，直到其中一个有序表取完後再將另外一个有序表中剩餘的元素複製到 r 中。時間复杂度 $\Theta(n\log(n))$。

  - 代碼：

    ```cpp
    ll cnt = 0; // 逆序數
    
    void merge(int* a, int l, int mid, int r) {     // 合并函數
        std::vector<int> b; // 用 vector 申请一个辅助函數
        int i = l, j = mid + 1;
        while (i <= mid && j <= r) {
            if (a[i] <= a[j]) b.push_back(a[i++]);     // 按從小到大存放在 b 數組里面
            else b.push_back(a[j++]), cnt += mid - i + 1;
        }
        while (i <= mid) b.push_back(a[i++]);     // j 序列結束，將剩餘的 i 序列补充在 b 數組中 
        while (j <= r) b.push_back(a[j++]);     // i 序列結束，將剩餘的 j 序列补充在 b 數組中 
        for (int i = l; i <= r; i++) a[i] = b[i - l];// 將 b 數組的值传遞给數組 a
    }
    
    void mergesort(int* a, int l, int r) {         // 歸併排序
        if (l < r) {
            int mid = (l + r) >> 1;
            mergesort(a, l, mid);                 // 對 a[l,mid]进行排序
            mergesort(a, mid + 1, r);              // 對 a[mid+1,r]进行排序
            merge(a, l, mid, r);                 // 进行合并操作
        }
    }
    ```




<div style="page-break-after:always;"></div>

### 第十一講    分治與二分

- **數組的二分查找**：在從小到大的排序數組中，從數組的 `[begin, end)` 區间中二分查找第一个

  - `lower_bound(begin, end, num)`：大于或等于 `num` 的數字，

  - `upper_bound(begin, end, num)`：大于 `num` 的數字，

  找到返回该數字的地址，不存在則返回 `end`。通過返回的地址减去起始地址 `begin`，得到找到數字在數組中的下標。

  ```cpp
  #include <algorithm> // 需要頭文件
  int p = std::lower_bound(a+1, a+n, x) - a;
  if (p != n) {} // found at p
  else {} // not found
  ```

  使用 `std::lower_bound(begin, end, num, std::greater<int>());` 在從大到小的排好序的數組中，在數組的 `[begin, end)` 區间中二分查找第一个小于等于 `value` 的數，找到返回该數字的地址，没找到則返回 `end`。

- **带有函數的二分查找**

  ```cpp
  int lt = l, rt = r, mid = -1;
  while (lt <= rt) {
      mid = (lt + rt) >> 1;
      if (half(mid)) lt = mid + 1;
      else rt = mid - 1;
  }
  printf("%d\n", mid);
  ```
  
  小數版
  
  ```cpp
  const double EPS = 1e-6;
  double lt = l, rt = r, mid = -1;
  while (rt - lt > EPS) {
      mid = (lt + rt) / 2.0;
      if (half(mid)) lt = mid;
      else rt = mid;
  }
  cout << fixed << setprecision(n) << mid << endl;
  ```



### 第十二講    遞推與遞歸




<div style="page-break-after:always;"></div>

### 第十三講    简單數学和枚舉约减

#### 求組合數

**組合數的定義**
$$
C_n^m=\frac{n\left(n-1\right)\cdots\left(n-m+1\right)}{m\left(m-1\right)\cdots1}
$$

```cpp
ll C(ll n, ll m, int p) {
    ll ans = 1;
    for (ll i = 1; i <= m; ++i)
        ans = ans * (n - m + i) * inv(i, p) % p;
    return ans;
}
```

時間複雜度 $\Theta(m)$。



**橫向一維遞推**
$$
C_n^m=\frac{n-m+1}{m}C_n^{m-1}
$$

```cpp
ll c[maxN][maxN];
void getC(int n, int p) {
    c[n][0] = 1; c[n][n] = 1;
    for (int j = 1; j < n; ++j)
        c[n][j] = c[n][j-1] * (n-j+1) * inv(j, p) % p;
}
```

在時間複雜度 $\Theta(n)$ 內計算 $C_n^0 \sim C_n^n$。



**楊輝三角二維遞推**
$$
C_n^m=C_{n-1}^{m}+C_{n-1}^{m-1}
$$

```cpp
ll c[maxN][maxN];
void getC(int n, int p) {
    for (int i = 0; i <= n; ++i) {
        c[i][0] = 1; c[i][i] = 1;
        for (int j = 1; j < i; ++j)
            c[i][j] = (c[i-1][j-1] + c[i-1][j]) % p;
    }    
}
```

在時間複雜度 $\Theta(n^2)$ 內計算 $C_0^0 \sim C_n^n$。

<div style="page-break-after:always;"></div>

**預處理階乘**

```cpp
ll fac[maxN], ifac[maxN];

void init(int n, int p) {
    fac[0] = 1;
    for (int i = 1; i <= n; i++) fac[i] = fac[i - 1] * i % p;
    ifac[n] = qpow(fac[n], p - 2, p);
    for (int i = n; i >= 1; i--) ifac[i - 1] = ifac[i] * i % p;
}

ll C(int n, int m, int p) {
    return fac[n] * ifac[m] % p * ifac[n - m] % p;
}
```

在時間複雜度 $\Theta(n)$ 內計算 $C_0^0 \sim C_n^n$。

<div style="page-break-after:always;"></div>

**盧卡斯定理**

對於 $m,n$ 和素數 $p$， $C_m^n\equiv\prod_{i=0}^{k}C_{m_i}^{n_i}\pmod{p}$，其中 $m=m_kp^k+\cdots +m_1p+m_0,~n=n_kp^k+\cdots +n_1p+n_0$ 是 $m$ 和 $n$ 的 $p$ 進制展開。
$$
C_m^n\equiv C_{m\bmod p}^{n \bmod p}\cdot C_{\lfloor m/p\rfloor}^{\lfloor n/p\rfloor}\pmod{p}
$$

```cpp
ll fact[maxN];
void dofact(int n, int p) {
    fact[0] = fact[1] = 1;
    for (int i = 2; i < n; ++i) fact[i] = fact[i - 1] * i % p;
}

ll inv[maxN];
ll doInv(ll a, ll p) {
    a %= p;
    if (a == 0) return -1;
    if (a == 1) return 1;
    if (inv[a]) return inv[a];
    return inv[a] = (p - p / a) * doInv(p % a, p) % p;
}

ll C(ll n, ll m, ll p) {
    return n < m ? 0 :
        fact[n] * doInv(fact[m], p) % p * doInv(fact[n - m], p) % p;
}

ll lucas(ll n, ll m, ll p) {
    return m == 0 ? 1 :
        lucas(n / p, m / p, p) * C(n % p, m % p, p) % p;
}
```

時間複雜度 $\Theta(p)$，要求 $p$ 比較小。









### 第十四講    位運算

```cpp
-a = ~a + 1;                 // 取負數
if (a & 1);                 // 判斷奇偶 正奇數或負偶數爲1
a >> (k-1) & 1;             // 取int型變量的右數第k位
a = a | (1 << k-1);            // 将int型變量的右數第k位置取1
a = a << k | a >> 16-k;        // int型變量循環左移k次, 設sizeof(int)=16
a = a >> k | a << 16-k;        // int型變量循環右移k次, 設sizeof(int)=16
if ((!(a & (a - 1))) && a);    // 判斷一个整數是不是2的幂
x ^= y; y ^= x; x ^= y;        // 交换兩數
a & (-a);                    // 最低位的1以及它後边的0构成的數
```



<div style="page-break-after:always;"></div>

### 第十五講    枚舉排列

**標準模板库 `std::next_permutation()`**，需要頭文件 `<algorithm>`，用於調用下一个排列，時間複雜度 $\Theta(n!)$，能解決的數据範圍在 $n\leqslant11$。

```cpp
std::sort(a, a + n);
do {
    // doing
} while (std::next_permutation(a, a + n);
```



### 第十六講    枚舉子集

時間複雜度 $\Theta(2^n)$，能解決的數据範圍在 $n\leqslant25$。

```cpp
for (int seq = 0; seq < (1ll << n); ++seq) {
    for (int i = 0; i < n; ++i)
        if (seq & (1ll << i)) {
            // doing
        }
}
```

這是「二進制法」，此外有「增量構造法」「位向量法」。

**分解和**

```cpp
int H[maxN];
void Hdfs(int n, int k, int Hmin, int Hcur) {
    if (n <= 0 && Hcur == k) {
        // doing
    }
    for (int i = Hmin; i <= n; ++i) {
        H[Hcur] = i;
        Hdfs(n - i, k, i, Hcur + 1);
    }
}
```

起始調用 `Hdfs(n, k, 1, 0);`



<div style="page-break-after:always;"></div>

### 第十七講    `STL`

**`string`（字符串）**

```cpp
#include <string>
std::string s = "123456789";                            // 定義
std::string s1(s);                 // "123456789"
std::string s2(s, 1, 3);        // "234"
std::string s3("123456789", 2);    // "12"
std::string s4(s, 2);             // "3456789"
std::string s5(5, '9');            // "99999"

std::cin >> n;
getchar(); // '\n'
getline(std::cin, s);

if (a < b);                                             // 按字典序比較

s.size(); // = s.length()                                // 長度

s.push_back(char);                                         // 添加
s.insert(s.begin(), char);     // 任意位
s.append(str);                 // 前方
s = 'Shu' + s + 'ei';        // 加運算符

s.erase(iterator);                                         // 剔除
s.erase(iterator1, iterator2);
s.erase(pos, len);

s.replace(pos, len, str);                                 // 替換
s.replace(pos, len, num, char); // num個char
s.replace(iterator1, iterator2, str);

s.substr(pos, len);                                     // 截取子串

reverse(s.begin(),s.end());                                // 翻轉
transform(s.begin(), s.end(), s.begin(), ::tolower);     // 轉換爲小寫
transform(s.begin(), s.end(), s.begin(), ::toupper);     // 轉換爲大寫

s.find(str/char, pos);                                     // 查找 從pos開始 返回位置或-1
s.rfind(str/char, pos);    // 逆向查找
s.find_first_of(str, pos); // 查找str的字符
s.find_first_not_of(str, pos);
s.find_last_of(str, pos);
s.find_last_not_of(str, pos);
```

<div style="page-break-after:always;"></div>

**`stack`（棧）**

```cpp
#include <stack>
std::stack<int> s;

s.top(); s.push(x); s.pop();
s.empty(); s.size(); // 沒有 s.clear();

for (int i = 0; i < 10; ++i) s.push(i);
while (!s.empty()) std::cout << s.top() << " ", s.pop();

int s[10], pos = 0; // 使用數組模擬
for (int i = 0; i < 10; ++i) s[pos++] = i;
while (pos) std::cout << s[--pos];
```



**`queue`（隊列）**

```cpp
#include <queue>
std::queue<int> q;

q.front(); q.back();
q.push(x); q.pop();
q.empty(); q.size(); // 沒有 q.clear();

for (int i = 0; i < 3; ++i) q.push(i);
while (!q.empty()) std::cout << q.front() << " ", q.pop();

int q[3], ff = 0, bb = 0; // 使用數組模擬
for (int i = 0; i < 3; ++i) q[bb++] = i;
while (ff < bb) std::cout << q[ff++] << " ";
```



**`priority_queue`（優先隊列）**

```cpp
#include <queue>

std::priority_queue<int> q;                             // 升序 優先取最大值
std::priority_queue<int, vector<int>, greater<int>> q;     // 降序 優先取最小值
struct node {
    int x, y;
    bool operator < (const node& b) const {
        return x < b.x; // 降序 優先取最小值
    }
};
std::priority_queue<node> q;

q.front(); q.back();
q.push(x); q.pop();
q.empty(); q.size(); // 沒有 q.clear();
```

<div style="page-break-after:always;"></div>

**`deque`（雙端隊列）**

```cpp
#include <deque> // double ended queue
std::deque<int> dq;

dq.push_back(x); dq.push_front(x);
dq.back(); dq.front();
dq.pop_back(); dq.pop_front();
dq.erase(iterator);
dq.erase(iterator1, iterator2);
dq.empty(); dq.size(); dq.clear();
```

單調隊列：滑動區間

```cpp
std::deque<int> Q;                                 // 存儲的是編號
for (int i = 0; i < n; ++i) {
    if (!Q.empty() && i - Q.front() >= m)
        Q.pop_front();                             // 畢業
    while (!Q.empty() && a[Q.back()] < a[i])    //（求區間最小值改成>即可）
        Q.pop_back();                             // 比新生弱的當場退役
    Q.push_back(i);                             // 新生入隊
    if (i >= m - 1)
        printf("%d\n", a[Q.front()]);
}
```



**`set`（集合）**

```cpp
#include <set>
std::set<int> s;
std::set<int, greater<int> > s2; // 降序

s.insert({ x });    // 插入元素
s.begin(); s.end();
s.rbegin(); s.rend();
s.find(key); s.count(key); // 前者返回迭代器 後者是bool
s.erase(key); s.erase(it); s.erase(first,last);
s.size(); s.empty(); s.clear();
s.lower_bound(key); s.upper_bound(key);

for (std::set<int>::iterator it = s.begin(); it != s.end(); ++it)
    std::cout << *it << ' ';
for (auto i : s)
    std::cout << i << ' ';
```

另有：`multiset`（元素可以重复，且元素有序）、`unordered_set`（元素無序且只能出現一次）、`unordered_multiset`（元素無序可以出現多次）

<div style="page-break-after:always;"></div>

**`map`（映射）**

```cpp
#include <map>

std::map<int, int> mp;

mp.insert(std::pair<int, int> (34, 27));
mp.insert(std::make_pair(34, 27));
mp.insert({34, 27});
mp.erase(it);            // 刪除迭代器 並返回這個迭代器的下一個位置
mp.erase(key);            // 刪除键對應的迭代器 O(logN)
mp.erase(first,last);    // 刪除左闭右开区间迭代器对应的键和值 O(last−first)
mp.find(key);     // 返回迭代器或mp.end()(O(logN)) 後者返回
mp.count(key); // 返回bool
mp.begin();    mp.end();    // 指向第一个元素/尾部(最后一个元素的下一个)的迭代器
mp.rbegin(); mp.rend();    // 指向最后一个元素/第一个元素的前一个的逆向迭代器
mp.empty(); mp.size(); mp.clear();
mp.lower_bound(key);    // 返回一个指向键值>=key的第一个元素的迭代器
mp.upper_bound(key);    // 返回一个指向键值>key的第一个元素的迭代器

std::cout << mp[3427];
std::map<int, int>::iterator it = mp.find(3427);
std::cout << it->first << ' ' <<  it->second << '\n;

for (std::map<int, int>::iterator it = mp.begin(); it != mp.end(); ++it)
    std::cout << it->first << ' ' << it->second << '\n'; // 正向遍歷
for (auto i : mp)
    std::cout << i.first << " " << i.second << '\n'; // 正向遍歷
for (std::map<int, int>::iterator it = mp.rbegin(); it != mp.rend(); ++it)
    std::cout << it->first << ' ' << it->second << '\n'; // 逆向遍歷
```

**`map`**：内部用 **红黑树** 实现，具有 **自动排序** 功能。

- 优点：内部用红黑树实现，内部元素具有有序性，查詢删除等操作复杂度爲 O(logN)。

- 缺点：占用空间，红黑树里每个节点需要保存父子节点和红黑性质等信息，空间占用较大。

**`unordered_map`**：内部用 **哈希表** 实现，内部元素无序杂乱。

- 优点：查找速度快（适用于大量的查詢操作）。
- 缺点：建立哈希表比较耗时。



**`pair`（雙胞胎）**

```cpp
std::pair<int, int> p[maxN];
for (auto& it : p) it.first = read(), it.second = read();
for (auto it : p) std::cout << it.first << it.second;
for (int i = 0; i < 10; ++i) std::cout << p[i].first << p[i].second;
```

<div style="page-break-after:always;"></div>

**`vector`（向量）**

```cpp
#include <vector>

std::vector<int> v;
std::vector<int> v(n); // 在局部区域中开vector数组，是在堆空间里面开的，不会爆栈
std::vector<int> v(n, 3427);
std::vector<int> v{ 1, 2, 4, 8, 16, 31 };
std::vector<int> b(v);  // 拷貝定義
std::vector<int> c = v; // 拷貝定義

v.push_back(x); // 沒有v.push_front(x);
v.resize(n, x);         // 改變大小爲n 新插入的元素賦爲x 原有不會改變
v.insert(v.begin() + i, x);         // 插入元素x O(N)
v.front(); v.back();
v.pop_back(); // 沒有v.pop_front(x);
v.erase(first, last); // 删除[first,last)的所有元素 O(N)
v.begin(); v.end();
v.empty(); v.size(); v.clear();

for (int i = 0; i < v.size(); ++i) std::cout << v[i] << " \n"[i == v.size() - 1];

std::vector<int>::iterator it = v.begin(); // 声明一个迭代器指向v的初始位置
for (int i = 0; i < v.size(); ++i)
    std::cout << *(it + i) << " \n"[i == v.size() - 1];

for (std::vector<int>::iterator it = v.begin(); it != v.end(); ++it)
    std::cout << *it << " \n"[it == v.end() - 1];

for (auto& it : v) std::cin >> it;
std::sort(v.begin(), v.end()); // 排序
for (auto it : v) std::cout << it << " "; // 只返回元素 不可知位置
```









### 第十八講    貪心

> *策馬前途須努力，莫學龍鐘虛嘆息。*



<div style="page-break-after:always;"></div>

### 第十九講    動態規劃 `DP`

#### DP：擺花——方法數問題

給定 $(a_1,a_2,...,a_n)$，求 $(c_1,c_2,...,c_n)$ 的對數，其中 $0\leqslant c_i\leqslant a_i$，且 $\sum\limits_{i=1}^nc_i = m$。

- **思路二    記憶化搜索**

  ```cpp
  int dfs(int pos, int sum) {
      if (sum > m) return 0;
      if (sum == m) return 1;
      if (pos > n) return 0;
      if (vis[pos][sum]) return vis[pos][sum]; // 搜過了就返回
      int ans = 0;
      for (int i = 0; i <= a[pos]; ++i) ans = (ans + dfs(pos+1, sum+i)) % MOD;
      return vis[pos][sum] = ans; // 記錄當前狀態的結果
  }
  ```

  時間複雜度 $\Theta(nma_i)$。

- **思路三    動態規劃**

  > ***記憶化搜索都可以轉成動態規劃，但是動態規劃卻不一定能轉成記憶化搜索。***

  狀態 $f(i, j)$ 表示前 $i$ 个數總和爲 $j$ 的方案數，則狀轉方程 $f(i, j) = \sum\limits_{k=0}^{a_{i}}f(i-1,j-k)$，其中，$k$ 是枚舉當前第 $i$ 个數的取值。

  ```cpp
  int f[maxN][maxN];
  f[0][0] = 1;
  for (int i = 1; i <= n; ++i)
      for (int j = 0; j <= m; ++j)
          for (int k = 0; k <= min(j, a[i]); ++k)
              f[i][j] = (f[i][j] + f[i-1][j-k]) % MOD;
  ```

  所求即是 `f[n][m]`。時間複雜度 $\Theta(nma_i)$，空間複雜度 $\Theta(nm)$。

- **思路四    滾動數組**

  ```cpp
  int f[2][maxN], op = 0;
  f[0][0] = 1;
  for (int i = 1; i <= n; ++i) {
      op ^= 1; // 滾動 0101
      for (int j = 0; j <= m; ++j) {
          f[op][j] = 0; // 清空（初始化）
          for (int k = 0; k <= min(j, a[i]); ++k)
              f[op][j] = (f[op][j] + f[op^1][j-k]) % MOD;
      }
  }
  ```

  所求即是 `f[n][m]`。時間複雜度 $\Theta(nma_i)$，空間複雜度 $\Theta(m)$。

<div style="page-break-after:always;"></div>

- **思路五    一維動態規劃（01背包）**

  ```cpp
  int f[maxn];
  f[0] = 1;
  for (int i = 1; i <= n; ++i)
      for (int j = m; j >= 0; --j)
          for (int k = 1; k <= min(a[i], j); ++k)
              f[j] = (f[j] + f[j-k]) % MOD;
  ```

  所求即是 `f[m]`。時間複雜度 $\Theta(nma_i)$。

- **思路六    前缀和优化背包**

  继续观察方法五的代码，时间复杂度是$\Theta(n^3)$级别的。与背包有一些差别的是这一句：

  ```cpp
  for (int k = 1; k <= min(a[i], j); ++k)
      f[j] = (f[j] + f[j-k]) % MOD;
  ```

  然而，这一句的作用只不过是将连续的一段 `f[j-a[i]]` 到 `f[j-1]` 累加起来而已。因此，可以用前缀和将这个操作优化（众所周知，前缀和的作用就是 $\Theta(1)$ 求一段区间的和）。

  时间复杂度：$\Theta(nm)$

  顺便卡到了次优解。

  ```cpp
  int f[maxN], sum[maxN];
  f[0] = 1;
  for (int i = 0; i <= m; ++i) sum[i] = 1;
  for (int i = 1; i <= n; ++i) {
      for (int j = m; j >= 1; --j)
          f[j] = (f[j] + sum[j-1] - sum[j - min(a[i], j) - 1] + MOD) % MOD;
      for (int j = 1; j <= m; ++j)
          sum[j] = (sum[j-1] + f[j]) % MOD;
  }
  ```

  提示：上面的程序在计算$f[j]$的时候有可能会出现数组越界的情况，但爲了代码美观容易理解，没有特判。这一点需要注意，考场上不慎就会抱灵。

  下面是加上了特判的代码：

  ```cpp
  int f[maxN], sum[maxN];
  f[0] = 1;
  for (int i = 0; i <= m; ++i) sum[i] = 1;
  for (int i = 1; i <= n; ++i) {
      for (int j = m; j >= 1; --j)
          int t = j - min(a[i], j) - 1;
          if (t < 0) f[j] = (f[j] + sum[j-1]) % MOD;
          else f[j] = (f[j] + sum[j-1] - sum[t] + MOD) % MOD;
      }
      for(int j = 1; j <= m; ++j) sum[j] = (sum[j-1] + f[j]) % MOD;
  }
  ```

<div style="page-break-after:always;"></div>

#### DP：最長上升子序列

- **方法一**

  狀態：$dp_i$ 表示以 $a_i$ 結尾的最長上升子序列的長度；

  狀轉方程：$dp_i=\min\limits_{a_j<a_i}\big(dp_j+1\big)$；

  時間複雜度：$\Theta(n^2)$。

  ```cpp
  int ans = 0;
  for (int i = 0; i < n; ++i) {
      dp[i] = 1;
      for (int j = 0; j < i; ++j) {
          if (a[j] < a[i]) dp[i] = max(dp[i], dp[j] + 1);
      }
      ans = max(ans, dp[i]);
  }
  printf("%d\n", ans);
  ```

- **方法二**

  ```cpp
  vector<int> dp; dp.push_back(-1);
  for (int i = 0; i < n; ++i) {
      if (dp.back() < a[i]) dp.push_back(a[i]);
      else *std::lower_bound(dp.begin(), dp.end(), a[i]) = a[i];
  }
  printf("%lld\n", dp.size() - 1);
  ```

- 由 $\rm Dilworth$ 定理，要求不上升的子序列的最小个數，只需要反過來求最長上升子序列的長度。





<div style="page-break-after:always;"></div>

#### DP：背包問題

**01背包**

```cpp
int V = read(), n = read();
for (int i = 1; i <= n; ++i) v[i] = read(), w[i] = read();
for (int i = 1; i <= n; ++i) // 物品
    for (int j = V; j >= v[i]; --j) // 空間
        dp[j] = max(dp[j], dp[j - v[i]] + w[i]);
print(dp[V]);
```

記憶化搜索：

```cpp
int dfs(int pos, int V) {
    if (mem[pos][V] != -1) return mem[pos][V];
    if (pos == n + 1) return mem[pos][V] = 0;
    if (V >= v[pos]) return mem[pos][V] = max(dfs(pos + 1, V), dfs(pos + 1, V - v[pos]) + w[pos]);
    else return mem[pos][V] = dfs(pos + 1, V);
}

void eachT() {
    memset(mem, -1, sizeof mem);
    int V = read(), n = read();
    for (int i = 1; i <= n; ++i) v[i] = read(), w[i] = read();
    print(dfs(1, V));
}
```



**二維費用背包**

```cpp
int n = read(), V = read(), M = read();
for (int i = 1; i <= n; ++i) v[i] = read(), w[i] = read(), m[i] = read();
for (int i = 1; i <= n; ++i) // 物品
    for (int j = V; j >= v[i]; --j) // 空間
        for (int k = M; k >= m[i]; --k) // 重量
            dp[j][k] = max(dp[j][k], dp[j - v[i]][k - m[i]] + w[i]);
print(dp[V][M]);
```



<div style="page-break-after:always;"></div>

**分組背包**

```cpp
int V = read(), n = read();
for (int i = 1; i <= n; ++i) {
    int x = read(), y = read(), z = read();
    v[z].push_back(x);
    w[z].push_back(y);
}
for (int i = 1; i <= n; ++i) // 物品
    for (int j = V; j >= 1; --j) // 空間
        for (int k = 0; k < v[i].size(); ++k)
            if (j >= v[i][k]) dp[j] = max(dp[j], dp[j - v[i][k]] + w[i][k]);
print(dp[V]);
```



**混合背包（完全背包||多重背包）**

```cpp
int V = read(), N = read();
for (int i = 0; i < N; ++i) v[i] = read(), w[i] = read(), n[i] = read();

for (int i = 0; i < N; ++i) {
    if (n[i] > 1) { // 多重背包
        int num = min(n[i], V / v[i]); // 可以放入的最大个數
        int k = 1; // 當前拆分个數 放入k个物品
        while (num > 0) {
            k = min(k, num);
            for (int j = V; j >= k * v[i]; --j)
                dp[j] = max(dp[j], dp[j - k * v[i]] + k * w[i]);
            num -= k;
            k <<= 1;
        }

    } else if (n[i] == 1) { // 普通01背包
        for (int j = V; j >= v[i]; --j)
            dp[j] = max(dp[j], dp[j - v[i]] + w[i]);

    } else { // 完全背包
        for (int j = v[i]; j <= V; ++j)
            dp[j] = max(dp[j], dp[j - v[i]] + w[i]);
    }
}
print(dp[V]);
```



<div style="page-break-after:always;"></div>

### 第二十講　快速冪

**快速冪**
$$
a_n = 

\begin{cases}

a^{n-1}\cdot a, & \text{if } n \text { is odd} \\ 

a^{\frac{n}{2}}\cdot a^{\frac{n}{2}}, &\text{if } n \text { is even but not 0}\\ 

1,&\text{if } n=0

\end{cases}
$$

```cpp
inline ll qpow(ll a, ll n) {
    ll ans = 1;
    while (n) {
        if (n & 1) ans = ans * a % MOD;
        a = a * a % MOD;
        n >>= 1;
    }
    return ans;
} // return a^n
```



**快速乘**

```cpp
inline ll qmcl(ll a, ll b) {
    ll ans = 0;
    while (b) {
        if (b & 1) ans = (ans + a) % MOD;
        a = (a + a) % MOD;
        b >>= 1;
    }
    return ans;
} // return a*b
```



<div style="page-break-after:always;"></div>

**矩陣快速冪**

求斐波那契數列第 $n$ 項 $F_n$。

設 $\mathbf{A}=\begin{bmatrix}0 &1\\ 1 & 1\end{bmatrix}$，有 $\mathbf{A}\begin{bmatrix}F_n\\ F_{n+1}\end{bmatrix} = \begin{bmatrix}F_{n+1}\\ F_n+F_{n+1}\end{bmatrix}=\begin{bmatrix}F_{n+1}\\ F_{n+2}\end{bmatrix}$，于是 $\begin{bmatrix}F_n\\ F_{n+1}\end{bmatrix}=\mathbf{A}^{n-1}\begin{bmatrix}1\\ 1\end{bmatrix}$。

```cpp
struct matrix {
    ll a1, a2, b1, b2;
    matrix(ll a1, ll a2, ll b1, ll b2) : a1(a1), a2(a2), b1(b1), b2(b2) {}
    matrix operator*(const matrix &y) {
        matrix ans((a1 * y.a1 + a2 * y.b1) % MOD,
                   (a1 * y.a2 + a2 * y.b2) % MOD,
                   (b1 * y.a1 + b2 * y.b1) % MOD,
                   (b1 * y.a2 + b2 * y.b2) % MOD);
        return ans;
    }
};

matrix qpow(matrix a, ll n) {
    matrix ans(1, 0, 0, 1); //單位矩阵
    while (n) { if (n & 1) ans = ans * a; a = a * a; n >>= 1; }
    return ans;
}
```

使用：

```cpp
matrix M(0, 1, 1, 1);             // 廣義：M(0, 1, q, p);
matrix ans = qpow(M, n - 1);
print((ans.a1 + ans.a2) % MOD);    // 廣義：((a1 * ans.a1 + a2 * ans.a2) % MOD)
```



<div style="page-break-after:always;"></div>

### 第二十一講　`DFS`

#### 迷宮問題

數路徑數量

```cpp
const int maxN = 18;
int map[maxN][maxN];
int ansx[maxN * maxN], ansy[maxN * maxN];
int m, n;
int beginx, beginy, endx, endy;
int cnt = 0;
int dx[] = { 0, -1, 0, 1 };
int dy[] = { -1, 0, 1, 0 }; // 方向

void dfs(int pos, int x, int y, int endx, int endy) {
    if (x < 1 || y < 1 || x > m || y > n || map[x][y] == 0) {
        return;
    } // 越界或是牆
    if (x == endx && y == endy) {
        ++cnt;
        for (int i = 0; i < p; ++i) printf("(%d,%d)->", ansx[i], ansy[i]);
        printf("(%d,%d)\n", endx, endy);
        return;
    } // 終點
    ansx[pos] = x; ansy[pos] = y; // 記錄答案
    map[x][y] = 0;
    for (int i = 0; i < 4; ++i)
        dfs(pos + 1, x + dx[i], y + dy[i], endx, endy);
    map[x][y] = 1;
}

void eachT() {
    m = read(), n = read();
    for (int i = 1; i <= m; ++i) for (int j = 1; j <= n; ++j) map[i][j] = read();
    beginx = read(), beginy = read(), endx = read(), endy = read();
    if (map[endx][endy] == 0) { printf("-1\n"); return; }
    dfs(0, beginx, beginy, endx, endy);
    if (!cnt) printf("-1\n"); // 無解
}
```

僅判斷（啓用 `vis[]` 數組）

```cpp
const int maxN = 18;
char map[maxN][maxN];
bool vis[maxN][maxN];
int m, n;
bool flag = 0;
int dx[] = { 0, 1, 0, -1 };
int dy[] = { 1, 0,-1, 0 }; // 方向

void dfs(int x, int y) {
    if (flag) return;
    if (map[x][y] == '#' || vis[x][y]) return; // 是牆或走過了
    if (x == m && y == n) { flag = 1; return; } // 有解
    vis[x][y] = 1;
    for (int i = 0; i < 4; ++i)
        dfs(x + dx[i], y + dy[i]);
}

void eachT() {
    scanf("%d %d\n", &m, &n);
    for (int i = 1; i <= m; ++i) for (int j = 1; j <= n + 1; ++j) scanf("%c", &map[i][j]);
    for (int i = 1; i <= m; ++i) map[i][0] = map[i][n + 1] = '#';
    for (int j = 1; j <= n; ++j) map[0][j] = map[m + 1][j] = '#'; // 邊界
    dfs(1, 1);
    printf("%s\n", flag ? "Yes" : "No");
}
```











<div style="page-break-after:always;"></div>

### 第二十二講　`BFS`

```cpp
#include <cstdio>
#include <queue>

typedef long long ll;
typedef std::pair<int, int> pii;
const ll maxN = 1e3 + 7, N = 4;

int n, m;
int map[maxN][maxN];            // 繪製地圖
bool vis[maxN][maxN];            // 標記是否走過
int steps[maxN][maxN];            // 記錄走到某一点的步數
pii ans[maxN][maxN];            // 記錄最短路徑
std::queue<pii> path;            // 存儲當前處理的值

const int dx[N] = { 0, -1,  0,  1 };
const int dy[N] = { 1,  0, -1,  0 }; // 方向

void print(int x, int y) {
    if (x == 0 && y == 0) return; // 已經輸出到起点
    printf("(%d, %d)\n", x - 1, y - 1);
    print(ans[x][y].first, ans[x][y].second);
}

void bfs(int r, int c, int x0, int y0, int xn, int yn) {
    path.push({ x0, y0 });        // 起始点BFS入隊
    vis[x0][y0] = 1;            // 起始点走過

    while (!path.empty()) {
        // 當前目標BFS出隊
        pii t = path.front();
        path.pop();

        // 到達終点 輸出
        if (t.first == xn && t.second == yn) {
            print(xn, yn);
            break;
        }

        // 處理當前目標
        for (int i = 0; i < N; ++i) {
            int x = t.first + dx[i];                // 下一步的坐標
            int y = t.second + dy[i];
            if (!vis[x][y] && !map[x][y]) {            // 如果沒走過
                vis[x][y] = 1;                        // 走過了
                path.push({ x,y });                    // BFS入隊
                steps[x][y] = steps[t.first][t.second] + 1;                // 記錄步數
                ans[x][y].first = t.first, ans[x][y].second = t.second;    // 記錄最短路徑
            }
        }
    }
    
    // 輸出走到每一格点的最小步數
    for (int i = 1; i <= n; ++i) {
        for (int j = 1; j <= m; ++j)
            printf("%-5d", steps[i][j]);
        printf("\n");
    }

    // 輸出到終点的最小步數
    printf("%d", steps[xn][yn]);
}

void eachT() {
    // 輸入
    scanf("%d %d", &n, &m);
    for (int i = 1; i <= n; ++i) for (int j = 1; j <= m; ++j) scanf("%d", &map[i][j]);
    
    // 邊界處理
    for (int i = 1; i <= n; ++i) map[i][0] = map[i][m + 1] = 0;
    for (int j = 1; j <= m; ++j) map[0][j] = map[n + 1][j] = 0;
    
    // BFS的起点
    bfs(n, m, n, m, 1, 1);
}

int main() {
    eachT();
    return 0;
}
```



<div style="page-break-after:always;"></div>

### 第二十三講　數論

**取餘快讀**

```cpp
inline int readmod() {
    int c = getchar(), x = 0;
    while (c > 57 || c < 48 && c != EOF) c = getchar();
    while (c <= 57 && c >= 48) {
        x = ((x << 3) + (x << 1) + c - 48) % MOD;
        c = getchar();
    }
    return x;
} // 使用：int a = readmod();
```



**歐幾里得**（最大公約數）

```cpp
inline ll gcd(ll _a, ll _b) {
    return _b == 0 ? _a : gcd(_b, _a % _b);
}
```



**解同餘方程** $\boldsymbol{ax \equiv c \pmod b\iff ax + by = c}$

```cpp
ll exgcd(ll a, ll b, ll& x, ll& y) {
    if (b == 0) { x = 1; y = 0; return a; }
    ll d = exgcd(b, a % b, y, x);
    y -= (a / b) * x;
    return d;
}

ll liEq(ll a, ll b, ll c) {
    // a x + b y = c
    ll d = gcd(a, b);
    if (c % d) return -1; // 無解
    ll x, y;
    a /= d, b /= d, c /= d;
    exgcd(a, b, x, y);
    return (x * c % b) + b * d) % b;
}
// 同餘方程 ax == c (mod b) 的最小正整數解
// 即解不定方程 ax + by = c
// 調用liEq(a,b,c);
```



<div style="page-break-after:always;"></div>

**一個數的數論倒數** $\boldsymbol{a^{-1}\pmod p}$

首先注意 $a$ 必須與 $p$ 互素，否則數論倒數不存在。

若 $p$ 是素數：

```cpp
int inv(int n, int p) {
    return qpow(n, p - 2);
} // a_{-1} mod p (p是素數)
```

一般情況：

```cpp
int inv(int n, int p) {
    return liEq(a, p, 1);
} // a_{-1} mod p (p無限制)
```



**一系列數的數論倒數**

```cpp
ll inv[maxN];
ll doInv(ll a, ll p) {
    a %= p;
    if (a == 0) return -1; // 不存在
    if (a == 1) return 1;
    if (inv[a]) return inv[a];
    return inv[a] = (p - p / a) * doInv(p % a, p) % p;
} // a_{-1} mod p (p無限制)
```

從 $1$ 到 $n$ 的連續自然數的數論倒數（$n<p\wedge p$ 是素數）：

```cpp
ll inv[maxN];
inline void doinv(ll n, int p) {
    inv[1] = 1;
    for (int i = 2; i <= n; ++i) {
        inv[i] = (p - p / i) * inv[p % i] % p;
    }
}
```



<div style="page-break-after:always;"></div>

**素數篩（歐拉篩）**

```cpp
bool isntPrime[maxN];
std::vector<int> prime;
void doPrime(int mx) {
    for (int i = 2; i <= mx; ++i) {
        if (!isntPrime[i]) prime.push_back(i);
        for (auto p : prime) {
            if (p * i > mx) break;
            isntPrime[p * i] = 1;
            if (i % p == 0) break;
        }
    }
    isntPrime[1] = 1;
}
```

使用：

```cpp
doPrime(); // 預處理
if (!isntPrime[n]) {    
    // n是素數
} 
```



**計算約數個數 & 約數之和**

```cpp
int numOfDivisors(int x) {
    int ans = 1;
    for (int i = 2; i * i <= x; ++i) {
        int r = 0;
        while (x % i == 0) ++r, x /= i;
        if (r) ans *= r + 1;
    }
    if (x > 1) ans *= 2;
    return ans;
} // x的約數個數

int sumOfDivisors(int x) {

} // x的約數之和
```



<div style="page-break-after:always;"></div>

### 第二十四講　高精度

```cpp
namespace Bignum {
    struct data {
        std::vector<int> num;
        bool op;
        data(int sizeT = 0) {
            num.resize(sizeT);
            op = true;
        }
        int length() {
            return num.size();
        }
        void clearbackzero() {
            while (length() > 1 && num[length() - 1] == 0) {
                num.pop_back();
            }
            if (length() == 1 && num[0] == 0) {
                op = true;
            }
        }
        bool is_zero() {
            clearbackzero();
            if (!op) return false;
            if (length() > 1) return false;
            if (num[0]) return false;
            return true;
        }
        void read() {
            num.clear();
            std::string s1;
            std::cin >> s1;
            if (s1[0] == '-') op = false, s1.erase(0, 1);
            for (int i = s1.size() - 1; i >= 0; i--) num.push_back(s1[i] - '0');
            return;
        }
        void print() {
            if (op == false) printf("-");
            bool flag = false;
            for (int i = length() - 1; i >= 0; i--) {
                if (num[i] != 0 || flag == true) {
                    printf("%d", num[i]);
                    flag = true;
                }
            }
            if (flag == false) printf("0");
        }
    };
    int intws(long long x) {
        int t = 0;
        while (x) x /= 10, t++;
        return t;
    }
    data numtodata(long long a) {
        data ans(intws(a));
        if (a < 0) {
            a = -a, ans.op = false;
        }
        if (a == 0) {
            ans.clearbackzero();
            return ans;
        }
        for (int i = 0; i < ans.length(); i++) {
            ans.num[i] = a % 10, a /= 10;
        }
        ans.clearbackzero();
        return ans;
    }
    bool operator>(data a, data b) {
        a.clearbackzero();
        b.clearbackzero();
        if (a.op == true && b.op == true) {
            if (a.length() > b.length()) return true;
            else if (a.length() < b.length()) return false;
            else {
                for (int i = a.length() - 1; i >= 0; i--) {
                    if (a.num[i] > b.num[i]) return true;
                    if (a.num[i] < b.num[i]) return false;
                }
                return false;
            }
        }
        if (a.op == true && b.op == false) return true;
        if (a.op == false && b.op == true) return false;
        if (a.op == false && b.op == false) {
            if (a.length() > b.length()) return false;
            else if (a.length() < b.length()) return true;
            else {
                for (int i = a.length() - 1; i >= 0; i--) {
                    if (a.num[i] > b.num[i]) return false;
                    if (a.num[i] < b.num[i]) return true;
                }
                return false;
            }
        }
        return true;
    }
    bool operator<(data a, data b) {
        a.clearbackzero();
        b.clearbackzero();
        if (a.op == true && b.op == true) {
            if (a.length() > b.length()) return false;
            else if (a.length() < b.length()) return true;
            else {
                for (int i = a.length() - 1; i >= 0; i--) {
                    if (a.num[i] > b.num[i]) return false;
                    if (a.num[i] < b.num[i]) return true;
                }
                return false;
            }
        }
        if (a.op == true && b.op == false) return false;
        if (a.op == false && b.op == true) return true;
        if (a.op == false && b.op == false) {
            if (a.length() > b.length()) return true;
            else if (a.length() < b.length()) return false;
            else {
                for (int i = a.length() - 1; i >= 0; i--) {
                    if (a.num[i] > b.num[i]) return true;
                    if (a.num[i] < b.num[i]) return false;
                }
                return false;
            }
        }
        return true;
    }
    bool operator==(data a, data b) {
        a.clearbackzero();
        b.clearbackzero();
        if (a.op != b.op) return false;
        if (a.length() != b.length()) return false;
        for (int i = 0; i < a.length(); i++)
            if (a.num[i] != b.num[i]) return false;
        return true;
    }
    bool operator>=(data a, data b) {
        return (a > b) || (a == b);
    }
    bool operator<=(data a, data b) {
        return (a < b) || (a == b);
    }
    bool operator!=(data a, data b) {
        return !(a == b);
    }
    data operator-(data a) {
        a.op = !a.op;
        if ((a.length()) == 1 && a.num[0] == 0) a.op = true;
        return a;
    }
    data abs(data a) {
        a.op = true;
        return a;
    }
    data operator+(data a, data b) {
        if (abs(a) < abs(b)) {
            return b + a;
        }
        data ANS(a.length() + 1);
        ANS.op = a.op;
        if (a.op == true && b.op == true) {
            for (int i = 0; i < ANS.length() - 1; i++) {
                ANS.num[i] += a.num[i] + ((i < b.length()) ? (b.num[i]) : 0);
                if (ANS.num[i] >= 10) {
                    ANS.num[i + 1] += 1;
                    ANS.num[i] -= 10;
                }
            }
        }
        if (a.op == true && b.op == false) {
            for (int i = 0; i < ANS.length() - 1; i++) {
                ANS.num[i] += a.num[i] - ((i < b.length()) ? (b.num[i]) : 0);
                if (ANS.num[i] < 0) {
                    ANS.num[i + 1] -= 1;
                    ANS.num[i] += 10;
                }
            }
        }
        if (a.op == false && b.op == true) {
            for (int i = 0; i < ANS.length() - 1; i++) {
                ANS.num[i] += a.num[i] - ((i < b.length()) ? (b.num[i]) : 0);
                if (ANS.num[i] < 0) {
                    ANS.num[i + 1] -= 1;
                    ANS.num[i] += 10;
                }
            }
        }
        if (a.op == false && b.op == false) {
            for (int i = 0; i < ANS.length() - 1; i++) {
                ANS.num[i] += a.num[i] + ((i < b.length()) ? (b.num[i]) : 0);
                if (ANS.num[i] >= 10) {
                    ANS.num[i + 1] += 1;
                    ANS.num[i] -= 10;
                }
            }
        }
        ANS.clearbackzero();
        return ANS;
    }
    data operator-(data a, data b) {
        return a + (-b);
    }
    data operator*(data a, data b) {
        data ans(a.length() + b.length());
        ans.op = !(a.op ^ b.op);
        for (int i = 0; i < a.length(); i++) {
            for (int j = 0; j < b.length(); j++)
                ans.num[i + j] += a.num[i] * b.num[j];
        }
        for (int i = 0; i < ans.length() - 1; i++) {
            ans.num[i + 1] += ans.num[i] / 10;
            ans.num[i] %= 10;
        }
        ans.clearbackzero();
        return ans;
    }
    data operator*(data a, int b) {
        data ans(a.length() + 20);
        ans.op = !(a.op ^ (b > 0));
        for (int i = 0; i < a.length(); i++) {
            ans.num[i] += a.num[i] * b;
        }
        for (int i = 0; i < ans.length() - 1; i++) {
            ans.num[i + 1] += ans.num[i] / 10;
            ans.num[i] %= 10;
        }
        ans.clearbackzero();
        return ans;
    }
    data operator*(int a, data b) {
        return b * a;
    }
    data numcopy(data a, int l) {
        data b(a.length() + l);
        for (int i = 0; i < a.length(); i++)
            b.num[i + l] = a.num[i];
        b.op = a.op;
        b.clearbackzero();
        return b;
    }
    data operator/(data a, data b) {
        data c(a.length());
        bool beginop = a.op;
        c.op = !(a.op ^ b.op);
        for (int i = c.length() - 1; i >= 0; i--) {
            data t = numcopy(b, i);
            while (abs(a) >= abs(t)) {
                c.num[i]++;
                if (a.op == t.op) a = a - t;
                else a = a + t;
                a.clearbackzero();
            }
        }
        c.clearbackzero();
        return c;
    }
    data operator/(data a, int b) {
        data c(a.length());
        bool beginop = a.op;
        c.op = !(a.op ^ (b > 0));
        int r = 0;
        for (int i = c.length() - 1; i >= 0; i--) {
            r = r * 10 + a.num[i];
            c.num[i] = r / b;
            r %= b;
        }
        c.clearbackzero();
        return c;
    }
    data operator%(data a, data b) {
        bool beginop = a.op;
        for (int i = a.length() - b.length(); i >= 0; i--) {
            data t = numcopy(b, i);
            while (abs(a) >= abs(t)) {
                if (a.op == t.op) a = a - t;
                else a = a + t;
                a.clearbackzero();
            }
        }
        return a;
    }
    int operator%(data a, int b) {
        data c(a.length());
        bool beginop = a.op;
        c.op = !(a.op ^ (b > 0));
        int r = 0;
        for (int i = c.length() - 1; i >= 0; i--) {
            r = r * 10 + a.num[i];
            c.num[i] = r / b;
            r %= b;
        }
        return r;
    }
    data operator^(data a, int b) {
        data ans(a.length() * b);
        ans = numtodata(1);
        while (b != 0) {
            if (b & 1) ans = ans * a;
            a = a * a;
            b >>= 1;
        }
        ans.clearbackzero();
        return ans;
    }
    data gcd(data a, data b) {
        if (b > a) return gcd(b, a);
        b.clearbackzero();
        if (b.is_zero()) {
            a.clearbackzero();
            return a;
        }
        a.clearbackzero();
        return gcd(b, a % b);
    }
}
using namespace Bignum;
```



<div style="page-break-after:always;"></div>










<div style="page-break-after:always;"></div>

## PART 2

**取整函數**

```cpp
floor();    // 向下
ceil();        // 向上
round();    // 四捨五入
fix();        // 向零
```

**二進制最高位**

```cpp
inline int _lg(ll x) {
    for (int i = 0; ; ++i)
        if ((1ll << i) >= x) return i;
}
```

**對數與指數**

```cpp
int p = 1, b = 0;
while (p * m <= n) {
    b += 1;
    p *= m;
}
// b = log_m(n), p = m^n
```

**整數與字符串相互轉換**

字符串轉整數

```cpp
ll s2i(string s) {
    ll ans = 0;
    for (auto i : s) ans = ans * 10 + i - '0';
    return ans;
}
```

整數轉字符串

```cpp
string i2s(ll n) {
    string s;
    while (n) s = (char)(n % 10 + 48) + s, n /= 10;
    return s;
} // to_string(n);
```

**進制轉換**

```cpp
int mod(int a, int b) {
    if (a % b == 0) return 0;
    else if (a >= 0) return a % b;
    else if (b >= 0) return a % b + b;
    else return a % b - b;
} // return a mod b; (maths)

int to10(string s, int r) {
    int num = 0;
    ll pow = 1;
    for (int i = s.size() - 1; i >= 0; --i) {
        int a = (s[i] >= 'A') ? (10 + s[i] - 'A') : (s[i] - '0');
        num += a * pow;
        pow *= r;
    }
    return num;
}

string from10(int num, int r) {
    if (num == 0) return "0";
    string ans;
    while (num) {
        int remainder = mod(num, r);
        ans = remainder < 10 ? char('0' + remainder) + ans : char('A' + remainder - 10) + ans;
        num = (num - remainder) / r;
    }
    return ans;
}
```

**随机數**

`rand()` 函數產生 `0 ~ RAND_MAX` 範圍内均匀分布的整數，其中 `RAND_MAX` 是和系统相关的一个固定值。

```cpp
#include <stdlib.h> 
#include <time.h> 
srand(time(nullptr)); // 設置随机數种子
rand(); // 产生一个随机數
int randoxNumber = rand() % b; // 产生 [0,b) 範圍内到随机數  
int randoxNumber = a + rand() % ( b -a ); // 产生 [a,b) 範圍内到随机數 
int randoxNumber = a + rand() % ( b - a +1 ); // 产生 [a,b] 範圍内到随机數 
double randoxNumber = rand() / RAND_MAX; // 产生 [0,1] 範圍内到随机小數 
double randoxNumber = rand() / ( RAND_MAX +1 ) // 产生 [0,1) 範圍内到随机小數 
```



<div style="page-break-after:always;"></div>









