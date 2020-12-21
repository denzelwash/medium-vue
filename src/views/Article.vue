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
                <router-link class="btn btn-outline-secondary btn-sm" :to="{name: 'EditArticle', params: {slug: article.slug}}">
                  <i class="ion-edit"></i> Edit Article
                </router-link>
                <button class="btn btn-outline-danger btn-sm" @click="deleteArticle"><i class="ion-trash-a"></i> Delete Article</button>
              </span>
              <!-- Otherwise, show favorite & follow buttons -->
              <span v-if="user && !isMyArticle">
                <template>
                  <button
                    @click="onFollowClick"
                    class="btn btn-sm action-btn"
                    :class="[localFollow ? 'btn-secondary' : 'btn-outline-secondary']"
                    :disabled="followLoading"
                  >
                    <i class="ion-plus-round"></i>
                    &nbsp; {{ followText }} {{ article.author.username }}
                  </button>
                  <button
                    @click="onFavoriteClick"
                    class="btn btn-sm"
                    :class="[localFavorite ? 'btn-primary' : 'btn-outline-primary']"
                    :disabled="favoriteLoading"
                  >
                    <i class="ion-heart"></i>
                    {{ favoriteText }}<span class="counter">({{ localFavoriteCount }})</span>
                  </button>
                </template>
              </span>
              <span v-else-if="!user">
                <template>
                  <router-link tag="button" :to="{name: 'Register'}" class="btn btn-sm action-btn btn-secondary">
                    <i class="ion-plus-round"></i>
                    &nbsp; Follow {{ article.author.username }}
                  </router-link>
                  <router-link tag="button" :to="{name: 'Register'}" class="btn btn-sm btn-outline-primary">
                    <i class="ion-heart"></i>
                    <span> Favorite Article </span><span class="counter">({{ localFavoriteCount }})</span>
                  </router-link>
                </template>
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
                <p>{{ article.body }}</p>
              </div>
            </div>

            <TagList :tags="article.tagList" />
          </div>
        </div>
        <hr />
        <div class="article-actions">
          <div class="article-meta article-meta-second">
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
                <router-link class="btn btn-outline-secondary btn-sm" :to="{name: 'EditArticle', params: {slug: article.slug}}">
                  <i class="ion-edit"></i> Edit Article
                </router-link>
                <button class="btn btn-outline-danger btn-sm" @click="deleteArticle"><i class="ion-trash-a"></i> Delete Article</button>
              </span>
              <!-- Otherwise, show favorite & follow buttons -->
              <span v-if="user && !isMyArticle">
                <template>
                  <button
                    @click="onFollowClick"
                    class="btn btn-sm action-btn"
                    :class="[localFollow ? 'btn-secondary' : 'btn-outline-secondary']"
                    :disabled="followLoading"
                  >
                    <i class="ion-plus-round"></i>
                    &nbsp; {{ followText }} {{ article.author.username }}
                  </button>
                  <button
                    @click="onFavoriteClick"
                    class="btn btn-sm"
                    :class="[localFavorite ? 'btn-primary' : 'btn-outline-primary']"
                    :disabled="favoriteLoading"
                  >
                    <i class="ion-heart"></i>
                    {{ favoriteText }}<span class="counter">({{ localFavoriteCount }})</span>
                  </button>
                </template>
              </span>
              <span v-else-if="!user">
                <template>
                  <router-link tag="button" :to="{name: 'Register'}" class="btn btn-sm action-btn btn-secondary">
                    <i class="ion-plus-round"></i>
                    &nbsp; Follow {{ article.author.username }}
                  </router-link>
                  <router-link tag="button" :to="{name: 'Register'}" class="btn btn-sm btn-outline-primary">
                    <i class="ion-heart"></i>
                    <span> Favorite Article </span><span class="counter">({{ localFavoriteCount }})</span>
                  </router-link>
                </template>
              </span>
            </div>
          </div>
        </div>
        <div class="row" v-if="user">
          <div class="col-xs-12 col-md-8 offset-md-2">
            <div>
              <form class="card comment-form">
                <div class="card-block">
                  <textarea class="form-control" placeholder="Write a comment..." rows="3"> </textarea>
                </div>
                <div class="card-footer">
                  <img class="comment-author-img" :src="user.image" />
                  <button class="btn btn-sm btn-primary" type="submit">
                    Post Comment
                  </button>
                </div>
              </form>
            </div>
            <div v-if="comments && comments.length">
              <div class="card" v-for="(item, i) in comments" :key="i">
                <div class="card-block">
                  <p class="card-text">{{ item.body }}</p>
                </div>
                <div class="card-footer">
                  <router-link tag="a" class="comment-author" :to="{name: 'UserProfile', params: {slug: item.author.username}}">
                    <img :src="item.author.image" class="comment-author-img" />
                    <span class="comment-author" href="#/@Denis%20111">{{ item.author.username }}</span>
                  </router-link>
                  &nbsp;
                  <span class="date-posted ng-binding">{{ formatDate(item.createdAt) }}</span>
                  <span class="mod-options">
                    <i class="ion-trash-a"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center">
          <a href="#" @click.prevent="$router.push({name: 'Login'})">Sign in</a> or
          <a href="#" @click.prevent="$router.push({name: 'Register'})">Sign up</a> to add comments on this article.
        </div>
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
import TagList from '@/components/TagList'

export default {
  name: 'Article',
  data: () => ({
    localFollow: null,
    localFavorite: null,
    localFavoriteCount: null
  }),
  components: {
    Loading,
    Error,
    TagList
  },
  computed: {
    ...mapGetters({
      article: 'articleData',
      loading: 'articleIsLoading',
      errors: 'articleErrors',
      user: 'currentUser',
      favoriteLoading: 'favoritesIsLoading',
      followLoading: 'followIsLoading',
      comments: 'comments'
    }),
    isMyArticle() {
      return this.user && this.user.username === this.article.author.username
    },
    followText() {
      return this.localFollow ? 'Unfollow' : 'Follow'
    },
    favoriteText() {
      return this.localFavorite ? 'Unfavorite Article' : 'Favorite Article'
    }
  },
  methods: {
    formatDate(time) {
      return date(time)
    },
    async deleteArticle() {
      await this.$store.dispatch('deleteArticle', {slug: this.$route.params.slug}).then(() => {
        this.$router.push({name: 'GlobalFeed'})
      })
    },
    onFollowClick() {
      if (this.localFollow) {
        this.$store.dispatch('unfollowUser', this.article.author.username)
      } else {
        this.$store.dispatch('followUser', this.article.author.username)
      }
      this.localFollow = !this.localFollow
    },
    onFavoriteClick() {
      if (this.localFavorite) {
        this.$store.dispatch('removeFromFavorites', this.article.slug).then(() => {
          this.localFavoriteCount--
        })
      } else {
        this.$store.dispatch('addToFavorites', this.article.slug).then(() => {
          this.localFavoriteCount++
        })
      }
      this.localFavorite = !this.localFavorite
    }
  },
  async mounted() {
    await this.$store.dispatch('getArticle', {slug: this.$route.params.slug})
    this.localFollow = this.article.author.following
    this.localFavorite = this.article.favorited
    this.localFavoriteCount = this.article.favoritesCount
    const comments = await this.$store.dispatch('getComments', {slug: this.article.slug})
    console.log(comments)
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
.article-actions {
  display: flex;
}
.article-meta-second {
  margin: 0 auto;
}
.text-center {
  text-align: center;
}
</style>
