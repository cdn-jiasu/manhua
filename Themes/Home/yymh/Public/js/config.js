window.rootPath = '';
//初始化toast 
window.toast = new auiToast({});
//初始化对话框 
window.dialog = new auiDialog({});
//包裹图片 
template.defaults.imports.warpImgUrl = warpImg;
//获取第一个值 
template.defaults.imports.getFirstItem = getFirstItem;
//截取字符串 
template.defaults.imports.substr = function(str, begin, end) {
	return str.substr(begin, end);
};
//字符串省略 
template.defaults.imports.textEllipsis = function(str, count) {
	if (str.length <= count) return str;
	return str.substr(0, count) + "...";
};
//显示文章状态 
template.defaults.imports.showArticleStatus = function(value) {
	if (value != null && value != undefined && value.is_done != undefined && value.last_chapter_title != undefined) {
		return value.is_done ? "完结": "最新: " + getFirstItem(value.last_chapter_title, " ");
	} else return "连载中";
};
//base64 
function Base64() {
	// private property 
	_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	// public method for encoding 
	this.encode = function(input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
		input = _utf8_encode(input);
		while (i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
			output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
		}
		return output;
	}
	// public method for decoding 
	this.decode = function(input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		while (i < input.length) {
			enc1 = _keyStr.indexOf(input.charAt(i++));
			enc2 = _keyStr.indexOf(input.charAt(i++));
			enc3 = _keyStr.indexOf(input.charAt(i++));
			enc4 = _keyStr.indexOf(input.charAt(i++));
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
			output = output + String.fromCharCode(chr1);
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
		}
		output = _utf8_decode(output);
		return output;
	}
	// private method for UTF-8 encoding
	_utf8_encode = function(string) {
		string = string.replace(/\r\n/g, "\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
		}
		return utftext;
	}
	// private method for UTF-8 decoding
	_utf8_decode = function(utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
		while (i < utftext.length) {
			c = utftext.charCodeAt(i);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if ((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i + 1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = utftext.charCodeAt(i + 1);
				c3 = utftext.charCodeAt(i + 2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
	}
}
var base64 = new Base64();
//包裹图片 
function warpImg(url) {
	if (!url) return '';
	if (url.indexOf('http') >= 0) return url;
	var imgSrv = 'http://img.9icph.cn';
	var imgCacheUrl = '';
	if (imgSrv != null && imgSrv !== '') {
		var imgUrl = imgSrv + url;
		//不存在缓存地址则返回直接地址 
		if (imgCacheUrl != '') {
			imgUrl = base64.encode(imgUrl);
			return imgCacheUrl + encodeURI(imgUrl);
		} else return imgUrl;
	}
	return window.rootPath + url;
}
//包裹url 
function warpUrl(url) {
	if (!url) return '';
	if (url.indexOf('http') >= 0) return url;
	return window.rootPath + url;
}
//获取第一个值 
function getFirstItem(str, label) {
	if (!str) return '';
	var pos = str.indexOf(label);
	if (pos >= 0) return str.substr(0, pos);
	return str;
}
//初始化图片懒加载 
function initImgLazyLoad(errImg) {
	if (errImg == undefined) errImg = '/static/aui/theme/image/error-img.png';
	return new auiLazyload({
		errorImage: errImg
	});
}
//初始化按钮组 
function initBarBtn() {
	var index = $('.aui-bar-btn').attr('data-index');
	var tab = new auiTab({
		element: $('.aui-bar-btn')[0],
		index: index,
		repeatClick: true
	},
	function(ret) {
		var url = $(ret.dom).attr('data-url');
		location.href = url;
	});
}
//app中心 
var appCenter = {
	//基础url 
	baseUrl: '',
	//显示错误的吐司 
	showFailToast: function(msg) {
		window.toast.hide();
		window.toast.fail({
			title: msg,
			duration: 2000
		});
	},
	//显示成功的吐司 
	showSuccToast: function(msg) {
		window.toast.hide();
		window.toast.success({
			title: msg,
			duration: 2000
		});
	},
	//加载框 
	showLoadingToast: function(msg, durion, callback) {
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
	},
	//校验json 
	validateJson: function(data) {
		if (data == null || data == undefined) {
			this.showFailToast('返回数据错误');
			return false;
		}
		if (!data.succ) {
			this.showFailToast(data.msg);
			return false;
		}
		return true;
	},
	//get请求 
	doGet: function(url, callback) {
		$.ajax({
			url: this.baseUrl + url,
			type: "GET",
			dataType: "json",
			//指定服务器返回的数据类型 
			success: function(data) {
				if (appCenter.validateJson(data)) callback(data);
			},
			error: function() {
				appCenter.showFailToast('请求失败');
			}
		});
	},
	//获取banner数据 
	doGetBannerData: function(callback) {
		this.doGet('api/banner',
		function(data) {
			callback(data.result);
		});
	},
	//获取首页数据 
	doGetRecommentData: function(callback) {
		this.doGet('/home/api/recommend',
		function(data) {
			callback(data.result);
		});
	},
	//获取书架数据 
	doGetFavoriteData: function(cate, page, callback) {
		this.doGet('/home/api/favorite/tp/' + cate + '-' + page,
		function(data) {
			callback(data.result);
		});
	},
	//获取排行榜数据 
	doGetRankData: function(cate, callback) {
		this.doGet('/home/api/rank/type/' + cate,
		function(data) {
			callback(data.result);
		});
	},
	//获取分类数据 
	doGetCateData: function(cate, tag, done, order, page, callback) {
		this.doGet('/home/api/cate/tp/' + cate + "-" + tag + "-" + done + "-" + order + "-" + page,
		function(data) {
			callback(data.result);
		});
	},
	//获取章节列表 
	doGetChpaterList: function(aid, order, pageNo, pageSize, callback) {
		// alert(11);
		this.doGet('/home/api/chapter_list/tp/' + aid + "-" + order + "-" + pageNo + "-" + pageSize,
		function(data) {
			callback(data.result);
		});
	},
	//获取章节列表 
	doSearch: function(key,type, pageNo, callback) {
		this.doGet('/home/api/searchk?keyword=' + key +'&type='+type + '&pageNo=' + pageNo,
		function(data) {
			callback(data.result);
		});
	},
	//获取章节列表 
	doSearchKey: function(key,type, pageNo, callback) {
		this.doGet('/home/api/searchk?key=' + key +'&type='+type + '&pageNo=' + pageNo,
		function(data) {
			callback(data.result);
		});
	},
	//修改密码 
	doChangePwd: function(oldPwd, newPwd, callback) {
		this.doGet('../api/chang_userpwd?action=oldpwd&oldpwd=' + oldPwd + '&newpwd=' + newPwd,
		function(data) {
			callback(data.result);
		});
	},
	//短信验证码修改密码 
	doSmsCodeChangePwd: function(cellphone, smscode, newPwd, callback) {
		this.doGet('../api/chang_userpwd?action=smscode&mobile=' + cellphone + '&smscode=' + smscode + '&newpwd=' + newPwd,
		function(data) {
			callback(data.result);
		});
	},
	//根据订单号获取用户 
	doFindUserByOrder: function(order, callback) {
		this.doGet('../api/find_user?order_no=' + order,
		function(data) {
			callback(data.result);
		});
	}
};