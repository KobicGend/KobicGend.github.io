$$Problem.1 \quad\lim_{x\rightarrow\infty} \frac{x^2+\cos^3 x-1}{(x+\sin x)^2}$$

$$Notes.$$
$$
\begin{align}

&\lim_{x\rightarrow\infty} \frac{x^2+\cos^3 x-1}{(x+\sin x)^2} \\

=& \lim_{x\rightarrow\infty} \frac{x^2+\cos^3 x}{(x+\sin x)^2} \\

=& \lim_{x\rightarrow\infty} \frac{x^2+0}{(x+\sin x)^2} \\

=& \lim_{x\rightarrow\infty} \frac{x^2}{(x+0)^2} \\

=&~ 1

\end{align}
$$


求解积分 $\displaystyle I = \int \dfrac{1}{\sin x + 2} \mathrm{d} x$。

这是个三角函数积分，除三角函数以外还包含常数项。

关注三角函数的次数，这些项次数并不相同 $\sin x$ 是一次，常数 2 是零次。先配出相同次数。

一个最常用的方法是 $1 = \sin^2 x + \cos^2 x$，这样可以对某项升两次或降两次。但原式还有个奇数次的 $\sin x$，希望升或降一次，这可以考虑用倍角公式或半角公式。在这里我们选择 $\sin x = 2 \sin \dfrac{x}{2} \cos \dfrac{x}{2}$。

于是
$$
    I = \int \dfrac{1}{2 \sin \dfrac{x}{2} \cos \dfrac{x}{2} + 2} \mathrm{d} x
$$

再对常数项升两次，即用 $1 = \sin^2 \dfrac{x}{2} + \cos^2 \dfrac{x}{2}$，
$$
    \begin{aligned}
        I
         & = \int \dfrac{1}{2 \sin \dfrac{x}{2} \cos \dfrac{x}{2} + 2\Big(\sin^2 \dfrac{x}{2} + \cos^2 \dfrac{x}{2}\Big)} \mathrm{d} x
         \\
         & = \int \dfrac{\sec^{2} \dfrac{x}{2}}{2 \tan^{2} \dfrac{x}{2} + 2\tan \dfrac{x}{2} + 2} \mathrm{d} x
    \end{aligned}
$$

我们知道 $\displaystyle \int \sec^{2} x \mathrm{d} x = \tan x$，把分子 $\sec^{2} \dfrac{x}{2}$ 扔到 $\mathrm{d}$ 后面去，
$$
    I = 2 \int \dfrac{1}{2 \tan^{2} \dfrac{x}{2} + 2\tan \dfrac{x}{2} + 2} \mathrm{d} \tan \dfrac{x}{2}
$$

这是一个关于 $\tan \dfrac{x}{2}$ 的有理函数积分，其分母是一个二次函数，考虑配方。
$$
\begin{aligned}
    I
     & = \int \dfrac{1}{\tan^{2} \dfrac{x}{2} + \tan \dfrac{x}{2} + 1} \mathrm{d} \tan \dfrac{x}{2}
    \\
     & = \int \dfrac{1}{\Big(\tan \dfrac{x}{2} + \dfrac{1}{2}\Big)^{2} + \dfrac{3}{4}} \mathrm{d} \Big(\tan \dfrac{x}{2} + \dfrac{1}{2}\Big)
     \\
     &= \dfrac{2}{\sqrt{3}} \arctan \dfrac{2 \tan \dfrac{x}{2} + 1}{\sqrt{3}} + C
\end{aligned}
$$

这一类积分的一般形式是 $\displaystyle \int \dfrac{1}{\text{三角函数名} x + \text{常数}} \mathrm{d} x$。

上面讲解了对 $\sin x$ 的处理方法，对于 $\cos x$ 也是类似的，用代换 $\cos x = \cos^{2} \dfrac{x}{2} - \sin^{2} \dfrac{x}{2}$ 即可；如果是 $\tan x,\cot x$，作切化弦；如果是 $\sec x,\csc x$，先化为 $\sin x$ 或 $\cos x$，再用上述方法求解。
