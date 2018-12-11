import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';

import './team/team-detail.js';

import { SharedStyles } from './shared-styles.js';


class TeamDetailView extends PageViewElement {
  render() {
    return html`
    ${SharedStyles}
    <section>
      ${this.active ? html `<team-detail id="${this.teamId}"></team-detail>` : ``}
    </section>
    `;
  }
  static get properties() {
    return {
      teamId : {
        type : String,
      },
    };
  }
}

customElements.define('team-detail-view', TeamDetailView);
