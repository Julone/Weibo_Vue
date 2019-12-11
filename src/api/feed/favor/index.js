import request from '@/api/request'

export function set_favor({say_id} = {}){
    return request({
        url:'/api/feed/favor/set',
        method:'post',
        data:{
            say_id
        }
    })
}
export function unset_favor({say_id} = {}){
    return request({

        url:'/api/feed/favor/unset',
        method:'post',
        data:{
            say_id
        }
    })
}
export function get_favor_list({page_id=1,page_count = 6,req_time} = {}){
    return request({
        method:'get',
        url:'/api/feed/favor/get',
        params:{
            page_count,
            page_id,
            req_time
        }
    })
}