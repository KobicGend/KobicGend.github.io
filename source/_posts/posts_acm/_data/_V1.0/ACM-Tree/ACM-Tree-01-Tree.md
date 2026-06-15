---
title: 樹上問題 - 樹形 DP
tags:
  - 算法
  - 圖論
  - 筆記
  - ACM
categories:
  - - 筆記
    - 算法筆記
abbrlink: 43a1bd89
date: 2024-05-08 12:00:00
updated: 2024-05-08 12:00:00
description:
---

# Tree

```cpp
struct node {
    string data;
    int l, r;
}t[10005];

void pretvs(int k) { //先序遍历：先遍历根节点，然后遍历左节点，最后遍历右节点
    if (k == 0)return;
    cout << t[k].data;
    if (t[k].l != 0) pretvs(t[k].l);
    if (t[k].r != 0) pretvs(t[k].r);
}
void intvs(int k) {//中序遍历：先遍历左节点，然后遍历根节点，最后遍历右节点（大概可以理解为把树平面投影至二维从左到右）
    if (k == 0)return;
    if (t[k].l != 0) intvs(t[k].l);
    cout << t[k].data;
    if (t[k].r != 0) intvs(t[k].r);
}
void posttvs(int k) {//后序遍历：先遍历左节点，然后遍历右节点，最后遍历根节点
    if (k == 0)return;
    if (t[k].l != 0) {
        posttvs(t[k].l);
    }
    if (t[k].r != 0) {
        posttvs(t[k].r);
    }
    cout << t[k].data;
}


//层序遍历：从上到下，从左到右遍历，通常使用队列，遍历完一个数就把它的左右孩子结点分别加入队列中
void depth(int k, int num) {
    if (t[k].data) {
        num++;
        ans = max(ans, num);//不能先比较，比较多次会很慢很慢
        if (t[k].l) depth(t[k].l, num);
        if (t[k].r) depth(t[k].r, num);
    }
}
```

+ 用中序遍历和先序遍历、后序遍历中的其一可以唯一确定一棵树

```cpp
#include<iostream>
#include<string>
using namespace std;
/*
假设根节点在中序遍历中的位置为pos，树的结点数为len，即 len=inorder.length()
代码：pos = inorder.find(preorder[0]) or pos = inorder.find(postorder[postorder.size()-1])
先序遍历(NLR), 根节点编号(0), 左子树编号(1~pos), 右子树编号(pos+1~len-1)
中序遍历(LNR), 左子树编号(0~pos-1), 根节点编号(pos), 右子树编号(pos+1~len-1)
后序遍历(LRN), 左子树编号(0~pos-1), 右子树编号(pos~len-2), 根点编号(len-1)
*/
void postorder(string preorder, string inorder) {//由先序遍历+中序遍历序列，递归实现后序遍历 (LRN) 
    int len = preorder.length();
    if (len == 0)
        return;
    if (len == 1) { //单个结点 
        cout << preorder[0];
        return;
    }
    int pos = inorder.find(preorder[0]);  // 查找根节点在中序序列中的位置，通过根节点划分左右子树 
    // 类似于后序遍历过程
    postorder(preorder.substr(1, pos), inorder.substr(0, pos));//后序遍历左子树
    postorder(preorder.substr(pos + 1, len - pos - 1), inorder.substr(pos + 1, len - pos - 1));//后序遍历右子树，pos从0开始，所以len-pos-1 
    cout << preorder[0];  //最后输出根节点 
}
void preorder(string inorder, string postorder) //由中序遍历+后序遍历序列，递归实现先序序列 (NLR)
{
    int len = postorder.length();
    if (len == 0) // 空树 
        return;
    if (len == 1) { // 单个结点
        cout << inorder[0];
        return;
    }
    int pos = inorder.find(postorder[len - 1]);
    // 类似于先序遍历过程
    cout << postorder[len - 1];
    preorder(inorder.substr(0, pos), postorder.substr(0, pos)); //先序遍历左子树 
    preorder(inorder.substr(pos + 1, len - pos - 1), postorder.substr(pos, len - pos - 1));//先序遍历右子树 
}
int main() {
    string s1, s2;
    while (cin >> s1 >> s2) {
        postorder(s1, s2);
        // preorder(s1, s2); 
        cout << endl;
    }
}
```

