import request from './../request';
import store from '@/store';
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
export function get_follow_list({user_id,req_time,page_id,page_count}){
    return request({
        url: '/api/user/follow/list',
        method:'get',
        params:{
            user_id,
            req_time,
            page_id,
            page_count,

        }
    })
}
export function get_fans_list({user_id,req_time,page_id,page_count}){
    return request({
        url: '/api/user/fans/list',
        method:'get',
        params:{
            user_id,
            req_time,
            page_id,
            page_count,
        }
    })
}