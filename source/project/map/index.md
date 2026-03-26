---
# title: 旅遊足跡
tags:
  - 小明
  - 旅遊
  - 旅遊足跡
categories:
  - 旅遊
top_img: false
aside: false
abbrlink: index
date: 2026-02-14 00:00:00
updated: 2026-02-14 00:00:00
description:
---

<style>
  #post-info {
    display: none !important;
  }
  :root {
    --card-bg: rgba(255, 255, 255, 0);
  }
  #footprint {
    width: 100vw !important;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw !important;
    margin-right: -50vw !important;
    margin-top: -100px !important;
  }
  /* 强制所有 ECharts 提示框及其内部元素使用博客定义的字体 */
  .echarts-tooltip-controlled-by-user, 
  div[style*="z-index: 9999999"] { 
    font-family: inherit !important; 
  }
</style>

<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/echarts/map/js/china.js"></script>
<!-- <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js"></script> -->
<div id="footprint" style="width: 100%; height: 618px;"></div>
<script type="module" src="/project/map/js/main.js"></script>

