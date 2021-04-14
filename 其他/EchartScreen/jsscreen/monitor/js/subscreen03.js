/*!
 * project: 
 * author: shsbo
 * date:2016-12-15
 */

(function($) {
    var M = Mustache,
        tem = $('#main-template').html();
    var renderError = function(data) {
    	$('#main').prepend(M.render(tem, data));
    }
    //从第二屏传送过来的guid，获取详细信息
    var rowguid=Util.getUrlParams("rowguid");
    var cguid=Util.getUrlParams("cguid");
    
    //刷新数据
    var refreshData = function() {
    	var params={
    		rowguid:rowguid,
    		cguid:cguid
    	};
        Util.ajax({
            url: settings.getmintor,
            data: params,
            success: function(data) {
                renderError(data);
            },
            error: function(error) {
                console.log(error);
            }
        })
    }

    refreshData();
    
    // 插入督办信息
    submit = function() {
    	var params={
    			supvscontent:$('#supvscontent').val(),
    			rowguid:$('#rowguid').val()
        	};
        Util.ajax({
            url: "/rest/submonitor/insert",
            data: params,
            success: function(data) {
                $('#supvscontent').val("");
                
        		// rabitmq队列发送，调用消息队列的方法
        		var url="/jsscreen/risk/risk?warningTime=" + $('#warningTime').html() 
        				+ "&warningContent=" + $('#warningContent').html() 
        				+ "&supvsContent=" + $('#dcontent').html() 
        				+ "&supvsTime=" + $('#dtime').html();
//        		window.open(encodeURI(_rootPath+url));
        		sendRabbitMq(encodeURI(url));
            }
        })
    }
    
    var sendRabbitMq = function(url) {
		Util.ajax({
			//send_url为写死的地址  send为活的地址
			url : "/rest/sndrabbitmq/send",
			type : "post",
			data : {
				four : url
			}
		})
	}
    
    $('#submitbtn').click(function(){
    	var data = new Date();
    	$('.hd').removeClass('hidden');
    	$('#texts').addClass('hidden');
    	$('.dtime').text(data.toLocaleString());
    	$('.dcontent').text($('#supvscontent').val());
    	
    })
    $('.chooses .choose').click(function(){
    	$(this).toggleClass('current');
    })
})(jQuery)
