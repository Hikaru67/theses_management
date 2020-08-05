<template>
  <a-layout class="default-layout">
    <a-layout-sider
      v-model="isCollapsed"
      collapsible
      width="256"
      :collapsed-width="collapsedWidth"
    >
      <div class="logo" />

      <!-- <a-menu theme="dark" :default-selected-keys="['1']" mode="inline"> -->
      <a-menu theme="dark" mode="inline">
        <a-menu-item>
          <nuxt-link to="/">
            <font-awesome-icon icon="tachometer-alt" class="anticon" />
            <span>Dashboard</span>
          </nuxt-link>
        </a-menu-item>

        <a-sub-menu>
          <span slot="title">
            <font-awesome-icon icon="user-friends" class="anticon" />
            <span>Team</span>
          </span>

          <a-menu-item>
            Team 1
          </a-menu-item>

          <a-menu-item>
            Team 2
          </a-menu-item>
        </a-sub-menu>

        <a-menu-item-group>
          <template slot="title"><span>Module</span> </template>

          <a-menu-item key="11">
            <nuxt-link to="/categories">
              <font-awesome-icon icon="th-list" class="anticon" />
              <span>Categories</span>
            </nuxt-link>
          </a-menu-item>
        </a-menu-item-group>

        <a-menu-item-group>
          <template slot="title"><span>System</span> </template>

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
        </a-menu-item-group>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="isCollapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (isCollapsed = !isCollapsed)"
        />
      </a-layout-header>

      <a-layout-content class="pt-4">
        <transition name="fade">
          <div class="container-fluid">
            <a-breadcrumb class="mb-3">
              <a-breadcrumb-item v-for="(item, index) in crumbs" :key="index">
                <nuxt-link :to="item.to">
                  {{ item.text }}
                </nuxt-link>
              </a-breadcrumb-item>
            </a-breadcrumb>

            <Nuxt />
          </div>
        </transition>
      </a-layout-content>

      <Footer />
    </a-layout>
  </a-layout>
</template>

<style lang="scss" scoped>
.default-layout {
  /deep/ {
    .logo {
      height: 32px;
      background: rgba(255, 255, 255, 0.2);
      margin: 16px;
    }
    .trigger {
      font-size: 18px;
      line-height: 64px;
      padding: 0 24px;
      cursor: pointer;
      transition: color 0.3s;
      &:hover {
        // color: $primary;
        color: #1890ff;
      }
    }
    .ant-layout-sider-zero-width-trigger {
      display: none;
    }
  }
}
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

import Layout from '~/mixins/layout'

const COLLAPSED_WIDTH = 80

export default {
  components: {
    Footer
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

    // /**
    //  * Current first of path
    //  *
    //  * return {Array} - Current first of path
    //  */
    // currentFirstPath() {
    //   return this.currentPath.split('/')[1]
    // }
  },

  watch: {
    /**
     * Watching changes of isPC
     */
    isPC(val) {
      this.isCollapsed = !val
      this.collapsedWidth = val ? COLLAPSED_WIDTH : 0
    }

    // /**
    //  * Watching change of route
    //  * Check route to show/hide list button
    //  */
    // $route() {
    //   this.currentPath = this.$router.currentRoute.path
    //   this.showListButton(this.currentPath)
    // }
  },

  mounted() {
    // this.currentPath = this.$router.currentRoute.path
    // this.showListButton(this.currentPath)

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

    // /**
    //  * Set status of isVisibleListButton
    //  *
    //  * @param {String} currentPath - Current path of route
    //  */
    // showListButton(currentPath) {
    //   this.isVisibleListButton = PATH_LIST_FOR_SHOW_LIST_BUTTON.includes(
    //     currentPath
    //   )
    // }
  }
}
</script>
