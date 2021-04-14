/*!
 * 服务诉求屏4
 * author:buly;
 * data:2016-12-11;
 */

(function(win, $) {
    var chartAppeal, //设区市上月诉求
        chartForthwith, //即时答复率
        chartOntime, //按时答复率
        chartSatisfy; //回访满意率
    var chartOption;

    var initChart = function() {
        // #region 设区市上月诉求
        chartAppeal = echarts.init(document.getElementById('chartappeal'));
        chartOption = {
            color: ['#1bd6bc'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                },
                axisLabel: {
                    interval: 0,
                    textStyle: {
                        color: '#fff',
                        fontSize: 22
                    }
                },
                data: []
            }],
            yAxis: [{
               name:'件',
                nameTextStyle: {
                    color: '#fff',
                    fontSize: 22,
                    fontWeight: 'lighter',
                    fontFamily: "Microsoft YaHei"
                },
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff',
                        fontSize: 22
                    }
                },
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: '#aaa'
                    }
                }
            }],
            series: [{
                name: '设区市上月诉求',
                type: 'bar',
                barWidth: '50%',
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            fontSize: 22,
                            color: '#fff',
                            fontFamily: "Microsoft YaHei"
                        }
                    }
                }
            }]
        };
        chartAppeal.setOption(chartOption);
        // #endregion

        // #region 即时答复率
        chartForthwith = echarts.init(document.getElementById('chartforthwith'));
        chartOption = {
            tooltip: {
                formatter: "{a} <br/>{b} : {c}%"
            },
            series: [{
                type: 'gauge',
                radius:'90%',
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
                		fontSize:40
                	},
                	offsetCenter: [0, '70%'],
                },
                data: []
            }]
        };
        chartForthwith.setOption(chartOption);
        // #endregion

        // #region 按时答复率
        chartOntime = echarts.init(document.getElementById('chartontime'));
        chartOntime.setOption(chartOption);
        // #endregion

        // #region 回访满意率
        chartSatisfy = echarts.init(document.getElementById('chartsatisfy'));
        chartSatisfy.setOption(chartOption);
        // #endregion
    };

    //渲染设区市上月诉求
    renderAppeal = function(data) {
        var name = [],
            value = [];
        $.each(data, function(i, e) {
//        	console.log(e);
            name.push(e.name);
            value.push(e.value);
        });
        chartAppeal.setOption({
            xAxis: {
                data: name
            },
            series: {
                data: value
            }
        });
    };

    //渲染即时答复率
    var renderForthwith = function(data) {
        chartForthwith.setOption({
            series: [{
                data: data
            }]
        });
    };

    //渲染按时答复率
    var renderOntime = function(data) {
        chartOntime.setOption({
            series: [{
                data: data
            }]
        });
    };

    //渲染回访满意率
    var renderSatisfy = function(data) {
        chartSatisfy.setOption({
            series: [{
                data: data
            }]
        });
    };

    var requestData = function() {
        Util.ajax({
            url: settings.loaddata,
            success: function(data) {
                renderAppeal(data.arealstrqstnum);
                renderForthwith(data.forthwith);
                renderOntime(data.ontime);
                renderSatisfy(data.satisfy);
            }
        });
    };

    initChart();
    requestData();

    
}(this, jQuery));
