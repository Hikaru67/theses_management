<template>
  <role-form
    :id="id"
    @save="goBack"
    @cancel="goBack"
  />
</template>
<script>

import RoleForm from '~/components/organisms/RoleForm'

export default {
  components: { RoleForm },
  data() {
    return {
      id: +this.$route.params.id || 0
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
