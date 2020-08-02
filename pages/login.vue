<template>
  <div class="container">
    <nuxt-link to="profile">
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
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'guest',
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
      await this.$auth.login({
        data: {
          email: this.user.username,
          password: this.user.password
        }
      })
      this.$router.push('profile')
    }
  }
}
</script>
