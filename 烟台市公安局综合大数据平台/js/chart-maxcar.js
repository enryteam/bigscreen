/**
 * Created by Administrator on 2017/8/2.
 */

$(function(){
    var options={
        chart:{
            backgroundColor: 'dark',
            type:'column'
        },
        legend:{
            align:'right',
            y:40
        },
        title:{
            text:"卡口过车量",
            style:{ "color": "white", "fontSize": "18px" }
        },
        xAxis: {
            categories: [
                '卡口1',
                '卡口2',
                '卡口3',
                '卡口4',
                '卡口5',
                '卡口6',
            ],
            crosshair: true
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
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} 辆</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        series: []
    }
    var chart = new Highcharts.Chart('chart-maxcar',options)
    $.getJSON("jsonData/chart-maxcar.json",function(data){//获取Json文件,并创建Json对象
        $.each(data,function(i, field){     //遍历json数组
            chart.addSeries({       //每次添加一个Series
                type:field.type,
                name:field.name,
                data:field.data
            });
        })
    })
})


