<template>
  <a-row type="flex" justify="center" align="middle" class="blank-layout container-fluid min-h-100vh">
    <transition name="fade">
      <Nuxt />
    </transition>
  </a-row>
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
