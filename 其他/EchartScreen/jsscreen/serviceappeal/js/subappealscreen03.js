/**!
 * [监控与调度钻取屏2]
 * author: [chengang];
 * date:2016-12-15
 */

(function($) {
    var M = Mustache,
    $infolist = $('#infolist'),
    replyTmpl = $('#reply-tmpl').html();
    sendinfo = function(obj){
    	var rowguid = $(obj).children().children(".rowguidcss");
//    	window.open(_rootPath+"/jsscreen/serviceappeal/subscreen04?rowguid="+ rowguid.val());
		//rabitmq队列发送，调用消息队列的方法
//		var url="/jsscreen/serviceappeal/subscreen04?rowguid=" + rowguid.val();
//		sendRabbitMq(url);
    };
    var areacode=Util.getUrlParams("areacode");
    //答复临近超期
    var renderReplyList = function(data) {
        if (data.length) {
            $infolist.html(M.render(replyTmpl, { item: data }));
        }
    }

    //请求数据
    var requestData = function() {
    	var param={
    		areacode:areacode
    	};
        Util.ajax({
            url: settings.loaddata,
            data:param,
            success: function(data) {
                renderReplyList(data.replylist);
            }
        })
    };

    requestData();

    var sendRabbitMq = function(url) {
		Util.ajax({
			//send_url为写死的地址  send为活的地址
			url : "/rest/sndrabbitmq/send",
			type : "post",
			data : {
				one : url,
			}
		})
	}
}(jQuery));

