import request from './../request'
export function getUserInfo({user_id} = {}){
    return request({
        url:'/api/user/info/get',
        method:'get',
        params:{
            user_id
        }
    })
}
export function changeBasicUserInfo({user_name,user_icon,user_sex,user_birth,user_introduce}){
    return request({
        url:'/api/user/setInfo',
        method:'post',
        data:{user_name,user_icon,user_sex,user_birth,user_introduce},
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
export function set_follow_user({follow_id}){
    return request({
        url:'/api/user/follow/set',
        data:{
            follow_id
        },
        method:'post'
    })
}
export function unset_follow_user({follow_id}){
    return request({
        url:'/api/user/follow/unset',
        data:{
            follow_id
        },
        method:'post'
    })
}