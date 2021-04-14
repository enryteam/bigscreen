/*!
 * project: 热点与趋势4
 * author: shsbo
 * date:2016-12-14
 */
 
(function($) {
    var chartRegular;
    var chartOption;
    var M = Mustache,
        eventTmpl = $('#event-template').html();
    //初始化图表
   
    var renderRegular = function(data) {
        function slices(data){
            if(data.length<29){
                return data
            }else{
                return data.slice(0,30)+'...';
            }
        }
        $.each(data,function(i,e){
            $('.tables span').eq(i).html(e.date);
            $('.divs p').eq(i).text(slices(e.name)); 
        })
    }
    var renderEvent = function(data) {
        var up = [],
            down = [];
        $.each(data.event, function(i, e) {
            e.index = i + 1
            if (i % 2) {
                down.push(e);
            } else {
                up.push(e);
            }
            data.up = up;
            data.down = down;
        })
        $('#event').html(M.render(eventTmpl, data));
    }

    var requestData = function() {
        Util.ajax({
            url: settings.getmintor,
            success: function(data) {
                renderRegular(data.list);
                renderEvent(data);
            }
        });
    };

    requestData();
}(jQuery));
