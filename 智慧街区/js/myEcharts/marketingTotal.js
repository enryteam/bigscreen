//营销总额分析  折线图
var myChart3 = echarts.init(document.getElementById("marking-table"));

//营销总额分析 请求
__http({
	apiId: 17,
	url: "http://112.29.135.218:81/api/gateway/visual/total_sales",
	callback: function (result) {
		if (result.success) {
			console.log("营销总额分析", result);
		}
	}
});

var option3 = {
	color: {
		type: "linear",
		colorStops: [
			{
				offset: 0,
				color: "#00FFC6" // 0% 处的颜色
			},
			{
				offset: 0.5,
				color: "#289EF9" // 50% 处的颜色
			},
			{
				offset: 1,
				color: "#00FFC6" // 100% 处的颜色
			}
		],
		global: false // 缺省为 false
	},
	tooltip: {
		trigger: "axis"
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
			type: "line",
			data: [120, 132, 101, 134, 90, 230, 210, 100, 12, 45, 100, 344],
			symbol: "",
			lineStyle: {
				color: {
					type: "linear",
					colorStops: [
						{
							offset: 0,
							color: "#00FFC6" // 0% 处的颜色
						},
						{
							offset: 0.5,
							color: "#289EF9" // 50% 处的颜色
						},
						{
							offset: 1,
							color: "#00FFC6" // 100% 处的颜色
						}
					],
					global: false // 缺省为 false
				}
			}
		}
	]
};
myChart3.setOption(option3);