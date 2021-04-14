/*!
 * 监控与调度屏4
 * author:buly;
 * data:2016-12-12;
 */
var rand = function(m, n) {
    var c = n - m + 1;
    return Math.floor(Math.random() * c + m);
};

var areas = ["南京市", "无锡市", "徐州市", "常州市", "苏州市", "南通市", "连云港市", "淮安市", "盐城市", "扬州市", "镇江市", "泰州市", "宿迁市"];

$.mockjax({
    url: settings.loaddata,
    status: 200,
    responseTime: 800,
    contentType: "application/json",
    response: function(settings) {
        this.responseText = {
        	seating:rand(0,100),	//在线成员单位服务专席数量
        	phone:rand(0,1000),	//近5分钟电话诉求
        	web:rand(0,1000),	//近5分钟互联网诉求
        	consult:rand(0,1000),	//近5分钟政务服务网咨询量
        	delay:rand(0,60),	//短信发送延时(秒)
            areadelay: [{area:'南京市',value:2.3},{area:'南京市',value:2.3}]
        }
    }
});
