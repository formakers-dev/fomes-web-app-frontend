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
              <a href="#" @click="handleClickSignIn" v-if="!this.$store.getters.isLoggedIn">
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
  data() {
    return {
      fomesDownloadUrl: "https://play.google.com/store/apps/details?id=com.formakers.fomes"
    };
  },
  methods: {
    handleClickSignIn() {
      this.$gAuth.signIn()
            .then(googleUser => {
              const idToken = googleUser.getAuthResponse().id_token;

              return this.$store.dispatch('login', idToken);
            })
            .then(() => {
              console.log("Successfully sign in");
            })
            .catch(error  => {
              console.error(error);
              if (error.response.status === 403) {
                this.$buefy.dialog.alert({
                  title: '⚠️ 포메스 앱 미가입 계정',
                  message: `포메스 모바일 앱에 가입되지 않은 계정입니다.<br/><br/><b><a href="${this.fomesDownloadUrl}" target="_blank">포메스 모바일 앱</a></b>에서 회원 가입 후, 이용하실 수 있습니다.`,
                  type: 'is-danger',
                  ariaRole: 'alertdialog',
                  ariaModal: true
                });
              }
            });
  },
}

};
</script>

<style scoped>

</style>
