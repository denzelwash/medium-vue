<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-if="errors">Error {{ errors }}</div>
    <div v-if="feed">
      <div
        class="article-preview"
        v-for="(article, i) in feed.articles"
        :key="i"
      >
        <div class="article-meta">
          <router-link
            :to="{name: 'UserProfile', params: {slug: article.author.username}}"
          >
            <img :src="article.author.image" />
          </router-link>

          <div class="info">
            <router-link
              class="author"
              :to="{
                name: 'UserProfile',
                params: {slug: article.author.username}
              }"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ new Date(article.createdAt) }}</span>
          </div>

          <button class="btn btn-sm btn-outline-primary">
            <i class="ion-heart"></i>
            <span>
              1
            </span>
          </button>
        </div>

        <router-link
          :to="{name: 'Article', params: {slug: article.slug}}"
          class="preview-link"
        >
          <h1>{{ article.title }}</h1>
          <p>
            {{ article.description }}
          </p>
          <span>Read more...</span>
          <ul class="tag-list">
            <li
              v-for="(tag, i) in article.tagList"
              :key="i"
              class="tag-default tag-pill tag-outline"
            >
              {{ tag }}
            </li>
          </ul>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Feed',
  data: () => ({}),
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
    })
  },
  async mounted() {
    await this.$store.dispatch('getFeed', {url: this.apiUrl})
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
