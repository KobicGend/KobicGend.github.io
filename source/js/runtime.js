$(function(){
  // 1. debug: 看看控制台有没有输出，确认 JS 是否加载
  console.log("Runtime script loaded"); 

  // 2. 检查页面上有没有这个容器
  if ($('#runtime').length === 0) {
      var $footer = $('#footer-wrap'); // Butterfly 的页脚容器 ID
      if ($footer.length > 0) {
          $footer.prepend('<div id="runtime" style="margin: 15px auto; text-align: center;"></div>');
      } else {
          // 如果没找到页脚，尝试加到 body 最后
          $('body').append('<div id="runtime" style="position:fixed; bottom:0; left:0; width:100%; z-index:999; text-align:center;"></div>');
      }
  }

  var NY = Math.round((new Date('03/25/2024 16:20:38')).getTime()/1000); 

  $('#runtime').flipcountdown({
    size: "xs",
    tick: function(){
      var nol = function(h){
        return h>9?h:'0'+h;
      }
      var range = Math.abs(Math.round((new Date()).getTime()/1000)-NY),
        secday = 86400, sechour = 3600,
        days = parseInt(range/secday),
        hours = parseInt((range%secday)/sechour),
        min = parseInt(((range%secday)%sechour)/60),
        sec = ((range%secday)%sechour)%60;
      
      // 注意：这里中间加了空格，确保你的 css 对应的图片宽度能容纳这些数字
      return nol(days)+' '+nol(hours)+' '+nol(min)+' '+nol(sec);
    }
  });
});