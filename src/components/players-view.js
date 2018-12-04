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
  render() {
    return html`
      <player-list></player-list>
    `;
  }
  static get properties() {
    return {};
  }
}

customElements.define('players-view', PlayersView);
