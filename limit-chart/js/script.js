$(function(){
	limitChartLen();
});

// ===========================

// 限制字符字数 底层标签类名以'limit-font + 限制字数数'作为钩子
function limitChartLen(normalLen) {
	// 为每个类名中存在limit-chart的字段处理
	$("[class*='limit-chart']").each(function() {
		// 获取对象所有class的数组
		var eles = $(this).prop("className").split(" "), 
		    num = " ",
		    maxWidth = 0,
		    tit = $(this).text();	
		    
	  for(var i=0, len=eles.length; i<len; i++) {
	  	// 只取以'limit-chart'开头的className
	   	var reg = /^limit\-chart\d*$/; 
	   	if(reg.test(eles[i])) {
	   		// [^0-9]匹配除数字外所有， 只保留该className中的数字
	   		num = eles[i].replace(/[^0-9]/ig,""); 
	   		break;
	   	}
	  }

		// 长度限制定制优先级： 类名》》函数传参》》默认值
		maxWidth = num || normalLen || 12;
		
		if(tit.length > maxWidth) {
			// 添加title属性
			if(typeof($(this).prop("title")) == "undefined"){ 
				$(this).prop("title", tit);
			}
			// 去掉首尾空白符,切割长度
			tit = $.trim(tit).substring(0, maxWidth); 
			$(this).text(tit+'…');	
		} else {
			return false;
		}
	});
};