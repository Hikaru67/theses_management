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
    <template slot="images" slot-scope="text, record">
      <span v-if="getImagePath(record)">
        <img :src="getImagePath(record)" :alt="record.name" width="128" />
      </span>
    </template>

    <template slot="title" slot-scope="text, record">
      <div>
        <p v-if="record && record.title" class="max-ln-2 fw-500">
          <template v-if="record && record.origin_url">
            <a :href="record && record.origin_url ? record.origin_url: ''" target="_blank">
              {{ record.title }}
            </a>
          </template>

          <template v-else>
            {{ record.title }}
          </template>
        </p>
      </div>

      <!-- <div v-if="record && record.site_id && record.site" class="article-info">
        <div>{{ record.site_id && record.site ? record.site.name : '' }}</div>
      </div> -->
    </template>

    <template slot="article_category" slot-scope="text, record">
      {{ record.article_category && record.article_category ? record.article_category.name : '' }}
    </template>

    <template slot="status" slot-scope="text, record">
      <a-badge
        :count="getStatusName(record.status)"
        :number-style="{
          backgroundColor: getArticleStatusBadge(record.status)
        }"
      />
    </template>

    <template slot="public_start_at" slot-scope="text, record">
      {{ $moment(record.public_start_at * 1000).format('YYYY/MM/DD HH:mm:ss') }}
    </template>

    <template slot="public_end_at" slot-scope="text, record">
      {{ $moment(record.public_end_at * 1000).format('YYYY/MM/DD HH:mm:ss') }}
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
    }
  }
}
</style>

<script>
import {
  // ARTICLE_TYPE,
  ARTICLE_STATUS,
  ARTICLE_STATUS_HIDDEN,
  ARTICLE_STATUS_WAITTING,
  ARTICLE_STATUS_PUBLIC
} from '~/constants'

import Table from '~/mixins/table'

const FIELDS = [
  { dataIndex: 'id', title: 'article.id', width: 70 },
  { dataIndex: 'images', title: 'article.image', scopedSlots: { customRender: 'images' }, width: 150 },
  { dataIndex: 'title', title: 'article.title', scopedSlots: { customRender: 'title' } },
  { dataIndex: 'article_category', title: 'article.category', scopedSlots: { customRender: 'article_category' } },
  { dataIndex: 'views', title: 'article.views', width: 90 },
  { dataIndex: 'status', title: 'article.status', scopedSlots: { customRender: 'status' } },
  { dataIndex: 'public_start_at', title: 'article.public_start_at', scopedSlots: { customRender: 'public_start_at' } },
  { dataIndex: 'public_end_at', title: 'article.public_end_at', scopedSlots: { customRender: 'public_end_at' } },
  { dataIndex: 'action', title: 'common.action', scopedSlots: { customRender: 'action' }, width: 100 }
]

const EVENT_DELETE = 'delete'

export default {
  props: {
    /**
     * article list
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
     * Get image
     */
    getImagePath(item) {
      if (!item) {
        return ''
      }

      // if (item.image_path) {
      //   return item.image_path.includes('http') ? item.image_path : process.env.dam.baseImageURL + item.image_path
      // }

      // if (item.images && item.images.length > 0 && item.images[0].path) {
      //   return item.images[0].path.includes('http') ? item.images[0].path : process.env.dam.baseImageURL + item.images[0].path
      // }

      // if (item.site && item.site.file) {
      //   return item.site.file.path.includes('http') ? item.site.file.path : process.env.dam.baseImageURL + item.site.file.path
      // }

      // TODO
      return 'https://loremflickr.com/320/240'
    },

    /**
     * Get article status from constants
     * @param {Number} statusId
     */
    getStatusName(statusId) {
      const status = ARTICLE_STATUS.find(s => s.id === statusId)
      return status ? this.$t(status.name) : ''
    },

    /**
     * Get article status badge
     */
    getArticleStatusBadge(articleStatus) {
      switch (articleStatus) {
        case ARTICLE_STATUS_HIDDEN: return '#ced2d8'
        case ARTICLE_STATUS_WAITTING: return '#f9b115'
        case ARTICLE_STATUS_PUBLIC: return '#2eb85c'
        default: return ''
      }
    },

    /**
     * Go to article detail page
     *
     * @param {number} id - article id
     */
    goToDetail(id) {
      if (!id) {
        return
      }

      this.$router.push({ path: `/articles/${id}` })
    },

    /**
     * Delete article
     *
     * @param {object} item - article
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
