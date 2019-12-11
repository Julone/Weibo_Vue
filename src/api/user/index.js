import request from './../request'
export * from './follow';
export * from './menu';
import {Encrypt} from './../../utils/Aes'

export function getUserInfo({user_id} = {}){
    return request({
        url:'/api/user/info/get',
        method:'get',
        params:{
            user_id
        }
    })
}
export function changeBasicUserInfo({user_name,user_icon,user_sex,user_birth,user_introduce,user_locate}){
    return request({
        url:'/api/user/setInfo',
        method:'post',
        data:{user_name,user_icon,user_sex,user_birth,user_introduce,user_locate},
    })
}
export function changeUserPassword({ old_pass,new_pass }){
    return request({
        url:'/api/user/setPassword',
        method:'post',
        data:{ old_pass:Encrypt(old_pass),new_pass:Encrypt(new_pass) },
        headers:{
            showSuccess:true
        }
    })
}

export function getUserFeed({user_id,page_id,page_count,req_time} = {}){
    return request({
        url:'/api/user/get/' + user_id,
        method:'get',
        params:{
            page_id,
            page_count,
            req_time
        },
        data:{

        }
    })
}

export function upload_head_icon({data}){
    return request({
        url:'/api/user/head/icon/set',
        data:{
            data
        },
        method:'post'
    })
}

