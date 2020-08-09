<template>
  <a-form
    :label-col="{ sm: 6 }"
    :wrapper-col="{ sm: 18 }"
    class="search-form"
    @submit.prevent="onSubmit"
  >
    <a-row type="flex" :gutter="30">
      <a-col :md="12">
        <a-form-item :label="$t('site.id')">
          <a-input
            v-model="id"
            :placeholder="$t('site.id')"
            :disabled="loading"
          >
            <font-awesome-icon slot="addonBefore" icon="sitemap" class="width-1x" />
          </a-input>
        </a-form-item>
      </a-col>

      <a-col :md="12">
        <a-form-item :label="$t('site.name')">
          <a-input
            v-model="name"
            :placeholder="$t('site.name')"
            :disabled="loading"
          >
            <font-awesome-icon slot="addonBefore" icon="heading" class="width-1x" />
          </a-input>
        </a-form-item>
      </a-col>

      <a-col :md="12">
        <a-form-item :label="$t('site.url')">
          <a-input
            v-model="url"
            :placeholder="$t('site.url')"
            :disabled="loading"
          >
            <font-awesome-icon slot="addonBefore" icon="link" class="width-1x" />
          </a-input>
        </a-form-item>
      </a-col>

      <a-col :span="24" :md="12">
        <a-form-item :label="$t('site.status')" prop="status">
          <a-radio-group
            v-model="status"
            :options="siteStatusGetMutipleLang"
            name="status"
            :disabled="loading"
          />
        </a-form-item>
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
  </a-form>
</template>

<script>
import { SITE_LIST_STATUS } from '~/constants'

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
      id: this.$route.query.id || '',
      name: this.$route.query.name || '',
      url: this.$route.query.url || '',
      status: this.$route.query.url || -1
    }
  },

  computed: {
    /**
     * Get condition input on form
     */
    condition() {
      const condition = {}

      if (this.id) {
        condition.id = this.id
      }

      if (this.name) {
        condition.name = this.name
      }

      if (this.url) {
        condition.url = this.url
      }

      if (this.status && this.status !== -1) {
        condition.status = this.status
      }

      return condition
    },

    /**
     * Get status multilang
     */
    siteStatusGetMutipleLang() {
      const allItem = [
        {
          id: -1,
          label: this.$t('common.all'),
          value: -1
        }
      ]

      const list = SITE_LIST_STATUS.map(item => {
        return {
          id: item.id,
          label: this.$t(item.name),
          value: item.id
        }
      })

      return allItem.concat(list)
    }
  },

  methods: {
    /**
     * Check validate input
     * If valid then show error
     * Else call submit event of page index
     */
    onSubmit() {
      this.$emit(EVENT_SUBMIT, this.condition)
    },

    /**
     * On clear form search
     */
    onClearFormSearch() {
      this.id = ''
      this.name = ''
      this.url = ''
      this.status = -1
    }
  }
}
</script>
