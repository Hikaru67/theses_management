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
        <a-form-model-item :label="$t('article.title')" prop="title">
          <a-input
            v-model="title"
            :placeholder="$t('article.title')"
            :disabled="loading"
          >
            <font-awesome-icon slot="addonBefore" icon="heading" class="width-1x" />
          </a-input>
        </a-form-model-item>
      </a-col>

      <a-col :span="24" :md="12">
        <a-form-model-item :label="$t('article.category')" prop="article_category_id">
          <a-select
            v-model="article_category_id"
            :disabled="loading"
          >
            <a-select-option
              v-for="(item, index) in categoryList"
              :key="index"
              :value="item.id"
            >
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-col>

      <a-col :span="24" :md="12">
        <a-form-model-item :label="$t('article.youtube_id')" prop="youtube_id">
          <a-input
            v-model="youtube_id"
            :placeholder="$t('article.youtube_id')"
            :disabled="loading"
          >
            <svg
              slot="addonBefore"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="youtube"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              class="svg-inline--fa fa-youtube width-1x"
            >
              <path fill="currentColor" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" class="" />
            </svg>
          </a-input>
        </a-form-model-item>
      </a-col>

      <a-col :span="24" :md="12">
        <a-form-model-item :label="$t('article.site')" prop="site_id">
          <a-select
            v-model="site_id"
            :disabled="loading"
          >
            <a-select-option
              v-for="(item, index) in siteList"
              :key="index"
              :value="item.id"
            >
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-col>

      <a-col :span="24" :md="12">
        <a-form-model-item :label="$t('article.type')" prop="type">
          <a-radio-group
            v-model="type"
            :options="typeList"
            name="type"
            :disabled="loading"
          />
        </a-form-model-item>
      </a-col>

      <a-col :span="24" :md="12">
        <a-form-model-item :label="$t('article.status')" prop="status">
          <a-radio-group
            v-model="status"
            :options="statusList"
            name="status"
            :disabled="loading"
          />
        </a-form-model-item>
      </a-col>

      <a-col :span="24" :md="12">
        <a-form-model-item :label="$t('article.created_at_from')" prop="created_at_from">
          <a-date-picker
            v-model="created_at_from"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="X"
            placeholder="YYYY-MM-DD HH:mm:ss"
            :locale="locale"
            :disabled="loading"
            class="w-100"
          />
        </a-form-model-item>
      </a-col>

      <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->

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
import locale from 'ant-design-vue/es/date-picker/locale/ja_JP'

import {
  MAX_LIMIT_RECORD,
  ARTICLE_TYPE,
  ARTICLE_STATUS
} from '~/constants'

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
      // Form data
      title: this.$route.query.title || '',
      article_category_id: this.$route.query.article_category_id || -1,
      youtube_id: this.$route.query.youtube_id || '',
      site_id: this.$route.query.site_id || -1,
      type: this.$route.query.type || -1,
      status: this.$route.query.status || -1,
      created_at_from: this.$route.query.created_at_from || null,

      // Other data
      categories: [],
      sites: [],
      locale
    }
  },

  computed: {
    /**
     * Return list category item options
     *
     * @return {Array} Category list
     */
    categoryList() {
      if (!(Array.isArray(this.categories) && this.categories.length)) {
        return []
      }

      const optionPlaceholder = {
        id: -1,
        label: this.$t('common.option_please_select')
      }

      const list = this.categories.map(item => {
        return {
          id: item.id,
          label: item.name
        }
      })

      return [optionPlaceholder].concat(list)
    },

    /**
     * Return list site item options
     *
     * @return {Array} Site list
     */
    siteList() {
      if (!(Array.isArray(this.sites) && this.sites.length)) {
        return []
      }

      const optionPlaceholder = {
        id: -1,
        label: this.$t('common.option_please_select')
      }

      const list = this.sites.map(item => {
        return {
          id: item.id,
          label: item.name
        }
      })

      return [optionPlaceholder].concat(list)
    },

    /**
     * Get Type list
     *
     * @return {Array} Type list
     */
    typeList() {
      const all = {
        id: -1,
        label: this.$t('article.all'),
        value: -1
      }

      const list = ARTICLE_TYPE.map(item => {
        return {
          id: item.id,
          label: this.$t(item.name),
          value: item.id
        }
      })

      return [all].concat(list)
    },

    /**
     * Get Status list
     *
     * @return {Array} Status list
     */
    statusList() {
      const all = {
        id: -1,
        label: this.$t('article.all'),
        value: -1
      }

      const list = ARTICLE_STATUS.map(item => {
        return {
          id: item.id,
          label: this.$t(item.name),
          value: item.id
        }
      })

      return [all].concat(list)
    },

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

  mounted() {
    this.getCategoryList()
    this.getSiteList()
  },

  methods: {
    /**
     * Call API get category list
     */
    getCategoryList() {
      this.$dam.getArticleCategoryList({ limit: MAX_LIMIT_RECORD })
        .then(res => {
          if (Array.isArray(res.data) && res.data.length) {
            this.categories = res.data
          }
        })
        .catch(err => {
          console.error(err)

          this.$notification.error({
            message: this.$t('messages.error.failed_to_get', { name: this.$t('category.category_list') })
          })
        })
    },

    /**
     * Call API get site list
     */
    getSiteList() {
      this.$dam.getSiteList({ limit: MAX_LIMIT_RECORD })
        .then(res => {
          if (Array.isArray(res.data) && res.data.length) {
            this.sites = res.data
          }
        })
        .catch(err => {
          console.error(err)

          this.$notification.error({
            message: this.$t('messages.error.failed_to_get', { name: this.$t('site.list_site') })
          })
        })
    },

    /**
     * Handle submit
     */
    onHandleSubmit() {
      this.$emit(EVENT_SUBMIT, this.condition)
    },

    /**
     * On clear form search
     */
    onClearFormSearch() {
      this.name = ''
      this.email = ''
    }
  }
}
</script>
