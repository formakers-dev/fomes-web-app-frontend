import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index";

Vue.use(VueRouter);

const requireAuth = () => (from, to, next) => {
  if (store.getters.isLoggedIn) {
    next();
  } else {
    next("/");
  }
};

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
        import(/* webpackChunkName: "betaTests" */ "../views/MyBetaTests.vue"),
    beforeEnter: requireAuth()
  },
  {
    path: '/logout',
    beforeEnter(to, from, next) {
      store.dispatch("logout");
      next('/');
    }
  },
  {
    path: "/help",
    beforeEnter() {
      window.open("https://blog.naver.com/formakers/222066045589", '_blank');
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
