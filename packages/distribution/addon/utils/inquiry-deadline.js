import { assert } from "@ember/debug";
import { get } from "@ember/object";
import { DateTime } from "luxon";

import { createDecorator } from "@projectcaluma/ember-distribution/-private/decorator";

function decorator(
  target,
  key,
  desc,
  { inquiryProperty = "args.inquiry" } = {}
) {
  assert(
    `The @projectcaluma/ember-distribution config must be injected in order to use @inquiryDeadline: \`@config config\``,
    Object.prototype.hasOwnProperty.call(target, "config")
  );

  return {
    get() {
      const inquiry = get(this, inquiryProperty);
      const value = inquiry.document?.deadline.edges[0]?.node.value;
      const isAnswered = inquiry.status === "COMPLETED";

      const { days: diff } = DateTime.fromISO(value).diffNow("days").toObject();

      const isOverdue = !isAnswered && diff <= 0;
      const isWarning = !isAnswered && diff <= this.config.warningPeriod;

      return {
        value,
        isOverdue,
        isWarning,
        color: isAnswered
          ? "muted"
          : isOverdue
          ? "danger"
          : isWarning
          ? "warning"
          : "emphasis",
      };
    },
  };
}

export default createDecorator(decorator);
