import NProgress from 'nprogress' // progress bar
import jMessage from '@/global/MyElementUI/Message'
import 'nprogress/nprogress.css'
import axios from "axios"
import store from "@/store";
axios.defaults.timeout = 30000
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500
}
axios.defaults.withCredentials = true
NProgress.configure({
  showSpinner: true,
  ease:'ease',
  speed:500
})

// HTTPrequest拦截
axios.interceptors.request.use(config => {
  NProgress.remove();
  let { showProgress = true} = config.headers;
  showProgress && NProgress.start() // start progress bar
  let token = store.getters.token;
  if (token) {
    config.headers['Authorization'] = token // token
  }
  return config
}, error => {
  return Promise.reject(error)
})


// HTTPresponse拦截
axios.interceptors.response.use(async res => {
  NProgress.done()
  const status = Number(res.status) || 200
  const message = res.data.msg || '服务器错误，请稍候重试';
  const code = res.data.code;
  let {showSuccess = false,showError = true} = res.config.headers;
  if(code == 200 && showSuccess){
    jMessage.success(message);
  }
  if(code != 200 && showError){
    jMessage.closeAll();
    jMessage.error(message);
  }
  if (status === 403) {
    return store.dispatch('reLogin');
  }
  return new Promise(resolve =>{
    setTimeout(()=>{
      resolve(res)
    },500)
  })  
}, error => {
  NProgress.done()
  return Promise.reject(new Error(error))
})

export default axios
