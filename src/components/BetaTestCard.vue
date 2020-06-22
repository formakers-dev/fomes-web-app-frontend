<template>
  <div class="card">
    <div class="card-image">
      <figure class="image">
        <b-tag class="d-day is-medium">{{ betaTest.closeDate | moment("from", "now") }} 종료</b-tag>
        <img v-bind:src="betaTest.coverImageUrl" />
      </figure>
    </div>
    <div class="card-content">
      <b-tag class="plan is-medium" :class="isPrimium ? 'is-warning': 'is-primary'">{{ planDisplayString }}</b-tag>
      <b-tag class="my-status is-medium " :class="isCompleted ? 'is-primary': ''">{{ myStatusDisplayString }}</b-tag>
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
            <p>{{ betaTest.missionsSummary }}</p>
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
        <p style="font-weight: bold; margin-bottom: 0.3rem;">현재 {{ isCompleted ? "수정" : "참여"}} 가능한 미션</p>
        <footer v-if="betaTest.missions" class="card-footer">
          <div
            class="card-footer-item"
            v-for="mission in getValidMissions()"
            v-bind:key="mission._id"
          >
            <a
              v-bind:href="replacedLinkWithReservedWords(mission)"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ mission.title }}
            </a>
          </div>
        </footer>
        <div v-if="betaTest.bugReport && betaTest.bugReport.url">
          <a v-bind:href="betaTest.bugReport.url"
             target="_blank"
             rel="noopener noreferrer"
          >
            버그제보
          </a>
        </div>
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
    },
    replacedLinkWithReservedWords(mission) {
      let link = mission.action.replace('{email}', this.email);

      const btIdsFormat = '{b-m-ids}';
      const idSeparator = "$$$$"; //javascript string replace 특성 고려하여 4개로 반영

      if (link.indexOf(btIdsFormat) > -1) {
        const btIds = btoa(btoa(mission.betaTestId)) + idSeparator + btoa(btoa(mission._id));
        link = link.replace(btIdsFormat, btIds);
      }

      return link;
    }
  },
  computed: {
    isPrimium() {
      return (
        this.betaTest.plan === "standard" || this.betaTest.plan === "simple"
      );
    },
    isCompleted() {
      return this.betaTest.isCompleted;
    },
    planDisplayString() {
      return this.isPrimium ? "프리미엄 테스트" : "간단 테스트";
    },
    myStatusDisplayString() {
      return this.isCompleted ? "참여완료" : "참여중";
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
  font-size: 1.1rem;
  text-align: center;
}
.my-status {
  margin-left: 10px;
}
.media {
  margin-top: 10px;
}
</style>
