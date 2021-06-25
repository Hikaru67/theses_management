import { get, cloneDeep } from 'lodash'
import { SET_MODEL, SET_LIST } from '~/constants/mutation-types'

class News {
  constructor(props) {
    this.title = get(props, 'news_title', '')
    this.content = get(props, 'news_content', '')
    this.city = get(props, 'news_city', null)
  }
}

export const state = () => ({
  model: new News({}),
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
    const params = cloneDeep(payload.params)
    params.page = params.page || 1
    params.pageSize = params.limit || 10
    const { data } = await this.$api.indexNews({ params })
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
      const { data } = await this.$api.showNews({ id })
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
    const form = this.$util.getFormData(payload, ['id', 'title', 'content', 'city'])

    const { data } = payload.id ? await this.$api.updateNews(form) : await this.$api.storeNews(form)
    const model = data.data
    commit(SET_MODEL, model)
    return model
  }
}
