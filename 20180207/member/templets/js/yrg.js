var all;
$(function () {
    var windowW = $(window).width();
    var windowH = $(window).height();
});
$(".getout").click(function () {

    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
})


//已认购的项目渲染
function render1(content) {

    let m, h, e, r, o;
    let usid = $.cookie("sfz");
    /*alert($.cookie("sfz"))*/
    let str = '' + usid;

    m = str.substring(0, 3) + 3
    h = str.substring(3, 6) + 3
    e = str.substring(6, 10) + 5
    r = str.substring(10, 14) + 5
    o = str.substring(14, 18) + 5

    let html = ''
    var template = `<tr class="alt">
                    <td class = "detail notice " ><a href="">某某项目公告</a></td>
                    <td >
                        <td class =" title project-name">景秀芳华2号</td>
                        <td class = "ygm">已购买</td>
                    </td>
                </tr>`

    for (let i = 0; i < content.length; i++) {

        var $node = $(template)
        $node.find('.notice a').text(content[i].title + '公告')
        $node.find('.notice a').attr("href", "../../plus/viewxm.php?aid=" + content[i].aid + "&usid=" + usid + "&fshuduqwuehedhsdoahsdoiaosdhoahsdohasuodhaoushdouahsduohasoudhoauhsduohasuodhaushdouahsdou" + "&m=" + m + "&h=" + h + "&e=" + e + "&f$sdhaiisdanjhhasu" + "&r=" + r + "&o=" + o);
        $node.find('.title').text(content[i].title)
        $('.yrg-body').append($node);

    }


}
//已预约项目渲染
function render2(content) {
    let html = ''
    var template = `<tr class="alt">
                    <td class = " notice " >某某项目公告</td>
                    <td >
                        <td class =" title project-name">景秀芳华2号</td>
                        <td class= "yyy">已预约</td>
                    </td>
                </tr>`
    /*  ////console.log(content) */
    for (let i = 0; i < content.length; i++) {

        var $node = $(template)
        $node.find('.notice').text(content[i].title + '公告')
        $node.find('.title').text(content[i].title)
        $('.yrg-body').append($node);

    }


}
//其他项目渲染
function render3(content) {
    let html = ''
    var template = `<tr class="alt">
                    <td class = " notice " >某某项目公告</td>
                    <td >
                        <td class =" title project-name">景秀芳华2号</td>
                        <td class = "active">预约</td>
                    </td>
                </tr>`
    /*  ////console.log(content) */
    for (let i = 0; i < content.length; i++) {

        var $node = $(template)
        $node.find('.notice').text(content[i].title + '公告')
        $node.find('.title').text(content[i].title)
        $('.yrg-body').append($node);

    }


}

//载入事件
$(window).load(function () {
    $(".right #name").text($.cookie(name).name)
    ////console.log($.cookie("name"))
    ////console.log($.cookie("sfz"))

});


var ygm = []
$.ajax({
    //获取所有项目
    type: "GET",
    url: "../yc_php/yc_xm.php",
    success: function (data) {

        var str1 = $.parseJSON(data)//所有项目
        all = str1;
        $.ajax({
            //获取已预约
            type: "GET",
            url: "../yc_php/yc_yy_xmid.php",
            success: function (data) {
                var str2 = $.parseJSON(data)
                $.ajax({
                    //获取已认购项目
                    type: "GET",
                    url: "../yc_php/yc_yrg_xmid.php",
                    success: function (data) {

                        var str3 = $.parseJSON(data);

                        ////console.log(str1)//全部项目
                        ////console.log(str2)//已预约项目
                        ////console.log(str3)//已购项目

                        var yyid = []// 已预约项目的id
                        var ygid = []// 已购项目的id

                        for (let i = 0; i < str3.length; i++) {
                            ygid[i] = str3[i].rgxm
                        }
                        var str4
                        if (str2.length == 0) {
                            str4 = [];
                        } else {
                            str4 = str2[0].rgxm_yx
                            ////console.log(str4)
                            var result = str4.split(",")
                            for (let i = 0; i < result.length; i++) {
                                if (result[i] == '') {
                                    result.splice(i, 1);
                                }
                            }
                            ////console.log("這是去掉空的已预约id的数组" + result)
                            let set = new Set();
                            set = result

                            for (let i = 0; i < set.length; i++) {
                                yyid[i] = set[i]
                            }
                            /* 
                            for (let i = 0; i < str3.length; i++) {
                                ygid[i] = str3[i].rgxm
                            } */
                        }
                        ////console.log(ygid)

                        ////console.log(yyid)

                        var yy = [] //已预约
                        var yg = [] //已购买
                        ygm = yg
                        //获得已购项目

                        for (let i = 0; i < all.length; i++) {
                            for (let j = 0; j < ygid.length; j++) {
                                if (all[i].aid == parseInt(ygid[j])) {
                                    yg.push(all[i])
                                    all.splice(i, 1)

                                }
                            }
                        }
                        //分离剩下的，已预约和未预约项目

                        for (let i = 0; i < str1.length; i++) {
                            for (let j = 0; j < yyid.length; j++) {
                                if (all[i].aid == parseInt(yyid[j])) {
                                    yy.push(all[i])
                                    ////console.log(i)
                                    ////console.log(j)
                                    all.splice(i, 1)
                                }
                            }
                        }

                        ////console.log(yg)
                        ////console.log(yy)
                        /* ////console.log(all) */
                        render1(yg)
                        render2(yy)
                        render3(all)


                    }
                })


            }

        })


    }
})

//监听点击事件
$(".yrg-body").delegate('.active', "click", function (e) {
    var $telnumb = $("#telphone")
    var $cur = $(this);
    let projectName = $cur.parents(".alt").find(".project-name").text()
    $("#yrg-table").addClass("hide")
    $("#pre-order").removeClass("hide")
    $('.close').click(function () {

        $("#yrg-table").removeClass("hide")
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
                let rank = 32767;
                ////console.log(sjh + "+" + projectName + "+" + yyyid)
                var pp = "'" + sjh + "'" + "," + "'" + projectName + "'" + "," + yyyid + "," + rank;
                $.ajax({
                    type: "POST",
                    url: "../yc_php/yc_rgyx.php",
                    data: 'data' + pp,
                    success: function (data) {
                        ////console.log(data)
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


//点击打开项目公告
$(".yrg-body").delegate('.detail', "click", function (e) {
    var $cur = $(this);
    let projectName = $cur.parents(".alt").find(".project-name").text()
    ////console.log(projectName)
    $(".title-bar >h2").html(projectName + "的简要报告")

    ////console.log(ygm)
    for (let i = 0; i < ygm.length; i++) {
        if (projectName == ygm[i].title) {
            var aid = ygm[i].aid;
            $.cookie("aid", aid);
        }
    }


})








   /*   $(".yrg-body").delegate('.detail', "click", function (e) {
            var $cur = $(this);
            let projectName = $cur.parents(".alt").find(".project-name").text()
             ////console.log(projectName)
             $(".title-bar >h2").html(projectName + "的简要报告")

             ////console.log(ygm)
              for (let i = 0; i < ygm.length; i++){
                  if(projectName == ygm[i].title){
                      var aid = ygm[i].aid;
                       $.cookie("aid", aid); 
                      var pp = "'" + aid + "'" ;
                      $.ajax({
                          type: "POST",
                          url: "../yc_php/yc_yrg_content.php",
                          data: 'data' + pp,
                          success: function (data) {
                            let content =  $.parseJSON(data)
                             ////console.log(content) 
                            let gg =   content[0].content
                             render4(gg) 
                          }
                      })
                      

                  }
              }
             

             $("#yrg-table").addClass("hide")
             $("#report").removeClass("hide")
             $('.close2').click(function () {
             $("#report").addClass("hide")
             $("#yrg-table").removeClass("hide")

            })    
     
     
     })    
      */