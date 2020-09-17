class Menu {
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
    state.list = payload.map(item => new Menu(item))
  },
  SET_MODEL: (state, payload) => {
    state.model = new Menu(payload)
  }
}

export const actions = {
  async getList({ commit }, payload) {
    const { data } = await this.$api.indexMenu(payload)
    commit('SET_LIST', data.data)
    return data
  },
  async getModel({ commit }, { id }) {
    let model = {
      roleIds: []
    }
    if (id) {
      const { data } = await this.$api.showMenu({ id })
      model = data.data
      model.roleIds = model.roles.map(item => item.id)
    }
    commit('SET_MODEL', model)
    return model
  },
  async saveModel({ commit }, payload) {
    const form = {
      id: payload.id,
      title: payload.title,
      icon: payload.icon,
      link: payload.link,
      roles: payload.roleIds
    }
    if (payload.password) {
      form.password = payload.password
    }
    const { data } = payload.id ? await this.$api.updateMenu(form) : await this.$api.storeMenu(form)
    const model = data.data
    commit('SET_MODEL', model)
    return model
  }
}
