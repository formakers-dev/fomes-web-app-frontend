import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/beta-tests",
    name: "BetaTests",
    component: () =>
        import(/* webpackChunkName: "betaTests" */ "../views/MyBetaTests.vue")
  },
  {
    path: '/logout',
    beforeEnter(to, from, next) {
      store.dispatch("logout");
      next('/');
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
