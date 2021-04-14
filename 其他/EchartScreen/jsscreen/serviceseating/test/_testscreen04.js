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
                servicetoday: [         //今日服务量
                    { name: "省", val: rand(1000, 6000) },
                    { name: "南京", val: rand(1000, 6000) },
                    { name: "苏州", val: rand(1000, 6000) },
                    { name: "无锡", val: rand(1000, 6000) },
                    { name: "常州", val: rand(1000, 6000) },
                    { name: "盐城", val: rand(1000, 6000) },
                    { name: "淮安", val: rand(1000, 6000) },
                    { name: "镇江", val: rand(1000, 6000) },
                    { name: "连云港", val: rand(1000, 6000) }
                ],
                onguardsum: {        //设区市实时在岗坐席
                    szx: rand(0, 50),
                    nj: rand(0, 50),
                    wx: rand(10, 20),
                    xz: rand(2, 10),
                    cz: rand(80, 90),
                    sz: rand(0, 50),
                    nt: rand(0, 50),
                    lyg: rand(10, 20),
                    ha: rand(2, 10),
                    yc: rand(80, 90),
                    yz: rand(0, 50),
                    zj: rand(0, 50),
                    tz: rand(10, 20),
                    sq: rand(2, 10)
                }
            }
        }
    }
});
