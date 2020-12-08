<template>
  <div>
    <div class="message" v-if="loading">Loading articles...</div>
    <div class="message" v-if="errors">
      Loading Error
      {{ errors }}
    </div>
    <div v-if="feed">
      <div class="article-preview" v-for="(article, i) in feed.articles" :key="i">
        <div class="article-meta">
          <router-link
            :to="{
              name: 'UserProfile',
              params: {
                slug: article.author.username
              }
            }"
          >
            <img :src="article.author.image" />
          </router-link>
          <div class="info">
            <router-link
              class="author"
              :to="{
                name: 'UserProfile',
                params: {
                  slug: article.author.username
                }
              }"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ formatDate(article.createdAt) }}</span>
          </div>

          <button class="btn btn-sm btn-outline-primary">
            <i class="ion-heart"></i>
            <span>
              1
            </span>
          </button>
        </div>

        <router-link
          :to="{
            name: 'Article',
            params: {
              slug: article.slug
            }
          }"
          class="preview-link"
        >
          <h1>
            {{ article.title }}
          </h1>
          <p>
            {{ article.description }}
          </p>
          <span>Read more...</span>
          <ul class="tag-list">
            <li v-for="(tag, i) in article.tagList" :key="i" class="tag-default tag-pill tag-outline">
              {{ tag }}
            </li>
          </ul>
        </router-link>
      </div>
      <Pagination :total="feed.articlesCount" :limit="limit" :currentPage="currentPage" :path="path" />
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Pagination from '@/components/Pagination'
import {limit} from '@/helpers/vars'
import {date} from '@/helpers/utils'
import queryString from 'query-string'

export default {
  name: 'Feed',
  components: {
    Pagination
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
.message {
  margin: 1.5rem 0;
}
</style>
