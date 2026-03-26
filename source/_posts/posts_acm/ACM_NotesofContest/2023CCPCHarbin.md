---
title: 2023 CCPC 哈尔滨｜Apr.27 CUC-ACM-2024-Spring-Training Round
tags:
  - 題解
  - 練習賽
  - 筆記
  - ACM
categories:
  - - 筆記
    - 練習賽
description: 第九届中国大学生程序设计竞赛（哈尔滨）
highlight_shrink: true
abbrlink: 94e4d876
date: 2024-04-27 17:00:00
updated: 2024-04-27 17:00:00
---

第九届中国大学生程序设计竞赛（哈尔滨）

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    int sum = 0, f = 0;
    string ans;

    int q;
    cin >> q;
    while (q--) {
        int x;
        cin >> x;
        sum += x;

        if (sum > 0 || sum == 0 && f == 1) {
            ans += '+';
        }
        else if (sum < 0 || sum == 0 && f == -1) {
            ans += '-';
        }
        else {
            ans += '0';
        }

        if (sum % 2) f = sum % 2;
        sum /= 2;
    }
    cout << ans << "\n";

    return 0;
}
```