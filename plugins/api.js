import { camelCase } from 'lodash'

class APIManager {
  constructor(axios) {
    this.axios = axios
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
      [key]: (id, config = {}) => this.axios.get(`${path}/${id}`, config)
    }
  }

  update(path) {
    const key = camelCase(`update-${path}`)
    return {
      [key]: (id, data, config = {}) => this.axios.put(`${path}/${id}`, data, config)
    }
  }

  delete(path) {
    const key = camelCase(`delete-${path}`)
    return {
      [key]: (id, data, config = {}) => this.axios.delete(`${path}/${id}`, data, config)
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

export default function({ $axios }, inject) {
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
