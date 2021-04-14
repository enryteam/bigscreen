$(function() {
    var chartefficiency, chartsatisfied;

    var chartoption;

    //初始化图表
    var initChart = function() {

        chartefficiency = echarts.init(document.getElementById('efficiency'));
        chartoption = {
            color: ['#1ad6bb'],
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: 68,
                right: 90,
                bottom: 30,
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                data: ['江苏省法制学院政务服务中心代表人民'],
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    interval: 0,
                    formatter: function(value) {
                        var newParamsName = ""; 
                        var paramsNameNumber = value.length; 
                        var provideNumber = 5; 
                        var rowNumber = Math.ceil(paramsNameNumber / provideNumber); 
                        
                        if (paramsNameNumber > provideNumber) {
                            for (var p = 0; p < rowNumber; p++) {
                                var tempStr = ""; 
                                var start = p * provideNumber; 
                                var end = start + provideNumber; 
                                if (p == rowNumber - 1) {
                                    tempStr = value.substring(start, paramsNameNumber);
                                } else {
                                    tempStr = value.substring(start, end) + "\n";
                                }
                                newParamsName += tempStr; 
                            }

                        } else {
                            newParamsName = value;
                        }
                        return newParamsName
                    },
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'Microsoft Yahei',
                        fontSize: 20
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff',
                    }
                }
            }],
            yAxis: [{
                name: '%',
                type: 'value',
                nameTextStyle: {
                    color: '#fff',
                    fontFamily: 'Microsoft Yahei',
                    fontSize: 22
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'Microsoft Yahei',
                        fontSize: 22
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#666',
                        type: 'dashed'
                    }
                }
            }],
            series: [{
                name: '提速率',
                type: 'bar',
                barWidth: '30%',
                data: []
            }]
        };
        chartefficiency.setOption(chartoption);

        chartsatisfied = echarts.init(document.getElementById('satisfied'));
        chartoption = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['服务单数量', '满意数量', '满意率'],
                textStyle: {
                    color: '#fff',
                    fontSize:22
                }
            },
            color: ['#26c8f7', '#dbc23f', '#00fcff'],
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '50px',
                right: '50px',
                bottom: '3%',
                containLabel: true

            },
            xAxis: [{
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'Microsoft Yahei',
                        fontSize: 22
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                }
            }],
            yAxis: [{
                name: '件',
                type: 'value',
                nameTextStyle: {
                    color: '#fff',
                    fontFamily: 'Microsoft Yahei',
                    fontSize: 22
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'Microsoft Yahei',
                        fontSize: 22
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#666',
                        type: 'dashed'
                    }
                },
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: ['rgba(11,17,84,.75)', 'rgba(255,255,255,.0)']
                    }
                }
            }, {
                name: '%',
                type: 'value',
                nameTextStyle: {
                    color: '#fff',
                    fontFamily: 'Microsoft Yahei',
                    fontSize: 22
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'Microsoft Yahei',
                        fontSize: 22
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                },
                splitLine: {
                    show: false
                }
            }],
            series: [{
                name: '服务单数量',
                type: 'bar',
                barWidth: '20%',
                data: []
            }, {
                name: '满意数量',
                type: 'bar',
                barWidth: '20%',
                data: []
            }, {
                name: '满意率',
                type: 'line',
                yAxisIndex: 1,
                symbolSize: 12,
                symbol: 'circle',
                itemStyle: {
                    normal: {
                        color: '#00fcff'
                    }
                },
                data: []
            }]
        };
        chartsatisfied.setOption(chartoption);

    }

    initChart();

    //省直成员单位办事提速率TOP10
    var renderefficiency = function(data) {
        var nameList = [],
            valueList = [];
        $.each(data, function(i, e) {
            nameList.push(e.name);
            valueList.push(e.value);
        })
        chartefficiency.setOption({
            xAxis: {
                data: nameList
            },
            series: [{
                data: valueList
            }]
        })
    }


    //省直成员单位满意率TOP10
    var rendersatisfied = function(data) {
        var nameList = [],
            valueList_one = [],
            valueList_two = [],
            valueList_three = [];
        $.each(data, function(i, e) {
            nameList.push(e.name);
            valueList_one.push(e.value[0]);
            valueList_two.push(e.value[1]);
            valueList_three.push(e.value[2]);
        })
        chartsatisfied.setOption({
            xAxis: {
                data: nameList
            },
            series: [{
                data: valueList_one
            }, {
                data: valueList_two
            }, {
                data: valueList_three
            }]
        })
    }

    //刷新数据
    var refreshData = function() {
        Util.ajax({
            url: settings.getmember,
            success: function(data) {
                renderefficiency(data.workency);
                rendersatisfied(data.satisfied);
            },
            error: function(error) {
                console.log(error);
            }

        })
    }

    refreshData();

    $(window).on("resize", function() {
        chartefficiency.resize();
        chartsatisfied.resize();
    });
})
