import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
      id: 0,
      nome: "",
      cpf: "",
      dataNascimento: "",
      senha: ""
    },
    addItems: []
  },
  getters: {
    isAuthenticated(state) {
      return state.user !== null;
    },
    isAddItem(state) {
      return state.addItems !== null;
    }
  },
  mutations: {
    setAuthenticatedUser(state, payload) {
      state.user = payload;
    },
    setAddItem(state, payload) {
      state.addItems = payload;
    },
  },
  actions: {
    setAuthenticatedUser(context, payload) {
      context.commit('setAuthenticatedUser', payload);
    },
    setAddItem(context, payload) {
      context.commit('setAddItem', payload);
    },
  },
  modules: {},
})