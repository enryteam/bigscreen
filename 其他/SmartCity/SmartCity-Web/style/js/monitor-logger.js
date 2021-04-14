$(function () {
    // 初始化bootstrap-table的内容
    var queryUrl = 'http://localhost:8080/SmartCity-Service/monitor/getLogByPage';
    $('#mytab').bootstrapTable({
        method: 'get',                  //请求方式（*）
        url: queryUrl,                  //请求后台的URL（*）
        // height: 650,                 //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        cache: false,                   //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,               //是否显示分页条（*）
        sidePagination: 'server',       //分页方式：client客户端分页，server服务端分页（*）
        queryParams: queryParams,
        responseHandler: function (res) {  // 对返回的数据格式进行处理(因为统一过接口返回格式)
            return res.data;
        },
        pageNumber: 1,                  //默认第一页
        pageSize: 15,                   //默认分页大小（*）
        pageList: [10, 15, 20, 30],      //可供选择的每页的行数（*）

        striped: true,                  //是否显示行间隔色
        search: false,                  //是否显示表格搜索
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
                title: '日志标题',
                field: 'title',
                sortable: true
            },
            {
                title: '级别',
                field: 'level',
                sortable: true
            },
            {
                title: '操作用户',
                field: 'userName',
                sortable: true
            },
            {
                title: '操作时间',
                field: 'operTime',
                sortable: true,
                formatter: timestampFormatter   // 数据转义函数
            },
            {
                title: '请求IP',
                field: 'reqIp',
                sortable: true
            },
            {
                title: 'URI',
                field: 'reqUri',
            },
            {
                title: '请求方法',
                field: 'method'
            },
            {
                title: '请求参数',
                field: 'operEvent'
            },
            {
                title: '状态',
                field: 'operStatus',
                align: 'center',
                formatter: operStatusFormatter
            },
            {
                title: '锁定',
                field: 'operStatus',
                align: 'center',
                formatter: lockFormatter
            }
        ],
        locale: 'zh-CN',//中文支持,
    })
    /*
     * 用户管理首页事件
     */
    //请求后台数据获取角色列表
    // var roleArr = [];
    // $.get('http://localhost:8080/SmartCity-Service/monitor/monitor-logger', function (data) {
    //     if (data.suc && data.res) {
    //         for (var i = 0; i < data.res.length; i++) {
    //             var obj = new Object();
    //             obj.ID = data.res[i].ID;
    //             obj.Name = data.res[i].Name;
    //             roleArr[i] = obj;
    //         }
    //         //生成增加与修改页面的角色复选框
    //         var _roleHtml = '';
    //         for (var i = 0; i < roleArr.length; i++) {
    //             _roleHtml += '<label><input type="checkbox" name="RoleID[]"   value="' + roleArr[i].ID + '"/> ' + roleArr[i].Name + ' </label>';
    //         }
    //         $('.role').html(_roleHtml);
    //         $('.role input').eq(0).attr('checked', 'true');
    //         //请求成功后生成增加用户页面表单内容
    //         $('#addForm').bootstrapValidator({
    //             feedbackIcons: {
    //                 valid: 'glyphicon glyphicon-ok',
    //                 invalid: 'glyphicon glyphicon-remove',
    //                 validating: 'glyphicon glyphicon-refresh'
    //             },
    //             fields: {
    //                 LoginName: {
    //                     validators: {
    //                         notEmpty: {
    //                             message: '登录名不能为空'
    //                         },
    //                         stringLength: {
    //                             min: 5,
    //                             max: 15,
    //                             message: '姓名为5-10位'
    //                         }
    //                     }
    //                 },
    //                 Name: {
    //                     validators: {
    //                         notEmpty: {
    //                             message: '姓名不能为空'
    //                         },
    //                         stringLength: {
    //                             min: 2,
    //                             max: 10,
    //                             message: '姓名为2-10位'
    //                         }
    //                     }
    //                 },
    //                 'RoleID[]': {
    //                     validators: {
    //                         notEmpty: {
    //                             message: '角色至少选择一种'
    //                         }
    //                     }
    //                 },
    //                 Pwd: {
    //                     validators: {
    //                         notEmpty: {
    //                             message: '密码不能为空'
    //                         },
    //                         stringLength: {
    //                             min: 6,
    //                             max: 128,
    //                             message: '密码为6-128位'
    //                         }
    //                     }
    //
    //                 },
    //                 Tel: {
    //                     validators: {
    //                         notEmpty: {
    //                             message: '手机号不能为空'
    //                         },
    //                         stringLength: {
    //                             min: 11,
    //                             max: 11,
    //                             message: '手机号必须为11位'
    //                         },
    //                         regexp: {
    //                             regexp: /^1(3|4|5|7|8)\d{9}$/,
    //                             message: '请填写正确的手机号'
    //                         }
    //                     }
    //                 },
    //                 Email: {
    //                     validators: {
    //                         notEmpty: {
    //                             message: '邮箱不能为空'
    //                         },
    //                         regexp: {
    //                             regexp: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
    //                             message: '无效的邮箱'
    //                         }
    //                     }
    //                 },
    //                 Attribute: {
    //                     validators: {
    //                         notEmpty: {
    //                             message: '状态不能为空'
    //                         }
    //                     }
    //                 }
    //             }
    //         });
    //         $('#editForm').bootstrapValidator({
    //             feedbackIcons: {
    //                 valid: 'glyphicon glyphicon-ok',
    //                 invalid: 'glyphicon glyphicon-remove',
    //                 validating: 'glyphicon glyphicon-refresh'
    //             },
    //             fields: {
    //                 ID: {
    //                     validators: {
    //                         notEmpty: {
    //                             message: 'ID不能为空'
    //                         }
    //                     }
    //                 },
    //                 LoginName: {
    //                     validators: {
    //                         notEmpty: {
    //                             message: '登录名不能为空'
    //                         }/*,
    //                        stringLength:{
    //                			min:5,
    //                			max:15,
    //                			message:'登录名为5-10位'
    //                		}*/
    //                     }
    //                 },
    //                 Name: {
    //                     validators: {
    //                         notEmpty: {
    //                             message: '姓名不能为空'
    //                         },
    //                         stringLength: {
    //                             min: 2,
    //                             max: 10,
    //                             message: '姓名为2-10位'
    //                         }
    //                     }
    //                 },
    //                 'RoleID[]': {
    //                     validators: {
    //                         notEmpty: {
    //                             message: '角色至少选择一种'
    //                         }
    //                     }
    //                 },
    //                 Tel: {
    //                     validators: {
    //                         notEmpty: {
    //                             message: '手机号不能为空'
    //                         },
    //                         stringLength: {
    //                             min: 11,
    //                             max: 11,
    //                             message: '手机号必须为11位'
    //                         },
    //                         regexp: {
    //                             regexp: /^1(3|4|5|7|8)\d{9}$/,
    //                             message: '请填写正确的手机号'
    //                         }
    //                     }
    //                 },
    //                 Email: {
    //                     validators: {
    //                         notEmpty: {
    //                             message: '邮箱不能为空'
    //                         },
    //                         regexp: {
    //                             regexp: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
    //                             message: '无效的邮箱'
    //                         }
    //                     }
    //                 },
    //                 Attribute: {
    //                     validators: {
    //                         notEmpty: {
    //                             message: '状态不能为空'
    //                         }
    //                     }
    //                 }
    //             }
    //         });
    //     } else {
    //         console.log('后台角色列表获取失败！');
    //     }
    // });

    // 提交到服务器端的参数，前端动态赋值
    function queryParams(params) {
        return {
            limit: params.limit,                             //分页大小
            offset: params.offset,                           //sql查询索引，offset=(pageIndex-1)*limit
            // Name: $('#search_name').val(),
            // Tel: $('#search_tel').val()
        }
    }


    // 数据转义函数 - 操作状态格式化
    function operStatusFormatter(value) {
        if (value == 1) {
            return '操作成功'
        } else if (value == 2) {
            return '操作失败'
        } else {
            return '数据错误'
        }
    }

    // 锁定状态格式化
    function lockFormatter(value) {
        if (value == 2) {
            return '<i class="fa fa-lock" style="color:red"></i>'
        } else if (value == 1) {
            return '<i class="fa fa-unlock" style="color:green"></i>'
        } else {
            return '数据错误'
        }
    }

    // 时间戳转 YYYY-MM-dd HH:mm:ss格式化
    function timestampFormatter(unixtimestamp) {

        var unixtimestamp = new Date(unixtimestamp);
        var year = 1900 + unixtimestamp.getYear();
        var month = "0" + (unixtimestamp.getMonth() + 1);
        var date = "0" + unixtimestamp.getDate();
        var hour = "0" + unixtimestamp.getHours();
        var minute = "0" + unixtimestamp.getMinutes();
        var second = "0" + unixtimestamp.getSeconds();
        return year + "-" + month.substring(month.length - 2, month.length) + "-" + date.substring(date.length - 2, date.length)
            + " " + hour.substring(hour.length - 2, hour.length) + ":"
            + minute.substring(minute.length - 2, minute.length) + ":"
            + second.substring(second.length - 2, second.length);
    }


    //查询按钮事件
    $('#search_btn').click(function () {
        $('#mytab').bootstrapTable('refresh', {url: '../index.php/admin/index/userManagement'});
    })


    //删除按钮与修改按钮的出现与消失
    $('.bootstrap-table').change(function () {
        var dataArr = $('#mytab .selected');
        // if (dataArr.length == 1) {
        //     $('#btn_edit').css('display', 'block').removeClass('fadeOutRight').addClass('animated fadeInRight');
        // } else {
        //     $('#btn_edit').addClass('fadeOutRight');
        //     setTimeout(function () {
        //         $('#btn_edit').css('display', 'none');
        //     }, 400);
        // }
        if (dataArr.length >= 1) {
            $('#btn_delete').css('display', 'block').removeClass('fadeOutRight').addClass('animated fadeInRight');
        } else {
            $('#btn_delete').addClass('fadeOutRight');
            setTimeout(function () {
                $('#btn_delete').css('display', 'none');
            }, 400);
        }
    });


    //删除事件按钮
    $('#btn_delete').click(function () {
        debugger
        var dataArr = $('#mytab').bootstrapTable('getSelections');
        $('.popup_de .show_msg').text('确定要删除该用户吗?');
        $('.popup_de').addClass('bbox');
        $('.popup_de .btn_submit').one('click', function () {
            var ID = [];
            for (var i = 0; i < dataArr.length; i++) {
                ID[i] = dataArr[i].ID;
            }
            $.post("http://localhost:8080/SmartCity-Service/monitor/deleteLogById",
                {ID: ID},
                function (data) {
                    if (data.suc == true) {
                        $('.popup_de .show_msg').text('删除成功！');
                        $('.popup_de .btn_cancel').css('display', 'none');
                        $('.popup_de').addClass('bbox');
                        $('.popup_de .btn_submit').one('click', function () {
                            $('.popup_de').removeClass('bbox');
                        })
                        window.location.reload();
                        // $('#mytab').bootstrapTable('refresh', {url: '../index.php/admin/index/userManagement'});
                    }
                });
        })
    })

    //清空日志按钮事件
    $('#btn_deleteAll').click(function () {
        var a = confirm("是否确认清空日志");
        if (a == true) {
            $.ajax({
                type: "get",
                url: "http://localhost:8080/SmartCity-Service/monitor/deleteLogAll",
                async: true,
                success: function () {
                    window.location.reload();
                }
            });
        }
    })
})

/***************************************************以上为分页功能********************************************************************/



function deleteLogById(id) {
    var a = confirm("是否确认删除");
    if (a == true) {
        $.ajax({
            type: "post",
            url: "http://localhost:8080/SmartCity-Service/monitor/deleteLogById",
            async: true,
            data: {
                id: id
            },
            success: function () {
                window.location.reload();
            }
        });
    }
    ;
}


/************************************************以下功能暂不需要************************************************/

//修改按钮事件
$('#btn_edit').click(function () {
    var dataArr = $('#mytab').bootstrapTable('getSelections');
    $('.tableBody').addClass('animated slideOutLeft');
    setTimeout(function () {
        $('.tableBody').removeClass('animated slideOutLeft').css('display', 'none');
    }, 500)
    $('.changeBody').css('display', 'block');
    $('.changeBody').addClass('animated slideInRight');
    $('#edit_ID').val(dataArr[0].ID);
    $('#edit_LoginName').val(dataArr[0].LoginName);
    $('#edit_Name').val(dataArr[0].Name);
    $('#edit_Tel').val(dataArr[0].Tel);
    $('#edit_Email').val(dataArr[0].Email);
    if (dataArr[0].Attribute == 1) {
        $("#editForm input[name=Attribute]:eq(0)").prop("checked", true);
        $("#editForm input[name=Attribute]:eq(1)").prop("checked", false);
    }
    else if (dataArr[0].Attribute == 2) {
        $("#editForm input[name=Attribute]:eq(1)").prop("checked", true);
        $("#editForm input[name=Attribute]:eq(0)").prop("checked", false);
    }
    //先清空角色复选框
    $('#editForm .edit input').prop('checked', false);
    //获取用户角色
    $.post('../index.php/admin/Index/getUserById',
        {ID: dataArr[0].ID},
        function (data) {
            var roleIDArr = data.res.user.RoleID;
            //将对应用户的角色列表显示到对应的修改页
            for (var i = 0; i < roleIDArr.length; i++) {
                for (var j = 0; j < $('#editForm .edit input').length; j++) {
                    if (roleIDArr[i] == $('#editForm .edit input:eq(' + j + ')').val()) {
                        $('#editForm .edit input:eq(' + j + ')').prop('checked', true);
                    }
                }
            }
        }
    );
})
/*
 * 用户管理增加用户页面所有事件
*/
//增加页面表单验证
// Validate the form manually
$('#add_saveBtn').click(function () {
    //点击保存时触发表单验证
    $('#addForm').bootstrapValidator('validate');
    //如果表单验证正确，则请求后台添加用户
    if ($("#addForm").data('bootstrapValidator').isValid()) {
        var _info = $('#addForm').serialize();
        $.post(
            "../index.php/admin/index/insertUser",
            $('#addForm').serialize(),
            function (data) {
                //后台返回添加成功
                if (data.suc == true) {
                    $('.addBody').addClass('animated slideOutLeft');
                    setTimeout(function () {
                        $('.addBody').removeClass('animated slideOutLeft').css('display', 'none');
                    }, 500);
                    $('.tableBody').css('display', 'block').addClass('animated slideInRight');
                    $('#mytab').bootstrapTable('refresh', {url: '../index.php/admin/index/userManagement'});
                    $('#addForm').data('bootstrapValidator').resetForm(true);
                    //隐藏修改与删除按钮
                    $('#btn_delete').css('display', 'none');
                    $('#btn_edit').css('display', 'none');
                }
                //否则
                else {
                }
            }
        )
    }
});

//增加页面返回按钮事件
$('#add_backBtn').click(function () {
    $('.addBody').addClass('animated slideOutLeft');
    setTimeout(function () {
        $('.addBody').removeClass('animated slideOutLeft').css('display', 'none');
    }, 500)
    $('.tableBody').css('display', 'block').addClass('animated slideInRight');
    $('#addForm').data('bootstrapValidator').resetForm(true);
});

/*
 * 用户管理修改用户页面所有事件
*/
//修改页面回退按钮事件
$('#edit_backBtn').click(function () {
    $('.changeBody').addClass('animated slideOutLeft');
    setTimeout(function () {
        $('.changeBody').removeClass('animated slideOutLeft').css('display', 'none');
    }, 500)
    $('.tableBody').css('display', 'block').addClass('animated slideInRight');
    $('#editForm').data('bootstrapValidator').resetForm(true);
})

//修改页面保存按钮事件
$('#edit_saveBtn').click(function () {
    $('#editForm').bootstrapValidator('validate');
    if ($("#editForm").data('bootstrapValidator').isValid()) {
        $.post("../index.php/admin/index/updateUserById",
            $('#editForm').serialize(),
            function (data) {
                if (data.suc == true) {
                    //隐藏修改与删除按钮
                    $('#btn_delete').css('display', 'none');
                    $('#btn_edit').css('display', 'none');
                    //回退到人员管理主页
                    $('.changeBody').addClass('animated slideOutLeft');
                    setTimeout(function () {
                        $('.changeBody').removeClass('animated slideOutLeft').css('display', 'none');
                    }, 500)
                    $('.tableBody').css('display', 'block').addClass('animated slideInRight');
                    //刷新人员管理主页
                    $('#mytab').bootstrapTable('refresh', {url: '../index.php/admin/index/userManagement'});
                    //修改页面表单重置
                    $('#editForm').data('bootstrapValidator').resetForm(true);
                } else {
                }
            }
        )
    }
})

//弹出框取消按钮事件
$('.popup_de .btn_cancel').click(function () {
    $('.popup_de').removeClass('bbox');
})
//弹出框关闭按钮事件
$('.popup_de .popup_close').click(function () {
    $('.popup_de').removeClass('bbox');
})



