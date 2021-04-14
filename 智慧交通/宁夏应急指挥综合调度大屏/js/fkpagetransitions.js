
/*! FKPageTransitions v1.4 | FeikeWrold | www.fk68.net */
/* v1.4更新说明(2015-04-08)：修复bug。 */
// 创建一个闭包 相当于 var jq = function($){}; jq(jQuery); //把Jquery当参传入 兼容jQuery操作符'$'和'jQuery '
(function($) {
    var defaults = {
        /* 常规设置 */
        //0淡入 1在右 2上下 .... 详情参考说明
        mode:0,
        //指定子元素的对象
        slideSelector:"",
        //是否循环
        infiniteLoop:true,
        //速度[毫秒]
        speed:null,
        //动画曲线
        easing:null,
        //开始页ID
        startSlide:0,
        //初始z-index数
        slideZIndex:50,
        //是否绑定resize事件
        responsive:true,
        //主框架类名
        wrapperClass:"fk-page-wrapper",
        
        /* 鼠标设置 */
        //是否支持滚轮
        mouseWheel:true,
        //灵敏度阀值
        wheelThreshold:2,
        
        /* 触摸设置 */
        //灵敏度阀值
        swipeThreshold:50,
        //是否在X轴方向操作(左右拉)
        preventDefaultSwipeX:true,
        //是否在X轴方向操作(上下拉)
        preventDefaultSwipeY:false,
        //是否在翻页动画进行时禁止页面内元素动画渲染
        pagerunstat:false,
        
        // 加载完成时回调
        onSliderLoad:function() {},
        // 在每动画过渡开始前回调
        onSlideBefore:function() {},
        // 在每动画过渡结束后回调
        onSlideAfter:function() {},
        // 下一页时回调
        onSlideNext:function() {},
        // 上一页时回调
        onSlidePrev:function() {},
        // 窗口发生变化时回调[responsive=true]
        onSliderResize:function() {}
    };
    // 插件的定义    
    $.fn.FKPageTransitions = function(options) {
        if (this.length == 0) return this;
        //支持设置多个元素
        if (this.length > 1) {
            this.each(function() {
                $(this).FKPageTransitions(options);
            });
            return this;
        }
        //创建一个命名空间可以在插件的使用
        var slider = {};
        //设置相对像的翻页元素
        var el = this;
        // 浏览器窗口的大小
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        /**
         * 初始化插件设置
         */
        var init = function() {
            //缺省值与用户自定义选项值合并
            slider.settings = $.extend({}, defaults, options);
            // 转为整数
            slider.settings.slideWidth = parseInt(slider.settings.slideWidth);
            // 得到所有子元素
            slider.children = el.children(slider.settings.slideSelector);
            // 存储活动的幻灯片信息
            slider.active = {
                prev:null,
                index:slider.settings.startSlide,
                first:0,
                last:slider.children.length - 1
            };
            // 总数 slider.children.length ; 
            // 开始 slider.settings.startSlide ; 
            // 当前 slider.active.index ;
            // 之前 slider.active.prev ;
            // 最后一张 slider.active.last ;
            // 最前一张 slider.active.first ;
            // 保存滑块的当前状态（如果当前动画，工作是真的）
            slider.working = false;
            // 保存原来的CSS样式代码
            el.data("origStyle", el.attr("style"));
            el.children(slider.settings.slideSelector).each(function() {
                $(this).data("origStyle", $(this).attr("style"));
                $(this).data("origClass", $(this).attr("class"));
            });
            // 执行所有的DOM和CSS修改
            setup();
        };
        /**
         * 执行所有的DOM和CSS修改
         */
        var setup = function() {
            // 用wrapperClass元素二次包裹
            el.wrap('<div class="' + slider.settings.wrapperClass + '"><div class="fk-page-viewport"></div></div>');
            // 保存 el 的父元素 也就是 wrapperClass 的子元素
            slider.viewport = el.parent();
            // 根据模式设置页面el主元素的宽度 和 位置参数
            el.css({
                width:"100%",
                height:"100%",
                overflow:"hidden",
                position:"relative",
                "-webkit-backface-visibility":"hidden",
                "-moz-backface-visibility":"hidden",
                "backface-visibility":"hidden",
                "-webkit-transform":"translate3d(0, 0, 0)",
                "-moz-transform":"translate3d(0, 0, 0)",
                transform:"translate3d(0, 0, 0)",
                "-webkit-transform-style":"preserve-3d",
                "-moz-transform-style":"preserve-3d",
                "transform-style":"preserve-3d",
                "-webkit-perspective":"1200px",
                "-moz-perspective":"1200px",
                perspective:"1200px"
            });
            // 修改viewport样式 (.fk-page-viewport)
            slider.viewport.css({
                width:"100%",
                height:"100%",
                overflow:"hidden",
                position:"relative"
            });
            //修改wrapperClass素宽度
            slider.viewport.parent().css({
                position:"relative",
                margin:0,
                padding:0,
                "*zoom":1,
                width:"100%",
                height:"100%"
            });
            // 将slider滑块所有子元素设置样式
            slider.children.css({
                position:"absolute",
                width:"100%",
                height:"100%",
                overflow:"hidden",
                top:0,
                left:0,
                zIndex:0,
                listStyle:"none",
                display:"none",
                "-webkit-backface-visibility":"hidden",
                "-moz-backface-visibility":"hidden",
                "backface-visibility":"hidden",
                "-webkit-transform":"translate3d(0, 0, 0)",
                "-moz-transform":"translate3d(0, 0, 0)",
                transform:"translate3d(0, 0, 0)",
                "-webkit-transform-style":"preserve-3d",
                "-moz-transform-style":"preserve-3d",
                "transform-style":"preserve-3d"
            });
            // 在显示单元准备z-index
            slider.children.eq(slider.settings.startSlide).css({
                zIndex:slider.settings.slideZIndex,
                display:"block"
            });
            // 设置选择当前可见的页
            var preloadSelector = slider.children.eq(slider.settings.startSlide);
            // 定义装载方法
            var loadElements = function(selector, callback) {
                var total = selector.find("img, iframe").length;
                if (total == 0) {
                    callback();
                    return;
                }
                var count = 0;
                selector.find("img, iframe").each(function() {
                    $(this).one("load", function() {
                        if (++count == total) callback();
                    }).each(function() {
                        if (this.complete) $(this).load();
                    });
                });
            };
            // 当前这页是否加载完成
            loadElements(preloadSelector, start);
        };
        /**
         * 开始slider
         */
        var start = function() {
            // 加载完成onSliderLoad 回调callback
            slider.settings.onSliderLoad(slider.active.index);
            // 完全初始完毕
            slider.initialized = true;
            // 绑定调用窗口大小调整
            if (slider.settings.responsive) $(window).bind("resize", resizeWindow);
            // 设置触摸事件
            if (slider.settings.preventDefaultSwipeX || slider.settings.preventDefaultSwipeY) initTouch();
            //鼠标滚轮
            if (slider.settings.mouseWheel) initMouseWheel();
        };
        /**
         * 窗口大小调整事件回调
         */
        var resizeWindow = function(e) {
            // 如果滑块没有初始化不要做任何事情。
            if (!slider.initialized) return;
            // 得到新的窗口大小
            var windowWidthNew = $(window).width();
            var windowHeightNew = $(window).height();
            //确保它是一个真正的窗口大小调整
            if (windowWidth != windowWidthNew || windowHeight != windowHeightNew) {
                // 设置新的窗口尺寸
                windowWidth = windowWidthNew;
                windowHeight = windowHeightNew;
                // 设置新的窗口尺寸
                //el.redrawSlider();
                // 用户调整回调
                slider.settings.onSliderResize.call(el, slider.active.index);
            }
        };
        /**
         * 初始化鼠标滚轮事件
         */
        var initMouseWheel = function() {
            // 初始化对象到座标到结果集
            slider.mousewheel = {
                up:0,
                down:0
            };
            //绑定事件
            slider.viewport.bind("mousewheel", MouseWheelHandler);
        };
        var MouseWheelHandler = function(e) {
            /*var time = new Date().getTime();
            console.log(slider.working +':' + time);*/
            if (slider.working) {
                e.preventDefault();
            } else {
                e = window.event || e;
                var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.deltaY || -e.detail));
                if (delta < 0) {
                    slider.mousewheel.up += delta;
                    if (Math.abs(slider.mousewheel.up) > slider.settings.wheelThreshold) el.goToNextSlide();
                } else {
                    slider.mousewheel.down += delta;
                    if (Math.abs(slider.mousewheel.down) > slider.settings.wheelThreshold) el.goToPrevSlide();
                }
            }
        };
        /**
         * 初始化触摸事件
         */
        var initTouch = function() {
            // 初始化对象到座标到结果集
            slider.touch = {
                start:{
                    x:0,
                    y:0
                },
                end:{
                    x:0,
                    y:0
                }
            };
            //绑定touchstart事件
            slider.viewport.bind("touchstart", onTouchStart);
        };
        /**
         * 事件处理程序”touchstart”
         */
        var onTouchStart = function(e) {
            /*var time = new Date().getTime();
            $('h2').html(slider.working +':' + time);*/
            if (slider.working) {
                e.preventDefault();
            } else {
                var orig = e.originalEvent;
                // 记录开始的x，y坐标
                slider.touch.start.x = orig.changedTouches[0].pageX;
                slider.touch.start.y = orig.changedTouches[0].pageY;
                // 绑定“touchmove”事件到viewport元素
                slider.viewport.bind("touchmove", onTouchMove);
                // 绑定“touchend”事件到viewport元素
                slider.viewport.bind("touchend", onTouchEnd);
            }
        };
        /**
         *事件处理程序”touchmove”
         */
        var onTouchMove = function(e) {
            var orig = e.originalEvent;
            // 计算X轴Y轴的偏移量
            var xMovement = orig.changedTouches[0].pageX - slider.touch.start.x;
            var yMovement = orig.changedTouches[0].pageY - slider.touch.start.y;
            //debug console.log('x:'+xMovement +'  |  y:'+ yMovement);
            var params;
            // 如果是X操作方式，X轴滑动比Y多将不做操作
            if (slider.settings.preventDefaultSwipeX) {
                params = xMovement;
                e.preventDefault();
            } else if (slider.settings.preventDefaultSwipeY) {
                params = yMovement;
                e.preventDefault();
            }
            //拖动时逐帧显示动画效果
            if (params < 0) {} else {}
        };
        /**
         * 事件处理程序”touchend”
         */
        var onTouchEnd = function(e) {
            // 移处touchmove事件绑定
            slider.viewport.unbind("touchmove", onTouchMove);
            var orig = e.originalEvent;
            // 保存结束的X，Y位置
            slider.touch.end.x = orig.changedTouches[0].pageX;
            slider.touch.end.y = orig.changedTouches[0].pageY;
            var distance = 0;
            // 计算滑动的绝对距离
            if (slider.settings.preventDefaultSwipeX) {
                distance = slider.touch.end.x - slider.touch.start.x;
            } else {
                distance = slider.touch.end.y - slider.touch.start.y;
            }
            //alert(Math.abs(distance) +'>='+ slider.settings.swipeThreshold);
            // 检查是否达到阈值距离
            if (Math.abs(distance) >= slider.settings.swipeThreshold) {
                //负数向前 正数向后
                distance < 0 ? el.goToNextSlide() :el.goToPrevSlide();
            } else {}
            // 移处touchend事件绑定
            slider.viewport.unbind("touchend", onTouchEnd);
        };
        /**
         * 设置动画效果
         *
         * @param value (int)
         *  - 动作大小值
         *
         * @param animation (string) 'slider', 'reset', 'ticker'
         *  - 动画效果名称
         *
         * @param duration (int)
         *  - 动画持续时间
         *
         * @param params (array) optional
         *  - 包含任何变量，需要通过一个可选的参数
         */
        var setPositionProperty = function(value, animation, duration, params) {
            //alert(params);
            var cssTendstr = "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd";
            var cssAendstr = "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd";
            //console.log(params+' : oldIndex['+slider.active.prev+'] = activeindex['+slider.active.index+']');
            /*
                单数为适合左右操作，双数适合上下操作
                其中0、31、32、34、36、37可左右上下通用。
                ------------------------------------------------
                0：淡入翻页(适合左右和上下操作)
                1、2：简单位移翻页
                3、4：新页位移入场旧页变暗位置不动
                5、6：新旧页同时位移旧页变暗
                7、8：新页位移入场旧页浮动位移
                9、10：新页位移入场旧页变小
                11、12：新页位移入场旧页揭下和9、10差不多
                13、14：旧页位移新页放大入场
                15、16：新页位移入场旧页顶下去
                17、18：新旧页同时面对面翻页入场和出场
                19、20：新旧页像盒子一样转动
                21、22：新旧页像盒子一样展开
                23、24：新旧页像在盒子里一样转动
                25、26：新旧页像盒子一样转动视角由小大变小再由小变大
                27、28：新旧页立体间飞行位移
                29、30：新页缩小和旧变大页翻转交错入场
                31：新页和旧页一起淡入效果同时变小(适合左右和上下操作)
                32：新页和旧页一起淡入效果同时变大(适合左右和上下操作)
                33：新旧页同时面对面翻页入场和出场周时变小与24差不多(适合左右)
                34:旧页固定顶角再掉落新页放大入场(适合左右和上下操作)
                35：旧页缩小移出新页移出放大入场(适合左右)
                36：新页缩小旧页变大交错入场(适合左右和上下操作)
                37：新页缩小和旧变大页旋转交错入场(适合左右和上下操作)

            
             */
            var animation = getAnimation(animation), inClass = "", outClass = "";
            if (params == "next") {
                inClass = animation["next"][0];
                outClass = animation["next"][1];
            } else if (params == "prev") {
                inClass = animation["prev"][0];
                outClass = animation["prev"][1];
            } else {
                inClass = slider.active.inClass;
                outClass = slider.active.outClass;
            }
            //保存动画类名
            slider.active.inClass = inClass;
            slider.active.outClass = outClass;
            var prev = slider.children.eq(slider.active.prev);
            var inde = slider.children.eq(slider.active.index);
            var inClass_ok = false, outClass_ok = false;

            inde.addClass(outClass);
            prev.addClass(inClass);

            if (duration || duration == 0) {
                var times = duration / 1000;
                //console.log('times+'+times);
                prev.css({"-webkit-animation-duration":times + "s","animation-duration":times + "s"});
                inde.css({"-webkit-animation-duration":times + "s","animation-duration":times + "s"});
            }
            // 使用easing动画
            if (slider.settings.easing) {
                prev.css({"-webkit-transition-timing-function":slider.settings.easing,"transition-timing-function":slider.settings.easing});
                inde.css({"-webkit-transition-timing-function":slider.settings.easing,"transition-timing-function":slider.settings.easing});
            }
            
            //设置新入页层级和显示新元素
            inde.css({
                zIndex:slider.settings.slideZIndex -1
            }).show(); 
            //如动画2这种平滑过度。。在iPhone要用.show()才能正常与下一场景播放，在Andorid上要用css({display:"block"})才能正常播放。
            


            //用on绑定事件相当于 live ,live 是先把事件绑定在document对象上面，通过事件冒泡，判断当前处于目标状态的元素是不是预绑定的那个元素对象，然后执行事件，属于前期绑定，元素可以是已存在的，也可以是动态添加的。
            //例div有transition效果，其中有子元素p，我给div绑定了transitionend事件。
            //如果子元素p也有transition的话，transitionend事件会冒泡。
            //我不想管子元素P有没有完成动画，我只要知道DIV是不是完成了。
            //请问怎么解决这个问题，如果有子元素有transition效果，阻止冒泡 我用event.stopPropagation()在主元素上好像没用，得用在子元素上。
            // 不能用one绑定，one是在dom树加载后，对元素的绑定，和bind一样属于后期绑定，但是会在事件执行之后移除元素的绑定事件，事件只执行一次。这样子元素冒泡上来后这个绑定就消失了
            //
            //解决办法
            //1. if (e.target == prev[0]){} //判断目标事件元素是否相等
            //2. 完后后再解除绑定

            //console.log(slider.active.index+'_inde:' +outClass);

            inde.on(cssAendstr, function(e) {
                //console.log('one:'+e.target.tagName);
                if (e.target == inde[0]){
                    inClass_ok = true;
                    var old_class = inde.data("origClass");
                    if (old_class == undefined) old_class = "";
                    // 解除CSS动画事件绑定并还原CSS和zindex;
                    inde.off(cssAendstr).attr("class", old_class).css("zIndex", slider.settings.slideZIndex);
                    //console.log('动画成完了2 ['+inClass_ok +'&&' + outClass_ok +']' + ' unbind:'+e.target.tagName);
                    if (outClass_ok) updateAfterSlideTransition();
                }
            });

            //console.log(slider.active.prev+'_prev:' +inClass);


            prev.on(cssAendstr, function(e) {
                //console.log('one:'+e.target.tagName);
                if (e.target == prev[0]){
                    outClass_ok = true;
                    var old_class = prev.data("origClass");
                    if (old_class == undefined) old_class = "";
                    // 解除CSS动画事件绑定并还原CSS和zindex;
                    prev.off(cssAendstr).attr("class", old_class).css("zIndex", slider.settings.slideZIndex);
                    //console.log('动画成完了1 ['+inClass_ok +'&&' + outClass_ok +']' + ' unbind:'+e.target.tagName);
                    if (inClass_ok) updateAfterSlideTransition();
                }
                
            });

            
            

        };
        /**
         * 执行所需的操作幻灯片过渡后
         */
        var updateAfterSlideTransition = function() {
            //console.log('------------------updateAfterSlideTransition-----------------');
            var prev = slider.children.eq(slider.active.prev);
            var inde = slider.children.eq(slider.active.index)
            //隐藏旧元素
            prev.css({
                zIndex:slider.settings.slideZIndex,
                display:"none"
            });
            //还鼠标滚轮值
            if (slider.settings.mouseWheel) {
                slider.mousewheel.up = 0;
                slider.mousewheel.down = 0;
            }
            
            if (slider.settings.pagerunstat) {
                //继续播放所有子元素的CSS动画渲染
                prev.find("*").css({
                    "animation-play-state":"running",
                    "-webkit-animation-play-state":"running"
                });
                inde.find("*").css({
                    "animation-play-state":"running",
                    "-webkit-animation-play-state":"running"
                });
            }
            // 声明转换完成
            slider.working = false;
            //console.log('ok');

            // onSlideAfter 回调方法
            slider.settings.onSlideAfter(slider.active.index, slider.active.prev, inde, prev);
        };
        /**
         * 获得动画类名
         */
        var getAnimation = function(id) {
            /*
            单数为适合左右操作，双数适合上下操作
            其中0、31、32、34、36、37可左右上下通用。
            ------------------------------------------------
            0：淡入翻页(适合左右和上下操作)
            1、2：简单位移翻页
            3、4：新页位移入场旧页变暗位置不动
            5、6：新旧页同时位移旧页变暗
            7、8：新页位移入场旧页浮动位移
            9、10：新页位移入场旧页变小
            11、12：新页位移入场旧页揭下和9、10差不多
            13、14：旧页位移新页放大入场
            15、16：新页位移入场旧页顶下去
            17、18：新旧页同时面对面翻页入场和出场
            19、20：新旧页像盒子一样转动
            21、22：新旧页像盒子一样展开
            23、24：新旧页像在盒子里一样转动
            25、26：新旧页像盒子一样转动视角由小大变小再由小变大
            27、28：新旧页立体间飞行位移
            29、30：新页缩小和旧变大页翻转交错入场
            31：新页和旧页一起淡入效果同时变小(适合左右和上下操作)
            32：新页和旧页一起淡入效果同时变大(适合左右和上下操作)
            33：新旧页同时面对面翻页入场和出场周时变小与24差不多(适合左右)
            34:旧页固定顶角再掉落新页放大入场(适合左右和上下操作)
            35：旧页缩小移出新页移出放大入场(适合左右)
            36：新页缩小旧页变大交错入场(适合左右和上下操作)
            37：新页缩小和旧变大页旋转交错入场(适合左右和上下操作)
             */
            var prev_outClass = "", prev_inClass = "", next_outClass = "", next_inClass = "";
            switch (id) {
              //0：淡入翻页(适合左右和上下操作)
                case 0:
                prev_outClass = "pt-page-fkfadeOut";
                prev_inClass = "pt-page-fkfadeIn";
                next_outClass = "pt-page-fkfadeOut";
                next_inClass = "pt-page-fkfadeIn";
                break;

              //1、2：简单位移翻页
                case 1:
                prev_outClass = "pt-page-moveToLeft";
                prev_inClass = "pt-page-moveFromRight";
                next_outClass = "pt-page-moveToRight";
                next_inClass = "pt-page-moveFromLeft";
                break;

              case 2:
                prev_outClass = "pt-page-moveToTop";
                prev_inClass = "pt-page-moveFromBottom";
                next_outClass = "pt-page-moveToBottom";
                next_inClass = "pt-page-moveFromTop";
                break;

              //3、4：新页位移入场旧页变暗位置不动
                case 3:
                prev_outClass = "pt-page-fade";
                prev_inClass = "pt-page-moveFromRight pt-page-ontop";
                next_outClass = "pt-page-fade";
                next_inClass = "pt-page-moveFromLeft pt-page-ontop";
                break;

              case 4:
                prev_outClass = "pt-page-fade";
                prev_inClass = "pt-page-moveFromBottom pt-page-ontop";
                next_outClass = "pt-page-fade";
                next_inClass = "pt-page-moveFromTop pt-page-ontop";
                break;

              //5、6：新旧页同时位移旧页变暗
                case 5:
                prev_outClass = "pt-page-moveToLeftFade";
                prev_inClass = "pt-page-moveFromRightFade";
                next_outClass = "pt-page-moveToRightFade";
                next_inClass = "pt-page-moveFromLeftFade";
                break;

              case 6:
                prev_outClass = "pt-page-moveToTopFade";
                prev_inClass = "pt-page-moveFromBottomFade";
                next_outClass = "pt-page-moveToBottomFade";
                next_inClass = "pt-page-moveFromTopFade";
                break;

              //7、8：新页位移入场旧页浮动位移
                case 7:
                prev_outClass = "pt-page-moveToLeftEasing pt-page-ontop";
                prev_inClass = "pt-page-moveFromRight";
                next_outClass = "pt-page-moveToRightEasing pt-page-ontop";
                next_inClass = "pt-page-moveFromLeft";
                break;

              case 8:
                prev_outClass = "pt-page-moveToTopEasing pt-page-ontop";
                prev_inClass = "pt-page-moveFromBottom";
                next_outClass = "pt-page-moveToBottomEasing pt-page-ontop";
                next_inClass = "pt-page-moveFromTop";
                break;

              //9、10：新页位移入场旧页变小
                case 9:
                prev_outClass = "pt-page-scaleDown";
                prev_inClass = "pt-page-moveFromRight pt-page-ontop";
                next_outClass = "pt-page-scaleDown";
                next_inClass = "pt-page-moveFromLeft pt-page-ontop";
                break;

              case 10:
                prev_outClass = "pt-page-scaleDown";
                prev_inClass = "pt-page-moveFromBottom pt-page-ontop";
                next_outClass = "pt-page-scaleDown";
                next_inClass = "pt-page-moveFromTop pt-page-ontop";
                break;

              //11、12：新页位移入场旧页揭下和9、10差不多
                case 11:
                prev_outClass = "pt-page-rotateTopSideFirst";
                prev_inClass = "pt-page-moveFromTop pt-page-delay200 pt-page-ontop";
                next_outClass = "pt-page-rotateBottomSideFirst";
                next_inClass = "pt-page-moveFromBottom pt-page-delay200 pt-page-ontop";
                break;

              case 12:
                prev_outClass = "pt-page-rotateRightSideFirst";
                prev_inClass = "pt-page-moveFromRight pt-page-delay200 pt-page-ontop";
                next_outClass = "pt-page-rotateLeftSideFirst";
                next_inClass = "pt-page-moveFromLeft pt-page-delay200 pt-page-ontop";
                break;

              //13、14：旧页位移新页放大入场
                case 13:
                prev_outClass = "pt-page-moveToLeft pt-page-ontop";
                prev_inClass = "pt-page-scaleUp";
                next_outClass = "pt-page-moveToRight pt-page-ontop";
                next_inClass = "pt-page-scaleUp";
                break;

              case 14:
                prev_outClass = "pt-page-moveToTop pt-page-ontop";
                prev_inClass = "pt-page-scaleUp";
                next_outClass = "pt-page-moveToBottom pt-page-ontop";
                next_inClass = "pt-page-scaleUp";
                break;

              //15、16：新页位移入场旧页顶下去
                case 15:
                prev_outClass = "pt-page-rotatePushLeft";
                prev_inClass = "pt-page-moveFromRight";
                next_outClass = "pt-page-rotatePushRight";
                next_inClass = "pt-page-moveFromLeft";
                break;

              case 16:
                prev_outClass = "pt-page-rotatePushTop";
                prev_inClass = "pt-page-moveFromBottom";
                next_outClass = "pt-page-rotatePushBottom";
                next_inClass = "pt-page-moveFromTop";
                break;

              //17、18：新旧页同时面对面翻页入场和出场
                case 17:
                prev_outClass = "pt-page-rotatePushLeft";
                prev_inClass = "pt-page-rotatePullRight pt-page-delay180";
                next_outClass = "pt-page-rotatePushRight";
                next_inClass = "pt-page-rotatePullLeft pt-page-delay180";
                break;

              case 18:
                prev_outClass = "pt-page-rotatePushTop";
                prev_inClass = "pt-page-rotatePullBottom pt-page-delay180";
                next_outClass = "pt-page-rotatePushBottom";
                next_inClass = "pt-page-rotatePullTop pt-page-delay180";
                break;

              //19、20：新旧页像盒子一样转动
                case 19:
                prev_outClass = "pt-page-rotateFoldLeft";
                prev_inClass = "pt-page-moveFromRightFade";
                next_outClass = "pt-page-rotateFoldRight";
                next_inClass = "pt-page-moveFromLeftFade";
                break;

              case 20:
                prev_outClass = "pt-page-rotateFoldTop";
                prev_inClass = "pt-page-moveFromBottomFade";
                next_outClass = "pt-page-rotateFoldBottom";
                next_inClass = "pt-page-moveFromTopFade";
                break;

              //21、22：新旧页像盒子一样展开
                case 21:
                prev_outClass = "pt-page-moveToRightFade";
                prev_inClass = "pt-page-rotateUnfoldLeft";
                next_outClass = "pt-page-moveToLeftFade";
                next_inClass = "pt-page-rotateUnfoldRight";
                break;

              case 22:
                prev_outClass = "pt-page-moveToBottomFade";
                prev_inClass = "pt-page-rotateUnfoldTop";
                next_outClass = "pt-page-moveToTopFade";
                next_inClass = "pt-page-rotateUnfoldBottom";
                break;

              //23、24：新旧页像在盒子里一样转动
                case 23:
                prev_outClass = "pt-page-rotateRoomLeftOut pt-page-ontop";
                prev_inClass = "pt-page-rotateRoomLeftIn";
                next_outClass = "pt-page-rotateRoomRightOut pt-page-ontop";
                next_inClass = "pt-page-rotateRoomRightIn";
                break;

              case 24:
                prev_outClass = "pt-page-rotateRoomTopOut pt-page-ontop";
                prev_inClass = "pt-page-rotateRoomTopIn";
                next_outClass = "pt-page-rotateRoomBottomOut pt-page-ontop";
                next_inClass = "pt-page-rotateRoomBottomIn";
                break;

              //25、26：新旧页像盒子一样转动视角由小大变小再由小变大
                case 25:
                prev_outClass = "pt-page-rotateCubeLeftOut pt-page-ontop";
                prev_inClass = "pt-page-rotateCubeLeftIn";
                next_outClass = "pt-page-rotateCubeRightOut pt-page-ontop";
                next_inClass = "pt-page-rotateCubeRightIn";
                break;

              case 26:
                prev_outClass = "pt-page-rotateCubeTopOut pt-page-ontop";
                prev_inClass = "pt-page-rotateCubeTopIn";
                next_outClass = "pt-page-rotateCubeBottomOut pt-page-ontop";
                next_inClass = "pt-page-rotateCubeBottomIn";
                break;

              //27、28：新旧页立体间飞行位移
                case 27:
                prev_outClass = "pt-page-rotateCarouselLeftOut pt-page-ontop";
                prev_inClass = "pt-page-rotateCarouselLeftIn";
                next_outClass = "pt-page-rotateCarouselRightOut pt-page-ontop";
                next_inClass = "pt-page-rotateCarouselRightIn";
                break;

              case 28:
                prev_outClass = "pt-page-rotateCarouselTopOut pt-page-ontop";
                prev_inClass = "pt-page-rotateCarouselTopIn";
                next_outClass = "pt-page-rotateCarouselBottomOut pt-page-ontop";
                next_inClass = "pt-page-rotateCarouselBottomIn";
                break;

              //29、30：新页缩小和旧变大页翻转交错入场
                case 29:
                prev_outClass = "pt-page-flipOutTop";
                prev_inClass = "pt-page-flipInBottom pt-page-delay500";
                next_outClass = "pt-page-flipOutBottom";
                next_inClass = "pt-page-flipInTop pt-page-delay500";
                break;

              case 30:
                prev_outClass = "pt-page-flipOutRight";
                prev_inClass = "pt-page-flipInLeft pt-page-delay500";
                next_outClass = "pt-page-flipOutLeft";
                next_inClass = "pt-page-flipInRight pt-page-delay500";
                break;

              //31：新页和旧页一起淡入效果同时变小(适合左右和上下操作)
                case 31:
                prev_outClass = "pt-page-scaleDown";
                prev_inClass = "pt-page-scaleUpDown pt-page-delay300";
                next_outClass = "pt-page-scaleDown";
                next_inClass = "pt-page-scaleUpDown pt-page-delay300";
                break;

              //32：新页和旧页一起淡入效果同时变大(适合左右和上下操作)
                case 32:
                prev_outClass = "pt-page-scaleDownUp";
                prev_inClass = "pt-page-scaleUp pt-page-delay300";
                next_outClass = "pt-page-scaleDownUp";
                next_inClass = "pt-page-scaleUp pt-page-delay300";
                break;

              //33：新旧页同时面对面翻页入场和出场周时变小与24差不多(适合左右)
                case 33:
                prev_outClass = "pt-page-rotateSidesOut";
                prev_inClass = "pt-page-rotateSidesIn pt-page-delay200";
                next_outClass = "pt-page-rotateSidesOut2";
                next_inClass = "pt-page-rotateSidesIn2 pt-page-delay200";
                break;

              //34:旧页固定顶角再掉落新页放大入场(适合左右和上下操作)
                case 34:
                prev_outClass = "pt-page-rotateFall pt-page-ontop";
                prev_inClass = "pt-page-scaleUp";
                next_outClass = "pt-page-rotateFall2 pt-page-ontop";
                next_inClass = "pt-page-scaleUp";
                break;

              //35：旧页缩小移出新页移出放大入场(适合左右)
                case 35:
                prev_outClass = "pt-page-rotateSlideOut";
                prev_inClass = "pt-page-rotateSlideIn";
                next_outClass = "pt-page-rotateSlideOut2";
                next_inClass = "pt-page-rotateSlideIn2";
                break;

              //36：新页缩小旧页变大交错入场(适合左右和上下操作)
                case 36:
                prev_outClass = "pt-page-scaleDownCenter";
                prev_inClass = "pt-page-scaleUpCenter pt-page-delay400";
                next_outClass = "pt-page-scaleDownCenter";
                next_inClass = "pt-page-scaleUpCenter pt-page-delay400";
                break;

              //37：新页缩小和旧变大页旋转交错入场(适合左右和上下操作)
                case 37:
                prev_outClass = "pt-page-rotateOutNewspaper";
                prev_inClass = "pt-page-rotateInNewspaper pt-page-delay500";
                next_outClass = "pt-page-rotateOutNewspaper";
                next_inClass = "pt-page-rotateInNewspaper pt-page-delay500";
                break;
            }
            var tmp = {
                prev:[ 'pt-page-rotateSlideOut2', 'pt-page-rotateSlideIn2' ],
                next:[ 'pt-page-rotateSlideOut', 'pt-page-rotateSlideIn' ]
            };
            return tmp;
        };
        /**
         * ===================================================================================
         * = 公共方法
         * ===================================================================================
         */
        /**
         * 执行幻灯片过渡到指定的幻灯片
         *
         * @param slideIndex (int)
         *  - 目的地滑动的索引（从零开始）
         *
         * @param direction (string)
         *  - 仅供内部使用的移动方向 ("prev" / "next")
         */
        el.goToSlide = function(slideIndex, direction) {
            // 如果插件是目前在运动，忽略请求
            if (slider.working || slider.active.index == slideIndex) return;
            // 声明的插件是在运动
            slider.working = true;
            // 保存老的卡片ID
            slider.active.prev = slider.active.index;
            //如果无限循环infiniteLoop即改变ID
            if (direction == "prev" && slideIndex < slider.active.first) {
                //console.log('prev到头了........');
                slider.active.index = slider.active.first;
                // 如果是无限循环
                if (slider.settings.infiniteLoop) slider.active.index = slider.active.last;
            } else if (direction == "next" && slideIndex > slider.active.last) {
                //console.log('next到头了........');
                slider.active.index = slider.active.last;
                // 如果是无限循环
                if (slider.settings.infiniteLoop) slider.active.index = slider.active.first;
            } else {
                slider.active.index = slideIndex;
            }
            var inde = slider.children.eq(slider.active.index);
            var prev = slider.children.eq(slider.active.prev)
            if (slider.settings.pagerunstat) {
                //停止所有子元素的CSS动画渲染
                prev.find("*").css({
                    "animation-play-state":"paused",
                    "-webkit-animation-play-state":"paused"
                });
                inde.find("*").css({
                    "animation-play-state":"paused",
                    "-webkit-animation-play-state":"paused"
                });
            }
            // 设置切换前的回调方法 onSlideBefore, onSlideNext, onSlidePrev 方法回调
            slider.settings.onSlideBefore(slider.active.index, slider.active.prev, inde, prev);
            if (direction == "next") {
                slider.settings.onSlideNext(slider.active.index, slider.active.prev, inde, prev);
            } else if (direction == "prev") {
                slider.settings.onSlidePrev(slider.active.index, slider.active.prev, inde, prev);
            }
            //console.log(slider.active.index);
            
            //设置新入页层级和显示新元素
            /*
            inde.css({
                zIndex:slider.settings.slideZIndex -1,
                display:"block"
            });
            */

            //自动翻页动画效果
            setPositionProperty(0, slider.settings.mode, slider.settings.speed, direction);
        };
        /**
         * 转换到下一张幻灯片
         */
        el.goToNextSlide = function() {
            // 如果没有无限循环并且到最后页则不做操作
            if (!slider.settings.infiniteLoop && slider.active.index == slider.active.last) return;
            var pagerIndex = parseInt(slider.active.index) + 1;
            el.goToSlide(pagerIndex, "next");
        };
        /**
         * 转换到上一张幻灯片
         */
        el.goToPrevSlide = function() {
            // 如果没有无限循环并且到最前页则不做操作
            if (!slider.settings.infiniteLoop && slider.active.index == slider.active.first) return;
            var pagerIndex = parseInt(slider.active.index) - 1;
            el.goToSlide(pagerIndex, "prev");
        };
        /**
         * 返回当前幻灯片的索引（从零开始）
         */
        el.getCurrentSlide = function() {
            return slider.active.index;
        };
        /**
         * 返回当前幻灯片元素
         */
        el.getCurrentSlideElement = function() {
            return slider.children.eq(slider.active.index);
        };
        /**
         * 在显示的幻灯片的总数
         */
        el.getSlideCount = function() {
            return slider.children.length;
        };
        el.setSlideMode = function(cindex) {
            if (cindex) slider.settings.mode = cindex;
            return slider.settings.mode;
        };
        /**
         *重新装入滑块（恢复所有的DOM变化，并重新初始化）
         */
        el.reloadSlider = function(settings) {
            if (settings != undefined) options = settings;
            if (!slider.initialized) return;
            slider.initialized = false;
            slider.children.each(function() {
                $(this).data("origStyle") != undefined ? $(this).attr("style", $(this).data("origStyle")) :$(this).removeAttr("style");
            });
            $(this).data("origStyle") != undefined ? this.attr("style", $(this).data("origStyle")) :$(this).removeAttr("style");
            //删除被选元素的父元素。
            $(this).unwrap().unwrap();
            //解绑事件
            if (slider.settings.responsive) $(window).unbind("resize", resizeWindow);
            init();
        };
        init();
        //初始化
        // 返回当前jQuery对象
        return this;
    };
})(jQuery);
// 闭包结束
