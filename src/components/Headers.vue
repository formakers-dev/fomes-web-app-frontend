<template>
    <b-navbar>
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img src="../assets/logo.png" alt="Logo"/>
            </b-navbar-item>
        </template>
        <template slot="end" v-if="isLoggedIn">
            <b-navbar-item tag="router-link" to="/">
                Home
            </b-navbar-item>
            <b-navbar-item tag="router-link" to="/beta-tests">
                BetaTests
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
