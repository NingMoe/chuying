
check1()
check2()
toogle();
clearAllCookie()
var a, b, c, d, e = 0;

function clearAllCookie() {
    //console.log("清除")
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
}





function check2() {
    let $password2 = $("#password2")
    let $id = $("#user-id")
    //身份证验证
    $id.blur(function () {
        var id = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        if (!id.test($id.val())) {
            $(".idc").text("输入18位身份证号");
            c = 0
        } else {
            $(".idc").text("");
            c = 1;
        }

    })
    //密码二验证
    $password2.blur(function () {
        var password = /^[0-9A-Za-z]{6,12}$/;
        if (!password.test($password2.val())) {
            $(".passwordc2").text("密码不符合规范");
            d = 0
        } else {
            $(".passwordc2").text("");
            d = 1;
            if (c == 1 && d == 1) {
                send2();

            }
        }

    })

}

function check1() {
    let $telnumb = $("#telnumb")
    let $password = $("#user-password")

    //手机号验证及提示
    $telnumb.blur(function () {
        var telnumb = /^1[34578]\d{9}$/;
        if (!telnumb.test($telnumb.val())) {
            $(".telnumbc").text("输入11位手机号");
            a = 0
        } else {
            $(".telnumbc").text("");
            a = 1;
        }

    })

    //密码验证
    $password.blur(function () {
        var password = /^[0-9A-Za-z]{6,12}$/;
        if (!password.test($password.val())) {
            $(".passwordc").text("密码不符合规范");
            b = 0;
        } else {
            $(".passwordc").text("");
            b = 1;
            if (a == 1 && b == 1) {
                wrg();
            }
        }
    })


    function send1() {
        var vcode;
        let ordertime = 60   //设置再次发送验证码等待时间
        let timeleft = ordertime
        $(".button2").removeClass("disabled")
        $(".button2").addClass("abled")
        function timeCount() {
            timeleft -= 1
            if (timeleft > 0) {
                $(".button2").text(timeleft + " 秒后重发");
                setTimeout(timeCount, 1000)
            }
            else {
                //重置等待时间
                //60s之后自动变回可点击状态
                timeleft = ordertime
                $(".button2").text("重新发送");
                $(".button2").removeClass("disabled")
                $(".button2").addClass("abled")
                $(".button2").removeAttr("disabled");
            }

        }
        //点击发送ajax button2 变成不可点击状态  

        $(".abled").click(function () {
            $(".button2").removeClass("abled")
            $(".button2").addClass("disabled")
            $(this).attr("disabled", true);
            timeCount(this);
            let sjh = $("#telnumb").val();
            var num = "";
            for (let i = 0; i < 6; i++) {
                num += Math.floor(Math.random() * 10)
            }
            //ajax
            vcode = num
            //console.log(vcode)
            var pp = sjh + "," + vcode;
            $.ajax({
                type: "POST",
                url: "yc_php/sms_send.php",
                timeout: 8000,
                data: 'data' + pp,
                success: function (data) {
                    //console.log(data)
                }

            })


        })
        //bulr事件 验证返回或者输入 

        $("#vdcode").blur(function () {
            //console.log($("#vdcode").val())
            if ($("#vdcode").val() != vcode) {
                $(".vcodec").text("请输入正确的验证码");
            } else {
                $(".vcodec").text("");

                wrg()

            }

        })
    }
}


function send2() {
    var vcode;
    let ordertime = 60   //设置再次发送验证码等待时间
    let timeleft = ordertime
    $(".button4").removeClass("disabled")
    $(".button4").addClass("abled")
    function timeCount() {
        timeleft -= 1
        if (timeleft > 0) {
            $(".button4").text(timeleft + " 秒后重发");
            setTimeout(timeCount, 1000)
        }
        else {
            //重置等待时间
            //60s之后自动变回可点击状态
            timeleft = ordertime
            $(".button4").text("重新发送");
            $(".button4").removeClass("disabled")
            $(".button4").addClass("abled")
            $(".button4").removeAttr("disabled");
        }



    }

    //点击发送ajax button2 变成不可点击状态  
    $(".abled").click(function () {
        $(".button4").removeClass("abled")
        $(".button4").addClass("disabled")
        $(this).attr("disabled", true);
        timeCount(this);
        let sfz = $("#user-id").val();
        let ff = sfz;
        $.ajax({//发一个ajax来获取对应身份证的手机号
            type: "POST",
            url: "yc_php/get_sjh.php",
            timeout: 8000,
            data: 'data' + ff,
            success: function (data) {
                let sjh = JSON.parse(data)[0].sjh;
                $.cookie("sjh", sjh);

                var num = "";
                for (let i = 0; i < 6; i++) {
                    num += Math.floor(Math.random() * 10)
                }
                //ajax
                vcode = num
                //console.log(vcode)

                let pp = sjh + ","  + vcode ;
                $.ajax({
                    type: "POST",
                    url: "yc_php/sms_send.php",
                    timeout: 8000,
                    data: 'data' + pp,
                    success: function (data) {
                        //console.log(data)
                    }

                })

            }

        })






    })
    //bulr事件 验证返回或者输入 

    $("#vdcode2").blur(function () {
        //console.log($("#vdcode2").val())
        if ($("#vdcode2").val() !== vcode) {
            $(".vcodec2").text("请输入正确的验证码");
        } else {
            $(".vcodec2").text("");
            //console.log("快让朕登录")
            yrg()

        }

    })
}

function wrg() {
    $('#wrg-login').click(function () {
        var sjh = $("#telnumb").val();
        var password = $("#user-password").val();
        var pp = "'" + sjh + "'" + "," + "'" + password + "'";

        $.cookie("sjh", sjh);

        $.ajax({
            type: "POST",
            url: "yc_php/yc_wrg_login.php",
            timeout: 8000,
            data: 'data' + pp,
            success: function (data) {
                //console.log(data)
                if (data != 0) {
                    let a = eval(data)

                    let name = a[0]
                    let url = a[1]
                    let userid = a[2]
                    //console.log(userid)                                
                    //console.log($.cookie("name"));
                    $.cookie("name", a[0]);
                    $.cookie("sjh", sjh);
                    $.cookie("userid", userid)
                    window.location.href = url;
                } else {
                    alert("用户名或密码不正确")
                }
            }

        })
    })
}
function yrg() {
    $('#yrg .button3').click(function () {
        var usfz = $('#yrg #user-id').val();
        var password = $("#yrg #password2").val();
        var pp = "'" + usfz + "'" + "," + "'" + password + "'";
        //console.log(password + usfz)
        //console.log("已认购登录")
        $.ajax({
            type: "post",
            url: "yc_php/yc_yrg_login.php",
            data: 'data' + pp,

            success: function (data) {
                //console.log(data)
                if (data != 0) {
                    let a = eval(data)
                    let name = a[0]
                    let url = a[1]
                    let userid = a[2]
                    //console.log(userid)                  
                    $.cookie("name", a[0]);
                    $.cookie("sfz", usfz);
                    $.cookie("userid", userid)
                    window.location.href = url;
                } else {
                    alert("用户名或密码不正确")
                }
            }
        })

    })

}

function toogle() {
    $('#loginbox .box-header >div ').click(function (e) {
        var $cur = $(this);
        var idx = $cur.index();
        $cur.siblings().removeClass('active');
        $cur.addClass('active');
        $cur.parents('#loginbox').find('form').removeClass('show');
        $cur.parents('#loginbox').find('form').eq(idx).addClass('show');
        /* $(".button2").removeClass("abled")
        $(".button2").addClass("disabled") */
    })
    a, b, c, d = 0;

}