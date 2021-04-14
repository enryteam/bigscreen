/*!
 * 服务诉求2、3
 * author:buly;
 * data:2016-12-11;
 */

(function(win, $) {
    var chartMapstatus, //全省各地市诉求量情况(地图)
        chartBarstatus, //全省各地市诉求量情况（柱状图）
        chartNumtrend, //全球诉求总量走势
        chartType, //全省诉求类别占比
        chartWebtrend; //互联网诉求走势
    var chartOption;

    //初始化图表
    var initChart = function() {
        // #region 全省各地市诉求量情况（地图）
        chartMapstatus = echarts.init(document.getElementById('chartmapstatus'));
        chartOption = {
            tooltip: {
                trigger: 'item',
                formatter: '{c}'
            },
            visualMap: {
                type: 'continuous',
                min: 0,
                left: '5%',
                bottom: 60,
                itemWidth: 25,
                text: ['高', '低'],
                calculable: true,
                textStyle: {
                    color: "#fff",
                    fontSize: 22
                },
                seriesIndex: 0,
                inRange: {
                    color: ['#2f90e7', '#c6e579']
                }
            },
            series: [{
                type: 'map',
                top: 15,
                bottom: 15,
                zoom: 0.885,
                mapType: "jiangsu",
                selectedMode: 'single',
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            color: '#1b2022',
                            fontSize: 22
                        }
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            color: '#fff',
                            fontSize: 22
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        borderWidth: 0,
                        borderColor: '#31a5ff'
                    },
                    emphasis: {
                        borderWidth: 0,
                        borderColor: '#31a5ff',
                        areaColor: '#CDB01C'
                    }
                },
                data: []
            }]
        };
        chartMapstatus.setOption(chartOption);
        // #endregion
        //全省各地市诉求量情况（柱状图）
        chartBarstatus = echarts.init(document.getElementById('chartbarstatus'));
        chartOption = {
            color: ['#3edada'],
            grid: {
                left: 0,
                right: 100,
                bottom: 100,
                containLabel: true
            },
            xAxis: [{
            	name:'件',
            	nameTextStyle: {
                    color: '#fff',
                    fontSize: 22,
                    fontWeight: 'lighter',
                    fontFamily: "Microsoft YaHei"
                },
                type: 'value',
                splitNumber: 4,
                axisTick: {
                    show: false
                },
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: '#aaa'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff',
                        fontSize: 22,
                    },
                	/*rotate: 45*/
                }
            }],
            yAxis: [{

                type: 'category',
                interval: 0,
                inverse: true,
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
                data: []
            }],
            series: [{
                name: '全省各地市诉求量情况',
                type: 'bar',
                barWidth: '50%',
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        textStyle: {
                            fontSize: 22,
                            color: '#fff'
                        }
                    }
                },
                data: []
            }]
        };
        chartBarstatus.setOption(chartOption);
        // #endregion
        //全球诉求总量走势
        chartNumtrend = echarts.init(document.getElementById('chartnumtrend'));
        chartOption = {
            color: ['#3edada'],
            grid: {
                left: '5%',
                right: '5%',
                bottom: 25,
                show: {
                    show: true
                },
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
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: '#aaa'
                    }
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
                }
            }],
            series: [{
                name: '全球诉求总量走势',
                type: 'bar',
                barWidth: '50%',
                label: {
                    normal: {
                        show: false,
                        
                        position: 'top',
                        textStyle: {
                            fontSize: 22,
                            color: '#fff'
                        }
                    }
                },
                data: []
            }]
        };
        chartNumtrend.setOption(chartOption);
        // #endregion
        //全省诉求类别占比
        chartType = echarts.init(document.getElementById('charttype'));
        chartOption = {
            color: ['#3edada', '#168fff', '#f0805a', '#c6e579'],
            tooltip: {
                trigger: 'item',
                textStyle: {
                    fontSize: 18
                },
                
            },
            series: [{
                type: 'pie',
                radius: '70%',
                center: ['50%', '50%'],
                data: [],
                label: {
                    normal: {
                    	show:true,
                    	formatter: "{b} :{d}%",
                        textStyle: {
                            fontSize: 22
                        }
                    }
                }
            }]
        };
        chartType.setOption(chartOption);
        // #endregion
        //互联网诉求走势
        chartWebtrend = echarts.init(document.getElementById('chartwebtrend'));
        chartOption = {
            color: ['#ffff00'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                textStyle: {
                    fontSize: 18
                }
            },
            grid: {
                left: '5%',
                right: '5%',
                bottom: 25,
                show: {
                    show: true
                },
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
                    interval: 1,
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
                splitNumber: 4,
                axisTick: {
                    show: false
                },
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: '#aaa'
                    }
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
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: ['rgba(11,17,84,0.75)', 'rgba(11,17,84,0)']
                    }
                }
            }],
            series: [{
                name: '互联网诉求走势',
                type: 'line',
                smooth: true,
                data: []
            }]
        };
        chartWebtrend.setOption(chartOption);
        // #endregion
    };

    //渲染全省各地市诉求量情况
    var renderStatus = function(data) {
        var max = 0,
            value = [],
            name = [];
        $.each(data, function(i, e) {
            value.push(e.value);
            name.push(e.name);
            if (max < value[i]) {
                max = value[i];
            }
        });
        chartMapstatus.setOption({
            visualMap: {
                max: max
            },
            series: [{
                data: data
            }]
        });

        chartBarstatus.setOption({
            yAxis: [{
                data: name
            }],
            series: [{
                data: data
            }]
        });
    };

    //渲染服务诉求
    renderAppealNum = function(data) {
        var $seatingsNum = $("#appealnum");
        for (var i in data) {
            $("span[data-lbl='" + i + "']", $seatingsNum).text(data[i]);
        }
    };

    //全球诉求总量走势
    renderNumtrend = function(data) {
        var value = [],
            time = [];

        $.each(data, function(i, e) {
            value.push(e.value);
            time.push(e.time);
        });

        chartNumtrend.setOption({
            xAxis: [{
                data: time
            }],
            series: [{
                data: data
            }]
        });
    };
    
    //全省诉求类别占比
    var renderType = function(data) {
        chartType.setOption({
            series: [{
                data: data
            }]
        });
    };
    
    //互联网诉求走势
    var renderWebtrend = function(data) {
        var value = [],
            time = [];

        $.each(data, function(i, e) {
            value.push(e.value);
            time.push(e.time);
        });

        chartWebtrend.setOption({
            xAxis: [{
                data: time
            }],
            series: [{
                data: data
            }]
        });
    };

    var requestData = function() {
        Util.ajax({
            url: settings.loaddata,
            success: function(data) {
                renderStatus(data.statusnum);
                renderAppealNum(data.appealnum);
                renderNumtrend(data.numtrend);
                renderType(data.typepie);
                renderWebtrend(data.webtrend);
            }
        });
    };

    initChart();
    requestData();
}(this, jQuery));
