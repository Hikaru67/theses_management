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
                :label="$t('student.name')"
                prop="name"
              >
                <a-input
                  v-model="model.name"
                  :placeholder="$t('student.name')"
                />
              </a-form-model-item>
            </a-col>

            <a-col
              :md="4"
              :sm="24"
            >
              <a-form-model-item
                :label="$t('student.specialized')"
                prop="specialized"
              >
                <a-select
                  v-model="model.specialized"
                  :placeholder="$t('student.specialized')"
                  class="w-100"
                >
                  <a-select-option
                    v-for="item in LIST_SPECIALIZED"
                    :key="item.id"
                  >
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>

            <a-col :md="24">
              <a-form-model-item
                :label="$t('student.address')"
                prop="address"
              >
                <a-input
                  v-model="model.address"
                  :placeholder="$t('student.address')"
                />
              </a-form-model-item>
            </a-col>

            <a-col :md="24">
              <a-form-model-item
                :label="$t('student.phone')"
                prop="phone"
              >
                <a-input
                  v-model="model.phone"
                  :placeholder="$t('student.phone')"
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
import { Students } from '~/store/students'
import DataForm from '~/mixins/data-form'

const LIST_SPECIALIZED = [
  {
    id: 0,
    name: 'ATTT'
  },
  {
    id: 1,
    name: 'CNTT'
  },
  {
    id: 2,
    name: 'DTVT'
  }
]

export default {
  mixins: [DataForm],

  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    resource: 'students',
    isDraft: true,
    LIST_SPECIALIZED
  }),

  computed: {
    formRules() {
      return {
        name: [
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
        address: [
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
        specialized: [
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
          }
        ],
        phone: [
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
        this.model = new Students({})
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
            this.$store.dispatch('setLoading', true)
            const action = `${this.resource}/saveModel`
            await this.$store.dispatch(action, this.model)

            this.isDraft = true
            this.$emit('save', this.model.name)
            this.model = new Students({})
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
