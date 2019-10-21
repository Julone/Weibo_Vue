export default {
    install(Vue) {
        Vue.filter('timerify', function (val) {
            return setTime(val)
        }),
        Vue.filter('addFace',function(params){
            return params.replace(/«[a-zA-Z]{1,5}_56»/g, function (express) {
                return express.replace(/«/, `<img src='/api/face/`).replace(/»/,
                    ".gif'>")
            })
        })
        Vue.filter('removeFace',function(params){
            return params.replace(/<img src=\"[^>]{0,}face\//g, "«").replace(/.gif\">/g, "»")
        })
        Vue.filter('shortTime',function(time){
            var currentTime = Date.parse(new Date());
            var dateTime = time;
            var d_day = Date.parse(new Date(dateTime.replace(/-/g, "/"))) || time;
            var day = Math.abs(parseInt((d_day - currentTime) / 1000 / 3600 / 24));
            var hour = Math.abs(parseInt((d_day - currentTime) / 1000 / 3600));
            var minutes = Math.abs(parseInt((d_day - currentTime) / 1000 / 60));
            var seconds = Math.abs(parseInt((d_day - currentTime) / 1000));
            if (day > 367) {
                return parseInt(day / 365) + "年前".toString();
            } else if (day > 31) {
                return parseInt(day / 30) + "月前".toString();
            } else if (day >= 2) {
                return parseInt(day) + "天前".toString();
            } else if (day > 0 && day < 2) {
                return "昨天".toString();
            } else if (hour > 0 && hour < 24) {
                return parseInt(hour) + "小时前".toString();
            } else if (minutes > 0 && minutes < 60) {
                return parseInt(minutes) + "分钟前".toString();
            } else if (seconds >= 0 && seconds < 60) {
                return parseInt(seconds) + "秒前".toString();
            }
        })
    }
}