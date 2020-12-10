import axios from '@/api/axios'

const getArticle = payload => {
  return axios.get(`/articles/${payload}`)
}

const deleteArticle = payload => {
  return axios.delete(`/articles/${payload}`)
}

export default {
  getArticle,
  deleteArticle
}
