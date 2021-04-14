var rand = function(m, n) {
    var c = n - m + 1;
    return Math.floor(Math.random() * c + m);
}

$.mockjax({
    url: settings.getmintor,
    status: 200,
    responseTime: 800,
    contentType: "application/json",
    response: function(settings) {
        this.responseText = {
            nums:[100,100,100,100],
            error:{
                title:'类异常',
                values:[{
                    name:'临近超期',
                    val:rand(0,100)
                },{
                    name:'临近超期',
                    val:rand(0,100)
                },{
                    name:'临近超期',
                    val:rand(0,100)
                },{
                    name:'临近超期',
                    val:rand(0,100)
                },{
                    name:'临近超期',
                    val:rand(0,100)
                },{
                    name:'临近超期',
                    val:rand(0,100)
                }]
            },
            standard:{
                title:'类异常',
                values:[{
                    name:'不满艺术',
                    val:rand(0,100)
                },{
                    name:'不满艺术',
                    val:rand(0,100)
                },{
                    name:'不满艺术',
                    val:rand(0,100)
                }]
            }
        }
    }
});
