import axios from '@/api/axios'

const register = payload => {
  return axios.post('/users', {user: payload})
}

const login = payload => {
  return axios.post('/users/login', {user: payload})
}

const getCurrentUser = () => {
  return axios.get('/user')
}

const update = payload => {
  return axios.put('/user', {user: payload})
}

export default {
  register,
  login,
  getCurrentUser,
  update
}
