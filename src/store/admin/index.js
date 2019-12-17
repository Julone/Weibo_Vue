import { setStorage, getStorage, delStorage } from './../../utils/storage'
import router from './../../router/index'
import jM from './../../global/MyElementUI/Message'
import { Encrypt } from './../../utils/Aes'
import { userinfo_get, setUserStatus } from './../../views/Admin/api'
export default {
    state: {
        refresh: Date.now(),
        show_user_dialog: false,
        user_id: '',
        user_data: {
            user_name: '',
            user_silent: '',
            user_banned: '',
            deleted: '',
            user_vip: '',
        }
    },
    actions: {
        admin_refresh({ commit, dispatch }) {
            commit('setRefresh', Date.now());
        },
        admin_show_user_dialog({ commit, state }, user_id) {
            commit('setUserDialog', true);
            state.user_id = user_id;
            userinfo_get({ user_id: state.user_id })
                .then(r => {
                    if (r.data.code == 200) {
                        var { user_name, user_silent, user_banned, deleted, user_vip } = r.data.data[0];

                        commit('setUserData_admin', { user_name, deleted, user_vip });
                        commit('setUserData_admin',{ 
                            user_silent: (user_silent || '').split(',').map(el=>Number(el))
                        });
                        commit('setUserData_admin',{
                            user_banned: (user_banned || '').split(',').map(el=>Number(el))
                        });
                    }
                })
        },
        admin_hide_user_dialog({ commit }) {
            commit('setUserDialog', false);
        },
        admin_user_submit({ state,commit }){
            var data = {user_id:state.user_id,...state.user_data};
            setUserStatus(data).then(r=>{
                r.data.code == 200&& jM.success(r.data.msg);
            })
            commit('setUserDialog',false);
        }
    },
    mutations: {
        setRefresh(state, value) {
            state.refresh = value;
        },
        setUserDialog(state, value) {
            state.show_user_dialog = value;
        },
        setUserData_admin(state, obj) {
            console.log(state,obj);
            state.user_data = Object.assign(state.user_data, obj);
        },
    }
}