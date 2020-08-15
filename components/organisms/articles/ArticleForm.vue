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
          <a-form-model-item :label="$t('article.title')" prop="title">
            <a-input
              v-model="model.title"
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
              v-model="model.article_category_id"
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
          <a-form-model-item :label="$t('article.email')" prop="email">
            <a-input
              v-model="model.email"
              :placeholder="$t('article.email')"
              :disabled="loading"
            >
              <font-awesome-icon slot="addonBefore" icon="envelope" class="width-1x" />
            </a-input>
          </a-form-model-item>
        </a-col>

        <a-col :span="24" :md="12">
          <a-form-model-item :label="$t('article.password')" prop="password">
            <a-input
              v-model="model.password"
              type="password"
              :placeholder="$t('article.password')"
              :disabled="loading"
            >
              <font-awesome-icon slot="addonBefore" icon="lock" class="width-1x" />
            </a-input>
          </a-form-model-item>
        </a-col>

        <a-col :span="24" :md="12">
          <a-form-model-item :label="$t('article.password_confirm')" prop="password_confirm">
            <a-input
              v-model="model.password_confirm"
              type="password"
              :placeholder="$t('article.password_confirm')"
              :disabled="loading"
            >
              <font-awesome-icon slot="addonBefore" icon="lock" class="width-1x" />
            </a-input>
          </a-form-model-item>
        </a-col>

        <a-col :span="24" :md="12">
          <a-form-model-item :label="$t('article.status')" prop="status">
            <a-radio-group
              v-model="model.status"
              :options="statusList"
              name="status"
              :disabled="loading"
            />
          </a-form-model-item>
        </a-col>

        <a-col :span="24" :md="12">
          <a-form-model-item :label="$t('article.roles')" prop="roleId">
            <a-radio-group
              v-model="model.roleId"
              :options="roleList"
              name="role"
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
import { USER_STATUS_LIST } from '~/constants'

import Article from '~/models/Article'
import Role from '~/models/Role'

import CreateEditForm from '~/mixins/create-edit-form'

export default {
  mixins: [
    CreateEditForm
  ],

  data() {
    return {
      model: new Article(),
      modelType: this.$t('article.article')
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
            message: this.$t('messages.error.required', { name: this.$t('article.name') }),
            trigger: ['change', 'blur']
          }
        ],
        email: [
          {
            required: true,
            message: this.$t('messages.error.required', { name: this.$t('article.email') }),
            trigger: ['change', 'blur']
          },
          {
            validator: this.$validator.emailValidator,
            message: this.$t('messages.error.bad_email_format', { name: this.$t('article.email') }),
            trigger: ['change', 'blur']
          }
        ],
        password: [
          {
            required: !this.id || this.model.password_confirm,
            message: this.$t('messages.error.required', { name: this.$t('article.password') }),
            trigger: ['change', 'blur']
          },
          {
            min: 8,
            message: this.$t('messages.error.min', { name: this.$t('article.password'), min: 8 }),
            trigger: ['change', 'blur']
          }
        ],
        password_confirm: [
          {
            required: !this.id || this.model.password,
            message: this.$t('messages.error.required', { name: this.$t('article.password_confirm') }),
            trigger: ['change', 'blur']
          },
          {
            min: 8,
            message: this.$t('messages.error.min', { name: this.$t('article.password_confirm'), min: 8 }),
            trigger: ['change', 'blur']
          },
          {
            validator: this.validateConfirmPassword,
            message: this.$t('messages.error.unmatch_confirmation_email', { name: this.$t('article.password_confirm') }),
            trigger: ['change', 'blur']
          }
        ],
        status: [
          {
            required: true,
            message: this.$t('messages.error.required', { name: this.$t('article.status') }),
            trigger: ['change', 'blur']
          }
        ],
        roleId: [
          {
            required: true,
            message: this.$t('messages.error.required', { name: this.$t('article.roles') }),
            trigger: ['change', 'blur']
          }
        ]
      }
    },

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
     * Article status list
     *
     * @param {array} - Article status list
     */
    statusList() {
      return USER_STATUS_LIST.map(item => {
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
      this.model = new Article()

      if (val) {
        this.getDetail(val)
      }
    },

    /**
     * Watching changes of model.roleId
     * get role id
     */
    'model.roleId'(val) {
      const role = this.roleList.filter(item => item.id === val)
      this.model.roleList = role
    }
  },

  mounted() {
    this.getRoleList()
    this.getDetail(+this.id)
  },

  methods: {
    /**
     * Dynamic set model
     *
     * @param {Object} data
     */
    setModel(data) {
      this.model = new Article(data)
    },

    /**
     * Get role list
     */
    getRoleList() {
      this.$dam.getRoleList()
        .then(res => {
          if (Array.isArray(res.data)) {
            this.roleList = res.data.map(item => new Role(item))
          }
        })
        .catch(err => {
          console.error(err)

          this.$notification.error({
            message: this.$t('messages.error.failed_to_get', { name: this.$t('role.role_list') })
          })
        })
    },

    /**
     * Compare two password
     *
     * @param {Object} rule - Rule of validation
     * @param {String} value - Date of input
     * @param {Function} callback - Callback function
     */
    validateConfirmPassword(rule, value, callback) {
      if (!value || !this.model.password) {
        return callback()
      } else if (value !== this.model.password) {
        return callback(
          new Error(
            this.$t('messages.error.unmatch_confirmation_email', { name: this.$t('article.password_confirm') })
          )
        )
      } else {
        callback()
      }
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
