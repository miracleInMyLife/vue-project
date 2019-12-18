// 对axios进行2次封装
import axios from 'axios'
import qs from 'qs'
import store from '../store/store'
import { Indicator,Toast,MessageBox } from 'mint-ui'
import router from '../router/index'

const instance = axios.create({
  baseURL:'/api',
  timeout : 800000 
});

// 请求拦截器
instance.interceptors.request.use(config => {
    Indicator.open() // 开启loading效果

    console.log(config) // config里面是所有请求的信息：方式、参数、地址等等
    if (config.data instanceof Object) {
      config.data = qs.stringify(config.data)
    }

    // 从vuex中取出token
    const token = store.state.user.token
    console.log(token)
    if (token) {
      // 若是token存在，则在请求头中加上一个属性Authorization
      config.headers['Authorization'] = token
    }else {  // 如果是没有token的话
      // 判断当前的请求的是否需要token验证
      const needCheck = config.headers.needCheck
      if (needCheck) {
        // 请求拦截器里的错误，由promise链最终由响应拦截器抛出错误给我们，此时是发请求未成功的
        throw new Error('未登录，没有token，不能请求')
        // return Promise.reject('未登录，无法请求')
      }
    }

  return config  // 请求拦截器只是在发送请求前对请求信息进行过滤和更改，要将请求信息返回，因为还要继续发送请求的
})


// 响应拦截器
instance.interceptors.response.use(
  response => {
    Indicator.close() // 关闭loading效果
    return response.data
  },
  error => {
    Indicator.close() // 关闭loading效果
    const response = error.response
    if (!response) { // 没法请求的错误 --- 在请求拦截器被拦下的请求 -- 如需要token但又没有token
      const path = router.currentRoute.path
      if (path !== '/login') {  //当前不在登录界面
        router.replace('/login')
      }
    }else {  // 发了请求的错误
      if (error.response.status === 401) { // 表示缺少token
        const path = router.currentRoute.path
        if (path !== '/login') {  //当前不在登录界面
          store.dispatch('logout')  // 退出登录，清除用户信息和本地的token
          router.replace('/login')
          Toast(error.response.data.message || '登陆失效请重新登陆')
        }
      }else if (error.response.status === 401) {  // 表示访问的资源不存在
        MessageBox('提示', '访问的资源不存在')
      }else {
        //  统一处理其他请求异常
        MessageBox('提示', '请求出错: ' + error.message)
      }
    }
    // alert('请求错误: ' + error.message)
    // return new Promise(()=>{})
  } 
)

export default instance