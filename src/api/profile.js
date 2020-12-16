import axios from '@/api/axios'

const getProfile = slug => {
  return axios.get(`/profiles/${slug}`)
}

export default {
  getProfile
}
