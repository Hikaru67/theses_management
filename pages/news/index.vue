
<template>
  <div>
    <a-row
      type="flex"
      justify="center"
      align="middle"
      class="search-form__row"
    >
      <a-col :span="2">
        新着情報一覧
      </a-col>
      <a-col :span="12">
        <a-input-search
          v-model="filters.searchString"
          placeholder="input search text"
          size="large"
          @search="search"
        >
          <a-button
            slot="enterButton"
            icon="search"
            size="large"
            class="search-form__btn--primary"
          >
            検索
          </a-button>
        </a-input-search>
      </a-col>
      <a-col :span="10">
        <a-row
          type="flex"
          justify="end"
        >
          <a-button
            size="large"
            class="search-form__btn search-form__btn--primary"
            @click="showForm(0)"
          >
            <font-awesome-icon
              icon="plus-circle"
              class="width-1x mr-1"
            />
            新規作成
          </a-button>
          <a-button
            size="large"
            class="search-form__btn"
            @click="gotoUserPage()"
          >
            <font-awesome-icon
              icon="user"
              class="width-1x mr-1"
            />
            ユーザー一覧
          </a-button>
        </a-row>
      </a-col>
    </a-row>
    <a-row>
      <a-table
        :columns="columns"
        :row-key="record => record.id"
        :data-source="data"
        :pagination="pagination"
        :loading="loading"
        class="main-table"
        @change="handleTableChange"
      >
        <template
          slot="number"
          slot-scope="text, record, index"
        >
          {{ index + 1 }}
        </template>
        <template
          slot="news_created_on"
          slot-scope="text, record"
        >
          {{ record.news_created_on ? $moment(record.news_created_on * 1000).format('Y.MM.DD') : null }}
        </template>
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
        新着情報
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
      :width="1200"
      :footer="null"
      class="modal-detail"
      @cancel="closeDetail(false)"
    >
      <a-spin :spinning="loading">
        <news-detail
          :id="currentId"
          @cancel="closeDetail(false)"
          @save="closeDetail(true)"
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
        searchString: this.$route.query.searchString || ''
      },
      pagination: {
        showSizeChanger: true,
        showTotal: () => false
      }
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
          dataIndex: 'number',
          scopedSlots: { customRender: 'number' },
          width: 60
        },
        {
          title: '配信日時',
          dataIndex: 'news_created_on',
          scopedSlots: { customRender: 'news_created_on' },
          sorter: true
        },
        {
          title: 'タイトル',
          sorter: true,
          dataIndex: 'news_title'
        },
        {
          title: 'エリア',
          sorter: true,
          dataIndex: 'city.name'
        },
        {
          title: this.$t('common.action'),
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          width: 140
        }
      ]

      columns.forEach(item => {
        if (this.$route.query.fieldName === item.dataIndex && this.$route.query.isAsc) {
          item.sortOrder = this.$route.query.isAsc === 'true' ? 'ascend' : 'descend'
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
        searchString: ''
      }
    },

    /**
     * Search data
     */
    search() {
      this.replaceQuery(this.filters)
    },

    /**
     * Go to user page
     */
    gotoUserPage() {
      this.$router.push('/user')
    }
  }
}
</script>

<style scoped lang="scss">
/deep/ {
  .search-form__row {
    padding: 20px 0;
  }
  .search-form__btn {
    margin-left: 20px;
  }
  .search-form__btn--primary {
    background: #f5d528;
  }
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
