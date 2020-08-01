<template>
  <a-table
    :columns="FIELDS"
    :data-source="data"
    :row-key="record => record.id"
    :pagination="false"
    :loading="tableLoading"
    class="main-table"
  >
    <template slot="roles" slot-scope="text, record">
      {{ getRolesName(record.roles) }}
    </template>

    <template slot="status" slot-scope="text, record">
      <a-tag :color="record.status === 1 ? 'green' : ''">
        {{ record.status === 1 ? 'Active' : 'Inactive' }}
      </a-tag>
    </template>

    <template slot="action" slot-scope="text, record">
      {{ record.status === 1 ? 'Active' : 'Inactive' }}
    </template>
  </a-table>
</template>

<style lang="scss" scoped>
.main-table {
  /deep/ {
    table {
      // border-top: 1px solid #e8e8e8;
      // thead {
      //   tr {
      //     th {
      //       text-align: center;
      //       &.id {
      //         width: 60px
      //       }
      //       &.name {
      //         text-align: left;
      //       }
      //       &.email {
      //         text-align: left;
      //       }
      //       &.roles {
      //         text-align: left;
      //         width: 250px;
      //       }
      //       &.update_status {
      //         width: 140px;
      //       }
      //       &.action {
      //         width: 140px;
      //       }
      //     }
      //     td {
      //       padding: 0 12px;
      //       vertical-align: 0;
      //       text-align: center;
      //     }
      //   }
      // }
    }
  }
}
</style>

<script>
// import { get } from 'lodash'
// import { mapGetters } from 'vuex'

const FIELDS = [
  { dataIndex: 'id', title: 'user.id', width: 60 },
  { dataIndex: 'name', title: 'user.name' },
  { dataIndex: 'email', title: 'user.email' },
  { dataIndex: 'roles', title: 'user.roles', scopedSlots: { customRender: 'roles' } },
  { dataIndex: 'status', title: 'user.status', scopedSlots: { customRender: 'status' } },
  { dataIndex: 'action', title: 'common.action', scopedSlots: { customRender: 'action' }, width: 140 }
]

const EVENT_DELETE = 'delete'
const EVENT_SHOW_DETAIL = 'show-detail'

export default {
  props: {
    /**
     * User list
     */
    data: {
      type: Array,
      default: () => []
    },

    /**
     * Loading status
     */
    loading: {
      type: Boolean,
      default: false
    }
  },

  mixins: [
  ],

  computed: {
    // ...mapGetters('user', ['getUser']),

    // /**
    //  * Current id
    //  *
    //  * @return {number} Current id
    //  */
    // currentId() {
    //   return get(this, 'getUser.id', 0)
    // },

    /**
     * Get FIELDS of header table
     *
     * @return {array} FIELDS of header table
     */
    FIELDS() {
      console.log(this.data)
      return FIELDS.map(item => {
        return {
          ...item,
          title: this.$t(item.title)
        }
      })
    },

    /**
     * Loading & icon loading
     *
     * @return {object} Loading & icon loading
     */
    tableLoading() {
      return {
        spinning: this.loading,
        indicator: <a-spin />
      }
    }
  },

  methods: {
    /**
     * Get roles name
     *
     * @param {array} roles - Role list
     */
    getRolesName(roles) {
      if (!Array.isArray(roles) || !roles.length) {
        return ''
      }

      return roles.map(role => role.name).join(', ')
    },

    /**
     * Go to user detail page
     *
     * @param {number} id - User id
     */
    goToDetail(id) {
      if (!id) {
        return
      }

      this.$router.push({ path: `/users/${id}` })
    },

    /**
     * Event show user detail modal
     *
     * @param {number} id - User id
     */
    onShowDetail(id) {
      if (!id) {
        return
      }

      this.$emit(EVENT_SHOW_DETAIL, id)
    },

    /**
     * Delete user
     *
     * @param {object} item - User
     */
    onDelete(item) {
      if (!item || !item.id) {
        return
      }

      this.$emit(EVENT_DELETE, item)
    },

    /**
     * Update status
     *
     * @param {number} id - User id
     */
    onToggleStatus(item) {
      if (!item || !item.id) {
        return
      }

      const params = {
        id: item.id,
        status: item.status === 1 ? 0 : 1
      }

      this.onAction('updateUser', params, this.$t('common.action'))
    }
  }
}
</script>
