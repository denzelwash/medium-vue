import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/modules/auth'
import feed from '@/store/modules/feed'
import tags from '@/store/modules/tags'
import article from '@/store/modules/article'
import createArticle from '@/store/modules/createArticle'
import editArticle from '@/store/modules/editArticle'
import settings from '@/store/modules/settings'
import favorites from '@/store/modules/favorites'
import profile from '@/store/modules/profile'
import follow from '@/store/modules/follow'
import comments from '@/store/modules/comments'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    feed,
    tags,
    article,
    createArticle,
    editArticle,
    settings,
    favorites,
    profile,
    follow,
    comments
  }
})
