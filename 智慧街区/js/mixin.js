
//呼吸灯
var light=setInterval(function () {
    if($('.today-con>li>div').hasClass('active')){
        $('.today-con>li>div').removeClass('active');
    }else{
        $('.today-con>li>div').addClass('active');
    }
    setTimeout(function () {
        if($('.today-con>li>div').hasClass('active')){
            $('.today-con>li>div').removeClass('active');
        }else{
            $('.today-con>li>div').addClass('active');
        }
    },2000)
},4000)

//气泡动画
function pop(name) {
    var Bubblearr=[];
    var Bubble = document.getElementById(name);
    let ctx = Bubble.getContext('2d');
    let i = 0;
    setInterval(() => {
        ctx.clearRect(0, 0, 200, 264)
        let r = Math.random() * 5
        let y = 264 - r
        let x = Math.random() * 100
        let a = 1
        let speed = Math.random() * 5 + 5
        if (x > 50) {
            x += 98 - r
        } else {
            x += r
        }
        if (i === 0) {
            Bubblearr.push({
                'x': x,
                'y': y,
                'r': r,
                'a': a,
                'speed': speed
            })
            i = 1
        } else {
            i = 0
        }
        for (let i = 0; i < Bubblearr.length; i++) {
            ctx.beginPath()
            ctx.arc(Bubblearr[i].x, Bubblearr[i].y, Bubblearr[i].r, 0, Math.PI * 2, true)
            ctx.strokeStyle = 'rgba(255,255,255,' + Bubblearr[i].a + ')'
            Bubblearr[i].y -= Bubblearr[i].speed
            Bubblearr[i].a -= 0.02
            if (Bubblearr[i].y <= 0 || Bubblearr[i].a <= 0) {
                Bubblearr.splice(i, 1)
            }
            ctx.stroke()
            ctx.closePath()
        }
    }, 50);
}
pop('pop');
pop('pop1');
pop('pop2');
//切换页面
$('.nav>li').click(function () {
    $('.nav>li').removeClass('active');
    $(this).addClass('active');
})
//向上推动效果
var doscroll = function(){
    var $parent = $('.js-slide-list');
    var $first = $parent.find('li:first');
    var height = $first.height();
    $first.animate({
        height: 0 //或者改成： marginTop: -height + 'px'
    }, 500, function() {// 动画结束后，把它插到最后，形成无缝
        $first.css('height', height).appendTo($parent);
        // $first.css('marginTop', 0).appendTo($parent);
    });
};
var setInter=setInterval(function(){doscroll()}, 2000);

var doscroll1 = function(){
    var $parent = $('.js-slide-list1');
    var $first = $parent.find('li:first');
    var height = $first.height();
    $first.animate({
        height: 0 //或者改成： marginTop: -height + 'px'
    }, 500, function() {// 动画结束后，把它插到最后，形成无缝
        $first.css('height', height).appendTo($parent);
        // $first.css('marginTop', 0).appendTo($parent);
    });
};
var setInter1=setInterval(function(){doscroll1()}, 2000);

// var doscroll2 = function(){
//     var $parent = $('.handle-btn');
//     var $first = $parent.find('li:first');
//     var width = $first.width();
//     $first.animate({
//         marginLeft: -width + 'px', //或者改成： width: 0
//         opacity:0
//     }, 500, function() {// 动画结束后，把它插到最后，形成无缝
//         $first.css('opacity', 1);
//         $first.css('marginLeft', 0).appendTo($parent);
//     });
// };
// var setInter2=setInterval(function(){doscroll2()}, 2000);

//获取当前时间
function time() {
    var myDate = new Date();
    var day = myDate.toLocaleDateString();
    var hours = myDate.getHours();       //获取当前小时数(0-23)
    var min = myDate.getMinutes();     //获取当前分钟数(0-59)
    var sec = myDate.getSeconds();     //获取当前秒数(0-59)
    if(hours<10){
        hours="0"+hours;
    }
    if(min<10){
        min="0"+min;
    }
    if(sec<10){
        sec="0"+sec;
    }
    var time = day + ' ' + hours + ':' + min + ':' + sec;
    $('.time').html(time);
}
var timeInter=setInterval(function(){time()}, 1000);


//获取本地的天气和日期需要做到两点：1.需要根据浏览器的IP查询所在的城市的名称，2.根据城市名称查询近七天的天气和星期，日期
var city;
//方法一：通过js直接获取
function  tt(){
    $.ajax({
        url: 'http://pv.sohu.com/cityjson?ie=utf-8',
        dataType: "script",
        async: false,
        success: function(){
            city = returnCitySN.cname;
            //此时city的格式为“湖北省随州市”
            var a = city.indexOf("省",0);
            if(a >= 0){
                city = city.substring(a+1);
            }
            var cityid=returnCitySN.cid;
            var url = "https://www.tianqiapi.com/api/?version=v6&appid=18329817&appsecret=baqIYQ7D&cityid=" + cityid;
            $.ajax({
                url: url,
                dataType: "json",
                async: false,
                success: function (data) {
                     $('.tem').html(data.tem+'℃');
                    $('.humidity').html(data.humidity);
                    $('.wea').html(data.wea);
                    $('.win_speed').html(data.win_speed);
                    if(data.wea=='下雨'){
                        $('.wea-img').attr('src','./img/rain.svg');
                    }else if(data.wea=='晴'){
                        $('.wea-img').attr('src','./img/sun.svg');
                    }else if(data.wea=='下雪'){
                        $('.wea-img').attr('src','./img/snow.svg');
                    }else if(data.wea=='多云'){
                        $('.wea-img').attr('src','./img/header-4.svg');
                    }else{
                        $('.wea-img').attr('src','./img/header-4.svg');
                    }
                }
            })
        }
    });

}
tt();


