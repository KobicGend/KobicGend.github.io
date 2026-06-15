---
title: 北化排位赛（二）L超级Fibonacci［简中］
tags:
  - 題解
  - 筆記
  - ACM
categories:
  - - 筆記
    - 題解
abbrlink: a1f015a4
date: 2024-01-26 18:52:44
updated: 2024-01-26 22:26:57
description: 'BUCTOJ - Contest3388 - 2024寒假集训 - 排位赛竞赛（二）L超级Fibonacci'
---

*[返回全部题目](./982204b1.html)*

# BUC2L - 超级 Fibonacci

## 题意

两个字符串按照 $$\rm Fibonacci$$ 的规则运算，求字符串的指定位。

## 思路

举个栗子，`a="abcd", b="efg"`，可计算出：

```cpp
s[1] = "abcd";
s[2] = "efg";
s[3] = "efgabcd";
s[4] = "efgabcdefg";
s[5] = "efgabcdefgefgabcd"; // 与题目表述一致，这里所有下标从 1 开始
```

首先弄清这个「广义 $$\rm Fibonacci$$」 的每一项的长度。显然，它亦满足 $$\rm Fibonacci$$ 的运算规则，即 $$F_n=F_{n-1}+F_{n-2}$$​，上面的栗子中，

```cpp
len(s[1]) = 4;
len(s[2]) = 3;
len(s[3]) = 7 = 3 + 4;
len(s[4]) = 10 = 7 + 3;
len(s[5]) = 17 = 10 + 7;
```

注意到，除了第 `1` 项外，每一项的前面所有字母都是相同的，只需计算 **无穷长的数列** 的第 $$y$$ 项 $$\varphi(y)$$ 即可（题给 $$x$$ 几乎是无效数据，它只用於判断 $$x=1$$ 时的特例，下文详述）

而且，**数列的 $$\boldsymbol{F_{n-1}\sim F_{n}}$$ 项和第 $$\boldsymbol{1\sim F_{n-2}}$$ 项完全相同**。

基於此，我们希望逐步缩小 $$y$$，化归为最基本的情形，如 $$\varphi(16)=\varphi(6)=\varphi(3)=c$$。

（最基本的情形即是两个所给字符串，$$\varphi(1)=e,~\varphi(2)=f,~\varphi(3)=g,~\varphi(4)=a,~\varphi(5)=b,~\varphi(6)=c,~\varphi(7)=d$$）

一般地，对於每一个 $$y$$，一定存在 $$n$$ 满足 $$F_{n-1}<y\leqslant F_{n}$$，即 $$F_{n-1}<y\leqslant F_{n-1}+F_{n-2}$$，也可写为 $$0<y-F_{n-1}\leqslant F_{n-2}$$，且 $$\varphi(y)=\varphi(y-F_{n-1})$$，这样就成功缩小了 $$y$$ 的上界。重复这个过程，最终便能得到答案。

## 实现

首先计算长度：

```cpp
int cnt = 2; // 广义Fibonacci的长度
f[0] = strlen(s1), f[1] = strlen(s2);
for (int i = 2; f[i - 1] < INF; ++i) {
    f[i] = f[i - 1] + f[i - 2];
    ++cnt;
}
```

因为不知道要算多少项，但是只需知道字符串的前 `1e18` 位便足够，我们用 `f[i] < INF = 2e18`，加以约束。

对於每次询问，首先搜索它在哪个区间内，即搜索满足 $$F_{p-1}<y\leqslant F_{p}$$ 的 $$p$$。而刚纔已经算过 $$F_i$$ 了，二分查找即可。

然后模拟化归的过程：

```cpp
ll p = std::lower_bound(f, f + cnt, y) - f; 
while (p > 0 && y > f[0] + f[1]) {
    if (y <= f[p]) --p;
    else y -= f[p];
}
```

其中，`if (y <= f[p]) --p;` 用来找到每次要减去的 $$F_{n-1}$$，两个约束 `p>0 && y>f[0]+f[1]` 防止减为负数（我最初只写  `y>f[0]+f[1]` 一直 $$\rm RE$$。。。

现在就化为基本情形了，也就是上文 `s[3]` 的那几项，显然前面是 `s[2]`，后面是 `s[1]`，用三目

```cpp
printf("%c\n", y > f[1] ? s1[y-f[1]-1] : s2[y-1]);
```

愉快输出就好咯！（注意字符串的下标从 `0` 开始，查询的下标从 `1` 开始，需要 `-1`

别忘记 $$x=1$$ 的特殊情况，它就是 `s[1]`：

```cpp
if (x == 1) {
    printf("%c\n", s1[y - 1]);
}
```

## 代码

```cpp
#include <cstdio>
#include <algorithm>
#include <cstring>

typedef long long ll;
const ll maxN = 4e3 + 7;
const ll INF = 3e18;
ll f[maxN];
char s1[maxN], s2[maxN];

void eachT() {
    scanf("%s%s", s1, s2);

    ll cnt = 2;
    f[0] = strlen(s1), f[1] = strlen(s2);
    for (ll i = 2; f[i - 1] < INF; ++i) {
        f[i] = f[i - 1] + f[i - 2];
        ++cnt;
    }
    
    ll q;
    scanf("%lld", &q);
    while (q--) {
        ll x, y;
        scanf("%lld %lld", &x, &y);
        if (x == 1) {
            printf("%c\n", s1[y - 1]);
        } else {
            ll p = std::lower_bound(f, f + cnt, y) - f;
            while (p > 0 && y > f[0] + f[1]) {
                if (y <= f[p]) --p;
                else y -= f[p];
            }
            printf("%c\n", (y > f[1] ? s1[y - f[1] - 1] : s2[y - 1]));
        }
    }
}

int main() {
    eachT();
    return 0;
}//*/
```

## 评注

*差 $$\mathcal{10}$$ 分鐘就能 $onlyAC$ 這個題了、、、以爲比賽五點結束所以寫完 K 和 F 後睡了一覺才開始寫 L、、、、*

