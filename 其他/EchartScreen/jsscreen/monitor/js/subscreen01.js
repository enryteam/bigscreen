/**!
 * [监控与调度钻取屏1]
 * author: [chengang];
 * date:2016-12-15
 */

(function($) {
	//消息队列的onclick方法
	$('.alert').click(function(){
		//测试方法
//		window.open(_rootPath+"/jsscreen/monitor/subscreen02?mntguid="+this.id);
		//rabitmq队列发送，调用消息队列的方法
//		var url="/jsscreen/monitor/subscreen02?mntguid="+this.id;
//		sendRabbitMq(url);
	});
    //风险监控预警
    var renderMonitorWarn = function(data) {
        var $monitor = $("#monitor");
        for (var i in data) {
            $(".num[data-lbl='" + data[i].name + "']", $monitor).text(data[i].title);
            $(".alert", $monitor).attr('id', data[i].id);
        }
    }

    //请求数据
    var requestData = function() {
        Util.ajax({
            url: settings.loaddata,
            success: function(data) {
            	console.log(data);
                renderMonitorWarn(data.datalist);
            }
        })
    };
    
    var sendRabbitMq=function(url) {
		Util.ajax({
			//send_url为写死的地址  send为活的地址
			url : "/rest/sndrabbitmq/send",
			type : "post",
			data : {
				two : url,
			}
		})
	}

    requestData();
    $('.alert').click(function(){
        $(this).addClass('current').siblings().removeClass('current');

    })
}(jQuery));

