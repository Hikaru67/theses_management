<template>
  <div class="main-detail">
    <a-card class="mb-4">
      <template slot="title">
        {{ $t('common.create') }} {{ $t('module.role') }}
      </template>

      <role-form
        @save="goBack"
        @cancel="goBack"
      />
    </a-card>
  </div>
</template>
<script>

import RoleForm from '~/components/templates/RoleForm'

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
