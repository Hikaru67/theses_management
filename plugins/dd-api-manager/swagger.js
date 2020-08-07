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
        operationId: 'getUserList',
        useMock: 'user'
      },
      post: {
        operationId: 'createUser',
        useMock: 'user'
      }
    },
    '/user/{id}': {
      get: {
        operationId: 'getUser',
        useMock: 'user'
      },
      put: {
        operationId: 'updateUser',
        useMock: 'user'
      },
      delete: {
        operationId: 'deleteUser',
        useMock: 'user'
      }
    },

    // Menu API
    '/menu': {
      get: {
        operationId: 'getMenuList',
        useMock: 'menu'
      },
      post: {
        operationId: 'createMenu',
        useMock: 'menu'
      }
    },
    '/menu/{id}': {
      get: {
        operationId: 'getMenu',
        useMock: 'menu'
      },
      put: {
        operationId: 'updateMenu',
        useMock: 'menu'
      },
      delete: {
        operationId: 'deleteMenu',
        useMock: 'menu'
      }
    },

    // Role API
    '/role': {
      post: {
        operationId: 'createRole',
        useMock: 'role'
      },
      get: {
        operationId: 'getRoleList',
        useMock: 'role'
      }
    },
    '/role/{id}': {
      get: {
        operationId: 'getRole',
        useMock: 'role'
      },
      put: {
        operationId: 'updateRole',
        useMock: 'role'
      },
      delete: {
        operationId: 'deleteRole',
        useMock: 'role'
      }
    },

    // Permission API
    '/permission': {
      get: {
        operationId: 'getPermission',
        useMock: 'permission'
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
        operationId: 'getUserInfo',
        useMock: 'me'
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
        operationId: 'getDashboardInfo',
        useMock: 'dashboard'
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
        operationId: 'getArticleList',
        useMock: 'article'
      },
      post: {
        operationId: 'createArticle',
        consumes: ['application/json', 'multipart/form-data'],
        produces: ['application/json'],
        useMock: 'article'
      }
    },
    '/admin/article/{id}': {
      get: {
        operationId: 'getArticle',
        useMock: 'article'
      },
      put: {
        operationId: 'updateArticle',
        consumes: ['application/json', 'multipart/form-data'],
        produces: ['application/json'],
        useMock: 'article'
      },
      delete: {
        operationId: 'deleteArticle',
        useMock: 'article'
      }
    },

    // Article category API
    '/admin/article-category': {
      get: {
        operationId: 'getArticleCategoryList',
        useMock: 'article-category'
      },
      post: {
        operationId: 'createArticleCategory',
        useMock: 'article-category'
      }
    },
    '/admin/article-category/{id}': {
      get: {
        operationId: 'getArticleCategory',
        useMock: 'article-category'
      },
      put: {
        operationId: 'updateArticleCategory',
        useMock: 'article-category'
      },
      delete: {
        operationId: 'deleteArticleCategory',
        useMock: 'article-category'
      }
    },
    '/admin/article-category/move': {
      post: {
        operationId: 'moveArticleCategory',
        useMock: 'article-category'
      }
    },

    // Category API
    '/category': {
      get: {
        operationId: 'getCategoryList',
        useMock: 'category'
      },
      post: {
        operationId: 'createCategory',
        useMock: 'category'
      }
    },
    '/category/{id}': {
      get: {
        operationId: 'getCategory',
        useMock: 'category'
      },
      put: {
        operationId: 'updateCategory',
        useMock: 'category'
      },
      delete: {
        operationId: 'deleteCategory',
        useMock: 'category'
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
        operationId: 'getSiteList',
        useMock: 'site'
      },
      post: {
        operationId: 'createSite',
        consumes: ['application/json', 'multipart/form-data'],
        useMock: 'site'
      }
    },
    '/admin/site/{id}': {
      get: {
        operationId: 'getSite',
        useMock: 'site'
      },
      put: {
        operationId: 'updateSite',
        consumes: ['application/json', 'multipart/form-data'],
        useMock: 'site'
      },
      delete: {
        operationId: 'deleteSite',
        useMock: 'site'
      }
    }
  }
}
