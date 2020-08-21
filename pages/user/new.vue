<template>
  <user-form
    @save="goBack"
    @cancel="goBack"
  />
</template>
<script>

import UserForm from '~/components/organisms/UserForm'

export default {
  components: { UserForm },
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
