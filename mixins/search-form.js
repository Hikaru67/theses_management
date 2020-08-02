/*
 * Copyright 2020 Digi Dinos JSC. All rights reserved.
 * Email: tech@digidinos.com.
 */

const SearchFormHandler = {
  data() {
    return {
      resourceTypeName: null,
      loading: false
    }
  },

  computed: {
    /**
     * Get query
     */
    query() {
      return Object.assign(
        {},
        this.paginationQuery,
        this.conditionQuery,
        typeof this.additionalParams !== 'undefined'
          ? this.additionalParams
          : {}
      )
    }
  },

  methods: {
    /**
     * Refresh to get data
     */
    refresh() {
      this.doAsync(this.fetch)
        .catch(err => {
          console.error(err)

          this.$notification.error({
            message: this.$t('messages.error.failed_to_get', { name: this.resourceTypeName })
          })
        })
    },

    /**
     * After the deletion confirmation dialog is confirmed
     */
    onDelete() {
      if (this.selectedId) {
        this.delete(this.selectedId)
          .then(_ => {
            this.$notification.success({
              message: this.$t('messages.information.deleted', { name: this.resourceTypeName })
            })

            this.refresh()
          })
          .catch(err => {
            console.error(err)

            this.$notification.error({
              message: this.$t('messages.error.failed_to_delete', { name: this.resourceTypeName })
            })
          })
      }
    },

    /**
     * Search data
     * Set page = 1, limit = null
     *
     * @param {Number} val - Condition from search form
     */
    onSearch(val) {
      this.setPageAndLimit(1, null)
      this.setCondition(Object.assign({}, this.defaultCondition, val))
      this.refresh()
    },

    /**
     * Change page number ("page" value)
     * Set page = val, limit = null
     *
     * @param {Number} val - Page number
     */
    onPageChange(val) {
      this.setPageAndLimit(+val, null)
      this.refresh()
    },

    /**
     * Change page size number ("limit" value)
     * Set page = 1, limit = val
     *
     * @param {Number} val - Page size number
     */
    onPageSizeChange(val) {
      this.setPageAndLimit(1, +val)
      this.refresh()
    }
  }
}

export { SearchFormHandler }
export default SearchFormHandler
