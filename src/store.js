import { createStore } from 'vuex';

const store = createStore({
  state: {
    loggedIn: false,
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.loggedIn = value;
    },
  },
  actions: {
    setLoggedIn({ commit }, value) {
      commit('SET_LOGGED_IN', value);
      // Сохраняем состояние входа в локальное хранилище
      localStorage.setItem('loggedIn', value.toString());
    },
    checkLoggedIn({ commit }) {
      // Проверяем состояние входа при загрузке приложения
      const loggedIn = localStorage.getItem('loggedIn');
      commit('SET_LOGGED_IN', loggedIn === 'true');
    },
  },
});

export default store;
