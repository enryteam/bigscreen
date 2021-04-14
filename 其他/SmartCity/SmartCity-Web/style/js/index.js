window.onload = function () {
    getMemus();

};

function getMemus() {
    $.ajax({
        withCredentials: true,
        async: "false",
        type: "GET",
        url: 'http://localhost:8080/SmartCity-Service/manage/menu',
        dataType: 'json',
        success: function (data) {
            var data = data.data;
            var contentDiv = document.getElementById("side-menu");

            for (var i = 0; i < data.length; i++) {
                var parentDiv = $('<li></li>');
                parentDiv.appendTo(contentDiv);
                var parentDiv_1 = $('<a></a>');
                parentDiv_1.addClass('tr-row1');

                if (data[i].children.length == 0) {
                    parentDiv_1.attr('href', data[i].url);
                    parentDiv_1.attr('target', 'J_iframe');
                } else {
                    parentDiv_1.attr('href', "#");
                }

                var parentDiv_1_1 = $('<i></i>');
                parentDiv_1_1.addClass(data[i].icon);
                var parentDiv_1_2 = $('<span></span>');
                parentDiv_1_2.addClass('nav-label');
                parentDiv_1_2.text(data[i].name);
                parentDiv_1_1.appendTo(parentDiv_1);
                parentDiv_1_2.appendTo(parentDiv_1);
                parentDiv_1.appendTo(parentDiv);


                if (data[i].children.length != 0) {

                    var parentDiv_1_2_1 = $('<span></span>');
                    parentDiv_1_2_1.addClass('fa arrow');
                    parentDiv_1_2_1.appendTo(parentDiv_1_2);

                    for (var j = 0; j < data[i].children.length; j++) {
                        var childDiv_1 = $('<ul></ul>');
                        childDiv_1.addClass('nav nav-second-level collapse');
                        childDiv_1.appendTo(parentDiv);
                        var childDiv_1_1 = $('<li></li>');
                        childDiv_1_1.appendTo(childDiv_1);
                        var childDiv_1_1_1 = $('<a></a>');
                        childDiv_1_1_1.addClass('J_menuItem');
                        childDiv_1_1_1.attr('href', data[i].children[j].url);
                        childDiv_1_1_1.text(data[i].children[j].name);
                        childDiv_1_1_1.attr('target', 'J_iframe');
                        childDiv_1_1_1.appendTo(childDiv_1_1);
                    }
                }
            }
            $(".nav li").click(function () {
                if ($(this).hasClass("active")) {
                    $(this).find("ul").removeClass("collapse in");
                    $(this).find("ul").addClass("collapse");
                    $(this).removeClass("active");
                }
                else {
                    $(this).addClass("active");
                    $(this).find("ul").removeClass("collapse");
                    $(this).find("ul").addClass("collapse in");
                }
            });
        }
    });
}

function logout() {
    swal({
        title: "",
        text: "是否确认退出登录？",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#27c24c",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: true
    }, function () {
        location.href = 'manage/logout';
    });
}

function showDailog(tp) {
    if (tp == "userInfo") {
        $("#modelDiv .modal-title").html("用户信息");
        $("#modelDiv .modal-body").html(
            "<dl class=\"dl-horizontal\"><dt>登录账号：</dt><dd>"
            + "${activeUser.usercode}" + "</dd><dt>固定电话：</dt><dd>"
            + "0557-88481066" + "</dd><dt>移动电话：</dt><dd>"
            + "13738880888" + "</dd><dt>电子邮箱：</dt><dd>"
            + "88481066@163.com" + "</dd><dt>登录次数：</dt><dd>"
            + "127次" + "</dd><dt>上次登录时间：</dt><dd>" + "2017-11-09"
            + "</dd></div>");
        $("#savepsdbtn").hide();
        $("#modelDiv").modal("show");

    } else if (tp == "changPwd") {
        $("#modelDiv .modal-title").html("修改密码");
        $("#modelDiv .modal-body")
            .html(
                "<div class=\"form-group\"><label class=\"col-sm-4 control-label\" for=\"password1\">原密码：</label><input id=\"password1\" name=\"password1\" class=\"form-control\" type=\"password\" required=\"true\" minlength=\"6\"></div><div class=\"form-group\"><label class=\"col-sm-4 control-label\" for=\"password2\">新密码：</label><input id=\"password2\" name=\"password2\" class=\"form-control\" type=\"password\" required=\"true\" minlength=\"6\"></div><div class=\"form-group\"><label class=\"col-sm-4 control-label\" for=\"password3\">重复密码：</label><input id=\"password3\" name=\"password3\" class=\"form-control\" type=\"password\" required=\"true\" minlength=\"6\"  equalTo=\"#password2\"></div>");
        $("#savepsdbtn").show();
        $("#modelDiv").modal("show");
    }
}

$(function () {
    $("#form1").validate({
        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                data: $(form).serialize(),
                url: '',
                dataType: 'json',
                success: function (ret) {
                    if (ret.flag == "n") {
                        msginfo(ret.msg, "error");
                    } else {
                        $('#modelDiv').modal('hide');
                        msginfo("密码修改成功", "success");
                    }
                }
            });
        }
    });
});