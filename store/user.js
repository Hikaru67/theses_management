class User {
  constructor(props) {
    Object.entries(props).forEach(([key, value]) => {
      this[key] = value
    })
  }
}

export const state = () => ({
  model: {},
  list: []
})

export const getters = {
  model: state => {
    return state.model
  },
  list: state => {
    return state.list
  }
}

export const mutations = {
  SET_LIST: (state, payload) => {
    state.list = payload.map(item => new User(item))
  },
  SET_MODEL: (state, payload) => {
    state.model = new User(payload)
  }
}

export const actions = {
  async getList({ commit }, payload) {
    const { data } = await this.$api.indexUser(payload)
    commit('SET_LIST', data.data)
    return data
  },
  async getModel({ commit }, { id }) {
    let model = {
      roleIds: []
    }
    if (id) {
      const { data } = await this.$api.showUser({ id })
      model = data.data
      model.roleIds = model.roles.map(item => item.id)
    }
    commit('SET_MODEL', model)
    return model
  },
  async saveModel({ commit }, payload) {
    const form = {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      roles: payload.roleIds
    }
    if (payload.password) {
      form.password = payload.password
    }
    const { data } = payload.id ? await this.$api.updateUser(form) : await this.$api.storeUser(form)
    const model = data.data
    commit('SET_MODEL', model)
    return model
  }
}