export default {
    state:{
        image_arr: [],
        index: 0,
        show_status: false
    },
    actions:{
        openImageSwiper({commit},{image_arr = [],index = 0} = {}){
            console.log(arguments);
            commit('setImageArr',image_arr);
            commit('setIndex',index);
            commit('setStatus',true);
        },
        closeImageSwiper({commit}){
            commit('setStatus',false);
        },
    },
    mutations:{
        setImageArr(state,arr){
            state.image_arr = arr;
        },
        setIndex(state,i){
            state.index = i;
        },
        setStatus(state,bool){
            state.show_status = bool;
        }

    }
}