/**!
 * [监控与调度钻取屏2]
 * author: [chengang];
 * date:2016-12-15
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
                replylist: (function() {
                    var result = [];
                    for (var i = 1; i <= 10; i++) {
                        result.push({
                            num: i,
                            info: "省某某某单位接到任务单后,办理时间超过13小时",
                            title: "部门办理超期",
                            level: rand(1, 3),
                            deal: (rand(10, 100) % 2 == 0 ? true : false),
                            status:"督办处理"
                        })
                    }
                    return result;
                })()
            }
        }
    }
});
