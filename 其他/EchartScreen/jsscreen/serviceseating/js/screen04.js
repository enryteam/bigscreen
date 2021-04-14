/*!
 * project: 
 * author: dongyf
 * date:2016-12-11
 */
(function($) {

    var chartServiceToday, chartProcessTimeByType, chartKnowledgeType;

    var chartoption;
    // 初始化图表
    var initChart = function() {
        // #region 平均受理时间情况分析
        chartServiceToday = echarts.init(document.getElementById('chartservicetoday'));
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
//                    rotate:-45,
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
                name: '件',
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
                },
                itemStyle: {
                    normal: {
                        color: "#2adac4"
                    }
                },
                data: []
            }]
        };
        chartServiceToday.setOption(chartoption);
    }

    initChart();

    //渲染受理时间
    renderServiceToday = function(data) {
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
    renderonGuard = function(data) {
        var $onguardsum = $("#onguardsum");
        for (var i in data) {
            $("div[data-lbl='" + i + "']", $onguardsum).children('em').text(data[i]);
        }
    }

    var requestData = function() {
        Util.ajax({
            url: settings.loaddata,
            success: function(data) {
                renderServiceToday(data.servicetoday);
                renderonGuard(data.onguardsum);
            }
        })
    };
    requestData();

})(jQuery)
