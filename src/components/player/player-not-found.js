import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

export class PlayerNotFound extends PolymerElement {

  static get template() {
    return html`
      <div>Route not found: [[location.pathname]]</div>
    `;
  }

  static get properties() {
    return {
      location: {
        type: Object,
      },
    };
  }
}

customElements.define('player-not-found', PlayerNotFound);
