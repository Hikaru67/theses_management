<template>
  <a-layout-header>
    <a-icon
      class="btn-trigger"
      :type="isCollapsed ? 'menu-unfold' : 'menu-fold'"
      @click="$emit('trigger')"
    />
  </a-layout-header>
</template>

<style lang="scss" scoped>
</style>

<script>
export default {
  components: {
  },

  props: {
    /**
     * Is collapsed
     */
    isCollapsed: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
    }
  },

  methods: {
  }
}
</script>
