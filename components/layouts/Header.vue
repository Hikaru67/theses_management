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
            <nuxt-link :to="switchLocalePath(locale.code)">
              <img :src="require(`~/assets/images/ic_flag_${locale.iso}.png`)" />
            </nuxt-link>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
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
  </a-layout-header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
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
     * Logout user
     */
    async logout() {
      this.$store.dispatch('setLoading', true)

      try {
        await this.$auth.logout()
      } catch (err) {
        this.message = this.$t(
          'messages.error.unmatch_value',
          { name1: this.$t('user.email'), name2: this.$t('user.password') }
        )
      } finally {
        this.$store.dispatch('setLoading', false)
      }
    },

    /**
     * Toggle collapsed status
     */
    toggleIsCollapsed() {
      this.isCollapsed = !this.isCollapsed
    }
  }
}
</script>
