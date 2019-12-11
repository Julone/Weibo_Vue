import request from '@/api/request';
import {del_feed,del_comment} from '@/api/feed/index'
export function weibo_get({page_count,page_id}){
    return request({
        url:  '/api/admin/weibo/get',
        method:'get',
        params:{page_count,page_id}
    })
}
export function reply_get({page_count,page_id}){
    return request({
        url:  '/api/admin/reply/get',
        method:'get',
        params:{page_count,page_id}
    })
}
export function report_get({page_count,page_id}){
    return request({
        url:  '/api/admin/report/get',
        method:'get',
        params:{page_count,page_id}
    })
}
//删除
export const weibo_del = del_feed;
export const reply_del = del_comment;
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
//report
export function report_handled({id_arr =[]}){
    return request({
        url: '/api/admin/report/handled',
        method:'post',
        data:{id_arr}
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