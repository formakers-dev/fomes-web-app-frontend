<template>
    <b-navbar type="is-dark">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img src="../assets/logo.png" alt="Logo"/>
            </b-navbar-item>
        </template>
        <template slot="end" v-if="isLoggedIn">
            <b-navbar-item tag="router-link" to="/beta-tests">
                나의 게임 테스트
            </b-navbar-item>
            <b-navbar-item tag="router-link" to="/logout">
                로그아웃
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
export default {
    name: 'Headers',
    computed : {
        isLoggedIn: function() {
            return this.$store.getters.isLoggedIn;
        }
    }
};
</script>
