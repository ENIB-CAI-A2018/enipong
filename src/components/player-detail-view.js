import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';

import './player/player-detail.js';

import { SharedStyles } from './shared-styles.js';


class PlayerDetailView extends PageViewElement {
  render() {
    return html`
    ${SharedStyles}
    <section>
        ${this.active ? html`<player-detail id=${this.playerId} ></player-detail>` : ``}
    </section>
    `;
  }
  static get properties() {
    return {
      playerId : {
        type : String,
      },
    };
  }
}

customElements.define('player-detail-view', PlayerDetailView);
