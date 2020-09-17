<template>
  <a-layout class="default-layout">
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
            alt="DigiDinos"
          />
        </nuxt-link>
      </div>
      <!-- end logo -->

      <a-menu
        theme="dark"
        mode="inline"
      >
        <template v-for="item in menu">
          <a-menu-item
            v-if="!item.menus.length"
            :key="item.id"
          >
            <font-awesome-icon
              v-if="item.icon"
              :icon="item.icon"
              class="anticon"
            />
            <nuxt-link
              v-if="item.link"
              :to="item.link"
            >
              {{ item.title }}
            </nuxt-link>
            <span v-else>{{ item.title }}</span>
          </a-menu-item>
          <sub-menu
            v-else
            :key="item.id"
            :menu="item"
          />
        </template>
      </a-menu>
      <!-- end sidebar menu -->
    </a-layout-sider>

    <a-layout>
      <Header
        :is-collapsed="isCollapsed"
        @trigger="isCollapsed = !isCollapsed"
      />
      <!-- end main header -->

      <a-layout-content class="pt-4">
        <transition name="fade">
          <div class="container-fluid">
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
            <!-- end breadcrumb -->

            <Nuxt />
            <!-- end main content -->
          </div>
        </transition>
      </a-layout-content>

      <Footer />
      <!-- end main footer -->
    </a-layout>
    <!-- end main sidebar -->
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
import SubMenu from '~/components/organisms/SubMenu'

import Layout from '~/mixins/layout'

const COLLAPSED_WIDTH = 80

export default {

  components: {
    Footer,
    SubMenu,
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
