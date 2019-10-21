import request from './../request'

export function login ({ usermail,userpass,captcha }){
    return request({
        method:'post',
        url:'/api/verify/login',
        data:{
            usermail,
            userpass,
            captcha
        }
    })
}

export function sendCap({usermail}){
    return request({
        method:'post',
        url:'/api/verify/sendEmailCap',
        params:{
            usermail:usermail,
        }
    })
}

export function register({usermail,code,userpass,username}){
    return request({
        method:'post',
        url:'/api/verify/register',
        data:{
            code,
            usermail,
            userpass,
            username
        }
    })
}