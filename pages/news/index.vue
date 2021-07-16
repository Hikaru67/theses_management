
<template>
  <a-card>
    <template
      slot="title"
      class="header"
    >
      <a-row
        type="flex"
        justify="center"
        align="middle"
        class="search-form__row"
      >
        <a-col
          :md="2"
          :xs="24"
          class="search-form__col title"
        >
          新着情報一覧
        </a-col>
        <a-col
          :md="12"
          :xs="24"
          class="search-form__col"
        >
          <a-input-search
            v-model="filters.searchString"
            placeholder="キーワードを入力"
            size="large"
            @search="search"
          >
            <a-button
              slot="enterButton"
              size="large"
              class="search-form__btn--primary"
            >
              検索
              <font-awesome-icon
                icon="search"
                class="width-1x ml-1"
              />
            </a-button>
          </a-input-search>
        </a-col>
        <a-col
          :md="10"
          :xs="24"
          class="search-form__col"
        >
          <a-row
            type="flex"
            justify="end"
          >
            <a-col :md="6">
              <a-button
                size="large"
                class="search-form__btn search-form__btn--primary"
                @click="showForm(0)"
              >
                <font-awesome-icon
                  icon="plus"
                  class="width-1x mr-1"
                />
                新規作成
              </a-button>
            </a-col>
            <a-col :md="6">
              <a-button
                size="large"
                class="search-form__btn"
                @click="gotoUserPage()"
              >
                <font-awesome-icon
                  :icon="['far', 'user']"
                  class="width-1x mr-1"
                />
                ユーザー一覧
              </a-button>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </template>
    <a-row>
      <a-table
        :columns="columns"
        :row-key="record => record.id"
        :data-source="data"
        :pagination="pagination"
        :loading="loading"
        class="main-table"
        bordered
        :scroll="{ x: 1300 }"
        @change="handleTableChange"
      >
        <template
          slot="news_created_on"
          slot-scope="text, record"
        >
          {{ record.news_created_on ? $moment(record.news_created_on * 1000).format('Y.MM.DD') : null }}
        </template>
        <template
          slot="city"
          slot-scope="text, record"
        >
          {{ record.city.name ? record.city.name : 'すべて' }}
        </template>
        <template
          slot="action"
          slot-scope="text, record"
        >
          <a-button
            html-type="button"
            type="link"
            size="large"
            :disabled="loading"
            @click="showDetail(record.id)"
          >
            <font-awesome-icon
              :icon="['far', 'file-alt']"
              class="width-1x"
            />
          </a-button>

          <a-button
            html-type="button"
            type="link"
            size="large"
            :disabled="loading"
            style="color: red"
            @click="confirmToDelete(record.id, record.news_title)"
          >
            <font-awesome-icon
              :icon="['far', 'trash-alt']"
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
        新着情報&nbsp;&nbsp;新規作成
      </template>

      <a-spin :spinning="loading">
        <news-form
          :id="currentId"
          :visible="formVisible"
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
      :content="currentTitle"
      title="が配信されました"
      :cancel-text="this.$t('common.cancel')"
      @cancel="hideDialog"
    />
  </a-card>
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
      currentTitle: '',
      currentId: 0,
      filters: {
        searchString: this.$route.query.searchString || ''
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
          title: 'No.',
          dataIndex: 'sequence',
          width: 60,
          fixed: 'left'
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
          dataIndex: 'city.name',
          scopedSlots: { customRender: 'city' }
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
        } else {
          item.sortOrder = null
        }
      })

      return columns
    }
  },

  methods: {
    /**
     * Hide modal
     *
     * @param {String} currentTitle
     */
    showDialog(currentTitle) {
      this.currentTitle = currentTitle
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

    /**
     * Close form and show diaglog
     *
     * @param {String} currentTitle
     */
    closeFormAndShowDialog(currentTitle) {
      this.closeForm(true)
      this.showDialog(currentTitle)
    },

    /**
     * Confirm to delete
     *
     * @param {Number} id
     * @param {String} title
     */
    confirmToDelete(id, title) {
      this.$confirm({
        title,
        content: this.$t('text.confirm_to_delete'),
        okText: this.$t('common.delete'),
        okType: 'danger',
        cancelText: this.$t('common.cancel'),
        onOk: () => this.deleteRecord(id, title),
        closable: true
      })
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
      if (!this.filters.searchString) {
        this.filters.page = 1
      }
      this.replaceQuery(this.filters)
    },

    /**
     * Go to user page
     */
    gotoUserPage() {
      this.$router.push('/users')
    }
  }
}
</script>

<style scoped lang="scss">
/deep/ {
  .search-form__col {
    margin: 20px 0;
  }
  .search-form__btn {
    margin-left: 20px;
  }
  .search-form__btn--primary {
    background: #f5d528;
    float: right;
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
  .ant-table-thead > tr > th {
    background-color: #4c472b;
    color: white;
    font-weight: bold;
  }
  .title {
    color: #796f3b;
    font-size: large;
    font-weight: bold;
  }
  .mb-3.ant-breadcrumb {
    margin-bottom: 0 !important;
  }
}
</style>
