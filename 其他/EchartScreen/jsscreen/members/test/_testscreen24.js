/*!
 * project: 
 * author: dongyf
 * date:2016-12-12
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
                servicetoday: [         //今日服务量
                    { name: "省中心", value: rand(1000, 6000) },
                    { name: "南京", value: rand(1000, 6000) },
                    { name: "苏州", value: rand(1000, 6000) },
                    { name: "无锡", value: rand(1000, 6000) },
                    { name: "常州", value: rand(1000, 6000) },
                    { name: "盐城", value: rand(1000, 6000) },
                    { name: "淮安", value: rand(1000, 6000) },
                    { name: "镇江", value: rand(1000, 6000) },
                    { name: "镇江", value: rand(1000, 6000) },
                    { name: "镇江", value: rand(1000, 6000) },
                    { name: "连云港", value: rand(1000, 6000) },
                    { name: "镇江", value: rand(1000, 6000) },
                    { name: "镇江", value: rand(1000, 6000) },
                    { name: "镇江", value: rand(1000, 6000) }
                ],
               forthwith:[{
                    name:'办理提速率',
                    value:(Math.random() * 50 + 50).toFixed(1)
                },{
                    name:'平均整合热线条数',
                    value:rand(0,100)
                },{
                    name:'平均联办部门数量',
                    value:rand(0,100)
                }]
            }
        }
    }
});
