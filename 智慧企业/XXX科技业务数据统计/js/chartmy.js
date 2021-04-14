if($(window).width() > 991) {
	var total = window.innerHeight;
	document.getElementById("title").style.height = total * 0.1 + "px";
	document.getElementById("main").style.height = total * 0.9 + "px";
	title = document.getElementById("title");
	main = document.getElementById("main");

	box02 = document.getElementById("box02");
	box03 = document.getElementById("box03");
	box04 = document.getElementById("box04");
	title_h = title.offsetHeight;
	main_h = main.offsetHeight;

	box02_h = box02.offsetHeight;
	box03_h = box03.offsetHeight;
	box04_h = box04.offsetHeight;
	document.getElementById("box01").style.height = main_h * 0.65 + "px";
	document.getElementById("box8-box").style.height = main_h * 0.3 + "px";
	box02.style.height = main_h * 0.62 + "px";
	document.getElementById("box9-box").style.height = main_h * 0.3 + "px";
	box03.style.height = main_h * 0.475 + "px";
	box04.style.height = main_h * 0.475 + "px";
	box01 = document.getElementById("box01");
	box01_h = box01.offsetHeight;
	document.getElementById("total-mn1").style.height = box01_h * 0.02 + "px";
	document.getElementById("total-mn2").style.height = box01_h * 0.02 + "px";
	document.getElementById("live-box").style.height = box01_h * 0.05 + "px";
	document.getElementById("ym-menu").style.height = box03_h * 0.1 + "px";

};
var app = angular.module('MyApp', []);
		app.controller('customersCtrl', function($scope, $http) {
	        $http({
	            method:'get',
	            url:'data/da.json'
	        }).then(function(res){
	        	$scope.titleList = res.data.titleList;
	            $scope.dataList = res.data.dataList;
					var option = {
						color: ['#3398DB'],
						tooltip: {
							trigger: 'axis',
							axisPointer: { // 坐标轴指示器，坐标轴触发有效
								type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
							}
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true
						},
						xAxis: [{
							type: 'category',
							data: $scope.titleList,
							axisTick: {
								alignWithLabel: true
							}
						}],
						yAxis: [{
							type: 'value'
						}],
						
						series: [{
							name: '直接访问',
							type: 'bar',
							barWidth: '60%',
							data: $scope.dataList
						}]
					};

					var myChart = echarts.init(document.getElementById("box2"));  
			            myChart.setOption(option);
	        });
		});
		app.directive('barCharts', function() {  
			    return {  
			        scope: {  
			            id: "@",  
			            legend: "=",  
			            item: "=",  
			            data: "="  
			        },  
			        restrict: 'A',  
			        replace: true,  
			        link: function($scope, element, attrs, controller) {  
			            
			        }  
			    };  
		});