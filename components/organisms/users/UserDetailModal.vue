<template>
  <a-modal
    :visible="visible"
    :width="1300"
    :footer="null"
    class="modal-wrap"
    @cancel="onCancel"
  >
    <template slot="title">
      <font-awesome-icon :icon="`${id ? 'pencil-alt' : 'plus-circle'}`" />
      {{ id ? $t('user.edit_user') : $t('user.create_new_user') }}
    </template>

    <user-form
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
import UserForm from '~/components/organisms/users/UserForm'

export default {
  components: {
    UserForm
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
