export default {
    token:state=>{
      return state.login.token
    },
    user_info:state =>{
      return state.user.user_info
    },
    user_icon:state =>{
      return state.user.user_info.user_icon
    },
    user_id:state => {
        return state.user.user_info.user_id
    },
    user_name:state => {
        return state.user.user_info.user_name
    }
  }