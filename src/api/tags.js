import axios from '@/api/axios'

const getPopularTags = async () => {
  const tags = await axios.get('/tags')
  return tags.data.tags
}

export default {
  getPopularTags
}
