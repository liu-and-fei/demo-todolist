// 引入 axios 模块
import axios from 'axios/index';

// 生成一个 axios 实例
const http = axios.create();

// 设置 http 的一些默认项
http.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'http://www.baidu.com' : 'http://localhost:3000/';
http.defaults.timeout = 10000;

// 做请求拦截

// 做响应拦截
http.interceptors.response.use(response => {
  return response;
});

// 将 http 暴露出去
export default http;
