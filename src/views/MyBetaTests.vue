<template>
  <div class="root">
    <section class="section">
      <div class="container">
        <h1 class="title">나의 게임 테스트</h1>
        <h2 class="subtitle">현재 내가 참여할 수 있는 테스트가 보여져요</h2>
      </div>
    </section>
    <div class="container beta-test-list">
      <!-- 아래는 컴포넌트로 분리 필요 -->
      <div class="card">
        <div class="card-image">
          <figure class="image">
            <img v-bind:src="betaTests[0].coverImageUrl" alt="Placeholder image">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-128x128">
                <img v-bind:src="betaTests[0].iconImageUrl" alt="Placeholder image">
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">{{betaTests[0].title}}</p>
              <p class="subtitle is-6">뭐라고쓰지</p>
              <time v-bind:datetime="betaTests[0].openDate">{{betaTests[0].openDate}}</time>
              ~
              <time v-bind:datetime="betaTests[0].closeDate">{{betaTests[0].closeDate}}</time>
            </div>
          </div>

          <div class="content">
            <b style="color: #00BFBA">현재 참여 가능한 미션</b>
            <a href="#">뭐시기 저시기</a>
          </div>

          <footer class="card-footer">
            <div class="card-footer-item">
              <b style="color: #00BFBA">현재 참여 가능한 미션</b>
              <a href="#">뭐시기 저시기</a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const dummyData = {
  title: "[더 팜M] 게임 테스트",
  coverImageUrl: "https://i.imgur.com/J2Ivvhm.png",
  iconImageUrl: "https://i.imgur.com/EgdSiW6.png",
  openDate: new Date("2019-11-19T15:00:00.000Z"),
  closeDate: new Date("2019-11-25T14:59:59.999Z"),
};

export default {
  name: "BetaTests",
  data() {
    return {
      betaTests: []
    };
  },
  created() {
    this.betaTests.push(dummyData);
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
}
</style>
