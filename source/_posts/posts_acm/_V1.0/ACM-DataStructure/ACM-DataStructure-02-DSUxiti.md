---
title: 數據結構 - 併查集習題集
tags:
  - 算法
  - 數據結構
  - 筆記
  - ACM
categories:
  - - 筆記
    - 算法筆記
abbrlink: bed9a53a
date: 2024-03-28 09:20:13
updated: 2024-03-30 09:19:56
description:
---

> *本文需要重写。*

# Disjoint Set Union 併查集



一些常用：

- 求元素 $k$ 所在連通圖的元素數量 $S_k=\left\{1\leqslant i\leqslant n ~\vert\operatorname{find}(k)=\operatorname{find}(i)\right\}$：

  ```cpp
  for (int i = 1; i <= n; ++i) {
      Sk += find(k) == find(i);
  }
  ```

- 求連通圖總數 $S=\left\{1\leqslant i\leqslant n ~\vert\operatorname{find}(i)=i\right\}$，至少需要 $S-1$ 條線才能將所有連通圖連通：

  ```cpp
  for (int i = 1; i <= n; ++i) {
      ans += find(i) == i;
  }
  ```





## 利用 DSU 解決問題

### [VJspr1G - Chemical table - UPSLOVE](https://codeforces.com/problemset/problem/1013/D)

- **題意** 给出一个 $n \times m$ 矩形，可以在格点上放置点，對於任意兩行兩列，如果相交的四个格子中有三个格子有点，那麽第四个格子將自動放置一个点。起初已經有一些点，求最小手動添加点的次數，使得整个矩形內的格子都有点。

- **思路** 用兩个併查集分別存儲行和列的連通狀態，如果一行上有多个点，就將這些点所在的列連通，同理將每一列的幾个点所在的行連通，統計行的連通圖總數 $S_1$ 以及列的連通圖總數 $S_2$，將所有連通圖連通的最小邊數是 $\max\{S_1,S_2\}-1$。

  > 值得思考的是，取最大值的原理是什麽？
  >
  > 如樣例二，豎着看是三个連通圖，橫着數是一个，那最終是三个連通圖。這幾个樣例似乎都沒問題，但直覺上有点面向樣例編程了，得找个反例。
  >
  > 事實上，將点合併這个過程是正確的，但是沒有点的部分會出現問題。比如 $2 \times 2$ 的空格，正確答案是至少需要 $3$ 步，但依此方法，豎着數是 $2$ 个，橫着數也是 $2$ 个，答案是 $1$ 步。
  >
  > 因此上述思路並不合理。

  回到原問題，所求的是將所有連通圖連通的最小邊數，首先應思考，題給數據是如何連通的？不難發現，每一个点的作用實際上是將該行和該列連通，這也是「第四个格子將自動放置一个点」的原理。一句話概括，**將行列視爲点，將点視爲邊**。因此，我們創建一个 $n+m$ 大小的併查集，前 $n$ 个元素代表行，後 $m$ 个元素代表列，如果 $(x,y)$ 有点，則連接 $x$ 行（即 $x$）和 $y$ 列（即 $y+n$）這兩个元素，統計連通圖總數 $S$，結果是 $S-1$。

- **代碼** 

  ```cpp
  int n = read(), m = read(), q = read();
  init(n + m);
  while (q--) uno(read() + n, read()); // WA
  int ans = 0;
  for (int i = 1; i <= n + m; ++i) ans += find(i) == i;
  print(ans - 1);
  ```






### [VJspr1F - Cthulhu](https://codeforces.com/problemset/problem/103/B)

> *「都被分屍了能是一隻克蘇鲁嗎？」——Shu*

- **題意** 克蘇鲁：An undirected graph that can be represented as a set of three or more rooted trees, whose roots are connected by a simple cycle。

- **思路** 是連通圖，且僅包含一个環。

  - 如果在合併連通圖時，發現兩个元素的根節点相同，那麼必然形成一个環
  - 樹滿足 $v=e+1$，因此僅包含一个環時有 $v=e$。

- **代碼**

  ```cpp
  int n = read(), e = read();
  init(n);
  int cnt = 0;
  for (int i = 0; i < e; ++i) {
      int x = read(), y = read();
      if (find(x) == find(y)) cnt++; // 父級相同 有環
      uno(x, y);
  }
  printf("%s\n", cnt == 1 && n == e ? "FHTAGN!" : "NO"); // WAon46
  ```



### [VJspr7F - Cow and Snacks](https://codeforces.com/contest/1209/problem/D) - UPSLOVE

- **題意** 有 $m$ 個客人，$n$ 種花，每種一朵，到店裏買走他所喜歡的 $2$ 朵花中所有的。給出 $k$ 個客人的順序，使買不到花的客人數量最少。
- **思路** 以花爲點，客人爲邊建圖。一個大小爲 $>1$ 的連通塊可滿足 $S_i-1$ 個客人，具體實現方法是，先任選一客人，再按 BFS 序選擇其它客人。於是能買到的有 $\sum(S_i-1)=n-S$ 人，買不到的有 $m-(n-S)$ 人。







## 選擇題（帶權併查集）

### **[VJwin8I - 選擇題 - UPSLOVE](https://www.luogu.com.cn/problem/P6691)**

- **題意** 一道有 $n$ 个選項的選擇題，第 $i$ 个選項的內容的形式爲「第 $a_i$ 个選項是正確/錯誤的」。判斷是否存在合法的答案，如存在，給出合法答案數、正確選項數量的最大值和最小值。

- **思路及代碼** 首先我們定義 `tf[]`，表示 **與根節点的關係**，取 `1` or `0`。

  我們從初始化、查詢、合併、統計四个角度修改併查集：

  - **初始化** 注意若有多組輸入，`tf[]` 也需初始化：

    ```cpp
    inline void init(int n) {
        for (int i = 1; i <= n; ++i)
            fa[i] = i, tf[i] = 0;
    }
    ```

  - **查詢** 熟知，併查詢的查詢功能是遞推（或許是遞歸，不重要了）找到根節点，這不需要修改。但需要注意，下述的合併過程僅僅是對根節点的 `tf[]` 作了修改，而其它節点沒有，所以我們需要在查詢過程中更新 `tf[]`，本題按異或(^)關係，寫爲 `tf[x] ^= tf[fa_x]`。

    ```cpp
    int find(int x) {
        if (fa[x] != x) {
            int fa_x = fa[x];
            fa[x] = find(fa[x]);
            tf[x] ^= tf[fa_x]; // 此依題而異
        }
        return fa[x];
    }
    ```

  - **合併** 熟知，併查詢的合併功能是將甲節点的根 `fa_x` 連接至乙節点的根上。現在我們已知甲和乙是 `!opt` 的關係，爲了使合併後甲和乙依舊保持 `!opt` 的關係，在合併時需要對甲節点的根 `fa_x` 與乙節点的根的關係作調整，以保證調整之後甲與根節点的關係 `tf[x] ^ tf[fa_x]` 和乙與根節点的關係 `tf[y]` 相差 `!opt`，也即 `tf[fa_x] ^ tf[x] ^ tf[y] = !opt`，因此，我們調整 `tf[fa_x]` 爲 `tf[x] ^ tf[y] ^ !opt`。

    ```cpp
    inline void uno(int x, int y, bool opt) {
        int fa_x = find(x), fa_y = find(y);
        if (fa_x != fa_y) {
            tf[fa_x] = tf[x] ^ tf[y] ^ !opt; // 此依題而異
            fa[fa_x] = fa_y;
        }
    }
    ```

  - **統計** 首先是判斷是否有解：

    ```cpp
    for (int x = 1; x <= n; ++x) {
        int y = read(), opt = read(); // x 說 y 是 opt 的
        if (find(x) == find(y) && (tf[x] ^ tf[y] ^ !opt) == 1)
            flag = 0; // 父級相同 但關係矛盾
        else uno(x, y, opt);
    }
    if (!flag) { puts("No answer"); return; }
    ```

    我們定義一个數組 `cnt[N][2]`，表示每个連通圖中，同正確或同錯誤的選項个數（哪个表示正確哪个表示錯誤是無關係的，因爲我們總可以調控根節点的正確性以切換正確或錯誤），統計方式是：

    ```cpp
    for (int i = 1; i <= n; ++i) {
        cnt[find(i)][tf[i]]++; // 記錄連通圖中0和1的个數
    }
    ```

    對於合法答案數，是 $2^S$，其中 $S$ 是連通圖總數，對於正確選項數量的最大（小）值，只需統計所有連通圖中同正確同錯誤的數量的最大（小）值：

    ```cpp
    int ans = 1, cntmx = 0, cntmn = 0;
    for (int i = 1; i <= n; ++i) {
        if (find(i) == i) { // 根節点
            ans <<= 1;
            cntmx += max(cnt[i][1], cnt[i][0]);
            cntmn += min(cnt[i][1], cnt[i][0]);
        }
    }
    print(ans, cntmx, cntmn);
    ```



上題與根節点的關係只有 `1` 和 `0` 兩種，下題的關係更加複雜。

### [**VJspr1B - 食物鏈 - UPSLOVE**](http://poj.org/problem?id=1182)

- **題意** 三類動物，甲吃乙， 乙吃丙，丙吃甲，求假話數量。

- **思路** 我們從初始化、查詢、合併、統計四个角度修改併查集，以下只展示與「選擇題」的區別：

  - **初始化** 略
  - **查詢** 修改爲 `tf[x] += tf[fa_x];`
  - **合併** 修改爲 `tf[fa_x] = tf[y] - tf[x] + op; // 這裏的 op 取 1(捕食) or 0(同類)`
  - **統計** 判斷條件修改爲 `(tf[x] - tf[y] - op) % 3 != 0`

- **代碼**

  ```cpp
  int ans = 0;
  while (m--) {
      int op = read() - 1, x = read(), y = read();
      find(x), find(y);
      if (x > n || y > n) ++ans;
      else if (find(x) == find(y) && (tf[x] - tf[y] - op) % 3 != 0) ++ans;
      else uno(x, y, op);
  }
  print(ans);
  ```



再舉一例，此題需要引入額外的變量：

### **[VJspr1A - Cube Stacking - UPSLOVE](http://poj.org/problem?id=1988)**

- **題意** 定義合併操作是，將該元素所在隊列移動到另一元素後面，求指定元素前面有幾个元素。

- **思路及代碼** 我們從初始化、查詢、合併、統計四个角度修改併查集。

  首先我們定義 `num[]`，表示所在隊列（連通圖）元素數目，以及 `front[]`，表示所在隊列前面的元素數目，若需查詢在後面的數目，僅需 `num[i]-1-front[i]`。

  - **初始化**

    ```cpp
    inline void init(int n) {
        for (int i = 1; i <= n; ++i)
            fa[i] = i, num[i] = 1, front[i] = 0;
    }
    ```

  - **查詢**

    ```cpp
    int find(int x) {
          if (fa[x] != x) {
            int fa_x = fa[x];
            fa[x] = find(fa[x]);
            front[x] += front[fa_x]; // 修改的部分 此依題而異
        }
        return fa[x];
    } // 此函數兼具更新front的作用 與「選擇題」類似
    ```

  - **合併** 

    ```cpp
    inline void uno(int x, int y) {
          int fa_x = find(x), fa_y = find(y);
        front[fa_x] += num[fa_y], num[fa_y] += num[fa_x], num[fa_x] = 0;
        // 將x移動至y隊列的後面 此依題而異
        fa[fa_x] = fa_y;
    }
    ```

  - **統計** 合併：

    ```cpp
    int x = read(), y = read();
    uno(x, y);
    ```

    查詢 `front[]`：

    ```cpp
    find(x); // WA: 更新x的數據
    print(front[x]);
    ```

    查詢 `num[]`：

    ```cpp
    print(num[find(x)]);
    ```



### [VJspr1I - How Many Answers Are Wrong](https://acm.hdu.edu.cn/showproblem.php?pid=3038) - UPSLOVE

- **題意** 給出多組描述 $l,r,S$，表示 $a_l+\dots+a_r=S$，求與前文矛盾的描述的數量。

- **思路** 轉化爲帶權併查集。

- **代碼** 

  ```cpp
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
  ```

  其中

  ```cpp
  int find(int x) {
      if (x != fa[x]) {
          int fa_x = fa[x];
          fa[x] = find(fa[x]);
          tf[x] += tf[fa_x];
      }
      return fa[x];
  }
  ```



### **[VJspr7A - 封锁阳光大学](https://www.luogu.com.cn/problem/P1330)**

- **題意** 對圖中的點染色，使每條邊的兩端點異色。

- **思路** 選擇題。

- **代碼**

  ```cpp
  int fa[N], tf[N], cnt[N][2];
  inline void init(int n) {
      for (int i = 1; i <= n; ++i) fa[i] = i, tf[i] = 0;
  }
  int find(int x) {
      if (x != fa[x]) {
          int fa_x = fa[x]; fa[x] = find(fa[x]); 
          tf[x] = (tf[x] + tf[fa_x]) % 2;
      }
      return fa[x];
  }
  
  inline void uno(int i, int j) {
      int x = find(i), y = find(j);
      tf[x] = (tf[j] - tf[i] + 1) % 2;
      fa[x] = y;
  }
  void eachT() {
      int n = read(), m = read();
      init(n);
      while (m--) {
          int x = read(), y = read();
          if (find(x) == find(y) && tf[x] == tf[y])
              return void(printf("Impossible\n"));
          else uno(x, y);
      }
      for (int i = 1; i <= n; ++i) ++cnt[find(i)][tf[i]];
      int ans = 0;
      for (int i = 1; i <= n; ++i) if (find(i) == i) ans += min(cnt[i][0], cnt[i][1]);
      printf("%d\n", ans);
  }
  ```

  






## 種類併查集

### [**VJspr1C - A Bug's Life**](http://poj.org/problem?id=2492)

- **題意** 給出婚配情況，判斷是否有性別矛盾。

- **思路** 分兩个併查集。合併時，將第一个的元素與第二个的合併；查詢時，如果第一个併查集和第二个併查集中某个元素在同一連通圖中，則有性別矛盾。

- **代碼**

  ```cpp
  int n = read(), e = read();
  init(2 * n);
  while (e--) {
      int x = read(), y = read();
      uno(x, y + n);
      uno(y, x + n);
  }
  bool flag = 1;
  for (int i = 1; i <= n; ++i) {
      if (find(i) == find(n + i)) flag = 0;
  }
  printf("%s\n\n", flag ? "No suspicious bugs found!", "Suspicious bugs found!"); // PE
  ```

- **評註** 我的方法是依「選擇題」改編，前面的部分從略，主函數：

  ```cpp
  int n = read(), e = read();
  init(n);
  bool flag = 1;
  while (e--) {
      int x = read(), y = read();
      if (find(x) == find(y) && tf[x] == tf[y]) {
          flag = 0; // 父級相同 但關係矛盾
      }
      uno(x, y, 0);
  }
  printf("%s\n\n", flag ? "No suspicious bugs found!", "Suspicious bugs found!"); // PE
  ```

  

### [**VJspr1B - 食物鏈 - UPSLOVE**](http://poj.org/problem?id=1182)

- **題意** 三類動物，甲吃乙， 乙吃丙，丙吃甲，求假話數量。

- **思路** 分三个併查集。

  > 解釋：
  >
  > 對於上一个題目，兩个併查集實際上是「同性集」和「異性集」*（這是相互的關係，取決於研究對象在哪个集合，而不是說一个叫同性集而另一个叫異性集）*，所謂「將第一个的元素與第二个的合併」，即是將元素與異性合併在一个連通圖中，所謂「第一个併查集和第二个併查集中某个元素在同一連通圖中」，即是判斷自己是不是在異性集中，如果是，那麼自己是自己的異性，顯然是矛盾的。
  >
  > 對於本題，三个併查集實際上是「同類」、「食物」和「天敵」，我們可以人爲地規定「吃」是前一个併查集吃後一个併查集（這樣，捕食的方向已經由三个併查集的序號刻畫，有向圖便轉化爲類無向圖）。只需將前一个併查集的甲元素與後一个併查集的乙元素連線（合併在一个連通圖中，注意區分「併查集」和「連通圖」），即可刻畫「吃」這个關係，且注意，它們的捕食是循環的，所以這樣是合理的。也就是說，對於兩个已經連線的元素，如果在同一个併查集間，它們是同類關係，如果在不同的併查集間，它們是捕食關係。當然，與上一題不同的是，合併在同一組的元素，是在同一个併查集內合併。如何刻畫矛盾？依題意，自己不能吃自己，所以，自己不能在對應的食物集中，也不能在天敵集中。

- **代碼**

  ```cpp
  int n = read(), q = read();
  init(3 * n);
  int ans = 0;
  while (q--) {
      int opt = read(), x = read(), y = read();
      if (x > n || y > n)
          ++ans;
      else if (opt == 1) { // 同類
          if (find(x + n) == find(y) || find(x) == find(y + n))
              ++ans; 
          else {
              uno(x, y);
              uno(n + x, n + y);
              uno(n + n + x, n + n + y);
          }
      } else {
          if (find(x) == find(y) || find(x + n) == find(y))
              ++ans;
          else {
              uno(x, n + y);
              uno(n + x, n + n + y);
              uno(n + n + x, y);
          }
      }
  }
  print(ans);
  ```



