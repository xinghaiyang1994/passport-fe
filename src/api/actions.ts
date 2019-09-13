import Vue from 'vue'
import ajaxInit from 'sea-axios'
import API from './index'
import router from '../router/index'
import { Message } from 'element-ui'

const ajax = ajaxInit({
  initTransformResponseFn(res: any) {
    // 网络错误统一处理
    if (res.status !== 200) {
      return console.log('status 非 200', res)
    }
    // 处理 url 中 code 有问题的情况
    if (res.data.code === -2) {
      return router.push({
        path: '/login',
        query: {
          from: encodeURIComponent(window.location.href)
        }
      })
    }
    // code 非 0 统一处理
    if (res.data.code !== 0) {
      Message({
        type: 'error',
        message: res.data.message
      })
      throw new Error(res.data.message)
    }
    return res
  },
  // 无网或者后端报错统一拦截
  initTransformResponseErrorFn(err: any) {
    Message({
      type: 'error',
      message: err.message
    })
  }
}) // 默认携带 cookie，按 application/json 方式

function postUserRegiste(data: any) {
  return ajax({
    url: API.USER_REGISTE,
    data
  })
}

function postUserLogin(data: any) {
  return ajax({
    url: API.USER_LOGIN,
    data
  })
}

function getUserInfo() {
  return ajax({
    url: API.USER_INFO,
    type: 'get'
  })
}

function postUserLogout() {
  return ajax({
    url: API.USER_LOGOUT
  })
}

function getAppList(data: any) {
  return ajax({
    url: API.APP_LIST,
    data,
    type: 'get'
  })
}

function getAppDetail(data: any) {
  return ajax({
    url: API.APP_DETAIL,
    data,
    type: 'get'
  })
}

function postAppDetele(data: any) {
  return ajax({
    url: API.APP_DETELE,
    data
  })
}

function postAppAdd(data: any) {
  return ajax({
    url: API.APP_ADD,
    data
  })
}

function postAppModify(data: any) {
  return ajax({
    url: API.APP_MODIFY,
    data
  })
}


export { 
  // 用户
  postUserRegiste,
  postUserLogin,
  getUserInfo,
  postUserLogout,
  // 应用
  getAppList,
  getAppDetail,
  postAppDetele,
  postAppAdd,
  postAppModify,
}
