import axios from '@/api/axios'

const add = (slug, payload) => {
  return axios.post(`articles/${slug}/comments`, {comment: payload})
}

const get = slug => {
  console.log(slug)
  return axios.get(`articles/${slug}/comments`)
}

export default {
  add,
  get
}
