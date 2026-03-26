---
title: 北化排位赛（三）A-N［简中］
tags:
  - 題解
  - 練習賽
  - 筆記
  - ACM
categories:
  - - 筆記
    - 練習賽
abbrlink: '370419e5'
date: 2024-02-04 12:33:13
updated: 2024-02-04 12:33:13
description: 'BUCTOJ - Contest3399 - 2024寒假集训 - 排位赛竞赛（三）A-N'
---
## BUC3399A 源码星球的春运机场

**思路** 求 $P+Q,~P+R,~Q+R$ 的最小值．

**代码** 

```cpp
void eachT() {
    int a[3];
    scanf("%d %d %d", &a[0], &a[1], &a[2]);
    std::sort(a, a + 3);
    printf("%d\n", a[0] + a[1]);
}
```

## BUC3399B 源码星球的新春日期

**思路** 如果前/后两个数在 $1\sim12$ 之间，就有可能是月份．

**代码** 

```cpp
void eachT() {
    int n;
    scanf("%d", &n);
    int a = n / 100, b = n % 100; // a是前两个数 b是后两个数
    if ((a >= 1 && a <= 12) && (b >= 1 && b <= 12)) printf("AMBIGUOUS");
    if ((a >= 1 && a <= 12) && (b < 1 || b > 12)) printf("MMYY");
    if ((a < 1 || a > 12) && (b >= 1 && b <= 12)) printf("YYMM");
    if ((a < 1 || a > 12) && (b < 1 || b > 12)) printf("NA");
}
```

**注意** `||` 的优先级高于 `&&`，要加括号．

## BUC3399C 源码超人的电子鞭炮

**思路** 只要 $0$ 和 $1$ 挨着就会爆，那么最后不可能同时存在 $0$ 和 $1$，进而，爆的组数是 $0$ 和 $1$ 个数的较小值．

**代码**

```cpp
void eachT() {
    scanf("%s", s);
    int len = strlen(s);
    int cnt0 = 0, cnt1 = 0;
    for (int i = 0; i < len; ++i) {
        if (s[i] == '0') ++cnt0;
        else ++cnt1;
    }
    printf("%d\n", 2 * min(cnt0, cnt1));
}
```

## BUC3399D 源码超人的新年家务

> *「 $ddl$ 是第一生产力．」——源码大学校长*

**思路** 想想上学期的ddl是如何安排时间的……一定是卡着ddl完成，然后从ddl往前推开始完成的时间．我们按照ddl按时间倒序，倒着推导每一项任务的开始完成时间，这个时间便是下一项任务的ddl．

**代码**

```cpp
struct node {
    ll len, ddl;
} b[maxN];
bool cmp(node a, node b) { return a.ddl > b.ddl; }
void eachT() {
    int n;
    scanf("%d", &n);
    for (int i = 1; i <= n; ++i) scanf("%d %d", &b[i].len, &b[i].ddl);
    std::sort(b + 1, b + n + 1, cmp); // 倒序
    ll ddl = b[1].ddl; bool flag = 1;
    for (int i = 1; i <= n; ++i) {
        ddl = min(b[i].ddl, ddl);
        if (ddl < b[i].len) flag = 0; // 需要的时间大于ddl 寄了
        ddl -= b[i].len; // 完成任务 更新ddl
    }
    printf("%s\n", flag ? "Yes" : "No");
}
```

## BUC3399E 一兆吉祥话

**注意** 别直接copy样例就输出了，`XX` 是需要计算的（~~你猜为什么 `WA:AC=1:1`~~

**思路** 假定不能百度搜索在线日期计算器，那就只能手算了：

大致推断是在 $1024$ 年之后，我们计算从 $2022.2.11\sim3046.2.10$ 共多少天，只需算闰年有哪些．

从 $2022\sim3046$ 年，$4$ 的倍数有 $\frac{1024}{4}=256$ 个，$100$ 的倍数有 $2100,~2200,~\dots,~3000$ 共 $10$ 个，$400$ 的倍数有 $2$ 个，总计闰年有 $256-10+2=248$ 年．

于是从 $2022.2.11\sim3046.2.10$ 共 $1024\times365+248$ 天，下面我们从 $3046.2.10$ 向前推 $248$ 天，$3046.1.1\sim3046.2.10$ 共 $31+10=41$ 天，$248-41=202=31+30+31+30+31+31+13$，故答案在 $3045$ 年 $6$ 月倒着数 $13$ 天，即 $30-13+1=18$ 号．

**代码**

```cpp
void eachT() {
    printf("新年快乐％(^_^)％ from 3045-06-08");
}
```

**提示** 本题是全角 `％`，直接copy就可以输出，如果要求输出英文半角 `%`，需改为 `printf("新年快乐%%(^_^)%% from 3045-06-08")`．

## BUC3399F 团团圆圆

**思路** 电脑模拟操作，我们总是操作最大数和最小数：

```cpp
const int maxN = 1e3; // 1000次操作足够，事实上因为数据太弱，5次就够了
void eachT() {
    int a[3];
    scanf("%d %d %d", &a[0], &a[1], &a[2]);
    bool flag = 0;
    for (ll i = 0; i < maxN; ++i) {
        std::sort(a, a + 3);
        if (a[0] == a[2]) { flag = 1; break; } // 三个数相等，退出
        a[2] -= a[0], a[0] *= 2; // 模拟
    }
    printf("%s\n", flag ? "together" : "no way");
}
```

> 我试图推导出 $\Theta(1)$ 的方法：
>
> 设所给的数是 $a,b,c$，不妨设它们的最大公约数为 $1$．如果 $3\nmid a+b+c$，显然不能完成．然后呢……不会了……
>
> 因为用电脑计算出的结果是这样的：
>
> ```cpp
1 1 7   1 2 6   1 3 5   1 4 4   1 5 9   1 6 8   1 7 7   1 8 9
2 2 5   2 3 4   2 4 9   2 5 8   2 6 7   2 7 9   3 4 8   3 5 7
3 7 8   4 4 7   4 5 6   4 5 9   4 7 7   4 8 9   5 5 8   5 6 7
5 7 9   5 8 8   6 7 8
// 10以内的不能完成的（已划去显然不能完成的情况）
> ```
>
> 更大的数也是毫无规律：
>
> ```cpp
1 1 7   1 1 13  1 1 16  1 1 19  1 1 25  1 1 28  1 1 31  1 1 34
1 1 37  1 1 40  1 1 43  1 1 49  1 1 52  1 1 55  1 1 58  1 1 61
1 1 64  1 1 67  1 1 70  1 1 73  1 1 76  1 1 79  1 1 82  1 1 85
1 1 88  1 1 91  1 1 97  1 1 100 1 1 103 1 1 106 1 1 109 1 1 112
1 1 115 1 1 118 1 1 121 1 1 124 1 1 127 1 1 130 1 1 133 1 1 136
1 1 139 1 1 142 1 1 145 1 1 148 1 1 151 1 1 154 1 1 157 1 1 160
1 1 163 1 1 166 1 1 169 1 1 172 1 1 175 1 1 178 1 1 181 1 1 184
1 1 187 1 1 193 1 1 196 1 1 199 1 1 202 1 1 205 1 1 208 1 1 211
1 1 214 1 1 217 1 1 220 1 1 223 1 1 226 1 1 229 1 1 232 1 1 235
1 1 238 1 1 241 1 1 244 1 1 247 1 1 250 1 1 253 1 1 256 1 1 259
> ```

## BUC3399G 一帆风顺

**思路** 假设你自己是个 **贪心的大吃货**，你每到一个景点就会吃，如果没得吃怎么办？拿食材呗．去哪里拿？贪心的你当然是选择这个景点之前的可以拿最多食材的那个地方拿．模拟这个过程即可．

**注意**

- 你实在是太饿了，在一个地方拿还不够吃，可能要反复寻找食材，所以是 `while` 而非 `if`；
- 你如果全程一直有的吃，也是要拿食材的，别忘了你是个贪心的人，吃不下也要拿；
- 别太贪心，一个景点只能拿一次，所以领取之后要把这个地方的食材清空．

*（~~以上三条是帮同学debug时发现的问题 显然这道题如果不贪心不贪吃是做不出来的~~）*

**代码**

```cpp
int a[maxN];
int ans, cnt;

// 领食材的函数
void greed(int x) {
    int maxn = 0; 
    for (int i = 0; i < x; ++i)
        if (a[maxn] < a[i]) maxn = i;    // 找到食材最大的下标
    ++cnt;                                 // 计数
    ans += a[maxn];                     // 领取 食材总数增加
    a[maxn] = 0;                         // 领过了 这里没有食材
}

void eachT() {
    int n, x;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    for (int i = 1; i < n; i++) {
        scanf("%d", &x);
        ans -= x; // 吃
        while (ans < 0 && cnt <= 3) greed(i); // 没吃的了 领
    }
    while (cnt < 3) greed(n);                 // 注意中的第二条
    printf("%d\n", cnt <= 3 ? ans : -1);     // 只有领取次数小于3才符合题意
}
```

## BUC3399H 日常与奇迹 - UPSOLVE

**思路** 区间 DP．

> 注意到，出现的回文串一定由是 $a$ 串的一个连续子串和 $b$ 串的一个连续子串构成的（比如第二个样例`a` 和 `aaaabcaa`，可以是 `a` 和前面的 `aaaa` 组合，可以是 `a` 和后面的 `aa` 组合，但不能是 `a` 和 `aaaaaa` 组合），所以我们可以 DP 哪些区间组成的回文串最长．

状态：`dp[l1][r1][l2][r2]` 表示 $a$ 串的区间 $[l_1,r_1]$，和 $b$ 串的区间 $[l_2,r_2]$ **是否** 可以组成回文串；

始态：$a$ 串长度为 $0$ 或 $b$ 串长度为 $0$ 的 `dp` 全部赋值为 `1`；

末态：所有满足 `dp[l1][r1][l2][r2]=1` 的 `len1+len2` 最大值；

状转方程：`dp[l1][r1][l2][r2]=a[l1] == a[l1] == a[r1] && dp[l1+1][r1-1][l2][r2] || b[l2] == b[r2] && dp[l1][r1][l2+1][r2-1] || a[l1] == b[r2] && dp[l1+1][r1][l2][r2-1] || b[l2] == a[r1] && dp[l1][r1-1][l2+1][r2]`

> 状转方程的解释
>
> 满足以下四种情形之一的，`dp=1`：
>
> $a$ 串区间内左端点（第 $l_1$ 位）和 $a$ 串区间内右端点（第 $l_2$ 位）相同，而且 $a$ 串区间 $[l_1+1,r_1-1]$ 和 $b$ 串区间 $[l_2,r_2]$ 已经可以构成回文串，即 `dp[l1+1][r1-1][l2][r2]=1`，那么 $a$ 串区间 $[l_1,r_1]$ 和 $b$ 串区间 $[l_2,r_2]$ 也可以构成回文串，综合起来的判断条件是 `a[l1] == a[r1] && dp[l1+1][r1-1][l2][r2]`；
>
> $a$ 串区间内左端点（第 $l_1$ 位）和 $b$ 串区间内右端点（第 $r_2$ 位）相同，而且 $a$ 串区间 $[l_1+1,r_1]$ 和 $b$ 串区间 $[l_2,r_2-1]$ 已经可以构成回文串；
>
> $b$ 串区间内左端点和 $b$ 串区间内右端点相同，且其它部分可以构成回文串；
>
> $b$ 串区间内左端点和 $a$ 串区间内右端点相同，且其它部分可以构成回文串；
>
> （如果 $a$ 串区间内左端点和 $b$ 串区间内左端点相同，是不行的，向回文串上加字母只能往两边加，而不能加在同一边）
>
> 把上面四种情形放在一个大大的 `if` 里面，然后更新最大值就好咯．

**代码** 

```cpp
void eachT() {
    memset(dp, 0, sizeof dp); // 好习惯 多组样例需初始化
    std::cin >> (a+1) >> (b+1);
    int ans = 1, lena = strlen(a+1), lenb = strlen(b+1);
    for (int len1 = 0; len1 <= lena; ++len1)
    for (int len2 = 0; len2 <= lenb; ++len2)
    for (int l1 = 1, r1 = len1; r1 <= lena; ++l1, ++r1)
    for (int l2 = 1, r2 = len2; r2 <= lenb; ++l2, ++r2) {
        if (len1 + len2 <= 1) dp[l1][r1][l2][r2] = 1; // 始态
        else if (a[l1] == a[r1] && dp[l1+1][r1-1][l2][r2]
              || b[l2] == b[r2] && dp[l1][r1][l2+1][r2-1]
              || a[l1] == b[r2] && dp[l1+1][r1][l2][r2-1]
              || b[l2] == a[r1] && dp[l1][r1-1][l2+1][r2]) {
            dp[l1][r1][l2][r2] = 1;
            ans = max(ans, len1 + len2); // 更新最大值
        }
    }
    printf("%d\n", ans);
}
```

## BUC3399I 福被千家

**思路** 熟知

  > **勒讓德定理**：在 $n!$ 中素数 $p$ 的指数
  > $
  > v_p(n!)=\displaystyle\sum\limits_{k=1}^{p^k\le n}\bigg\lfloor\dfrac{n}{p^k}\bigg \rfloor=\dfrac{n-S_p(n)}{p-1}.
  > $
  > 其中，$S_p(n)$ 表示 $n$ 在 $p$ 进制下各个位数的和，熟知
  > $
  > S_p(n)=
  > 
  > \begin{cases}
  > 
  > 1, & \text {if } n=1 \\
  > 
  > \displaystyle S_p\Big(\frac{n}{p}\Big), & \text {if } p\mid n \\
  > 
  > S_p(n-1)+1, & \text {otherwise}.
  > 
  > \end{cases}
  > $

我们使用它第一个形式，循环求和．

**代码** 

```cpp
void eachT() {
    ll n;
    scanf("%lld", &n);
    for (ll p = 2; p <= n; ++p) {
        if (!isntPrime[p]) {
            ll sum = 0;
            for (ll k = p; k <= n; k *= p) sum += n / k; // 根据勒讓德定理第一个形式
            if (sum) printf("%lld %lld\n", p, sum); // 幂次出现过就输出
        } // p是素数
    }
}
```

**注意** 全力开 `long long`，可以测试一下输入 `1000000` 能不能出结果，如果什么都输不出来很有可能是 `long long` 的问题．

## BUC3399J 鹏程万里

**思路** 想要间距尽可能小，一定是左边的向右跳，右边的向左跳，但是界限不确定，我们可以枚举界限，一一计算．假设现在的分界点是 $i$，左边向右跳之后的坐标为 $a_1+x\sim a_{i-1}+x$，右边向左跳之后的坐标为 $a_i-x\sim a_n-x$，综合来看，坐标为 $\min(a_1+x,~a_i-x)\sim \max(a_{i-1}+x,~a_n-x)$．

**代码** 

```cpp
void eachT() {
    int n, x;
    scanf("%d", &n);
    for (int i = 1; i <= n; ++i) scanf("%d", &a[i]);
    std::sort(a + 1, a + n + 1); // 输入并排序
    scanf("%d", &x);
    
    int ans = 1e18;
    for (int i = 2; i <= n; ++i) {
        ans = min(max(a[n]-x, a[i-1]+x) - min(a[i]-x, a[1]+x), ans);
    }
    ans = min(a[n] - a[1], ans); // 全部向同一边跳
    printf("%d\n", ans);
}
```

## BUC3399K 下笔成章

**思路** 哈希．参见<span id="blue">[Link](./ba3fd34e)</span>．

倒着按照长度循环，判断前缀和后缀是否相同，如果相同，再寻找中间是否有相同的，如果找到就终止循环．

```cpp
const int H = 131;
void init() { P[0] = 1; for (int i = 1; i < maxN; ++i) P[i] = P[i - 1] * H; }
ull get(int l, int r) return sum[r] - sum[l - 1] * P[r - l + 1];
void eachT() {
    init();
    std::cin >> s; int m = s.size(); s = " " + s;
    for (int i = 1; i < m; ++i) {
        sum[i] = sum[i - 1] * H + s[i] - 'a';
    }    
    for (int len = m - 1; len >= 1; --len) {
        ull h1 = get(1, len), h2 = get(m - len + 1, m);
        if (h1 != h2) continue;
        for (int i = 2; i <= m - len; ++i) {
            h2 = get(i, i + len - 1);
            if (h1 == h2) {
                for (int j = 1; j <= len; ++j)
                    std::cout << s[j];
                return;
            }
        }
    }
    std::cout << "I'll write one for you";
}
```

## BUC3399L 鸿运连三江

（涉及知识盲区了）（暂无代码，不确定这个思路能否实现）

**思路** 



## BUC3399M 鑫源通四海

（此方法复杂度极高，不建议学习）

**思路** 



## BUC3399N 赞美太阳

**思路** 和K题类似的哈希．因为和 $A$ 串 $s_0$ 结构相同的字符串构成了一个环，先将 $s_0$ 断环为链，构成一个长度为 $2len_0$ 的串，将所有结构相同的子串的哈希值计算出来，并用 `map` 标记．对于每个测试样例，从头到尾遍历它的哈希值，并判断这个哈希值是否出现过．

**代码**

```cpp
const int H = 131;
std::map<int, int> mp;

void init() { P[0] = 1; for (int i = 1; i < maxN; ++i) P[i] = P[i - 1] * H; }
ull get0(int l, int r) { return sum0[r] - sum0[l - 1] * P[r - l + 1]; }
ull get(int l, int r) { return sum[r] - sum[l - 1] * P[r - l + 1]; }

void eachT() {
    init(); // 初始化

    std::cin >> s0; int len0 = s0.size(); s0 = " " + s0; // 读入A串
    for (int i = 1; i <= len0; ++i) sum0[i] = sum0[i - 1] * H + s0[i]; // 预处理前缀和

    mp[get0(1, len0)] = 1; // 标记哈希值出现过
    for (int i = len0 + 1; i <= 2 * len0; ++i) {
        sum0[i] = sum0[i - 1] * H + s0[i - len0];
        mp[get0(i - len0 + 1, i)] = 1; // 将字符串循环标记哈希值出现过
    }

    int T; std::cin >> T; while (T--) { // 测试样例
        std::cin >> s; int len = s.size(); s = " " + s;
        for (int i = 1; i <= len; ++i) sum[i] = sum[i - 1] * H + s[i];

        int ans = 0;
        for (int l = 1, r = len0; r <= len; ++l, ++r) {
            if (mp[get(l, r)]) ++ans;
        } // 如果这个区间的哈希值出现过
        std::cout << ans << '\n';
    }
}
```

