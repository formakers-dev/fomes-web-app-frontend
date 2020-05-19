<template>
  <div class="card">
    <div class="card-image">
      <figure class="image">
        <img v-bind:src="betaTest.coverImageUrl" alt="Placeholder image" />
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-96x96">
            <img v-bind:src="betaTest.iconImageUrl" alt="Placeholder image" />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ betaTest.title }}</p>
          <div class="subtitle is-6">
              <p>아무말 대잔치</p>
              <p>
                  <time v-bind:datetime="betaTest.openDate">{{ betaTest.openDate | moment('YYYY-MM-DD') }}</time>
                  ~
                  <time v-bind:datetime="betaTest.closeDate">{{ betaTest.closeDate | moment('YYYY-MM-DD') }}</time>
              </p>
              <p>
                {{ betaTest.closeDate | moment("from", "now")}}
              </p>
          </div>

        </div>
      </div>
      <footer class="card-footer">
        <div class="card-footer-item" style="font-size: 1.2rem">
          <b>현재 참여 가능한 미션</b>
          <p style="margin-left: 0.5rem; margin-right: 0.5rem">|</p>
          <a
            v-bind:href="betaTest.mission.action"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ betaTest.mission.title }}
          </a>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "BetaTestCard",
  props: {
    betaTest: Object
  }
};
</script>

<style scoped></style>
