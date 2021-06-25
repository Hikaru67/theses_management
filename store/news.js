import { SET_MODEL, SET_LIST } from '~/constants/mutation-types'

class News {
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
    state.list = payload.map(item => new News(item))
  },
  [SET_MODEL]: (state, payload) => {
    state.model = new News(payload)
  }
}

export const actions = {
  /**
   * Get list news
   *
   * @param {Function} commit
   * @param {Array} payload
   * @return {Array} news list
   */
  async getList({ commit }, payload) {
    const { data } = await this.$api.indexUser(payload)
    commit(SET_LIST, data.data)
    return data
  },

  /**
   * Get news detail
   *
   * @param {Function} commit
   * @param {Object} payload
   * @return {Object} news detail
   */
  async getModel({ commit }, { id }) {
    let model = {}
    if (id) {
      const { data } = await this.$api.showUser({ id })
      model = data.data
    }
    commit(SET_MODEL, model)
    return model
  },

  /**
   * Create/Update news
   *
   * @param {Function} commit
   * @param {Object} payload
   * @return {Object} news detail
   */
  async saveModel({ commit }, payload) {
    const form = this.$util.getFormData(payload, ['id', 'name', 'email', 'password'])

    const { data } = payload.id ? await this.$api.updateUser(form) : await this.$api.storeUser(form)
    const model = data.data
    commit(SET_MODEL, model)
    return model
  }
}
