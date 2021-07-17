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
                :label="$t('lecturer.name')"
                prop="ten_gv"
              >
                <a-input
                  v-model="model.ten_gv"
                  :placeholder="$t('lecturer.name')"
                />
              </a-form-model-item>
            </a-col>

            <a-col
              :md="4"
              :sm="24"
            >
              <a-form-model-item
                :label="$t('lecturer.specialized')"
                prop="khoa"
              >
                <a-input
                  v-model="model.khoa"
                  :placeholder="$t('lecturer.specialized')"
                />
              </a-form-model-item>
            </a-col>

            <a-col :md="24">
              <a-form-model-item
                :label="$t('lecturer.address')"
                prop="dia_chi"
              >
                <a-input
                  v-model="model.dia_chi"
                  :placeholder="$t('lecturer.address')"
                />
              </a-form-model-item>
            </a-col>

            <a-col :md="24">
              <a-form-model-item
                :label="$t('lecturer.phone')"
                prop="sdt"
              >
                <a-input
                  v-model="model.sdt"
                  :placeholder="$t('lecturer.phone')"
                />
              </a-form-model-item>
            </a-col>
          </template>
        </a-row>
      </div>

      <div class="box-form-footer text-center p-3">
        <a-button
          html-type="button"
          type="default"
          class="min-w-100"
          shape="round"
          @click="onCancel"
        >
          {{ $t('common.cancel') }}
        </a-button>
        &nbsp;
        <a-button
          html-type="submit"
          type="primary btn-create"
          class="min-w-100"
          shape="round"
        >
          {{ id ? $t('common.update') : $t('common.create') }}
        </a-button>
      </div>
    </a-spin>
  </a-form-model>
</template>

<script>
import { Lecturers } from '~/store/lecturers'
import DataForm from '~/mixins/data-form'

export default {
  mixins: [DataForm],

  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    resource: 'lecturers',
    isDraft: true,
    lecturers: []
  }),

  computed: {
    formRules() {
      return {
        ten_gv: [
          {
            required: true,
            message: <div>
              <font-awesome-icon
                icon="exclamation-circle"
                class="width-1x"
                style="color: #f00"
              />
              {this.$t('validation.just_required')}
            </div>,
            trigger: ['change', 'blur']
          },
          {
            whitespace: true,
            message: <div>
              <font-awesome-icon
                icon="exclamation-circle"
                class="width-1x"
                style="color: #f00"
              />
              {this.$t('validation.just_required')}
            </div>,
            trigger: ['change', 'blur']
          }
        ],
        dia_chi: [
          {
            required: true,
            message: <div>
              <font-awesome-icon
                icon="exclamation-circle"
                class="width-1x"
                style="color: #f00"
              />
              {this.$t('validation.just_required')}
            </div>,
            trigger: ['change', 'blur']
          },
          {
            whitespace: true,
            message: <div>
              <font-awesome-icon
                icon="exclamation-circle"
                class="width-1x"
                style="color: #f00"
              />
              {this.$t('validation.just_required')}
            </div>,
            trigger: ['change', 'blur']
          }
        ],
        khoa: [
          {
            required: true,
            message: <div>
              <font-awesome-icon
                icon="exclamation-circle"
                class="width-1x"
                style="color: #f00"
              />
              {this.$t('validation.just_required')}
            </div>,
            trigger: ['change', 'blur']
          },
          {
            whitespace: true,
            message: <div>
              <font-awesome-icon
                icon="exclamation-circle"
                class="width-1x"
                style="color: #f00"
              />
              {this.$t('validation.just_required')}
            </div>,
            trigger: ['change', 'blur']
          }
        ],
        sdt: [
          {
            required: true,
            message: <div>
              <font-awesome-icon
                icon="exclamation-circle"
                class="width-1x"
                style="color: #f00"
              />
              {this.$t('validation.just_required')}
            </div>,
            trigger: ['change', 'blur']
          },
          {
            whitespace: true,
            message: <div>
              <font-awesome-icon
                icon="exclamation-circle"
                class="width-1x"
                style="color: #f00"
              />
              {this.$t('validation.just_required')}
            </div>,
            trigger: ['change', 'blur']
          }
        ]
      }
    }
  },

  watch: {
    visible(val) {
      if (!val) {
        this.model = new Lecturers({})
        this.$refs.form.clearValidate()
      }
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
            // if (this.isDraft) {
            //   this.isDraft = false
            //   return
            // }
            this.$store.dispatch('setLoading', true)
            const action = `${this.resource}/saveModel`
            await this.$store.dispatch(action, this.model)

            this.isDraft = true
            this.$emit('save', this.model.ten_gv)
            this.model = new Lecturers({})
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
  .ant-col {
    .ant-form-item-label label {
      font-size: 20px;
    }
  }
}
.btn-create {
  border: none;
  background-color: #ababb3 !important;
  color: black;
}
.text-content {
  cursor: default;
  background: white;
  color: black;
  border: none;
  resize: none;
}
.label-required {
  background-color: red;
  padding: 0px 7px 1px 6px;
  color: white;
}
</style>
