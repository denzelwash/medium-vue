<template>
  <div class="profile-page" v-if="profileData">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img class="user-img" :src="profileData.image" />
            <h4>{{ profileData.username }}</h4>
            <p>{{ profileData.bio }}</p>
            <button v-if="!isMyProfile" class="btn btn-sm action-btn btn-outline-secondary">
              <i class="ion-plus-round"></i>
              &nbsp; Follow {{ profileData.username }}
            </button>
            <router-link v-else :to="{name: 'Settings'}" class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-gear-a"></i>Edit Profile Settings
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                  :to="{name: 'UserProfile', params: {slug: profileData.username}}"
                  class="nav-link"
                  :class="{active: !isFavorites}"
                >
                  My Articles
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  :to="{name: 'UserProfileFavorites', params: {slug: profileData.username}}"
                  class="nav-link"
                  :class="{active: isFavorites}"
                >
                  Favorited Articles
                </router-link>
              </li>
            </ul>
          </div>
          <Feed :apiUrl="apiUrl" :key="apiUrl" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Feed from '@/components/Feed'

export default {
  name: 'UserProfile',
  components: {
    Feed
  },
  computed: {
    ...mapGetters(['profileData', 'currentUser']),
    isMyProfile() {
      if (!this.profileData || !this.currentUser) {
        return false
      }
      return this.profileData.username === this.currentUser.username
    },
    userProfileSlug() {
      return this.$route.params.slug
    },
    apiUrl() {
      return this.isFavorites ? `/articles?favorited=${this.userProfileSlug}` : `/articles?author=${this.userProfileSlug}`
    },
    isFavorites() {
      return this.$route.path.includes('favorites')
    }
  },
  methods: {
    getProfile() {
      this.$store.dispatch('getProfile', this.userProfileSlug)
    }
  },
  watch: {
    userProfileSlug() {
      this.getProfile()
    }
  },
  mounted() {
    this.getProfile()
  }
}
</script>

<style></style>
