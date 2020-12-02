import axios from 'axios'
import {getItem} from '@/helpers/localStorage.helper'

axios.defaults.baseURL = 'https://conduit.productionready.io/api'

axios.interceptors.request.use(config => {
  const token = getItem('token')
  if (token) {
    config.headers.Authorization = 'Token ' + token
  }
  return config
})

export default axios
