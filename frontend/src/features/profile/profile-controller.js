import { renderProfileState } from "./profile-view.js";

export function createProfileController({ dom }) {
  return {
    initialize() {
      renderProfileState(dom.optional("#profileSummaryPanel"), "ready");
    },
    dispose() {},
  };
}
