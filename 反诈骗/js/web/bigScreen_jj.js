$(function(){
    //页面动画
    window.scrollReveal = new scrollReveal();
    //滚动条
    $(".np-content,.phoneList").mCustomScrollbar({
        theme:'dark',
        autoHideScrollbar:true
    });
    //数字开始滚动
    setInterval(function(){
        show_num1(sum,".t_num1 i",".t_num1")
        show_num1(sum,".t_num2 i",".t_num2")
    },1000);
    //模拟往表格最前面追加数据
    function loadTable(){
        $.ajax({
            type:"get",
            url:"json/tableTest_jj.json",
            async:true,
            beforeSend:function(){
                //一定要销毁滚动条事件,防止复用
                $(".np-content").mCustomScrollbar("destroy")
            },
            success:function(data){
                $.each(data.data, function(i,v) {
                    $(".np-content").prepend("<p><span>"+v.address+"</span><span>"+v.call+"</span><span>"+v.incoming+"</span><span>"+v.time+"</span></p>");
                });
                //加载滚动条
                $(".np-content").mCustomScrollbar({
                    theme:'dark',
                    autoHideScrollbar:true
                });
            }
        });
    }
    setInterval(loadTable,5000);

    //地图 未实现下钻
    var mapDom = document.getElementById("map");//地图容器
    var myChart = echarts.init(mapDom);
    var app = {};
    option = null;
    var data = [
        {name: '宁波', value: 199},
        {name: '绍兴', value: 192},
        {name: '台州', value: 212},
        {name: '杭州', value: 312},
        {name: '临安', value: 214},
        {name: '金华', value: 215},

    ];
    var geoCoordMap = {
        '宁波':[121.56,29.86],
        '绍兴':[120.58,30.01],
        '台州':[121.420757,28.656386],
        '杭州':[120.19,30.26],
        '临安':[119.72,30.23],
        '金华':[119.64,29.12],
    };

    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;
    };

    option = {
        backgroundColor: 'rgba(23,62,105,0.0)',
        title: {
            show: false
        },
        tooltip : {
            trigger: 'item'
        },
        legend: {
            show: false
        },
        geo: {
            map: '浙江',
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#0b2f55',//地图区域颜色
                    borderColor: '#0daaf1'
                },
                emphasis: {
                    areaColor: '#0a2138'//鼠标经过颜色
                }
            }
        },
        series : [
            {
                name: 'pm2.5',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(data),
                symbolSize: function (val) {
                    return val[2] / 10;
                },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#ddb926'
                    }
                }
            },
            {
                name: 'Top 5',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                // data: convertData(data.sort(function (a, b) {
                //     return b.value - a.value;
                // }).slice(0, 6)),
                data: [],
                symbolSize: function (val) {
                    return val[2] / 5;
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#FFFF00',
                        shadowBlur: 12,
                        shadowColor: '#FFFF00'
                    }
                },
                zlevel: 1
            }
        ]};
        // 设置top5城市的循环展示,每隔3秒轮换显示
        // @blog http://phping.sinaapp.com
        var j = 0;
        var IntervalId = window.setInterval(function(){
            if (j == 5) j = 0;
            // topCity数组就是top的这个5个城市.
            option.series[1].data = [convertData(data)[j]];
            myChart.setOption(option);
            j++;
        },5000);
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }

        var ss = new Array();
    ss[10]=10;
    ss[11]=11;
        console.log(11111,ss);
})
//数字滚动
var sum = 13000;
function show_num1(n,parent,children) {
    sum=sum+5;
    var it = $(parent);
    var len = String(n).length;
    for(var i = 0; i < len; i++) {
        if(it.length <= i) {
            $(children).append("<i></i>");
        }
        var num = String(n).charAt(i);
        //根据数字图片的高度设置相应的值
        var y = -parseInt(num) * 58;
        var obj = $(parent).eq(i);
        obj.animate({
            backgroundPosition: '(0 ' + String(y) + 'px)'
        },'slow','swing');
    }
}

//获取当前时间
function fillZero(v){
    if(v<10) v='0'+v;
    return v;
}
//显示当前时间
function showTime(){
    var date=new Date();
    var y=date.getFullYear()+"-";
    var M=fillZero(date.getMonth()+1)+"-";
    var d=fillZero(date.getDate());
    var h=fillZero(date.getHours())+":";
    var m=fillZero(date.getMinutes())+":";
    var s=fillZero(date.getSeconds());
    $(".subTitle span:nth-child(2) i:nth-child(1)").text(y+M+d).css({'font-family':'Consolas'});
    $(".subTitle span:nth-child(2) i:nth-child(2)").text(h+m+s).css({'fontfamily':'Consolas'});
}
setInterval(showTime,1000);
