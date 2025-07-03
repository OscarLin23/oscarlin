import axios from "axios";
const request = axios.create({});
// 请求拦截器
request.interceptors.request.use(config=>{
    config.headers['Content-Type']='application/json;charset=UTF-8';
    return config;
},error=>Promise.reject(error));
// 响应拦截器
request.interceptors.response.use(response=>response.data,error=>Promise.reject(error));
export default request;
