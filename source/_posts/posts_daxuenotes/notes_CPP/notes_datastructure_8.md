---
title: 数据结构第八讲：二叉树的遍历和构造
tags:
  - 筆記
  - cpp
  - 數據結構
categories:
  - posts_daxuenotes
  - notes_CPP
description: 數據結構第八講：二叉樹的遍歷和構造
cover: /img/posts/notes/notes-datastructure.webp
top_img: /img/posts/notes/notes-datastructure.webp
highlight_shrink: true
aside: true
abbrlink: 8d166cf1
date: 2024-11-07 12:00:00
updated: 2024-11-07 12:00:00
---

*[返回目录](../notes/)*

## §6.5 二叉树的遍历

- **先序遍历**：先遍历根节点，然后遍历左节点，最后遍历右节点
- **中序遍历**：先遍历左节点，然后遍历根节点，最后遍历右节点（把树平面投影至二维从左到右）
- **后序遍历**：先遍历左节点，然后遍历右节点，最后遍历根节点
- **层次遍历**：从上向下，同一层从左向右

## §6.6 二叉树的构造

给定某些遍历序列，反过来确定该二叉树。

例如，一棵二叉树的先序序列和中序序列相同，设二叉树的先序序列为 NLR，中序序列为 LNR，由于 N 不能为空，故 L 为空，所以这样的二叉树为右单支树。

对于不同形态的二叉树，先序、中序、后序序列可能相同，而先序序列和后序序列可能同时分别相同，因此，只能 **由先（后）序序列和中序序列** 能够唯一确定一棵二叉树。具体的方法是，由先（后）序序列 **确定根的位置**，在中序序列中找根，划分左右子树，递归地寻找。

## §6.7 二叉树与树之间的转换

将森林转化为二叉树的形式化的方法是：

- 树中所有相邻兄弟之间加一条连线；

- 对树中的每个节点，只保留它与第一个孩子节点之间的连线，删除它与其他孩子节点之间的连线；

- 以树的根节点为轴心，将整棵树顺时针转动 45 度，使之结构层次分明。

- 如果是森林，第一棵二叉树不动，从第二棵二叉树开始，依次把后一棵二叉树的根节点作为前一棵二叉树根节点的右孩子节点，当所有二叉树连在一起后，此时所得到的二叉树就是由森林转换得到的二叉树。

*实际上**右子节点是兄弟，左子节点是第一个子节点**，如果是森林就补一个超级根。*

还原也是同理。

## §6.8 线索二叉树

概念：对于 $n$ 个节点的二叉树，在二叉链存储结构中有 $n+1$ 个空链域。二叉树的遍历，无论是递归还是非递归算法，效率都不算高。所以想把这些空链域用上。二叉树的遍历会得到一个序列，如果在建立二叉树（先中后序遍历）时没有子节点，就记录下前驱后继的关系，这些记录关系的指针称为线索，加上线索的二叉树称为线索二叉树。

实现：线索二叉树在原二叉链中增加了 `ltag` 和 `rtag` 两个标志域，没有 tag 就正常遍历，如果有 tag，左子树指父亲，右子树指下一个遍历的节点。

意义：找一个节点的前驱后继的时候更方便快捷。

## §6.9 哈夫曼树

从根节点到各个叶子节点的路径长度（指路径上边的数量）与相应节点权值的乘积的和称为该二叉树的带权路径长度

$$
\operatorname{WPL}=\sum_{i=0}^{n-1}w_{i}l_{i}.
$$

其中具有最小带权路径长度的二叉树称为 **哈夫曼树**。也就是说，权值越大的叶子节点越靠近根节点，权值越小的叶子节点越远离根节点。构造方法是，每次从树集合中取出 **两个最小** 的将其合并，然后重新加入集合，反复操作。

**哈夫曼编码**：树中从根到每个 **叶子** 都有一条路径，对路径上的各分支约定指向左子树根的分支表示 0 码，指向右子树的分支表示 1 码，取每条路径上的 0 或 1 的序列作为和各个叶子对应的字符的编码，这就是 **哈夫曼编码**。没有一个字符的哈夫曼编码是另一个字符的哈夫曼编码的 **前缀**。



## §Notes

### §A

```cpp
#include <iostream>
using namespace std;
#define MaxSize 100
typedef char ElemType;

typedef struct tnode {
    ElemType data;
    struct tnode* lchild, * rchild;
} BTNode;

void CreateBTree(BTNode*& bt, char* str)//由括号表示串创建二叉链
{
    BTNode* St[MaxSize], * p = NULL;
    int top = -1, k, j = 0;
    char ch;
    bt = NULL;            //建立的二叉树初始时为空
    ch = str[j];
    while (ch != '\0')    //str未扫描完时循环
    {
        switch (ch) {
            case '(':top++; St[top] = p; k = 1; break;//为左孩子节点
            case ')':top--; break;
            case ',':k = 2; break;    //为右孩子节点
            default:p = new BTNode();
                p->data = ch; p->lchild = p->rchild = NULL;
                if (bt == NULL)    //*p为二叉树的根节点
                    bt = p;
                else            //已建立二叉树根节点
                {
                    switch (k) {
                        case 1:St[top]->lchild = p; break;
                        case 2:St[top]->rchild = p; break;
                    }
                }
        }
        j++;
        ch = str[j];
    }
}
void DestroyBTree(BTNode*& bt)        //销毁二叉链
{
    if (bt != NULL) {
        DestroyBTree(bt->lchild);
        DestroyBTree(bt->rchild);
        delete bt;
    }
}
// 在此处补充你的代码

void PreOrder(BTNode*& bt) {
    if (bt == nullptr) return;
    cout << bt->data;
    PreOrder(bt->lchild);
    PreOrder(bt->rchild);
}

void InOrder(BTNode*& bt) {
    if (bt == nullptr) return;
    InOrder(bt->lchild);
    cout << bt->data;
    InOrder(bt->rchild);
}

void PostOrder(BTNode*& bt) {
    if (bt == nullptr) return;
    PostOrder(bt->lchild);
    PostOrder(bt->rchild);
    cout << bt->data;
}

int main() {
    char tree[MaxSize];
    cin >> tree;
    BTNode* bt;
    CreateBTree(bt, tree);
    PreOrder(bt); cout << endl;
    InOrder(bt); cout << endl;
    PostOrder(bt); cout << endl;
    DestroyBTree(bt);
    return 0;
}
```

### §B

```cpp
int main() {
    string s;
    cin >> s;

    BinaryTree<char> bt(s);

    cout << bt.levelorder() << endl;

    return 0;
}
```

### §C

```cpp
int main() {
    string s;
    cin >> s;

    BinaryTree<char> bt(s);

    auto res = bt.preorder();

    char c;
    cin >> c;

    res = res.substr(0, res.find(c) + 1);
    for (auto c : res) {
        cout << c << " ";
    }

    return 0;
}
```

### §D

```cpp
int main() {
    int t;
    cin >> t;

    while (t--) {
        string s1, s2;
        cin >> s1 >> s2;

        BinaryTree<char> bt1(s1), bt2(s2);

        cout << (bt1.shape() == bt2.shape() ? "same" : "different") << endl;
    }

    return 0;
}
```

### §E

```cpp
struct node {
    int val;
    int id;
    bool used;
    BinaryTree<char> bt;
    bool operator<(const node& o) const {
        return val == o.val ? id < o.id : val < o.val;
    }
} v[N];

int main() {
    int n;
    cin >> n;

    for (int i = 1; i <= n; i++) {
        char c;
        cin >> c;
        v[i].bt.root = new BinaryTree<char>::node;
        v[i].bt.root->data = c;
        v[i].bt.root->ls = v[i].bt.root->rs = nullptr;
        v[i].bt.root->parent = nullptr;
        v[i].used = false;
    }

    for (int i = 1; i <= n; i++) {
        cin >> v[i].val;
        v[i].id = i;
    }

    int siz = n + 1;
    v[0].val = 0x3f3f3f3f;
    v[0].id = 0;
    v[0].used = false;
    v[0].bt.root = nullptr;

    for (int t = 1; t < n; t++) {
        int imin = 0, imin2 = 0;
        for (int i = 1; i < siz; i++) {
            if (v[i] < v[imin] && !v[i].used) {
                imin2 = imin;
                imin = i;
            } else if (v[i] < v[imin2] && !v[i].used) {
                imin2 = i;
            }
        }
        v[siz].bt.root = new BinaryTree<char>::node;
        v[siz].bt.root->data = ':';
        v[siz].bt.root->parent = nullptr;
        v[siz].bt.root->ls = v[imin].bt.root;
        v[siz].bt.root->ls->data = '0';
        v[siz].bt.root->rs = v[imin2].bt.root;
        v[siz].bt.root->rs->data = '1';
        v[siz].val = v[imin].val + v[imin2].val;
        v[siz].id = siz;
        v[siz].used = false;
        v[imin].used = v[imin2].used = true;
        siz++;
    }

    auto bt = v[siz - 1].bt;

    for (int i = 1; i <= n; i++) {
        cout << v[i].bt.root->data << bt.path(v[i].bt.root) << endl;
    }

    bt.delete_subtree(bt.root);
    for (int i = 1; i <= siz; i++) {
        v[i].bt.root = nullptr;
    }

    return 0;
}
```