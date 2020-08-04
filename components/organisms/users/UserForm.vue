<template>
  <a-form-model
    ref="refForm"
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
          <a-form-model-item :label="$t('user.name')" prop="name">
            <a-input
              v-model="model.name"
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
              v-model="model.email"
              :placeholder="$t('user.email')"
              :disabled="loading"
            >
              <font-awesome-icon slot="addonBefore" icon="envelope" class="width-1x" />
            </a-input>
          </a-form-model-item>
        </a-col>

        <a-col :span="24" :md="12">
          <a-form-model-item :label="$t('user.password')" prop="password">
            <a-input
              v-model="model.password"
              type="password"
              :placeholder="$t('user.password')"
              :disabled="loading"
            >
              <font-awesome-icon slot="addonBefore" icon="lock" class="width-1x" />
            </a-input>
          </a-form-model-item>
        </a-col>

        <a-col :span="24" :md="12">
          <a-form-model-item :label="$t('user.password_confirm')" prop="password_confirm">
            <a-input
              v-model="model.password_confirm"
              type="password"
              :placeholder="$t('user.password_confirm')"
              :disabled="loading"
            >
              <font-awesome-icon slot="addonBefore" icon="lock" class="width-1x" />
            </a-input>
          </a-form-model-item>
        </a-col>

        <a-col :span="24" :md="12">
          <a-form-model-item :label="$t('user.status')" prop="status">
            <a-radio-group
              v-model="model.status"
              :options="statusList"
              name="status"
              :disabled="loading"
            />
          </a-form-model-item>
        </a-col>

        <a-col :span="24" :md="12">
          <a-form-model-item :label="$t('user.roles')" prop="roleId">
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

    <div class="box-form-footer py-3">
      <a-button
        html-type="submit"
        type="primary"
        :disabled="loading"
      >
        <font-awesome-icon icon="save" class="width-1x mr-1" />
        {{ id ? $t('common.update') : $t('common.create') }}
      </a-button>

      &nbsp;
      <a-button
        html-type="button"
        type="default"
        :disabled="loading"
        @click="$emit('cancel')"
      >
        <font-awesome-icon icon="arrow-left" class="width-1x mr-1" />
        {{ $t('common.cancel') }}
      </a-button>
    </div>
  </a-form-model>
</template>

<style lang="scss" scoped>
.main-form {
  /deep/ {
    .box-form-footer {
      border-top: 1px solid #e8e8e8;
      text-align: center;
    }
  }
}
</style>

<script>
import { USER_STATUS_LIST } from '~/constants'

import User from '~/models/User'
import Role from '~/models/Role'

import CreateEditForm from '~/mixins/create-edit-form'

export default {
  mixins: [
    CreateEditForm
  ],

  data() {
    return {
      model: new User(),
      modelType: this.$t('user.user'),
      roleList: []
    }
  },

  computed: {
    /**
     * Rules form
     *
     * @param {array} - Rules form
     */
    rulesForm() {
      return {
        name: [
          {
            required: true,
            message: this.$t('messages.error.required', { name: this.$t('user.name') }),
            trigger: ['change', 'blur']
          }
        ],
        email: [
          {
            required: true,
            message: this.$t('messages.error.required', { name: this.$t('user.email') }),
            trigger: ['change', 'blur']
          },
          {
            validator: this.$validator.email,
            message: this.$t('messages.error.bad_email_format', { name: this.$t('user.email') }),
            trigger: ['change', 'blur']
          }
        ],
        password: [
          {
            required: !this.id || this.model.password_confirm,
            message: this.$t('messages.error.required', { name: this.$t('user.password') }),
            trigger: ['change', 'blur']
          },
          {
            min: 8,
            message: this.$t('messages.error.min', { name: this.$t('user.password'), min: 8 }),
            trigger: ['change', 'blur']
          }
        ],
        password_confirm: [
          {
            required: !this.id || this.model.password,
            message: this.$t('messages.error.required', { name: this.$t('user.password_confirm') }),
            trigger: ['change', 'blur']
          },
          {
            min: 8,
            message: this.$t('messages.error.min', { name: this.$t('user.password_confirm'), min: 8 }),
            trigger: ['change', 'blur']
          },
          {
            validator: this.validateConfirmPassword,
            message: this.$t('messages.error.unmatch_confirmation_email', { name: this.$t('user.password_confirm') }),
            trigger: ['change', 'blur']
          }
        ],
        status: [
          {
            required: true,
            message: this.$t('messages.error.required', { name: this.$t('user.status') }),
            trigger: ['change', 'blur']
          }
        ],
        roleId: [
          {
            required: true,
            message: this.$t('messages.error.required', { name: this.$t('user.roles') }),
            trigger: ['change', 'blur']
          }
        ]
      }
    },

    /**
     * User status list
     *
     * @param {array} - User status list
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
      this.getDetail(val)
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
    this.prepareData()
    this.getDetail(+this.id)
  },

  methods: {
    /**
     * Dynamic set model
     *
     * @param {Object} data
     */
    setModel(data) {
      this.model = new User(data)
    },

    /**
     * Prepare data save user
     */
    prepareData() {
      this.getRoleList()
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
            this.$t('messages.error.unmatch_confirmation_email', { name: this.$t('user.password_confirm') })
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
        if (valid) {
          this.onSubmit()
        }
      })
    }
  }
}
</script>
