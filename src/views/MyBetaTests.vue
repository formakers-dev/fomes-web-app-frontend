<template>
  <div class="root">
    <section class="section">
      <div class="container">
        <h1 class="title">나의 게임 테스트</h1>
        <h2 class="subtitle">현재 내가 참여 중인 게임 테스트들이에요 🎮</h2>
      </div>
    </section>
    <b-loading v-bind:active.sync="isLoading"></b-loading>
    <div class="container beta-test-list">
      <div v-if="betaTests" class="columns is-multiline is-centered is-mobile">
        <div v-for="betaTest in betaTests" v-bind:key="betaTest.title">
          <div class="column">
            <beta-test-card class="beta-test-card" :beta-test="betaTest" :email="email"></beta-test-card>
          </div>
        </div>
        <div v-if="betaTests.length <= 0" style="text-align: center">
          아직 참여중인 테스트가 없으시네요!<br />
          <a v-bind:href="fomesDownloadUrl">포메스 모바일 앱</a>에서 게임
          테스트에 참여해주세요!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import request from "../common/utils/http";
import BetaTestCard from "../components/BetaTestCard";

export default {
  name: "BetaTests",
  components: {
    BetaTestCard
  },
  data() {
    return {
      isLoading: true,
      email: this.$store.getters.getEmail,
      betaTests: Array,
      fomesDownloadUrl: "https://play.google.com/store/apps/details?id=com.formakers.fomes"
    };
  },
  created() {
    request
      .get("/beta-tests")
      .then(res => {
        this.isLoading = false;
        console.log(res.data);
        this.betaTests = res.data
          .filter(betaTest => betaTest.isAttended)
          .sort((a, b) => moment(a.closeDate) - moment(b.closeDate));
      })
      .catch(err => {
        this.isLoading = false;
        console.error(err);
        this.betaTests = [];
      });
  }
};
</script>

<style scoped>
.section {
  background: #4a4a4a;
}
.section .title {
  color: white;
}
.section .subtitle {
  color: #808080;
}
.beta-test-list {
  padding: 1rem;
  height: 100%;
}
.column {
  width: 30rem;
}
</style>
