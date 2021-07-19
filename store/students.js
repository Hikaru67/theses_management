import { get, cloneDeep } from 'lodash'
import { SET_MODEL, SET_LIST } from '~/constants/mutation-types'

export class Students {
  constructor(props) {
    this.id = get(props, 'id', '')
    this.name = get(props, 'name', '')
    this.address = get(props, 'address', '')
    this.phone = get(props, 'phone', '')
    this.specialized = get(props, 'specialized', '')
    this.created_at = get(props, 'created_at', '')
  }
}

export const state = () => ({
  model: new Students({}),
  list: []
})

export const getters = {
  model: state => state.model,
  list: state => state.list
}

export const mutations = {
  [SET_LIST]: (state, payload) => {
    state.list = payload.map(item => new Students(item))
  },
  [SET_MODEL]: (state, payload) => {
    state.model = new Students(payload)
  }
}

export const actions = {
  /**
   * Get list students
   *
   * @param {Function} commit
   * @param {Array} payload
   * @return {Array} students list
   */
  async getList({ commit }, payload) {
    const params = cloneDeep(payload.params)
    params.page = params.page || 1
    params.limit = params.limit || 10
    const { data } = await this.$api.indexStudents({ params })
    commit(SET_LIST, data.data)
    return data
  },

  /**
   * Get students detail
   *
   * @param {Function} commit
   * @param {Object} payload
   * @return {Object} students detail
   */
  async getModel({ commit }, { id }) {
    let model = {}
    if (id) {
      const { data } = await this.$api.showStudents({ id })
      model = data.data
    }
    commit(SET_MODEL, model)
    return model
  },

  /**
     * Create/Update students
     *
     * @param {Function} commit
     * @param {Object} payload
     * @return {Object} students detail
     */
  async saveModel({ commit }, payload) {
    const form = this.$util.getFormData(payload, ['id', 'name', 'address', 'phone', 'specialized'])

    const { data } = payload.id ? await this.$api.updateStudents(form) : await this.$api.storeStudents(form)
    const model = data.data
    commit(SET_MODEL, model)
    return model
  }
}
