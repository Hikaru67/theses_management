<template>
  <div v-loading="loading">
    <CDataTable
      hover
      :items="data"
      :fields="FIELDS"
      class="main-table"
    >
      <template #action="{ item }">
        <td class="white-space-nowrap">
          <CButton size="sm" color="primary" @click="goToDetail(item.id)">
            <font-awesome-icon :icon="['fas', 'pencil-alt']" />
          </CButton>

          &nbsp;
          <CButton size="sm" color="danger" @click="onDelete(item.id)">
            <font-awesome-icon :icon="['fas', 'trash-alt']" />
          </CButton>
        </td>
      </template>

      <template #no-items-view>
        <div class="text-center text-muted my-5">
          <font-awesome-icon :icon="['fas', 'info-circle']" />
          {{ $t('common.no_data_in_table') }}
        </div>
      </template>
    </CDataTable>
  </div>
</template>

<style lang="scss" scoped>
.main-table {
  /deep/ {
    table {
      border-bottom: 1px solid #d8dbe0;
      margin-bottom: 0;
      thead {
        tr {
          th {
            &.id {
              width: 60px;
            }
            &.name {
              width: 250px;
            }
            &.parent_id {
              width: 300px;
            }
            &.description {
              width: 500px;
            }
            &.action {
              width: 100px;
            }
          }
        }
      }
    }
  }
}
</style>

<script>
import Common from '~/mixins/common'

const EVENT_SHOW_DETAIL = 'show-detail'
const EVENT_DELETE = 'delete'
const MINISECOND = 1000

export default {
  mixins: [
    Common
  ],

  props: {
    /**
     * Item list
     */
    data: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      loading: false
    }
  },

  computed: {
    /**
     * Get FIELDS of header table
     *
     * @return {array} FIELDS of header table
     */
    FIELDS() {
      return [
        { key: 'id', label: this.$t('category.id'), _classes: 'id' },
        { key: 'name', label: this.$t('category.name'), _classes: 'name' },
        { key: 'description', label: this.$t('category.description'), _classes: 'description' },
        { key: 'action', label: this.$t('common.action'), _classes: 'action' }
      ]
    },

    /**
     * return value minisecond
     *
     * @return {number} minisecond
     */
    MINISECOND() {
      return MINISECOND
    }
  },

  methods: {
    /**
     * Go to box detail page
     *
     * @param {String} id - box id
     */
    goToDetail(id) {
      this.$emit(EVENT_SHOW_DETAIL, id)
    },

    /**
     * Delete box
     *
     * @param {String} id - User id
     */
    onDelete(id) {
      this.$emit(EVENT_DELETE, id)
    }
  }
}
</script>
