/*!
 * 服务诉求钻取1
 * author:chengang;
 * data:2016-12-16;
 */

$(function() {
    var chartMapstatus, //全省各地市诉求量情况(地图)
        chartBarstatus; //全省各地市诉求量情况（柱状图）
    var chartOption;
    var datas = [];

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

        // #region 全省各地市诉求量情况（柱状图）
        chartBarstatus = echarts.init(document.getElementById('chartbarstatus'));
        chartOption = {
            color: ['#3edada'],
            grid: {
                left: 10,
                right: 100,
                bottom: 80,
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
                        fontSize: 22
                    }
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
        // 消息队列的onclick方法
        chartMapstatus.on('click', function(params) {
            for( var i = 0;i<datas.length;i++)
            if(params.name == datas[i].name){
        		var areaCode = datas[i].areacode;
        		//测试方法
//        		window.open(_rootPath+"/jsscreen/serviceappeal/subscreen02?areacode=" + areaCode);
        		//rabitmq队列发送，调用消息队列的方法
//        		var url="/jsscreen/serviceappeal/subscreen02?areacode=" + areaCode;
//        		sendRabbitMq(url);
            }   
        });
        // #endregion
    }


    //渲染全省各地市诉求量情况
    renderStatus = function(data) {
        var max = 0,
            value = [],
            name = [];
        $.each(data, function(i, e) {
            value.push(e.value);
            name.push(e.name);
            datas.push(e);
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



    var requestData = function() {
        Util.ajax({
            url: settings.loaddata,
            success: function(data) {
                renderStatus(data);
            }
        });
    };

    initChart();
    requestData();
    
    var sendRabbitMq = function(url) {
		Util.ajax({
			//send_url为写死的地址  send为活的地址
			url : "/rest/sndrabbitmq/send",
			type : "post",
			data : {
				one : url,
			}
		})
	}

})
