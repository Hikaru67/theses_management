<template>
  <div class="main-list position-relative">
    <div class="box-change-view">
      <nuxt-link
        to="/menus"
        :class="`${$route.path === '/menus/list' ? 'on-menus-list' : ''}`"
      >
        <font-awesome-icon icon="th-list" />
      </nuxt-link>

      <nuxt-link
        to="/menus/list"
        :class="`${$route.path === '/menus/list' ? 'on-menus-list' : ''}`"
      >
        <font-awesome-icon icon="border-all" />
      </nuxt-link>
    </div>

    <a-button
      type="primary"
      :disabled="loading"
      @click="showDetail(0)"
    >
      Create Menu
    </a-button>

    <a-tree
      class="draggable-tree"
      draggable
      :tree-data="data"
      @drop="onDrop"
    >
      <template
        slot="action"
        slot-scope="{ title, key }"
      >
        <span>
          {{ title }}
        </span>
        <a
          href="#"
          @click="showDetail(key)"
        >
          <font-awesome-icon
            icon="eye"
            class="width-1x"
          />
        </a>
        <a
          href="#"
          @click="confirmToDelete(key)"
        >
          <font-awesome-icon
            icon="times"
            class="width-1x"
          />
        </a>
      </template>
    </a-tree>

    <a-modal
      ref="detail"
      :visible="visible"
      :footer="null"
      class="modal-wrap"
    >
      <template slot="title">
        <font-awesome-icon :icon="`${currentId ? 'pencil-alt' : 'plus-circle'}`" />
        {{ currentId ? $t('menu.menu') : $t('menu.menu') }}
      </template>

      <menu-form
        :id="currentId"
        @save="closeDialog(true)"
        @cancel="closeDialog(false)"
      />
    </a-modal>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import { mapGetters } from 'vuex'
import MenuForm from '~/components/organisms/MenuForm'
export default {
  components: { MenuForm },
  async fetch() {
    this.$store.dispatch('setLoading', true)
    const params = { limit: 0 }
    const { data } = await this.$api.indexMenu({ params })
    const recursive = (parentId = 0) => {
      const list = cloneDeep(data.data.filter(item => item.parent_id === parentId))
      list.sort((a, b) => a.position - b.position)
      return list.map(item => {
        const children = recursive(item.id)
        return {
          key: item.id,
          title: item.title,
          scopedSlots: {
            title: 'action'
          },
          parent: item.parent_id,
          children
        }
      })
    }
    this.data = recursive()
    this.$store.dispatch('setLoading', false)
  },
  data() {
    return {
      resource: 'menu',
      visible: false,
      currentId: 0,
      data: [],
      list: []
    }
  },
  computed: {
    ...mapGetters({
      loading: 'loading'
    })
  },
  methods: {
    extractList(data, dragNode, node, dropPosition) {
      data.forEach((item, index) => {
        if (item.key === node.eventKey) {
          const list = dropPosition === index ? item.children : data
          this.list = list.filter(entry => entry.key !== dragNode.eventKey)
        }
        this.extractList(item.children, dragNode, node, dropPosition)
      })
    },

    onDrop({ dragNode, dragNodesKeys, dropPosition, dropToGap, node }) {
      const data = cloneDeep(this.data)
      this.extractList(data, dragNode, node, dropPosition)
      const newNode = {
        ...dragNode.dataRef,
        parent: dropToGap ? node.dataRef.parent : node.eventKey
      }
      let newData = []
      if (!dropToGap) {
        newData = [...this.list, newNode]
      } else {
        this.list.forEach((item, index) => {
          const appendData = [item]
          if (item.key === node.eventKey) {
            if (index > dropPosition) {
              appendData.unshift(newNode)
            } else if (index < dropPosition) {
              appendData.push(newNode)
            }
          }
          newData = [...newData, ...appendData]
        })
      }
      let i = 0
      const batchData = newData.map(item => {
        return {
          id: item.key,
          parent_id: item.parent,
          position: i++
        }
      })
      this.batchUpdate(batchData)
    },

    async batchUpdate(list) {
      this.$store.dispatch('setLoading', true)
      await this.$api.moveMenu({ list })
      this.$store.dispatch('setLoading', false)
      this.$fetch()
    },

    showDetail(id) {
      this.currentId = id
      this.visible = true
    },

    closeDialog(fetch) {
      this.visible = false
      if (fetch) {
        this.$fetch()
      }
    },

    confirmToDelete(id) {
      this.$confirm({
        title: 'Are you sure delete this task?',
        content: 'Some descriptions',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk: () => this.deleteRecord(id)
      })
    }
  }
}
</script>
