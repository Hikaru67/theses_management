<template>
  <a-layout-header :style="style">
    <div class="box-left pl-3">
      <img
        :src="require(`~/assets/images/logo.png`)"
        width="50"
      />
      <div class="header__title">
        <h4>認定NPO法人</h4>
        <h3>レツ 卜症候群支援機構</h3>
      </div>
    </div>

    <div class="box-right pr-3">
      <a
        href="javascript:void(0)"
        class="logout__link"
        @click="showDialog"
      >
        {{ $t('common.logout') }}
      </a>
    </div>

    <action-dialog
      v-model="visible"
      title="口グアウトしますか"
      cancel-text="戻る"
      ok-text="ログアウト"
      @ok="logout"
      @cancel="hideDialog"
    />
  </a-layout-header>
</template>

<style scoped lang="scss">
.header__title {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 10px;
  h4 {
    font-size: 12px;
  }
  h3 {
    font-size: 18px;
  }
  * {
    margin-bottom: 0;
  }
}
.logout__link {
  border-left: 2px solid #fff;
  padding-left: 20px;
}
</style>

<script>
import ActionDialog from '~/components/molecules/ActionDialog.vue'
import { REFRESH_TOKEN } from '~/constants/cookies'

export default {
  components: {
    ActionDialog
  },

  data() {
    return {
      style: {
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        background: '#f5d528'
      },
      visible: false
    }
  },

  methods: {
    /**
     * Show modal
     */
    showDialog() {
      this.visible = true
    },

    /**
     * Hide modal
     */
    hideDialog() {
      this.visible = false
    },

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
