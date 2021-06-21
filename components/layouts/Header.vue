<template>
  <a-layout-header :style="style">
    <div class="box-left pl-3">
      <img
        :src="require(`~/assets/images/logo.png`)"
        width="50"
      />
      <div class="page-title">
        <h4>認定N鮑濠人</h4>
        <h3>レツ 卜症候群支援機構</h3>
      </div>
    </div>

    <div class="box-right pr-3">
      <a
        href="#"
        class="logout"
        @click="logout()"
      >
        {{ $t('common.logout') }}
      </a>
    </div>
  </a-layout-header>
</template>

<style scoped lang="scss">
.page-title {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 10px;
  h4 {
    font-size: 12px;
  }
  h3 {
    font-size: 14px;
  }
  * {
    margin-bottom: 0;
  }
}
.logout {
  border-left: 2px solid #fff;
  padding-left: 20px;
}
</style>

<script>
import { REFRESH_TOKEN } from '~/constants/cookies'

export default {
  data() {
    return {
      style: {
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        background: '#f5d528'
      }
    }
  },

  methods: {
    /**
     * Logout user
     */
    async logout() {
      this.$store.dispatch('setLoading', true)

      try {
        await this.$auth.logout()
        this.$cookies.remove(REFRESH_TOKEN)
      } catch (_) {
        this.$notification.error({
          message: this.$t('text.something_wrong')
        })
      } finally {
        this.$store.dispatch('setLoading', false)
      }
    }
  }
}
</script>
