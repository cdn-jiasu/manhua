var firstcharpetId = "";
var firstComicId = "";
var firstCharpetName = "";
var jsonData = "";
var sort = {
    expanded: [],
    currSortType: "",
    needReverse: false,
    desc: function(json) {
        var def_chap = json.lastObject()["data"].lastObject().id;
        var def_comicId = json.lastObject()["data"].lastObject().manhua_id;
        var def_charpetName = json.lastObject()["data"].lastObject().title;
        var comicId = json[0]["data"][0].manhua_id;
        firstcharpetId = def_chap;
        firstComicId = def_comicId;
        firstCharpetName = def_charpetName;
        m_global.comicId = comicId;
        $(".asc").removeClass("cur");
        $(".desc").addClass("cur");
        var htmlStr = getRowDivHtmlStr(json, "desc");
        if (htmlStr) {
            $("#list").html(htmlStr)
        }
    },
    asc: function(json) {
        var def_chap = json.lastObject()["data"].firstObject().id;
        var def_comicId = json.lastObject()["data"].firstObject().manhua_id;
        var def_charpetName = json.lastObject()["data"].firstObject().title;
        var comicId = json[0]["data"][0].manhua_id;
        firstcharpetId = def_chap;
        firstComicId = def_comicId;
        firstCharpetName = def_charpetName;
        m_global.comicId = comicId;
        $(".asc").addClass("cur");
        $(".desc").removeClass("cur");
        var htmlStr = getRowDivHtmlStr(json, "asc");
        if (htmlStr) {
            $("#list").html(htmlStr)
        }
    },
    expand: function(obj, index) {
        sort.expanded[index] = 1;
        var tmpBool = sort.needReverse;
        sort.needReverse = false;
        var htmlStr = "";
        for (var i = 0; i < jsonData.length; i++) {
            var itemData = jsonData[i];
            htmlStr += getChaptersHtmlStr(itemData, i)
        }
        if (htmlStr) {
            $("#list").html(htmlStr)
        }
        sort.needReverse = tmpBool
    }
};
function getRowDivHtmlStr(jsonStr, sortType) {
    if (sort.currSortType == sortType) {
        return false
    }
    var htmlStr = "";
    for (var i = 0; i < jsonStr.length; i++) {
        var itemData = jsonStr[i];
        htmlStr += getChaptersHtmlStr(itemData, i)
    }
    sort.currSortType = sortType;
    sort.needReverse = true;
    return htmlStr
}
function getChaptersHtmlStr(itemObj, rowIndex) {
    var htmlStr = '<div class="qjBar">';
    htmlStr += itemObj.title;
    htmlStr += "<span>" + itemObj.data.length + "个章节</span>";
    htmlStr += "</div>";
    htmlStr += '<ul class="Drama autoHeight">';
    var itemArr = itemObj.data;
    if (sort.needReverse) {
        itemArr.reverse()
    }
    var maybeShowAddButton = itemArr.length > 11;
    var isExpanded = sort.expanded[rowIndex];
    if (!isExpanded) {
        itemArr = itemArr.slice(0, 11)
    }
    for (var i = 0; i < itemArr.length; i++) {
        htmlStr += getChapterHtmlStr(itemArr[i])
    }
    if (!isExpanded && maybeShowAddButton) {
        htmlStr += '<li class="add" onclick="sort.expand($(this),' + rowIndex + ')">...</li>'
    }
    htmlStr += "</ul></div>";
    return htmlStr
}
function chapterCookie(comicId, chapterId, kookiepage, charpetName, cover, title) {
    var cookieData = new Date();
    var imgSrc;
    if ($("#Cover").length > 0) {
        imgSrc = $("#Cover img").attr("src")
    } else {
        imgSrc = cover
    }
    var comicName;
    if ($("#comicName").length > 0) {
        comicName = $("#comicName").text()
    } else {
        comicName = title
    }
    if (localStorage.readHistory == undefined) {
        var item_obj = {};
        item_obj[comicId] = chapterId;
        item_obj["comicId"] = comicId;
        item_obj["chapterId"] = chapterId;
        item_obj["comicName"] = comicName;
        item_obj["charpetName"] = charpetName;
        item_obj["cover"] = imgSrc;
        item_obj["page"] = kookiepage;
        item_obj["time"] = cookieData.Format("yyyy-MM-dd");
        localStorage.readHistory = JSON.stringify([item_obj])
    } else {
        var cookie_obj = $.parseJSON(localStorage.readHistory);
        var exist = false;
        for (var i = 0; i < cookie_obj.length; i++) {
            var obj = cookie_obj[i];
            if (obj[comicId]) {
                obj[comicId] = chapterId;
                obj["comicId"] = comicId;
                obj["chapterId"] = chapterId;
                obj["page"] = kookiepage;
                obj["charpetName"] = charpetName;
                obj["time"] = cookieData.Format("yyyy-MM-dd");
                exist = true;
                break
            }
        }
        if (!exist) {
            var item_obj = {};
            item_obj[comicId] = chapterId;
            item_obj["comicId"] = comicId;
            item_obj["chapterId"] = chapterId;
            item_obj["cover"] = imgSrc;
            item_obj["comicName"] = comicName;
            item_obj["charpetName"] = charpetName;
            item_obj["page"] = kookiepage;
            item_obj["time"] = cookieData.Format("yyyy-MM-dd");
            cookie_obj.push(item_obj)
        }
        localStorage.readHistory = JSON.stringify(cookie_obj)
    }
}

function getChapterHtmlStr(chapter) {
    var url = "/home/book/capter/id/"+chapter.id;
    var cookieId = [chapter.comic_id, chapter.id];
    var htmlStr = "<li>";
    if(chapter.image==null){
        chapter.image='/Public/default.jpg';
    }
    
    htmlStr += '<a href="' + url + '" onclick="chapterCookie(' + chapter.manhua_id + "," + chapter.id + ",1,'" + chapter.title + "')\"><span>";
    htmlStr += chapter.title;
    if (chapter.isvip > 0 && chapter.score == 0) {
        htmlStr += '<span class="btn_up">限免</span>'
    }
    htmlStr += '<br/><span class="sub">' + chapter.update_time + "</span>";
    htmlStr += "</a></span>";
    if (chapter.isvip == 0) {
        htmlStr += '<p class="coin_price"><span class="btn_free">免费</span></p>'
    } else {
        if (chapter.buy > 0) {
            htmlStr += '<p class="coin_price"><span class="btn_buy">已购</span></p>'
        } else {
            htmlStr += '<p class="coin_price"><span class="btn_coin">' + chapter.score + "金币</span></p>"
        }
    }
    htmlStr += "</li>";
    return htmlStr
}
function addSubscribe(subId) {
    
        $.ajax({
            url: '/home/book/addSubscribe',
            type: 'post',
            data:{
                id:subId  },
            success: function (data) {
                data2=JSON.parse(data);
                if (data2.status == '200') {
                    var html = "";
                    html += '<div class="layerIcon01"></div>';
                    html += "<p>小说订阅成功</p>";
                    html += '<p class="opacity">当小说更新时我们将第一时间提醒您</p>';
                    html += '<a class="layerBtn" id=Cancel>知道了</a>';
                    openwindow(html);
                    $("#Subscribe").html("取消订阅").attr("onclick", "unSubscribe(" + subId + ")");
                    $("#mysub_" + subId).html("取消订阅").attr("onclick", "unSubscribe(" + subId + ")");
                    $("#subject_" + subId).html("已订阅").attr("onclick", "")
                }else if(data2.status=='100'){
                    var html = "";
                    html += '<div class="layerIcon06"></div>';
                    html += "<p>订阅失败</p>";
                    html += '<p class="opacity">您已经订阅过了！</p>';
                    html += '<a class="layerBtn" id=Cancel>确定</a>';
                    openwindow(html);
                    $("#Subscribe").html("取消订阅").attr("onclick", "unSubscribe(" + subId + ")");
                    $("#mysub_" + subId).html("取消订阅").attr("onclick", "unSubscribe(" + subId + ")");
                    $("#subject_" + subId).html("已订阅").attr("onclick", "");
                }
            }
        });
            
}
function addSubscribeAll() {
    UserCookie();
    if (m_global.isLogin == true) {
        var subScribeArry = JSON.parse(localStorage.mySubscribeData);
        var url = "https://" + domain_name + "interface.dmzj.com/api/subscribe/addMulity";
        var subIdArry = [];
        for (var i = 0; i < $(".itemBox").length; i++) {
            var subIdList = {};
            var attrId = $(".itemBox").eq(i).attr("id");
            subIdList[attrId] = 0;
            subIdArry.push(subIdList)
        }
        var subId_type = JSON.stringify(subIdArry);
        $.ajax({
            url: url,
            dataType: "jsonp",
            type: "get",
            async: false,
            cache: false,
            jsonp: "callback",
            jsonpCallback: "success",
            data: {
                jsonData: subId_type
            },
            success: function(data) {
                if (data.result == 1000) {
                    for (subid_i = 0; subid_i < data.comic_arr.length; subid_i++) {
                        for (attr_id = 0; attr_id < $(".itemBox").length; attr_id++) {
                            var attr_subId = $(".itemBox").eq(attr_id).attr("id");
                            if (attr_subId == data.comic_arr[subid_i]) {
                                var sub_id = {};
                                sub_id["sub_id"] = attr_subId;
                                subScribeArry.push(sub_id);
                                localStorage.mySubscribeData = JSON.stringify(subScribeArry);
                                $("#subject_" + attr_subId).html("已订阅");
                                $("#subject_" + attr_subId).attr("onclick", "");
                                break
                            }
                        }
                    }
                    var html = "";
                    html += '<div class="layerIcon01"></div>';
                    html += "<p>" + data.msg + "</p>";
                    html += '<p class="opacity">当小说更新时我们将第一时间提醒您</p>';
                    html += '<a class="layerBtn" id=Cancel>知道了</a>';
                    openwindow(html)
                }
            }
        })
    } else {
        location.href = (m_global.crcck.length > 0 ? ("/" + m_global.crcck) : "") + "/login.html"
    }
}
function initIntroData(json) {
    jsonData = json;
    sort.asc(json);
    isRead();
    UserCookie();
    isSubscribe(firstComicId)
    
}
// 简介
$(function() {
    m_global.character("introName", 8);
    var cur_status = "less";
    var charNumbers = $(".txtDesc").text().length;
    var limit = 50;
    if (charNumbers > limit) {
        var orgText = $(".txtDesc").text();
        var orgHeight = $(".txtDesc").height();
        var showText = orgText.substring(0, limit) + "...";
        $(".txtDesc").html(showText);
        var contentHeight = $(".txtDesc").height();
        $(".openBtn,.txtDesc").click(function() {
            if (cur_status == "less") {
                $(".txtDesc").height(contentHeight).text(orgText).animate({
                    height: orgHeight
                });
                $(".openBtn").addClass("openBtnC");
                cur_status = "more"
            } else {
                $(".txtDesc").height(orgHeight).text(showText).animate({
                    height: contentHeight
                });
                $(".openBtn").removeClass("openBtnC");
                cur_status = "less"
            }
        })
    } else {
        $(".openBtn").css("background", "#fff").css("height", "10px")
    }
});