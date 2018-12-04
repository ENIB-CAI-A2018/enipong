import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';

import '@polymer/polymer/lib/elements/dom-if.js';

import '@granite-elements/granite-bootstrap/granite-bootstrap.js';

import './player/player-list.js';
import './player/player-detail.js';

import '@polymer/app-route/app-route.js';
import '@polymer/app-route/app-location.js';

import { SharedStyles } from './shared-styles.js';


class PlayersView extends PageViewElement {
  static get template() {
    return html`
      <player-list></player-list>
      <player-detail id="[[playerId.id]]"></player-detail>
    `;
  }
  static get properties() {
    return {
      playerId: {
        type: String,
      },
    };
  }
}

customElements.define('players-view', PlayersView);
