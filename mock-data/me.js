/**
 * Copyright 2020 Digi Dinos JSC. All rights reserved.
 * Email: tech@digidinos.com.
 */

export default {
  getUserInfo: () => {
    return {
      data: {
        id: 1,
        email: 'admin@admin.com',
        name: 'Admin',
        menus: [
          {
            id: 1,
            title: 'module',
            link: null,
            icon: null,
            parent_id: 0,
            position: 1,
            created_at: '2020-08-07T04:29:33.000000Z',
            updated_at: '2020-08-07T04:29:33.000000Z',
            menus: [
              {
                id: 7,
                title: 'broadcasts',
                link: null,
                icon: 'envelope',
                parent_id: 1,
                position: 1,
                created_at: '2020-08-07T04:29:34.000000Z',
                updated_at: '2020-08-07T04:29:34.000000Z',
                menus: [
                  {
                    id: 8,
                    title: 'broadcast.index',
                    link: '/broadcasts',
                    icon: null,
                    parent_id: 7,
                    position: 1,
                    created_at: '2020-08-07T04:29:34.000000Z',
                    updated_at: '2020-08-07T04:29:34.000000Z',
                    menus: []
                  },
                  {
                    id: 9,
                    title: 'broadcast.store',
                    link: '/broadcasts/new',
                    icon: null,
                    parent_id: 7,
                    position: 2,
                    created_at: '2020-08-07T04:29:34.000000Z',
                    updated_at: '2020-08-07T04:29:34.000000Z',
                    menus: []
                  }
                ]
              },
              {
                id: 10,
                title: 'greetingMessage',
                link: null,
                icon: null,
                parent_id: 1,
                position: 2,
                created_at: '2020-08-07T04:29:34.000000Z',
                updated_at: '2020-08-07T04:29:34.000000Z',
                menus: [
                  {
                    id: 11,
                    title: 'greetingMessage.index',
                    link: '/greeting-messages',
                    icon: 'reply',
                    parent_id: 10,
                    position: 1,
                    created_at: '2020-08-07T04:29:34.000000Z',
                    updated_at: '2020-08-07T04:29:34.000000Z',
                    menus: []
                  }
                ]
              },
              {
                id: 12,
                title: 'autoMessage',
                link: null,
                icon: null,
                parent_id: 1,
                position: 3,
                created_at: '2020-08-07T04:29:34.000000Z',
                updated_at: '2020-08-07T04:29:34.000000Z',
                menus: [
                  {
                    id: 13,
                    title: 'autoMessage.index',
                    link: '/auto-messages',
                    icon: 'inbox',
                    parent_id: 12,
                    position: 1,
                    created_at: '2020-08-07T04:29:34.000000Z',
                    updated_at: '2020-08-07T04:29:34.000000Z',
                    menus: []
                  }
                ]
              },
              {
                id: 14,
                title: 'richMessage',
                link: null,
                icon: null,
                parent_id: 1,
                position: 4,
                created_at: '2020-08-07T04:29:34.000000Z',
                updated_at: '2020-08-07T04:29:34.000000Z',
                menus: [
                  {
                    id: 15,
                    title: 'richMessage.index',
                    link: '/rich-messages',
                    icon: 'mail-bulk',
                    parent_id: 14,
                    position: 1,
                    created_at: '2020-08-07T04:29:34.000000Z',
                    updated_at: '2020-08-07T04:29:34.000000Z',
                    menus: []
                  }
                ]
              },
              {
                id: 16,
                title: 'chats',
                link: null,
                icon: null,
                parent_id: 1,
                position: 5,
                created_at: '2020-08-07T04:29:34.000000Z',
                updated_at: '2020-08-07T04:29:34.000000Z',
                menus: [
                  {
                    id: 17,
                    title: 'chats.index',
                    link: '/chat/messenger',
                    icon: 'comment',
                    parent_id: 16,
                    position: 1,
                    created_at: '2020-08-07T04:29:34.000000Z',
                    updated_at: '2020-08-07T04:29:34.000000Z',
                    menus: []
                  }
                ]
              },
              {
                id: 18,
                title: 'contact',
                link: null,
                icon: null,
                parent_id: 1,
                position: 6,
                created_at: '2020-08-07T04:29:34.000000Z',
                updated_at: '2020-08-07T04:29:34.000000Z',
                menus: [
                  {
                    id: 19,
                    title: 'contact.index',
                    link: '/contact',
                    icon: 'address-book',
                    parent_id: 18,
                    position: 1,
                    created_at: '2020-08-07T04:29:34.000000Z',
                    updated_at: '2020-08-07T04:29:34.000000Z',
                    menus: []
                  }
                ]
              },
              {
                id: 20,
                title: 'settings',
                link: null,
                icon: 'cog',
                parent_id: 1,
                position: 7,
                created_at: '2020-08-07T04:29:34.000000Z',
                updated_at: '2020-08-07T04:29:34.000000Z',
                menus: [
                  {
                    id: 21,
                    title: 'setting.response',
                    link: '/settings/response',
                    icon: null,
                    parent_id: 20,
                    position: 1,
                    created_at: '2020-08-07T04:29:34.000000Z',
                    updated_at: '2020-08-07T04:29:34.000000Z',
                    menus: []
                  },
                  {
                    id: 22,
                    title: 'setting.period',
                    link: '/settings/period',
                    icon: null,
                    parent_id: 20,
                    position: 2,
                    created_at: '2020-08-07T04:29:34.000000Z',
                    updated_at: '2020-08-07T04:29:34.000000Z',
                    menus: []
                  },
                  {
                    id: 23,
                    title: 'setting.register',
                    link: '/settings/register',
                    icon: null,
                    parent_id: 20,
                    position: 3,
                    created_at: '2020-08-07T04:29:34.000000Z',
                    updated_at: '2020-08-07T04:29:34.000000Z',
                    menus: []
                  }
                ]
              },
              {
                id: 24,
                title: 'downloadCSV',
                link: null,
                icon: null,
                parent_id: 1,
                position: 8,
                created_at: '2020-08-07T04:29:34.000000Z',
                updated_at: '2020-08-07T04:29:34.000000Z',
                menus: [
                  {
                    id: 25,
                    title: 'downloadCSV.index',
                    link: '#',
                    icon: 'download',
                    parent_id: 24,
                    position: 1,
                    created_at: '2020-08-07T04:29:34.000000Z',
                    updated_at: '2020-08-07T04:29:34.000000Z',
                    menus: []
                  }
                ]
              }
            ]
          },
          {
            id: 2,
            title: 'system',
            link: null,
            icon: null,
            parent_id: 0,
            position: 1,
            created_at: '2020-08-07T04:29:33.000000Z',
            updated_at: '2020-08-07T04:29:33.000000Z',
            menus: [
              {
                id: 3,
                title: 'user',
                link: null,
                icon: null,
                parent_id: 2,
                position: 1,
                created_at: '2020-08-07T04:29:34.000000Z',
                updated_at: '2020-08-07T04:29:34.000000Z',
                menus: [
                  {
                    id: 4,
                    title: 'user.index',
                    link: '/users',
                    icon: 'user-friends',
                    parent_id: 3,
                    position: 1,
                    created_at: '2020-08-07T04:29:34.000000Z',
                    updated_at: '2020-08-07T04:29:34.000000Z',
                    menus: []
                  }
                ]
              },
              {
                id: 5,
                title: 'role',
                link: null,
                icon: null,
                parent_id: 2,
                position: 2,
                created_at: '2020-08-07T04:29:34.000000Z',
                updated_at: '2020-08-07T04:29:34.000000Z',
                menus: [
                  {
                    id: 6,
                    title: 'role.index',
                    link: '/roles',
                    icon: 'balance-scale',
                    parent_id: 5,
                    position: 1,
                    created_at: '2020-08-07T04:29:34.000000Z',
                    updated_at: '2020-08-07T04:29:34.000000Z',
                    menus: []
                  }
                ]
              }
            ]
          }
        ],
        roles: [
          {
            id: 1,
            name: 'admin'
          }
        ],
        api_token: null
      }
    }
  }
}
