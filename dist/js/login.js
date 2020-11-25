"use strict";

(function () {
  //切换账号登录和短信登录
  $("#loginBox>input").on("click", function () {
    $(this).addClass("bt").siblings().removeClass("bt");

    if ($(this).index() === 1) {
      $(".zh").hide();
      $(".dx").show();
    } else {
      $(".zh").show();
      $(".dx").hide();
    }
  }); //显示注册框

  $("#zcBut").on("click", function () {
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    $("#shade").show().css({
      "width": w,
      "height": h
    }); //显示遮罩层设置宽高

    $("#register").show().css({
      left: function left() {
        //调整left
        return (w - $(this).width()) / 2;
      },
      top: function top() {
        //调整top
        return (h - $(this).height()) / 2;
      }
    });
    document.body.style.overflow = "hidden"; //禁止页面滚动
  }); //关闭注册框

  $(".closeZc").on("click", function () {
    $("#shade").hide();
    $("#register").hide();
    document.body.style.overflow = "auto"; //解除禁止页面滚动
  });
})();

(function () {
  //账号登录请求
  $("#register .sub").on("click", function () {
    //获取value
    var nVal = $("#register .zcName").val();
    var pVal = $("#register .zcUpwd").val();
    $.ajax({});
  });
})();