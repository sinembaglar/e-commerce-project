import axios from 'axios'

const api = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com',
})

// NOTE: backend expects the raw token, without a "Bearer " prefix.
export function setAuthToken(token) {
  api.defaults.headers.common.Authorization = token
}

export function clearAuthToken() {
  delete api.defaults.headers.common.Authorization
}

export default api
