<template>
  <div class="card">
    <div class="card-image">
      <figure class="image">
        <img v-bind:src="betaTest.coverImageUrl" />
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-96x96">
            <img v-bind:src="betaTest.iconImageUrl" />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ betaTest.title }}</p>
          <div class="subtitle is-6">
            <p>{{ betaTest.tags.map(tag => "#" + tag).join(' ') }}</p>
            <p>
              <time v-bind:datetime="betaTest.openDate">{{ betaTest.openDate | moment("YYYY-MM-DD") }}</time>
              ~
              <time v-bind:datetime="betaTest.closeDate">{{ betaTest.closeDate | moment("YYYY-MM-DD") }}</time>
            </p>
            <p>
              {{ betaTest.closeDate | moment("from", "now") }}
            </p>
          </div>
        </div>
      </div>
      <b style="font-size: 1.2rem">현재 참여 가능한 미션</b>
      <footer v-if="betaTest.missions" class="card-footer">
        <div
          class="card-footer-item"
          style="font-size: 1.2rem"
          v-for="mission in betaTest.missions"
          v-bind:key="mission._id"
        >
          <a
            v-bind:href="mission.action.replace('{email}', email)"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ mission.title }}
          </a>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import request from "../common/utils/http";

export default {
  name: "BetaTestCard",
  props: {
    email: String,
    betaTest: Object
  },
  created() {
    const self = this;
    request
      .get("/beta-tests/detail/" + this.betaTest._id)
      .then(res => {
        console.log(res.data);
        // this.betaTest.iconImageUrl = res.data.iconImageUrl;
        // this.betaTest.mission = res.data.missions[0];
        self.$set(self.betaTest, "iconImageUrl", res.data.iconImageUrl);
        self.$set(self.betaTest, "missions", res.data.missions.sort((a, b) => a.order - b.order));
        console.log(this.betaTest);
      })
      .catch(err => console.error(err));
  }
};
</script>

<style scoped></style>
