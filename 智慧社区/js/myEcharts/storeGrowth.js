//商铺入住增长分析 折线图
var myChart2 = echarts.init(document.getElementById("market-table"));

//商铺入住增长分析 请求
__http({
	apiId: 15,
	url: "http://112.29.135.218:81/api/gateway/visual/shop_grow",
	callback: function (result) {
		if (result.success) {
			console.log("商铺入住增长分析", result);
		}
	}
});

var option2 = {
	color: ["#289EF9", "#FFE827", "#00FFC6"],
	tooltip: {
		trigger: "axis"
	},
	legend: {
		data: ["餐饮", "服饰", "零售"],
		icon: "rect",
		itemWidth: fontSize(0.2),
		itemHeight: fontSize(0.2),
		right: fontSize(0.2),
		textStyle: {
			color: "#fff",
			fontSize: fontSize(0.36)
		}
	},
	grid: {
		containLabel: true,
		show: true,
		backgroundColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
			{
				offset: 0,
				color: "rgba(1,48,87,0)" // 0% 处的颜色
			},
			{
				offset: 1,
				color: "rgba(1,48,87,0.8)" // 100% 处的颜色
			}
		]), //背景渐变色
		borderColor: "rgba(0,0,0,0)"
	},
	xAxis: {
		type: "category",
		boundaryGap: true,
		data: [
			"1月",
			"2月",
			"3月",
			"4月",
			"5月",
			"6月",
			"7月",
			"8月",
			"9月",
			"10月",
			"11月",
			"12月"
		],
		axisTick: { show: false }, //去掉坐标轴刻度线
		axisLabel: {
			show: true,
			fontSize: fontSize(0.3),
			color: "#fff"
		}
	},
	yAxis: {
		type: "value",
		axisLabel: {
			show: true,
			fontSize: fontSize(0.3),
			color: "#fff"
		},
		splitLine: {
			lineStyle: { color: "rgba(255,255,255,0.2)" }
		}
	},
	series: [
		{
			name: "餐饮",
			type: "line", //线段显示
			stack: "总量",
			data: [120, 132, 101, 134, 90, 230, 210, 100, 12, 45, 100, 344],
			smooth: true, //平滑
			symbol: "none" //节点不显示圆圈
		},
		{
			name: "服饰",
			type: "line",
			stack: "总量",
			data: [220, 182, 191, 234, 290, 330, 310, 88, 240, 210, 30],
			smooth: true,
			symbol: "none",
			itemStyle: {
				normal: {
					lineStyle: {
						width: fontSize(0.02),
						type: "dashed" //'dotted'虚线 'solid'实线
					}
				}
			}
		},
		{
			name: "零售",
			type: "line",
			stack: "总量",
			data: [150, 232, 201, 154, 190, 330, 410, 200, 100, 120, 356, 210],
			smooth: true,
			symbol: "none",
			itemStyle: {
				normal: {
					lineStyle: {
						width: fontSize(0.02),
						type: "dashed" //'dotted'虚线 'solid'实线
					}
				}
			}
		}
	]
};
myChart2.setOption(option2);