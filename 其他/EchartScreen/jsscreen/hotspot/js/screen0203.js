/*!
 * 热点趋势23
 * author:buly;
 * data:2016-12-14;
 */

(function(win, $) {
    var M = Mustache,
        $riseTbody = $('#rise-tbody'),
        riseTmpl = $('#rise-tmpl').html(),
        $reduceTbody = $('#reduce-tbody'),
        reduceTmpl = $('#reduce-tmpl').html();

    var chartAppeal, //诉求量趋势
        chartWeb, //互联网诉求占比趋势
        chartMap; //地图
    var chartOption;

    //初始化图表
    var initChart = function() {
        //诉求量趋势
        chartAppeal = echarts.init(document.getElementById('chartappeal'));
        chartOption = {

            color: ['#00ffff', '#ffa500'],
            tooltip: {
                trigger: 'axis',
                formatter: function(params) {
                    var tip = [];
                    $.each(params, function(i, e) {
                        if (e.value) {
                            tip.push(e.seriesName + ':' + e.value);
                        }
                    });
                    return tip.join('<br/>');
                }
            },
            legend: {
                x: 'center',
                textStyle: {
                    color: '#fff',
                    fontSize: 26,
                    fontFamily: '方正黑体_GBK'
                },
                itemWidth: 50,
                itemGap: 35,
                data: ['近12个月', '预测后3个月']
            },
            grid: {
                top: 52,
                left: '3%',
                right: '4%',
                bottom: 35,
                containLabel: true
            },
            xAxis: {
                type: 'category',
                offset: 15,
                boundaryGap: false,
                axisTick: {
                    inside: true
                },
                axisLine: {
                    lineStyle: {
                        color: '#ededed'
                    }
                },
                axisLabel: {
                    color: '#fff',
                    interval: 1,
                    textStyle: {
                        fontSize: 22,
                        fontFamily: '方正黑体_GBK'
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#aaa',
                        type: 'dashed'
                    }
                },
                data: []
            },
            yAxis: {
                type: 'value',
                name: '诉求量',
                nameTextStyle: {
                    fontSize: 26,
                    color: '#fff',
                    fontFamily: '方正黑体_GBK'
                },
                nameGap: 15,
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff',
                        fontSize: 22,
                        fontFamily: '方正黑体_GBK'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#ededed'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#aaaaaa',
                        type: 'dashed'
                    }
                }
            },
            series: [{
                name: '近12个月',
                type: 'line',

                symbolSize: 12,
                symbol: 'circle',
                data: []
            }, {
                name: '预测后3个月',
                type: 'line',
                symbolSize: 12,
                symbol: 'circle',
                data: []
            }]
        };
        chartAppeal.setOption(chartOption);

        //互联网诉求占比趋势
        chartWeb = echarts.init(document.getElementById('chartweb'));
        chartOption.yAxis.name = '占比(%)';
        chartWeb.setOption(chartOption);

        //地图
        chartMap = echarts.init(document.getElementById('charmap'));
        chartOption = {
            title : {
                text: '江苏省12345',
                left: 180,
                top:615,
                textStyle:{
                    fontSize:30,
                    color:'#feea44'
                }
            },

            visualMap: {
                type: 'continuous',
                min: 0,
                left: 50,
                bottom: 60,
                text: ['高', '低'],
                calculable: true,
                itemWidth: 25,
                textStyle: {
                    color: "#fff"
                },
                seriesIndex: 0,
                inRange: {
                    color: ['#2f90e7', '#c6e579']
                }
            },
            geo: {
                map: 'jiangsu',
                itemStyle: {
                    normal: {
                        opacity: 0
                    },
                    emphasis: {
                        opacity: 0
                    }
                },
                roam: false,
                zoom: 1.1
            },
            series: [{
                name: "maparea",
                type: 'map',
                zoom:1.1,
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
                            color: '#1b2022',
                            fontSize: 22
                        }
                    }
                },
                itemStyle: {
                    normal: { show: false },
                    emphasis: { borderWidth: 0, borderColor: '#31a5ff', areaColor: '#31a5ff' }
                },
                data: []
            }, {
                name: 'effectline',
                type: 'lines',
                zlevel: 1,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0.4,
                    symbolSize: 4
                },
                lineStyle: {
                    normal: {
                        color: '#fff',
                        width: 0,
                        curveness: 0.3
                    }
                },
                data: []
            }, {
                name: 'normalline',
                type: 'lines',
                zlevel: 2,
                lineStyle: {
                    normal: {
                        color: '#fff',
                        width: 3,
                        opacity: 0.4,
                        curveness: 0.3 //线弯曲度
                    }
                },
                data: []
            }, {
                name: 'effectpoint',
                color: '#fff',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                    brushType: 'stroke'
                },
                zoom: 1,
                symbolSize: 10,
                itemStyle: {
                    normal: {
                        color: '#fff'
                    }
                },
                data: []
            }, {
                name: "point",
                type: 'map',
                top: 20,
                bottom: 110,
                zlevel: 5,
                z: 5,
                mapType: "jiangsu",
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                markPoint: {
                    symbol: 'image://images/locate.png',
                    symbolOffset: [8, -30],
                    symbolSize: [32, 41],
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    data: []
                },
                data: []
            }]
        };
        chartMap.setOption(chartOption);
    };

    //渲染诉求量趋势
    var renderAppeal = function(data) {
        var time = [],
            num01 = [],
            num02 = [];
        $.each(data, function(i, e) {
            if (e.time < 10) {
                e.time = '0' + e.time;
            }
            time.push(e.time);
            if (i < 11) {
                num01.push(e.num);
                num02.push('');
            } else if (i == 11) {
                num01.push(e.num);
                num02.push(e.num);
            } else {
                num01.push('');
                num02.push(e.num);
            }
        });
        chartAppeal.setOption({
            xAxis: {
                data: time
            },
            series: [{
                name: '近12个月',
                data: num01
            }, {
                name: '预测后3个月',
                data: num02
            }]
        });
    };
    //渲染互联网诉求占比趋势
    var renderWeb = function(data) {
        var time = [],
            num01 = [],
            num02 = [];
        $.each(data, function(i, e) {
            time.push(e.time);
            if (i < 11) {
                num01.push(e.num);
                num02.push('');
            } else if (i == 11) {
                num01.push(e.num);
                num02.push(e.num);
            } else {
                num01.push('');
                num02.push(e.num);
            }
        });
        chartWeb.setOption({
            xAxis: {
                data: time
            },
            series: [{
                name: '近12个月',
                data: num01
            }, {
                name: '预测后3个月',
                data: num02
            }]
        });
    };

    //渲染地图
    var renderMap = function(data) {
        var max = 0,
            value = 0,
            lineValue = [], //线
            pointValue = [], //涟漪点
            thingPoint = []; //标记点
        var fromName = '',
            toName = '',
            val = 0,
            sum = 0;
        //区域数据渲染
        $.each(data.area, function(i, e) {
            value = e.value;
            if (max < value) {
                max = value;
            }
        });

        //聚集点、线渲染
        $.each(data.lines, function(i, e) {
            fromName = e[0].fromname;
            toName = e[1].toname;
            val = e[0].value;
            $.each(data.lines, function(i, e) {
                if (e[0].fromName != fromName) {
                    sum += e[0].value;
                }
            });
            if (fromName && toName && (fromName != toName)) {
                lineValue.push({
                    fromName: fromName,
                    toName: toName,
                    value: val,
                    coords: [data.coordJs[fromName], data.coordJs[toName]]
                });
                pointValue.push({
                    value: data.coordJs[fromName].concat(val)
                });
            } else {
                pointValue.push({
                    value: data.coordJs[fromName].concat(sum)
                });
            }
        });

        //事件点、事件框渲染
        $.each(data.locate, function(i, e) {
            e.coord = data.coordJs[e.name];
            thingPoint.push(e);
        });

        //渲染今日汇聚数
        $('#map').find('.map-tot-num').text(sum);

        chartMap.setOption({
            visualMap: {
                max: max
            },
            series: [{
                data: data.area
            }, {
                data: lineValue
            }, {
                data: lineValue
            }, {
                data: pointValue
            }]
        });
        var coordSys = chartMap.getModel().getSeriesByIndex(4).coordinateSystem,
         $mapthings = $('#mapthings');
        function showThings(idx) {
            if (idx >= thingPoint.length) {
                idx = 0;
            }
            var t = thingPoint[idx];
            var point = coordSys.dataToPoint(t.coord);
            var x = t.things.indexOf('市');
            $mapthings.removeClass('hidden').find('.thing').html('<span style="font-size:42px;">'+t.things.slice(0,x+1)+'</span><br/>'+t.things.slice(x+1)).siblings('.time').text(t.time);
            $mapthings.css({ "left": point[0] + 30, "top": point[1] - 165 });
            chartMap.setOption({
                series: [{
                    name: "point",
                    markPoint: {
                        data: [t]
                    }
                }]
            });
            idx++;
            setTimeout(function() { showThings(idx); }, 3000)
        }
        if (thingPoint.length) {
            setTimeout(function() { showThings(0) }, 3000)
        }

    };
    //渲染热点问题增幅TOP5
    var renderRise = function(data) {
        if (data) {
            $riseTbody.html(M.render(riseTmpl, { item: data }));
        }
    };
    //渲染热点问题降幅TOP5
    var renderReduce = function(data) {
        if (data) {
            $reduceTbody.html(M.render(reduceTmpl, { item: data }));
        }
    };

    var requestData = function() {
        Util.ajax({
            url: settings.loaddata,
            success: function(data) {
                renderAppeal(data.appeal);
                renderWeb(data.web);
                renderMap(data.map);
                renderRise(data.rise);
                renderReduce(data.reduce);
            }
        });
    };
    initChart();
    requestData();
}(this, jQuery));
