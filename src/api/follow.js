import axios from '@/api/axios'

const add = slug => {
  return axios.post(`/profiles/${slug}/follow`)
}

const remove = slug => {
  return axios.delete(`/profiles/${slug}/follow`)
}

export default {
  add,
  remove
}
