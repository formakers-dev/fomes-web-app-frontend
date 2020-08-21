<template>
  <div class="card">
    <div class="card-image">
      <figure class="image">
        <b-tag class="d-day is-medium">{{ betaTest.closeDate | moment("from", "now") }} 종료</b-tag>
        <img v-bind:src="betaTest.coverImageUrl" />
      </figure>
    </div>
    <div class="card-content">
      <div class="columns">
        <div class="column has is-three-quarters">
          <b-tag class="my-status is-medium " :class="isCompleted ? 'is-primary': ''">{{ myStatusDisplayString }}</b-tag>
        </div>
        <div class="column has-text-right">
          <a href="#" @click="requestBetaTestDetail"><b-icon icon="refresh is-right" size="is-medium"></b-icon></a>
        </div>
      </div>
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
          <a v-bind:href="getBugReportUrl(betaTest.bugReport.url)"
             target="_blank"
             rel="noopener noreferrer"
          >
            버그제보
          </a>
        </div>
      </div>
    </div>
    <loading :active.sync="isLoading"
             :is-full-page="false"></loading>
  </div>
</template>

<script>
import request from "../common/utils/http";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: "BetaTestCard",
  props: {
    email: String,
    betaTest: Object
  },
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false,
    }
  },
  created() {
    this.requestBetaTestDetail();
  },
  methods: {
    requestBetaTestDetail() {
      this.isLoading = true;

      const self = this;
      request
          .get("/beta-tests/detail/" + this.betaTest._id)
          .then(res => {
            console.log(res.data);
            // this.betaTest.iconImageUrl = res.data.iconImageUrl;
            // this.betaTest.mission = res.data.missions[0];
            self.$set(self.betaTest, "iconImageUrl", res.data.iconImageUrl);
            self.$set(self.betaTest, "missions", res.data.missions.sort((a, b) => a.order - b.order));
            self.$set(self.betaTest, "isCompleted", res.data.isCompleted);
            console.log(this.betaTest);
          })
          .catch(err => console.error(err))
          .finally(() => self.isLoading = false);
    },
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
      let link = this.convertDeeplinkToUrl(mission.action);
      link = link.replace('{email}', this.email);

      const btIdsFormat = '{b-m-ids}';
      const idSeparator = "$$$$"; //javascript string replace 특성 고려하여 4개로 반영

      if (link.indexOf(btIdsFormat) > -1) {
        const btIds = btoa(btoa(mission.betaTestId)) + idSeparator + btoa(btoa(mission._id));
        link = link.replace(btIdsFormat, btIds);
      }

      return link;
    },
    getBugReportUrl(url) {
      if (url && url !== "") {
        const bugReportUrl = this.convertDeeplinkToUrl(url);
        return bugReportUrl.replace('{email}', this.email);
      }
    },
    convertDeeplinkToUrl(url) {
      if (url.startsWith("fomes://")) {
        const parsedUrl = new URL(url);
        return parsedUrl.searchParams.get("url");
      } else {
        return url;
      }
    },
  },
  computed: {
    isCompleted() {
      return this.betaTest.isCompleted;
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
