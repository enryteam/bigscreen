$(document).ready(function () {
	//今日街区请求
	__http({
		apiId: 3,
		url: "http://112.29.135.218:81/api/gateway/visual/todayblock",
		callback: function (result) {
			if (result.success) {
				for (let i in result.data[0]) {
					$(`#${i}`)
						.text("")
						.text(result.data[0][i]);
				}
			}
		}
	});
	//安全事件上报请求
	__http({
		apiId: 5,
		url: "http://112.29.135.218:81/api/gateway/visual/sc_incident",
		callback: function (result) {
			if (result.success) {
				let html = ''
				for (let i of result.data) {
					let status = i.event_level === "一般" ? "normal" : i.event_level === "严重" ? "warring" : "error";
					html += `<li class="${status}">
							<span>${i.event_level}</span>
							<span>${i.time}</span>
							<span>${i.place}</span>
							<span>${i.state}</span>
					</li>`;
				}
				$(".slide-list.js-slide-list").html("").html(html);
			}
		}
	});
	//建筑设施 数值板请求
	__http({
		apiId: 11,
		url: "http://112.29.135.218:81/api/gateway/visual/smart_type",
		callback: function (result) {
			if (result.success) {
				$(".build-text").each(function (item) {
					for (let i of result.data) {
						if ($(this).text() === i.smart_type) {
							$(this)
								.siblings(".build-num")
								.text("")
								.text(i.smart_qty);
						}
					}
				});
			}
		}
	});
	//今日社区 请求
	__http({
		apiId: 19,
		url: "http://112.29.135.218:81/api/gateway/visual/today_community",
		callback: function (result) {
			if (result.success) {
				let data = result.data[0]
				$(".coummity").children('li').each(function () {
					let text = $(this).children(".commity-title").text();
					switch (text) {
						case "人员数量":
							$(this).children(".commity-title").siblings(".commity-num").text("").text(data.people_qty)
							break;
						case "访客数量":
							$(this).children(".commity-title").siblings(".commity-num").text("").text(data.gaust_qty)
							break;
						case "人员出入数量":
							$(this).children(".commity-title").siblings(".commity-num").text("").text(data.people_out)
							break;
						case "车辆出入数量":
							$(this).children(".commity-title").siblings(".commity-num").text("").text(data.car_out)
							break;
						default:
							break;
					}
				})
			}
		}
	});
	//今日商圈 请求
	__http({
		apiId: 13,
		url: "http://112.29.135.218:81/api/gateway/visual/business_type",
		callback: function (result) {
			if (result.success) {
				console.log("今日商圈", result);
				for(let i of result.data) {
					if(i.type === "市场容量指数") {
						$(".ball-con.ball1").text("").text(i.index);
					} else if ( i.type === "消费指数") {
						$(".ball-con.ball2").text("").text(i.index);
					} else {
						$(".ball-con.ball3").text("").text(i.index);
					}
				}
			}
		}
	});
	//今日社区能耗 请求
	__http({
		apiId: 21,
		url: "http://112.29.135.218:81/api/gateway/visual/energy_type",
		callback: function (result) {
			if (result.success) {
				console.log("今日社区能耗", result);
			}
		}
	});
	//社区停车位情况 请求
	__http({
		apiId: 23,
		url: "http://112.29.135.218:81/api/gateway/visual/park_type",
		callback: function (result) {
			if (result.success) {
				console.log("社区停车位情况", result);
			}
		}
	});
	//路口流量 请求
	__http({
		apiId: 27,
		url: "http://112.29.135.218:81/api/gateway/visual/road_traffic",
		callback: function (result) {
			if (result.success) {
				console.log("路口流量", result);
			}
		}
	});
	//中间图片 请求
	__http({
		apiId: 31,
		url: "http://112.29.135.218:81/api/gateway/visual/road_map",
		callback: function (result) {
			if (result.success) {
				console.log("中间图片", result);
			}
		}
	});
});

//窗口尺寸变换设置抖动。避免过多触发
$(window).resize(function () {
	let resizeTimer = null;
	return function () {
		if (resizeTimer) clearTimeout(resizeTimer)
		resizeTimer = setTimeout(() => {
			myChart.resize();
			myChart1.resize();
			myChart2.resize();
			myChart3.resize();
			myChart4.resize();
			myChart5.resize();
		}, 100)
	}
})

//自适应图表
function fontSize(res) {
	let docEl = document.documentElement,
		clientWidth =
			window.innerWidth ||
			document.documentElement.clientWidth ||
			document.body.clientWidth;
	if (!clientWidth) return;
	let fontSize = 100 * (clientWidth / 11520);
	return res * fontSize;
}

//定时刷新图表
// setInterval(function() {
// 	myChart.dispose();
// 	$("#road-table").html("");
// 	myChart = echarts.init(document.getElementById("road-table"));
// 	myChart.setOption(option);
// 	myChart1.dispose();
// 	$("#people-pie").html("");
// 	myChart1 = echarts.init(document.getElementById("people-pie"));
// 	myChart1.setOption(setOption1);
// 	myChart2.dispose();
// 	$("#market-table").html("");
// 	myChart2 = echarts.init(document.getElementById("market-table"));
// 	myChart2.setOption(option2);
// 	myChart3.dispose();
// 	$("#marking-table").html("");
// 	myChart3 = echarts.init(document.getElementById("marking-table"));
// 	myChart3.setOption(option3);
// 	myChart4.dispose();
// 	$("#congestion-table").html("");
// 	myChart4 = echarts.init(document.getElementById("congestion-table"));
// 	myChart4.setOption(options4);
// }, 6000);

//点击视频出现视频框
$('.camera').click(function () {
	if($(this).find('.video-box').css('display')=='none'){
		$('.video-box').hide();
		$(this).find('.video-box').show();
	}else{
		$(this).find('.video-box').hide();
	}
});
//点击出现介绍弹框
$('.fire').click(function () {
	if($(this).find('.device-box').css('display')=='none'){
		$('.device-box').hide();
		$(this).find('.device-box').show();
	}else{
		$(this).find('.device-box').hide();
	}
});
$('.device').click(function () {
	if($(this).find('.device-box').css('display')=='none'){
		$('.device-box').hide();
		$(this).find('.device-box').show();
	}else{
		$(this).find('.device-box').hide();
	}
});
$('.famous').click(function () {
	if($(this).find('.device-box').css('display')=='none'){
		$('.device-box').hide();
		$(this).find('.device-box').show();
	}else{
		$(this).find('.device-box').hide();
	}
});
$('.building').click(function () {
	if($(this).find('.device-box').css('display')=='none'){
		$('.device-box').hide();
		$(this).find('.device-box').show();
	}else{
		$(this).find('.device-box').hide();
	}
});
//点击事件
$('.things1').click(function () {
	if($('.things-box').css('display')=='block'){
		$('.things-box').css('display','none');
	}else{
		$('.things-box').css('right',$(this).css('right'));
		$('.things-box').css('top',$(this).css('top'));
		$('.things-box').css('width',0);
		$('.things-box').css('height',0);
		$('.things-box').css('display','block');
		setTimeout(function () {
			$('.things-box').css('top','4.2rem');
			$('.things-box').css('right','0');
			$('.things-box').css('width','12rem');
			$('.things-box').css('height','6.2rem');
		},100)
	}
});
//点击中间下方操作
$('.handle-btn>li').click(function () {
	if($(this).hasClass('active')){
		$('.device').show();
		$('.fire').show();
		$('.famous').show();
		$('.building').show();
		$('.camera').show();
		$(this).removeClass('active');
		$(this).find('img').eq(0).src='./img/center-linenoactive.png';
		$(this).find('.handle-con').removeClass('active');
		return false;
	}
	$('.handle-btn>li').removeClass('active');
	$('.handle-btn>li').find('img').eq(0).src='./img/center-linenoactive.png';
	$('.handle-btn>li').find('.handle-con').removeClass('active');
	$(this).addClass('active');
	$(this).find('img').eq(0).src='./img/center-lineactive.png';
	$(this).find('.handle-con').addClass('active');
	var type=$(this).attr('data-type');
	if(type=='1'){
		$('.device').hide();
		$('.fire').hide();
		$('.famous').hide();
		$('.building').hide();
		$('.camera').show();
	}else if(type=='2'){
		$('.device').show();
		$('.fire').hide();
		$('.famous').hide();
		$('.building').hide();
		$('.camera').hide();
	}else if(type=='3'){
		$('.device').hide();
		$('.fire').show();
		$('.famous').hide();
		$('.building').hide();
		$('.camera').hide();
	}else if(type=='4'){
		$('.device').hide();
		$('.fire').hide();
		$('.famous').show();
		$('.building').hide();
		$('.camera').hide();
	}else if(type=='5'){
		$('.device').hide();
		$('.fire').hide();
		$('.famous').hide();
		$('.building').show();
		$('.camera').hide();
	}else{

	}
})