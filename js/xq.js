(function(){
    //获取数据到json数据库查找
    var xqArr = JSON.parse(localStorage.getItem("xq"));
    var code = xqArr[xqArr.length -1];
    // console.log(xqArr);
    // console.log(code);
    //发送请求获取数据
    $.ajax({
        url:"../php/sp.json",
        type:"get",
        dataType:"json",
        success:function(json){
            //遍历得到的数据
            $.each(json[1],function(index,item){
                if(code === item.code){
                    // console.log(item);
                    $(".clearfix").html(
                        `<div class="cf_l">
                        <div class="min_img">
                            <img src="${item.imgurl}" alt="">
                            <div class="mask"></div>
                        </div>
                        <div class="max_img">
                            <img src="${item.imgurl}" alt="" id="maxImg">
                        </div>
                    </div>
                    <div class="cf_r">
                        <p>${item.title}</p>
                        <i>包邮</i>
                        <i>抢第2件0元</i>
                        <ul>
                            <li>保税快速发货 入驻菜鸟仓 快速发货</li>
                            <li>自有工厂 普吉岛自有燕屋 源头控制更安全 </li>
                            <li>${item.xq}</li>
                        </ul>
                        <div class="countDown">
                            <i class="iconfont icon-shizhong"></i>
                            <p></p>
                            <strong><em>${item.soldout}</em>件已付款</strong>
                        </div>
                        <div class="purchase">
                            <strong>￥${item.rp}</strong>
                            <i>￥${item.op}</i>
                            <div class="gwc" code="${item.code}">
                                <button>马上抢</button>
                                <i></i>
                            </div>
                        </div>
                        <span>天猫国际商品进口税另计</span>
                    </div>
                        `
                    );
                }
            });
        }
    });
    setTimeout(function(){
        $(".gwc").on("click",function(){
            //判断本地是否储存有数据
            if(localStorage.getItem("goods")){
                var goodsArr = JSON.parse(localStorage.getItem("goods"));
            }else{
                var goodsArr = [];
            }
            //判断当前商品是否已在数据中
            var hasGoods = false;
            if(goodsArr.length > 0){
                //遍历数组对比
                $.each(goodsArr,function(index,item){
                    console.log(item);
                    if(item.code === code){
                        item.num++;
                        hasGoods = true;
                        return false;
                    }
                });
            }
            if(!hasGoods){//为false代表没有该条数据
                goodsArr.push({code:code,num:1})
            }
            localStorage.setItem("goods",JSON.stringify(goodsArr));
            alert("添加成功");
            //跳转页面
            $(location).attr("href","goods.html");
        });
    },3000)


})();
setTimeout(function(){
    class Fdj{
        constructor(obj){
            this.$min_img = obj.$min_img;
            this.$max_img = obj.$max_img;
            this.$mask = obj.$mask;
            this.$maxImg = obj.$maxImg;
        }
        init(){
            this.minMove();
            this.maskOut();
        }
        minMove(){
            var _this = this;
            // var l = 0 , t = 0 , maxL = 0 , maxT = 0;
            this.$min_img.mousemove(function(e){
                _this.$max_img.show();
                
                //console.log(e.pageX,e.pageY);
                var l = e.pageX - $(this).offset().left - _this.$mask.width()/2;
                var t = e.pageY - $(this).offset().top - _this.$mask.height()/2;
                
                var maxL = $(this).innerWidth() - _this.$mask.innerWidth();
                var maxT = $(this).innerHeight() - _this.$mask.innerHeight();
                
                l = l < 0 ? 0 : (l > maxL ? maxL : l);
                t = t < 0 ? 0 : (t > maxT ? maxT : t);
                _this.$mask.show().css({"left":l, "top":t});
                _this.$maxImg.css({"left": -(_this.$maxImg.innerWidth()/_this.$min_img.innerWidth())*l, "top" : -(_this.$maxImg.innerHeight()/_this.$min_img.innerHeight())*t});
            });
        }
        maskOut(){
            var _this = this;
            this.$mask.mouseout(function(){
                _this.$max_img.hide();
                $(this).hide();
            });
        }
    }    
    var obj = {
        $min_img : $(".min_img"),
        $max_img : $(".max_img"),
        $mask : $(".mask"),
        $maxImg : $("#maxImg"),
    }
    new Fdj(obj).init();
    
    
    
    //获取倒计时div countDown 和所有的span
    class cdDate{
        constructor(obj){
            this.$countDown = obj.$countDown;
            this.init();
        }
        init(){
            var _this = this;
            //来个定时器500毫秒减一次
            setInterval(function(){
                _this.sss();
            },100);
            
        }
        sss(){
            var nowDate = new Date;
            var endDate = new Date("2020-12-01 00:00:00");
            //获取两个时间的时间差z毫秒秒数
            //转换成小时数
            var hour = (endDate.getTime() - nowDate.getTime())/1000/60/60;
           
            // 获取天数取整
            var d = parseInt(hour/24);
            var h = parseInt((hour/24 - d)*24);
            var f = parseInt(((hour/24 - d)*24 - h )*60);
            var s = ((((hour/24 - d)*24 - h ) * 60 - f) * 60 ).toFixed(1);
            if(hour < 0){
                this.$countDown.html("<p style='color:red'>商品活动时间已结束！！！</p>");
            }else{
                this.$countDown.html("<p>还剩：<span>"+ d +"</span>天<span>"+ h +"</span>小时<span>"+ f +"</span>分<span>"+ s +"</span>秒</p>");
            }
        }
    }
    
    var dateObj = {
        $countDown : $(".countDown>p"),
    }
    
    new cdDate(dateObj);
},1000);