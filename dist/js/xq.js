"use strict";

(function () {
  //获取数据到json数据库查找
  var xqArr = JSON.parse(localStorage.getItem("xq"));
  var code = xqArr[xqArr.length - 1];
  console.log(xqArr);
  console.log(code); //发送请求获取数据

  $.ajax({
    url: "../php/sp.json",
    type: "get",
    dataType: "json",
    success: function success(json) {
      //遍历得到的数据
      $.each(json[1], function (index, item) {
        if (code === item.code) {
          console.log(item);
          $(".clearfix").html("<div class=\"cf_l\">\n                        <div class=\"min_img\">\n                            <img src=\"".concat(item.imgurl, "\" alt=\"\">\n                            <div class=\"mask\"></div>\n                        </div>\n                        <div class=\"max_img\">\n                            <img src=\"").concat(item.imgurl, "\" alt=\"\" id=\"maxImg\">\n                        </div>\n                    </div>\n                    <div class=\"cf_r\">\n                        <p>").concat(item.title, "</p>\n                        <i>\u5305\u90AE</i>\n                        <i>\u62A2\u7B2C2\u4EF60\u5143</i>\n                        <ul>\n                            <li>\u4FDD\u7A0E\u5FEB\u901F\u53D1\u8D27 \u5165\u9A7B\u83DC\u9E1F\u4ED3 \u5FEB\u901F\u53D1\u8D27</li>\n                            <li>\u81EA\u6709\u5DE5\u5382 \u666E\u5409\u5C9B\u81EA\u6709\u71D5\u5C4B \u6E90\u5934\u63A7\u5236\u66F4\u5B89\u5168 </li>\n                            <li>").concat(item.xq, "</li>\n                        </ul>\n                        <div class=\"countDown\">\n                            <i class=\"iconfont icon-shizhong\"></i>\n                            <p></p>\n                            <strong><em>").concat(item.soldout, "</em>\u4EF6\u5DF2\u4ED8\u6B3E</strong>\n                        </div>\n                        <div class=\"purchase\">\n                            <strong>\uFFE5").concat(item.rp, "</strong>\n                            <i>\uFFE5").concat(item.op, "</i>\n                            <div>\n                                <button type=\"submit\">\u9A6C\u4E0A\u62A2</button>\n                                <i></i>\n                            </div>\n                        </div>\n                        <span>\u5929\u732B\u56FD\u9645\u5546\u54C1\u8FDB\u53E3\u7A0E\u53E6\u8BA1</span>\n                    </div>\n                        "));
        }
      });
    }
  });
})();