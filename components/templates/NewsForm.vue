<template>
  <a-form-model
    ref="form"
    :model="model"
    :rules="formRules"
    class="main-form"
    @submit.prevent="handleSubmit"
  >
    <a-spin :spinning="loading">
      <div class="box-form-inner p-4">
        <a-row
          type="flex"
          :gutter="30"
        >
          <template v-if="isDraft">
            <a-col
              :md="20"
              :sm="24"
            >
              <a-form-model-item
                :label="$t('news.title')"
                prop="title"
              >
                <a-input
                  v-model="model.title"
                  :placeholder="$t('news.title')"
                />
              </a-form-model-item>
            </a-col>

            <a-col
              :md="4"
              :sm="24"
            >
              <a-form-model-item
                :label="$t('news.city')"
                prop="city"
              >
                <a-select
                  v-model="model.city"
                  placeholder="Please select"
                  class="w-100"
                >
                  <a-select-option
                    v-for="item in cities"
                    :key="item.id"
                  >
                    {{ item.city_name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>

            <a-col :sm="24">
              <a-form-model-item
                :label="$t('news.content')"
                prop="content"
              >
                <a-textarea
                  v-model="model.content"
                  placeholder="Basic usage"
                  :rows="4"
                />
              </a-form-model-item>
            </a-col>
          </template>
          <template v-else>
            <a-col :sm="24">
              {{ currentDate }} {{ model.city }}
            </a-col>
            <a-col :sm="24">
              {{ model.title }}
            </a-col>
            <a-col :sm="24">
              {{ model.content }}
            </a-col>
          </template>
        </a-row>
      </div>

      <div class="box-form-footer text-center bt-1 p-3">
        <a-button
          html-type="button"
          type="default"
          class="min-w-100"
          @click="onCancel"
        >
          {{ $t('common.cancel') }}
        </a-button>
        &nbsp;
        <a-button
          html-type="submit"
          type="primary"
          class="min-w-100"
        >
          {{ id ? $t('common.update') : $t('common.create') }}
        </a-button>
      </div>
    </a-spin>
  </a-form-model>
</template>

<script>
import DataForm from '~/mixins/data-form'

export default {
  mixins: [DataForm],

  async fetch() {
    this.$store.dispatch('setLoading', true)
    try {
      const { data: { data } } = await this.$api.getCity()
      this.cities = data
    } catch (_) {
      this.$notification.error({
        message: this.$t('text.something_wrong')
      })
    } finally {
      this.$store.dispatch('setLoading', false)
    }
  },

  data: () => ({
    resource: 'news',
    isDraft: true,
    cities: []
  }),

  computed: {
    formRules() {
      return {
        title: [
          {
            required: true,
            message: this.$t('validation.required', { field: this.$t('news.title') }),
            trigger: ['change', 'blur']
          }
        ],
        city: [
          {
            required: true,
            message: this.$t('validation.required', { field: this.$t('news.city') }),
            trigger: ['change', 'blur']
          }
        ],
        content: [
          {
            required: true,
            message: this.$t('validation.required', { field: this.$t('news.content') }),
            trigger: ['change', 'blur']
          }
        ]
      }
    },

    currentDate() {
      return this.$moment().format('Y/m/d')
    }
  },
  methods: {
    /**
     * Handle on cancel
     */
    onCancel() {
      if (this.isDraft) {
        this.$emit('cancel')
        return
      }
      this.isDraft = true
    },

    /**
     * Validate before submit
     */
    handleSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            if (this.isDraft) {
              this.isDraft = false
              return
            }
            this.$store.dispatch('setLoading', true)
            const action = `${this.resource}/saveModel`
            await this.$store.dispatch(action, this.model)

            this.isDraft = true
            this.$emit('save')
          } catch (_) {
            this.$notification.error({
              message: this.$t('text.something_wrong')
            })
          } finally {
            this.$store.dispatch('setLoading', false)
          }
        }
      })
    }
  }
}
</script>
