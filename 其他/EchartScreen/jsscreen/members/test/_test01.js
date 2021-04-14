function random(begin, end, flag) {
    if (flag) {
        return parseInt((Math.random() * (end - begin + 1) + begin)) / 10;
    } else {
        return parseInt(Math.random() * (end - begin + 1) + begin);
    }

}
var i = 0;

var data = Mock.mock('/rest/sndmember', 'post', {
    "controls": [],
    "custom": {
        "workency": [{
            "name": "民政厅民政厅",
            "value": random(800, 1000, true)
        }, {
            "name": "国土资源厅国土资源厅",
            "value": random(800, 1000, true)
        }, {
            "name": "交通运输厅交通运输厅",
            "value": random(800, 1000, true)
        }, {
            "name": "水利厅水利厅",
            "value": random(800, 1000, true)
        }, {
            "name": "卫生厅卫生厅",
            "value": random(800, 1000, true)
        }, {
            "name": "住建厅住建厅",
            "value": random(800, 1000, true)
        }, {
            "name": "教育厅教育厅",
            "value": random(800, 1000, true)
        }, {
            "name": "人社厅人社厅",
            "value": random(800, 1000, true)
        }, {
            "name": "环保厅环保厅",
            "value": random(800, 1000, true)
        }, {
            "name": "省农厅省农厅",
            "value": random(800, 1000, true)
        }],
        "satisfiedhd": ['2016.01.02', '2016.02.02'],
        "satisfied": [{
            "name": "民政厅",
            "value": [random(1800, 2000, false), random(1700, 1800, false), random(900, 1000, true)]
        }, {
            "name": "国土资源厅",
            "value": [random(1800, 2000, false), random(1700, 1800, false), random(900, 1000, true)]
        }, {
            "name": "交通运输厅",
            "value": [random(1800, 2000, false), random(1700, 1800, false), random(900, 1000, true)]
        }, {
            "name": "水利厅",
            "value": [random(1800, 2000, false), random(1700, 1800, false), random(900, 1000, true)]
        }, {
            "name": "卫生厅",
            "value": [random(1800, 2000, false), random(1700, 1800, false), random(900, 1000, true)]
        }, {
            "name": "住建厅",
            "value": [random(1800, 2000, false), random(1700, 1800, false), random(900, 1000, true)]
        }, {
            "name": "教育厅",
            "value": [random(1800, 2000, false), random(1700, 1800, false), random(900, 1000, true)]
        }, {
            "name": "人社厅",
            "value": [random(1800, 2000, false), random(1700, 1800, false), random(900, 1000, true)]
        }, {
            "name": "环保厅",
            "value": [random(1800, 2000, false), random(1700, 1800, false), random(900, 1000, true)]
        }, {
            "name": "省农厅",
            "value": [random(1800, 2000, false), random(1700, 1800, false), random(900, 1000, true)]
        }]
    }
});

var data = Mock.mock('/members/unit/second', 'post', {
    "units": {
        "stepOne": {
            "total": "@natural(20,40)",
            "detail": ['12345', '12345', '12345', '12345', '12345', '12345']
        },
        "stepTwo": {
            "total": "@natural(20,40)",
            "detail": ['12345', '12345', '12345', '12345', '12345', '12345', '12345']
        },
        "stepThree": {
            "total": "@natural(20,40)",
            "detail": ['广电局', '交通局', '电信局', '广电局', '交通局', '电信局']
        },
        "stepFour": {
            "total": "@natural(20,40)",
            "detail": ['南京', '无锡', '徐州', '常州', '苏州', '南通']
        }
    },
    "count": {
        "member": random(50, 100, false),
        "city": random(10, 20, false),
        "work": random(3000, 4000, false),
        "satisfied": random(950, 1000, true)
    },
    "month": {
        "over|30": [{
            'name|+1': 1,
            "value": "@natural(8000,12500)"
        }],
        "phone|30": [{
            'name|+1': 1,
            "value": "@natural(2500,7500)"
        }]
    },
    "dashboard": {
        "sign": random(850, 1000, true),
        "finsh": random(850, 1000, true),
        "speed": random(400, 600, true)
    }
});
