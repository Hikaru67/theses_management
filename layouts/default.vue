<template>
  <a-config-provider :locale="jaJP">
    <a-layout class="default-layout">
      <a-layout>
        <Header />
        <!-- end main header -->

        <a-layout-content class="pt-4">
          <transition name="fade">
            <div>
              <Breadcrumb />
              <!-- end breadcrumb -->

              <Nuxt />
              <!-- end main content -->
            </div>
          </transition>
        </a-layout-content>
      </a-layout>
      <!-- end main sidebar -->
    </a-layout>
  </a-config-provider>
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
import jaJP from 'ant-design-vue/es/locale-provider/ja_JP'
import Header from '~/components/layouts/Header'
import Breadcrumb from '~/components/layouts/Breadcrumb'

export default {
  components: {
    Header,
    Breadcrumb
  },

  middleware: ['auth'],

  data() {
    return {
      jaJP
    }
  }
}
</script>
