export default {
  users: {
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
  menu: {
    resource: {}
  },
  'menu/move': {
    post: {
      name: 'moveMenu'
    }
  }
}
