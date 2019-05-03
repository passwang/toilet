import http from '../utils/http'
export function submitResult(data) {
  return http.upload('/api/comment/submit', data)
}