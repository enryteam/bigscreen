var data = Mock.mock('/rest/hotspot', 'post', {
    "list": [{
        name:'工单自动分类'
    },{
        name:'诉求预测及预案'
    },{
        name:'热点事件舆情监控'
    },{
        name:'识别久拖不解决问题'
    },{
        name:'成员单位绩效分析'
    }],
    "event|5": [{
        "name1": "@cword(1,7)",
        "name2": "@cword(4)",
        "name3": "@cword(4)"
    }]
});