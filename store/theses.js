import { get, cloneDeep } from 'lodash'
import { SET_MODEL, SET_LIST } from '~/constants/mutation-types'

export class Theses {
  constructor(props) {
    this.id = get(props, 'id', '')
    this.name = get(props, 'name', '')
    this.description = get(props, 'description', '')
    this.attaches = get(props, 'attaches', '')
    this.student_id = get(props, 'student_id', '')
    this.lecturer_id = get(props, 'lecturer_id', '')
    this.student = get(props, 'student', {})
    this.lecturer = get(props, 'lecturer', {})
    this.created_at = get(props, 'created_at', '')
  }
}

export const state = () => ({
  model: new Theses({}),
  list: []
})

export const getters = {
  model: state => state.model,
  list: state => state.list
}

export const mutations = {
  [SET_LIST]: (state, payload) => {
    state.list = payload.map(item => new Theses(item))
  },
  [SET_MODEL]: (state, payload) => {
    state.model = new Theses(payload)
  }
}

export const actions = {
  /**
   * Get list theses
   *
   * @param {Function} commit
   * @param {Array} payload
   * @return {Array} theses list
   */
  async getList({ commit }, payload) {
    const params = cloneDeep(payload.params)
    params.page = params.page || 1
    params.limit = params.limit || 10
    const { data } = await this.$api.indexTheses({ params })
    commit(SET_LIST, data.data)
    return data
  },

  /**
   * Get theses detail
   *
   * @param {Function} commit
   * @param {Object} payload
   * @return {Object} theses detail
   */
  async getModel({ commit }, { id }) {
    let model = {}
    if (id) {
      const { data } = await this.$api.showTheses({ id })
      model = data.data
    }
    commit(SET_MODEL, model)
    return model
  },

  /**
     * Create/Update theses
     *
     * @param {Function} commit
     * @param {Object} payload
     * @return {Object} theses detail
     */
  async saveModel({ commit }, payload) {
    const form = this.$util.getFormData(payload, ['id', 'name', 'description', 'attaches', 'student_id', 'lecturer_id'])

    const { data } = payload.id ? await this.$api.updateTheses(form) : await this.$api.storeTheses(form)
    const model = data.data
    commit(SET_MODEL, model)
    return model
  }
}
