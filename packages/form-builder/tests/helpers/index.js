import { importSync } from "@embroider/macros";
import {
  setupApplicationTest as upstreamSetupApplicationTest,
  setupRenderingTest as upstreamSetupRenderingTest,
  setupTest as upstreamSetupTest,
} from "ember-qunit";

function setApplicationInstance() {
  const application = importSync(
    "@projectcaluma/ember-form-builder/-private/application",
  ).default;

  application.instance = this.owner;
}

// This file exists to provide wrappers around ember-qunit's / ember-mocha's
// test setup functions. This way, you can easily extend the setup that is
// needed per test type.

function setupApplicationTest(hooks, options) {
  upstreamSetupApplicationTest(hooks, options);

  hooks.beforeEach(setApplicationInstance);

  // Additional setup for application tests can be done here.
  //
  // For example, if you need an authenticated session for each
  // application test, you could do:
  //
  // hooks.beforeEach(async function () {
  //   await authenticateSession(); // ember-simple-auth
  // });
  //
  // This is also a good place to call test setup functions coming
  // from other addons:
  //
  // setupIntl(hooks); // ember-intl
  // setupMirage(hooks); // ember-cli-mirage
}

function setupRenderingTest(hooks, options) {
  upstreamSetupRenderingTest(hooks, options);

  hooks.beforeEach(setApplicationInstance);
}

function setupTest(hooks, options) {
  upstreamSetupTest(hooks, options);

  hooks.beforeEach(setApplicationInstance);
}

export { setupApplicationTest, setupRenderingTest, setupTest };
