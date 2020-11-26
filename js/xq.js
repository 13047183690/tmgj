(function(){
    //获取数据到json数据库查找
    var xqArr = JSON.parse(localStorage.getItem("xq"));
    var code = xqArr[xqArr.length -1];
    console.log(xqArr);
    console.log(code);
    //发送请求获取数据
    $.ajax({
        url:"../php/sp.json",
        type:"get",
        dataType:"json",
        success:function(json){
            //遍历得到的数据
            $.each(json[1],function(index,item){
                if(code === item.code){
                    console.log(item);
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
                            <div>
                                <button type="submit">马上抢</button>
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
})();