export default {
  me: {
    post: {
      name: 'updateProfile'
    }
  },
  user: {
    resource: {}
  },
  news: {
    resource: {}
  },
  '/news/city': {
    get: {
      name: 'getCity'
    }
  },
  role: {
    resource: {}
  },
  permission: {
    get: {}
  },
  menu: {
    resource: {}
  },
  'menu/move': {
    post: {
      name: 'moveMenu'
    }
  }
}
