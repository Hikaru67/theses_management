<template>
  <a-table
    :columns="FIELDS"
    :data-source="data"
    :row-key="record => record.id"
    :locale="tableLocale"
    :loading="tableLoading"
    :pagination="false"
    class="main-table"
  >
    <template slot="roles" slot-scope="text, record">
      {{ getRolesName(record.roles) }}
    </template>

    <template slot="status" slot-scope="text, record">
      <a-badge
        :count="`${record.status === 1 ? $t('user.statuses.active') : $t('user.statuses.inactive')}`"
        :number-style="{
          backgroundColor: record.status === 1 ? '#52c41a' : '#d9d9d9'
        }"
        class="btn-status over"
        @click="onToggleStatus(record)"
      />
    </template>

    <template slot="action" slot-scope="text, record">
      <a-button
        html-type="button"
        type="primary"
        size="small"
        :disabled="loading"
        @click="goToDetail(record.id)"
      >
        <font-awesome-icon icon="eye" class="width-1x" />
      </a-button>

      <a-button
        html-type="button"
        type="primary"
        size="small"
        :disabled="loading"
        @click="onShowDetail(record.id)"
      >
        <font-awesome-icon icon="pencil-alt" class="width-1x" />
      </a-button>

      <a-button
        html-type="button"
        type="danger"
        size="small"
        :disabled="loading"
        @click="onDelete(record)"
      >
        <font-awesome-icon icon="trash-alt" class="width-1x" />
      </a-button>
    </template>
  </a-table>
</template>

<style lang="scss" scoped>
.main-table {
  /deep/ {
    table {
      .btn-status {
        cursor: pointer;
      }
    }
  }
}
</style>

<script>
// import { get } from 'lodash'
// import { mapGetters } from 'vuex'

import Table from '~/mixins/table'

const FIELDS = [
  { dataIndex: 'id', title: 'user.id', width: 60 },
  { dataIndex: 'name', title: 'user.name' },
  { dataIndex: 'email', title: 'user.email' },
  { dataIndex: 'roles', title: 'user.roles', scopedSlots: { customRender: 'roles' } },
  { dataIndex: 'status', title: 'user.status', scopedSlots: { customRender: 'status' }, width: 140 },
  { dataIndex: 'action', title: 'common.action', scopedSlots: { customRender: 'action' }, width: 140 }
]

const EVENT_SHOW_DETAIL = 'show-detail'
const EVENT_DELETE = 'delete'
const EVENT_TOGGLE_STATUS = 'toggle-status'

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
    Table
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
      return FIELDS.map(item => {
        return {
          ...item,
          title: this.$t(item.title)
        }
      })
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
     * @param {object} item - User
     */
    onToggleStatus(item) {
      if (!item || !item.id) {
        return
      }

      const params = {
        id: item.id,
        status: item.status === 1 ? 0 : 1
      }

      this.$emit(EVENT_TOGGLE_STATUS, params)
    }
  }
}
</script>
