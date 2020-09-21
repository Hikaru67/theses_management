import { SET_MODEL, SET_LIST } from '~/constants/mutation-types'
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
  model: state => state.model,
  list: state => state.list
}

export const mutations = {
  [SET_LIST]: (state, payload) => {
    state.list = payload.map(item => new Role(item))
  },
  [SET_MODEL]: (state, payload) => {
    state.model = new Role(payload)
  }
}

export const actions = {
  /**
   * Get list role
   *
   * @param {Function} commit
   * @param {Array} payload
   * @return {Array} role list
   */
  async getList({ commit }, payload) {
    payload.params.except_role = 1
    const { data } = await this.$api.indexRole(payload)
    commit(SET_LIST, data.data)
    return data
  },

  /**
   * Get role detail
   *
   * @param {Function} commit
   * @param {Object} payload
   * @return {Object} role detail
   */
  async getModel({ commit }, { id }) {
    let model = {
      permissionIds: []
    }
    if (id) {
      const { data } = await this.$api.showRole({ id })
      model = data.data
      model.permissionIds = model.permissions.map(item => item.id)
    }
    commit(SET_MODEL, model)
    return model
  },

  /**
   * Create/Update role
   *
   * @param {Function} commit
   * @param {Object} payload
   * @return {Object} role detail
   */
  async saveModel({ commit }, payload) {
    const form = {
      id: payload.id,
      name: payload.name,
      permissions: payload.permissionIds
    }
    const { data } = payload.id ? await this.$api.updateRole(form) : await this.$api.storeRole(form)
    const model = data.data
    commit(SET_MODEL, model)
    return model
  }
}
