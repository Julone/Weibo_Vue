import request from "./../request";
export {
    get_topic_list
}
from '@/api/feed/topic'
export function get_hot({
    sort = 'count_count',
    req_time,
    page_id,
    page_count
} = {}) {
    return request({
        url: '/api/explore/hot',
        method: 'get',
        params: {
            sort,
            req_time,
            page_id,
            page_count
        },
        headers: {
            showProgress: false
        }
    })
}
export function get_users({
    user_name
}) {
    return request({
        url: '/api/explore/name',
        method: 'get',
        params: {
            user_name
        },
        headers: {
            showProgress: false
        }
    })
}
export function search_feed({
    q,
    page_id,
    page_count,
    req_time
}) {
    return request({
        url: '/api/explore/search_feed',
        method: 'get',
        params: {
            q,page_id,
            page_count,
            req_time
        }
    })
}
export function topic_click({id}){
   return request({
        url:'/api/feed/topic/click',
        method:'get',
        params:{id}
   })
}
export function search_user({
    q,
    page_id,
    page_count,
    req_time
}) {
    return request({
        url: '/api/explore/search_user',
        method: 'get',
        params: {
            q,
            page_id,
            page_count,
            req_time
        }
    })
}