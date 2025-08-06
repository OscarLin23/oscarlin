import request from "../utils/request.js";
export const userRegisterService = (registerData)=>{
    // 使用FormData发送表单数据，匹配后端的@RequestParam
    const formData = new FormData();
    formData.append('username', registerData.username);
    formData.append('password', registerData.password);
    
    return request.post('/user/register', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
export const userLoginService = (loginData) => {
    return request.post('/login',  loginData );
};