<template>
  <a-layout-header>
    <div class="box-left">
      <a
        href="#"
        class="btn-trigger"
        @click="toggleIsCollapsed"
      >
        <a-icon :type="isCollapsed ? 'menu-unfold' : 'menu-fold'" />
      </a>
    </div>

    <div class="box-right pr-4">
      <a-dropdown
        overlay-class-name="dropdown-language"
        :trigger="['click']"
      >
        <a
          class="ant-dropdown-link"
          @click="e => e.preventDefault()"
        >
          <img
            :src="require(`~/assets/images/ic_flag_${currentLocaleISO}.png`)"
            width="28"
          />
          <font-awesome-icon icon="caret-down" />
        </a>

        <a-menu slot="overlay">
          <a-menu-item
            v-for="locale in $i18n.locales"
            :key="locale.code"
          >
            <a
              href="javascript:void(0)"
              @click="$i18n.setLocale(locale.code)"
            >
              <img :src="require(`~/assets/images/ic_flag_${locale.iso}.png`)" />
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
      <a-dropdown
        overlay-class-name="dropdown-account"
        :trigger="['click']"
      >
        <a
          class="ant-dropdown-link"
          @click.prevent
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
            {{ $auth.user ? $auth.user.email : '' }}
          </a-menu-item>
          <a-menu-item key="1">
            <nuxt-link to="/profile">
              <font-awesome-icon
                icon="user"
                class="width-1x"
              />&nbsp;
              {{ $t('common.profile') }}
            </nuxt-link>
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

    <!-- <a-layout-header :style="style">
    <nuxt-link
      to="/projects"
      class="box-left pl-3"
    >
      <img
        :src="require(`~/assets/images/logo.png`)"
        width="50"
      />
      <div class="header__title">
        <h4>CHAOHANHVN</h4>
        <h3>PROJECTS MANAGEMENT</h3>
      </div>
    </nuxt-link> -->

    <!-- <div class="box-right pr-3">
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
      title="Do you want to logout？"
      cancel-text="Cancel"
      ok-text="Ok"
      @ok="logout"
      @cancel="hideDialog"
    /> -->
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
import { mapGetters, mapActions } from 'vuex'
// import ActionDialog from '~/components/molecules/ActionDialog.vue'
import { REFRESH_TOKEN } from '~/constants/cookies'

export default {
  components: {
    // ActionDialog
  },

  // data() {
  //   return {
  //     style: {
  //       position: 'fixed',
  //       zIndex: 1,
  //       width: '100%',
  //       background: 'hsl(125deg 21% 49%)'
  //     },
  //     visible: false
  //   }
  // },

  computed: {
    ...mapGetters({
      isActiveSidebar: 'isActiveSidebar'
    }),

    isCollapsed: {
      get() {
        return this.isActiveSidebar
      },
      set(value) {
        this.setIsActiveSidebar(value)
      }
    },

    currentLocaleISO() {
      const locale = this.$i18n.locales.find(item => item.code === this.$i18n.locale)
      return locale ? locale.iso : 'en-US'
    }
  },

  methods: {
    ...mapActions({
      setIsActiveSidebar: 'setIsActiveSidebar'
    }),

    /**
     * Show modal
     */
    showDialog() {
      this.visible = true
    },

    /**
     * Toggle collapsed status
     */
    toggleIsCollapsed() {
      this.isCollapsed = !this.isCollapsed
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
        this.$cookies.remove(REFRESH_TOKEN, { path: '/' })
        await this.$auth.logout()
      } catch (_) {
        this.$cookies.remove(REFRESH_TOKEN, { path: '/' })
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
