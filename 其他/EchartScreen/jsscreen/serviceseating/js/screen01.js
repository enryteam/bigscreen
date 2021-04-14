/*！
*服务座席屏1
*date:2016-12-09
*author: chengang;
*/
(function($) {
    var chartProcessTimeByWay, chartProcessTimeByType, chartKnowledgeType;

    var chartoption;
    // 初始化图表
    var initChart = function() {
        // #region 平均受理时间情况分析
        chartProcessTimeByWay = echarts.init(document.getElementById('chartprocesstimebyway'));
        chartoption = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow' 
                },
                formatter: "{a}<br/>{b}：{c}分钟"
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
                    lineStyle: {
                        color: '#fff'
                    }
                },
                splitLine: {
                    show: false
                }

            },
            yAxis: [{
                name: '分钟',
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
            }],
            series: [{
                name: '受理时间',
                type: 'bar',
                barWidth: 40,
                itemStyle: {
                    normal: {
                        color: "#21d8c0"
                    }
                },
                data: []
            }]
        };
        chartProcessTimeByWay.setOption(chartoption);

        chartProcessTimeByType = echarts.init(document.getElementById('chartprocesstimebytype'));
        chartoption.xAxis.splitArea = {
            areaStyle: {
                color: ["#0b1260", "#0c1369"]
            }
        };
        chartoption.series[0].itemStyle = {
            normal: {
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1, [
                        { offset: 0, color: '#e0b931' },
                        { offset: 1, color: '#c6e579' }
                    ]
                )
            },
            emphasis: {
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1, [
                        { offset: 0, color: '#c6e579' },
                        { offset: 1, color: '#e0b931' }
                    ]
                )
            }
        }
        chartProcessTimeByType.setOption(chartoption);
        // #endregion

        // #region 知识库各类型占比
        chartKnowledgeType = echarts.init(document.getElementById('chartknowledgetype'));

        chartoption = {
            color: ["#f0805a", "#e0b931", "#c6e579", "#60c0dd", "#0084c6", "#4d5dce", "#7e8ae3", "#83a948", "#629fa6", "#d7504b", "#ebc84f", "#33b0b0"],
            tooltip: {
                trigger: 'item',
                formatter: "{b}:{c}({d}%)"
            },
            series: [{
                name: '知识库类型',
                type: 'pie',
                radius: 160,
                label: {
                    normal: {
                        show:true,
                        formatter:'{b}:{d}%',
                        textStyle: {
                            fontSize: 22,
                            fontWeight: 'lighter',
                            fontFamily: "Microsoft YaHei"
                        }
                    }
                },
                center: ['50%', '50%'],
                data: []
            }]
        };
        chartKnowledgeType.setOption(chartoption);

        // #endregion

    }
    initChart();

    //渲染受理时间
    var renderProcessTimeByWay = function(data) {
        var lbl = [], values = [];
        $.each(data, function(i, e) {
            lbl.push(e.name);
            values.push(e.value);
        })
        chartProcessTimeByWay.setOption({
            xAxis: {
                data: lbl
            },
            series: {
                data: values
            }
        });
    }
    var renderProcessTimeByType = function(data) {
        var lbl = [], values = [];
        $.each(data, function(i, e) {
            lbl.push(e.name);
            values.push(e.value);
        })
        chartProcessTimeByType.setOption({
            xAxis: {
                data: lbl
            },
            series: {
                data: values
            }
        });
    }

    //渲染知识库各类型
    var renderKnowledgeType = function(data) {
        chartKnowledgeType.setOption({
            series: [{
                data: data
            }]
        });
    }
    //渲染知识库总数量
    var renderKnowledge = function(data) {
        var $knowledgesum = $("#knowledgesum");
        for (var i in data) {
            $("span[data-lbl='" + i + "']", $knowledgesum).text(data[i]);
        }
    }
    //请求数据
    requestData = function() {
        Util.ajax({
            url: settings.loaddata,
            success: function(data) {
                renderProcessTimeByWay(data.processtimebyway);
                renderProcessTimeByType(data.processtimebytype);
                renderKnowledgeType(data.knowledgetype);
                renderKnowledge(data.knowledge);
            }
        })
    };

    requestData();
    
}(jQuery));

