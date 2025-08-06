<template>
    <div class="register-wrapper">
        <div class="container">
            <div class="form-header">
                <h2>用户注册</h2>
                <p>欢迎来到oscarlin网站请注册您的账号</p>
            </div>
            <form @submit.prevent="handleRegister" class="floating-form">
              <div class="input-group">
                <input id="username" v-model.trim="registerForm.username" type="text" autocomplete="off" @input="validateInput" required />
                <label for="username">用户名</label>
                <span class="highlight"></span>
              </div>
              <div class="input-group">
                <input id="password" v-model.trim="registerForm.password" type="password" autocomplete="off" @input="validateInput" required />
                <label for="password">密码</label>
                <span class="highlight"></span>
              </div>
              <div class="input-group">
                <input id="confirmPassword" v-model.trim="registerForm.confirmPassword" type="password" autocomplete="off" @input="validateInput" required />
                <label for="confirmPassword">确认密码</label>
                <span class="highlight"></span>
              </div>
              <div class="error-message" v-if="errorMsg">{{ errorMsg }}</div>
              <button type="submit" class="submit-btn" :disabled="!isFormValid">
                <span>注册 </span>
                <i class="arrow-icon"></i>
              </button>
              <div class="form-footer">
                <p>已有账号？<a href="/">返回登录</a></p>
              </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { userRegisterService } from '../utils/user.js'

const router = useRouter()

// 表单数据
const registerForm = reactive({
    username: '',
    password: '',
    confirmPassword: ''
})

const errorMsg = ref('')
const isFormValid = ref(false)

// 输入验证
const validateInput = () => {
    // 基本验证
    if (registerForm.username && registerForm.password && registerForm.confirmPassword) {
        if (registerForm.password === registerForm.confirmPassword) {
            isFormValid.value = true
            errorMsg.value = ''
        } else {
            isFormValid.value = false
            errorMsg.value = '两次输入的密码不一致'
        }
    } else {
        isFormValid.value = false
        errorMsg.value = ''
    }
}

// 注册处理
const handleRegister = async () => {
    // 防止XSS攻击
    const xssPattern = /(~|\{|\}|"|'|<|>|\?)/g
    if (xssPattern.test(registerForm.username) || xssPattern.test(registerForm.password)) {
        errorMessage('警告:输入内容包含非法字符');
        return
    }

    // 验证密码一致性
    if (registerForm.password !== registerForm.confirmPassword) {
        errorMessage('两次输入的密码不一致');
        return
    }

    // 验证用户名和密码长度
    if (registerForm.username.length < 3) {
        errorMessage('用户名长度至少3个字符');
        return
    }
    
    if (registerForm.password.length < 6) {
        errorMessage('密码长度至少6个字符');
        return
    }

    try {
        // 调用后端注册接口
        const response = await userRegisterService({
            username: registerForm.username,
            password: registerForm.password
        });
        
        console.log('注册响应:', response); // 调试用
        
        if (response.code === 200 || response.code === "200") {
            alert('注册成功！');
            // 注册成功后跳转到登录页
            router.push({ path: '/' });
        } else {
            errorMessage(response.msg || response.message || '注册失败，请重试');
        }
    } catch (error) {
        console.error('注册错误:', error); // 调试用
        if (error.response) {
            // 服务器返回错误响应
            errorMessage(error.response.data?.msg || error.response.data?.message || '注册失败，请重试');
        } else if (error.request) {
            // 网络错误
            errorMessage('网络连接失败，请检查网络后重试');
        } else {
            // 其他错误
            errorMessage('注册失败，请稍后重试');
        }
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

<style scoped>
.register-wrapper {
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

.input-group input {
  width: 100%;
  padding: 15px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: transparent;
}

.input-group label {
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
.input-group input:valid {
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

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
}

.submit-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.arrow-icon {
  border: solid white;
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
  .container {
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
  .container {
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
  .container {
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