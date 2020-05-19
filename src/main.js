import Vue from "vue";
import VueMoment from "vue-moment";
import Buefy from "buefy";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.use(Buefy);
Vue.use(VueMoment);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
