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
        <nuxt-link to="/" class="over">
          <img src="~/assets/images/logo.png" alt="DigiDinos" />
        </nuxt-link>
      </div>

      <!-- sidebar menu -->
      <a-menu theme="dark" mode="inline">
        <a-menu-item>
          <nuxt-link to="/" :class="`${$route.path === '/' ? 'on-home' : ''}`">
            <font-awesome-icon icon="tachometer-alt" class="anticon" />
            <span>Dashboard</span>
          </nuxt-link>
        </a-menu-item>

        <a-sub-menu>
          <span slot="title">
            <font-awesome-icon icon="cog" class="anticon" />
            <span>Multi level</span>
          </span>

          <a-menu-item>
            <nuxt-link to="/login">
              <font-awesome-icon icon="sign-in-alt" class="anticon" />
              <span>Login</span>
            </nuxt-link>
          </a-menu-item>

          <a-menu-item>
            <nuxt-link to="/forgot">
              <font-awesome-icon icon="lock" class="anticon" />
              <span>Forgot</span>
            </nuxt-link>
          </a-menu-item>
        </a-sub-menu>

        <a-menu-item-group>
          <template slot="title">
            <span>Module</span>
          </template>

          <a-menu-item key="11">
            <nuxt-link to="/articles">
              <font-awesome-icon icon="file-alt" class="anticon" />
              <span>Articles</span>
            </nuxt-link>
          </a-menu-item>

          <a-menu-item key="12">
            <nuxt-link to="/article-category">
              <font-awesome-icon icon="book" class="anticon" />
              <span>Article Category</span>
            </nuxt-link>
          </a-menu-item>

          <a-menu-item key="13">
            <nuxt-link to="/categories">
              <font-awesome-icon icon="th-list" class="anticon" />
              <span>Categories</span>
            </nuxt-link>
          </a-menu-item>

          <a-menu-item key="14">
            <nuxt-link to="/sites">
              <font-awesome-icon icon="sitemap" class="anticon" />
              <span>Sites</span>
            </nuxt-link>
          </a-menu-item>
        </a-menu-item-group>

        <a-menu-item-group>
          <template slot="title">
            <span>System</span>
          </template>

          <a-menu-item key="21">
            <nuxt-link to="/users">
              <font-awesome-icon icon="user-friends" class="anticon" />
              <span>Users</span>
            </nuxt-link>
          </a-menu-item>

          <a-menu-item key="22">
            <nuxt-link to="/roles">
              <font-awesome-icon icon="balance-scale" class="anticon" />
              <span>Roles</span>
            </nuxt-link>
          </a-menu-item>

          <a-menu-item key="23">
            <nuxt-link to="/menus">
              <font-awesome-icon icon="stream" class="anticon" />
              <span>Menus</span>
            </nuxt-link>
          </a-menu-item>
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
              <a-breadcrumb-item v-for="(item, index) in crumbs" :key="index">
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

  data() {
    return {
      isCollapsed: false,
      collapsedWidth: COLLAPSED_WIDTH
    }
  },

  computed: {
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
        crumb.text = this.getCrumbName(item.name)

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
      const list = BREAD_CRUMB_LIST.map(item => {
        return {
          id: item.id,
          name: this.$t(item.name),
          value: item.value
        }
      })

      return list
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
