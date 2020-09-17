<template>
  <a-sub-menu
    :key="menu.id"
    v-bind="$props"
    v-on="$listeners"
  >
    <span slot="title">
      <nuxt-link
        v-if="menu.link"
        :to="menu.link"
      >
        <font-awesome-icon
          v-if="menu.icon"
          :icon="menu.icon"
          class="anticon"
        />
        {{ menu.title }}
      </nuxt-link>
      <span v-else>
        <font-awesome-icon
          v-if="menu.icon"
          :icon="menu.icon"
          class="anticon"
        />{{ menu.title }}
      </span>
    </span>
    <template v-for="item in menu.menus">
      <a-menu-item
        v-if="!item.menus.length"
        :key="item.id"
      >
        <nuxt-link
          v-if="item.link"
          :to="item.link"
        >
          <font-awesome-icon
            v-if="item.icon"
            :icon="item.icon"
            class="anticon"
          />
          {{ item.title }}
        </nuxt-link>
        <span v-else>
          <font-awesome-icon
            v-if="item.icon"
            :icon="item.icon"
            class="anticon"
          />
          {{ item.title }}
        </span>
      </a-menu-item>
      <sub-menu
        v-else
        :key="item.id"
        :menu="item"
      />
    </template>
  </a-sub-menu>
</template>

<script>
import { Menu } from 'ant-design-vue'
export default {
  name: 'SubMenu',
  data() {
    return {
      isSubMenu: true
    }
  },
  props: {
    ...Menu.SubMenu.props,
    menu: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style>
</style>
