export const state = () => ({
  loading: false
})

export const getters = {
  loading: state => {
    return state.loading
  }
}

export const mutations = {
  SET_LOADING: (state, payload) => {
    state.loading = payload
  }
}

export const actions = {
  setLoading({ commit }, payload) {
    commit('SET_LOADING', payload)
  }
}
