<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { userLoginService,userRegisterService } from '../utils/user.js'
const openReadmeInEditor = () => fetch('/__open-in-editor?file=README.md')
const router = useRouter()
 
// 表单数据
const loginForm = reactive({
    username: '',
    password: ''
})

const register = async ()=>{
    let result = await userRegisterService(loginForm);
    alert(result.msg ? result.msg : '注册成功'); 
}
//表单数据校验
const login = async()=>{
    let result = await userLoginService(loginForm);
    alert(result.msg ? result.msg : '登录成功'); 
}

const errorMsg = ref('')
const isFormValid = ref(false)
 
// 输入验证
const validateInput = () => {
    // 基本验证
    if (loginForm.username && loginForm.password) {
        isFormValid.value = true
        errorMsg.value = ''
    } else {
        isFormValid.value = false
    }
}
 
// 登录处理
const handleLogin = async () => {
    // 防止XSS攻击
    const xssPattern = /(~|\{|\}|"|'|<|>|\?)/g
    if (xssPattern.test(loginForm.username) || xssPattern.test(loginForm.password)) {
        errorMessage('警告:输入内容包含非法字符');
        return
    }

    try {
        // 调用后端 /login 接口，传递用户名和密码
        const response = await userLoginService(loginForm);
        if(response.code === "200"){
             localStorage.setItem(
            'token',JSON.stringify(response.data)
        )
            setTimeout(() => {
                router.push({ path: '/about' })
            }, 1000)
        } else if(response.code === '400'){
            alert('用户名或密码错误，请重新登录！');
            loginForm.username = '';
            loginForm.password = '';
            document.getElementById('username').focus();
        } else {
            errorMessage('登录失败，请稍后重试');
        }
        // 设置cookie（如有需要）
        const expires = new Date(Date.now() + 3600 * 1000).toUTCString()
        document.cookie = `authToken=yourAuthToken; path=/; expires=${expires}`
    } catch (error) {
        errorMessage('登录失败，请稍后重试');
    }
}
 
// 错误提示
const errorMessage = (text) => {
    errorMsg.value = text
    setTimeout(() => {
        errorMsg.value = ''
    }, 3000)
}
 
onMounted(() => {
    validateInput()
})
</script>

<template>
    <div class="login-wrapper">
        <div class="container">
            <div class="form-header">
                <h2>用户登录</h2>
                <p>欢迎来到oscarlin网站请登录您的账号</p>
            </div>
            <form @submit.prevent="handleLogin" class="floating-form">
              <div class="input-group">
                <input id="username" v-model.trim="loginForm.username" type="text" autocomplete="off" @input="validateInput" required />
                <label for="username">用户名</label>
                <span class="highlight"></span>
              </div>
              <div class="input-group">
                <input id="password" v-model.trim="loginForm.password" type="password" autocomplete="off" @input="validateInput" required />
                <label for="password">密码</label>
                <span class="highlight"></span>
              </div>
              <div class="error-message" v-if="errorMsg">{{ errorMsg }}</div>
              <button type="submit" class="submit-btn" :disabled="!isFormValid">
                <span>登录 </span>
                <i class="arrow-icon"></i>
              </button>
              <div class="form-footer">
                <p>还没有账号？<a href="/register">注册新账号</a></p>
              </div>
            </form>
        </div>
    </div>
</template>
<style scoped>
.login-wrapper{
  min-height: 100vh;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg,#f5f7fa 0%,#c3cfc2 100%);
  padding: 0;
  margin: 0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}
.container {
  width: 100%;
  max-width: 480px;
  background: #fff;
  border-radius: 20px;
  padding: 40px 40px 40px 40px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}
.form-header {
  text-align: center;
  margin-bottom: 40px;
}
.form-header h2 {
  color: #2c3e50;
  font-size: 32px;
  margin-bottom: 10px;
  font-weight: 700;
}
.form-header p {
  color: #95a5a6;
  font-size: 16px;
}
.floating-form .input-group {
  position: relative;
  margin-bottom: 30px;
}
.input-group input{
  width: 100%;
  padding:15px;
  border:2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: transparent;
}
.input-group label{
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  padding: 0 5px;
  color: #95a5a6;
  font-size: 16px;
  transition: all 0.3s ease;
  pointer-events: none;
}
.input-group input:focus,
.input-group input:valid{
  border-color: #3498db;
}
.input-group input:focus + label,
.input-group input:valid + label {
  top: 0;
  font-size: 14px;
  color: #3498db;
}
.submit-btn {
  width: 100%;
    padding: 15px;
    margin-left: 15px;
    background: linear-gradient(to right, #3498db, #2980b9);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}
.submit-btn:hover{
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
}
.arrow-icon {
  border:solid white;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(-45deg);
}
.form-footer {
  text-align: center;
  margin-top: 20px;
  color: #95a5a6;
}
.form-footer a {
  color: #3498db;
  text-decoration: none;
  margin-left: 5px;
  font-weight: 600;
}
.form-footer a:hover {
  text-decoration: underline;
}
.error-message {
  color: #f56c6c;
  font-size: 14px;
  text-align: center;
  margin-bottom: 20px;
}
@media (max-width: 768px) {
    .login-container {
        max-width: 400px;
        padding: 30px;
    }
 
    .form-header h2 {
        font-size: 28px;
    }
 
    .form-header p {
        font-size: 14px;
    }
}
 
@media (max-width: 480px) {
    .login-container {
        padding: 20px;
        margin: 10px;
        max-width: 100%;
    }
    
    .form-header h2 {
        font-size: 24px;
    }
    
    .form-header p {
        font-size: 14px;
    }
 
    .input-group input {
        padding: 12px;
        font-size: 14px;
    }
 
    .input-group label {
        font-size: 14px;
    }
 
    .submit-btn {
        padding: 12px;
        font-size: 16px;
    }
}
 
@media (max-width: 320px) {
    .login-container {
        padding: 15px;
    }
 
    .form-header h2 {
        font-size: 20px;
    }
 
    .input-group {
        margin-bottom: 20px;
    }
}
</style>
