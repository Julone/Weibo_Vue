import {get_user_menu} from '@/api/user'
import router from '@/router';
import allRoutes, {error,login,home} from '@/router/shared/routes.js';
export default {
    computeWindow({state,commit,dispatch}){
        commit('setWinHeight',window.innerHeight);
        commit('setWinWidth',window.innerWidth);
        console.log('window的宽高' + state.winWidth + ": " + state.winHeight);
    },
    getMenu({state,commit,dispatch}){
        get_user_menu().then(r=>{
            var {login_status,data: userRoutes} = r.data;
            commit('setUserMenu',userRoutes)
            commit('setLoginStatus',login_status);
            var part = allRoutes.filter(el=>{
                return userRoutes.some(element => element.module == el.module);
            })
            return [...part,login,error];
        })
        .catch(e=>{
            return [home,login,error];
        })
        .then(routes=>{
            console.log(routes);
            router.addRoutes(routes)
        })
    },
    appInit({dispatch}){
        dispatch('getMenu');
        dispatch('computeWindow');
    }

}