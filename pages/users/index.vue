<template>
  <div class="main-list">
    <a-card class="mb-4">
      <template slot="title">
        <font-awesome-icon icon="user-friends" />
        {{ $t('user.list_user') }}
      </template>

      <template slot="extra">
        <a-button html-type="button" type="primary" ghost @click="onShowDetail(0)">
          <font-awesome-icon icon="plus-circle" class="width-1x mr-1" />
          {{ $t('common.create_new') }}
        </a-button>
        <!-- <a-button html-type="button" type="primary" ghost @click="$router.push({ path: '/users/new' })">
          <font-awesome-icon icon="plus-circle" class="width-1x mr-1" />
          {{ $t('common.create_new') }}
        </a-button> -->
      </template>

      <user-search-form
        :loading="loading"
        @submit="onSearch"
      />

      <div class="main-control">
        <app-sort
          :value="sortId"
          :list="SORT_CONDITIONS"
          :disabled="loading"
          :name="$t('sort.name')"
          @sort-change="onSort"
        />
        <app-pagination
          :total="total"
          :current-page="page"
          :item-name="$t('user.user')"
          :disabled="loading"
          @page-change="onPageChange"
          @page-size-change="onPageSizeChange"
        />
      </div>

      <user-table
        :data="data"
        :loading="loading"
        @show-detail="onShowDetail"
        @delete="onConfirmDelete"
        @toggle-status="onToggleStatus"
      />

      <div class="main-control">
        <app-sort
          :value="sortId"
          :list="SORT_CONDITIONS"
          :disabled="loading"
          :name="$t('sort.name')"
          @sort-change="onSort"
        />
        <app-pagination
          :total="total"
          :current-page="page"
          :item-name="$t('user.user')"
          :disabled="loading"
          @page-change="onPageChange"
          @page-size-change="onPageSizeChange"
        />
      </div>
    </a-card>

    <user-detail-modal
      :id="selectedId"
      ref="refUserDetailModal"
      @modify="refresh"
    />

    <app-delete-confirm-dialog
      ref="refDeleteConfirmDialog"
      :name="selectedName"
      @confirm="onDelete"
    />
  </div>
</template>

<script>
import { SORT_TYPE } from '~/constants'

import UserSearchForm from '~/components/organisms/users/UserSearchForm'
import UserTable from '~/components/organisms/users/UserTable'
import AppPagination from '~/components/molecules/AppPagination'
import AppSort from '~/components/molecules/AppSort'
import AppDeleteConfirmDialog from '~/components/molecules/AppDeleteConfirmDialog'

import Common from '~/mixins/common'
import AsyncLoading from '~/mixins/do-async-loading'
import ConditionHandler from '~/mixins/condition'
import SearchFormHandler from '~/mixins/search-form'
import SortHandler from '~/mixins/sort'
import Paginator from '~/mixins/paginator'

const SORT_LIST = [
  {
    id: -1,
    label: 'common.option_please_select',
    sort: null,
    sortType: null
  },
  {
    id: 1,
    label: 'user.id',
    sort: 'id',
    sortType: SORT_TYPE.ASC
  },
  {
    id: 2,
    label: 'user.id',
    sort: 'id',
    sortType: SORT_TYPE.DESC
  },
  {
    id: 3,
    label: 'user.name',
    sort: 'name',
    sortType: SORT_TYPE.ASC
  },
  {
    id: 4,
    label: 'user.name',
    sort: 'name',
    sortType: SORT_TYPE.DESC
  }
]

export default {
  components: {
    UserSearchForm,
    UserTable,
    AppPagination,
    AppSort,
    AppDeleteConfirmDialog
  },

  mixins: [
    Common,
    AsyncLoading,
    ConditionHandler,
    SearchFormHandler,
    SortHandler,
    Paginator
  ],

  data() {
    return {
      data: [],
      total: 0,
      resourceTypeName: this.$t('user.user'),
      selectedId: null,
      selectedName: '',
      SORT_LIST
    }
  },

  computed: {
    /**
     * Get query
     *
     * @return {object} Query
     */
    query() {
      return Object.assign(
        {},
        this.paginationQuery,
        this.conditionQuery,
        {
          sort: this.sort,
          sortType: this.sortType
        }
      )
    },

    /**
     * Get sort list
     *
     * @return {array} Sort list
     */
    SORT_CONDITIONS() {
      return SORT_LIST.map(item => {
        return {
          id: item.id,
          label: this.$t(item.label),
          sort: item.sort ? item.sort : null,
          sortType: item.sortType ? item.sortType : null
        }
      })
    }
  },

  mounted() {
    this.refresh()
  },

  methods: {
    /**
     * Call API get users by condition search
     * Show data on table result
     *
     * @return {Object} API response for error handle
     */
    async fetch() {
      const res = await this.$dam.getUserList(this.query)

      if (Array.isArray(res.data)) {
        this.total = res.meta.total
        this.data = res.data
      }

      return res
    },

    /**
     * Set select id
     *
     * @param {Number} id - user id
     */
    setSelectedId(id) {
      this.selectedId = id
    },

    /**
     * Set select id
     *
     * @param {String} name - User name
     */
    setSelectedName(name) {
      this.selectedName = name
    },

    /**
     * Open user detail modal
     *
     * @param {Number} id - Current id
     */
    onShowDetail(id) {
      this.setSelectedId(id)
      this.$refs.refUserDetailModal.open()
    },

    /**
     * Open confirm delete
     * If confirm then call delete user
     * Else cancel
     *
     * @param {object} item - user
     */
    onConfirmDelete(item) {
      if (!item || !item.id) {
        return
      }

      this.setSelectedId(item.id)
      this.setSelectedName(item.name)
      this.$refs.refDeleteConfirmDialog.open()
    },

    /**
     * Call API delete.
     *
     * @param {String} selectedId - user id
     */
    async delete(selectedId) {
      if (!selectedId) {
        return
      }

      await this.$dam.deleteUser({ id: selectedId })
    },

    /**
     * Update status
     *
     * @param {object} params - Params
     */
    onToggleStatus(params) {
      if (!params || !params.id) {
        return
      }

      this.onAction('updateUser', params, this.$t('common.action'))
    }
  }
}
</script>
