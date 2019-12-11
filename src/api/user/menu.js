import request from './../request';
export function get_user_menu({}={}){
    return request({
        url:'/api/menu/get',
        method:'get'
    })
}