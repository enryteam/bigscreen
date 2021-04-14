var data = Mock.mock('/rest/hotspot', 'post', {
    "list": [{
        name:'规则时间规则时间规则时间规',
        date:'2016/08'
    },{
        name:'规则时间规则时间规则时间规',
        date:'2016/08'
    },{
        name:'规则时间规则时间规则时间规',
        date:'2016/08'
    },{
        name:'规则时间规则时间规则时间规',
        date:'2016/08'
    },{
        name:'规则时间规则时间规则时间规',
        date:'2016/08'
    },{
        name:'规则时间规则时间规则时间规',
        date:'2016/08'
    }],
    "event|6": [{
        "name": "@cword(10,15)",
        "time": "@date(yyyy/MM/dd)",
        "smalltime": "@date(MM/dd)",
        "number": "@natural(0,100)"
    }]
});
