/**
 * Seven 取名自seven team
 * 提供简单操作cookie的函数
 */
;(function(){
	window.Seven = window.Seven || {};
	
	function decode(value){
		return decodeURIComponent(value);
	}
	function encode(value){
		return encodeURIComponent(value);
	}
	
	/**
	 * 
	 * @param {Object} key
	 * @param {Object} value
	 * @param {Object} option 
	 *   {
	 * 	    expires:  // type, Date || Number  
	 *   }
	 */
	Seven.cookie = function(key, value, option){
		var t, days, items, cookies,
			i, len,
			item,
			result;
		
		// 参数大于1个时，设置cookie
		if(arguments.length > 1){
			option = option || {};
			
			if(typeof option.expires === "number"){
				days = option.expires;
				t = option.expires = new Date();
				t.setTime(+t + days*864e+5);// 86400000毫秒 ; +t, 把Date对象转成number类型的值;
			}
			items = [
				encode(key), "=", encode(value),
				option.expires ? "; expires=" + option.expires.toUTCString() : '',
				option.path ? "; path=" + path : '',
				option.domain ? "; domain=" + domain : '',
				option.secure ? "; secure" : ''
			].join('');
			
			return document.cookie = items;
		}
		
		//
		cookies = document.cookie ? document.cookie.split("; ") : [];
		for(i = 0, len = cookies.length; i < len; i++){
			item = cookies[i].split("=");
			if(key && key == decode(item[0])){
				result = decode(item[1]);
				break;
			}
		}
		
		return result;
	}
	
	Seven.deleteCookie = function(key){
		if(Seven.cookie(key) === undefined){
			return false;
		}
		
		Seven.cookie(key, "", {expires: -1});
		
		return !Seven.cookie(key); // 删除成功与否
	}
	
})();
