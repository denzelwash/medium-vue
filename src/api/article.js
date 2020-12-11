import axios from '@/api/axios'

const getArticle = payload => {
  return axios.get(`/articles/${payload}`)
}

const deleteArticle = payload => {
  return axios.delete(`/articles/${payload}`)
}

const createArticle = payload => {
  return axios.post(`/articles`, {article: payload})
}

export default {
  getArticle,
  deleteArticle,
  createArticle
}
