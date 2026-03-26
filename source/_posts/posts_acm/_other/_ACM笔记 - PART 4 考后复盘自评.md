# `ACM` 备考笔记

## PART 4 考后复盘自评

### 牛客1-5

#### CUC2023秋季新生训练第一场

##### NC1A-小飞机

- 为什么用 `<iostream>` 头文件还要用printf输出？

- 尽量避免一整行的输出式，会很丑。

##### NC1B-计算带余除法

- 写

  ```c++
  if (quotient == 0)
  	return 0;
  ```

  是多余的。程序中的输入要求是测试数据的范围而不是输入要限定在这个范围内。

- 对于只用到一次就输出的数据没有必要另行定义，如

  ```c++
  int c = a % b; cout << c;
  ```

  可直接写为

  ```c++
  cout << a % b;
  ```

  当然如果对数据类型有特殊要求除外。

##### NC1C-总成绩和平均分计算

- 格式输出是个硬伤。。

##### NC1D-计算机内存

- 刷了个花招避免了读题额：示例给出输入1输出262144，可以猜测输出的数为输入的数的262144倍。
- 如果只有一个输入一个输出可以考虑给自己赋值（a*=2之类的）并输出，省得另设变量了。

##### NC1E-吃瓜群众

- 这是第一次运用数学知识化简题目：问你能否将这个西瓜分成两部分，每个部分都是偶数，实际上是问西瓜是不是偶数。
- 一定关注端点值的特殊性！勿忽略1、2、n-1、n等的特殊性。

##### NC1F-jyq跳格子

- ~~总是看成lyj跳格子（划掉）~~
- 依旧是数学题，转化的思想。

##### NC1G-送分题

给你三个数，在这三个数中间任意加*或者是+，然后可以随便打括号，只要这个表达式合法。

- 这次是我暴力解题了（因为只有6种情况）。
- 答案用了个很妙的方法：【某个数与1的加法结果大于乘法，某两个大于1的数相乘结果大于加法】。只能说自己的数论基础不太够吧。

##### NC1H-B是不是太迟了

- 第一次看到答案有点蒙（读取无用字符的两种方式）

  ```c++
  // 输入格式为yyyy/mm/dd
  int y, m, d;
  cin >> y;
  
  char ch;
  cin.get(ch); // 读取一个字符，即/
  
  cin >> m;
  cin.ignore(); // 丢弃缓冲区的一个字符，即/
  
  cin >> d;
  ```

##### NC1I-判断闰年

- 这次比答案好（或许是不好？）的地方在于把两个判断式写在了一起避免写两遍同样的内容。
  我：

  ```c++
  if ((year % 4 == 0 && year % 100 != 0 || year % 400 == 0 )) {
      printf("yes\n");
  } else {
      printf("no\n");
  }
  ```

  答案：

  ```c++
  if (year % 4 == 0) {
      if (year % 100 != 0 && year % 400 == 0 )) {
          printf("no\n");
      } else {
          printf("yes\n");
      }
  } else {
      printf("no\n");
  }
  ```

- 最近看到了一个问题说程序员永远不能判断好闰年。

##### NC1J-纸牌

- 纯纯数学题，就不要再犯低级错撂。

- 【积累】

  ```c++
  n%2 ? (n+1)/2 : n/2
  ```

   与

  ```c++
  (n+1)/2
  ```

  等价，利用整型变量的取整特性可以简化。

##### NC1K-排队领水

- 画图解决的数学题。

##### NC1L-[NOIP2008]ISBN号码

- 给自己添了不少难度，又臭又长的破代码。

- 尽量减少变量数，不要十个数就用十个变量。虽然说一个三位数整数要按位计算，但可以只赋成一个变量a，用关于a/100，a%100/10，a%10的表达式计算。

- scanf的引号中把非数字的字符直接写上，输入的时候即可实现拆分。不要再输入整个字符串再提取几位再转成int了。

  ```c++
  scanf("%d-%d-%d-%c", &a, &b, &c, &ch);
  int sum;
  sum += b/100*2 + b%100/10*3 + b%10*4;
  ...
  ```

##### NC1M-[NOIP2004]不高兴的津津

- 偷偷用了数组的知识简化了代码。

##### NC1N-可编程拖拉机比赛

- 这题标答是硬算的，个人拙见还是用数学知识先化简一下下为好。（虽然我简化错了）

- 向上取整方法：【积累】

  ```c++
  double num;
  int numRoundUp = num;
  if (numRoundUp < num)
      ++numRoundUp;
  ```

#### CUC23秋季新生训练第二场

##### NC2E-上下金字塔

- 找规律，数清每行的空格和星号数，写出通项。
- 右半侧的空格也需要输出，只是可能有些判题器会忽视末行空格。

##### NC2F-字符金字塔

- 同上。

##### NC2G-数字三角形

- 仔细审题。尽管两个示例都只有一组输入，但题目中要求了多组输入。

##### NC2H-牛牛学数列

- 答案给出两种方法：一是利用数学知识直接写出答案，二是编程求解。

##### NC2I-牛牛学数列3

- 这题恐怕数学知识不够了。
- 逐步简化问题。每一项的分母实际上都是上一题的结果。

##### NC2J-[NOIP2009]多项式输出

- 大面积的分类讨论。
- 培养处理特殊值的习惯。如在本题中，一次项不写次数，系数为1时省略。
- 牛客的编译器似乎不支持强制符号输出，以后尽量避免使用较高级的方式。

##### NC2K-托米历险记

- 收门票题。注意隐含信息：找零时优先找整钱。比如要找零75，如果有50，那就先找零50，如果没有，就找零3张25。

##### NC2L-回文对称数

- 我的思路（这是什么清奇的脑回路）：输入整数后转化为字符串，并获取字符串长度，然后从前从后数分别比较。其中使用了

  ```c++
  string sNum = to_string(iNum);
  ```

  用于将整数转化为字符串。还有自己写的

  ```c++
  int myStrlen (string ch) {
  	int i = 0;
  	int num = 0;
  	while (ch[i] != '\0') {
  		++i;
  		++num;
  	}
  	return num;
  }
  ```

  函数用于获取字符串长度，实际上使用

  ```c++
  len = str.size()
  ```

  即可。

- 答案：逐位写入新的数中，再比较。

  ```c++
  int old = n, new = 0;
  while(old) {
  	new *= 10;
  	new += old % 10;
  	old /= 10;
  }
  if (new == n) return 1;
  ```

##### NC2M-[NOIP2000]进制转换

- 先写自己的思路：

  主体部分是逐位取余（对比上题，几乎一模一样，只是把10改为了radix）：

  ```c++
  string ans;
  while (num) {
  	int r = mod(n, radix); //获取余数
  	ans += char('0' + r); //加到已有结果的后面
  	n = (n - r) / radix; //对剩余部分继续循环
  }
  return ans;
  ```

  考虑到大于10的进制数需要用到字母，对第四行做修改：

  ```c++
  ans += r < 10 ? char('0' + r) : char('A' + r - 10);
  ```

  再看第三行的取余函数。由于c++的余数可能是负数， 我们需要重新定义一个取余函数：

  ```c++
  int mod (int a, int b) {
      if (a % b == 0) return 0;
      else if (a >= 0) return a % b;
      else if (b >= 0) return a % b + b;
      else return a % b - b;
  }
  ```

  在这个函数中，返回值r满足$$a = kb+r \left( 0\le r<b,k,b\in\mathbb{Z}\right)$$。关于更详细的论述，请参看Part4。

- 看答案：其实大致的思路是一样的，只有两处不同。

- 第一个是对于负数余数的处理方式：

  ```c++
  r = n % radix;
  k = n / radix;
  if (r < 0) {
  	r -= radix;
  	k ++;
  }
  ```

  可以看出，答案是先做取余和除法，再对于不合适的部分做修正。【积累】

- 第二个是直接将数字存入数组，而不是接到字符串后面，这样可以在输出时将数字转为字母。

##### NC2N-杨辉三角

- 啊？——很喜欢大学生的一句话。

- 答案极为巧妙地只使用了一维数组，仅考虑列坐标，这里稍稍解释一下。

  从每行的最后一个数开始，最后一位是1，倒数第二位是上一行的最后两位之和，因为仅考虑列坐标，只需要对上一行最后一个数自加倒数第二个数即可，以此类推。

  为什么不从前往后呢，因为计算时需要用到前一个数，从前向后的话前一个数已经被更新了。

  由于杨辉三角具有对称性，从后向前输出的结果与原结果一致。

  以下是代码实现：

  ```c++
  a[i] = 1;
  printf("1");
  for (int i = 2; i <= n; ++i) {
      a[i] = 1;
      printf("\n1 ")
      for (int j = i - 1; j >= 1; --j) {
          a[j] += a[j-1];
          printf("%d ", a[j]);
      }
  }
  ```

##### NC2O-[NOIP1999]Cantor表

- 呃又和答案不一样了。

- 我的做法是按照题述顺序一步一步地移动下标，直到目标值为止，显然复杂度会比较大，但是不需要思考。

- 答案的方法是先判断在第几个斜线上，在按照顺序向上或向下扫描直到目标值，有点像高中的数表题目。需要注意的是寻找斜线数时给出了一个上界4475，这是因为$$\frac{4472\times4473}2\ge10^7$$​。

  ```c++
  int i;
  for (i = 1; i < 4475; ++i) {
  	if (n <= i*(i+1)/2) break; // 找到在第i斜线上
  }
  n -= i*(i-1)/2; // 减去前i斜线的所有元素
  if (i % 2) {
      printf("%d/%d", i+1-n, n); // 奇数向上扫描
  } else {
      printf("%d/%d", n, i+1-n);
  }
  ```

#### CUC23秋季新生训练第三场

##### NC3A-最大的差

- 任取两个数m,n，求差的最小值。
- 优化：求这组数的最大值和最小值，再求差，显然后者的时间复杂度更小。

##### NC3BCD-数列下标、上三角矩阵判定、[NOIP2013]记数问题

- 暴力搜索判断。

##### NC3E-求距离

- 给定数组，可交换两个数，求最大值和最小值的距离最大值。
- 按下标判断，看最小值和最大值的下标哪一个距离端点较远。

##### NC3G-约瑟夫环

- n个人按圈报数，报到m出队，从k开始，问最后留下的是谁。

- 模拟，计算每次报数后出队的人的位置，然后将后面的人前移一位，人数减少一，直到人数为一为止，即

  ```c++
  while (n > 1) {
      k = (m+k-1) % n; //计算位置
      for (int i = k + 1; i < n; ++i) a[i-1] = a[i]; //前移
      n--; //少一个人
  }
  ```

- 将出队的人用bool数组标记，报数时如果遇到出队的人，继续。

- 后者的时间复杂度更低，但是代码略有些麻烦。

##### NC3H-[NOIP2005]校门外的树

- 开一个bool数组判断树有没有被移除。注意端点值。

##### NC3I-二进制？十进制！

- 十进制转二进制的写法：

  ```c++
  long long DECtoBIN (int n) {
      long long s = 0, j = 1;
      while(n) {
          s += j * (n%2);
          n /= 2;
          j *= 10;
      }
      return s;
  }
  ```

##### NC3J-比较月亮大小

- 逐位判断，用一个变量记录是上升还是下降，如果遇到0或15，改变方向继续判断。
- 题目中说保证输入的数据满足月亮变化的循环规律，因此只需判断最后一位和倒数第二位。

##### NC3K-小红的数组操作(easy version)

- 目标是对sum花费p，使其加1，或花费q，使其减y，使得sum是n的倍数。

  先作伪带余除法，找到k和remainder满足sum = kn - remainder，其中 0 <= remainder < n，

  于是我们进行对元素增加remainder个1，就可以使总值为 (kn - remainder) + remainder = kn 是n的倍数；

  或者，可以先减去一个y，再增加适当个1；

  或者，也可以减去两个y，再增加适当个1；

  ……

  这样的枚举一定是有限次的，如果①已经减去了n个y，或者②减成了负数，操作终止。

  代码：

  ```c++
  remainder = sum % n ? n - sum % n : 0;
  min = remainder * p;
  sum -= y;
  count = 1;
  
  while (sum > 0 && count < n) { //此处保证②和①
      remainder = sum % n ? n - sum % n : 0;
      temp = remainder * p + count * q;
      min = min > temp ? temp : min;
  
      sum -= y;
      ++count; //此处保证①
  }
  
  printf("%lld", min);
  ```

##### NC3L-数组划分

- 判断两个数组是否满足由两个数组中各选一个数组成的数对的最大公因数是1。
- 两两分别判断会超时。
- 正解：分别存储两个数组所有元素的素因子，素因子不能有重复。

#### CUC23秋季新生训练第四场

##### NC4A-[NOIP2018]标题统计

- 本题考察带空格的字符串输入，运用getline（cin,s）即可解决。

##### NC4B-[NOIP2017]图书管理员

- 对于每一位读者求出他所需要的书中图书编码最小的那本书。
- WA：本题与HardVersion的惟一区别：读者查阅后不会借出图书。

##### NC4D-[NOIP2011]数字反转

- 负号和0单独讨论，逐位输出，注意首位0不能输出。
- 另：没有必要逐位输出，存入一个新数，这样不用考虑首位0的问题。

##### NC4E-[NOIP2011]统计单词数

- 破题不做。去洛谷下载了测试点才知道问题。

  输入：

  ```
  td
    Td tLWCsrmt
  ```

  您猜猜应该输出什么？是

  ```
  1 0
  ```

  还是

  ```
  1 2
  ```

##### NC4F-火车上的2连座

- 火车连座，OO|OX变成++|OX。
- 输入三个字符一组（竖线和换行为无用的字符），判断这两个字符是否都为O。

##### NC4G-[NOIP2003]乒乓球

- 注意比赛记录是连在一起的，判断一场比赛结束后要接着判断下一组。
- 优化：因为分别判断11分制和21分制，可以用函数，分别传入11和21。

##### NC4H-回文串

- 判断最长回文子串。

- **中心扩展算法**

  每次循环选择一个中心，进行左右扩展，判断左右字符是否相等即可。

  时间复杂度：O（n²）。两层循环，每层循环都是遍历每个字符。

  空间复杂度：O（1）。

- **Manacher's Algorithm 马拉车算法**

##### NC4I-密码

- /* */

##### NC4J-[NOIP1999]回文数

- /* */

#### CUC23秋季新生训练第五场

##### NC5A-等腰三角形会难倒你吗？

- WA：等腰三角形不是直角三角形，三角形三点不能共线。


##### NC5B-LCY的QQ信息好多

- cmp练习题。


##### NC5C-肥料掺了金坷垃

- 简单练习题。


##### NC5D-原神！启动！

- 当某个机关石块收到攻击时，可以使当前石块i与相邻的两个石块产生共鸣，并让三个石块的花瓣数量加1。且如果石块的花瓣数量为4，那么它受到攻击或共鸣后，花瓣数量变为1。
- 注意到只需考察模4的余数，每次操作可以将三个增加1，相当于将另外一个减少1，又给定最大操作次数16，我们总可以将每一个数都减小到0。

##### NC5E-WA一发会怎样

- 模拟。注意双重分类讨论的前提。


##### NC5F-超级方阵！

- 暴力四重循环选择四个数。
- 优化：使用递归选数。

##### NC5G-大残！一丝！没补掉！

- 爆float了。


##### NC5H-这个合理吗？

- 定义bool数组判断。


##### NC5I-那这个数独合理吗？

- 上一题的加强版，定义一个大flag。


##### NC5J-测测你的智力

- 比答案更强的O(1)的方法：

  ```c++
  scanf("%d %d", &n, &t);
  printf("%d %d", t%(n*n)/n+1, t%n+1);
  ```

##### NC5K-《关于我转生到提瓦特并且身上携带致命病毒这件事》

> “八重大人，您看看这本小说怎么样......”
>
> “哎呀呀，如果你再在小说里出些奇奇怪怪的问题，下次，我就不会这么轻易地放过你了哦~”
>
> “对不起八重大人，我这就改！”

- 依旧是bool数组。

### VJ1-5

#### VJ4-23秋季学期新生练习10.21

##### VJ4A - 影子字符串

略。

##### VJ4B - 删数问题

见 VJwin3A - 删数问题

##### VJ4C - Typical Interview Problem

给定一个特定的循环字符串，问输入是不是子串。

- 【思路】考虑到输入的长度有限，我们可以把无限循环的字符串化为有限的，进而判断是不是子串。

  使用的方法是（注意包含<string>头文件）：

  ```c++
  string infb = fbfb.substr(j, k);
  if (infb == fb) {
  	judge = 1;
  }
  ```

- 【题解】使用

  ```c++
  if (fbfb.find(infb) != string::npos) {
  	judge = 1;
  }
  ```

- 【反思】WA：每组测试数据后没有输出换行。

##### VJ4D - Forbidden Integer

使用除了整数x以外的其它整数的和表示输入的整数。

- 【思路】尽可能使用1来表示，如果不行就用2和3。
- 【反思】细致分类讨论，适当合并。WA一次。

##### VJ4G - A-characteristic

数组的1 1对和-1 -1对的个数之和等于给定值k。

- 【思路】枚举1的个数，计算这时的数对个数之和。

### VJ6-8

#### CUC-ACM-23秋季学期新生基础练习10.28

##### VJ6A - Lily

- 【题解】尽可能多地增加C，但是L的两边不能是C。对于每一个非C字符判断两边是不是L。

- 【反思】不好：考虑到第一位没有“左边”，输入字符串之后将整个字符串后移一位。

  好：**第一位特殊判断，只判右边，其余的判断两边**。

##### VJ6B - Honest Coach

- 【题解】记录任意两者差值的最小值。

- 【反思】输入后立即排序，减少时间复杂度。

  ```c++
  cin >> n;
  for (int i = 0; i < n; ++i){
  	cin >> a[i];
  }
  sort(a, a + n);
  for (int i = 2; i < n; ++i){
  	min = a[i] - a[i-1] > min ? min : a[i] - a[i-1];
  }
  cout << min << endl;
  ```

##### VJ6C - Your Ride Is Here

- 【反思】答案用strlen返回字符串长度函数，我用的s[i] != '\0'。

##### VJ6D - Three Threadlets

- 【题解】我的思路是倒着推，最终需要切成3-6段相同的长度，那反过来就是将3-6段相同长度拼接，能拼接成什么长度。简单枚举即可：1 1 1、1 1 2、1 1 3、1 2 2、1 2 3、1 1 4。再看看所给数据是不是这些种类之一即可。

  答案的思路是注意到最终长度一定是最小值（从上面的枚举中每一个都包含1也能看出），那么另外两个就是最小值的倍数，这个倍数之和需要小于6。

- 【反思】和答案比，我的做法太过于具体了。

##### VJ6E - Don't Try to Count

- 卡了很久的题（原因是扫描到字符串结尾后从头开始扫描写不好），最终决定用暴力解法。

- 【题解】每次循环判断s是否是x的子串，如果不是，将x延长，继续判断，由于所给数据有范围，至多延长6次就一定可以判断出。为了判断s2是否是s1的子串，使用了

  ```c++
  bool son(string s1, string s2) {
      return (s1.find(s2) != string::npos);
  }
  ```

  函数。

  代码（修改）：

  ```c++
  int i, count = 0;
  bool book = 0;
  for (i = 0; i < 7; ++i) {
  	if (son(x, s)) {
  		book = 1;
  		break;
  	}
  	x += x;
  }
  if (book) cout << i << endl;
  else cout << "-1" << endl;
  ```

- 答案，是我一直没琢磨出来的写法（之一）：

  ```c++
  for (int i = 0; i < x.length(); ++i) {
  	for(int j = 0, k = i; j < m; ) {
  		if (b[j] == x[k]){
              ++k;
              ++j;
              if (j == b.length()){
                  book = 1;
                  break;
              }
              if (k == x.length()){
                  x += x;
                  ++ ans;
              }
  		} else {
  			break;
  		}
  	}
  	if (book || (i>3*m && i>2*n)) break; //防止无限自增
  }
  if (book) cout << ans << endl;
  else cout << "-1" << endl;
  ```

##### VJ6F - Perfect Square

- 【题解】因为要四个旋转后位置相同的字母一致，就把他们都加到最大的那个字母，统计即可。【反思】不要轻信翻译。翻译竟然把“字母增大一个”翻译成了“和下方的字母一致”。你是不知道后者有多难做……

##### VJ6G - String Freshman

- 暂时无法理解，有缘再说。

##### VJ6H - Fibonaccharsis

- 【题解1】观察：
  $$
  \begin{align*}
  
  &a_1=m,a_2=n,a_3=m+n,a_4=m+2n,\\
  &a_5=2m+3n,a_6=3m+5n,a_7=5m+8n,
  
  \end{align*}
  $$
  发现每一项两个字母的系数都是斐波那契数列，具体地说，
  $$
  a_k=f\left(k-2\right)\cdot m+f\left(k-1\right)\cdot n
  $$
  题设给定$$k$$和$$a_k$$，则$$f\left(k-2\right),f\left(k-1\right)$$也是确定的数，只需求$$m,n$$有多少组不同的非负整数解。

  斐波那契数列快速倍增法：

  ```c++
  const ll Mod = 1e11 + 7;
  
  pair<ll,ll> fibonacciAdd(int n) {
      if (n == 0) return { 0, 1 };
  
      auto p = fibonacciAdd(n >> 1);
  
      ll c = (2 * p.second % Mod - p.first + Mod) % Mod * p.first % Mod;
      ll d = (p.first * p.first % Mod + p.second * p.second % Mod) % Mod;
  
      if (n & 1) return { d, c + d };
      else return { c, d };
  }
  
  ll fibonacci(int n) {
      return fibonacciAdd(n).first;
  }
  ```

  不定方程$$ax+by=c$$的非负整数解个数：

  ```c++
  int indefinite(ll a, ll b, ll c) {
      int count = 0;
      for (ll x = 0; x <= c/a; ++x) {
          ll y = (c-a*x) / b;
          if (a*x + b*y == c && x <= y) { // 本题额外限制x<=y
          	++count;
          }
      }
      return count;
  }
  ```

- 【题解2】斐波那契数列呈指数增长，因此k会很小。可以固定序列的后两个元素推出前面的元素，如果当前序列非递增或出现负数则终止。

  ```c++
  for (int i = 1; i <= n; i++) { // 枚举倒数第二位的取值为i
  	int y = n, x = i;
  	bool flag = 1;
  	for (int j = 0; j < k - 2; j++) { // 倒着计算k-2次
  		int temp = y;
  		y = x;
  		x = temp - x;
  		if (x < 0 || x > y) {
  			flag = 0;
  			break;
  		}
  	}
  	if (flag) ++count;
  }
  ```

- 【反思】自己是按部就班地做了，好在数据不太大，好在提前准备了解不定方程和算斐波那契的方法。

##### VJ6I - 梦中的统计

- 【题解】签到题略。
- 【反思】数组定义在外面不用初始化。

##### VJ6J - Python Will be Faster than C++

- 【题解】写几个观察一下
  $$
  \begin{align*}
  
  a_{n+1}&=2a_{n}-a_{n-1} \\
  
  a_{n+2}&=2a_{n+1}-a_{n}=2(2a_{n}-a_{n-1})-a_{n} \\
  & =3a_{n}-2a_{n-1} \\
  
  a_{n+3}&=2a_{n+2}-a_{n+1}=2(3a_{n}-2a_{n-1})-a_{n+1} \\
  & =5a_{n}-4a_{n-1} \\
  
  \cdots \\
  
  a_{n+m+1}&=\left(2^m+1\right)a_{n}-2^m\cdot a_{n-1} \\
  
  \end{align*}
  $$
  注意到该数列任意两项的差值总是$$a_{n}-a_{n-1}$$的倍数，若需该数列单调减少，只需$$a_{n}-a_{n-1}<0$$，这就是判断是否faster的充要条件。

  至于多少次，因为次数不是很多所以一项一项算就可以了，如果想优化可以套上面的公式。

- 【反思】要认真地写几项推导一下，考试时误认为faster的充要条件是每一项都相等，后来改成了最小值不增加。


#### CUC-ACM-2023秋季学期新生基础练习11.01

##### VJ7A - Chanel (Easy)

- 【题解】关键的变量：可能出现的最多的人数（初始和加号的个数）；当前的人数
- 【反思】挺好。还是尽量避免写goto吧，可以定义一个bool值book。

##### VJ7B - Two Binary Strings (Easy)

- 【题解】需要将01串转换为给定字符串，转换方式是选择其中一个字符串和两个相等的字符，然后将它们之间的所有字符转换为这些字符。注意到等价条件为存在相同位置的01串。

- 【反思】但是很难注意到。

- 字符串的长度：

  ```c++
  string str;
  int len = str.length();
  ```

##### VJ7C - 简单数学题 (Medium)

- 【题解】数学题，汲取上上次VJ5E - Vladik and fractions解方程组的教训，对于示例使用瞪眼法便知其中一个解。
- 【反思】遇到数学题千万不能枚举解之，可以先看看示例找找规律。

##### VJ7D - 数组操作 (Medium)

- 【题解】需要让和减少1，则统计0和1的个数，1只能选一个，每个0都可以选或者不选。

- 【反思】学习一些写法。用

  ```c++
  while (t--) {
  }
  ```

  代替

  ```c++
  for (int i = 0; i < t; ++i) {
  }
  ```

  注意前提是变量t在后面不会用到，甚至可以避免初始化（循环后的结果为0）。

##### VJ7E - 最小值 (Easy)

- 【题解】每次选择两个不同的数，让其中一个加1，另一个减去1，使|2b−a−c|最小。

  原式可化为|3b-sum|，我们总可以调节b的大小使得3b和sum尽可能接近，只需判断sum是不是3的倍数。

- 【反思】数学思想。不变量(sum)和消元(a,c)思想。

##### VJ7F - 染色 (Medium) - Upsolve

- 【反思】做烦了。我是将两条边按照模3的余数分成4类，即0×n、1×1、1×2、2×2，然后分别讨论，其中1×2这种类型要分两种，主体部分有二十几行……应该是由于没有考虑整体吧……其实综合考虑各个情况，每三个格子有一个蓝，而不用考虑这三个格子是横着或者竖着的，如果格子的形状比较复杂可能需要考虑。

##### VJ7G - 级数求和 (签到)

- 【题解】无。

- 【反思】写法：

  ```c++
  sum += 1.0 / n;
  ```

  这里的1.0将是double型，运算结果也是double型。

##### VJ7H - Long Legs (Hard) - Upsolve

- 【题解】每次可以跳m格，或者将m增加1。

  移动的步数的不确定性是本题的难点。这是一个矛盾，为了增大步子以减小步数，需要执行方案3，但是执行方案3本身需要消耗步数，所以我们希望枚举得出最佳方案。

  将步子增大到多少后再移动呢，我们先从一个简单的情况入手：a=8，b=8。我们可以

  ①增大到2然后两个方向各移动4步（共计9步）；

  ②增大到4然后各移动2步（共计7步）；

  ③先增大到2各移动2步，再增大到4各移动1步（共计9步）。

  对比这3种方案，我们发现方案3是不好的，因为先增加到小步子移动不如一次性地增加到大步子再移动（可以多举几个例子试试）。

  所以目标是先将步子增加到m，再移动数次。对于除不尽的部分，在增加到这个步数时先走掉。

- 下面就是确定枚举范围了。

  最简单粗暴的方式是

  ```c++
  max(a, b);
  ```

  经检验TLE。

  因此必须确定一个恰当的枚举范围。

  （以下高能预警）

  我们已经知道，对于每一个枚举的步子 $$m$$ ，所需步数为
  $$
  S\left(m\right)=\lceil\frac am\rceil+\lceil\frac bm\rceil+m-1
  $$
  估计它最小值：
  $$
  \begin{align*}
  
  S\left(m\right) & \ge\frac am+\frac bm+m-1-2 \\
  
  & = \left(\frac {a+b}m+m\right)-3\\
  
  & \ge 2\sqrt{a+b}-3
  
  \end{align*}
  $$
  第二个不等号成立时，$$m=\sqrt{a+b}$$，于是 $$m$$ 应当在 $$\sqrt{a+b}$$ 附近。

  这个“附近”取得差不多就行，如果太精确就真成数学题了。

- 代码实现：

  ```c++
  #include <cstdio>
  #include <cmath>
  #define ll long long
  
  ll roundUp(ll a, ll b) { return a/b + (a%b != 0); }
  ll setmax(ll a, ll b) { return a > b ? a : b; }
  
  const int delta = 100;
  
  int main() {
      int t, step, stepmin;
      long long a, b, base;
  
      scanf("%d\n", &t);
      while (t--) {
          scanf("%lld %lld", &a, &b);
  
          stepmin = 1e9;
          base = sqrt(a+b);
  
          for (ll i = setmax(1, base-delta); i <= base+delta; ++i) {
              step = roundUp(a, i) + roundUp(b, i) + i - 1;
              stepmin = step > stepmin ? stepmin : step;
          }
  
          printf("%d\n", stepmin);
      }
  
      return 0;
  }
  ```

  经检验AC。

- 参考：[题解 CF1814B - Esoteric Order - 洛谷博客](https://www.luogu.com.cn/blog/EsotericOrder/saturatedSolution-CF1814B)

##### VJ7I - Money Trees (Medium) - Upsolve

- 【题解】选择一些树，下一棵树的高度能够整除当前树的高度，且果子数之和小于给定值。

  首先，考虑区间[1,1]，如果满足题设，就扩展右端点；否则，将左端点设为右端点的位置，这是因为前面的区间不符合要求而且已经全部讨论过了。然后，右端点每次尝试扩展一次，就看看总和有没有超，如果超了就缩小区间长度，左端点向右端点靠拢直到符合题设的大小。每次操作后更新最大值，直到检查完两个序列。

- 【反思】时间复杂度更低的双指针；前缀和数组提高效率。

- 代码实现（核心部分）：

  ```c++
  ans = 0;
  
  for (l = 1, r = 1; r <= n; ++r) {
  	if (h[r-1] % h[r]) {
          l = r;
      }
  	while (s[r] - s[l-1] > k) {
          ++l;
      }
  	ans = (r-l+1) > ans ? (r-l+1) : ans;
  }
  
  printf("%d\n", ans);
  ```

- 参考：[CF1873F题解 - ArcherHelloWorld 的博客 - 洛谷博客](https://www.luogu.com.cn/blog/517959/solution-cf1873f)

##### VJ7J - 平方数 (Hard)

- 【题解】先转化为差值。是否是平方数。优先考虑是否是两个平方数的和或差，则为2次。两个平方数的差：一般所有奇数和4的倍数，即模4不为2的数。两个平方数的和：勾股数，如果不使用数学知识则暴力枚举。如果不能。那么一定模4余2，加上1就是模4余3，可表示为两个平方数的差。

- 【反思】要积累结论。

- 代码实现：

  ```c++
  #include <cstdio>
  #include <cmath>
  
  bool isa(int c) {
      int s = sqrt(c);
      int l = 0;
      while (l <= s) {
          int sum = l*l + s*s;
          if (sum == c) return true;
          else if (sum > c) --s;
          else ++l;
      }
      return false;
  }
  
  
  int main() {
      int t;
      long long a, b;
  
      scanf("%d\n", &t);
  
      for (int ti = 0; ti < t; ++ti) {
          scanf("%lld %lld", &a, &b);
          a = a>b ? a-b : b-a; //两个数的差的绝对值
  
          if (a == ((int)sqrt(a))*((int)sqrt(a))) {
              printf("1\n");
          } else if (isa(a)) {
              printf("2\n"); //可以写为两个平方数之和
          } else {
              a %= 4;
              if (a == 2) {
                  printf("3\n"); //都不能
              } else {
                  printf("2\n"); //可以写成两个平方数之差
              }
          }
      }
  
      return 0;
  }
  ```


#### CUC-ACM-2023秋季学期新生练习分级测试

##### VJ8A - 找不同数

- 【思路】先判断前两个数，如果相同，从前往后找，找到不同的就是答案。如果前两个数不同，必有一个是答案，借助第三个判断即可。
- 【题解】明显题解做繁了。将每个元素与前后两个元素比较，其中头尾特判。

##### VJ8B - 扫地机器人

- 【思路】模拟即可。

- 【题解】使用数学方法计算出答案。

  ```c++
  int rtime = rb<=rd ? rd-rb : 2*n-rb-rd;
  int ctime = cb<=cd ? cd-cb : 2*n-cb-cd;
  return = min(rtime, ctime);
  ```

- 【反思】当时想到计算的，但是考虑到我的数学水平和时间限制，而且一定不会TLE，就暴力做了。


##### VJ8C - 学桌游

- 【思路】

  ```c++
  int a, sum = 0;
  int arr[105] = {0}, num[105] = {0};
  
  /* 输入并排序 */
  for (int i = 0; i < m; ++i) {
      scanf("%d", &a);
      // 以下几行用于插入排序
      int j;
      for (j = i - 1; j >= 0; j--){
          if (arr[j] > a) {
             arr[j+1] = arr[j];
             num[j+1] = num[j];
          } else {
             break;
          }
      }
      arr[j+1] = a;
      num[j+1] = i;
  }
  
  /* 累加判断 */
  int k = 0;
  while(k < m) {
      if (sum + arr[k] > n) break;
      else { sum += arr[k]; ++k; }
  }
  
  /* 输出 */
  printf("%d\n", k);
  if (k) {
      for (int i = 0; i < k; ++i) printf("%d ", num[i]+1);
      printf("\n");
  }
  ```

- 【题解】

  ```c++
  typedef struct { int order; int time; } game;
  bool compare(game a, game b) { return a.time < b.time; }
  game a[105];
  
  /* 输入并排序 */
  for (int i = 0; i < m; ++i) {
      scanf("%d", &a[i].time);
      a[i].order = i;
  }
  sort(a, a+m, compare);
  
  /* 累加判断 */
  int k = 0;
  while(k < m) {
      if (sum + a[k].time > n) break;
      else { sum += a[k].time; ++k; }
  }
  
  /* 输出 */
  printf("%d\n", k);
  if (k) {
      for (int i = 0; i < k; ++i) printf("%d ", a[i].order+1);
      printf("\n");
  }
  ```

  注意需要包含

  ```c++
  #include <algorithm>
  using namespace std;
  ```

  头文件。

- 【反思】我知道这个题用结构体会很简单，但是不会啊啊啊啊啊！

  结构体的好处就是把一个事物的两个变量绑定了，排序后仍然绑定在一起，不会一个排序了但是另外一个没有排序。

  建议将修改后的代码熟读成诵。

##### VJ8D - 涂色游戏 - Upsolve

- 【思路】输入后对于每一个九宫判断，我甚至写了一个简单的优化：如果右边那个数没有染色，下一次判断就直接跳过。
- 【题解】无论优化与否，显然TLE。采用另一种思路：与其判断时向周围找涂色的格子，不如输入时就先影响周围的格子，即对于每个格子记录所在九宫被染色的格子数量，每输入一次记录一次，并判断一次，只需进行一次大循环。
- 【反思】常见优化策略之一，下一题仍会用到。

##### VJ8E - 三点集合

- 【思路】按上题的优化策略，与其对于每两个点枚举其它点看是不是中点，不如直接计算这两个点的中点坐标，看是不是存在一个点。需要注意点的坐标可能是负数，而且只有奇偶性相同的点才可以算中点。

- 【题解】对点进行排序，对于每两个点二分查找有没有中点。

  ```c++
  temp.x = (a[i].x + a[j].x) / 2;
  temp.y = (a[i].y + a[j].y) / 2;
  int k = lower_bound(a, a+n, temp, compare) - a;
  if (temp.x == a[k].x && temp.y == a[k].y)
  	++count;
  ```

- 【反思】感觉我的思路比答案好一点点。

  补：果然，答案补充了解法2，与我的思路相符。

##### VJ8F - 漂亮的字符串

- 【思路】两端依次寻找所需字符，再在两个冒号中间寻找竖线。注意这两个冒号必须是不同的冒号。
- 【题解】差不多。

### VJ9-16

#### VJ9-前缀和与差分-div1







#### VJ10-排序-div1

##### VJ10-div1A - Game

- 【思路】甲从大数开始删，乙从小数开始删，最终是较中间的一个数，如果数字是偶数，考虑到甲先操作，最终是中间靠下的那个数。
- 【题解】同。
- 【反思】sort可以直接用。

##### VJ10-div1B - 逆序对

- 【思路】在排序操作中，调换的总次数实际上就是逆序数。

  具体地我们可以利用归并排序。（如果使用冒泡排序可以很方便地计算调换次数，但它的时间复杂度太高，是O(n^2^)。）

  归并排序中两个数组混合时每插入一个数就计算一次逆序数，即

  ```c++
  count += mid - i + 1;
  ```

  也就是说从mid插入到i，跨越了这么多的数，逆序数就要增加这么多。

- 【题解】这题没题解，倒是有个提示：B题逆序对尝试使用归并排序的思想来写。

  完整的归并排序代码：

  ```c++
  void merge(int* a, int low, int mid, int hight) {
  	int* b = new int[hight - low + 1];
  	int i = low, j = mid + 1, k = 0;
  	while (i <= mid && j <= hight) {
  		if (a[i] <= a[j]) {
  			b[k++] = a[i++];
  		} else {
  			b[k++] = a[j++];
              count += mid - i + 1; // 补充的内容
  		}
  	}
  	while (i <= mid) {
  		b[k++] = a[i++];
  	}
  	while (j <= hight) {
  		b[k++] = a[j++];
  	}
  	k = 0;
  	for (int i = low; i <= hight; i++) {
  		a[i] = b[k++];
  	}
  	delete[]b;
  }
  ```

- 【反思】RE：数据的范围没看对。

  WA：count计数器会爆int。

##### VJ10-div1C - Discounts

- 【思路】由于在所买的q种中对最便宜的免单，故买最贵的q种，这样省钱最多，实质上是求总和减去从高到低第q个吃的。

- 【题解】用前缀和数组和后缀和数组优化。

- 【反思】所给q_i实际上是测试数据，每一个都要输出，题目要审清楚。

  WA：爆int。

##### VJ10-div1D - DNA Sorting

- 【思路】利用“VJ10B - 逆序对”的逆序数结论和“VJ8C - 学桌游”的插入排序法即可。
- 【题解】无。
- 【反思】结构体依旧写不好。

##### VJ10-div1E - Weight of the System of Nested Segments

- 【思路】结构体按照一个元素排序，筛选，再按照另外一个元素排序。

- 【反思】上述两次排序分别为

  ```c++
  bool cmp1(Point p1, Point p2) {
      if (p1.w == p2.w) return p1.x < p2.x;
      return p1.w < p2.w;
  }
  
  bool cmp2(Point p1, Point p2) {
      return p1.x < p2.x;
  }
  ```

  实际上cmp1只需写为

  ```c++
  bool cmp1(Point p1, Point p2) {
      return p1.w < p2.w;
  }
  ```

##### VJ10-div1F - Help Chef Gerasim

- 【思路】问是否满足a-b,a,a,...a,a+b的形式。排序后再比较。对于中间的部分，逐一判断。
- 【题解】只需看a[0],a[1],a[n-2],a[n-1]。

##### VJ10-div1G - 风神之诗

- 另見 VJwin3F - Sleepy Cow Herding S

- 将位于数轴上的分散的通过若干次操作变成一坨相邻的点，每次操作只能将位于两端的一个点置于另两个点之间，求最少及最多次数。

  最小：先找到点最密集的一坨，再用总奶牛数减去最大的一坨奶牛即可。注意特判点是一坨和单独的一个的情况。

  最大：端点先跳到一边的里面，然后这一边开始往里缩，直到缩成一坨。

##### VJ10-div1H - 插入排序

- /* */

#### VJ11-分治与二分-div2

##### VJ11-div2A - 查找

新知练习题略。

##### VJ11-div2B - 赵神牛的游戏

注意作为除数的法力值a不能为0，否则会RE。而且，法力值为0且有伤害时总可以获胜。因此正确的判断方式是：

```c++
if (!a && b || a && k/a*b >= n) {}
```

##### VJ11-div2C - 圣遗物 Section I

没理解题意，题目说“你想要把你的圣遗物仓库分成连续的若干部分”，这个“连续”指的是按照输入的顺序，连续输入的叫做连续，所以不能对数组排序等操作。



##### VJ11-div2E - 幂次方

题解给出了求一般对数和指数的方法：

```c++
int p=1; b=0;
while (p*m <= n) {
	b ++;
	p *= m;
}
// b为log_m(n), p为m^n
```

##### VJ11-div2F - 圣遗物 Section II

将C题输入与输出互换，已知输出，用二分的方式找输入。

程序运行后显示Process returned 7 (0x7)……问AI说是数组越界，改了好多次还是不行……最终发现是因为前面多加了一个return……



1. 首先，定义一个结构体 Point ，用于存储点的坐标 x 和 y .
2. 定义一个比较函数 cmp ，用于比较两个点。如果两个点的 x 坐标不同，就按照 x 坐标的大小进行排序；如果 x 坐标相同，就按照 y 坐标的大小进行排序。
3. 在 main 函数中，首先输入点的数量 n ，然后输入每个点的坐标，并将这些点存储在向量 p 中。然后，使用 sort 函数，根据 cmp 函数对这些点进行排序。
4. 然后，遍历所有的点对 (i, j) ，计算这两个点的中点 mid 。如果 mid 的坐标都是整数，就使用 lower_bound 函数在排序后的点集中查找 mid 。如果找到了 mid ，就将答案 ans 加一。
5. 最后，输出答案 ans。

#### VJ11-分治与二分-div1

##### VJ11-div1A - 一元三次方程求解

- 【思路】先二分找到一个解，再向两侧找到其它解。
- 【题解】不同解差至少为 1，每隔一个1就二分一次答案。
- 



#### VJ13-简单数学和枚举约减-div2

##### VJ13-div2A - Morning

将0当成10，求相邻两位数字差值之和。

##### VJ13-div2B - Sorting with Twos

只需保证每个$$[2^n,2^{n+1})$$区间不减，也即逢$$i=2^n$$无需判断。

题解用暴力描述了这个过程，但实际上用位运算判断i是否为2的幂即可。

##### VJ13-div2C - Qingshan Loves Strings

按题意模拟即可，注意首先需要保证t本身是好串。

WA：如果不需要插入t串，那么无需判断t是否是好串。

##### VJ13-div2D - Qingshan Loves Strings 2

首先保证n是偶数且0和1的数量相等。注意到如果某对应位置两数相同，插入一个01就可以解决。具体来说，对于0……0，在末位加上01，则化为0……001，进而判断……00的部分；对于1……1，则在首位加上01。

WA：总是在末尾加上01，导致1……1死循环。

题解优化：使用insert()。

原代码：

```c++
if (s[i] == s[n-i-1]) {
    if (s[i] == '0') {
        ans[count++] = n-i;
        s[n-i] = '0';
        s[n-i+1] = '1';
    } else {
        ans[count++] = i;
        for (int j = n-1; j >= i; --j) {
            s[j+2] = s[j];
        }
        s[i] = '0';
        s[i+1] = '1';
    }
    n += 2;
}
```

优化：

```c++
if (s[l] == s[r]) {
	if (s[l] == '0') {
        ans[count++] = r + 1;
        s.insert(r + 1, "01");
        r += 2;
    }
    else if (s[r] == '1') {
        ans[count++] = l;
        s.insert(l, "01");
        r += 2;
    }
} else {
    l++; r--;
}
```

##### VJ13-div2E - Find a multiple

抽屉原理，考虑前缀和。如果前缀和已经是0（这里指模n的结果），则已成立，否则判断是否有连续项的和为0，只需两个前缀和相等。为什么只需判断连续项的和为0呢，假设成立，则存在两个前缀和相等，若不然，则前缀和两两不等，而前缀和有n个，且只有n种可能的取值0~n-1，则必有一项为0，这就是第一种情况。

WA：输出时输出的是数组下标而不是数组的值。

##### VJ13-div2F - 青原樱

五三原题……离谱……我怎么没做过这题……

由于两支幼苗之间至少要有一个空位，所以$$m$$支幼苗之间必须有$$m-1$$个空位，剩下$$n-m+1$$位置可以随便放，故方案数为$$A_{n-m+1}^m$$。或者也可以用插板法理解。

```c++
for (int i = n-2*m+2; i <= n-m+1; ++i) {
    ans = ans * i % MOD;
}
```

##### VJ13-div2G - 对角线

每四个点确定两条对角线的交点，即任选四个点的方法总数。

WA两次：long long会爆，需要用unsigned long long。

而且要采用这种写法：

```c++
ans = n * (n-1) / 2 * (n-2) / 3 * (n-3) / 4;
```

而不能直接把24写在后面，否则也会爆。

##### VJ13-div2H - Fractions Again?!

给定k，解1/k=1/x+1/y。

首先确定枚举范围，对于每个k，y的范围满足$$[k+1,2k]$$。

##### VJ13-div2I - All X

注意到
$$
\begin {align}

F(x,m) &= x\cdot10^{m-1}+x\cdot10^{m-2}+\cdots+x\cdot10+x \\

&= \left(10^{m-1}+10^{m-2}+\cdots+10+1\right)x \\

&= \frac19\left(10^m-1\right)x

\end {align}
$$
于是
$$
\begin {align}

F(x,m) &\equiv c \quad&(\text{mod }k) \\

\iff \hfill \quad\frac19\left(10^m-1\right)x &\equiv c \quad&(\text{mod }k) \\

\iff \hfill \qquad\left(10^m-1\right)x &\equiv 9c \quad&(\text{mod }k) \\

\end {align}
$$
这时就可以用程序模拟……吧……

**TLE**。

这个式子中有一个幂运算，而且题目给出$$m\le10^{10}$$，暴力求幂必然会TLE。

尝试进行一些**优化**：

式子中有模，而且熟知求幂对模有周期性（阶），但是考虑到阶的复杂性（以及博主能力有限），我们尝试使用**欧拉定理**。

【情形1】若$$10\perp k$$​，由欧拉定理，有
$$
10^{\phi(k)}\equiv1 \quad(\text{mod }k)
$$
而题目约定$$k\le10^4$$，求出$$\phi(k)$$也不是很复杂的事情，所以这种方法可以采用。这样，将指数$$m$$对$$\phi(k)$$​求模后再运算，可以大大降低复杂度。

【情形2】但若$$2 \mid k$$或$$5 \mid k$$，上述方法就不奏效了，但稍加变形即可。

比如如果有$$2 \mid k$$​，便可以设$$2^\alpha \vert\vert k$$​，

当$$m\ge\alpha$$​时，容易得到
$$
10^m \mod k = 2^\alpha\left(\frac{10^m}{2^\alpha} \mod \frac{k}{2^\alpha}\right)
$$
而若$$m<\alpha$$，暴力枚举即可，这是因为此时的$$m$$一定满足$$m < \log_210000 + 1$$即$$m\le14$$，数字很小。

更一般地，设$$2^\alpha \vert\vert k, 5^\beta \vert\vert k$$，并记$$k'=\frac{k}{2^\alpha\cdot5^\beta}$$，则$$2\nmid k', 5\nmid k'$$。

当$$m\ge \max\{\alpha, \beta\}$$时，有
$$
10^m \mod k = 2^\alpha\cdot5^\beta \left(2^{m-\alpha}\cdot5^{m-\beta} \mod k'\right)
$$
并且$$2^{m-\alpha}\cdot5^{m-\beta}\perp k'$$，这就化为了情形1，也就是将$$m-\alpha$$以及$$m-\beta$$对$$\phi(k')$$取模。求出运算结果后再代回原来的式子即可。

否则，即$$m< \max\{\alpha, \beta\}$$，暴力枚举。

现在主体部分就搞定了，还差最后一步：求$$\phi(n)$$。

考虑到欧拉函数具有递推的性质，我们**对$$\phi(n)$$打表**。

【定理】设$$n$$的最小素因子为$p$，有递推公式
$$
\phi(n) =

\left\{

\begin {align}

& p\cdot\phi(\frac np) , \quad\text{若 }p \mid \frac np \\

& (p-1)\phi(\frac np) , \quad\text{若 }p \nmid \frac np \\

&1, \quad n=1

\end {align}

\right.
$$
撒花！

附上代码：

```c++
#include <cstdio>
typedef long long ll;

const int maxN = 1e4+10;
int phi[maxN];

void dophi() {
    phi[1] = 1;
    for (int n = 2; n <= maxN; ++n) {
        for (int p = 2; p <= n; ++p) {
            if (n % p == 0) {
                if (n/p % p) phi[n] = (p-1) * phi[n/p];
                else phi[n] = p * phi[n/p];
                break;
            } else if (n == p) {
                phi[n] = n - 1;
                break;
            }
        }
    }
}


int main() {
    dophi();

    int T;
    int x, m, k, c, kk;
    ll lhs, rhs, coefficient;

    scanf("%d", &T);
    for (int ti = 1; ti <= T; ++ti) {
        scanf("%d %d %d %d", &x, &m, &k, &c);

        lhs = 1;

        coefficient = 1;
        int kk = k, alpha = 0, beta = 0;
        while (!(kk & 1)) {
            alpha ++;
            coefficient <<= 1;
            kk >>= 1;
        }
        while (kk % 5 == 0) {
            beta ++;
            coefficient *= 5;
            kk /= 5;
        }

        alpha = (m - alpha) % phi[kk];
        beta = (m - beta) % phi[kk];

        while (alpha --) {
            lhs = lhs * 2 % kk;
        }
        while (beta --) {
            lhs = lhs * 5 % kk;
        }

        lhs = lhs % kk;
        lhs = lhs * coefficient % k;
        lhs = (lhs - 1) * x % k;
        if (lhs < 0) lhs += k;

        rhs = 9 * c % k;

        printf("Case #%d:\n", ti);
        if (lhs == rhs) printf("Yes\n");
        else printf("No\n");
    }
    return 0;
}
```

##### VJ13-div2J - 质因子分解

RTE：本着省时间的角度“优化”了代码，结果空间超限了。

RE：数组定义范围为maxN，写循环时maxN取等了，导致RE。

所以这道题暴力就行。

这里给出另解：

$$n!$$的质因数必定是$$1~n$$中所有的质因数，且每个质因数的个数为
$$
cnt_{P_i}= \frac n{P_i} + \frac n{P_i^2} + \cdots + \frac n{P_i^k} \left(P_i^k \le n \right)
$$

```c++
#include <cstdio>

const int maxN = 1e4+10;
int p[maxN],ans[maxN];
bool a[maxN];

int main() {
	int n, cnt = 0, k;
    
	scanf("%d", &n);
	for (int i = 2; i <= n; ++i) {
		if (a[i]) { // i是合数
            continue; 
        } else { // i是素数
            p[++cnt] = i;
            for (int k = i; k <= n; k *= i) {
                ans[cnt] += n/k;
            }
            for (int j = i * i; j <= n; j += i) { a[j] = true; } // 埃氏筛法
    	}
	}
	for (int i = 1; i <= cnt; ++i) {
		printf("%d %d\n", p[i], ans[i]);
	}
	return 0;
} 
```

##### VJ13-div2K - 三连击（升级版）

100分但是Unaccepted。

RE：除数不能为0，特判。

#### VJ13-简单数学和枚举约减-div1

##### VJ13-div1B - Smilo and Monsters

操作一是怪物减一滴血以积攒能量，操作二是将能量杀死全部等于这个能量的怪物，求最小攻击次数。

##### VJ13-div1D - 考新郎

所求为$$D_mC_n^m$$。

错排数即
$$
D_{n}=n!\left( \frac{1}{0!}-\frac{1}{1!}+\frac{1}{2!}-\frac{1}{3!}+...+(-1)^{n}\frac{1}{n!} \right)=n!\sum_{k=0}^{n}{(-1)^{k}\frac{1}{k!}}
$$
代码：

```c++
ll d(int n, int k) {
    ll sum = 1, ans = 0, temp = 1;
    for (int i = k+1; i <= n; ++i) {
        sum *= i;
    }
    for (int i = 0; i <= n-k; ++i) {
        ans += ((i%2) ? -1 : 1) * sum / temp;
        temp *= (i+1);
    }

    return ans;
}
```

##### VJ13-div1E - 越狱

所求即m^n - m*(m-1)^(n-1)。

##### VJ13-div1F - 盒子与球

将这n个不同的球放入r个不同的盒子中，且不允许有空盒子。即第二类斯特林数。

```c++
ll stirling(ll n, ll m) {
	if (n < m) return 0;
	if (m == 1) return 1;
	if (m == 2) return (1<<(n-1)) - 1;
	return stirling(n-1, m-1) + m*stirling(n-1, m);
}
```

##### VJ13-div1H - 计算系数

利用卢卡斯定理求组合数。

```c++
const int maxN = 1e3+10;
ll fac[maxN];
const ll MOD = 10007;

void doFac() {
    fac[0] = 1;
    for (int i = 1; i < maxN; ++i) {
        fac[i] = fac[i-1] * i % MOD;
    }
}

ll qpow(ll x, ll y) {
	if (y == 0) return 1;
	ll ans = qpow(x, y/2);
	ans %= MOD;
	ans *= ans;
	if (y % 2) {
		ans *= x;
		ans %= MOD;
	}
	return ans;
}

ll C(ll n, ll m) {
    if (m > n) return 0;
    return fac[n] % MOD * qpow(fac[m], MOD-2) % MOD * qpow(fac[n-m], MOD-2) % MOD;
}

ll Lucas(ll n, ll m) {
    if (!m) return 1;
    return C(n%MOD, m%MOD) % MOD * Lucas(n/MOD, m/MOD) % MOD;
}
```

先运行doFac()，再调用Lucas(n, m)以开始计算。

##### VJ13-div1J - 统计方形（数据加强版）

求n×m棋盘包含多少正方形、长方形。

O(mn)的方法：遍历右下角

```
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= m; j++) {
        sum1 += i < j ? i : j;
        sum2 += i * j;
    }
}
```

O(1)的方法：

长方形个数：

我们可以这么想，长方形的长的起始点是 $x$，结束点是 $y$，宽的起始点是 $a$，结束点是 $b$（$ x \ne y , a \ne b$）。

也就是说，$x,y$ 的选点方法总数是：$$C^2_{n+1} = \frac{A^2_{n+1}}{2!} = \frac{(n + 1) \times n}{2}$$，同理有 $a,b$ 的选点方法总数。

根据乘法原理，长方形个数（包括正方形为）：
$$
\frac{(n + 1)n}{2} \times \frac{(m + 1)m}{2}
$$
正方形个数：

考虑每个正方形边长，直至边长为 $m$。

- 边长为 $1$：个数 $=n \times m$。

- 边长为 $2$：个数 $=(n - 1) \times (m - 1)$。

- 边长为 $3$：个数 $=(n - 2) \times (m - 2)$。

  $\cdots\cdots$

- 边长为 $m$：个数 $=(n - m + 1) \times 1$。

正方形总个数
$$
= \sum_{i = 0}^{m - 1} (n - i) \times (m - i) = \frac{m(m + 1)\cdot[2n + (n - m + 1)]}{6}
$$

##### VJ13-div1K - 妖梦拼木棒

有n根木棒，现在从中选4根，想要组成一个正三角形，问有几种选法。

先选出两根一样的，再选出两根使这两根的长度之和与先前选出的相同即可。

##### 补充

卡特兰数：

```c++
ll catalan(int n) {
    ll ans = 1;
    for (int i = 2; i <= n; ++i) {
        ans = ans * (4 * i - 2) / (i + 1);
    }
    return ans;
}
```

#### VJ14-位运算-div2

##### VJ14-div2A - 只要是英文题就出简单点

因为异或运算满足交换律，故所求结果为所有 $$a_i$$ 的异或结果再与 $$x$$ 做 $$n$$ 次异或运算，希望结果 $$ans=0$$。

注意到 $$x⊕x=0,x⊕0=x$$。

记所有 $$a_i$$ 的异或结果为 $$S$$ 。如果 $$n$$ 为偶数，$$ans$$ 总等于 $$S$$，除非 $$S=0$$ 否则无法达到目的；如果 $$n$$ 为奇数， $$ans=S⊕x$$ ，取 $$x=S$$，有 $$ans=0$$。

##### VJ14-div2D - 跳来跳去，把人都跳拥了

连续0的数量是偶数。用二进制考虑，向右跳即该位为1，向左跳即-1，则需要向高位借，例如

|                    |                  |                 |
| ------------------ | ---------------- | --------------- |
| 1 1 -1 1           | 1 0 0 1          |                 |
| 1 1 1 -1 -1 1      | 1 1 0 0 -1 1     | 1 0 1 1 0 1     |
| 1 1 1 -1 1 -1 -1 1 | 1 1 0 0 0 0 -1 1 | 1 0 1 1 1 1 0 1 |
|                    | 1 1 0 1 0 -1 1   | 1 1 0 0 1 0 1   |







##### VJ14-div2G - 反手开G题，闷声发大财

6。

#### VJ14-位运算-div1

##### VJ14-div1A - 死磕A题~

/* */

##### VJ14-div1B - DEATHSTAR

已知所有的a_i&a_j，还原a_i。

对于每一位，如果某一行全为1，则这个数的该位为1。因此取该行的按位或即可。

##### VJ14-div1C - 取石子



##### VJ14-div1D - 异或积



##### VJ14-div1E - 签到题喵



##### VJ14-div1F - 很简单呀，div2也出了这题

自己的思路真的很笨：

每次循环让k自除2，ans1自乘2，直到k小于0时便得到了ans1，即大于k的2的最小次幂。为了求大于等于k的2的最小次幂，我们特判k为2的幂的情形。

为了求ans2，定义b为所分割的最小块的大小，则ans2为ans1/b再取对数。在每次循环中，第一次出现k是奇数时（也就是k的最后一个1的位置）取b为ans1即可。（可以结合二进制考虑）

优化：

为什么要取b为ans1再取对数呢？直接用计数器算b就可以了。而且两个循环可以分开写，这样容易进行第一次的判断。

##### VJ14-div1G - 反手开G题，闷声发大财

课上讲的空荧问题。空是按位或一个数，可以把0变成1；荧是按位与一个数，可以把1变成0。

那么如果n是1的位数在m里都是1，就可以利用空调整0为1或保持不变，只需1次。同理如果n是0的位数在m里都是0，就可以利用荧，也只需1次。否则最多需要2次，一次用空操作0，另一次用荧操作1。

熟知，如果n是1的位数在m里都是1的等价表述是n|m=m。

##### VJ14-div1H - 7行代码就能AC？

高低位调换，将n右移16位则将高位变成低位，取n的前16位（即和65535作与运算）再左移16为则将低位变成高位。

WA：定义ll型但输入时使用%d。

##### VJ14-div1I - 你猜我是不是签到题









#### VJ15-枚举排列-div2

##### VJ15-div2A - 欢乐的跳

输入在同一行，如果不仔细看会懵。

RE：用棋盘标记法时，数组范围用的n的范围而不是数字的范围。

##### VJ15-div2B - Milica and String

WA：啊？

##### VJ15-div2C - 全排列问题

熟悉题意题，略。

##### VJ15-div2E - Permutations

RE：赋初值时行列数看反了，导致对列元素的赋值没有完全。（因为题设中都是行数大于列数的情况所以没有问题，但是所给数据允许列数大于行数）

WA：为什么啊

#### VJ15-枚举排列-div1

##### VJ15-div1A - 八皇后 Checker Challenge

【思路】

每个后不能在同一行同一列，也就是每行都仅有一个后，且它们的列标不同。因此每个后的位置构成全排列。

又要求两个后不能在同一条斜线上，直接将这个后和之前放好的后一一比较即可。比较的方法是：$$\triangle x=\triangle y$$。

题设要求只输出三组数，那么三组之后需**截断**，否则会超时。

> 博主不知道怎样截断所以采用了一种很 ~ 新 ~ 的 ~ 方 ~ 法 ~，就是：**用自己的电脑把结果算好，然后直接输出！**像这样：
>
> ```c++
> int ans[14] = {0, 0, 0, 0, 0, 0, 4, 40, 92, 352, 724, 2680, 14200, 73712};
> printf("%d", ans[n]);
> ```
>
> 小强评价：人脑计算机……

额看题解也没说怎么截断，只说**开O2优化**就能过了……

【题解】

主函数由queen(1); 开始。然后进入核心的queen函数，

```c++
void queen(int i) {
    if (i > n) {
    	count ++;
    	/* 输出略 */
    	return;
    } else for(int j = 1; j <= n; ++j) {
        if (flag[j] != 1 && x[i+j] != 1 && y[i-j+n] != 1) {
            flag[j] = x[i+j] = y[i-j+n] = 1;
            ans[i] = j;
            queen(i+1);
            flag[j] = x[i+j] = y[i-j+n] = 0;
        }
    }
}
```

它的**框架是全排列**，即

```c++
void queen(int i) {
    if (i > n) { // i是行数
    	cnt ++; // 计数器
    	/* 输出略 */
    	return;
    } else for (int j = 1; j <= n; ++j) { // j是列数
        if (flag[j] != 1){
            flag[j] = 1; 	// 这一列已经被占用
            ans[i] = j; 	// 写入数组 以便输出
            queen(i+1); 	// 下一行
            flag[j] = 0; 	// 初始化
        }
    }
}
```

在此基础上增加了一些判断条件，用于保证两个后不在同一条斜线上：

其中**x[]用于判断从左下到右上那条斜线**，这条斜线上行数i和列数j的和为定值（考虑一次函数）。仿照上述全排列的代码，赋值x[i+j]=1表示这一斜线已经有一个后。判断时，只有当x[i+j]!=1，即斜线没有其它后时才满足条件，可以继续进行递归。

同理**y[]用于判断从左上到右下那条斜线**，这条斜线上行数i和列数j的差为定值。

附图：

<img src="./data/ACM笔记/image-20231129225615369.png" alt="image-20231129225615369" style="zoom:25%;" />

##### VJ15-div1C - Add, Divide and Floor

重定向自 VJwin3K - Add, Divide and Floor。

對於一個數列，每次可以選取一個數 $$x$$，並令每一項爲 $$a_i=\lfloor\frac{a_i+x}{2}\rfloor$$，求最小操作次數使得數列變爲全相等。

操作次數是極差取以 2 爲底的對數，具體操作方法是，從小到大排序後，選取最小不相同的兩項，取 $$x$$ 爲較小的那個。

代碼：

```cpp
for (scanf("%d", &n), int i = 0; i < n; ++i) { scanf("%d", &a[i]); }
std::sort(a, a + n);
max = a[n - 1] - a[0];
while (max) { max >>= 1; ans++; }
printf("%d\n", ans);
if (ans > n) return;
for (int i = 0; i < n - 1; ++i) {
	if (a[i] != a[i + 1]) {
		printf("%d ",a[i]); // WA
		for (int j = 0; j < n; ++j) {
			a[j] = (a[j] + a[i]) / 2;
		}
	--i;
	}
}
printf("\n");
```



##### VJ15-div1C - Anagram

TLE：为啥？把比较大小的过程写到cmp里面就过了？？

#### VJ16-枚举子集-div2

##### VJ16-div2A - 出题方案

典型题略。

##### VJ16-div2C - 典型枚举子集2号

典型题略。素数筛的方法见 PART 5。

##### VJ16-div2G - 涂国旗

典型双指针略。

#### VJ16-枚举子集-div1

##### VJ16-div1A - 典型枚举子集

加以限制 cur=k。

##### VJ16-div1C - 能否一次AC

在矩阵中给定的区域内站队，只需统计每行每列连续空位数。

WA：未注意1的特殊情况。这是由于每个队伍只有1个人，那么按行和按列时都会统计到，造成统计重复，需要除以2.

##### VJ16-div1D - 火柴棒等式

由1111+1=1112的火柴总数为25可知数据范围不会超过三位数，直接计算出1000以内数字的全部火柴消耗再进行枚举即可。

##### VJ16-div1E - Jam's balance

问用所给砝码能否测出物体的质量。

每个砝码的系数可以取0,-1,1，有三种情况，枚举子集会超时，这里采用跳马算法（自己起的名字）。

```c++
isOK[0] = 1;
for (int i = 0; i < n; ++i) {
    for (int j = 0; j < maxW; j++) {
        if (isOK[j]) {
            temp[j] = temp[j+w[i]] = temp[abs(j-w[i])] = 1;
        }
    }
    for (int j = 0; j < maxW; ++j) {
        isOK[j] = temp[j];
        temp[j] = 0;
    }
}
```

##### VJ16-div1F - 最美子集

TLE：暴力枚举子集，显然 $$2^{10^5}>10^9$$。

从与运算的本质考虑，子集的与结果应当为 11...100...0 的形式，而且需要结果的 0 的个数尽可能多，做运算的数的个数尽可能多。

那么我们从最高位开始枚举。对于一个固定的位数，把这一位是 1 的数拿出来形成一个子集，计算出结果，再看是否满足题设。

原计划还要从末尾开始统计 0 的个数，但这样不如直接用与运算得出结果。

##### VJ16-div1G - Heavy Coins

根据条件调整枚举子集函数的内容即可。

##### VJ16-div1H - 熄灯问题

新高考一卷填空压轴题强势回归！

这次，小明不仅带来了做高考题的脑子，还有写代码枚举的脑子！

按经验，只需讨论第一行的按灯情形，这样，后面几行的情形根据上一行惟一确定；在检验时，也只需检验最后一行。

按第一行枚举子集即可。

提示：按灯可用异或运算描述。









### VJwin

#### VJwin1-TrainingRound#1-Exercise1

##### [VJwin1C - RSP](https://codeforces.com/gym/104725/problem/K)

- **題意** $$n$$ 個元素的石頭剪刀布，要求上一輪出過的不能再出，玩有限輪，問獲勝概率。
- **思路** 第一輪靠运气，後面每輪雙方可選擇被上一輪對方所選的數字克制的數字，保證不輸，這樣獲勝只可能在第一輪，概率爲 $$\displaystyle \frac{1}{n}$$。這個結果容易猜測出。
- **評註** 和 $$\color{purple}万姐$$ 討論，發明石頭剪刀布的古人好聰明 ~ $$n=3$$ 是平局概率最小的。

##### [VJwin1G - Minimize the Thickness](https://codeforces.com/problemset/problem/1741/C)

- **題意** 給定數組，按序劃分，使每個子塊的所有元素之和相同，求最大子塊長度的最小值。

- **思路**

  - 枚舉第一個區間，它的元素和一定是所有元素和的約數；
  - 向後遍歷，尋出子塊的最大長度；
  - 每次枚舉的最大長度求最小值。

- **代碼**

  ```cpp
  int ans = 1e9;
  // 輸入和前綴和處理略
  for (int i = 1; i < n; ++i) { // 枚舉第一個區間
  	if (s[n] % s[i] == 0) {
  		int l = i + 1, r = i + 1;
  		int maxlen = i; // WA：忽略了第一個區間，非maxlen = 0;
  		while (r <= n) {
  			if (s[r] - s[l - 1] == s[i]) {
  				maxlen = max(maxlen, r - l + 1);
  				l = r + 1;
  			} else if (s[r] - s[l - 1] > s[i]) {
  				goto aaa;
  			}
  			++r;
  		}
  		ans = min(ans, maxlen);
          aaa:;
  	}
  }
  printf("%d\n", ans == 1e9 ? n : ans);
  ```

- **評註** `Happy New Year!`

##### [VJwin1E - Subsequence](http://poj.org/problem?id=3061)

- **題意** 給定數組，尋找元素之和大於 $$q$$ 的連續子列。

- **思路** 枚舉第一個數，再向後遍歷，但是沒想到使用 `lower_bound`，$$\bold{TLE}$$；

- **注意** $$\bold{WA}$$：未修改 `maxN`；

- **代碼**

  ```cpp
  int ans = 1e9;
  // 輸入和前綴和處理略
  for (int i = 1; i <= n; ++i) {
  	int p = std::lower_bound(s + i, s + n, s[i - 1] + q) - s;
  	if (s[p] - s[i - 1] >= q) { ans = min(ans, p - i + 1); }
  }
  printf("%d\n", ans == 1e9 ? 0 : ans);
  ```
  
- **評註** 題解給出的方法是

  ```cpp
  int l = 0, r = 0, ans = 1e9;
  int sum = 0;
  while (1) {
  	while (r < n && sum < q) sum += a[r++];
  	if (sum < q) break;
  	ans = min(ans, r - l);
  	sum -= a[l++];
  }
  printf("%d\n", ans == 1e9 ? 0 : ans);
  ```
  
  很典型的方法，可能是我寫的太臭 `TLE` 了。

##### [VJwin1A - 疾羽的救赎](https://codeforces.com/gym/104725/problem/A)

- **題意** 移動指定的卡牌，且在其上方的卡牌會跟着移動。

- **思路** 使用向量便輕而易舉了：

  ```cpp
  std::vector< std::vector<int> > c(10);
  c[2].push_back(1);
  c[3].push_back(2);
  c[4].push_back(3);
  for (int ti = 0; ti < 12; ti++) {
  	int a, b;
  	std::cin >> a >> b;
  	bool flag = 0;
  	for (int i = 1; i <= 9; i++) {
  		for (int j = 0; j < c[i].size(); j++) {
  			if (c[i][j] == a) {
  				for (int k = j; k < c[i].size(); k++) {
  					c[i + b].push_back(c[i][k]);
  				}
  				for (int k = c[i].size() - 1; k >= j; k--) {
  					c[i].erase(c[i].begin() + k);
  				}
  				flag = 1;
  				break;
  			}
  		}
  		if (flag)
  			break;
  	}
  }
  std::cout << (c[9].size() == 3 ? "Y" : "N") << "\n";
  ```
  
  不使用向量即是：
  
  ```cpp
  int c[10][10] = { 0 };
  int len[10] = { 0 };
  c[2][len[2]++] = 1;
  c[3][len[3]++] = 2;
  c[4][len[4]++] = 3;
  for (int ti = 0; ti < 12; ++ti) {
  	int a, b;
  	scanf("%d %d", &a, &b);
  	bool flag = 0;
  	for (int i = 1; i <= 9; ++i) {
  		for (int j = 0; j < len[i]; ++j) {
  			if (c[i][j] == a) {
  				for (int k = j; k < len[i]; ++k) {
  					c[i + b][len[i + b]++] = c[i][k];
  				}
  				for (int k = len[i]; k >= j; --k) {
  					c[i][k] = 0;
  				}
  				len[i] = j;
  				flag = 1;
  				break;
  			}
  		}
  		if (flag)
  			break;
  	}
  }
  printf("%s\n", (len[9] == 3 ? "Y" : "N"));
  ```
  
- **評註** 這題方法很多，能搞出來就行。

##### [VJwin1D - 养成游戏](https://codeforces.com/gym/104725/problem/L) - UPSOLVE

- **題意** 給出一些打分條件，可任意調控變量，求分數最大值。

- **思路** 小數字適合暴力枚舉。這裏給出方法：

  ```cpp
  void enumerateArray(int arr[], int pos) {
  	if (pos == n) {
  		doing(arr);
  		return;
  	}
  	for (int i = 0; i <= k; i++) {
  		arr[pos + 1] = i;
  		enumerateArray(arr, pos + 1);
  	}
  }
  ```

  主函數調用 `enumerateArray(arr, 0);` 即可。

##### [VJwin1H - 跳石头](https://www.luogu.com.cn/problem/P2678) - UPSOLVE

- **題意** 最多移走一些石頭，使最短跳躍距離最大。

- **思路** 對最短跳躍距離二分。這是由於，答案對於最短跳躍距離有單調性，單調性在於，如果調大跳躍距離，需要移走的石頭會增加，反之減小。那麼，如果需要移走的數量大於期望值，就調小跳躍距離，並可以將這個距離重新定義爲二分上界，如果需要移走的數量小於期望值，就重新定義二分下界。剩下相等的情況，當前最短跳躍距離已經複合題意，因爲要找最短跳躍距離的最大值，只要增大跳躍距離接着搜索，也即重新定義二分下界，所以等號併與後者。

- **代碼** 二分判斷函數：

  ```cpp
  bool half(int x) { 					// 目前嘗試的距離
  	int now = 0, cnt = 0; 			// 移走的數量
  	for (int i = 0; i <= n; ++i)
  		if (a[i] - now < x) ++cnt; 	// 兩個石頭的距離小於期望值，移走石頭
  		else now = a[i]; 			// 跳過去
  	return cnt <= m; 				// 需要移走的數量大於期望值就返回0，調小距離
  }
  ```

  主函數：

  ```cpp
  scanf("%d %d %d", &l, &n, &m);
  for (int i = 0; i < n; ++i) { scanf("%d", &a[i]); }
  int lt = 0, rt = a[n] = l; // 二分的邊界，注意終點是l而非a[n-1]
  while (lt <= rt) {
  	int mid = (lt + rt) / 2;
  	if (half(mid)) lt = mid + 1;
  	else rt = mid - 1;
  }
  printf("%d\n", lt - 1);
  ```

##### [VJwin1J - Monthly Expense](http://poj.org/problem?id=3273) - UPSOLVE

- **題意** 將數組劃分爲指定的組數，每組元素和的最大值儘可能小。

- **思路** 依舊是二分，對每組元素和的最大值二分。這裏解釋等號，和上一題類似，需要二分的值儘可能小，那等號就併與減小上界的情況中。

- **注意** 二分前，最小值務必考慮，不能草率地賦值爲 `0` 或 `1`，否則例如，設置搜索值爲 4，組數爲 4，那麼 `{1,2,3,4,5}` 返回的 `cnt=4`，即 `[1,2][3][4][5]`，程序認爲它合題，但實際上不是。所以需要在二分前準確設置最小值，或者在判斷時增加 `if(a[i]>x) return 0;`。

- **代碼** 二分判斷函數：

  ```cpp
  bool half(ll x) {
  	int s = 0, cnt = 1;
  	for (int i = 0; i < n; ++i)
  		if ((s += a[i]) > x) ++cnt, s = a[i];
  	return cnt > m;
  }
  ```

  主函數：

  ```cpp
  int lt = 0, rt = 0;
  scanf("%d %d", &n, &m);
  for (int i = 0; i < n; ++i) {
  	scanf("%d", &a[i]);
  	lt = max(lt, a[i]), rt += a[i];
  }
  while (lt <= rt) {
  	int mid = (lt + rt) / 2;
  	if (half(mid)) lt = mid + 1;
  	else rt = mid - 1;
  }
  printf("%d\n", lt);
  ```
  
- **評註** 這道題和上一題的二分返回值和輸出值皆有不同。待我仔細思索、、、補：等號併與哪裏已經寫在思路中，至於輸出，包含等號的那種情況的 `mid` 是結果。

##### [VJwin1I - 聪明的质监员](https://www.luogu.com.cn/problem/P1314) - UPSOLVE

- **題意** 選出一個參數 $W$，在每個給定的 $m$ 個區間 $[l_i,r_i]$ 上計算 $$y=\sum\limits_{i=1}^m\Big(\sum\limits_{j=l_i}^{r_i}[w_j \ge W] \times \sum\limits_{j=l_i}^{r_i}[w_j \ge W]v_j\Big)$$，使 $|y-s|$ 最小。

- **思路** 對參數參數 $W$ 二分，易於判斷，若 $$y>s$$，需要增大下界，反之減小上界，不同的是，每次判斷時計算 $|y-s|$ 的值。

- **代碼** 

  ```cpp
  bool half(int x) {
  	for (int i = 1; i <= n; ++i) {
  		s1[i] = s1[i - 1] + (w[i] >= x);
  		s2[i] = s2[i - 1] + (w[i] >= x) * v[i];
  	} // 前綴和預處理
  	ll y = 0;
      for (int i = 1; i <= m; ++i)
          y += (s1[r[i]] - s1[l[i] - 1]) * (s2[r[i]] - s2[l[i] - 1]);
  	ans = min(ans, abs(y - s));
  	return y > s;
  }
  ```

##### [VJwin1B - 最長上升子序列](https://codeforces.com/gym/104725/problem/F) - UPSOLVE

- **題意** 一個 `1~n` 的全排列，給出每個位置的以該位置結尾的最大上升子序列長度，求這個全排列。

- **思路**

  - **背景** 按求最長上升子序列的方法，設這個數列爲 $$a_i$$，則 $$dp_i=\max_{a_j<a_i}(dp_j)+1$$，現在已知 $$dp_i$$，需要反推 $$a_i$$。

  - **原理** 對於每一個滿足 $$dp_i=1$$ 的數 $$a_i$$，則 $$a_i$$ 一定小於它前面的所有數，這是因爲 $$\max_{a_j<a_i}(dp_j)=0$$，而 $$dp_j\ge1$$，只能不存在 $$dp_j$$。

    對於每一個滿足 $$dp_i=2$$ 的數 $$a_i$$，則 $$a_i$$ 一定只大於它前面所有滿足 $$dp_j=1$$ 的數 $$a_j$$，小於滿足 $$dp_j=2$$ 的數 $$a_j$$，滿足 $$dp_j=3$$ 的數 $$a_j$$ 等等。

    同理，對於每一個滿足 $$dp_i=x$$ 的數 $$a_i$$，$$a_i$$ 一定只大於它前面所有滿足 $$dp_j<x$$ 的數 $$a_j$$。

  - **實現** 這樣看來，我們可以將 $$1$$ 到 $$n$$ 中最小的幾個數逆序放置到 $$dp_i=1$$ 的位置上（這樣可以保證每一個滿足 $$dp_i=1$$ 的數 $$a_i$$ 小於它前面的所有數），然後把剩下最小的數逆序放置到 $$dp_i=2$$ 的位置上，以此類推，最終可以得到一個符合題面要求的數組。

  - **優化** 需要倒序輸出剩下的最小的幾個數，亟待解決以下問題：(1) 剩下什麼？(2) 究竟是幾個？(3) 如何倒序輸出？
  
    對於 (2)，用打表計數，用 `cnt[]` 記錄 `dp[]` 的個數便可解決；
  
    對於 (1)，除去刪去的就是剩下的數（注意剩下的數一定比刪去的大），打表後計算 `cnt[]` 前綴和便可知道刪去了幾個數，即是刪去數的最大值。
  
    對於 (3)，前面的前綴和加 `1` 是本次輸出的最小值，再加上當前的個數，即是本次需要輸出的最大值，逐步遞減輸出。
  
- **代碼** 

  ```cpp
  int maxx = 0;
  bool flag = 0;
  for (int i = 1; i <= n; ++i) {
  	scanf("%d", &dp[i]);
  	cnt[dp[i]]++; // 打表計數
  }
  for (int i = 1; i <= n; ++i) { cnt[i] += cnt[i - 1]; } // 計算前綴和
  for (int i = 1; i <= n; ++i) { printf("%d ", cnt[dp[i]]--); }
  ```

  再補上不合題意的判斷，原理是 $$dp_i=\max{}+1$$，不斷更新 $$\max{}$$，如果 $$dp_i>\max{}+1$$，那一定是不合題意的：

  ```cpp
  for (int i = 1; i <= n; ++i) {
  	if (dp[i] > maxx + 1) flag = 1;
  	else if (dp[i] > maxx) maxx = dp[i];
  }
  if (flag) { printf("-1\n"); return; }
  ```

##### [VJwin1F - Monitor](https://acm.hdu.edu.cn/showproblem.php?pid=6514) - UPSOLVE

- **題意** 給矩陣上色，查詢矩形是否全部上色。

- **思路** 前綴與差分。因數據範圍過大，需要將二維坐標一維化，即 `inline int pos(int x, int y) { return x * m + y; }`。

- **代碼**

  ```cpp
  memset(a, 0, sizeof a); // 多組數據需初始化
  int x1, x2, y1, y2, p, q;
  scanf("%d", &p); while (p--) {
  	scanf("%d %d %d %d", &x1, &y1, &x2, &y2);
  	++a[pos(x1, y1)];
  	++a[pos(x2 + 1, y2 + 1)];
  	--a[pos(x1, y2 + 1)];
  	--a[pos(x2 + 1, y1)];
  } // 差分預處理
  // 現在，a[i] 表示差分
  
  for (int i = 1; i <= n; ++i) {
  	for (int j = 1; j <= m; ++j) {
  		a[pos(i, j)] += a[pos(i, j - 1)] + a[pos(i - 1, j)] - a[pos(i - 1, j - 1)];
  	}
  } // 前綴和還原
  // 現在，a[i] 表示該點被上色的次數
  
  for (int i = 1; i <= n; ++i) {
  	for (int j = 1; j <= m; ++j) {
  		if (a[pos(i, j)]) a[pos(i, j)] = 1;
  	}
  } // 上色的次數沒有影響，一律改爲1，便于判断
  // 現在，a[i] 表示該點是否被上色
  
  for (int i = 1; i <= n; ++i) {
  	for (int j = 1; j <= m; ++j) {
  		a[pos(i, j)] += a[pos(i, j - 1)] + a[pos(i - 1, j)] - a[pos(i - 1, j - 1)];
  	}
  } // 前缀和
  // 現在，a[i] 表示該點左上角被染色的數量
  
  scanf("%d", &q); while (q--) {
  	scanf("%d %d %d %d", &x1, &y1, &x2, &y2);
  	int s1 = a[pos(x2, y2)] - a[pos(x1 - 1, y2)] - a[pos(x2, y1 - 1)] + a[pos(x1 - 1, y1 - 1)]; // 矩形内被染色的面積
  	int s2 = (x2 - x1 + 1) * (y2 - y1 + 1); // 矩形的面積
  	printf("%s\n", s1 == s2 ? "YES" : "NO");
  }
  ```

#### VJwin2-Training Round#2-C++STL

##### [VJwin2A - Bad Sequence](https://codeforces.com/problemset/problem/1214/C)

- **題意** 括號配對，至多交換兩個括號，使表達式合法。

- **思路** 消消樂！使用棧匹配括號並消掉，剩下應爲 `)(`。

- **代碼** 

  ```cpp
  std::stack<char> s;
  for (int i = 0; i < n; i++) {
  	char c = getchar();
  	if (c == '(') s.push(c);
  	else if (c == ')' && !s.empty()) s.pop();
  	else s.push(')');
  }
  if (s.empty()) printf("Yes\n");
  else if (s.top() == '(') {
  	s.pop();
  	if (s.empty() || s.top() == '(') printf("No\n");
  	else printf("Yes\n");
  } else printf("No\n");
  ```
  
- **評註** 不使用棧會更加簡單。合法的括號表達式，任意前綴中 `(` 的數量之和應該多於 `)`，本題允許交換，故至多可小於 `-1`。

  ```cpp
  int cnt = 0;
  bool flag = 1;
  scanf("%d\n", &n);
  for (int i = 0; i < n; ++i) {
  	scanf("%c", &a);
  	if (a == '(') ++cnt;
  	else --cnt;
  	if (cnt < -1) flag = 0;
  }
  if (cnt) flag = 0;
  printf("%s\n", flag ? "Yes" : "No");
  ```

##### [VJwin2B - 簡單計算器](https://acm.hdu.edu.cn/showproblem.php?pid=1237)（變式	[VJwin2G - 后缀表达式](https://www.luogu.com.cn/problem/P1449)）

- **題意** 循環讀入一個只包含 `+, -, *, /` 的非負整數表達式，計算。

- **思路** 難點在輸入。

- **代碼** 

  ```cpp
  std::stack<double> s;
  while (1) {
  	scanf("%lf", &num);
  	bool flag = 0;
  	if (num == 0) flag = 1; // 判定終止
  	s.push(num);
  	while (1) {
  		c = getchar();
  		if (c == ' ') flag = 0;
  		else if (flag) return; // 判定終止
  		if (c == '\n') {
  			double sum = 0;
  			while (!s.empty()) sum += s.top(), s.pop();
  			printf("%.2lf\n", sum);
  			break; // 每個測試樣例的終止
  		}
  		c = getchar();
  		scanf("%lf", &num);
  		if (c == '*') num *= s.top(), s.pop(), s.push(num);
  		else if (c == '/') num = s.top() / num, s.pop(), s.push(num);
  		else if (c == '-') s.push(-num);
  		else if (c == '+') s.push(num);
  	}
  }
  ```

##### [VJwin2C - 好消息，壞消息](https://www.luogu.com.cn/problem/P2629) - UPSOLVE

- **題意** 一個環，判斷有多少元素滿足：所有以這個元素爲起始的區間的和非負。

- **思路** 首先斷環爲鏈，簡化題目。熟知可以用前綴和表示區間之和，如區間 `k~l` 等於 `a[l]-a[k-1]`，那麼要判斷區間和是否爲正數，只要最小前綴和是否大於前面數的和。以前綴和作爲單調隊列，維護單調隊列是遞增的，以保證留下最小的元素。

- $$\bold{RE}$$ 斷環爲鏈，所需的數組範圍變大，`maxN` 應改爲 `2maxN`。

- **代碼**

  ```cpp
  scanf("%d", &n);
  for (int i = 1; i <= n; i++) { scanf("%d", &a[i]); }
  for (int i = n + 1; i <= 2 * n - 1; i++) { a[i] = a[i - n]; } // 斷環爲鏈
  for (int i = 1; i <= 2 * n - 1; i++) { s[i] = s[i - 1] + a[i]; } // 前綴和
  int ans = 0;
  for (int i = 1; i <= 2 * n - 1; i++) {
  	while (!q.empty() && s[i] <= s[q.back()]) q.pop_back(); // 維護單調隊列
  	while (!q.empty() && q.front() < i - n) q.pop_front(); // 清除過時的元素
  	q.push_back(i); // 新元素
  	if (i > n - 1 && s[q.front()] - s[i - n] >= 0) ans++;
  }
  printf("%d\n", ans);
  ```

##### [VJwin2D - 機器翻譯](https://www.luogu.com.cn/problem/P1540)

- **題意** 一個數組依次入隊，如果隊中已存在這個數，則不入棧，問入棧總次數，隊的限制爲 $$m$$。

- **思路** 數據較小，判斷隊中是否已存在這個數，遍歷即可。爲了方便遍歷，使用雙端隊列。

- **代碼**

  ```cpp
  std::deque<int> s;
  int cnt = 0;
  for (int i = 0; i < n; ++i) {
      scanf("%d", &a[i]);
  	bool flag = 0; // 隊中是否已存在這個數的標誌
  	for (int j = 0; j < s.size(); ++j) {
  		if (a[i] == s[j]) { flag = 1; break; }
  	}
  	if (!flag) {
  		if (s.size() >= m) s.pop_front(); // 超過隊的限制，移除先入隊的數
  		s.push_back(a[i]); // 入隊
  		++cnt; // 記錄入隊次數
  	}
  }
  printf("%d\n", cnt);
  ```

- **評註** 數據範圍較小，可以打表：

  ```cpp
  int cnt = 0;
  for (int i = 1; i <= n; i++) {
      scanf("%d", &b);
  	if (a[b] == 0) {
  		q.push(b);
  		cnt++;
  		a[b] = 1;
  	}
  	while (q.size() > m) {
  		a[q.front()] = 0;
  		q.pop();
  	}
  }
  printf("%d\n", cnt);
  ```

##### [VJwin2E - 看病要排队](https://acm.hdu.edu.cn/showproblem.php?pid=1873) - UPSOLVE

- **題意** 給出入隊和出隊操作，每個數有編號、父級和優先級，求出隊時的數的編號。

- **思路** 使用優先隊列。

- $$\bold{WA}$$ 結構體比較函數要詳細寫每個變量的情況，`(n1.p == n2.p) ? (n1.no > n2.no) : (n1.p < n2.p)` 而非 `(n1.p < n2.p)`，除非沒有影響。

- **代碼** 

  ```cpp
  std::priority_queue<node>q[4];
  int cnt = 0;
  std::string inout;
  for (int i = 0; i < n; ++i) {
  	std::cin >> inout;
  	scanf("%d", &a);
  	if (inout == "IN") {
  		scanf("%d", &nn.p);
  		nn.no = ++cnt;
  		q[a].push(nn);
  	} else {
  		if (q[a].empty()) {
  			printf("EMPTY\n");
  		} else {
  			printf("%d\n", q[a].top().no);
  			q[a].pop();
  		}
  	}
  }
  ```


##### [VJwin2H - Text Reverse](https://acm.hdu.edu.cn/showproblem.php?pid=1062)

- **題意** 逐個單詞翻轉。

- **代碼**

  ```cpp
  std::stack<char>s;
  char a;
  while (scanf("%c", &a)) {
  	if (a == ' ' || a== '\n') {
  		int len = s.size();
  		for (int i = 0; i < len; ++i) {
  			printf("%c", s.top());
  			s.pop();
  		}
          if (a == ' ') printf(" ");
          else break;
  	} else {
  		s.push(a);
  	}
  }
  printf("\n");
  ```

#### VJwin3-Training Round #3-貪心

##### [VJwin3G - 排隊接水](https://www.luogu.com.cn/problem/P1223)

- **題意** 求排隊時間最小值。
- **思路** 將較小的排在前面，使用結構體。代碼略。

##### [VJwin3H - 烦恼的高考志愿](https://www.luogu.com.cn/problem/P1678)

- **題意** 尋找一個數在某數組中離它最近的一個數。
- **思路** 二分練習題。
- $$\bold{WA}$$ 庫函數二分後沒有加以確認合理性。
- **評註** 找比它大的最接近的和比它小的最接近的沒有必要正着二分再倒着二分，比它大的最接近的的前一個數就是比它小的最接近的。

##### [VJwin3I - 鋪設道路](https://www.luogu.com.cn/problem/P5019)

- **題意** 選擇一些連續的數，使其減少 `1`，至減爲 `0` 止。求操作次數最小值。

- **思路一** 根據樣例的解釋不難發現，優先隊整個區間處理。如遇 `0`，分爲左右兩個子區間處理，適合遞歸。

  **優化** 考慮到操作時需要對每個數做自減，時間複雜度高，我們在遞歸時引入新變量，記錄這些數共同自減的數目。

  ```cpp
  void solve(int l, int r, int done) {
  	if (l > r) return;
  	int min = 1e9, minnum = l;
  	for (int i = l; i <= r; ++i)
  		if (a[i] < min) { min = a[i]; minnum = i; } // 求最小值及編號
  	cnt += min - done;
  	solve(l, minnum - 1, min); solve(minnum + 1, r, min);
  }
  ```

  主函數調用 `solve(1, n, 0);` 即可。

- **思路二** 右邊的大數會在左邊的小數減少時同步減少，那麼對每個大數，只需要做和它左邊的小數的差值那麼多。

  ```cpp
  int sum = 0;
  scanf("%d", &n);
  for (int i = 1; i <= n; ++i) {
  	scanf("%d", &a[i]);
  	sum += a[i] > a[i - 1] ? a[i] - a[i - 1] : 0;
  }
  printf("%d\n", sum);
  ```

##### [VJwin3E - 修理牛棚 Barn Repair](https://www.luogu.com.cn/problem/P1209)

- **題意** 給出分組數目最大值，將數列中元素分組，使得所有組的極差之和最小，求所有組的極差之和。

- **思路** 選取相鄰元素的最大差距，在此處分組。

- $$\bold{WA1}$$ 原數列可能未排序；

  $$\bold{WA2}$$ 分組數目最大值可能大於總元素個數，使用 `min(m,n)` 解決。

- **代碼** 

  ```cpp
  int ans = 0;
  std::sort(a, a + n); // WA1
  for (int i = 0; i < n - 1; ++i) { b[i] = a[i + 1] - a[i]; } // 差分
  std::sort(b, b + n - 1, cmp);
  for (int i = 0; i < min(m, n)/*WA2*/ - 1; ++i) { ans += b[i] - 1; }
  printf("%d\n", a[n - 1] - a[0] + 1 - ans);
  ```


##### [VJwin3C - 茶和咖啡](https://cpc.csgrandeur.cn/csgoj/problemset/problem?pid=1227) - UPSOLVE

- **題意** 有 $$n$$ 次對數組的前 $$r_i$$ 個數中的某個數減少 $$w_i$$ 的優惠券，使得數組中最小值儘可能小，第二小的數也儘可能小，以此類推，求最終數組。

- **思路** 優先使用 $$r_i$$ 較小的優惠券，且使用給前 $$r_i$$ 個數中最小的那個數，這樣使得最小的儘可能小。

  **優化** 因爲優惠券的使用範圍逐步擴大，求最小值時記錄檢索到的位置，下一輪循環時可接着搜索（這個優化也導致了 $$\rm{WA}$$）。

- $$\bold{WA}$$ **`if(a[j]<min) {min=a[j]; minnum=j;}`，所得到的最小值使用優惠券後，導致最小值不能得到更新。修改方案：在後面增加 `min=a[minnum];` 或取消 `min` 這個變量，以 `a[minnum]` 代替之（見下代碼）。**

- **代碼** 

  ```cpp
  scanf("%d %d", &n, &m);
  for (int i = 1; i <= n; ++i) { scanf("%lld", &a[i]); }
  for (int i = 1; i <= m; ++i) { scanf("%lld %lld", &b[i].r, &b[i].w); }
  std::sort(b + 1, b + m + 1, cmp); // 輸入並排序
  ll minnum = 1, j = 1; // 檢索最小值，j是搜索坐標
  for (ll i = 1; i <= m; ++i) {
  	for (; j <= b[i].r; ++j) { if (a[j] < a[minnum]) minnum = j; }
  	a[minnum] -= b[i].w; // WA
  }
  std::sort(a + 1, a + n + 1);
  for (int i = 1; i <= n; ++i) printf("%lld ", (a[i] += a[i - 1]));
  printf("\n");
  ```

##### [VJwin3B - Rental Service S](https://www.luogu.com.cn/problem/P4181) - UPSOLVE

- **題意** 給出一些牛，可以將租出獲得收益，每個人只能租一頭牛，租金已經給出，也可以賣牛奶給商鋪獲得收益，每個商鋪有最大購買量，單價已經給出，問這個收益的最大值。

- **思路** 把產量少的租出，且租給出價高的，剩下產量高的賣出，賣給單價高的商鋪。

- **代碼（二分方法）** 主函數：

  ```cpp
  // 輸入、排序（倒序）略
  for (ll i = 1; i <= n; ++i) { sa[i] = sa[i - 1] + a[i]; }
  for (ll i = 1; i <= m; ++i) { sb[i] = sb[i - 1] + b[i].a; } // 前i個商鋪所需容量總和
  for (ll i = 1; i <= m; ++i) { sbb[i] = sbb[i - 1] + b[i].a * b[i].p; } // 恰好滿足前i個商鋪可獲得的收益
  for (ll i = 1; i <= r; ++i) { sc[i] = sc[i - 1] + c[i]; }
  ll ans = 0;
  for (int i = max(0, n - m); i <= min(r, n); ++i)
  	ans = max(ans, sell(n - i) + rent(i));
  printf("%lld\n", ans);
  ```

  計算函數：

  ```cpp
  inline ll sell(ll t) {
  	ll p = std::lower_bound(sb + 1, sb + m + 1, sa[t]) - sb;
  	return sbb[p - 1] + (sa[t] - sb[p - 1]) * b[p].p;
  }
  inline ll rent(ll t) {
  	return sc[t];
  }
  ```

  **代碼（暴力方法）**

  ```cpp
  ll ans = 0;
  int mj = 1;
  for (int i = 1; i <= n; ++i) {
  	ll eachsell = 0;
  	ll left = a[i];
  	while (left >= b[mj].a && mj <= m) {
  		eachsell += b[mj].a * b[mj].p;
  		left -= b[mj].a;
  		++mj;
  	}
  	eachsell += left * b[mj].p;
  	b[mj].a -= left;
  	sumsell[i] = sumsell[i - 1] + eachsell;
  	ans = max(ans, sumsell[i] + sc[n - i]);
  }
  printf"%lld\n", ans);
  ```


##### [VJwin3A - 删数问题 A](https://www.luogu.com.cn/problem/P1106) - UPSOLVE

- **題意** 刪除指定位數的數，使剩下的數儘可能小，刪除後首位允許是 `0`。

- **思路** 如果前一位比後一位大，那麼刪除前一位，有一種特例是，每一位都比後一位小，這樣就刪除最後一位最大的數。

- **代碼** 

  ```cpp
  while (k--) {
  	bool flag = 0;
  	for (int j = 0; j < n - 1; ++j) {
  		if (s[j] > s[j + 1]) {
  			for (int i = j; i < n - 1; ++i) { s[i] = s[i + 1]; } s.pop_back();
  			--n;
  			flag = 1;
  			break;
  		}
  	}
  	if (!flag) s.pop_back();
  }
  ```

##### VJwin3A - 删数问题 B

- **題意** 刪除指定位數的數，使剩下的數儘可能小，刪除後首位不允許是 `0`。

- **代碼** 

  ```cpp
  char ans[1000];
  for (int j = 0; j < n - k; ++j) {
      min = '9'+1;
      for (int i = l; i < r; ++i) {
          if (min > s[i] && (j || s[i])) {
              min = s[i];
              l = i + 1;
          }
      }
      ans[j] = min;
      ++r;
  }
  ```

##### [VJwin3J - 巧克力](https://www.luogu.com.cn/problem/P3173) - UPSOLVE

- **題意** 給巧克力切塊，橫豎每切一刀，皆有代價，求代價最小值。

- **思路** 首先這是貪心題，其次是數學題，但是我既沒有用貪心，也沒有用數學知識解、、、

  貪心：只看當前步驟的代價，且無需關注 

  簡單給出證明：對於同一列或同一行的兩次操作，顯然是代價大的先切。

  下面看不同行列的情形，設這一列的代價爲 $$c$$，行的代價是 $$r$$，已經切了 $$\mathrm{cnt}_c$$ 列，$$\mathrm{cnt}_r$$ 行。

  如果先切列，代價是 $$S_1=c(\mathrm{cnt}_r+1)+r(\mathrm{cnt}_c+2)$$，否則如果先切行，代價是 $$S_2=r(\mathrm{cnt}_c+1)+c(\mathrm{cnt}_r+2)$$。有 $$S_1-S_2=r-c$$，$$S_1<S_2\iff r<c$$。那麼需要代價更小，依舊是誰小切誰，而與 $$\rm cnt$$ 無關。

- **代碼** 爲了判斷方便定義一個結構體，把行列混在一起：

  ```cpp
  struct P { int n; int cv; } e[maxN];
  bool cmp(P a, P b) { return a.n > b.n; }
  ```

  主函數是：

  ```cpp
  scanf("%d %d", &n, &m); --n, --m;
  for (int i = 0; i < n; ++i) { scanf("%d", &e[i].n); e[i].cv = 0; }
  for (int i = n; i < n + m; ++i) { scanf("%d", &e[i].n); e[i].cv = 1; }
  std::sort(e, e + n + m, cmp);
  ll ans = 0, cntc = 1, cntr = 1;
  for (int i = 0; i < n + m; ++i) {
  	if (e[i].cv) { ans += e[i].n * cntc; ++cntr; }
      else { ans += e[i].n * cntr; ++cntc; }
  }
  printf("%d\n", ans);
  ```

- **評註** 有個等價的做法：

  ```cpp
  for (int i = 0; i < n; ++i) ans += a[i];
  for (int i = 0; i < m; ++i) ans += b[i];
  for (int i = 0; i < n; ++i) {
  	for (int j = 0; j < m; ++j)
  		ans += min(a[i], b[j]);
  }
  ```

#### VJwin4-Training Round#4-Exercise2

##### [VJwin4B - Valued Keys](https://codeforces.com/problemset/problem/801/B)

- **題意** 字符串滿足若 $$\min(a_i,b_i)=c_i$$，給出 $$a,c$$，問 $$b$$ 是否存在。

- **代碼** 

  ```cpp
  std::cin >> a >> c;
  for (int i = 0; i < a.size(); ++i) {
  	if (a[i] < c[i]) { std::cout << "-1\n"; return; }
  }
  std::cout << c << std::endl;
  ```

##### [VJwin4C - Maxmina](https://codeforces.com/problemset/problem/1746/A)

- **題意** 給出 `01`串，可以將相鄰兩個數以它們的最小值替代，也可以將 $$k$$ 個數以它們的最大值替代，問能否變爲 `{1}`。

- **思路** 如果有 `1`，那麼一定是可行的，與 $$k$$ 無關。具體的方案是，將多餘的 `0` 用操作一消去，最終留下 $$k$$ 個數，用操作二。

- **代碼** 

  ```cpp
  bool flag = 0;
  scanf("%d%d", &n, &k);
  while (n--) {
  	scanf("%d", &x);
  	if (x == 1) flag = 1;
  }
  printf("%s\n", flag ? "YES" : "NO");
  ```


##### [VJwin4D - Best Permutation](https://codeforces.com/problemset/problem/1728/B)

- **題意** 規定一個數列的求和方法，從前向後遍歷，若這一項大於前一項，按常規方式求和，否則將和清零。在 `1` 到 `n` 的全排列中找出和的最大值。

- **思路** 倒着推導，最後一個數最大只能是 `n`，那麼前面的和最多只能取 `n-1`，和即是 `2n-1`，再給出構造：
  $$
  \begin{array}{ll}
  \text{If }n=2k: & 2k-2,~ 2k-3,~ \dots,~ 3,~ 2,~  1,~  2k-1,~  2k \\
  \text{If }n=2k+1: & 1,~ 2k-1,~  2k-2,~ 2k-3,~ \dots,~ 3,~  2,~  2k,~  2k+1
  \end{array}
  $$
  
- $$\bold{WA}$$ 奇數時草率地構造爲 $$1,~ 2,~ 3,~ \dots,~ 2k,~  2k+1$$。

##### [VJwin4E - Rebellion](https://codeforces.com/problemset/problem/1746/B)

- **題意** 給出 `01` 串，可以將任意一個數加到另外一個數上去（可以大於 `1`），並將原數刪除，求最小操作次數使數列不降。

- **思路** 將最前面的 `1` 加到最後面的 `0` 上，消消樂。維護雙指針，一個從前向後找 `1`，另一個從後向前找 `1`。

- **代碼** 

  ```cpp
  int l = 1, r = n, cnt = 0;
  while (1) {
  	while (!a[l]) ++l;
  	while (a[r]) --r;
  	if (l < r) ++l, --r, ++cnt;
  	else break;
  }
  printf("%d\n", cnt);
  ```

##### [VJwin4F - Valerii Against Everyone](https://codeforces.com/problemset/problem/1438/B)

- **題意** 給出由二的冪次組成的數組，問是否有兩個連續子列的和相同。

- **思路** 考慮二進制，這個數組中至少有兩個相同的數，否則無法進位。

- **代碼** 

  ```cpp
  bool flag = 0;
  for (int i = 0; i < n; ++i) { scanf("%d", &a[i]); }
  std::sort(a, a + n);
  for (int i = 1; i < n; ++i) {
  	if (a[i] == a[i - 1]) flag = 1;
  }
  printf("%s\n", flag ? "Yes" : "No");
  ```

##### [VJwin4G - To begin or not to begin](https://acm.hdu.edu.cn/showproblem.php?pid=5978)

- **題意** 雙人遊戲，輪流摸牌，只有一張能獲勝，決定是否是先手。

- **思路** 奇數時先手，因爲模的牌的總數多，偶數時沒有影響。

- **代碼**

  ```cpp
  scanf("%d", &n);
  printf("%d\n", !(n & 1));
  ```

##### [VJwin4H - Zhuge Liang's Password](https://acm.hdu.edu.cn/showproblem.php?pid=4772)

- **題意** 給出一個矩陣，可無限制順時針旋轉，和另矩陣至多有多少相同元素。

- **思路** 模擬。

- **代碼**

  ```cpp
  int cnt[4] = { 0 };
  for (int i = 0; i < n; ++i) for (int j = 0; j < n; ++j) scanf("%d", &a[i][j]);
  for (int i = 0; i < n; ++i) for (int j = 0; j < n; ++j) {
  	scanf("%d", &b[i][j]);
  	if (a[i][j] == b[i][j]) ++cnt[0];
  	if (a[j][n - 1 - i] == b[i][j]) ++cnt[1];
  	if (a[n - 1 - i][n - 1 - j] == b[i][j]) ++cnt[2];
  	if (a[n - 1 - j][i] == b[i][j]) ++cnt[3];
  }
  printf("%lld\n", max(cnt[0], cnt[1], cnt[2], cnt[3]));
  ```

##### [VJwin4I - AquaMoon and Two Arrays](https://codeforces.com/problemset/problem/1546/A)

- **題意** 給出一個數組，可選擇兩個元素，一個 `+1`，另一個 `-1`，能否變爲另一個數組。

- **思路** 兩個數組元素之和相同即可實現。具體操作是，搜索需要增大的數，記錄序號，再搜索需要減小的數，記錄序號，將兩者併起來輸出。

- **代碼**

  ```cpp
  std::stack<int> p, m;
  for (int i = 1; i <= n; ++i) {
  	while (b[i] > a[i]) { p.push(i); --b[i]; }
  	while (b[i] < a[i]) { m.push(i); ++b[i]; }
  }
  if (p.size() != m.size()) printf("%d\n", -1);
  else {
  	printf("%d\n", p.size());
  	while (!p.empty()) {
  		printf("%d %d\n", m.top(), p.top());
  		m.pop(), p.pop();
  	}
  }
  ```

##### [VJwin4J - Discounts](https://codeforces.com/problemset/problem/1132/B)

- **題意** 優惠券可以購買 $$m$$ 件商品但只付最貴的 $$m-1$$ 的錢，求最小價格。

- **思路** 對最貴的 $$m$$ 件商品用優惠券。

- **代碼** 

  ```cpp
  ll s = 0;
  scanf("%d", &n);
  for (int i = 0; i < n; ++i) { scanf("%d", &a[i]); s += a[i]; }
  std::sort(a, a + n);
  scanf("%d", &m);
  printf("%lld\n", s - a[n - m]);
  ```

##### [VJwin4K - Chocolate](https://codeforces.com/problemset/problem/617/B)

- **題意** 給出 `01` 串，求將其劃分爲若干只包含一個 `1` 的子列的方法數。

- **思路** 數兩個 `1` 中間 `0` 的個數。

- **代碼**

  ```cpp
  ll cnt = 0, ans = 1;
  for (int i = 0; i < n; ++i) {
      scanf("%d", &x);
      if (cnt && x) ans *= cnt;
      if (x) cnt = 1; 
      if (cnt && !x) ++cnt;
  }
  printf("%lld", cnt == 0 ? 0 : ans);
  ```


##### [VJwin4L - Erase First or Second Letter](https://codeforces.com/problemset/problem/1917/B)

- **万氏引理** 

  - 給定數列 $$\{s_n\}$$。

    規定 $$\{s_n\}$$ 中前 $$i$$ 項中不同的數的個數構成數列 $$\{c_n\}~~(0\le i\le n)$$，具體地說，$$c_1=1$$，當 $$i>1$$ 時，如果 $$s_i\ne s_{i-1},s_i\ne s_{i-2},\dots s_i\ne s_{0}$$，那麼 $$c_i=c_{i-1}+1$$，否則  $$c_i=c_{i-1}$$。

    另有數列 $$\{j_n\}$$ 定義如下：$$j_1=1$$，當 $$i>1$$ 時，如果 $$s_i\ne s_{i-1}$$ 且 $$j_{i-1}<c_n$$，那麼 $$j_i=j_{i-1}+1$$，否則  $$j_i=j_{i-1}$$。

    則有 $$\displaystyle\sum_{i=1}^{n}{c_i}=\sum_{i=1}^{n}{j_i}$$。

  - **反例** $$s_n=\{1,2,2,3,3,2,4,2,3\}$$，則 $$c_n=\{1,2,2,3,3,3,4,4,4\}$$， $$c_n=\{1,2,2,3,3,4,4,4,4\}$$。

- **題意** 給定字符串，每次可以刪第一個數或第二個數，求最終有多少種情形。

- **思路** 剩餘 $$n$$ 個數時，後面 $$n-1$$ 位是確定的，而第一個數就是字符串前面幾位的種類數。

- **代碼**

  ```cpp
  ll cnt = 0, ans = 0;
  bool a[100] = { 0 };
  for (scanf("%d\n", &n), int i = 0; i < n; ++i) {
  	scanf("%c", &c);
  	if (!a[c]) { a[c] = 1; ++cnt; }
  	ans += cnt;
  }
  printf("%lld\n", ans);
  ```










#### VJwin5-Training Round#5-DP

##### [VJwin5A - 最長上升子序列](https://www.luogu.com.cn/problem/B3637)

- 方法一

  ```cpp
  int ans = 0;
  for (int i = 0; i < n; ++i) {
  	dp[i] = 1;
  	for (int j = 0; j < i; ++j) {
  		if (a[j] < a[i]) dp[i] = max(dp[i], dp[j] + 1);
  	}
  	ans = max(ans, dp[i]);
  }
  printf("%d\n", ans);
  ```

- 方法二

  ```cpp
  int len = 0;
  for (int i = 0; i < n; ++i) {
  	if (dp[len] < a[i]) dp[++len] = a[i];
  	else *std::lower_bound(dp + 1, dp + len + 1, a[i]) = a[i];
  }
  printf("%d\n", len);
  ```

###### 變式一 - [VJwin5C - 導彈攔截](https://www.luogu.com.cn/problem/P1020)

- **題意** 將數列連續劃分爲不上升的子序列，求子序列最小個數。
- **思路** 由 $$\rm Dilworth$$ 定理（對于一個偏序集，最少鏈劃分等于最長反鏈長度），要求 **不上升的子序列的最小個數**，只需要反過來求 **最長上升子序列的長度**。

###### 變式一的變式 - [VJwin5B - 木棍加工](https://www.luogu.com.cn/problem/P1233)

- **題意** 將二維數列亂序劃分爲兩個元甲、乙都不上升的子序列，求子序列最小個數。如 `(4,9),(5,2),(2,1),(3,5),(1,4)` 答案是 `2`，劃分方式是 `(4,9),(3,5),(1,4)||(5,2),(2,1)`。
- **思路** 我們希望仿照上一題的方法找出最長上升子序列的長度，但是，誰上升？嘗試甲或乙上升，但很快舉出反例：`(1,4),(2,1),(3,5),(5,2),(4,9)`，這樣答案是 `5`，不行；而甲與乙更不行…… 我們用 **化歸** 的思想，固定一個變量，考慮另一個。將乙元素降序排列，一定符合要求，那麼乙就是無關變量了，只看甲即可。
- **注意** 乙相同時需要把甲也按降序排列，保證符合條件的子序列儘可能長。$$\rm Hack$$ 數據：`(1,2),(2,2),(2,1)`，不按甲排序答案是 `2`，但正確答案是 `1`。

###### 變式二 - [VJwin5D - 合唱队形](https://www.luogu.com.cn/problem/P1091)

- **題意** 最長中間高兩邊遞減子序列的長度。
- **思路** 求每個數的以它爲結尾的最長上升子序列和以它爲開頭的最長下降子序列的和的最大值。

##### [VJwin5G - 最大正方形](https://www.luogu.com.cn/problem/P1387)（未完）

- **題意** 在 `01` 陣中找只包含 `1` 的最大正方形。
- **思路** 以 `dp[i][j]` 表示以 `a[i][j]` 爲右下角可構成的最大正方形的邊長，狀態轉移方程 `if(a[i][j]==1) dp[i][j] = min(dp[i][j-1],dp[i-1][j],dp[i-1][j-1])+1;`。

##### [VJwin5E - Number Triangles](https://www.luogu.com.cn/problem/P1216)

- **題意** 給出一個只有一個起點的無回路的有向圖，求路徑上數字之和的最大值。

- **思路**

  狀態：`dp[i][j]` 表示從枝到幹這條路上數字之和的最大值，`i` 是行數，`j` 是列數；

  狀轉方程 `dp[i][j] = max(dp[i+1][j], dp[i+1][j+1]) + a[i][j];`。

- **代碼**

  ```cpp
  // 輸入略
  ll ans = 0;
  for (int i = n; i >= 1; --i) for (int j = 1; j <= i; ++j) {
  	dp[i][j] = max(dp[i + 1][j], dp[i + 1][j + 1]) + a[i][j]; // 狀態轉移方程
  	ans = max(ans, dp[i][j]);
  }
  printf("%lld\n", ans);
  ```

##### [VJwin5F - 传球游戏](https://www.luogu.com.cn/problem/P1057)

- **題意** 傳球，每個人可以傳給相鄰兩個人，求最終傳給自己的方法數。

- **思路**

  狀態：`dp[i][j]` 表示第 `i` 次傳球到第 `j` 個人手裏的方法數；

  始態：`dp[0][0] = 1`，末態：`dp[m][0]`；

  狀轉方程：`dp[i][j] = dp[i-1][j-1] + dp[i-1][j+1]`。

  注意是環，需要對邊界特殊處理。

- **代碼**

  ```cpp
  scanf("%d %d", &n, &m); // 人數和次數
  dp[0][0] = 1;
  for (int i = 1; i <= m; i++) for (int j = 0; j < n; j++) {
  	dp[i][j] = dp[i - 1][j - 1 == -1 ? n - 1 : j - 1] + dp[i - 1][(j + 1 == n) ? 0 : j + 1];
  }
  printf("%lld\n", dp[m][0]);
  ```

##### [VJwin5I - 线段](https://www.luogu.com.cn/problem/P3842)

- **題意** 每行有一條線段，可以選擇在任意一點向下一行，求從 $$(1,1)$$ 到 $$(n,n)$$ 途徑所有線段的最小步數。

- **思路** 

  狀態：`dpl[i]` 表示第 `i` 行到達左端點的最小步數，`dpr[i]` 表示到達右端點；

  末態：`min(dpl[n+1], dpr[n+1])`，這裏寫爲 `n+1` 是補充定義了第 `0` 行和第 `n+1` 行的長度爲 `0` 的線段，以保證起始點和終止點；

  狀轉方程：`dpl[i] = min(dpl[i-1]+r[i]-l[i]+abs(l[i-1]-r[i]), dpr[i-1]+r[i]-l[i]+abs(r[i-1]-r[i])); 
  dpr[i] = min(dpl[i-1]+r[i]-l[i]+abs(l[i-1]-l[i]), dpr[i-1]+r[i]-l[i]+abs(r[i-1]-l[i]))`。

- **代碼**

  ```cpp
  scanf("%d", &n);
  for (int i = 1; i <= n; ++i) scanf("%d %d", &l[i], &r[i]);
  l[0] = r[0] = 1, l[n + 1] = r[n + 1] = n;
  for (int i = 1; i <= n + 1; ++i) {
  	dpl[i] = min(dpl[i - 1] + r[i] - l[i] + abs(l[i - 1] - r[i]), dpr[i - 1] + r[i] - l[i] + abs(r[i - 1] - r[i]));
  	dpr[i] = min(dpl[i - 1] + r[i] - l[i] + abs(l[i - 1] - l[i]), dpr[i - 1] + r[i] - l[i] + abs(r[i - 1] - l[i]));
  }
  printf("%lld", min(dpl[n + 1], dpr[n + 1]) + n - 1);
  ```

##### [VJwin5H - 尼克的任务](https://www.luogu.com.cn/problem/P1280) - UPSOLVE

- **題意** 每一時刻如果空閒且有任務就必須去做，求最大空閒時間。

- **思路** 

  狀態：`dp[i]` 表示第 `i` 時刻之前的總空閒時間；

  狀轉方程：每一時刻的空閒時間是和選擇的任務的持續時間有關，寫不出來。

  倒着想

  狀態：`dp[i]` 表示第 `i` 時刻之後的總空閒時間；

  末態：`dp[0]`；

  狀轉方程：如果這一時刻沒有任務，顯然 `dp[i] = dp[i+1]+1`，否則如果有任務，判斷 `dp[i] = max(dp[i], dp[i+任務1持續時間], dp[i+任務2持續時間], ...)`。

- **代碼**

  ```cpp
  scanf("%d %d", &n, &k);
  for (int i = 0; i < k; ++i) {
  	scanf("%d %d", &a[i].l, &a[i].r);
  	cnt[a[i].l]++; // 用於記錄每一時刻的任務數量
  }
  std::sort(a, a + k, cmp); // 按起始時間倒序排列，便於遍歷（也可以存入新數組
  int pos = 0; // 用於遍歷每個任務
  for (int i = n; i >= 1; --i) {
  	if (!cnt[i]) dp[i] = dp[i + 1] + 1; // 沒有任務
  	else for (int j = 1; j <= cnt[i]; ++j)
  		dp[i] = max(dp[i], dp[i + a[pos++].r]);
  }
  printf("%lld\n", dp[1]);
  ```


##### [VJwin5K - 乌龟棋](https://www.luogu.com.cn/problem/P1541) - UPSOLVE

- **題意** 給出一些卡牌，爲行進步長，求到達終點經過的點的數值之和的最大值。

- **思路**

  狀態：`dp[i][j][k][l]` 表示四張卡牌已使用張數；

  始態：`dp[0][0][0][0] = a[0]`，末態：`dp[c[1]][c[2]][c[3]][c[4]]`；

  狀轉方程：`dp[i][j][k][l] = max(dp[i-1][j][k][l], dp[i][j-1][k][l], dp[i][j][k-1][l]+, dp[i][j][k][l-1]) + a[now]`。

- **代碼** 

  ```cpp
  int n, m; scanf("%d %d", &n, &m);
  for (int i = 0; i < n; ++i) scanf("%d", &a[i]);
  int x; while (m--) { scanf("%d", &x); ++c[x]; }
  dp[0][0][0][0] = a[0];
  for (int i = 0; i <= c[1]; ++i) for (int j = 0; j <= c[2]; ++j) for (int k = 0; k <= c[3]; ++k) for (int l = 0; l <= c[4]; ++l) {
  	int now = i + j * 2 + k * 3 + l * 4;
  	if (i) dp[i][j][k][l] = max(dp[i][j][k][l], dp[i-1][j][k][l]+a[now]);
  	if (j) dp[i][j][k][l] = max(dp[i][j][k][l], dp[i][j-1][k][l]+a[now]);
  	if (k) dp[i][j][k][l] = max(dp[i][j][k][l], dp[i][j][k-1][l]+a[now]);
  	if (l) dp[i][j][k][l] = max(dp[i][j][k][l], dp[i][j][k][l-1]+a[now]);
  }
  printf("%d\n", dp[c[1]][c[2]][c[3]][c[4]]);
  ```

##### [VJwin5J - 摆花](https://www.luogu.com.cn/problem/P1077) - UPSOLVE

- **题意** 給定 $$(a_1,a_2,...,a_n)$$，求 $$(c_1,c_2,...,c_n)$$ 的對數，其中 $0\leqslant c_i\leqslant a_i$，且 $\sum\limits_{i=1}^nc_i = m$。

- **思路一	搜索**

  从 $$1$$ 到 $n$ 考虑每个 $c_i$ 的值，和当前前 $i$ 个数的总和 `sum`，然后枚举当前 $c_i$ 所有可能的值，再递归求解。

  ```cpp
  int dfs(int pos, int sum) {
      if (sum > m) return 0;		// 總和超過了m，不合題意
      if (sum == m) return 1;		// 合乎題意，增加一種情形
      if (pos > n) return 0;		// 訪問c_{n+1}，超過了下標界限，不合題意
      int ans = 0;
      for (int i = 0; i <= a[pos]; ++i) ans = (ans + dfs(pos+1, sum+i)) % MOD;
      return ans;
  }
  ```

  所求即是 `dfs(1,0)`。時間複雜度 $\Theta(\prod\limits_{i=1}^na_i)$，超時。

-  **思路二	記憶化搜索**

  ```cpp
  int dfs(int pos, int sum) {
      if (sum > m) return 0;
    	if (sum == m) return 1;
      if (pos > n) return 0;
      if (vis[pos][sum]) return vis[pos][sum]; // 搜過了就返回
      int ans = 0;
      for (int i = 0; i <= a[pos]; ++i) ans = (ans + dfs(pos+1, sum+i)) % MOD;
      return vis[pos][sum] = ans; // 記錄當前狀態的結果
  }
  ```
  
  時間複雜度 $$\Theta(nma_i)$$，100%的数据稳过，但是搜索的时间有些不稳定。
  
-  **思路三	動態規劃**
  
  > ***記憶化搜索都可以轉成動態規劃，但是動態規劃卻不一定能轉成記憶化搜索。***
  
  狀態 $f(i, j)$ 表示前 $i$ 個數總和爲 $j$ 的方案數，則狀轉方程 $$f(i, j) = \sum\limits_{k=0}^{a_{i}}f(i-1,j-k)$$，其中，$k$ 是枚舉當前第 $i$ 個數的取值。
  
  ```cpp
  int f[maxN][maxN];
  f[0][0] = 1;
  for (int i = 1; i <= n; ++i)
  	for (int j = 0; j <= m; ++j)
  		for (int k = 0; k <= min(j, a[i]); ++k)
  			f[i][j] = (f[i][j] + f[i-1][j-k]) % MOD;
  ```
  
  所求即是 `f[n][m]`。時間複雜度 $$\Theta(nma_i)$$，空間複雜度 $$\Theta(nm)$$。
  
-  **思路四	滾動數組** *（動態規劃優化法寶）*
  
  注意到，狀轉方程中，當前狀態 $f(i, j)$ 只與上一個狀態 $f(i-1, j)$ 有關，而與 $i-2,i-3\dots$ 無關。使用滾動數組優化。
  
  > ***滾動數組**：**只保留兩個狀態**，即當前狀態和前一個狀態，計算當前狀態後，将當前狀態變爲前一個狀態，再去算下一个狀態，看上去就像二維數組的兩層不斷地 **迭代**。*
  
  ```cpp
  int f[2][maxN], t;
  f[0][0] = 1;
  for (int i = 1; i <= n; ++i) {
  	t = 1 - t; // 滾動 0101
  	for (int j = 0; j <= m; ++j) {
  		f[t][j] = 0; // 清空（初始化）
  		for (int k = 0; k <= min(j, a[i]); ++k) {
  			f[t][j] = (f[t][j] + f[1-t][j-k]) % MOD;
          }
  	}
  }
  ```
  
  所求即是 `f[n][m]`。時間複雜度 $$\Theta(nma_i)$$，空間複雜度 $$\Theta(m)$$。
  
-   **思路五	一維動態規劃（01背包）**
  
  ```cpp
  int f[maxn];
  f[0] = 1;
  for (int i = 1; i <= n; ++i)
  	for (int j = m; j >= 0; --j)
  		for (int k = 1; k <= min(a[i], j); ++k)
  			f[j] = (f[j] + f[j-k]) % MOD;
  ```
  
  所求即是 `f[m]`。時間複雜度 $$\Theta(nma_i)$$。
  
-   **思路六	前缀和优化背包**
  
  继续观察方法五的代码，时间复杂度是$\Theta(n^3)$级别的。与背包有一些差别的是这一句：
  
  ```cpp
  for (int k = 1; k <= min(a[i], j); ++k)
  	f[j] = (f[j] + f[j-k]) % MOD;
  ```
  
  然而，这一句的作用只不过是将连续的一段 `f[j-a[i]]` 到 `f[j-1]` 累加起来而已。因此，可以用前缀和将这个操作优化（众所周知，前缀和的作用就是 $\Theta(1)$ 求一段区间的和）。
  
  时间复杂度：$\Theta(nm)$
  
  顺便卡到了次优解。
  
  ```cpp
  int f[maxN], sum[maxN];
  f[0] = 1;
  for (int i = 0; i <= m; ++i) sum[i] = 1;
  for (int i = 1; i <= n; ++i) {
  	for (int j = m; j >= 1; --j)
          f[j] = (f[j] + sum[j-1] - sum[j - min(a[i], j) - 1] + MOD) % MOD;
  	for (int j = 1; j <= m; ++j)
          sum[j] = (sum[j-1] + f[j]) % MOD;
  }
  ```
  
  提示：上面的程序在计算$f[j]$的时候有可能会出现数组越界的情况，但为了代码美观容易理解，没有特判。这一点需要注意，考场上不慎就会抱灵。
  
  下面是加上了特判的代码：
  
  ```cpp
  int f[maxN], sum[maxN];
  f[0] = 1;
  for (int i = 0; i <= m; ++i) sum[i] = 1;
  for (int i = 1; i <= n; ++i) {
  	for (int j = m; j >= 1; --j)
          int t = j - min(a[i], j) - 1;
          if (t < 0) f[j] = (f[j] + sum[j-1]) % MOD;
          else f[j] = (f[j] + sum[j-1] - sum[t] + MOD) % MOD;
      }
      for(int j = 1; j <= m; ++j) sum[j] = (sum[j-1] + f[j]) % MOD;
  }
  ```
  
-   **思路七	生成函数**
  
  回到开头，我们需要求的是这样一个式子：$$\sum\limits_{c_k=0}^{a_k}\left[\sum\limits_{i=1}^nc_i=m\right ] ,k=\{1,2,...,n-1,n\}$$
  
  于是我们可以构造这样一个生成函数：$$ g(x)=(1+x^1+x^2+\cdots+x^{a_1})(1+x^1+x^2+\cdots+x^{a_2})\cdots(1+x^1+x^2+\cdots+x^{a_n}) $$ 即，$$ g(x)=\prod\limits_{i=1}^n\sum_{j=0}^{a_i}x^j $$
  
  最后所得的多项式中，$x^m$ 项的系数即为答案。可以做 $n$ 次NTT得到答案。假设$a_i$ 的值域是$k$ ，那么，时间复杂度：$\Theta(n^2k\log nk)$
  
  实际上，$m$最大可以取到$nk$。因此如果用$k$来表示，前缀和优化后的复杂度应当是：$\Theta(n^2k)$
  
  NTT的局限在于要做$n$次。其实只需要取$\ln$就能将多项乘法转化为多项式加法，具体参考[付公主的背包](https://www.luogu.com.cn/problem/P4389)。
  
  时间复杂度降到了$\Theta(nk\log nk)$，即 $\Theta(m\log m)$
  
  也可以将其写成封闭形式，参考[[CEOI2004\] Sweets](https://www.luogu.com.cn/problem/P6078)。

  等比数列求和，得到：$$ g(x)=\dfrac{\prod_{i=1}^n(1-x^{a_i})}{(1-x)^n} $$ 在 $n$ 较小，$m$ 很大的时候，可以考虑将 $\prod_{i=1}^n(1-x^{a_i})$ 暴力展开，对于 $(1-x)^{-n}$ 使用牛顿二项式定理。即，$$ (1-x)^{-n}=\sum_{i\ge0}\binom {n+i-1}{i}x^i $$ 枚举前一个式子 $x$ 的幂次，假设为 $k$，设 $x^k$ 项的系数为 $c_k$，那么，$$ {\rm {ANS}}=\sum _{k=0}^m c_k\cdot\binom {n+m-k-1}{m-k} $$ 时间复杂度：$\Theta(2^n+m)$。

-  **評註**	总的来说，这道题适合搜索/动态规划的初学者练习。这道题的价值在于，它既可以从简单的动态规划开始，一路优化，也可以从生成函数的视角观察，继续优化。这两条道路，竟是殊途同归。或许，这也是数学的魅力吧。











#### VJwin6-Training Round#6_GCD

##### [VJwin6A - 3G网络][https://codeforces.com/gym/103389/problem/G]

- **題意** 記 $$n$$ 個點的坐標分別爲 $$(x_1,y_1),(x_2,y_2),\ldots,(x_n, y_n)$$，定義 $$C_{i,r} = \{(x,y) \in \mathbb{R}^2 \mid (x-x_i)^2+(y-y_i)^2 \le r^2\}$$ ，求 $$\displaystyle\lim_{r \rightarrow +\infty}f(r) = \lim_{r \rightarrow +\infty}\frac{S(C_{1,r} \cup C_{2,r} \cup \ldots \cup C_{n,r})}{S(C_{1,r})+S(C_{2,r})+\ldots+S(C_{n,r})}$$，其中 $$S(X)$$ 表示平面點集 $$X$$ 的面積。
- **思路** 計算得 $$\displaystyle\frac1n$$。
- $$\bold{RE}$$ 除了輸入 $$n$$ 以外還有其它數據也要輸入，沒寫 `&`。

##### [VJwin6B - gcd.](https://www.luogu.com.cn/problem/P8443)

- **題意** 求 $$\displaystyle\gcd(\lfloor \frac{l}{x}\rfloor,\lfloor \frac{l+1}{x}\rfloor,\cdots,\lfloor \frac{r}{x}\rfloor)$$。

- **思路** 逐項算…… 然後 $$\bold{TLE}$$……

  優化，只需算 $$\displaystyle\gcd(\lfloor \frac{l}{x}\rfloor,\lfloor \frac{l}{x}\rfloor+1,\cdots,\lfloor \frac{r}{x}\rfloor)$$，項數減少了很多，但依然 $$\bold{TLE}$$……

  繼續優化，如果算到某個 $$\gcd=1$$，就跳出，這樣 $$\rm AC$$ 了。

- **評註** 事實上除非 $$\displaystyle\lfloor \frac{l}{x}\rfloor=\lfloor \frac{r}{x}\rfloor$$，結果都是 $$1$$，因爲相鄰兩個自然數的 $$\gcd=1$$，這也是沒有 $$\rm TLE$$ 的原因。

- **代碼** 

  ```cpp
  scanf("%lld %lld %lld", &l, &r, &x);
  l /= x; r /= x;
  printf("%lld\n", l == r ? l : 1);
  ```

##### [VJwin6C - GCD LCM](https://onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=2383)

- **題意** 給出 $$\gcd(a,b)$$ 和 $$\rm lcm(a,b)$$，找出一組 $$(a,b)$$。
- **思路** 如果 $$\gcd(a,b)\nmid\rm lcm(a,b)$$，那麼 $$(a,b)$$ 不存在，如果存在，取這兩個數本身，即 $$a=\gcd(a,b),~b={\rm lcm}(a,b)$$ 即可。

##### [VJwin6D - 又见GCD](https://acm.hdu.edu.cn/showproblem.php?pid=2504)（素數篩）

- **題意** 已知 $$a,~b$$，數 $$c$$ 滿足 $$\gcd(a,c)=b$$ 且 $$c\ne b$$，求 $$c$$ 的最小值。

- **思路** 記 $$a_0=\frac{a}{b},~c_0=\frac{c}{b}$$，則 $$\gcd(a_0,c_0)=1$$，對 $$a_0$$ 作惟一分解 $$a_0=\prod p_i^{\alpha_i}$$，取最小的滿足 $$p_0\nmid a$$ 的 $$p_0$$，則 $$c=bp_0$$ 是所求的最小值。其中求 $$p_0$$ 可藉助素數篩。

- **代碼**

  ```cpp
  const ll maxN = 1e6 + 7;
  bool isntPrime[maxN], isFactor[maxN];
  int prime[maxN];
  int cntPrime = 0;
  void doPrime() {
  	for (int i = 2; i <= maxN; ++i) {
  		if (!isntPrime[i]) {
  			prime[cntPrime++] = i;
  		}
  		for (int j = 0; j < cntPrime; ++j) {
  			int p = prime[j];
  			if (p * i > maxN) break;
  			isntPrime[p * i] = true;
  			if (i % p == 0) break;
  		}
  	}
  	isntPrime[1] = true;
  }
  
  void eachT() {
  	ll a, c;
  	memset(isFactor, 0, sizeof isFactor);
  	scanf("%lld %lld", &a, &c);
  	a /= c;
  	for (ll i = 2; i <= a; i++) {
  		if (a % i == 0) isFactor[i] = true;
  		while (a % i == 0) a /= i;
  	}
  	for (ll i = 2; i <= maxN; i++) {
  		if (!isntPrime[i] && !isFactor[i]) {
  			printf("%lld\n", c * i);
  			return;
  		}
  	}
  }
  ```

- **評註** 枚舉 $$c=bi,~i\geqslant2$$，直至 $$\gcd(a,c)=b$$ 即可。

- **代碼**

  ```cpp
  scanf("%d %d", &a, &c);
  b = 2 * c;
  while (gcd(a, b) != c) b += c;
  printf("%d\n", b);
  ```

##### [VJwin6E - GCD Arrays](https://codeforces.com/problemset/problem/1629/B)（思維）

- **題意** 一個由連續正整數組成的數列 $$A=\{l,~l+1,~\dots,~r\}$$，至多有 $$k$$ 次機會將兩個數以它們的乘機替代，能否使 $$\gcd A\ne1$$。

- **思路** 記數列的項數爲 $$n$$。

  當 $$n$$ 爲偶數時，一方面，$$A$$ 中不能有相鄰兩個自然數，故至少要操作 $$\frac{n}{2}$$ 次；另一方面，操作相鄰兩個奇數和偶數，共需 $$\frac{n}{2}$$ 次，此時 $$\gcd A=2$$。

  當 $$n$$ 爲奇數時，同樣地，至少操作 $$\frac{n-1}{2}$$ 次，若 $$l,r$$ 都是偶數，操作後全是偶數，此時 $$\gcd A=2$$，但若 $$l,r$$ 都是奇數，操作後至少留下一個奇數，$$\gcd A=1$$，需要再操作一次。

- **代碼** 

  ```cpp
  scanf("%lld %lld %lld", &l, &r, &k);
  bool judge;
  if (l == r) judge = !(l == 1);
  else {
  	ll n = r - l + 1;
  	if (n & 1 && l & 1) judge = (k >= n / 2 + 1);
  	else judge = (k >= n / 2);
  }
  printf("%s\n", judge ? "YES" : "NO")
  ```
  

##### [VJwin6F - Revenge of GCD][https://acm.hdu.edu.cn/showproblem.php?pid=5019]（枚舉約數）

- **題意** 求兩個數的第 $$k$$ 大公約數。

- **思路** 即是它們最大公約數的第 $$k$$ 大約數。枚舉所有約數，再排序即可。

- **代碼** 

  ```cpp
  ll n = gcd(a, b);
  std::vector<ll> res;
  for (ll i = 1; i * i <= n; ++i) {
  	if (n % i == 0) {
  		res.push_back(i);
  		if (i != n / i) res.push_back(n / i);
  	}
  }
  std::sort(res.begin(), res.end(), cmp);
  printf("%lld\n", k > res.size() ? -1 : res[k - 1]);
  ```

  不用向量也可寫爲
  
  ```cpp
  int cnt = 0;
  for (int i = 1; i <= n / i; i++) {
  	if (n % i == 0) {
  		a[cnt++] = i;
  		if (i != n / i) a[cnt++] = n / i;
  	}
  }
  std::sort(a, a + cnt);
  ```

##### [VJwin6G - GCD Table](https://codeforces.com/problemset/problem/582/A)

- **題意** 給出抹去表頭、內容亂順序排列的最大公約數表，還原表頭。

- **思路** 舉個栗子，

  ```cpp
  \ 2 3 3 6
  2 2 1 1 2
  3 1 3 3 3
  3 1 3 3 3
  6 2 3 3 6
  ```

  輸入的可能是這麼一串數（當然它是隨機排列的）：

  ```cpp
  1 1 1 1 2 2 2 3 3 3 3 3 3 3 3 6
  ```

  先用兩個數組把它存起來，即

  ```cpp
  num[]={1,2,3,6}; 						// 存數（排序後）
  mp[1]=4, mp[2]=3, mp[3]=8, mp[6]=1; 	// 記次數
  ```

  由於給的這一串數一定包含表頭本身，所以最大數和第二大的數都包含在其中（用反証法不難證明），本例中，`6` 和 `3` 一定是所求，記錄答案，而且這兩個數已經用過一次了，從 `mp[]` 數組中刪去，現在是

  ```cpp
  num[]={1,2,3,6};
  mp[1]=4, mp[2]=3, mp[3]=7, mp[6]=0;		// 刪去了一個3和一個6
  ans[]={6,3};
  ```

  既然找到了 `6` 和 `3`，那它們的最大公約數也可以從表中刪去，而且根據對稱性，刪兩個，現在是

  ```cpp
  num[]={1,2,3};
  mp[1]=4, mp[2]=3, mp[3]=5, mp[6]=0;		// 刪去了兩個gcd(3,6)=3
  ans[]={6,3};
  ```

  現在數組中的最大數是 `3` 了（`6` 的次數爲 `0`，就當它不存在了），所以這個 `3` 也是結果之一，再刪除它和已知兩個數的最大公約數，現在是

  ```cpp
  num[]={1,2};
  mp[1]=4, mp[2]=3, mp[3]=0, mp[6]=0;		// 刪去了3,兩個gcd(3,3)=3,兩個gcd(3,6)=3
  ans[]={6,3,3};
  ```

  進而，

  ```cpp
  num[]={};
  mp[1]=0, mp[2]=0, mp[3]=0, mp[6]=0;		// 刪去了2,兩個gcd(2,3)=1,兩個gcd(2,3)=1,兩個gcd(2,6)=2
  ans[]={6,3,3,2};
  ```

  至此，`num[]` 數組爲空，刪數完畢，結果便已經得到。

- **代碼** 

  ```cpp
  int n, x, incnt = 0, outcnt = 0;
  scanf("%d", &n);
  for (int i = 1; i <= n * n; ++i) {
  	scanf("%d", &x);
  	if (!mp[x]) num[++incnt] = x;			// 存數 num[]={2,1,3,6}
  	mp[x]++;								// 記次數 mp[1]=4, mp[2]=3, mp[3]=8, mp[6]=1
  }
  std::sort(num + 1, num + incnt + 1);		// num[]={1,2,3,6}
  while (incnt >= 1 && outcnt < n) {
  	while (!mp[num[incnt]]) incnt--;		// 防止空數據，如mp[4],mp[5]一槪跳過
  	ans[++outcnt] = num[incnt];				// 從最大開始記錄ans[1]=num[6]
  	--mp[num[incnt]];						// 刪掉這個最大值ans[1]
  	for (int j = 1; j < outcnt; ++j) {		// 現在有outcnt=1個已知的數
  		mp[gcd(num[incnt], ans[j])] -= 2;	// 刪掉与其它已知數的gcd，對稱性刪兩個
  	}
  }
  for (int i = 1; i <= outcnt; ++i) { printf("%lld ", ans[i]); }
  ```

  數據範圍較大，需要

  ```cpp
  #include <map>
  std::map<int, ll>mp; 	// 超綱了惹！std::map<序號,值> 名字
  ```

- **評註** 核心在於刪數的方法：最大的兩個數一定是所求，刪第一個數不用考慮附屬的刪誰，因爲這時可以確定第二個數，之後每次刪數時直接刪与其它已知數的 $$\gcd$$ 就行。









##### [VJwin6H - 阶乘之乘](https://www.luogu.com.cn/problem/P2388)（勒讓德定理）

- **題意** 求 $$M=1!\times 2!\times 3!\times 4!\times \cdots \times n!$$ 的末尾的 $$0$$ 的個數。

- **思路** 由於 $$M$$ 的標準分解中 $$2$$ 出現的次數一定多於 $$5$$，只需求由 $$5$$ 在 $$M$$ 中的指數。

  > **勒讓德定理**：在 $$n!$$ 階乘中素數 $$p$$ 的指數
  > $$
  > v_p(n!)=\displaystyle\sum\limits_{k=1}^{p^k\le n}\bigg\lfloor\dfrac{n}{p^k}\bigg \rfloor=\dfrac{n-S_p(n)}{p-1}.
  > $$
  > 其中，$$S_p(n)$$ 表示 $$n$$ 在 $$p$$ 進制下各個位數的和，熟知
  > $$
  > S_p(n)=
  > 
  > \begin{cases}
  > 
  > 1, & \text {if } n=1 \\
  > 
  > \displaystyle S_p\Big(\frac{n}{p}\Big), & \text {if } p\mid n \\
  > 
  > S_p(n-1)+1, & \text {otherwise}.
  > 
  > \end{cases}
  > $$

- **思路一** 利用勒讓德定理的第二個形式，打表計算 $$S_p(n)$$：

  ```cpp
  ll ans = 1;
  std::vector<ll> a;
  a.push_back(0ll); a.push_back(1ll);
  for (ll i = 2; i <= n; ++i) {
  	if (i % 5) a.push_back(a[i - 1] + 1);
  	else a.push_back(a[i / 5]);
  	ans += a[i];
  }
  ans = (n * (n + 1) / 2 - ans) / 4;
  printf("%lld\n", ans);
  ```
  
  喜提 $$\bold{MLE}$$，改成 `map` 報 $$\rm{TLE}$$…… `1e8` 的數據真的很難處理。
  
- **思路二** 利用勒讓德定理的第一個形式，稍作變形：
  $$
  \begin{align}
  
  {\rm ans}
  &= \sum_{i=1}^{n}v_5(i!)
  = \sum_{i=1}^{n}\sum_{k=1}^{5^k\le i}\bigg\lfloor\dfrac{i}{5^k}\bigg\rfloor
  = \sum_{k=1}^{5^k\le n}\sum_{i=1}^{n}\bigg\lfloor\dfrac{i}{5^k}\bigg\rfloor \\
  
  &= \sum_{k=1}^{5^k\le n}\bigg[
  5^k
  +2\cdot5^k
  +\dots
  +\bigg(\bigg\lfloor\dfrac{n}{5^k}\bigg\rfloor-1\bigg)\cdot5^k
  +\bigg\lfloor\dfrac{n}{5^k}\bigg\rfloor\Big(n\bmod{5^k}+1\Big)
  \bigg] \\
  
  &= \sum_{k=1}^{5^k\le n}\bigg[
  \frac{5^k}{2}\bigg\lfloor\dfrac{n}{5^k}\bigg\rfloor\bigg(\bigg\lfloor\dfrac{n}{5^k}\bigg\rfloor-1\bigg)
  +\bigg\lfloor\dfrac{n}{5^k}\bigg\rfloor\Big(n\bmod{5^k}+1\Big)
  \bigg] \\
  
  &= \sum_{5\le i=5^k\le n}^{}\bigg[
  \frac{i}{2}\bigg\lfloor\dfrac{n}{i}\bigg\rfloor\bigg(\bigg\lfloor\dfrac{n}{i}\bigg\rfloor-1\bigg)
  +\bigg\lfloor\dfrac{n}{i}\bigg\rfloor\Big(n\bmod{i}+1\Big)
  \bigg] \\
  
  
  \end{align}
  $$
  時間複雜度 $$\Theta(\log n)$$。

  ```cpp
  ll ans = 0;
  for (int i = 5; i <= n; i *= 5) {
  	ans += (ll)i * (n / i) * (n / i - 1) >> 1;
  	ans += (n / i) * (n % i + 1);
  }
  printf("%lld\n", ans);
  ```

  









##### VJwin8G - P9304 古老的神树

- **題意** 有一棵 $ n $ 個點的無向無權且根爲 $ 1 $ 的樹，你可以用一次特殊技能「跳躍」，從 $ 1 $ 點到達任意點或回到 $ 1 $ 點，不耗時間。$ \forall 1 \le i \le n $，你需要設計一條以 $ 1 $ 爲起終點的環路，使得你經過不重複的 $ i $ 個點，且時間最少。

- **思路** 定義根節點深度爲 $ 0 $，向下意爲深度增加。

  當沒有特殊技能時，我們每向下到達一個點和向上離開一個點需要經過兩次這個點上面的邊，所以答案爲 $ 2 \times (i-1) $，如 $$k=4: 1-2-4-2-1-3-1$$。

  當擁有特殊技能時，我可以讓向下到達或向上離開一個點的過程加速（因爲是環路，這本質上是等價的），希望跳躍更多的距離，那最大的距離當然是深度，具體的操作就是讓經過的點的最大深度最大。而有 $ i $ 個點要被經過的時候理論最大深度爲 $ i-1 $。

  因此，用 `dfs` 求出整棵樹最大深度爲 $ d $，對於要經過 $ i $ 個點的情況，答案爲 $ 2 \times (i-1) - \min\{i-1,d\} $。







### 北化排位賽

#### 北化排位賽（二）

##### BUC2L - 超級 Fibonacci

- **題意** 兩個字符串按照 $$\rm Fibonacci$$ 的規則運算，求字符串的指定位。

- **思路**

  - 舉個栗子，`a="abcd", b="efg"`，可計算出：

    ```cpp
    s[1] = "abcd";
    s[2] = "efg";
    s[3] = "efgabcd";
    s[4] = "efgabcdefg";
    s[5] = "efgabcdefgefgabcd"; // 與題目表述一致，這裏所有下標從 1 開始
    ```

  - 首先弄清這個「廣義 $$\rm Fibonacci$$」 的每一項的長度。顯然，它亦滿足 $$\rm Fibonacci$$ 的運算規則，即 $$F_n=F_{n-1}+F_{n-2}$$​，上面的栗子中，

    ```cpp
    len(s[1]) = 4;
    len(s[2]) = 3;
    len(s[3]) = 7 = 3 + 4;
    len(s[4]) = 10 = 7 + 3;
    len(s[5]) = 17 = 10 + 7;
    ```

  - 注意到，除了第 `1` 項外，每一項的前面所有字母都是相同的，只需計算 **無窮長的數列** 的第 $$y$$ 項 $$\varphi(y)$$ 即可（題給 $$x$$ 幾乎是無效數據，它只用於判斷 $$x=1$$ 時的特例，下文詳述）

    而且，**數列的 $$\boldsymbol{F_{n-1}\sim F_{n}}$$ 項和第 $$\boldsymbol{1\sim F_{n-2}}$$ 項完全相同**。

  - 基於此，我們希望逐步縮小 $$y$$，劃歸爲最基本的情形，如 $$\varphi(16)=\varphi(6)=\varphi(3)=c$$。

    （最基本的情形即是兩個所給字符串，$$\varphi(1)=e,~\varphi(2)=f,~\varphi(3)=g,~\varphi(4)=a,~\varphi(5)=b,~\varphi(6)=c,~\varphi(7)=d$$）

    一般地，對於每一個 $$y$$，一定存在 $$n$$ 滿足 $$F_{n-1}<y\leqslant F_{n}$$，即 $$F_{n-1}<y\leqslant F_{n-1}+F_{n-2}$$，也可寫爲 $$0<y-F_{n-1}\leqslant F_{n-2}$$，且 $$\varphi(y)=\varphi(y-F_{n-1})$$，這樣就成功縮小了 $$y$$ 的上界。重複這個過程，最終便能得到答案。

- **代碼**

  - 首先計算長度：

    ```cpp
    int cnt = 2; // 廣義Fibonacci的長度
    f[0] = strlen(s1), f[1] = strlen(s2);
    for (int i = 2; f[i - 1] < INF; ++i) {
    	f[i] = f[i - 1] + f[i - 2];
    	++cnt;
    }
    ```

    因爲不知道要算多少項，但是只需知道字符串的前 `1e18` 位便足夠，我們用 `f[i] < INF = 2e18`，加以約束。

  - 對於每次詢問，首先搜索它在哪個區間內，即搜索滿足 $$F_{p-1}<y\leqslant F_{p}$$ 的 $$p$$。而剛纔已經算過 $$F_i$$ 了，二分查找即可。

    然後模擬化歸的過程：

    ```cpp
    ll p = std::lower_bound(f, f + cnt, y) - f; 
    while (p > 0 && y > f[0] + f[1]) {
    	if (y <= f[p]) --p;
    	else y -= f[p];
    }
    ```

    其中，`if (y <= f[p]) --p;` 用來找到每次要減去的 $$F_{n-1}$$，兩個約束 `p>0 && y>f[0]+f[1]` 防止減爲負數（我最初只寫  `y>f[0]+f[1]` 一直 $$\rm RE$$。。。

  - 現在就化爲基本情形了，也就是上文 `s[3]` 的那幾項，顯然前面是 `s[2]`，後面是 `s[1]`，用三目

    ```cpp
    printf("%c\n", y > f[1] ? s1[y-f[1]-1] : s2[y-1]);
    ```

    愉快輸出就好咯！（注意字符串的下標從 `0` 開始，查詢的下標從 `1` 開始，需要 `-1`

  - 別忘記 $$x=1$$ 的特殊情況，它就是 `s[1]`：

    ```cpp
    if (x == 1) {
    	printf("%c\n", s1[y - 1]);
    }
    ```

  





### Codeforces

#### 【未完】Codeforces Round 918 (Div. 4)

##### 918A. Odd One Out

题意描述：给定三个数，其中两个相等，找出那个不相等的数

Input

The first line contains a single integer $$$t$$$ ($$$1 \leq t \leq 270$$$) — the number of test cases.

The only line of each test case contains three digits $$$a$$$, $$$b$$$, $$$c$$$ ($$$0 \leq a$$$, $$$b$$$, $$$c \leq 9$$$). Two of the digits are equal, but the third one is different from the other two.

Output

For each test case, output the value that occurs exactly once.

```
int a,b,c
```



#### 【未完】Codeforces Round 919 (Div. 2)

##### CF919A. Satisfying Constraints

- **題意** 給出一些對數的限制，包括上界、下界、不等於三種，求這種數的數量。

- **思路** 確定上界和下界，再利用不等於排除。

- **注意**

  - no two constraints are the exact same；*（總是因爲英語水平差而忽略一些重要信息、、、我在思考如何打表、、、*
  - 若上界小於下界，返回 0，換言之，結果對 0 取最大值。

- **代碼**

  ```cpp
  scanf("%d", &n);
  for (int i = 0; i < n; ++i) {
  	scanf("%d %d", &a[i], &x[i]);
  	if (a[i] == 1) min = min > x[i] ? min : x[i];
  	if (a[i] == 2) max = max < x[i] ? max : x[i];
  }
  ans = max - min + 1;
  for (int i = 0; i < n; ++i) {
  	if (a[i] == 3 && min <= x[i] && x[i] <= max) --ans;
  }
  ans = ans > 0 ? ans : 0;
  printf("%d\n", ans);
  ```

##### CF919B. Summation Game

- **題意** 對於正整數數組，每人執行一次操作：甲至多刪除 $$k$$ 個數，乙至多將 $$x$$ 個數變爲相反數。甲的目标是使所有數之和最大，而乙的目标是使其最小。求最終所有數之和。

- **思路** 枚舉。可以確定的是，乙一定將最大的 $$x$$ 個數變爲相反數，甲刪的數量不一定，但一定是刪最大的一些數，因此按甲的操作數量枚舉，尋出最終之和的最大值。（對應於下面的第 7 行）

- **注意**

  - 正整數數組；
  - $$\bold{WA}$$：自動識別 $$2\cdot10^5$$ 爲 $$10^5$$，致 `maxN` 錯誤；
  - $$\bold{WA}$$：測試用輸出符號未刪除。

- **代碼**

  ```cpp
  scanf("%d %d %d", &n, &k, &x);
  for (int i = 1; i <= n; ++i) { scanf("%d", &a[i]); }
  std::sort(a + 1, a + n + 1, cmp); // 從大到小排序
  for (int i = 1; i <= n; ++i) { s[i] = s[i - 1] + a[i]; } // 前綴和
  ans = -1e9;
  for (int i = 0; i <= k; ++i) {
  	ans = max(ans, s[n] + s[i] - 2 * s[min(n, i + x)]); // min(n, i + x) 避免越界
  }
  printf("%d\n", ans);
  ```

##### CF919C. Grouping Increases

- **題意** 給出一個數列，將數量按序劃分爲長度均爲 $$k$$ 的子列，且在某個模 $$m$$ 下所有子列全相等（定義爲對應位置相等），求劃分的種數。

- **思路** 有兩個數需要確定：一是子列長度 $$k$$，它是總元素個數的約數，容易枚舉：

  ```cpp
  for (int i = 1; i * i <= n; i++) {
  	if (n % i == 0) {
  		if (i * i == n) ans += sol(i);
  		else ans += sol(i) + sol(n / i);
  	}
  }
  ```

  二是模，這裏介紹一種確定模的方法：

  對於模 $$m$$，在模 $$m$$ 下所有子列對應位置全相等，即
  $$
  a_1=a_{k+1}=a_{2k+1}=\cdots \pmod m \\
  a_2=a_{k+2}=a_{2k+2}=\cdots \pmod m \\
  \cdots\cdots \\
  a_k=~~~a_{2k}=~~~a_{3k}=\cdots \pmod m
  $$
  先從簡單的情況入手，如果 $$a=b\pmod m$$，會得出什麼？比如有模的定義式 $$m \mid b-a$$，我們根據 $$a-b$$ 枚舉就能確定 $$m$$；

  那三個數 $$a=b=c\pmod m$$ 呢？我們有 $$m \mid b-a$$ 和 $$m \mid c-b$$，這表明，$$m \mid \gcd(b-a,~ c-b)$$（公約數是最大公約數的約數）；

  以此類推，推廣到很多數的情形，根據第一行的式子，能夠得到
  $$
  m \mid\gcd(a_{k+1}-a_1,~a_{2k+1}-a_{k+1},~\dots),
  $$
  進而，結合其它幾行，
  $$
  m \mid\gcd(a_{k+1}-a_1,~a_{2k+1}-a_{k+1},~\dots,~a_{k+2}-a_2,~a_{2k+2}-a_{k+2},~\dots,~\dots),
  $$
  整理一下便是
  $$
  m \mid\gcd(a_{k+1}-a_{1},~a_{k+2}-a_{2},~\dots,~a_{n}-a_{n-k}),
  $$
  我們可以先計算後面一長串式子，取 $$m$$​ 爲這個數即可，注意題目要求，$$m\ge2$$​，因此若結果等於 $$1$$​，表明 $$m$$​​ 不存在。

  代碼：

  ```cpp
  inline int gcd(int a, int b) { return b > 0 ? gcd(b, a % b) : a; }
  bool sol(int k) {
  	int m = 0;
  	for (int i = 1; i <= n - k; i++) {
  		m = gcd(m, abs(a[i + k] - a[i]));
  	}
  	return m != 1;
  }
  ```







##### 920B. Arranging Cats

- **思路** 兩個位數相同的二進制數，有三種操作：把



##### 920C. Sending Messages

- **題意** 開機狀態消耗 $$a$$，每關機或開機消耗 $$b$$。

- **思路** 逆向思維，計算最少的花費。比較兩種操作的花費即可。

- **代碼**

  ```cpp
  for (int i = 1; i <= n; ++i) {
  	scanf("%d", &d[i]);
  	sum += min(a * (d[i] - d[i - 1]), b);
  }
  printf("%s\n", (sum < f) ? "Yes" : "No");
  ```





##### 920E. Eat the Chip

- **題意** 象棋中兩個兵，誰會喫掉誰？

- **思路** 純判斷題，考慮極左點和極右點。

- **代碼**

  ```cpp
  scanf("%d %d %d %d %d %d", &h, &w, &x1, &y1, &x2, &y2);
  if (x1 >= x2) { printf("Draw\n");
  } else if (x2 - x1 & 1) {
  	ll l1 = max(y1 - (x2-x1)/2, 1), r1 = min(y1 + (x2-x1)/2, w);
  	ll l2 = max(y2 - (x2-x1)/2, 1), r2 = min(y2 + (x2-x1)/2, w);
  	if (l1 <= l2 + 1 && r1 >= r2 - 1) printf("Alice\n");
  	else printf("Draw\n");
  } else {
  	ll l1 = max(y1 - (x2-x1)/2, 1), r1 = min(y1 + (x2-x1)/2, w);
  	ll l2 = max(y2 - (x2-x1-1)/2, 1), r2 = min(y2 + (x2-x1-1)/2, w);
  	if (l2 <= l1 + 1 && r2 >= r1 - 1) printf("Bob\n");
  	else printf("Draw\n");
  }
  ```






#### 【未完】Codeforces Round 921 (Div. 2)

- 思路 找出一個長度最短的字符串，它包含所有長度爲 













- 題意 給出一些點的坐標和價值，查詢一將增加一個點，查詢二會詢問從一個坐標移動到另一個坐標的成本之和，其中每移動一步的成本是左邊最近一個點的價值乘上右邊最近一個點的距離。



