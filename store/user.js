const state = {
  email: ''
}

const mutations = {
  setEmail(state, email) {
    state.email = email
  }
}

const getters = {
  getEmail: (state) => state.email
}

export default {
  state,
  mutations,
  getters
}
