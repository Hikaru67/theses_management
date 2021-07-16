<template>
  <a-modal
    :header="null"
    :footer="null"
    :visible="value"
    :mask-closable="false"
    @cancel="$emit('input', false)"
  >
    <a-spin :spinning="loading">
      <h4 class="confirm__title text-center">
        <div
          v-if="content"
          class="confirm__content"
        >
          {{ content }}
        </div>
        {{ title }}
      </h4>
      <a-row
        class="confirm__actions"
        type="flex"
        justify="center"
      >
        <a-col
          :span="!okText ? 8 : 12"
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
        <a-col
          v-if="okText"
          :span="!cancelText ? 24 : 12"
          class="confirm__col confirm__col--ok"
        >
          <a-button
            v-if="okText"
            size="large"
            class="confirm__btn confirm__btn--ok"
            block
            @click="$emit('ok')"
          >
            {{ okText }}
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

    content: {
      type: String,
      default: ''
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
.confirm__content {
  color: #004bb1;
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
