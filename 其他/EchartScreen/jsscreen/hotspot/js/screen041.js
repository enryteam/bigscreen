/*!
 * project: 热点与趋势4
 * author: shsbo
 * date:2016-12-14
 */

(function($) {
    var M = Mustache,
        eventTmpl = $('#event-template').html();

    var renderEvent = function(data) {
        var first = ['blue', 'green', 'Purple'];
        var second = ['green', 'Purple', 'blue'];
        var third = ['blue', 'Purple', 'green'];
        $('#main').html(M.render(eventTmpl, data));
        $('#left ul').each(function(i, e) {
            switch (i) {
                case 0:
                    for (i = 0; i < 3; i++) {
                        $('.item', $(this)).eq(i).addClass(first[i]);
                    }
                    break;
                case 1:
                    for (i = 0; i < 3; i++) {
                        $('.item', $(this)).eq(i).addClass(second[i]);
                    }
                    break;
                case 2:
                    for (i = 0; i < 3; i++) {
                        $('.item', $(this)).eq(i).addClass(third[i]);
                    }
                    break;

            }
        });
    }

    var requestData = function() {
        Util.ajax({
            url: settings.getmintor,
            success: function(data) {
                renderEvent(data);
            }
        });
    };

    requestData();
}(jQuery));
