import request from '@/api/request'

export function get_topic_list({q = ''} = {}){
    return request({
        method:'get',
        url:'/api/feed/topic/get',
        params:{
            q
        },
        headers:{
            showProgress:false
        }
    })
}
