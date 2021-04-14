var myTitle=GetQueryString("title");
var href = window.location.href;
var search = window.location.search;
var name = href.substring(href.lastIndexOf("/")+1,href.indexOf("."));
$(document).ready(function(){
	if(name!= "tjzj"){
	if(window.location.search!= null && search != ''){
		getBox(GetQueryString("id"),GetQueryString("title"),GetQueryString("url1"),GetQueryString("url2"));
	}
	}
	if($(".rightChart").length > 0){
		$(".rightChart").css('left',$('.rightChart').offset().left);
	}
	if($(".leftChart").length > 0){
		$(".leftChart").css('width',$(window).width()-495+"px");
	}
	$(".sidebar .afterHover").click(function(){
		$(".sidebar .afterHover").next("ol").hide();
		$(".sidebar .afterHover").parent().removeClass("click-on");
		$(this).parent().addClass("click-on");
		$(this).next("ol").slideToggle("slow");
	});
	$("#close-sidebar").click(function(){
		$(".sidebar").animate( {"left": "-250px"}, "slow");
		$("#contentDiv").animate( {"margin-left": "8px"}, "slow");
	});

	//放管服改革 链接去掉
	$('#zdyw-menu > li:eq(1) > a').attr('href','javascript:void(0)');
	
	/*
	$(".listMenu li").click(function(){
		$(".listMenu li").find("a").removeClass("a-after");
		$(this).find("a").addClass("a-after");
		var id = $(this).find("a").attr("title");
		$(".sidebar").animate( {"left": "-250px"}, "slow");
		$("#"+id).animate( {"left": "3px"}, "slow");
		$("#contentDiv").animate( {"margin-left": "168px"}, "slow");
	});
	*/
	/*$(".btn-list").mouseover(function(){
		$(this).next("ul").css("transform","translateX(-100%)");
	});*/

	$(".listMenu ul").prev().append("<i class='tool-close'></i>");
	$(".tool-close").click(function(){
		$(".btn-list").next("ul").css("transform","translateX(100%)");
		$(".listMenu li").find("ul").css({"visibility":"hidden","transform":"translateX(0%)","opacity":"0"});
	});
	$(".listMenu h6 a").click(function(){
		$('.listMenu h6 a').removeClass('active');
		$(this).addClass('active');
		$('.listMenu > div').hide();
		var divId = $(this).attr('id');
		$('#'+divId+'-menu').show();
	});
	$(".listMenu a").click(function(){
		$(this).parent().siblings().removeClass('active');
		$(this).parent().addClass('active');
	});
	//chartDiv关闭
	$('.chartDiv .close').click(function(){
	  $(this).parent().remove();
	});
	$('#windowSize').click(function(){
	    	if($(this).attr("class") == "bigWindow"){
		    	$(this).addClass("smallWindow");
		    	$(this).parent().animate({'width':$(window).width()-60+"px",'height':document.body.scrollHeight-85+'px','top':'-15px','left':'15px'});
	    	} else {
		    	$(this).removeClass("smallWindow");
	    		$(this).parent().animate({'width':$(window).width()-495+"px",'height':'660px','top':'0px','left':'30px'});
	    	}
	});
	$('.selectTree h6 span').click(function(){
		$(this).parent().next().toggle();
	});
	
	/*切换事件*/
	$(".smzq a,.mkhf li").click(function(){
	    $(this).siblings().removeClass("click_on");
		$(this).addClass("click_on");
	});
	/*菜单顺序修改*/
	/*$("#zdyw-menu>li").eq(0).children("a").html("投资形势分析").attr("href","tzxs.html");
	$("#zdyw-menu>li").eq(1).children("a").html("放管服改革").attr("href","fgf.html");*/
	/*tab切换*/
	$(".tabTitle a").click(function(){
	    $(this).siblings().removeClass("click_on");
		$(this).addClass("click_on");
	});
	
});
function reLink(){
	var cs = window.location.search;
	var num = cs.indexOf('&');
	var str = cs.substring(num+1);
	location.href = GetQueryString("name1")+".html"+cs;
}
function GetQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = location.search.substr(1).match(reg); 
	if (r != null) return unescape(decodeURI(r[2])); return null; 
} 
//标签切换

function Tab(objA,objB,className){
	$(objB).removeClass(className);
	$(objA).addClass(className);
}
//隐藏显示
function showHide(objA,objB){
	$(objA).parent().find('.chartHeight').hide();
	//$(objB).hide();
	$(objA).show();
}
/*添加图表*/
function addBox(Id2,title2,gsURL,ztzURL){
	//alert("index.html?id="+Id2+"&title="+title2+"&url1="+gsURL+"&url2="+ztzURL);
	var name = 'default';
	location.href="tjzj.html?name1="+name+"&id="+Id2+"&title="+title2+"&url1="+gsURL+"&url2="+ztzURL;
}
function getBox(Id2,title2,gsURL,ztzURL){
	    $('#contentDiv').append('<div class="chartDiv addBox" id="'+Id2+'"><span class="close"></span><span class="jbg topLeft"></span><span class="jbg topRight"></span><span class="jbg bottomLeft"></span><span class="jbg bottomRight"></span><h6 class="chartDivTitle"><span class="r"><a href="javascript:void(0)">个数</a><a href="javascript:void(0)" class="click-on">总投资</a></span>'+title2+'</h6>'+
				'<div class="chartHeight" id="fzf-gs1"><iframe  src="'+gsURL+'" class="iframeTest" frameborder="0"></iframe></div><div class="chartHeight" id="fzf-gs2" style="display:none"><iframe  src="'+ztzURL+'" class="iframeTest" frameborder="0"></iframe></div></div>');	
	
	 //$('#'+Id2).css("margin-left",-parseInt(width2)/2+100+"px");
    $('#'+Id2).transition({scale: 1},300);
	$('#'+Id2).draggabilly({ handle: '.chartDivTitle' });

	//box关闭
	$('.close').click(function(){
	  $(this).parents('.chartDiv').remove();
	});
}

/*点击时间轴按钮展开和关闭事件*/
function sjzFun(obj){
	if($("#sjz_close").is(":hidden")){
		$("#sjz_close").show();
		$("#sjz_open").hide();
		$("#sjzTab").hide();
	}else{
	    $("#sjz_close").hide();
		$("#sjz_open").show();
		$("#sjzTab").show();
	}
}