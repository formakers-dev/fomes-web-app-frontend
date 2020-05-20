<template>
  <div class="card">
    <div class="card-image">
      <figure class="image">
        <b-tag class="d-day is-medium">{{ betaTest.closeDate | moment("from", "now") }} 종료</b-tag>
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
<!--            <p>-->
<!--              <b-tag style="margin-right: 0.3rem" v-for="tag in betaTest.tags" v-bind:key="tag">{{tag}}</b-tag>-->
<!--            </p>-->
            <p>
              <time v-bind:datetime="betaTest.openDate">{{ betaTest.openDate | moment("YYYY-MM-DD") }}</time>
              ~
              <time v-bind:datetime="betaTest.closeDate">{{ betaTest.closeDate | moment("YYYY-MM-DD") }}</time>
            </p>
            <p>
              {{ betaTest.closeDate | moment("from", "now") }} 종료
            </p>
          </div>
        </div>
      </div>
      <div class="missions-container">
        <b>현재 참여 가능한 미션</b>
        <footer v-if="betaTest.missions" class="card-footer">
          <div
            class="card-footer-item"
            v-for="mission in getValidMissions()"
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
  },
  methods: {
    getValidMissions() {
      let result = [];
      const repeatableMissions = this.betaTest.missions.filter(mission => mission.isRepeatable && mission.isCompleted);
      const mandatoryMissions = this.betaTest.missions.filter(mission => mission.isMandatory && !mission.isCompleted);

      if (repeatableMissions.length > 0) {
        result = result.concat(repeatableMissions);
      }

      if (mandatoryMissions.length > 0) {
        result.push(mandatoryMissions[0]);
      }

      if (result.length <= 0) {
        result = this.betaTest.missions;
      }

      return result;
    }
  }
};
</script>

<style scoped>
.d-day {
  position: absolute;
  left: 0.5rem;
  top: 0.5rem;
  background: #4a4a4a;
  color: white;
}
.missions-container {
  font-size: 1.2rem;
}
</style>
