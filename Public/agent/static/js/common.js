/**
 * Created by Logan on 2017/3/21.
 */
$(function(){
    $('body').append('<iframe id="ajaxtarget" name="ajaxtarget" style="display: none;"></iframe>');
    // 当前菜单的特效    -- begin --
    $(".currentSelectMenuNode").parent().parent().css('display', 'block');
    $(".currentSelectMenuNode").parent().parent().parent().addClass("active");

    $(".sidebar-toggle-box").click(function(){
        $("#container").toggleClass("sidebar-closed");
    });

    $('.dcjq-parent').find('.dcjq-icon').addClass('y-dcjq-icon');
    $(".sub-menu a").click(function(){
            $(this).next("ul").slideToggle("slow");
            $(this).parent().toggleClass("active").siblings().removeClass("active");
        if ($(this).parent().hasClass('active')) {
            $(this).find('.dcjq-icon').removeClass('y-dcjq-icon');
        } else {
            $(this).find('.dcjq-icon').addClass('y-dcjq-icon');
        }
    });


    //删除该条信息按钮
    $(".btn-delete-msg").on( 'click', function () {
        var name = $(this).data('name');
        var url = $(this).data('url');
        var id = $(this).data('id');
        alertify.confirm()
            .setting({
                'closable':false,
                'title':'删除信息',
                'transition':'zoom',
                'message': '确定要删除 "' + name + '" 么？' ,
                'labels': {ok:'确认', cancel:'取消'},
                'onok': function(){
                    //location = url + "?id=" + id;
                    $.getJSON(url,{id : id},function (res) {
                        id = res.id ? res.id : id;
                        if (res.success == 1) {
                            if ($('#tr-item-' + id).length > 0) {
                                $('#tr-item-' + id).remove();
                            } else {
                                o.parent().parent().remove();
                            }
                        } else {
                            alert(res.error);
                        }
                    });
                }
            }).show()
    });


    //修改该条信息按钮
    $(".btn-edit-msg").on( 'click', function () {
        var money = $(this).data('money');
        var url = $(this).data('url');
        var id = $(this).data('id');
        alertify.confirm()
            .setting({
                'closable':false,
                'title':'结算信息',
                'transition':'zoom',
                'message': '确定要结算金额为 ' + money + ' 元的提现申请么?' ,
                'labels': {ok:'确认', cancel:'取消'},
                'onok': function(){
                    $.getJSON(url,{bill_id : id},function (res) {
                        if (res.success == 1) {
                            window.location.reload();
                        } else {
                            alert(res.error);
                        }
                    });
                }
            }).show()
    });

    // 表单的取消按钮
    $(".btn-form-cancel").click(function () {
        history.back();
    });


    // 分页
    $('.page-number').pagination({
        pages: $('.page-number').data('pages'),
        styleClass: ['pagination-lg'],
        showCtrl: true,
        displayPage: 7,
        currentPage: $('.page-number').data('currentpage'),
        onSelect: function (num) {
            var old_search = location.search;
            if (old_search) {
                if (-1 != old_search.lastIndexOf('page=')) {
                    var arr = old_search.split('&');
                    for (var i in arr) {
                        if (-1 != arr[i].lastIndexOf('page')) {
                            arr[i] = arr[i].slice(0, arr[i].lastIndexOf('=')+1)+num;
                        }
                    }
                    location.href = $('.page-number').data('url') + arr.join('&');
                } else {
                    location.href = $('.page-number').data('url') + old_search + '&page=' + num;
                }
            } else {
                location.href = $('.page-number').data('url') + '?page=' + num;
            }
        }
    });

    // index页面的搜索部分
    $(".btn-search").on( 'click', function () {
        var btnSearch = $(".searchValue").val();
        if(btnSearch == ""){
            alertify.alert()
                .setting({
                    'closable':false,
                    'title':'提示',
                    'transition':'zoom',
                    'message': '请输入搜索内容',
                    'label':'我知道了'
                }).show()
            return false;
        }else{
            location.href = $(".btn-search").data('url') + "?searchValue=" + $('input[name="searchValue"]').val();
        }
    });

    // 提示信息 error
    $(".my-alert-error").ready(function () {
        var content = $(".my-alert-error").text();
        if (content) {
            alertify.error(content);
        }
    })

    // 提示信息  warning
    $(".my-alert-warning").ready(function () {
        var content = $(".my-alert-warning").text();
        if (content) {
            alertify.warning(content);
        }
    })

    // 提示信息  notice
    $(".my-alert-notice").ready(function () {
        var content = $(".my-alert-notice").text();
        if (content) {
            alertify.message(content);
        }
    })

    // 提示信息  success
    $(".my-alert-success").ready(function () {
        var content = $(".my-alert-success").text();
        if (content) {
            alertify.success(content);
        }
    })

    $(".rich_text").ready(function () {
        var id = $(".rich_text").attr('id');

        //实例化编辑器
        //var um = UM.getEditor(id);
    })
});


// loading begin
function loadingBegin() {
    $("#BgLoading").css({ display: "block", height: $(document).height() });
    var yscroll = document.documentElement.scrollTop;
    var screenx=$(window).width();
    var screeny=$(window).height();

    $(".LoadingDiv").css("display", "block");
    $(".LoadingDiv").css("top",yscroll+"px");

    var DialogDiv_width=$(".LoadingDiv").width();
    var DialogDiv_height=$(".LoadingDiv").height();

    $(".LoadingDiv").css("left",(screenx/2-DialogDiv_width/2)+"px")
    $(".LoadingDiv").css("top",(screeny/2-DialogDiv_height/2)+"px")

    $("body").css("overflow","hidden");
}

function loadingEnd() {
    $("#BgLoading").css("display", "none");
    $(".LoadingDiv").css("display", "none");
    $("body").css("overflow","auto");
}

/**
 * 显示错误
 */
function showError(str) {
    alert(str);
}
/**
 * 显示成功
 */
function showSuccess(str) {
    str = str == "" || str == undefined || str == null ? '提交成功！': str;
    alert(str);
}
/**
 * 跳转
 */
function redirect(url) {
    window.location.href = url;
}
/**
 * 删除
 */
function del(o) {
    o = $(o)
    var name = o.data('name');
    var url = o.data('url');
    var id = o.data('id');

    alertify.confirm()
        .setting({
            'closable':false,
            'title':'删除信息',
            'transition':'zoom',
            'message': '确定要删除 "' + name + '" 么？' ,
            'labels': {ok:'确认', cancel:'取消'},
            'onok': function(){
                //location = url + "?id=" + id;
                $.getJSON(url,{id : id},function (res) {
                    if (res.success == 1) {
                        if ($('#tr-item-' + id).length > 0) {
                            $('#tr-item-' + id).remove();
                        } else {
                            o.parent().parent().remove();
                        }
                    } else {
                        alert(res.error);
                    }
                });
            }
        }).show()
}

/**
 * 删除回调
 */
function delCallback(o, func) {
    o = $(o)
    var name = o.data('name');
    var url = o.data('url');
    var id = o.data('id');

    alertify.confirm()
        .setting({
            'closable':false,
            'title':'删除信息',
            'transition':'zoom',
            'message': '确定要删除 "' + name + '" 么？' ,
            'labels': {ok:'确认', cancel:'取消'},
            'onok': function(){
                //location = url + "?id=" + id;
                $.getJSON(url,{id : id},function (res) {
                    if (res.success == 1) {

                        func();
                    } else {
                        showError(res.error);
                    }
                });
            }
        }).show()
}
/**
 * 提交跳转
 * @param type  1:当前页  2:列表页
 */
function postRedirect(type) {
    type = type || 1;
    if (type == 1) {
        window.location.reload();
    } else if (type == 2) {
        window.history.go(-1);
    }
}
/**
 * 设置模板
 * @param name  名称
 * @param textObjId  要复制的控件id
 */
function setTpl(name, textObjId) {
    $('#' + textObjId).val(name);
}