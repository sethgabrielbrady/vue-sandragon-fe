import axios from 'axios'
import { store } from './../../store'

const API_URL = 'http://localhost:3000'

const securedAxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

const plainAxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

const uploadFileAxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: false,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

securedAxiosInstance.interceptors.request.use(config => {
  const method = config.method.toUpperCase()
  if (method !== 'OPTIONS' && method !== 'GET') {
    config.headers = {
      ...config.headers,
      'X-CSRF-TOKEN': store.state.csrf
    }
  }
  return config
})

securedAxiosInstance.interceptors.response.use(null, error => {
  if (error.response && error.response.config && error.response.status === 401) {
    // If 401 by expired access cookie, we do a refresh request
    return plainAxiosInstance.post('/refresh', {}, { headers: { 'X-CSRF-TOKEN': store.state.csrf } })
      .then(response => {
         plainAxiosInstance.get('/me')
          .then(meResponse => store.commit('setCurrentUser', { currentUser: meResponse.data, csrf: response.data.csrf }))
        // store.commit('refresh', response.data.csrf)
        // After another successfull refresh - repeat original request
        let retryConfig = error.response.config
        retryConfig.headers['X-CSRF-TOKEN'] = response.data.csrf
        // retryConfig.headers['X-CSRF-TOKEN'] = store.state.csrf
        return plainAxiosInstance.request(retryConfig)
      }).catch(error => {
        store.commit('unsetCurrentUser')
        // redirect to signin if refresh fails
        location.replace('/')
        return Promise.reject(error)
      })
  } else {
    return Promise.reject(error)
  }
})

export { securedAxiosInstance, plainAxiosInstance, uploadFileAxiosInstance }
