/*
 * Copyright 2020 Digi Dinos JSC. All rights reserved.
 * Email: tech@digidinos.com.
 */

'use strict'

import { get } from 'lodash'
import CONFIG from './config'
import ApiCall from './api-call'
import { swagger } from './swagger'
import { mockManager } from './mock-manager'

export default class DdApiManager {
  /**
   * Init
   * @param {object} config
   */
  constructor(config, context) {
    this._config = {
      baseURL: '',
      encodeCodition: false,
      timeout: 5000
    }

    this._init = false
    this.context = context
    Object.assign(this._config, config)

    this._api = new ApiCall(this._config)
    this._loadOperationApi()
  }

  async signIn(params) {
  }

  async signOut(params) {
  }

  async verifySession(params) {
  }

  /**
   * swagger
   */
  _loadOperationApi() {
    if (this._init) {
      return
    }
    this._init = true

    Object.keys(swagger.paths).forEach(name => {
      Object.keys(swagger.paths[name]).forEach(method => {
        const api = swagger.paths[name][method]

        this[api.operationId] = async(params, option = null) => {
          const options = Object.assign(
            {
              file: this._isMultipart(api.consumes),
              rawFile: this._isOctetStream(api.consumes),
              token: null,
              guestToken: null,
              guestOrder: null
            },
            option
          )
          if (this._isArrayBuffer(api.produces)) {
            options.responseType = 'arraybuffer'
          }

          let url = name
          const pathVars = url.match(/{(.+?)}/g)
          if (pathVars) {
            pathVars.forEach(pathVar => {
              const prop = pathVar.replace(/{|}/g, '')
              if (!Object.prototype.hasOwnProperty.call(params, prop)) {
                throw new Error(`Missing required parameters: '${prop}'`)
              }
              url = url.replace(pathVar, params[prop])
              if (!/(post|put)/i.test(method)) {
                delete params[prop]
              }
            })
          }

          let retry = 0
          while (true) {
            try {
              options.token = this.getAuthToken()

              // For mock data
              if (Object.hasOwnProperty.call(api, 'useMock') && api.useMock) {
                const data = await mockManager.getData(api, params, options)

                console.debug(
                  '>>> Use MOCK data for API [' +
                    url +
                    '] [' +
                    api.operationId +
                    '] '
                )
                console.debug('>>> Use MOCK module :' + api.useMock)
                console.debug('>>> Use MOCK data :', data)
                return data
              }

              return await this._api.callApi(method, url, params, options)
            } catch (error) {
              const status = get(error, 'response.status', 500)
              // TODO handle unauthorization in component
              if (status === 401) {
                this.context.app.$cookies.remove('token')
                this.context.app.router.push('/login')
              }
              if (
                method === 'GET' &&
                retry < CONFIG.DEFAULT_API_GET_RETRY_COUNT
              ) {
                retry++
                continue
              }

              throw error
            }
          }
        }
      })
    })
  }

  _isOctetStream(consumes) {
    if (!consumes) {
      return false
    }
    return consumes.some(consume => consume === 'application/octet-stream')
  }

  _isMultipart(consumes) {
    if (!consumes) {
      return false
    }
    return consumes.some(consume => consume === 'multipart/form-data')
  }

  _isArrayBuffer(produces) {
    if (!produces) {
      return false
    }
    return produces.some(produce => {
      const targets = ['text/csv', 'application/pdf']
      return targets.includes(produce)
    })
  }

  setAuthToken(session) {
    this.clearAuthToken()
    const expiryTime = new Date(new Date().getTime() + 30 * 60 * 1000)
    this.context.app.$cookies.set(CONFIG.LS_KEY_SESSION_TOKEN, session, { expires: expiryTime })
  }

  getAuthToken() {
    return this.context.app.$cookies.get(CONFIG.LS_KEY_SESSION_TOKEN)
  }

  /**
   * Delete token from cookie
   */
  clearAuthToken() {
    this.context.app.$cookies.remove(CONFIG.LS_KEY_SESSION_TOKEN)
  }
}
