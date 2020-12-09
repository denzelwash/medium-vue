<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">
          MediumClone
        </h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

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

export default {
  name: 'GlobalFeed',
  components: {
    Feed,
    PopularTags
  },
  data: () => ({
    apiArticlesUrl: '/articles'
  })
}
</script>

<style></style>
