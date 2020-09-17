<template>
  <a-form-model
    ref="refForm"
    :model="this"
    :rules="rulesForm"
    class="main-form"
    @submit.prevent="onHandleSubmit"
  >
    <div class="box-wrapper">
      <div class="box-img">
        <div class="img-user">
          <font-awesome-icon
            icon="user-tie"
            class="ic"
          />
        </div>
      </div>

      <div class="box-form-inner p-4">
        <div class="txt-title-top text-center mb-3">
          {{ $t('login.title') }}
          <font-awesome-icon icon="hand-point-down" />
        </div>

        <a-form-model-item prop="email">
          <a-input
            v-model="email"
            :placeholder="$t('login.login_id')"
          >
            <font-awesome-icon
              slot="prefix"
              icon="user-tie"
              class="width-1x"
            />
          </a-input>
        </a-form-model-item>

        <a-form-model-item prop="password">
          <a-input
            v-model="password"
            type="password"
            :placeholder="$t('login.password')"
          >
            <font-awesome-icon
              slot="prefix"
              icon="lock"
              class="width-1x"
            />
          </a-input>
        </a-form-model-item>

        <div
          v-if="message"
          class="ant-form-item has-error"
        >
          <span class="ant-form-explain">{{ message }}</span>
        </div>

        <div class="text-center">
          <a-button
            html-type="submit"
            type="primary"
            size="large"
            class="min-w-120"
          >
            {{ $t('login.title') }}
            <font-awesome-icon
              icon="sign-in-alt"
              class="ml-1"
            />
          </a-button>
        </div>
      </div>

      <div class="btn-forgot text-center">
        <nuxt-link to="/forgot">
          パスワードをリセット
        </nuxt-link>
      </div>
    </div>
  </a-form-model>
</template>

<style lang="scss" scoped>
@import "~/assets/scss/_variables.scss";
@import "~/assets/scss/_mixins.scss";

.main-form {
  /deep/ {
    width: 100%;
    max-width: 400px;
    background: #fff;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.2);
    margin: 30px 0;
    .box-wrapper {
      padding-bottom: 30px;
      .box-img {
        text-align: center;
        background: $primary-color;
        padding: 30px 0 80px;
      }
      .img-user {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 80px;
        line-height: 1;
        border-radius: 50%;
        margin: auto;
      }
    }
    .box-form-inner {
      position: relative;
      top: -40px;
      width: 80%;
      box-shadow: 2px 5px 16px 2px rgba(16, 16, 16, 0.18);
      background: #fff;
      border-radius: 6px;
      margin: auto;
      z-index: 2;
    }
    .txt-title-top {
      font-size: 24px;
      color: #4e4d4d;
    }
    .ant-form-item {
      margin-bottom: 15px;
    }
    .btn-forgot {
      a {
        color: #4e4d4d;
        text-decoration: none;
        &:hover {
          color: $primary-color;
        }
      }
    }
  }
}
</style>

<script>

export default {
  layout: 'blank',

  auth: 'guest',

  data() {
    return {
      email: '',
      password: '',
      message: '',
      loading: false
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
        email: [
          {
            required: true,
            message: this.$t('messages.error.required', { name: this.$t('login.login_id') }),
            trigger: ['change', 'blur']
          }
        ],
        password: [
          {
            required: true,
            message: this.$t('messages.error.required', { name: this.$t('login.password') }),
            trigger: ['change', 'blur']
          }
        ]
      }
    }
  },

  created() {
    // TODO
    // if (this.$cookies.get('token')) {
    //   return this.$router.push('/')
    // }
  },

  methods: {
    /**
     * On handle submit
     */
    onHandleSubmit() {
      this.$refs.refForm.validate(valid => {
        if (valid) {
          this.login()
        }
      })
    },

    /**
     * login function
     */
    async login() {
      this.$store.dispatch('setLoading', true)

      try {
        const data = {
          email: this.email,
          password: this.password
        }
        await this.$auth.login({ data })

        this.$router.push('/')
      } catch (err) {
        console.error(err)

        this.message = this.$t(
          'messages.error.unmatch_value',
          { name1: this.$t('user.email'), name2: this.$t('user.password') }
        )
      } finally {
        this.$store.dispatch('setLoading', false)
      }
    }
  }
}
</script>
