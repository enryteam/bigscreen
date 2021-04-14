/*!
 * project: 
 * author: shsbo
 * date:2016-12-19
 */

(function($) {
    var M = Mustache,
        tem = $('#approach-template').html();
    var renderError = function(data) {
    	$('#main').prepend(M.render(tem, data));
    }
    
    var warningTime = Util.getUrlParams("warningTime");
    var warningContent = Util.getUrlParams("warningContent");
    var supvsContent = Util.getUrlParams("supvsContent");
    var supvsTime = Util.getUrlParams("supvsTime");
    
    //从list页面获取的rowguid，因rowguid唯一，从另外一张表获取数据
    var rowguid=Util.getUrlParams("rowguid");

    //刷新数据
    var refreshData = function() {
    	var params={
    		warningTime : warningTime,
    		warningContent : warningContent,
    		supvsContent : supvsContent,
    		supvsTime : supvsTime
    	};
        Util.ajax({
            url: settings.getmintor,
            data:params,
            success: function(data) {
                renderError(data);
            },
            error: function(error) {
                console.log(error);
            }
        })
    }

    refreshData();
})(jQuery)