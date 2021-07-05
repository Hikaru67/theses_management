<template>
  <a-modal
    :header="null"
    :footer="null"
    :visible="value"
    :mask-closable="false"
    @cancel="$emit('input', false)"
  >
    <a-spin :spinning="loading">
      <h3 class="confirm__title text-center">
        <p style="color: #004BB1">
          {{ title }}
        </p>
        <p>が配信されました</p>
      </h3>
      <a-row
        class="confirm__actions"
        type="flex"
        justify="center"
      >
        <a-col
          span="8"
          class="confirm__col confirm__col--cancel"
        >
          <a-button
            v-if="cancelText"
            size="large"
            class="confirm__btn confirm__btn--cancel"
            block
            @click="$emit('cancel')"
          >
            {{ cancelText }}
          </a-button>
        </a-col>
      </a-row>
    </a-spin>
  </a-modal>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    title: {
      type: String,
      default: '',
      required: true
    },

    okText: {
      type: String,
      default: ''
    },

    cancelText: {
      type: String,
      default: ''
    },

    value: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      model: this.value
    }
  },

  computed: {
    ...mapGetters({
      loading: 'loading'
    })
  }
}
</script>

<style scoped lang="scss">
.confirm__title {
  margin: 20px 0;
}
.confirm__actions {
  margin-top: 40px;
  .confirm__col {
    display: flex;
    justify-content: center;
    padding: 0 20px;
  }
  .confirm__btn {
    border-radius: 20px;
    min-width: 50px;
  }
  .confirm__btn--ok {
    background: #f5d528;
  }
}
</style>
