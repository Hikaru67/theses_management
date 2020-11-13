<template>
  <a-config-provider :locale="currentLocale">
    <a-layout class="default-layout">
      <Sidebar />
      <!-- end sidebar menu -->

      <a-layout>
        <Header />
        <!-- end main header -->

        <a-layout-content class="pt-4">
          <transition name="fade">
            <div class="container-fluid">
              <Breadcrumb />
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
import enUS from 'ant-design-vue/es/locale-provider/en_US'
import jaJP from 'ant-design-vue/es/locale-provider/ja_JP'
import viVN from 'ant-design-vue/es/locale-provider/vi_VN'

import Footer from '~/components/layouts/Footer'
import Header from '~/components/layouts/Header'
import Sidebar from '~/components/layouts/Sidebar'
import Breadcrumb from '~/components/layouts/Breadcrumb'

export default {
  components: {
    Footer,
    Header,
    Sidebar,
    Breadcrumb
  },

  middleware: ['auth'],

  data() {
    return {
      locales: {
        enUS,
        jaJP,
        viVN
      }
    }
  },

  computed: {
    currentLocale() {
      const currentLocale = this.$i18n.locales.find(item => item.code === this.$i18n.locale)
      const localePath = currentLocale ? currentLocale.iso : 'en-US'
      return this.locales[`${localePath.replace('-', '')}`]
    }
  }
}
</script>
