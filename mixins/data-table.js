/*
 * Copyright 2020 Digi Dinos JSC. All rights reserved.
 * Email: tech@digidinos.com.
 */
export default {
  async fetch() {
    const params = {
      limit: +this.$route.query.limit || 10,
      page: +this.$route.query.page || 1,
      sortOrder: this.$route.query.sortOrder,
      sortField: this.$route.query.sortField
    }

    this.loading = true
    const action = `${this.resource}/getList`
    const { data, meta } = await this.$store.dispatch(action, { params })
    this.pagination = {
      ...this.pagination,
      total: meta ? meta.total : data.length,
      current: params.page,
      pageSize: params.limit,
      showTotal: total => `Total ${total} items`
    }
    this.data = data
    this.loading = false
  },

  data() {
    return {
      data: [],
      loading: false,
      pagination: {
        showSizeChanger: true
      }
    }
  },

  watch: {
    '$route.query': '$fetch'
  },

  methods: {
    handleTableChange(pagination, filters, sorter) {
      const query = {
        limit: pagination.pageSize,
        page: pagination.current,
        sortOrder: sorter.order,
        sortField: sorter.field
      }
      this.$router.replace({ query })
    }
  }
}
