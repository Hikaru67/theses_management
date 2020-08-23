class Role {
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
    state.list = payload.map(item => new Role(item))
  },
  SET_MODEL: (state, payload) => {
    state.model = new Role(payload)
  }
}

export const actions = {
  async getList({ commit }, payload) {
    const { data } = await this.$api.indexRole(payload)
    commit('SET_LIST', data.data)
    return data
  },
  async getModel({ commit }, { id }) {
    let model = {
      permissionIds: []
    }
    if (id) {
      const { data } = await this.$api.showRole({ id })
      model = data.data
      model.permissionIds = model.permissions.map(item => item.id)
    }
    commit('SET_MODEL', model)
    return model
  },
  async saveModel({ commit }, payload) {
    const form = {
      id: payload.id,
      name: payload.name,
      permissions: payload.permissionIds
    }
    const { data } = payload.id ? await this.$api.updateRole(form) : await this.$api.storeRole(form)
    const model = data.data
    commit('SET_MODEL', model)
    return model
  }
}
