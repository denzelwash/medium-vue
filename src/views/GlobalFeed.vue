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
                <a href="" class="nav-link">
                  Your Feed
                </a>
              </li>

              <li class="nav-item">
                <a href="" class="nav-link">
                  Global Feed
                </a>
              </li>

              <li class="nav-item">
                <a href="" class="nav-link active">
                  <i class="ion-pound"></i> test
                </a>
              </li>
            </ul>
          </div>
          <Feed :apiUrl="apiUrl" />
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list" ng-show="$ctrl.tags">
              <a href="" class="tag-default tag-pill">‌</a>
            </div>
            <div>
              Loading tags...
            </div>
            <div class="post-preview">
              No tags are here... yet.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Feed from '@/components/Feed'

export default {
  name: 'GlobalFeed',
  components: {
    Feed
  },
  data: () => ({
    apiUrl: '/articles'
  })
}
</script>

<style></style>
