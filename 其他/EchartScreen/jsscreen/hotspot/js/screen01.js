/*！
 *服务座席屏1
 *date:2016-12-09
 *author: chengang;
 */
(function($) {
    var keyCloud, Appealnear;

    var chartoption;
    // 初始化图表
    function changeOpactiy(val, max) {
        return {
            normal: {
                color: 'rgba(' + [
                    255,
                    255,
                    255,
                    val / max
                ].join(',') + ')'
            }
        };
    }
    var initChart = function() {
        // // #region 平均受理时间情况分析
        keyCloud = echarts.init(document.getElementById('keycloud'));



        chartoption = {
            series: [{
                name: 'Google Trends',
                type: 'wordCloud',
                size: ['80%', '80%'],
                textRotation: [0, 360],
                textPadding: 10,
                autoSize: {
                    enable: true,
                    minSize: 14
                },
                data: [{}]
            }]
        };

        keyCloud.setOption(chartoption);


        Appealnear = echarts.init(document.getElementById('appealnear'));
        var datass = [1, 2, 3, 4, 5, 6];
        chartoption = {
            color: ['#1ad6bb'],
            tooltip: {
                show: true
            },
            xAxis: [{
                type: 'category',
                data: [1, 2, 3, 4, 5, 6],
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    interval: 0,
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'Microsoft Yahei',
                        fontSize: 20
                    }
                },
                axisLine: {},
                splitLine: {
                    show: false,
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
                }
            }],
            series: [{
                "type": "line",
                "data": datass,
                symbolSize: 6
            }]
        };

        // 为echarts对象加载数据 
        Appealnear.setOption(chartoption);

    }
    initChart();

    //六月诉求
    var renderAppealnear = function(data) {
        var lbl = [],
            values = [];
        $.each(data, function(i, e) {
            lbl.push(e.name);
            values.push(e.value);
        })
        Appealnear.setOption({
            xAxis: [{
                data: lbl
            }],
            series: [{
                "type": "line",
                "data": values,
                symbolSize: 6
            }]
        });
    }
    // 关键云
    var renderCloud = function(data) {
        var lbl = [],
            values = [];
        $.each(data, function(i, e) {
            lbl.push(e.name);
            values.push(e.value);
        })
        var vmax = Math.max.apply(null, values);
        var datas = [{
            name: "政策法规",
            value: 100,
            itemStyle: {
                normal: {
                    color: 'white'
                }
            }
        }];
        for (var x = 0; x < lbl.length; x++) {
            datas.push({
                name: lbl[x],
                value: values[x],
                itemStyle: changeOpactiy(values[x], vmax)
            });
        };
        console.log(datas);

        keyCloud.setOption({
            series: [{
                name: 'Google Trends',
                type: 'wordCloud',
                size: ['80%', '80%'],
                textRotation: [0, 360],
                textPadding: 10,
                autoSize: {
                    enable: true,
                    minSize: 14
                },
                data: datas
            }]
        });

    }
    //智能识别
    var intelligence = function(data) {
        $intelligence = $('#intelligence');
        $('.title em', $intelligence).text(data.value + '%');
        $('.details span', $intelligence).each(function(i, e) {
            $('.details span', $intelligence).eq(i).text(data.nums[i]);
        })
    }
    //诉求top5
    var appealTab = function(data) {
        $appealtab = $('#appealtab');
        for (var x = 0; x < 5; x++) {
            $('tr', $appealtab).eq(x).children('td').eq(0).text(x + 1);
            $('tr', $appealtab).eq(x).children('td').eq(1).text(data[x].name);
            $('tr', $appealtab).eq(x).children('td').eq(2).text(data[x].value);
        }
    }

    //请求数据
    var requestData = function() {
        Util.ajax({
            url: settings.loaddata,
            success: function(data) {

                renderAppealnear(data.appealnear);
                renderCloud(data.keycloud);
                intelligence(data.intelligence);
                appealTab(data.appealtab)
            }
        })
    };
    requestData();

}(jQuery));
