/*！
*服务座席屏23
*date:2016-12-09
*author: chengang;
*/
var rand = function(m, n) {
    var c = n - m + 1;
    return Math.floor(Math.random() * c + m);
}
var randfloat = function(m, n) {
    var c = n - m + 1;
    return (Math.random() * c + m).toFixed(2);
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

                seatingstatus: {        //实时座席状态
                    free: rand(100, 200),   //空闲
                    calling: rand(100, 200),    //通话中
                    allmedia: rand(100, 200)      //全媒体
                },
                seatingdetail: (function() {
                    var result = [];
                    for (var i = 1; i <= 50; i++) {
                        result.push({
                            num: i,
                            status: rand(1, 3)      //1：空闲，2：通话中，3：全媒体
                        })
                    }
                    return result;
                })(),
                seatingsummary: {   //服务座席
                    total: 50,
                    media: 18,
                    servicenum: 135,
                    inservice: 50
                },
                allmediatype: {     //全媒体各类型占比
                    phone: rand(200, 300),
                    internet: rand(500, 1000)
                },
                internet: [ //互联网渠道占比
                    { name: "电子邮件", value: rand(5, 20) },
                    { name: "网站", value: rand(5, 20) },
                    { name: "微博", value: rand(5, 20) },
                    { name: "政务咨询", value: rand(5, 20) },
                    { name: "在线客服", value: rand(5, 20) },
                    { name: "微信", value: rand(5, 20) },
                    { name: "移动APP", value: rand(5, 20) }
                ],
                processtimebyway: [         //平均受理时间情况分析
                    { name: "电话", value: rand(5, 20) },
                    { name: "电子邮件", value: rand(5, 20) },
                    { name: "网站", value: rand(5, 20) },
                    { name: "微博", value: rand(5, 20) },
                    { name: "政务咨询", value: rand(5, 20) },
                    { name: "在线客服", value: rand(5, 20) },
                    { name: "微信", value: rand(5, 20) },
                    { name: "移动APP", value: rand(5, 20) }
                ],
                allmediadeal: [ //全媒体及时受理量
                    { name: "电话", value: randfloat(50, 100) },
                    { name: "电子邮件", value: randfloat(50, 100) },
                    { name: "网站", value: randfloat(50, 100) },
                    { name: "微博", value: randfloat(50, 100) },
                    { name: "政务咨询", value: randfloat(50, 100) },
                    { name: "在线客服", value: randfloat(50, 100) },
                    { name: "微信", value: randfloat(50, 100) },
                    { name: "移动APP", value: randfloat(50, 100) }
                ],
                knowledge: {        //知识库
                    total: rand(100000, 20000),
                    wordcount: rand(500, 1000),
                    keywordcount: rand(10, 20),
                    querycount: rand(2, 10),
                    adoptrate: rand(80, 90) + "%"
                },
                connectrate: randfloat(90, 100),    //接通率
                acceptrate: randfloat(80, 100)      //平均受理率

            }
        }
    }
});
