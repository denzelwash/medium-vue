<template>
  <div class="article-page">
    <div v-if="article">
      <div class="banner">
        <div class="container">
          <h1>{{ article.title }}</h1>
          <div class="article-meta">
            <router-link :to="{name: 'UserProfile', params: {slug: article.author.username}}">
              <img :src="article.author.image" />
            </router-link>
            <div class="info">
              <router-link :to="{name: 'UserProfile', params: {slug: article.author.username}}" class="author">
                {{ article.author.username }}
              </router-link>
              <span class="date">{{ formatDate(article.createdAt) }}</span>
            </div>
            <div>
              <!-- If current user is the author, show edit/delete buttons -->
              <span v-if="isMyArticle">
                <router-link class="btn btn-outline-secondary btn-sm" :to="{name: 'EditArticle', params: {slug: article.author.username}}">
                  <i class="ion-edit"></i> Edit Article
                </router-link>
                <button class="btn btn-outline-danger btn-sm"><i class="ion-trash-a"></i> Delete Article</button>
              </span>
              <!-- Otherwise, show favorite & follow buttons -->
              <span v-else>
                <button class="btn btn-sm action-btn btn-secondary">
                  <i class="ion-plus-round"></i>
                  &nbsp; Unfollow GeorgiVatashki
                </button>
                <button class="btn btn-sm btn-outline-primary">
                  <i class="ion-heart"></i>
                  <span> Favorite Article </span><span class="counter">(1)</span>
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- Main view. Contains article html and comments -->
      <div class="container page">
        <!-- Article's HTML & tags rendered here -->
        <div class="row article-content">
          <div class="col-xs-12">
            <div>
              <div>
                <p>{{ article.description }}</p>
              </div>
            </div>

            <ul class="tag-list" v-if="article.tagList">
              <li v-for="(tag, i) in article.tagList" :key="i" class="tag-default tag-pill tag-outline">{{ tag }}</li>
            </ul>
          </div>
        </div>
        <hr />
        <!-- <div class="article-actions">
          <div class="article-meta article-meta--center">
            <router-link :to="{name: 'UserProfile', params: {slug: article.author.username}}">
              <img :src="article.author.image" />
            </router-link>
            <div class="info">
              <router-link :to="{name: 'UserProfile', params: {slug: article.author.username}}" class="author">
                {{ article.author.username }}
              </router-link>
              <span class="date">{{ formatDate(article.createdAt) }}</span>
            </div>
            <div>
              <span v-if="isMyArticle">
                <router-link class="btn btn-outline-secondary btn-sm" :to="{name: 'EditArticle', params: {slug: article.author.username}}">
                  <i class="ion-edit"></i> Edit Article
                </router-link>
                <button class="btn btn-outline-danger btn-sm"><i class="ion-trash-a"></i> Delete Article</button>
              </span>
              <span v-else>
                <button class="btn btn-sm action-btn btn-secondary">
                  <i class="ion-plus-round"></i>
                  &nbsp; Unfollow GeorgiVatashki
                </button>
                <button class="btn btn-sm btn-outline-primary">
                  <i class="ion-heart"></i>
                  <span> Favorite Article </span><span class="counter">(1)</span>
                </button>
              </span>
            </div>
          </div>
        </div> -->
        <!-- <div class="row">
          <div class="col-xs-12 col-md-8 offset-md-2">
            <div>
              <form class="card comment-form">
                <div class="card-block">
                  <textarea class="form-control" placeholder="Write a comment..." rows="3"> </textarea>
                </div>
                <div class="card-footer">
                  <img class="comment-author-img" src="https://denzelweb.ru/img/baby.jpg" />
                  <button class="btn btn-sm btn-primary" type="submit">
                    Post Comment
                  </button>
                </div>
              </form>
            </div>
            <p>
              <a href="#">Sign in</a> or <a href="#">sign up</a>
              to add comments on this article.
            </p>
          </div>
        </div> -->
      </div>
    </div>
    <div class="container">
      <Loading v-if="loading" />
      <Error v-if="errors" :errors="errors" />
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {date} from '@/helpers/utils'
import Loading from '@/components/Loading'
import Error from '@/components/Error'

export default {
  name: 'Article',
  components: {
    Loading,
    Error
  },
  computed: {
    ...mapGetters({
      article: 'articleData',
      loading: 'articleIsLoading',
      errors: 'articleErrors',
      user: 'currentUser'
    }),
    isMyArticle() {
      return this.user && this.user.username === this.article.author.username
    }
  },
  methods: {
    formatDate(time) {
      return date(time)
    }
  },
  async mounted() {
    const slug = this.$route.params.slug
    const article = await this.$store.dispatch('getArticle', {slug})
    console.log(article)
  }
}
</script>

<style lang="scss" scoped>
.article-meta {
  display: flex;
  align-items: center;
  &--center {
    justify-content: center;
  }
}
</style>
