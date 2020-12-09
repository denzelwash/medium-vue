<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      <li v-if="currentUser" class="nav-item">
        <router-link :to="{name: 'YourFeed'}" class="nav-link" :class="{active: $route.name === 'YourFeed'}">
          Your Feed
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'GlobalFeed'}" class="nav-link" :class="{active: $route.name === 'GlobalFeed'}">
          Global Feed
        </router-link>
      </li>
      <li v-if="tagName" class="nav-item">
        <router-link :to="{name: 'GlobalFeed'}" class="nav-link" :class="{active: $route.name === 'TagFeed'}">
          <i class="ion-pound"></i>
          {{ $route.params.slug }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'FeedToggler',
  props: {
    tagName: {
      type: String
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  }
}
</script>

<style></style>
