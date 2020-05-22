import Vue from "vue";
import Vuex from "vuex";
import request from "../common/utils/http";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginStatus: null
  },
  mutations: {
    authRequest(state) {
      state.loginStatus = "request";
    },
    authSuccess(state) {
      state.loginStatus = "success";
    },
    authError(state) {
      state.loginStatus = "error";
    }
  },
  actions: {
    login({commit}, idToken){
      return new Promise((resolve, reject) => {
        commit("authRequest");

        const headers = {
          "Content-Type": "application/json",
          "x-id-token": idToken
        };

        request.post('/user/signIn', {}, {headers : headers})
            .then(user => {
              commit('authSuccess');
              resolve(user);
            })
            .catch(err => {
              console.error(err);
              commit('authError');
              reject(err);
            });
      });
    }
  },
  getters: {
    isLoggedIn: state => state.loginStatus === "success"
  },
  modules: {}
});
