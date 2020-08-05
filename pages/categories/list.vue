<template>
  <div class="main-list position-relative">
    <div class="box-change-view">
      <nuxt-link to="/categories" :class="`${$route.path === '/categories/list' ? 'on-categories-list' : ''}`">
        <font-awesome-icon icon="th-list" />
      </nuxt-link>

      <nuxt-link to="/categories/list" :class="`${$route.path === '/categories/list' ? 'on-categories-list' : ''}`">
        <font-awesome-icon icon="border-all" />
      </nuxt-link>
    </div>

    <a-card class="mb-4">
      <template slot="title">
        <font-awesome-icon icon="th-list" />
        <strong>{{ $t('category.category') }}</strong>
      </template>

      <template slot="extra">
        <a-button html-type="button" type="primary" ghost @click="generateCSV">
          <font-awesome-icon icon="download" class="width-1x mr-1" />
          {{ $t('common.download_csv') }}
        </a-button>

        &nbsp;
        <a-button html-type="button" type="primary" ghost @click="onShowDetail(0)">
          <font-awesome-icon icon="plus-circle" class="width-1x mr-1" />
          {{ $t('common.create_new') }}
        </a-button>
      </template>

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
          :item-name="$t('category.category_for_pagination')"
          :disabled="loading"
          @page-change="onPageChange"
          @page-size-change="onPageSizeChange"
        />
      </div>

      <category-table
        :data="data"
        :loading="loading"
        @show-detail="onShowDetail"
        @delete="onConfirmDelete"
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
          :item-name="$t('category.category_for_pagination')"
          :disabled="loading"
          @page-change="onPageChange"
          @page-size-change="onPageSizeChange"
        />
      </div>
    </a-card>

    <category-create-edit-modal
      :id="selectedId"
      ref="refCategoryCreateEditModal"
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
import { flatten, pick } from 'lodash'

import { SORT_TYPE } from '~/constants'

import CategoryTable from '~/components/organisms/categories/CategoryTable'
import CategoryCreateEditModal from '~/components/organisms/categories/CategoryCreateEditModal'
import AppPagination from '~/components/molecules/AppPagination'
import AppSort from '~/components/molecules/AppSort'
import AppDeleteConfirmDialog from '~/components/molecules/AppDeleteConfirmDialog'

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
    label: 'category.id',
    sort: 'id',
    sortType: SORT_TYPE.ASC
  },
  {
    id: 2,
    label: 'category.id',
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
      data: [],
      total: 0,
      resourceTypeName: this.$t('category.category'),
      selectedId: null,
      selectedName: '',
      SORT_LIST,
      limit: 100,
      lastPage: 1
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
     * Call API get box list by condition search
     * Show data on table result
     *
     * @return {Object} API response for error handle
     */
    async fetch() {
      const res = await this.$dam.getCategoryList(this.query)

      if (Array.isArray(res.data)) {
        this.total = res.meta.total
        this.data = res.data
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
      this.$refs.refCategoryCreateEditModal.open()
    },

    /**
     * Set selectedId
     *
     * @param {Number} id - Category Id
     */
    setSelectedId(id) {
      this.selectedId = id
    },

    /**
     * Set select id
     *
     * @param {String} name - Category name
     */
    setSelectedName(name) {
      this.selectedName = name
    },

    /**
     * Open confirm delete
     * If confirm then call delete box
     * Else cancel
     *
     * @param {object} item - Category
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
     * @param {String} selectedId - User id
     */
    async delete(selectedId) {
      if (!selectedId) {
        return
      }

      await this.$dam.deleteCategory({ id: selectedId })
    },

    /**
     * Generate csv file
     */
    async generateCSV() {
      if (Array.isArray(this.data) && this.data.length) {
        this.loading = true

        try {
          const promises = [...Array(this.lastPage)].map((item, index) => {
            const query = { ...this.query, page: index + 1 }
            return this.$dam.getCategoryList(query)
          })

          const res = await Promise.all(promises)
          const keys = ['id', 'name', 'description']
          const data = flatten(res.map(item => item.data)).map(item => pick(item, keys))

          this.$csv.parseAndDownload({ data })
        } catch (err) {
          console.error(err)
        } finally {
          this.loading = false
        }
      }
    }
  }
}
</script>
