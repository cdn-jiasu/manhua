 $(function() {
       $(".reader-copy-modal").find(".dialog-button").click(function(){
       		var clipboard = new ClipboardJS('.dialog-button');
		    clipboard.on('success', function(e) {
		        $('.dialog').hide();
		        $('.dialog-backdrop').removeClass('backdrop-in');
		        layer.msg("链接已复制到粘贴板");
		    });

		    clipboard.on('error', function(e) {
		        console.log(e);
		    });
       })

       $(".actions-backdrop").click(function(){
       		$('.actions-backdrop').removeClass('backdrop-in');
       		$('.actions-modal').hide();
       		$('.md').removeClass('with-modal-actions');
            $('body').removeClass('reading');
       })

       $(".panel-backdrop").click(function(){
       		$('.panel').removeClass('panel-active');
       		$('.panel').hide();
       		$('html').removeClass('with-panel').removeClass('with-panel-right-reveal').removeClass('with-panel-left-reveal');
       })

       $(".popover-backdrop").click(function(){
       		$('.popover-backdrop').removeClass('backdrop-in');
       		$('.popover-backdrop').hide();
       		$('.popover').remove();
       })




    });

//初始化toast 
window.toast = new auiToast({});
//初始化对话框 
window.dialog = new auiDialog({});

//加载框 
function showLoadingToast(msg, durion, callback) {
	if (durion == undefined) durion = 6000;
	window.toast.loading({
		title: msg,
		duration: durion
	},
	function(ret) {
		setTimeout(function() {
			window.toast.hide();
		},
		durion);
		if (callback) callback(ret);
	});
}

function fab(mid){
    $('.actions-backdrop').addClass('backdrop-in');
    var addItem = $('#bookActions').clone(true).attr('id', 'bookActions-'+mid);
    $("#actions-"+mid).remove();
    $('.actions-backdrop').after(addItem);
    $("#bookActions-"+mid).addClass('modal-in').show();
}

function actions(mid){
    $('.actions-backdrop').addClass('backdrop-in');
    var addItem = $('#actions').clone(true).attr('id', 'actions-'+mid);
    $('.actions-backdrop').after(addItem);
    $("#actions-"+mid).addClass('modal-in').show();
}

function pannelr(){
        $('.panel-right').addClass('panel-active').show();
        $('html').addClass('with-panel').addClass('with-panel-right-reveal');
    }



 function toastMsg(msg){
 	$('.toast').find('.toast-text').html(msg);
 	$(".toast").addClass('modal-in').addClass('toast-center');
 	setTimeout(function() {
	 	$(".toast").removeClass('modal-in').removeClass('toast-center');
	 }, 1500);
 }

function showFailToast(msg) {
	window.toast.hide();
	window.toast.fail({
		title: msg,
		duration: 2000
	});
}
//显示成功的吐司 
function showSuccToast(msg) {
	window.toast.hide();
	window.toast.success({
		title: msg,
		duration: 2000
	});
}
