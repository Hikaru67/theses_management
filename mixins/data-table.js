/*
 * Copyright 2020 Digi Dinos JSC. All rights reserved.
 * Email: tech@digidinos.com.
 */

import { camelCase } from 'lodash'

export default {
  async fetch() {
    const params = this.$route.query
    this.$store.dispatch('setLoading', true)
    const action = `${this.resource}/getList`
    const { data, meta } = await this.$store.dispatch(action, { params })
    this.pagination = {
      ...this.pagination,
      total: meta ? meta.total : data.length,
      current: +params.page,
      pageSize: +params.limit,
      showTotal: total => `Total ${total} items`
    }
    this.data = data
    this.$store.dispatch('setLoading', false)
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
      this.replaceQuery(query)
    },

    replaceQuery(data) {
      const query = {}
      const newQuery = {
        ...this.$route.query,
        ...data
      }
      Object.entries(newQuery).forEach(([key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
          query[key] = value
        }
      })
      if (JSON.stringify(query) === JSON.stringify(this.$route.query)) {
        this.$fetch()
      } else {
        this.$router.replace({ query })
      }
    },

    goToDetail(id) {
      this.$router.push(`/${this.resource}/${id}`)
    },

    confirmToDelete(id) {
      this.$confirm({
        title: 'Are you sure delete this task?',
        content: 'Some descriptions',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk: () => this.deleteRecord(id)
      })
    },

    async deleteRecord(id) {
      this.$store.dispatch('setLoading', true)
      const action = camelCase(`delete-${this.resource}`)
      await this.$api[action]({ id })
      this.$store.dispatch('setLoading', false)
      this.$fetch()
    }
  }
}
