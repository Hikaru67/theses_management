<template>
  <div class="expand-search-form">
    <div
      :class="['expand', { expanded: isShow }]"
      :style="`height: ${expandHeight}px`"
    >
      <div ref="content">
        <slot />
      </div>
    </div>

    <div
      class="link-wrapper"
      @click="toggleSearchForm"
    >
      <div :class="['link', { 'is-active': isShow }]">
        {{ isShow ? $t('common.less') : $t('common.more') }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.expand-search-form {
  .expand {
    overflow: hidden;
    transition: 0.3s;
  }
  .link-wrapper {
    display: inline-block;
  }
  .link {
    color: #909399;
    cursor: pointer;
    padding-top: 5px;
    transition: all 0.4s ease;
    &:hover {
      color: #333;
    }
    &:before {
      border: 1px solid #909399;
      padding: 0.1em 0.3em;
      content: '＋';
    }
    &.is-active {
      &:before {
        content: '－';
      }
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      isShow: false
    }
  },

  computed: {
    /**
     * Expand the height of search form
     */
    expandHeight() {
      if (this.isShow) {
        return this.$refs.content.clientHeight + 15
      }

      return 0
    }
  },

  mounted() {
    this.observeKey()
  },

  methods: {
    /**
     * Show/Hidden other conditions
     */
    toggleSearchForm() {
      this.isShow = !this.isShow
    },

    /**
     * Disable the keyboard operation of the hidden part
     */
    keyDown(e) {
      if (!this.isShow) {
        e.preventDefault()
      }
    },

    /**
     * Observe keys event
     */
    observeKey() {
      this.$refs.content.addEventListener('keydown', this.keyDown)
    }
  }
}
</script>
