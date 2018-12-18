// Import PolymerElement class and html helper definition
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@granite-elements/granite-bootstrap/granite-bootstrap.js';

// Define the element's class element
export class TeamListItem extends PolymerElement {

  static get template() {
    return html`
      <style include="granite-bootstrap"></style>
      <style>
        .team {
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
        h3{
          color:red;
          font-size:1.5em;
        }
        a{
          font-family: 'Pacifico';
          text-transform: uppercase;
        }
      </style>
      <div id="[[id]]" class="team clearfix">
        <img class="float-right el-img" src="/data/teams/[[img]]">
        <a href="/team/[[id]]"><h2 class="el-name">[[name]]</h2></a>
        <p class="el-description">[[description]]</p>
        <h3 class="float-right el-ratio">Win ratio: [[ratio]]%</h3>
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
      description: {
        type: String,
      },
      img: {
        type: String,
      },
      ratio: {
        type: String,
      },
    }
  }
}

// Associate the new class with an element name
customElements.define('team-list-item', TeamListItem);
