---
title: 數據結構 - 併查集
tags:
  - 算法
  - 數據結構
  - 筆記
  - ACM
categories:
  - - 筆記
    - 算法筆記
abbrlink: b226c66
date: 2024-03-28 09:20:13
updated: 2024-03-30 09:19:56
description:
---

> *本文需要重写。*

# Disjoint Set Union (Uno-Find Set)

路径压缩：

```cpp
int fa[N];
inline void init(int n) { for (int i = 1; i <= n; ++i) fa[i] = i; }
int find(int x) { return x == fa[x] ? x : (fa[x] = find(fa[x])); }
inline void uno(int x, int y) { fa[find(x)] = find(y); }
```

按秩合併：

```cpp
int fa[N], rnk[N];
inline void init(int n) { for (int i = 1; i <= n; ++i) fa[i] = i, rnk[i] = 1; }
int find(int x) { return x == fa[x] ? x : (fa[x] = find(fa[x])); }
inline void uno(int i, int j) {
    int x = find(i), y = find(j);
    if (rnk[x] <= rnk[y]) fa[x] = y;
    else fa[y] = x;
    if (rnk[x] == rnk[y] && x != y) rnk[y]++;
}
```

帶權併查集：

```cpp
int fa[N], num[N], front[N];
inline void init(int n) { for (int i = 1; i <= n; ++i) fa[i] = i, num[i] = 1, front[i] = 0; }
int find(int x) {
    if (fa[x] != x) {
        int fa_x = fa[x];
        fa[x] = find(fa[x]);
        front[x] += front[fa_x]; // 此依題而異
    }
    return fa[x];
}
inline void uno(int x, int y) {
    int fa_x = find(x), fa_y = find(y);
    front[fa_x] += num[fa_y], num[fa_y] += num[fa_x], num[fa_x] = 0;
    // 將x移動至y隊列的後面 此依題而異
    fa[fa_x] = fa_y;
}
```


一些常用：

- 求元素 $k$ 所在連通圖的元素數量 $S_k=\left\{1\leqslant i\leqslant n ~\vert\operatorname{find}(k)=\operatorname{find}(i)\right\}$：

  ```cpp
  for (int i = 1; i <= n; ++i) Sk += find(k) == find(i);
  ```
  
- 求連通圖總數 $S=\left\{1\leqslant i\leqslant n ~\vert\operatorname{find}(i)=i\right\}$，至少需要 $S-1$ 條線才能將所有連通圖連通：

  ```cpp
  for (int i = 1; i <= n; ++i) ans += find(i) == i;
  ```



## 選擇題（帶權併查集）

**问题** 一道有 $n$ 个選項的選擇題，第 $i$ 个選項的內容的形式爲「第 $a_i$ 个選項是正確/錯誤的」。判斷是否存在合法的答案，如存在，給出合法答案數、正確選項數量的最大值和最小值。（[VJwin8I - 選擇題 - UPSLOVE](https://www.luogu.com.cn/problem/P6691)）

**思路** 先我們定義 `tf[]`，表示 **與根節点的關係**，取 `1` or `0`。

```cpp
int fa[N], tf[N], cnt[N][2];

inline void init(int n) { for (int i = 1; i <= n; ++i) fa[i] = i, tf[i] = 0; }

int find(int x) {
    if (fa[x] != x) {
        int fa_x = fa[x];
        fa[x] = find(fa[x]);
        tf[x] ^= tf[fa_x]; // 此依題而異
    }
    return fa[x];
}

inline void uno(int x, int y, bool opt) {
    int fa_x = find(x), fa_y = find(y);
    if (fa_x != fa_y) {
        tf[fa_x] = tf[x] ^ tf[y] ^ !opt; // 此依題而異
        fa[fa_x] = fa_y;
    }
}

void eachT() {
    int n;
    init(n);

    bool flag = 1;
    for (int x = 1; x <= n; ++x) {
        int y = read(), opt = read(); // x 說 y 是 opt 的
        if (find(x) == find(y) && (tf[x] ^ tf[y] ^ !opt) == 1)
            flag = 0; // 父級相同 但關係矛盾
        else uno(x, y, opt);
    }

    if (!flag) return puts("No answer"), void();

    for (int i = 1; i <= n; ++i) cnt[find(i)][tf[i]] += 1; // 記錄連通圖中0和1的个數

    int ans = 1, cntmx = 0, cntmn = 0;
    for (int i = 1; i <= n; ++i) {
        if (find(i) == i) { // 根節点
            ans <<= 1;
            cntmx += max(cnt[i][1], cnt[i][0]);
            cntmn += min(cnt[i][1], cnt[i][0]);
        }
    }
    print(ans, cntmx, cntmn);
}
```

---

上題與根節点的關係只有 `1` 和 `0` 兩種，下題的關係更加複雜。

**題意** 三類動物，甲吃乙， 乙吃丙，丙吃甲，求假話數量。（[VJspr1B - 食物鏈 - UPSLOVE](http://poj.org/problem?id=1182)）

**思路** 與「選擇題」的區別：

- **初始化** 略
- **查詢** 修改爲 `tf[x] += tf[fa_x];`
- **合併** 修改爲 `tf[fa_x] = tf[y] - tf[x] + op; // 這裏的 op 取 1(捕食) or 0(同類)`
- **統計** 判斷條件修改爲 `(tf[x] - tf[y] - op) % 3 != 0`

亦可使用 **種類併查集**：

```cpp
int n = read();
init(3 * n);
int ans = 0;
for (int q = read(); q--; ) {
    int opt = read(), x = read(), y = read();
    if (x > n || y > n) ++ans;
    else if (opt == 1) { // 同類
        if (find(x + n) == find(y) || find(x) == find(y + n)) ++ans; 
        else uno(x, y), uno(n + x, n + y), uno(n + n + x, n + n + y);
    } else {
        if (find(x) == find(y) || find(x + n) == find(y)) ++ans;
        else uno(x, n + y), uno(n + x, n + n + y), uno(n + n + x, y);
    }
}
print(ans);
```



---

再舉一例，此題需要引入額外的變量：

**題意** 定義合併操作是，將該元素所在隊列移動到另一元素後面，求指定元素前面有幾个元素。（[VJspr1A - Cube Stacking - UPSLOVE](http://poj.org/problem?id=1988)）

**思路** 首先我們定義 `num[]`，表示所在隊列（連通圖）元素數目，以及 `front[]`，表示所在隊列前面的元素數目，若需查詢在後面的數目，僅需 `num[i]-1-front[i]`。

```cpp
inline void init(int n) { for (int i = 1; i <= n; ++i) fa[i] = i, num[i] = 1, front[i] = 0; }

int find(int x) {
    if (fa[x] != x) {
        int fa_x = fa[x];
        fa[x] = find(fa[x]);
        front[x] += front[fa_x]; // 修改的部分 此依題而異
    }
    return fa[x];
} // 此函數兼具更新front的作用 與「選擇題」類似

inline void uno(int x, int y) {
      int fa_x = find(x), fa_y = find(y);
    front[fa_x] += num[fa_y], num[fa_y] += num[fa_x], num[fa_x] = 0;
    // 將x移動至y隊列的後面 此依題而異
    fa[fa_x] = fa_y;
}

void eachT() {
    find(x); // WA: 更新x的數據
    print(front[x]);
    print(num[find(x)]);
}
```

**題意** 給出多組描述 $l,r,S$，表示 $a_l+\dots+a_r=S$，求與前文矛盾的描述的數量。（[VJspr1I -How Many Answers Are Wrong](https://acm.hdu.edu.cn/showproblem.php?pid=3038) - UPSLOVE）

```cpp
int find(int x) {
    if (x != fa[x]) {
        int fa_x = fa[x];
        fa[x] = find(fa[x]);
        tf[x] += tf[fa_x];
    }
    return fa[x];
}
void eachT() {
    init(read()); int q = read(), ans = 0;
    while (q--) {
        int y = read() - 1, x = read(), dep = read();
        if (find(x) == find(y) && tf[x] - tf[y] - dep) ++ans;
        else {
            int fa_x = find(x), y = find(y);
            tf[fa_x] = tf[y] - tf[x] + dep; // 爲了合併後tf[fa_x]+tf[x]-tf[y]==dep
            fa[fa_x] = fa_y;
        }
    }
    print(ans);
}
```


