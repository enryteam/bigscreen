/*!
 * this
 * author:buly;
 * data:2016-12-10;
 */


var rand = function(m, n) {
    var c = n - m + 1;
    return Math.floor(Math.random() * c + m);
};

$.mockjax({
    url: settings.getmember,
    status: 200,
    responseTime: 800,
    contentType: "application/json",
    response: function(settings) {
        this.responseText = {
                city:'被京市',
                total:[{
                    name:'2016/01',value:rand(0,40000)
                },{
                    name:'2016/01',value:rand(0,40000)
                },{
                    name:'2016/01',value:rand(0,40000)
                },{
                    name:'2016/01',value:rand(0,40000)
                },{
                    name:'2016/01',value:rand(0,40000)
                },{
                    name:'2016/01',value:rand(0,40000)
                },{
                    name:'2016/01',value:rand(0,40000)
                },{
                    name:'2016/01',value:rand(0,40000)
                },{
                    name:'2016/01',value:rand(0,40000)
                },{
                    name:'2016/01',value:rand(0,40000)
                },{
                    name:'2016/01',value:rand(0,40000)
                },{
                    name:'2016/01',value:rand(0,40000)
                }],
                appeal:[{
                    name:'0:00',value:rand(0,200)
                },{
                    name:'0:00',value:rand(0,200)
                },{
                    name:'0:00',value:rand(0,200)
                },{
                    name:'0:00',value:rand(0,200)
                },{
                    name:'0:00',value:rand(0,200)
                },{
                    name:'0:00',value:rand(0,200)
                },{
                    name:'0:00',value:rand(0,200)
                },{
                    name:'0:00',value:rand(0,200)
                },{
                    name:'0:00',value:rand(0,200)
                },{
                    name:'0:00',value:rand(0,200)
                },{
                    name:'0:00',value:rand(0,200)
                },{
                    name:'0:00',value:rand(0,200)
                },{
                    name:'0:00',value:rand(0,200)
                },{
                    name:'0:00',value:rand(0,200)
                },{
                    name:'0:00',value:rand(0,200)
                },{
                    name:'0:00',value:rand(0,200)
                },{
                    name:'0:00',value:rand(0,200)
                },{
                    name:'0:00',value:rand(0,200)
                },{
                    name:'0:00',value:rand(0,200)
                },{
                    name:'0:00',value:rand(0,200)
                },{
                    name:'0:00',value:rand(0,200)
                },{
                    name:'0:00',value:rand(0,200)
                },{
                    name:'0:00',value:rand(0,200)
                },{
                    name:'0:00',value:rand(0,200)
                }],
                forthwith:{
                    name:'即时答复率',
                    value:(Math.random() * 50 + 50).toFixed(1)
                },
                ontime: {
                    name:'按时答复率',
                    value:(Math.random() * 50 + 50).toFixed(1)
                },
                satisfy: {
                    name:'回访满意率',
                    value:(Math.random() * 50 + 50).toFixed(1)
                },
                appealall:[{
                    name:'公共服务',
                    value:rand(0,100)
                },{
                    name:'公共服务',
                    value:rand(0,100)
                },{
                    name:'公共服务',
                    value:rand(0,100)
                },{
                    name:'公共服务',
                    value:rand(0,100)
                },{
                    name:'公共服务',
                    value:rand(0,100)
                }],
                type:[{
                    name:'异常类',
                    value:rand(0,100)
                },{
                    name:'公共类',
                    value:rand(0,100)
                },{
                    name:'公共类',
                    value:rand(0,100)
                },{
                    name:'公共类',
                    value:rand(0,100)
                }],
                number:['100,000','20,000','30,000','40,000']
        };
    }
});
