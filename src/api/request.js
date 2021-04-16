import axios from 'axios'

export function request(config) {
  //1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://192.168.1.18:8000',
    timeout: 5000
  })
  //2.axios拦截器
  // 2.1请求拦截器
  instance.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    return config
  },err => {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

  // 2.2响应拦截器
  instance.interceptors.response.use( response =>{
    // 对响应数据做点什么
     return response.data
    }, err => {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  // 3.发送真正的网络请求
  return instance(config)
}
