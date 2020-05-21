<template>
  <div id="app">
    <b-navbar class="is-grayish-brown">
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img src="./assets/logo.png" alt="Logo"/>
        </b-navbar-item>
      </template>
      <template slot="end">
        <b-navbar-item href="/">
          Home
        </b-navbar-item>
        <b-navbar-item href="/about">
          About
        </b-navbar-item>
        <b-navbar-item href="/beta-tests">
          BetaTests
        </b-navbar-item>
      </template>
    </b-navbar>

    <router-view />
  </div>
</template>

<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: #00BFBA;
$primary-invert: findColorInvert($primary);
$twitter: #4099FF;
$twitter-invert: findColorInvert($twitter);
$gray: #808080;
$gray-invert: findColorInvert($gray);
$grayish-brown: #4a4a4a;
$grayish-brown-invert: findColorInvert($grayish-brown);


// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
  "white": ($white, $black),
  "black": ($black, $white),
  "gray": ($gray, $gray-invert),
  "grayish-brown": ($grayish-brown, $grayish-brown-invert),
  "light": ($light, $light-invert),
  "dark": ($dark, $dark-invert),
  "primary": ($primary, $primary-invert),
  "info": ($info, $info-invert),
  "success": ($success, $success-invert),
  "warning": ($warning, $warning-invert),
  "danger": ($danger, $danger-invert),
  "twitter": ($twitter, $twitter-invert)
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
