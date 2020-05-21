<template>
  <div class="home">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-one-third has-text-centered">
              <figure class="image">
                <img src="../assets/emphasis.png"/>
              </figure>
            </div>
          </div>
          <div class="columns is-centered">
            <div class="column is-one-third has-text-centered">
              <img src="../assets/logo.png"/>
            </div>
          </div>
          <div class="columns is-centered">
            <div class="column has-text-centered">
              <h1 class="title">신작게임 놀이터, 포메스!!</h1>
              <a href="#" @click="handleClickSignIn">
                <img src="../assets/btn_google_signin_light_normal_web.png" alt="Login"/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  name: "Home",
  methods: {
    handleClickSignIn() {
      this.$gAuth.signIn()
            .then(user => {
              const idToken = user.getAuthResponse().id_token;
              console.log('googleSignIn user', idToken);
            })
            .catch(error  => {
              console.error(error);
            });
  },
}

};
</script>

<style scoped>

</style>
