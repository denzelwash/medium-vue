<template>
  <nav>
    <ul class="pagination">
      <li
        class="page-item"
        v-for="page in pages"
        :key="page"
        :class="{active: page === currentPage}"
      >
        <a
          href=""
          class="page-link"
          @click.prevent="$router.push({path: path, query: {page: page}})"
        >
          {{ page }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import {range} from '@/helpers/utils'

export default {
  name: 'Pagination',
  props: {
    total: {
      type: Number,
      required: true
    },
    limit: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    path: {
      type: String,
      required: true
    }
  },
  computed: {
    pages() {
      const maxPage = Math.ceil(this.total / this.limit)
      return range(1, maxPage)
    }
  }
}
</script>

<style></style>
