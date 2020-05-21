const config = {};

config.development = {
  serverBaseUrl: process.env.VUE_APP_SERVER_BASE_URL || 'http://localhost:8080',
  port: process.env.VUE_APP_PORT || 8989,
  temporaryAccessToken: process.env.VUE_APP_TEMP_ACCESS_TOKEN,
  googleClientId: process.env.VUE_APP_GOOGLE_CLIENT_ID
};

config.staging = config.development;
config.production = config.development;

module.exports = config[process.env.NODE_ENV];
