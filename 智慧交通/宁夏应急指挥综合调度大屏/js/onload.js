(function($){

////CONFIGURATION
var WIDTH_BOOK           			//WIDTH BOOK
var HEIGHT_BOOK						//HEIGHT BOOK
var BOOK_SLUG;						//SLUG FOR BOOK
var WINDOW_WIDTH;                   //WIDTH AREA [px]
var WINDOW_HEIGHT;                  //HEIGHT AREA [px]
var ZOOM_STEP 		        		//STEPS SIZE FOR ZOOM
var ZOOM_DOUBLE_CLICK_ENABLED;		//ENABLED DOUBLE CLICK FOR ZOOM
var ZOOM_DOUBLE_CLICK;    			//ZOOM FOR DOUBLE CLICK
var GOTOPAGE_WIDTH;					//WIDTH FOR INPUT FIELD
var IS_AS_TEMPLATE               	//IF THIS TEMPLATE 
var TOOL_TIP_VISIBLE                //TOOLTIP VISIBLE
var SWF_ADDRESS                     //SWF ADDRESS
var TOOLS_VISIBLE                   //TOOLBAR VISIBLE
var RTL                             //RIGHT TO LEFT


/* =  event ready 
--------------------------*/
$(document).ready(function(e) {		 
	
	if( general.browser_firefox() ) {
		console.log('book:version jquery = '+$.fn.jquery);	
	}
	
	Book_v7.ready();
});

$(window).load(function(e){
	
	 Book_v7.load()
})



 
/* =  set Page
--------------------------*/
     
  setPage=function(nr_) {
      
      if( SWF_ADDRESS == "true" ){ 
          var results= $("#fb7-deeplinking ul li[data-page="+nr_+"]");
		  var address = results.attr('data-address');
	  	  setAddress( $('#fb7').attr('data-current')+"/"+address);	
      }else{
           $('#fb7-book').turn('page',nr_);      
      }
       
 };
 

/* =  set Address
--------------------------*/

 setAddress=function(address_) {
       
	   $.address.value( address_ );
  };


/* =  show lightbox with video 
--------------------------*/

  youtube=function(id_,w_,h_) {

	 var w=w_;
	 var h=h_;
	 var id=id_;
	 
	$('body').prepend('<div id="v7_lightbox"><div class="bcg"></div><iframe class="youtube-player" width='+w+' height='+h+' src="http://www.youtube.com/embed/'+id+'?html5=1" frameborder="0" allowfullscreen></iframe></div>');
  
    $(window).trigger('orientationchange');
	  	
	$("#v7_lightbox").click(function(){
		$(this).children().hide();
		$(this).remove();
        
        Book_v7.zoomAuto();
	})
	
	$("#v7_lightbox").css('display','block');
	
 };
 
 
/* =  prototype 
--------------------------*/
Number.prototype.rtl=function()
{
return (Book_v7.getLength()+1)-this.valueOf();
}


/* =  local general function 
--------------------------*/
var general={

browser_firefox:function(){	
	if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
	  return true;	
	}else{
	  return false;	
	}
}

}


/* =  FlipBook v7
--------------------------*/
var Book_v7 = {

	toolsHeight:0,   //tools height
    zoom:1,           //zoom
    page_padding:0.1,
    paddingL:0.06,
    paddingR:0.06,
    paddingT:0.05,
    paddingB:0.05,
    currentPage:0,
    


    ready: function(){
	   if( general.browser_firefox() ) {	
       		console.log('book:ready');    
	   }
	   
	   ///even and odd using jQuery
	   //$("#fb7-book > div:odd").addClass("odd");
	    ///even and odd
	   //$("#fb7-book > div:even").addClass("even");
  
	  
       //Configuration
       var config=$('#fb7-ajax').data('config'); 
       Book_v7.config=config; 
       WIDTH_BOOK=Number(config['page_width'])*2;  	 
       HEIGHT_BOOK=Number(config['page_height']);
       ZOOM_STEP=Number(config['zoom_step']);
       ZOOM_DOUBLE_CLICK_ENABLED=(config['double_click_enabled']);           
       ZOOM_DOUBLE_CLICK=Number(config['zoom_double_click'])
       GOTOPAGE_WIDTH=Number(config['gotopage_width']);
       TOOL_TIP_VISIBLE=(config['tooltip_visible']);
       SWF_ADDRESS=(config['deeplinking_enabled']);
	   RTL=config['rtl'];
	   
	    //add class 'even' and 'odd' using jQuery
	   if( RTL == "false" ){		   
		   $("#fb7-book > div:odd").addClass("odd");
		   $("#fb7-book > div:even").addClass("even");
	   }else{
		   $("#fb7-book > div:odd").addClass("even");
		   $("#fb7-book > div:even").addClass("odd");		   
	   }
	   
	   
       IS_AS_TEMPLATE= $('#fb7-ajax').attr('data-template') == "true" ? true : false;
       TOOLS_VISIBLE=(config['toolbar_visible']);
       if( TOOLS_VISIBLE == "true" ){
			 Book_v7.toolsHeight=69;
	   }else{
			 Book_v7.toolsHeight=0;
		}
		
		WINDOW_WIDTH=$('#fb7').width();
        WINDOW_HEIGHT=$('#fb7').height();
		
		///about show
		$('#fb7-about').css('display','block');		
			
			      

       //event resize
       $(window).bind('orientationchange resize', function(event){
            Book_v7.book_area();
            Book_v7.zoomAuto();
            Book_v7.book_position();
            Book_v7.dragdrop_init();        
            Book_v7.resize_page()     
            Book_v7.center($('#v7_lightbox'));           
            Book_v7.center_icon();
            Book_v7.center_icon();
            Book_v7.media_queries()
				
					
			
		});
				
				
		//reverse book		
		$( $('#fb7-book>div').get().reverse()  ).each(function(index,element) { 
			    var item=$(element);
				var meta=$('div.fb7-meta',this);
				///for only reverse
				if( RTL == "true" ){				  
					  //reverse					
					  $(this).appendTo( $(this).parent() );					  
					  //reorder description and number
					  var desc=$('span.fb7-description',item);
					  if( desc.index() ==0 ){
						//desc.appendTo(meta);						  
					  }else{
						//desc.prependTo(meta); 
					  }				  					  
					  ///for double
					  if( item.hasClass('fb7-double') ){						  
						if(  item.hasClass('fb7-first') ){
						     item.removeClass('fb7-first').addClass('fb7-second');							
						}else if( item.hasClass('fb7-second') ){
							 item.removeClass('fb7-second').addClass('fb7-first');							
						}						  
					  }		
					 //add data for meta
				 	 if( index%2!=0 ){			 
				  		//meta.addClass('fb5-left');		
				 	 }else{
				  		//meta.addClass('fb5-right');					 
				 	 }			  
      			}else{
					 //add data for meta
				 	 if( index%2==0 ){			 
				  		//meta.addClass('fb5-left');		
				 	 }else{
				  		//meta.addClass('fb5-right');					 
				 	 }					
				} 
		});		
		   		
		   
    
        //preloader start
        var preloader_visible=Book_v7.config['preloader_visible'];
        if( preloader_visible=="true"){
           $('.fb7-preloader').css('display','block');
        }
        
      
        
        Book_v7.resize_input_text()
    	Book_v7.book_area();
    	$("#fb7").css('opacity','1');
    	
            
        
        /* SCALE PAGE IN FLIPBOOK  /*/
        //size default for class .fb7-cont-page-book
        $("#fb7 .fb7-cont-page-book").css('width',(WIDTH_BOOK/2)+'px');
        $("#fb7 .fb7-cont-page-book").css('height',HEIGHT_BOOK+'px');
        $("#fb7 .fb7-cont-page-book").css({'transform-origin':'0 0','-ms-transform-origin':'0 0','-webkit-transform-origin':'0 0'});
        //size default for class .page_book
        var paddingL=WIDTH_BOOK*this.paddingL;
        var paddingR=WIDTH_BOOK*this.paddingR;
        var paddingT=WIDTH_BOOK*this.paddingT;
        var paddingB=WIDTH_BOOK*this.paddingB;
        $("#fb7 .fb7-page-book").css('width',(WIDTH_BOOK/2-(paddingL+paddingR))+'px');
        $("#fb7 .fb7-page-book").css('height',(HEIGHT_BOOK-(paddingT+paddingB))+'px');
        
        /* SCALE ABOUT near FLIPBOOK  /*/
        $("#fb7 #fb7-about").css('width',(WIDTH_BOOK/2)+'px');
        $("#fb7 #fb7-about").css('height',HEIGHT_BOOK+'px');
		if(RTL=='true'){
			$("#fb7 #fb7-about").css('right','0px');
			$("#fb7 #fb7-about").css({'transform-origin':'right 0','-ms-transform-origin':'right 0','-webkit-transform-origin':'right 0'});
		}else{
        	$("#fb7 #fb7-about").css({'transform-origin':'0 0','-ms-transform-origin':'0 0','-webkit-transform-origin':'0 0'});
		}
		
        //run key
        this.key_down();    

        //show and hide full screen icon
        if(!$.support.fullscreen){
        	$('li a.fb7-fullscreen').parent(this).remove();
        }
             
    },
        
    load: function(){
		if( general.browser_firefox() ) {
        	console.log('book:load');
		}
		
        //preloader hide
        $('.fb7-preloader').css('display','none');
        
   		$.address.strict(false)
		$.address.autoUpdate(true)
	
		$('#fb7-container-book').show();
		
		Book_v7.init();
	
		Book_v7.zoomAuto();
		
		Book_v7.book_position();
	
		Book_v7.dragdrop_init();

		Navigation_v7.init();

		Book_v7.resize_page();   
        
        if( TOOLS_VISIBLE == "true" ){
        	$("#fb7 #fb7-footer").css('opacity','1');
        }
        
         //center icon
        Book_v7.center_icon();
        Book_v7.center_icon();
        Book_v7.media_queries()
   
         
    },
	
	getLength:function(){		
		return $('#fb7-deeplinking ul li').length;		
	},
    
    center_icon:function(){
    
	    //$('#fb7 #fb7-footer').css('width',($('#fb7').width()-12));	 
	
        //icon tools position
        var icon=$('#fb7-center');
        var all_width=$('#fb7').width();
        var left_w=$('#fb7-logo').width();
        var center_w=$('#fb7-center').width();
        var right_w=$('#fb7-right').width();
                
        var posX=all_width/2-center_w/2;
        icon.css('left',posX+'px');
        
		
        var zoom_org=$('a.fb7-zoom-original').parent();
		var zoom_auto=$('a.fb7-zoom-auto').parent();
		
		if( all_width <= 450 ){
			zoom_org.css('display','none');
			zoom_auto.css('display','none');
		}else{
		    zoom_org.css('display','block');
			zoom_auto.css('display','block');
	    }
		
		
        
        
    },
    
    media_queries:function (){
             
       //center
       var position_center=$('#fb7-center').position();
       var xMax_center=position_center.left+$('#fb7-center').width();
       var xMin_center=position_center.left
       //right
       var position_right=$('#fb7-right').position();
       var xMin_right=position_right.left;
       //left
       var position_left=$('#fb7-logo').position();
       var xMax_left=position_left.left+$('#fb7-logo').width();
              
       if( xMax_center > xMin_right || xMax_left > xMin_center  ){
         $('#fb7 #fb7-right,#fb7 #fb7-logo').css('visibility','hidden');
       }else{
         $('#fb7 #fb7-right,#fb7 #fb7-logo').css('visibility','visible');
       }


    }, 
    
    autoMarginB:function(){
      return Math.round(  $('#fb7').height()*0.02 )
    },
    
    autoMarginT:function(){
        return Math.round( $('#fb7').height()*0.02 )    
    },
    
     autoMarginL:function(){
      return Math.round( $('#fb7').width()*0.02 )    
    },
    
     autoMarginR:function(){
       return Math.round(  $('#fb7').width()*0.02 )   
    },
	
	change_address:function(){
		
						var th=this;
						if( general.browser_firefox() ) {
							console.log("book:change address")
						}
						//$('h1.entry-title').append(' /change ')
					    ///for slug
					    var slug=$.address.pathNames()[0];
					    if(th.tmp_slug!=undefined&&slug!=th.tmp_slug){
			   			 
					      
						 //setAddress('book5-1'); 
						 setTimeout(function(){
						 window.location.reload();
						 },1);
						 
						 if( general.browser_firefox() ) {
						 	console.log("book:change book")
						 }
						 //$('h1.entry-title').append(' /change book ')
						 
						 $("#fb7").remove();
						 // Ajax_v7.ready()
						 return;
					   }
					   
					   th.tmp_slug=slug;
					
					   //normal
                       var address=$.address.pathNames()[$.address.pathNames().length-1];
                       var results=$('#fb7-deeplinking ul li[data-address='+address+']');
                       var nrPage=results.attr('data-page')
					   if(RTL=='true'){
				           var nrPage =  ( Book_v7.getLength()+1 ) -results.attr('data-page');						
				       }
					   //error nr page
					   if(!nrPage){
						   if(RTL=='true'){
						      nrPage=Book_v7.getLength();
					       }else{ 
                              nrPage=1;   
						   }
                       }
				
                       $('#fb7-book').turn('page',nrPage);
                       Book_v7.resize_page();
		
	},
	
	shadow_normal:function(display_){
			 var shadow=$('#fb7 .fb7-shadow')
			 if(display_==false){
				shadow.css('display','none');
			 }				
			 if( shadow.hasClass('fb7-shadow-right') ){
				shadow.removeClass('fb7-shadow-right'); 
			 }
			  if( shadow.hasClass('fb7-shadow-left') ){
				shadow.removeClass('fb7-shadow-left'); 
			 }			 			 
			 shadow.addClass('fb7-shadow-double');	
	},
	
	shadow_right:function(display_){
    		 var shadow=$('#fb7 .fb7-shadow');
			 if(display_==false){
				shadow.css('display','none');
			 }
			 if( shadow.hasClass('fb7-shadow-left') ){
				shadow.removeClass('fb7-shadow-left'); 
			 }
			 if( shadow.hasClass('fb7-shadow-double') ){
				shadow.removeClass('fb7-shadow-double'); 
			 }			 
			 shadow.addClass('fb7-shadow-right');		 	
	},
	
	shadow_left:function(display_){
    		 var shadow=$('#fb7 .fb7-shadow')
			 if(display_==false){
				shadow.css('display','none');
			 }			 
			 if( shadow.hasClass('fb7-shadow-right') ){
				shadow.removeClass('fb7-shadow-right'); 
			 }
			 if( shadow.hasClass('fb7-shadow-double') ){
				shadow.removeClass('fb7-shadow-double'); 
			 }			 			 
			 shadow.addClass('fb7-shadow-left');	
	},
    
    init: function() {
		
		var th=this;
		//this.on_start = true;
		
		
	    if( SWF_ADDRESS=="true" ){
        
                /* =  jQuery Addresss INIT
                --------------------------*/
                var current_address=$.address.pathNames()[$.address.pathNames().length-1];
                BOOK_SLUG=$.address.pathNames()[0];
                var results=$('#fb7-deeplinking ul li[data-address='+current_address+']');
                var nrPage =   results.attr('data-page');
				if(RTL=='true'){
				 var nrPage =   ( Book_v7.getLength()+1 ) -results.attr('data-page');						
				}
               
			    //error nr page
			    if(!nrPage){
					if(RTL=='true'){
						 nrPage=Book_v7.getLength();
					 }else{ 
                         nrPage=1;   
					 }
                }
			
        
                /* =  jQuery Addresss CHANGE
                --------------------------*/ 
                $.address.change(function(event) {
					   th.change_address()     
               })
			   
			   
       }
	 
		
		$('#fb7-book').turn({
			display: 'double',
			acceleration: true,
			gradients:true,
			elevation:50,
			page:nrPage,
			when: {
				first: function(e, page) {
					$('.fb7-nav-arrow.prev').hide();
					var old=$('#fb7-book').turn('page')
					//console.log("event first")
					
					
					
					if(old==Book_v7.getLength() ){
						var shadow=$('#fb7 .fb7-shadow')
					    shadow.css('display','none');
					}
					
					Book_v7.shadow_normal();
					Book_v7.shadow_right();
					 					 
					
					
				},
							
				start: function(event, pageObject, corner) {
					var page=pageObject.page;
					//console.log('event start '+corner+" / "+page);
					if(page==2 && ( corner=="bl" || corner=="tl" ) ){
					   Book_v7.shadow_right();
					}
					if(page==Book_v7.getLength()-1 && ( corner=="br" || corner=="tr" ) ){
					  Book_v7.shadow_left();
					}
					
					
				},
				
				end: function(event, pageObject, corner) {
					//console.log('event end: ');
				},
				
				turned: function(e, page) {
					
					//console.log("turned = "+page);
					
					if(page>=2&&page<Book_v7.getLength()){
					  	Book_v7.shadow_normal();
					}
					
					var shadow=$('#fb7 .fb7-shadow')
					shadow.css('display','block');
										
					
										
					if (page > 1) {
						$('.fb7-nav-arrow.prev').fadeIn();
						//$('#fb7-about').hide();
					}
					
					if( (page==1&&RTL=='false') || ( page==$(this).turn('pages')&&RTL=='true') ){	
						$('#fb7-about').css('z-index',11);
					}						
					
					if ( page < $(this).turn('pages') ) {
						$('.fb7-nav-arrow.next').fadeIn();
					}
					
						var page1=page;
						if(RTL=="true"){
							 page1=Book_v7.getLength()-page+1;
						}
						var page2;
						
						if(page1>1&&page1<Book_v7.getLength()){
						   var even=( RTL=="true" ) ? page%2!=0    :page%2==0 	
						   if(even){
							   page2=page1+1;						   
						   }else{
							   page2=page1-1; 
						   }
						   if(RTL=="true"){
						   	  var page_view=Math.max(page2,page1)+"-"+Math.min(page2,page1);  
						   }else{
							  var page_view=Math.min(page2,page1)+"-"+Math.max(page2,page1);   
						   }
						}else{
						  var page_view=page1;							
						}
						
						//$('#fb7-page-number').val(Book_v7.config['go_to_page']+" "+page_view);
						$('#fb7-page-number').val( page_view);
					
                                       
					Book_v7.resize_page();
                    if(SWF_ADDRESS=="true"){
                       if(RTL=='true'){
						 setPage( new Number(page).rtl() )   
					   }else{
						 setPage(page);   
					   }
					       
					   th.tmp_slug=$.address.pathNames()[0]             
                    }
				},
				
				turning: function(e, page) {
					
					//console.log('turning '+page);
			
							
					$('#fb7-about').css('z-index',5);
					
                    
				},
				
				last: function(e, page) {
					$('.fb7-nav-arrow.next').hide();
					var old=$('#fb7-book').turn('page')
					//console.log('last = '+old);
					
					if(old==1){
					var shadow=$('#fb7 .fb7-shadow')
					shadow.css('display','none');
					}
					
					Book_v7.shadow_normal();
					Book_v7.shadow_left();
				
				}	
			}
		});
		Book_v7.arrows();
		
	},
	
	corner_change:function(boolean_){
		//$('#fb7-book').turn("disable",boolean_);		
	},
        
	center: function (lightbox_) {
	
			var iframe=$('iframe',lightbox_);
			var old_w=iframe.attr("width");
			var old_h=iframe.attr("height");
    		iframe.css("position","absolute");
	
			var stage_w=$(window).width();
            var stage_h=$(window).height();
            var delta_w=stage_w-old_w;
            var delta_h=stage_h-old_h
            
            if(delta_w<delta_h){
                var new_w=$(window).width()-200;
                var new_h=(new_w*old_h)/old_w
            }else{
                var new_h=$(window).height()-200;
                var new_w=(old_w*new_h)/old_h
            }
            iframe.attr("width", new_w);
            iframe.attr("height",new_h);
            
            var height=iframe.height();
            var width=iframe.width();
            iframe.css("top", ( $(window).height()/2 - height/2+"px"));
            iframe.css("left", ( $(window).width()/2 -width/2+"px"  ));
	},    
        
    key_down: function(){
        $(window).bind('keydown', function(e){
		if (e.keyCode==37)
			//$('#fb7-book').turn('previous');
            Book_v7.prevPage();
		else if (e.keyCode==39)
			//$('#fb7-book').turn('next');
            Book_v7.nextPage();

		});	
    },

    resize_input_text: function (){
		var input=$('#fb7-page-number');
		var btn=$('#fb7 .fb7-menu li.fb7-goto button');
		input.css('width',GOTOPAGE_WIDTH);
		input.css('padding-right',btn.width()+10);
	}, 

    isiPhone: function (){
       return ( (navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPad") != -1)  );
    },

	arrows: function() {
		$('.fb7-nav-arrow.prev').click(function() {
			//$('#fb7-book').turn('previous');
            Book_v7.prevPage();
            Book_v7.resize_page()
		});
		$('.fb7-nav-arrow.next').click(function() {
			//$('#fb7-book').turn('next');
            Book_v7.nextPage();
            Book_v7.resize_page()
		});
	},
    
    nextPage:function(){
      
      var current=$('#fb7-book').turn('page');
      if( current%2==0){
		 var page=current+2
      }else{
         var page=current+1 
      }      

      if(RTL=='true'){
		setPage( new Number(page).rtl() )   
	  }else{
		setPage(page);   
	  }
  
    
    },
    
    prevPage:function(){
    
      var current=$('#fb7-book').turn('page');
      if(current==1) {return;}
      if( current%2==0){
         var page=current-1;
      }else{
         var page=current-2;
      }
	  
	  if(RTL=='true'){
		setPage( new Number(page).rtl() )   
	  }else{
		setPage(page);   
	  }
	  
    
    },

	all_pages: function() {
        
		//remove corner
		Book_v7.corner_change(true);     
			 
        ///height thumbs
        var cont_thumbs=$('#fb7-all-pages .fb7-container-pages');
        var area_height=$('#fb7').height()-this.toolsHeight;
        var height_container=area_height*80/100;
        if(height_container>225){
          height_container=225;
        }
        cont_thumbs.css('height',height_container+'px');
        //position thumbs
        var _top=( (area_height/2) -  ( (cont_thumbs.outerHeight())/2   )  )
        cont_thumbs.css('top',_top+'px');
     
		var summary = 0;
		var self = this;
		var slider_width = $('#fb7-slider').width();
		
		$('#fb7-slider').append('<li></li>');
		
		$('#fb7-slider li').each(function() {
			li_width = $(this).outerWidth();
			summary += li_width;
		})
	
		$('#fb7-slider').css('width', summary);
	
		$("#fb7-menu-holder").mousemove(function(e) {
                      	
			if ( $(this).width() < $("#fb7-slider").width() ) {
	     		var distance = e.pageX - $(this).offset().left;
				var percentage = distance / $(this).width();
				var targetX = -Math.round(($("#fb7-slider").width() - $(this).width()) * percentage);
	    		$('#fb7-slider').animate({left: [targetX+"px",'easeOutCubic']  }, { queue:false, duration: 200 });
			}
		});

        //////////////////////SWIPE
        if(self.events_thumbs!=1){
        $('#fb7-all-pages .fb7-container-pages').bind("touchstart", function(e) {
               
               $('#fb7-slider').stop();
               
               //time
               self.time_start=new Date().getTime();
               self.time_move_old=self.time_start;
               
               //road
			   self.x_start = e.originalEvent.targetTouches[0].pageX;
			   self.x_move=undefined;
               self.x_move_old=self.x_start;
		});
        
        
        $('#fb7-all-pages .fb7-container-pages').bind("touchmove", function(e) {
   			   	
                //current round and time
                self.x_move = e.originalEvent.targetTouches[0].pageX;  
                self.time_move=new Date().getTime();
                                        
                //time - delta
                self.delta_t=new Date().getTime()-self.time_move_old;
                self.time_move_old=new Date().getTime();                
                                        
                //round- delta
                self.delta_s=self.x_move-self.x_move_old;
                self.x_move_old=self.x_move;
                    
                //set position thumbs
                self.current_x=parseInt( $('#fb7-slider').css('left') ); 
                var new_position=self.current_x+self.delta_s;
                if(new_position>0){ new_position=0 }   
                var minX=-summary+WINDOW_WIDTH;
                if(new_position<minX ){new_position=minX}
                $('#fb7-slider').css({left:new_position});
              
                //remove default action
                e.preventDefault(e);       
                
                         
		 });
         
         $('#fb7-all-pages .fb7-container-pages').bind("touchend", function(e) {   
               
               //calculation speed                 
               var v=self.delta_s/self.delta_t;
               var s= ( WINDOW_WIDTH*0.25 )*v; 
               var t=Math.abs(s/v);
            
               //set position thumbs
               var new_position=self.current_x+s
               if(new_position>0){new_position=0}   
               var minX=-summary+WINDOW_WIDTH;
               if(new_position<minX ){new_position=minX } 
             
               if( Math.abs( self.delta_s ) > 5){
                
          		 $('#fb7-slider').animate({ left:[new_position+"px","easeOutCubic"]  },t);               
               }			   
		               
              //e.preventDefault(e);
 
		});		
        //////////////////////end SWIPE
        self.events_thumbs=1;
        }        
		

		$('#fb7-slider li').on('click',function() {
            self.x_start=null;
            self.x_move=null;
		    $('#fb7-slider').stop();
			var page_index = $(this).attr('class');
			var tmp = parseInt(page_index);
			close_overlay();
			
			setTimeout(function(){
				setPage(tmp);   
			},100);

		})

		$(document).on('click',function(e) {
			var target = $(e.target);
			if ( target.hasClass('fb7-overlay') ) close_overlay();
		});
        
       
	
	},

	book_grab: function() {
		$('#fb7-container-book').css('cursor', '-webkit-grab');
		$('#fb7-container-book').css('cursor', '-moz-grab');
	},

	book_grabbing: function() {
		$('#fb7-container-book').css('cursor', '-webkit-grabbing');
		$('#fb7-container-book').css('cursor', '-moz-grabbing');
	},
    
    book_area: function(){
		
        var width_book=$('#fb7').width();
                
        ///if(IS_AS_TEMPLATE==true){
           // var height=$(window).height()+"px";
        //}else{
            //var height=(width_book*HEIGHT_BOOK/WIDTH_BOOK)+this.toolsHeight+"px";
        ///}
        
       if(IS_AS_TEMPLATE==true){
           var height="100%";
        }else{
        
           if( $('#fb7').hasClass('fullScreen') ){
              var height="100%";
           }else{           
              var height=(width_book*HEIGHT_BOOK/WIDTH_BOOK)+this.toolsHeight+"px";
           }
                     
        }
        
        
         
         $("#fb7").css('height',height);
		
	},
    
    ///current width book
    widthBook:  function(){
         return $('#fb7-container-book').width();   
    },
    
    //current height book
    heightBook: function(){
         return $('#fb7-container-book').height();    
    },

	book_position: function() {
    
  
		var book_height	= this.heightBook();
		var book_width	= this.widthBook();
		
		var half_height	= (  (book_height/2)+this.toolsHeight/2   );
		var half_width	= (  book_width/2 );
        
        var x=$('#fb7').width()/2-half_width;
        var y=$('#fb7').height()/2-half_height;
		$('#fb7-container-book').css({ left: x, top:y });
		
		/*footer position/*/
		var new_y=book_height+this.autoMarginT()+this.autoMarginB();
		//$("#fb7-footer").css({top:new_y+'px'});
		//$("#fb7").css('height',new_y+this.toolsHeight);
        
	},
    
    touchstart_book:function(e){
    
       this.book_x = e.originalEvent.touches[0].pageX;
       this.book_y = e.originalEvent.touches[0].pageY;
         
    },
    
    touchmove_book:function(e){
    
        //delta x
        this.book_x_delta=e.originalEvent.touches[0].pageX-this.book_x;
        this.book_x=e.originalEvent.touches[0].pageX;
        
        //delta y
        this.book_y_delta=e.originalEvent.touches[0].pageY-this.book_y;
        this.book_y=e.originalEvent.touches[0].pageY;
        
                
        var current_x= parseInt(  $('#fb7-container-book').css('left')  )
        var current_y= parseInt(  $('#fb7-container-book').css('top')  )
        
        var x=current_x+this.book_x_delta;
        var y=current_y+this.book_y_delta;
        $('#fb7-container-book').css( {left:x,top:y } ); 
        
        e.preventDefault();
        
        
        
        //var t=e.originalEvent.changedTouches[0].pageX
        
        //alert("move");
    
    },
    touchend_book:function(e){
    
    
        
           
    },    

	drag: function(e) {
		
		var el = $(this);
		var dragged = el.addClass('draggable');

		$('#fb7-container-book').unbind('mousemove');
		$('#fb7-container-book').bind('mousemove', Book_v7.book_grabbing);
        

        var d_h = dragged.outerHeight();
        var d_w = dragged.outerWidth();
        var pos_y = dragged.offset().top + d_h - e.pageY;
        var pos_x = dragged.offset().left + d_w - e.pageX;
        
		dragged.parents().unbind("mousemove");
        dragged.parents().bind("mousemove", function(e) {
            $('.draggable').offset({
                top:e.pageY + pos_y - d_h,
                left:e.pageX + pos_x - d_w
            });
        });
        e.preventDefault();
	},
	
	drop: function() {
		Book_v7.book_grab();
		$('#fb7-container-book').bind('mousemove', Book_v7.book_grab);
		$('#fb7-container-book').removeClass('draggable');
	},
    
    checkScrollBook: function () {
      
      var vertical=$('#fb7-book').height() > $("#fb7").height() - this.toolsHeight;
	  var horizontal=$('#fb7-book').width() > $("#fb7").width() - (this.arrow_width*1);
      
 	
	  if ( vertical || horizontal ) {
		higherThanWindow = true;
      } else {
		higherThanWindow = false;
	  }
	   return higherThanWindow;
    },

	dragdrop_init: function() {
		this.checkScrollBook();

		if ( higherThanWindow == false ) {
            //mobile
            $('#fb7-container-book').unbind('touchstart', Book_v7.touchstart_book);
            $('#fb7-container-book').unbind('touchmove', Book_v7.touchmove_book);
            $('#fb7-container-book').unbind('touchend', Book_v7.touchend_book);    
            
        
			$('#fb7-container-book').unbind('mousedown', Book_v7.drag);
			$('#fb7-container-book').unbind('mouseup', Book_v7.drop);
			$('#fb7-container-book').unbind('mousemove', Book_v7.book_grab);
			$('#fb7-container-book').unbind('mousemove', Book_v7.book_grabbing);
			$('#fb7-container-book').css('cursor', 'default');
		} else {
            //mobile
            $('#fb7-container-book').bind('touchstart', Book_v7.touchstart_book);
            $('#fb7-container-book').bind('touchmove', Book_v7.touchmove_book);
            $('#fb7-container-book').bind('touchend', Book_v7.touchend_book);
            
			$('#fb7-container-book').bind('mousedown', Book_v7.drag);
			$('#fb7-container-book').bind('mouseup', Book_v7.drop);
			$('#fb7-container-book').bind('mousemove', Book_v7.book_grab);
            Book_v7.book_grab();
		}
		Book_v7.resize_page();
	},
	
	scaleStart: function() {
		//if ( this.on_start == true ) {
			this.checkScrollBook();			
			//this.on_start = false;
		//}
	},
    
    setSize:function(w_,h_){
    
       $('#fb7-container-book').css({ width:w_, height:h_ });
	   $('#fb7-book').turn('size',w_,h_);
    
    },
    
    zoomTo:function(zoom_){
       
       this.zoom=zoom_;
         
       var new_width=(WIDTH_BOOK*this.zoom);
       var new_height=(HEIGHT_BOOK*this.zoom);
       
      
       this.setSize(new_width,new_height);
       this.scale_arrows()
       
       this.book_position();
       Book_v7.dragdrop_init();
       Book_v7.resize_page()
      
       
    },
    
    zoomOriginal:function(){
    
        this.zoomTo(1);
             
    },   
   
    scale_arrows:function(){
       
       var HEIGHT_ARROW=$('.fb7-nav-arrow').height()
       var WIDTH_ARROW=$('.fb7-nav-arrow').width()
	   
	   //console.log(WIDTH_ARROW+" "+HEIGHT_ARROW)
       
       var height_arrow=this.heightBook()*0.12;
       if( height_arrow > HEIGHT_ARROW ){
         height_arrow=HEIGHT_ARROW;
       }
               
       var width_arrow= (height_arrow*WIDTH_ARROW)/HEIGHT_ARROW;
      
       this.zoom_arrows=height_arrow/HEIGHT_ARROW;   
         
       $('.fb7-nav-arrow').css({'transform':'scale('+this.zoom_arrows+')','-ms-transform':'scale('+this.zoom_arrows+')','-webkit-transform':'scale('+this.zoom_arrows+')'});   
	 
	   ///position arrow right
	   var arrow_next=$('#fb7 .fb7-nav-arrow.next');
	   var newX=this.widthBook()-( WIDTH_ARROW * this.zoom_arrows   )*0.4;
	   arrow_next.css('left',newX+'px');
	    ///position arrow left
	   var arrow_prev=$('#fb7 .fb7-nav-arrow.prev');
	   var newX=this.widthBook()-( WIDTH_ARROW * this.zoom_arrows   )*0.4
	   arrow_prev.css('right',newX+'px');
	   
	    
    },
    
	zoomAuto: function() {
				
		Book_v7.scaleStart();	
        
          
        ////resize one 
        var zoom=this.getAutoZoomBook(0);   
        this.zoomTo( zoom  ) 
          
		////resize two (with arrow)
        this.scale_arrows();
        var arrow_width=$('.fb7-nav-arrow').width()*this.zoom_arrows; 
        this.arrow_width=arrow_width;
        var zoom=this.getAutoZoomBook(arrow_width*1);
		if(Book_v7.config['arrows_visible']=='false'){
		  var zoom=this.getAutoZoomBook(0);	
		}
		
		//console.log('arrow visible = '+(Book_v7.config['arrows_visible']=='false'));
		
		
        //calculate optimal zoom
        zoom=Math.round(zoom * 100) / 100
        var percent=zoom*100;
        if(percent%2!=0){
          zoom=zoom-0.01;
        }
   		this.zoomTo( zoom   )

		Book_v7.resize_page()
      
	},
         
    getAutoZoomBook: function(arrow_width_){
       
        var book_width=this.widthBook();
		var book_height=this.heightBook();
		var screen_width	=  $("#fb7").width()-  ( this.autoMarginL()+this.autoMarginR() + (arrow_width_) );
		var screen_height	= $("#fb7").height()-this.toolsHeight-( this.autoMarginT()+this.autoMarginB()  )
 
		
		if(screen_width>WIDTH_BOOK){
		  screen_width=WIDTH_BOOK	
		}
		
		if(screen_height>HEIGHT_BOOK){
		  screen_height=HEIGHT_BOOK	
		}
		
		
		var scaleW=screen_width/book_width;
		var scaleH=screen_height/book_height;
		
		var scale=Math.min(scaleW,scaleH)	
		var new_width		= book_width*scale;
		var new_height		= book_height*scale;
        var auto_zoom= new_width/WIDTH_BOOK
        return auto_zoom;
    
    },

	zoomIn: function() {
       var zoom=this.zoom;  
       
        
       this.zoomTo(zoom+ZOOM_STEP  );
	},
	
	zoomOut: function() {
	   this.zoomTo( this.zoom-ZOOM_STEP );
	},
    
    resize_page: function (){
		
         /* RESIZE PAGE IN FLIPBOOK  /*/
         //resize class .fb7-page-book
         var page_width=this.widthBook()/2;
         var width_current_page=(page_width)
         var width_orginal_page=  ( WIDTH_BOOK/2 )     
         var zoom= (width_current_page / width_orginal_page);
         $('.fb7-cont-page-book').css({'transform':'scale('+zoom+')','-ms-transform':'scale('+zoom+')','-webkit-transform':'scale('+zoom+')'});
         ///center class .fb7-page-book
         var paddingL=(this.widthBook()*this.paddingL)/zoom;
		 var paddingR=(this.widthBook()*this.paddingR)/zoom;
         var paddingT=(this.widthBook()*this.paddingT)/zoom;
         
		 $('#fb7 .turn-page.odd .fb7-page-book').css({'left':paddingR+'px','top':paddingT+'px'});
		 $('#fb7 .turn-page.even .fb7-page-book').css({'left':paddingL+'px','top':paddingT+'px'});
         
		    
         /* RESIZE ABOUT IN FLIPBOOK  /*/
         $('#fb7-about').css({'transform':'scale('+zoom+')','-ms-transform':'scale('+zoom+')','-webkit-transform':'scale('+zoom+')'});
         //padding top
         var padding_top=(this.heightBook()*0.05);
         $('#fb7-about').css('top',padding_top+'px');
         //height
         var height=(this.heightBook()-( padding_top*2) )/zoom;
         $('#fb7-about').css('height',height+'px');
         //width
         var width=(  (this.widthBook()/2)-( this.widthBook()*0.05  ) )/zoom;
         $('#fb7-about').css('width',width+'px');
		 
		 
		 //CENTER VERTICAL FOR HOME PAGE
		 //var posY=$('.fb7-page-book').height()/2 - $('#fb7 #fb7-cover ul').innerHeight()/2;
		 //$('#fb7 #fb7-cover ul').css('top',posY+'px');
		 
		 
	},
    
    resize_font:  function($size_original_,path_){
		var w=this.widthBook();
		var size= ($size_original_*w)/WIDTH_BOOK;
		var new_size=Math.round(parseInt(size))+"px";
		///$(path_).css('font-size',new_size);
		///$(path_).css('line-height',new_size);
        $(path_).css('font-size',$size_original_+"px");
		$(path_).css('line-height',$size_original_+"px");
	}
}


/* =  Navigation
--------------------------*/

var Navigation_v7 = {
	
	tooltip: function() {
    
    
		$('.fb7-menu li').filter(':not(.fb7-goto,.fb7-menu li:first-child,.fb7-menu li:last-child )').each(function() {
			$(this).css('cursor','pointer');
			var description = $('a', this).attr('title');
			var tooltip = '<span class="fb7-tooltip">'+description+'<b></b></span>';
			$('a', this).removeAttr("title");
			$(this).append(tooltip);
		});
		
		$('.fb7-menu li').mousemove(function(e) {
                        
            var tooltip=$('.fb7-tooltip', this);
			var offset = $(this).offset(); 
            var relY = e.pageY - offset.top;
            var x2= e.pageX-$('#fb7').offset().left+tooltip.width()  
            var width_area=$('#fb7').width()
            
            if( (x2+20)>width_area){
                var orient="right";
            }else{
            	var orient="left";
            }
            
            if(orient=="left"){
     			var relX = e.pageX - offset.left;
                $('#fb7 .fb7-tooltip b').css('left','6px')
            }else{
                var relX = e.pageX - offset.left-tooltip.width()-5;
                $('#fb7 .fb7-tooltip b').css('left',(tooltip.width()+6)+'px') 
            }			            
            
            //$('.fb7-tooltip', this).html( x2+" > "+width_area  );
			$('.fb7-tooltip', this).css({ left: relX, top: relY-45 });
		})
		
		$('.fb7-menu li').hover(function() { 
			$('.fb7-tooltip').stop();
			$('.fb7-tooltip', this).fadeIn();
		}, function() {
			$('.fb7-tooltip').hide();
		});
		
		Book_v7.resize_page()

	},


    ///event mouse down in book 
	book_mouse_down: function(){
   			$('#fb7-about').css('z-index',5);
			//Book_v7.resize_page();
	},
	
	book_mouse_up: function(e){
		 var offset = $(this).offset();
		 var relativeX = (e.pageX - offset.left);
         if( relativeX > ( WIDTH_BOOK / 2 )  ){
			//$('#fb7-about').css('z-index',11); 
		 }
	    
	},

	init: function() {

		// Double Click
        if(ZOOM_DOUBLE_CLICK_ENABLED=="true"){
		$('#fb7-book').dblclick(function() {
			           
            if(Book_v7.checkScrollBook()==false){ //zoom
                 Book_v7.zoomTo(ZOOM_DOUBLE_CLICK)
            }else{
               Book_v7.zoomAuto();
               $('#fb7-container-book').css('cursor', 'default');
            }
		});
        }
		
	//focus for page manager
	
	var page_manager=$('#fb7-page-number');
	page_manager.focus(function(e) {
		var target=$(e.currentTarget);
		target.data('current',target.val());
		target.val('')
		//target.addClass('focus_input');
		
        
    });
	page_manager.focusout(function(e) {
		var target=$(e.currentTarget);
		var old=target.data('current');
		//target.removeClass('focus_input');
		if( target.val() ==''){
		  target.val(old);	
		}
    });
	 


    //full screen
    $('.fb7-fullscreen').on('click', function() {
			
     $('.fb7-tooltip').hide();
     
     $('#fb7').fullScreen({
         
         'callback': function(isFullScreen){
         
           Book_v7.book_area();
           Book_v7.zoomAuto();
           Book_v7.center_icon();
         
             if(isFullScreen){
                
             }else{
                
             }
        
          }
         });
         e.preventDefault();
            
	  });
         
		 
		//download		 
		$('.fb7-download').on('click', function(event) {     	 		  		 
		 
		  //$.address.update();
		 // event.preventDefault();
		  
		}); 

	    // Home 
	    $('.fb7-home').on('click', function() {     	  
		  setPage(1);
	      //setAddress('book5-1');		  
		});
	
		// Zoom Original
		$('.fb7-zoom-original').click(function() {
			
            Book_v7.zoomOriginal();
      
			
		});
	
		// Zoom Auto
		$('.fb7-zoom-auto').on('click', function() {
			Book_v7.zoomAuto();
		});

		// Zoom In
		$('.fb7-zoom-in').on('click', function() {
			
				Book_v7.zoomIn();
				
							
		});
	
		// Zoom Out
		$('.fb7-zoom-out').on('click', function() {
			
				Book_v7.zoomOut();
				
		});

		// All Pages
		$('.fb7-show-all').on('click', function() {
			$('#fb7-all-pages').
				addClass('active').
				css('opacity', 0).
				animate({ opacity: 1 }, 1000);
			Book_v7.all_pages();
			return false;
		})
		
		// Goto Page
		$('#fb7-page-number').keydown(function(e) {
			if (e.keyCode == 13) {
               setPage( $('#fb7-page-number').val() );
            }
		});
		
		$('.fb7-goto button').click(function(e) {
            setPage( $('#fb7-page-number').val() );
		});


		// Contact
		$('.contact').click(function() {
			$('#fb7-contact').addClass('active').animate({ opacity: 1 }, 1000);
			contact_form();
			clear_on_focus();
			return false;
		})
		
		//change z-index in about
		$('#fb7-book').bind('mousedown',this.book_mouse_down);
		$('#fb7-book').bind('mouseup',this.book_mouse_up);
		if (Book_v7.isiPhone()) {//for IPhone		
		$('#fb7-book').bind('touchstart',this.book_mouse_down);
		$('#fb7-book').bind('touchend',this.book_mouse_up);
		}

		//show tooltip for icon
		if ( !Book_v7.isiPhone() && TOOL_TIP_VISIBLE=="true" ) {
			this.tooltip();
		}
	}
}

 
/* = CONTACT FORM
--------------------------*/

function clear_on_focus() {
	$('input[type="text"], input[type="password"], textarea').each( function() {
		var startValue = $(this).val();
		$.data(this, "startValue", startValue);	
        this.value=startValue;
	})

	$('input[type="text"], input[type="password"], textarea').focus(function() {
		var startValue = $.data(this, "startValue");		
		if ( this.value == startValue ) {
			this.value = '';
		}
	});
	$('input[type="text"], input[type="password"], textarea').blur(function() {
        var startValue = $.data(this, "startValue");
		if ( this.value == '' ) {
			this.value = startValue;
		}
	})
}


function close_overlay() {
	$('.fb7-overlay').removeClass('active');
	setTimeout(function(){
	Book_v7.corner_change(false);
	},1000);
}


function contact_form() {

	$('#fb7-contact .req').each(function() {
		var startValue = $(this).val();
		$.data(this, "startValue", startValue);
	});

	$('#fb7-contact button[type="submit"]').click(function() {

		$('#fb7-contact .req').removeClass('fb7-error');
		$('#fb7-contact button').fadeOut('fast');

		var isError = 0;

		// Get the data from the form
		var name	= $('#fb7-contact #fb7-form-name').val();
		var email	= $('#fb7-contact #fb7-form-email').val();
		var message	= $('#fb7-contact #fb7-form-message').val();

		// Validate the data
		$('#fb7-contact .req').each(function() {
			var startValue = jQuery.data(this, "startValue");
			if ( ($(this).val() == '') || (this.value == startValue) ) {
				$(this).addClass('fb7-error');
				isError = 1;
			}
		});

		var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		if (reg.test(email)==false) {
			$('#fb7-contact #fb7-form-email').addClass('fb7-error');
			isError=1;
		}

		// Terminate the script if an error is found
		if (isError == 1) {
			$('#fb7-contact button').fadeIn('fast');
			return false;
		}

		$.ajaxSetup ({
			cache: false
		});

        var _email=Book_v7.config['email_form']; 
		var dataString = 'name='+ name + '&email=' + email + '&message=' + message+'&_email='+_email;  
		
		$.ajax({
			type: "POST",
			url: $('#fb7-ajax').data('book_url')+"php/submit-form-ajax.php",
			data: dataString,
			success: function(msg) {
				
				// Check to see if the mail was successfully sent
				if (msg == 'Mail sent') {
					$("#fb7-contact fieldset").hide();
					$("#fb7-contact fieldset.fb7-thanks").show();
					
					setTimeout(function() {
						close_overlay();
					}, 5000);
					
				} else {
					$('#fb7-contact button').fadeIn('fast');
					alert('The problem with sending it, please try again!');
				}
			},

			error: function(ob,errStr) {
				alert('The problem with sending it, please try again.');
			}
		});
		return false;
	});

	$('#fb7-contact .fb7-close').click(function() {
		close_overlay();
	})
}



/*
 * $ Easing v1.3 - http://gsgd.co.uk/sandbox/$/easing/
 *
 * Uses the built in easing capabilities added In $ 1.1
 * to offer multiple easing options
*/

$.easing["jswing"]=$.easing["swing"];$.extend($.easing,{def:"easeOutQuad",swing:function(a,b,c,d,e){return $.easing[$.easing.def](a,b,c,d,e)},easeInQuad:function(a,b,c,d,e){return d*(b/=e)*b+c},easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c},easeInOutQuad:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b+c;return-d/2*(--b*(b-2)-1)+c},easeInCubic:function(a,b,c,d,e){return d*(b/=e)*b*b+c},easeOutCubic:function(a,b,c,d,e){return d*((b=b/e-1)*b*b+1)+c},easeInOutCubic:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b+c;return d/2*((b-=2)*b*b+2)+c},easeInQuart:function(a,b,c,d,e){return d*(b/=e)*b*b*b+c},easeOutQuart:function(a,b,c,d,e){return-d*((b=b/e-1)*b*b*b-1)+c},easeInOutQuart:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b*b+c;return-d/2*((b-=2)*b*b*b-2)+c},easeInQuint:function(a,b,c,d,e){return d*(b/=e)*b*b*b*b+c},easeOutQuint:function(a,b,c,d,e){return d*((b=b/e-1)*b*b*b*b+1)+c},easeInOutQuint:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b*b*b+c;return d/2*((b-=2)*b*b*b*b+2)+c},easeInSine:function(a,b,c,d,e){return-d*Math.cos(b/e*(Math.PI/2))+d+c},easeOutSine:function(a,b,c,d,e){return d*Math.sin(b/e*(Math.PI/2))+c},easeInOutSine:function(a,b,c,d,e){return-d/2*(Math.cos(Math.PI*b/e)-1)+c},easeInExpo:function(a,b,c,d,e){return b==0?c:d*Math.pow(2,10*(b/e-1))+c},easeOutExpo:function(a,b,c,d,e){return b==e?c+d:d*(-Math.pow(2,-10*b/e)+1)+c},easeInOutExpo:function(a,b,c,d,e){if(b==0)return c;if(b==e)return c+d;if((b/=e/2)<1)return d/2*Math.pow(2,10*(b-1))+c;return d/2*(-Math.pow(2,-10*--b)+2)+c},easeInCirc:function(a,b,c,d,e){return-d*(Math.sqrt(1-(b/=e)*b)-1)+c},easeOutCirc:function(a,b,c,d,e){return d*Math.sqrt(1-(b=b/e-1)*b)+c},easeInOutCirc:function(a,b,c,d,e){if((b/=e/2)<1)return-d/2*(Math.sqrt(1-b*b)-1)+c;return d/2*(Math.sqrt(1-(b-=2)*b)+1)+c},easeInElastic:function(a,b,c,d,e){var f=1.70158;var g=0;var h=d;if(b==0)return c;if((b/=e)==1)return c+d;if(!g)g=e*.3;if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return-(h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g))+c},easeOutElastic:function(a,b,c,d,e){var f=1.70158;var g=0;var h=d;if(b==0)return c;if((b/=e)==1)return c+d;if(!g)g=e*.3;if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return h*Math.pow(2,-10*b)*Math.sin((b*e-f)*2*Math.PI/g)+d+c},easeInOutElastic:function(a,b,c,d,e){var f=1.70158;var g=0;var h=d;if(b==0)return c;if((b/=e/2)==2)return c+d;if(!g)g=e*.3*1.5;if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);if(b<1)return-.5*h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)+c;return h*Math.pow(2,-10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)*.5+d+c},easeInBack:function(a,b,c,d,e,f){if(f==undefined)f=1.70158;return d*(b/=e)*b*((f+1)*b-f)+c},easeOutBack:function(a,b,c,d,e,f){if(f==undefined)f=1.70158;return d*((b=b/e-1)*b*((f+1)*b+f)+1)+c},easeInOutBack:function(a,b,c,d,e,f){if(f==undefined)f=1.70158;if((b/=e/2)<1)return d/2*b*b*(((f*=1.525)+1)*b-f)+c;return d/2*((b-=2)*b*(((f*=1.525)+1)*b+f)+2)+c},easeInBounce:function(a,b,c,d,e){return d-$.easing.easeOutBounce(a,e-b,0,d,e)+c},easeOutBounce:function(a,b,c,d,e){if((b/=e)<1/2.75){return d*7.5625*b*b+c}else if(b<2/2.75){return d*(7.5625*(b-=1.5/2.75)*b+.75)+c}else if(b<2.5/2.75){return d*(7.5625*(b-=2.25/2.75)*b+.9375)+c}else{return d*(7.5625*(b-=2.625/2.75)*b+.984375)+c}},easeInOutBounce:function(a,b,c,d,e){if(b<e/2)return $.easing.easeInBounce(a,b*2,0,d,e)*.5+c;return $.easing.easeOutBounce(a,b*2-e,0,d,e)*.5+d*.5+c}})



})(jQuery)



 
