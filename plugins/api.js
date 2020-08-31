/*
 * Copyright 2020 Digi Dinos JSC. All rights reserved.
 * Email: tech@digidinos.com.
 */

import { camelCase } from 'lodash'

export default ({ $axios }, inject) => {
  class APIManager {
    constructor(axios) {
      this.axios = axios
    }

    get(path, options = {}) {
      const key = options.name || camelCase(`get-${path}`)
      return {
        [key]: (config = {}) => this.axios.get(path, config)
      }
    }

    post(path, options = {}) {
      const key = options.name || camelCase(`post-${path}`)
      return {
        [key]: (data, config = {}) => this.axios.post(path, data, config)
      }
    }

    resource(model, options = {}) {
      return {
        ...this.index(model, options),
        ...this.store(model, options),
        ...this.show(model, options),
        ...this.update(model, options),
        ...this.delete(model, options)
      }
    }

    index(path, options = {}) {
      const key = options.name || camelCase(`index-${path}`)
      return {
        [key]: (config = {}) => this.axios.get(path, config)
      }
    }

    store(path, options = {}) {
      const key = options.name || camelCase(`store-${path}`)
      return {
        [key]: (data, config = {}) => this.axios.post(path, data, config)
      }
    }

    show(path, options = {}) {
      const key = options.name || camelCase(`show-${path}`)
      return {
        [key]: (data, config = {}) => this.axios.get(`${path}/${data.id}`, config)
      }
    }

    update(path, options = {}) {
      const key = options.name || camelCase(`update-${path}`)
      return {
        [key]: (data, config = {}) => this.axios.put(`${path}/${data.id}`, data, config)
      }
    }

    delete(path, options = {}) {
      const key = options.name || camelCase(`delete-${path}`)
      return {
        [key]: (data, config = {}) => this.axios.delete(`${path}/${data.id}`, data, config)
      }
    }

    generateMethods(routes = {}) {
      let data = {}
      Object.entries(routes).forEach(([path, methods]) => {
        Object.entries(methods).forEach(([method, options]) => {
          data = { ...data, ...this[method](path, options) }
        })
      })
      return data
    }
  }

  const axios = $axios.create({
    headers: {
      common: {
        Accept: 'application/json'
      }
    }
  })

  axios.setBaseURL(process.env.API_BASE_URL)

  const apiManager = new APIManager(axios)

  const routes = {
    me: {
      post: {
        name: 'updateProfile'
      }
    },
    user: {
      resource: {}
    },
    role: {
      resource: {}
    },
    permission: {
      get: {}
    },
    menu: {
      resource: {}
    },
    'menu/move': {
      post: {
        name: 'moveMenu'
      }
    }
  }

  const api = apiManager.generateMethods(routes)

  inject('api', api)
}
