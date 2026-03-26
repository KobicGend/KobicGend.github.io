

# 模板



[TOC]



## 头文件一览

```cpp
#include<bits/stdc++.h>
#include<iostream>
#include<iomanip>//输入输出
#include<algorithm>
#include<cmath>
#include<vector>
#include<utility>//pair; swap; hash(一般和unordered_map连用)
#include<cstring>//stoi(范围在int内的str->int转换)
#include<string>//to_string
#include<cstdio>
#include<set>
#include<map>
#include<unordered_map>
#include<unordered_set>
#include<deque>
#include<stack>
#include<queue>
#include<stdio.h>
#define endl '\n'
typedef long long ll;
using namespace std;
```

## 注意

+ **不开 long long 见祖宗**

+ **1 <<  i**：2 的 i 次方

+ 在竞赛中，一般认为计算机 $1s$ 能执行 $5\times10^8$ 次计算，由此，我们则可以得出在一般情况下，时间限制为 $1s$ ，时间复杂度和数据范围对应如下：

  $$\Theta(n)$$  $$n\le10^8$$
  $$\Theta(n\log n)$$   $n\leqslant10^6$
  $\Theta(n\sqrt n) $   $n\leqslant10^5$
  $\Theta(n^2)$   $n\leqslant5000$
  $\Theta(n^3)$   $n\leqslant300$
  $\Theta(2^n)$  $n\leqslant25$
  $\Theta(n!)$   $ n\leqslant11 $





## 一、输入输出

### I/O流控制符

下列控制符均需要头文件 `#include <iomanip>`，绝大多数具有保留效力，除了 `setw`：

```cpp
/* 控制浮点数值显示 */
double a = 22.0/7;
cout << fixed << setprecision(3) << a << endl; 		// 3.143 保留三位小数 %.3lf
cout << scientific << setprecision(2) << a << endl; // 3.143e+00 保留两位小数的科学计数法 %.2e

/* 设置值的输出宽度 */
cout << setw(8) << 10 << 20 << endl;				//       1020 設置宽度 %.*d
cout << setfill('*') << setw(8) << 10 << 20 << endl;// ******1020 设置填充字符
cout << left << setw(8) << 10 << 20 << endl;		// 10******20 左对齐 %-

/* 输出八进制数和十六进制数 */ 
cout << dec << 1001 << endl;					// 1001 十进制 %d
cout << hex << uppercase << 1001 << endl;		// 3E9  十六进制大写输出 %X
cout << hex << nouppercase << 1001 << endl;		// 3e9  十六进制小写输出 %x
cout << oct << 1001 << endl;					// 1751 八进制 %o

/* 强制输出小数点或符号 */
double b = 10.0/5;
cout << showpoint << b << endl;					// 2.00000 	%lf
cout << showpos << b << endl;					// +2.00000 %+lf
cout << noshowpoint << b << endl;				// 2 		%g
cout << noshowpos << b << endl;					// 2.00000  %lf
```

### 快读

```cpp
inline int read()
{
	int x = 0, f = 1; char ch = getchar();
	while (ch < '0' || ch>'9') { if (ch == '-') f = -1; ch = getchar(); }
	while (ch >= '0' && ch <= '9') { x = x * 10 + ch - 48; ch = getchar(); }
	return x * f;
}
```

### 取余快读

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



### 解绑输入输出流

```cpp
ios::sync_with_stdio(false);
cin.tie(0); cout.tie(0);
```



## 二、基础

### 枚举

#### 枚举排列

**标准模板库 `std::next_permutation()`**，需要头文件`<algorithm>`，用于调用下一个排列，时间复杂度 $\Theta(n!)$，能解决的数据范围在 $n\leqslant11$。

```c++
std::sort(a, a + n);
do {
	// doing
} while (std::next_permutation(a, a + n);
```

#### 枚举子集

时间复杂度 $\Theta(2^n)$，能解决的数据范围在 $n\leqslant25$。

```c++
for (int seq = 0; seq < (1ll << n); ++seq)
	for (int i = 0; i < n; i++)
		if (seq & (1ll << i)) {
			// doing
		}
```

这是「二进制法」，此外有「增量构造法」「位向量法」。

**分解和**

```c++
int H[maxN];
void Hdfs(int n, int k, int Hmin, int Hcur) {
	if (n <= 0 && Hcur == k) {
		// doing
	}
	for (int i = Hmin; i <= n; i++) {
		H[Hcur] = i;
		Hdfs(n - i, k, i, Hcur + 1);
	}
}
```

起始调用`Hdfs(n, k, 1, 0);`

### 二分

#### 数组的二分

见STL

#### 二分答案查找

```cpp
bool check(int ans){
    /*doing*/
    if(/*满足条件*/)return 1;
    else return 0;
}


int num = 0;
int left = 0;
int right = L;
int mid = (left + right) / 2;
while (right >= left) {
	if (check(mid)) {
		left = mid + 1;
	}
	else if (!check(mid)) {
		right = mid - 1;
	}
    mid = (left + right) / 2;
}
cout << mid << endl;
```

#### *小数的二分

```cpp
double left = 0;
double right = MAX;
double mid = (left + right) / 2.0;
while (right - left > 0.000001) {
	if (check(mid)) {
		left = mid;
	}
	else if (!check(mid)) {
		right = mid;
	}
    mid = (left + right) / 2.0;
}
cout << fixed << setprecision(n) << (double)(mid) << endl;
```

## 三、搜索

### DFS（Depth First Search）

#### 特点

* 优先深入当前路径，直到尽头，再回溯到最近的分叉点，探索未访问的路径。
* **非线性**：由于搜索可以随时回溯，DFS不保证线性遍历。
* **使用栈**：在实现中，DFS通常用栈来记住路径节点，这样可以回溯到上一个节点。

#### 思路

```cpp
int a[N][N];
int vis[N][N];
void dfs() {
	if (/*满足条件*/){
       /* 做相应处理：eg.添加到结果集合或者printf*/
        return;//目标态结束搜索
	}
	/*标记该节点被访问过;*/
	for i in /*下一层*/{
        if(/*满足条件*/)dfs(/*下一层*/);
	}
	return;//没有下层搜索节点，回溯
}
```

#### 全排列问题

```cpp
void dfs(int* a,int n,int cur) {
	if (cur > n) {
		for (int i = 1; i <= n; i++) {
			cout << setw(5) << a[i];
		}//全排列DFS
		cout << endl;
	}
	else for (int i = 1; i <= n; i++) {
		int ansf = 0;
		for (int j = 1; j < cur; j++) {
			if (i == a[j])
				ansf = 1;
		}
		if (!ansf) {
			a[cur] = i;
			dfs(a, n ,cur + 1);
		}
	}
}
```

#### 迷宫问题

```cpp
int dx[] = { 0,-1,0,1 };//左上右下
int dy[] = { -1,0,1,0 };
deque<string>result;

bool check( int x, int y) {
		return (x >= 1 && x <= n && y >= 1 && y <= m && a[x][y] == 1 && !book[x][y]);

}

void dfs(int x, int y, int xe, int ye,string path) {
	if (x == xe && y == ye) {
		result.push_back(path);
		return;
	}
	book[x][y] = 1;
	for (int i = 0; i < 4; i++) {
		int nx = x + dx[i];
		int ny = y + dy[i];

		if (check(nx, ny)) {
			dfs(nx, ny,xe,ye, path + "->(" + to_string(nx) + "," + to_string(ny) + ")");
		}
	}
	book[x][y] = 0;
}
```

### BFS





## 四、动态规划（DP）

#### DP：最长上升子序列

[VJwin5A - 最长上升子序列](https://www.luogu.com.cn/problem/B3637)

- **方法一**

  状态：$$dp_i$$ 表示以 $$a_i$$ 结尾的最长上升子序列的长度；

  状态方程：$$dp_i=\min\limits_{a_j<a_i}\big(dp_j+1\big)$$；

  时间复杂度：$$\Theta(n^2)$$。

  ```cpp
  int ans = 0;
  for (int i = 0; i < n; i++) {
  	dp[i] = 1;
  	for (int j = 0; j < i; j++) {
  		if (a[j] < a[i]) dp[i] = max(dp[i], dp[j] + 1);
  	}
  	ans = max(ans, dp[i]);
  }
  printf("%d\n", ans);
  ```

- **方法二**

  ```cpp
  int len = 0;
  for (int i = 0; i < n; i++) {
  	if (dp[len] < a[i]) dp[len++] = a[i];
  	else *std::lower_bound(dp + 1, dp + len + 1, a[i]) = a[i];
  }
  printf("%d\n", len);
  ```

变式一 - [VJwin5C - 导弹拦截](https://www.luogu.com.cn/problem/P1020)

- **题意** 将数列连续划分为不上升的子序列，求子序列最小个數。
- **思路** 由 $$\rm Dilworth$$ 定理（对于一个偏序集，最少链划分等于最长反链长度），要求 **不上升的子序列的最小个数**，只需要反过来求 **最长上升子序列的长度**。

变式一的变式 - [VJwin5B - 木棍加工](https://www.luogu.com.cn/problem/P1233)

- **题意** 将二维数组乱序划分为两个元甲、乙都不上升的子序列，求子序列最小个数。如 `(4,9),(5,2),(2,1),(3,5),(1,4)` 答案是 `2`，划分方式是 `(4,9),(3,5),(1,4)||(5,2),(2,1)`。
- **思路** 我们希望仿照上一题的方法找出最长上升子序列的长度，但是，谁上升？尝试甲或乙上升，但很快举出反例：`(1,4),(2,1),(3,5),(5,2),(4,9)`，这样答案是 `5`，不行；而甲与乙更不行…… 我們用 **化归** 的思想，固定一个变量，考虑另一个。将乙元素降序排列，一定符合要求，那么乙就是无关变量了，只看甲即可。
- **注意** 乙相同時需要把甲也按降序排列，保证符合条件的子数列尽可能长。$$\rm Hack$$ 数据：`(1,2),(2,2),(2,1)`，不按甲排序答案是 `2`，但正确答案是 `1`。

变式二 - [VJwin5D - 合唱队形](https://www.luogu.com.cn/problem/P1091)

- **题意** 最长中间高旁边减子序列的長度。
- **思路** 求每个数的以它为结尾的最长上升子序列和以它为开头的最长下降子序列的和的最大值。



### 背包

#### 01背包

```cpp
int V, n;
scanf("%d %d", &V, &n);
for (int i = 1; i <= n; i++) scanf("%d %d", &v[i], &w[i]);
for (int i = 1; i <= n; i++) { // 物品
	for (int j = V; j >= v[i]; j--) { // 空间
		dp[j] = max(dp[j], dp[j - v[i]] + w[i]);
	}
}
printf("%d\n", dp[V]);
```

记忆化搜索：

```cpp
int dfs(int pos, int V) {
	if (mem[pos][V] != -1) return mem[pos][V];
	if (pos == n + 1) return mem[pos][V] = 0;
	if (V >= v[pos]) return mem[pos][V] = max(dfs(pos + 1, V), dfs(pos + 1, V - v[pos]) + w[pos]);
	else return mem[pos][V] = dfs(pos + 1, V);
}

void eachT() {
	memset(mem, -1, sizeof mem);
	scanf("%d %d", &V, &n);
	for (int i = 1; i <= n; i++) scanf("%d %d", &v[i], &w[i]);
	printf("%d", dfs(1, V));
}
```



#### 二维费用背包

```cpp
int n, V, M;
scanf("%d %d %d", &n, &V, &M);
for (int i = 1; i <= n; i++) {
	scanf("%d %d %d", &w[i], &v[i], &m[i]);
}
for (int i = 1; i <= n; i++) { // 物品
	for (int j = V; j >= v[i]; j--) { // 空间
		for (int k = M; k >= m[i]; k--) { // 重量
			dp[j][k] = max(dp[j][k], dp[j - v[i]][k - m[i]] + w[i]);
		}
	}
}
printf("%d\n", dp[V][M]);
```

#### 分组背包

```cpp
int V, n;
scanf("%d %d", &V, &n);
for (int i = 1; i <= n; i++) {
	int x, y, z;
	scanf("%d %d %d", &x, &y, &z);
	v[z].push_back(x);
	w[z].push_back(y);
}
for (int i = 1; i <= n; i++) { // 物品
	for (int j = V; j >= 1; j--) { // 空間
		for (int k = 0; k < v[i].size(); k++) {
			if (j >= v[i][k]) dp[j] = max(dp[j], dp[j - v[i][k]] + w[i][k]);
		}
	}
}
printf("%d\n", dp[V]);
```



#### 混合背包（完全背包||多重背包）

```cpp
int V, N;
scanf("%d %d", &V, &N);
for (int i = 0; i < N; i++) {
    scanf("%d %d %d", &v[i], &w[i], &n[i]);
}

for (int i = 0; i < N; i++) {
	if (n[i] > 1) { // 多重背包
		int num = min(n[i], V / v[i]); // 可以放入的最大个數
		int k = 1; // 當前拆分个數 放入k个物品
		while (num > 0) {
			k = min(k, num);
			for (int j = V; j >= k * v[i]; j--) {
				dp[j] = max(dp[j], dp[j - k * v[i]] + k * w[i]);
			}
			num -= k;
			k *= 2;
		}

	} else if (n[i] == 1) { // 普通01背包
		for (int j = V; j >= v[i]; j--) {
			dp[j] = max(dp[j], dp[j - v[i]] + w[i]);
		}

	} else { // 完全背包
		for (int j = v[i]; j <= V; j++) {
			dp[j] = max(dp[j], dp[j - v[i]] + w[i]);
		}
	}
}
printf("%d\n", dp[V]);
```



#### 完全背包

```cpp
int V, n;
scanf("%d %d", &V, &n);
for (int i = 1; i <= n; i++) {
	scanf("%d %d", &v[i], &w[i]);
}
for (int i = 1; i <= n; i++) { // 物品
	for (int j = v[i]; j <= V; j++) { // 空間
		dp[j] = max(dp[j], dp[j - v[i]] + w[i]);
	}
}
printf("%d\n", dp[V]);
```

## 五、位运算

* 位运算符号

  `&`（与）：两个位都为1才为1

  > ```cpp
  > 0&0=0  0&1=0  1&0=0  1&1=1
  > ```
  >
  > 用途：
  >
  > 1）清零
  >
  > 如果想将一个单元清零，即使其全部二进制位为0，只要与一个各位都为零的数值相与，结果为零。
  >
  > 2）取一个数的指定位
  >
  > 比如取数 X=1010 1110 的低4位，只需要另找一个数Y，令Y的低4位为1，其余位为0，即Y=0000 1111，然后将X与Y进行按位与运算（X&Y=0000 1110）即可得到X的指定位。
  >
  > 3）判断奇偶
  >
  > 只要根据最未位是0还是1来决定，为0就是偶数，为1就是奇数。因此可以用if ((a & 1) == 0)代替if (a % 2 == 0)来判断a是不是偶数。

  `|`（或）：两个位都为0才为0

  >```cpp
  >0|0=0  0|1=1  1|0=1  1|1=1
  >```
  >
  >总结：参加运算的两个对象只要有一个为1，其值为1。
  >
  >例如：3|5即 0000 0011| 0000 0101 = 0000 0111，因此，3|5的值得7。　
  >
  >注意：负数按补码形式参加按位或运算。
  >
  >1）常用来对一个数据的某些位设置为1
  >
  >比如将数 X=1010 1110 的低4位设置为1，只需要另找一个数Y，令Y的低4位为1，其余位为0，即Y=0000 1111，然后将X与Y进行按位或运算（X|Y=1010 1111）即可得到。

  `^`（异或）：两个位相同为0相异为1

  >```cpp
  >0^0=0  0^1=1  1^0=1  1^1=0
  >```
  >
  >总结：参加运算的两个对象，如果两个相应位相同为0，相异为1。
  >
  >性质:
  >
  >- 1、交换律
  >- 2、结合律 (a ^ b) ^c == a^ (b ^ c)
  >- 3、对于任何数x，都有 x ^ x = 0，x ^ 0 = x
  >- 4、自反性: a ^ b ^ b = a ^ 0 = a;
  >
  >用途：
  >
  >1）翻转指定位
  >
  >比如将数 X=1010 1110 的低4位进行翻转，只需要另找一个数Y，令Y的低4位为1，其余位为0，即Y=0000 1111，然后将X与Y进行异或运算（X^Y=1010 0001）即可得到。
  >
  >2）与0相异或值不变
  >
  >例如：1010 1110 ^ 0000 0000 = 1010 1110
  >
  >3）交换两个数
  >
  >```cpp
  >void Swap(int &a, int &b){ 
  >    if (a != b){
  >        a ^= b;
  >        b ^= a;
  >        a ^= b;
  >    }
  >}

  `~`（取反）：0变1,1变0

  >```cpp
  >~1=0
  >~0=1
  >```
  >
  >总结：对一个二进制数按位取反，即将0变1，1变0。
  >
  >用途：
  >
  >1）使一个数的最低位为零
  >
  >使a的最低位为0，可以表示为：a & ~ 1。~1的值为 1111 1111 1111 1110，再按"与"运算，最低位一定为0。因为" ~"运算符的优先级比算术运算符、关系运算符、逻辑运算符和其他运算符都高。

  `<<`（左移）：各二进制位全部左移若干位，高位丢弃，低位补0

  > 定义：将一个运算对象的各二进制位全部左移若干位（左边的二进制位丢弃，右边补0）。
  >
  > 设 a=1010 1110，a = a<< 2 将a的二进制位左移2位、右补0，即得a=1011 1000。
  >
  > 若左移时舍弃的高位不包含1，则每左移一位，相当于该数乘以2。

  `>>`（右移）：各二进位全部右移若干位，对无符号数，高位补0，有符号数，各编译器处理方法不一样，有的补符号位（算术右移），有的补0（逻辑右移）

  >定义：将一个运算对象的各二进制位全部左移若干位（左边的二进制位丢弃，右边补0）。
  >
  >设 a=1010 1110，a = a << 2 将a的二进制位左移2位、右补0，即得a=1011 1000。
  >
  >若左移时舍弃的高位不包含1，则每左移一位，相当于该数乘以2。

```cpp
-a = ~a + 1; 				// 取负数
if (a & 1); 				// 判断奇偶 正奇数或负偶数为1
a >> (k-1) & 1; 			// 取int型变量的右数第k位
a = a | (1 << k-1);			// 将int型变量的右数第k位置取1
a = a << k | a >> 16-k;		// int型变量循环左移k次, 设 sizeof(int)=16
a = a >> k | a << 16-k;		// int型变量循环右移k次, 设 sizeof(int)=16
if ((!(a & (a - 1))) && a);	// 判断一个整数是不是2的幂
x ^= y; y ^= x; x ^= y;		// 交换两数
a & (-a);					// 最低位的1以及它后边的0构成的数字
```

## 六、STL

### string（字符串）

```cpp
#include <string>
std::string s = "123456789";
std::string s1(s); 				// "123456789"
std::string s2(s, 1, 3);		// "234"
std::string s3("123456789", 2);	// "12"
std::string s4(s, 2); 			// "3456789"
std::string s5(5, '9');			// "99999"

std::cin >> n;
getchar(); // '\n'
getline(std::cin, s);

if (a < b); // 按照字典序比较

s.size(); // 长度 = s.length()

s.push_back(char); // 添加
s.insert(s.begin(), char);
s.append(str);
s = 'c' + s + 'hi';

s.erase(iterator); // 删除
s.erase(iterator1, iterator2);
s.erase(pos, len);

s.replace(pos, len, str); // 替换
s.replace(pos, len, num, char);
s.replace(iterator1, iterator2, str);

transform(s.begin(), s.end(), s.begin(), ::tolower); // 转换为小写
transform(s.begin(), s.end(), s.begin(), ::toupper); // 转换为大写

s.substr(pos, len); // 截取子串

s.find(str/char, pos); s.rfind(str/char, pos); // 查找str 返回pos或-1
s.find_first_of(str, pos); // 查找str的字符
s.find_first_not_of(str, pos);
s.find_last_of(str, pos);
s.find_last_not_of(str, pos);
```

<div style="page-break-after:always;"></div>

### stack（栈）

```cpp
#include <stack>
std::stack<int> s;

s.top(); s.push(x); s.pop();
s.empty(); s.size(); // 没有 s.clear();

for (int i = 0; i < 10; i++) s.push(i);
while (!s.empty()) std::cout << s.top() << " ", s.pop();

int s[10], pos = 0; // 使用数组模拟
for (int i = 0; i < 10; i++) s[pos++] = i;
while (pos) std::cout << s[pos--];
```

### queue（队列）

```cpp
#include <queue>
std::queue<int> q;

q.front(); q.back();
q.push(x); q.pop();
q.empty(); q.size(); // 没有 q.clear();

for (int i = 0; i < 3; i++) q.push(i);
while (!q.empty()) std::cout << q.front() << " ", q.pop();

int q[3], ff = 0, bb = 0; // 使用数组模拟
for (int i = 0; i < 3; i++) q[bb++] = i;
while (ff < bb) std::cout << q[ff++] << " ";
```

#### priority_queue（优先队列）

```cpp
#include <queue>

std::priority_queue<int> q; 							// 升序 优先取最大值
std::priority_queue<int, vector<int>, greater<int>> q; 	// 降序 优先取最小值
struct node {
    int x, y;
    bool operator < (const node& b) const {
        return x < b.x; // 降序 优先取最小值
    }
};
std::priority_queue<node> q;

q.front(); q.back();
q.push(x); q.pop();
q.empty(); q.size(); // 没有 q.clear();
```

<div style="page-break-after:always;"></div>

#### deque（双端队列）

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

##### 单调队列：滑动窗口

```cpp
std::deque<int> Q; 								// 储存编号
for (int i = 1; i <= n; i++) {
	if (!Q.empty() && i - Q.front() >= m)
		Q.pop_front(); 							// 毕业
	while (!Q.empty() && a[Q.back()] < a[i])	//（求区间最小值改成>即可）
		Q.pop_back(); 							// 比新生弱的当场退役
	Q.push_back(i); 							// 新生入队
	if (i >= m - 1)
		printf("%d\n", a[Q.front()]);//如果当前位置i大于等于m-1（即窗口大小为m时），输出队列头部元素对应的值a[Q.front()]，即当前窗口内的最大值
}
```

### set（集合）

```cpp
#include <set>
std::set<int> s;
std::set<int, greater<int> > s2; // 降序

s.insert({ x }); // 插入元素
s.begin(); s.end();
s.rbegin(); s.rend();
s.find(key); s.count(key); // 前者返回迭代器 后者是bool
s.erase(key); s.erase(it); s.erase(first,last);
s.size(); s.empty(); s.clear();
s.lower_bound(key); s.upper_bound(key);

for (std::set<int>::iterator it = s.begin(); it != s.end(); ++it)
	std::cout << *it << ' ';
for (auto i : s)
	std::cout << i << ' ';
```

另有：`multiset`（元素可以重复且有序）、`unordered_set`（元素不可重复且无序）、`unordered_multiset`（元素可以重复且无序）

<div style="page-break-after:always;"></div>

### map（映射）

```cpp
#include <map>

std::map<int, int> mp;

mp.insert(std::pair<int, int> (34, 27));
mp.insert(std::make_pair(34, 27));
mp.insert({34, 27});
mp.erase(it);			// 删除迭代器 并返回迭代器的下一个位置
mp.erase(key);			// 删除键对应的迭代器 O(logN)
mp.erase(first,last);	// 删除左闭右开区间迭代器对应的键和值 O(last−first)
mp.find(key); 	// 返回迭代器或mp.end()(O(logN)) 后者返回
mp.count(key); // 返回bool
mp.begin();	mp.end();	// 指向第一个元素/尾部(最后一个元素的下一个)的迭代器
mp.rbegin(); mp.rend();	// 指向最后一个元素/第一个元素的前一个的逆向迭代器
mp.empty(); mp.size(); mp.clear();
mp.lower_bound(key);	// 返回一个指向键值>=key的第一个元素的迭代器
mp.upper_bound(key);	// 返回一个指向键值>key的第一个元素的迭代器

std::cout << mp[3427];
std::map<int, int>::iterator it = mp.find(3427);
std::cout << it->first << ' ' <<  it->second << '\n;

for (std::map<int, int>::iterator it = mp.begin(); it != mp.end(); ++it)
	std::cout << it->first << ' ' << it->second << '\n'; // 正向遍历
for (auto i : mp)
    std::cout << i.first << " " << i.second << '\n'; // 正向遍历
for (std::map<int, int>::iterator it = mp.rbegin(); it != mp.rend(); ++it)
	std::cout << it->first << ' ' << it->second << '\n'; // 逆向遍历
```

**map**：内部用 **红黑树** 实现，具有 **自动排序** 功能。

- 优点：内部用红黑树实现，内部元素具有有序性，查询删除等操作复杂度为 O(logN)。

- 缺点：占用空间，红黑树里每个节点需要保存父子节点和红黑性质等信息，空间占用较大。

**unordered_map**：内部用 **哈希表** 实现，内部元素无序杂乱。

- 优点：查找速度快（适用于大量的查询操作）。
- 缺点：建立哈希表比较耗时。



### pair（双胞胎）

```cpp
std::pair<int, int> p[maxN];
for (auto& it : p) it.first = read(), it.second = read();
for (auto it : p) std::cout << it.first << it.second;
for (int i = 0; i < 10; ++i) std::cout << p[i].first << p[i].second;
```

<div style="page-break-after:always;"></div>

## 七、并查集

### 路径压缩

```cpp
int fa[MAXN];
inline void init(int n) {
	for (int i = 1; i <= n; i++) fa[i] = i;
}
int find(int x) {
    return x == fa[x] ? x : (fa[x] = find(fa[x]));
}
inline void uno(int x, int y) {
  	fa[find(x)] = find(y);
}
```

### 按秩合并

```cpp
inline void init(int n) {
    for (int i = 1; i <= n; ++i) fa[i] = i, r[i] = 1;
}
int find(int x) {
    return x == fa[x] ? x : (fa[x] = find(fa[x]));
}
inline void uno(int i, int j) {
    int x = find(i), y = find(j);
    if (r[x] <= r[y]) fa[x] = y;
    else fa[y] = x;
    if (r[x] == r[y] && x != y) r[y]++;
}
```

### 带权并查集

```cpp
inline void init(int n) {
	for (int i = 1; i <= n; i++)
        fa[i] = i, num[i] = 1, front[i] = 0;
}
int find(int x) {
	if (fa[x] != x) {
		int fa_x = fa[x];
		fa[x] = find(fa[x]);
		front[x] += front[fa_x]; // 依题而定
	}
	return fa[x];
}
inline void uno(int x, int y) {
	int fa_x = find(x), fa_y = find(y);
	front[fa_x] += num[fa_y], num[fa_y] += num[fa_x], num[fa_x] = 0;
    	// 将x移动至y队列的后面 同样依题而定
	fa[fa_x] = fa_y;
}
```



## 八、数论

### 求组合数

#### 组合数的定义

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

时间复杂度 $$\Theta(m)$$。



#### 横向一维递推

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

在时间复杂度 $$\Theta(n)$$ 內计算 $$C_n^0 \sim C_n^n$$。



#### 杨辉三角二维递推

$$
C_n^m=C_{n-1}^{m}+C_{n-1}^{m-1}
$$

```cpp
ll c[maxN][maxN];
void gecC(int n, int p) {
	for (int i = 0; i <= n; ++i) {
        c[i][0] = 1; c[i][i] = 1;
        for (int j = 1; j < i; ++j)
            c[i][j] = (c[i-1][j-1] + c[i-1][j]) % p;
	}	
}
```

在时间复杂度 $$\Theta(n^2)$$ 內计算 $$C_0^0 \sim C_n^n$$。

#### 卢卡斯定理

对于 $m,n$ 和素数 $p$， $C_m^n\equiv\prod_{i=0}^{k}C_{m_i}^{n_i}\pmod{p}$，其中 $$m=m_kp^k+\cdots +m_1p+m_0,~n=n_kp^k+\cdots +n_1p+n_0$$ 是 $$m$$ 和 $$n$$ 的 $$p$$ 进制展开。
$$
C_m^n\equiv C_{m\bmod p}^{n \bmod p}\cdot C_{\lfloor m/p\rfloor}^{\lfloor n/p\rfloor}\pmod{p}
$$

```cpp
ll fact[maxN];
void dofact(int p) {
	fact[0] = fact[1] = 1;
	for (int i = 2; i <= p; ++i) fact[i] = fact[i - 1] * i % p;
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

时间复杂度 $\Theta(p)$。

### 判断素数

```cpp
bool isPrime(ll x){
	if(x<2)return 0;
	for(ll i = 2; i<=sqrt(x);i++){
		if(x % i == 0)return 0;
	}
	return 1;
} 
```

### 素数筛（欧拉筛)

```cpp
bool isntPrime[maxN];
std::vector<int> prime;
void doPrime(int mx) {
	for (int i = 2; i <= mx; i++) {
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
doPrime(); // 预处理
if (!isntPrime[n]) {	
	// n是素数
} 
```



### 快速幂

$$
a_n = 

\begin{cases}

a^{n-1}\cdot a, & \text{if } n \text { is odd} \\ 

a^{\frac{n}{2}}\cdot a^{\frac{n}{2}}, &\text{if } n \text { is even but not 0}\\ 

1,&\text{if } n=0

\end{cases}
$$



```cpp
inline ll qpow(ll a, ll k) {
	ll ans = 1;
	while (k) {
		if (k & 1) ans = ans * a % p;
		a = a * a % p;
		k >>= 1;
	}
	return ans;
}//return a^n;
```

### 矩阵快速幂

求斐波那契数列第 $n$ 项 $$F_n$$。

设 $$\bold{A}=\begin{bmatrix}0 &1\\ 1 & 1\end{bmatrix}$$，有 $$\bold{A}\begin{bmatrix}F_n\\ F_{n+1}\end{bmatrix} = \begin{bmatrix}F_{n+1}\\ F_n+F_{n+1}\end{bmatrix}=\begin{bmatrix}F_{n+1}\\ F_{n+2}\end{bmatrix}$$，于是 $$\begin{bmatrix}F_n\\ F_{n+1}\end{bmatrix}=\bold{A}^{n-1}\begin{bmatrix}1\\ 1\end{bmatrix}$$。

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
    matrix ans(1, 0, 0, 1); //单位矩阵
    while (n) { if (n & 1) ans = ans * a; a = a * a; n >>= 1; }
    return ans;
}
```

使用：

```cpp
matrix M(0, 1, 1, 1); 			// 广义：M(0, 1, q, p);
matrix ans = qpow(M, n - 1);
print((ans.a1 + ans.a2) % MOD);	// 广义：((a1 * ans.a1 + a2 * ans.a2) % MOD)
```

### 快速乘

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

### GCD / EXGCD

#### 欧几里得辗转相除

```cpp
ll gcd(ll a, ll b) {
	if (b == 0)return a;
	else return gcd(b, a % b);
    //return b == 0 ? a ： gcd(b,a%b);
}
```

#### 解同余方程 $$\boldsymbol{ax \equiv c \pmod b\iff ax + by = c}$$

```cpp
ll exgcd(ll a, ll b, ll& x, ll& y) {
	if (b == 0) { x = 1; y = 0; return a; }
	ll d = exgcd(b, a % b, y, x);
	y -= (a / b) * x;
	return d;
}

void liEq(ll a, ll b, ll c) {
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

### 计算约数个数 & 约数之和

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
} // x的约数个数

int sumOfDivisors(int x) {

} // x的约数之和
```



<div style="page-break-after:always;"></div>

### 数论倒数

#### 一个数的数论倒数 $$\boldsymbol{a^{-1}\pmod p}$$

首先注意 $$a$$ 必须与 $$p$$ 互素，否则数论倒数不存在。

若 $$p$$ 是素数：

```cpp
int inv(int n, int p) {
	return qpow(n, p-2);
} // a_{-1} mod p (p是素数)
```

一般情況：

```cpp
int inv(int n, int p) {
	return liEq(a, p, 1);
} // a_{-1} mod p (无限制)
```



#### 一系列数的数论倒数

```cpp
ll inv[maxN];
ll doInv(ll a, ll p) {
	a %= p;
	if (a == 0) return -1; // 不存在
	if (a == 1) return 1;
	if (inv[a]) return inv[a];
	return inv[a] = (p - p / a) * doInv(p % a, p) % p;
} // a_{-1} mod p (p无限制)
```

从 $$1$$ 到 $$n$$ 的连续自然数的数论倒数（$$n<p\and p$$ 是素数）：

```cpp
ll inv[maxN];
inline void doinv(ll n, int p) {
	inv[1] = 1;
	for (int i = 2; i <= n; ++i) {
		inv[i] = (p - p / i) * inv[p % i] % p;
	}
}
```

## 九、其他

#### 整数与字符串相互转换

字符串转整数

```cpp
ll s2i(string s) {
	ll ans = 0;
	for (auto i : s) ans = ans * 10 + i - '0';
	return ans;
}
```

整数转字符串

```cpp
string i2s(ll n) {
	string s;
	while (n) s = (char)(n % 10 + 48) + s, n /= 10;
	return s;
} // to_string(n);
```



#### 随机数

`rand()` 函数产生 `0 ~ RAND_MAX`范围内均匀分布的整数，其中 `RAND_MAX` 是和系统相关的一个固定值。

```cpp
#include <stdlib.h> 
#include <time.h> 
srand(time(nullptr)); // 设置随机数种子
rand(); // 产生一个随机数
int randoxNumber = rand() % b; // 产生 [0,b) 范围内的随机数  
int randoxNumber = a + rand() % ( b -a ); // 产生 [a,b) 范围内的随机数 
int randoxNumber = a + rand() % ( b - a +1 ); // 产生 [a,b] 范围内的随机数 
double randoxNumber = rand() / RAND_MAX; // 产生 [0,1] 范围内的随机小数
double randoxNumber = rand() / ( RAND_MAX +1 ) // 产生 [0,1) 范围内的随机小数
```

