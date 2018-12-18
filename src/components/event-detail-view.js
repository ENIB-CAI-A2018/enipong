import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';

import './Calendar/event-details.js';

import { SharedStyles } from './shared-styles.js';


class EventDetailView extends PageViewElement {
  render() {
    return html`
    ${SharedStyles}
    <section>
        ${this.active ? html`<event-details id=${this.eventId} ></event-details>` : ``}
    </section>
    `;
  }
  static get properties() {
    return {
      eventId : {
        type : String,
      },
    };
  }
}

customElements.define('event-detail-view', EventDetailView);