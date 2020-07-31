<template>
  <pre>{{ data }}</pre>
</template>

<script>
export default {
  data: () => ({
    data: []
  }),

  async mounted() {
    const { data } = await this.$api.indexPosts()
    console.warn(this.$api)
    this.data = data
  }
}
</script>

<style>

</style>
