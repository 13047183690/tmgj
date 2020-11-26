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
