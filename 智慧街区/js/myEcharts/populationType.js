//住宅人口类型 饼图
var myChart1 = echarts.init(document.getElementById("people-pie"));

//住宅人口类型表 请求
__http({
	apiId: 9,
	url: "http://112.29.135.218:81/api/gateway/visual/people_type",
	callback: function(result) {
		if (result.success) {
			let option1 = setOption1(result.data);
			myChart1.setOption(option1);
		}
	}
});

function setOption1(data_option1) {
	let data = [
		{
			value: data_option1[1].people_qty,
			name: "流动人口",
			itemStyle: { color: "#22FCDC" }
		},
		{
			value: data_option1[0].people_qty,
			name: "常住人口",
			itemStyle: { color: "#0D5CF9" }
		}
	];
	return {
		legend: {
			selectedMode: false,
			formatter: "占比分布",
			data: [data[0].name],
			left: "center",
			top: "center",
			icon: "none",
			align: "center",
			padding: [10, 0],
			textStyle: {
				color: "#fff",
				fontSize: fontSize(0.32)
			}
		},
		series: [
			{
				name: "访问来源",
				type: "pie",
				radius: ["50%", "70%"],
				avoidLabelOverlap: false,
				label: {
					normal: {
						show: true,
						textStyle: {
							color: "#fff",
							fontSize: fontSize(0.36)
						},
						formatter: "{per|{d}%} \n {b}",
						rich: {
							per: {
								color: "#fff",
								fontSize: fontSize(0.52),
								padding: [2, 4],
								borderRadius: 2
							}
						}
					}
				},
				labelLine: {
					normal: {
						show: true,
						length: fontSize(0.6),
						length2: fontSize(0.4)
					}
				},
				data: data
			}
		]
	};
}
