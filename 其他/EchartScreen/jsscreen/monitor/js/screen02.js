var rand = function(m, n) {
    var c = n - m + 1;
    return Math.floor(Math.random() * c + m);
}

var data = Mock.mock('/members/mintor/second', 'post', {
    error: {
        title: '类异常',
        values: [{
            name: '临近超期',
            val: rand(0, 100)
        }, {
            name: '临近超期',
            val: rand(0, 100)
        }, {
            name: '临近超期',
            val: rand(0, 100)
        }, {
            name: '临近超期',
            val: rand(0, 100)
        }, {
            name: '临近超期',
            val: rand(0, 100)
        }, {
            name: '临近超期',
            val: rand(0, 100)
        }]
    },
    standard: {
        title: '类异常',
        values: [{
            name: '不满艺术',
            val: rand(0, 100)
        }, {
            name: '不满艺术',
            val: rand(0, 100)
        }, {
            name: '不满艺术',
            val: rand(0, 100)
        }, {
            name: '不满艺术',
            val: rand(0, 100)
        }]
    },
    efficiency:[{
        name:'交办率',
        value:'96.5%'
    },{
        name:'超期率',
        value:'96.5%'
    },{
        name:'退单率',
        value:'96.5%'
    },{
        name:'收获率',
        value:'96.5%'
    },{
        name:'收获率',
        value:'96.5%'
    },{
        name:'收获率',
        value:'96.5%'
    }]
});


$(function() {
    var chartsatisfied,
        $halfRight = $('#halfRight');

    var chartoption;

    var rendersatisfied = function(data) {
        var namelist = [],
            valuelist = [];
        $.each(data, function(i, e) {
            namelist.push( e.name );
            valuelist.push(e.value);
        });
        console.log(1);
        $('#cc em').each(function(i,e){
            $('#cc span').eq(i).text(namelist[i]);
        });
        $('#cc span').each(function(i,e){
            $('#cc em').eq(i).text(valuelist[i]+"%");
        })
    }

    var rendermixed = function(data) {
        $('.inner:odd', $halfRight).addClass('blue');
        $('.showleft', showmessage).children('.em').text(data.mixed[0].value);
        $('.showleft', showmessage).children('p').text(data.mixed[0].name);
        $('.sritem', showmessage).eq(0).children('p').text(data.mixed[0].sublist[0].name);
        $('.percent').eq(0).text(data.mixed[0].sublist[0].value + '%');
        $('.inner').eq(0).css('width', data.mixed[0].sublist[0].value + '%');
        $('.sritem', showmessage).eq(1).children('p').text(data.mixed[0].sublist[1].name);
        $('.sritem', showmessage).eq(1).children('.percent').text(data.mixed[0].sublist[1].value);
        $('.percent').eq(1).text(data.mixed[0].sublist[1].value + '%');
        $('.inner').eq(1).css('width', data.mixed[0].sublist[1].value + '%');
        $('.showleft', showmessage1).children('.em').text(data.mixed[1].value);
        $('.showleft', showmessage1).children('p').text(data.mixed[1].name);
        $('.sritem', showmessage1).eq(0).children('p').text(data.mixed[1].sublist[0].name);
        $('.sritem', showmessage1).eq(1).children('p').text(data.mixed[1].sublist[1].name);
        $('.percent').eq(2).text(data.mixed[1].sublist[0].value + '%');
        $('.inner').eq(2).css('width', data.mixed[1].sublist[0].value + '%');
        $('.percent').eq(3).text(data.mixed[1].sublist[1].value + '%');
        $('.inner').eq(3).css('width', data.mixed[1].sublist[1].value + '%');
        console.log(data);
        //        $('.inner', $halfRight).each(function() {
        //            $(this).css({
        //                "width": $(this).data("width") + "%"
        //            })
        //        });
    }

    //刷新数据
    var xx = function(arr){
        var arrNew  = [arr[4],arr[0],arr[3],arr[2],arr[1]];
        return arrNew;
    }
    console.log(xx([1,2,3,4,5]));
    var showmessage = $('.showmessage').eq(0);
    var showmessage1 = $('.showmessage').eq(1);
    var refreshData = function() {
        Util.ajax({
            url: settings.getmintor,
            dataType: "json",
            success: function(data) {
                rendersatisfied(xx(data.efficiency));
                rendermixed(data);
            },
            error: function(error) {
                console.log(error);
            }

        })
    }

    refreshData();
})
