<template>
  <a-form-model
    v-loading="loading"
    :model="this"
    :rules="{}"
    :label-col="{ sm: 6 }"
    :wrapper-col="{ sm: 18 }"
    class="search-form"
    @submit.prevent="onSubmit"
  >
    <a-row type="flex" :gutter="30">
      <a-col :span="24" :md="12">
        <a-form-model-item :label="$t('menu.title')" prop="title">
          <a-input
            v-model="title"
            :placeholder="$t('menu.title')"
            :disabled="loading"
          >
            <font-awesome-icon slot="addonBefore" icon="heading" class="width-1x" />
          </a-input>
        </a-form-model-item>
      </a-col>

      <a-col :span="24" :md="12">
        <a-form-model-item :label="$t('menu.link')" prop="link">
          <a-input
            v-model="link"
            :placeholder="$t('menu.link')"
            :disabled="loading"
          >
            <font-awesome-icon slot="addonBefore" icon="link" class="width-1x" />
          </a-input>
        </a-form-model-item>
      </a-col>

      <a-col :span="24" :md="12">
        <a-form-model-item :label="$t('menu.icon')" prop="icon">
          <a-input
            v-model="icon"
            type="icon"
            :placeholder="$t('menu.icon')"
            :disabled="loading"
          >
            <font-awesome-icon slot="addonBefore" icon="icons" class="width-1x" />
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
      title: this.$route.query.title || '',
      link: this.$route.query.link || '',
      icon: this.$route.query.icon || ''
    }
  },

  computed: {
    /**
     * Get condition input on form
     */
    condition() {
      const condition = {}

      if (this.title) {
        condition.title = this.title
      }

      if (this.link) {
        condition.link = this.link
      }

      if (this.icon) {
        condition.icon = this.icon
      }

      return condition
    }
  },

  methods: {
    /**
     * On clear form search
     */
    onClearFormSearch() {
      this.title = ''
      this.link = ''
      this.icon = ''
    },

    /**
     * Check validate input
     * If valid then show error
     * Else call submit event of page index
     */
    onSubmit() {
      this.$emit(EVENT_SUBMIT, this.condition)
    }
  }
}
</script>
