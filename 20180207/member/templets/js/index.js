$('#loginbox .box-header >div ').click(function (e) {
    var $cur = $(this);
    var idx = $cur.index();
    $cur.siblings().removeClass('active');
    $cur.addClass('active');
    $cur.parents('#loginbox').find('form').removeClass('show');
    $cur.parents('#loginbox').find('form').eq(idx).addClass('show');
})

$('#loginbox .button2').click(function () {
    /* 发送验证码 */
})
// 未认购用户
$('#wrg .button3').click(function () {
    var username = $('#wrg #user-name').val();
    var password = $("#wrg #user-password").val();
    var code = $("#code").val();
    if (username != "" && password != "") {
        $.ajax({
            type: "POST",
            url: "php/userLogin.php",
            dataType: "JSON",
            data: {
                "user_name": username,
                "password": password,
                /* "code": code */
            },
            success: function (data) {
                switch (data) {
                    case 1://普通用户  
                        $.cookie("user", username);
                        $.cookie("limit", 0);
                        window.location.href = "index.php";
                        break;
                    case 2://管理员用户  
                        $.cookie("user", username);
                        $.cookie("limit", 1);
                        window.location.href = "index.php";
                        break;
                    case 3://密码错误  
                        alert("密码错误！");
                        break;
                    case 4://用户不存在  
                        alert("该用户不存在！");
                        break;
                    case 0://验证码错误  
                        alert("验证码不正确！");
                        break;
                }

            }
        })
    } else {
        alert("请检查您的输入！");
    }
})
//已认购用户
$('#yrg .button3').click(function () {
    var userid = $('#yrg #user-id').val();
    var password = $("#yrg #user-password").val();
    var code = $("#code").val();
    if (userid != "" && password != "") {
        $.ajax({
            type: "POST",
            url: "php/userLogin.php",
            dataType: "JSON",
            data: {
                "user_name": userid,
                "password": password,
                /* "code": code */
            },
            success: function (data) {
                switch (data) {
                    case 1://普通用户  
                        $.cookie("user", userid);
                        $.cookie("limit", 0);
                        window.location.href = "index.php";
                        break;
                    case 2://管理员用户  
                        $.cookie("user", userid);
                        $.cookie("limit", 1);
                        window.location.href = "index.php";
                        break;
                    case 3://密码错误  
                        alert("密码错误！");
                        break;
                    case 4://用户不存在  
                        alert("该用户不存在！");
                        break;
                    case 0://验证码错误  
                        alert("验证码不正确！");
                        break;
                }

            }
        })
    } else {
        alert("请检查您的输入！");
    }
})


