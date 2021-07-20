<template>
  <div>
    <component
      :is="errorPage"
      :error="error"
    />
  </div>
</template>

<script>
import error403 from '~/components/errors/403.vue'
import error404 from '~/components/errors/404.vue'
import error500 from '~/components/errors/500.vue'
export default {
  props: {
    error: {
      type: Object,
      default: () => { }
    }
  },

  computed: {
    errorPage() {
      if (this.error.statusCode === 403) {
        return error403
      }

      if (this.error.statusCode === 404) {
        return error404
      }

      return error500
    }
  }
}
</script>
