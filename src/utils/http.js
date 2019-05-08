
import axios from 'axios'
import store from '@/store/index'
import {
  Toast
} from 'vant'
import qs from 'qs'

const ToLogin = () => {
  this.$router.replace({
    path: '/login',
    query: {
      redirect: this.$router.currentRoute.fullPath
    }
  })
}
const Message = msg => {
  Toast({
    message: 'msg',
    duration: 1000,
    forbidClick: true
  })
}
var service = axios.create({
  baseURL: process.env.BASE_URL
  // withCredentials: true
  // timeout: 5000
});

service.interceptors.request.use(
  config => {
    // do something before request is sent
    // const token = store.state.token
    // token && (config.headers.Authorization = token)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    console.log(error)
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          ToLogin()
          break
          // 403 token过期
          // 登录过期对用户进行提示
          // 清除本地token和清空vuex中token对象
          // 跳转登录页面
        case 403:
          Message('登录过期，请重新登录')
          localStorage.removeItem('token')
          store.commit('loginSuccess', null)
          setTimeout(() => {
            ToLogin()
          }, 1000)
          break

          // 404请求不存在
        case 404:
          Message('网络请求不存在')
          break
        default:
          Message(error.response.data.message)
      }
    }
    return Promise.reject(error)
  }
)
// get请求
const get = (url, param) => {
  return new Promise((resolve, reject) => {
    service({
      method: 'get',
      url,
      params: param || {}
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}
// post请求
const post = (url, params) => {
  return new Promise((resolve, reject) => {
    service({
      url: url,
      method: 'post',
      data: qs.stringify(params),
      headers: {
        'content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}
// 上传文件 不能用qs将表单序列化
const upload = (url, params) => {
  return new Promise((resolve, reject) => {
    service({
      url: url,
      method: 'post',
      data: params,
      headers: {
        'content-Type': 'multipart/form-data;charset=UTF-8'
      }
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}
export default{
  get,
  post,
  upload
}
