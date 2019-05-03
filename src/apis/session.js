import http from '../utils/http'
export function checkLogin() {
  return http.get('/api/getSession')
}