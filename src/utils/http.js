import axios from 'axios';
 
const http = axios.create({ baseURL: '/api' });
 
http.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
 
http.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      // 处理Token过期：跳转登录页并清除本地Token
      localStorage.removeItem('token');
      router.push('/login');
    }
    return Promise.reject(error);
  }
);
 
export default http;