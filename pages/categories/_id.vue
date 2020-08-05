<template>
  <div>
    xxx
  </div>
  <!-- <category-form :id="id" @cancel="gotoIndex" @modify="gotoIndex" /> -->
</template>

<script>
// import CategoryForm from '~/components/organisms/categories/CategoryForm'

export default {
  components: {
    // CategoryForm
  },

  computed: {
    /**
     * Get box Id
     *
     * @return {Object} Category Id
     */
    id() {
      return +this.$route.params.id
    },

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
