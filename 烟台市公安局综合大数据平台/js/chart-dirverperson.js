
$(function(){
    var chart=null;
    var options={
        chart:{
            backgroundColor: 'dark',
        },
        title:{
            text:"人员统计(是否驾驶员)",
            style:{ "color": "white", "fontSize": "18px" }
        },
        legend:{
            style:{ "color": "white", "fontSize": "14px" },
            align:'right',
            y:-50,
            layout: 'vertical',
            itemStyle: {
                color: 'white',
            }
        },
        tooltip: {
            headerFormat: '{series.name}<br>',
            pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series:  []
    }
    chart = new Highcharts.Chart('chart-dirverperson',options)
    $.getJSON("jsonData/chart-dirverperson.json",function(data1){//获取Json文件,并创建Json对象
        $.each(data1,function(i, field1){     //遍历json数组
            chart.addSeries({
                type:field1.type,
                name:field1.name,
                data:field1.data
            });
        })
    })
})

