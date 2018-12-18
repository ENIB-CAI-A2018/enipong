import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import '@granite-elements/granite-bootstrap/granite-bootstrap';

export class EventDetails extends PolymerElement {

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
        .back {
          width: 50px;
          height: 50px;
        }
        .ratio {
          clear:both;
        }

        ul.player-thumbs {
          margin: 0;
          list-style: none;
        }

        ul.player-thumbs li {
          border: 1px solid black;
          display: inline-block;
          margin: 1em;
          background-color: white;
        }

        ul.player-thumbs img {
          height: 100px;
          width: 100px;
          padding: 1em;
        }

        ul.specs {
          clear: both;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        ul.specs > li{
          display: inline-block;
          width: 200px;
          vertical-align: top;
        }

        ul.specs > li > span{
          font-weight: bold;
          font-size: 1.2em;
        }

        ul.specs dt {
          font-weight: bold;
        }

        h1 {
          border-bottom: 1px solid gray;
        }
      </style>

      <div id="[[event.id]]" class="player clearfix">
        <h1 class="name">[[event.name]]</h1>
        <p class="description">[[event.date]]</p>
        <p class="description">[[event.lieu]]</p>  
        <p class="description">[[event.description]]</p>
        
      </div>
    `;
  }


  static get properties() {
    return {
      id: {
        type: String,
        observer: '_onIdChange',
      },
      event: {
        type: Object,
      },
    };
  }


  async _onIdChange() {
    console.log(this.id);
    // const url = `/data/players/details/${this.id}.json`;
    const url = `http://localhost:3000/events/${this.id}`;
    try {
      const response = await fetch(url);
      this.event = await response.json();
    }
    catch (err) {
      console.log('fetch failed', err);
    }
  }
}


window.customElements.define('event-details',EventDetails);