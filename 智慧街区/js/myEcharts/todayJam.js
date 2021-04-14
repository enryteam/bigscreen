//今日拥堵指数  柱形图
var myChart4 = echarts.init(document.getElementById("congestion-table"));

//今日拥堵指数 请求
__http({
	apiId: 25,
	url: "http://112.29.135.218:81/api/gateway/visual/conges_road",
	callback: function (result) {
		if (result.success) {
			console.log("拥堵指数", result);
		}
	}
});

var options4 = {
	xAxis: {
		type: "category",
		boundaryGap: true,
		data: ["道路1", "道路2", "道路3", "道路4", "道路5", "道路6", "道路7"],
		axisTick: { show: false }, //去掉坐标轴刻度线
		axisLabel: {
			show: true,
			fontSize: fontSize(0.3),
			color: "#fff"
		}
	},
	grid: {
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
			type: "pictorialBar",
			symbolSize: [fontSize(0.6), fontSize(0.25)],
			symbolOffset: [fontSize(0), -fontSize(0.1)],
			z: 12,
			symbolPosition: "end",
			itemStyle: {
				normal: {
					color: "#01F0FF"
				}
			},
			data: [100, 50, 20, 40, 30, 50, 10]
		},
		{
			type: "pictorialBar",
			symbolSize: [fontSize(0.6), fontSize(0.25)],
			symbolOffset: [fontSize(0), fontSize(0.1)],
			z: 12,
			itemStyle: {
				color: "#005559"
			},
			data: [100, 50, 20, 40, 30, 50, 10]
		},
		{
			type: "bar",
			itemStyle: {
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
					{
						offset: 0,
						color: "#01F0FF" // 0% 处的颜色
					},
					{
						offset: 1,
						color: "#005559" // 100% 处的颜色
					}
				])
			},
			barWidth: fontSize(0.6),
			data: [100, 50, 20, 40, 30, 50, 10]
		}
	]
};
myChart4.setOption(options4);