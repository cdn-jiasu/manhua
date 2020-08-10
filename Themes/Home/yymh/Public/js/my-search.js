//点开搜索
function serchAction(){
    $("body").append("<div class='show'></div>");
    $(".show").show().css("top","0px");
    $("#sheader").show();
    $("#hotTit").show();
    $("#HotTag").show();
    headSerch("#searInput");
    $(".messagSjr").css("padding-bottom","20px");
    hotTag();
}

function sclosed(){
    $('#sheader').hide();
    $("#HotTag").hide();
    $("#hotTit").hide();
    $("#messagelist").hide();
    $("#searInput").val("");
    $(".show").remove();
    $(".messagSjr").css("padding-bottom","0px");
}

function headSerch(a) {
    $(a).bind("input propertychange",
    function() {
        var b = $.trim($(a).val()),
        c = $("#messagelist"),
        d = "/home/api/search";
        c.show(),
        "" != b ? $.get(d, {
            k: b
        },
        function(a) {
            var e, d = "";
            if (0 == a.code) for (e = 0; e < a.data.comics.length; e++) d += '<li><a href="/home/book/index/id/' + a.data.comics[e].id + '">' + a.data.comics[e].title + "</a></li>";
            else d = '<li><a href="javascript:;">无搜索结果</a></li>';
            c.html(d),
            $("form[id=searchForm]").attr("action", "/home/index/search/k/" + b)
        }) : ($("#messagelist").html(""), c.hide())
    })
}

function hotTag() {
    var a = "/home/api/searchtop";
    $.get(a, {},
    function(a) {
        var b, c, d;
        if (0 == a.code && a.data.comics.length > 0) {
            for (b = "", c = ["f17c67", "FD5B78", "FE4C40", "DE3163", "8A3324", "da765b","008573","228fbd","fdb933","7bbfea"], d = 0; d < a.data.comics.length; d++) b += '<li><a href="/home/book/index/id/' + a.data.comics[d].id + '" ',
            b += 'style="background: #' + c[d] + '">' + a.data.comics[d].title + "</a></li>";
            $("#HotTag").html(b)
        }
    })
}

function serchGo() {
    var a = $("#searInput").val();
    "" != a ? location.href = "/home/index/search/k/" + a: alert("请输入关键词")
}