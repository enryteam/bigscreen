/*!
 * project: 
 * author: shsbo
 * date:2016-12-14
 */
var data = Mock.mock('/rest/sndmonitor', 'post', {
    "error|6": [{
        "name": "@cword(3,5)",
        "value": "@natural(0,100)"
    }],
    "standard|4":[{
    	"name": "@cword(3,5)",
        "value": "@natural(0,100)"
    }]
});

(function($){

	var  $error = $('#error'),
	$standard = $('#standard');

	var renderError = function(data){
		for(var i=0;i<6;i++){
			for(var j=0;j<data.length;j++){
				if($('.item',$error).children('.name').eq(i).text() == data[j].name){
					$('.item em',$error).eq(i).html(data[j].value);
				}
			}
		}
	} 
	var renderStandart = function(data){
		for(var i=0;i<4;i++){
			for(var j=0;j<data.length;j++){
				if($('.item',$standard).children('.title').eq(i).text() == data[j].name){
					$('.orange').eq(i).text(data[j].value);
				}
			}
			
		}
	}
    var renderNums = function(data){
        $('.numbers span').each(function(i,e){
            $('.numbers span').eq(i).text(data[i]);
        })
    }

    //刷新数据
    var refreshData = function() {
        Util.ajax({
            url: settings.getmintor,
            success: function(data) {
              	renderError(data.error);
              	renderStandart(data.standard);
                renderNums(data.nums);
            },
            error: function(error) {
                console.log(error);
            }
        })
    }

    refreshData();
})(jQuery)