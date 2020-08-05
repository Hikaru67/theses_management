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
            type="button"
            color="primary"
            :variant="'ghost'"
            :disabled="loading"
            @click="generateCSV"
          >
            <font-awesome-icon :icon="['fas', 'download']" class="width-1x" />
            {{ $t('common.download_csv') }}
          </CButton>

          <CButton
            type="submit"
            color="primary"
            :variant="'ghost'"
            @click="onShowDetail($event, 0)"
          >
            <font-awesome-icon :icon="['fas', 'plus-circle']" class="width-1x" />
            {{ $t('common.create_new') }}
          </CButton>
        </div>
      </CCardHeader>

      <CCardBody>
        <div class="box-top">
          <div class="row">
            <div class="col-12 col-md-5 total">
              <strong>{{ $t('common.total') }}:</strong>
              {{ total }}
              {{ $t('category.category_for_pagination') }}
            </div>

            <div
              v-if="isNoteHidden"
              class="col-12 col-md-7 note"
            >
              {{ $t('category.note_for_deletion') }}
            </div>
          </div>
        </div>

        <div class="category-tree">
          <!-- <tree
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
                    <CButton
                      size="sm"
                      color="primary"
                      @click="onCreateChild($event, node.data.id)"
                    >
                      <font-awesome-icon :icon="['fas', 'plus-circle']" />
                    </CButton>
                  </li>

                  <li>
                    <CButton
                      size="sm"
                      color="primary"
                      @click="onShowDetail($event, node.data.id)"
                    >
                      <font-awesome-icon :icon="['fas', 'pencil-alt']" />
                    </CButton>
                  </li>

                  <li v-if="!node.children.length">
                    <CButton
                      size="sm"
                      color="danger"
                      @click="onConfirmDelete($event, node.data.id)"
                    >
                      <font-awesome-icon :icon="['fas', 'trash-alt']" />
                    </CButton>
                  </li>
                </ul>
              </div>
            </div>
          </tree> -->
        </div>
      </CCardBody>
    </CCard>

    <category-create-edit-modal
      :id="selectedId"
      ref="categoryCreateEditModal"
      :parent-id="currentId"
      @modify="onModify"
    />

    <app-delete-confirm-dialog
      ref="deleteConfirmDialog"
      :name="$t('category.category')"
      @confirm="onDelete"
    />
  </div>
</template>

<style lang="scss" scoped>
.main-list {
  /deep/ {
    .box-top {
      .total {
        margin-bottom: 10px;
      }
      .note {
        font-style: italic;
        text-align: right;
      }
    }
  }
}
</style>

<script>
import { flatten, pick } from 'lodash'
// import LiquorTree from 'liquor-tree'

import {
  SORT_TYPE,
  MAX_LIMIT_RECORD
} from '~/constants'

import Category from '~/models/Category'

import CategoryCreateEditModal from '~/components/organisms/categories/CategoryCreateEditModal'
import AppDeleteConfirmDialog from '~/components/molecules/AppDeleteConfirmDialog'

export default {
  components: {
    CategoryCreateEditModal,
    AppDeleteConfirmDialog
    // [LiquorTree.name]: LiquorTree
  },

  data() {
    return {
      loading: false,
      resourceTypeName: this.$t('category.category'),
      selectedId: null,
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
    this.getCategoryList()
  },

  methods: {
    /**
     * Call API get category list
     */
    getCategoryList() {
      const params = {
        limit: MAX_LIMIT_RECORD,
        sort: 'position',
        sortType: SORT_TYPE.ASC
      }

      this.$dam.getCategoryList(params)
        .then(res => {
          if (Array.isArray(res.data) && res.data.length) {
            this.total = res.meta.total
            this.lastPage = res.meta.last_page
            this.categories = res.data.map(item => new Category(item))
            this.categoryTreeList = this.convertCategories()
          }
        })
        .catch(err => {
          console.error(err)

          this.$toast.error(
            this.$t('messages.error.failed_to_get', { name: this.resourceTypeName })
          )
        })
    },

    /**
     * Convert categories to nested
     *
     * @param {Number} parentId
     * @return {Array} categories
     */
    convertCategories(parentId = 0) {
      return this.categories
        .filter(item => {
          const itemId = item.parent ? item.parent.id : 0
          return itemId === parentId
        })
        .map(item => {
          const children = this.convertCategories(item.id)

          if (children.length === 0) {
            return {
              text: item.id + ' ' + item.name,
              data: {
                id: item.id
              }
            }
          }

          return {
            data: {
              id: item.id
            },
            text: item.id + ' ' + item.name,
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

      this.$dam.moveCategory({ list: categoriesData })
        .then(_ => {
          this.$toast.success(
            this.$t('messages.information.updated', { name: this.resourceTypeName })
          )

          // this.getCategoryList()
        })
        .catch(err => {
          console.error(err)

          this.categories = []
          this.categoryTreeList = []
          this.getCategoryList()

          this.$toast.error(
            this.$t('messages.error.failed_to_update', { name: this.resourceTypeName })
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
      this.$refs.categoryCreateEditModal.open()
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
      this.$refs.categoryCreateEditModal.open()
    },

    /**
     * On modify
     */
    onModify() {
      this.categories = []
      this.categoryTreeList = []
      this.selectedId = null
      this.currentId = null
      this.getCategoryList()
    },

    /**
     * Open confirm delete
     * If confirm then call delete category
     * Else cancel
     *
     * @param {Object} e - Event
     * @param {String} id - category id
     */
    onConfirmDelete(e, id) {
      e.preventDefault()
      e.stopPropagation()

      this.setSelectedId(id)
      this.$refs.deleteConfirmDialog.open()
    },

    /**
     * After the deletion confirmation dialog is confirmed
     * Call API delete.
     */
    onDelete() {
      if (this.selectedId) {
        this.$dam.deleteCategory({ id: this.selectedId })
          .then(_ => {
            this.$toast.success(
              this.$t('messages.information.deleted', { name: this.resourceTypeName })
            )

            this.categories = []
            this.categoryTreeList = []
            this.getCategoryList()
          })
          .catch(err => {
            console.error(err)

            this.$toast.error(
              this.$t('messages.error.failed_to_delete', { name: this.resourceTypeName })
            )
          })
      }
    },

    /**
     * Generate csv file
     */
    async generateCSV() {
      if (Array.isArray(this.categories) && this.categories.length) {
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
