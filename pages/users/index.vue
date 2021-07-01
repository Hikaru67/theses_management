<template>
  <div class="main-list">
    <a-card class="mb-4">
      <template
        slot="title"
        class="header"
      >
        <a-form-model
          ref="form"
          :model="filters"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }"
          class="main-search"
          @submit.prevent="search"
        >
          <a-row :gutter="24">
            <a-col
              :md="6"
              :xl="4"
              :xxl="3"
              class="title mt-2"
            >
              ユーザー一覧
            </a-col>
            <a-col
              :sm="8"
              :md="5"
              :lg="4"
              :xxl="3"
            >
              <a-form-model-item prop="age">
                年齢
                <a-select
                  v-model="filters.minAge"
                  show-search
                  placeholder="asd"
                  size="large"
                  style="width: 90px"
                >
                  <a-select-option
                    v-for="number in 120"
                    :key="number"
                    :value="number"
                  >
                    {{ number }}
                  </a-select-option>
                </a-select>
                歳
              </a-form-model-item>
            </a-col>
            <a-col
              :md="6"
              :lg="4"
              :xxl="3"
            >
              <a-form-model-item prop="age">
                ～
                &nbsp;
                &nbsp;
                <a-select
                  v-model="filters.maxAge"
                  show-search
                  placeholder="Select a person"
                  size="large"
                  style="width: 90px"
                >
                  <a-select-option
                    v-for="number in 100"
                    :key="number"
                  >
                    {{ number }}
                  </a-select-option>
                </a-select>
                歳
              </a-form-model-item>
            </a-col>
            <a-col
              :md="14"
              :xl="8"
            >
              <div class="row">
                <a-col
                  :md="16"
                  :xl="16"
                  class="form-search__input"
                >
                  <a-form-model-item prop="keyword">
                    <a-input
                      v-model="filters.searchContent"
                      placeholder="キーワードを入力"
                      style="width: 100%"
                      size="large"
                      :disabled="loading"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col
                  :md="8"
                  :xl="8"
                >
                  <a-button
                    html-type="submit"
                    type="primary"
                    class="min-w-100 btn-search"
                    size="large"
                    :disabled="loading"
                  >
                    <font-awesome-icon
                      icon="search"
                      class="width-1x mr-1"
                    />
                    {{ $t('common.search') }}
                  </a-button>
                </a-col>
              </div>
            </a-col>
            <a-col
              :md="8"
              :lg="10"
              :xl="4"
              :xxl="7"
            >
              <div class="row">
                <a-col :md="12" />
                <a-col :md="12">
                  <a-button
                    html-type="button"
                    type="primary"
                    class="mt-1"
                    ghost
                    style="float: right"
                    size="large"
                    @click="gotoNewsPage()"
                  >
                    <font-awesome-icon
                      icon="bullhorn"
                      class="width-1x mr-1"
                    />
                    新着情報
                  </a-button>
                </a-col>
              </div>
            </a-col>
          </a-row>
        </a-form-model>
      </template>

      <!-- end main-search -->
      <!-- {{ data }} :pagination="pagination"-->
      <a-table
        :columns="columns"
        :row-key="record => record.id"
        :data-source="data"
        :loading="loading"
        :pagination="pagination"
        class="main-table"
        bordered
        :scroll="{ x: 1300 }"
        @change="handleTableChange"
      >
        <template
          slot="number"
          slot-scope="text, record, index"
        >
          {{ index + 1 }}
        </template>

        <template
          slot="nickName"
          slot-scope="text, record"
          class="nick-name"
        >
          {{ record.nickName }}
        </template>

        <template
          slot="symptoms"
          slot-scope="symptoms"
        >
          {{ getSymptoms(symptoms) }}
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
            @click="showDetail(record.id, record.name)"
          >
            <font-awesome-icon
              :icon="['fas', 'file-alt']"
              class="width-1x"
            />
          </a-button>

          <a-button
            html-type="button"
            type="link"
            size="large"
            :disabled="loading"
            style="color: red"
            @click="confirmToDelete(record.id, record.name)"
          >
            <font-awesome-icon
              :icon="['fas', 'trash-alt']"
              class="width-1x"
            />
          </a-button>
        </template>
      </a-table>
      <!-- end main-table -->
    </a-card>

    <a-modal
      ref="detail"
      :visible="visible"
      :width="900"
      :footer="null"
      class="modal-detail"
      @cancel="visible = false"
    >
      <template slot="title">
        ユーザー詳細

        <a-button
          html-type="button"
          type="danger"
          size="small"
          class="mr-4"
          style="float: right"
          :disabled="loading"
          @click="confirmToDelete(currentId, currentName)"
        >
          <font-awesome-icon
            icon="trash-alt"
            class="width-1x"
          />
          削除
        </a-button>
      </template>

      <a-spin :spinning="loading">
        <user-form
          :id="currentId"
          @save="closeDialog(true)"
          @cancel="closeDialog(false)"
        />
      </a-spin>
    </a-modal>
    <!-- end modal-detail -->
  </div>
</template>

<script>
import UserForm from '~/components/templates/UserForm'
import DataTable from '~/mixins/data-table'

export default {
  components: {
    UserForm
  },

  mixins: [
    DataTable
  ],

  data() {
    return {
      resource: 'users',
      visible: false,
      currentId: 0,
      currentName: '',
      filters: {
        searchContent: this.$route.query.searchContent || '',
        minAge: this.$route.query.minAge || '',
        maxAge: this.$route.query.maxAge || ''
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
          title: 'No.',
          dataIndex: 'number',
          scopedSlots: { customRender: 'number' },
          width: 60,
          fixed: 'left'
        },
        {
          title: '氏名',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' },
          sorter: true
        },
        {
          title: 'ニックネーム',
          dataIndex: 'nickName',
          sorter: true
        },
        {
          title: '年齢',
          sorter: true,
          dataIndex: 'age',
          width: 90
        },
        {
          title: '都道府県',
          sorter: true,
          dataIndex: 'city',
          width: 120
        },
        {
          title: '市区町村以降',
          sorter: true,
          dataIndex: 'town',
          scopedSlots: { customRender: 'town' }
        },
        {
          title: 'メールアドレス',
          dataIndex: 'mail'
        },
        {
          title: '症状',
          dataIndex: 'symptoms',
          scopedSlots: { customRender: 'symptoms' }
        },
        {
          title: 'アクション',
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
    },

    /**
    * Get pagination query
    *
    * @param {Object} Pagination query
    */
    paginationQuery() {
      return {
        pageSize: this.pageSize,
        page: this.page
      }
    }
  },

  methods: {
    /**
     * Go to page news
     */
    gotoNewsPage() {
      this.$router.push('/news')
    },

    /**
     * Confirm to delete
     *
     * @param {Number} id
     */
    confirmToDelete(id, title) {
      this.$confirm({
        title: title + `のアカウントを
          強制削除します。よろしいですか？`,
        content: '※本操作により、リストのデータも削除されます',
        okText: '削除',
        okType: 'danger',
        cancelText: '戻る',
        onOk: () => this.deleteRecord(id)
      })
    },

    /**
     * Get symptoms
     *
     * @param {array} symptoms
     * @return {string} symptoms
     */
    getSymptoms(symptoms) {
      return symptoms.map(item => item.name).join('　')
    },

    /**
     * Show detail
     *
     * @param {number} id - Item Id
     */
    showDetail(id, name) {
      this.currentId = id
      this.currentName = name
      this.visible = true
    },

    /**
     * Close dialog
     *
     * @param {boolean} fetch - fetch status
     */
    closeDialog(fetch) {
      this.visible = false

      if (fetch) {
        this.$fetch()
      }
    },

    /**
     * Clear form search
     */
    reset() {
      this.filters = {
        searchContent: '',
        minAge: '',
        maxAge: ''
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
  .form-search__input {
    .ant-form-item-control-wrapper {
      width: 100% !important;
    }
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
}
.btn-search {
  border: none;
  background-color: #f5d528 !important;
  color: black;
}

.nick-name {
  max-width: 130 px !important;
}

.title {
  color: #796f3b;
  font-size: large;
  font-weight: bold;
}
.header {
  max-height: 200px;
}
</style>
