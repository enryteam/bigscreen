/*!
 * 监控与调度屏4
 * author:buly;
 * data:2016-12-12;
 */
(function(win, $) {
    var $seating = $('#seating'), //在线成员单位服务专席数量
        $phone = $('#phone'), //近5分钟电话诉求
        $web = $('#web'), //近5分钟互联网诉求
        $consult = $('#consult'), //近5分钟政务服务网咨询量
        $delay = $('#delay'); //短信发送延时(秒)

    var M = Mustache,
        $areaDelay = $('#areadelay'),
        areaTmpl = $('#areatmpl').html();


    // 渲染在线成员单位服务专席数量
    var renderSeating = function(data) {
        var $numTip = $('.num-tip', $seating);
        $('span', $numTip).text(data + '人');
        if (data > 15) {
            $numTip.addClass('green');
        } else {
            $numTip.addClass('red');
        }
    };

    // 近5分钟电话诉求
    var renderPhone = function(data) {
        var $pointer = $('.pointer', $phone);
        $('.mod-tot', $phone).text(data+'件');
        if (data === 0) {
            $pointer.addClass('toleft');
        } else if (data >= 500) {
            $pointer.addClass('toright');
        } else {
            $pointer.addClass('tomid');
        }
    };

    // 近5分钟互联网诉求
    var renderWeb = function(data) {
        var $pointer = $('.pointer', $web);
        $('.mod-tot', $web).text(data+'件');
        if (data === 0) {
            $pointer.addClass('toleft');
        } else if (data >= 500) {
            $pointer.addClass('toright');
        } else {
            $pointer.addClass('tomid');
        }
    };

    // 近5分钟政务服务网咨询量
    var renderConsult = function(data) {
        var $numTip = $('.num-tip', $consult);
        $('span', $numTip).text(data+'件');
        if (data === 0) {
            $numTip.addClass('red left');
        } else if (data >= 500) {
            $numTip.addClass('red right');
        } else {
            $numTip.addClass('green');
        }
    };

    // 短信发送延时(秒)
    var renderDelay = function(data) {
        var $numTip = $('.num-tip', $delay);
        $('span', $numTip).text(data + 's');
        if (data <= 10) {
            $numTip.addClass('green');
        } else if (data >= 30) {
            $numTip.addClass('red');
        } else {
            $numTip.addClass('yellow');
        }
    };

    //渲染系统对接数据交换延时量
    var renderAreaDelay = function(data) {
        var max = 0;
        $.each(data, function(i, e) {
            if (max < e.time) {
                max = e.time;
            }
        });
        max = Math.ceil(max) + 2;
        $.each(data, function(index, val) {
            val.percent = Math.ceil(val.time / max * 100);
        });
        if (data) {
            $areaDelay.html(M.render(areaTmpl, { item: data }));
        }

        $('.bar-crisis',$areaDelay).text(5);

        var barGreenWidth = Math.ceil(5 / max * 100);
        $('.bar-green', $areaDelay).width(barGreenWidth + '%');
        $('.bar-red', $areaDelay).width((100 - barGreenWidth) + '%');
        $('.bar-crisis', $areaDelay).css('left', barGreenWidth + '%');



        $('.areadelay-item', $areaDelay).each(function(i, e) {
            var $this = $(this),
                $bar = $this.find(".inner"),
                w = $bar.data("width");
            $bar.width(w + "%");
            if (w > barGreenWidth) {
                $this.addClass('red');
            } else {
                $this.addClass('green');
            }
        });


    };

    var requestData = function() {
        Util.ajax({
            url: settings.loaddata,
            success: function(data) {
                renderAreaDelay(data.areadelay);
                renderSeating(data.seating);
                renderPhone(data.phone);
                renderWeb(data.web);
                renderConsult(data.consult);
                renderDelay(data.delay);
            }
        });
    };

    requestData();

}(this, jQuery));
