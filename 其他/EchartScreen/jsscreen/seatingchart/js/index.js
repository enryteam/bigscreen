/*！
 *服务座席屏23
 *date:2016-12-09
 *author: chengang;
 */


(function($) {
	//变量
	var chartRealtimeCall,chartRealtimeSeat,chartInternetRate,chartAllMediaDeal;
	var chartoption;
	chartRealtimeCall = echarts.init(document
			.getElementById('chartrealtimecall'));
	chartoption = {
		grid : {
			left : 50,
			top : 15,
			right : 50,
			bottom : 0,
			containLabel : true
		},
		xAxis : {
			type : 'value',
			axisTick : {
				show : false
			},
			axisLine : {
				lineStyle : {
					color : '#fff'
				}
			},
			splitLine : {
				lineStyle : {
					color : '#aaa',
					type : "dashed"
				}
			},
			axisLabel : {
				interval : 0,
				textStyle : {
					color : "#fff",
					fontSize : 22,
					fontWeight : 'lighter',
					fontFamily : "Microsoft YaHei"
				},
				margin : 12
			},
		},
		yAxis : {
			axisLabel : {
				textStyle : {
					color : "#fff",
					fontSize : 22,
					fontWeight : 'lighter',
					fontFamily : "Microsoft YaHei"
				},
				margin : 12
			},
			axisLine : {
				lineStyle : {
					color : '#fff'
				}
			},
			inverse : true,
			type : 'category',
			axisTick : {
				show : false
			},
			data : [ "呼入", "接通", "等待" ]
		},
		series : [ {
			type : 'bar',
			barWidth : 34,
			color : [ '#c6e579' ],
			label : {
				normal : {
					show : true,
					position : 'right',
					textStyle : {
						color : '#fff',
						fontSize : 22
					}
				}
			},
			data : [ 0, 0, 0 ]
		} ]
	}
	chartRealtimeCall.setOption(chartoption);
	
	
	chartRealtimeSeat = echarts.init(document
			.getElementById('chartrealtimeseat'));
	chartoption = {
		grid : {
			left : 50,
			top : 15,
			right : 50,
			bottom : 0,
			containLabel : true
		},
		xAxis : {
			type : 'value',
			axisTick : {
				show : false
			},
			axisLine : {
				lineStyle : {
					color : '#fff'
				}
			},
			splitLine : {
				lineStyle : {
					color : '#aaa',
					type : "dashed"
				}
			},
			axisLabel : {
				interval : 0,
				textStyle : {
					color : "#fff",
					fontSize : 22,
					fontWeight : 'lighter',
					fontFamily : "Microsoft YaHei"
				},
				margin : 12
			},
		},
		yAxis : {
			axisLabel : {
				textStyle : {
					color : "#fff",
					fontSize : 22,
					fontWeight : 'lighter',
					fontFamily : "Microsoft YaHei"
				},
				margin : 12
			},
			axisLine : {
				lineStyle : {
					color : '#fff'
				}
			},
			inverse : true,
			type : 'category',
			axisTick : {
				show : false
			},
			data : [ "通话中", "正在受理互联网诉求", "置闲", "未上线"]
		},
		series : [ {
			type : 'bar',
			barWidth : 34,
			color : [ '#c6e579' ],
			label : {
				normal : {
					show : true,
					position : 'right',
					textStyle : {
						color : '#fff',
						fontSize : 22
					}
				}
			},
			data : [ 0, 0, 0, 0]
		} ]
	}
	chartRealtimeSeat.setOption(chartoption);
	
	// #region 互联网渠道占比
	chartInternetRate = echarts.init(document
			.getElementById('chartinternetrate'));

	chartoption = {
		color : [ "#f0805a", "#e0b931", "#c6e579", "#60c0dd", "#0084c6",
				"#4d5dce", "#7e8ae3", "#83a948", "#629fa6", "#d7504b",
				"#ebc84f", "#33b0b0" ],
		tooltip : {
			trigger : 'item',
			formatter : "{b}:{c}({d}%)"
		},
		series : [ {
			name : '互联网渠道占比',
			type : 'pie',
			radius : 90,
			label : {
				normal : {
					show: true,
                    formatter: '{b}:{d}%',
					textStyle : {
						fontSize : 22,
						fontWeight : 'lighter',
						fontFamily : "Microsoft YaHei"
					}
				}
			},
			center : [ '50%', '50%' ],
			data : []
		} ]
	};
	chartInternetRate.setOption(chartoption);
	
	// #region 全媒体及时受理量
	chartAllMediaDeal = echarts.init(document
			.getElementById('chartallmediadeal'));
	chartoption = {
		grid : {
			left : 0,
			top : 15,
			right : 50,
			bottom : 0,
			containLabel : true
		},
		xAxis : {
			type : 'value',
			axisTick : {
				show : false
			},
			axisLine : {
				lineStyle : {
					color : '#fff'
				}
			},
			splitLine : {
				lineStyle : {
					color : '#aaa',
					type : "dashed"
				}
			},
			axisLabel : {
				interval : 0,
				textStyle : {
					color : "#fff",
					fontSize : 22,
					fontWeight : 'lighter',
					fontFamily : "Microsoft YaHei"
				},
				margin : 12
			},
		},
		yAxis : {
			axisLabel : {
				textStyle : {
					color : "#fff",
					fontSize : 22,
					fontWeight : 'lighter',
					fontFamily : "Microsoft YaHei"
				},
				margin : 12
			},
			axisLine : {
				lineStyle : {
					color : '#fff'
				}
			},
			inverse : true,
			type : 'category',
			axisTick : {
				show : false
			},
			data : []
		},
		series : [ {
			type : 'bar',
			barWidth : 26,
			color : [ '#3edada' ],
			label : {
				normal : {
					show : true,
					position : 'right',
					textStyle : {
						color : '#fff',
						fontSize : 22
					}
				}
			},
			data : []
		} ]
	}
	chartAllMediaDeal.setOption(chartoption);
	// #endregion
	
	// 渲染实时话务量
	renderRealtimeCall = function(data) {
		chartRealtimeCall.setOption({
			series : [ {
				data : [ data.calling, data.connect, data.waiting ]
			} ]
		});
	}
	// 渲染实时坐席状态
	renderRealtimeSeat = function(data) {
		chartRealtimeSeat.setOption({
			series : [ {
				data : [ data.calling, data.allmedia, data.free, data.offline ]
			} ]
		});
	}
	
	// 渲染互联网渠道占比
	var renderInternetRate = function(data) {
		chartInternetRate.setOption({
			series : [ {
				data : data
			} ]
		});
	}
	
	// 渲染全媒体及时受理量
	renderAllMediaDeal = function(data) {
		var lbls = [], values = [];
		$.each(data, function(i, e) {
			lbls.push(e.name);
			values.push(e.value);
		});
		chartAllMediaDeal.setOption({
			yAxis : [ {
				data : lbls
			} ],
			series : [ {
				data : values
			} ]
		});
	}

	
	// 请求数据
	var requestData = function() {
		Util.ajax({
			url : settings.loaddata,
			success : function(data) {
				renderRealtimeCall(data.realtimecall);
				renderRealtimeSeat(data.realtimecall);
				renderInternetRate(data.internet);
				renderAllMediaDeal(data.allmediadeal);
			}
		})
	};

	requestData();
	
	var sendWebSocket = function() {
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
	var renderSeatingsDetail = function(data) {
        var $seatingsdetails = $("#seatingsdetail"); // 1：空闲，2：通话中，3：全媒体  4:未登录
		var jsonObj = eval("(" + data + ")");
		var free = 0;
		var calling = 0;
		var allmedia = 0;
		var offline = 0;
		// 遍历json对象
		$.each(jsonObj, function(i, e) {
            if (e.status == '1') {
				free++;
            } else if (e.status == "2") {
				calling++;
            } else if (e.status == "3") {
				allmedia++;
            } else if (e.status == "5") {
				allmedia++;
			}
		});
		offline = 50 - free - calling - allmedia;
        var info = {
            free: free,
            calling: calling,
            allmedia: allmedia,
            offline: offline
		}
		
        renderRealtimeSeat(info);
	}
	
	sendWebSocket();
	
}(jQuery));


