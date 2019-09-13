const ENV: 'dev'| 'prod' = process.env.VUE_APP_ENV

const URL = {
  'dev': '//local.xinghaiyang.com:3010', // 本地环境
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

  // 应用
  APP_LIST: `${DOMAIN}/app/list`,    // 应用列表(翻页)
  APP_DETAIL: `${DOMAIN}`,    // 单个应用详情
  APP_DETELE: `${DOMAIN}`,    // 删除单个应用
  APP_ADD: `${DOMAIN}/app/add`,    // 新增单个应用
  APP_MODIFY: `${DOMAIN}`,    // 单个应用修改

}

console.log(`环境 ${ENV} ,请求主域为 ${DOMAIN}`)

export default API
