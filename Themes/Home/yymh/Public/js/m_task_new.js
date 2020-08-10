function wxpOpenSharWnd() {
    $("#sharCopy").css("background", "#60ba48");
    $("#sharCopy").html("点此复制任务码");
    var showBg = $('<div class="show" id="sharwndbg">');
    var sharWin = $("#wxpWnd");
    var window_h = $(window).height();
    var window_w = $(window).width();
    $("body").append(showBg);
    showBg.show();
    var top = (window_h - sharWin.height()) / 2;
    var left = (window_w - sharWin.width()) / 2;
    sharWin.css({
        top: top
    }).css({
        left: left
    }).show().addClass("layerz");
    sharWin.find(".sharClose").click(function() {
        $("#wxpWnd").removeClass("layerz").hide();
        showBg.remove()
    })
}
function wxtOpenSharWnd() {
    $("#rcodeCopy").css("background", "#60ba48");
    $("#rcodeCopy").html("点此复制推广链接");
    var showBg = $('<div class="show" id="sharwndbg">');
    var sharWin = $("#wxtStep");
    var window_h = $(window).height();
    var window_w = $(window).width();
    $("body").append(showBg);
    showBg.show();
    var top = (window_h - sharWin.height()) / 2;
    var left = (window_w - sharWin.width()) / 2;
    sharWin.css({
        top: top
    }).css({
        left: left
    }).show().addClass("layerz");
    sharWin.find(".sharClose").click(function() {
        $("#wxtStep").removeClass("layerz").hide();
        showBg.remove()
    })
}
function takeTask2(){
    wxtOpenSharWnd();
}

function sign() {
    var url = "/home/api/sign";
    $.post(url, {},
        function(resjson) {
            if (resjson.code == 0) {
                if (resjson.msg.length > 0) {
                    alert(resjson.msg)
                }
                if (resjson.data) {
                    if (resjson.data.wait) {
                        $("#sign_btn_input").val(resjson.data.wait + "秒后");
                        wait_sign_second = resjson.data.wait
                    }
                    if (resjson.data.cont) {
                        $("#cont_times").html(resjson.data.cont)
                    }
                    if (resjson.data.task) {
                        $("#sti_" + resjson.data.task).removeClass("imggray")
                    }
                    if (resjson.data.vip && resjson.data.vip != "0小时") {
                        $("#user_stat").html("(vip:" + resjson.data.vip + ")")
                    } else {
                        if (resjson.data.gold) {
                            $("#user_stat").html("(金币:" + resjson.data.gold + ")")
                        }
                    }
                }
            } else {
                if (resjson.code == 100) {
                    layer.msg(resjson.msg);
                } else {
                    alert("发生未知错误,签到失败,请稍后重试")
                }
            }
        })
}




    var clipboard = new ClipboardJS('#rcodeCopy', { 
     text: function() { 
      return $('#taskRcode').html(); // 返回需要复制的内容 
     } 
    });
    clipboard.on("success",
        function(element) {
            $("#rcodeCopy").css("background", "#ccc");
            $("#rcodeCopy").html("已复制");
            element.clearSelection();
        });
    clipboard.on("error",
        function(element) {
            prompt("复制失败了,请长按全选输入框复制吧!", element.text)
        });





        



(function() {
    var interval = setInterval(function() {
            if (wait_sign_second > 0) {
                wait_sign_second--;
                if (wait_sign_second > 0) {
                    $("#sign_btn_input").val(wait_sign_second + "秒后")
                } else {
                    $("#sign_btn_input").val("签到 (30金币)")
                }
            }

        },
        1000)
})();