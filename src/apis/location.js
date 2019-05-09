import http from '../utils/http'
export function filterData(data) {
  return http.post('/api/location/filter', data)
}