<template>
  <div class="main-list position-relative">
    <div class="box-change-view">
      <nuxt-link to="/menus" :class="`${$route.path === '/menus/list' ? 'on-menus-list' : ''}`">
        <font-awesome-icon icon="th-list" />
      </nuxt-link>

      <nuxt-link to="/menus/list" :class="`${$route.path === '/menus/list' ? 'on-menus-list' : ''}`">
        <font-awesome-icon icon="border-all" />
      </nuxt-link>
    </div>

    <a-card class="mb-4">
      <template slot="title">
        <font-awesome-icon icon="stream" />
        <strong>{{ $t('menu.menu_list') }}</strong>
      </template>

      <template slot="extra">
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
            {{ $t('menu.menu') }}
          </div>

          <div v-if="isNoteHidden" class="col-12 col-md-7 note">
            {{ $t('menu.note_for_deletion') }}
          </div>
        </div>
      </div>

      <div class="menu-tree">
        <!-- <a-row type="flex" :gutter="30">
          <a-col :md="12">
            <pre>{{ menus }}</pre>
          </a-col>
          <a-col :md="12">
            <pre>{{ menuTreeList }}</pre>
          </a-col>
        </a-row> -->

        <tree
          v-if="Array.isArray(menuTreeList) && menuTreeList.length"
          :data="menuTreeList"
          :options="menuTreeOptions"
          @node:dragging:finish="onDragFinishMenus"
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
                    @click="onCreateChild($event, node.data.id)"
                  >
                    <font-awesome-icon :icon="['fas', 'plus-circle']" />
                  </a-button>
                </li>

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

    <menu-detail-modal
      :id="selectedId"
      ref="refMenuDetailModal"
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
import LiquorTree from 'liquor-tree'

import { SORT_TYPE, MAX_LIMIT_RECORD } from '~/constants'
import Menu from '~/models/Menu'

import MenuDetailModal from '~/components/organisms/menus/MenuDetailModal'
import AppDeleteConfirmDialog from '~/components/molecules/AppDeleteConfirmDialog'

export default {
  components: {
    MenuDetailModal,
    AppDeleteConfirmDialog,
    [LiquorTree.name]: LiquorTree
  },

  data() {
    return {
      loading: false,
      resourceTypeName: this.$t('menu.menu'),
      selectedId: null,
      selectedName: '',
      total: 0,
      lastPage: 1,

      menus: [],
      menuTreeList: [],
      menuTreeOptions: {
        checkbox: false,
        dnd: true
      },
      currentId: null,
      isNoteHidden: false
    }
  },

  mounted() {
    this.getMenuList()
  },

  methods: {
    /**
     * Call API get menu list
     */
    getMenuList() {
      const params = {
        limit: MAX_LIMIT_RECORD,
        sort: 'position',
        sortType: SORT_TYPE.ASC
      }

      this.$dam.getMenuList(params)
        .then(res => {
          if (Array.isArray(res.data) && res.data.length) {
            this.total = res.meta.total
            this.lastPage = res.meta.last_page
            this.menus = res.data.map(item => new Menu(item))
            this.menuTreeList = this.convertMenus()
            console.log(111, this.menuTreeList)
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
     * Convert menus to nested
     *
     * @param {Number} parentId
     * @return {Array} menus
     */
    convertMenus(parentId = 0) {
      return [...this.menus]
        .filter(item => {
          const itemId = item.parent ? item.parent.id : 0
          return itemId === parentId
        })
        .map(item => {
          const children = this.convertMenus(item.id)

          if (!children.length) {
            return {
              text: item.id + ' ' + item.title,
              data: {
                ...item
              }
            }
          }

          return {
            data: {
              ...item
            },
            text: item.id + ' ' + item.title,
            state: {
              expanded: true
            },
            children
          }
        })
    },

    /**
     * On drag finish menus
     */
    onDragFinishMenus(node) {
      let menusData = []

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

        menusData = parentNode[0].children.map((item, index) => {
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

        menusData = node.tree.model.map((item, index) => {
          return {
            id: item.data.id,
            parent_id: 0,
            position: index
          }
        })
      }

      this.$dam.moveMenu({ list: menusData })
        .then(_ => {
          this.$notification.success({
            message: this.$t('messages.information.updated', { name: this.resourceTypeName })
          })

          // this.getMenuList()
        })
        .catch(err => {
          console.error(err)

          this.menus = []
          this.menuTreeList = []
          this.getMenuList()

          this.$notification.error({
            message: this.$t('messages.error.failed_to_update', { name: this.resourceTypeName })
          })
        })
    },

    /**
     * Create child menu from parent id
     *
     * @param {Object} e - Event
     * @param {Number} id - Parent id
     */
    onCreateChild(e, id) {
      e.preventDefault()
      e.stopPropagation()

      this.currentId = id
      this.$refs.refMenuDetailModal.open()
    },

    /**
     * Open menu detail modal
     *
     * @param {Object} e - Event
     * @param {Object} id - Current menu
     */
    onShowDetail(e, id) {
      e.preventDefault()
      e.stopPropagation()

      this.setSelectedId(id)
      this.$refs.refMenuDetailModal.open()
    },

    /**
     * On modify
     */
    onModify() {
      this.menus = []
      this.menuTreeList = []
      this.selectedId = null
      this.currentId = null
      this.getMenuList()
    },

    /**
     * Set selectedId
     *
     * @param {Number} id - Menu Id
     */
    setSelectedId(id) {
      this.selectedId = id
    },

    /**
     * Set select id
     *
     * @param {String} name - Menu name
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
     * @param {object} item - Menu
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
        this.$dam.deleteMenu({ id: this.selectedId })
          .then(_ => {
            this.$notification.success({
              message: this.$t('messages.information.deleted', { name: this.resourceTypeName })
            })

            this.menus = []
            this.menuTreeList = []
            this.getMenuList()
          })
          .catch(err => {
            console.error(err)

            this.$notification.error({
              message: this.$t('messages.error.failed_to_delete', { name: this.resourceTypeName })
            })
          })
      }
    }
  }
}
</script>
