<template>
  <b-navbar type="is-dark">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="../assets/logo.png" alt="Logo"/>
        <b style="margin-left: .2rem; font-size: .7rem; color: lightgray">Lite</b>
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item tag="router-link" to="/beta-tests" v-if="isLoggedIn">
        나의 게임 테스트
      </b-navbar-item>
      <b-navbar-item tag="router-link" to="/logout" v-if="isLoggedIn">
        로그아웃
      </b-navbar-item>
      <b-navbar-item tag="router-link" to="/help">
        도움말
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'Headers',
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    }
  }
};
</script>
