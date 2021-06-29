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
                label="タイトル"
                prop="title"
              >
                <a-input
                  v-model="model.title"
                  placeholder="タイトル"
                />
              </a-form-model-item>
            </a-col>

            <a-col
              :md="4"
              :sm="24"
            >
              <a-form-model-item
                label="都道府県"
                prop="city"
              >
                <a-select
                  v-model="model.city_id"
                  placeholder="都道府県"
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
                label="本文"
                prop="content"
              >
                <a-textarea
                  v-model="model.content"
                  placeholder="本文"
                  :rows="16"
                />
              </a-form-model-item>
            </a-col>
          </template>
          <template v-else>
            <a-col :sm="24">
              <div class="modal__title">
                <span>
                  {{ currentDate }}
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  都道府県: {{ model.city ? model.city.name : '' }}
                </span>
                <h1>{{ model.title }}</h1>
              </div>
            </a-col>

            <a-col :sm="24">
              <div class="modal__content">
                {{ model.content }}
              </div>
            </a-col>
          </template>
        </a-row>
      </div>

      <div class="box-form-footer text-center p-3">
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
      this.cities = [
        {
          id: 0,
          city_name: 'すべて'
        },
        ...data
      ]
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
            message: this.$t('validation.required', { field: 'タイトル' }),
            trigger: ['change', 'blur']
          }
        ],
        content: [
          {
            required: true,
            message: this.$t('validation.required', { field: '本文' }),
            trigger: ['change', 'blur']
          }
        ]
      }
    },

    currentDate() {
      return this.$moment().format('Y/m/d')
    },

    curentCity() {
      const city = this.cities.find(item => item.id === this.model.city_id)
      return city.city_name || ''
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

<style scoped lang="scss">
/deep/ {
  .modal__title {
    margin-top: 40px;
    border-bottom: 1px solid #e8e8e8;
  }
  .modal__content {
    overflow-y: scroll;
    max-height: 400px;
    margin: 40px 0;
    padding-right: 20px;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
}
</style>
