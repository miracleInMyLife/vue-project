// 多个接口请求的函数
import axios from './axios'

// 根据经纬度获取地址的请求
export const reqAddress = (longitude,latitude) => axios.get(`position/${latitude},${longitude}`)
// export const reqAddress = (longitude,latitude) => axios.get(`http://localhost:8080/api/position/${latitude},${longitude}`)

//获取食品分类列表
export const reqCategorys = () => axios.get('/index_category')

// 根据经纬度获取商铺列表
export const reqShops = (longitude,latitude) => axios.get('/shops',{params :{latitude,longitude}})
