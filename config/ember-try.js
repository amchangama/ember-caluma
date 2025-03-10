"use strict";

/* eslint-disable n/no-missing-require */
const { embroiderSafe, embroiderOptimized } = require("@embroider/test-setup");
const getChannelURL = require("ember-source-channel-url");

module.exports = async function () {
  return {
    usePnpm: true,
    scenarios: [
      {
        name: "ember-lts-4.4",
        npm: {
          devDependencies: {
            "ember-source": "~4.4.0",
          },
        },
      },
      {
        name: "ember-lts-4.8",
        npm: {
          devDependencies: {
            "ember-source": "~4.8.0",
          },
        },
      },
      {
        name: "ember-release",
        npm: {
          devDependencies: {
            "ember-source": await getChannelURL("release"),
          },
        },
      },
      {
        name: "ember-beta",
        npm: {
          devDependencies: {
            "ember-source": await getChannelURL("beta"),
          },
        },
      },
      {
        name: "ember-canary",
        npm: {
          devDependencies: {
            "ember-source": await getChannelURL("canary"),
          },
        },
      },
      embroiderSafe(),
      embroiderOptimized(),
    ],
  };
};
