import { camelCase } from 'lodash'

export default function({ $axios }, inject) {
  class APIManager {
    constructor(axios) {
      this.axios = axios
    }

    get(path) {
      const key = camelCase(`get-${path}`)
      return {
        [key]: (config = {}) => this.axios.get(path, config)
      }
    }

    post(path) {
      const key = camelCase(`post-${path}`)
      return {
        [key]: (data, config = {}) => this.axios.post(path, data, config)
      }
    }

    resource(model) {
      return {
        ...this.index(model),
        ...this.store(model),
        ...this.show(model),
        ...this.update(model),
        ...this.delete(model)
      }
    }

    index(path) {
      const key = camelCase(`index-${path}`)
      return {
        [key]: (config = {}) => this.axios.get(path, config)
      }
    }

    store(path) {
      const key = camelCase(`store-${path}`)
      return {
        [key]: (data, config = {}) => this.axios.post(path, data, config)
      }
    }

    show(path) {
      const key = camelCase(`show-${path}`)
      return {
        [key]: (data, config = {}) => this.axios.get(`${path}/${data.id}`, config)
      }
    }

    update(path) {
      const key = camelCase(`update-${path}`)
      return {
        [key]: (data, config = {}) => this.axios.put(`${path}/${data.id}`, data, config)
      }
    }

    delete(path) {
      const key = camelCase(`delete-${path}`)
      return {
        [key]: (data, config = {}) => this.axios.delete(`${path}/${data.id}`, data, config)
      }
    }

    generateMethods(routes = {}) {
      let data = {}
      Object.entries(routes).forEach(([path, methods]) => {
        Object.entries(methods).forEach(([method, options]) => {
          data = { ...data, ...this[method](path) }
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

  axios.setBaseURL('https://jsonplaceholder.typicode.com')

  const apiManager = new APIManager(axios)

  const routes = {
    posts: {
      resource: {}
    },
    users: {
      resource: {}
    },
    albums: {
      show: {},
      index: {}
    }
  }

  const api = apiManager.generateMethods(routes)

  inject('api', api)
}
