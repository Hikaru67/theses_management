<template>
  <div class="container">
    <nuxt-link to="/profile">
      Profile
    </nuxt-link>
    <div class="row justify-content-center mt-5">
      <div class="col-md-5">
        <form>
          <div class="form-group">
            <input
              v-model="user.username"
              class="form-control"
              placeholder="Username"
            />
          </div>
          <div class="form-group">
            <input
              v-model="user.password"
              type="password"
              class="form-control"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary btn-block"
            @click.prevent="passwordGrantLogin"
          >
            Login with Password Grant
          </button>
        </form>
      </div>

      <div>
        <button
          type="submit"
          @click.prevent="customPasswordGrantLogin"
        >
          Login with Custom Passport Password Scheme
        </button>
      </div>
      </form>
    </div>
    <hr />
    <div>
      <button @click="oauthLogin">
        Login with OAuth
      </button>
    </div>
    </section>
  </div>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async passwordGrantLogin() {
      await this.$auth.loginWith('password_grant', {
        data: {
          grant_type: 'password',
          client_id: process.env.PASSPORT_PASSWORD_GRANT_ID,
          client_secret: process.env.PASSPORT_PASSWORD_GRANT_SECRET,
          scope: '*',
          username: this.user.username,
          password: this.user.password
        }
      })
      this.$router.replace('/')
    },
    async customPasswordGrantLogin() {
      await this.$auth.loginWith('password_grant_custom', {
        data: this.user
      })
      this.$router.replace('/')
    },
    oauthLogin() {
      this.$auth.loginWith('laravel.passport')
    }
  }
}
</script>

<style scoped>
div {
  margin: 10px 0;
}
</style>
