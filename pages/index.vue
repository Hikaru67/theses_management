<template>
  <div>
    <font-awesome-icon icon="home" />
    <p>{{ $t('welcome') }}</p>
    <pre>{{ data }}</pre>
  </div>
</template>

<script>
export default {
  data: () => ({
    data: []
  }),

  async mounted() {
    // const { data } = await this.$api.updatePosts({
    //   id: 8,
    //   name: 'demo'
    // })
    // console.warn(this.$api)
    // this.data = data
  }
}
</script>

<style>

</style>
