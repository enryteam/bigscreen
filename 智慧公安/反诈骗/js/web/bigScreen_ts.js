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
            url:"json/tableTest.json",
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

    //中国地图
    var mapDom = document.getElementById("map");//地图容器
    var countDom = document.getElementById("thisChart");//当日，当周，月容器
    var myChart = echarts.init(mapDom);
    var countChart = echarts.init(countDom);
    var app = {};
    option = null;
    var geoCoordMap = {
        '上海': [121.4648,31.2891],
        '东莞': [113.8953,22.901],
        '东营': [118.7073,37.5513],
        '中山': [113.4229,22.478],
        '临汾': [111.4783,36.1615],
        '临沂': [118.3118,35.2936],
        '丹东': [124.541,40.4242],
        '丽水': [119.5642,28.1854],
        '乌鲁木齐': [87.9236,43.5883],
        '佛山': [112.8955,23.1097],
        '保定': [115.0488,39.0948],
        '兰州': [103.5901,36.3043],
        '包头': [110.3467,41.4899],
        '北京': [116.4551,40.2539],


    };

    var BJData = [
        [{name:'北京'}, {name:'上海',value:95}],
        [{name:'北京'}, {name:'东莞',value:90}],
        [{name:'北京'}, {name:'兰州',value:80}],
        [{name:'北京'}, {name:'东营',value:70}],
        [{name:'北京'}, {name:'中山',value:50}],
        [{name:'北京'}, {name:'保定',value:40}],
        [{name:'北京'}, {name:'包头',value:30}],
        [{name:'北京'}, {name:'临汾',value:20}]
    ];

    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = geoCoordMap[dataItem[0].name];
            var toCoord = geoCoordMap[dataItem[1].name];
            if (fromCoord && toCoord) {
                res.push({
                    fromName: dataItem[0].name,
                    toName: dataItem[1].name,
                    coords: [fromCoord, toCoord]
                });
            }
        }
        return res;
    };
    var data = [
        {name: '开封', value: 90},
        {name: '济南', value: 92},
        {name: '德阳', value: 93},
        {name: '温州', value: 95},
        {name: '九江', value: 96},
        {name: '邯郸', value: 98},
        {name: '临安', value: 99},
        {name: '兰州', value: 99},
        {name: '沧州', value: 100}
    ];
    var color = ['#a6c84c', '#ffa022', '#46bee9'];
    var series = [];
    [['北京', BJData]].forEach(function (item, i) {
        series.push({
                name: item[0] + ' Top10',
                type: 'lines',
                zlevel: 1,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0.7,
                    color: '#fff',
                    symbolSize: 3
                },
                lineStyle: {
                    normal: {
                        color: color[i],
                        width: 0,
                        curveness: 0.2
                    }
                },
                data: convertData(item[1])
            },
            {
                name: item[0] + ' Top10',
                type: 'lines',
                zlevel: 2,
                symbol: ['none', 'arrow'],
                symbolSize: 10,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0,
                    symbol: "image://img/demo_2.png",
                    symbolSize: 15
                },
                lineStyle: {
                    normal: {
                        color: color[i],
                        width: 1,
                        opacity: 0.6,
                        curveness: 0.2
                    }
                },
                data: convertData(item[1])
            },
            {
                name: item[0] + ' Top10',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                    brushType: 'stroke'
                },
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        formatter: '{b}'
                    }
                },
                symbolSize: function (val) {
                    return val[2] / 8;
                },
                itemStyle: {
                    normal: {
                        color: color[i]
                    }
                },
                data: item[1].map(function (dataItem) {
                    return {
                        name: dataItem[1].name,
                        value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                    };
                })
            });
    });
    option = {
        backgroundColor: 'rgba(23,62,105,0.0)',
        title : {
            show: false
        },
        tooltip : {
            trigger: 'item'
        },
        legend: {
            show: false
        },
        geo: {
            map: 'china',
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
        series: series
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
    //当日，当月，当年
    var option_2 = {
        xAxis: {
            //data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            data : ['移动', '联通', '电信', '通管', '技侦', 'VOS'],
            //设置轴线的属性
            axisLine:{
                lineStyle:{
                    color:'#6ccff0',
                    width:1,//这里是为了突出显示加上的
                }
            },
            axisLabel:{
                textStyle:{
                    color:"#5becf8",
                    fontSize:'20px'
                }
            }
        },
        grid:{
            left:'5%',
            right:'5%',
            bottom:'10%',
            top:'8%'
        },
        yAxis: {
            type: 'value',
            axisLine:{
                lineStyle:{
                    color:'#6ccff0',
                    //width:1,//这里是为了突出显示加上的
                    fontSize:'18px'
                }
            },
            splitLine:{
                show:false
            }
        },
        tooltip : {
            trigger : 'axis',
            showDelay : 0, // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        series: [{
            data: [120, 200, 150, 80, 70, 110],
            name:'当天',
            type: 'bar',
            itemStyle: {
                normal: {
                    barBorderRadius:10,//柱形图圆角，初始化效果
                    color:'#51cef6',
                    label: {
                        show: false,
                        position: 'top',
                        textStyle: {
                            color: '#51cef4'
                        }
                    }
                }
            },
            barWidth:20,//柱图宽度
            barGap:'25%'
        },
            {
                data: [20, 190, 50, 60, 7, 10],
                type: 'bar',
                name:'当周',
                //顶部数字展示pzr
                itemStyle: {
                    normal: {
                        barBorderRadius:10,//柱形图圆角，初始化效果
                        color:'#6495ED',
                        label: {
                            show: false,
                            position: 'top',
                            textStyle: {
                                color: '#6495ED'
                            }
                        }
                    }
                },
                barWidth:20,//柱图宽度
                barGap:'25%'
            },
            {
                data: [20, 190, 50, 60, 7, 10],
                type: 'bar',
                name:'当月',
                //顶部数字展示pzr
                itemStyle: {
                    normal: {
                        barBorderRadius:10,//柱形图圆角，初始化效果
                        color:'#4169E1',
                        label: {
                            show: false,
                            position: 'top',
                            textStyle: {
                                color: '#4169E1'
                            }
                        }
                    }
                },
                barWidth:20,//柱图宽度
                barGap:'25%'
            }]
    };
    if (option_2 && typeof option_2 === "object") {
        countChart.setOption(option_2, true);
    }
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
