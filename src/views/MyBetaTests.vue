<template>
  <div class="root">
    <section class="section">
      <div class="container">
        <h1 class="title">나의 게임 테스트</h1>
        <h2 class="subtitle">현재 내가 참여할 수 있는 테스트가 보여져요</h2>
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
import request from "../common/utils/http";
import BetaTestCard from "../components/BetaTestCard";

/*
const dummyData = [
  {
    _id: "id1",
    title: "[더 팜M] 게임 테스트",
    coverImageUrl: "https://i.imgur.com/J2Ivvhm.png",
    iconImageUrl: "https://i.imgur.com/EgdSiW6.png",
    openDate: new Date("2020-05-19T15:00:00.000Z"),
    closeDate: new Date("2020-05-25T14:59:59.999Z"),
    mission: {
      title: "플레이 후 소감",
      action: "http://www.naver.com"
    }
  },
  {
    _id: "id2",
    title: "[프로숫자야구] 게임 테스트",
    coverImageUrl: "https://i.imgur.com/XQGrp7g.jpg",
    iconImageUrl: "https://i.imgur.com/wGakihC.jpg",
    openDate: new Date("2020-06-19T15:00:00.000Z"),
    closeDate: new Date("2020-06-25T14:59:59.999Z"),
    mission: {
      title: "플레이 후 소감",
      action: "http://www.naver.com"
    }
  },
  {
    _id: "id3",
    title: "[전자오락수호대] 게임 테스트",
    coverImageUrl: "https://i.imgur.com/kWhk3Md.png",
    iconImageUrl: "https://i.imgur.com/xlcdja2.jpg",
    openDate: new Date("2020-01-19T15:00:00.000Z"),
    closeDate: new Date("2020-01-25T14:59:59.999Z"),
    mission: {
      title: "플레이 후 소감",
      action: "http://www.naver.com"
    }
  },
  {
    _id: "id4",
    title: "[더 팜M] 게임 테스트",
    coverImageUrl: "https://i.imgur.com/J2Ivvhm.png",
    iconImageUrl: "https://i.imgur.com/EgdSiW6.png",
    openDate: new Date("2019-11-19T15:00:00.000Z"),
    closeDate: new Date("2019-11-25T14:59:59.999Z"),
    mission: {
      title: "플레이 후 소감",
      action: "http://www.naver.com"
    }
  },
  {
    _id: "id5",
    title: "[프로숫자야구] 게임 테스트",
    coverImageUrl: "https://i.imgur.com/XQGrp7g.jpg",
    iconImageUrl: "https://i.imgur.com/wGakihC.jpg",
    openDate: new Date("2019-12-19T15:00:00.000Z"),
    closeDate: new Date("2019-12-25T14:59:59.999Z"),
    mission: {
      title: "플레이 후 소감",
      action: "http://www.naver.com"
    }
  },
  {
    _id: "id6",
    title: "[전자오락수호대] 게임 테스트",
    coverImageUrl: "https://i.imgur.com/kWhk3Md.png",
    iconImageUrl: "https://i.imgur.com/xlcdja2.jpg",
    openDate: new Date("2020-01-19T15:00:00.000Z"),
    closeDate: new Date("2020-01-25T14:59:59.999Z"),
    mission: {
      title: "플레이 후 소감",
      action: "http://www.naver.com"
    }
  }
];
*/

export default {
  name: "BetaTests",
  components: {
    BetaTestCard
  },
  data() {
    return {
      isLoading: true,
      email: "yena.kim@formakers.net",
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
        this.betaTests = res.data.filter(betaTest => betaTest.isAttended && !betaTest.isCompleted);
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
