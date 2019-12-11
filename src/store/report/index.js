import {
    setStorage,
    getStorage,
    delStorage
} from './../../utils/storage'
import router from './../../router/index'
import {
    Encrypt
} from './../../utils/Aes'
import {
    sendReport
} from '@/api/feed/report'
export default {
    state: {
        report_status: false,
        say_id: '',
        to_user_id: '',
        form_type:'',
        textarea:''
    },
    actions: {
        reportFeed({ commit, state, dispatch }, { report_type, report_reason } = {}) {
            // console.log(sendReport);
            sendReport({
                say_id: state.say_id,
                to_user_id:state.to_user_id,
                report_type,
                report_reason
            }).then(r=>{
                // console.log(r);
                dispatch('closeReport');
            })
        },
        openReport({state},{say_id,to_user_id}){
            state.report_status = true;
            state.say_id = say_id
            state.to_user_id = to_user_id;
        },
        closeReport({state}){
            state.report_status = false;
        },
 
    },
    mutations: {
        setTextarea(state,val){
            state.textarea = val;
        },
        setFormType(state,val){
            state.form_type = val;
        },
        


    }
}