/**
 * Created by Administrator on 2017/8/2.
 */

$(function(){

    var options={
        chart:{
            backgroundColor: 'dark',
        },
        legend:{
            align:'right',
            y:40
        },
        title:{
            text:"近6个月过车数据",
            style:{ "color": "white", "fontSize": "18px" }
        },
        xAxis:{
            title:{
                text:null
            },
            categories: [ '3月', '4月', '5月', '6月', '7月', '8月'],
            crosshair:{
                width:2,
                color:'green'
            },
            plotLines: [{
                value: 0,
                width: 1,
            }]
        },
        yAxis:{
            title: {
                text:null
            },
            plotLines: [{
                value: 0,
                width: 1,
            }]
        },
        tooltip:{
            valueSuffix: '万辆'
        },
        series: []
    }
    var chart = new Highcharts.Chart('chart-6monthcar',options)
    $.getJSON("jsonData/chart-6monthcar.json",function(data){//获取Json文件,并创建Json对象
        $.each(data,function(i, field){     //遍历json数组
            chart.addSeries({       //每次添加一个Series
                name:field.name,
                data:field.data
            });
        })
    })
})


