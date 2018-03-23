var all;
//可预约项目渲染
function render1(content) {
    let html = ''
    var template = `<tr class="alt">
                    <td class="title project-name">盈楚景秀芳华1号</td>
                    <td class="typename">其他类投资私募基金</td>
                    <td class="lb">固定+浮动</td>
                    <td class="active">预约</td>
                </tr>`

    for (let i = 0; i < content.length; i++) {

        var $node = $(template)
        $node.find('.title').text(content[i].title)
        $node.find('.typename').text(content[i].typename)
        $node.find('.lb').text(content[i].yc_sylb)

        $('.wrg-body').append($node);

    }


}
//已预约项目渲染
function render2(content) {
    let html = ''
    var template = `<tr class="alt">
                    <td class="title project-name">盈楚景秀芳华1号</td>
                    <td class="typename">其他类投资私募基金</td>
                    <td class="lb">固定+浮动</td>
                    <td class="yyy" >已预约</td>
                </tr>`

    for (let i = 0; i < content.length; i++) {

        var $node = $(template)
        $node.find('.title').text(content[i].title)
        $node.find('.typename').text(content[i].typename)
        $node.find('.lb').text(content[i].yc_sylb)

        $('.wrg-body').append($node);

    }


}

$(window).load(function () {
    $(".right #name").text($.cookie(name).name)
    //console.log($.cookie("name"))
    //console.log($.cookie("sjh"))
});


$.ajax({//获取到所有项目
    type: "GET",
    url: "../yc_php/yc_xm.php",
    success: function (data) {
        var data2 = data;
        var str1 = $.parseJSON(data)
        all = str1
        //console.log("这是所有项目" + data)
        $.ajax({//获取到可被预约的项目
            type: "GET",
            url: "../yc_php/yc_yy_xmid.php",
            success: function (data) {
                //console.log("这是已预约的项目的" + data)

                var yxid = []//获取到已预约项目的id
                let yx = []
                let qtxm = []
                var str2 = $.parseJSON(data);
                var str3 = str2[0].rgxm_yx
                //console.log(str3)
                var result = str3.split(",")
                for (let i = 0; i < result.length; i++) {
                    if (result[i] == '') {
                        result.splice(i, 1);
                    }
                }
                //console.log("這是去掉空的已预约id的数组" + result)
                let set = new Set();
                set = result

                for (let i = 0; i < set.length; i++) {
                    yxid[i] = set[i]
                }

                //将两种项目分开来

                for (let i = 0; i < all.length; i++) {

                    if (yxid.length != 0) {
                        for (let j = 0; j < yxid.length; j++) {

                            if (str1[i].aid == parseInt(yxid[j])) {
                                yx.push(all[i])
                                all.splice(i, 1)

                            }

                        }

                    }

                }
                //console.log(all)
                render2(yx)//已预约的项目(先渲染)
                render1(all)//其他项目(可预约)


            }
        })

    }
})


$(".wrg-body").delegate('.active', "click", function (e) {
    var $telnumb = $("#telphone")
    var $cur = $(this);
    let projectName = $cur.parents(".alt").find(".project-name").text()

    $("#wrg-table").addClass("hide")
    $("#pre-order").removeClass("hide")
    $('.close').click(function () {
        $("#wrg-table").removeClass("hide")
        $("#pre-order").addClass("hide")
    })

    $telnumb.blur(function () {
        var telnumb = /^1[34578]\d{9}$/;

        if (!telnumb.test($telnumb.val())) {
            $(".telnumbc").text("手机号不符合要求");
        } else {

            $(".telnumbc").text("");

            $("#pre-order .button4").click(function () {
                let sjh = $telnumb.val();
                //根据项目名获取到项目id                           
                var yyyid;
                for (let i = 0; i < all.length; i++) {
                    if (all[i].title == projectName) {
                        yyyid = all[i].aid;
                    }
                }
                let rank = 10;
                //console.log(sjh + "+" + projectName + "+" +yyyid)
                var pp = "'" + sjh + "'" + "," + "'" + projectName + "'" + "," + yyyid + "," + rank;
                $.ajax({
                    type: "POST",
                    url: "../yc_php/yc_rgyx.php",
                    data: 'data' + pp,
                    success: function (data) {
                        //console.log(data)
                        if (data == 1) {
                            alert("预约成功")
                            $("#wrg-table").removeClass("hide")
                            $("#pre-order").addClass("hide")
                            window.location.reload()
                        } else {
                            alert("过于火爆")
                        }

                    }
                })

            })

        }
    })




});



