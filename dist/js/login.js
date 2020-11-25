"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var obj = {
  $zcBut: $("#zcBut"),
  //注册按钮
  $shade: $("#shade") //遮罩层

};

var Register = /*#__PURE__*/function () {
  function Register(obj) {
    _classCallCheck(this, Register);

    this.$zcBut = obj.$zcBut;
    this.$shade = obj.$shade;
  }

  _createClass(Register, [{
    key: "init",
    value: function init() {
      this.zcButClick();
    }
  }, {
    key: "zcButClick",
    value: function zcButClick() {
      var _this = this;

      this.$zcBut.on("click", function () {
        alert(1);

        _this.$shade.show();
      });
    }
  }]);

  return Register;
}();