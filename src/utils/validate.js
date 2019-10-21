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
        callback(new Error('请输入用户密码'))
    }
    if (value.length < 6 || value.length > 40) {
        callback(new Error('密码长度应该在 6 ~ 40之间'));
    }
    if(!/^[0-9a-zA-Z_]{6,40}$/.test(value)){
        callback(new Error('密码只允许包含数字,字母,少数符号'));
    }
    callback();
}
export function usermail(rule, value, callback){
    if(!value){
        callback(new Error('请输入用户邮箱'))
    }
    if (value.length < 6 || value.length > 40) {
        callback(new Error('长度应该在 6 ~ 40之间'));
    }
    callback();
}

export function usermailcap(rule,value,callback){
    if(!value){
        callback(new Error('请输入邮箱验证码'))
    }
    if (value.length != 6) {
        callback(new Error('邮箱验证码的长度为6位'));
    }
    callback();
}

export function username(rule,value,callback){
    if(!value){
        callback(new Error('请输入用户昵称'))
    }
    if (value.toString().trim().length < 1) {
        callback(new Error('用户昵称应该大于1个字符'));
    }
    callback();
}
