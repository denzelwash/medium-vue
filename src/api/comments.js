import axios from '@/api/axios'

const add = payload => {
  return axios.post(`articles/${payload.slug}/comments`, {comment: {body: payload.data}})
}

const get = slug => {
  return axios.get(`articles/${slug}/comments`)
}

const del = payload => {
  return axios.delete(`articles/${payload.slug}/comments/${payload.id}`)
}

export default {
  add,
  get,
  del
}
