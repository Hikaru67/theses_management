<template>
  <a-form-model
    ref="refForm"
    :model="this"
    :rules="rulesForm"
    class="main-form"
    @submit.prevent="onHandleSubmit"
  >
    <div class="box-wrapper">
      <div class="box-form-inner p-4">
        <div class="txt-title-top text-center mb-2">
          パスワードをお忘れの方
        </div>

        <p class="txt-note mb-3">
          パスワード再設定メール送信手続き <br />
          会員登録したときの、メールアドレスと電話番号を入力して、「送信する」を選択してください。<br />
          入力していただいたメールアドレスに、パスワード再設定ページへのリンクを記載したメールをお送りいたします。
        </p>

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
            class="min-w-120"
          >
            <font-awesome-icon
              icon="paper-plane"
              class="mr-1"
            />
            送信する
          </a-button>

          &nbsp;
          <a-button
            html-type="button"
            type="secondary"
            class="min-w-120"
            @click="$router.push({ path: '/login' })"
          >
            <font-awesome-icon
              icon="arrow-left"
              class="mr-1"
            />
            戻る
          </a-button>
        </div>
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
    max-width: 450px;
    background: #fff;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.2);
    margin: 30px 0;
    .txt-title-top {
      font-size: 24px;
      color: #4e4d4d;
    }
    .txt-note {
      color: #adb5bd;
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

  data() {
    return {
      email: '',
      message: ''
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
        ]
      }
    }
  },

  methods: {
    /**
     * On handle submit
     */
    onHandleSubmit() {
      this.$refs.refForm.validate(valid => {
        if (valid) {
          this.send()
        }
      })
    },

    /**
     * send function
     */
    send() {
    }
  }
}
</script>
