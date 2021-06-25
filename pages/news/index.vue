
<template>
  <div>
    <a-row
      type="flex"
      justify="center"
    >
      <a-col :span="2">
        新着惰報一覧
      </a-col>
      <a-col :span="12">
        <a-input-search
          placeholder="input search text"
          size="large"
          @search="search"
        >
          <a-button
            slot="enterButton"
            icon="search"
          >
            蒙橙
          </a-button>
        </a-input-search>
      </a-col>
      <a-col :span="10">
        <a-button @click="showForm(0)">
          <font-awesome-icon
            icon="plus-circle"
            class="width-1x mr-1"
          />
          覇規作威
        </a-button>
        <a-button>
          <font-awesome-icon
            icon="user"
            class="width-1x mr-1"
          />
          ユ-ザ-一寶
        </a-button>
      </a-col>
    </a-row>
    <a-row>
      <a-table
        :columns="columns"
        :row-key="record => record.id"
        :data-source="DATA"
        :pagination="pagination"
        :loading="loading"
        class="main-table"
        @change="handleTableChange"
      >
        <template
          slot="action"
          slot-scope="text, record"
        >
          <a-button
            html-type="button"
            type="primary"
            size="small"
            :disabled="loading"
            @click="showDetail(record.id)"
          >
            <font-awesome-icon
              icon="file-alt"
              class="width-1x"
            />
          </a-button>

          <a-button
            html-type="button"
            type="danger"
            size="small"
            :disabled="loading"
            @click="confirmToDelete(record.id)"
          >
            <font-awesome-icon
              icon="trash-alt"
              class="width-1x"
            />
          </a-button>
        </template>
      </a-table>
      <!-- end main-table -->
    </a-row>
    <a-modal
      ref="form"
      :visible="formVisible"
      :width="1300"
      :footer="null"
      class="modal-form"
      @cancel="closeForm(false)"
    >
      <template slot="title">
        {{ currentId ? $t('common.edit') : $t('common.create') }} {{ $t('module.news') }}
      </template>

      <a-spin :spinning="loading">
        <news-form
          :id="currentId"
          @save="closeFormAndShowDialog"
          @cancel="closeForm(false)"
        />
      </a-spin>
    </a-modal>

    <a-modal
      ref="detail"
      :visible="detailVisible"
      :width="1300"
      :footer="null"
      class="modal-detail"
      @cancel="closeDetail(false)"
    >
      <template slot="title">
        {{ currentId ? $t('common.edit') : $t('common.create') }} {{ $t('module.news') }}
      </template>

      <a-spin :spinning="loading">
        <news-detail
          :id="currentId"
          @cancel="closeDetail(false)"
        />
      </a-spin>
    </a-modal>

    <action-dialog
      v-model="dialogVisible"
      title="口グアウトしますか"
      cancel-text="ログアウト"
      @cancel="hideDialog"
    />
  </div>
</template>

<script>
import NewsForm from '~/components/templates/NewsForm'
import NewsDetail from '~/components/templates/NewsDetail'
import ActionDialog from '~/components/molecules/ActionDialog'
import DataTable from '~/mixins/data-table'
const DATA = [
  {
    id: 1,
    date: 123456,
    title: 'sample',
    area: 'sample'
  }
]

export default {
  components: {
    NewsForm,
    NewsDetail,
    ActionDialog
  },

  mixins: [
    DataTable
  ],

  data() {
    return {
      resource: 'news',
      formVisible: false,
      detailVisible: false,
      dialogVisible: false,
      currentId: 0,
      filters: {
        date: this.$route.query.date || '',
        title: this.$route.query.title || '',
        area: this.$route.query.area || ''
      },
      pagination: {
        showSizeChanger: true,
        showTotal: () => false
      },
      DATA
    }
  },
  computed: {
    /**
     * Columns
     *
     * @param {array} - Columns
     */
    columns() {
      const columns = [
        {
          title: 'No',
          dataIndex: 'id',
          width: 60
        },
        {
          title: '配信日時',
          dataIndex: 'date',
          sorter: true
        },
        {
          title: 'タイトル',
          sorter: true,
          dataIndex: 'title'
        },
        {
          title: 'エリア',
          sorter: true,
          dataIndex: 'area'
        },
        {
          title: this.$t('common.action'),
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          width: 140
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
    /*
     * Hide modal
     */
    showDialog() {
      this.dialogVisible = true
    },
    /*
     * Hide modal
     */
    hideDialog() {
      this.dialogVisible = false
    },

    /**
     * Show detail
     *
     * @param {number} id - Item Id
     */
    showDetail(id) {
      this.currentId = id
      this.detailVisible = true
    },

    /**
     * Show detail
     *
     * @param {number} id - Item Id
     */
    showForm(id) {
      this.currentId = id
      this.formVisible = true
    },

    /**
     * Close dialog
     *
     * @param {boolean} fetch - fetch status
     */
    closeForm(fetch) {
      this.formVisible = false

      if (fetch) {
        this.$fetch()
      }
    },

    /**
     * Close dialog
     *
     * @param {boolean} fetch - fetch status
     */
    closeDetail(fetch) {
      this.detailVisible = false

      if (fetch) {
        this.$fetch()
      }
    },

    closeFormAndShowDialog() {
      this.closeForm(true)
      this.showDialog()
    },

    /**
     * Clear form search
     */
    reset() {
      this.filters = {
        date: '',
        title: '',
        area: ''
      }
    },

    /**
     * Search data
     */
    search() {
      this.replaceQuery(this.filters)
    }
  }
}
</script>

<style scoped lang="scss">
/deep/ {
  .ant-table-pagination {
    width: 100%;
    text-align: center;
    .ant-pagination-item,
    .ant-pagination-prev,
    .ant-pagination-next {
      border-radius: 50%;
      background: #efede7;
      color: #000;
      a {
        border-radius: 50%;
        background: #efede7;
        color: #000;
      }
    }
    .ant-pagination-item-active {
      border: 0px;
      a {
        background: #f5d528;
      }
    }
    .ant-pagination-options {
      float: right;
    }
  }
}
</style>
