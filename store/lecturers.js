import { get, cloneDeep } from 'lodash'
import { SET_MODEL, SET_LIST } from '~/constants/mutation-types'

export class Lecturers {
  constructor(props) {
    this.id = get(props, 'id', '')
    this.ten_gv = get(props, 'ten_gv', [])
    this.dia_chi = get(props, 'dia_chi', '')
    this.sdt = get(props, 'sdt', '')
    this.khoa = get(props, 'khoa', '')
    this.create_date = get(props, 'ceate_date', '')
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
    params.limit = params.limit || 20
    const { data } = await this.$api.indexLecturers({ params })
    commit(SET_LIST, data.data.items)
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
      model = data.data[0]
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
    const bodyFormData = new FormData()
    bodyFormData.append('ID', payload.id)
    bodyFormData.append('TenGV', payload.ten_gv)
    bodyFormData.append('DiaChi', payload.dia_chi)
    bodyFormData.append('SDT', payload.sdt)
    bodyFormData.append('Khoa', payload.khoa)

    const res = !payload.id
      ? await this.$axios({
        method: 'post',
        url: '/lecturers',
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' }
      }) : await this.$axios({
        method: 'post',
        url: '/lecturers',
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    const model = res.data
    commit(SET_MODEL, model)
    return model
  }
}
