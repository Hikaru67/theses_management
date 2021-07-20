export default {
  lecturers: {
    resource: {}
  },
  students: {
    resource: {}
  },
  theses: {
    resource: {}
  },
  '/list-lecturers': {
    get: {
      name: 'getListLecturers'
    }
  },
  '/list-students': {
    get: {
      name: 'getListStudents'
    }
  }
}
