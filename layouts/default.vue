<template>
  <a-layout class="default-layout">
    <a-layout-sider v-model="collapsed" collapsible>
      <div class="logo" />

      <a-menu theme="dark" :default-selected-keys="['1']" mode="inline">
        <a-menu-item key="1">
          <font-awesome-icon icon="tachometer-alt" class="anticon" />
          <span>Dashboard</span>
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

        <a-menu-item>
          <nuxt-link to="users">
            <font-awesome-icon icon="user-friends" class="anticon" />
            <span>Users</span>
          </nuxt-link>
        </a-menu-item>

        <a-menu-item>
          <nuxt-link to="roles">
            <font-awesome-icon icon="balance-scale" class="anticon" />
            <span>Roles</span>
          </nuxt-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>

      <a-layout-content>
        <transition name="fade">
          <div class="container-fluid">
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
    .logo {
      height: 32px;
      background: rgba(255, 255, 255, 0.2);
      margin: 16px;
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
import Footer from '~/components/organisms/Footer'

export default {
  components: {
    Footer
  },

  data() {
    return {
      collapsed: false
    }
  }
}
</script>
