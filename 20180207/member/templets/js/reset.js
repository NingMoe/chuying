check()
function check() {
    var b, c, d = 0;
    let $telnumb = $(" #telphone")
    let $password = $(" #pwd")
    let $passworddok = $(" #userpwdok")



    //判断手机号
    $telnumb.blur(function () {
        var telnumb = /^1[34578]\d{9}$/;
        //console.log($telnumb.val())
        if (!telnumb.test($telnumb.val())) {
            $(".telnumbc").text("手机号不符合要求");
            b = 0;
        } else {
            //ajax 验证手机号是否已被使用
            // if(true){
            //     $(".telnumbc").text("该号码已被注册");
            // }else{

            // }
            $(".telnumbc").text("");
            b = 1;


        }

    })

    //判断密码是否符合格式
    $password.blur(function () {
        var password = /^[0-9A-Za-z]{6,12}$/;
        console.log($password.val())
        if (!password.test($password.val())) {
            $(".passwordc").text("密码不符合规范");
            c = 0;
        } else {
            $(".passwordc").text("");
            c = 1;

        }

    })

    //判断密码是否一致
    $passworddok.blur(function () {
        console.log($passworddok.val())
        if ($password.val() !== $passworddok.val()) {
            $(".pwdck").text("密码不一致");
            d = 0;
        } else {
            $(".pwdck").text("");
            d = 1;
            if (b == 1 && c == 1 && d == 1) {
                sendM()
            }





        }
    })



}
function sendM() {
    var ordertime = 60   //设置再次发送验证码等待时间
    var timeleft = ordertime
    var vcode;
    $(".button2").removeClass("disabled")
    $(".button2").addClass("abled")
    function timeCount() {
        timeleft -= 1
        if (timeleft > 0) {
            $(".button2").text(timeleft + " 秒后重发");
            setTimeout(timeCount, 1000)
        }
        else {
            $(".button2").text("重新发送");
            timeleft = ordertime   //重置等待时间
            //60s之后自动变回可点击状态
            $(".button2").removeClass("disabled")
            $(".button2").addClass("abled")

        }
    }


    //点击发送ajax button2 变成不可点击状态  
    $(".abled").click(function () {
        $(".button2").removeClass("abled")
        $(".button2").addClass("disabled")
        timeCount(this);
        let sjh = $("#telphone").val();
        var num = "";
        for (let i = 0; i < 6; i++) {
            num += Math.floor(Math.random() * 10)
        }
        //ajax
        vcode = num
        console.log(vcode)
        var pp = sjh + "," + "'" + vcode + "'";
        $.ajax({
            type: "POST",
            url: "yc_php/sms_send.php",
            timeout: 8000,
            data: 'data' + pp,
            success: function (data) {
                console.log(data)
            }

        })


    })

    //bulr事件 验证返回或者输入 

    $("#vcode").blur(function () {
        console.log($("#vcode").val())
        console.log(vcode)
        if ($("#vcode").val() !== vcode) {
            $(".vcodec").text("请输入正确的验证码");
        } else {
            $(".vcodec").text("");
            bind()


        }


    })

}

function bind() {
    $(' .button3').click(function () {
        console.log(2)
        var pwd = $("#loginbox #pwd").val();
        let sjh = $("#loginbox #telphone").val();

        console.log(sjh)
        console.log(pwd)
        var pp = "'" + sjh + "'" + "," + "'" + pwd + "'";
        $.ajax({
            type: "POST",
            url: "yc_php/yc_xgmm.php",
            data: 'data' + pp,
            success: function (data) {
                console.log(data)
                if (data == 1) {
                    console.log("修改成功")
                    window.location.href = "index1.php";
                } else {
                    alert("修改失败")
                }

            }
        })




    })
}