// 广告内容发布
var guanggaoneirong
function guanggaoneirong() {
    guanggaoneirong=getData(dapingData.guanggaoneirong,dapingData.address).values
}
guanggaoneirong();
// 监测数量
var leijijianceliang
function leijijianceliang() {
    leijijianceliang=getData(dapingData.leijijianceliang,dapingData.address);
    // console.log(leijijianceliang.values[0].data);
    $("#jianceshuliang").text(leijijianceliang.values[0].data);
}
leijijianceliang();
// 违法数量
var weifashuliang
function weifashuliang() {
    weifashuliang=getData(dapingData.weifashuliang,dapingData.address);
    // console.log(leijijianceliang.values[0].data);
    $("#weifashuliang").text(weifashuliang.values[0].data);
}
weifashuliang();
// 违法率
var weifalv
function weifalv() {
    weifalv=getData(dapingData.weifalv,dapingData.address);
    // console.log(leijijianceliang.values[0].data);
    weifalv=(weifalv.values[0].data*100).toFixed(2);
    $("#weifalv").text(weifalv+'%');
}
weifalv();
// 刊例金额
var kanlijine
function kanlijine() {
    kanlijine=getData(dapingData.kanlijinex,dapingData.address);
    // console.log(leijijianceliang.values[0].data);
    $("#kanlijine").text((kanlijine.values[0].data/10000).toFixed(2));
}
kanlijine();

// 月监测数量
var yuejianceshuliang
function yuejianceshuliang() {
    yuejianceshuliang=getData(dapingData.yuejianceshuliang,dapingData.address);
    // console.log(leijijianceliang.values[0].data);
    $("#yuejianceshuliang").text(yuejianceshuliang.values[0].data);
}
yuejianceshuliang();
// 月违法数量
var yueweifashuliang
function yueweifashuliang() {
    yueweifashuliang=getData(dapingData.yueweifashuliang,dapingData.address);
    // console.log(leijijianceliang.values[0].data);
    $("#yueweifashuliang").text(yueweifashuliang.values[0].data);
}
yueweifashuliang();
// 月违法率
var yueweifalv
function yueweifalv() {
    yueweifalv=getData(dapingData.yueweifalv,dapingData.address);
    // console.log(leijijianceliang.values[0].data);
    yueweifalv=(yueweifalv.values[0].data*100).toFixed(2)
    // console.log(weifalv);
    $("#yueweifalv").text(yueweifalv+'%');
}
yueweifalv();
// 月刊例金额
var yuekanlijine
function yuekanlijine() {
    yuekanlijine=getData(dapingData.yuekanlijine,dapingData.address);
    // console.log(leijijianceliang.values[0].data);
    $("#yuekanlijine").text((yuekanlijine.values[0].data/10000).toFixed(2));
}
yuekanlijine();




$(document).ready(function () {
    $(".container").height($(window).height())
})
//右上方时间
function getTime() {
    var time = new Date();
    $("#nowTime").html(time.getFullYear() + "-" + time.getMonth() + 1 + "-" + ling(time.getDate()) + "-" + ling(time.getHours()) + ":" + ling(time.getMinutes()) + ":" + ling(time.getSeconds()))
    setTimeout(getTime, 1000)
}
function ling(x){
    if(x<10){
        return "0"+x;
    }else{
        return x;
    }
}
getTime();

//媒体发布量（条次）占比
~function(){
    var myChart = echarts.init(document.getElementById('leftTop'));
    let option = {
        color:["#00EAE2","#008D9C","#00BCC5","#ABD8DF"],
        tooltip : {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        series : [
            {
                name: '',
                type: 'pie',
                center:["50%","60%"],
                radius: ['40%', '70%'],
                data:[
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                label:{
                    normal:{
                        color:"white",
                        formatter:"{b}\n{d}%",
                        lineHeight:18,
                        fontSize:16,
                        rich:{

                        }
                    }
                },
            }
        ]
    };
    var currentIndex = -1;

    setInterval(function () {
        var dataLen = option.series[0].data.length;
        // 取消之前高亮的图形
        myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: currentIndex
        });
        currentIndex = (currentIndex + 1) % dataLen;
        // 高亮当前图形
        myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: currentIndex
        });
        // 显示 tooltip
        myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: currentIndex
        });
    }, 2000);

    window.shuju1=function(){
        var meitifabuliang=getData(dapingData.meitifabuliang,dapingData.address).values
        option.series[0].data=[];
        for(var i=0;i<meitifabuliang.length;i++){
            var a={value:meitifabuliang[i][1].data ,name: meitifabuliang[i][0].data };
            option.series[0].data.push(a);
        }
        myChart.setOption(option);
    }
    shuju1();
}();
//媒体刊列金额占比
+function(){
    var leftmiddleChart = echarts.init(document.getElementById('leftmiddle'));
    optionmeiti = {
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)"
        },
        color:["#00EAE2","#4A80FE","#00BCC5","#BFA0DA"],
        series: [
            {
                name:'访问来源',
                type:'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                label:{
                    normal:{
                        color:"white",
                        formatter:"{b}\n{d}%",
                        lineHeight:18,
                        fontSize:16,
                        rich:{

                        }
                    }
                },
                data:[
                    {value:335, name:'平面'},
                    {value:310, name:'电视'},
                    {value:234, name:'广告'},
                    {value:135, name:'网络'},
                ],

            }
        ]
    };
    var value=getData(dapingData.meitikanlijine,dapingData.address).values;
    optionmeiti.series[0].data=[];
    for(x of value){
        optionmeiti.series[0].data.push({value:x[1].data,name:x[0].data})
    }

    var currentIndexleftmiddle = -1;

    setInterval(function () {
        var dataLen = optionmeiti.series[0].data.length;
        // 取消之前高亮的图形
        leftmiddleChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: currentIndexleftmiddle
        });
        currentIndexleftmiddle = (currentIndexleftmiddle + 1) % dataLen;
        // 高亮当前图形
        leftmiddleChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: currentIndexleftmiddle
        });
        // 显示 tooltip
        leftmiddleChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: currentIndexleftmiddle
        });
    }, 2000);

    leftmiddleChart.setOption(optionmeiti);
}();
//刊例与国民经济指标对比
-function(){
    var leftdownChart = echarts.init(document.getElementById('leftdown'));
    optionzuoxia = {
        color:["#ABD8DF","#008D9C","#EAD01E","#00F0B7"],
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}'
        },
        legend: {
            left: 'left',
            data: ['广告金额', 'GDP(单位:亿)','CPI',"PPI"],
            textStyle:{
                color:'#FFFFFF'
            }

        },
        xAxis: {
            nameTextStyle:'white',
            type: 'category',
            name: 'x',
            splitLine: {show: false},
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月','10月','11月','12月'],
            axisLine: {
                lineStyle: {
                    color: '#FFFFFF',
                    width: 1,//这里是为了突出显示加上的
                }
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        yAxis: [
            {
            splitLine: {show: false},
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#FFFFFF',
                    width: 1,//这里是为了突出显示加上的
                }
            },
        },
            {
                splitLine: {show: false},
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#FFFFFF',
                        width: 1,//这里是为了突出显示加上的
                    }
                }
            },
        ],
        series: [
            {
                name: '广告金额',
                type: 'line',
                data: [5, 3, 6, 7, 8, 9, 7, 5, 6],
                lineStyle:{
                    normal:{
                        width:5
                    }

                }
            },
            {
                name: 'GDP(单位:亿)',
                type: 'line',
                data: [8, 5, 4, 3, 5, 7, 5, 4, 6],
                lineStyle:{
                    normal:{
                        width:5
                    }

                }
            },
        ]
    };
    //dapingData.weifafabutiaoci.metadata[2].jaql.filter.members=["2017-12-01T00:00:00"];
    var value=getData(dapingData.kanlijine,dapingData.address);
    optionzuoxia.legend.data=[];
    optionzuoxia.xAxis.data=[];
    optionzuoxia.series=[];
    //添加图例数据和数据结构
    for(let x=1;x<value.headers.length;x++){
        optionzuoxia.legend.data.push(value.headers[x]);
        optionzuoxia.series.push({
            name: value.headers[x],
            type: 'line',
            data: [],
            lineStyle:{
                normal:{
                    width:5
                }
            }
        })
    }
    //添加数据
    for(let x=0;x<value.values.length;x++){
        optionzuoxia.xAxis.data.push(value.values[x][0].text);
        for(let z=1;z<value.values[0].length;z++){
            optionzuoxia.series[z-1].data.push(value.values[x][z].data)
        }
    }
    leftdownChart.setOption(optionzuoxia);
}();
//地图
[function(){
    var mapChart = echarts.init(document.getElementById('ditu'));

    var data = [

    ];
    var value=getData(dapingData.ditu,dapingData.address).values;

    for(var x=0;x<value.length;x++){
        var a={name:value[x][0].data,value:value[x][1].data};
        data.push(a);
    }
    var geoCoordMap = {
        '湖北':[114.31,30.60],
        '湖南':[112.994777,28.134326],
        '四川':[104.074042,30.656856],
        '山东':[117.03894,36.676941],
        '河南':[113.683495,34.754869],
        '新疆':[87.613926,43.830254],
        '宁夏':[106.239159,38.493373],
        '江苏':[118.795423,32.05625],
        '陕西':[108.954644,34.279865],
        '福建':[119.301297,26.08116],
        '河北':[114.519349,38.050704],
        '北京':[116.417983,39.916017],
        '天津':[117.210098,39.093892],
        '甘肃':[103.834203,36.069899],
        '浙江':[120.2107,30.255328],
        '广西':[108.37649,22.818871],
        '黑龙江':[126.651831,45.76624],
        '云南':[102.716416,25.0513],
        '广东':[113.269554,23.138215],
        '重庆':[106.559009,29.566734],
        '安徽':[117.281097,31.853865],
        '吉林':[126.585531,43.86541],
        '青海':[101.778413,36.622756],
        '辽宁':[123.452271,41.807276],
        '内蒙古':[111.750759,40.848265],
        '山西':[112.553278,37.877323],
        '西藏':[91.120318,29.653647],
        '上海':[121.480539,31.237164],
        '贵州':[106.694354,26.615658],
        '海南':[110.338289,20.02716],
        '江西':[115.871729,28.689549]
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
    optionditu = {
        tooltip : {
            trigger: 'item',
            // formatter:"{a}",
            formatter:function(params){
                return params.name+":   "+params.value[2]
            }
        },
        geo: {
            map: 'china',
            zoom:1.2,

            label: {
                emphasis: {
                    show: true
                }
            },

            roam: false,
            itemStyle: {
                normal: {
                    areaColor: '#008D9C',
                    borderColor: '#90d4ca'
                },
                emphasis: {
                    areaColor: '#2a333d'
                }
            }

        },
        series : [
            {

                // name: 'pm2.5',
                type: 'effectScatter',
                symbolSize: function (val) {
                    return val[1] / 2000;
                },
                coordinateSystem: 'geo',
                data: convertData(data),

                symbolSize: function (val) {
                    return val[2] / 2000;
                },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false,
                        // color: 'yellow'
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#ddb926'

                    }
                },

            },
            {
                // name: 'pm2.5',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: convertData(data.sort(function (a, b) {
                    return b.value - a.value;
                }).slice(0, 6)),
                symbolSize: function (val) {
                    return val[2] / 2000;
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
                        color: '#f4e925',
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                zlevel: 1
            }
        ]
    };
    mapChart.setOption(optionditu);
}()];
//违法、广告发布趋势
!function(){
    var leftdownChart = echarts.init(document.getElementById('middle-down_left'));
    optionzuoxia = {
        color:["#EAD01E","#00F0B7"],
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}'
        },
        legend: {
            left: 'left',
            data: ['本期违法量','同期违法量'],
            textStyle:{
                color:'#FFFFFF'
            }

        },
        xAxis: {
            nameTextStyle:'white',
            type: 'category',
            name: 'x',
            splitLine: {show: false},
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月','10月','11月','12月'],
            axisLine: {
                lineStyle: {
                    color: '#FFFFFF',
                    width: 1,//这里是为了突出显示加上的
                }
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        yAxis: {
            splitLine: {show: false},
            type: 'log',
            name: 'y',
            axisLine: {
                lineStyle: {
                    color: '#FFFFFF',
                    width: 1,//这里是为了突出显示加上的
                }
            }
        },
        series: [

            {
                name: '本期违法量',
                type: 'line',
                data: [15, 13, 26, 37, 18, 29, 17, 15, 6],
                lineStyle:{
                    normal:{
                        width:5
                    }

                },
            },
            {
                name: '同期违法量',
                type: 'line',
                data: [18, 25, 14, 13, 25, 37, 15, 14, 6],
                lineStyle:{
                    normal:{
                        width:5
                    }

                }
            },
        ]
    };
    //dapingData.weifafabutiaoci.metadata[2].jaql.filter.members=["2017-12-01T00:00:00"];
    var value=getData(dapingData.weifafabuqushi,dapingData.address);
    optionzuoxia.legend.data=[];
    optionzuoxia.xAxis.data=[];
    optionzuoxia.series=[];
    //添加图例数据和数据结构
    for(let x=1;x<value.headers.length;x++){
        optionzuoxia.legend.data.push(value.headers[x]);
        optionzuoxia.series.push({
            name: value.headers[x],
            type: 'line',
            data: [],
            lineStyle:{
                normal:{
                    width:5
                }
            }
        })
    }
    //添加数据
    for(let x=0;x<value.values.length;x++){
        optionzuoxia.xAxis.data.push(value.values[x][0].text);
        for(let z=1;z<value.values[0].length;z++){
            optionzuoxia.series[z-1].data.push(value.values[x][z].data)
        }
    }

    optionzuoxia1 = {
        color:["#EAD01E","#00F0B7"],
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}'
        },
        legend: {
            left: 'left',
            data: ['本期检测量','同期检测量'],
            textStyle:{
                color:'#FFFFFF'
            }

        },
        xAxis: {
            nameTextStyle:'white',
            type: 'category',
            name: 'x',
            splitLine: {show: false},
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月','10月','11月','12月'],
            axisLine: {
                lineStyle: {
                    color: '#FFFFFF',
                    width: 1,//这里是为了突出显示加上的
                }
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        yAxis: {
            splitLine: {show: false},
            type: 'log',
            name: 'y',
            axisLine: {
                lineStyle: {
                    color: '#FFFFFF',
                    width: 1,//这里是为了突出显示加上的
                }
            }
        },
        series: [

            {
                name: '本期检测量',
                type: 'line',
                data: [35, 03, 36, 27, 18, 39, 27, 15, 26],
                lineStyle:{
                    normal:{
                        width:5
                    }

                },
            },
            {
                name: '同期检测量',
                type: 'line',
                data: [38, 25, 14, 3, 25, 33, 18, 14, 16],
                lineStyle:{
                    normal:{
                        width:5
                    }

                }
            },
        ]
    };
    //dapingData.weifafabutiaoci.metadata[2].jaql.filter.members=["2017-12-01T00:00:00"];
    var value=getData(dapingData.guanggaofabuqushi,dapingData.address);
    optionzuoxia1.legend.data=[];
    optionzuoxia1.xAxis.data=[];
    optionzuoxia1.series=[];
    //添加图例数据和数据结构
    for(let x=1;x<value.headers.length;x++){
        optionzuoxia1.legend.data.push(value.headers[x]);
        optionzuoxia1.series.push({
            name: value.headers[x],
            type: 'line',
            data: [],
            lineStyle:{
                normal:{
                    width:5
                }
            }
        })
    }
    //添加数据
    for(let x=0;x<value.values.length;x++){
        optionzuoxia1.xAxis.data.push(value.values[x][0].text);
        for(let z=1;z<value.values[0].length;z++){
            optionzuoxia1.series[z-1].data.push(value.values[x][z].data)
        }
    }
    leftdownChart.setOption(optionzuoxia1);

    //图形轮换
    var boolx=true;
    setInterval(function(){
        if(boolx){
            $(".qiehuan_1").text("违法发布趋势");
            leftdownChart.setOption(optionzuoxia);
            boolx=!boolx;
        }else{
            $(".qiehuan_1").text("广告发布趋势");
            leftdownChart.setOption(optionzuoxia1);
            boolx=!boolx;
        }
    },2000)
}();
//违法类型占比
void function(){
    var myChart = echarts.init(document.getElementById('middle-down_right'));
    option = {
        color:["#00EAE2","#4A80FE"],
        tooltip : {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        series : [
            {
                name: '',
                type: 'pie',
                radius : '60%',
                center: ['50%', '50%'],
                data:[
                    {value:310, name:'严重违法'},
                    {value:35, name:'一般违法'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                label:{
                    normal:{
                        color:"white",
                        formatter:"{b}\n{d}%",
                        lineHeight:18,
                        fontSize:16,
                        rich:{
                        }
                    }
                },
            }
        ]
    };
    //dapingData.weifafabutiaoci.metadata[2].jaql.filter.members=["2017-12-01T00:00:00"];
    var value=getData(dapingData.weifaleixing,dapingData.address).values;
    option.series[0].data=[];
    for(x of value){
        option.series[0].data.push({value:x[1].data,name:x[0].data})
    }
    var currentIndex = -1;

    setInterval(function () {
        var dataLen = option.series[0].data.length;
        // 取消之前高亮的图形
        myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: currentIndex
        });
        currentIndex = (currentIndex + 1) % dataLen;
        // 高亮当前图形
        myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: currentIndex
        });
        // 显示 tooltip
        myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: currentIndex
        });
    }, 2000);
    myChart.setOption(option);
}();
//违法、广告内容类别发布条次占比
[function(){
    var leftmiddleChart = echarts.init(document.getElementById('rightTop'));
    optionmeiti = {
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)"
        },
        color:["#00EAE2","#4A80FE","#00BCC5","#BFA0DA"],
        series: [
            {
                type:'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                label:{
                    normal:{
                        color:"white",
                        formatter:"{b}\n{d}%",
                        lineHeight:18,
                        fontSize:16,
                        rich:{

                        }
                    }
                },
                data:[
                    {value:335, name:'平面'},
                ],

            }
        ]
    };
    var value=getData(dapingData.weifafabutiaoci,dapingData.address).values
    optionmeiti.series[0].data=[];
    for(x of value){
        optionmeiti.series[0].data.push({value:x[1].data,name:x[0].data})
    }
    optionmeiti1 = {
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)"
        },
        color:["#00EAE2","#4A80FE","#00BCC5","#BFA0DA"],
        series: [
            {
                type:'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                label:{
                    normal:{
                        show: true,
                        color:"white",
                        formatter:"{b}\n{d}%",
                        lineHeight:18,
                        fontSize:16,
                        rich:{

                        }
                    }
                },
                data:[
                ],
            }
        ]
    };
    optionmeiti1.series[0].data=[];
    for(var i=0;i<guanggaoneirong.length;i++){
        var a={value:guanggaoneirong[i][1].data ,name: guanggaoneirong[i][0].data };
        optionmeiti1.series[0].data.push(a);
    }
    var currentIndexleftmiddle = -1;

    var boolx=true;
    setInterval(function(){
        if(boolx){
            $(".qiehuan_2").text("广告内容类别发布条次占比");
            leftmiddleChart.setOption(optionmeiti1);
            boolx=!boolx;
        }else{
            $(".qiehuan_2").text("违法发布条次占比");
            leftmiddleChart.setOption(optionmeiti);
            boolx=!boolx;
        }
    },5000)

    setInterval(function () {
        var dataLen = optionmeiti.series[0].data.length;
        // 取消之前高亮的图形
        leftmiddleChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: currentIndexleftmiddle
        });
        currentIndexleftmiddle = (currentIndexleftmiddle + 1) % dataLen;
        // 高亮当前图形
        leftmiddleChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: currentIndexleftmiddle
        });
        // 显示 tooltip
        leftmiddleChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: currentIndexleftmiddle
        });
    }, 2000);
    leftmiddleChart.setOption(optionmeiti);
}()];
//地区违法量、率排名前十
~function(){
    var echartsx = echarts.init(document.getElementById('rightMiddle'));
    var optionxx = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            },
            formatter:"{b} <br> {a0}  {c0} <br> {a1}  {c1}%"
        },
        legend: {
            data:['违法量','违法率'],
            top:20,
            textStyle:{
                color:"white"
            }
        },
        xAxis: [
            {
                type: 'category',
                data: ['山西','大同','太原','北京','吉林','河北','浙江','云南','陕西','非洲'],
                axisPointer: {
                    type: 'shadow',
                },
                axisLabel: {
                    color:["white"],
                },
                axisLine:{
                    lineStyle:{
                        color:"white"
                    },
                }

            }
        ],
        yAxis: [
            {   splitLine: {show: false},
                type: 'value',
                axisLabel: {
                    formatter: '{value}',
                    color:["white"],
                },
                axisLine:{
                    lineStyle:{
                        color:"white"
                    },
                }
            },
            {   splitLine: {show: false},
                type: 'value',
                axisLabel: {
                    formatter: '{value}%',
                    color:["white"],
                },
                axisLine:{
                    lineStyle:{
                        color:"white"
                    },
                }
            }
        ],
        series: [
            {
                name:'违法量',
                type:'bar',
                color:["#00EAE2"],
                data:[2.0, 4.9, 7.0, 23.2, 25.6, 46.7, 35.6, 62.2, 32.6, 20.0]
            },
            {
                name:'违法率',
                type:'line',
                yAxisIndex: 1,
                color:["#EAD01E"],
                data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5],
            }
        ]
    };
    //dapingData.weifafabutiaoci.metadata[2].jaql.filter.members=["2017-12-01T00:00:00"];
    var value=getData(dapingData.diquweifaliang,dapingData.address).values;
    optionxx.xAxis[0].data=[];
    optionxx.series[0].data=[];
    optionxx.series[1].data=[];
    for(x of value){
        optionxx.xAxis[0].data.push(x[0].data);
        optionxx.series[0].data.push(x[1].data);
        optionxx.series[1].data.push((x[2].data*100).toFixed(2));
    }
    var optionxx1 = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            },
            formatter:"{b} <br> {a0}  {c0} <br> {a1}  {c1}%"
        },
        legend: {
            data:['违法量','违法率'],
            top:20,
            textStyle:{
                color:"white"
            }
        },
        xAxis: [
            {
                type: 'category',
                data: ['山西','大同','太原','北京','吉林','河北','浙江','云南','陕西','非洲'],
                axisPointer: {
                    type: 'shadow',
                },
                axisLabel: {
                    color:["white"],
                },
                axisLine:{
                    lineStyle:{
                        color:"white"
                    },
                }

            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    formatter: '{value}',
                    color:["white"],
                },
                axisLine:{
                    lineStyle:{
                        color:"white"
                    },
                }
            },
            {
                type: 'value',
                axisLabel: {
                    formatter: '{value}%',
                    color:["white"],
                },
                axisLine:{
                    lineStyle:{
                        color:"white"
                    },
                }
            }
        ],
        series: [
            {
                name:'违法量',
                type:'bar',
                color:["#00EAE2"],
                data:[12.0, 24.9, 17.0, 43.2, 35.6, 6.7, 35.6, 12.2, 32.6, 2.0]
            },
            {
                name:'违法率',
                type:'line',
                yAxisIndex: 1,
                color:["#EAD01E"],
                data:[5.0, 12.2, 5.3, 8.5, 16.3, 10.2, 13.3, 23.4, 3.0, 6.5]
            }
        ]
    };
    //dapingData.weifafabutiaoci.metadata[2].jaql.filter.members=["2017-12-01T00:00:00"];
    var value=getData(dapingData.diquweifalv,dapingData.address).values
    optionxx1.xAxis[0].data=[];
    optionxx1.series[0].data=[];
    optionxx1.series[1].data=[];
    for(x of value){
        optionxx1.xAxis[0].data.push(x[0].data);
        optionxx1.series[0].data.push(x[1].data);
        optionxx1.series[1].data.push((x[2].data*100).toFixed(2));
    }


    var boolx=true;
    setInterval(function(){
        if(boolx){
            $(".qiehuan_3").text("地区违法量排名前十");
            echartsx.setOption(optionxx);
            boolx=!boolx;
        }else{
            $(".qiehuan_3").text("地区违法率排名前十");
            echartsx.setOption(optionxx1);
            boolx=!boolx;
        }
    },2000)
    echartsx.setOption(optionxx);


}();
//违法处理情况统计
~function(){
    var echartsx = echarts.init(document.getElementById('rightBottom'));
    option = {
        color: ['#00EAE2'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top:"10%",
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                    alignWithLabel: true
                },
                axisLine:{
                    lineStyle:{
                        color:"white"
                    }
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLine:{
                    lineStyle:{
                        color:"white"
                    }
                }
            }
        ],
        series : [
            {
                name:'直接访问',
                type:'bar',
                barWidth: '60%',
                data:[10, 52, 200, 334, 390, 330, 220]
            }
        ]
    };
    //dapingData.weifafabutiaoci.metadata[2].jaql.filter.members=["2017-12-01T00:00:00"];
    var value=getData(dapingData.weifachuli,dapingData.address).values;
    option.series[0].data=[];
    option.xAxis[0].data=[];
    for(x of value){
        option.xAxis[0].data.push(x[0].data);
        option.series[0].data.push({value:x[1].data,name:x[0].data})
    }
    echartsx.setOption(option);
}()
//总体定时
setInterval(function(){
    shuju1();
},6000)