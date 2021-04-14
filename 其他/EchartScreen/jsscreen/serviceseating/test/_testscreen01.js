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
                processtimebytype: [
                    { name: "全类别", value: rand(5, 20) },
                    { name: "咨询类", value: rand(5, 20) },
                    { name: "投诉类", value: rand(5, 20) },
                    { name: "求助类", value: rand(5, 20) },
                    { name: "建议类", value: rand(5, 20) },
                    { name: "表扬类", value: rand(5, 20) }
                ],
                knowledge: {        //知识库
                    total: rand(100000, 20000),
                    wordcount: rand(500, 1000),
                    keywordcount: rand(10, 20),
                    querycount: rand(2, 10),
                    adoptrate: rand(80, 90) + "%"
                },
                knowledgetype: [
                    { name: "政策法规", value: rand(100, 200) },
                    { name: "综合经济", value: rand(100, 200) },
                    { name: "行业经济", value: rand(100, 200) },
                    { name: "市场监管", value: rand(100, 200) },
                    { name: "社会事业", value: rand(100, 200) },
                    { name: "政法司法", value: rand(100, 200) },
                    { name: "民生保障", value: rand(100, 200) },
                    { name: "公开服务", value: rand(100, 200) },
                    { name: "城建城管", value: rand(100, 200) },
                    { name: "行政许可", value: rand(100, 200) },
                    { name: "应急预案", value: rand(100, 200) },
                    { name: "生活常识", value: rand(100, 200) }
                ]
            }
        }
    }
});
