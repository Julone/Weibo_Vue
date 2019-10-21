import {
    setStorage,
    getStorage,
    delStorage
} from './../../utils/storage'

export default {
    state: {
        user_info: getStorage({
            name: 'user_info'
        }) || {},
    },
    actions: {
      
    },
    mutations: {
        setUserInfo(state, { user_id, user_name, user_icon }) {
            var content =  { user_id, user_name, user_icon }
            setStorage({ name: 'user_info', content: content });
            state.user_info = content;
        },

    }

}