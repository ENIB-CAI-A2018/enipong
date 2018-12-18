import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import '@granite-elements/granite-bootstrap/granite-bootstrap';

export class TeamDetail extends PolymerElement {

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
        .back {
          width: 50px;
          height: 50px;
        }
        .img {
          float: right;
          border: 1px solid black;
          margin-right: 3em;
          margin-bottom: 2em;
          background-color: black;
          padding: 2em;
          height: 400px;
          width: 400px;
        }
        .ratio {
          clear:both;
        }

        ul.team-thumbs {
          margin: 0;
          list-style: none;
        }

        ul.team-thumbs li {
          border: 1px solid black;
          display: inline-block;
          margin: 1em;
          background-color: white;
        }Contact

        ul.team-thumbs img {
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
          font-family: 'Pacifico';
          color: #0056B3;
        }
        h3{
          color:red;
          font-size:1.5em;
        }
      </style>

      <div id="[[team.id]]" class="team clearfix">
        <center><h1 class="name">[[team.name]]</h1></center>
        <a href="/teams"><img class="pull-right back" src="/images/back.png"></a>
        <img class="pull-right img" src="/data/[[team.img]]">
        <p class="description">[[team.description]]</p>
        <ul class="specs">
          <li>
            <dl>
              <dt>Win ratio</dt>
              <h3>[[team.ratio]]%</h3>
            </dl>
          </li>
          <li>
            <dl>
              <dt>Players</dt>
              <template is="dom-repeat" items=[[team.players]] as="playerId">
                <a href="/player/[[playerId]]"><dd>[[playerId]]</dd></a>
              </template>
            </dl>
          </li>
          <li>
            <dl>
              <dt>Contact</dt>
              <dd>[[team.availability]]</dd>
            </dl>
          </li>
        </ul>
      </div>
    `;
  }


  static get properties() {
    return {
      id: {
        type: String,
        observer: '_onIdChange',
      },
      team: {
        type: Object,
      },
    };
  }

  async _onIdChange() {
    console.log(this.id);
    // const url = `/data/teams/details/${this.id}.json`;
    const url = `http://localhost:3000/team/${this.id}`;
    try {
      const response = await fetch(url);
      this.team = await response.json();
    }
    catch (err) {
      console.log('fetch failed', err);
    }
  }
}


window.customElements.define('team-detail',TeamDetail);
