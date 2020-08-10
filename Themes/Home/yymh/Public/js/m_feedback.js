function no_conten() {
    $("#loadding").hide()
}
function total() {
    var a = "/home/api/feedbacktotal";
    T.restPost(a, null,
        function(a) {
            0 == a.code && ($("#total_count").html(a.data), 0 == a.data && (width(), $("#loading").hide(), no_conten()))
        })
}
function del_line() {
    $(".comment_tabCon ul li").first().find(".comment_main").css({
        "border-top": 0
    })
}
function opentext(a) {
    $(a).hide().siblings("p.hei").removeClass("hei")
}
function fadeIn() {
    var a, b;
    for (a = 0; 15 > a; a++) $(".comment_tabCon ul li.hide").first().addClass("li_fadeInUp").removeClass("hide");
    b = $(".comment_tabCon ul li.hide").length,
    30 >= b && b > 15 && $(window).on("scroll", request_func),
    15 >= b && 0 != b && $(window).on("scroll", request_func2)
}
function width() {
    var a = $(window).width(),
        b = a - 80;
    $(".comment_main").width(b)
}
function addCom() {
    var d, e, a = $("a#comBoxBtn").html(),
        b = $.trim($("#contact").val()),
        c = $.trim($("#content").val());
    return "" == c ? (layer.msg("反馈内容不能为空喔"), !1) : c.length > 180 ? (layer.msg("反馈内容不能超过180个字符喔"), !1) : ($("a#comBoxBtn").off("click").html("发表中.."), d = "/home/api/feedbackadd", e = {
        contact: b,
        content: c
    },
        $.post(d, e,
            function(b) {
                var d, e;
                if(b.code==0){
                    layer.msg(b.msg+'!');
                    $("a#comBoxBtn").html(a);
                }
                0 == b.code ? (b.data.feedback, $("#contact").val(""), $("#content").val(""), $(".review_pop,.mask").hide(), $("#replyeff").show().html(b.msg + "!"), setTimeout(function() {
                        $("#replyeff").hide()
                    },
                    2e3), addliBefore(b.data.feedback), d = $("#total_count"), e = parseInt(d.html()), d.html(e + 1), $("a#comBoxBtn").html(a), $("a#comBoxBtn").on("click", addCom)) : (alert(b.msg), $("a#comBoxBtn").html(a), $("a#comBoxBtn").on("click", addCom))
            }))
}
function addliBefore(a) {
    var f, g, h, b = a.id,
        c = Date.parse(new Date(a.create_time)),
        d = "0" + a.user_id + c + a.id + "0",
        e = "";
    if (e += '<li class="hide"><div class="auimg"><img src="' + a.user.headimage + '" class="user_img" onerror="this.src=window.cdnStaticRoot+' + "'/dist/ppm/images/pic_tx.png'" + '">', e += '</div><div class="comment_main"><span class="user_name">' + a.user.username + "</span>", e += '<div class="com_container">', 0 != a.parentFeedbacks.length) {
        for (f = a.parentFeedbacks, b = f[0].id, e += '<div class="masterCom">', g = 0; g < f.length; g++) h = f[g],
            e += '<div class="lou" name="' + d + '"><p><span><em>' + h.user.username + '</em>：</span><span class="replyLou">',
            e += "" + h.content + "</p>",
            e += '<div class="masterNum">' + (g + 1) + "</div></div>";
        e += "</div>"
    }
    e += "<p>" + a.content + "</p>",
        e += "</div>",
        e += "<p>等待回复</p>",
        e += '<span class="user_time">' + a.addtime + "</span></div></li>",
        $(".comment_tabCon ul").prepend(e),
        width(),
        del_line(),
        fadeIn(),
        $(".comment_tabCon ul li").eq(1).find(".comment_main").css({
            "border-top": "1px solid #cbcbcb"
        })
}
var request_func, request_func2, request_feedback_func, myFeedback = {
    page: 1,
    myFeedback_ajax: function() {
        $("#loadding").hide(),
            $(window).unbind("scroll", request_feedback_func);
        var a = "/home/api/feedbackall";
        T.restPost(a, {
                p: myFeedback.page
            },
            function(a) {
                var b, c, d, e, f, g, h, i, j;
                if (0 == a.code) {
                    if (0 == a.data.feedbacks.length) return no_conten(),
                        $("#loading").hide(),
                        !1;
                    for (b = 0; b < a.data.feedbacks.length; b++) {
                        console.log(a.data.feedbacks[b]);
                        if (c = a.data.feedbacks[b], d = c.parent_id, e = Date.parse(new Date(c.create_time)), f = "0" + c.user_id + e + c.id + "0", g = "", g += '<li class="hide"><div class="auimg"><img src="' + c.user.headimage + '" class="user_img" onerror="this.src=window.cdnStaticRoot+' + "'/dist/ppm/images/pic_tx.png'" + '">', g += '</div><div class="comment_main"><span class="user_name">' + c.user.username + "</span>", g += '<div class="com_container">', 0 != c.parentFeedbacks.length) {

                        }
                        if (c.repay != null){
                            var huifu ="嘻嘻漫画：" + c.repay;
                        }else{
                            var huifu ="等待回复";
                        }
                        console.log(c);
                        g += "<p>" + c.content + "</p>",
                        g += "</div>",
                        g += "<p>"+huifu+"</p>",
                        g += '<span class="user_time">' + c.addtime + "</span></div></li>",

                        $(".comment_tabCon ul").append(g),
                        width(),
                        del_line()
                    }
                    fadeIn()
                }
            },
            function(a) {
                console.log(a.msg),
                    $(window).bind("scroll", request_feedback_func)
            })
    }
};
total(),
    request_func = function() {
        var a = $(document).height();
        $(window).scrollTop() + $(window).height() >= a - 150 && ($(window).off("scroll", request_func), setTimeout(function() {
                fadeIn()
            },
            800))
    },
    request_func2 = function() {
        var a = $(document).height();
        $(window).scrollTop() + $(window).height() >= a - 150 && ($(window).off("scroll", request_func), setTimeout(function() {
                fadeIn()
            },
            800))
    },
    request_feedback_func = function() {
        console.log("request_feedback_func");
        var a = $(document).height();
        $(window).scrollTop() + $(window).height() >= a - m_global.document_hei && (myFeedback.page++, myFeedback.myFeedback_ajax(), $("#loadding").show())
    },
    $(function() {
        myFeedback.page = 1,
            myFeedback.myFeedback_ajax(),
            $(window).bind("scroll", request_feedback_func)
    });