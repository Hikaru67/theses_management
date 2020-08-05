<template>
  <div class="main-list">
    <div class="role-row">
      <div class="role-col box-search">
        <a-card class="mb-4">
          <template slot="title">
            <font-awesome-icon icon="balance-scale" />
            <strong>{{ $t('role.role_list') }}</strong>
          </template>

          <template slot="extra">
            <a-button html-type="button" type="primary" ghost @click="showRoleDetailModal(0)">
              <font-awesome-icon icon="plus-circle" class="width-1x mr-1" />
              {{ $t('role.add_role') }}
            </a-button>
          </template>

          <a-form
            :label-col="{ sm: 6 }"
            :wrapper-col="{ sm: 18 }"
            class="role-search-form"
            @submit.prevent="getRoleList(); closeRoleDetailModal()"
          >
            <a-form-item :label="$t('role.name')">
              <a-input-search
                v-model="name"
                :placeholder="$t('role.name')"
                :disabled="loading"
              >
                <a-button slot="enterButton" html-type="submit" type="primary">
                  <font-awesome-icon icon="search" class="width-1x mr-1" />
                  {{ $t('common.search') }}
                </a-button>
              </a-input-search>
            </a-form-item>
          </a-form>

          <a-table
            :columns="fields"
            :data-source="roleList"
            :row-key="record => record.id"
            :locale="tableLocale"
            :loading="tableLoading"
            class="main-table"
          >
            <template slot="action" slot-scope="text, record" class="white-space-nowrap">
              <a-button
                html-type="button"
                type="primary"
                size="small"
                :disabled="loading"
                @click="showRoleDetailModal(record.id)"
              >
                <font-awesome-icon icon="pencil-alt" class="width-1x" />
              </a-button>

              <a-button
                html-type="button"
                type="danger"
                size="small"
                :disabled="loading"
                @click="onConfirmDelete(record)"
              >
                <font-awesome-icon icon="trash-alt" class="width-1x" />
              </a-button>
            </template>
          </a-table>
        </a-card>
      </div>

      <div class="role-col box-list">
        <a-card v-show="showDetailForm" class="mb-4">
          <template slot="title">
            <font-awesome-icon :icon="`${selectedId ? 'pencil-alt' : 'plus-circle'}`" />
            {{ $t('role.permissions') }}
          </template>

          <role-form
            :id="selectedId"
            @modify="getRoleList(); closeRoleDetailModal()"
            @cancel="closeRoleDetailModal"
          />
        </a-card>

        <div v-if="!showDetailForm" class="box-notice-select">
          <font-awesome-icon icon="arrow-circle-left" class="mb-2" />
          <div>{{ $t('role.select_role_from_list') }}</div>
        </div>
      </div>
    </div>

    <app-delete-confirm-dialog
      ref="refDeleteConfirmDialog"
      :name="selectedName"
      @confirm="onDelete"
    />
  </div>
</template>

<style lang="scss" scoped>
.main-list {
  /deep/ {
    overflow-x: auto;
    overflow-y: hidden;
    > * {
      min-width: 830px;
    }
    .role-row {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
    .role-col {
      > .card {
        height: 100%;
        .role-id {
          width: 50px
        }
        .role-action {
          width: 93px
        }
      }
    }
    .box-search {
      width: 380px;
      flex-grow: 0;
    }
    .role-search-form {
      .ant-form-item-label {
        text-align: left;
      }
    }
    .box-list {
      flex-grow: 1;
      padding-left: 20px;
    }
    .box-notice-select {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
      svg {
        width: 80px;
        height: 80px;
        color: #cbcbcb;
      }
    }
  }
}
</style>

<script>
import Role from '~/models/Role'

import RoleForm from '~/components/organisms/roles/RoleForm'
import AppDeleteConfirmDialog from '~/components/molecules/AppDeleteConfirmDialog'

export default {
  components: {
    RoleForm,
    AppDeleteConfirmDialog
  },

  data() {
    return {
      // Form data
      name: null,
      selectedId: null,
      selectedName: '',
      roleList: [],

      // Other data
      fields: [
        { dataIndex: 'id', title: 'ID' },
        { dataIndex: 'name', title: this.$t('role.name') },
        { dataIndex: 'action', title: this.$t('common.action'), scopedSlots: { customRender: 'action' }, width: 100 }
      ],
      loading: false,
      showDetailForm: false
    }
  },

  computed: {
    /**
     * Loading & icon loading
     *
     * @return {object} Loading & icon loading
     */
    tableLoading() {
      return {
        spinning: this.loading,
        indicator: <a-spin />
      }
    },

    /**
     * Locale for Table
     *
     * @return {object} Locale for Table
     */
    tableLocale() {
      return {
        emptyText: this.$t('common.no_data_in_table')
      }
    }
  },

  mounted() {
    this.getRoleList()
  },

  methods: {
    /**
     * Get role list
     */
    getRoleList() {
      const searchData = {}

      this.loading = true

      if (this.name) {
        searchData.name = this.name
      }

      this.$dam.getRoleList(searchData)
        .then(res => {
          this.loading = false

          if (Array.isArray(res.data)) {
            this.roleList = res.data
              .filter(item => item.name !== 'admin')
              .map(item => new Role(item))
          }
        })
        .catch(err => {
          console.error(err)
          this.loading = false

          this.$toast.error(
            this.$t('messages.error.failed_to_get', { name: this.$t('role.role_list') })
          )
        })
    },

    /**
     * Show role detail modal
     */
    showRoleDetailModal(id) {
      this.selectedId = id
      this.showDetailForm = true
    },

    /**
     * Close role detail modal
     */
    closeRoleDetailModal() {
      this.selectedId = null
      this.showDetailForm = false
    },

    /**
     * Open confirm delete
     * If confirm then call delete user
     * Else cancel
     *
     * @param {Object} item - Role
     */
    onConfirmDelete(item) {
      if (!item || !item.id) {
        return
      }

      this.selected = item.id
      this.selectedName = item.name
      this.$refs.refDeleteConfirmDialog.open()
    },

    /**
     * After the deletion confirmation dialog is confirmed
     */
    onDelete() {
      if (this.selected) {
        this.$dam.deleteRole({ id: this.selected })
          .then(_ => {
            this.$toast.success(
              this.$t('messages.information.deleted', { name: this.$t('role.role') })
            )

            this.getRoleList()
          })
          .catch(err => {
            console.error(err)

            this.$toast.error(
              this.$t('messages.error.failed_to_delete', { name: this.$t('role.role') })
            )
          })
      }
    }
  }
}
</script>
