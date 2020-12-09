<template>
  <div class="home-page">
    <Banner />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a href="" class="nav-link active">
                  Global Feed
                </a>
              </li>
            </ul>
          </div>
          <Feed :apiUrl="apiArticlesUrl" />
        </div>
        <div class="col-md-3">
          <PopularTags />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Feed from '@/components/Feed'
import PopularTags from '@/components/PopularTags'
import Banner from '@/components/Banner'

export default {
  name: 'GlobalFeed',
  components: {
    Feed,
    PopularTags,
    Banner
  },
  data: () => ({
    apiArticlesUrl: '/articles'
  })
}
</script>

<style></style>
