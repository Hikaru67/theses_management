/**
 * Copyright 2020 Digi Dinos JSC. All rights reserved.
 * Email: tech@digidinos.com.
 */

export default {
  getUserList: () => {
    return {
      data: [
        {
          id: 101,
          name: 'Mock testttttttt Miss Ima Hane DDS',
          email: 'rory41@gmail.com',
          status: 0,
          api_token: null,
          roles: []
        },
        {
          id: 100,
          name: 'Jennie Stanton',
          email: 'akiehn@kozey.info',
          status: 0,
          api_token: null,
          roles: []
        },
        {
          id: 99,
          name: 'Ashton Reilly',
          email: 'aniyah27@gmail.com',
          status: 1,
          api_token: null,
          roles: []
        },
        {
          id: 98,
          name: 'Osborne Green',
          email: 'daisha75@franecki.com',
          status: 1,
          api_token: null,
          roles: []
        },
        {
          id: 97,
          name: 'Alexandra Block',
          email: 'zackary88@hotmail.com',
          status: 0,
          api_token: null,
          roles: []
        },
        {
          id: 96,
          name: 'Fletcher Conroy',
          email: 'oframi@gmail.com',
          status: 0,
          api_token: null,
          roles: []
        },
        {
          id: 95,
          name: 'Declan Altenwerth',
          email: 'jamil.mann@hotmail.com',
          status: 1,
          api_token: null,
          roles: []
        },
        {
          id: 94,
          name: 'Vicky Romaguera',
          email: 'schaefer.onie@yahoo.com',
          status: 0,
          api_token: null,
          roles: []
        },
        {
          id: 93,
          name: 'Mrs. Laurie Grant IV',
          email: 'jettie.veum@kerluke.com',
          status: 0,
          api_token: null,
          roles: []
        },
        {
          id: 92,
          name: 'Martine Graham',
          email: 'ssauer@cruickshank.biz',
          status: 1,
          api_token: null,
          roles: []
        }
      ],
      links: {
        first: 'http://content-management-api.test/api/user?page=1',
        last: 'http://content-management-api.test/api/user?page=11',
        prev: null,
        next: 'http://content-management-api.test/api/user?page=2'
      },
      meta: {
        current_page: 1,
        from: 1,
        last_page: 11,
        path: 'http://content-management-api.test/api/user',
        per_page: 10,
        to: 10,
        total: 101
      }
    }
  },

  createUser: () => {
    return {}
  },

  getUser: () => {
    return {
      data: {
        api_token: null,
        ebay_authenticated: false,
        email: 'mann.gracie@trantow.biz',
        id: 101,
        name: 'Test Mock Lyric Connelly MD',
        paypal_authenticated: false,
        roles: [],
        status: 1
      }
    }
  },

  updateUser: () => {
    return {
      data: {
        api_token: null,
        ebay_authenticated: false,
        email: 'mann.gracie@trantow.biz',
        id: 101,
        name: 'Test Mock Lyric Connelly MD',
        paypal_authenticated: false,
        roles: [],
        status: 1
      }
    }
  },

  deleteUser: () => {
    return {}
  }
}
