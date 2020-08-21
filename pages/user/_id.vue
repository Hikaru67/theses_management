<template>
  <user-form
    :id="id"
    @save="goBack"
    @cancel="goBack"
  />
</template>
<script>

import UserForm from '~/components/organisms/UserForm'

export default {
  components: { UserForm },
  computed: {
    /**
     * Get user Id
     *
     * @return {Object} user Id
     */
    id() {
      return +this.$route.params.id
    }
  },
  methods: {
    /**
     * Go to list
     */
    goBack() {
      this.$router.push({
        path: '../',
        append: true
      })
    }
  }
}
</script>
