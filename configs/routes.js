export default {
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
  menu: {
    resource: {}
  },
  'menu/move': {
    post: {
      name: 'moveMenu'
    }
  }
}
