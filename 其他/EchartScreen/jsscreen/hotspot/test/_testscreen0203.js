/*!
 * 热点趋势23
 * author:buly;
 * data:2016-12-14;
 */
var areas = ["南京市", "无锡市", "徐州市", "常州市", "苏州市", "南通市", "连云港市", "淮安市", "盐城市", "扬州市", "镇江市", "泰州市", "宿迁市"];

var rand = function(m, n) {
    var c = n - m + 1;
    return Math.floor(Math.random() * c + m);
};

var rendTrend = function(m, n) {
    var tmp = [],
        now = new Date(),
        m = now.getMonth() + 1,
        y = now.getFullYear();
    for (var i = 0; i < 3; i++) {
        tmp.push({
            time: y + "/" + m,
            num: rand(m, n)
        });
        m++;
        if (m > 12) {
            m = 1;
            y++;
        }
    }
    m = now.getMonth() + 1;
    y = now.getFullYear();
    for (var j = 0; j < 12; j++) {
        m--;
        if (m <= 0) {
            m = 12;
            y--;
        }
        tmp.unshift({
            time: y + "/" + m,
            num: rand(m, n)
        });
    }
    return tmp;
};

$.mockjax({
    url: settings.loaddata,
    status: 200,
    responseTime: 800,
    contentType: "application/json",
    response: function(settings) {
        this.responseText = {
            controls: [],
            custom: {
                appeal: rendTrend(0, 150000),
                web: rendTrend(0, 100),
                rise: [{
                    num: 1,
                    issue: '工地施工，夜间时段',
                    totnum: 321,
                    risenum: 321
                }, {
                    num: 2,
                    issue: '工地施工，夜间时段',
                    totnum: 321,
                    risenum: 321
                }, {
                    num: 3,
                    issue: '工地施工，夜间时段',
                    totnum: 321,
                    risenum: 321
                }, {
                    num: 4,
                    issue: '工地施工，夜间时段',
                    totnum: 321,
                    risenum: 321
                }, {
                    num: 5,
                    issue: '工地施工，夜间时段',
                    totnum: 321,
                    risenum: 321
                }],
                reduce: [{
                    num: 1,
                    issue: '工地施工，夜间时段',
                    totnum: 321,
                    reducenum: 321
                }, {
                    num: 2,
                    issue: '工地施工，夜间时段',
                    totnum: 321,
                    reducenum: 321
                }, {
                    num: 3,
                    issue: '工地施工，夜间时段',
                    totnum: 321,
                    reducenum: 321
                }, {
                    num: 4,
                    issue: '工地施工，夜间时段',
                    totnum: 321,
                    reducenum: 321
                }, {
                    num: 5,
                    issue: '工地施工，夜间时段',
                    totnum: 321,
                    reducenum: 321
                }],
                map: {
                    coordJs: {
                        '南京市': [118.8062, 32.4408],
                        '南通市': [121.1023, 32.1625],
                        '宿迁市': [118.5535, 33.7775],
                        '常州市': [119.4543, 31.5582],
                        '徐州市': [117.5208, 34.3268],
                        '扬州市': [119.4653, 32.8162],
                        '无锡市': [120.3442, 31.5527],
                        '泰州市': [120.0586, 32.5525],
                        '淮安市': [118.927, 33.4039],
                        '盐城市': [120.2234, 33.5577],
                        '苏州市': [120.6519, 31.3989],
                        '连云港市': [119.1248, 34.552],
                        '镇江市': [119.4763, 31.9702]
                    },
                    area: (function() {
                        var tmp = [],
                            len = areas.length;
                        $.each(areas, function(i, e) {
                            tmp.push({
                                name: e,
                                value: rand(0, 1000)
                            });
                        });
                        return tmp;
                    })(),
                    lines: (function() {
                        var tmp = [];
                        $.each(areas, function(i, e) {
                            tmp.push([{
                                fromname: e,
                                value:rand(0,1000)
                            }, {
                                toname: '南京市'
                            }]);
                        });
                        return tmp;
                    })(),
                    locate:[{
                        name:'盐城市',
                        things:'盐城遭遇强对流自然灾害',
                        time:'2016/6/23'
                    },{
                        name:'徐州市',
                        things:'徐州遭遇强对流自然灾害',
                        time:'2016/6/23'
                    },{
                        name:'苏州市',
                        things:'苏州遭遇强对流自然灾害',
                        time:'2016/6/23'
                    }]
                }
            }
        };
    }
});
