---
title: 2025 ICPC 沈阳 C
categories:
  - 邏輯與算法
  - 問題
abbrlink: 7ecc0dfa
---


## [2025 ICPC 沈阳 C](https://qoj.ac/contest/2641/problem/14942)

【题意】第一次运行给定 $N$ 个正整数 $X_{i} \in [1,M]$，为每个数构造一个长度为 $3 M$ 的序列，每个序列中 $1$ 到 $M$ 的整数恰好出现 3 次。jury 独立地将每个序列映射成二进制序列，第二次运行需要从这些二进制序列中解密出每个 $X_{i}$。

很牛的题。喜欢 communication。

【思路】既然是 $3M$ 且恰好出现 3 次，我们就分成三段，每段是长为 $M$ 的 permutation。第一段就设为 $1,2,\dots,M$，这样直接知道每个字符映射成 0 还是 1 了。然后想想后面两个 permutation 怎么搞才能保证是单射。

最简单的方法是 rotation（循环移位），直接移 $X_{i}$ 位。

可以吗？有个小问题，如果映射出的序列有周期 $T$，那就分不出来了。比如原串是 1010，移位后是 0101，移了 1 还是 3 不得而知。

如何修正？什么串没有周期？素数！给 $1,2,\dots,p$ 这些位置做 rotation，那么就可以唯一地还原，前提是 $0 \leqslant X_{i}< p$。

现在有一个粗糙的策略：

- 第一次运行：第一段是 $1,2,\dots,M$，第二段整体移 $X_{i}$ 位，第三段给 $1,2,\dots,p$ 整体移 $X_{i} \bmod p$ 位，后面 $p+1,\dots, M$ 不变。
- 第二次运行：有两个 cases，
    - Case1：$1,2,\dots,p$ 都一样，这样完全得不到任何信息；
    - Case2：$1,2,\dots,p$ 有一个不一样，这样得到了 $X_{i} \bmod p$，但还有若干种可能。

再仔细思考，实际上我们选出的 $p$ 是满足 $\dfrac{M}{2} < p \leqslant M$ 的，这个东西是由素数距离（Bertrand-Chebyshev Theorem）保证的，开区间 $(n,2n)$ 内至少存在一个素数。

对于 Case1，尽管 $1,2,\dots,p$ 都一样，但这意味着原串里有长度超过一半的连续的 0 或连续的 1，因此第二段整体移位结果唯一，根据第二段的结果就可以读出 $X_{i}$。

对于 Case2，如果 $M = p$ 已经解决，否则得到了 $X_{i} \bmod p$ 后可能的 $X_{i}$ 只有两种，而且是相差 $p$ 的，由于 $p \nmid M$，所以这两者在第二段结果也是不一样，可以唯一读出 $X_{i}$。

于是本题解决。

【解】第一次运行：分成三段，每段是长为 $M$ 的 permutation。选取一个素数 $p$ 满足 $\dfrac{M}{2} < p \leqslant M$。
- 第一段是 $1,2,\dots,M$；
- 第二段整体移 $X_{i}$ 位；
- 第三段给 $1,2,\dots,p$ 整体移 $X_{i} \bmod p$ 位，后面 $p+1,\dots, M$ 不变。

第二次运行：有两个 cases，
- Case1：$1,2,\dots,p$ 都一样，这意味着原串里有长度超过一半的连续的 0，因此第二段整体移位结果唯一，根据第二段的结果就可以读出 $X_{i}$。
- Case2：$1,2,\dots,p$ 有一个不一样，这样得到了 $X_{i} \bmod p$，因此可能的 $X_{i}$ 只有两种，这两者在第二段结果也是不一样，可以唯一读出 $X_{i}$。

【实现】如何知道移了多少位？很经典的问题，可以哈希，可以 KMP，也可以用最小表示法。

```cpp
#include <bits/stdc++.h>

template <typename T>
int MinRotation(const T& s) {
    const int n = s.size();
    int i = 0, j = 1, k = 0, t;
    while (i < n && j < n && k < n) {
        t = s[(i + k) % n] - s[(j + k) % n];
        if (!t) {
            k++;
        } else {
            if (t > 0) i += k + 1;
            else j += k + 1;
            if (i == j) j++;
            k = 0;
        }
    }
    return std::min(i, j);
}   

int main() {
    std::cin.tie(nullptr)->sync_with_stdio(false);

    std::vector<int> minp(1E6), primes;
    
    minp[1] = 1;
    for (int n = 2; n < minp.size(); n++) {
        if (!minp[n]) {
            minp[n] = n;
            primes.push_back(n);
        }
        for (int p : primes) {
            if (1ll * n * p >= minp.size()) break;
            minp[n * p] = p;
            if (p == minp[n]) {
                break;
            }
        }
    }

    int opt, N, M;
    std::cin >> opt >> N >> M;

    int p = *--std::ranges::upper_bound(primes, M);

    if (opt == 1) {
        for (int n = 0; n < N; n++) {
            int X;
            std::cin >> X;
            X--;

            std::vector<int> a(M);
            std::ranges::iota(a, 0);
            for (auto x : a) std::cout << (++x) << " ";

            auto b = a;
            std::rotate(b.begin(), b.begin() + X, b.end());
            for (auto x : b) std::cout << (++x) << " ";

            auto c = a;
            std::rotate(c.begin(), c.begin() + (X % p), c.begin() + p);
            for (auto x : c) std::cout << (++x) << " ";

            std::cout << "\n";
        }
    } else {
        for (int n = 0; n < N; n++) {
            std::vector<int> a(M), b(M), c(M);
            for (auto& x : a) std::cin >> x;
            for (auto& x : b) std::cin >> x;
            for (auto& x : c) std::cin >> x;

            int X;
            if (std::set(a.begin(), a.begin() + p).size() == 1) {
                int i = MinRotation(a);
                int j = MinRotation(b);

                X = (i - j + M) % M;
            } else {
                int i = MinRotation(std::vector(a.begin(), a.begin() + p));
                int j = MinRotation(std::vector(c.begin(), c.begin() + p));
                
                int Xmodp = (i - j + p) % p;
                std::rotate(a.begin(), a.begin() + Xmodp, a.end());

                if (a == b) {
                    X = Xmodp;
                } else {
                    X = Xmodp + p;
                }
            }
            std::cout << (++X) << "\n";
        }
    }

    return 0;
}
```

