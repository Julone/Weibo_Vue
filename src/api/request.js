// import {serialize} from '@/util/util'
// import {getStore} from '../util/store'
import NProgress from 'nprogress' // progress bar
// import errorCode from '@/const/errorCode'
// import router from "@/router/index"
import jMessage from './../global/MyElementUI/Message'
import 'nprogress/nprogress.css'
import axios from "axios"
import store from "@/store";
axios.defaults.timeout = 30000
// 返回其他状态吗
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500 // 默认的
}
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true
// NProgress Configuration
NProgress.configure({
  showSpinner: false,
  ease:'ease',
  speed:500
})

// HTTPrequest拦截
axios.interceptors.request.use(config => {
  NProgress.start() // start progress bar
  // const isToken = (config.headers || {}).isToken === false
 
let token = store.getters.token;
if (token) {
  config.headers['Authorization'] = token// token
}

  // headers中配置serialize为true开启序列化
//   if (config.methods === 'post' && config.headers.serialize) {
//     config.data = serialize(config.data)
//     delete config.data.serialize
//   }
  return config
}, error => {
  return Promise.reject(error)
})


// HTTPresponse拦截
axios.interceptors.response.use(res => {
  NProgress.done()
  const status = Number(res.status) || 200
  const message = res.data.msg || '服务器错误，请稍候重试';
  const code = res.data.code;
  if(code != 200 ){
    jMessage.closeAll();
    jMessage.error(message);
  }
  if (status === 403) {
    store.dispatch('TokenExit');
    return;
  }
  return res
}, error => {
  NProgress.done()
  return Promise.reject(new Error(error))
})

export default axios
