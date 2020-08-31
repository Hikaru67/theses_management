<template>
  <a-layout class="default-layout">
    <!-- main sidebar -->
    <a-layout-sider
      v-model="isCollapsed"
      collapsible
      width="256"
      :collapsed-width="collapsedWidth"
    >
      <!-- logo -->
      <div class="logo">
        <nuxt-link
          to="/"
          class="over"
        >
          <img
            src="~/assets/images/logo.png"
            alt="DigiDinos"
          />
        </nuxt-link>
      </div>

      <!-- sidebar menu -->
      <a-menu
        theme="dark"
        mode="inline"
      >
        <a-menu-item>
          <nuxt-link
            to="/"
            :class="`${$route.path === '/' ? 'on-home' : ''}`"
          >
            <font-awesome-icon
              icon="tachometer-alt"
              class="anticon"
            />
            <span>Dashboard</span>
          </nuxt-link>
        </a-menu-item>

        <a-menu-item-group
          v-for="group in menu"
          :key="group.id"
        >
          <template slot="title">
            <span>{{ group.title }}</span>
          </template>

          <template v-if="group.menus.length">
            <template v-for="parent in group.menus">
              <a-sub-menu
                v-if="parent.menus.length > 1"
                :key="parent.id"
              >
                <span slot="title">
                  <font-awesome-icon
                    v-if="parent.icon"
                    :icon="parent.icon"
                    class="anticon"
                  />
                  <span>{{ parent.title }}</span>
                </span>

                <a-menu-item
                  v-for="child in parent.menus"
                  :key="child.length"
                >
                  <nuxt-link :to="child.link">
                    <font-awesome-icon
                      v-if="child.icon"
                      :icon="child.icon"
                      class="anticon"
                    />
                    <span>{{ child.title }}</span>
                  </nuxt-link>
                </a-menu-item>
              </a-sub-menu>

              <a-menu-item
                v-else
                :key="parent.id"
              >
                <nuxt-link :to="parent.menus[0].link">
                  <font-awesome-icon
                    v-if="parent.menus[0].icon"
                    :icon="parent.menus[0].icon"
                    class="anticon"
                  />
                  <span>{{ parent.menus[0].title }}</span>
                </nuxt-link>
              </a-menu-item>
            </template>
          </template>
        </a-menu-item-group>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <!-- main header -->
      <Header
        :is-collapsed="isCollapsed"
        @trigger="isCollapsed = !isCollapsed"
      />

      <a-layout-content class="pt-4">
        <transition name="fade">
          <div class="container-fluid">
            <!-- breadcrumb -->
            <a-breadcrumb class="mb-3">
              <a-breadcrumb-item
                v-for="(item, index) in crumbs"
                :key="index"
              >
                <nuxt-link :to="item.to">
                  {{ item.text }}
                </nuxt-link>
              </a-breadcrumb-item>
            </a-breadcrumb>

            <!-- main content -->
            <Nuxt />
          </div>
        </transition>
      </a-layout-content>

      <!-- main footer -->
      <Footer />
    </a-layout>
  </a-layout>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

<script>
import { BREAD_CRUMB_LIST } from '~/constants'

import Footer from '~/components/organisms/Footer'
import Header from '~/components/organisms/Header'

import Layout from '~/mixins/layout'

const COLLAPSED_WIDTH = 80

export default {

  components: {
    Footer,
    Header
  },

  mixins: [
    Layout
  ],
  middleware: ['auth'],

  data() {
    return {
      isCollapsed: false,
      collapsedWidth: COLLAPSED_WIDTH
    }
  },

  computed: {
    menu() {
      return this.$auth.user.menus
    },
    /**
     * Breadcrumbs
     *
     * return {Array} - Breadcrumbs
     */
    crumbs() {
      const crumbs = [
        { to: '/', text: this.$t('common.home') }
      ]

      this.$route.matched.map((item, i, { length }) => {
        const crumb = {}

        crumb.to = item.path
        crumb.text = this.getCrumbName(item.path.replace(/\//, ''))

        // is last item?
        if (i === length - 1) {
          // is param route? .../.../:id
          if (item.regex.keys.length > 0) {
            crumbs.push({
              to: item.path.replace(/\/:[^/:]*$/, ''),
              text: this.getCrumbName(item.name.replace(/-[^-]*$/, ''))
            })
            crumb.to = this.$route.path
            crumb.text = this.$route.path.match(/[^/]*$/)[0]
          }
        }

        crumbs.push(crumb)
      })

      return crumbs
    },

    /**
     * Breadcrumb list
     */
    breadcrumbList() {
      return BREAD_CRUMB_LIST.map(item => {
        return {
          id: item.id,
          name: this.$t(item.name),
          value: item.value
        }
      })
    }
  },

  watch: {
    /**
     * Watching changes of isPC
     */
    isPC(val) {
      this.isCollapsed = !val
      this.collapsedWidth = val ? COLLAPSED_WIDTH : 0
    }
  },

  mounted() {
    // notification config global
    this.$notification.config({
      duration: 2
    })
  },

  methods: {
    /**
     * Get breadcrumb name
     *
     * @param {String} name
     * @return {String} breadcrumb name
     */
    getCrumbName(name) {
      let crumb = this.breadcrumbList.find(el => el.value === name)

      if (this.$route.params.id) {
        crumb = this.breadcrumbList.find(el => el.value === name.split('-')[0])
      }

      return crumb && crumb.name ? crumb.name : ''
    }
  }
}
</script>
