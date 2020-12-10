<template>
  <div>
    <nav class="navbar navbar-light">
      <div class="container">
        <router-link :to="{name: 'GlobalFeed'}" class="navbar-brand">MediumClone</router-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <router-link :to="{name: 'GlobalFeed'}" class="nav-link" active-class="active" exact>Home</router-link>
          </li>
          <template v-if="isLoggedIn">
            <li class="nav-item">
              <router-link :to="{name: 'CreateArticle'}" class="nav-link" active-class="active"
                ><i class="ion-compose"></i>New Article</router-link
              >
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'Settings'}" class="nav-link" active-class="active"
                ><i class="ion-gear-a"></i>&nbsp;Settings
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'Profile', params: {slug: currentUser.username}}" class="nav-link" active-class="active">
                <img :src="currentUser.image" class="user-pic" />
                {{ currentUser.username }}
              </router-link>
            </li>
          </template>
          <template v-if="isAnonimus">
            <li class="nav-item">
              <router-link :to="{name: 'Login'}" class="nav-link" active-class="active">Sign in</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'Register'}" class="nav-link" active-class="active">Sign up</router-link>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Topbar',
  computed: {
    ...mapGetters(['currentUser', 'isLoggedIn', 'isAnonimus'])
  }
}
</script>

<style></style>
