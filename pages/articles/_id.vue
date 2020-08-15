<template>
  <div class="main-detail">
    <a-card class="mb-4">
      <template slot="title">
        <font-awesome-icon icon="pencil-alt" />
        {{ $t('common.update') }}
      </template>

      <article-form
        :id="id"
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
import ArticleForm from '~/components/organisms/articles/ArticleForm'

export default {
  components: {
    ArticleForm
  },

  computed: {
    /**
     * Get article Id
     *
     * @return {Object} article Id
     */
    id() {
      return +this.$route.params.id
    },

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
