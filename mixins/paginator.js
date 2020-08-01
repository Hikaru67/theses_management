/*
 * Copyright 2020 Digi Dinos JSC. All rights reserved.
 * Email: tech@digidinos.com.
 */

import { PAGE_SIZES } from '~/constants'

const Paginator = {
  data() {
    return {
      limit: PAGE_SIZES[0],
      page: 1
    }
  },

  computed: {
    /**
     * Get pagination query
     *
     * @param {Object} Pagination query
     */
    paginationQuery() {
      return {
        limit: this.limit,
        page: this.page
      }
    }
  },

  created() {
    this.getPaginationParamsFromRoute()
  },

  methods: {
    /**
     * Get params from route
     * Set pagination when url has pagination param
     */
    getPaginationParamsFromRoute() {
      if (this.$route.query.page && !this.$route.query.limit) {
        this.setPageAndLimit(+this.$route.query.page, null)
      } else if (this.$route.query.limit) {
        this.setPageAndLimit(1, +this.$route.query.limit)
      } else {
        this.setPaginationQueryToUrl()
      }
    },

    /**
     * Set page, set limit
     *
     * @param {Number} page - Page number
     * @param {Number} limit - Limit number
     */
    setPageAndLimit(page, limit) {
      if (page && !PAGE_SIZES.includes(limit)) {
        this.$debugger.log(page, 'Page ->')
        this.page = page
      } else if (PAGE_SIZES.includes(limit)) {
        this.$debugger.log(limit + ', ' + page, 'Limit, page ->')
        this.page = 1
        this.limit = limit
      } else {
        this.$debugger.log(
          page + ', ' + limit,
          'Invalid page or limit value, will be ignored.'
        )
        return
      }

      this.setPaginationQueryToUrl()
    },

    /**
     * Set pagination query to Url
     */
    setPaginationQueryToUrl() {
      const query = Object.assign({}, this.$route.query, {
        limit: this.paginationQuery.limit.toString(),
        page: this.paginationQuery.page.toString()
      })

      if (JSON.stringify(query) !== JSON.stringify(this.$route.query)) {
        this.$router.replace({ query })
      }
    }
  }
}

export { Paginator }
export default Paginator
