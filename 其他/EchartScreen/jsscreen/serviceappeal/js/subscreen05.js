/*!
 * project: 
 * author: shsbo
 * date:2016-12-19
 */

(function($) {
    var M = Mustache,
        tem = $('#approach-template').html();
    var renderError = function(data) {
    	function slices(data){
    		if(data.length<29){
    			return data
    		}else{
    			return data.slice(0,30)+'...';
    		}
    	}
    	
        var html=[];
        for(i=1;i<=data.stepFour[0].starlist;i++){
            html.push('<li class="star"></li>');
        }
    	$('#main').prepend(M.render(tem, data));
        $('#starlist').html(html.join(''));
        $('.position3 .content').text(slices(data.stepThree[0].content));
    }
    
    //从list页面获取的rowguid，因rowguid唯一，从另外一张表获取数据
    var rowguid=Util.getUrlParams("rowguid");

    //刷新数据
    var refreshData = function() {
    	var params={
    		rowguid:rowguid	
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