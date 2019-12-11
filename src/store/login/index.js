import {setStorage,getStorage,delStorage} from './../../utils/storage'
import router from './../../router/index'
import jM from './../../global/MyElementUI/Message'
import {Encrypt} from './../../utils/Aes'
export default {
    state:{
        token: getStorage({name:'token'}) || "",
        strictVerify:getStorage({name:'strictVerify',type:'session'}) || false,
        accountList:getStorage({name:'accountList'}) || {}
    },
    actions:{
        loginSuccess({commit,dispatch},{data,form} = {}){
            dispatch('getMenu');
            commit('setTokenToLocal',data);
            commit('setUserInfo',data);
            commit('addAccountList',form);
            router.push({name:'home'})
        },

        TokenExit({commit,dispatch}){
            commit('setTokenToLocal',{});
            commit('setUserInfo',{});
            dispatch("getMenu");
            router.push({name:'login'})
        },
        logout({commit,dispatch}){
            dispatch('TokenExit');
            jM.success('注销成功');
        },
        reLogin({dispatch}){
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
        },
        addAccountList(state,{usermail,userpass,remember = false}){
            state.accountList[usermail] = {
                usermail,remember,
                userpass:remember?Encrypt(userpass):'',
                login_time:Date.now()
            }
            setStorage({name:'accountList',content: state.accountList })
        }

    }





}