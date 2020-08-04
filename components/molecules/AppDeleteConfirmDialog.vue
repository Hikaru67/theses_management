<template>
  <a-modal
    :visible="visible"
    :width="416"
    class="modal-wrap"
    @ok="onConfirm"
    @cancel="onCancel"
  >
    <template slot="title">
      <font-awesome-icon icon="info-circle" class="ic text-warning" />
      {{ $t('common.confirm_delete') }}
    </template>

    <div class="box-content">
      {{ $t('messages.confirmation.delete', { name }) }}
    </div>

    <template slot="footer">
      <a-button
        html-type="button"
        type="danger"
        @click="onConfirm"
      >
        <font-awesome-icon icon="trash-alt" class="width-1x mr-1" />
        {{ $t('common.yes') }}
      </a-button>

      <a-button
        html-type="button"
        type="default"
        @click="onCancel"
      >
        {{ $t('common.no') }}
      </a-button>
    </template>
  </a-modal>
</template>

<style lang="scss" scoped>
.modal-wrap {
  /deep/ {
    .ant-modal-title {
      .ic {
        vertical-align: middle;
        font-size: 20px;
      }
    }
  }
}
</style>

<script>
export default {
  props: {
    /**
     * The name of the item you want to delete
     */
    name: {
      type: String,
      default: ''
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
     * When you click Delete button
     * Close dialog
     */
    onConfirm() {
      this.visible = false
      this.$emit('confirm')
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
