/**
 * Copyright 2020 Digi Dinos JSC. All rights reserved.
 * Email: tech@digidinos.com.
 */

export default {
  getArticleCategoryList: () => {
    return {
      data: [
        {
          created_at: 1591064201,
          description: 'description',
          id: 1,
          name: '平和・安全',
          parent: null,
          parent_id: 0,
          position: 0,
          updated_at: 1591064201
        },
        {
          created_at: 1591064201,
          description: 'description',
          id: 2,
          name: '経済・民間連携',
          parent: null,
          parent_id: 0,
          position: 1,
          updated_at: 1591064201
        },
        {
          created_at: 1591064201,
          description: 'description',
          id: 3,
          name: '農業・漁業',
          parent: null,
          parent_id: 0,
          position: 2,
          updated_at: 1591064201
        },
        {
          created_at: 1591064201,
          description: 'description',
          id: 4,
          name: '保健医療',
          parent: null,
          parent_id: 0,
          position: 3,
          updated_at: 1591064201
        },
        {
          created_at: 1591064201,
          description: 'description',
          id: 5,
          name: '交通・インフラ',
          parent: null,
          parent_id: 0,
          position: 4,
          updated_at: 1591064201
        },
        {
          created_at: 1591064201,
          description: 'description',
          id: 6,
          name: '環境',
          parent: null,
          parent_id: 0,
          position: 5,
          updated_at: 1591064201
        },
        {
          created_at: 1591064201,
          description: 'description',
          id: 7,
          name: 'ジェンダー・人権',
          parent: null,
          parent_id: 0,
          position: 6,
          updated_at: 1591064201
        },
        {
          created_at: 1591064201,
          description: 'description',
          id: 8,
          name: 'SDGs',
          parent: null,
          parent_id: 0,
          position: 7,
          updated_at: 1591064201
        },
        {
          created_at: 1591064201,
          description: 'description',
          id: 9,
          name: 'IT',
          parent: null,
          parent_id: 0,
          position: 8,
          updated_at: 1591064201
        },
        {
          created_at: 1591064201,
          description: 'description',
          id: 10,
          name: '教育',
          parent: null,
          parent_id: 0,
          position: 9,
          updated_at: 1591064201
        },
        {
          created_at: 1591064201,
          description: 'description',
          id: 11,
          name: '貧困・開発',
          parent: null,
          parent_id: 0,
          position: 10,
          updated_at: 1591064201
        },
        {
          created_at: 1591064201,
          description: 'description',
          id: 12,
          name: 'ガバナンス',
          parent: null,
          parent_id: 0,
          position: 11,
          updated_at: 1591064201
        },
        {
          created_at: 1591064201,
          description: 'description',
          id: 13,
          name: 'INTERNATIONAL',
          parent: null,
          parent_id: 0,
          position: 12,
          updated_at: 1591064201
        },
        {
          created_at: 1591064201,
          description: 'description',
          id: 14,
          name: 'コラム',
          parent: null,
          parent_id: 0,
          position: 13,
          updated_at: 1591064201
        },
        {
          created_at: 1591064201,
          description: 'description',
          id: 15,
          name: 'オリジナル',
          parent: null,
          parent_id: 0,
          position: 14,
          updated_at: 1591064201
        }
      ],
      links: {
        first: 'http://content-management-api.test/api/admin/article-category?page=1',
        last: 'http://content-management-api.test/api/admin/article-category?page=1',
        prev: null,
        next: null
      },
      meta: {
        current_page: 1,
        from: 1,
        last_page: 1,
        path: 'http://content-management-api.test/api/admin/article-category',
        per_page: 1000,
        to: 15,
        total: 15
      }
    }
  },

  createArticleCategory: () => {
    return {
      data: {
        created_at: 1591064201,
        description: 'description',
        id: 1,
        name: '平和・安全',
        parent: null,
        parent_id: 0,
        position: 0,
        updated_at: 1591064201
      }
    }
  },

  getArticleCategory: () => {
    return {
      data: {
        created_at: 1591064201,
        description: 'description',
        id: 1,
        name: '平和・安全',
        parent: null,
        parent_id: 0,
        position: 0,
        updated_at: 1591064201
      }
    }
  },

  updateArticleCategory: () => {
    return {
      data: {
        created_at: 1591064201,
        description: 'description',
        id: 1,
        name: '平和・安全',
        parent: null,
        parent_id: 0,
        position: 0,
        updated_at: 1591064201
      }
    }
  },

  deleteArticleCategory: () => {
    return {}
  },

  moveArticleCategory: () => {
    return {}
  }
}
