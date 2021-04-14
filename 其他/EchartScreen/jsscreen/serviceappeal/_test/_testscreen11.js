/*!
 * project: 
 * author: dongyf
 * date:2016-12-11
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
                appealyesterday: [ //昨日诉求量
                    { name: "0:00", value: rand(0, 200) },
                    { name: "2:00", value: rand(0, 200) },
                    { name: "4:00", value: rand(0, 200) },
                    { name: "6:00", value: rand(0, 200) },
                    { name: "8:00", value: rand(0, 200) },
                    { name: "10:00", value: rand(0, 200) },
                    { name: "12:00", value: rand(0, 200) },
                    { name: "14:00", value: rand(0, 200) },
                    { name: "14:00", value: rand(0, 200) },
                    { name: "16:00", value: rand(0, 200) },
                    { name: "18:00", value: rand(0, 200) },
                    { name: "20:00", value: rand(0, 200) },
                    { name: "22:00", value: rand(0, 200) },
                    { name: "24:00", value: rand(0, 200) }
                ],
                onguardsum: [ //诉求年龄
                    { name: "90年以后", value: rand(0, 100) },
                    { name: "80-90年", value: rand(0, 100) },
                    { name: "70-80年", value: rand(0, 100) },
                    { name: "60-70年", value: rand(0, 100) },
                    { name: "50-60年", value: rand(0, 100) },
                    { name: "50年前", value: rand(0, 100) }
                ],
                appealmedia: {
                    type: ['电话', '政务服务网', '网站', '微信', 'APP', '微博', '邮件'],
                    nums: [{
                        name: "咨询",
                        value: [rand(100, 300), rand(100, 300), rand(100, 300), rand(100, 300), rand(100, 300), rand(100, 300), rand(100, 300)]
                    }, {
                        name: "求助",
                        value: [rand(100, 300), rand(100, 300), rand(100, 300), rand(100, 300), rand(100, 300), rand(100, 300), rand(100, 300)]
                    }, {
                        name: "投诉",
                        value: [rand(100, 300), rand(100, 300), rand(100, 300), rand(100, 300), rand(100, 300), rand(100, 300), rand(100, 300)]
                    }, {
                        name: "建议",
                        value: [rand(100, 300), rand(100, 300), rand(100, 300), rand(100, 300), rand(100, 300), rand(100, 300), rand(100, 300)]
                    }, {
                        name: "表扬",
                        value: [rand(100, 300), rand(100, 300), rand(100, 300), rand(100, 300), rand(100, 300), rand(100, 300), rand(100, 300)]
                    }]
                }
            }
        }
    }
});
