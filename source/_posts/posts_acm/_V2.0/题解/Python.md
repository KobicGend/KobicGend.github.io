---
title: XCPC wiki - Python
tags:
  - 算法
  - 筆記
  - ACM
categories:
  - - 筆記
    - XCPCwiki
abbrlink: 25fd10e7
hide: true
date: 2025-01-24 22:05:00
updated: 2025-01-24 22:05:00
description:
---

## 2024 牛客多校 9I - Interesting Numbers

[[../contests/2024牛客多校/2024-08-13：2024牛客暑期多校训练营9|2024-08-13：2024牛客暑期多校训练营9]]

```python
import math
n = int(input())
l, r = map(int, input().split())

def slove(k) :
    wei = 10 ** (n // 2)
    half1 = k // wei
    half2 = k % wei
    half3 = 10 ** (n // 2)
        sqr1 = math.isqrt(half1)
    sqr2 = math.isqrt(half2)
    sqr3 = math.isqrt(half3)
    if sqr3 * sqr3 == half3:
        sqr3 -= 1
    if half1 == sqr1 ** 2:
        return sqr1 * (sqr3 + 1) + sqr2 + 1;
    else:
        return (sqr1 + 1) * (1 + sqr3)

print(slove(r) - slove(l - 1))
```


### [VJwin15C - 排队](https://www.luogu.com.cn/problem/P3223)

**题意** $n$ 名男同学，$m$ 名女同学和两名老师排成一条直线，任意两名女同学不能相邻，两名老师也不能相邻，求排法总数。

**思路** 将两名老师插在男生中间，方案数是 $A_{n+1}^2$，再将女生插入，方案数是 $A_{n+3}^{m}$，总方案数是 $A_n^n A_{n+1}^2 A_{n+3}^{m}$，另一种情形是，两名老师放在同一个男生中间，在这两名老师中排一个女生，方案数是 $A_n^n\cdot C_{n+1}^1A_2^2C_m^1\cdot A_{n+2}^{m-1}$。故总方案数为 $A_n^n A_{n+1}^2 A_{n+3}^{m}+A_n^n\cdot C_{n+1}^1A_2^2C_m^1\cdot A_{n+2}^{m-1}$。

```python
import sys
import math
ans = 0
n, m = map(int, input().split())
def f(x) :
    return math.factorial(x)
def A(x, y) :
    return f(x)//f(x-y)
if (n + 3 >= m):
    ans += A(n + 3, m) * A(n + 2, n + 2)
if (n + 2 >= m):
    ans -= 2 * A(n + 2, m) * A(n + 1, n + 1)
print(ans)
```


