let Cookie = {
	getCookie: (key) => {
      var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
        return keyValue ? keyValue[2] : null;
    },
    setCookie: (key, value) => {
    	const date = new Date();
        date.setHours(date.getHours() + 24*365*2);
    	document.cookie = `${key}=${value};expires=${date.toGMTString()};path=/`;
    },
    deleteCookie: (name) => {
    	document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
    }
}

export default Cookie;