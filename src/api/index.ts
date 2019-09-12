const ENV: 'dev'| 'prod' = process.env.VUE_APP_ENV

const URL = {
  'dev': '//local.xinghaiyang.com:3100', // 本地环境
  'prod': '//passport-api.xinghaiyang.com', // 正式环境
}

const DOMAIN = URL[ENV]

const API = {
  // 用户
  USER_REGISTE_CAPTCHA: `${DOMAIN}/user/registerCaptcha`,    // 注册验证码
  USER_LOGIN_CAPTCHA: `${DOMAIN}/user/loginCaptcha`,    // 注册验证码
  USER_REGISTE: `${DOMAIN}/user/register`,    // 注册
  USER_LOGIN: `${DOMAIN}/user/login`,    // 登录
  USER_INFO: `${DOMAIN}/user/info`,    // 获取用户信息
  USER_LOGOUT: `${DOMAIN}/user/logout`,    // 退出
}

console.log(`环境 ${ENV} ,请求主域为 ${DOMAIN}`)

export default API
