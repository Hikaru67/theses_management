import { get, cloneDeep } from 'lodash'
import { SET_MODEL, SET_LIST } from '~/constants/mutation-types'

export class Projects {
  constructor(props) {
    this.id = get(props, 'id', '')
    this.info_gv = get(props, 'info_gv', [])
    this.IDGV = get(props, 'IDGV', '')
    this.ten_da = get(props, 'ten_da', '')
    this.mo_ta = get(props, 'mo_ta', '')
    this.dinh_kem = get(props, 'dinh_kem', '')
    this.create_date = get(props, 'ceate_date', '')
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
      data.data[0].IDGV = data.data[0].info_gv.id
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
    const bodyFormData = new FormData()
    bodyFormData.append('ID', payload.id)
    bodyFormData.append('TenDA', payload.ten_da)
    bodyFormData.append('IDGV', payload.IDGV)
    if (payload.dinh_kem) {
      bodyFormData.append('files', payload.dinh_kem)
    }
    bodyFormData.append('MoTa', payload.mo_ta)

    const res = !payload.id
      ? await this.$axios({
        method: 'post',
        url: '/projects',
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' }
      }) : await this.$axios({
        method: 'post',
        url: '/projects',
        data: bodyFormData,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
    const model = res.data
    commit(SET_MODEL, model)
    return model
  }
}
