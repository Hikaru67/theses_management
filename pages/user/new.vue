<template>
  <div class="main-detail">
    <a-card class="mb-4">
      <template slot="title">
        <font-awesome-icon icon="plus-circle" />
        {{ $t('user.user') }}
      </template>

      <user-form
        @save="goBack"
        @cancel="goBack"
      />
    </a-card>
  </div>
</template>
<script>

import UserForm from '~/components/templates/UserForm'

export default {
  components: {
    UserForm
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
