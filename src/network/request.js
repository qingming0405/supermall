import axios from 'axios'

export function request(config){
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  // axios的拦截器
  // 发送请求成功或失败的拦截
  instance.interceptors.request.use(config => {
    // console.log(config)
    return config //拦截器处理后返回结果
  }, err => {
    console.log(err)
  })

  // 响应成功或失败的拦截
  instance.interceptors.response.use(res => {
    // console.log(res)
    return res.data
  }, err => {
    console.log(err)
  })

  return instance(config)
}