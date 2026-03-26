---
title: ""
date: 2024-06-21 17:50:47
aside: false
top_img: false
---

# 进制转换

### 支持任意位整数和小数的进制转换

<html lang="zh-CN">

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- 设置页面的标题为“进制转换” -->
<title>进制转换</title>
<!-- 引入 JavaScript 文件 -->
<script src="./conversion.js"></script>
<!-- 添加 CSS 样式来设置输入框宽度 -->
<style>
    input[type="text"] {
        width: 500px; /* 可根据需要调整宽度 */
    }
</style>

<!-- 二进制输入框 -->
<label for="bin"><b>　二进制：</b></label><input type="text" id="bin" placeholder="输入二进制数" oninput="validateInput(this, 2); convertAll(this.value, 2)">

<!-- 八进制输入框 -->
<label for="oct"><b>　八进制：</b></label><input type="text" id="oct" placeholder="输入八进制数" oninput="validateInput(this, 8); convertAll(this.value, 8)">

<!-- 十进制输入框 -->
<label for="dec"><b>　十进制：</b></label><input type="text" id="dec" placeholder="输入十进制数" oninput="validateInput(this, 10); convertAll(this.value, 10)">

<!-- 十六进制输入框 -->
<label for="hex"><b>十六进制：</b></label><input type="text" id="hex" placeholder="输入十六进制数" oninput="validateInput(this, 16); convertAll(this.value, 16)">

<!-- 8421 BCD 码输入框 -->
<label for="bcd"><b>8421BCD 码：</b></label><input type="text" id="bcd" placeholder="不要输入 8421 BCD 码" oninput="validateInput(this, 11); convertAll(this.value, 10)">


</html>