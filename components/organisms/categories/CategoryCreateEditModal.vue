<template>
  <CModal
    :show.sync="visible"
    :centered="false"
    :close-on-backdrop="false"
    class="modal-form"
    size="lg"
    @open="$emit('open')"
    @close="$emit('close')"
  >
    <template #header>
      <h6 class="modal-title">
        <font-awesome-icon :icon="['fas', `${id ? 'pencil-alt' : 'plus-circle'}`]" />
        {{ id ? $t('common.update') : $t('common.create') }}
      </h6>

      <CButtonClose @click="onCancel" />
    </template>

    <!-- <category-form
      :id="id"
      ref="categoryForm"
      :parent-id="parentId"
      @cancel="onCancel"
      @modify="onModify"
    /> -->

    <template #footer>
      <span />
    </template>
  </CModal>
</template>

<style lang="scss" scoped>
.modal-form {
  /deep/ {
    .modal-footer {
      display: none;
    }
  }
}
</style>

<script>
// import CategoryForm from './CategoryForm'
// import CategoryForm from './CategoryForm'

export default {
  components: {
    // CategoryForm
  },

  props: {
    /**
     *category curent id
     */
    id: {
      type: Number,
      default: 0
    },

    /**
     *category parent id
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
      this.$refs.categoryForm.clearForm()
      this.visible = true
    },

    /**
     * When you click Cancel button
     */
    onCancel() {
      this.visible = false
    },

    /**
     * On modify
     */
    onModify() {
      this.visible = false
      this.$emit('modify')
    }
  }
}
</script>
