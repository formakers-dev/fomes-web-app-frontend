import Vue from "vue";
import Vuex from "vuex";
import request from "../common/utils/http";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginStatus: "",
    email: ""
  },
  mutations: {
    authRequest(state) {
      state.loginStatus = "request";
    },
    authSuccess(state, email) {
      state.loginStatus = "success";
      state.email = email;
    },
    authError(state) {
      state.loginStatus = "error";
    },
    logout(state) {
      state.loginStatus = "";
      state.email = "";
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
              commit('authSuccess', user.data.email);
              resolve(user);
            })
            .catch(err => {
              console.error(err);
              commit('authError');
              reject(err);
            });
      });
    },
    logout({commit}){
      return new Promise((resolve, reject) => {
        request.post("/logout")
            .then(() => {
              commit('logout');
              resolve();
            })
            .catch(err => {
              console.error(err);
              reject(err);
            });
      });
    }
  },
  getters: {
    isLoggedIn: state => state.loginStatus === "success",
    getEmail: state => state.email
  },
  modules: {}
});
