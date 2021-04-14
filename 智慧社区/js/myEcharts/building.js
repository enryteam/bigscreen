//建筑设施 柱形图
var myChart = echarts.init(document.getElementById("road-table"));

//住宅人口类型表 请求
__http({
  apiId: 7,
  url: "http://112.29.135.218:81/api/gateway/visual/building_facility",
  callback: function (result) {
    console.log(result);
    if (result.success) {
      let option = setOption2(result.data);
      myChart.setOption(option);
    }
  }
});

function setOption2(data_option2) {
  let xData = [];
  let yData = [];
  for(let i of data_option2) {
    let [[key, value], [key2, value2]] = Object.entries(i)
    xData.push(value2);
    yData.push(value);
  }
  return {
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c}",
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      show: true,
      backgroundColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: "rgba(1,48,87,0)" // 0% 处的颜色
        },
        {
          offset: 1,
          color: "rgba(1,48,87,0.8)" // 100% 处的颜色
        }
      ]), //背景渐变色
      borderColor: "rgba(0,0,0,0)"
    },
    xAxis: {
      type: "category",
      splitLine: { show: false },
      axisTick: {
        //去掉坐标轴刻度线
        show: false
      },
      data: xData,
      //设置字体倾斜
      axisLabel: {
        interval: 0,
        rotate: 20,
        //倾斜度 -90 至 90 默认为0
        textStyle: {
          color: "#8F90A9",
          fontSize: fontSize(0.24)
        },
        align: "center",
        padding: [fontSize(0.5), fontSize(0), fontSize(0), fontSize(0)]
      }
    },
    yAxis: {
      type: "value",
      splitLine: { show: false },
      axisTick: {
        //去掉坐标轴刻度线
        show: false
      },
      axisLabel: {
        textStyle: {
          color: "#8F90A9",
          fontSize: fontSize(0.3)
        }
      }
    },
    series: [
      {
        data: yData,
        type: "bar",
        barWidth: fontSize(0.4),
        itemStyle: {
          normal: {
            //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#37BFFF" // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#0064CA" // 100% 处的颜色
              }
            ]) //背景渐变色
          }
        }
      }
    ]
  };

}
