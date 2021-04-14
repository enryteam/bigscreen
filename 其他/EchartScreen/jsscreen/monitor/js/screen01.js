/**!
 * [监控与调度屏1]
 * author: [chengang];
 * date:2016-12-12
 */
function getNow() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    if (month < 10) month = "0" + month;
    var day = now.getDate();
    if (day < 10) day = "0" + day;
    var hours = now.getHours();
    if (hours < 10) hours = "0" + hours;
    var minutes = now.getMinutes();
    if (minutes < 10) minutes = "0" + minutes;
    var seconds = now.getSeconds();
    if (seconds < 10) seconds = "0" + seconds;
    var timeStr = year + "年" + month + "月" + day + "日&nbsp;&nbsp;&nbsp;" + hours + "时" + minutes + "分" + seconds + "秒";
    return timeStr;
}

(function() {
    var arg = arguments;
    var nows = getNow();
    $("#time").html(nows);
    setTimeout(function() { arg.callee(); }, 1000);
})();


(function($) {
    renderAllMediaAppeal = function(data) {
        var $allmedia = $("#allmedia");
        for (var i in data) {
            $("li[class='" + i + "'] span", $allmedia).text(data[i]);
        }
    }

    //在线服务状态
    var renderOnlineStatus = function(data) {
    	console.log(data);
    	if(!jQuery.isEmptyObject(data)){
    		var jsonObj = eval("(" + data + ")");
    		var $onlinestatus = $("#onlinestatus");
    		try{
    			$(".num[data-lbl='user']", $onlinestatus).text(jsonObj.onlineUser);
        		$(".num[data-lbl='customerservice']", $onlinestatus).text(jsonObj.roleZGFWDB);
        		$(".num[data-lbl='servicevip']", $onlinestatus).text(jsonObj.roleZGCYDW);
        		$(".num[data-lbl='register']", $("#workorderstatus")).text(jsonObj.isEdit);
    		}catch(e){
    			
    		}
    		
    		
    	}
    }

    //工单状态
    var renderWorkOrderStatus = function(data) {
        var $workorderstatus = $("#workorderstatus");
        for (var i in data) {
        	if(i!="register"){
        		$(".num[data-lbl='" + i + "']", $workorderstatus).text(data[i]);
        	}
        }
    }

    //请求数据
    var requestData = function() {
        Util.ajax({
            url: settings.loaddata,
            success: function(data) {
                renderAllMediaAppeal(data.allmediaappeal);
                //renderOnlineStatus(data.onlinestatus);
                renderWorkOrderStatus(data.workorderstatus);
            }
        })
        
        sendWebSocket();
    };

    requestData();
    
    function sendWebSocket() {
		// websocket客户端
		var socket = atmosphere;
		var transport = 'websocket';
		// 注册request
		var request = {
			// 与后台连接地址 //WebSocket地址
			url : settings.usercount,
			contentType : "application/json", // 请求内容类型
			transport : transport, // 交互类型，默认为websocket
			reconnectInterval : 5000, // 重连间隔
		// 请求参数
		};

		// 连接失败时候执行的方法，一般是在不支持websocket的浏览器中用来切换交互类型的
		request.onTransportFailure = function(errorMsg, request) {
			request.fallbackTransport = "long-polling"; // 切换为长轮询
			transport = "long-polling"; // 客户端保存交互类型，后面有用
		};

		// 监听服务端发送的数据
		request.onMessage = function(response) {
			var msgStr = response.responseBody;
			renderOnlineStatus(msgStr);
			// 注意：在正常WebSocket连接中，一个json服务端会推送一次，所以msgStr一定是个json格式的字符串；
			// 在长轮询中，一次请求可能会取到多个json，但是并不是以数组格式返回，而是简单的拼接
			// eg:在服务端推送了{"text","你好"}和{"text","谢谢"}两个json，如果在同一次轮需被获取到msgStr的格式是{"text","你好"}{"text","谢谢"}
			// 在下面需要对长轮询取到的消息做处理，转成数组格式的字符串，然后进行操作。
			if (transport == "long-polling") {
				msgStr = "[" + msgStr.replace(/}{/g, '},{') + "]";
			}
		};
		// 建立连接，异步执行
		var subSocket = socket.subscribe(request);
	}

}(jQuery));

