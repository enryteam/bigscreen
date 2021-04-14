/*!
 * SVG Map
 * @version v1.1.0
 * @author  Rocky(rockyuse@163.com)
 * @date    2015-08-28
 *
 * (c) 2012-2015 Rocky, https://github.com/rockyuse
 * This is licensed under the GNU LGPL, version 2.1 or later.
 * For details, see: http://creativecommons.org/licenses/LGPL/2.1/
 */

;!function (window, $, undefined) {
	Array.prototype.indexOf = function (value) {
		var i, _ref;
		i = (_ref = arguments[1]) != null ? _ref : 0;
		if (i < 0) i += length;
		i = Math.max(i, 0);
		while (i < this.length) {
			if (i in this) if (this[i] === value) return i;
			i++;
		}
		return -1;
	};
	Array.prototype.remove = function (val) {
		var index = this.indexOf(val);
		if (index > -1) {
			this.splice(index, 1);
		}
	};

	var SVGMap = (function() {
		function SVGMap(dom, options) {
			this.externalData = {};
			this.dom = dom;
			this.setOptions(options);
			this.render();
		}
		SVGMap.prototype.options = {
			mapName: 'china',
			mapWidth: 500,
			mapHeight: 400,
			stateColorList: ['#2770B5', '#429DD4', '#5AABDA', '#1C8DFF', '#70B3DD', '#C6E1F4', '#EDF2F6'],

			stateDataAttr: ['stateInitColor', 'stateHoverColor', 'stateSelectedColor', 'baifenbi'],
			stateDataType: 'json',
			stateSettingsXmlPath: '',

			stateData: {},

			strokeWidth: 1,
			strokeColor: '#F9FCFE',
			stateCursor: 'default',

			stateInitColor: '#AAD5FF',
			stateHoverColor: '#feb41c',
			stateSelectedColor: '#EC971F',
			stateDisabledColor: '#eeeeee',

			linkOut: false,
			linkOutTarget: 'new',

			showTipInit: true,
			showTip: true,
			mapTipWidth: 100,
			//mapTipHeight: 50,
			mapTipX: 0,
			mapTipY: -10,
			mapTipHtml: function (stateData, obj) {
				return obj.name;
			},
			showCity: false,
			showName: false,
			showNameAttr: {
				'fill': '#333',
				'font-family': 'Microsoft yahei',
				// 'font-size': 60,
				'font-size': 20,
				'font-weight': 'normal',
				'cursor': 'default'

				// 'href': 'http://baidu.com',
				// 'target': 'new'
			},

			showCapital: false,

			hoverCallback: function (stateData, obj) {},

			clickColorChange: false,
			clickCallback: function (stateData, obj) {},
			unClickCallback: function (stateData, obj) {},

			hoverRegion: '',
			clickedRegion: [],
			
			external: false,

			showOtherText: false,								// 显示文本信息
			showOtherTextAttr: {
				'fill': 'red',
				'font-family': 'Microsoft yahei',
				'font-size': 11,
				'font-weight': 'normal',
				'href': 'http://baidu.com',
				'target': 'new'
			},
			showOtherTextLink: false
		};

		SVGMap.prototype.setOptions = function (options) {
			if (options == null) {
				options = null;
			}
			this.options = $.extend({}, this.options, options);
			return this;
		};

		// ie Pollfill
		SVGMap.prototype.scaleRaphael = function (container, viewBox) {
			var width = viewBox[2];
			var height = viewBox[3];

			var wrapper = document.getElementById(container);
			if (!wrapper.style.position) wrapper.style.position = "relative";
			wrapper.style.width = width + "px";
			wrapper.style.height = height + "px";
			wrapper.style.overflow = "hidden";
			var nestedWrapper;
			if (Raphael.type == "VML") {
				wrapper.innerHTML = "<rvml:group style='position : absolute; width: 1000px; height: 1000px; top: 0px; left: 0px' coordsize='1000,1000' class='rvml' id='vmlgroup_" + container + "'><\/rvml:group>";
				nestedWrapper = document.getElementById("vmlgroup_" + container);
			} else {
				wrapper.innerHTML = '<div class="svggroup"></div>';
				nestedWrapper = wrapper.getElementsByClassName("svggroup")[0];
			}
			var paper = new Raphael(nestedWrapper, width, height);
			var vmlDiv;
			if (Raphael.type == "SVG") {
				paper.canvas.setAttribute("viewBox", viewBox[0] + ' ' + viewBox[1] + ' ' + width + ' ' + height);
			} else {
				vmlDiv = wrapper.getElementsByTagName("div")[0];
			}
			paper.changeSize = function (w, h, center, clipping) {
				clipping = !clipping;
				var ratioW = w / width;
				var ratioH = h / height;
				var scale = ratioW < ratioH ? ratioW : ratioH;

				var newHeight = parseInt(height * scale);
				var newWidth = parseInt(width * scale);
				if (Raphael.type == "VML") {
					var txt = document.getElementsByTagName("textpath");
					for (var i in txt) {
						var curr = txt[i];
						if (curr.style) {
							if (!curr._fontSize) {
								var mod = curr.style.font.split("px");
								curr._fontSize = parseInt(mod[0]);
								curr._font = mod[1];
							}
							curr.style.font = curr._fontSize * scale + "px" + curr._font;
						}
					}
					var newSize;
					if (newWidth < newHeight) {
						newSize = newWidth * 1000 / width;
					} else {
						newSize = newHeight * 1000 / height;
					}
					newSize = parseInt(newSize);
					nestedWrapper.style.width = newSize + "px";
					nestedWrapper.style.height = newSize + "px";
					if (clipping) {
						var _rate = newWidth / width;
						nestedWrapper.style.left = -_rate*viewBox[0] + parseInt((w - newWidth) / 2) + "px";
						nestedWrapper.style.top = -_rate*viewBox[1] + parseInt((h - newHeight) / 2) + "px";
					}
					vmlDiv.style.overflow = "visible";
				}
				if (clipping) {
					newWidth = w;
					newHeight = h;
				}
				wrapper.style.width = newWidth + "px";
				wrapper.style.height = newHeight + "px";
				paper.setSize(newWidth, newHeight);

				if (center) {
					wrapper.style.position = "absolute";
					wrapper.style.left = parseInt((w - newWidth) / 2) + "px";
					wrapper.style.top = parseInt((h - newHeight) / 2) + "px";
				}
			};
			paper.scaleAll = function (amount) {
				paper.changeSize(width * amount, height * amount);
			};
			paper.changeSize(width, height);
			paper.w = width;
			paper.h = height;
			return paper;
		};

		SVGMap.prototype.render = function(){
			var self = this;
			var opt = this.options,
				_self = this.dom,
				mapName = opt.mapName,
				mapConfig = eval(mapName + 'MapConfig');

			var stateData = {};

			if (opt.stateDataType == 'xml') {
				var mapSettings = opt.stateSettingsXmlPath;
				$.ajax({
					type: 'GET',
					url: mapSettings,
					async: false,
					dataType: $.browser.msie ? 'text' : 'xml',
					success: function (data) {
						var xml;
						if ($.browser.msie) {
							xml = new ActiveXObject('Microsoft.XMLDOM');
							xml.async = false;
							xml.loadXML(data);
						} else {
							xml = data;
						}
						var $xml = $(xml);
						$xml.find('stateData').each(function (i) {
							var $node = $(this),
								stateName = $node.attr('stateName');

							stateData[stateName] = {};
							// var attrs = $node[0].attributes;
							// alert(attrs);
							// for(var i in attrs){
							//     stateData[stateName][attrs[i].name] = attrs[i].value;
							// }
							for (var i = 0, len = opt.stateDataAttr.length; i < len; i++) {
								stateData[stateName][opt.stateDataAttr[i]] = $node.attr(opt.stateDataAttr[i]);
							}
						});
					}
				});
			} else {
				stateData = opt.stateData;
			};

			// 坐标点的xy坐标
			var offsetXY = function (e) {
				var mouseX, mouseY, tipWidth = $('#MapTip').outerWidth(),
					tipHeight = $('#MapTip').outerHeight();
				if (e && e.pageX) {
					mouseX = e.pageX;
					mouseY = e.pageY;
				} else {
					mouseX = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
					mouseY = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
				}
				mouseX = mouseX - tipWidth / 2 + opt.mapTipX < 0 ? 0 : mouseX - tipWidth / 2 + opt.mapTipX;
				mouseY = mouseY - tipHeight + opt.mapTipY < 0 ? mouseY - opt.mapTipY : mouseY - tipHeight + opt.mapTipY;
				return [mouseX, mouseY];
			};

			var current;

			var r = this.scaleRaphael(_self.attr('id'), mapConfig.viewBox),
			attributes = {
				'fill': opt.stateInitColor,
				'cursor': opt.stateCursor,
				'stroke': opt.strokeColor,
				'stroke-width': mapConfig.base.strokeWidth == undefined ? opt.strokeWidth : mapConfig.base.strokeWidth,
				'stroke-linejoin': 'round'
			};

			// hover
			function sharpHover(e, obj){
				if(opt.hoverRegion == obj.id){
					opt.timeTimer = 1;
					clearTimeout(obj.timer);
					return;
				}
				if(!opt.external || typeof self.externalData[obj.id].eventHoverLock == 'undefined' || self.externalData[obj.id].eventHoverLock == false){
					if(opt.clickedRegion.indexOf(obj.id) == -1){
						obj.animate({
							fill: stateColor[obj.id].hoverColor
						}, 150);
					}
				}
				
				if(opt.showTip){
					opt.timeTimer = 1;
					if ($('#MapTip').length == 0) {
						$(document.body).append('<div id="MapTip" class="mapTip"><div class="con"></div><div class="arrow"><div class="arrowMask"></div></div></div');
					}
					$('#MapTip .con').html(opt.mapTipHtml(stateData, obj));
					var _offsetXY = new offsetXY(e);

					$('#MapTip').css({
						width: opt.mapTipWidth || 'auto',
						height: opt.mapTipHeight || 'auto',
						left: _offsetXY[0],
						top: _offsetXY[1]
					}).show();
				}

				opt.hoverRegion = obj.id;
				opt.hoverCallback(stateData, obj);
			}

			// out
			function sharpOut(e, obj){
				opt.timeTimer = 0;
				opt.hoverRegion = '';

				obj.timer = setTimeout(function(){
					if(opt.hoverRegion == obj.id){
						return;
					}

					if(!opt.external || typeof self.externalData[obj.id].eventHoverLock == 'undefined' || self.externalData[obj.id].eventHoverLock == false){
						if(opt.clickedRegion.indexOf(obj.id) == -1){
							obj.animate({
								fill: stateColor[obj.id].initColor
							}, 100);
						}
					}
					if (opt.showTip && opt.timeTimer != 1) {
						$('#MapTip').remove();
					}
				}, 100);
			}

			// click
			function sharpClick(e, obj){
				if(opt.showCity != false){
					opt.showCity(obj.id)
					return;
				}
				if(opt.clickColorChange == false){
					return;
				}
				if(!opt.external || typeof self.externalData[obj.id].eventClickLock == 'undefined' || self.externalData[obj.id].eventClickLock == false){
					if(opt.clickedRegion.indexOf(obj.id) == -1){
						opt.clickedRegion.push(obj.id);
						obj.animate({
							fill: stateColor[obj.id].selectedColor
						}, 150);
						opt.clickCallback(stateData, obj);
					}else{
						opt.clickedRegion.remove(obj.id);

						if(!opt.external || typeof self.externalData[obj.id].eventHoverLock == 'undefined' || self.externalData[obj.id].eventHoverLock == false){
							obj.animate({
								fill: stateColor[obj.id].hoverColor
							}, 150);
						}else{
							obj.animate({
								fill: stateColor[obj.id].initColor
							}, 150);
						}
						opt.unClickCallback(stateData, obj);
					}
				}
			}

			var stateColor = {};

			for (var state in mapConfig.shapes) {
				var thisStateData = stateData[state],
					initColor = (thisStateData && opt.stateColorList[thisStateData.stateInitColor] || opt.stateInitColor),
					hoverColor = (thisStateData && thisStateData.stateHoverColor || opt.stateHoverColor),
					selectedColor = (thisStateData && thisStateData.stateSelectedColor || opt.stateSelectedColor),
					disabledColor = (thisStateData && thisStateData.stateDisabledColor || opt.stateDisabledColor);

				stateColor[state] = {};

				stateColor[state].initColor = initColor;
				stateColor[state].hoverColor = hoverColor;
				stateColor[state].selectedColor = selectedColor;

				var obj = r.path(mapConfig['shapes'][state]);
				obj.id = state;
				obj.name = mapConfig['names'][state];
				obj.timer = '';
				obj.attr(attributes);

				if (opt.external) {
					// opt.external[obj.id] = obj;
					self.externalData[obj.id] = obj;
				}

				if (stateData[state] && stateData[state].diabled) {
					obj.attr({
						fill: disabledColor,
						cursor: 'default'
					});
				} else {
					obj.attr({
						fill: initColor
					});

					// 划过改变颜色
					obj.hover(function (e) {
						sharpHover(e, this);
					}, function(e) {
						if(opt.external && typeof self.externalData[obj.id].eventHoverLock != 'undefined' && self.externalData[obj.id].eventHoverLock == true){
							return;
						}
						sharpOut(e, this);
					}).click(function(e){
						if(opt.external && typeof self.externalData[obj.id].eventClickLock != 'undefined' && self.externalData[obj.id].eventClickLock == true){
							return;
						}
						sharpClick(e, this);
					});
				}
				if(opt.linkOut && typeof stateData[obj.id] != 'undefined' && typeof stateData[obj.id]['href'] != 'undefined'){
					obj.attr({'href': stateData[obj.id]['href'], 'target': opt.linkOutTarget, 'cursor': 'pointer'})
				}

				// 文字坐标点
				if(opt.showName){
					var _coordinate = mapConfig.coordinate[state];
					opt.showNameAttr['font-size'] = mapConfig.base.fontSize;
					var _provinceName = r
					.text(_coordinate[0], _coordinate[1], obj.name)
					.attr(opt.showNameAttr);

					if(opt.linkOut && typeof stateData[obj.id] != 'undefined' && typeof stateData[obj.id]['href'] != 'undefined'){
						_provinceName.attr({'href': stateData[obj.id]['href'], 'target': opt.linkOutTarget, 'cursor': 'pointer'})
					}

					;(function(obj){
						_provinceName.hover(function(e){
							sharpHover(e, obj);
						}, function(e){
							sharpOut(e, obj);
						}).click(function(e){
							sharpClick(e, obj);
						});
					})(obj);
				}

				// 省会城市坐标点
				if(opt.showCapital){
					var _coordinate = mapConfig.coordinate[state];
					var _capitalPoint = r.circle(_coordinate[2], _coordinate[3], mapConfig.base.point).attr({
						'fill': '#d9534f',
						// ,
						// 'stroke': opt.strokeColor,
						'stroke-width': 0
					});

					;(function(obj){
						_capitalPoint.hover(function(e){
							sharpHover(e, obj);
						}, function(e){
							sharpOut(e, obj);
						}).click(function(e){
							sharpClick(e, obj);
						});
					})(obj);
				}

				// 其他文字
				if(opt.showOtherText && typeof stateData[obj.id] != 'undefined' && typeof stateData[obj.id].otherText != 'undefined'){
					var _otherTextInfo = stateData[obj.id].otherText;

					var _coordinate = mapConfig.coordinate[state];
					var _otherText = r.text(_coordinate[0], _coordinate[1], _otherTextInfo.info).attr(
						opt.showOtherTextAttr
					);

					if(typeof _otherTextInfo.color != 'undefined'){
						_otherText.attr({
							fill: _otherTextInfo.color
						});
					}

					if(typeof _otherTextInfo.link != 'undefined'){
						_otherText.attr({
							href: _otherTextInfo.link,
							target: _otherTextInfo.linkTarget
						});
					}

					;(function(obj){
						_otherText.hover(function(e){
							sharpHover(e, obj);
						}, function(e){
							sharpOut(e, obj);
						}).click(function(e){
							sharpClick(e, obj);
						});
					})(obj);
				}
			}

			// 整体放大缩小
			r.changeSize(opt.mapWidth, opt.mapHeight, false, false);

			document.body.onmousemove = function (e) {
				var _offsetXY = new offsetXY(e);
				$('#MapTip').css({
					left: _offsetXY[0],
					top: _offsetXY[1]
				});
			};
		}
		return SVGMap;
	})();

	$.fn.SVGMap = function (opts) {
		var $this = $(this),
			data = $this.data();

		if (data.SVGMap) {
			delete data.SVGMap;
		}
		if (opts !== false) {
			data.SVGMap = new SVGMap($this, opts);
		}
		return data.SVGMap;
	};
}(window, jQuery);