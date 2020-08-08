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
    <template slot="action" slot-scope="text, record">
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

<script>
import Table from '~/mixins/table'

const FIELDS = [
  { dataIndex: 'id', title: 'menu.id', width: 60 },
  { dataIndex: 'title', title: 'menu.title' },
  { dataIndex: 'link', title: 'menu.link' },
  { dataIndex: 'icon', title: 'menu.icon' },
  { dataIndex: 'parent_id', title: 'menu.parent_id' },
  { dataIndex: 'position', title: 'menu.position' },
  { dataIndex: 'action', title: 'common.action', scopedSlots: { customRender: 'action' }, width: 140 }
]

const EVENT_SHOW_DETAIL = 'show-detail'
const EVENT_DELETE = 'delete'

export default {
  props: {
    /**
     * Item list
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
     * Event show menu detail modal
     *
     * @param {number} id - menu id
     */
    onShowDetail(id) {
      if (!id) {
        return
      }

      this.$emit(EVENT_SHOW_DETAIL, id)
    },

    /**
     * Delete menu
     *
     * @param {object} item - menu
     */
    onDelete(item) {
      if (!item || !item.id) {
        return
      }

      this.$emit(EVENT_DELETE, item)
    }
  }
}
</script>
