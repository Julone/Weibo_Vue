import {checkUserName} from '@/api/login'
export function captcha(rule, value, callback){
    if (value.toString().length != 4) {
        callback(new Error('请输入4位验证码'));
    } 
    if(/^[\D]{1,4}$/.test(value)){
        callback(new Error('请不要输入字母'));
    }
    callback();   
}
export function userpass(rule, value, callback){
    if(!value){
        callback(new Error('请输入密码'))
    }
    if (value.length < 6 || value.length > 40) {
        callback(new Error('密码长度应该在 6 ~ 40之间'));
    }
    if(!/^[0-9a-zA-Z_]{6,40}$/.test(value)){
        callback(new Error('密码只允许包含数字,字母,少数符号'));
    }
    callback();
}
export function userpass2(orginalValue,calc='===',tip){
    return function(rule, value, callback){
        console.dir(orginalValue + calc + value);
        if(eval(`'${orginalValue}'${calc}'${value}'`)){
            callback(tip)
        }
        callback();
    }
}
export function usermail(rule, value, callback){
    if(!value){
        callback(new Error('请输入用户邮箱'))
    }
    if(!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)){
        callback(new Error('用户邮箱格式不正确'))
    }
    if (value.length < 6 || value.length > 40) {
        callback(new Error('长度应该在 6 ~ 40之间'));
    }
    callback();
}

export function usermailcap(rule,value,callback){
    if(!value){
        callback(new Error('请输入验证码'))
    }
    if (value.length != 6) {
        callback(new Error('验证码的长度为6位'));
    }
    callback();
}

export async function username(rule,value,callback){
    if(!value){
        callback(new Error('请输入用户昵称'))
    }else{
        var rs = await checkUserName({user_name:value});
        if(rs.data.code == 200) {
            callback()
        }else{
            callback(new Error(rs.data.msg));
        }
    }
}
