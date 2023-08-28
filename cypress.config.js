const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://161.35.206.169:5000",
    env: {
      api: "http://161.35.206.169:5000"
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  video: false
});
