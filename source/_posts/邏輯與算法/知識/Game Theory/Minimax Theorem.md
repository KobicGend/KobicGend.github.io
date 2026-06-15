---
title: Minimax Theorem
tags:
  - ACM
  - 算法
  - 筆記
categories:
  - 邏輯與算法
  - 知識
  - Game Theory
abbrlink: e87d2ca0
---


## [CF2140E](https://codeforces.com/contest/2140/problem/E2)

- 给定下标集合 $C$ 。
- 现有长度为 $N$ 的石子数量序列 $a$，满足对于 $1 \leqslant i \leqslant N$，$1 \leqslant a_i \leqslant M$。
- 针对序列 $a$ 玩 Minimax Game：选择在集合 $C$ 中的下标 $i$，移除第 $i$ 堆石子。
- 当游戏结束只剩最后一堆石子时，其对应的石子数量记为 $x$。
- Alice 希望最大化 $x$，Bob 则希望最小化 $x$。
- 在双方均采取最优策略的情况下，求所有 $M^N$ 种可能的初始序列 $a$ 下最终 $x$ 的总和。
- $N \leqslant 20$，$M \leqslant 10^6$。

考虑 $M=2$，状压当前状态 $f_{0/1, i, s}$ 表示现在剩下 $i$ 堆，状态是 $s$，目标是 0/1 的玩家是否必胜，Minimax DP 转移即可。

```cpp
vector f(2, vector<int>(1 << N));
f[0][0] = true;
f[1][1] = true;
for (int i = 2; i <= N; i++) {
    vector nf(2, vector<int>(1 << N));
    for (unsigned s = 0; s < (1 << N); s++) {
        for (auto x : good) {
            if (x >= i) continue;
            unsigned ns = ((s >> (x + 1)) << x) | (s % (1 << x));
            nf[0][s] |= !f[1][ns]; 
            nf[1][s] |= !f[0][ns]; 
        }
    }
    f = move(nf);
}
```

考虑把 $M=2$ 的 $1$ 的意义改写为最终答案 $\geqslant t$，$0$ 的意义改写为最终答案 $< t$。若某初始状态 $s$ 的 $f_{1,N,s} = 1$，意味着 Alice 拥有必胜策略，能够将最终结果逼向 $1$，即最终答案 $\geqslant t$。

$$
\text{Count}(\text{ans} \geqslant t) = \sum [f_{1,N,s} = 1] (M - t + 1)^{\text{popcount}(s)} \times (t - 1)^{N - \text{popcount}(s)}
$$

答案为

$$
\text{Ans} = \sum_{t=1}^M \text{Count}(\text{ans} \geqslant t)
$$
