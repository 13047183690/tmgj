var obj = {
    $zcBut : $("#zcBut"),//注册按钮
    $shade : $("#shade"),//遮罩层
  }
  class Register{
    constructor(obj){
      this.$zcBut = obj.$zcBut;
      this.$shade = obj.$shade;
    }
    init(){
      this.zcButClick();
    }
    zcButClick(){
      var _this = this;
      this.$zcBut.on("click",function(){
        alert(1)
        _this.$shade.show();
      });
    }
}
  