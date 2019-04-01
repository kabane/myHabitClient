export const Mixin =  {
    methods:{
      isAuthorized() {
        if (!document.cookie) return false 
        var cookiesObj = {};
        var cookies_str = document.cookie.split('; ');
        for(var i=0;i<cookies_str.length;i++){
          var data = cookies_str[i].split('=');
          cookiesObj[data[0]] = decodeURIComponent(data[1])
        }
      
        return cookiesObj.hasOwnProperty('token') && typeof (cookiesObj['token']) == "string"
      }
    }
  }