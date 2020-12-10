import axios from '@/api/axios'

const getArticle = payload => {
  return axios.get(`/articles/${payload}`)
}

export default {
  getArticle
}
