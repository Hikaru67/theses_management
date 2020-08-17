<template>
  <a-modal
    :visible="visible"
    :width="720"
    :footer="null"
    class="modal-wrap"
    @cancel="onCancel"
  >
    <template slot="title">
      <font-awesome-icon :icon="`${id ? 'pencil-alt' : 'plus-circle'}`" />
      {{ id ? $t('common.update') : $t('common.create') }}
    </template>

    <article-category-form
      :id="id"
      @modify="onCancel(); $emit('modify')"
      @cancel="onCancel"
    />
  </a-modal>
</template>

<style lang="scss" scoped>
@import '~/assets/scss/_variables.scss';
@import '~/assets/scss/_mixins.scss';

.modal-wrap {
  /deep/ {
    .ant-modal {
      @include mq(max_xl) {
        max-width: 1170px;
      }
      @include mq(max_lg) {
        max-width: 95%;
      }
    }
    .ant-modal-body {
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

  props: {
    /**
     * User id
     */
    id: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      visible: false
    }
  },

  methods: {
    /**
     * Open dialog
     */
    open() {
      this.visible = true
    },

    /**
     * When you click Cancel button
     */
    onCancel() {
      this.visible = false
    }
  }
}
</script>
