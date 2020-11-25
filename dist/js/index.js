"use strict";

var mySwiper = new Swiper("#banner-box", {
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    clickableClass: 'my-pagination-clickable'
  },
  autoplay: {
    delay: 2000 //1秒切换一次

  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
}); //鼠标移出隐藏按钮，移入显示按钮

mySwiper.el.onmouseover = function () {
  mySwiper.navigation.$nextEl.removeClass('hide');
  mySwiper.navigation.$prevEl.removeClass('hide');
  mySwiper.autoplay.stop(); //鼠标移入停止
};

mySwiper.el.onmouseout = function () {
  mySwiper.navigation.$nextEl.addClass('hide');
  mySwiper.navigation.$prevEl.addClass('hide');
  mySwiper.autoplay.start(); //鼠标移出切换
};

var next1 = $("#next1").hide();
var prev1 = $("#prev1").hide();
$("#banner-box").mousemove(function () {
  next1.show();
  prev1.show();
});
$("#banner-box").mouseout(function () {
  next1.hide();
  prev1.hide();
}); //请求json数据渲染在主页面

$(function () {
  $.ajax({
    url: "./php/sp.json",
    type: "get",
    dataType: "json",
    success: function success(json) {
      var colStr = ""; //遍历得到的json数据遍历

      $.each(json, function (index, item) {
        colStr += "\n                    <li>\n                        <img src=\"".concat(item.imgurl, "\" alt=\"\">\n                        <div class=\"dis\">\n                            <span>\n                                ").concat(parseInt(item.zk), "<i>.").concat(item.zk * 10 - parseInt(item.zk) * 10, "</i>\n                                <p>\u6298</p>\n                            </span>\n                            <em></em>\n                        </div>\n                        <div class=\"col_details\">\n                            <i>\u6D77\u5916\u54C1\u724C</i>\n                            <p>").concat(item.title, "</p>\n                            <span>").concat(item.xq, "</span>\n                            <div>\n                                <strong><em>\uFFE5</em>").concat(item.rp, "</strong>\n                                <span>\uFFE5").concat(item.op, "</span><br>\n                                <i>\u5DF2\u65363").concat(item.soldout, "\u4EF6</i>\n                            </div>\n                            <a href=\"./html/xq.html\">\u9A6C\u4E0A\u62A2</a>\n                        </div>\n                    </li>\n                ");
      });
      $(".column ul").html(colStr);
    }
  });
});