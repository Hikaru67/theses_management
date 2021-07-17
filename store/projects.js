import { get, cloneDeep } from 'lodash'
import { SET_MODEL, SET_LIST } from '~/constants/mutation-types'

export class Projects {
  constructor(props) {
    this.id = get(props, 'id', '')
    this.info_gv = get(props, 'info_gv', [])
    this.IDGV = get(props, 'IDGV', '')
    this.TenDA = get(props, 'ten_da', '')
    this.MoTa = get(props, 'mo_ta', '')
    this.files = get(props, 'dinh_kem', '')
    this.CreateDate = get(props, 'ceate_date', '')
  }
}

export const state = () => ({
  model: new Projects({}),
  list: []
})

export const getters = {
  model: state => state.model,
  list: state => state.list
}

export const mutations = {
  [SET_LIST]: (state, payload) => {
    state.list = payload.map(item => new Projects(item))
  },
  [SET_MODEL]: (state, payload) => {
    state.model = new Projects(payload)
  }
}

export const actions = {
  /**
   * Get list projects
   *
   * @param {Function} commit
   * @param {Array} payload
   * @return {Array} projects list
   */
  async getList({ commit }, payload) {
    const params = cloneDeep(payload.params)
    params.page = params.page || 1
    params.limit = params.limit || 20
    const { data } = await this.$api.indexProjects({ params })
    // console.log('data :>> ', data.data.items)
    commit(SET_LIST, data.data.items)
    return data
  },

  /**
   * Get projects detail
   *
   * @param {Function} commit
   * @param {Object} payload
   * @return {Object} projects detail
   */
  async getModel({ commit }, { id }) {
    let model = {}
    if (id) {
      const { data } = await this.$api.showProjects({ id })
      model = data.data[0]
    }
    commit(SET_MODEL, model)
    return model
  },

  /**
     * Create/Update projects
     *
     * @param {Function} commit
     * @param {Object} payload
     * @return {Object} projects detail
     */
  async saveModel({ commit }, payload) {
    const form = this.$util.getFormData(payload, ['id', 'title', 'content'])
    form.city = payload.city_id ? payload.city_id : null

    const { data } = payload.id ? await this.$api.updateProjects(form) : await this.$api.storeProjects(form)
    const model = data.data
    commit(SET_MODEL, model)
    return model
  }
}
