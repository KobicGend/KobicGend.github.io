---
title: Minimum Multiset
tags:
  - ACM
  - 算法
  - 筆記
categories:
  - 邏輯與算法
  - 問題
  - 原創問題
abbrlink: 8e54dc88
---


初始有一个「图层 1」。每次操作可以删除图层，也可以新建图层（自动命名为「图层：当前图层数量 +1」）。想要让图层编号的多重集等于给定目标 A，至少操作多少次？或无解。

### Description

你有一个初始多重集 $S = \{1\}$。你可以任意多次执行以下两种操作：
1. **添加**：向 $S$ 中插入一个等于 $|S| + 1$ 的整数。
2. **删除**：从 $S$ 中移除任意一个元素，但删除后 $S$ **不能**为空。换句话说，只有当 $|S| > 1$ 时才能执行此操作。

你还获得一个包含 $N$ 个整数的多重集 $A$。判断是否可以将初始多重集 $S$ 精确地变换为 $A$。如果可能，请找出所需的最少操作次数，并输出达到该最小值的操作序列。

You are given an integer $C$ and an initial multiset $S = \{C\}$. You can perform the following two operations any number of times:
1. *Add*: Insert an integer equal to $|S| + 1$ into $S$.
2. *Delete*: Remove any element from $S$, with the condition that $S$ must **not** be empty after the deletion. In the other word, you can only perform this operation if $|S| > 1$.

You are also given a multiset $A$ containing $N$ integers. Determine if it is possible to transform the initial multiset $S$ into exactly $A$. If it is possible, find the minimum number of operations required and output the sequence of operations that achieves this minimum. 

$1 \leqslant N \leqslant 10^{5}$
$1 \leqslant A_{i}, C \leqslant N$

### Solution

It is possible iff $A_i \ge i$ for all $1 \le i \le N$.

Let $c_v$ be the count of occurrences of value $v$ in the multiset $A$. The minimum number of Add operations is:

$$m = \sum_{v=2}^{A_N} \max(1, c_v)$$

The total number of operations is:
$$\text{Ans} = 2m - N + 1$$


```cpp
#include <bits/stdc++.h>

int main() {
    std::ios_base::sync_with_stdio(false);
    std::cin.tie(NULL);

    int N;
    std::cin >> N;

    std::vector<int> A(N);
    std::map<int, int> cnt;
    for (int i = 0; i < N; i++) {
        std::cin >> A[i];
        cnt[A[i]]++;
    }
    std::ranges::sort(A);

    for (int i = 0; i < N; i++) {
        if (A[i] < i + 1) { 
            std::cout << -1 << "\n";
            return 0;
        }
    }

    std::vector<int> ans;
    std::vector<int> garbage;
    
    if (cnt[1] > 0) {
        cnt[1]--;
    } else {
        garbage.push_back(1);
    }

    for (int v = 2; v <= A.back(); v++) {
        ans.push_back(0);  // add
        
        if (cnt[v] > 0) {
            cnt[v]--;
        } else {
            garbage.push_back(v); 
        }

        while (cnt[v] > 0) {
            ans.push_back(garbage.back());
            garbage.pop_back();
            ans.push_back(0);  // add
            cnt[v]--;
        }
    }

    for (int g : garbage) {
        ans.push_back(g);
    }

    std::cout << ans.size() << "\n";
    for (auto op : ans) {
        std::cout << op << " ";
    }
    std::cout << "\n";

    return 0;
}
```


为了让你最直观地看清这三个版本的演进，我们直接对比它们**唯一产生差异的核心代码段**（即从读取输入，到核心 `for (int v = 2...` 循环开始前的这部分数据准备和特判逻辑）。

这三个版本的后续主循环和输出逻辑是**完全一模一样**的，无需改动。

### 核心逻辑演进对比表

|**版本**|**初始条件**|**允许集合为空？**|**目标需要 1 时的处理逻辑**|
|---|---|---|---|
|**V1 (原版)**|永远固定 `C = 1`|不允许|必定有解。直接消耗初始手里的 `1`。|
|**V2 (泛化 C)**|给定任意 `C`|不允许|**非 `C=1` 时绝对无解**。因为 `Add` 永远只能生成 $\ge 2$ 的数。|
|**V3 (允许为空)**|给定任意 `C`|允许|**有解**。开局直接删掉 `C` 清空集合，用一次 `Add` 强行无中生有捏出一个 `1`，随后将这颗 `1` 视作初始元素继续。|

### 三版本代码对比 (核心差异区)

#### 🟩 版本 1：原版 (固定 C = 1)

这是你最初提供的版本，默认开局手里握着一个 `1`。

C++

```
    int N;
    std::cin >> N;
    
    // ... 读入 A 并排序，校验 A[i] < i + 1 ...

    std::vector<int> ans;
    std::vector<int> garbage;
    
    // 【核心区】：默认手里是 1，直接对 1 进行核销或当垃圾扔掉
    if (cnt[1] > 0) {
        cnt[1]--;
    } else {
        garbage.push_back(1);
    }

    // 后续进入 for (int v = 2; v <= A.back(); v++) ...
```

#### 🟨 版本 2：泛化初始值 (任意 C，不允许为空)

我们需要读取 `C`，并增加对数字 `1` 的绝对无解特判。

C++

```
    int N, C;
    std::cin >> N >> C; // 【差异点】：增加读取 C
    
    // ... 读入 A 并排序，校验 A[i] < i + 1 ...

    // 【差异点】：严格校验 1。因为不能清空集合，Add 最小生成 2。
    if (A[0] == 1 && C != 1) {
        std::cout << -1 << "\n";
        return 0;
    }

    std::vector<int> ans;
    std::vector<int> garbage;
    
    // 【核心区】：核销对象从 1 变成了真实的初始元素 C
    if (cnt[C] > 0) {
        cnt[C]--;
    } else {
        garbage.push_back(C);
    }

    // 后续进入 for (int v = 2; v <= A.back(); v++) ...
```

#### 🟥 版本 3：物理规则放宽 (任意 C，允许为空)

我们将“遇到 1 直接报错”的逻辑，改为“通过清空集合来强制转生出 1”。

C++

```
    int N, C;
    std::cin >> N >> C; 
    
    // ... 读入 A 并排序，校验 A[i] < i + 1 ...

    std::vector<int> ans;
    std::vector<int> garbage;

    // 【核心区（精髓）】：不仅不报错，反而主动利用规则生成 1
    if (A[0] == 1 && C != 1) {
        ans.push_back(C);  // 执行 Delete C，集合变为空 (|S|=0)
        ans.push_back(0);  // 执行 Add，生成 |S|+1 = 0+1 = 1
        C = 1;             // 状态欺骗：假装我们一开始抽到的初始 C 就是 1
    }
    
    // 此时的 C，要么是原装的 C，要么是上面强行转生出来的 1。
    // 完美复用原有逻辑，进行核销。
    if (cnt[C] > 0) {
        cnt[C]--;
    } else {
        garbage.push_back(C);
    }

    // 后续进入 for (int v = 2; v <= A.back(); v++) ...
```

### 总结

从 V1 到 V3 的迭代，本质上是对**状态转移起点**的泛化：

- V1 是特化的起点（只有一种开局）。
    
- V2 是泛化的起点，并画出了边界（有些开局走不通）。
    
- V3 则是利用新规则，强行在走不通的边界处，搭了一座桥，重新接回了 V1/V2 的主干道。底层的贪心算法内核由始至终坚如磐石。