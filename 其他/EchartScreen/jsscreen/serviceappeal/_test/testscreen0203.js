/*!
 * this
 * author:buly;
 * data:2016-12-10;
 */

var areas = ["省12345","南京市", "无锡市", "徐州市", "常州市", "苏州市", "南通市", "连云港市", "淮安市", "盐城市", "扬州市", "镇江市", "泰州市", "宿迁市"];

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
                })(),
                appealnum:{
                    all:11178319,
                    lastmonth:152316,
                    lastweek:34128,
                    yesterday:4986,
                    average:7
                },
                numtrend: (function() {
                    var tmp = [],
                        now = new Date(),
                        y = now.getFullYear();
                    for (var i = 1; i < 13; i++) {
                        if(i<10){
                            i = '0'+i;
                        }
                        tmp.push({
                            time: y + '/'+ i,
                            value: rand(200000, 1000000)
                        });
                    }
                    return tmp;
                })(),
                typepie: [
                    { value: rand(0, 100), name: '咨询类' },
                    { value: rand(0, 100), name: '投诉类' },
                    { value: rand(0, 100), name: '求助类' },
                    { value: rand(0, 100), name: '建议类' }
                ],
                webtrend:(function() {
                    var tmp = [],
                        now = new Date();
                    for (var i = 1; i < 13; i++) {
                        tmp.push({
                            time: i+'月',
                            value: rand(100, 3000)
                        });
                    }
                    return tmp;
                })(),
            }
        };
    }
});
