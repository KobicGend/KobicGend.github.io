---
title: FWT
categories:
  - 邏輯與算法
  - 知識
abbrlink: 12aa761e
---



```cpp
#include <vector>
#include <utility> // for std::swap

template <typename T>
void FWT(std::vector<T>& f, T m00, T m01, T m10, T m11) {
    const int N = f.size();
    for (int k = 1; k < N; k <<= 1) {
        for (int j = 0; j < N; j += (k << 1)) {
            for (int i = 0; i < k; i++) {
                T& u = f[i + j];
                T& v = f[i + j + k];
                std::tie(u, v) = std::pair(
                    m00 * u + m01 * v,
                    m10 * u + m11 * v
                );
            }
        }
    }
}

template <typename T> void FWT_OR(std::vector<T>& f)  { FWT<T>(f, 1, 0, 1, 1); }
template <typename T> void IFWT_OR(std::vector<T>& f) { FWT<T>(f, 1, 0, -1, 1); }
template <typename T> void FWT_AND(std::vector<T>& f) { FWT<T>(f, 1, 1, 0, 1); }
template <typename T> void IFWT_AND(std::vector<T>& f){ FWT<T>(f, 1, -1, 0, 1); }
template <typename T> void FWT_XOR(std::vector<T>& f) { FWT<T>(f, 1, 1, 1, -1); }
template <typename T> void IFWT_XOR(std::vector<T>& f) {
    FWT_XOR(f);
    const int N = f.size();
    T invN = 1 / static_cast<T>(N);
    for (int i = 0; i < N; i++) {
        f[i] *= invN;
    }
}
```

## [牛客挑战赛 89 D - 走失](https://ac.nowcoder.com/acm/contest/136706/D)

- 节点是所有 $N$ 位二进制数。若 $u \land v = 0$，则存在边 $u \to v$。
- 游走的特征值：沿途所有节点的按位异或和。
- 游走的分数：设起点 $v$，则为 $C_{v}$。
- 考虑所有长度为 $K$ 的游走，对每个特征值 $s$ 统计 $f_{s}=\sum_{s} C_{v}$。
- $N \leqslant 20, K \leqslant 10^{18}$。

每位独立，拆成 $N$ 个彼此独立的 01 序列，相邻两个节点不允许同时为 1。

对第 $i$ 位，利用矩阵计算起点 $v_{i}$，特征值 $s_{i}$ 的方案数 $M_{s_{i},v_{i}}$。复杂度 $\mathcal{O}(4^{3}\log K)$。

答案是每位贡献之积，

$$
f_{s}
= \sum_{v=0}^{2^N-1} C_{v} \prod_{i=0}^{N-1} M_{s_i, v_i}
$$

这本质上是一个矩阵乘法 $f = T C$。

矩阵 $T$ 达到 $2^{20} \times 2^{20}$，难以直接计算，但考虑到 $s$ 和 $v$ 的每一位二进制是完全独立的，矩阵 $T$ 实际上是由 $N$ 个相同的 **$2 \times 2$** 基础矩阵通过 Kronecker 乘积构成。

$$\begin{pmatrix} f_0 \\ f_1 \end{pmatrix} \gets \begin{pmatrix} M_{0,0} & M_{0,1} \\ M_{1,0} & M_{1,1} \end{pmatrix} \begin{pmatrix} f_0 \\ f_1 \end{pmatrix}$$
