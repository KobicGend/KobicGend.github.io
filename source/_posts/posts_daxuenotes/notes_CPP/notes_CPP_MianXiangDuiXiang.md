---
title: C++ 面向对象
tags:
  - cpp
  - 筆記
categories:
  - posts_daxuenotes
  - notes_CPP
abbrlink: dfe8c51f
date: 2024-05-01 12:00:00
updated: 2024-05-23 22:00:00
description:
---

本笔记基于中国大学慕课《[C/C++语言程序设计(下)（沈萦华老师）](https://www.icourse163.org/spoc/course/CUC-1470755169)》及「[OpenJudge - 信通学院编程小组](http://cucdmt.openjudge.cn/)」。

- [[#§0  C++ 基础|§0  C++ 基础]]
    - [[#§0.1  指针|§0.1  指针]]
    - [[#§0.2  命名空间|§0.2  命名空间]]
    - [[#§0.3  引用|§0.3  引用]]
    - [[#§0.4  函数|§0.4  函数]]
- [[#§1  类和对象基本概念与特性|§1  类和对象基本概念与特性]]
    - [[#§1.1  类的基本概念|§1.1  类的基本概念]]
    - [[#§1.2  构造函数与析构函数|§1.2  构造函数与析构函数]]
    - [[#§1.3  this 指针|§1.3  this 指针]]
- [[#§2  类的进阶特性|§2  类的进阶特性]]
    - [[#§2.1  静态成员 static|§2.1  静态成员 static]]
    - [[#§2.2  常量成员函数 const|§2.2  常量成员函数 const]]
    - [[#§2.3  友元 friend|§2.3  友元 friend]]
    - [[#§2.4  重载运算符 operator|§2.4  重载运算符 operator]]
    - [[#§2.5  输入输出和文件操作|§2.5  输入输出和文件操作]]
    - [[#§2.6  类模板|§2.6  类模板]]
- [[#§3  面向对象核心|§3  面向对象核心]]
    - [[#§3.1  复合|§3.1  复合]]
    - [[#§3.2  继承、派生|§3.2  继承、派生]]
    - [[#§3.3  多态|§3.3  多态]]




<div STYLE="page-break-after: always;"></div>

## §0  C++ 基础


### §0.1  指针

[指针](../posts/b29f922a.html)

### §0.2  命名空间

> ——避免命名冲突。

```cpp
namespace A {
    int x, y;
}
// 三种使用方式
void fun1() {
    x = 8;     // Error
    A::y = 6;  // OK
}
void fun2() {
    using namespace A;
    x = 8;  // OK
    y = 6;  // OK
}
void fun3() {
    using namespace A::y;
    x = 8;  // Error
    y = 6;  // OK
}
```


<div STYLE="page-break-after: always;"></div>

### §0.3  引用


#### §0.3.1  引用

即别名：

```cpp
const int maxN = 3e5 + 8;
int n = 1, m = 2;
int& a = n;  // OK
int& b; b = n;  // Error 需立即初始化
int& c = n; c = &m;  // Error 不可重新命名
int& d = maxN;  // Error 不可引用常量
```

**例 1.1** 调用传递引用的参数，实现两个字符串变量的交换。

```cpp
void swap(char*& a, char*& b) {  
    char* tmp = a; a = b; b = tmp;
}
int main() {
    char* ap = (char*)"hello";
    char* bp = (char*)"how are you?";
    swap(ap, bp);
}
```

**评注** 在 C 语言中，需使用

```c
void swap(char** a, char** b) {    
    char* tmp = *a; *a = *b; *b = tmp;  
}
int main() {  
    char* ap = (char*)"hello";  
    char* bp = (char*)"how are you?";  
    swap(&ap, &bp);
}
```





#### §0.3.2  常引用

常引用不可修改：

```cpp
int n = 8;
const int& a = n;
a = 6;  // Error 不能修改常引用以修改引用的变量
n = 6;  // OK
int& b = a;  // Error 不能以 const T& 初始化 T&
int& c = (int&)a;  // OK 强制转换后可以初始化
const int& b = a;  // OK
```




<div STYLE="page-break-after: always;"></div>

### §0.4  函数

#### §0.4.1  内联函数 inline

**功能** 任何调用函数的地方都换成了其代码。

**作用** 避免因为频繁大量的使用栈空间，而造成因栈空间不足所造成的程式出错的问题，函数的死循环递归调用的最终结果就是导致栈内存空间枯竭。

**代码风格** 它是用于实现的关键字：

```cpp
inline void fun1(int n);
void fun1(int n) {
    
} // Ugly

void fun2(int n);
inline void fun2(int n) {
    
} // OK
```

**适用情形** 只适合函数体内代码简单的函数数使用：
- 不能包含复杂的结构控制语句例如 `while`、`switch`；
- 内联函数本身不能是直接递归函数。

**不适用情形** 内联是以代码膨胀为代价，因此以下情况不宜使用内联：
- 如果函数体内的代码比较长，使用内联将导致内存消耗代价较高。
- 如果函数体内出现循环，那么执行函数体内代码的时间要比函数调用的开销大。

#### §0.4.2  函数重载

名字相同但参数个数或参数类型不同的函数：

```cpp
int max(double f1, double f2) { } // (1)
int max(int n1, int n2) { } // (2)
int max(int n1, int n2, int n3) { } // (3)
int main() {
    max(3.4, 2.5);  // 调用 (1)
    max(2, 4);  // 调用 (2)
    max(1, 2, 3);  //调用 (3)
    max(3, 2.4);  // Error
}
```



#### §0.4.3  带默认参数的函数（函数的缺省参数）

**作用** 提高程序的可扩充性。

```cpp
int fun(int x = 1, int y = 2);
int main() {
    cout << fun(6, 8);  // 14
    cout << fun(6);  // 8
    cout << fun();  // 3
}
int fun(int x, int y) {
    return x + y;
}
```

**注意** 在指定了默认值的参数的右边，不能出现没有指定默认值的参数。只能最右边连续的几个参数缺省。

#### §0.4.4  传值、传址与传引用

**例 2** 修改程序。将其修改为传引用参数，并修改 `findmax()` 为非递归函数。

```cpp
void findmax(int* a, int n, int i, int* pk);
int main() {
    int a[10], n = 0;
    for (int i = 0; i < 10; ++i)
        cin >> a[i];
    findmax(a, 10, 0, &n);
}
void findmax(int* a, int n, int i, int* pk) {
    if (i < n) {
        if (a[i] > a[*pk])
            *pk = i;
        findmax(a, n, i + 1, &(*pk));
    }
}
```


```cpp
void findmax(int* a, int n, int i, int& pk);
int main() {
    int a[10], n = 0;
    for (int i = 0; i < 10; ++i)
        cin >> a[i];
    findmax(a, 10, 0, n);
}
void findmax(int* a, int n, int i, int& pk) {
    for (int i = 0; i < n; ++i) {
        if (a[i] > a[pk])
            pk = i;
    }
}
```





**例 3** 分析代码，思考哪些可以实现两数交换：

```cpp
void swap1(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
}  // 值作参数 交换函数参数值 swap1(a, b); Ugly
void swap2(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}  // 指针作参数 交换指针指向内容 swap2(&a, &b); OK
void swap3(int* a, int* b) {
    int* temp = a;
    a = b;
    b = temp;
}  // 指针作参数 交换指针 swap3(&a, &b); Ugly
void swap4(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}  // 引用作参数 交换参数值 swap4(a, b); OK
```





#### §0.4.5  函数返回引用

函数作为左值：

```cpp
int mx;
int& max(int a, int b) {
    mx = a > b ? a : b;
    return mx;
}
int main() {
    int a = 6, b = 8;
    cout << max(a, b);
}
```

**例 4** 生成有 10 个整数的安全数组。要把值放入数组中，使用 `put()` 函数，然后使用 `get()` 取出该值。

```cpp
int vals[10];
int error = -1;
int& put(int n) {
    if (n >= 0 && n < 10) return vals[n];
    cout << "RE";
    return error;
}
int get(int n) {
    if (n >= 0 && n < 10) return vals[n];
    return error;
}
int main() {
    int n; cin >> n;
    if (put(n) == -1) return 0;
    cin >> put(n);
    cout << get(n) << endl;
    return 0;
}
```





**例 5** 

```cpp
int& fun(int a) {
    static int t = 0;
    return t += 2 * a;
}
int main() {
    int x = 1, y = 2;
    cout << ++fun(x); // 3
    cout << ++fun(y); // 8
}
```





<div STYLE="page-break-after: always;"></div>


## §1  类和对象基本概念与特性


### §1.1  类的基本概念

#### §1.1.1  类成员关键字

- 基类的 private 成员：
  - 基类的成员函数
  - 类的友元函数
- 类的 public 成员：
  - 基类的成员函数
  - 基类的友元函数
  - 派生类的成员函数
  - 派生类的友元函数
  - 其他的函数
- 基类的 protected 成员：
  - 基类的成员函数
  - 基类的友元函数
  - 派生类的成员函数可以访问当前对象和其它对象的基类的保护成员

#### §1.1.2  类的成员变量和成员函数的使用

```cpp
对象名.成员名
指针->成员名
引用名.成员名
```

示例：

```cpp
#include <iostream>

class Cat {
private:
    int age;
public:
    void SetAge(int _age) {
        age = _age;
    }
    int GetAge();
    void Meow() { std::cout << "Meow." << '\n'; }
};

int Cat::GetAge() {
    return age;
}

int main() {
    Cat frisky;
    frisky.SetAge(5);
    frisky.Meow();
    std::cout << frisky.GetAge() << " years old." << '\n';
    frisky.Meow();
    return 0;
}
```


<div STYLE="page-break-after: always;"></div>

### §1.2  构造函数与析构函数

- **构造函数** 初始化成员变量。构造函数需 public；构造函数名与类名相同；可定义不同的构造函数以初始化不同情形。
- **拷贝构造函数** `X::X(X& other)` 当用类对象初始化另一对象、以类为参数调用函数或函数返回类时调用。在赋值时不起作用。
- **类型转换构造函数** 实现类型的自动转换。只有一个参数，而且不是复制构造函数的构造函数，一般看作转换构造函数。
- **析构函数** 在对象消亡（包括程序结束、函数参数消亡、在函数中作为临时对象返回）时调用，可用于 `delete`。

```cpp
class myClass {  
private:  
    int value;  
    string name;  
  
public:  
    // 构造函数  
    myClass(int val, const string& n) : value(val), name(n) {}  
  
    // 拷贝构造函数  
    myClass(const myClass& other) : value(other.value), name(other.name) {}  
  
    // 类型转换构造函数  
    myClass(int val) : value(val), name("Default") {}
  
    // 析构函数  
    ~myClass() {}
};  
  
int main() {  
    myClass obj1(8, "Obj1");  // 使用构造函数  
    myClass obj2 = obj1;  // 使用拷贝构造函数  
    myClass obj3(8);  // 使用类型转换构造函数
}
```



**例** 使用运算符 `new` 分配堆内存，当程序结束时使用 `delete` 及时释放堆内存：

```cpp
#include <iostream>  

class Samp {
private:
    int a;
public:
    void Setij(int _a);
    ~Samp() { std::cout << "Destroying: " << a << std::endl; }
    int GetMulti();
};
void Samp::Setij(int _a) { a = _a; }
int Samp::GetMulti() { return a; }

int main() {
    Samp* a[10]; // 堆对象数组，存储指针  
    for (int k = 0; k < 10; ++k) {
        a[k] = new Samp(); // 使用new在堆上分配Samp对象  
        a[k]->Setij(k);
    }
    for (int k = 0; k < 10; ++k) std::cout << "Multi[" << k << "] is: " << a[k]->GetMulti() << std::endl;
    for (int k = 9; k >= 0; --k) delete a[k]; // 释放每个Samp对象的内存  
    return 0;
}
```



<div STYLE="page-break-after: always;"></div>

### §1.3  this 指针

>当你进入 3427 后，你可以看见桌游、火锅等，但是你看不到 3427 的全貌了。
>但 this 指针时时刻刻指向着 3427 本身。

——指向被调用的成员函数所属的对象。

```cpp
class myClass {
public:
    int num;
    myClass(int num) {
        this->num = num; // 当形参和成员变量同名时，可用 this 指针来区分
    }
    myClass& add(myClass other) {
        this->num += other.num;
        return *this; // 在类的非静态成员函数中返回对象本身
    }
};
```

- this 指针的本质是一个 **指针常量**。
- 每个非静态成员函数中都隐含着 this 指针，因此类的非静态成员函数，真实的参数比所写的参数多 1。
- this 指针 **只能在成员函数中使用，不能在全局函数、静态成员函数中使用**（因为静态成员函数并不具体作用与某个对象）。
- this 指针和函数的其他参数生命周期一样，在成员函数的开始前构造，并在成员函数的结束后清除。


<div STYLE="page-break-after: always;"></div>


## §2  类的进阶特性

### §2.1  静态成员 static

——为所有对象共享。

- 静态成员本质上是 **全局变量**。
- 静态成员函数 **不具体作用于某个对象**，因此静态成员不需要通过对象就能访问。
- 在静态成员函数中，不能访问非静态成员变量，也不能调用非静态成员函数。
- `sizeof` 不会计算静态成员变量。

**例**

```cpp
#include <iostream>

class myClass {
protected:
    int val;
    static int static_val;
public:
    myClass(int _val) : val(_val) { static_val++; }
    ~myClass() { static_val--; }
    int Get() const { return val; }
    static int GetStatic() { return static_val; }
};

int myClass::static_val = 0;

int main() {
    myClass* obj1 = new myClass(5);
    myClass* obj2 = new myClass(80);
    myClass* obj3 = new myClass(20);

    std::cout << "obj1 val: " << obj1->Get() << ", static_val: " << myClass::GetStatic() << std::endl;
    std::cout << "obj2 val: " << obj2->Get() << ", static_val: " << myClass::GetStatic() << std::endl;
    std::cout << "obj3 val: " << obj3->Get() << ", static_val: " << myClass::GetStatic() << std::endl;

    delete obj1;
    std::cout << "After deleting obj1, static_val: " << myClass::GetStatic() << std::endl;

    delete obj2;
    std::cout << "After deleting obj2, static_val: " << myClass::GetStatic() << std::endl;

    delete obj3;
    std::cout << "After deleting obj3, static_val: " << myClass::GetStatic() << std::endl;

    return 0;
}
```





<div STYLE="page-break-after: always;"></div>

### §2.2  常量成员函数 const

——不能改变属性的值，也不能调用非常量成员函数。

```cpp
class myClass {
private:
    int num;
    mutable val;
public:
    void fun1() {}
    void fun2() const {
        num = 0;  // Error 不能改变属性的值
        val = 0;  // OK mutable 成员变量可以在 const 成员函数中修改。
        fun();  // Error 不能调用非常量成员函数
    }
    void fun2() {}  // 允许重载
};

int main() {
    const myClass obj;
    obj.fun1();  // Error 常量对象只能使用构造函数、析构函数和有 const 说明的函数 (常量方法)
    obj.fun2();  // OK
}
```



<div STYLE="page-break-after: always;"></div>

### §2.3  友元 friend

**友元函数** 可以访问类的私有、保护和公开成员，无论它们在类的哪个部分声明。它的定义不受限于类的封装性，声明位置不会影响其访问权限。

```cpp
class myClass {
private:
    int val;
    friend void Set(myClass& obj, int _val);
public:
    myClass() : val(0) {}
    void Put() const { std::cout << "val=" << val << std::endl; }
};

void Set(myClass& obj, int _val) {
    obj.val = _val;
}

int main() {
    myClass obj;
    Set(obj, 5);
    obj.Put();
    return 0;
}
```

在类 A 中声明类 B 的友元函数，则类 B 可以访问类 A 的私有成员。

```cpp
class myClassA;  // 前置声明 myClassA  

class myClassB {  
public:  
    // myClassB 的成员函数，同时也是 myClassA 的友元  
    void displaynum(const myClassA& obj);  
};  

class myClassA {  
private:
    int num;
public:  
    myClassA(int value) : num(value) {}  
    // 声明 myClassB 的 displaynum 函数为友元  
    friend void myClassB::displaynum(const myClassA& obj);  
};  
  
// 定义 myClassB 中的友元函数  
void myClassB::displaynum(const myClassA& obj) {  
    cout << "myClassA 的私有成员变量 num 的值为: " << obj.num << endl;  
}  
  
int main() {  
    myClassA a(8);  
    myClassB b;  
    b.displaynum(a);  // 使用 myClassB 的对象调用友元函数访问 myClassA 的私有成员  
    return 0;  
}
```

**友元类** 如果在 A 中声明 B 是 A 的友元类，那么 B 的成员函数可以访问 A 的私有成员。

```cpp
class myClassA {  
private:  
    int num;  
public:  
    myClassA(int value) : num(value) {}  
    friend class myClassB;
};  

class myClassB {  
public:  
    void displaynum(myClassA& obj) {  
        cout << obj.num << endl;
    }  
};  

int main() {  
    myClassA obj(8);  
    myClassB friendobj;
    friendobj.displaynum(obj);
}
```



<div STYLE="page-break-after: always;"></div>

### §2.4  重载运算符 operator

#### §2.4.1  自动取模类

```cpp
template<const int T>
struct ModInt {
    const static int _mod = T;
    int _x;
    ModInt(int _x = 0) : _x(_x% _mod) {}
    ModInt(ll _x) : _x(int(_x% _mod)) {}
    int vale() { return _x; }
    ModInt operator + (const ModInt& _a) const { int _b = _x + _a._x; return ModInt(_b < _mod ? _b : _b - _mod); }
    ModInt operator - (const ModInt& _a) const { int _b = _x - _a._x; return ModInt(_b < 0 ? _b + _mod : _b); }
    ModInt operator * (const ModInt& _a) const { return ModInt(1LL * _x * _a._x % _mod); }
    ModInt operator / (const ModInt& _a) const { return *this * _a.inv(); }
    ModInt& operator++() { _x += 1; if (_x >= _mod) _x -= _mod; return *this; }
    ModInt operator++(int) { ModInt temp = *this; ++(*this); return temp; }
    ModInt& operator--() { if (_x == 0) _x += _mod; _x -= 1; return *this; }
    ModInt operator--(int) { ModInt temp = *this; --(*this); return temp; }
    bool operator == (const ModInt& _a) const { return _x == _a._x; };
    bool operator != (const ModInt& _a) const { return _x != _a._x; };
    void operator += (const ModInt& _a) { _x += _a._x; if (_x >= _mod) _x -= _mod; }
    void operator -= (const ModInt& _a) { _x -= _a._x; if (_x < 0) _x += _mod; }
    void operator *= (const ModInt& _a) { _x = 1LL * _x * _a._x % _mod; }
    void operator /= (const ModInt& _a) { *this = *this / _a; }
    friend ModInt operator + (int _y, const ModInt& _a) { int _b = _y + _a._x; return ModInt(_b < _mod ? _b : _b - _mod); }
    friend ModInt operator - (int _y, const ModInt& _a) { int _b = _y - _a._x; return ModInt(_b < 0 ? _b + _mod : _b); }
    friend ModInt operator * (int _y, const ModInt& _a) { return ModInt(1LL * _y * _a._x % _mod); }
    friend ModInt operator / (int _y, const ModInt& _a) { return ModInt(_y) / _a; }
    friend ostream& operator<<(ostream& os, const ModInt& _a) { return os << _a._x; }
    friend istream& operator>>(istream& is, ModInt& _t) { return is >> _t._x; }
    ModInt pow(ll n) const {
        if (n == 0) return 1;
        ModInt res(1), mul(_x);
        while (n) {
            if (n & 1) res *= mul;
            mul *= mul;
            n >>= 1;
        }
        return res;
    }
    ModInt inv() const {
        int _a = _x, _b = _mod, _u = 1, _v = 0;
        while (_b) {
            int _t = _a / _b;
            _a -= _t * _b; swap(_a, _b);
            _u -= _t * _v; swap(_u, _v);
        }
        if (_u < 0) _u += _mod;
        return _u;
    }
};
typedef ModInt<1000000007> mint;
```

#### §2.4.2  重载运算符

```cpp
class Complex {
    double Re, Im;
    Complex(double r = 0.0, double i = 0.0) :Re(r), Im(i) {}
    Complex operator-(const Complex& b);
};
Complex operator+(const Complex& a, const Complex& b) {
    return Complex(a.Re + b.Re, a.Im + b.Im);  // 返回一个临时对象
}  // 重载为普通函数
Complex Complex::operator-(const Complex& b) {
    return Complex(Re - b.Re, Im - b.Im);  // 返回一个临时对象
}  // 重载为成员函数时 参数个数减一
```

- 不允许定义新的运算符；
- 对运算符进行重载的时候，应尽量保留运算符原本的特性；
- `".", ".*", "::", "?:", "sizeof"` 不能被重载；
- 重载运算符 `"()", "[]", "->", "="`时，必须声明为类的成员函数。

一般情况下，将运算符重载为类的成员函数，是较好的选择。但有时，重载为成员函数不能满足使用要求，重载为普通函数，又不能访问类的私有成员，所以需要将运算符重载为友元。

```cpp
class Complex {
    double Re, Im;
public:
    Complex(double r, double i) :Re(r), Im(i) {};
    Complex operator+(double r);
    friend Complex operator+ (double r, const Complex& c);
};
Complex Complex::operator+(double r) { // 解释 c+5
    return Complex(Re + r, Im);
}
Complex operator+ (double r, const Complex& c) { // 解释 5+c
    return Complex(c.Re + r, c.Im);
}
```

**重载流插入、提取运算符**：

使用 `ostream& ostream::operator<<(int n)` 重载流插入运算符 `<<`，流提取运算符 `>>` 同理：

```cpp
class Complex {
    double Re, Im;
public:
    Complex(double r = 0, double i = 0) :Re(r), Im(i) {};
    friend ostream& operator<<(ostream& os, const Complex& c);
    friend istream& operator>>(istream& is, Complex& c);
};
ostream& operator<<(ostream& os, const Complex& c) {
    if (c.Im > 0) {
        if (c.Re) os << c.Re << "+";
        os << c.Im << "j";
    } else if (c.Im < 0) {
        if (c.Re) os << c.Re;
        os << c.Im << "j";
    } else {
        os << c.Re;
    }
    return os;
}
istream& operator>>(istream& is, Complex& c) {
    double r, i;
    char cc;
    is >> r >> cc >> i;
    c.Re = r;
    c.Im = i;
    return is;
}
```

对于 `<<` 操作符，通常将其 **重载为全局函数**，而不是作为 `ostream` 类的成员函数。这是因为 `<<` 操作符的左侧通常是一个 `ostream` 对象（如 `cout`），而右侧是我们想要插入到流中的对象。如果 `<<` 作为 `ostream` 的成员函数，那么它将只能访问 `ostream` 对象的内部状态，而不能直接访问其右侧的对象。对于 `>>` 同理。

**重载类型转换运算符**：

```cpp
class Complex {
    double Re, Im;
public:
    Complex(double r = 0, double i = 0) :Re(r), Im(i) {};
    operator double() { return Re; }
};
```

**重载自增、自减运算符**：

前置运算符作为一元运算符重载，即 `T& operator++();`（重载为成员函数）或 `T1 & operator++(T2);`（重载为全局函数）；而后置运算符作为二元运算符重载，多写一个没用的参数，即 `T operator++(int);`（重载为成员函数）或 `T1 operator++(T2, int);`（重载为全局函数）。

```cpp
class Complex {
    double Re, Im;
public:
    Complex(double r = 0.0, double i = 0.0) : Re(r), Im(i) {}
    Complex& operator++() {
        ++Re;
        return *this;
    } // 前置++运算符重载作为成员函数  
    Complex operator--(int) {
        Complex temp(*this);
        --Im;
        return temp;
    } // 后置--运算符重载作为成员函数  
    friend Complex operator++(Complex& c, int);
    friend Complex& operator--(Complex& c);
};
Complex operator++(Complex& c, int) {
    Complex temp(c);
    ++c.Re;
    return temp;
} // 后置++运算符重载作为全局函数  
Complex& operator--(Complex& c) {
    --c.Im;
    return c;
} // 前置--运算符重载作为全局函数
```




#### §2.4.3  浅拷贝和深拷贝

```cpp
class myString {
private:
    char* str;
public:
    myString() :str(new char[1]) { str[0] = 0; }
    const char* c_str() { return str; };
    myString& operator = (const char* s);
    ~myString() { delete[] str; }
};
myString& myString::operator = (const char* s) { // 重载 "="
    delete[] str;
    str = new char[strlen(s) + 1];
    strcpy(str, s);
    return *this;
}
int main() {
    myString s;
    s = "Hello";
    cout << s.c_str() << endl;
    return 0;
}
```

以上代码（**浅拷贝**，只是简单地复制了原对象的指针值）中，执行 `s1=s2` 后，`s1.str` 和 `s2.str` 指向同一地方，因此需要补充拷贝构造函数的重载（**深拷贝**，分配新的内存来存储原对象的数据并复制原对象的数据到新分配的内存中）：

```cpp
myString& operator = (const myString& s) {
    delete[] str;
    str = new char[strlen(s.str) + 1];
    strcpy(str, s.str);
    return *this;
}
```

但为避免 `s=s`，需进一步补充：

```cpp
myString& operator = (const myString& s) {
    if (this == &s) return *this;
    delete[] str;
    str = new char[strlen(s.str) + 1];
    strcpy(str, s.str);
    return *this;
}
```

编写拷贝构造函数的时候，会面临和 `=` 同样的问题，用同样的方法处理。

```cpp
myString(myString& s) {
    str = new char[strlen(s.str) + 1];
    strcpy(str, s.str);
}
```

总的代码：

```cpp
#include <cstdlib>
#include <iostream>
using namespace std;
int strlen(const char* s) {
    int i = 0;
    for (; s[i]; ++i);
    return i;
}
void strcpy(char* d, const char* s) {
    int i = 0;
    for (i = 0; s[i]; ++i)
        d[i] = s[i];
    d[i] = 0;

}
int strcmp(const char* s1, const char* s2) {
    for (int i = 0; s1[i] && s2[i]; ++i) {
        if (s1[i] < s2[i])
            return -1;
        else if (s1[i] > s2[i])
            return 1;
    }
    return 0;
}
void strcat(char* d, const char* s) {
    int len = strlen(d);
    strcpy(d + len, s);
}
class MyString {
private:
    char* str;
public:
    MyString(const char* s = NULL) {
        if (s) {
            str = new char[strlen(s) + 1];
            strcpy(str, s);
        } else {
            str = new char[1];
            str[0] = '\0';
        }
    }
    ~MyString() {
        if (str) delete[] str;
    }
    MyString(const MyString& s) {
        if (s.str) {
            str = new char[strlen(s.str) + 1];
            strcpy(str, s.str);
        } else {
            str = new char[1];
            str[0] = '\0';
        }
    }
    MyString& operator= (const char* s) {
        if (str == s) {
            return *this;
        }
        delete[] str;
        if (s) {
            str = new char[strlen(s) + 1];
            strcpy(str, s);
        } else {
            str = new char[1];
            str[0] = '\0';
        }
        return *this;
    }
    MyString& operator=(const MyString& s) {
        if (str == s.str) {
            return *this;
        }
        delete[] str;
        if (s.str) {
            str = new char[strlen(s.str) + 1];
            strcpy(str, s.str);
        } else {
            str = new char[1];
            str[0] = '\0';
        }
        return *this;
    }
    friend MyString  operator+ (const MyString& a, const MyString& b) {
        char* tmp = new char[strlen(a.str) + strlen(b.str) + 1];
        strcpy(tmp, a.str);
        strcat(tmp, b.str);
        return MyString(tmp);
    }
    friend ostream& operator<< (ostream& o, const MyString& s) {
        o << s.str;
        return o;
    }
    char& operator[] (int i) {
        return str[i];
    }
    MyString& operator+= (const char* s) {
        char* tmp = new char[strlen(str) + 1];
        strcpy(tmp, str);
        delete[] str;
        str = new char[strlen(tmp) + strlen(s) + 1];
        strcpy(str, tmp);
        strcat(str, s);
        return *this;
    }
    friend MyString operator+ (const char* p, const MyString& s) {
        char* tmp = new char[strlen(p) + strlen(s.str) + 1];
        strcpy(tmp, p);
        strcat(tmp, s.str);
        return MyString(tmp);
    }
    friend MyString operator+ (const MyString& s, const char* p) {
        char* tmp = new char[strlen(s.str) + strlen(p) + 1];
        strcpy(tmp, s.str);
        strcat(tmp, p);
        return MyString(tmp);
    }
    friend bool operator< (const MyString& s1, const MyString& s2) {
        if (strcmp(s1.str, s2.str) < 0) {
            return true;
        } else {
            return false;
        }
    }
    friend bool operator> (const MyString& s1, const MyString& s2) {
        if (strcmp(s1.str, s2.str) > 0) return true;
        else
            return false;
    }
    friend bool operator== (const MyString& s1, const MyString& s2) {
        if (strcmp(s1.str, s2.str) == 0) return true;
        else
            return false;
    }

    char* operator() (int start, int length) {
        char* tmp = new char[length + 1];
        for (int i = start; i < start + length; ++i) {
            tmp[i - start] = str[i];
        }
        tmp[length] = '\0';
        return tmp;
    }
};


int CompareString(const void* e1, const void* e2) {
    MyString* s1 = (MyString*)e1;
    MyString* s2 = (MyString*)e2;
    if (*s1 < *s2)
        return -1;
    else if (*s1 == *s2)
        return 0;
    else if (*s1 > *s2)
        return 1;
}
int main() {
    MyString s1("abcd-"), s2, s3("efgh-"), s4(s1);
    MyString SArray[4] = { "big","me","about","take" };
    cout << "1. " << s1 << s2 << s3 << s4 << endl;
    s4 = s3;
    s3 = s1 + s3;
    cout << "2. " << s1 << endl;
    cout << "3. " << s2 << endl;
    cout << "4. " << s3 << endl;
    cout << "5. " << s4 << endl;
    cout << "6. " << s1[2] << endl;
    s2 = s1;
    s1 = "ijkl-";
    s1[2] = 'A';
    cout << "7. " << s2 << endl;
    cout << "8. " << s1 << endl;
    s1 += "mnop";
    cout << "9. " << s1 << endl;
    s4 = "qrst-" + s2;
    cout << "10. " << s4 << endl;
    s1 = s2 + s4 + " uvw " + "xyz";
    cout << "11. " << s1 << endl;
    qsort(SArray, 4, sizeof(MyString), CompareString);
    for (int i = 0; i < 4; ++i)
        cout << SArray[i] << endl;
    //s1的从下标0开始长度为4的子串
    cout << s1(0, 4) << endl;
    //s1的从下标5开始长度为10的子串
    cout << s1(5, 10) << endl;
    return 0;
}
```


**例**  分别用浅拷贝和深拷贝实现：
(1) 在类体外实现构造函数 `Vector()`，动态分配内存，建立 `for` 循环，从 `0-size` 依次将 `[序列号的平方]` 赋值给数组 `buffer`；
(2) 在类体外实现 `display()` 函数，依次输出数组 `buffer` 的值；
(3) 在类体外实现 `set()` 函数，建立 `for` 循环，从 `0-size` 依次将 `[序列号+1]` 赋值给数组 `buffer` ；
(4) 在类体外实现析构函数 `~Vector()`，释放内存。

```cpp
#include <iostream>

class Vector {
private:
    int size;
    int* buffer;
public:
    Vector(int s = 100);
    Vector(const Vector& v);  // 浅拷贝构造函数
    void display();
    void set();
    ~Vector();
};

Vector::Vector(int s) {
    size = s;
    buffer = new int[size];
    for (int i = 0; i < size; ++i) buffer[i] = i * i;
}

Vector::Vector(const Vector& v) {
    size = v.size;
    buffer = new int[size];
    for (int i = 0; i < size; ++i) {
        buffer[i] = v.buffer[i];
    }
}

void Vector::display() {
    for (int i = 0; i < size; ++i) std::cout << buffer[i] << " ";
    std::cout << std::endl;
}

void Vector::set() {
    for (int i = 0; i < size; ++i) buffer[i] = i + 1; // 这将同时修改原始对象和复制对象的buffer
}

Vector::~Vector() {
    delete[] buffer;  // 这里要小心，因为复制对象也指向这个buffer
}

int main() {
    Vector a(10);
    Vector b(a);  // 浅拷贝，b和a共享buffer
    a.display();
    b.set();
    b.display();  // 这将显示修改后的值，因为b和a共享buffer
    return 0;
}
```



浅拷贝：

```cpp
Vector::Vector(const Vector& v) {
    size = v.size;
    buffer = v.buffer;  // 浅拷贝，共享内存
}
```

存在内存泄漏的风险，因为 `b` 和 `a` 都试图删除同一个 `buffer`。

深拷贝：

```cpp
Vector::Vector(const Vector& v) {
    size = v.size;
    buffer = new int[size];  // new出一个新内存
    for (int i = 0; i < size; ++i) {
        buffer[i] = v.buffer[i];
    }
}
```




<div STYLE="page-break-after: always;"></div>

### §2.5  输入输出和文件操作

#### §2.5.1  与输入输出流操作相关的类

- **`istream`** 是用于输入的流类，`cin` 就是该类的对象。
- **`ostream`** 是用于输出的流类，`cout` 就是该类的对象。
- **`ifstream`** 是用于从文件读取数据的类。
- **`ofstream`** 是用于向文件写入数据的类。
- **`iostream`** 是既能用于输入，又能用于输出的类。
- **`fstream`** 是既能从文件读取数据，又能向文件写入数据的类。

#### §2.5.2  标准流对象

- **`cin` `cout`** 与标准输入设备相连
- **`cerr` `clog`** 与标准错误输出设备相连

- **`cin`** 对应于标准输入流，用于从键盘读取数据，也可以被重定向为从文件中读取数据。
- **`cout`** 对应于标准输出流，用于向屏幕输出数据，也可以被重定向为向文件写入数据。
- **`cerr`** 对应于标准错误输出流，用于向屏幕输出出错信息。
- **`clog`** 对应于标准错误输出流，用于向屏幕输出出错信息，`cerr` 和 `clog` 的区别在于 `cerr` 不使用缓冲区，直接向显示器输出信息；而输出到 `clog` 中的信息先会被存放在缓冲区，缓冲区满或者刷新时才输出到屏幕。

#### §2.5.3  I/O流控制符

> *（从早读讲义里复制的，所以是繁体）*

下列控制符均需頭文件 `#include <iomanip>`，绝大多數具有保留效力，除了 `setw`：

```cpp
/* 控制浮点數值显示 */
double a = 22.0/7;
cout << fixed << setprecision(3) << a << endl;         // 3.143 保留三位小數 %.3lf
cout << scientific << setprecision(2) << a << endl; // 3.143e+00 保留兩位小數的科学计數法 %.2e

/* 設置值的輸出宽度 */
cout << setw(8) << 10 << 20 << endl;                //       1020 設置宽度 %.*d
cout << setfill('*') << setw(8) << 10 << 20 << endl;// ******1020 設置填充字符
cout << left << setw(8) << 10 << 20 << endl;        // 10******20 左對齊 %-

/* 輸出八進制數和十六進制數 */ 
cout << dec << 1001 << endl;                    // 1001 十進制 %d
cout << hex << uppercase << 1001 << endl;        // 3E9  十六進制大写輸出 %X
cout << hex << nouppercase << 1001 << endl;        // 3e9  十六進制小写輸出 %x
cout << oct << 1001 << endl;                    // 1751 八進制 %o

/* 强制輸出小數点或符号 */
double b = 10.0/5;
cout << showpoint << b << endl;                    // 2.00000     %lf
cout << showpos << b << endl;                    // +2.00000 %+lf
cout << noshowpoint << b << endl;                // 2         %g
cout << noshowpos << b << endl;                    // 2.00000  %lf
```


#### §2.5.4  输入输出类的成员函数

- **`bool eof()`** 判断输入流是否结束
- **`int peek()`** 返回下一个字符，但不从流中去掉
- **`istream & putback(char c)`** 将字符 `ch` 放回输入流
- **`istream & ignore( int nCount = 1, int delim = EOF )`** 从流中删掉最多 `nCount` 个字符，遇到 `EOF` 时结束。
- **`getline(char * buf, int bufSize)`** 从输入流中读取 `bufSize-1` 个字符到缓冲区 `buf`，或读到碰到 `\n` 为止（哪个先到算哪个）。
- **`getline(char * buf, int bufSize,char delim)`** 从输入流中读取 `bufSize-1 `个字符到缓冲区 `buf`，或读到碰到 `delim` 字符为止（哪个先到算哪个）。两个函数都会自动在 `buf` 中读入数据的结尾添加 `\0`。`\n` 或 `delim` 都不会被读入 `buf`，但会被从输入流中取走。

**自定义流操纵算子**：

```cpp
ostream& tab(ostream& output) {
    return output << '\t';
}
cout << "1" << tab << "2" << endl;
```


#### §2.5.5  文件操作和输入、输出重定向

```cpp
freopen("t.txt", "r", stdin); // cin被改为从 t.txt中读取数据
freopen("test.txt", "w", stdout); // 将标准输出重定向到 test.txt文件
int x, y;
cin >> x >> y;
if (y == 0)  // 除数为0则在屏幕上输出错误信息
    cerr << "error." << endl;
else
    cout << x / y; // 输出结果到test.txt
```

文件操作略，写大作业的时候再补、



<div STYLE="page-break-after: always;"></div>

### §2.6  类模板

```cpp
template <typename T>
class Calculate {
    T n1, n2;
public:
    Calculate(T n1, T n2) : n1(n1), n2(n2) {}
    T add() { return n1 + n2; }
    T sub() { return n1 - n2; }
    T mul() { return n1 * n2; }
    T div() { return n2 ? n1 / n2 : 0; }
};

int main() {
    Calculate<float> cal1(1.1f, 2.2f);
    std::cout << cal1.add() << std::endl
        << cal1.sub() << std::endl
        << cal1.mul() << std::endl
        << cal1.div() << std::endl;
    Calculate<int> cal2(1, 2);
    std::cout << cal2.add() << std::endl
        << cal2.sub() << std::endl
        << cal2.mul() << std::endl
        << cal2.div() << std::endl;
    return 0;
}
```

亦可以在类外定义：

```cpp
template <typename T>
class Calculate {
    T n1, n2;
public:
    Calculate(T n1, T n2) : n1(n1), n2(n2) {}
    T add();
    T sub();
    T mul();
    T div();
};

template <typename T>
T Calculate<T>::add() {
    return n1 + n2;
}

template <typename T>
T Calculate<T>::sub() {
    return n1 - n2;
}

template <typename T>
T Calculate<T>::mul() {
    return n1 * n2;
}

template <typename T>
T Calculate<T>::div() {
    return n2 ? n1 / n2 : 0;
}
```

还有一种写法：

```cpp
class Calculate {
public:
    template <typename T>
    T add(T a, T b) { return a + b; }

    template <typename T>
    T minus(T a, T b) { return a - b; }

    template <typename T>
    T multiply(T a, T b) { return a * b; }

    template <typename T>
    T divide(T a, T b) { return b ? a / b : 0; }
};

int main() {
    Calculate cal1;
    float x1 = 1.1, y1 = 2.2;
    cout << cal1.add(x1, y1) << endl;
    cout << cal1.minus(x1, y1) << endl;
    cout << cal1.multiply(x1, y1) << endl;
    cout << cal1.divide(x1, y1) << endl;

    Calculate cal2;
    int x2 = 1, y2 = 2;
    cout << cal2.add(x2, y2) << endl;
    cout << cal2.minus(x2, y2) << endl;
    cout << cal2.multiply(x2, y2) << endl;
    cout << cal2.divide(x2, y2) << endl;

    return 0;
}
```


<div STYLE="page-break-after: always;"></div>


## §3  面向对象核心

### §3.1  复合

#### §3.1.1  复合关系 Composition

复合关系是一种 **has-a（部分-整体）** 关系，其中一个类（**组件类**）作为另一个类（**复合类**）的一部分存在。

1. **封装** 复合类通过包含其他类的实例作为其成员变量，封装了这些类的使用。
2. **灵活性** 复合类可以更灵活地管理其组件对象的生命周期和行为。
3. **可变性** 复合类可以在运行时更改其组件对象。
4. **控制** 复合类可以控制对组件对象的访问和操作。

对于构造函数，先执行成员对象的构造函数（按照它们在类声明中的顺序），然后执行复合类的构造函数；对于析构函数，先执行复合类的析构函数，然后执行成员对象的析构函数（按照它们声明的逆序）。

**例** 设计一个 `Point` 类，表示平面中的一个点；设计一个 `Line` 类，表示平面的一条线段；设计一个 `Triangle` 类，内含三条边。设计三个类的相应的构造函数、复制构造函数，完成初始化和对象复制。设计 `Triangle` 类的成员函数，分别完成三条边能否构成三角形的检查，三角形周长的计算。

```cpp
#include <iostream>

class Point {
public:
    double x, y;
    Point(double x = 0, double y = 0) : x(x), y(y) {}
    Point(const Point& p) : x(p.x), y(p.y) {}
};

class Line {
public:
    Point p1, p2;
    Line(Point p1, Point p2) : p1(p1), p2(p2) {}
    Line(const Line& l) : p1(l.p1), p2(l.p2) {}
    double len = sqrt(pow(p1.x - p2.x, 2) + pow(p1.y - p2.y, 2));
};

class Triangle {
public:
    Line l1, l2, l3;
    Triangle(Line l1, Line l2, Line l3) : l1(l1), l2(l2), l3(l3) {}
    Triangle(const Triangle& t) : l1(t.l1), l2(t.l2), l3(t.l3) {}
    bool isTriangle() {
        double a = l1.len;
        double b = l2.len;
        double c = l3.len;
        return a + b > c && a + c > b && b + c > a;
    }
    void perimeter() {
        double a = l1.len;
        double b = l2.len;
        double c = l3.len;
        if (isTriangle()) std::cout << a + b + c << std::endl;
        else std::cout << "no" << std::endl;
    }
};

int main() {
    Point p1, p2, p3;
    std::cin >> p1.x >> p1.y >> p2.x >> p2.y >> p3.x >> p3.y;
    Line l1(p1, p2), l2(p2, p3), l3(p3, p1);
    Triangle t(l1, l2, l3);
    t.perimeter();
    return 0;
}
```


**前向声明，循环定义**：

```cpp
class Master;  // 前向声明
class Dog {
    Master* master;
};
class Master {
    Dog* dogs[10];
}; 
```




<div STYLE="page-break-after: always;"></div>

### §3.2  继承、派生

#### §3.2.1  继承关系 Inheritance

继承是一种机制，允许一个类（**子类** 或 **派生类**）继承另一个类（**基类** 或 **父类**）的属性和方法，通常用于表示具有 **is-a（是一个）** 关系的场景。

1. **代码复用** 子类可以复用父类的代码，无需重新编写相同的代码。
2. **层次结构** 可以创建一个类层次结构，其中每个子类都是其父类的扩展。
3. **多态性** 通过继承，可以实现多态性，即同一个接口可以有多个实现。
4. **扩展性** 子类可以添加新的属性和方法，扩展父类的功能。
5. **重写（Override）** 子类可以重写父类的方法，提供定制的行为。

**例** 设计一个圆类 `circle `和一个桌子类 `table`，另设计一个圆桌类 `roundtable`，它是从前两个类派生的，要求输出一个圆桌的高度、面积和颜色等数据。

```cpp
class Circle {
private:
    double radius;
public:
    Circle(double r) : radius(r) {}
    double getArea() { return 3.14 * radius * radius; }
};

class Table {
private:
    double height;
public:
    Table(double h) : height(h) {}
    double getHeight() { return height; }
};

class RoundTable : public Circle, public Table {
private:
    std::string color;
public:
    RoundTable(double r = 0, double h = 0, std::string c = "") : Circle(r), Table(h), color(c) {}
    std::string getColor() { return color; }
};

int main() {
    RoundTable roundTable(1.2, 0.8, "Black");
    std::cout << "Height: " << roundTable.getHeight() << std::endl;
    std::cout << "Area: " << roundTable.getArea() << std::endl;
    std::cout << "Color: " << roundTable.getColor() << std::endl;
    return 0;
}
```


#### §3.2.2  派生类 Derivation

使用
```cpp
class 派生类名 : public 基类名 {

}
```
定义。

派生类拥有基类的全部成员函数和成员变量。

**直接基类** 直接从另一个类继承而来的基类。如果类 B 继承自类 A，那么类 A 就是类 B 的直接基类。

**间接基类** 通过多级继承得到的基类。也就是说，如果类 C 继承自类 B，而类 B 继承自类 A，那么类 A 是类 C 的间接基类。类 A 对于类 C 来说不是直接父类，因为它们之间存在一个或多个中间类。在声明派生类时，**只需要列出它的直接基类**，派生类沿着类的层次自动向上继承它的间接基类。

在创建派生类的对象时，先执行基类的构造函数，用以初始化派生类对象中从基类继承的成员；再执行成员对象类的构造函数，用以初始化派生类对象中成员对象；最后执行派生类自己的构造函数。在派生类对象消亡时，先执行派生类自己的析构函数；再依次执行各成员对象类的析构函数；最后执行基类的析构函数。

**覆盖** 派生类可以定义一个和基类成员同名的成员。在派生类中访问这类成员时，缺省的情况是访问派生类中定义的成员。要在派生类中访问由基类定义的同名成员时，要使用作用域符号 `::`。但一般基类和派生类不定义同名成员变量。

**继承的赋值兼容规则：**

public 继承：
```cpp
class myClassA {};
class myClassB : public myClassA {};
int main() {
    myClassA b;
    myClassB d;
    b = d;  // 派生类的对象可以赋值给基类对象
    myClassA& br = d;  // 派生类对象可以初始化基类引用
    myClassA* pb = &d;  // 派生类对象的地址可以赋值给基类指针
}
```

protected 继承：基类的 public 成员和 protected 成员成为派生类的 protected 成员。不是 “是” 的关系。

private 继承：基类的 public 成员成为派生类的 private 成员，基类的 protected 成员成为派生类的不可访问成员。不是 “是” 的关系。

在创建派生类的对象时，需要调用基类的构造函数初始化派生类对象中从基类继承的成员。可在派生类的构造函数中，为基类的构造函数提供参数，或省略基类构造函数以自动调用基类的默认构造函数。

```cpp
class Bug {
private:
    int nLegs;
    int nColor;
public:
    int nType;
    Bug(int legs, int color);
    void PrintBug() {};
};
class FlyBug : public Bug {  // FlyBug是Bug的派生类
    int nWings;
public:
    FlyBug(int legs, int color, int wings);
};
Bug::Bug(int legs, int color) {
    nLegs = legs;
    nColor = color;
}
// 错误的 FlyBug 构造函数
FlyBug::FlyBug(int legs, int color, int wings) {
    nLegs = legs;  // 不能访问
    nColor = color;  // 不能访问
    nType = 1;  // ok
    nWings = wings;
}
// 正确的 FlyBug 构造函数
FlyBug::FlyBug(int legs, int color, int wings) :Bug(legs, color) {
    nWings = wings;
}
int main() {
    FlyBug fb(2, 3, 4);
    fb.PrintBug();
    fb.nType = 1;
    fb.nLegs = 2;  // error: nLegs is private
    return 0;
}
```


**基类与派生类的指针强制转换：**

公有派生的情况下，派生类对象的指针可以直接赋值给基类指针
```cpp
Base* ptrBase = &objDerived;
```
`ptrBase` 指向的是一个 `Derived` 类的对象；
`*ptrBase`可以看作一个 `Base` 类的对象，访问它的 `public` 成员直接通过`ptrBase` 即可，但不能通过 `ptrBase` 访问 `objDerived` 对象中属于 `Derived` 类而不属于 `Base` 类的成员；

即便基类指针指向的是一个派生类的对象，也不能通过基类指针访问基类没有，而派生类中有的成员。

通过强制指针类型转换，可以把 `ptrBase` 转换成 `Derived` 类的指针
```cpp
Base* ptrBase = &objDerived;
Derived* ptrDerived = (Derived*)ptrBase;
```
要保证 `ptrBase` 指向的是一个 `Derived` 类的对象，否则很容易会出错。


<div STYLE="page-break-after: always;"></div>

### §3.3  多态

#### §3.3.1  虚函数 virtual

带有 virtual 关键字的成员函数，只用在类定义里的函数声明中。

#### §3.3.2  多态性

派生类的指针可以赋给基类指针，通过基类指针调用基类和派生类中的同名虚函数时：
- 若该指针指向一个基类的对象，那么被调用是基类的虚函数；
- 若该指针指向一个派生类的对象，那么被调用的是派生类的虚函数。

```cpp
class CBase {
public:
    virtual void SomeVirtualFunction() {}
};

class CDerived : public CBase {
public:
    virtual void SomeVirtualFunction() {}
};

int main() {
    CDerived ODerived;
    CBase* p = &ODerived;
    p->SomeVirtualFunction(); //调用哪个虚函数取决于p指向哪种类型的对象
    return 0;
}
```

派生类的对象可以赋给基类引用，通过基类引用调用基类和派生类中的同名虚函数时：
- 若该引用引用的是一个基类的对象，那么被调用是基类的虚函数；
- 若该引用引用的是一个派生类的对象，那么被调用的是派生类的虚函数。

```cpp
class CBase {
public:
    virtual void SomeVirtualFunction() {}
};

class CDerived : public CBase {
public:
    virtual void SomeVirtualFunction() {}
};

int main() {
    CDerived ODerived;
    CBase& r = ODerived;
    r.SomeVirtualFunction(); //调用哪个虚函数取决于r引用哪种类型的对象
    return 0;
}
```

多态能增强程序的可扩充性。


**例** 动态创建形状对象，计算并显示其面积。

```cpp
#include <iostream>  
const double PI = 3.14;

class Shape {
public:
    virtual double Area() const = 0;  // 纯虚函数
    virtual ~Shape() {}  // 虚析构函数
};

class Circle : public Shape {
    double radius;
public:
    Circle(double r = 0) : radius(r) {}
    double Area() const override { return PI * radius * radius; }
};

class Rectangle : public Shape {
    double width, height;
public:
    Rectangle(double w = 0, double h = 0) : width(w), height(h) {}
    double Area() const override { return width * height; }
};

int main() {
    Shape* shapes[4] = { nullptr };
    shapes[0] = new Circle(5.0);
    shapes[1] = new Circle(3.0);
    shapes[2] = new Rectangle(4.0, 5.0);
    shapes[3] = new Rectangle(6.0, 2.0);
    for (int i = 0; i < 4; ++i) std::cout << shapes[i]->Area() << std::endl;
    for (int i = 0; i < 4; ++i) delete shapes[i];
    return 0;
}
```

#### §3.3.3  虚基类和虚拟继承

考虑以下类继承关系：

```cpp
class Base {
};

class Derived1 : public Base {
};

class Derived2 : public Base {
};

class MostDerived : public Derived1, public Derived2 {
};
```

- 如果`Base`是一个普通基类，那么`MostDerived`将包含两份`Base`的副本，分别来自`Derived1`和`Derived2`。
- 如果`Base`是一个虚基类，`Derived1`和`Derived2`都使用`virtual`关键字继承自`Base`，那么`MostDerived`将只包含一份`Base`的副本，解决了重复的问题。

**例**

```cpp
#include <iostream>

class Shape {
public:
    virtual double Area() const = 0;
    virtual ~Shape() {}
};

class Circle : public virtual Shape {
    double radius;
public:
    Circle(double r) : radius(r) {}
    double Area() const override { return 3.14 * radius * radius; }
    double CircleArea() { return 3.14 * radius * radius; }
};

class Rectangle : public virtual Shape {
    double width, height;
public:
    Rectangle(double w, double h) : width(w), height(h) {}
    double Area() const override { return width * height; }
    double RectangleArea() { return width * height; }
};

class Polygon : public Circle, public Rectangle {
public:
    Polygon(double r, double w, double h) : Circle(r), Rectangle(w, h) {}
    double Area() const override { return Circle::Area() + Rectangle::Area(); }
    double PolygonArea() { return CircleArea() + RectangleArea(); }
};

int main() {
    Polygon myPolygon(5.0, 4.0, 5.0);
    std::cout << "Area of Polygon: " << myPolygon.Area() << std::endl;
    std::cout << "Area of Polygon: " << myPolygon.PolygonArea() << std::endl;

    return 0;
}
```