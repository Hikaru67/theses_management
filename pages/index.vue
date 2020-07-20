<template>
  <div>{{ data }}</div>
</template>

<script>
export default {
  data: () => ({
    data: []
  }),

  async mounted () {
    const { data } = await this.$api.indexUsers()
    console.warn(this.$api)
    this.data = data
  }
}
</script>

<style>

</style>
