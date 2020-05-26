<template>
  <div class="home">
    <div class="contents">
      <div class="logo">
        <img
          class="is-center"
          style="width: 600px"
          src="../assets/emphasis.png"
        />
        <img style="width: 450px; margin-top: 1rem" src="../assets/logo.png" />
      </div>
      <h1
        class="title has-text-centered has-text-weight-bold"
        style="color: white; margin-top: 1.5rem"
      >
        신작게임 놀이터, 포메스!
      </h1>
      <div style="margin-top: 2rem;">
        <a
          href="#"
          @click="handleClickSignIn"
          v-if="!this.$store.getters.isLoggedIn"
        >
          <img
            style="width: 400px"
            src="../assets/google_login_button.png"
            alt="Login"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      fomesDownloadUrl:
        "https://play.google.com/store/apps/details?id=com.formakers.fomes"
    };
  },
  methods: {
    handleClickSignIn() {
      this.$gAuth
        .signIn()
        .then(googleUser => {
          const idToken = googleUser.getAuthResponse().id_token;

          return this.$store.dispatch("login", idToken);
        })
        .then(() => {
          console.log("Successfully sign in");
        })
        .catch(error => {
          console.error(error);
          if (error.response.status === 403) {
            this.$buefy.dialog.alert({
              title: "⚠️ 포메스 앱 미가입 계정",
              message: `포메스 모바일 앱에 가입되지 않은 계정입니다.<br/><br/><b><a href="${this.fomesDownloadUrl}" target="_blank">포메스 모바일 앱</a></b>에서 회원 가입 후, 이용하실 수 있습니다.`,
              type: "is-danger",
              ariaRole: "alertdialog",
              ariaModal: true
            });
          }
        });
    }
  }
};
</script>

<style scoped>
.home {
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-image: url("../assets/bg.png");
  background-repeat: no-repeat;
  background-position: center center;
}

.logo {
  margin-top: -10%;
}

.contents {
  position: absolute;
  top: 50%;
  left: 50%;
  /*요소의 높이/너비의 반(50%)만큼 위/왼쪽으로 이동*/
  transform: translate(-50%, -50%);
}

html,
body {
  width: 100vw;
  height: 100vh;
}

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
