/*！
 *服务座席屏23
 *date:2016-12-09
 *author: chengang;
 */


(function($) {
	 var chartProcessTimeByWay,chartProcessTimeByType, chartConnectRate, chartAcceptRate;
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
	                top: 50,
	                left: 25,
	                right: 30,
	                bottom: 0,
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
	            // backgroundColor:'#141a5a',
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
	        chartConnectRate = echarts.init(document
					.getElementById('chartconnectrate'));
			chartoption = {
				series : [ {
					axisLine : {
						lineStyle : {
							color : [ [ 0.3, '#ffa500' ], [ 0.7, '#87ceeb' ],
									[ 1, '#22ac38' ] ],
							// width : 30
						}
					},
					radius:'100%',
					center : [ '50%', '50%' ],
					axisLabel : {
						textStyle : {
							fontSize : 15,
							fontWeight : 'lighter',
							fontFamily : "Microsoft YaHei",
							color : '#fff',
						}
					},
					// backgroundColor:none,
					axisTick : {
						splitNumber : 5
					},
					pointer : {
						length : "70%"
					},
					title : {
						offsetCenter : [ 0, 90 ],
						textStyle : {
							fontSize : 22,
							fontWeight : 'lighter',
							fontFamily : "Microsoft YaHei",
							color : '#fff',
						}
					},
					name : '接通率',
					type : 'gauge',
					detail : {
						formatter : '{value}%',
						// offsetCenter : [ 0, 125 ],
						textStyle : {
							fontSize : 30,
							fontWeight : 'bold',
							fontFamily : "Microsoft YaHei",
							color : '#f7e444',
						}
					},
					data : [ {
						value : 0,
						name : '平均值'
					} ]
				} ]
			};
			chartConnectRate.setOption(chartoption);
			// #endregion
			
			// #region 平均受理率
			chartAcceptRate = echarts.init(document
					.getElementById('chartacceptrate'));
			chartoption = {
					series : [ {
						axisLine : {
							lineStyle : {
								color : [ [ 0.3, '#ffa500' ], [ 0.7, '#87ceeb' ],
										[ 1, '#22ac38' ] ],
								width : 30
							}
						},
						radius:'100%',
						center : [ '50%', '50%' ],
						axisLabel : {
							textStyle : {
								fontSize : 18,
								fontWeight : 'lighter',
								fontFamily : "Microsoft YaHei",
								color : '#fff',
							}
						},
						axisTick : {
							splitNumber : 5
						},
						pointer : {
							length : "70%"
						},
						title : {
							offsetCenter : [ 0, 90 ],
							textStyle : {
								fontSize : 22,
								fontWeight : 'lighter',
								fontFamily : "Microsoft YaHei",
								color : '#fff',
							}
						},
						name : '接通率',
						type : 'gauge',
						detail : {
							formatter : '{value}%',
							// offsetCenter : [ 0, 125 ],
							textStyle : {
								fontSize : 30,
								fontWeight : 'bold',
								fontFamily : "Microsoft YaHei",
								color : '#f7e444',
							}
						},
						data : [ {
							value : 0,
							name : '平均值'
						} ]
					} ]
				};
			chartAcceptRate.setOption(chartoption);
	    }
	    
	    
	 // #region 接通率
		
		
		
		initChart();
		// #endregion
	    
	  //渲染受理时间
	    var renderProcessTimeByWay = function(data) {
	    	console.log(data);
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
	
	 // 渲染接通率
		var renderConnectRate = function(data) {
			
			chartConnectRate.setOption({
				series : [ {
					data : [ {
						value : data,
						name : '平均值'
					} ]
				} ]
			});
		}

		// 平均受理率
		var renderAcceptRate = function(data) {
			chartAcceptRate.setOption({
				series : [ {
					data : [ {
						value : data,
						name : '平均值'
					} ]
				} ]
			});
		}

	    
	// 请求数据
	var requestData = function() {
		Util.ajax({
			url : settings.loaddata,
			success : function(data) {
				renderProcessTimeByWay(data.processtimebyway);
                renderProcessTimeByType(data.processtimebytype);
                renderConnectRate(data.connectrate);
				renderAcceptRate(data.acceptrate);
			}
		})
	};

	requestData();
	
}(jQuery));


