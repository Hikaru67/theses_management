/**
 * Copyright 2020 Digi Dinos JSC. All rights reserved.
 * Email: tech@digidinos.com.
 */

export default {
  getMenuList: () => {
    return {
      data: [
        {
          id: 25,
          title: 'downloadCSV.index',
          link: '#',
          icon: 'download',
          parent_id: 24,
          position: 1
        },
        {
          id: 24,
          title: 'downloadCSV',
          link: null,
          icon: null,
          parent_id: 1,
          position: 8
        },
        {
          id: 23,
          title: 'setting.register',
          link: '/settings/register',
          icon: null,
          parent_id: 20,
          position: 3
        },
        {
          id: 22,
          title: 'setting.period',
          link: '/settings/period',
          icon: null,
          parent_id: 20,
          position: 2
        },
        {
          id: 21,
          title: 'setting.response',
          link: '/settings/response',
          icon: null,
          parent_id: 20,
          position: 1
        },
        {
          id: 20,
          title: 'settings',
          link: null,
          icon: 'cog',
          parent_id: 1,
          position: 7
        },
        {
          id: 19,
          title: 'contact.index',
          link: '/contact',
          icon: 'address-book',
          parent_id: 18,
          position: 1
        },
        {
          id: 18,
          title: 'contact',
          link: null,
          icon: null,
          parent_id: 1,
          position: 6
        },
        {
          id: 17,
          title: 'chats.index',
          link: '/chat/messenger',
          icon: 'comment',
          parent_id: 16,
          position: 1
        },
        {
          id: 16,
          title: 'chats',
          link: null,
          icon: null,
          parent_id: 1,
          position: 5
        }
      ],
      links: {
        first: 'http://chat-app-api.test/api/menu?page=1',
        last: 'http://chat-app-api.test/api/menu?page=3',
        prev: null,
        next: 'http://chat-app-api.test/api/menu?page=2'
      },
      meta: {
        current_page: 1,
        from: 1,
        last_page: 3,
        path: 'http://chat-app-api.test/api/menu',
        per_page: 10,
        to: 10,
        total: 25
      }
    }
  },

  createMenu: () => {
    return {
      data: {
        id: 4,
        title: 'user.index',
        link: '/users',
        icon: 'user-friends',
        parent_id: 3,
        position: 1
      }
    }
  },

  getMenu: () => {
    return {
      data: {
        id: 4,
        title: 'user.index',
        link: '/users',
        icon: 'user-friends',
        parent_id: 3,
        position: 1,
        menus: []
      }
    }
  },

  updateMenu: () => {
    return {
      data: {
        id: 4,
        title: 'user.index',
        link: '/users',
        icon: 'user-friends',
        parent_id: 3,
        position: 1
      }
    }
  },

  deleteMenu: () => {
    return {}
  }
}
