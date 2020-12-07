<template>
  <div>
    <nav>
      <ul class="pagination">
        <li
          class="page-item"
          v-for="page in pages"
          :key="page"
          :class="{active: page === currentPage}"
        >
          <a
            href="#"
            class="page-link"
            @click.prevent="$emit('click-page', page)"
          >
            {{ page }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
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
      return Math.ceil(this.total / this.limit)
    }
  }
}
</script>

<style></style>
