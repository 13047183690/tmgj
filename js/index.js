

var mySwiper = new Swiper("#banner-box",{
    loop:true,
    pagination:{
        el: '.swiper-pagination',
        clickable: true,
        clickableClass : 'my-pagination-clickable',
    },
    autoplay: {
        delay: 2000,//1秒切换一次
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

});
//鼠标移出隐藏按钮，移入显示按钮
mySwiper.el.onmouseover=function(){
mySwiper.navigation.$nextEl.removeClass('hide');
mySwiper.navigation.$prevEl.removeClass('hide');
mySwiper.autoplay.stop();//鼠标移入停止
}
mySwiper.el.onmouseout=function(){
mySwiper.navigation.$nextEl.addClass('hide');
mySwiper.navigation.$prevEl.addClass('hide');
mySwiper.autoplay.start();//鼠标移出切换
}
var next1 = $("#next1").hide();
var prev1 = $("#prev1").hide();
$("#banner-box").mousemove(function(){
    next1.show();
    prev1.show();
});
$("#banner-box").mouseout(function(){
    next1.hide();
    prev1.hide();
});

//请求json数据渲染在主页面
$(function(){
    $.ajax({
        url:"./php/sp.json",
        type:"get",
        dataType:"json",
        success:function(json){
            var colStr = "";
            //遍历得到的json数据遍历
            $.each(json[1],function(index,item){
                colStr += `
                    <li code="${item.code}">
                        <img src="${item.imgurl}" alt="">
                        <div class="dis">
                            <span>
                                ${parseInt(item.zk)}<i>.${(item.zk)*10-(parseInt(item.zk)*10)}</i>
                                <p>折</p>
                            </span>
                            <em></em>
                        </div>
                        <div class="col_details">
                            <i>海外品牌</i>
                            <p>${item.title}</p>
                            <span>${item.xq}</span>
                            <div>
                                <strong><em>￥</em>${item.rp}</strong>
                                <span>￥${item.op}</span><br>
                                <i>已收3${item.soldout}件</i>
                            </div>
                            <a href="#">马上抢</a>
                        </div>
                    </li>
                `
            });
            $(".column ul").html(colStr);
        }
    });
});
//s添加点击事件传送商品编码到详情页
$(".column ul").on("click","li",function(){
    var code = $(this).attr("code");
    //保存该数据
    if(localStorage.getItem("xq")){
        var xqArr = JSON.parse(localStorage.getItem("xq"));
        xqArr.push(code);
        localStorage.setItem("xq",JSON.stringify(xqArr));
    }else{
        var xqArr = [];
        xqArr.push(code);
        localStorage.setItem("xq",JSON.stringify(xqArr));
    }
    $(location).attr("href","xq.html");
});