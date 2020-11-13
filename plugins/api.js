/*
 * Copyright 2020 Digi Dinos JSC. All rights reserved.
 * Email: tech@digidinos.com.
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
            const { data } = await $axios.post('/refresh', { refresh_token: refreshToken })
            $cookies.set(REFRESH_TOKEN, data.refresh_token, { maxAge: REFRESH_TOKEN_MAX_AGE })
            if (app.$auth) {
              app.$auth.setUserToken(data.access_token)
            }
            const originalRequest = error.config
            originalRequest.headers.Authorization = 'Bearer ' + data.access_token
            return $axios(originalRequest)
          } catch (e) {
            $cookies.remove(REFRESH_TOKEN)
            return Promise.reject(e)
          }
        }
        return Promise.reject(error)
      })

      this.axios = $axios

      let data = {}
      Object.entries(routes).forEach(([path, methods]) => {
        Object.entries(methods).forEach(([method, options]) => {
          data = { ...data, ...this.buildMethod(method, path, options) }
        })
      })

      Object.entries(data).forEach(([key, method]) => {
        this[key] = method
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
      let entry = {}
      switch (method) {
        case 'get':
          entry[key] = (config = {}) => this.axios.get(path, config)
          break
        case 'post':
          entry[key] = (data, config = {}) => this.axios.post(path, data, config)
          break
        case 'put':
          entry[key] = (data, config = {}) => this.axios.put(path, data, config)
          break
        case 'delete':
          entry[key] = (config = {}) => this.axios.delete(path, config)
          break
        case 'index':
          entry[key] = (config = {}) => this.axios.get(path, config)
          break
        case 'store':
          entry[key] = (data, config = {}) => this.axios.post(path, data, config)
          break
        case 'show':
          entry[key] = (data, config = {}) => this.axios.get(`${path}/${data.id}`, config)
          break
        case 'update':
          entry[key] = (data, config = {}) => this.axios.put(`${path}/${data.id}`, data, config)
          break
        case 'destroy':
          entry[key] = (data, config = {}) => this.axios.delete(`${path}/${data.id}`, data, config)
          break
        case 'resource':
          entry = {
            ...this.buildMethod('index', path, options),
            ...this.buildMethod('store', path, options),
            ...this.buildMethod('show', path, options),
            ...this.buildMethod('update', path, options),
            ...this.buildMethod('destroy', path, options)
          }
          break
        default:
          break
      }
      return entry
    }
  }

  inject('api', new API())
}
