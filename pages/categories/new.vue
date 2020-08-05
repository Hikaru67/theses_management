<template>
  <div>
    xxx
  </div>
  <!-- <category-form @modify="gotoIndex" @cancel="gotoIndex" /> -->
</template>

<script>
// import CategoryForm from '~/components/organisms/categories/CategoryForm'

export default {
  components: {
    // CategoryForm
  },

  computed: {
    /**
     * Index path
     *
     * @return {Object} Index path
     */
    indexPath() {
      return {
        path: '../',
        append: true
      }
    }
  },

  methods: {
    /**
     * Go to Index
     */
    gotoIndex() {
      this.$router.push(this.indexPath)
    }
  }
}
</script>
