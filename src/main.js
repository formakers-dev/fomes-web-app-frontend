import Vue from "vue";
import VueGtag from "vue-gtag";
import moment from "moment";
import "moment/locale/ko";
import VueMoment from "vue-moment";
import Buefy from "buefy";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import GAuth from "vue-google-oauth2";
import config from "../config";
import 'mdi/css/materialdesignicons.min.css';

Vue.use(VueGtag, {
  config: {
    id: "UA-106038737-3"
  }
});

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
  store,
  render: h => h(App)
}).$mount("#app");
