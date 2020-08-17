<template>
  <div class="main-list position-relative">
    <div class="box-change-view">
      <nuxt-link to="/article-category" :class="`${$route.path === '/article-category/list' ? 'on-article-category-list' : ''}`">
        <font-awesome-icon icon="th-list" />
      </nuxt-link>

      <nuxt-link to="/article-category/list" :class="`${$route.path === '/article-category/list' ? 'on-article-category-list' : ''}`">
        <font-awesome-icon icon="border-all" />
      </nuxt-link>
    </div>

    <a-card class="mb-4">
      <template slot="title">
        <font-awesome-icon icon="book" />
        <strong>{{ $t('article-category.title') }}</strong>
      </template>

      <template slot="extra">
        <a-button html-type="button" type="primary" ghost @click="generateCSV">
          <font-awesome-icon icon="download" class="width-1x mr-1" />
          {{ $t('common.download_csv') }}
        </a-button>

        &nbsp;
        <a-button html-type="button" type="primary" ghost @click="onShowDetail($event, 0)">
          <font-awesome-icon icon="plus-circle" class="width-1x mr-1" />
          {{ $t('common.create_new') }}
        </a-button>
      </template>

      <div class="box-top mb-2">
        <div class="row">
          <div class="col-12 col-md-5 total">
            <strong>{{ $t('common.total') }}:</strong>
            {{ total }}
            {{ $t('category.category_for_pagination') }}
          </div>

          <div v-if="isNoteHidden" class="col-12 col-md-7 note">
            {{ $t('category.note_for_deletion') }}
          </div>
        </div>
      </div>

      <div class="category-tree">
        <tree
          v-if="Array.isArray(categoryTreeList) && categoryTreeList.length"
          :data="categoryTreeList"
          :options="categoryTreeOptions"
          @node:dragging:finish="onDragFinishCategories"
        >
          <div slot-scope="{ node }" class="node-container">
            <i class="tree-checkbox" />

            <div class="node-text">
              {{ node.text }}
            </div>

            <div class="node-controls">
              <ul class="btns-action">
                <li>
                  <a-button
                    html-type="button"
                    type="primary"
                    size="small"
                    :disabled="loading"
                    @click="onShowDetail($event, node.data.id)"
                  >
                    <font-awesome-icon :icon="['fas', 'pencil-alt']" />
                  </a-button>
                </li>

                <li v-if="!node.children.length">
                  <a-button
                    html-type="button"
                    type="danger"
                    size="small"
                    :disabled="loading"
                    @click="onConfirmDelete($event, node.data)"
                  >
                    <font-awesome-icon icon="trash-alt" class="width-1x" />
                  </a-button>
                </li>
              </ul>
            </div>
          </div>
        </tree>
      </div>
    </a-card>

    <article-category-detail-modal
      :id="selectedId"
      ref="refArticleCategoryDetailModal"
      :parent-id="currentId"
      @modify="onModify"
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
import LiquorTree from 'liquor-tree'

import { SORT_TYPE, MAX_LIMIT_RECORD } from '~/constants'
import ArticleCategory from '~/models/ArticleCategory'

import ArticleCategoryDetailModal from '~/components/organisms/article-category/ArticleCategoryDetailModal'
import AppDeleteConfirmDialog from '~/components/molecules/AppDeleteConfirmDialog'

export default {
  components: {
    ArticleCategoryDetailModal,
    AppDeleteConfirmDialog,
    [LiquorTree.name]: LiquorTree
  },

  data() {
    return {
      loading: false,
      resourceTypeName: this.$t('article-category.title'),
      selectedId: null,
      selectedName: '',
      total: 0,
      lastPage: 1,

      categories: [],
      categoryTreeList: [],
      categoryTreeOptions: {
        checkbox: false,
        dnd: true
      },
      currentId: null,
      isNoteHidden: false
    }
  },

  mounted() {
    this.getArticleCategoryList()
  },

  methods: {
    /**
     * Call API get category list
     */
    getArticleCategoryList() {
      const params = {
        limit: MAX_LIMIT_RECORD,
        sort: 'position',
        sortType: SORT_TYPE.ASC
      }

      this.$dam.getArticleCategoryList(params)
        .then(res => {
          if (Array.isArray(res.data) && res.data.length) {
            this.total = res.meta.total
            this.lastPage = res.meta.last_page
            this.categories = res.data.map(item => new ArticleCategory(item))
            this.categoryTreeList = this.convertCategories()
          }
        })
        .catch(err => {
          console.error(err)

          this.$notification.error({
            message: this.$t('messages.error.failed_to_get', { name: this.resourceTypeName })
          })
        })
    },

    /**
     * Convert categories to nested
     *
     * @param {Number} parentId
     * @return {Array} categories
     */
    convertCategories(parentId = 0) {
      return [...this.categories]
        .filter(item => {
          const itemId = item.parent ? item.parent.id : 0
          return itemId === parentId
        })
        .map(item => {
          const children = this.convertCategories(item.id)

          if (!children.length) {
            return {
              text: item.name,
              data: {
                ...item
              }
            }
          }

          return {
            data: {
              ...item
            },
            text: item.name,
            state: {
              expanded: true
            },
            children
          }
        })
    },

    /**
     * On drag finish categories
     */
    onDragFinishCategories(node) {
      let categoriesData = []

      if (node.parent && node.parent.data.id) {
        // Case: Drag the item to become a child of another parent item
        const parentId = node.parent.data.id
        const parentNode = node.tree.find({
          data: {
            id: +parentId
          }
        })

        if (!(parentNode[0] && parentNode[0].data.id)) {
          console.error('Not found Parent Node')
          return
        }

        categoriesData = parentNode[0].children.map((item, index) => {
          return {
            id: item.data.id,
            parent_id: parentNode[0].data.id,
            position: index
          }
        })
      } else {
        // Case: Drag the item to become the item of the highest rank (parent_id = 0)
        if (!Array.isArray(node.tree.model)) {
          return
        }

        categoriesData = node.tree.model.map((item, index) => {
          return {
            id: item.data.id,
            parent_id: 0,
            position: index
          }
        })
      }

      this.$dam.moveArticleCategory({ list: categoriesData })
        .then(_ => {
          this.$notification.success({
            message: this.$t('messages.information.updated', { name: this.resourceTypeName })
          })

          // this.getCategoryList()
        })
        .catch(err => {
          console.error(err)

          this.categories = []
          this.categoryTreeList = []
          this.getCategoryList()

          this.$notification.error({
            message: this.$t('messages.error.failed_to_update', { name: this.resourceTypeName })
          })
        })
    },

    /**
     * Create child category from parent id
     *
     * @param {Object} e - Event
     * @param {Number} id - Parent id
     */
    onCreateChild(e, id) {
      e.preventDefault()
      e.stopPropagation()

      this.currentId = id
      this.$refs.refArticleCategoryDetailModal.open()
    },

    /**
     * Open category detail modal
     *
     * @param {Object} e - Event
     * @param {Object} id - Current category
     */
    onShowDetail(e, id) {
      e.preventDefault()
      e.stopPropagation()

      this.setSelectedId(id)
      this.$refs.refArticleCategoryDetailModal.open()
    },

    /**
     * On modify
     */
    onModify() {
      this.articleCategories = []
      this.categoryTreeList = []
      this.selectedId = null
      this.currentId = null
      this.getArticleCategoryList()
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
     * @param {Object} e - Event
     * @param {object} item - Category
     */
    onConfirmDelete(e, item) {
      e.preventDefault()
      e.stopPropagation()

      if (!item || !item.id) {
        return
      }

      this.setSelectedId(item.id)
      this.setSelectedName(item.name)
      this.$refs.refDeleteConfirmDialog.open()
    },

    /**
     * After the deletion confirmation dialog is confirmed
     * Call API delete.
     */
    onDelete() {
      if (this.selectedId) {
        this.$dam.deleteArticleCategory({ id: this.selectedId })
          .then(_ => {
            this.$notification.success({
              message: this.$t('messages.information.deleted', { name: this.resourceTypeName })
            })

            this.categories = []
            this.categoryTreeList = []
            this.getArticleCategoryList()
          })
          .catch(err => {
            console.error(err)

            this.$notification.error({
              message: this.$t('messages.error.failed_to_delete', { name: this.resourceTypeName })
            })
          })
      }
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
            return this.$dam.getArticleCategoryList(query)
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
