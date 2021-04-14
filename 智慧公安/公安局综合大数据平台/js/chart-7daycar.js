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
            text:"近七日过车数据",
            style:{ "color": "white", "fontSize": "18px" }
        },
        xAxis:{
            title:{
                text:null
            },
            categories: [ '27日', '28日','29日', '30日','31日','1日', '2日'],
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
            valueSuffix: '辆'
        },
        series: []
    }
    var chart = new Highcharts.Chart('chart-7daycar',options)
    $.getJSON("jsonData/chart-7daycar.json",function(data){//获取Json文件,并创建Json对象
        $.each(data,function(i, field){     //遍历json数组
            chart.addSeries({       //每次添加一个Series
                name:field.name,
                data:field.data
            });
        })
    })
})


