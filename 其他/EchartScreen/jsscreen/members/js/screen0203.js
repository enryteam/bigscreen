$(function() {
    var chartsatisfied, chartConnectRate;

    var chartoption;

    //仪表盘通用样式代码
    var repeatOption = function(x, y, value, name) {
        return {
            type: 'gauge',
            radius: '68%',
            axisLine: {
                lineStyle: {
                    color: [
                        [0.3, '#ffa500'],
                        [0.7, '#87ceeb'],
                        [1, '#22ac38']
                    ],
                    width: 30
                }
            },
            axisLabel: {
                textStyle: {
                    fontSize: 22,
                    fontWeight: 'lighter',
                    fontFamily: "Microsoft YaHei",
                    color: '#fff',
                }
            },
            axisTick: {
                splitNumber: 5
            },
            pointer: {
                length: "70%"
            },
            title: {
                offsetCenter: [0, -250],
                textStyle: {
                    fontSize: 42,
                    fontWeight: 'lighter',
                    fontFamily: "Microsoft YaHei",
                    color: '#fff'
                }
            },
            detail: {
                formatter: '{value}%',
                offsetCenter: [0, 125],
                textStyle: {
                    fontSize: 30,
                    fontWeight: 'bold',
                    fontFamily: "Microsoft YaHei",
                    color: '#f7e444',
                }
            },
            center: [x, y],
            data: [{
                value: value,
                name: name
            }]
        }
    }

    //初始化图表
    var initChart = function() {

        chartsatisfied = echarts.init(document.getElementById('workline'));
        chartoption = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['交办量', '三方通话'],
                textStyle: {
                    color: '#fff',
                    fontSize: 24
                }
            },
            color: ['#ffa500', '#00ffff'],
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
                data: ['1'],
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
            }],
            series: [{
                name: '交办量',
                type: 'line',
                symbolSize: 10,
                symbol: 'circle',
                data: []
            }, {
                name: '三方通话',
                type: 'line',
                symbolSize: 10,
                symbol: 'circle',
                data: []
            }]
        };
        chartsatisfied.setOption(chartoption);

        chartConnectRate = echarts.init(document.getElementById('workgauge'));
        chartoption = {
            series: []
        };
        chartoption.series.push(repeatOption('15%', '60%', 0, '及时签收率'));
        chartoption.series.push(repeatOption('50%', '60%', 0, '按时办结率'));
        chartoption.series.push(repeatOption('85%', '60%', 0, '办结提速率'));
        chartConnectRate.setOption(chartoption);
    }

    initChart();

    var randerH2 = function(satisfiedhd) {
        console.log(satisfiedhd);
        $('.col-right .head em').eq(0).text(satisfiedhd[0]);
        $('.col-right .head em').eq(1).text(satisfiedhd[1]);
    }

    //近一个月交办量与三方通话量走势-折线图
    var rendersatisfied = function(data) {
        var nameList = [],
            valueList_one = [],
            valueList_two = [];
        $.each(data.over, function(i, e) {
            nameList.push(e.name);
            valueList_one.push(e.value);;
        })
        $.each(data.phone, function(i, e) {
            valueList_two.push(e.value);;
        })
        chartsatisfied.setOption({
            xAxis: {
                data: nameList
            },
            series: [{
                data: valueList_one
            }, {
                data: valueList_two
            }]
        })
    }

    //仪表盘
    var renderConnectRate = function(data) {
        chartConnectRate.setOption({
            series: [{
                data: {
                    value: data.sign,
                    name: '及时签收率'
                }
            }, {
                data: {
                    value: data.finsh,
                    name: '按时办结率'
                }
            }, {
                data: {
                    value: data.speed,
                    name: '办结提速率'
                }
            }]
        });
    }

    var renderMember = function(data) {
        var M = Mustache,
            tem = $('#member-template').html();
        $('#memberCount').prepend(M.render(tem, data));
    }

    //刷新数据
    var refreshData = function() {
        Util.ajax({
            url: settings.getmember,
            dataType: "json",
            success: function(data) {
                rendersatisfied(data.month);
                renderConnectRate(data.dashboard);
                randerH2(data.satisfiedhd);
                $('#member').html(data.count.member);
                $('#city').html(data.count.city);
                $('#work').html(data.count.work);
                $('#satisfied').html(data.count.satisfied + '%');
                renderMember(data);
            },
            error: function(error) {
                console.log(error);
            }

        })
    }

    refreshData();
})
