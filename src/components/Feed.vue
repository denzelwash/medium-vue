<template>
  <div>
    <Loading v-if="loading" />
    <Error v-if="errors" :errors="errors" />
    <div v-if="feed">
      <div class="article-preview" v-for="(article, i) in feed.articles" :key="i">
        <div class="article-meta">
          <router-link :to="{name: 'UserProfile', params: {slug: article.author.username}}">
            <img :src="article.author.image" />
          </router-link>
          <div class="info">
            <router-link class="author" :to="{name: 'UserProfile', params: {slug: article.author.username}}">
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ formatDate(article.createdAt) }}</span>
          </div>

          <LikeBtn :isFavorited="article.favorited" :count="article.favoritesCount" :slug="article.slug" />
        </div>

        <router-link :to="{name: 'Article', params: {slug: article.slug}}" class="preview-link">
          <h1>
            {{ article.title }}
          </h1>
          <p>
            {{ article.description }}
          </p>
          <span>Read more...</span>
          <TagList :tags="article.tagList" />
        </router-link>
      </div>
      <Pagination :total="feed.articlesCount" :limit="limit" :currentPage="currentPage" :path="path" />
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Pagination from '@/components/Pagination'
import Loading from '@/components/Loading'
import Error from '@/components/Error'
import TagList from '@/components/TagList'
import {limit} from '@/helpers/vars'
import {date} from '@/helpers/utils'
import queryString from 'query-string'
import LikeBtn from '@/components/LikeBtn'

export default {
  name: 'Feed',
  components: {
    Pagination,
    Loading,
    Error,
    TagList,
    LikeBtn
  },
  data: () => ({
    limit
  }),
  props: {
    apiUrl: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      feed: 'feedData',
      loading: 'feedIsLoading',
      errors: 'feedErrors'
    }),
    currentPage() {
      return +this.$route.query.page || 1
    },
    currentTag() {
      return this.$route.params.slug
    },
    path() {
      return this.$route.path
    },
    offset() {
      return this.currentPage * limit - limit
    }
  },
  watch: {
    currentPage() {
      this.fetchFeed()
    },
    currentTag() {
      this.fetchFeed()
    }
  },
  methods: {
    async fetchFeed() {
      const parsedUrl = queryString.parseUrl(this.apiUrl)
      let path = queryString.stringify({
        limit: this.limit,
        offset: this.offset,
        ...parsedUrl.query
      })
      path = parsedUrl.url + '?' + path
      await this.$store.dispatch('getFeed', {url: path})
    },
    formatDate(time) {
      return date(time)
    }
  },
  async mounted() {
    this.fetchFeed(this.offset)
  }
}
</script>

<style lang="scss" scoped>
.article-meta {
  display: flex;
  .btn-sm {
    margin-left: auto;
  }
}
</style>
