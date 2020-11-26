"use strict";

(function () {
  //判断本地是否有数据
  if (localStorage.getItem("goods")) {
    var goodsArr = JSON.parse(localStorage.getItem("goods")); //获取数据渲染到页面

    $.ajax({
      url: "php/sp.json",
      type: "get",
      dataType: "json",
      success: function success(json) {
        var domStr = "";
        $.each(goodsArr, function (index, item) {
          $.each(json[1], function (ind, obj) {
            if (item.code === obj.code) {
              domStr += "\n              <li>\n                  <img src=\"".concat(obj.imgurl, "\" alt=\"\">\n                  <h3>").concat(obj.title, "</h3>\n                  <p>").concat(obj.rp, "</p>\n                  <span><i class=\"jian\">-</i><strong>").concat(item.num, "</strong><i class=\"jia\">+</i></span>\n                  <em code=\"").concat(obj.code, "\">\u5220\u9664</em>\n              </li>\n              ");
            }
          });
        });
        $(".list").html(domStr);
      }
    });
  } else {
    var listStr = '<li style="text-align:center;line-height=100px;color:red;font-size: 30px;">暂无选中物品</li>';
    $(".list").html(listStr);
  } //给删除键绑定事件


  $(".list").on("click", "li em", function () {
    //删除点击的这条li
    $(this).parent().remove(); //保存编码删除对应localStorage的数据

    var code = $(this).attr("code");
    $.each(goodsArr, function (index, item) {
      if (code === item.code) {
        goodsArr.splice(index, 1);
        console.log(goodsArr);
        return false;
      }
    });

    if (goodsArr.length > 0) {
      localStorage.setItem("goods", JSON.stringify(goodsArr));
    } else {
      localStorage.removeItem("goods");
      var listStr = '<li style="text-align:center;line-height=100px;color:red;font-size: 30px;">暂无选中物品</li>';
      $(".list").html(listStr);
    }

    jsFn();
  }); //给减绑定事件

  $(".list").on("click", "li span .jian", function () {
    // //保存编码减对应localStorage的数据
    var num = $($(this).next()[0]).text();
    num--;

    if (num <= 0) {
      //num小于0 时删除li
      $($(this).parent().parent()).remove();
    } else {
      $($(this).next()[0]).text(num);
    }

    var em = $(this).parent().next()[0]; //找到em

    var code = $(em).attr("code"); //em转换成jquery对象

    $.each(goodsArr, function (index, item) {
      if (code === item.code) {
        goodsArr[index].num--;

        if (goodsArr[index].num <= 0) {
          goodsArr.splice(index, 1);
        }

        console.log(goodsArr);
        return false;
      }
    });

    if (goodsArr.length > 0) {
      localStorage.setItem("goods", JSON.stringify(goodsArr));
    } else {
      localStorage.removeItem("goods");
      var listStr = '<li style="text-align:center;line-height=100px;color:red;font-size: 30px;">暂无选中物品</li>';
      $(".list").html(listStr);
    }

    jsFn();
  }); //给加绑定事件

  $(".list").on("click", "li span .jia", function () {
    // //保存编码减对应localStorage的数据
    var num = $($(this).prevAll()[0]).text();
    num++; // $($(this).next()[0]).text(num);

    console.log(num);
    $($(this).prevAll()[0]).text(num);
    var em = $(this).parent().next()[0]; //找到em

    var code = $(em).attr("code"); //em转换成jquery对象

    $.each(goodsArr, function (index, item) {
      if (code === item.code) {
        goodsArr[index].num++;
        return false;
      }
    });
    jsFn();
    localStorage.setItem("goods", JSON.stringify(goodsArr));
  }); //计算总价

  function jsFn() {
    if ($(".js_l input").prop("checked")) {
      var jsNum = 0;
      var gsNum = 0;

      for (var i = 0; i < $(".list p").length; i++) {
        jsNum += Number($($(".list p")[i]).text()) * Number($($(".list strong")[i]).text());
        gsNum += Number($($(".list strong")[i]).text());
      }

      $(".goodsGs").text(gsNum);
      $(".goodsZj").text(jsNum);
    } else {
      $(".goodsGs").text(0);
      $(".goodsZj").text(0.00);
    }
  }

  $(".js_l input").on("click", function () {
    jsFn();
  });
})();