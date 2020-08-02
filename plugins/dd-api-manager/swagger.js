/**
 * Copyright 2020 Digi Dinos JSC. All rights reserved.
 * Email: tech@digidinos.com.
 *
 * Rules of define operationId CRUD API
 *
 * Main: GET LIST
 * Rule: get{ModuleName}List
 * Example: 'getUserList'
 *
 * Main: POST
 * Rule: create{module_name}
 * Example: 'createUser'
 *
 * Main: GET DETAIL
 * Rule: get{module_name}
 * Example: 'getUser'
 *
 * Main: PUT
 * Rule: update{module_name}
 * Example: 'updateUser'
 *
 * Main: DELETE
 * Rule: delete{module_name}
 * Example: 'deleteUser'
 */

export const swagger = {
  paths: {
    // User User API
    '/user': {
      get: {
        operationId: 'getUserList'
        // useMock: 'user'
      },
      post: {
        operationId: 'createUser'
        // useMock: 'user'
      }
    },
    '/user/{id}': {
      get: {
        operationId: 'getUser'
        // useMock: 'user'
      },
      put: {
        operationId: 'updateUser'
        // useMock: 'user'
      },
      delete: {
        operationId: 'deleteUser'
        // useMock: 'user'
      }
    },

    // Menu API
    '/menu': {
      get: {
        operationId: 'getMenuList'
      },
      post: {
        operationId: 'createMenu'
      }
    },
    '/menu/{id}': {
      get: {
        operationId: 'getMenu'
      },
      put: {
        operationId: 'updateMenu'
      },
      delete: {
        operationId: 'deleteMenu'
      }
    },

    // Role API
    '/role': {
      post: {
        operationId: 'createRole'
      },
      get: {
        operationId: 'getRoleList'
      }
    },
    '/role/{id}': {
      get: {
        operationId: 'getRole'
      },
      put: {
        operationId: 'updateRole'
      },
      delete: {
        operationId: 'deleteRole'
      }
    },

    // Permission API
    '/permission': {
      get: {
        operationId: 'getPermission'
      }
    },

    // Login, logout API
    '/login': {
      post: {
        operationId: 'login'
      }
    },
    '/me': {
      get: {
        operationId: 'getUserInfo'
      }
    },
    '/logout': {
      post: {
        operationId: 'logout'
      }
    },

    // Dashboard API
    '/dashboard': {
      get: {
        operationId: 'getDashboardInfo'
      }
    },

    // Upload File API
    '/upload': {
      post: {
        operationId: 'uploadFile',
        consumes: ['multipart/form-data']
      }
    },

    // Article API
    '/admin/article': {
      get: {
        operationId: 'getArticleList'
      },
      post: {
        operationId: 'createArticle',
        consumes: ['application/json', 'multipart/form-data'],
        produces: ['application/json']
      }
    },
    '/admin/article/{id}': {
      get: {
        operationId: 'getArticle'
      },
      put: {
        operationId: 'updateArticle',
        consumes: ['application/json', 'multipart/form-data'],
        produces: ['application/json']
      },
      delete: {
        operationId: 'deleteArticle'
      }
    },

    // Article category API
    '/admin/article-category': {
      get: {
        operationId: 'getArticleCategoryList'
      },
      post: {
        operationId: 'createArticleCategory'
      }
    },
    '/admin/article-category/{id}': {
      get: {
        operationId: 'getArticleCategory'
      },
      put: {
        operationId: 'updateArticleCategory'
      },
      delete: {
        operationId: 'deleteArticleCategory'
      }
    },
    '/admin/article-category/move': {
      post: {
        operationId: 'moveArticleCategory'
      }
    },

    // Category API
    '/category': {
      get: {
        operationId: 'getCategoryList'
      },
      post: {
        operationId: 'createCategory'
      }
    },
    '/category/{id}': {
      get: {
        operationId: 'getCategory'
      },
      put: {
        operationId: 'updateCategory'
      },
      delete: {
        operationId: 'deleteCategory'
      }
    },
    '/category/move': {
      post: {
        operationId: 'moveCategory'
      }
    },

    //  Site API
    '/admin/site': {
      get: {
        operationId: 'getSiteList'
      },
      post: {
        operationId: 'createSite',
        consumes: ['application/json', 'multipart/form-data']
      }
    },
    '/admin/site/{id}': {
      get: {
        operationId: 'getSite'
      },
      put: {
        operationId: 'updateSite',
        consumes: ['application/json', 'multipart/form-data']
      },
      delete: {
        operationId: 'deleteSite'
      }
    }
  }
}
