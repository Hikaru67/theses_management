<template>
  <div>
    <div v-loading.fullscreen="loading" />

    <a-dropdown overlay-class-name="dropdown-account" :trigger="['click']">
      <a class="ant-dropdown-link" @click="e => e.preventDefault()">
        <font-awesome-icon icon="user-cog" class="ic-large" />
      </a>

      <a-menu slot="overlay">
        <a-menu-item key="0">
          <a href="#" @click="logout()">
            <font-awesome-icon icon="sign-out-alt" class="width-1x" />&nbsp;
            {{ $t('common.logout') }}
          </a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false
    }
  },

  methods: {
    /**
     * Logout user
     */
    async logout() {
      this.loading = true

      try {
        await this.$dam.logout()

        this.loading = false
        this.$dam.clearAuthToken()
        this.$router.push('login')
      } catch (err) {
        console.error(err)
        this.loading = false
      }
    }
  }
}
</script>
