import {set_follow_user,unset_follow_user} from '@/api/user'
export default {
    state:{

    },
    actions:{
        set_follow_user({},val){
            return set_follow_user({follow_id:val})
        },
        unset_follow_user({},val){
            return unset_follow_user({follow_id:val})
        }
    }


}