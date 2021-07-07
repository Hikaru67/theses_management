<template>
  <a-form-model
    ref="refForm"
    :model="this"
    :rules="formRules"
    :hide-required-mark="true"
    class="main-form"
    @submit.prevent="handleSubmit"
  >
    <a-spin :spinning="loading">
      <div class="box-wrapper">
        <div class="box-form-inner p-4">
          <div class="text-center logo">
            <img
              :src="require(`~/assets/images/logo.png`)"
              width="50"
            />
          </div>

          <h2 class="txt-title-top text-center mb-3">
            つながレツ卜(仮)
          </h2>

          <h4 class="txt-title-top text-center mb-3">
            認定NPO法人 レット症候群支援機構
          </h4>

          <a-form-model-item
            prop="email"
            label="メ一ルアドレス"
          >
            <a-input
              v-model="email"
              :placeholder="'入力してください'"
            />
          </a-form-model-item>

          <a-form-model-item
            prop="password"
            label="バスワ一ド"
          >
            <a-input
              v-model="password"
              :type="visibility"
              :placeholder="'入力してください'"
            >
              <font-awesome-icon
                v-if="visibility === 'password'"
                slot="suffix"
                icon="eye"
                class="width-1x mr-1"
                @click="showPassword()"
              />
              <font-awesome-icon
                v-else
                slot="suffix"
                icon="eye-slash"
                class="width-1x mr-1"
                @click="hidePassword()"
              />
            </a-input>
          </a-form-model-item>

          <div
            v-if="message"
            class="ant-form-item has-error error-center"
          >
            <font-awesome-icon
              slot="prefix"
              icon="info-circle"
              class="width-1x"
              style="color: #f00"
            />
            <span class="ant-form-explain">{{ message }}</span>
          </div>

          <div class="text-center">
            <a-button
              html-type="submit"
              size="large"
              class="min-w-120"
              shape="round"
              block
            >
              口グイン
            </a-button>
          </div>
        </div>
      </div>
    </a-spin>
  </a-form-model>
</template>

<style lang="scss" scoped>
.main-form {
  /deep/ {
    width: 100%;
    max-width: 400px;
    background: #fffef6;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.2);
    margin: 30px 0;
    .logo {
      padding: 20px;
    }
    button {
      background: #f5d528 !important;
      &:hover,
      &:focus,
      .active {
        border-color: #f5d528 !important;
        color: #000 !important;
      }
    }
    .ant-form-item {
      margin: 30px 0;
    }
    .ant-input-suffix {
      cursor: pointer;
    }
    .error-center {
      text-align: center;
    }
  }
}
</style>

<script>
import { mapGetters } from 'vuex'
import { REFRESH_TOKEN, REFRESH_TOKEN_MAX_AGE } from '~/constants/cookies'

export default {
  layout: 'blank',

  middleware: 'guest',

  data() {
    return {
      email: '',
      password: '',
      message: '',
      visibility: 'password'
    }
  },

  computed: {
    ...mapGetters({
      loading: 'loading'
    }),

    formRules() {
      return {
        email: [
          {
            required: true,
            message: this.$t('validation.required', { field: '' }),
            trigger: ['change', 'blur']
          }
        ],
        password: [
          {
            required: true,
            message: this.$t('validation.required', { field: '' }),
            trigger: ['change', 'blur']
          }
        ]
      }
    }
  },

  methods: {
    /**
     * Handle submit
     */
    handleSubmit() {
      this.$refs.refForm.validate(async valid => {
        if (valid) {
          this.$store.dispatch('setLoading', true)

          try {
            const credential = {
              email: this.email,
              password: this.password
            }
            const { data: { data } } = await this.$auth.login({ data: credential })
            if (data.refresh_token) {
              this.$cookies.set(REFRESH_TOKEN, data.refresh_token, { maxAge: REFRESH_TOKEN_MAX_AGE })
            }
          } catch (_) {
            this.message = 'メールアドレスとパスワードが一致しません'
          } finally {
            this.$store.dispatch('setLoading', false)
          }
        }
      })
    },

    /**
     * show password
     */
    showPassword() {
      this.visibility = 'text'
    },

    /**
     * hidden password
     */
    hidePassword() {
      this.visibility = 'password'
    }
  }
}
</script>
