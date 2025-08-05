import request from './request.js'

// 获取验证码图片
export const getCaptchaImage = (time) => {
    return `/authCode/${time}`
}

// 验证验证码
export const verifyCaptcha = (inputVerify) => {
    return request.get(`/verifyCode/${inputVerify}`)
} 