var data = Mock.mock('/rest/submonitor', 'post', {
    'time':[2000,[2,3,5]],
    'total': [333,200],
    'state':[{
        name:'督办完成',
        value:300,
    },{
        name:'未督办',
        value:300,
    },{
        name:'督办处理中',
        value:300,
    }]
});
