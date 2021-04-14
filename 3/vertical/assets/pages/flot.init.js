/*
 Template Name: Stexo - Responsive Bootstrap 4 Admin Dashboard
 Author: Themesdesign
 Website: www.themesdesign.in
 File: Float Js
 */


!function($) {
    "use strict";

    var FlotChart = function() {
        this.$body = $("body")
        this.$realData = []
    };

    //creates plot graph
    FlotChart.prototype.createPlotGraph = function(selector, data1, data2, labels, colors, borderColor, bgColor) {
      //shows tooltip
      function showTooltip(x, y, contents) {
        $('<div id="tooltip" class="tooltipflot">' + contents + '</div>').css( {
          position: 'absolute',
          top: y + 5,
          left: x + 5
        }).appendTo("body").fadeIn(200);
      }

      $.plot($(selector),
          [ { data: data1,
            label: labels[0],
            color: colors[0]
          },
          { data: data2,
            label: labels[1],
            color: colors[1]
          }
        ],
          {
              series: {
                  lines: {
                      show: true,
                      fill: true,
                      lineWidth: 2,
                      fillColor: {
                          colors: [{opacity: 0.5},
                              {opacity: 0.5}
                          ]
                      }
                  },
                  points: {
                      show: false
                  },
                  shadowSize: 0
              },
              legend: {
                  position: 'nw'
              },
              grid: {
                  hoverable: true,
                  clickable: true,
                  borderColor: borderColor,
                  borderWidth: 1,
                  labelMargin: 10,
                  backgroundColor: bgColor
              },
              yaxis: {
                  min: 0,
                  max: 15,
                  color: 'rgba(0,0,0,0.1)'
              },
              xaxis: {
                  color: 'rgba(0,0,0,0.1)'
              },
              tooltip: true,
              tooltipOpts: {
                  content: '%s: Value of %x is %y',
                  shifts: {
                      x: -60,
                      y: 25
                  },
                  defaultTheme: false
              }
          });
    },
    //end plot graph

    //creates Pie Chart
    FlotChart.prototype.createPieGraph = function(selector, labels, datas, colors) {
        var data = [{
            label: labels[0],
            data: datas[0]
        }, {
            label: labels[1],
            data: datas[1]
        }, {
            label: labels[2],
            data: datas[2]
        }];
        var options = {
            series: {
                pie: {
                    show: true
                }
            },
            legend : {
				show : true
			},
			grid : {
				hoverable : true,
				clickable : true
			},
			colors : colors,
			tooltip : true,
			tooltipOpts : {
				content : "%s, %p.0%"
			}
        };

        $.plot($(selector), data, options);
    },

    //returns some random data
    FlotChart.prototype.randomData = function() {
        var totalPoints = 300;
        if (this.$realData.length > 0)
            this.$realData = this.$realData.slice(1);

      // Do a random walk
      while (this.$realData.length < totalPoints) {

        var prev = this.$realData.length > 0 ? this.$realData[this.$realData.length - 1] : 50,
          y = prev + Math.random() * 10 - 5;

        if (y < 0) {
          y = 0;
        } else if (y > 100) {
          y = 100;
        }

        this.$realData.push(y);
      }

      // Zip the generated y values with the x values
      var res = [];
      for (var i = 0; i < this.$realData.length; ++i) {
        res.push([i, this.$realData[i]])
      }

      return res;
    },

    FlotChart.prototype.createRealTimeGraph = function(selector, data, colors) {
        var plot = $.plot(selector, [data], {
          colors: colors,
          series: {
            lines: {
              show: true,
              fill: true,
              lineWidth: 2,
              fillColor: {
                colors: [{
                  opacity: 0.45
                }, {
                  opacity: 0.45
                }]
              }
            },
            points: {
              show: false
            },
            shadowSize: 0
          },
          grid : {
				show : true,
				aboveData : false,
				color : '#dcdcdc',
				labelMargin : 15,
				axisMargin : 0,
				borderWidth : 0,
				borderColor : null,
				minBorderMargin : 5,
				clickable : true,
				hoverable : true,
				autoHighlight : false,
				mouseActiveRadius : 20
			},
			tooltip : true, //activate tooltip
			tooltipOpts : {
				content : "Value is : %y.0" + "%",
				shifts : {
					x : -30,
					y : -50
				}
			},
			yaxis : {
				min : 0,
				max : 100,
				color : 'rgba(0,0,0,0.1)'
			},
			xaxis : {
				show : false
			}
        });

        return plot;
    },
    //creates Pie Chart
    FlotChart.prototype.createDonutGraph = function(selector, labels, datas, colors) {
        var data = [{
            label: labels[0],
            data: datas[0]
        }, {
            label: labels[1],
            data: datas[1]
        }, {
            label: labels[2],
            data: datas[2]
        },
        {
            label: labels[3],
            data: datas[3]
        }, {
            label: labels[4],
            data: datas[4]
        }
        ];
        var options = {
            series: {
                pie: {
                    show: true,
                    innerRadius: 0.7
                }
            },
            legend : {
				show : true,
				labelFormatter : function(label, series) {
					return '<div style="font-size:14px;">&nbsp;' + label + '</div>'
				},
				labelBoxBorderColor : null,
				margin : 50,
				width : 20,
				padding : 1
			},
			grid : {
				hoverable : true,
				clickable : true
			},
			colors : colors,
			tooltip : true,
			tooltipOpts : {
				content : "%s, %p.0%"
			}
        };

        $.plot($(selector), data, options);
    },

        //initializing various charts and components
        FlotChart.prototype.init = function() {
            //plot graph data
            var uploads = [[0, 12], [1, 8], [2, 5], [3, 8], [4, 5], [5, 14], [6, 10]];
            var downloads = [[0, 1], [1, 12], [2,4], [3, 3], [4, 12], [5, 4], [6, 12]];
            var plabels = ["Marketplace","Other Market"];
            var pcolors = ['#02c58d', '#30419b'];
            var borderColor = '#f5f5f5';
            var bgColor = '#fff';
            this.createPlotGraph("#website-stats", uploads, downloads, plabels, pcolors, borderColor, bgColor);

            //Pie graph data
            var pielabels = ["Marketplace","Other Market","Direct Sales"];
            var datas = [30,25, 30];
            var colors = ['#30419b', '#02c58d', "#f0f4f7"];
            this.createPieGraph("#pie-chart #pie-chart-container", pielabels , datas, colors);

            //real time data representation
            var plot = this.createRealTimeGraph('#flotRealTime', this.randomData() , ['#02c58d']);
            plot.draw();
            var $this = this;
            function updatePlot() {
                plot.setData([$this.randomData()]);
                // Since the axes don't change, we don't need to call plot.setupGrid()
                plot.draw();
                setTimeout(updatePlot, $( 'html' ).hasClass( 'mobile-device' ) ? 1000 : 1000);
            }
            updatePlot();

            //Donut pie graph data
            var donutlabels = ["Marketplace","Other Market","Direct Sales"];
            var donutdatas = [36,21, 28];
            var donutcolors = ['#02c58d', '#30419b', "#f0f4f7"];
            this.createDonutGraph("#donut-chart #donut-chart-container", donutlabels , donutdatas, donutcolors);
        },

    //init flotchart
    $.FlotChart = new FlotChart, $.FlotChart.Constructor = FlotChart

}(window.jQuery),

//initializing flotchart
function($) {
    "use strict";
    $.FlotChart.init()
}(window.jQuery);



