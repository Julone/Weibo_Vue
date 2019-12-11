import request from './../request'
import MD5 from '@/utils/md5.js'
export function trans({q}){
    var appid = '20190903000331619';
    var key = 'SMoUpRCs1MbLhzXlNZxd';
    var salt = (new Date).getTime();
    var query = q;
    var from = 'auto';
    var to = 'zh';
    var str1 = appid + query + salt +key;
    var sign = MD5(str1);
    return request({
        url:'/baidu_api/trans/vip/translate',
        params:{
            q:query,
            from:from,
            to:to,
            appid:appid,
            salt:salt,
            sign:sign
        },
        method:'post',
        headers:{
            showError:false,
            showProgress:false
        }
    })
    
}