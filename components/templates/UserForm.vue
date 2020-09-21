<template>
  <a-form-model
    ref="form"
    :model="model"
    :rules="formRules"
    :label-col="{ sm: 6 }"
    :wrapper-col="{ sm: 18 }"
    class="main-form"
    @submit.prevent="handleSubmit"
  >
    <div class="box-form-inner p-4">
      <a-row
        type="flex"
        :gutter="30"
      >
        <a-col
          :span="24"
          :md="12"
        >
          <a-form-model-item
            :label="$t('user.name')"
            prop="name"
          >
            <a-input
              v-model="model.name"
              :placeholder="$t('user.name')"
            >
              <font-awesome-icon
                slot="addonBefore"
                icon="user"
                class="width-1x"
              />
            </a-input>
          </a-form-model-item>
        </a-col>

        <a-col
          :span="24"
          :md="12"
        >
          <a-form-model-item
            :label="$t('user.email')"
            prop="email"
          >
            <a-input
              v-model="model.email"
              :placeholder="$t('user.email')"
            >
              <font-awesome-icon
                slot="addonBefore"
                icon="envelope"
                class="width-1x"
              />
            </a-input>
          </a-form-model-item>
        </a-col>

        <a-col
          :span="24"
          :md="12"
        >
          <a-form-model-item
            :label="$t('user.password')"
            prop="password"
          >
            <a-input
              v-model="model.password"
              type="password"
              :placeholder="$t('user.password')"
            >
              <font-awesome-icon
                slot="addonBefore"
                icon="lock"
                class="width-1x"
              />
            </a-input>
          </a-form-model-item>
        </a-col>

        <a-col
          :span="24"
          :md="12"
        >
          <a-form-model-item
            :label="$t('user.password_confirm')"
            prop="password_confirm"
          >
            <a-input
              v-model="model.password_confirm"
              type="password"
              :placeholder="$t('user.password_confirm')"
            >
              <font-awesome-icon
                slot="addonBefore"
                icon="lock"
                class="width-1x"
              />
            </a-input>
          </a-form-model-item>
        </a-col>

        <a-col
          :span="24"
          :md="12"
        >
          <a-form-model-item
            :label="$t('user.roles')"
            prop="roles"
          >
            <a-select
              v-model="model.roleIds"
              mode="multiple"
              placeholder="Please select"
              class="w-100"
            >
              <a-select-option
                v-for="role in roles"
                :key="role.id"
              >
                {{ role.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>
    </div>

    <div class="box-form-footer text-center bt-1 p-3">
      <a-button
        html-type="submit"
        type="primary"
        class="min-w-100"
      >
        <font-awesome-icon
          icon="save"
          class="width-1x mr-1"
        />
        {{ id ? $t('common.update') : $t('common.create') }}
      </a-button>

      &nbsp;
      <a-button
        html-type="button"
        type="default"
        class="min-w-100"
        @click="$emit('cancel')"
      >
        <font-awesome-icon
          icon="arrow-left"
          class="width-1x mr-1"
        />
        {{ $t('common.cancel') }}
      </a-button>
    </div>
  </a-form-model>
</template>

<script>
import DataForm from '~/mixins/data-form'

export default {
  mixins: [DataForm],

  async fetch() {
    const { data } = await this.$api.indexRole()
    this.roles = data.data
  },

  data: () => ({
    resource: 'user',
    roles: []
  }),

  computed: {
    formRules() {
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
            type: 'email',
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
            validator: (rule, value, callback) => {
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
            message: this.$t('messages.error.unmatch_confirmation_email', { name: this.$t('user.password_confirm') }),
            trigger: ['change', 'blur']
          }
        ]
      }
    }
  }
}
</script>
