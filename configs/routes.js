export default {
  users: {
    resource: {}
  },
  news: {
    resource: {}
  },
  projects: {
    resource: {}
  },
  lecturers: {
    resource: {}
  },
  '/lecturers': {
    get: {
      name: 'getLecturers'
    }
  },
  '/news/city': {
    get: {
      name: 'getCity'
    }
  }
}
