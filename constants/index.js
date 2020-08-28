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
    name: 'breadcrumb.user',
    value: 'user'
  },
  {
    id: 2,
    name: 'breadcrumb.user-new',
    value: 'user-new'
  },
  {
    id: 3,
    name: 'breadcrumb.role',
    value: 'role'
  },
  {
    id: 4,
    name: 'breadcrumb.role-new',
    value: 'role-new'
  },
  {
    id: 5,
    name: 'breadcrumb.menu',
    value: 'menu'
  },
  {
    id: 6,
    name: 'breadcrumb.menu-new',
    value: 'menu-new'
  }
]
