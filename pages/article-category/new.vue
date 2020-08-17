<template>
  <div class="main-detail">
    <a-card class="mb-4">
      <template slot="title">
        <font-awesome-icon icon="plus-circle" />
        {{ $t('common.create') }}
      </template>

      <article-category-form
        @modify="goToList"
        @cancel="goToList"
      />
    </a-card>
  </div>
</template>

<style lang="scss" scoped>
.main-detail {
  /deep/ {
    .ant-card-body {
      padding: 0;
    }
  }
}
</style>

<script>
import ArticleCategoryForm from '~/components/organisms/article-category/ArticleCategoryForm'

export default {
  components: {
    ArticleCategoryForm
  },

  computed: {
    /**
     * Index path
     *
     * @return {Object} Index path
     */
    indexPath() {
      return {
        path: '../',
        append: true
      }
    }
  },

  methods: {
    /**
     * Go to list
     */
    goToList() {
      this.$router.push(this.indexPath)
    }
  }
}
</script>
