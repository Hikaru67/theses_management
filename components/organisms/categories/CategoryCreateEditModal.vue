<template>
  <a-modal
    :visible="visible"
    :footer="null"
    :width="720"
    class="modal-wrap"
    @cancel="onCancel"
  >
    <template slot="title">
      <font-awesome-icon :icon="`${id ? 'pencil-alt' : 'plus-circle'}`" />
      {{ id ? $t('common.update') : $t('common.create') }}
    </template>

    <category-form
      :id="id"
      ref="refCategoryForm"
      :parent-id="parentId"
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
    // .ant-modal {
    //   @include mq(max_xl) {
    //     max-width: 1170px;
    //   }
    //   @include mq(max_lg) {
    //     max-width: 95%;
    //   }
    // }
    .ant-modal-body {
      padding: 0;
    }
  }
}
</style>

<script>
import CategoryForm from '~/components/organisms/categories/CategoryForm'

export default {
  components: {
    CategoryForm
  },

  props: {
    /**
     * category curent id
     */
    id: {
      type: Number,
      default: 0
    },

    /**
     * category parent id
     */
    parentId: {
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
