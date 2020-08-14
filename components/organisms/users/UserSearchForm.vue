<template>
  <a-form-model
    v-loading="loading"
    :model="this"
    :rules="{}"
    :label-col="{ sm: 6 }"
    :wrapper-col="{ sm: 18 }"
    class="search-form"
    @submit.prevent="onHandleSubmit"
  >
    <a-row type="flex" :gutter="30">
      <a-col :span="24" :md="12">
        <a-form-model-item :label="$t('user.name')" prop="name">
          <a-input
            v-model="name"
            :placeholder="$t('user.name')"
            :disabled="loading"
          >
            <font-awesome-icon slot="addonBefore" icon="user" class="width-1x" />
          </a-input>
        </a-form-model-item>
      </a-col>

      <a-col :span="24" :md="12">
        <a-form-model-item :label="$t('user.email')" prop="email">
          <a-input
            v-model="email"
            :placeholder="$t('user.email')"
            :disabled="loading"
          >
            <font-awesome-icon slot="addonBefore" icon="envelope" class="width-1x" />
          </a-input>
        </a-form-model-item>
      </a-col>

      <a-col :md="24" class="box-form-footer text-center p-3">
        <a-button
          html-type="submit"
          type="primary"
          :disabled="loading"
          class="w-min-100"
        >
          <font-awesome-icon icon="search" class="width-1x mr-1" />
          {{ $t('common.search') }}
        </a-button>

        &nbsp;
        <a-button
          html-type="button"
          type="default"
          :disabled="loading"
          class="w-min-100"
          @click="onClearFormSearch"
        >
          <font-awesome-icon icon="eraser" class="width-1x mr-1" />
          {{ $t('common.clear') }}
        </a-button>
      </a-col>
    </a-row>
  </a-form-model>
</template>

<script>
const EVENT_SUBMIT = 'submit'

export default {
  props: {
    /**
     * Loading status
     */
    loading: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      name: this.$route.query.name || '',
      email: this.$route.query.email || ''
    }
  },

  computed: {
    /**
     * Get condition input on form
     */
    condition() {
      const condition = {}

      if (this.name) {
        condition.name = this.name
      }

      if (this.email) {
        condition.email = this.email
      }

      return condition
    }
  },

  methods: {
    /**
     * On clear form search
     */
    onClearFormSearch() {
      this.name = ''
      this.email = ''
    },

    /**
     * Handle submit
     */
    onHandleSubmit() {
      this.$emit(EVENT_SUBMIT, this.condition)
    }
  }
}
</script>
