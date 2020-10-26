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
export default {
  computed: {
    crumbs() {
      const crumbs = [
        { to: '/', text: this.$t('common.home') }
      ]

      this.$route.matched.map((item, i, { length }) => {
        const crumb = {}

        crumb.to = item.path
        crumb.text = item.path.replace(/\//, '')

        // is last item?
        if (i === length - 1) {
          // is param route? .../.../:id
          if (item.regex.keys.length > 0) {
            crumbs.push({
              to: item.path.replace(/\/:[^/:]*$/, ''),
              text: item.name.replace(/-[^-]*$/, '')
            })
            crumb.to = this.$route.path
            crumb.text = this.$route.path.match(/[^/]*$/)[0]
          }
        }

        crumbs.push(crumb)
      })

      return crumbs
    }
  }
}
</script>
