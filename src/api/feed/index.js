import request from './../request'
export * from './topic'
export * from './favor'
export function get_feed({page_id=1,page_count = 6,req_time} = {}){
    return request({
        method:'get',
        url:'/api/feed/get',
        params:{
            page_count,
            page_id,
            req_time
        }
    })
}
export function test_word({say_text}){
    return request({
        method:'post',
        url:'/api/feed/test_word',
        data:{
            say_text
        },
        headers:{
            showProgress:false
        }
    })
}

export function send_feed({say_text,say_img}){
    return request({
        method:'post',
        url:'/api/feed/send',
        data:{
            say_text,say_img
        },
        headers:{
            showSuccess:true
        }
    })
}
export function send_repost({repost_text,repost_from_id,repost_original_id}){
    return request({
        method:'post',
        url:'/api/feed/repost',
        data:{
            repost_text,
            repost_from_id,
            repost_original_id
        }
    })
}
export function get_comment({say_id,page_id,page_count}){
    return request({
        method:'get',
        url:'/api/feed/comment/get',
        params:{say_id,page_id,page_count}
    })
}

export function send_comment({say_id,to_user_id,reply_text,origin_id = "",parent_id ="",type="com"}){
    return request({
        method:'post',
        url:'/api/feed/comment',
        data:{say_id,to_user_id,reply_text,origin_id,parent_id,type}
    })
}

export function del_feed({say_id}){
    return request({
        method:'delete',
        url:'/api/feed/delete',
        data:{say_id}
    })
}


export function del_comment({com_id}){
    return request({
        method:'delete',
        url:'/api/feed/comment/delete',
        data:{com_id}
    })
}

export function set_like({say_id}){
    return request({
        method:'post',
        url:'/api/feed/like/set',
        data:{say_id}
    })
}

export function unset_like({say_id}){
    return request({
        method:'post',
        url:'/api/feed/like/unset',
        data:{say_id}
    })
}
export function set_top({id}){
    return request({
        method:'post',
        url:'/api/feed/top/set',
        data:{id}
    })
}

export function unset_top({id}){
    return request({
        method:'post',
        url:'/api/feed/top/unset',
        data:{id}
    })
}

export function get_follow_feed({page_id=1,page_count = 6,req_time} ={}){
    return request({
        method:'get',
        url:'/api/feed/follow/get',
        params:{
            page_count,
            page_id,
            req_time
        }
    })
}

export function get_feed_by_id({page_id=1,page_count = 6,req_time = '',ids} ={}){
    return request({
        method:'get',
        url:'/api/feed/detail/get',
        params:{
            page_count,
            page_id,
            req_time,
            ids
        }
    })
}


export function get_repost_list({page_id=1,page_count = 6,req_time = '',ids} ={}){
    return request({
        method:'get',
        url:'/api/feed/repost/list/get',
        params:{
            page_count,
            page_id,
            req_time,
            ids
        }
    })
}