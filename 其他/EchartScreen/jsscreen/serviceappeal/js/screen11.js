/*!
 * project: 
 * author: dongyf
 * date:2016-12-11
 */
(function($) {

    var appealYesterday, appealAge, appealMedia, appealMedia2;

    var chartoption;
    // 初始化图表
    var initChart = function() {
        // #region 平均受理时间情况分析
        appealYesterday = echarts.init(document.getElementById('appealyesterday'));
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
                bottom: 20,
                containLabel: true

            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: [],
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
                    onZero: true,
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
                    interval: 1,
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
                    onZero: true,
                    lineStyle: {
                        color: '#fff'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#aaa',
                        type: "dashed"
                    }
                }
            }],
            series: [{
                name: '诉求量',
                type: 'line',
                smooth: true,
                lineStyle: {
                    normal: {
                        color: '#00fcff'
                    }
                },
            }]
        };
        appealYesterday.setOption(chartoption);

        appealAge = echarts.init(document.getElementById('appealage'));

        chartoption = {
            tooltip: {},
            radar: {
                name: {
                    textStyle: {
                        fontSize: 22
                    }
                },
                indicator: [{
                    name: '20岁以下',
                    max: 100
                }, {
                    name: '20-30岁',
                    max: 100
                }, {
                    name: '30-40岁',
                    max: 100
                }, {
                    name: '40-50岁',
                    max: 100
                }, {
                    name: '50-60岁',
                    max: 100
                }, {
                    name: '60岁以上',
                    max: 100
                }],
                center: ['30%', '50%'],
                axisTick: {
                    show: true
                },
                axisLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: '#fff'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#05f2d9',
                        width: 3,
                    }
                },
                splitArea: {
                    areaStyle: {
                        color: ['#0b136f', '#0b1261']
                    }
                }
            },
            itemStyle: { normal: { areaStyle: { type: 'default' } } },
            series: [{
                name: '',
                type: 'radar',
                data: [{
                    value: [50, 40, 30, 20, 10, 0],
                    areaStyle: {
                        normal: {
                            color: 'rgba(247, 228, 68, 0.5)'
                        }
                    },
                    lineStyle: {
                        normal: {
                            width: 6,
                            color: 'rgb(247, 228, 68)'
                        }
                    }
                }]
            }]
        };
        appealAge.setOption(chartoption);

        appealMedia = echarts.init(document.getElementById('appealmedia'));

        chartoption = {
            legend: {
                show: false,
                textStyle: {
                    fontSize: 18,
                    color: '#fff'
                },
                itemWidth: 43,
                itemGap: 20,
                itemHeight: 20,
                data: ['咨询', '求助', '投诉', '建议', '表扬']
            },
            grid: {
                left: '3%',
                right: '15%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['人工电话'],
                axisLabel: {
                    interval: 0,
                    textStyle: {
                        color: "#fff",
                        fontSize: 22,
                        fontWeight: 'lighter',
                        fontFamily: "Microsoft YaHei"
                    },
                    // margin: 12
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    // onZero: true,
                    lineStyle: {
                        color: '#fff'
                    }
                },
                splitLine: {
                    show: false
                },


            },
            yAxis: {
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
                }
            },
            series: [{
                name: '咨询',
                type: 'bar',
                stack: 'phone',
                barWidth: 40,
                itemStyle: {
                    normal: {
                        color: '#f0805a'
                    }
                },
                data: []
            }, {
                name: '求助',
                type: 'bar',
                stack: 'phone',
                itemStyle: {
                    normal: {
                        color: '#60c0dd'
                    }
                },
                data: []
            }, {
                name: '投诉',
                type: 'bar',
                stack: 'phone',
                itemStyle: {
                    normal: {
                        color: '#ebc84f'
                    }
                },
                data: []
            }, {
                name: '建议',
                type: 'bar',
                stack: 'phone',
                itemStyle: {
                    normal: {
                        color: '#c6e579'
                    }
                },
                data: []
            }, {
                name: '表扬',
                type: 'bar',
                stack: 'phone',
                itemStyle: {
                    normal: {
                        color: '#90b94f'
                    }
                },
                data: []
            }]
        };
        appealMedia.setOption(chartoption);

        appealMedia2 = echarts.init(document.getElementById('appealmedia2'));

        chartoption = {
            legend: {
                // show: false,
                textStyle: {
                    fontSize: 18,
                    color: '#fff'
                },
                left:-20,
                itemWidth: 43,
                itemGap: 20,
                itemHeight: 20,
                data: ['咨询', '求助', '投诉', '建议', '表扬']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: [ "政务咨询", "网站", "微信", "APP", "微博", "邮件","部门","坐席"],
                axisLabel: {
                    interval: 0,
                    textStyle: {
                        color: "#fff",
                        fontSize: 22,
                        fontWeight: 'lighter',
                        fontFamily: "Microsoft YaHei"
                    },
                    // margin: 12
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    // onZero: true,
                    lineStyle: {
                        color: '#fff'
                    }
                },
                splitLine: {
                    show: false
                },


            },
            yAxis: {
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
                }
            },
            series: [{
                name: '咨询',
                type: 'bar',
                stack: 'phone',
                barWidth: 40,
                itemStyle: {
                    normal: {
                        color: '#f0805a'
                    }
                },
                data: []
            }, {
                name: '求助',
                type: 'bar',
                stack: 'phone',
                itemStyle: {
                    normal: {
                        color: '#60c0dd'
                    }
                },
                data: []
            }, {
                name: '投诉',
                type: 'bar',
                stack: 'phone',
                itemStyle: {
                    normal: {
                        color: '#ebc84f'
                    }
                },
                data: []
            }, {
                name: '建议',
                type: 'bar',
                stack: 'phone',
                itemStyle: {
                    normal: {
                        color: '#c6e579'
                    }
                },
                data: []
            }, {
                name: '表扬',
                type: 'bar',
                stack: 'phone',
                itemStyle: {
                    normal: {
                        color: '#90b94f'
                    }
                },
                data: []
            }]
        };
        appealMedia2.setOption(chartoption);
    }

    initChart();



    //渲染受理时间
    var renderAppealYesterday = function(data) {
        var lbl = [],
            values = [];
        $.each(data, function(i, e) {
            lbl.push(e.name);
            values.push(e.value);
        })
        appealYesterday.setOption({
            xAxis: {
                data: lbl
            },
            series: {
                data: values
            }
        });
    }
    var getmax = function(arr) {
        var x = Math.max.apply(null, arr);
        for (var i = 0; i < arr.length; i++) {
            if (x == arr[i]) {
                return i
            }
        }
    }

    var renderonGuard = function(data) {
        var lbl = [],
            values = [];
        $.each(data, function(i, e) {
            lbl.push(e.name);
            values.push(e.value);
        })

        appealAge.setOption({
            radar: {
                indicator: [{
                    name: lbl[0],
                    max: 100
                }, {
                    name: lbl[1],
                    max: 100
                }, {
                    name: lbl[2],
                    max: 100
                }, {
                    name: lbl[3],
                    max: 100
                }, {
                    name: lbl[4],
                    max: 100
                }, {
                    name: lbl[5],
                    max: 100
                }]
            },
            series: {
                data: [{
                    value: values,
                    areaStyle: {
                        normal: {
                            color: 'rgba(247, 228, 68, 0.5)'
                        }
                    },
                    lineStyle: {
                        normal: {
                            width: 6,
                            color: 'rgb(247, 228, 68)'
                        }
                    }
                }]
            }
        });
        // $('#years').text('30-50岁');
    }

    var renderAppealMedia = function(data) {
        console.log(data);
        appealMedia.setOption({
            series: [{
                name: '咨询',
                data: data.nums[0].nums.slice(0, 1)
            }, {
                name: '求助',
                data: data.nums[4].nums.slice(0, 1)
            }, {
                name: '投诉',
                data: data.nums[2].nums.slice(0, 1)
            }, {
                name: '建议',
                data: data.nums[1].nums.slice(0, 1)
            }, {
                name: '表扬',
                data: data.nums[5].nums.slice(0, 1)
            }]
        })

    }
    var renderAppealMedia2 = function(data) {
        console.log(data);
        appealMedia2.setOption({
            series: [{
                name: '咨询',
                data: data.nums[0].nums.slice(1)
            }, {
                name: '求助',
                data: data.nums[4].nums.slice(1)
            }, {
                name: '投诉',
                data: data.nums[2].nums.slice(1)
            }, {
                name: '建议',
                data: data.nums[1].nums.slice(1)
            }, {
                name: '表扬',
                data: data.nums[5].nums.slice(1)
            }]
        })

    }

    var requestData = function() {
        Util.ajax({
            url: settings.loaddata,
            success: function(data) {
                renderAppealYesterday(data.appealyesterday);
                renderonGuard(data.onguardsum);
                renderAppealMedia(data.appealmedia);
                renderAppealMedia2(data.appealmedia);
            }
        })
    };
    requestData();

})(jQuery)
