/*!
 * project: 延伸显示
 * author: chensmin
 * date:2016-12-19
 */
 
(function($) {
    var M = Mustache,
        eventTmpl = $('#event-template').html();

    var renderEvent = function(data) {
        var plan1 = [],
            plan2 =[];
        $.each(data.event, function(i, e) {
            e.index = i+1;
            if (i>1) {
                plan2.push(e);
            }else{
                plan1.push(e); 
            }
            data.plan1 = plan1;
            data.plan2 = plan2;
        })
        $('#event').html(M.render(eventTmpl, data));
    }

    var requestData = function() {
        $.ajax({
            url: settings.getmintor,
            success: function(data) {
                renderEvent(data);
            }
        });
    };

    requestData();
}(jQuery));