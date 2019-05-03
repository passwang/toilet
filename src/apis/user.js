import http from '../utils/http'
export function getUser(data) {
  return http.get('/api/user', data)
}
export function updateName(data) {
  return http.get('/api/updateName', data)
}
export function updateAvatar(data) {
  return http.upload('/api/updateAvatar', data)
}
export function sendMobileCode(data) {
  return http.get('/api/login/sendMobileCode', data)
}
export function doRegist(data) {
  return http.post('/api/regist', data)
}
export function checkUsername(data) {
  return http.get('/api/checkName', data)
}
export function doLogin(data) {
  return http.post('/api/login', data)
}
export function checkForget(data) {
  return http.post('/api/checkForget', data)
}
export function doReset(data) {
  return http.post('/api/doReset', data)
}
export function doOut() {
  return http.post('/api/user/logout')
}
