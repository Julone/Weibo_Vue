import {
    setStorage,
    getStorage,
    delStorage
} from './../../utils/storage';
import router from '@/router';
import f from './follow'

export default {
    state: {
        user_info: getStorage({
            name: 'user_info'
        }) || {},
        ...f.state
    },
    actions: {
        ...f.actions,
        toUserFollowView({}, user_id) {
            router.push({
                name: 'user_follow',
                query: {
                    user_id
                }
            });
        },
        toUserFansView({}, user_id) {
            router.push({
                name: 'user_fans',
                query: {
                    user_id
                }
            });
        },
        toUserCenterView({},user_id){
            router.push({
                name: 'user_center',
                params: {
                    user_id
                }
            });
        }
    },
    mutations: {
        setUserInfo(state, {
            user_id,
            user_name,
            user_icon
        }) {
            var content = {
                user_id,
                user_name,
                user_icon
            }
            setStorage({
                name: 'user_info',
                content: content
            });
            state.user_info = content;
        },

    }

}