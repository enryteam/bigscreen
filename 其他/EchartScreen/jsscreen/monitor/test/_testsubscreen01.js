/**!
 * [监控与调度钻取屏1]
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
                repwilloverdue: rand(100, 200),     //答复临近超期
                repoverdue: rand(10, 50),       //答复超期
                notsolve: rand(10, 50),         //长期未解决问题
                supwilloverdue: rand(10, 50),       //督办临近回复超期
                supoverdue: rand(10, 50),           //督办回复超期
                repunqualified: rand(10, 50),            //回复质量不合格
                dissatisfied: rand(10, 50),              //评价不满意
                repeatback: rand(10, 50),       //重复退单
                orderunqualified: rand(10, 50)        //工单抽检不合格
            }
        }
    }
});
