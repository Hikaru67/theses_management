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

    <a-tree
      class="draggable-tree"
      draggable
      :tree-data="gData"
      @dragenter="onDragEnter"
      @drop="onDrop"
    />
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
export default {
  data() {
    return {
      gData: [
        {
          key: 1,
          title: 'title 1',
          parent: 0,
          children: [
            {
              key: 2,
              title: 'title 2',
              parent: 1,
              children: [
                {
                  key: 6,
                  title: 'title 6',
                  parent: 2,
                  children: []
                }
              ]
            },
            {
              key: 5,
              title: 'title 5',
              parent: 1,
              children: []
            }
          ]
        },
        {
          key: 3,
          title: 'title 3',
          parent: 0,
          children: [
            {
              key: 4,
              title: 'title 4',
              parent: 3,
              children: [
                {
                  key: 7,
                  title: 'title 7',
                  parent: 4,
                  children: []
                },
                {
                  key: 9,
                  title: 'title 9',
                  parent: 4,
                  children: []
                },
                {
                  key: 10,
                  title: 'title 10',
                  parent: 4,
                  children: []
                }
              ]
            },
            {
              key: 8,
              title: 'title 8',
              parent: 3,
              children: []
            }
          ]
        }
      ],
      list: []
    }
  },
  methods: {
    onDragEnter(info) {
      // console.warn('drag', info)
      // expandedKeys 需要受控时设置
      // this.expandedKeys = info.expandedKeys
    },
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
      const data = cloneDeep(this.gData)
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
      // await this.$api.post
      console.warn(this.$api)
    }
  }
}
</script>
