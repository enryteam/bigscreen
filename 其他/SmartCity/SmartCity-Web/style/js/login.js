$(function () {
    var icon = "<i class='fa fa-times-circle'></i> ";
    $("#signupForm").validate({
        rules: {
            username: {
                required: true
            },
            password: {
                required: true
            },
            validateCode: {
                required: true
            }
        },
        messages: {
            username: {
                required: icon + "请输入您的用户名",
            },
            password: {
                required: icon + "请输入您的密码",
            },
            validateCode: {
                required: icon + "请输入您的验证码",
            }
        }, submitHandler: function () {
            var username = $("input[name='username']").val().trim();
            var password = $("input[name='password']").val().trim();
            var validateCode = $("input[name='validateCode']").val();
            var rememberMe = $("input[name='rememberme']").is(':checked');
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/SmartCity-Service/manage/submitLogin",
                data: {
                    "username": username,
                    "password": password,
                    "validateCode": validateCode,
                    "rememberMe": rememberMe
                },
                success: function (r) {
                    if (r.code == 0) {
                        location.href = 'http://localhost:8080/SmartCity-Web/views/manage/index.html';
                    } else {
                        $('#validateCode-img').click();
                    }
                }
            });
        }
    })
});
