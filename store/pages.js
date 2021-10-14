const state = {
  pageTitle: 'Default'
}

const mutations = {
  setPageTitle(state, pageTitle) {
    state.pageTitle = pageTitle
  }
}

const getters = {
  getPageTitle: (state) => state.pageTitle
}

export default {
  state,
  mutations,
  getters
}
