<template>
  <a-breadcrumb class="mb-3">
    <a-breadcrumb-item
      v-for="(item, index) in crumbs"
      :key="index"
    >
      <nuxt-link :to="item.to">
        {{ item.text }}
      </nuxt-link>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
import { BREAD_CRUMB_LIST } from '~/constants'

export default {
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
        crumb.text = this.getCrumbName(item.path.replace(/\//, ''))

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
      return BREAD_CRUMB_LIST.map(item => {
        return {
          id: item.id,
          name: this.$t(item.name),
          value: item.value
        }
      })
    }
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
