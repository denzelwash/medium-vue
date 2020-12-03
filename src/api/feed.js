import axios from '@/api/axios'

export default url => {
  return axios.get(url)
}
