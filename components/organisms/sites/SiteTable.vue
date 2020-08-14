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
    <template slot="image" slot-scope="text, record">
      <img :src="`${getImagePath(record)}`" alt="image" />
    </template>

    <template slot="status" slot-scope="text, record">
      <a-badge
        v-if="!record.status"
        :count="getSiteStatus(record.status)"
        :number-style="{
          backgroundColor: '#d9d9d9'
        }"
      />

      <a-badge
        v-else
        :count="getSiteStatus(record.status)"
        :number-style="{
          backgroundColor: '#52c41a'
        }"
      />
    </template>

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
import { get } from 'lodash'
import { SITE_LIST_STATUS } from '~/constants'

import Table from '~/mixins/table'

const FIELDS = [
  { dataIndex: 'id', title: 'site.id', width: 100 },
  { dataIndex: 'image', title: 'site.image', scopedSlots: { customRender: 'image' }, width: 100 },
  { dataIndex: 'name', title: 'site.name' },
  { dataIndex: 'url', title: 'site.url' },
  { dataIndex: 'status', title: 'site.status', scopedSlots: { customRender: 'status' }, width: 100 },
  { dataIndex: 'action', title: 'common.action', scopedSlots: { customRender: 'action' }, width: 140 }
]

const EVENT_SHOW_DETAIL = 'show-detail'
const EVENT_DELETE = 'delete'

export default {
  props: {
    /**
     * Site list
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
    },

    /**
     * Current id
     */
    currentId() {
      return get(this, 'getSite.id', 0)
    },

    /**
     * Get status multilang
     */
    siteStatusGetMutipleLang() {
      const allItem = [
        {
          id: -1,
          name: this.$t('common.all')
        }
      ]

      const list = SITE_LIST_STATUS.map(item => {
        return {
          id: item.id,
          name: this.$t(item.name),
          value: item.id
        }
      })

      return allItem.concat(list)
    }
  },

  methods: {
    /**
     * Event show site detail modal
     *
     * @param {number} id - Site id
     */
    onShowDetail(id) {
      if (!id) {
        return
      }

      this.$emit(EVENT_SHOW_DETAIL, id)
    },

    /**
     * Delete site
     *
     * @param {object} item - Site
     */
    onDelete(item) {
      if (!item || !item.id) {
        return
      }

      this.$emit(EVENT_DELETE, item)
    },

    /**
     * Get status from constants
     *
     * @param {Number} genderType
     */
    getSiteStatus(status) {
      const siteStatus = this.siteStatusGetMutipleLang.find(el => el.id === status)
      return siteStatus && siteStatus.name ? siteStatus.name : ''
    },

    /**
     * Get image
     */
    getImagePath(item) {
      if (!item) {
        return ''
      }

      if (item.file && item.file !== undefined) {
        // TODO
        // return item.file.path.includes('http') ? item.file.path : process.env.dam.baseImageURL + item.file.path
        return 'https://loremflickr.com/320/240'
      }
    }
  }
}
</script>
