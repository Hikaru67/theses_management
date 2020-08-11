<template>
  <a-form-model
    ref="refForm"
    v-loading="loading"
    :model="model"
    :rules="rulesForm"
    :label-col="{ sm: 6 }"
    :wrapper-col="{ sm: 18 }"
    class="main-form"
    @submit.prevent="onHandleSubmit"
  >
    <div class="box-form-inner p-4">
      <a-row type="flex" :gutter="30">
        <a-col :span="24" :md="12">
          <a-form-model-item :label="$t('site.name')" prop="name">
            <a-input
              v-model="model.name"
              :placeholder="$t('site.name')"
              :disabled="loading"
            >
              <font-awesome-icon slot="addonBefore" icon="sitemap" class="width-1x" />
            </a-input>
          </a-form-model-item>
        </a-col>

        <a-col :span="24" :md="12">
          <a-form-model-item :label="$t('site.url')" prop="url">
            <a-input
              v-model="model.url"
              :placeholder="$t('site.url')"
              :disabled="loading"
            >
              <font-awesome-icon slot="addonBefore" icon="link" class="width-1x" />
            </a-input>
          </a-form-model-item>
        </a-col>

        <a-col :span="24" :md="12">
          <a-form-model-item :label="$t('site.description')" prop="description">
            <a-textarea
              v-model="model.description"
              :placeholder="$t('site.description')"
              rows="5"
              :disabled="loading"
            />
          </a-form-model-item>
        </a-col>

        <a-col :span="24" :md="12">
          <a-form-model-item :label="$t('site.status')" prop="status">
            <a-radio-group
              v-model="model.status"
              :options="siteStatusList"
              name="status"
              :disabled="loading"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
    </div>

    <div class="box-form-footer text-center bt-1 p-3">
      <a-button
        html-type="submit"
        type="primary"
        :disabled="loading"
        class="w-min-100"
      >
        <font-awesome-icon icon="save" class="width-1x mr-1" />
        {{ id ? $t('common.update') : $t('common.create') }}
      </a-button>

      &nbsp;
      <a-button
        html-type="button"
        type="default"
        :disabled="loading"
        class="w-min-100"
        @click="$emit('cancel')"
      >
        <font-awesome-icon icon="arrow-left" class="width-1x mr-1" />
        {{ $t('common.cancel') }}
      </a-button>
    </div>
  </a-form-model>
</template>

<script>
import { SITE_LIST_STATUS } from '~/constants'

import Site from '~/models/Site'

import CreateEditForm from '~/mixins/create-edit-form'

export default {
  mixins: [
    CreateEditForm
  ],

  data() {
    return {
      model: new Site(),
      modelType: this.$t('site.site')
    }
  },

  computed: {
    /**
     * Rules form
     *
     * @param {object} - Rules form
     */
    rulesForm() {
      return {
        name: [
          {
            required: true,
            message: this.$t('messages.error.required', { name: this.$t('site.name') }),
            trigger: ['change', 'blur']
          }
        ],
        url: [
          {
            required: true,
            message: this.$t('messages.error.required', { name: this.$t('site.url') }),
            trigger: ['change', 'blur']
          },
          {
            validator: this.$validator.urlValidator,
            message: this.$t('messages.error.invalid_url'),
            trigger: ['change', 'blur']
          }
        ],
        status: [
          {
            required: true,
            message: this.$t('messages.error.required', { name: this.$t('site.status') }),
            trigger: ['change', 'blur']
          }
        ]
      }
    },

    /**
     * Get status list
     *
     * @param {array} - status list
     */
    siteStatusList() {
      return SITE_LIST_STATUS.map(item => {
        return {
          id: item.id,
          label: this.$t(item.name),
          value: item.id
        }
      })
    }
  },

  watch: {
    /**
     * Watching changes of id
     * Get detail
     */
    id(val) {
      this.model = new Site()

      if (val) {
        this.getDetail(val)
      }
    }
  },

  mounted() {
    this.getDetail(+this.id)
  },

  methods: {
    /**
     * Dynamic set model
     *
     * @param {Object} data
     */
    setModel(data) {
      this.model = new Site(data)
    },

    /**
     * On handle submit
     * If valid then show error
     */
    onHandleSubmit() {
      this.$refs.refForm.validate(valid => {
        if (!valid) {
          this.$notification.error({
            message: this.$t('messages.error.input_error')
          })
        } else {
          this.onSubmit()
        }
      })
    }
  }
}
</script>
