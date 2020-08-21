<template>
  <a-table
    :columns="columns"
    :row-key="record => record.id"
    :data-source="data"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  >
    <span
      slot="action"
      slot-scope="record"
    >
      <a-button
        type="primary"
        :disabled="loading"
        @click="goToDetail(record.id)"
      >
        <font-awesome-icon
          icon="eye"
          class="width-1x"
        />
      </a-button>
    </span>
  </a-table>
</template>
<script>

import DataTable from '~/mixins/data-table'

export default {
  mixins: [DataTable],
  data: () => ({
    resource: 'user'
  }),
  computed: {
    columns() {
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          sorter: true,
          width: '20%'
        },
        {
          title: 'Email',
          sorter: true,
          dataIndex: 'email'
        },
        {
          title: 'Action',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ]
      columns.forEach(item => {
        if (this.$route.query.sortField === item.dataIndex) {
          item.sortOrder = this.$route.query.sortOrder
        }
      })
      return columns
    }
  },
  methods: {
    goToDetail(id) {
      this.$router.push(`/user/${id}`)
    }
  }
}
</script>
