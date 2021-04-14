var myChart1 = echarts.init(document.getElementById("option1"), "glbaojie");
var myChart2 = echarts.init(document.getElementById("option2"), "glbaojie");
var myChart3 = echarts.init(document.getElementById("option3"), "glbaojie");
var myChart4 = echarts.init(document.getElementById("option4"), "glbaojie");
var myChart5 = echarts.init(document.getElementById("option5"), "glbaojie");
var myChart6 = echarts.init(document.getElementById("option6"), "glbaojie");

// 左一
var option1 = {
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b}: {c} ({d}%)"
  },
  legend: {
    orient: "vertical",
    right: 0,
    top: "center",
    data: ["出租车", "公交车", "客车", "执法巡查车辆", "货车", "网约车"]
  },
  color: ["#b956e4", "#6055ca", "#275ccc", "#2286d7", "#033678", "#7e6eff"],
  series: [
    {
      name: "访问来源",
      type: "pie",
      radius: ["40%", "60%"],
      center: ["30%", "50%"],
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: false,
          position: "center"
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: "18",
            fontWeight: "bold"
          }
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: [
        { value: 335, name: "出租车" },
        { value: 310, name: "公交车" },
        { value: 234, name: "客车" },
        { value: 135, name: "执法巡查车辆" },
        { value: 135, name: "货车" },
        { value: 1548, name: "网约车" }
      ]
    }
  ]
};
// 左二
var option2 = {
  color: ["#8fe4f4", "#2798b3", "#2393e2", "#c1f4ff", "#08399b", "#2598b2"],
  grid: {
    top: 40,
    left: 28,
    right: 40,
    bottom: 20,
    containLabel: true,
    show: false
  },
  xAxis: [
    {
      name: "时间",
      type: "category",
      boundaryGap: false,
      axisTick: {
        show: false
      },
      splitLine: { show: false },
      splitArea: { show: false }
    }
  ],
  yAxis: [
    {
      name: "排量 g/km",
      type: "value",
      axisTick: {
        show: false
      },
      axisLabel: {
        formatter: function() {
          return "";
        }
      },
      splitLine: { show: false },
      splitArea: { show: false }
    }
  ],
  series: [
    {
      name: "A",
      type: "line",
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: "B",
      type: "line",
      data: [220, 182, 191, 234, 290, 350, 310]
    },
    {
      name: "C",
      type: "line",
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: "D",
      type: "line",
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: "E",
      type: "line",
      data: [260, 187, 329, 274, 410, 358, 378]
    },
    {
      name: "F",
      type: "line",
      data: [172, 232, 166, 355, 348, 199, 340]
    }
  ]
};
// 左三
var option3 = {
  color: ["#d09f11"],
  tooltip: {
    trigger: "axis",
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  grid: {
    top: 40,
    left: 28,
    right: 70,
    bottom: 0,
    containLabel: true
  },
  xAxis: [
    {
      name: "车辆类型",
      type: "category",
      data: ["出租车", "公交车", "客车", "执法巡查车辆", "货车", "网约车"],
      axisTick: {
        alignWithLabel: true
      },
      splitLine: { show: false },
      splitArea: { show: false }
    }
  ],
  yAxis: [
    {
      name: "排放量 g/m³",
      type: "value",
      axisLabel: {
        formatter: function() {
          return "";
        }
      },
      splitLine: { show: false },
      splitArea: { show: false }
    }
  ],
  series: [
    {
      type: "bar",
      barWidth: "60%",
      data: [310, 252, 200, 334, 390, 330]
    }
  ]
};
// 右一
var option4 = {
  tooltip: {},
  // legend: {
  //   orient: "vertical",
  //   left: 0,
  //   top: "center",
  //   data: ["公路工地", "公路料场", "港口工地", "港口堆场"]
  // },
  color: ["#906ffd", "#65d6f5", "#f9b455", "#7dda70", "#033678", "#7e6eff"],
  radar: {
    // shape: 'circle',
    name: {
          textStyle: {
              color: '#fff'
        }
    },
    splitLine: {
      lineStyle: {
        color: [
          "rgba(255, 255, 255, 0.1)",
          "rgba(255, 255, 255, 0.2)",
          "rgba(255, 255, 255, 0.4)",
          "rgba(255, 255, 255, 0.6)",
          "rgba(255, 255, 255, 0.8)",
          "rgba(255, 255, 255, 1)"
        ].reverse()
      }
    },
    splitArea: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: "rgba(255, 255, 255, 0.5)"
      }
    },
    center: ["70%", "50%"],
    radius: 60,
    indicator: [
      { name: "施工工地", max: 100 },
      { name: "物料堆放", max: 100 },
      { name: "施工现场地面", max: 100 },
      { name: "渣土车辆", max: 100 },
      { name: "拆迁工地", max: 100 },
      { name: "出入车辆", max: 100 }
    ]
  },
  series: [
    {
      name: "扬尘防控",
      type: "radar",
      areaStyle: { normal: {} },
      data: [
        {
          value: [20, 54, 80, 80, 60, 40],
          name: "公路工地"
        },
        {
          value: [38, 60, 20, 40, 60, 40],
          name: "公路料场"
        },
        {
          value: [60, 100, 20, 60, 100, 60],
          name: "港口工地"
        },
        {
          value: [60, 32, 58, 56, 40, 60],
          name: "港口堆场"
        }
      ]
    }
  ]
};
// 右二柱状图
var option5 = {
  tooltip: {
      trigger: 'axis',
      axisPointer: {
          type: 'shadow'
      }
  },
  color:['#c99f0d', '#56a5e8'],
  legend: {
      orient: 'vertical',
      right: 10,
      bottom: '28%',
      data: ['洒水车次', '清扫车次']
  },
  grid: {
      left: '5%',
      right: '35%',
      bottom: '10%',
      containLabel: true
  },
  xAxis: {
      name:'区域/保洁人数',
      type: 'category',
      // boundaryGap: false,
      axisTick: {
        show: false
      },
      splitLine: { show: false },
      splitArea: { show: false },
      data: ['芝罘区 20人','莱山区 30人','牟平区 35人','开发区 40人','福山区 45人'].map(function (str) {
        return str.replace(' ', '\n')
    })
  },
  yAxis: {
      name:'次数/次',
      type: 'value',
      axisLabel: {
      formatter: function() {
        return "";
      }
    },
      splitLine: { show: false },
      splitArea: { show: false }
  },
  series: [
      {
          name: '洒水车次',
          type: 'bar',
          barGap: 0,
          data: [5, 8, 6, 7, 3]
      },
      {
          name: '清扫车次',
          type: 'bar',
          data: [10, 14, 12, 10, 5]
      }
  ]
};
// 右二环形图
var option6 = {
  tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
  },
  color: ["#ef893e", "#3ac0a8", "#d1645f", "#51afec", "#fdec78", "#7e6eff"],
  series: [
      {
          name:'工作时长',
          type:'pie',
          radius: ['60%', '80%'],
          center:['50%', '50%'],
          avoidLabelOverlap: false,
          label: {
              normal: {
                  show: false,
                  position: 'center'
              },
              emphasis: {
                  show: false,
              }
          },
          labelLine: {
              normal: {
                  show: false
              }
          },
          data:[
              {value:335, name:'芝罘区'},
              {value:310, name:'莱山区'},
              {value:234, name:'牟平区'},
              {value:135, name:'开发区'},
              {value:1548, name:'福山区'}
          ]
      }
  ]
};

myChart1.setOption(option1);
myChart2.setOption(option2);
myChart3.setOption(option3);
myChart4.setOption(option4);
myChart5.setOption(option5);
myChart6.setOption(option6);

// 中间下部
var myChartb_1 = echarts.init(document.getElementById("optionb_1"), "glbaojie");
var myChartb_2 = echarts.init(document.getElementById("optionb_2"), "glbaojie");
var myChartb_3 = echarts.init(document.getElementById("optionb_3"), "glbaojie");
var myChartb_4 = echarts.init(document.getElementById("optionb_4"), "glbaojie");

var optionb_1 = {
  legend: {},
  tooltip: {},
  color: ["#a59dfd"],
  xAxis: [
    {
      name: "月份",
      type: "category",
      boundaryGap: false,
      axisTick: {
        show: false
      },
      splitLine: { show: false },
      splitArea: { show: false }
    }
  ],
  yAxis: [
    {
      name: "ug/m³",
      type: "value",
      axisTick: {
        show: false
      },
      axisLabel: {
        formatter: function() {
          return "";
        }
      },
      splitLine: { show: false },
      splitArea: { show: false }
    }
  ],
  grid: [
    {
      left: "15%",
      right: "28%",
      top: "60%",
      bottom: "5%",
      containLabel: true
    }
  ],
  dataset: {
    source: [
      ["product", "2012", "2013", "2014", "2015", "2016", "2017"],
      ["Matcha Latte", 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
      ["Milk Tea", 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
      ["Cheese Cocoa", 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
      ["Walnut Brownie", 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
    ]
  },
  series: [
    {
      type: "gauge",
      center: ["50%", "25%"], // 默认全局居中
      min: 0,
      max: 100,
      splitNumber: 4,
      radius: "75%",
      axisLine: {
        // 坐标轴线
        lineStyle: {
          // 属性lineStyle控制线条样式
          color: [[0.1, "#6786bc"], [0.8, "#a7e3ca"], [1, "#d4766c"]],
          width: 7,
          shadowColor: "#fff", //默认透明
          shadowBlur: 2
        }
      },
      axisLabel: {
        // 坐标轴小标记
        show: false
      },
      splitLine: {
        // 分隔线
        length: 1, // 属性length控制线长
        lineStyle: {
          // 属性lineStyle（详见lineStyle）控制线条样式
          width: 1
        }
      },
      pointer: {
        // 分隔线
        width: 4,
        length: "62%"
      },
      title: {
        offsetCenter: [0, "100%"],
        textStyle: {
          // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          fontSize: 12,
          color: "#babee1",
          shadowColor: "#fff", //默认透明
          shadowBlur: 2
        }
      },
      detail: {
        offsetCenter: [0, "50%"], // x, y，单位px
        textStyle: {
          // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          color: "#fff",
          fontSize: 16
        },
        formatter: "{value}ug/m³"
      },
      data: [{ value: 20, name: "PM10" }]
    },
    {
      center: ["12.5%", "75%"],
      data: [120, 132, 101, 194, 134, 330, 110],
      type: "line"
    }
  ]
};
var optionb_2 = {
  legend: {},
  tooltip: {},
  color: ["#89dcf7"],
  xAxis: [
    {
      name: "月份",
      type: "category",
      boundaryGap: false,
      axisTick: {
        show: false
      },
      splitLine: { show: false },
      splitArea: { show: false }
    }
  ],
  yAxis: [
    {
      name: "%",
      type: "value",
      axisTick: {
        show: false
      },
      axisLabel: {
        formatter: function() {
          return "";
        }
      },
      splitLine: { show: false },
      splitArea: { show: false }
    }
  ],
  grid: [
    {
      left: "15%",
      right: "28%",
      top: "60%",
      bottom: "5%",
      containLabel: true
    }
  ],
  dataset: {
    source: [
      ["product", "2012", "2013", "2014", "2015", "2016", "2017"],
      ["Matcha Latte", 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
      ["Milk Tea", 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
      ["Cheese Cocoa", 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
      ["Walnut Brownie", 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
    ]
  },
  series: [
    {
      type: "gauge",
      center: ["50%", "25%"], // 默认全局居中
      min: 0,
      max: 100,
      splitNumber: 4,
      radius: "75%",
      axisLine: {
        // 坐标轴线
        lineStyle: {
          // 属性lineStyle控制线条样式
          color: [[0.1, "#6786bc"], [0.8, "#a7e3ca"], [1, "#d4766c"]],
          width: 7,
          shadowColor: "#fff", //默认透明
          shadowBlur: 2
        }
      },
      axisLabel: {
        // 坐标轴小标记
        show: false
      },
      splitLine: {
        // 分隔线
        length: 1, // 属性length控制线长
        lineStyle: {
          // 属性lineStyle（详见lineStyle）控制线条样式
          width: 1
        }
      },
      pointer: {
        // 分隔线
        width: 4,
        length: "62%"
      },
      title: {
        offsetCenter: [0, "100%"],
        textStyle: {
          // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          fontSize: 12,
          color: "#babee1",
          shadowColor: "#fff", //默认透明
          shadowBlur: 2
        }
      },
      detail: {
        offsetCenter: [0, "50%"], // x, y，单位px
        textStyle: {
          // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          color: "#fff",
          fontSize: 16
        },
        formatter: "{value}%"
      },
      data: [{ value: 32, name: "湿度" }]
    },
    {
      center: ["12.5%", "75%"],
      data: [120, 132, 101, 194, 134, 330, 110],
      type: "line"
    }
  ]
};
var optionb_3 = {
  legend: {},
  tooltip: {},
  color: ["#feea6f"],
  xAxis: [
    {
      name: "月份",
      type: "category",
      boundaryGap: false,
      axisTick: {
        show: false
      },
      splitLine: { show: false },
      splitArea: { show: false }
    }
  ],
  yAxis: [
    {
      name: "℃",
      type: "value",
      axisTick: {
        show: false
      },
      axisLabel: {
        formatter: function() {
          return "";
        }
      },
      splitLine: { show: false },
      splitArea: { show: false }
    }
  ],
  grid: [
    {
      left: "15%",
      right: "28%",
      top: "60%",
      bottom: "5%",
      containLabel: true
    }
  ],
  dataset: {
    source: [
      ["product", "2012", "2013", "2014", "2015", "2016", "2017"],
      ["Matcha Latte", 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
      ["Milk Tea", 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
      ["Cheese Cocoa", 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
      ["Walnut Brownie", 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
    ]
  },
  series: [
    {
      type: "gauge",
      center: ["50%", "25%"], // 默认全局居中
      min: 0,
      max: 100,
      splitNumber: 4,
      radius: "75%",
      axisLine: {
        // 坐标轴线
        lineStyle: {
          // 属性lineStyle控制线条样式
          color: [[0.1, "#6786bc"], [0.8, "#a7e3ca"], [1, "#d4766c"]],
          width: 7,
          shadowColor: "#fff", //默认透明
          shadowBlur: 2
        }
      },
      axisLabel: {
        // 坐标轴小标记
        show: false
      },
      splitLine: {
        // 分隔线
        length: 1, // 属性length控制线长
        lineStyle: {
          // 属性lineStyle（详见lineStyle）控制线条样式
          width: 1
        }
      },
      pointer: {
        // 分隔线
        width: 4,
        length: "62%"
      },
      title: {
        offsetCenter: [0, "100%"],
        textStyle: {
          // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          fontSize: 12,
          color: "#babee1",
          shadowColor: "#fff", //默认透明
          shadowBlur: 2
        }
      },
      detail: {
        offsetCenter: [0, "50%"], // x, y，单位px
        textStyle: {
          // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          color: "#fff",
          fontSize: 16
        },
        formatter: "{value}℃"
      },
      data: [{ value: 37, name: "温度" }]
    },
    {
      center: ["12.5%", "75%"],
      data: [120, 132, 101, 194, 134, 330, 110],
      type: "line"
    }
  ]
};
var optionb_4 = {
  legend: {},
  tooltip: {},
  color: ["#ff9c54"],
  xAxis: [
    {
      name: "月份",
      type: "category",
      boundaryGap: false,
      axisTick: {
        show: false
      },
      splitLine: { show: false },
      splitArea: { show: false }
    }
  ],
  yAxis: [
    {
      name: "dB",
      type: "value",
      axisTick: {
        show: false
      },
      axisLabel: {
        formatter: function() {
          return "";
        }
      },
      splitLine: { show: false },
      splitArea: { show: false }
    }
  ],
  grid: [
    {
      left: "15%",
      right: "28%",
      top: "60%",
      bottom: "5%",
      containLabel: true
    }
  ],
  dataset: {
    source: [
      ["product", "2012", "2013", "2014", "2015", "2016", "2017"],
      ["Matcha Latte", 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
      ["Milk Tea", 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
      ["Cheese Cocoa", 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
      ["Walnut Brownie", 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
    ]
  },
  series: [
    {
      type: "gauge",
      center: ["50%", "25%"], // 默认全局居中
      min: 0,
      max: 100,
      splitNumber: 4,
      radius: "75%",
      axisLine: {
        // 坐标轴线
        lineStyle: {
          // 属性lineStyle控制线条样式
          color: [[0.1, "#6786bc"], [0.8, "#a7e3ca"], [1, "#d4766c"]],
          width: 7,
          shadowColor: "#fff", //默认透明
          shadowBlur: 2
        }
      },
      axisLabel: {
        // 坐标轴小标记
        show: false
      },
      splitLine: {
        // 分隔线
        length: 1, // 属性length控制线长
        lineStyle: {
          // 属性lineStyle（详见lineStyle）控制线条样式
          width: 1
        }
      },
      pointer: {
        // 分隔线
        width: 4,
        length: "62%"
      },
      title: {
        offsetCenter: [0, "100%"],
        textStyle: {
          // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          fontSize: 12,
          color: "#babee1",
          shadowColor: "#fff", //默认透明
          shadowBlur: 2
        }
      },
      detail: {
        offsetCenter: [0, "50%"], // x, y，单位px
        textStyle: {
          // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          color: "#fff",
          fontSize: 16
        },
        formatter: "{value}dB"
      },
      data: [{ value: 60, name: "噪音" }]
    },
    {
      center: ["12.5%", "75%"],
      data: [120, 132, 101, 194, 134, 330, 110],
      type: "line"
    }
  ]
};

myChartb_1.setOption(optionb_1);
myChartb_2.setOption(optionb_2);
myChartb_3.setOption(optionb_3);
myChartb_4.setOption(optionb_4);

// 地图
// 基于准备好的dom，初始化echarts实例
var mapBoxEchart = echarts.init(document.getElementById('option_map'));

// 指定相关的配置项和数据
var mapBoxOption = {
  series: [
    {
      type: "map",
      mapType: "china",
      label: {
        normal: {
          show: true, //显示省份标签
          textStyle: {
            color: "#fff"
          } //省份标签字体颜色
        },
        emphasis: {
          //对应的鼠标悬浮效果
          show: false,
          textStyle: {
            color: "#7dda70"
          }
        }
      },
      aspectScale: 0.75, //这个参数用于 scale 地图的长宽比。最终的 aspect 的计算方式是：geoBoundingRect.width / geoBoundingRect.height * aspectScale
      zoom: 1.2, //当前视角的缩放比例。
      itemStyle: {
        normal: {
          borderWidth: 0.5, //区域边框宽度
          borderColor: "#4864ad", //区域边框颜色
          areaColor: "#4980d2" //区域颜色
        },
        emphasis: {
          //鼠标滑过地图高亮的相关设置
          borderWidth: 0.5,
          borderColor: "#4864ad",
          areaColor: "#3368b7"
        }
      }
    }
  ]
};
// 使用制定的配置项和数据显示图表
mapBoxEchart.setOption(mapBoxOption);
// echart图表自适应
window.addEventListener("resize", function () {
  mapBoxEchart.resize();
});
