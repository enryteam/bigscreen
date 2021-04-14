/*!
 * 服务诉求钻取1
 * author:chengang;
 * data:2016-12-16;
 */

var areas = ["省12345", "南京市", "无锡市", "徐州市", "常州市", "苏州市", "南通市", "连云港市", "淮安市", "盐城市", "扬州市", "镇江市", "泰州市", "宿迁市"];

var rand = function(m, n) {
    var c = n - m + 1;
    return Math.floor(Math.random() * c + m);
};

$.mockjax({
    url: settings.loaddata,
    status: 200,
    responseTime: 800,
    contentType: "application/json",
    response: function(settings) {
        this.responseText = {
            "controls": [],
            "custom": {
                statusnum: (function() {
                    var tmp = [];
                    $.each(areas, function(i, e) {
                        tmp.push({
                            name: e,
                            value: rand(3000, 8000)
                        });
                    });
                    return tmp;
                })()
            }
        };
    }
});
