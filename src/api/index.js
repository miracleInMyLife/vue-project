// 多个接口请求的函数
import axios from './axios'

// 根据经纬度获取地址的请求
export const reqAddress = (longitude,latitude) => axios.get(`position/${latitude},${longitude}`)
// export const reqAddress = (longitude,latitude) => axios.get(`http://localhost:8080/api/position/${latitude},${longitude}`)

//获取食品分类列表
export const reqCategorys = () => axios.get('/index_category',{
  headers: {
    needCheck: true  
  }
})

// 根据经纬度获取商铺列表
export const reqShops = (longitude,latitude) => axios.get('/shops',{
  params :{
    latitude,longitude
  },
  headers: {
    needCheck: true
}})

// 发送短信验证码
// export const reqSmsCode = (phone) => axios.get('/sendcode',{params:{phone}})
// get请求的对象写法
export const reqSmsCode = (phone) => axios({
  url:'/sendcode',
  params:{
    phone
  }
})

// 获取图片验证码
export const reqImgCode = () => axios.get('/captcha')

// 短信登录
export const reqSmsLogin = (phone,code) => axios.post('/login_sms',{phone,code})

// 密码登录
export const reqPwdLogin = (name,pwd,captcha) => axios.post('/login_pwd',{name,pwd,captcha})

// 自动登录
export const reqAutoLogin = () => axios.get('/auto_login')