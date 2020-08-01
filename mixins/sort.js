/*
 * Copyright 2020 Digi Dinos JSC. All rights reserved.
 * Email: tech@digidinos.com.
 */

const SortHandler = {
  data() {
    return {
      sortId: -1,
      sort: null,
      sortType: null
    }
  },

  computed: {
    /**
     * Get sort query
     *
     * @param {Object} Sort query
     */
    sortQuery() {
      return {
        sortId: this.sortId,
        sort: this.sort,
        sortType: this.sortType
      }
    }
  },

  created() {
    this.getSortParamsFromRoute()
  },

  methods: {
    /**
     * Set sort id when url has sortId param
     */
    getSortParamsFromRoute() {
      if (this.$route.query.sortId) {
        this.setSort(+this.$route.query.sortId)
      } else {
        this.setSortQueryToUrl()
      }
    },

    /**
     * Set sort
     *
     * @param {Object} id - Sort Id
     */
    setSort(id) {
      if (!id || id === -1) {
        this.sortId = null
        this.sort = null
        this.sortType = null
      }

      const currentSort = this.SORT_LIST.find(item => item.id === id)

      if (currentSort) {
        this.sortId = currentSort.id
        this.sort = currentSort.sort
        this.sortType = currentSort.sortType

        if (this.page) {
          this.page = 1
        }
      }
      this.$debugger.log(this.sortId + ', ' + this.sort + ', ' + this.sortType + ', ' + this.page,
        'sortId, sort, sortType, page ->'
      )

      this.setSortQueryToUrl()
    },

    /**
     * Set sort query to Url
     */
    setSortQueryToUrl() {
      let query = {}

      if (
        this.sortQuery.sortId && this.sortQuery.sortId !== -1
      ) {
        query = Object.assign({}, this.$route.query, {
          sortId: (this.sortQuery.sortId).toString(),
          sort: (this.sortQuery.sort).toString(),
          sortType: (this.sortQuery.sortType).toString()
        })
      } else {
        query = Object.assign({}, this.$route.query)

        delete query.sortId
        delete query.sort
        delete query.sortType
      }

      if (JSON.stringify(query) !== JSON.stringify(this.$route.query)) {
        this.$router.replace({ query })
      }
    },

    /**
     * Sort data
     *
     * @param {Number} id - Sort id from sort select
     */
    onSort(id) {
      this.setSort(id)
      this.refresh()
    }
  }
}

export { SortHandler }
export default SortHandler
