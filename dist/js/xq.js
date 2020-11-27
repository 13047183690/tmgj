"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function () {
  //获取数据到json数据库查找
  var xqArr = JSON.parse(localStorage.getItem("xq"));
  var code = xqArr[xqArr.length - 1]; // console.log(xqArr);
  // console.log(code);
  //发送请求获取数据

  $.ajax({
    url: "../php/sp.json",
    type: "get",
    dataType: "json",
    success: function success(json) {
      //遍历得到的数据
      $.each(json[1], function (index, item) {
        if (code === item.code) {
          // console.log(item);
          $(".clearfix").html("<div class=\"cf_l\">\n                        <div class=\"min_img\">\n                            <img src=\"".concat(item.imgurl, "\" alt=\"\">\n                            <div class=\"mask\"></div>\n                        </div>\n                        <div class=\"max_img\">\n                            <img src=\"").concat(item.imgurl, "\" alt=\"\" id=\"maxImg\">\n                        </div>\n                    </div>\n                    <div class=\"cf_r\">\n                        <p>").concat(item.title, "</p>\n                        <i>\u5305\u90AE</i>\n                        <i>\u62A2\u7B2C2\u4EF60\u5143</i>\n                        <ul>\n                            <li>\u4FDD\u7A0E\u5FEB\u901F\u53D1\u8D27 \u5165\u9A7B\u83DC\u9E1F\u4ED3 \u5FEB\u901F\u53D1\u8D27</li>\n                            <li>\u81EA\u6709\u5DE5\u5382 \u666E\u5409\u5C9B\u81EA\u6709\u71D5\u5C4B \u6E90\u5934\u63A7\u5236\u66F4\u5B89\u5168 </li>\n                            <li>").concat(item.xq, "</li>\n                        </ul>\n                        <div class=\"countDown\">\n                            <i class=\"iconfont icon-shizhong\"></i>\n                            <p></p>\n                            <strong><em>").concat(item.soldout, "</em>\u4EF6\u5DF2\u4ED8\u6B3E</strong>\n                        </div>\n                        <div class=\"purchase\">\n                            <strong>\uFFE5").concat(item.rp, "</strong>\n                            <i>\uFFE5").concat(item.op, "</i>\n                            <div class=\"gwc\" code=\"").concat(item.code, "\">\n                                <button>\u9A6C\u4E0A\u62A2</button>\n                                <i></i>\n                            </div>\n                        </div>\n                        <span>\u5929\u732B\u56FD\u9645\u5546\u54C1\u8FDB\u53E3\u7A0E\u53E6\u8BA1</span>\n                    </div>\n                        "));
        }
      });
    }
  });
  setTimeout(function () {
    $(".gwc").on("click", function () {
      //判断本地是否储存有数据
      if (localStorage.getItem("goods")) {
        var goodsArr = JSON.parse(localStorage.getItem("goods"));
      } else {
        var goodsArr = [];
      } //判断当前商品是否已在数据中


      var hasGoods = false;

      if (goodsArr.length > 0) {
        //遍历数组对比
        $.each(goodsArr, function (index, item) {
          console.log(item);

          if (item.code === code) {
            item.num++;
            hasGoods = true;
            return false;
          }
        });
      }

      if (!hasGoods) {
        //为false代表没有该条数据
        goodsArr.push({
          code: code,
          num: 1
        });
      }

      localStorage.setItem("goods", JSON.stringify(goodsArr));
      alert("添加成功"); //跳转页面

      $(location).attr("href", "goods.html");
    });
  }, 3000);
})();

setTimeout(function () {
  var Fdj = /*#__PURE__*/function () {
    function Fdj(obj) {
      _classCallCheck(this, Fdj);

      this.$min_img = obj.$min_img;
      this.$max_img = obj.$max_img;
      this.$mask = obj.$mask;
      this.$maxImg = obj.$maxImg;
    }

    _createClass(Fdj, [{
      key: "init",
      value: function init() {
        this.minMove();
        this.maskOut();
      }
    }, {
      key: "minMove",
      value: function minMove() {
        var _this = this; // var l = 0 , t = 0 , maxL = 0 , maxT = 0;


        this.$min_img.mousemove(function (e) {
          _this.$max_img.show(); //console.log(e.pageX,e.pageY);


          var l = e.pageX - $(this).offset().left - _this.$mask.width() / 2;
          var t = e.pageY - $(this).offset().top - _this.$mask.height() / 2;

          var maxL = $(this).innerWidth() - _this.$mask.innerWidth();

          var maxT = $(this).innerHeight() - _this.$mask.innerHeight();

          l = l < 0 ? 0 : l > maxL ? maxL : l;
          t = t < 0 ? 0 : t > maxT ? maxT : t;

          _this.$mask.show().css({
            "left": l,
            "top": t
          });

          _this.$maxImg.css({
            "left": -(_this.$maxImg.innerWidth() / _this.$min_img.innerWidth()) * l,
            "top": -(_this.$maxImg.innerHeight() / _this.$min_img.innerHeight()) * t
          });
        });
      }
    }, {
      key: "maskOut",
      value: function maskOut() {
        var _this = this;

        this.$mask.mouseout(function () {
          _this.$max_img.hide();

          $(this).hide();
        });
      }
    }]);

    return Fdj;
  }();

  var obj = {
    $min_img: $(".min_img"),
    $max_img: $(".max_img"),
    $mask: $(".mask"),
    $maxImg: $("#maxImg")
  };
  new Fdj(obj).init(); //获取倒计时div countDown 和所有的span

  var cdDate = /*#__PURE__*/function () {
    function cdDate(obj) {
      _classCallCheck(this, cdDate);

      this.$countDown = obj.$countDown;
      this.init();
    }

    _createClass(cdDate, [{
      key: "init",
      value: function init() {
        var _this = this; //来个定时器500毫秒减一次


        setInterval(function () {
          _this.sss();
        }, 100);
      }
    }, {
      key: "sss",
      value: function sss() {
        var nowDate = new Date();
        var endDate = new Date("2020-12-01 00:00:00"); //获取两个时间的时间差z毫秒秒数
        //转换成小时数

        var hour = (endDate.getTime() - nowDate.getTime()) / 1000 / 60 / 60; // 获取天数取整

        var d = parseInt(hour / 24);
        var h = parseInt((hour / 24 - d) * 24);
        var f = parseInt(((hour / 24 - d) * 24 - h) * 60);
        var s = ((((hour / 24 - d) * 24 - h) * 60 - f) * 60).toFixed(1);

        if (hour < 0) {
          this.$countDown.html("<p style='color:red'>商品活动时间已结束！！！</p>");
        } else {
          this.$countDown.html("<p>还剩：<span>" + d + "</span>天<span>" + h + "</span>小时<span>" + f + "</span>分<span>" + s + "</span>秒</p>");
        }
      }
    }]);

    return cdDate;
  }();

  var dateObj = {
    $countDown: $(".countDown>p")
  };
  new cdDate(dateObj);
}, 1000);