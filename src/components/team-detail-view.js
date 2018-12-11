import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';

import './team/team-detail.js';

import { SharedStyles } from './shared-styles.js';


class TeamDetailView extends PageViewElement {
  render() {
    return html`
    ${SharedStyles}
    <section>
      <team-detail id="${this.teamId}"></team-detail>
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

  connectedCallback() {
    super.connectedCallback();
    console.log("connectedCallback");

    const path = window.decodeURIComponent(window.location.pathname);
    const parts = path.slice(1).split('/');

    if(parts[0] == 'team'){
      console.log("inCondition");
      this.teamId = parts[1];
    }
  }
}

customElements.define('team-detail-view', TeamDetailView);
