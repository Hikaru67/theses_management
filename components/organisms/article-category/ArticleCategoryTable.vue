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
  { dataIndex: 'id', title: 'category.id', width: 60 },
  { dataIndex: 'name', title: 'category.name' },
  { dataIndex: 'description', title: 'category.description' },
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
     * Event show article category detail modal
     *
     * @param {number} id - article category id
     */
    onShowDetail(id) {
      if (!id) {
        return
      }

      this.$emit(EVENT_SHOW_DETAIL, id)
    },

    /**
     * Delete article category
     *
     * @param {object} item - article category
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
