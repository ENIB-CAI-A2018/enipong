import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';

import './player/player-detail.js';

import { SharedStyles } from './shared-styles.js';


class PlayerDetailView extends PageViewElement {
  render() {
    return html`
    ${SharedStyles}
    <section>
      <player-detail id="${this.playerId}"></player-detail>
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

  connectedCallback() {
    super.connectedCallback();
    console.log("connectedCallback");

    const path = window.decodeURIComponent(window.location.pathname);
    const parts = path.slice(1).split('/');

    if(parts[0] == 'player'){
      console.log("inCondition");
      this.playerId = parts[1];
    }
  }
}

customElements.define('player-detail-view', PlayerDetailView);
