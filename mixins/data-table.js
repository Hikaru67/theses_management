/*
 * Copyright 2020 Digi Dinos JSC. All rights reserved.
 * Email: tech@digidinos.com.
 */

import { camelCase } from 'lodash'
import { mapGetters } from 'vuex'

export default {
  async fetch() {
    try {
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
    } catch (_) {
      this.$notification.error({
        message: this.$t('text.something_wrong')
      })
    } finally {
      this.$store.dispatch('setLoading', false)
    }
  },

  data() {
    return {
      data: [],
      pagination: {
        showSizeChanger: true
      }
    }
  },

  computed: {
    ...mapGetters({
      loading: 'loading'
    })
  },

  watch: {
    /**
     * Watching changes of route
     */
    '$route.query': '$fetch'
  },

  methods: {
    /**
     * Handle table change
     *
     * @param {Object} Pagination
     * @param {Object} Filters
     * @param {Object} Sorter
     */
    handleTableChange(pagination, filters, sorter) {
      const query = {
        limit: pagination.pageSize,
        page: pagination.current,
        sortOrder: sorter.order,
        sortField: sorter.field
      }
      this.replaceQuery(query)
    },

    /**
     * Replace query
     *
     * @param {Object} Data query
     */
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

    /**
     * Go to new
     */
    gotoNew() {
      this.$router.push(`/${this.resource}/new`)
    },

    /**
     * Go to detail
     *
     * @param {Number} id
     */
    goToDetail(id) {
      this.$router.push(`/${this.resource}/${id}`)
    },

    /**
     * Confirm to delete
     *
     * @param {Number} id
     */
    confirmToDelete(id) {
      this.$confirm({
        title: this.$t('text.confirm_to_delete'),
        okText: this.$t('common.yes'),
        okType: 'danger',
        cancelText: this.$t('common.no'),
        onOk: () => this.deleteRecord(id)
      })
    },

    /**
     * Delete record
     *
     * @param {Number} id
     */
    async deleteRecord(id) {
      try {
        this.$store.dispatch('setLoading', true)
        const action = camelCase(`destroy-${this.resource}`)
        await this.$api[action]({ id })

        this.$notification.success({
          message: this.$t('text.successfully')
        })
        this.$fetch()
      } catch (_) {
        this.$notification.error({
          message: this.$t('text.something_wrong')
        })
      } finally {
        this.$store.dispatch('setLoading', false)
      }
    }
  }
}
