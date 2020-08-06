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

      <div class="box-top">
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
        <a-row type="flex" :gutter="30">
          <a-col :md="12">
            <pre>{{ gData }}</pre>
          </a-col>
          <a-col :md="12">
            <pre>{{ categoryTreeList }}</pre>
            <hr />
            <pre>{{ expandedCategoryKeys }}</pre>
          </a-col>
        </a-row>

        <!-- :auto-expand-parent="true" -->

        <a-tree
          :tree-data="categoryTreeList"
          :default-expanded-keys="expandedCategoryKeys"
          draggable
          show-icon
          @dragenter="onDragEnter"
          @drop="onDrop"
        >
          <font-awesome-icon slot="icon" icon="save" class="width-1x mr-1" />
        </a-tree>
      </div>
    </a-card>

    <category-create-edit-modal
      :id="selectedId"
      ref="refCategoryCreateEditModal"
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

import { SORT_TYPE, MAX_LIMIT_RECORD } from '~/constants'
import Category from '~/models/Category'

import CategoryCreateEditModal from '~/components/organisms/categories/CategoryCreateEditModal'
import AppDeleteConfirmDialog from '~/components/molecules/AppDeleteConfirmDialog'

const x = 3
const y = 2
const z = 1
const gData = []

const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || '0'
  const tns = _tns || gData

  const children = []
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`
    tns.push({ title: key, key })
    if (i < y) {
      children.push(key)
    }
  }
  if (_level < 0) {
    return tns
  }
  const level = _level - 1
  children.forEach((key, index) => {
    tns[index].children = []
    return generateData(level, key, tns[index].children)
  })
}
generateData(z)

const old = [
  {
    data: {
      id: 1
    },
    text: '1 test',
    state: {
      expanded: true
    },
    children: [
      {
        data: {
          id: 2
        },
        text: '2 cat 2',
        state: {
          expanded: true
        },
        children: [
          {
            text: '3 cat 3',
            data: {
              id: 3
            }
          },
          {
            text: '4 cat 4',
            data: {
              id: 4
            }
          }
        ]
      }
    ]
  },
  {
    text: '5 cat 5',
    data: {
      id: 5
    }
  },
  {
    text: '6 cat 6',
    data: {
      id: 6
    }
  },
  {
    text: '7 cat 7',
    data: {
      id: 7
    }
  },
  {
    text: '8 cat 8',
    data: {
      id: 8
    }
  }
]

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
      selectedName: '',
      total: 0,
      lastPage: 1,

      categories: [],
      categoryTreeList: [],
      expandedCategoryKeys: ['2', '1'],
      // categoryTreeOptions: {
      //   checkbox: false,
      //   dnd: true
      // },
      currentId: null,
      isNoteHidden: false,

      // Test
      gData,
      old
    }
  },

  mounted() {
    this.getCategoryList()
  },

  methods: {
    onDragEnter(info) {
      console.log('onDragEnter info', info)
      // expandedKeys 需要受控时设置
      // this.expandedKeys = info.expandedKeys
    },
    onDrop(info) {
      console.log('onDrop info', info)
      const dropKey = info.node.eventKey
      const dragKey = info.dragNode.eventKey
      const dropPos = info.node.pos.split('-')
      const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])
      const loop = (data, key, callback) => {
        data.forEach((item, index, arr) => {
          if (item.key === key) {
            return callback(item, index, arr)
          }
          if (item.children) {
            return loop(item.children, key, callback)
          }
        })
      }
      const data = [...this.gData]

      // Find dragObject
      let dragObj
      loop(data, dragKey, (item, index, arr) => {
        arr.splice(index, 1)
        dragObj = item
      })
      if (!info.dropToGap) {
        // Drop on the content
        loop(data, dropKey, item => {
          item.children = item.children || []
          // where to insert 示例添加到尾部，可以是随意位置
          item.children.push(dragObj)
        })
      } else if (
        (info.node.children || []).length > 0 && // Has children
        info.node.expanded && // Is expanded
        dropPosition === 1 // On the bottom gap
      ) {
        loop(data, dropKey, item => {
          item.children = item.children || []
          // where to insert 示例添加到尾部，可以是随意位置
          item.children.unshift(dragObj)
        })
      } else {
        let ar
        let i
        loop(data, dropKey, (item, index, arr) => {
          ar = arr
          i = index
        })
        if (dropPosition === -1) {
          ar.splice(i, 0, dragObj)
        } else {
          ar.splice(i + 1, 0, dragObj)
        }
      }
      this.gData = data
    },

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
            console.log('this.categories', this.categories)
            this.categoryTreeList = this.convertCategories()
            console.log('this.categoryTreeList', this.categoryTreeList)
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
      return this.categories
        .filter(item => {
          const itemId = item.parent ? item.parent.id : 0
          return itemId === parentId
        })
        .map(item => {
          const children = this.convertCategories(item.id)

          if (children.length) {
            // this.expandedCategoryKeys.push(String(item.id))
            return {
              // data: {
              //   id: item.id
              // },
              key: String(item.id),
              // title: item.name,
              title: item.id + ' ' + item.name,
              // state: {
              //   expanded: true
              // },
              children
            }
          } else {
            return {
              key: String(item.id),
              title: item.id + ' ' + item.name
              // data: {
              //   id: item.id
              // }
            }
          }
          // if (children.length === 0) {
          //   const data = {
          //     key: item.id,
          //     title: item.id + ' ' + item.name
          //     // data: {
          //     //   id: item.id
          //     // }
          //   }

          //   return data
          // }

          // const data = {
          //   // data: {
          //   //   id: item.id
          //   // },
          //   key: item.id,
          //   title: item.name,
          //   // title: item.id + ' ' + item.name,
          //   // state: {
          //   //   expanded: true
          //   // },
          //   children
          // }

          // return data
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
      this.$refs.refCategoryCreateEditModal.open()
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
      this.$refs.refCategoryCreateEditModal.open()
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
     * If confirm then call delete category
     * Else cancel
     *
     * @param {Object} e - Event
     * @param {String} item - Category
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
        this.$dam.deleteCategory({ id: this.selectedId })
          .then(_ => {
            this.$notification.success({
              message: this.$t('messages.information.deleted', { name: this.resourceTypeName })
            })

            this.categories = []
            this.categoryTreeList = []
            this.getCategoryList()
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
