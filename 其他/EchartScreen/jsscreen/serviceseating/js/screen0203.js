/*！
 *服务座席屏23
 *date:2016-12-09
 *author: chengang;
 */

function getNow() {
	var now = new Date();
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	if (month < 10)
		month = "0" + month;
	var day = now.getDate();
	if (day < 10)
		day = "0" + day;
	var hours = now.getHours();
	if (hours < 10)
		hours = "0" + hours;
	var minutes = now.getMinutes();
	if (minutes < 10)
		minutes = "0" + minutes;
	var seconds = now.getSeconds();
	if (seconds < 10)
		seconds = "0" + seconds;
    var timeStr = year + "年" + month + "月" + day + "日&nbsp;&nbsp;&nbsp;" + hours + "时" + minutes + "分" + seconds + "秒";
	return timeStr;
}

(function() {
	var arg = arguments;
	var nows = getNow();
	$("#time").html(nows);
	setTimeout(function() {
		arg.callee();
	}, 1000);
})();

(function($) {
	var chartSeatingStatus, chartInternetRate, chartRealtimeCall, chartAllMediaDeal, chartConnectRate, chartAcceptRate;

	var chartoption;
	// 初始化图表
	var initChart = function() {
		// #region 实时座席状态
		chartSeatingStatus = echarts.init(document
				.getElementById('chartseatingstatus'));

		chartoption = {
            tooltip: {
                trigger: 'item',
                formatter: "{b}:{c}({d}%)"
			},
            series: [{
                name: '实时座席状态',
                type: 'pie',
                radius: 140,
                grid: {
                    top: 50,
                    left: 50,
                    bottom: 50,
                    containLabel: true
                },
                label: {
                    normal: {
                        show: true,
                        formatter: '{b}:{d}%',
                        textStyle: {
                            fontSize: 18,
                            fontWeight: 'lighter',
                            fontFamily: "Microsoft YaHei"
						}
					}
				},
                center: ['50%', '40%'],
                data: [{
                    name: "置闲",
                    value: 100,
                    itemStyle: {
                        normal: {
                            color: "#7a81bb"
						}
					}
				}, {
                    name: "正在受理互联网诉求",
                    value: 100,
                    itemStyle: {
                        normal: {
                            color: "#168fff"
						}
					}
				}, {
                    name: "通话中",
                    value: 100,
                    itemStyle: {
                        normal: {
                            color: "#22ba22"
						}
					}
                },{
                    name: "未上线",
                    value: 100,
                    itemStyle: {
                        normal: {
                            color: "#2e38a0"
						}
					}
				}]
            }]
		};
		chartSeatingStatus.setOption(chartoption);

		// #endregion

		// #region 互联网渠道占比
		chartInternetRate = echarts.init(document
				.getElementById('chartinternetrate'));

		chartoption = {
            color: ["#f0805a", "#e0b931", "#c6e579", "#60c0dd", "#0084c6",
					"#4d5dce", "#7e8ae3", "#83a948", "#629fa6", "#d7504b",
                "#ebc84f", "#33b0b0"
            ],

            tooltip: {
                trigger: 'item',
                formatter: "{b}:{c}({d}%)"
			},
            series: [{
                name: '互联网渠道占比',
                type: 'pie',
                radius: 140,
                label: {
                    normal: {
                        show: true,
                        formatter: '{b}:{d}%',
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
		chartInternetRate.setOption(chartoption);

		// #endregion

		// #region 实时话务量
		chartRealtimeCall = echarts.init(document
				.getElementById('chartrealtimecall'));
		chartoption = {
            grid: {
                left: 50,
                top: 15,
                right: 50,
                bottom: 60,
                containLabel: true
			},
            xAxis: {
                name: '件',
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
			},
            yAxis: {
                axisLabel: {
                    textStyle: {
                        color: "#fff",
                        fontSize: 22,
                        fontWeight: 'lighter',
                        fontFamily: "Microsoft YaHei"
					},
                    margin: 12
				},
                axisLine: {
                    lineStyle: {
                        color: '#fff'
					}
				},
                inverse: true,
                type: 'category',
                axisTick: {
                    show: false
				},
                data: ["呼入", "接通", "等待"]
			},
            series: [{
                type: 'bar',
                barWidth: 34,
                color: ['#c6e579'],
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        textStyle: {
                            color: '#fff',
                            fontSize: 22
						}
					}
				},
                data: [0, 0, 0]
            }]
		}
		chartRealtimeCall.setOption(chartoption);
		// #endregion

		// #region 全媒体及时受理量
		chartAllMediaDeal = echarts.init(document
				.getElementById('chartallmediadeal'));
		chartoption = {
            grid: {
                left: 50,
                top: 15,
                right: 50,
                bottom: 25,
                containLabel: true
			},
            xAxis: {
                name: '件',
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
			},
            yAxis: {
                axisLabel: {
                    textStyle: {
                        color: "#fff",
                        fontSize: 22,
                        fontWeight: 'lighter',
                        fontFamily: "Microsoft YaHei"
					},
                    margin: 12
				},
                axisLine: {
                    lineStyle: {
                        color: '#fff'
					}
				},
                inverse: true,
                type: 'category',
                axisTick: {
                    show: false
				},
                data: []
			},
            series: [{
                type: 'bar',
                barWidth: 26,
                color: ['#3edada'],
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        textStyle: {
                            color: '#fff',
                            fontSize: 22
						}
					}
				},
                data: []
            }]
		}
		chartAllMediaDeal.setOption(chartoption);
		// #endregion

		// #region 接通率
		chartConnectRate = echarts.init(document
				.getElementById('chartconnectrate'));
		chartoption = {
            series: [{
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
                center: ['50%', '45%'],
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
                    offsetCenter: [0, 90],
                    textStyle: {
                        fontSize: 22,
                        fontWeight: 'lighter',
                        fontFamily: "Microsoft YaHei",
                        color: '#fff',
					}
				},
                name: '接通率',
                type: 'gauge',
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
                data: [{
                    value: 0,
                    name: '平均值'
                }]
            }]
		};
		chartConnectRate.setOption(chartoption);
		// #endregion

		// #region 平均受理率
		chartAcceptRate = echarts.init(document
				.getElementById('chartacceptrate'));
		chartAcceptRate.setOption(chartoption);

		// #endregion

	}
	initChart();

	// 渲染服务座席
	var renderSeatingsSummary = function(data) {
		var $seatingssummary = $("#seatingssummary");
        for (var i in data) {
            if (i != "inservice") {
				$("p[data-lbl='" + i + "']", $seatingssummary).text(data[i]);
			}
		}
	}

	// 全媒体各类型占比
	renderAllMediaType = function(data) {
		var $allmediatype = $("#allmediatype");
		var sum = parseInt(data.phone) + parseInt(data.internet);
		data.phonepercent = (data.phone / sum * 100).toFixed(2) 
		data.internetpercent = (data.internet / sum * 100).toFixed(2) 
		
        
        
		    $("p[data-lbl='phonepercent']", $allmediatype).html(data.phonepercent+'%');
			$("p[data-lbl='internetpercent']", $allmediatype).html(data.internetpercent+'%');
			$("p[data-lbl='phone']", $allmediatype).html(data.phone+'<em>件</em>');
			$("p[data-lbl='internet']", $allmediatype).html(data.internet+'<em>件</em>');
		
	}

	// 渲染实时座席状态
    var renderSeatingStatus = function(data) {
        chartSeatingStatus.setOption({
            series: {
                data: [{
                    name: "置闲",
                    value: data.free,
                    itemStyle: {
                        normal: {
                            color: "#7a81bb"
                        }
                    }
                }, {
                    name: "通话中",
                    value: data.calling,
                    itemStyle: {
                        normal: {
                            color: "#22ba22"
                        }
                    }
                }, {
                    name: "正在受理互联网诉求",
                    value: data.allmedia,
                    itemStyle: {
                        normal: {
                            color: "#168fff"
                        }
                    }
                },{
                    name: "未上线",
                    value: data.offline,
                    itemStyle: {
                        normal: {
                            color: "#2e38a0"
                        }
                    }
                }]
            }
        });
        $("p[data-lbl='inservice']", $("#seatingssummary")).text(data.free + data.calling + data.allmedia);
    }

	// 渲染互联网渠道占比
	var renderInternetRate = function(data) {
		chartInternetRate.setOption({
            series: [{
                data: data
            }]
		});
	}

	// 渲染实时话务量
	renderRealtimeCall = function(data) {
		chartRealtimeCall.setOption({
            series: [{
                data: [data.calling, data.connect, data.waiting]
            }]
		});
	}

	// 渲染全媒体及时受理量
	renderAllMediaDeal = function(data) {
        var lbls = [],
            values = [];
		$.each(data, function(i, e) {
			lbls.push(e.name);
			values.push(e.value);
		});
		chartAllMediaDeal.setOption({
            yAxis: [{
                data: lbls
            }],
            series: [{
                data: values
            }]
		});
	}

	// 渲染接通率
	var renderConnectRate = function(data) {
		chartConnectRate.setOption({
            series: [{
                data: [{
                    value: data,
                    name: '平均值'
                }]
            }]
		});
	}

	// 平均受理率
	var renderAcceptRate = function(data) {
		chartAcceptRate.setOption({
            series: [{
                data: [{
                    value: data,
                    name: '平均值'
                }]
            }]
		});
	}

	// 请求数据
	var requestData = function() {
		Util.ajax({
            url: settings.loaddata,
            success: function(data) {
				renderAllMediaType(data.allmediatype);
				// renderSeatingStatus(data.seatingstatus);
				renderRealtimeCall(data.realtimecall);
				renderAllMediaDeal(data.allmediadeal);
				renderConnectRate(data.connectrate);
				renderAcceptRate(data.acceptrate);
				// 实时获取数据，渲染座位表
				sendWebSocket();
				renderInternetRate(data.internet);
				renderSeatingsSummary(data.seatingsummary);
			}
		})
	};

	requestData();

	function sendWebSocket() {
		// websocket客户端
		var socket = atmosphere;
		var transport = 'websocket';
		// 注册request
		var request = {
			// 与后台连接地址 //WebSocket地址
            url: settings.seatUrl,
            contentType: "application/json", // 请求内容类型
            transport: transport, // 交互类型，默认为websocket
            reconnectInterval: 5000, // 重连间隔
		// 请求参数
		};

		// 连接失败时候执行的方法，一般是在不支持websocket的浏览器中用来切换交互类型的
		request.onTransportFailure = function(errorMsg, request) {
			request.fallbackTransport = "long-polling"; // 切换为长轮询
			transport = "long-polling"; // 客户端保存交互类型，后面有用
		};

		// 监听服务端发送的数据
		request.onMessage = function(response) {
			var msgStr = response.responseBody;
			renderSeatingsDetail(msgStr);
			// 注意：在正常WebSocket连接中，一个json服务端会推送一次，所以msgStr一定是个json格式的字符串；
			// 在长轮询中，一次请求可能会取到多个json，但是并不是以数组格式返回，而是简单的拼接
			// eg:在服务端推送了{"text","你好"}和{"text","谢谢"}两个json，如果在同一次轮需被获取到msgStr的格式是{"text","你好"}{"text","谢谢"}
			// 在下面需要对长轮询取到的消息做处理，转成数组格式的字符串，然后进行操作。
			if (transport == "long-polling") {
				msgStr = "[" + msgStr.replace(/}{/g, '},{') + "]";
			}
		};
		// 建立连接，异步执行
		var subSocket = socket.subscribe(request);
	}

	// 渲染座席状态
	function renderSeatingsDetail(data) {
        var $seatingsdetails = $("#seatingsdetail"); // 1：空闲，2：通话中，3：全媒体  4:未登录
		var jsonObj = eval("(" + data + ")");
		var free = 0;
		var calling = 0;
		var allmedia = 0;
		var offline = 0;
		// 遍历json对象
		$.each(jsonObj, function(i, e) {
			$num = $("li[data-num='" + e.num + "']", $seatingsdetails);
			var cls = "";
            if (e.status == '1') {
				cls = "free";
				free++;
            } else if (e.status == "2") {
				cls = "calling";
				calling++;
            } else if (e.status == "3") {
				cls = "allmedia";
				allmedia++;
            } else if (e.status == "5") {
				cls = "shanking";
				allmedia++;
			}
			$num.removeClass("free");
			$num.removeClass("calling");
			$num.removeClass("allmedia");
			$num.removeClass("shanking");
			$num.addClass(cls);
		});
		offline = 50 - free - calling - allmedia;
        var info = {
            free: free,
            calling: calling,
            allmedia: allmedia,
            offline: offline
		}
		renderSeatingStatus(info);
	}
}(jQuery));


(function() {
	var flag = 0;
    $('#seatingsdetail li').hover(function() {
		var li = this;
		flag = 0;
		Util.ajax({
            url: settings.userInfoUrl,
            data: { sortnum: $(this).text() },
            success: function(data) {
                if (!jQuery.isEmptyObject(data)) {
            		$("#displayname").html(data.displayname);
                	$("#staffagentid").html(data.staffagentid);
                    if (data.imgsrc != "") {
                        $(".state-bg .head").css("backgroundImage", "url(" + data.imgsrc + ")");
                    } else {
                        $(".state-bg .head").css("backgroundImage", "url(images/head.png)");
                	}
                    if ($(li).hasClass("free"))
                		$("#status").html("置闲");
                    else if ($(li).hasClass("calling"))
                		$("#status").html("通话中");
                    else if ($(li).hasClass("allmedia") || $(li).hasClass("shanking"))
                		$("#status").html("正在受理互联网诉求");
                	else
                		$("#status").html("未上线");
                    $("#rqsttime").html(data.rqsttime);
                    $("#rqsttitle").html(data.rqsttitle);
                    var y = parseInt($(li).css('top')) - 165;
                    var x = parseInt($(li).css('left')) - 220;
                    if (flag == 0) { //如果在信息返回后鼠标已移开则不显示
            			$('#state-bg').css({
                            'top': y,
                            'left': x
                		}).removeClass('hidden');
            		}
            	}
            }
        })
    }, function() {
        flag = 1;
		$('#state-bg').addClass('hidden');
        $('#state-bg').css('height', 177);
		$('#els').addClass('hidden');
	})
    $('#seatingsdetail li').click(function() {
        var y = parseInt($(this).css('top')) - 265;
        $('#state-bg').css('top', y);
		$('#els').removeClass('hidden');
        $('#state-bg').css('height', 277);
	})
})()
