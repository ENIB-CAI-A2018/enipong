import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';

import './player/player-list.js';

import { SharedStyles } from './shared-styles.js';


class PlayersView extends PageViewElement {
  render() {
    return html`
    ${SharedStyles}
    <section>
      ${this.active ? html `<player-list></player-list>` : ``}
    </section>
    `;
  }
  static get properties() {
    return {};
  }
}

customElements.define('players-view', PlayersView);
