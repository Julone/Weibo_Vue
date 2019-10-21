import {setStorage,getStorage,delStorage} from './../../utils/storage'
import router from './../../router/index'
export default {
    state:{
        token: getStorage({name:'token'}) || "",
        strictVerify:getStorage({name:'strictVerify',type:'session'}) || false
    },
    actions:{
        login({commit},params = {}){
            commit('setTokenToLocal',params);
            commit('setUserInfo',params);
            router.push({path:'/'})
        },
        TokenExit({commit}){
            commit('setTokenToLocal',{});
            commit('setUserInfo',{});
            router.push({name:'login'})
        },
        logout({commit,dispatch}){
            dispatch('TokenExit');
        }
    },
    mutations:{
        setTokenToLocal(state,{token = ''}){
            setStorage({name:'token',content:token } )
            state.token = token;
        },
        setStrictVerify(state,val){
            setStorage({ name:'strictVerify',content:val,type:'session' })
            state.strictVerify = val;
        }

    }





}