import http from '../utils/http'
export function handleSearch(data) {
  return http.get('/api/read/search', data)
}
export function getReadList(data) {
  return http.get('/api/read/getList', data)
}
export function getReadContent(data) {
  return http.get('/api/read/getContent', data)
}