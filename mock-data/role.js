/**
 * Copyright 2020 Digi Dinos JSC. All rights reserved.
 * Email: tech@digidinos.com.
 */

export default {
  getRoleList: () => {
    return {
      data: [
        {
          id: 3,
          name: 'Test 2'
        },
        {
          id: 2,
          name: 'Test'
        },
        {
          id: 1,
          name: 'admin'
        }
      ],
      links: {
        first: 'http://mcsapi.digidinos.com/api/role?page=1',
        last: 'http://mcsapi.digidinos.com/api/role?page=1',
        prev: null,
        next: null
      },
      meta: {
        current_page: 1,
        from: 1,
        last_page: 1,
        path: 'http://mcsapi.digidinos.com/api/role',
        per_page: 50,
        to: 3,
        total: 3
      }
    }
  },

  createRole: () => {
    return {}
  },

  getRole: () => {
    return {
      data: {
        id: 3,
        name: 'Test 2',
        permissions: [
          {
            id: 1,
            name: 'role.index'
          },
          {
            id: 3,
            name: 'role.show'
          },
          {
            id: 4,
            name: 'role.update'
          },
          {
            id: 6,
            name: 'user.index'
          },
          {
            id: 7,
            name: 'user.store'
          }
        ]
      }
    }
  },

  updateRole: () => {
    return {
      data: {
        id: 3,
        name: 'Test 2',
        permissions: [
          {
            id: 1,
            name: 'role.index'
          },
          {
            id: 3,
            name: 'role.show'
          },
          {
            id: 4,
            name: 'role.update'
          },
          {
            id: 6,
            name: 'user.index'
          },
          {
            id: 7,
            name: 'user.store'
          }
        ]
      }
    }
  },

  deleteRole: () => {
    return {}
  }
}
