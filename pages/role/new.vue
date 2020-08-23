<template>
  <role-form
    @save="goBack"
    @cancel="goBack"
  />
</template>
<script>

import RoleForm from '~/components/organisms/RoleForm'

export default {
  components: { RoleForm },
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
