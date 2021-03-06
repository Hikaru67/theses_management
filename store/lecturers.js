import { get, cloneDeep } from 'lodash'
import { SET_MODEL, SET_LIST } from '~/constants/mutation-types'

export class Lecturers {
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
  model: new Lecturers({}),
  list: []
})

export const getters = {
  model: state => state.model,
  list: state => state.list
}

export const mutations = {
  [SET_LIST]: (state, payload) => {
    state.list = payload.map(item => new Lecturers(item))
  },
  [SET_MODEL]: (state, payload) => {
    state.model = new Lecturers(payload)
  }
}

export const actions = {
  /**
   * Get list lecturers
   *
   * @param {Function} commit
   * @param {Array} payload
   * @return {Array} lecturers list
   */
  async getList({ commit }, payload) {
    const params = cloneDeep(payload.params)
    params.page = params.page || 1
    params.limit = params.limit || 10
    const { data } = await this.$api.indexLecturers({ params })
    commit(SET_LIST, data.data)
    return data
  },

  /**
   * Get lecturers detail
   *
   * @param {Function} commit
   * @param {Object} payload
   * @return {Object} lecturers detail
   */
  async getModel({ commit }, { id }) {
    let model = {}
    if (id) {
      const { data } = await this.$api.showLecturers({ id })
      model = data.data
    }
    commit(SET_MODEL, model)
    return model
  },

  /**
     * Create/Update lecturers
     *
     * @param {Function} commit
     * @param {Object} payload
     * @return {Object} lecturers detail
     */
  async saveModel({ commit }, payload) {
    const form = this.$util.getFormData(payload, ['id', 'name', 'address', 'phone', 'specialized'])

    const { data } = payload.id ? await this.$api.updateLecturers(form) : await this.$api.storeLecturers(form)
    const model = data.data
    commit(SET_MODEL, model)
    return model
  }
}
