<template>
  <a-layout-sider
    v-model="isCollapsed"
    collapsible
    width="256"
    :collapsed-width="collapsedWidth"
  >
    <div class="logo">
      <nuxt-link
        to="/"
        class="over"
      >
        <img
          src="~/assets/images/logo.png"
          alt="hoichaohanh"
        />
      </nuxt-link>
    </div>
    <!-- end logo -->

    <a-menu
      theme="dark"
      mode="inline"
      :selected-keys="selectedKeys"
    >
      <template v-for="item in menu">
        <a-menu-item
          v-if="!item.menus.length"
          :key="item.id"
        >
          <menu-item :item="item" />
        </a-menu-item>

        <sub-menu
          v-else
          :key="item.id"
          :menu="item"
        />
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { debounce, get, trim } from 'lodash'
import { mapGetters, mapActions } from 'vuex'
import SubMenu from '~/components/organisms/SubMenu'
import MenuItem from '~/components/molecules/MenuItem'

export default {
  components: {
    SubMenu,
    MenuItem
  },

  computed: {
    ...mapGetters({
      isPC: 'isPC',
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

    collapsedWidth() {
      return this.isPC ? 80 : 0
    },

    menu() {
      const staticMenu = [
        {
          icon: 'home',
          id: 0,
          link: '/',
          menus: [],
          parent_id: 0,
          position: 0,
          title: 'common.home'
        }
      ]
      const dynamicMenu = get(this, '$auth.user.menus', [])
      const menu = [...staticMenu, ...dynamicMenu]
      menu.sort((a, b) => a.position - b.position)
      return menu
    },

    selectedKeys() {
      const selectedKeys = []
      const deepFind = menu => {
        menu.forEach(item => {
          if (trim(item.link, '/') === trim(this.$route.path, '/')) {
            selectedKeys.push(item.id)
          }
          if (item.menus) {
            deepFind(item.menus)
          }
        })
      }
      deepFind(this.menu)
      return selectedKeys
    }
  },

  mounted() {
    this.checkIsPc()

    let resizeTimer
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer)

      resizeTimer = setTimeout(
        debounce(() => this.checkIsPc()),
        250
      )
    })
  },

  methods: {
    ...mapActions({
      setIsActiveSidebar: 'setIsActiveSidebar'
    }),

    /**
     * Checking is PC
     */
    checkIsPc() {
      const isPC = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) >= 992
      this.$store.dispatch('setIsPC', isPC)
      this.isCollapsed = !isPC
    }
  }
}
</script>
