<template>
  <div class="main-list">
    <CCard>
      <CCardHeader>
        <div>
          <font-awesome-icon :icon="['fas', 'th-list']" />
          <strong>{{ $t('category.category') }}</strong>
        </div>
        <div class="card-header-actions">
          <CButton
            type="submit"
            color="primary"
            :variant="'ghost'"
            @click="onShowDetail(0)"
          >
            <font-awesome-icon :icon="['fas', 'plus-circle']" class="width-1x" />
            {{ $t('common.create_new') }}
          </CButton>
        </div>
      </CCardHeader>

      <CCardBody>
        <div class="main-control">
          <app-sort
            :value="sortId"
            :list="SORT_LIST"
            :name="$t('sort.name')"
            :placeholder="$t('sort.please_select')"
            :disabled="loading"
            @sort-change="onSort"
          />
          <app-pagination
            :total="total"
            :page-size="limit"
            :current-page="page"
            :item-name="$t('category.category_for_pagination')"
            :disabled="loading"
            @page-change="onPageChange"
            @page-size-change="onPageSizeChange"
          />
        </div>

        <category-table
          :data="data"
          :loading.sync="loading"
          @show-detail="onShowDetail"
          @delete="onConfirmDelete"
        />

        <div class="main-control">
          <app-sort
            :value="sortId"
            :list="SORT_LIST"
            :name="$t('sort.name')"
            :placeholder="$t('sort.please_select')"
            :disabled="loading"
            @sort-change="onSort"
          />
          <app-pagination
            :total="total"
            :page-size="limit"
            :current-page="page"
            :disabled="loading"
            @page-change="onPageChange"
            @page-size-change="onPageSizeChange"
          />
        </div>
      </CCardBody>
    </CCard>

    <category-create-edit-modal
      :id="selectedId"
      ref="categoryCreateEditModal"
      @modify="refresh"
    />

    <app-delete-confirm-dialog
      ref="deleteConfirmDialog"
      :name="$t('category.category')"
      @confirm="onDelete"
    />
  </div>
</template>

<script>
import Category from '~/models/Category'
import { SORT_TYPE } from '~/constants'

import CategoryTable from '~/components/organisms/categories/CategoryTable'
import CategoryCreateEditModal from '~/components/organisms/categories/CategoryCreateEditModal'
import AppPagination from '~/components/molecules/AppPagination'
import AppSort from '~/components/molecules/AppSort'
import AppDeleteConfirmDialog from '~/components/molecules/AppDeleteConfirmDialog'

import AsyncLoading from '~/mixins/do-async-loading'
import ConditionHandler from '~/mixins/condition'
import SearchFormHandler from '~/mixins/search-form'
import Paginator from '~/mixins/paginator'
import SortHandler from '~/mixins/sort'

const SORT_LIST = [
  {
    id: 1,
    label: 'ID',
    sort: 'id',
    sortType: SORT_TYPE.ASC
  },
  {
    id: 2,
    label: 'ID',
    sort: 'id',
    sortType: SORT_TYPE.DESC
  }
]

export default {
  components: {
    CategoryTable,
    CategoryCreateEditModal,
    AppPagination,
    AppSort,
    AppDeleteConfirmDialog
  },

  mixins: [
    AsyncLoading,
    ConditionHandler,
    SearchFormHandler,
    Paginator,
    SortHandler
  ],

  data() {
    return {
      resourceTypeName: this.$t('category.category'),
      total: 0,
      limit: 100,
      data: [],
      selectedId: null,
      SORT_LIST,
      sortId: null
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
    }
  },

  mounted() {
    this.refresh()
  },

  methods: {
    /**
     * Call API get box list by condition search
     * Show data on table result
     *
     * @return {Object} API response for error handle
     */
    async fetch() {
      // TODO: the cconditions encoder twice
      const res = await this.$dam.getCategoryList(this.query)

      if (Array.isArray(res.data)) {
        this.total = res.meta.total
        this.data = res.data.map(item => new Category(item))
      }

      return res
    },

    /**
     * Open simulator detail modal
     *
     * @param {Object} id - Current simulator
     */
    onShowDetail(id) {
      this.setSelectedId(id)
      this.$refs.categoryCreateEditModal.open()
    },

    /**
     * Open confirm delete
     * If confirm then call delete box
     * Else cancel
     *
     * @param {String} id - User id
     */
    onConfirmDelete(id) {
      this.setSelectedId(id)
      this.$refs.deleteConfirmDialog.open()
    },

    /**
     * Call API delete.
     *
     * @param {String} selectedId - User id
     */
    async delete() {
      await this.$dam.deleteCategory({ id: this.selectedId }).then(_ => {
        this.$toast.success(
          this.$t('messages.information.deleted', { name: this.resourceTypeName })
        )
        this.refresh()
      }).catch(err => {
        console.error(err)

        this.$toast.error(
          this.$t('messages.error.failed_to_delete', { name: this.resourceTypeName })
        )
      })
    },

    /**
     * Set selectedId
     *
     * @param {Number} id - Id is selected
     */
    setSelectedId(id) {
      this.selectedId = id
    }
  }
}
</script>
