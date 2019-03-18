import Vue from 'vue'
import Vuex from 'vuex'
// import api from '../../api'

Vue.use(Vuex)

const state = {
  profile: null,
  token: null
}
const actions = {
}
const mutations = {
  SET_USER (state, user) {
    state.profile = user.profile
    state.token = user.access_token
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
