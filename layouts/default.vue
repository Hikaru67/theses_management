<template>
  <a-layout class="main-layout">
    <a-layout-sider v-model="collapsed" collapsible>
      <div class="logo" />

      <a-menu theme="dark" :default-selected-keys="['1']" mode="inline">
        <a-menu-item key="1">
          <font-awesome-icon icon="tachometer-alt" class="anticon" />
          <span>Dashboard</span>
        </a-menu-item>

        <a-sub-menu key="sub2">
          <span slot="title">
            <font-awesome-icon icon="user-friends" class="anticon" />
            <span>Team</span>
          </span>

          <a-menu-item key="6">
            Team 1
          </a-menu-item>

          <a-menu-item key="8">
            Team 2
          </a-menu-item>
        </a-sub-menu>

        <a-menu-item>
          <font-awesome-icon icon="user-friends" class="anticon" />
          <span>Users</span>
        </a-menu-item>

        <a-menu-item>
          <font-awesome-icon icon="balance-scale" class="anticon" />
          <span>Roles</span>
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

      <a-layout-content
        :style="{ margin: '24px 16px 0', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <transition name="fade">
          <Nuxt />
        </transition>
      </a-layout-content>

      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
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
.main-layout {
  /deep/ {
    min-height: 100vh;
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
</style>

<script>
export default {
  data() {
    return {
      collapsed: false
    }
  }
}
</script>
