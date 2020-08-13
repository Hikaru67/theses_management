/*
 * Copyright 2020 Digi Dinos JSC. All rights reserved.
 * Email: tech@digidinos.com.
 */

/**
 * List of number record in one page
 */
export const PAGE_SIZES = [10, 20, 50, 100, 200]

/**
 * Number record in one page
 */
export const PAGE_SIZE = 10

/**
 * Max number record return by api
 */
export const MAX_LIMIT_RECORD = 1000

/**
 * Minisecond
 */
export const MINISECOND = 1000

/**
 * Sort type
 */
export const SORT_TYPE = {
  DESC: 0,
  ASC: 1
}

/**
 * User status list
 */
export const USER_STATUS_LIST = [
  {
    id: 0,
    name: 'user.statuses.inactive'
  },
  {
    id: 1,
    name: 'user.statuses.active'
  }
]

/**
 * Breadcrumb list
 */
export const BREAD_CRUMB_LIST = [
  {
    id: 1,
    name: 'breadcrumb.users',
    value: 'users'
  },
  {
    id: 2,
    name: 'breadcrumb.users-new',
    value: 'users-new'
  },
  {
    id: 3,
    name: 'breadcrumb.roles',
    value: 'roles'
  },
  {
    id: 4,
    name: 'breadcrumb.roles-new',
    value: 'roles-new'
  },
  {
    id: 5,
    name: 'breadcrumb.article',
    value: 'article'
  },
  {
    id: 6,
    name: 'breadcrumb.article-new',
    value: 'article-new'
  },
  {
    id: 7,
    name: 'breadcrumb.article_category',
    value: 'article-category'
  },
  {
    id: 8,
    name: 'breadcrumb.categories',
    value: 'categories'
  },
  {
    id: 9,
    name: 'breadcrumb.site',
    value: 'sites'
  }
]

/**
 * AI Article Type
 */
export const ARTICLE_TYPE = [
  {
    id: 0,
    name: 'article.type_.1'
  },
  {
    id: 1,
    name: 'article.type_.2'
  }
]

/**
* Article Status
*/
export const ARTICLE_STATUS = [
  {
    id: 1,
    name: 'article.status_.hidden'
  },
  {
    id: 2,
    name: 'article.status_.watting_classification'
  },
  {
    id: 3,
    name: 'article.status_.public'
  }
]

export const ARTICLE_STATUS_HIDDEN = 1
export const ARTICLE_STATUS_WAITTING = 2
export const ARTICLE_STATUS_PUBLIC = 3

/**
 * Original category id
 */
export const ORIGINAL_CATEGORY_ID = 15

/**
 * Status sites list
 */
export const SITE_LIST_STATUS = [
  {
    id: 0,
    name: 'site.noneActive'
  },
  {
    id: 1,
    name: 'site.active'
  }
]
