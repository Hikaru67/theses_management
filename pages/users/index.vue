<template>
  <div class="main-list">
    <a-card>
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
          <a-row
            :gutter="24"
            type="flex"
            align="middle"
          >
            <a-col
              :md="2"
              :xs="24"
              class="search-form__col title"
            >
              <span>ユーザー一覧</span>
            </a-col>
            <a-col
              :md="6"
              :xs="24"
              class="search-form__col"
            >
              <a-row
                type="flex"
                align="middle"
              >
                <a-col
                  :md="10"
                  :xs="11"
                >
                  年齢
                  <a-select
                    v-model="filters.minAge"
                    show-search
                    placeholder="asd"
                    size="large"
                    class="search-form__select"
                  >
                    <a-select-option
                      v-for="item in ageList"
                      :key="item.age"
                      :value="item.age"
                    >
                      {{ item.name }}
                    </a-select-option>
                  </a-select>
                  歳
                </a-col>
                <a-col
                  :md="4"
                  :xs="2"
                  class="text-center"
                >
                  ~
                </a-col>
                <a-col
                  :md="10"
                  :xs="11"
                >
                  <a-select
                    v-model="filters.maxAge"
                    show-search
                    placeholder="Select a person"
                    size="large"
                    class="search-form__select"
                  >
                    <a-select-option
                      v-for="item in ageList"
                      :key="item.age"
                      :value="item.age"
                    >
                      {{ item.name }}
                    </a-select-option>
                  </a-select>
                  歳
                </a-col>
              </a-row>
            </a-col>
            <a-col
              :md="14"
              :xs="24"
              class="search-form__col"
            >
              <a-row type="flex">
                <a-col
                  :md="20"
                  :xs="16"
                  class="search-form__input--left"
                >
                  <a-input
                    v-model="filters.searchContent"
                    placeholder="キーワードを入力"
                    size="large"
                    :disabled="loading"
                  />
                </a-col>
                <a-col
                  :md="4"
                  :xs="8"
                >
                  <a-button
                    html-type="submit"
                    type="primary"
                    class="min-w-100 btn-search"
                    size="large"
                    :disabled="loading"
                  >
                    {{ $t('common.search') }}
                    <font-awesome-icon
                      icon="search"
                      class="width-1x ml-1"
                    />
                  </a-button>
                </a-col>
              </a-row>
            </a-col>
            <a-col
              :md="2"
              :xs="24"
              class="search-form__col"
            >
              <a-button
                html-type="button"
                type="primary"
                ghost
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
          </a-row>
        </a-form-model>
      </template>

      <!-- end main-search -->
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
          <a-popover placement="top">
            <template slot="content">
              {{ record.nickName }}
            </template>
            {{ record.nickName }}
          </a-popover>
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
              :icon="['far', 'file-alt']"
              class="width-1x"
            />
          </a-button>

          <a-button
            html-type="button"
            size="large"
            type="link"
            :disabled="loading"
            class="action__btn-danger"
            @click="confirmToDelete(record.id, record.name)"
          >
            <font-awesome-icon
              :icon="['far', 'trash-alt']"
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
          ghost
          @click="confirmToDelete(currentId, currentName)"
        >
          <font-awesome-icon
            :icon="['far', 'trash-alt']"
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
          scopedSlots: { customRender: 'nickName' },
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
    },

    ageList() {
      const defaultOption = {
        name: '--',
        age: ''
      }
      const ageList = [...Array(100).keys()].map(item => ({
        name: item,
        age: item
      }))
      return [defaultOption, ...ageList]
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
        title: <div>
          <span style="color: #2a69be">{title}</span>
          のアカウントを
          <br />
          強制削除します。よろしいですか？
        </div>,
        content: '※本操作により、リストのデータも削除されます',
        okText: this.$t('common.delete'),
        okType: 'danger',
        cancelText: this.$t('common.cancel'),
        onOk: () => this.deleteRecord(id).then(_ => this.closeDialog(true)),
        closable: true
      })
    },

    /**
     * Get symptoms
     *
     * @param {array} symptoms
     * @return {string} symptoms
     */
    getSymptoms(symptoms) {
      return symptoms.map(item => item.name).join(', ')
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
     * Search data
     */
    search() {
      if (!this.filters.searchString && !this.filters.minAge && !this.filters.maxAge) {
        this.filters.page = 1
      }
      this.replaceQuery(this.filters)
    }
  }
}
</script>

<style scoped lang="scss">
/deep/ {
  .search-form__col {
    margin: 20px 0;
  }

  .action__btn-danger {
    color: #ff4d4f;
  }

  .search-form__input--left {
    padding-right: 20px;
  }

  .search-form__select {
    width: 120px;
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
