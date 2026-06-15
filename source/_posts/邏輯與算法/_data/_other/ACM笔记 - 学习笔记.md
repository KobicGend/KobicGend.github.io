---
title: 'ACM笔记 - 学习笔记'
tags:
  - ACM
  - 算法
  - 筆記
---

# `ACM` 备考笔记

## PART 1 注意事项

### 〇、    考试技巧

代码在本地运行通过后再提交，尽量多测试一些数据。

题目难度可能与题目出现的顺序无关，可以优先考虑尝试更多人通过的题目。

常用头文件：

```c++
#include <cstdio>
#include <iostream>
#include <algorithm>
#include <cstring>
#include <string>

using namespace std;
```

常用开头部分：

```c++
typedef long long ll;
const int maxN = 1e5 + 7;
const int INF = 1e9 + 7, MOD = 998244353;
int a[maxN];
```

常用代码：

```c++
scanf("%d %d", &n, &m);
for (int i = 0; i < n; ++i) {
    scanf("%d", &a[i]);
}
```

关于时间复杂度

在竞赛中，一般认为计算机 $1s$ 能执行 $5\times10^8$ 次计算，由此，我们则可以得出在一般情况下，时间限制为 $1s$，时间复杂度和数据范围对应如下：

$$\Theta(n)$$ 的算法能解决的数据范围在 $$n\le10^8$$
$$\Theta(n\log n)$$ 的算法能解决的数据范围在 $n\leqslant10^6$
$O(n\sqrt n) $ 的算法能解决的数据范围在 $n\leqslant10^5$
$O(n^2)$ 的算法能解决的数据范围在 $n\leqslant5000$
$O(n^3)$ 的算法能解决的数据范围在 $n\leqslant300$
$O(2^n)$ 的算法能解决的数据范围在 $n\leqslant25$
$O(n!)$ 的算法能解决的数据范围在 $n\leqslant11$



### 一、    低级错

#### 1.    编译器查不出来的代码错误

这些错误在编译时不会报错，但是运行结果会很离谱，检查时往往会被忽视。

##### (1)    输入时的取地址&

在字符串输入时不需要：

```c++
char str[1005];
scanf("%s", str);
```

##### (2)    判断语句的==

(3)    ...

#### 2.    初始化

循环用的数据每次循环开始时需要初始化。

#### 3.    输出的格式

每组测试数据后加"\n"

#### 4.    关注数据大小

##### int的范围

有时int（10^4^级别，具体地说是32768）并不足够，需要使用long long，这时输入输出需要同步改为"%lld"。

### 二、    特例

注意0、1、2、n-1、n的情况可能需要单独列出。

<div style="page-break-after:always;"></div>

## PART 2 系统化学习笔记

### 第二章 基本数据类型

#### 数据类型范围

| 类型           | 存储大小               | 值范围                                                     | 精度        |
| -------------- | ---------------------- | ---------------------------------------------------------- | ----------- |
| char           | 1 字节                 | -128 到 127 或 0 到 255                                    |             |
| unsigned char  | 1 字节                 | 0 到 255                                                   |             |
| signed char    | 1 字节                 | -128 到 127                                                |             |
| int            | 2 字节<br />或 4 字节  | -32,768 到 32,767 <br />或 -2,147,483,648 到 2,147,483,647 |             |
| unsigned int   | 2 字节 <br />或 4 字节 | 0 到 65,535 <br />或 0 到 4,294,967,295                    |             |
| short          | 2 字节                 | -32,768 到 32,767                                          |             |
| unsigned short | 2 字节                 | 0 到 65,535                                                |             |
| long           | 4 字节                 | -2,147,483,648 到  2,147,483,647                           |             |
| unsigned long  | 4 字节                 | 0 到 4,294,967,295                                         |             |
| float          | 4 字节                 | 1.2E-38 到 3.4E+38                                         | 6 位有效位  |
| double         | 8 字节                 | 2.3E-308 到  1.7E+308                                      | 15 位有效位 |
| long double    | 16 字节                | 3.4E-4932 到  1.1E+4932                                    | 19 位有效位 |

#### sizeof

用sizeof确定某数据类型的字节长度

E.g.

```c++
cout << sizeof(int) // O:4
```

#### typedef

用typedef为一个已有的类型名提供一个同义词

E.g.

```c++
typedef int INT, integer;
INT a;
integer a;
```

#### 字面量

##### 实型数

```c++
34.5f        // float (单精度型)
34.5F        // float (单精度型)
34.5        // double (双精度型) (默认)
34.5l        // long double (长双精度型)
34.5L        // long double (长双精度型)
```

##### 特殊字符

```c++
\a        // 响铃
\n        // 换行
\t        // 制表符
\v        // 竖向退格
\b        // 退格
\r        // 回车
```

##### 枚举符

```c++
enum COLOR{ RED = 100, GREEN, BLUE = 200 }; // GREEN = 101
COLOR paint = GREEN;
```

枚举类型名不是变量名，不占内存空间。

#### 常量

```c++
const float pi = 3.1415926;
```

程序对常量只读，不能修改。

在C++中，常量定义用const，不用#define。后者不是一个具有一定类型的变量名，随后的编译无法发现有它引起的数据类型误用的错误。

#### I/O流

##### 控制符

| I/O流控制符     | 描述             | C格式符 |
| --------------- | ---------------- | ------- |
| ios::fixed      | 固定的浮点显示   | %9.f    |
| ios::scientific | 指数表示         | %e      |
| ios::left       | 左对齐           | %-      |
| ios::right      | 右对齐           |         |
| ios::skipws     | 忽略前导空白     |         |
| ios::uppercase  | 16进制数大写输出 | %X      |
| ios::lowercase  | 16进制小写输出   | %x      |
| ios::showpoint  | 强制显示小数点   | %.6f    |
| ios::showpos    | 强制显示符号     | %+      |

```c++
#include <iomanip>        // 下表所列的控制符均需要这个头文件
```

| I/O流控制符     | 描述            | C格式符 |
| --------------- | --------------- | ------- |
| dec             | 置基数为10      | %d      |
| hex             | 置基数为16      | %X或%x  |
| oct             | 置基数为8       | %o      |
| setfill(c)      | 设填充字符为c   |         |
| setprecision(n) | 设显示精度为n位 |         |
| setw(n)         | 设域宽为n个字符 |         |

控制浮点数值显示：

```c++
a = 22.0/7;
cout << a << endl;                                // 3.14286 默认保留六位有效数字
cout << setprecision(3) << a << endl;            // 3.14 保留三位有效数字
cout << fixed << setprecision(3) << a << endl;     // 3.143 保留三位小数
cout << scientific << a << endl;                 // 3.143e+00 科学计数法
cout << setprecision(2) << a*10 << endl;        // 3.14e+01 保留两位小数的科学计数法
// 通过上述各例可以看出，如果未加声明是fixed或scientific，或未加声明setprecision的位数，则沿用前一次的设置（下称“具有保留效力”）
```

设置值的输出宽度：

```c++
cout << 1 << setw(8) << 10 << 20 << endl;        // 1      1020 其中1和10之间有6个空格
// setw不具有保留效力
cout << setfill('*')
     << 1 << setw(8) << 10 << 20 << endl;        // 1******1020 设置了填充字符
cout << left
     << 1 << setw(8) << 10 << 20 << endl;        // 110******20 左对齐
```

输出八进制数和十六进制数：

```c++
cout << dec << 1001 << endl;                    // 1001 十进制
cout << hex << 1001 << endl;                    // 3e9 十六进制
cout << hex << uppercase << 1001 << endl;        // 3E9 十六进制大写输出
cout << oct << 1001 << endl;                    // 1751 八进制
// 这些都具有保留效力
```

强制输出小数点或符号：

```c++
cout << 10.0/5 << endl;                            // 2
cout << showpoint << 10.0/5 << endl;            // 2.00000
cout << showpos << 10.0/5 << endl;                // +2.00000
// 这两个都具有保留效力，如果需要取消，使用noshowpoint和noshowpos
```

### 第三章 表达式和语句

#### 表达式

规律：

1. 结合方向只有三个是从右往左，其余都是从左往右。
   所有双目运算符中只有赋值运算符的结合方向是从右往左。
   另外两个从右往左结合的运算符也很好记，一个是单目运算符，一个是三目运算符。
2. 对于优先级：算术运算符 > 关系运算符 > 逻辑运算符 > 赋值运算符。逻辑运算符中“逻辑非 !”除外。
3. 逗号运算符的优先级最低。
4. C语言中有且只有一个三目运算符。

##### 一些容易出错的优先级问题

1. .的优先级高于*（->操作符用于消除这个问题）
2. []高于*
3. 函数()高于*
4. ==和!=高于位操作
5. ==和!=高于赋值符
6. 算术运算符高于位移运算符
7. 逗号运算符在所有运算符中优先级最低

##### 其它注意点

```c++
float a = 5/2;                // a的值为2，因为5/2为整型除以整型，其结果还是整型
(a = max(5,7)) += 3;        // 等价于a = max(5,7) + 3，因为赋值表达式有具体的值，即左值
```

#### 类型转换

```c++
char -> short int -> int -> long int -> long long int -> float -> double -> long double
unsigned char -> unsigned int -> unsigned int -> unsigned long -> unsigned long long -> float -> double -> long double
```

类型转换是按照运算顺序逐步转换的：

```c++
int b = 234*456/6;            // 按照运算顺序先计算234*456=106704超过了int范围会取模截断为-24368，最终结果为-4061
int b = 234*456L/6;            // 建议的修改方式
int b = long(234*456)/6;    // 错误的修改方式，这时两个int值相乘的类型仍然为int会截断
```

#### 自增减

前增量：先将变量增一，使其实体发生变化，然后将变量对应的实体作为表达式结果，即先做+1运算。

后增量：先将变量的值（仅仅是值，不是实体）作为表达式的值确定下来，再将变量增一，实体值发生变化，即先做赋值运算。

即：作为表达式的结果，前增量返回的是左值，后增量返回的不是左值。

```c++
b = ++a;        // 等价于a++; b=a;
c = a++;        // 等价于c=a; a++;
++(++a);        // 正确
++(a++);        // 错误，后增量返回的不是左值
a = 3++;        // 错误，3不是左值
```

在一些上古的程序设计书籍（以 C 语言为主）中会提及，上面的 for 循环，用++i 更好，使用++i的for循环运行时间相较于使用i++的for循环要快一点。这是因为i++是在使用当前值之后再+1，需要一个临时的变量来转存。但如今通过jvm进行编译优化后，不论是i++还是++i，最终执行的方式都是++i，因此执行效率是相同的。

一些很无聊的判断题：

```c++
c = a++b;        // 错误，编译接收a ++ b
c = a+++b;        // 正确，编译接收a ++ + b
c = a++++b;        // 错误，编译接收a ++ ++ b，应写为a+++ + b
c = a+++++b;    // 错误，编译接收a ++ ++ + b，应写为a++ + ++b
```

#### 求值次序与副作用

##### 求值次序

编译器在求解表达式时，首先要对表达式进行解析。在符合优先级和结合性的前提下，不同编译器在解析时可能存在差异，使得求值次序不同，将导致结果不同。

例如，

```c++
int a = 2, b = 5, c;
c = a*b + (++a) + (b=10);
```

三个同级运算中，是先算a*b，还是++a，还是b=10，其次再算哪个？

C语言的标准对表达式中各操作数的求值次序没有做统一规定。对于VC++，是按照从前向后的顺序进行，则上述表达式的结果是23；而对有的C++编译器，则是从后向前进行，结果是43。

##### 副作用

如果某个操作数经历了求值运算，那么这个求值过程可能影响到其他操作数的值，这时就会产生出乎意料的结果。由于编译器有求值次序，因此对于复合表达式，交换律不一定成立。

上例中，求表达式b=10改变了变量b的值，而求++a则改变了a的值，这些都将影响到表达式a*b的值，这就是所谓的副作用。

##### 副作用的消除

求值次序带来副作用的主要原因是使用复合表达式，如果将复合表达式分开写成若干个简单表达式，就可以有效消除副作用。

例如，可将上式按照从前向后的次序写成：

```
c = a*b;
++a;
b=10;
c = c+a+b;
```

或：

```
++a;
b = 10;
c = a*b + a + b;
```

<div style="page-break-after:always;"></div>

## PART 3 优化算法

### 第九讲    前缀和与差分

前缀和是指某序列的前n项和，可以把它理解为数学上的数列的前n项和，而差分可以看成前缀和的逆运算。

#### 一维前缀和

- 预处理：

  ```c++
  s[i] = s[i-1] + a[i];
  ```

  时间复杂度为O(n)。

- 查询：

  ```c++
  s[r] - s[l-1];
  // 表示a[l] + a[l+1] + ... + a[r]
  ```

  时间复杂度为O(1)。

#### 一维差分

- 预处理：

  ```c++
  b[i] = a[i] - a[i-1];
  ```

  时间复杂度为O(mn)。

- 操作：

  ```c++
  b[l] += c, b[r+1] -= c;
  // 给a数组中的[l,r]区间中的每一个数都加上c
  ```

  时间复杂度为O(2)。

- 查询：

  ```c++
  a[i] = a[i-1] + b[i];
  ```

  时间复杂度为O(1)。

#### 二维前缀和

- 预处理：

  ```c++
  s[i][j] = s[i-1][j] + s[i][j-1] - s[i-1][j-1] + a[i][j];
  // s[i][j]表示前i行前j列所有元素之和
  ```

  时间复杂度为O(mn)。

- 查询：

  ```c++
  s[x2, y2] - s[x1-1, y2] - s[x2, y1-1] + s[x1-1, y1-1];
  // 表示以(x1, y1)为左上角，(x2, y2)为右下角的子矩阵的和
  ```

  时间复杂度为O(1)。

#### 二维差分

- 预处理：

  ```c++
  b[i][j] = a[i][j] - a[i-1][j] - a[i][j-1] + a[i-1][j-1];
  ```

  时间复杂度为O(mn)。

- 操作：

  ```c++
  b[x1][y1] += c; b[x1][y2+1] -= c;
  b[x2+1][y1] -= c; b[x2+1][y2+1] += c;
  // 给a数组中的[(x1,x2),(y1,y2)]方阵中的每一个数都加上c
  ```

  时间复杂度为O(4)。

- 查询：

  ```c++
  a[i][j] = b[i][j] + b[i-1][j] + b[i][j-1] - b[i-1][j-1];
  ```

  时间复杂度为O(1)。

<div style="page-break-after:always;"></div>

### 第十讲    排序

#### 一、    冒泡排序法

- **基本思想**：反复交换两数。

  ```c++
  void BubbleSort (int* a, int n) {
      for (int i = 0; i < n-1; ++i) {
          for (int j = 0; j < n-1; ++j) {
              if (a[j] > a[j+1]) {
                  swap(a[j], a[j+1]);
                  flag = 1;
              }
          }
      }
  }
  ```

- **时间复杂度**：O(n^2)。
  
- **问题**：数据的顺序排好之后，冒泡算法仍然会继续进行下一轮的比较，后面的比较没有意义的。
  
- **优化方案**：设置标志位flag，如果发生了交换flag设置为true；如果没有交换就设置为false。这样当一轮比较结束后如果flag仍为false，即：这一轮没有发生交换，说明数据的顺序已经排好，没有必要继续进行下去。

  ```c++
  void BubbleSort (int* a, int n) {
      for (int i = 0; i < n-1; ++i) {
          bool flag = 0;
          for (int j = 0; j < n-1; ++j) {
              if (a[j] > a[j+1]) {
                  swap(a[j], a[j+1]);
                  flag = 1;
              }
          }
          if (!flag) return;
      }
  }
  ```

#### 二、    桶排序

- 空间换时间：需开辟数据取值范围大小的空间。

- 代码：

  ```c++
  const int maxN = 1e5+10;
  int b[maxN];
  
  void doing (int* a) {
      for (int i = 0; i < maxN; ++i) {
          while (b[i]--) {
              printf("%d ",i);
          }
      }
  }
  
  void BucketSort (int* a, int n) {
      for (int i = 0; i < n; ++i) {
          b[a[i]]++;
      }
      doing(b);
  }
  ```

- **时间复杂度**：O(max(maxN, n)。

#### 三、    快排

- 通过一趟快速排序将要排序的数据分割成独立的两部分，其中一部分的所有数据都比另外一部分的所有数据都要小，然后再按此方法对这两部分数据分别进行快速排序，直到最后各部分只有单个数为止。
- **时间复杂度**：O(nlog(n))。
- **标准模板库**：**sort()**;

#### 四、    归并排序

- 从两个有序数组的表头开始依次比较 a[i] 和 a[j] 的大小，如果 a[i] < a[j]，则将 a[i] 复制到归并数组 r[k] 中，并且 i 和 k 都加 1 后移，否则将 a[j] 复制归并到 r[k] 中，并且 j 和 k 都加 1 后移；如此循环下去，直到其中一个有序表取完后再将另外一个有序表中剩余的元素复制到 r 中。

- 代码：

  ```c++
  void merge(int* a, int low, int mid, int hight) { // 合并函数
      int* b = new int[hight - low + 1];  //用 new 申请一个辅助函数
      int i = low, j = mid + 1, k = 0;    // k为 b 数组的小标
      while (i <= mid && j <= hight) {
          if (a[i] <= a[j]) {
              b[k++] = a[i++];  //按从小到大存放在 b 数组里面
          } else {
              b[k++] = a[j++];
          }
      }
      while (i <= mid) { // j 序列结束，将剩余的 i 序列补充在 b 数组中 
          b[k++] = a[i++];
      }
      while (j <= hight) { // i 序列结束，将剩余的 j 序列补充在 b 数组中 
          b[k++] = a[j++];
      }
      k = 0; //从小标为 0 开始传送
      for (int i = low; i <= hight; i++) { // 将 b 数组的值传递给数组 a
          a[i] = b[k++];
      }
      delete[]b; // 辅助数组用完后，将其的空间进行释放（销毁）
  }
  
  void mergesort(int* a, int low, int hight) { // 归并排序
      if (low < hight) {
          int mid = (low + hight) / 2;
          mergesort(a, low, mid);          // 对 a[low,mid]进行排序
          mergesort(a, mid + 1, hight);    // 对 a[mid+1,hight]进行排序
          merge(a, low, mid, hight);       // 进行合并操作
      }
  }
  ```

- **时间复杂度**：O(nlog(n))。



<div style="page-break-after:always;"></div>

### 第十一讲    分治与二分

#### 二分查找递归写法

```c++
//返回"-1"表示为找到
//否则返回目标的下标（若有多个，只是其中一个）
int BinarySearch (int *arr, int target, int l, int r) {
    if (l > r)  return -1;            
    int mid = (l + r) / 2;
    if (arr[mid] == target) return mid;
    else if (arr[mid] > target) BinarySearch(arr, target, l, mid - 1);
    else BinarySearch(arr, target, mid + 1, r);
}
```

#### 二分查找非递归写法

```c++
//返回"-1"表示为找到
//否则返回目标的下标（若有多个，只是其中一个）
int BinarySearch(int * arr, int x, int l, int r) {
    int lt = l, rt = r;
    while (lt <= rt) {
        int mid = (lt + rt) / 2;
        if (arr[mid] == x) return mid;
        else if (arr[mid] < x) lt = mid + 1;
        else rt = mid - 1;
    }
    return -1;
}
```

#### 带有函数的二分查找

```cpp
int lt = l, rt = r; // 二分的邊界
while (lt <= rt) {
    int mid = (lt + rt) / 2;
    if (half(mid)) { lt = mid + 1; ans = mid; }
    else rt = mid - 1;
}
printf("%d\n", ans);
```

#### 标准模板库

##### lower_bound( )和upper_bound( )

需要头文件 `#include <algorithm>`。

在从小到大的排序数组中，从数组的[begin, end)区间中二分查找第一个

- `lower_bound( begin,end,num)`：大于或等于num的数字，

- `upper_bound( begin,end,num)`：大于num的数字，

找到返回该数字的地址，不存在则返回end。通过返回的地址减去起始地址begin，得到找到数字在数组中的下标。

```c++
int p = std::std::lower_bound(a, a+len, x) - a;
if (a[p] == x) {
    // found at p+1
} else {
    // not found
}
```

##### 重载

```c++
std::lower_bound(begin, end, value, std::greater<int>());
```


在从大到小的排好序的数组中，在数组的 [begin, end) 区间中二分查找第一个小于等于value的数，找到返回该数字的地址，没找到则返回end。

##### 进阶用法（自定义匿名函数）

upper_bound进阶

```c++
upper_bound(begin, end, value, cmp)
bool cmp(value, element)
```

upper_bound的第四个参数是自定义的匿名函数cmp，返回值为bool类型，cmp有两个参数，一个是value，对，你没看错，就是upper_bound的第3个参数value，另一个是element，也就是查找过程中与value比较的那个数。upper_bound返回的就是[begin, end)区间中第一个满足cmp(value, element)为true的数。下面看两个例子，注意看注释，方便理解。

```c++
pos = upper_bound(increasing.begin(), increasing.end(), 3, [](int value, int element) -> bool {
    return value < element;
}) - increasing.begin();           // 等价于基础用法中的第1句
cout << increasing[pos] << endl;   // 4（value是3，第一个大于value的数）
```

其中[](int value, int element) -> bool {return value < element;}就是匿名函数，对于c++匿名函数的用法这里就不说了，自行百度。

```c++
pos = upper_bound(increasing.begin(), increasing.end(), 3, [](int value, int element) -> bool {
    return value <= element;
}) - increasing.begin();           // 等价于基础用法中的第2句
cout << increasing[pos] << endl;   // 3（value是3，第一个大于等于value的数）
```

没想到，upper_bound竟然用出了lower_bound的效果！这就是自定义函数的优点了，使用灵活，这里只是举一个例子展示一下，对于更复杂的情况，比如在一个有序的vector<vector<int>>中，想查找第一个满足第2个元素大于value的vector，匿名函数就可以写成：

```c++
[](int value, vector<int> element) -> bool {return value < element[1];}
```

lower_bound进阶

```c++
lower_bound(begin, end, value, cmp)
bool cmp(element, value)
```

注意，lower_bound的匿名函数element和value的顺序反过来了！lower_bound返回的是[begin, end)区间中第一个使cmp(element, value)为false的数。

```c++
pos = lower_bound(increasing.begin(), increasing.end(), 3, [](int element, int value) -> bool {
    return element < value;
}) - increasing.begin();           // 等价于基础用法中的第2句
cout << increasing[pos] << endl;   // 3（value是3，第一个大于等于value的数）
```

```c++
pos = lower_bound(increasing.begin(), increasing.end(), 3, [](int element, int value) -> bool {
    return element <= value;
}) - increasing.begin();           // 等价于基础用法中的第1句
cout << increasing[pos] << endl;   // 4（value是3，第一个大于value的数）
```

可以看出，lower_bound也可以用出upper_bound的效果。对于更复杂的情况，读者可以自己探索。

<div style="page-break-after:always;"></div>

### 第十二讲    递推与递归

#### 递推

- **关键**：得到相邻的数据之间的递推关系。
- **分类**：顺推：从条件推出结果；逆推：从结果推出条件。
- **优点**：效率高于递归（当然是递推可以计算的情况下）

- **示例**：

  ```c++
  ll mul=1;
  for (ll i = 2; i <= n; ++i) {
      mul *= i;
  }
  ```

#### 递归

- **步骤**：

  (1) 递推：把复杂的问题的求解推到比原问题简单一些的问题的求解；（逆推）

  (2) 回归：当获得最简单的情况后，逐步返回，依次得到复杂的解。

- **优点**：易理解，容易编程。

  **缺点**：递归是用栈机制实现的，每深入一层，都要占去一块栈数据区域，对嵌套层数深的一些算法，递归会力不从心，空间上会以栈内存崩溃而告终，而且递归也带来了大量的函数调用，这也有许多额外的时间开销。所以在深度大时，它的时空性就不好了。

- **空间复杂度**：O(n)。

- **示例**：

  ```c++
  ll fact(n) {
      return n == 1 ? 1 : fact(n-1);
  }
  ```

- 通过**记忆化搜索**可以避免递归调用做重复性的工作。

#### 栈

栈（stack）又名堆栈，它是一种运算受限的线性表。其限制是仅允许在表的一端进行插入和删除运算。这一端被称为栈顶，相对地，把另一端称为栈底。

栈就是一个桶，后放进去的先拿出来，它下面的东西要等它出来之后才能出来（先进后出）。

<div style="page-break-after:always;"></div>

### 第十三讲    简单数学和枚举约减

#### 求组合数

##### 【方法1】组合数的定义。(组合数的横向递推)

可以用O(n)的时间求出C(n,0)~C(n,n)。

递推关系如下：C(n,0)=1，C(n,k+1)=C(n,k)*(n-k)/(k+1)。

注意乘法溢出，如果要取模则需要预处理逆元。

```c++
ll C(int n, int m) {
    ll ans = 1;
    while (m--) {
        ans = ans * (n-i) / (i+1);
    }
}
```

##### 【方法2】组合数的线性递推公式。(杨辉三角，纵向递推)

可以用O(n^2)的时间求出C(0,0)~C(n,n)。

递推关系如下：C(i,0)=1，C(i,j)=C(i-1,j-1)+C(i-1,j)。

相比于乘法运算，加法的递推不容易溢出。

注意在不取模的情况下，n不能超过64。在取模的情况下（和逆元有关，感兴趣的同学自己百度），n主要受到空间的限制，大概是3000以内。

```c++
ll C[64][64];
void gecC() {
    for (int i = 0; i <= 60; ++i) {
        c[i][0] = 1; c[i][i] = 1;
    }
    for (int i = 0; i <= 60; ++i) {
        for (int j = 1; j < i; ++j) {
            c[i][j] = c[i-1][j-1] + c[i-1][j];
        }
    }    
}
```

组合数取模的计算方法（感兴趣的同学可以自学一下）：

##### 【方法3】卢卡斯定理，要求模p比较小，时间复杂度O(plog(n))。

##### 【方法4】预处理阶乘逆元表，要求模p为质数，O(n)打表，O(1)查询。

<div style="page-break-after:always;"></div>

### 第十四讲    位运算

#### 一、    与 (&)

##### 取一个二进制数的指定位置

若有一个整数a(2byte),想要取其中的低字节，只需要将a与8个1按位与即可。
  a 00101100 10101100
  b 00000000 11111111
  c 00000000 10101100

##### 保留指定位

与一个数进行“按位与”运算，此数在该位取1。
有一数84，即01010100（2），想把其中从左边算起的第3，4，5，7，8位保留下来。    

​     01010100(2)
​     & 00111011(2)

​     00010000(2)
  即：a=84,b=59， c=a&b=16

#### 二、    或 (|)

对一个数据的某些位定值为1。

#### 三、    非 (~)

在计算机中，a+(~a)=-1。

负数以补码形式储存！即-a=～a+1，得到～a=-a-1。

#### 四、    异或 (^)

##### 使特定位翻转

  设有数01111010（2），想使其低4位翻转，即1变0，0变1.可以将其与00001111（2） 进行“异或”运算：

​          01111010

​        ^ 00001111
​     01110101
  运算结果的低４位正好是原数低４位的翻转。可见，要使哪几位翻转就将与其进行∧ 运算的该几位置为１。

##### 交换两个值

 例如：ａ＝３，即11（2）；ｂ＝４，即100（2）。
  想将ａ和ｂ的值互换，可以用以下赋值语句实现：
    ａ＝a∧b;
    ｂ＝a∧b;
    ａ＝b∧a;
  等效于以下两步：
       ① 执行前两个赋值语句：“ａ＝ａ∧ｂ；”和“ｂ＝ａ∧ｂ；”

​        相当于b=(a∧b)^b =a^(b^b)=a^0=a。
​       ② 再执行第三个赋值语句： ａ＝ｂ∧ａ。由于a的值等于（ａ∧ｂ），此时b的值等于a， 

​        因此，相当于a=a∧(a∧b)=(a^a)^b=0^b，即等于ｂ。（加背景色的表示初始的a和b）

#### 五、    左移 (<<)

左移n位，就相当于左操作数乘以2^n^。但此结论只适用于该数左移时被溢出舍弃的高位中不包含1的情况。

注意：有符号数的左移溢出情况。

#### 六、    右移 (>>)

对于无符号数，高位补0。

对于有符号数，某些机器将对左边空出的部分用符号位填补（即“算术移位”），即如果原来符号位为0(该数为正),则左边也是移入0；如果原来符号位为1(该数为负),则左边移入的为1 。而另一些机器则对左边空出的部分用0填补（即“逻辑移位”）。

#### 七、    应用

| 目的                           | 代码                                |
| ------------------------------ | ----------------------------------- |
| 判断奇数偶数                   | 偶：a&1==0 奇：a&1==1               |
| 取int型变量a的右数第k位        | a>>(k-1)&1                          |
| 将int型变量a的右数第k位置1     | a=a\|(1<<(k-1))                     |
| int型变量循环左移k次           | a=a<<k\|a>>16-k  (设sizeof(int)=16) |
| int型变量循环右移k次           | a=a>>k\|a<<16-k  (设sizeof(int)=16) |
| 判断一个整数是不是2的幂        | return (!(x&(x-1)))&&(!x);          |
| 不用temp交换两个数             | x ^= y; y ^= x; x ^= y;             |
| 最低位的1以及它后边的0构成的数 | return x&(-x);                      |

<div style="page-break-after:always;"></div>

### 第十五讲    枚举排列

#### 1~n的全排列

思路

```
void permutation (序列A, 集合S) {
    if (S为空) 输出序列A;
    else 按照从小到大的顺序依次考虑S的每个元素v {
        permutation (序列A的末尾添加v元素后得到的新序列, S-{v})
    }
}
```

代码

```c++
void doing() {
    for (int i = 0; i < n; ++i)
        printf("%d ", A[i]);
    printf("\n");
}

void permutation (int* A, int n, int cur) {
    if (cur == n) {                                // 指针指向 n 每一位已经有各自的数
        doing();                                // 已经是一个全排列 执行需要的操作
    } else for (int i = 1; i <= n; ++i) {
        int Aflag = false;                        // Aflag 用于判断 i 这个数有没有用到过
        for (int j = 0; j < cur; ++j) {
            if (i == A[j]) Aflag = true;        // i 已经使用
        }
        if (Aflag == false) {                    // i 尚未使用
            A[cur] = i;                         // 将当前指针位置赋为 i
            permutation(A, n, cur + 1);         // 指针位数加一 进行下一位判断
        }
    }
}
```

#### 自定义数组的全排列（允许重复元素）

```c++
void permutation (int* A, int n, int* P, int cur) {
    if (cur == n) {
        doing();
    } else for (int i = 0; i < n; ++i) {
        if (!i || P[i] != P[i-1]) {             // 与前一位不重复 避免重复统计浪费时间
            int c1 = 0, c2 = 0;
            for (int j = 0; j < cur; ++j) {
                if (A[j] == P[i]) c1 ++;        // 统计已经使用的个数
            }
            for (int j = 0; j < n; ++j) {
                if (P[j] == P[i]) c2 ++;        // 统计总个数
            }
            if (c1 < c2) {
                A[cur] = P[i];
                permutation(A, n, P, cur + 1);
            }            
        }
    }
}
```

#### 标准模板库

##### std::next_permutation 函数

调用求下一个排列。

```c++
std::sort(P, P+n);
do {
    doing();
} while (std::next_permutation(P, P+n));
```

<div style="page-break-after:always;"></div>

### 第十六讲    枚举子集

#### 枚举子集

##### 增量构造法

可以输出特定元素数量的。

按字典序。

```c++
void subset(int n, int *pos, int cur) {
    for (int i = 0; i < cur; ++i) {
        printf("%d ", arr[pos[i]]);
    }
    printf("\n");
    
    int st = cur ? pos[cur-1]+1 : 0;
    for (int i = st; i < n; ++i) {
        pos[cur] = i;
        subset(n, pos, cur+1);
    }
}
```

##### 位向量法

按字典序。

```c++
void subset(int *A, int *used, int n, int cur) {
    if (cur == N) {
        for (int i = 0; i < n; ++i) {
            if (used[i]) printf("%d", A[i])
        }
        printf("\n");
        return;
    }
    used[cur] = 1;
    subset(A, used, n, cur+1);
    used[cur] = 0;
    subset(A, used, n, cur+1);
}
```

##### 二进制法

代码较短，但最多ull只有64位，大数不行。

```c++
void subset(int *A, int n) {
    for (int seq = 0; seq < (1 << n); ++seq) {
        for (int i = 0; i < n; ++i) {
            if (seq & (1<<i)) {
                printf("%d", A[i]);
            }
        }
        printf("\n");
    }
}
```

### 第十七講    C++中STL简单应用

#### 棧

- 先進先出；

- 只能在末端插入或刪除；

- 基本操作：

  ```cpp
  #include <stack>         //头文件
  std::stack<Type>s;         //定义栈，Type为数据类型，如int，float，char等
  s.push(num);             //把num放到栈顶
  s.top();                 //返回栈顶的元素，但不会删除
  s.pop();                 //删除栈顶的元素，但不会返回
  s.size();                 //返回栈中元素个数
  s.empty();                 //检查栈是否为空，如果为空返回true，否则返回false
  ```


##### 單調棧

- 實現栈内的元素是单调的；

- 例如单调递减栈从栈顶到栈底是从小到大的顺序，当一个数入栈时，与栈顶比较，若比栈顶小，则入栈，若比栈顶大，则弹出栈顶，知道这个数能入栈为止。

- **例題** VJwin2K - Look Up S

  - **題意** 求數列每個數後最近的比它小的數的值。

  - **思路** 維護單調棧。需搜索靠後的，即下標較大的，故下標大的先入棧。這個棧單調增，如果入棧時有比它更大的元素，一律剔除，以維護單調增，剔除後第一個元素即是所求。

  - **代碼**

    ```cpp
    std::stack<int> s; //單調增的棧
    for (int i = 1; i <= n; ++i) { scanf("%d", &a[i]); }
    for (int i = n; i > 0; --i) {
        while (!s.empty() && a[s.top()] >= a[i]) s.pop(); // 強行進入 剔除比它高的
        ans[i] = s.empty() ? -1 : s.top();
        s.push(i);
    }
    ```

- **變式** VJwin2F - Bad Hair Day S

  - **題意** 求數列每個數後比它小的數的數量。

  - **思路** 這兩個題很相似，但是如果沿用上題的思路會有一個問題：如果一律剔除，那麼會在小的出現後刪除所有大的，再出現更大的時候統計不到被刪除的那些鏈。我們轉換思路，逆向考慮，考慮每個數前面比它大的數的數量。

  - **代碼**

    ```cpp
    std::stack<int> s; //單調增的棧
    for (int i = 1; i <= n; ++i) { scanf("%d", &a[i]); }
    for (int i = 1; i <= n; ++i) {
        while (!s.empty() && a[s.top()] <= a[i]) {
            s.pop();
        } // 排在隊尾且低的 剔除
        ans[i] = s.size();
        s.push(i);
    }
    ```

  ##### VJwin2H - Text Reverse

#### 队列

- 只能向队尾插入数据，从队头移出数据；
- 先进先出；
- 基本操作：

  ```cpp
  #include <queue>         //头文件
  std::queue<Type>;         //定义，Type为数据类型，如int，float，char等
  q.push(num);             //把num放进队列
  q.front();                 //返回队首元素
  q.pop();                 //删除队首元素
  q.back();                 //返回队尾元素
  q.size();                 //返回元素个数
  q.empty();                 //检查队列是否为空
  ```


#### 双端队列和单调队列

- 能在两端进行插入和删除；
- 基本操作：

  ```cpp
  #include <deque>         //头文件
  std::deque<Type>dq;     //定义
  dq[i];                     //返回队列中下标为i的元素
  dq.front();             //返回队头
  dq.back();                 //返回队尾
  dq.pop_back();             //删除队尾，不返回值
  dq.pop_front();         //删除队头，不返回值
  dq.push_back(e);         //在队尾添加一个元素e
  dq.push_front(e);         //在队头添加一个元素e
  ```


##### 應用：單調隊列

- 两个重要操作：
  - 删头：如果队头的元素脱离了窗口，这个元素就没用了，弹出它。
  - 去尾：如果新元素进队尾时，原队尾的存在破坏了队列的单调性，就弹出它。
  
- 例 滑動區間問題

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

#### 優先隊列

- 每次让优先级最高（最大或最小的数）先出队列；
- 不是简单的线性结构，而是堆；
- 入队操作和出队操作都是 $$O(\log n)$$；
- 基本操作：
  
  ```cpp
  struct node {
      int x,y;
      bool operator < (const node & a) const {
          return x > b.x; //x小的优先级高
      } // 重载
  };
  std::priority_queue<node>q;
  q.top();                 // 返回队首元素
  q.push(x);                 // 加入一个元
  ```
  
- 結構體寫法

  - 寫法1：
  
    ```cpp
    struct node {
          int p, no;
          friend bool operator <(node n1, node n2) {
              return (n1.p == n2.p) ? (n1.no > n2.no) : (n1.p < n2.p);
          }
    } nn;
    ```
  
  - 寫法2：
  
    ```cpp
    struct node {
        int p, no;
    } nn;
    bool operator < (node a, node b) {
        return (n1.p == n2.p) ? (n1.no > n2.no) : (n1.p < n2.p);
    }
    ```

### 第十八講    貪心

> *策馬前途須努力，莫學龍鐘虛嘆息。*

- **貪心** 鼠目寸光。
- **適用範圍** 最優子結構問題（能夠分解爲子問題來解決的問題，子問題的最優解能遞推到最終問題的最優解。

### 第十九講    動態規劃











### 第二十講    數論

#### 取餘快讀

```cpp
template <typename T>
inline void modread(T& x) {
    char c = getchar();
    x = 0;
    while (c > 57 || c < 48 && c != EOF) c = getchar();
    while (c <= 57 && c >= 48) {
        x = ((x << 3) + (x << 1) + c - 48) % MOD;
        c = getchar();
    }
} // 使用：int a; read(a);
```

原版本：

```cpp
#include <cctype> // isdigit(ch)頭文件
inline int getint() {
    int res = 0, ch = getchar();
    while (!isdigit(ch) && ch != EOF) ch = getchar();
    while (isdigit(ch)) {
        res = (res << 3) + (res << 1) + ch - '0';
        res %= MOD;
        ch = getchar();
    }
    return res;
} // 使用：int a = getint();
```

#### 判斷素數

```cpp
bool isPrime(int x) {
    for (int i = 2; i * i <= x; ++i) {
        if (x % i == 0) return 0;
    }
    return 1;
}
```

#### 素數篩（歐拉篩）

```cpp
bool isntPrime[maxN];
int prime[maxN];
int cntPrime = 0;
void doPrime() {
    for (int i = 2; i <= maxN; ++i) {
        if (!isntPrime[i]) {
            prime[cntPrime++] = i;
        }
        for (int j = 0; j < cntPrime; ++j) {
            int p = prime[j];
            if (p * i > maxN) break;
            isntPrime[p * i] = true;
            if (i % p == 0) break;
        }
    }
    isntPrime[1] = true;
}

int main() {
    doPrime(); // 預處理
    if (!isntPrime[n]) {
        // n是素數
    }    
}
```

#### 計算約數個數 & 約數之和

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

#### 解同餘方程 $$ax \equiv c \pmod b\iff ax + by = c$$

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
    if (c % d) return -1; // 无解
    ll x, y;
    a /= d, b /= d, c /= d;
    exgcd(a, b, x, y);
    return (x * c % b) + b * d) % b;
}
// 同余方程 ax == c (mod b) 的最小正整数解
// 即解不定方程 ax + by = c
// 调用liEq(a,b,c);
```

#### 一個數的數論倒數 $$a^{-1}\pmod p$$

首先注意 $$a$$ 必須與 $$p$$ 互素，否則數論倒數不存在。

若 $$p$$ 是素數：

```cpp
int inv(int n, int p) {
    return qpow(n, p-2);
} // a_{-1} mod p (p是素數)
```

一般情況：

```cpp
int inv(int n, int p) {
    return linearIndeterminateEq(a, p, 1);
} // a_{-1} mod p (p無限制)
```

#### 一系列數的數論倒數

```cpp
ll inv[maxN] = { 0, 1 };
ll doInv(ll a, ll p) {
    a %= p;
    if (a == 0) return -1; // 不存在
    if (inv[a]) return inv[a];
    return inv[a] = (p - p / a) * doInv(p % a, p) % p;
} // a_{-1} mod p (p無限制)
```

從 $$1$$ 到 $$n$$ 的連續自然數的數論倒數（$$n<p\and p$$ 是素數）：

```cpp
ll inv[maxN];
void ninv(int p) {
    inv[1] = 1;
    for (int i = 2; i <= n; i++) {
        inv[i] = (p - p / i) * inv[p % i] % p;
    }
}
```





### 高精度

```cpp
string add(string a, string b) {
    string ans;

    reverse(a.begin(), a.end()); a.push_back('0');
    reverse(b.begin(), b.end()); b.push_back('0'); // 保证最高位都是0

    if (a.size() < b.size()) swap(a, b);
    while (b.size() < a.size()) b.push_back('0'); // 短的字符串高位补0

    int c[200000] = { 0 };
    int k = a.size();
    for (int i = 0; i < a.size(); i++) {
        int sum = c[i] + a[i] - '0' + b[i] - '0';
        c[i] = sum % 10;
        c[i + 1] += sum / 10;
    } // 模拟加法

    while (c[k] == 0 && k > 0) k--; // 去除高位零

    while (k >= 0) ans.push_back(c[k--] + '0');
    return ans; // 存答案并输出
}

string minus(string a, string b) {
    string ans;

    bool flag = 0; // 是否小数减大数
    if (a.size() < b.size() || (a.size() == b.size() && a < b)) {
        swap(a, b);
        flag = true;
    }

    reverse(a.begin(), a.end()); a.push_back('0');
    reverse(b.begin(), b.end()); b.push_back('0');

    if (a.size() < b.size()) swap(a, b);
    while (b.size() < a.size()) b.push_back('0');

    int c[110000] = { 0 };
    int k = a.size();
    for (int i = 0; i < a.size(); i++) {
        if (a[i] < b[i]) a[i] += 10, a[i + 1]--;
        c[i] = a[i] - b[i];
    }

    while (c[k] == 0 && k > 0) k--;

    if (flag) ans.push_back('-');
    while (k >= 0) ans.push_back(c[k--] + '0');
    return ans;
}

string times(string a, string b) {
    string ans;

    reverse(a.begin(), a.end());
    reverse(b.begin(), b.end());

    int c[200000] = { 0 };
    int k = a.size() + b.size() + 1;

    for (int i = 0; i < a.size(); i++) {
        for (int j = 0; j < b.size(); j++) {
            c[i + j] += (a[i] - '0') * (b[j] - '0');  // c[i+j]暂存初步乘的结果
            c[i + j + 1] += c[i + j] / 10;   // 进位
            c[i + j] %= 10;       // c[i+j]保留个位
        }
    }

    while (c[k] == 0 && k > 0) k--;

    while (k >= 0) ans.push_back(c[k--] + '0');
    return ans;
}

string lltimes(string a, ll b) {
    return times(a, std::to_string(b));
}

string divides(string a, ll b) {
    string ans;

    int c[200000] = { 0 };
    int rest = 0; // 餘數

    for (int i = 0; i < a.size(); i++) {
        rest = 10 * rest + a[i] - '0';
        c[i] = rest / b;
        rest %= b;
    }

    int k = 0;
    while (c[k] == 0 && k < a.size() - 1) k++;

    for (int i = k; i < a.size(); i++) ans.push_back(c[i] + '0');
    return ans;
}

string mod(string a, ll b) {
    string c = divides(a, b);
    c = lltimes(c, b);
    c = minus(a, c);
    return c;
}

string C(ll b, ll a) { //C_b^a
    string ans = "1";
    for (ll i = b; i > b - a; --i) {
        ans = lltimes(ans, i);
    }
    for (ll i = a; i > 0; --i) {
        ans = divides(ans, i);
    }
    return ans;
}

string A(ll b, ll a) { //A_b^a
    string ans = "1";
    for (ll i = b; i > b - a; --i) {
        ans = lltimes(ans, i);
    }
    return ans;
}
```





<div style="page-break-after:always;"></div>

### 其它

#### 快速幂和快速乘

##### 快速幂

```c++
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

##### 快速乘

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

#### 欧几里得

```cpp
//辗转相除法，求两个数的最大公因数
inline ll gcd(ll _a, ll _b) { return _b == 0 ? _a : gcd(_b, _a % _b); }
```





#### 分解和

```c++
#include <cstdio>

int cntA, cur = 0;
const int maxN = 20;
int A[maxN]; // 拆分元素暂存在A数组中

void doing(int *A) {
    for (int i = 0; i < cur; ++i) { printf("%d ", A[i]); }
    printf("\n");
}

void huafen(int n, int k, int minAi) {
    if (n <= 0 && cur == k) { // 出口
        doing(A);
        cntA++;
    }

    for (int i = minAi; i <= n; i++) {
        A[cur] = i;
        ++cur;           // cur++ 来顺序存储各个拆分元素
        huafen(n-i, k, i);
        --cur;           // 此行必须有，执行完这一行，下一次for循环才能回退
    }
}

int main() {
    int n, k;
    while (scanf("%d %d", &n, &k) != EOF) {
        cntA = 0;
        huafen(n, k, 1);
        printf("total num of A:%d\n", cntA);
    }
    return 0;
}
```

#### 素数筛

```c++
bool isntPrime[maxN];
int prime[maxN];
int cntPrime = 0;
void doPrime() {
    for (int i = 2; i <= maxN; ++i) {
        if (!isntPrime[i]) {
            prime[cntPrime++] = i;
        }
        for (int j = 0; j < cntPrime; ++j) {
            int p = prime[j];
            if (p * i > maxN) break;
            isntPrime[p * i] = true;
            if (i % p == 0) break;
        }
    }
    isntPrime[1] = true;
}

int main() {
    doPrime();
    if (!isntPrime[n]) {
        // n是素数
    }    
}
```



## PART 5 碎片化学习笔记

### 内联函数

- **功能** 任何调用函数的地方都换成了其代码。

- **作用** 避免因为频繁大量的使用栈空间，而造成因栈空间不足所造成的程式出错的问题，函数的死循环递归调用的最终结果就是导致栈内存空间枯竭。

- **代码风格** 它是用于实现的关键字：

  - 错误的写法：

    ```c++
    inline void init(int n);
    void init(int n) {
        
    }
    ```

  - 正确的写法：

    ```c++
    void init(int n);
    inline void init(int n) {
        
    }
    ```

- **适用情形** 只适合函数体内代码简单的函数数使用：

  - 不能包含复杂的结构控制语句例如 `while`、`switch`；
  - 内联函数本身不能是直接递归函数。

- **不适用情形** 内联是以代码膨胀为代价，因此以下情况不宜使用内联：

  - 如果函数体内的代码比较长，使用内联将导致内存消耗代价较高。
  - 如果函数体内出现循环，那么执行函数体内代码的时间要比函数调用的开销大。

### 二维字符数组的三种输入方式

#### scanf 函数

```c++
for (int i = 0; i < n; ++i) {
    scanf("s", str[i])        // 将整个字符串输入时，在数组名前不加&
}
```

or

```c++
for (int i = 0; i < n; ++i) {
    for (int j = 0; j < m; ++j) {
        scanf("%c", &str[i][j])    // 一个一个字符输入时，在数字名前加&
    }
}
```

结束：当遇到回车，空格和tab键结束

对末尾的处理：编译时会自动在字符串后面添加’\0’

缓冲区：回车，空格和tab键仍会留在输入的缓冲区中。

缺点：

以空格作为结束，无法识别空格
因其对缓存区的处理，可能会导致被后面的scanf吸收，即将回车赋值给后面的字符型变量。
可在其后用getchar()将回车吸收
（仅在下一次scanf()输入的是字符型时才考虑，因为回车符是转义符，归属于字符型数据，因此scanf()可将之作为输入）
scanf()关于回车的问题：
首先要搞清楚一个概念，空格、回车、制表Table都是空白字符，空白字符不仅仅是空白字符；

- 对于%d类型的输入，scanf默认的分割符是所有的空白字符。也就是说如果一个scanf函数中出现scanf("%d%d",&a,&b)，那么用任何一个空白字符来分隔两个整数a,b的值，变量a,b都可以接收到正确的输入。且scanf会忽略输入数据项前面的空白字符。

- 对于%c类型的输入，scanf默认所有字符都是需要接收的字符，包括所有的空白字符也会被接收。也就是说如果一个scanf函数中出现scanf("%c%c",&a,&b)，那么输入c t，最后a是c，b是空格,t是接收不了的；

- 对于%s类型的输入，scanf默认的分割符是所有的空白字符。scanf对于字符串输入的处理和对整数类似，会忽略前导的空白字符，而且默认的分隔符是所有的空白字符。

- 比如

  ```
  scanf("%[^\n]",s);
  ```

  这句代码的意思是除了回车键，其余都接收放进s字符串里面。如果你打了回车，回车不会被接收进字符串s里面，回车之前的所有字符包括空格都会被放进字符串s里面。

- 那么，这个回车呢？它会一直被留在缓存里面，只要不动这个缓存，他会一直在。此时scanf的返回值是1（如输入：abc\n）或者0（如输入：\n）。

演示一：
以逐个字符的形式进行二维字符数组的输入

![img](E:\Gaxy\CUC\Programming_ACM\data\ACM笔记 - 学习笔记\image-20221229112505147.png)可见在输入num的值后，下方程序不再进行。
因为我们知道scanf通过回车符判断结束，因此可知该程序不再进行的原因是输入num后的回车被保存在缓冲区，下一步for循环中scanf就从缓冲区将这个回车符读走，认为程序结束。

演示二：
![image-20221229113347214](E:\Gaxy\CUC\Programming_ACM\data\ACM笔记 - 学习笔记\image-20221229113347214.png)以逐行字符串的形式进行二维字符数组的输入

可见每一步都能够正常运行。

上述两个演示验证了：

scanf输入的回车符会被保存在缓存区中
scanf输入不是直接从标准输入（即键盘）读取，而是从缓存区读取
需要考虑scanf回车问题的情况仅有下一次scanf是以字符型输入的，而当下一次是字符串型、整数型、浮点数型……都不需要考虑。

2.gets函数

```c++
char str[100];
gets(str);
```

gets()函数从标准输入（键盘）读入，经常和puts()函数配对使用，puts()函数用于显示字符串，并自动在字符串后面添加一个换行标志’\n’

接收：gets能够接受空格、制表符Tab、回车等；

结束：遇到回车认为输入结束

对末尾的处理：自动用’\0’替代’\n’

缓冲区：回车键不会留在输入缓冲区中

缺点：

- 没有限制输入的字符串长度，可以无限读取，不会判断上限。
- 应该确保 buffer 的空间足够大，以便在执行读操作时不发生溢出。也就是说，gets 函数并不检查缓冲区 buffer 的空间大小，事实上它也无法检查缓冲区的空间。
- 如果函数的调用者提供了一个指向堆栈的指针，并且 gets 函数读入的字符数量超过了缓冲区的空间（即发生缓存区溢出（buffer overflow）），gets 函数会将多出来的字符继续写入堆栈中，这样就覆盖了堆栈中原来的内容，破坏一个或多个不相关变量的值。

- 当用户在键盘上输入的字符个数大于缓冲区 buffer 的最大界限时，gets 函数也不会对其进行任何检查，因此我们可以将恶意代码多出来的数据写入堆栈。因此，gets 函数是极其不安全的，可能成为病毒的入口。

- 建议尽可能不使用gets()


3.fgets函数
fgets()函数作为危险函数gets的代替

char *fgets(char *buf, int bufsize, FILE *stream);

第一个参数：为字符数组数组名或字符型指针
第二个参数bufsize：限制了读取的字符的个数，这就可以解决gets()函数的缺陷。
第三个参数：
fgets函数主要用于读取文件，此时为文件结构体指针
如果要读取键盘，则stream参数应该为stdin
在读取过程中，发生以下三种情况时，读取停止：
发现换行符
发现文件终结符EOF
发生错误
需要注意的是，如果bufsize设置为n，那么fgets函数最多读取n-1个字符，之所以用“最多”这个词是因为，如果在之前遇到了换行符，fgets函数也会返回。

还有一点就是，fgets()函数会读取换行符这一点和gets函数不同），当读取结束后，fgets函数会为buf在末尾添加一个空字符作为字符串的结束。换行符同样会被读入，且在’\0’前，为’\n\0’的形式。

在使用fgets函数从键盘输入二维字符数组时，可采用如下方法：

char str[10][81];
int i=0;
for(i=0;i<10;++i){
fgets(str[i],81,stdin);
}











### C语言 整数与字符串的相互转换

二、整数转字符串

    1、拓展函数itoa
    
    itoa (表示 integer to alphanumeric)是把整型数转换成字符串的一个函数。
    
      windows环境下，在<stdlib.h>头文件中有

char* itoa(int value,char*string,int radix);//value: 要转换的整数，string: 转换后的字符串,radix: 转换进制数，如2,8,10,16 进制等。
函数源码：

char* itoa(int num,char* str,int radix)
{
    char index[]="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";//索引表
    unsigned unum;//存放要转换的整数的绝对值,转换的整数可能是负数
    int i=0,j,k;//i用来指示设置字符串相应位，转换之后i其实就是字符串的长度；转换后顺序是逆序的，有正负的情况，k用来指示调整顺序的开始位置;j用来指示调整顺序时的交换。

    //获取要转换的整数的绝对值
    if(radix==10&&num<0)//要转换成十进制数并且是负数
    {
        unum=(unsigned)-num;//将num的绝对值赋给unum
        str[i++]='-';//在字符串最前面设置为'-'号，并且索引加1
    }
    else unum=(unsigned)num;//若是num为正，直接赋值给unum
     
    //转换部分，注意转换后是逆序的
    do
    {
        str[i++]=index[unum%(unsigned)radix];//取unum的最后一位，并设置为str对应位，指示索引加1
        unum/=radix;//unum去掉最后一位
     
    }while(unum);//直至unum为0退出循环
     
    str[i]='\0';//在字符串最后添加'\0'字符，c语言字符串以'\0'结束。
     
    //将顺序调整过来
    if(str[0]=='-') k=1;//如果是负数，符号不用调整，从符号后面开始调整
    else k=0;//不是负数，全部都要调整
     
    char temp;//临时变量，交换两个值时用到
    for(j=k;j<=(i-1)/2;j++)//头尾一一对称交换，i其实就是字符串的长度，索引最大值比长度少1
    {
        temp=str[j];//头部赋值给临时变量
        str[j]=str[i-1+k-j];//尾部赋值给头部
        str[i-1+k-j]=temp;//将临时变量的值(其实就是之前的头部值)赋给尾部
    }
     
    return str;//返回转换后的字符串

}
示例程序：

#include <stdlib.h>
#include <stdio.h>
int main()
{
    int number1 = 123456;
    int number2 = -123456;
    char string[16] = {0};
    itoa(number1,string,10);
    printf("数字：%d 转换后的字符串为：%s\n",number1,string);
    itoa(number2,string,10);
    printf("数字：%d 转换后的字符串为：%s\n",number2,string);
    return 0;
}
效果截图：



2、自己简单实现

实现代码


#include <stdio.h>

char* Int2String(int num,char *str);//函数声明 
int main()
{
    int number1 = 123456;
    int number2 = -123456;
    char string[16] = {0};
    Int2String(number1,string);
    printf("数字：%d 转换后的字符串为：%s\n",number1,string);
    Int2String(number2,string);
    printf("数字：%d 转换后的字符串为：%s\n",number2,string);
    return 0;
}

char* Int2String(int num,char *str)//10进制 
{
    int i = 0;//指示填充str 
    if(num<0)//如果num为负数，将num变正 
    {
        num = -num;
        str[i++] = '-';
    } 
    //转换 
    do
    {
        str[i++] = num%10+48;//取num最低位 字符0~9的ASCII码是48~57；简单来说数字0+48=48，ASCII码对应字符'0' 
        num /= 10;//去掉最低位    
    }while(num);//num不为0继续循环
    

    str[i] = '\0';
    
    //确定开始调整的位置 
    int j = 0;
    if(str[0]=='-')//如果有负号，负号不用调整 
    {
        j = 1;//从第二位开始调整 
        ++i;//由于有负号，所以交换的对称轴也要后移1位 
    }
    //对称交换 
    for(;j<i/2;j++)
    {
        //对称交换两端的值 其实就是省下中间变量交换a+b的值：a=a+b;b=a-b;a=a-b; 
        str[j] = str[j] + str[i-1-j];
        str[i-1-j] = str[j] - str[i-1-j];
        str[j] = str[j] - str[i-1-j];
    } 
    
    return str;//返回转换后的值 

}
效果截图



三、字符串转整数

1、拓展函数
            atoi (表示 alphanumeric to integer)是把字符串转换成整型数的一个函数。
            windows环境下，在<stdlib.h>头文件中

int  atoi(const char *nptr);//字符串转整数函数，nptr: 要转换的字符串
源码：

int  atoi(const char *nptr)
{
        return (int)atol(nptr);
}

long  atol(const char *nptr)
{
        int c;              /* 当前要转换的字符(一个一个字符转换成数字) */
        long total;         /* 当前转换结果 */
        int sign;           /* 标志转换结果是否带负号*/

        /*跳过空格，空格不进行转换*/
        while ( isspace((int)(unsigned char)*nptr) )
            ++nptr;
     
        c = (int)(unsigned char)*nptr++;//获取一个字符准备转换 
        sign = c;           /*保存符号标示*/
        if (c == '-' || c == '+')
            c = (int)(unsigned char)*nptr++;    /*跳过'+'、'-'号，不进行转换*/
     
        total = 0;//设置转换结果为0 
     
        while (isdigit(c)) {//如果字符是数字 
            total = 10 * total + (c - '0');     /* 根据ASCII码将字符转换为对应的数字，并且乘10累积到结果 */
            c = (int)(unsigned char)*nptr++;    /* 取下一个字符 */
        }
     
        //根据符号指示返回是否带负号的结果 
        if (sign == '-')
            return -total;
        else
            return total;  

}
示例程序：

#include<stdio.h>
#include<stdlib.h> 

int main()
{
    printf("字符串\"123456\"转换为数字：%d\n",atoi("123456"));
    printf("字符串\"-123456\"转换为数字：%d\n",atoi("-123456"));
    return 0;
}

效果截图：


2、自己简单实现

实现源码

#include<stdio.h>

int String2Int(char *str);//函数声明 
int main()
{
    printf("字符串\"123456\"转换为数字：%d\n",String2Int("123456"));
    printf("字符串\"-123456\"转换为数字：%d\n",String2Int("-123456"));
    return 0;
}

int String2Int(char *str)//字符串转数字 
{
    char flag = '+';//指示结果是否带符号 
    long res = 0;
    

    if(*str=='-')//字符串带负号 
    {
        ++str;//指向下一个字符 
        flag = '-';//将标志设为负号 
    } 
    //逐个字符转换，并累加到结果res 
    while(*str>='0' && *str<='9')//如果是数字才进行转换，数字0~9的ASCII码：48~57 
    {
        res = 10*res+  *str++ - '0';//字符'0'的ASCII码为48,48-48=0刚好转化为数字0 
    } 
     
    if(flag == '-')//处理是负数的情况
    {
        res = -res;
    }
     
    return (int)res;

}
截图



四、利用sprintf()函数和sscanf()函数    

       整数转字符串
    
       测试代码：


​         

#include <stdio.h>

char* Int2String(int num,char *str);//函数声明 
int main()
{
    int number1 = 123456;
    int number2 = -123456;
    char string[16] = {0};
    Int2String(number1,string);
    printf("数字：%d 转换后的字符串为：%s\n",number1,string);
    Int2String(number2,string);
    printf("数字：%d 转换后的字符串为：%s\n",number2,string);
    return 0;
}

char* Int2String(int num,char *str)
{
    sprintf(str, "%d", num);

    return str;

}
       运行结果：



       字符串转整数
    
       测试代码：

#include<stdio.h>

int String2Int(char *str);//函数声明 
int main()
{
    printf("字符串\"123456\"转换为数字：%d\n",String2Int("123456"));
    printf("字符串\"-123456\"转换为数字：%d\n",String2Int("-123456"));
    return 0;
}

int String2Int(char *str)//字符串转数字 
{
    char flag = '+';//指示结果是否带符号 
    long res = 0;
    

    if(*str=='-')//字符串带负号 
    {
        ++str;//指向下一个字符 
        flag = '-';//将标志设为负号 
    } 
    
    sscanf(str, "%ld", &res);
    if(flag == '-')
    {
        res = -res;
    }
    return (int)res;







### 随机数


C 语言中使用 rand() 函数产生 0 ~ RAND_MAX 范围内均匀分布到整数，其中 RAND_MAX 是和系统相关的一个固定值。

```c++
#include <stdlib.h> 
#include <time.h> 
srand(time(nullptr));//设置随机数种子
rand();//产生一个随机数
int randoxNumber = rand() % b; //产生 [0,b) 范围内到随机数  
int randoxNumber = a + rand() % ( b -a ); //产生 [a,b) 范围内到随机数 
int randoxNumber = a + rand() % ( b - a +1 ); //产生 [a,b] 范围内到随机数 
double randoxNumber = rand() / RAND_MAX; //产生 [0,1] 范围内到随机小数 
double randoxNumber = rand() / ( RAND_MAX +1 ) //产生 [0,1) 范围内到随机小数 
```

C++ 11 在头文件 #include 中定义了随机数库，包括随机数生成器和随机数分布器。

#### 随机数生成器

##### random_device

random_device 是标准库提供到一个非确定性随机数生成器，使用硬件作为随机数来源，故其调用代价较高，一般用来产生随机数种子。

```c++
random_device rd;
for (int i = 0; i < 10; ++i)
    cout << rd() << endl;
```

##### default_random_engine

default_random_engine 是标准库提供的默认随机数生成器，其实现和编译器有关。

```c++
random_device rd;
default_random_engine r_eng(rd());
for (int i = 0; i < 10; ++i)
    cout << r_eng() << endl;
```

##### minstd_rand

minstd_rand 是标准库提供的采用线性同余算法的伪随机数生成器。

```c++
random_device rd;
minstd_rand   r_eng(rd());
for (int i = 0; i < 10; ++i)
    cout << r_eng() << endl;
```

##### mt19937

mt19937 是标准库提供的采用梅森旋转算法的伪随机数生成器，可以快速产生高质量到随机数。

```c++
random_device rd;
mt19937  r_eng(rd());
for (int i = 0; i < 10; ++i)
    cout << r_eng() << endl;
```

##### ranlux24_base

ranlux24_base 是标准库提供的采用带进位减法的伪随机数生成器。

```c++
random_device rd;
ranlux24_base  r_eng(rd());
for (int i = 0; i < 10; ++i)
    cout << r_eng() << endl;
```

#### 随机数分布器

##### uniform_int_distribution

uniform_int_distribution 用于生成指定范围的均匀分布的整数。

```
random_device rd;
mt19937 r_eng(rd()); 
uniform_int_distribution<int> dis(1, 100); //闭区间
for (int i = 0; i < 10; ++i)
    cout << dis(r_eng) << endl;
```

##### uniform_real_distribution

uniform_real_distribution 用于生成指定范围的均匀分布的浮点数。

```c++
random_device rd;
mt19937 r_eng(rd());
uniform_real_distribution<double> dis(1, 100);

for (int i = 0; i < 10; ++i)
    cout << dis(r_eng) << endl;
```

##### normal_distribution

normal_distribution 用于生成指定均值和方差的正态分布的浮点数。

```c++
random_device rd;
mt19937 r_eng(rd());
normal_distribution  <> dis(4, 1.5); //均值、方差
for (int i = 0; i < 10; ++i)
    cout << dis(r_eng) << endl;
```

##### bernoulli_distribution

bernoulli_distribution 用于生成二项分布到布尔值，可以指定 true 的概率。

```c++
random_device rd;
mt19937 r_eng(rd());
bernoulli_distribution dis( 0.6); //生成 1 的概率是 0.6
for (int i = 0; i < 10; ++i)
    cout << dis(r_eng) << endl;
```

