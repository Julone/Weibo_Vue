import request from '@/api/request'
export function sendReport({say_id,to_user_id,report_type,report_reason}){
    return request({
        url:'/api/feed/report/send',
        method:'post',
        data:{
            say_id,
            to_user_id,
            report_type,
            report_reason
        }
    })

}