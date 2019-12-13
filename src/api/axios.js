// 对axios进行2次封装
import axios from 'axios'
import qs from 'qs'
import store from '../store/store'

const instance = axios.create({
  baseURL:'/api',
  timeout : 800000 
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
    console.log(config) // config里面是所有请求的信息：方式、参数、地址等等
    if (config.data instanceof Object) {
      config.data = qs.stringify(config.data)
    }
    console.log(store.state)
  return config
})


// 响应拦截器
instance.interceptors.response.use(
  response => {
  console.log(response)
  return response.data
  },
  error => {
    alert('请求错误' + error.message)
    return new Promise(()=>{})
  } 
)

export default instance