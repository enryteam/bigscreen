/**
 * 前端分页
 * @author zz
 * @date 上午2:06 18-08-08
 */
$(function () {

    // 初始化bootstrap-table的内容
    var queryUrl = '../../../json/tableHelpData-2.json';
    $('#tab-2').bootstrapTable({
        method: 'get',                  //请求方式（*）
        url: queryUrl,                  //请求后台的URL（*）
        // height: 500,                 //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        cache: false,                   //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,               //是否显示分页条（*）
        sidePagination: 'clinet',       //分页方式：client客户端分页，server服务端分页（*）
        // queryParams: queryParams,
        responseHandler: function (res) {  // 对返回的数据格式进行处理(因为统一过接口返回格式)
            return res.data;
        },
        pageNumber: 1,                  //初始化加载第一页，默认第一页,并记录
        pageSize: 5,                    //每页的记录行数（*）
        pageList: [5, 10, 20, 30],      //可供选择的每页的行数（*）

        striped: true,                  //是否显示行间隔色
        search: true,                   //是否显示表格搜索
        showRefresh: true,              //是否显示刷新按钮
        showColumns: true,              //是否显示所有的列（选择显示的列）
        clickToSelect: true,            //是否启用点击选中行
        showToggle: true,               //是否显示详细视图和列表视图的切换按钮
        cardView: false,                //是否显示详细视图
        showExport: true,               //是否数据导出按钮
        exportDataType: "all",

        toolbar: '#toolbar',            //指定工作栏
        toolbarAlign: 'right',          //工具栏对齐方式
        buttonsAlign: 'right',          //按钮对齐方式

        columns: [
            {
                checkbox: true,
                width: 25,
                align: 'center',
                valign: 'middle'
            },
            {
                title: 'ID',
                field: 'id',
                visible: true,
                sortable: true
            },
            {
                title: '父级',
                field: 'pid',
                sortable: true
            },
            {
                title: '状态',
                field: 'status',
                sortable: true
            },
            {
                title: '名称',
                field: 'name',
                sortable: true
            },
            {
                title: '权限',
                field: 'permissionValue',
                sortable: true
            }
        ],
        locale: 'zh-CN',//中文支持,
    })

    function operateFormatter(value, row, index) {
        if (value == 2) {
            return '<i class="fa fa-lock" style="color:red"></i>'
        } else if (value == 1) {
            return '<i class="fa fa-unlock" style="color:green"></i>'
        } else {
            return '数据错误'
        }
    }

    // 前端分页，提交到服务器端的参数
    // function queryParams(params) {
    //     return {
    //         // Name: $('#search_name').val(),
    //         // Tel: $('#search_tel').val()
    //     }
    // }
})
