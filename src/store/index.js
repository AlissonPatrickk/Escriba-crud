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
      return state.addItems;
    }
  },
  mutations: {
    setAuthenticatedUser(state, payload) {
      state.user = payload;
    },
    setAddItem(state, payload) {
      state.addItems = payload;
    },
    clearSelectedItems(state) {
      state.addItems = state.addItems.filter(item => !item.selected);
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