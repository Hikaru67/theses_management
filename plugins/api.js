/*
 * Copyright 2020 HOI CHAO HANH JSC. All rights reserved.
 * Email: tech@hoichaohanh.com.
 */

import { camelCase } from 'lodash'
import { REFRESH_TOKEN, REFRESH_TOKEN_MAX_AGE } from '~/constants/cookies'
import routes from '~/configs/routes'

export default ({ $axios, $cookies, app }, inject) => {
  class API {
    constructor() {
      $axios.onError(async error => {
        const statusCode = error.response.status

        // refresh token if expired
        const refreshToken = $cookies.get(REFRESH_TOKEN)
        if (statusCode === 401 && refreshToken) {
          try {
            const { data: { data } } = await $axios.post('/token/refresh', { refreshToken })
            $cookies.set(REFRESH_TOKEN, data.refresh_token, { maxAge: REFRESH_TOKEN_MAX_AGE, path: '/' })
            if (app.$auth) {
              app.$auth.setUserToken(data.access_token)
            }
            const originalRequest = error.config
            originalRequest.headers.Authorization = 'Bearer ' + data.access_token
            return $axios(originalRequest)
          } catch (e) {
            $cookies.remove(REFRESH_TOKEN, { path: '/' })
            return Promise.reject(e)
          }
        }
        return Promise.reject(error)
      })
      $axios.interceptors.request.use(config => {
        config.headers = {}
        return config
      })

      this.axios = $axios

      Object.entries(routes).forEach(([path, methods]) => {
        Object.entries(methods).forEach(([method, options]) => {
          this.buildMethod(method, path, options)
        })
      })
    }

    /**
     * Method builder
     *
     * @param {string} method
     * @param {string} path
     * @param {object} options
     *
     * @return {object}
     */
    buildMethod(method, path, options = {}) {
      const key = options.name || camelCase(`${method}-${path}`)
      switch (method) {
        case 'get':
          this[key] = (config = {}) => this.axios.get(path, config)
          break
        case 'post':
          this[key] = (data, config = {}) => this.axios.post(path, data, config)
          break
        case 'put':
          this[key] = (data, config = {}) => this.axios.put(path, data, config)
          break
        case 'delete':
          this[key] = (config = {}) => this.axios.delete(path, config)
          break
        case 'index':
          this[key] = (config = {}) => this.axios.get(path, config)
          break
        case 'store':
          this[key] = (data, config = {}) => this.axios.post(path, data, config)
          break
        case 'show':
          this[key] = (data, config = {}) => this.axios.get(`${path}/${data.id}`, config)
          break
        case 'update':
          this[key] = (data, config = {}) => this.axios.put(`${path}/${data.id}`, data, config)
          break
        case 'destroy':
          this[key] = (data, config = {}) => this.axios.delete(`${path}/${data.id}`, data, config)
          break
        case 'resource':
          ['index', 'store', 'show', 'update', 'destroy'].forEach(action => this.buildMethod(action, path, options))
          break
        default:
          break
      }
    }
  }

  inject('api', new API())
}
