/*!
 * project: 
 * author: dongyf
 * date:2016-12-15
 */

$(function() {
    var chartsatisfied, chartstate;

    var chartoption;

    //初始化图表
    var initChart = function() {

        chartsatisfied = echarts.init(document.getElementById('replyontime'));
        chartoption = {
            rtooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            series: [{
                hoverAnimation: false,
                color: ['#d2d2d2', '#e99f19'],
                name: '访问来源',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                center: ['50%', '40%'],
                label: {
                    normal: {
                        show: true,
                        position: 'center',
                        textStyle: {
                            fontSize: '52',
                            fontWeight: 'bold'
                        }
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '52',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [355, 355]
            }]
        }
        chartsatisfied.setOption(chartoption);

        chartstate = echarts.init(document.getElementById('state'));
        chartoption = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            textStyle: {
                fontSize: '22'
            },
            series: [{
                name: '访问来源',
                type: 'pie',
                color: ['#168fff', '#b661f1', '#c6e579'],
                textStyle: {
                    fontSize: '66'
                },
                center: ['50%', '40%'],
                data: [
                    { value: 500, name: '直接访问' },
                    { value: 310, name: '邮件营销' },
                    { value: 234, name: '联盟广告' }
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        }
        chartstate.setOption(chartoption);
    }

    initChart();

    var rendersatisfied = function(data) {
        var namelist = [],
            valuelist = [];
        $.each(data, function(i, e) {
            valuelist.push(e);
        });
        var x = data[0] / (data[0] + data[1]) * 100;
        $('.poss').text(x.toString().slice(0, 4) + '%');
        chartsatisfied.setOption({
            series: [{
                data: valuelist
            }]
        })
    }

    var renderState = function(data) {
        var namelist = [],
            valuelist = [];

        $.each(data, function(i, e) {
            namelist.push(e.name);
            valuelist.push(e.value);
        })

        chartstate.setOption({
            series: [{
                data: [{
                    name: namelist[0],
                    data: valuelist[0]
                }, {
                    name: namelist[1],
                    data: valuelist[1]
                }, {
                    name: namelist[2],
                    data: valuelist[2]
                }]
            }]
        })

    }
    var renderTime = function(data) {
        $('#total em').text(data[0]);

        $(data[1]).each(function(i,e){
            $('#reply em').eq(i).text(e);
        }) 
    }

    //刷新数据
    var showmessage = $('.showmessage').eq(0);
    var showmessage1 = $('.showmessage').eq(1);
    var refreshData = function() {
        Util.ajax({
            url: settings.getmintor,
            dataType: "json",
            success: function(data) {
                rendersatisfied(data.total);
                renderState(data.state);
                renderTime(data.time);
            },
            error: function(error) {}

        })
    }

    refreshData();
})
