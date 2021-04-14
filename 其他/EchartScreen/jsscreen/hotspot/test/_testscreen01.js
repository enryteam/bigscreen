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
                keycloud: [
                    { name: "办公政府", value: rand(100, 1000) },
                    { name: "办公政府", value: rand(100, 1000) },
                    { name: "办公政府", value: rand(100, 1000) },
                    { name: "办公政府", value: rand(100, 1000) },
                    { name: "办公政府", value: rand(100, 1000) },
                    { name: "办公政府", value: rand(100, 1000) },
                    { name: "办公政府", value: rand(100, 1000) },
                    { name: "办公政府", value: rand(100, 1000) }
                ],
                intelligence:{
                    value:rand(0,100),
                    nums:['网页','政务服务','电话','微信','QQ','微博','手机','邮件']
                },
                appealtab:[{
                    name:'无热点问题1',
                    value:rand(0,1000)
                },{
                    name:'无热点问题',
                    value:rand(0,1000)
                },{
                    name:'无热点问题',
                    value:rand(0,1000)
                },{
                    name:'无热点问题',
                    value:rand(0,1000)
                },{
                    name:'无热点问题',
                    value:rand(0,1000)
                }],
                appealnear: [
                    { name: "政策法规", value: rand(100, 200) },
                    { name: "综合经济", value: rand(100, 200) },
                    { name: "行业经济", value: rand(100, 200) },
                    { name: "市场监管", value: rand(100, 200) },
                    { name: "社会事业", value: rand(100, 200) },
                    { name: "政法司法", value: rand(100, 200) },
                ]
            }
        }
    }
});
