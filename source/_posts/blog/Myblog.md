---
title: 「小明の雜貨鋪」搭建記錄存檔
tags:
  - 小明
  - Blog
abbrlink: c6a51061
date: 2024-03-25 16:20:39
updated: 2024-03-30 16:20:38
categories:
description:
---

```bash
hexo clean && hexo generate && gulp && hexo deploy
```

```bash
hexo clean && hexo server
```

```
git add .
git commit -m "260419backup"
git push
```
git push -u backup hexo:main

## 从零开始

### 主题安装

https://butterfly.js.org/posts/21cfbf15/

```bash
git clone -b master https://github.com/jerryc127/hexo-theme-butterfly.git themes/butterfly
```

安装

```bash
npm install hexo-renderer-pug hexo-renderer-stylus --save
```

修改 Hexo 根目录下的 `_config.yml`，

```yml
theme: butterfly
```

在 hexo 的根目錄創建一個文件 `_config.butterfly.yml`，並把主題目錄的 `_config.yml` 內容複製到 `_config.butterfly.yml` 去。

### 域名

```yml
deploy:
  type: git
  repository: https://github.com/KobicGend/KobicGend.github.io.git
  branch: master
```

### abbrlink（在写第一篇博客前修改）

https://zhuanlan.zhihu.com/p/169492685

```bash
npm install hexo-abbrlink --save
```

修改 `_config.yml`

```yml
permalink: posts/:abbrlink.html  # 此处可以自己设置，也可以直接使用 :/abbrlink
abbrlink:
  alg: crc32   # 算法： crc16(default) and crc32
  rep: hex     # 进制： dec(default) and hex
```

### 使用gulp压缩博客静态资源

```bash
npm install --global gulp-cli #全局安装gulp指令集  
npm install gulp --save #安装gulp插件
# 压缩HTML
npm install gulp-htmlclean --save-dev  
npm install gulp-html-minifier-terser --save-dev  
# 用gulp-html-minifier-terser可以压缩HTML中的ES6语法
# 压缩CSS
npm install gulp-clean-css --save-dev
# 压缩JS
npm install gulp-terser --save-dev
# 压缩字体包(不再适用)
# npm install gulp-fontmin --save-dev
```

为 Gulp 创建`gulpfile.js`任务脚本。在博客根目录下新建`gulpfile.js`，打开并输入以下内容：

```js
//用到的各个插件
var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-html-minifier-terser');
var htmlclean = require('gulp-htmlclean');
// var fontmin = require('gulp-fontmin');
// gulp-tester
var terser = require('gulp-terser');
// 压缩js
gulp.task('compress', async() =>{
  gulp.src(['./public/**/*.js', '!./public/**/*.min.js'])
    .pipe(terser())
    .pipe(gulp.dest('./public'))
});
//压缩css
gulp.task('minify-css', () => {
    return gulp.src(['./public/**/*.css'])
        .pipe(cleanCSS({
            compatibility: 'ie11'
        }))
        .pipe(gulp.dest('./public'));
});
//压缩html
gulp.task('minify-html', () => {
    return gulp.src('./public/**/*.html')
        .pipe(htmlclean())
        .pipe(htmlmin({
            removeComments: true, //清除html注释
            collapseWhitespace: true, //压缩html
            collapseBooleanAttributes: true,
            //省略布尔属性的值，例如：<input checked="true"/> ==> <input />
            removeEmptyAttributes: true,
            //删除所有空格作属性值，例如：<input id="" /> ==> <input />
            removeScriptTypeAttributes: true,
            //删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,
            //删除<style>和<link>的 type="text/css"
            minifyJS: true, //压缩页面 JS
            minifyCSS: true, //压缩页面 CSS
            minifyURLs: true  //压缩页面URL
        }))
        .pipe(gulp.dest('./public'))
});
//压缩字体
// function minifyFont(text, cb) {
//   gulp
//     .src('./public/fonts/*.ttf') //原字体所在目录
//     .pipe(fontmin({
//       text: text
//     }))
//     .pipe(gulp.dest('./public/fontsdest/')) //压缩后的输出目录
//     .on('end', cb);
// }

// gulp.task('mini-font', (cb) => {
//   var buffers = [];
//   gulp
//     .src(['./public/**/*.html']) //HTML文件所在目录请根据自身情况修改
//     .on('data', function(file) {
//       buffers.push(file.contents);
//     })
//     .on('end', function() {
//       var text = Buffer.concat(buffers).toString('utf-8');
//       minifyFont(text, cb);
//     });
// });
// 运行gulp命令时依次执行以下任务
gulp.task('default', gulp.parallel(
  'compress', 'minify-css', 'minify-html'
//   ,'mini-font'
))
```

### 更新所有插件

```bash
npm update
```

当你把博客源码上传到 GitHub 或换台电脑开发时，只需运行 `npm install`，系统就会根据 `package.json` 的记录，自动把所有带 `--save` 标记的插件统统装回来。

### 中英文之间自动加空格

```bash
npm install hexo-filter-auto-spacing --save
```

```yml
auto_spacing:
  enable: true
```

### 标签外挂

https://akilar.top/posts/615e2dec/

### PDF

```bash
npm install --save hexo-pdf
```

在 source 文件夹下创建一个叫 pdf 的文件夹，把xxx.pdf文件放在这里，然后在使用

```md
{% pdf /pdf/xxx.pdf %}
```



### LATEX

Hexo 默认的 Markdown 解析器（marked）会将 LaTeX 公式中的下划线 `_` 误认为是斜体，将双反斜杠 `\\` 误认为是普通转义。为了彻底解决冲突，我们需要更换一个更高级的解析器：**markdown-it**。

```bash
npm uninstall hexo-renderer-marked --save
npm uninstall hexo-renderer-kramed --save
npm install hexo-renderer-markdown-it --save
npm install markdown-it-katex --save
```

记得配置主题文件里的 `math: use: mathjax`。

### 字數統計

```bash
npm install hexo-wordcount --save
```

```yml
wordcount:
  enable: true
  post_wordcount: true
  min2read: true
  total_wordcount: true
```


### 將來的文章

 `_config.yml` 中 `# Writing` 板塊置 `future: false`，若發佈時間晚於當前時間，則不會顯示，在重新部署後顯示。

### 發佈狀態

文章開頭置 `published: false`。

### 首頁隱藏

```bash
npm uninstall hexo-generator-index
npm install hexo-generator-indexed
```

文章開頭置 `hide: true`；

在 `_config.yml` 中 `hide_categories` 可設置隱藏某個分類下的文章。

### 加密

```bash
npm i hexo-blog-encrypt --save
```

文章開頭置

```md
password: <password>
abstract: This blog is encrypted.
message: Please enter the password.
wrong_pass_message: Incorrect password, please try again.
wrong_hash_message: Bug found!
```

或在 `_config.yml` 中添加

```
encrypt: # hexo-blog-encrypt
  password: <password>
  abstract: This blog is encrypted.
  message: Please enter the password.
  tags:
	- {name: <tag>, password: <password>}
	- {name: <tag>, password: <password>}
  template: <div id="hexo-blog-encrypt" data-wpm="{{hbeWrongPassMessage}}" data-whm="{{hbeWrongHashMessage}}"><div class="hbe-input-container"><input type="password" id="hbePass" placeholder="{{hbeMessage}}" /><label>{{hbeMessage}}</label><div class="bottom-line"></div></div><script id="hbeData" type="hbeData" data-hmacdigest="{{hbeHmacDigest}}">{{hbeEncryptedData}}</script></div>
  wrong_pass_message: Incorrect password, please try again.
  wrong_hash_message: Bug found!
```


### 修改底部数量

\themes\butterfly\layout\includes\pagination.pug

```pug
  var options = {
    prev_text: '<i class="fas fa-chevron-left fa-fw"></i>',
    next_text: '<i class="fas fa-chevron-right fa-fw"></i>',
    mid_size: 3,
    escape: false
  }
```

在文件中找到 `!=paginator(...)` 代码行，调整以下两个关键数值：

* **`mid_size`**: 当前页左右两侧显示的页码数（增加此值可让中间页码更连续）。
* **`end_size`**: 首页和尾页显示的页码数（增加此值可让两端页码显示更多）。

```pug
//- 将 mid_size 改为 3，end_size 改为 2
!=paginator({
  prev_text: '<i class="fas fa-chevron-left"></i>',
  next_text: '<i class="fas fa-chevron-right"></i>',
  mid_size: 3,
  end_size: 2
})
```



## Debug

### 提示“warning: LF will be replaced by CRLF”

当你在 Windows 环境下处理一个原本是 LF 格式的文件时，Git 会检测到不一致。它在提醒你：“下次我处理这个文件时，我会自动把它的换行符从 LF 改成 Windows 标准的 CRLF”。

1. 最推荐的做法：禁用 Git 的自动转换（保持原样）

如果你希望保持文件的原始换行符，不让 Git 瞎操心，可以在终端执行：

```
git config --global core.autocrlf false
```

2. Windows 用户的标准做法

如果你是在 Windows 上开发，且希望统一使用 Windows 的换行方式：

```
git config --global core.autocrlf true
```

3. 忽略警告

如果你只想让 Git 闭嘴，不输出这个警告：

```
git config --global core.safecrlf false
```

### 部署时 ERROR Deployer not found: git

```bash
npm install hexo-deployer-git --save
```


## B 站站外(外链)播放器

QueryString 参数：**boolean** 类型，在 QueryString 中可以使用 **0** 和 **1** 表示。

| 参数名       | 类型        | 必要  | 说明                                   |
| --------- | --------- | --- | ------------------------------------ |
| aid       | `number`  |     | UGC 视频 ID。aid、bvid 选择其一即可            |
| cid       | `number`  |     | UGC 视频 ID                            |
| bvid      | `string`  | ✅   | UGC 视频 ID。aid、bvid 选择其一即可            |
| seasonId  | `number`  |     | OGV 视频 ID                            |
| episodeId | `number`  | ✅   | OGV 视频 ID。优先级高于 aid、bvid             |
| poster    | `boolean` |     | 展示封面                                 |
| autoplay  | `boolean` |     | 自动播放                                 |
| muted     | `boolean` |     | 静音                                   |
| t         | `number`  |     | 跳转到媒体的初始时间点，单位：秒                     |
| danmaku   | `boolean` |     | `false` 表示**关闭弹幕**，其他表示默认值           |
| kind      | `number`  |     | 群组种类。非通用业务需要此参数                      |
| refer     | `boolean` |     | 跳链时携带当前的 Referrer。用于合作方查询来自嵌入网站的跳转次数 |
| p         | `number`  |     | 多 P 视频的集数。从 1 开始计数，若有 cid 参数，则此参数不生效 |




## 小风车

修改主题配置文件，改成小风车样式

```yml
beautify:
  enable: true
  field: post # site/post
  title-prefix-icon: '\f863'
  title-prefix-icon-color: "#ff7849"
```

图标使用的「fontawesome.com」上的图标，引用的是 Unicode 形式。可自行查找合适的。

/* 页面设置icon转动速度调整 */
#rightside_config i.fas.fa-cog.fa-spin {
    animation: fa-spin 5s linear infinite ;
}

