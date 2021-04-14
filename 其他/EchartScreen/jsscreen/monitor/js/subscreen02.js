/**!
 * [监控与调度钻取屏2]
 * author: [chengang];
 * date:2016-12-15
 */

(function($) {
    var M = Mustache,
    $infolist = $('#infolist'),
    replyTmpl = $('#reply-tmpl').html();
    var mntguid = Util.getUrlParams("mntguid");

    //消息队列的onclick方法
    info = function(obj){
    	var rowguid = $(obj).children().children("#rowguid");
		var cguid = $(obj).children().children("#cguid");
		
		// 测试方法
//		window.open(_rootPath+"/jsscreen/monitor/subscreen03?rowguid=" + $(rowguid).val() + "&cguid=" + $(cguid).val());
		// rabitmq队列发送，调用消息队列的方法
//		var url="/jsscreen/monitor/subscreen03?rowguid=" + $(rowguid).val() + "&cguid=" + $(cguid).val();
//		sendrabbitmq(url);
    }
    
    //答复临近超期
    var renderReplyList = function(data) {
        if (data.length) {
            $infolist.html(M.render(replyTmpl, { item: data }));
        }
    }

    //请求数据
    var requestData = function() {
    	var params = {
    		mntguid : mntguid	
    	};
    	 
        Util.ajax({
            url: settings.loaddata,
            data: params,
            success: function(data) {
                renderReplyList(data.replylist);
            }
        })
    };

    var sendRabbitMq = function(url) {
		Util.ajax({
			//send_url为写死的地址  send为活的地址
			url : "/rest/sndrabbitmq/send",
			type : "post",
			data : {
				three : url
			}
		})
	}
    
    requestData();

}(jQuery));

