import axios from '@/api/axios'

const add = slug => {
  return axios.post(`/articles/${slug}/favorite`)
}

const remove = slug => {
  return axios.delete(`/articles/${slug}/favorite`)
}

export default {
  add,
  remove
}
