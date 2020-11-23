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
});