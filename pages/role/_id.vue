<template>
  <div class="main-detail">
    <a-card class="mb-4">
      <template slot="title">
        <font-awesome-icon icon="pencil-alt" />
        {{ $t('role.role') }}
      </template>

      <div class="max-w-900">
        <role-form
          :id="id"
          @save="goBack"
          @cancel="goBack"
        />
      </div>
    </a-card>
  </div>
</template>

<script>
import RoleForm from '~/components/templates/RoleForm'

export default {
  components: {
    RoleForm
  },

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
