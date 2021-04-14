/*！
*服务座席屏1
*date:2016-12-09
*author: chengang;
*/
var rand = function(m, n) {
    var c = n - m + 1;
    return Math.floor(Math.random() * c + m);
}

$.mockjax({
    url: settings.loaddata,
    status: 200,
    responseTime: 800,
    contentType: "application/json",
    response: function(settings) {
        this.responseText = {
            "controls": [],
            "custom": {
                allmediaappeal: {         //实时全媒体诉求
                    total: rand(100, 200),
                    phone: rand(10, 50),
                    wechat: rand(10, 50),
                    website: rand(10, 50),
                    email: rand(10, 50),
                    weibo: rand(10, 50),
                    app: rand(10, 50),
                    govconsult: rand(10, 50),
                },
                onlinestatus: {
                    user: rand(10, 200),    //在线用户
                    customerservice: rand(50, 100),     //在岗服务代表
                    servicevip: rand(10, 100)              //在岗成员单位服务专席
                },
                workorderstatus: {
                    register: rand(10, 50),      //正在登记服务工单
                    member: rand(10, 300),        //成员单位在办服务工单
                    wait: rand(10, 50)           //等待交办服务工单
                }
            }
        }
    }
});
