
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",

  e2e: {
    setupNodeEvents(on, config) {
      // reporter: "cypress-mochawesome-reporter",

      require("cypress-mochawesome-reporter/plugin")(on);
      on("task", {
        crudLog(message) {
          console.log(message);
          return null;
        },
      });
      // adjust to print size
      on("before:browser:launch", (browser, launchOptions) => {
        if (browser.family === "chromium" && browser.name !== "electron") {
          launchOptions.args.push("--window-size=1500,1200");
        }
        if (browser.name === "electron") {
          launchOptions.preferences.width = 1500;
          launchOptions.preferences.height = 1200;
        }
        if (browser.family === "firefox") {
          launchOptions.args.push("--width=1500");
          launchOptions.args.push("--height=1200");
        }
        return launchOptions;
      });
    },
    testIsolation: false, //  in e2e:{}
    experimentalRunAllSpecs: true, // in e2e:{}
    env: {
      // in e2e:{}
      screenshot: false, // required true, for active screenshot
      visualPayloads: false,
      crudStyles: true // active styles crud designer
  //   environment: "QA", // change environment
  //   QA: {
  //     getUser: "https://reqres.in/api/users",
  //   },
  //   DEV: {
  //     getUser: "https://reqres.in/api/users/2",
  //   },
  //   PROD: {
  //     getUser: "https://reqres.in/api/users/2",
  //   },
    },
  },
});

