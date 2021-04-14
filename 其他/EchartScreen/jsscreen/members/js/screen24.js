/*!
 * project: 
 * author: dongyf
 * date:2016-12-12
 */
 (function($) {

    var chartServiceToday, chartProcessTimeByType, chartKnowledgeType;

    var chartoption;
    // 初始化图表
    var initChart = function() {
        // #region 平均受理时间情况分析
        chartServiceToday = echarts.init(document.getElementById('seasondeal'));
        chartoption = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
            },
            grid: {
                top: 35,
                left: 25,
                right: 30,
                bottom: 40,
                containLabel: true

            },
            xAxis: {
                type: 'category',
                data: [],
                // nameGap:25,
                axisLabel: {
                    interval: 0,
                    textStyle: {
                        color: "#fff",
                        fontSize: 22,
                        fontWeight: 'lighter',
                        fontFamily: "Microsoft YaHei"
                    },
                    margin: 20
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                },
                splitLine: {
                    show: false
                },


            },
            yAxis: [{
                name:'件',
                nameTextStyle: {
                    color: '#fff',
                    fontSize: 22,
                    fontWeight: 'lighter',
                    fontFamily: "Microsoft YaHei"
                },
                nameGap: 15,
                type: 'value',
                axisLabel: {
                    interval: 0,
                    textStyle: {
                        color: "#fff",
                        fontSize: 22,
                        fontWeight: 'lighter',
                        fontFamily: "Microsoft YaHei"
                    },
                    margin: 12
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#aaa',
                        type: "dashed"
                    }
                },
                splitArea:{
                	show:true,
                	areaStyle:{
                		color:['#0b1262','#0a1371']
                	}
                }
            }],
            series: [{
                name: '受理时间',
                type: 'bar',
                barWidth: 40,
                itemStyle: {
                    normal: {
                        color: "#2adac4"
                    }
                },
                data: []
            }]
        };
        chartServiceToday.setOption(chartoption);

        chartForthwith = echarts.init(document.getElementById('chartforthwith'));
        chartOption = {
        		center:[500,50],
            tooltip: {
                formatter: "{a} <br/>{b} : {c}%"
            },
            series: [{
                type: 'gauge',
                radius:'68%',
                title: {
                    offsetCenter: [0, -250],
                    textStyle: {
                        fontSize: 42,
                        fontFamily: "Microsoft YaHei",
                        color: '#fff'
                    }
                
                },
                axisLine: {
                    lineStyle: { 
                        width: 30,
                        color: [
                            [0.3, '#ffa500'],
                            [0.7, '#87ceeb'],
                            [1, '#22ac38']
                        ]
                    }
                },
                axisLabel:{
                	textStyle:{
                		color:'#fff',
                		fontSize:20
                	}
                },
                axisTick:{
                	show:false
                },
                detail: { 
                	formatter: '{value}%',
                	textStyle:{
                		color:'#f7e444',
                		fontSize:35,
                		fontWeight:'bold'
                	},
                	offsetCenter: [0, 110],
                },
                center:['50%','60%'],
                data: [{value:'20',name:'办理结算率'}]
            }]
        };
        chartForthwith.setOption(chartOption);
    }

    initChart();

    //渲染受理时间
    var renderServiceToday = function(data) {
        var lbl = [],
            values = [];
            console.log(data);
        $.each(data, function(i, e) {
            lbl.push(e.name);
            values.push(e.value);
        })
        console.log(lbl,values);
        chartServiceToday.setOption({
            xAxis: {
                data: lbl
            },
            series: {
                data: values
            }
        });
    }
    var renderForthwith = function(data) {
        chartForthwith.setOption({
            series: [{
                name: data[0].name,
                data: [{value: data[0].value,name:data[0].name}]
            }]
        });
    };
    var renderAverage = function(data) {
    	console.log(data);
    	$('#hotline').children('span').text(data[1].name);
    	$('#hotline').children('em').text(data[1].value);
    	$('#depart').children('span').text(data[2].name);
    	$('#depart').children('em').text(data[2].value);
    	// data[2].value;
    };

    var requestData = function() {
        Util.ajax({
            url: settings.loaddata,
            success: function(data) {
                console.log(data);
                renderServiceToday(data.servicetoday);
                renderForthwith(data.forthwith);
                renderAverage(data.forthwith);
            }
        })
    };
    requestData();

})(jQuery)

