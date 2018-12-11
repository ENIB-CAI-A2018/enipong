import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';

import './team/team-list.js';

import { SharedStyles } from './shared-styles.js';


class TeamsView extends PageViewElement {
  render() {
    return html`
    ${SharedStyles}
      ${this.active ? html `<team-list></team-list>` : ``}
    `;
  }
  static get properties() {
    return {};
  }
}

customElements.define('teams-view', TeamsView);
