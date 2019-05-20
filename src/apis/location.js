import http from '../utils/http'
export function getNumberData(data) {
  return http.post('/api/location/filter', data)
}