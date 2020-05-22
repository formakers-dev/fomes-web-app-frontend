import Vue from "vue";
import moment from "moment";
import "moment/locale/ko";
import VueMoment from "vue-moment";
import Buefy from "buefy";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import GAuth from "vue-google-oauth2";
import config from "../config";

Vue.use(GAuth, {
  clientId: config.googleClientId,
  scope: 'profile email',
  prompt: 'select_account'
});

Vue.use(Buefy);
Vue.use(VueMoment, { moment });
console.log(Vue.moment().locale());

Vue.config.productionTip = false;

new Vue({
  router,
  data() {
    return {
      isLoggedIn: false,
    };
  },
  store,
  render: h => h(App),
  methods: {
    setLoggedIn(user) {
      console.log("isLoggedIn" + user.data.email);
      this.isLoggedIn = true;
    }
  }
}).$mount("#app");
