/**
 * Copyright 2020 Digi Dinos JSC. All rights reserved.
 * Email: tech@digidinos.com.
 */

export default {
  getCategoryList: () => {
    return {
      data: [
        {
          created_at: 1594874426,
          deleted_at: null,
          description: 'xxx',
          file: null,
          file_id: 0,
          id: 1,
          name: 'tesst',
          parent: null,
          parent_id: 0,
          position: 0,
          updated_at: 1594874426
        },
        {
          created_at: 1596606632,
          deleted_at: null,
          description: 'dfgf',
          file: null,
          file_id: 0,
          id: 2,
          name: 'cat 2',
          parent: {
            id: 1,
            name: 'tesst',
            description: 'xxx',
            position: 0,
            parent_id: 0,
            file_id: 0,
            created_at: 1594874426,
            updated_at: 1594874426,
            deleted_at: null
          },
          parent_id: 1,
          position: 0,
          updated_at: 1596606659
        },
        {
          created_at: 1596606640,
          deleted_at: null,
          description: 'ddfads',
          file: null,
          file_id: 0,
          id: 3,
          name: 'cat 3',
          parent: {
            id: 2,
            name: 'cat 2',
            description: 'dfgf',
            position: 0,
            parent_id: 1,
            file_id: 0,
            created_at: 1596606632,
            updated_at: 1596606659,
            deleted_at: null
          },
          parent_id: 2,
          position: 0,
          updated_at: 1596606661
        },
        {
          created_at: 1596694351,
          deleted_at: null,
          description: 'dfhsdfgs',
          file: null,
          file_id: 0,
          id: 11,
          name: 'cat 11',
          parent: {
            id: 10,
            name: 'cat 10',
            description: 'dfdfg',
            position: 1,
            parent_id: 0,
            file_id: 0,
            created_at: 1596694295,
            updated_at: 1596694334,
            deleted_at: null
          },
          parent_id: 10,
          position: 0,
          updated_at: 1596694369
        },
        {
          created_at: 1596606649,
          deleted_at: null,
          description: 'ddf',
          file: null,
          file_id: 0,
          id: 4,
          name: 'cat 4',
          parent: {
            id: 2,
            name: 'cat 2',
            description: 'dfgf',
            position: 0,
            parent_id: 1,
            file_id: 0,
            created_at: 1596606632,
            updated_at: 1596606659,
            deleted_at: null
          },
          parent_id: 2,
          position: 1,
          updated_at: 1596606664
        },
        {
          created_at: 1596606654,
          deleted_at: null,
          description: 'dsfs',
          file: null,
          file_id: 0,
          id: 5,
          name: 'cat 5',
          parent: {
            id: 1,
            name: 'tesst',
            description: 'xxx',
            position: 0,
            parent_id: 0,
            file_id: 0,
            created_at: 1594874426,
            updated_at: 1594874426,
            deleted_at: null
          },
          parent_id: 1,
          position: 1,
          updated_at: 1596606703
        },
        {
          created_at: 1596606670,
          deleted_at: null,
          description: 'hdh',
          file: null,
          file_id: 0,
          id: 6,
          name: 'cat 6',
          parent: {
            id: 8,
            name: 'cat 8',
            description: 'dfgh',
            position: 4,
            parent_id: 0,
            file_id: 0,
            created_at: 1596606681,
            updated_at: 1596606696,
            deleted_at: null
          },
          parent_id: 8,
          position: 1,
          updated_at: 1596694330
        },
        {
          created_at: 1596694295,
          deleted_at: null,
          description: 'dfdfg',
          file: null,
          file_id: 0,
          id: 10,
          name: 'cat 10',
          parent: null,
          parent_id: 0,
          position: 1,
          updated_at: 1596694334
        },
        {
          created_at: 1596606676,
          deleted_at: null,
          description: 'sdfgsf',
          file: null,
          file_id: 0,
          id: 7,
          name: 'cat 7',
          parent: null,
          parent_id: 0,
          position: 2,
          updated_at: 1596694334
        },
        {
          created_at: 1596694288,
          deleted_at: null,
          description: 'đsgs',
          file: null,
          file_id: 0,
          id: 9,
          name: 'cat 9',
          parent: null,
          parent_id: 0,
          position: 3,
          updated_at: 1596694334
        },
        {
          created_at: 1596606681,
          deleted_at: null,
          description: 'dfgh',
          file: null,
          file_id: 0,
          id: 8,
          name: 'cat 8',
          parent: null,
          parent_id: 0,
          position: 4,
          updated_at: 1596606696
        }
      ],
      links: {
        first: 'http://content-management-api.test/api/category?page=1',
        last: 'http://content-management-api.test/api/category?page=1',
        prev: null,
        next: null
      },
      meta: {
        current_page: 1,
        from: 1,
        last_page: 1,
        path: 'http://content-management-api.test/api/category',
        per_page: 1000,
        to: 11,
        total: 11
      }
    }
  },

  createCategory: () => {
    return {
      data: {
        created_at: 1594874426,
        deleted_at: null,
        description: 'decs',
        file_id: 0,
        id: 1,
        name: 'test',
        parent_id: 0,
        position: 0,
        updated_at: 1594874426
      }
    }
  },

  getCategory: () => {
    return {
      data: {
        created_at: 1594874426,
        deleted_at: null,
        description: 'decs',
        file_id: 0,
        id: 1,
        name: 'test',
        parent_id: 0,
        position: 0,
        updated_at: 1594874426
      }
    }
  },

  updateCategory: () => {
    return {
      data: {
        created_at: 1594874426,
        deleted_at: null,
        description: 'decs',
        file_id: 0,
        id: 1,
        name: 'test',
        parent_id: 0,
        position: 0,
        updated_at: 1594874426
      }
    }
  },

  deleteCategory: () => {
    return {}
  },

  moveCategory: () => {
    return {
      data: [
        {
          created_at: 1596606670,
          deleted_at: null,
          description: 'hdh',
          file_id: 0,
          id: 6,
          name: 'cat 6',
          parent_id: 8,
          position: 0,
          updated_at: 1596606962
        }
      ],
      links: {
        first: 'http://content-management-api.test/api/category/move?page=1',
        last: 'http://content-management-api.test/api/category/move?page=1',
        prev: null,
        next: null
      },
      meta: {
        current_page: 1,
        from: 1,
        last_page: 1,
        path: 'http://content-management-api.test/api/category/move',
        per_page: 50,
        to: 1,
        total: 1
      }
    }
  }
}
