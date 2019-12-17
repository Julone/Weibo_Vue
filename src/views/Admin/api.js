import request from '@/api/request';
import {del_feed,del_comment} from '@/api/feed/index'
export function weibo_get({page_count,page_id,q}){
    return request({
        url:  '/api/admin/weibo/get',
        method:'get',
        params:{page_count,page_id,q}
    })
}
export function reply_get({page_count,page_id,q}){
    return request({
        url:  '/api/admin/reply/get',
        method:'get',
        params:{page_count,page_id,q}
    })
}
export function report_get({page_count,page_id,q}){
    return request({
        url:  '/api/admin/report/get',
        method:'get',
        params:{page_count,page_id,q}
    })
}
export function topic_get({page_count,page_id,q}){
    return request({
        url:  '/api/admin/topic/get',
        method:'get',
        params:{page_count,page_id,q}
    })
}
export function users_get({page_count,page_id,q}){
    return request({
        url:  '/api/admin/users/get',
        method:'get',
        params:{page_count,page_id,q}
    })
}
//删除
export const weibo_del = del_feed;
export const reply_del = del_comment;
export function topic_del({id}){
    return request({
        url:  '/api/admin/topic/delete',
        method:'post',
        data:{id}
    })
}
export function topic_add({topic_name,topic_type='默认'}){
    return request({
        url:  '/api/admin/topic/add',
        method:'post',
        data:{topic_name,topic_type}
    })
}
//恢复
export function weibo_rec({say_id}){
    return request({
        url: '/api/admin/weibo/recover',
        method:'post',
        data:{say_id}
    })
}
export function reply_rec({com_id}){
    return request({
        url: '/api/admin/reply/recover',
        method:'post',
        data:{com_id}
    })
}
export function topic_rec({id}){
    return request({
        url: '/api/admin/topic/recover',
        method:'post',
        data:{id}
    })
}
//report
export function report_handled({id_arr =[]}){
    return request({
        url: '/api/admin/report/handled',
        method:'post',
        data:{id_arr}
    })
}
export function setUserStatus(data){
    return request({
        url: '/api/admin/user/status',
        method:'post',
        data: data
    })
}
//获取个人用户
export function userinfo_get({user_id}){
    return request({
        url:'/api/user/info/get',
        method:'get',
        params:{user_id}
    })
}
