<template>
  <div>
    <a-dropdown
      overlay-class-name="dropdown-account"
      :trigger="['click']"
    >
      <a
        class="ant-dropdown-link"
        @click="e => e.preventDefault()"
      >
        <font-awesome-icon
          icon="user-cog"
          class="ic-large"
        />
      </a>

      <a-menu slot="overlay">
        <a-menu-item
          key="0"
          class="txt-name"
        >
          {{ $auth.user.email }}
        </a-menu-item>
        <a-menu-item key="1">
          <a
            href="#"
            @click="gotoProfile()"
          >
            <font-awesome-icon
              icon="user"
              class="width-1x"
            />&nbsp;
            {{ $t('common.profile') }}
          </a>
        </a-menu-item>
        <a-menu-item key="2">
          <a
            href="#"
            @click="logout()"
          >
            <font-awesome-icon
              icon="sign-out-alt"
              class="width-1x"
            />&nbsp;
            {{ $t('common.logout') }}
          </a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
export default {
  methods: {
    /**
     * Logout user
     */
    async logout() {
      this.$store.dispatch('setLoading', true)

      try {
        await this.$auth.logout()
        this.$router.push('/login')
      } catch (err) {
        console.error(err)
      } finally {
        this.$store.dispatch('setLoading', false)
      }
    },

    gotoProfile() {
      this.$router.push('/profile')
    }
  }
}
</script>
