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
              :md="5"
              :xs="24"
              class="search-form__col title"
            >
              <span>{{ $t('common.projects_management') }}</span>
            </a-col>
            <a-col
              :md="10"
              :xs="24"
              class="search-form__col"
            >
              <a-row type="flex">
                <a-col
                  :md="16"
                  :xs="16"
                  class="search-form__input--left"
                >
                  <a-input
                    v-model="filters.searchContent"
                    placeholder="Project name"
                    size="large"
                    :disabled="loading"
                  />
                </a-col>
                <a-col
                  :md="8"
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
              :md="8"
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
                    Add
                  </a-button>
                </a-col>
                <a-col
                  :md="14"
                  class="ml-3"
                >
                  <a-button
                    html-type="button"
                    type="primary"
                    ghost
                    size="large"
                    @click="gotoLecturersPage()"
                  >
                    <font-awesome-icon
                      icon="bullhorn"
                      class="width-1x mr-1"
                    />
                    {{ $t('common.lecturers_management') }}
                  </a-button>
                </a-col>
              </a-row>
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
          slot="action"
          slot-scope="text, record"
        >
          <a-button
            html-type="button"
            type="link"
            size="large"
            :disabled="loading"
            @click="showForm(record.id)"
          >
            <font-awesome-icon
              icon="pencil-alt"
              class="width-1x"
            />
          </a-button>

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
            size="large"
            type="link"
            :disabled="loading"
            class="action__btn-danger"
            @click="confirmToDelete(record.id, record.ten_da)"
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
      ref="form"
      :visible="formVisible"
      :width="1000"
      :footer="null"
      class="modal-form"
      @cancel="closeForm(false)"
    >
      <template slot="title">
        {{ !currentId ? $t('common.create'): $t('common.edit') }}
      </template>

      <a-spin :spinning="loading">
        <projects-form
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
      :width="800"
      :footer="null"
      class="modal-detail"
      @cancel="closeDetail(false)"
    >
      <a-spin :spinning="loading">
        <projects-detail
          :id="currentId"
          @cancel="closeDetail(false)"
          @save="closeDetail(true)"
        />
      </a-spin>
    </a-modal>
    <!-- end modal-detail -->

    <action-dialog
      v-model="dialogVisible"
      :content="currentTitle"
      :title="$t('text.successfully')"
      :cancel-text="this.$t('common.cancel')"
      @cancel="hideDialog"
    />
  </div>
</template>

<script>
import ProjectsDetail from '~/components/templates/ProjectsDetail'
import ProjectsForm from '~/components/templates/ProjectsForm'
import ActionDialog from '~/components/molecules/ActionDialog'
import DataTable from '~/mixins/data-table'

export default {
  components: {
    ProjectsDetail,
    ProjectsForm,
    ActionDialog
  },

  mixins: [
    DataTable
  ],

  data() {
    return {
      resource: 'projects',
      visible: false,
      formVisible: false,
      detailVisible: false,
      dialogVisible: false,
      currentTitle: '',
      currentId: 0,
      filters: {
        searchContent: this.$route.query.searchContent || ''
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
          dataIndex: 'id',
          width: 60,
          fixed: 'left'
        },
        {
          title: this.$t('project.name'),
          dataIndex: 'ten_da',
          width: 200
        },
        {
          title: this.$t('lecturer.name'),
          dataIndex: 'info_gv.ten_gv'
        },
        {
          title: this.$t('project.description'),
          dataIndex: 'mo_ta'
        },
        {
          title: this.$t('project.attachment'),
          dataIndex: 'dinh_kem'
        },
        {
          title: this.$t('common.action'),
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          width: 180
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
     * Go to page lecturers
     */
    gotoLecturersPage() {
      this.$router.push('/lecturers')
    },

    /**
     * Confirm to delete
     *
     * @param {Number} id
     */
    confirmToDelete(id, title) {
      this.$confirm({
        title,
        content: this.$t('text.confirm_to_delete'),
        okText: this.$t('common.delete'),
        okType: 'danger',
        cancelText: this.$t('common.cancel'),
        width: 400,
        onOk: () => this.deleteRecord(id, title).then(_ => this.closeDialog(true)),
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
      this.currentId = 0

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
      this.currentId = 0
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
      this.$notification.info({ message: 'This future is comming !' })
    }
  }
}
</script>

<style scoped lang="scss">
/deep/ {
  .search-form__col--flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .ant-form-item {
      margin-bottom: 0 !important;
      .ant-form-explain {
        display: none;
      }
    }
  }

  .search-form__col {
    margin: 20px 0;
  }

  .action__btn-danger {
    color: #e42d35;
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
        background: #ababb3;
      }
    }
    .ant-pagination-options {
      float: right;
    }
  }

  .ant-table-thead > tr > th {
    background-color: #2b3a4c;
    color: white;
    font-weight: bold;
  }
}
.btn-search {
  border: none;
  background-color: #ababb3 !important;
  color: black;
}

.nick-name {
  max-width: 130 px !important;
}

.title {
  color: #1b3571;
  font-size: large;
  font-weight: bold;
}
.header {
  max-height: 200px;
}
</style>
