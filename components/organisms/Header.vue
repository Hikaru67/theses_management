<template>
  <a-layout-header>
    <div class="box-left">
      <a href="#" class="btn-trigger" @click="$emit('trigger')">
        <a-icon :type="isCollapsed ? 'menu-unfold' : 'menu-fold'" />
      </a>
    </div>

    <div class="box-right pr-4">
      <header-dropdown-language />
      <header-dropdown-account />
    </div>
  </a-layout-header>
</template>

<script>
import HeaderDropdownAccount from '~/components/organisms/HeaderDropdownAccount'
import HeaderDropdownLanguage from '~/components/organisms/HeaderDropdownLanguage'

export default {
  components: {
    HeaderDropdownAccount,
    HeaderDropdownLanguage
  },

  props: {
    /**
     * Is collapsed
     */
    isCollapsed: {
      type: Boolean,
      default: true
    }
  }
}
</script>
