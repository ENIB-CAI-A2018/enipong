// Import PolymerElement class and html helper definition
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@granite-elements/granite-bootstrap/granite-bootstrap.js';

// Define the element's class element
export class EventListItems extends PolymerElement {

  static get template() {
    return html`
    <style include="granite-bootstrap"></style>
    <style>
      .player {
        margin: 10px;
        padding: 10px;
        border: solid 1px black;
        border-radius: 10px;
        min-height: 150px;
      }
      .el-img {
        max-height: 100px;
      }
      .el-ratio {
        clear:both;
      }
    </style>
    <div id="[[id]]" class="player clearfix">
      <a href="player/[[id]]"><h2 class="el-name">[[name]]</h2></a>
      <p class="float-right el-ratio"> [[date]]</p>
    </div>
    `;
  }

  static get properties() {
    return {
      id: {
        type: String,
      },
      name: {
        type: String,
      },
      date: {
        type: String,
      },
      description: {
        type: String,
      },
      lieu: {
        type: String,
      },
    }
  }
}

// Associate the new class with an element name
customElements.define('event-list-items', EventListItems);
