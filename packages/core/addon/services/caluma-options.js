import { assert } from "@ember/debug";
import Service, { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";

import slugify from "@projectcaluma/ember-core/utils/slugify";

/**
 * The options service is there to provide a means to share data
 * between the host application and the addon at runtime.
 *
 * The Power Select dropdown will be registered on initialization.
 *
 * @class CalumaOptionsService
 * @extends Ember.Service
 */
export default class CalumaOptionsService extends Service {
  @service intl;

  @tracked currentGroupId;

  _namespace = null;
  _overrides = {};

  get namespace() {
    return this._namespace || null;
  }

  set namespace(value) {
    this._namespace = value
      ? slugify(String(value), { locale: this.intl.primaryLocale })
      : null;
  }

  /**
   * Registers a new component override.
   *
   * @method registerComponentOverride
   * @param {Object} override The additional override.
   * @param {String} override.label The text displayed in the form-builder dropdown.
   * @param {String} override.component The path/name of the overriding component.
   * @param {Array} [override.types] An optional question type restriction.
   * @return {Void}
   */
  registerComponentOverride(override) {
    this._overrides[override.component] = override;
  }

  /**
   * Unregisters a component override.
   *
   * @method unregisterComponentOverride
   * @param {Object|String} override Either an override object (see register method) or a component path/name.
   * @return {Void}
   */
  unregisterComponentOverride(override) {
    delete this._overrides[override.component ? override.component : override];
  }

  /**
   * Returns the registered overrides as an array.
   *
   * @method getComponentOverrides
   * @return {Array} List of registered overrides
   */
  getComponentOverrides() {
    return Object.values(this._overrides);
  }

  /**
   * Defines the behavior used when sending a reminder for
   * an overdue inquiry. It should at least update the meta
   * data on the inquiry work-item to update the reminder
   * history and perform any application-specific behavior
   * to send reminder notifications.
   *
   * @method sendReminderDistributionInquiry
   * @param {String} inquiryId
   */
  async sendReminderDistributionInquiry() {}

  groupIdentifierProperty = "id";
  groupNameProperty = "name";
  resolveGroups(identifiers) {
    return identifiers.map((identifier) => ({
      [this.groupIdentifierProperty]: identifier,
      [this.groupNameProperty]: identifier,
    }));
  }

  userIdentifierProperty = "username";
  userNameProperty = "fullName";
  resolveUsers(identifiers) {
    return identifiers.map((identifier) => ({
      [this.userIdentifierProperty]: identifier,
      [this.userNameProperty]: identifier,
    }));
  }

  fetchTypedGroups(/* types, search */) {
    assert(
      "`fetchTypedGroups` must be implemented on the Caluma options service",
    );
  }
}
